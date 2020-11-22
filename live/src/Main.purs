module Main where

import Prelude

import Color (lighten)
import Color.Scheme.MaterialDesign (blueGrey)
import Data.Int (toNumber)
import Data.Maybe (fromJust, maybe)
import Data.Set (Set, isEmpty)
import Effect (Effect)
import FRP.Behavior (Behavior, animate)
import FRP.Behavior.Mouse (buttons)
import FRP.Behavior.Mouse as Mouse
import FRP.Event.Mouse (Mouse, getMouse)
import Graphics.Canvas (getCanvasElementById, getCanvasHeight, getCanvasWidth, getContext2D, setCanvasHeight, setCanvasWidth)
import Graphics.Drawing (Drawing, circle, lineWidth, outlineColor, outlined, render, scale, translate)
import Partial.Unsafe (unsafePartial)

type Circle = { x :: Number, y :: Number}

scene :: Mouse -> { w :: Number, h :: Number } -> Behavior Drawing
scene mouse { w, h } = renderCircle <$> buttons mouse <*> disk where
  
  scaleFactor :: Number
  scaleFactor = max w h / 16.0

  renderCircle :: Set Int -> Circle -> Drawing
  renderCircle bs { x, y} =
    let cursor =
          scale scaleFactor scaleFactor <<< translate x y <<< scale 1.0 1.0 $
            outlined
              (outlineColor (lighten (0.2 + 1.0 * 0.2) blueGrey) <> lineWidth ((1.0 + 1.0 * 2.0) / scaleFactor))
              (circle 0.0 0.0 0.5)
     in if isEmpty bs then mempty
        else cursor

  disk :: Behavior Circle
  disk = toCircle <$> Mouse.position mouse where
    toCircle m  = maybe {x:0.0,y:0.0} (\{x,y}->{x:toNumber x / scaleFactor,y:toNumber y / scaleFactor}) m

main :: Effect Unit
main = do
  mcanvas <- getCanvasElementById "canvas"
  let canvas = unsafePartial (fromJust mcanvas)
  ctx <- getContext2D canvas
  w <- getCanvasWidth canvas
  h <- getCanvasHeight canvas
  _ <- setCanvasWidth canvas w
  _ <- setCanvasHeight canvas h
  mouse <- getMouse
  _ <- animate (scene mouse { w, h }) (render ctx)
  pure unit
