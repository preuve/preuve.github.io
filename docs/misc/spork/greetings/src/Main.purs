module Main where

import Prelude

import Effect (Effect)
import Spork.Html (Html)
import Spork.Html as H
import Spork.PureApp (PureApp)
import Spork.PureApp as PureApp
import Data.Maybe(Maybe(..))

type State = { name ∷ String }

data Action = UpdateName String

handleAction :: State -> Action -> State
handleAction {name} (UpdateName newName) = { name: newName }

render :: State -> Html Action
render state =
    H.div []
       [H.p []
           [H.text "What is your name?"] 
       , H.input [ H.type_ H.InputText
                 , H.onValueInput $ Just <<< UpdateName
                 ]
       , hello
       ]

    where
      hello = if state.name == ""
              then H.p [] []
              else H.p [] [ H.text $ "Hello " <> state.name ]

initialState ∷ State
initialState = { name: "" }


page ∷ PureApp State Action
page =  { update: handleAction
        , render
        , init: initialState
        }

main :: Effect Unit
main = void $ PureApp.makeWithSelector page "#app"
