module Main where

import Prelude

import Effect (Effect)
import Concur.Core (Widget)
import Concur.VDom (HTML)
import Nodes as D
import Handles as P
import Concur.VDom.Run (runWidgetInDom)

getGreeting :: Widget HTML String
getGreeting = D.div'
    [ "Hello" <$ D.button [P.onClick] [D.text "Say Hello"]
    , "Namaste" <$ D.button [P.onClick] [D.text "Say Namaste"]
    ]

showGreeting :: String -> Widget HTML Unit
showGreeting greeting = D.div'
  [ D.text (greeting <> " Sailor!")
  , void $ D.button [P.onClick] [D.text "restart"]
  ]
  
hello1 :: forall a. Widget HTML a
hello1 = do
  greeting <- getGreeting
  showGreeting greeting
  hello1

hello2 :: String -> forall a. Widget HTML a
hello2 prev = hello2 =<< D.div'
  [ D.text ("Previous greeting - " <> prev)
  , do
      greeting <- getGreeting
      showGreeting greeting
      pure greeting
  ]

helloWithPrev :: forall a. Widget HTML a
helloWithPrev = hello2 ""

main :: Effect Unit
main = do
  runWidgetInDom "main" $ hello2 ""