module Main where

import Prelude

import Data.Either (Either(..))
import Effect (Effect)
import Effect.Console (log)
import Simple.JSON as JSON

type Type1 =
  { apple :: String
  , banana :: Array Int
  }

testType1 :: String
testType1 = """
{ "apple": "Hello"
, "banana": [ 1, 2, 3 ]
}
"""

testType1_fail :: String
testType1_fail = """
{ "apple": "Hello"
, "banana": [ 1, 2, true ]
}
"""

assertEqual :: forall a. Eq a => {expected :: a, actual :: a} -> Effect Unit
assertEqual rec = log $ show $ rec.expected == rec.actual

main :: Effect Unit
main = do
  case JSON.readJSON testType1 of
    Right (r :: Type1) -> do
      assertEqual { expected: r.apple, actual: "Hello"}
      assertEqual { expected: r.banana, actual: [ 1, 2, 3 ] }
    Left e -> do
      assertEqual { expected: "failed", actual: show e }

  case JSON.readJSON testType1_fail of
    Right (r :: Type1) -> do
      assertEqual { expected: r.apple, actual: "Hello"}
      assertEqual { expected: r.banana, actual: [ 1, 2, 3 ] }
    Left e -> do
      assertEqual { expected: "failed", actual: show e }
