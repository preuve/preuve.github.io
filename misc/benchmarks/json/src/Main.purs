module Main where

import Prelude
import Effect (Effect)
import Data.Argonaut.Parser(jsonParser)
import Data.Argonaut.Decode(decodeJson)
import DOM.Editor as DOM
import Data.Either(Either)
import Data.Maybe(Maybe)

type User1 =
  { name :: String
  , age :: Maybe Int
  , team :: Maybe String
  }

type User2 = 
  { record :: Array { key1 :: Int
                    , key2 :: String}
  , status :: Boolean}

userJsonString :: String
userJsonString = """{ "name": "Tom", "age": 25, "team": null }"""

translate1 :: String -> Either String User1
translate1 str = decodeJson =<< jsonParser str

translate2 :: String -> Either String User2
translate2 str = decodeJson =<< jsonParser str


{-$ runExcept (decodeJSON  json :: F {record :: Array {key1 :: Int, key2 :: String}, status :: Boolean})-}

main :: Effect Unit
main = do
  setup <- DOM.setup
  
  label <- DOM.createElement "label" setup.document
  _ <- DOM.setTextContent ("From direct string: " 
                          <> (show $ translate1 userJsonString)) label
  _ <- DOM.appendChild label setup.body
  
  br <- DOM.createElement "br" setup.document
  _ <- DOM.appendChild br setup.body
  
  editor <- DOM.createElement "div" setup.document
  
  textArea <- DOM.createElement "textarea" setup.document
  _ <- DOM.setAttribute "cols" "80" textArea
  _ <- DOM.setAttribute "rows" "25" textArea
  _ <- DOM.appendChild textArea editor
 
  divdecode <- DOM.createElement "div" setup.document
  _ <- DOM.appendChild divdecode editor
  
  button <- DOM.createElement "button" setup.document
  _ <- DOM.setTextContent "Save" button
  _ <- DOM.appendChild button editor
  
  inputFile <- DOM.createElement "input" setup.document
  _ <- DOM.setAttribute "type" "file" inputFile
           
  _ <- DOM.addEventListener (\ev -> do
           DOM.withTextReader (\json -> do
             _ <- DOM.setTextContent json textArea
             _ <- DOM.setTextContent (show $ translate2 json) divdecode
             pure unit
             ) ev
           
           fileName <- DOM.fileName inputFile
           _ <- DOM.addEventListener (\_ev -> do
                      suffix <- DOM.dateTimeTag
                      setup.saveText textArea (suffix <> fileName) _ev
                  ) DOM.click button
           _ <- DOM.removeChild inputFile
           pure unit
       ) DOM.change inputFile
 
  _ <- DOM.appendChild inputFile setup.body
  _ <- DOM.appendChild editor setup.body
  pure unit


{-  
  logShow $ encodeJSON $ Just {fromJust:[1, 2, 3]}
  logShow $ runExcept (decodeJSON "{\"tag\":\"Just\",\"contents\":{\"fromJust\":[1,2,3]}}" :: F Maybe)  
  logShow $ encodeJSON Nothing
  logShow $ runExcept (decodeJSON "{\"tag\":\"Nothing\"}" :: F Maybe)

-}