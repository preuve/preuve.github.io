module Main where

import Prelude

import Data.Either (Either(..), either)
import Data.Lens (_Right, over)
import Data.Maybe (Maybe(..))
import Data.Tuple.Nested ((/\))
import Effect (Effect)
import Effect.Class (class MonadEffect)
import Hooks.UseLocalStorage (Key(..), useLocalStorage)
import Halogen as H
import Halogen.Aff as HA
import Halogen.HTML as HH
import Halogen.HTML.Events as HE
import Halogen.Hooks as Hooks
import Halogen.VDom.Driver (runUI)
import Simple.JSON (readJSON, writeJSON)

localStorage :: forall q i o m. MonadEffect m => H.Component HH.HTML q i o m
localStorage = Hooks.component \_ _ -> Hooks.do
  state /\ modifyState <- useLocalStorage
    { defaultValue: 0
    , fromJson: readJSON
    , toJson: writeJSON
    , key: Key "intStorageExample"
    }

  let
    clearCount =
      modifyState \_ -> Right 0

    increment =
      modifyState (over _Right (_ + 1))

  Hooks.pure do
    HH.div
      [ ]
      [ HH.text "Click on the button to clear from local storage"
      , HH.button
          [ HE.onClick \_ -> Just clearCount ]
          [ HH.text "Clear" ]
      , HH.br_
      , HH.text $ "You have " <> either (\_  -> show "error") show state <> " at the intStorageExample key in local storage."
      , HH.button
          [ HE.onClick \_ -> Just increment ]
          [ HH.text "Increment" ]
      ]

main :: Effect Unit
main = HA.runHalogenAff do
  body <- HA.awaitBody
  runUI localStorage unit body

