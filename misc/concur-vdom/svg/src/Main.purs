module Main where

import Prelude

import Concur.Core (Widget)
import Concur.Core.FRP (Signal, dyn, loopS, loopW)
import Concur.VDom (HTML)
import Handles as P
import Concur.VDom.Run (runWidgetInDom)
import Concur.VDom.SVG as S
import Data.Array (reverse, (:))
import Data.Generic.Rep (class Generic)
import Data.Generic.Rep.Show (genericShow)
import Data.Time.Duration (Milliseconds(..))
import Data.Traversable (foldl)
import Data.Tuple (snd)
import Data.Tuple.Nested ((/\), type (/\))
import Effect (Effect)
import Effect.Aff (delay)
import Effect.Aff.Class (liftAff)

tickTime = 500.0 :: Number
startCoord = 300 /\ 300 :: Int /\ Int
stepSize = 2 :: Int
iterations = 13 :: Int

data Dir
  = Up
  | Down
  | Left
  | Right

derive instance eqDir :: Eq Dir

derive instance genericDir :: Generic Dir _

instance showDir :: Show Dir where
  show = genericShow

type Model
  = { dirs :: Array Dir
    , iteration :: Int
    }

newModel :: Model
newModel = { dirs: [], iteration: 0 }

unfold :: Array Dir -> Array Dir
unfold = case _ of
  [] -> [ Down ]
  dirs -> dirs <> (rotate <$> reverse dirs)

rotate :: Dir -> Dir
rotate = case _ of
  Right -> Up
  Up -> Left
  Left -> Down
  Down -> Right

update :: Model -> Model
update model =
  if model.iteration > iterations then
    newModel
  else
    { dirs: unfold model.dirs
    , iteration: model.iteration + 1
    }

type Coord
  = Int /\ Int

makeLine :: forall a. Coord -> Coord -> Widget HTML a
makeLine (xa /\ ya) (xb /\ yb) =
  S.line
    [ S.unsafeMkProp "x1" xa
    , S.unsafeMkProp "x2" xb
    , S.unsafeMkProp "y1" ya
    , S.unsafeMkProp "y2" yb
    , S.stroke "#000000"
    , S.strokeWidth 2
    ]
    []
    
move :: Coord -> Dir -> Coord
move (x /\ y) = case _ of
  Up -> x /\ (y - stepSize)
  Down -> x /\ (y + stepSize)
  Left -> (x - stepSize) /\ y
  Right -> (x + stepSize) /\ y
    
renderLine ::
  forall a.
  Coord /\ Array (Widget HTML a) ->
  Dir ->
  Coord /\ Array (Widget HTML a)
renderLine (coord /\ lines) dir =
  let
    newCoord = move coord dir
    newLine = makeLine coord newCoord
  in
    newCoord /\ newLine : lines

renderLines :: forall a. Model -> Array (Widget HTML a)
renderLines = snd <<< foldl renderLine (startCoord /\ []) <<< _.dirs

svgLines :: Model -> Signal HTML Model
svgLines init =
  loopW init \model -> do
    S.svg
      [ unit <$ P.onClick
      , S.width "500"
      , S.height "500"
      , S.viewBox "0 0 500 500"
      ]
      (renderLines model)
    pure $ update model

timer :: Model -> Signal HTML Model
timer init =
  loopW init \model -> do
    liftAff $ delay $ Milliseconds tickTime
    pure $ update model
    
signal :: Signal HTML Model
signal =
  loopS newModel \model -> do
    model' <- timer model
    svgLines model'
    
main :: Effect Unit
main = runWidgetInDom "main" $ dyn signal
