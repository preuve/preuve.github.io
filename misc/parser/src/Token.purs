module Token where

import Control.Alt ((<|>))

import Text.Parsing.Parser.Token ( LanguageDef, GenLanguageDef(..), TokenParser
                                 , makeTokenParser, letter, alphaNum)
import Text.Parsing.Parser.String (char, oneOf)

languageDef :: LanguageDef
languageDef = LanguageDef
  { commentStart: ""
  , commentEnd: ""
  , commentLine: "#"
  , nestedComments: false
  , identStart: letter
  , identLetter: alphaNum <|> char '\''
  , opStart: oneOf ['-', ':', '+', '*', '/', '|', '=', '~', '<', '^']
  , opLetter: oneOf ['=', '|']
  , reservedNames: ["true", "false"]
  , reservedOpNames: [":=", "+", "-", "*", "/", "||", "=", "~", "<", "sqrt", "^"]
  , caseSensitive: true
}

token :: TokenParser
token = makeTokenParser languageDef
