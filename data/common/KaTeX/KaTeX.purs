module KaTeX where

import Prelude(Unit)
import Effect (Effect)
import Web.DOM (Element)

foreign import inline :: String -> Effect String
foreign import equation :: String -> Effect String
foreign import display :: String -> Element -> Effect Unit
foreign import render :: String -> Element -> Effect Unit
foreign import textMode :: String -> Element -> Effect Unit

