module Parser.Eval where

import Prelude
import Parser.Syntax (Expr(..), Binop(..), Unop(..), Lit(..), typeof)
import Parser.Error (Expect, typeMismatch, unknownValue)

import Data.Maybe (Maybe(..))
import Data.Map (Map, empty, lookup)
import Math (sqrt)
import Math (pow) as Math
import Data.Int (pow) as Int

class Powerable t where
  pow :: t -> t -> t

instance powerInt :: Powerable Int where
  pow = Int.pow

instance powerNumber :: Powerable Number where
  pow = Math.pow

type Env = Map String Expr

eval :: Env -> Expr -> Expect Expr
eval env = case _ of
  n@(Lit (Int _)) -> pure n
  b@(Lit (Bool _)) -> pure b
  x@(Lit (Float _)) -> pure x
  Var name -> case lookup name env of
    Just val -> pure val
    _ -> unknownValue name
  Binop op e1 e2 -> evalBinop env op e1 e2
  Unop op e -> evalUnop env op e

raiseInt :: Int -> Expect Expr
raiseInt = pure <<< Lit <<< Int

raiseFloat :: Number -> Expect Expr
raiseFloat = pure <<< Lit <<< Float

raiseBool :: Boolean -> Expect Expr
raiseBool = pure <<< Lit <<< Bool

evalBinop :: Env -> Binop -> Expr -> Expr -> Expect Expr
evalBinop env op e1 e2 = case op of
  Add -> evalArithBinop add env e1 e2
  Sub -> evalArithBinop sub env e1 e2
  Mul -> evalArithBinop mul env e1 e2
  Div -> evalArithBinop div env e1 e2
  Pow -> evalArithBinop pow env e1 e2
  Or -> evalOr env e1 e2
  Less -> evalLess env e1 e2
  Eql -> evalEql env e1 e2

type EvalBinop = Env -> Expr -> Expr -> Expect Expr

evalArithBinop :: (forall a. Ring a => Semiring a
                                    => EuclideanRing a
                                    => Powerable a => a -> a -> a) -> EvalBinop
evalArithBinop op env e1 e2 = case e1, e2 of
  Lit (Int n), Lit (Int m) -> raiseInt $ op n m
  Lit (Float x), Lit (Float y) -> raiseFloat $ op x y
  Lit t@(Bool _), _ -> typeMismatch t "numeric"
  _, Lit t@(Bool _) -> typeMismatch t "numeric"
  _, _ -> do
    e <- eval env e1
    e' <- eval env e2
    evalArithBinop op env e e'

evalOr :: EvalBinop
evalOr env e1 e2 = case e1, e2 of
  Lit (Bool p), Lit (Bool q) -> raiseBool $ p || q
  Lit t@(Int _), _ -> typeMismatch t "bool"
  _, Lit t@(Int _) -> typeMismatch t "bool"
  Lit t@(Float _), _ -> typeMismatch t "bool"
  _, Lit t@(Float _) -> typeMismatch t "bool"
  _, _ -> do
    e <- eval env e1
    e' <- eval env e2
    evalOr env e e'

evalLess :: EvalBinop
evalLess env e1 e2 = case e1, e2 of
  Lit (Int n), Lit (Int m) -> raiseBool $ n < m
  Lit (Float n), Lit (Float m) -> raiseBool $ n < m
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
  Sqrt -> evalSqrt env e

evalNot :: EvalUnop
evalNot env = case _ of
  Lit (Bool b) -> raiseBool $ not b
  Lit l -> typeMismatch l "bool"
  e -> eval env e >>= evalNot env

evalNegate :: EvalUnop
evalNegate env = case _ of
  Lit (Int n) -> raiseInt (-n)
  Lit (Float n) -> raiseFloat (-n)
  Lit l -> typeMismatch l "numeric"
  e -> eval env e >>= evalNegate env

evalSqrt :: EvalUnop
evalSqrt env = case _ of
  Lit (Float x) -> raiseFloat (sqrt x)
  Lit l -> typeMismatch l "float"
  e -> eval env e >>= evalSqrt env
