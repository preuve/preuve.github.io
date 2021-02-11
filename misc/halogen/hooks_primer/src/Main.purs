module Main where

import Prelude

import Data.Const (Const)
import Effect (Effect)
import Effect.Class (class MonadEffect)
import Halogen as H
import Halogen.Aff as HA
import Halogen.Hooks as Hooks
import Halogen.HTML as HH
import Halogen.HTML.Events as HE
import Halogen.VDom.Driver (runUI)
import Halogen.HTML.Properties as HP

--page :: forall m. H.Component HH.HTML (Const Void) Unit Void m 
page = Hooks.component \_ _ -> Hooks.do
  Hooks.pure do
    HH.div_ 
      [ HH.label_ [ HH.text "minimal component"]
      , HH.p_ [ HH.text "can have multiple tags"]
      ]

main :: Effect Unit
main = HA.runHalogenAff $
       HA.awaitBody >>= runUI page unit
