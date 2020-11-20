module Main where

import Prelude

import Concur.Core (Widget)
import Concur.VDom (HTML)
import Concur.VDom.GeometryRender (Context, render')
import Concur.VDom.Run (runWidgetInDom)
import Concur.VDom.Props (onMouseDown, onMouseMove, onMouseUp) as P
import Concur.VDom.SVG as S
import Data.Geometry.Plane (Point, Segment, point, segment)
import Data.Maybe (Maybe (..), maybe)
import Data.Int (toNumber)
import Effect (Effect)
import Web.UIEvent.MouseEvent ( pageX, pageY, fromEvent)

type State =  { marks :: Array Segment 
              , wasPressed :: Maybe Point
              } 

context :: Context
context = { stroke: "#000"
          , strokeWidth: 1.5
          , fill: "#00000000"
          , fontStyle: "italic 15px arial, sans-serif"
          , textFill: "#000"
          }

toText :: forall a. State -> Array (Widget HTML a)
toText { marks } =
  render' context marks
  
liveWidget :: State -> Widget HTML State
liveWidget state = do
  let fromMouse mouse = point "" (toNumber $ pageX mouse) 
                                  (toNumber $ pageY mouse) 
      wordStart ev =
        maybe state 
              (\ mouse -> 
                state { wasPressed = 
                          Just $ fromMouse mouse
                      }
              )
              $ fromEvent ev
              
      isWriting ev = 
        maybe state 
              (\ mouse ->
                let isPressed = fromMouse mouse
                in state { marks = 
                            maybe state.marks 
                                  (\was -> state.marks 
                                          <> [ segment was isPressed Nothing ]
                                  )
                                  state.wasPressed
                         , wasPressed = maybe Nothing 
                                              (const $ Just isPressed)
                                              state.wasPressed
                         }
                )
                $ fromEvent ev
                
      wordEnd = state { wasPressed = Nothing }
                            
        
  newState <- S.svg 
    [ S.attr "position" "fixed"
    , S.attr "top" "0"
    , S.attr "left" "0"
    , S.width "100%"
    , S.height "100%"
    , S.attr "viewBox" "0 0 3000 3000"
    , isWriting <$> P.onMouseMove
    , wordStart <$> P.onMouseDown
    , wordEnd  <$ P.onMouseUp  
    ] $ toText state
  liveWidget newState
    
initialState = { marks: [] 
               , wasPressed: Nothing
               } :: State

main :: Effect Unit
main = runWidgetInDom "main"
          $ liveWidget initialState

