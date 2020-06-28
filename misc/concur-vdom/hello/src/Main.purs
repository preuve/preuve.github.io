module Main where

import Prelude

import Effect (Effect)
import Concur.Core (Widget)
import Concur.VDom (HTML)
import Concur.VDom.Props as P
import Concur.VDom.DOM (text, div', button, button') as D
import Concur.VDom.Run (runWidgetInDom)
import Control.Alt ((<|>))
import Control.MultiAlternative (orr)

hello1 :: forall a. Widget HTML a
hello1 = D.button' [D.text "Hello Sailor!"]

hello2 :: forall a. Widget HTML a
hello2 = D.div'
  [ D.button' [D.text "Ahoy Port!"]
  , D.button' [D.text "Ahoy Starboard!"]
  ]

hello3 :: forall a. Widget HTML a
hello3 = D.div'
  [ D.div'
      [ D.button' [D.text "Ahoy Port!"] ]
  , D.div'
      [ D.button' [D.text "Ahoy Starboard!"] ]
  ]

hello4 :: forall a. Widget HTML a
hello4 = do
  void $ D.button [P.onClick] [D.text "Say Hello"]
  D.text "Hello Sailor!"

hello5 :: forall a. Widget HTML a
hello5 = do
  void $ D.button [P.onClick] [D.text "Say Hello"]
  D.button' [D.text "Hello Sailor!"]

hello6 :: forall a. Widget HTML a
hello6 = do
  greeting <- D.div'
    [ "Hello" <$ D.button [P.onClick] [D.text "Say Hello"]
    , "Namaste" <$ D.button [P.onClick] [D.text "Say Namaste"]
    ]
  D.text (greeting <> " Sailor!")

hello7 :: forall a. Widget HTML a
hello7 =
  D.button' [D.text "Ahoy Port!"]
    <|>
  D.button' [D.text "Ahoy Starboard!"]

hello8 :: forall a. Widget HTML a
hello8 = orr
  [ D.button' [D.text "Ahoy Port!"]
  , D.button' [D.text "Ahoy Starboard!"]
  , D.button' [D.text "One more button!"]
  ]
  
main :: Effect Unit
main = do
    runWidgetInDom "main" hello8