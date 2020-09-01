module Main where

import Prelude
import Effect (Effect)
import Effect.Console (log)
import Data.Array (all)
import Text.Parsing.StringParser(runParser)
import Text.Parsing.StringParser.CodeUnits(alphaNum)
import Data.String.CodeUnits(toCharArray,singleton)
import Data.Either(Either(..))
import Data.Maybe(Maybe(..))
import Data.String(length)

isAlphaNum :: Char -> Boolean
isAlphaNum c = case runParser alphaNum (singleton c) of
  Left _ -> false
  Right _ -> true

allAlphaNum :: String -> Maybe String
allAlphaNum str = 
   if all isAlphaNum $ toCharArray str
     then Just str
     else Nothing

correctLen :: String -> Maybe String
correctLen str =
  let l = length str
  in if 5 < l && l < 50
      then Just str
      else Nothing

isValid :: String -> Maybe String
isValid = allAlphaNum <=< correctLen

main :: Effect Unit
main = do
  log $ show $ isValid "vhu84ShHgu"
  log $ show $ isValid "vhu"
  log $ show $ isValid "dsgr;erq"
  
