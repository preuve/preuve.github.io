module Main where

import Prelude

import Affjax (post) as AX
import Affjax.RequestBody as RequestBody
import Affjax.ResponseFormat (json) as ResponseFormat
import Concur.Core (Widget)
import Concur.VDom (HTML)
import Concur.VDom.DOM (text, pre) as D
import Concur.VDom.Run (runWidgetInDom)
import Control.Alt ((<|>))
import Data.Argonaut.Core as J
import Data.Argonaut.Decode ((.:), decodeJson)
import Data.Array (singleton)
import Data.Either (Either(..), either)
import Data.Maybe (Maybe(..))
import Effect (Effect)
import Effect.Aff.Class (liftAff)

js :: J.Json -> Either String String
js json = do
  o <- decodeJson json
  trans <- o .: "js"
  Right trans

warnings :: J.Json -> Either String String
warnings json = do
  o <- decodeJson json
  trans <- o .: "warnings"
  Right $ J.stringify trans

code :: String
code = """
module Main where

import Prelude
import Effect (Effect)

main :: Effect Unit
main = pure unit

"""

fetchWidget :: (J.Json -> Either String String) -> Widget HTML String
fetchWidget f = do
  let url = "https://compile.purescript.org/compile"
  resp <- liftAff (
             AX.post ResponseFormat.json url (Just (RequestBody.string code))
              >>= either (const $ pure "invalid response") 
                    ( either (const $ pure "invalid structure") pure 
                      <<< f
                      <<< (_.body)
                    ) 
                  ) <|> D.text "Submitting code to api..."
  D.pre $ singleton $ D.text resp

main :: Effect Unit
main = do
  runWidgetInDom "main" $ fetchWidget js