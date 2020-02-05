module Parser.Parser where

import Prelude

import Control.Alt ((<|>))
import Control.Lazy (fix)
import Data.Either (Either(..))
import Data.Identity (Identity)
import Parser.Error (Expect, parseError)
import Parser.Syntax (Lit(..), Expr(..), Binop(..), Unop(..), Cmd(..), (:=))
import Text.Parsing.Parser (ParseError(..), Parser, runParser)
import Text.Parsing.Parser.Combinators (try)
import Text.Parsing.Parser.Expr (OperatorTable, Assoc(..), Operator(..), buildExprParser)
import Parser.Token (token)

type P a = Parser String a

parens :: forall a. P a -> P a
parens = token.parens

reservedOp :: String -> P Unit
reservedOp = token.reservedOp

reserved :: String -> P Unit
reserved = token.reserved

identifier :: P String
identifier = token.identifier

int :: P Lit
int = Int <$> token.integer

float :: P Lit
float = Float <$> token.float

bool :: P Lit
bool = reserved "true" $> Bool true <|> reserved "false" $> Bool false

lit :: P Expr
lit = (try (Lit <$> float) <|> (Lit <$> int)) <|> (Lit <$> bool)

var :: P Expr
var = Var <$> identifier

term :: P Expr -> P Expr
term p = parens p <|> lit <|> var

table :: OperatorTable Identity String Expr
table =
  [ [ Prefix (reservedOp "~" $> Unop Not)
    , Prefix (reservedOp "-" $> Unop Negate)
    , Prefix (reservedOp "sqrt" $> Unop Sqrt) ]
  , [ Infix (reservedOp "^" $> Binop Pow) AssocRight ]
  , [ Infix (reservedOp "*" $> Binop Mul) AssocLeft
    , Infix (reservedOp "/" $> Binop Div) AssocLeft ]
  , [ Infix (reservedOp "+" $> Binop Add) AssocLeft
    , Infix (reservedOp "-" $> Binop Sub) AssocLeft ]
  , [ Infix (reservedOp "<" $> Binop Less) AssocRight
    , Infix (reservedOp "=" $> Binop Eql) AssocRight ]
  , [ Infix (reservedOp "||" $> Binop Or) AssocRight ] ]

expr :: P Expr
expr = fix allExprs
  where
    allExprs p = buildExprParser table (term p)

def :: P Cmd
def = do
  name <- identifier
  reservedOp ":="
  t <- expr
  pure (name := t)

evalExpr :: P Cmd
evalExpr = Eval <$> expr

cmd :: P Cmd
cmd = try def <|> evalExpr

parse :: String -> Expect Cmd
parse s = case runParser s cmd of
  Left (ParseError message pos) -> parseError message
  Right c -> pure c
