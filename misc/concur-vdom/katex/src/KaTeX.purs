module KaTeX where

import Effect (Effect)

foreign import inline :: String -> Effect String
foreign import equation :: String -> Effect String
