module KaTeX(module KaTeX) where

import Prelude
import Effect (Effect)
import Graphics.Canvas (CanvasElement)

foreign import setAttribute :: 
  String -> String -> CanvasElement -> Effect Unit

foreign import setBodyBackground :: String -> Effect Unit
foreign import setTitle :: String -> Effect Unit
foreign import render :: String -> Effect Unit
foreign import equation :: String -> Effect Unit
foreign import raw :: String -> Effect Unit
foreign import newLine :: Unit -> Effect Unit

newline :: Effect Unit
newline = newLine unit

foreign import list :: forall a. Array (a -> Effect Unit) -> Effect Unit
foreign import cat :: forall a. Array (a -> Effect Unit) -> a -> Effect Unit

foreign import subrender :: forall a. String -> a -> Effect Unit
foreign import subraw :: forall a. String -> a  -> Effect Unit
