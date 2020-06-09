module Main where

import Prelude

import Concur.Core (Widget)
--import Concur.Core.FRP (Signal, dyn, loopS, loopW)
import Concur.VDom (HTML)
import Handles as P
import Concur.VDom.Run (runWidgetInDom)
import Concur.VDom.SVG as S
import Data.Tuple.Nested ((/\), type (/\))
import Effect (Effect)
import Web.UIEvent.MouseEvent(pageX, pageY, fromEvent)
import Data.Maybe (maybe)
import Data.Array (uncons, zipWith)

type Coord
  = Int /\ Int

type Model
  = { pressed :: Boolean
    , lastPosition :: Coord
    }

makeLine :: forall a. Coord -> Coord -> Widget HTML a
makeLine (xa /\ ya) (xb /\ yb) =
  S.line
    [ S.unsafeMkProp "x1" xa
    , S.unsafeMkProp "x2" xb
    , S.unsafeMkProp "y1" ya
    , S.unsafeMkProp "y2" yb
    , S.stroke "#000000"
    , S.strokeWidth $ xa `mod`10
    ]
    []

squareSide = 50 :: Int

closed :: forall a. Array a -> Array a
closed xs = 
  maybe [] (\{head, tail} -> xs <> [head]) (uncons xs)

makeLines :: forall a. Array Coord -> Array (Widget HTML a)
makeLines xs = 
  maybe [] 
        (\ {head, tail} -> zipWith makeLine xs tail) 
        (uncons xs)

shapeSide = 50 :: Int

makeShape :: forall a. Model -> Array (Widget HTML a)
makeShape model = 
  let x /\ y = model.lastPosition
      _x = x - shapeSide
      x_ = x + shapeSide
      _y = y - shapeSide
      y_ = y + shapeSide
  in (makeLines <<< closed) 
    if model.pressed
       then [ _x /\ _y
            , _x /\ y_
            , x_ /\ y_
            , x_ /\ _y
            ]
        else  [ _x /\ _y
              , _x /\ y_
              , x /\ y
              ]

modelWidget :: Model -> Widget HTML Model
modelWidget model = do
  newModel <- S.svg 
              [ S.width "500"
              , S.height "500"
              , (\ev -> 
                 model { lastPosition = 
                          maybe model.lastPosition
                                (\mouse -> pageX mouse /\ pageY mouse)
                                (fromEvent ev)
                       }
                )  <$> P.onMouseMove
              , model { pressed = true } <$ P.onMouseDown
              , model { pressed = false } <$ P.onMouseUp
              ]
                    $ makeShape model
  modelWidget newModel
    
main :: Effect Unit
main = runWidgetInDom "main" 
           $ modelWidget { pressed: false
                         , lastPosition: 200 /\ 200
                         }
