module Eval where

import Prelude
import Syntax (Expr(..), Binop(..), Unop(..), Lit(..), typeof)
import Error (Expect, typeMismatch, unknownValue)

import Data.Maybe (Maybe(..))
import Data.Map (Map, empty, lookup)

type Env = Map String Expr

initEnv :: Env
initEnv = empty

eval :: Env -> Expr -> Expect Expr
eval env = case _ of
  n@(Lit (Int _)) -> pure n
  b@(Lit (Bool _)) -> pure b
  Var name -> case lookup name env of
    Just val -> pure val
    _ -> unknownValue name
  Binop op e1 e2 -> evalBinop env op e1 e2
  Unop op e -> evalUnop env op e

raiseInt :: Int -> Expect Expr
raiseInt = pure <<< Lit <<< Int

raiseBool :: Boolean -> Expect Expr
raiseBool = pure <<< Lit <<< Bool

evalBinop :: Env -> Binop -> Expr -> Expr -> Expect Expr
evalBinop env op e1 e2 = case op of
  Add -> evalArithBinop add env e1 e2
  Sub -> evalArithBinop sub env e1 e2
  Mul -> evalArithBinop mul env e1 e2
  Div -> evalArithBinop div env e1 e2
  Or -> evalOr env e1 e2
  Less -> evalLess env e1 e2
  Eql -> evalEql env e1 e2

type EvalBinop = Env -> Expr -> Expr -> Expect Expr

evalArithBinop :: (Int -> Int -> Int) -> EvalBinop
evalArithBinop op env e1 e2 = case e1, e2 of
  Lit (Int n), Lit (Int m) -> raiseInt $ op n m
  Lit t@(Bool _), _ -> typeMismatch t "int"
  _, Lit t@(Bool _) -> typeMismatch t "int"
  _, _ -> do
    e <- eval env e1
    e' <- eval env e2
    evalArithBinop op env e e'

evalOr :: EvalBinop
evalOr env e1 e2 = case e1, e2 of
  Lit (Bool p), Lit (Bool q) -> raiseBool $ p || q
  Lit t@(Int _), _ -> typeMismatch t "bool"
  _, Lit t@(Int _) -> typeMismatch t "bool"
  _, _ -> do
    e <- eval env e1
    e' <- eval env e2
    evalOr env e e'

evalLess :: EvalBinop
evalLess env e1 e2 = case e1, e2 of
  Lit (Int n), Lit (Int m) -> raiseBool $ n < m
  Lit (Bool p), Lit (Bool q) -> raiseBool $ p < q
  Lit t1, Lit t2 -> typeMismatch t2 $ typeof t1
  _, _ -> do
    e <- eval env e1
    e' <- eval env e2
    evalLess env e e'

evalEql :: EvalBinop
evalEql env e1 e2 = case e1, e2 of
  Lit x, Lit y -> raiseBool $ x == y
  _, _ -> do
    e <- eval env e1
    e' <- eval env e2
    evalEql env e e'

type EvalUnop = Env -> Expr -> Expect Expr

evalUnop :: Env -> Unop -> Expr -> Expect Expr
evalUnop env op e = case op of
  Not -> evalNot env e
  Negate -> evalNegate env e

evalNot :: EvalUnop
evalNot env = case _ of
  Lit (Bool b) -> raiseBool $ not b
  Lit l -> typeMismatch l "bool"
  e -> eval env e >>= evalNot env

evalNegate :: EvalUnop
evalNegate env = case _ of
  Lit (Int n) -> raiseInt (-n)
  Lit l -> typeMismatch l "int"
  e -> eval env e >>= evalNegate env
