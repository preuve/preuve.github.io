module Main where

import Prelude

import Effect (Effect)
import Spork.Html (Html)
import Spork.Html as H
import Spork.PureApp (PureApp)
import Spork.PureApp as PureApp

type State = Int

data Action = Inc | Dec

update ∷ State → Action → State
update i = case _ of
  Inc → i + 1
  Dec → i - 1

render ∷ State → Html Action
render i =
  H.div []
    [ H.button
        [ H.onClick (H.always_ Inc) ]
        [ H.text "+" ]
    , H.button
        [ H.onClick (H.always_ Dec) ]
        [ H.text "-" ]
    , H.span []
        [ H.text (show i)
        ]
    ]

app ∷ PureApp State Action
app = { update, render, init: 0 }

main ∷ Effect Unit
main = void $ PureApp.makeWithSelector app "#app"
