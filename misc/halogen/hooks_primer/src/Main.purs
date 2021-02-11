module Main where

import Prelude

import Control.Monad.Rec.Class (forever)
import Data.Const (Const)
import Data.Maybe (Maybe(..))
import Data.Tuple.Nested ((/\))
import Effect (Effect)
import Effect.Class (class MonadEffect, liftEffect)
import Effect.Aff (Milliseconds(..))
import Effect.Aff as Aff
import Effect.Aff.Class (class MonadAff)
import Effect.Exception (error)
import Halogen as H
import Halogen.Aff as HA
import Halogen.HTML as HH
import Halogen.HTML.Events as HE
--import Halogen.HTML.Properties as HP
import Halogen.Query.EventSource (EventSource)
import Halogen.Query.EventSource (Finalizer(..), affEventSource, emit) as EventSource
import Halogen.Hooks as Hooks
import Halogen.VDom.Driver (runUI)

--page :: forall m. MonadAff m => H.Component HH.HTML (Const Void) Unit Void m 
page = Hooks.component \_ _ -> Hooks.do
  count /\ countId <- Hooks.useState 0
  tick /\ tickId <- Hooks.useState false
  
  Hooks.useLifecycleEffect do
    
    _ <- Hooks.subscribe do
      EventSource.affEventSource \emitter -> do
        fiber <- Aff.forkAff $ forever do
          Aff.delay $ Milliseconds 500.0
          --EventSource.emit emitter act
          _ <-  Hooks.put tickId (not tick)
          pure mempty

        pure $ EventSource.Finalizer do
          void $ Aff.killFiber (error "Event source finalized") fiber
    pure mempty    

  Hooks.pure do
    HH.div_ 
      [ HH.label_ [ HH.text "minimal component" ]
      , HH.p_ [ HH.text "can have multiple tags" ]
      , HH.button [ HE.onClick $ const $ Just $ Hooks.modify_ countId (_ + 1) ] 
                  [ HH.text $ show count] 
      , HH.label_ [ HH.text $ show tick ]
      ]

main :: Effect Unit
main = HA.runHalogenAff $
       HA.awaitBody >>= runUI page unit
