module Main where

import Prelude

import Effect (Effect)
import Spork.Html (Html)
import Spork.Html as H
import Spork.PureApp (PureApp)
import Spork.PureApp as PureApp
import Data.FoldableWithIndex(foldMapWithIndex)
import Data.Array(modifyAtIndices) as Array

type Index = Int

type State = 
  { counter :: Int
  , toggleButtons :: Array Boolean
  }

data Action = Inc | Dec | Toggle Index

update ∷ State → Action → State
update st = case _ of
  Inc → st {counter = st.counter + 1}
  Dec → st {counter = st.counter - 1}
  Toggle i -> st {toggleButtons = 
                   Array.modifyAtIndices [i] 
                                         not 
                                         st.toggleButtons}

render ∷ State → Html Action
render st =
  H.div []
    [ H.button
        [ H.onClick (H.always_ Inc) ]
        [ H.text "+" ]
    , H.button
        [ H.onClick (H.always_ Dec) ]
        [ H.text "-" ]
    , H.span []
        [ H.text (show st.counter)
        ]
    , H.div []
      (foldMapWithIndex (\i b ->
        [ H.button
          [ H.onClick (H.always_ (Toggle i))]
          [ H.text (show b)]
        ]
      ) st.toggleButtons)
    ]

init :: State
init = 
  { counter: 0
  , toggleButtons: [true, false, false, false, true]
  }

app ∷ PureApp State Action
app = { update, render, init}

main ∷ Effect Unit
main = void $ PureApp.makeWithSelector app "#app"
