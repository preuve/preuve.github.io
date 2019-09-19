module KaTeX(module KaTeX) where

import Prelude
import Effect (Effect)
import Graphics.Canvas (CanvasElement)

foreign import setAttribute :: 
  String -> String -> CanvasElement -> Effect Unit

foreign import setBodyBackground :: String -> Effect Unit
foreign import setTitle :: String -> Effect Unit
foreign import render :: String -> Effect Unit
foreign import renderIn :: forall location. location -> String -> Effect Unit
foreign import equation :: String -> Effect Unit
foreign import raw :: String -> Effect Unit
foreign import rawIn :: forall location. location -> String -> Effect Unit
foreign import newLine :: Unit -> Effect Unit
foreign import newLineIn :: forall location. location -> Unit -> Effect Unit

newline :: Effect Unit
newline = newLine unit

newlineIn :: forall location. location -> Effect Unit
newlineIn loc = newLineIn loc unit

foreign import list :: forall a. Array (a -> Effect Unit) -> Effect Unit
foreign import cat :: forall a. Array (a -> Effect Unit) -> a -> Effect Unit

foreign import subrender :: forall a. String -> a -> Effect Unit
foreign import subraw :: forall a. String -> a  -> Effect Unit
