module Main where

import Prelude
import Effect (Effect)
import Data.Maybe(Maybe(..))
import Graphics.Drawing(render) as Canvas
import Partial.Unsafe(unsafePartial)
import Graphics.Canvas (getCanvasElementById, getContext2D)
import Color (rgb)
import Graphics.Canvas.Geometry
import KaTeX

main :: Effect Unit
main = void $ unsafePartial do
  _ <- setBodyBackground "#635351"
  Just canvas <- getCanvasElementById "canvas"
  _ <- setAttribute "width" "400" canvas
  _ <- setAttribute "height" "600" canvas
  context2D <- getContext2D canvas
  
  let ctx = { color: rgb 195 194 199
            , lineWidth: 1.50}
  let draw :: forall a. DrawableSet a => a -> Effect Unit
      draw = Canvas.render context2D <<< drawIn ctx 
  
  pure unit
  
