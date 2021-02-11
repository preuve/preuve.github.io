module Main where

import Prelude

import Control.Monad.Rec.Class (forever)
import Data.Const (Const)
import Data.Maybe (Maybe(..))
import Effect (Effect)
import Effect.Aff (Milliseconds(..))
import Effect.Aff as Aff
import Effect.Aff.Class (class MonadAff)
import Effect.Exception (error)
import Halogen as H
import Halogen.Aff as HA
import Halogen.HTML as HH
import Halogen.HTML.Events as HE
import Halogen.Query.EventSource (EventSource)
import Halogen.Query.EventSource (Finalizer(..), affEventSource, emit) as EventSource
import Halogen.VDom.Driver (runUI)
import Halogen.Svg.Elements (svg, circle, line, path, rect, text)
import Halogen.Svg.Attributes (cx, cy, d, dominant_baseline, fill, height, r,
  stroke, strokeWidth, text_anchor, transform, viewBox, width, x, x1, x2, y, y1,
  y2, D(Abs), Command(M, L), Color(RGB), TextAnchor(AnchorMiddle),
  Baseline(Central), Transform(Rotate))
import Math (pi)

timer :: forall m. MonadAff m => Action -> Number -> EventSource m Action
timer act period = EventSource.affEventSource \emitter -> do
  fiber <- Aff.forkAff $ forever do
    Aff.delay $ Milliseconds period
    EventSource.emit emitter act

  pure $ EventSource.Finalizer do
    Aff.killFiber (error "Event source finalized") fiber

main :: Effect Unit
main =
  HA.runHalogenAff do
    body <- HA.awaitBody
    void $ runUI page unit body

page ∷ forall m. MonadAff m => H.Component HH.HTML (Const Void) Unit Void m 
page = 
  H.mkComponent 
    { initialState
    , eval: H.mkEval $ H.defaultEval
      { initialize = Just Initialize
      , handleAction = handleAction 
      }
    , render
    }

data Action
  = Initialize
  | UpdateRadius
  | Tick1
  | Tick2

type State = 
  { radius :: Number 
  , angle1 :: Number
  , angle2 :: Number
  }

initialState ∷ Unit -> State
initialState n = 
  { radius: 40.0
  , angle1: 0.0
  , angle2: 0.0
  }

freq1 = 5.0 :: Number
freq2 = 1.5 :: Number

handleAction :: forall m
  .  MonadAff m 
  => Action -> H.HalogenM State Action () Void m Unit
handleAction ( Initialize ) = do
  void $ H.subscribe $ timer Tick1 freq1
  void $ H.subscribe $ timer Tick2 freq2
  
handleAction ( UpdateRadius ) = do
  st <- H.get
  H.modify_ _{radius = st.radius + 5.0}

handleAction ( Tick1 ) =
  H.modify_ \state -> state { angle1 = state.angle1 + 50.0 }
  
handleAction ( Tick2 ) =
  H.modify_ \state -> state { angle2 = state.angle2 + 50.0 }
  
render :: forall m. State -> H.ComponentHTML Action () m
render state = do
  svg
          [ viewBox 0.0 0.0 400.0 400.0
          , width 400.0
          , height 400.0
          , HE.onMouseDown (\mouseev -> 
                        Just UpdateRadius)
          ]
          [ circle
              [ cx 50.0
              , cy 50.0
              , r state.radius
              , fill $ Just $ RGB 255 255 0
              , stroke $ Just $ RGB 0 0 0
              ]
          , rect
              [ x 100.0
              , y 10.0
              , width 40.0
              , height 40.0
              , fill $ Just $ RGB 0 120 0
              , stroke $ Just $ RGB 0 0 0
              , transform $ [ Rotate (state.angle1 * pi / 180.0) 130.0 130.0 
                            , Rotate (state.angle2 * pi / 180.0) 100.0 10.0 
                            ]
              
              ]
          , line
              [ x1 20.0
              , y1 200.0
              , x2 200.0
              , y2 20.0
              , stroke $ Just $ RGB 0 0 255
              , strokeWidth 10.0
              ]
          , path
              [ d
                  [ Abs (M 200.0 40.0)
                  , Abs (L 240.0 40.0)
                  , Abs (L 240.0 80.0)
                  , Abs (L 280.0 80.0)
                  , Abs (L 280.0 120.0)
                  , Abs (L 320.0 120.0)
                  , Abs (L 320.0 160.0)
                  ]
              , fill Nothing
              , stroke $ Just $ RGB 255 0 0
              ]
          , text
              [ x 130.0
              , y 130.0
              , fill $ Just $ RGB 0 0 0
              , text_anchor AnchorMiddle
              , dominant_baseline Central
              , transform $ [ Rotate (-45.0) 130.0 130.0 ]
              ]
              [ HH.text "Welcome to Shapes Club"
              ]
          ]
