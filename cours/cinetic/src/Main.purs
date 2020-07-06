module Main where

import Prelude

import Concur.Core (Widget)
import Concur.Core.FRP (dyn, loopW, display)
import Concur.VDom (HTML)
import Concur.VDom.DOM (text) as D
import Concur.VDom.Props as P
import Concur.VDom.Run (runWidgetInDom)
import Concur.VDom.SVG as S
import Control.Alt ((<|>))
import Data.Array (concat, uncons, zipWith)
import Data.Int (toNumber, round)
import Data.Maybe (maybe)
import Data.Time.Duration (Milliseconds(..))
import Data.Tuple.Nested ((/\))
import Effect (Effect)
import Effect.Aff (delay)
import Effect.Aff.Class (liftAff)
import Math (sqrt)
import Shape (Coord, Shape, evolve, toDrawable, toDynamicState)
import Web.UIEvent.MouseEvent (pageX, pageY, fromEvent)

ticker :: Model -> Widget HTML Model
ticker m = do
  liftAff $ delay $ Milliseconds 50.0
  case m.baton of
    0 -> pure $ m {tick = m.tick + 10, baton = 1}
    _ -> pure $ m {shapes = evolve m.shapes, baton = 0}

type Model
  = { pressed :: Boolean
    , shapes :: Array Shape
    , lastReferencePosition :: Coord
    , lastDependantPosition :: Coord
    , tick :: Int
    , baton :: Int
    }

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

closed :: forall a. Array a -> Array a
closed xs =
  maybe [] (\{head, tail} -> xs <> [head]) (uncons xs)

makeLines :: forall a. Array Coord -> Array (Widget HTML a)
makeLines xs =
  maybe []
        (\ {head, tail} -> zipWith makeLine xs tail)
        (uncons xs)

svgLines :: Model -> Widget HTML Model
svgLines model = do
  S.svg
      [ S.width "500"
      , S.height "500"
      , (\ev ->
          maybe model
                (\mouse ->
                   let a'0 /\ b'0 = pageX mouse /\ pageY mouse
                       p0 /\ q0 = model.lastDependantPosition
                       a0 /\ b0 = model.lastReferencePosition
                       a' /\ b' = (a'0 - a0) /\ (b'0 - b0)
                       p /\ q = (p0 - a0) /\ (q0 - b0)
                       den2 = toNumber $ (a' - p) * (a' - p) + (b' - q) * (b' - q)
                       x = a0 + a' - (round $ (shapeSide * (toNumber $ a' - p)) / sqrt den2)
                       y = b0 + b' - (round $ (shapeSide * (toNumber $ b' - q)) / sqrt den2)
                     in model { lastReferencePosition = a'0 /\ b'0
                              , lastDependantPosition = x /\ y
                              }
                )
                (fromEvent ev)
        )  <$> P.onMouseMove
      , model { pressed = true} <$ P.onMouseDown
      , model { pressed = false } <$ P.onMouseUp
      ]
            $ [makeLine model.lastReferencePosition model.lastDependantPosition]
            <> (concat $ (makeLines <<< closed <<< toDrawable) <$> model.shapes)

modelWidget :: Model -> Widget HTML Model
modelWidget model = dyn do
  m <- loopW model $ \ m' -> ticker m' <|> svgLines m'

  display $ D.text $ show m.tick

shapeSide = 20.0 :: Number

shapesInit :: Array Shape
shapesInit = [
  let state =
        { center: 200 /\ 200
        , orientation: 0.0
        , tops:  [ (-3) /\ (-1)
                 , 3 /\ (-1)
                 , 4 /\ 0
                 , 3 /\ 1
                 , (-3) /\ 1
                 , (-2) /\ 0
                 ]
        }
  in {stable: state, fugitive: toDynamicState state, size: shapeSide}
  ]

main :: Effect Unit
main = runWidgetInDom "main"
           $ modelWidget { pressed: false
                         , lastReferencePosition: 200 /\ 200
                         , lastDependantPosition: 250 /\ 200
                         , tick: 0
                         , shapes: shapesInit
                         , baton: 0
                         }
