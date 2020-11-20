module Main where

import Prelude

import Color (rgb)
import Control.Alt (alt)
import Data.Int (toNumber)
import Data.List (List(..),  (:))
import Data.Maybe (Maybe (..), maybe)
import Effect (Effect)
import FRP.Event.Mouse(Mouse, down, up, move, getMouse, withPosition)
import FRP.Behavior (Behavior, animate, unfold)
import Graphics.Canvas (Context2D, getCanvasElementById, getContext2D
                       , getCanvasHeight, getCanvasWidth
                       , setCanvasHeight, setCanvasWidth
                       ,lineTo, moveTo, strokePath, beginPath, closePath, stroke)

type Point = { x :: Number, y :: Number }

type State =  { marks :: Effect (Effect Unit)
                          , wasPressed :: Maybe Point
                          } 

initialState = { marks: pure (pure unit)
                           , wasPressed: Nothing
                           } :: State

renderState :: State -> Effect Unit
renderState {  marks } = do 
                                                   _ <- marks
                                                   pure unit
  --let black = outlineColor $ rgb 0 0 0
     --in outlined black marks
   
scene ::  { w :: Number, h :: Number } -> Mouse -> Context2D -> Behavior (Effect Unit)
scene { w, h } mouse ctx = renderState <$> state
 where
   state :: Behavior State
   state = unfold 
      (\action st -> 
        case action of
          EndWord -> st { wasPressed = Nothing }
          StartWord p -> st { wasPressed = Just p }
          Write isPressed ->  
            st { marks =  maybe st.marks 
                                                  (\was -> pure $ strokePath ctx $ do
                                                                                moveTo ctx  was.x was.y 
                                                                                lineTo ctx isPressed.x isPressed.y
                                                                                closePath ctx
                                                                                
                                                                        -- st.marks
                                                           
                                                        
                                                  )
                                                 st.wasPressed
                       , wasPressed = maybe Nothing 
                                                  (const $ Just isPressed)
                                                  st.wasPressed
                       }
          Wait -> st
       )      ( ((StartWord <<< safePos) <$> withPosition mouse down)  
      `alt` (EndWord <$ up) 
      `alt` ((Write <<< number2) <$> move mouse) )
         initialState

data Action = Wait
                          | EndWord 
                          | StartWord Point
                          | Write Point
  
number2 ::  { x :: Int, y :: Int} ->  { x :: Number, y :: Number}
number2  { x: x', y: y'} =  {x: toNumber x', y: toNumber y'}

safePos :: forall r. { pos :: Maybe { x :: Int, y :: Int} | r} -> { x :: Number, y :: Number}
safePos {pos: Nothing} = {x: 0.0, y: 0.0}
safePos {pos: Just p } = number2 p

main :: Effect Unit
main = do
  mcanvas <- getCanvasElementById "canvas"
  case mcanvas of
    Just canvas -> do
          ctx <- getContext2D canvas
          --_ <- setCanvasWidth canvas 320.0
          --_ <- setCanvasHeight canvas 512.0
          w <- getCanvasWidth canvas
          h <- getCanvasHeight canvas
          mouse <- getMouse
          _  <- animate (scene { w, h } mouse ctx) identity
          pure unit
    _ -> pure unit
  pure unit
  
  
