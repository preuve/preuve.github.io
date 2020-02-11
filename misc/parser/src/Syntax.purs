module Syntax where

import Prelude

data Expr = Lit Lit
          | Var Name
          | Binop Binop Expr Expr
          | Unop Unop Expr

type Name = String

data Binop = Add | Sub | Mul | Div | Pow | Less | Eql | Or

data Unop = Negate | Not | Sqrt

data Lit = Int Int | Bool Boolean | Float Number

instance showLit :: Show Lit where
  show (Int n) = show n
  show (Bool b) = show b
  show (Float x) = show x

instance showExpr :: Show Expr where
  show (Lit l) = show l
  show (Var n) = n
  show (Binop op e1 e2) = show e1 <> show op <> show e2
  show (Unop op e1) = show op <> show e1

instance showBinop :: Show Binop where
  show Add = " + "
  show Sub = " - "
  show Mul = "*"
  show Div = "/"
  show Pow = "^"
  show Less = " < "
  show Eql = " = "
  show Or = " || "

instance showUnop :: Show Unop where
  show Negate = "-"
  show Sqrt = "sqrt"
  show Not = "~"

derive instance eqExpr :: Eq Expr
derive instance eqBinop :: Eq Binop
derive instance eqUnop :: Eq Unop
derive instance eqLit :: Eq Lit

data Cmd = Assign Name Expr | Eval Expr

infix 0 Assign as :=

typeof :: Lit -> String
typeof (Int _) = "int"
typeof (Bool _) = "bool"
typeof (Float _) = "float"
