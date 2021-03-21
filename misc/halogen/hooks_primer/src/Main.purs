module Main where

import Prelude

import Control.Monad.Rec.Class (forever)
import Data.Const (Const)
import Data.Maybe (Maybe(..))
import Data.Tuple.Nested ((/\))
import Effect (Effect)
import Effect.Aff (Milliseconds(..))
import Effect.Aff as Aff
import Effect.Aff.Class (class MonadAff, liftAff)
import Halogen as H
import Halogen.Aff as HA
import Halogen.HTML as HH
import Halogen.HTML.Events as HE
--import Halogen.HTML.Properties as HP
import Halogen.Hooks as Hooks
import Halogen.Subscription as HS
import Halogen.VDom.Driver (runUI)

page :: forall m. MonadAff m => H.Component (Const Void) Unit Void m 
page = Hooks.component \_ _ -> Hooks.do
  count /\ countId <- Hooks.useState 0
  tick /\ tickId <- Hooks.useState 0
  
  Hooks.useLifecycleEffect do

    { emitter, listener } <- H.liftEffect HS.create
    subId <- Hooks.subscribe emitter
    H.liftEffect $ HS.notify listener do
      void $ Hooks.fork $ forever do
        void $ liftAff $ Aff.delay $ Milliseconds 500.0
        t <- Hooks.get tickId
        Hooks.put tickId (t + 1)
    
    pure $ Just do
      Hooks.unsubscribe subId
    
  useTick countId { tick }
                                
  Hooks.pure do
    HH.div_ 
      [ HH.label_ [ HH.text "minimal component" ]
      , HH.p_ [ HH.text "can have multiple tags" ]
      , HH.button [ HE.onClick $ const $ Hooks.modify_ countId (_ + 1) ] 
                  [ HH.text $ show count] 
      , HH.label_ [ HH.text $ show tick ]
      ]
  where
    useTick countId deps@{ tick } = Hooks.captures deps Hooks.useTickEffect do
                              pure $ Just do
                                Hooks.put countId tick

main :: Effect Unit
main = HA.runHalogenAff $
       HA.awaitBody >>= runUI page unit
