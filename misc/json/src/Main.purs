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

testDecodeType1 :: String
testDecodeType1 = """
{ "apple": "Hello"
, "banana": [ 1, 2, 3 ]
}
"""

testDecodeType1_fail :: String
testDecodeType1_fail = """
{ "apple": "Hello"
, "banana": [ 1, 2, true ]
}
"""

testEncodeType1 :: Effect Unit
testEncodeType1 = do
  let myValue =
        { apple: "Hi"
        , banana: [ 1, 2, 3 ]
        } -- :: Type1

  log (JSON.writeJSON myValue)

type Type2 = {lemon :: Type1}

testDecodeType2 = """
  {"lemon": { "apple": "Hello"
          , "banana": [ 1, 2, 3 ]
          }
    }
  """ :: String

assertEqual :: forall a. Show a => Eq a => {expected :: a, actual :: a} -> Effect Unit
assertEqual rec = do
  if rec.expected == rec.actual
    then pure unit
    else log $ show rec.actual

main :: Effect Unit
main = do
  case JSON.readJSON testDecodeType1 of
    Right (r :: Type1) -> do
      assertEqual { expected: r.apple, actual: "Hello"}
      assertEqual { expected: r.banana, actual: [ 1, 2, 3 ] }
    Left e -> do
      assertEqual { expected: "failed", actual: show e }

  case JSON.readJSON testDecodeType1_fail of
    Right (r :: Type1) -> do
      assertEqual { expected: r.apple, actual: "Hello"}
      assertEqual { expected: r.banana, actual: [ 1, 2, 3 ] }
    Left e -> do
      assertEqual { expected: "failed", actual: show e }

  testEncodeType1

  case JSON.readJSON testDecodeType2 of
    Right (r :: Type2) -> do
      assertEqual { expected: r.lemon.apple, actual: "Hello"}
      assertEqual { expected: r.lemon.banana, actual: [ 1, 2, 3 ] }
    Left e -> do
      assertEqual { expected: "failed", actual: show e }
