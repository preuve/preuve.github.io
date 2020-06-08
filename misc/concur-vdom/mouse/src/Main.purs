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

makeShape :: forall a. Model -> Array (Widget HTML a)
makeShape model = 
  let x /\ y = model.lastPosition
      _x = x - squareSide
      x_ = x + squareSide
      _y = y - squareSide
      y_ = y + squareSide
  in if model.pressed
       then [ makeLine (_x /\ _y) (_x /\ y_)
            , makeLine (_x /\ y_) (x_ /\ y_)
            , makeLine (x_ /\ y_) (x_ /\ _y)
            , makeLine (x_ /\ _y) (_x /\ _y)
            ]
       else [ makeLine (_x /\ _y) (_x /\ y_)
            , makeLine (_x /\ y_) (x /\ y)
            , makeLine (x /\ y)  (_x /\ _y)
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
              , (\ev ->
                  model { pressed = maybe model.pressed 
                                          (const true) 
                                          (fromEvent ev) }
                )  <$> P.onMouseDown
              , (\ev ->
                  model { pressed = maybe model.pressed 
                                          (const false) 
                                          (fromEvent ev) }
                )  <$> P.onMouseUp
              ]
                    $ makeShape model
  modelWidget newModel
    
main :: Effect Unit
main = runWidgetInDom "main" 
           $ modelWidget { pressed: false
                         , lastPosition: 200 /\ 200
                         }
