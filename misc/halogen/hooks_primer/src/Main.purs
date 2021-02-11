module Main where

import Prelude

import Data.Const (Const)
import Data.Maybe (Maybe(..))
import Data.Tuple.Nested ((/\))
import Effect (Effect)
import Effect.Class (class MonadEffect)
import Halogen as H
import Halogen.Aff as HA
import Halogen.HTML as HH
import Halogen.HTML.Events as HE
--import Halogen.HTML.Properties as HP
import Halogen.Hooks as Hooks
import Halogen.VDom.Driver (runUI)

page :: forall m. H.Component HH.HTML (Const Void) Unit Void m 
page = Hooks.component \_ _ -> Hooks.do
  count /\ countId <- Hooks.useState 0
  Hooks.pure do
    HH.div_ 
      [ HH.label_ [ HH.text "minimal component"]
      , HH.p_ [ HH.text "can have multiple tags"]
      , HH.button [HE.onClick $ const $ Just $ Hooks.modify_ countId (_ + 1)] [HH.text $ show count]
      ]

main :: Effect Unit
main = HA.runHalogenAff $
       HA.awaitBody >>= runUI page unit
