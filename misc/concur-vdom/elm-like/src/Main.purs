module Main where

import Prelude

import Effect (Effect)
import Concur.Core (Widget)
import Concur.VDom (HTML)
import Nodes (text, div', button, input) as D
import Handles as P
import Concur.VDom.Run (runWidgetInDom)
import Concur.Core.Types (andd)
import Data.Traversable (traverse)

-- This is like Elm's State
type Form =
  { name :: String
  , rememberMe :: Boolean
  }

-- This is like Elm's Action
data FormAction
  = Name String
  | RememberMe Boolean
  | Submit

formWidget :: Form -> Widget HTML Form
formWidget form = do
  -- This is like Elm's view function
  res <- D.div'
    [ Name <$> D.input [ P._type "text"
                       , P.value form.name
                       , P.unsafeTargetValue <$> P.onChange]
    , RememberMe (not form.rememberMe) <$ D.input [ P._type "checkbox"
                                                  , P.checked form.rememberMe
                                                  , P.onChange]
    , Submit <$ D.button [P.onClick] [D.text "Submit"]
    ]
  -- This is like Elm's update function
  case res of
    Name s -> formWidget (form {name = s})
    RememberMe b -> formWidget (form {rememberMe = b})
    Submit -> pure form

forms :: Array Form
forms = [ {name: "Kagol", rememberMe: false}
        , {name: "Bedu", rememberMe: true}
        ]

multiFormWidget1 :: Array Form -> Widget HTML (Array Form)
multiFormWidget1 = traverse formWidget

multiFormWidget2 :: Array Form -> Widget HTML (Array Form)
multiFormWidget2 = andd <<< map formWidget

main :: Effect Unit
main = do
  runWidgetInDom "main" $ multiFormWidget2 forms