module Main where

import Prelude

import Data.Either (Either(..))
import Data.Foldable (intercalate)
import Data.Map (alter, toUnfoldable)
import Data.Maybe (Maybe(..))
import Data.Tuple (Tuple(..))
import Effect (Effect)
import Effect.Console(log)
import Eval (Env, initEnv, eval)
import Parser (parse)
import Syntax (Cmd(..), (:=), Expr)

upsert :: Env -> String -> Expr -> Env
upsert e k v = alter f k e
  where
  f _ = Just v

pprint :: Env -> String
pprint e =
  let list :: Array (Tuple String Expr)
      list = toUnfoldable e
      untupled = map (\ (Tuple key val) -> key <> " := " <> show val) list
   in intercalate ", " untupled

evalCmd :: Env -> String -> Effect { env :: Env, str :: String }
evalCmd e input = case parse input of
  Left err -> pure { env: e, str: show err }
  Right (name := val) -> case eval e val of
    Left err -> pure { env: e, str: show err }
    Right expr -> do
      let env = upsert e name expr
      log $ pprint env <> "\n> "
      pure { env, str: name <> " defined" }
  Right (Eval expr) -> case eval e expr of
    Left err -> pure { env: e, str: show err }
    Right exp -> pure { env: e, str: "\x1b[34m" <> show exp <> "\x1b[0m" }

main :: Effect Unit
main = do
  let env = initEnv

  let input = " 2 + 2"
  { env, str } <- evalCmd env input
  log str

  let input = "x:=5"
  { env, str } <- evalCmd env input
  log str

  let input = "x*x"
  { env, str } <- evalCmd env input
  log str

  let input = "y:=7"
  { env, str } <- evalCmd env input
  log str

  let input = "x+y"
  { env, str } <- evalCmd env input
  log str

  let input = "3*(x-y)"
  { env, str } <- evalCmd env input
  log str
