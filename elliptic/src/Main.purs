module Main where

import Prelude (Unit, ($), (<>), discard)
import Data.Foldable (fold)
import Data.Symbol (reflectSymbol, class IsSymbol)
import Effect (Effect)
import Effect.Console (log)
import Prim.Boolean (True, False)
import Prim.Int (class Add, class Mul, class ToString, class Compare)
import Prim.Ordering (EQ, GT, LT, Ordering)
import Type.Prelude (Proxy(..))

class Euclid :: Int -> Int -> Int -> Int -> Constraint
class Compare d 0 GT <= Euclid n d q r | n d -> q r

instance 
  ( Compare d 0 GT
  , Compare n (-1) gt
  , Compare n d lt
  , GoEuclid n d gt lt q r
  ) => Euclid n d q r

class GoEuclid :: Int -> Int -> Ordering -> Ordering -> Int -> Int -> Constraint  
class GoEuclid n d o0 o1 q r | n d o0 o1 -> q r

instance GoEuclid n d GT LT 0 n
instance 
  ( Add n d m
  , Compare m (-1) gt
  , GoEuclid m d gt LT q r
  , Add q1 1 q
  ) => GoEuclid n d LT LT q1 r
instance 
  ( Add m d n
  , Compare m d lt
  , GoEuclid m d GT lt q r
  , Add q 1 q1
  ) => GoEuclid n d GT GT q1 r 
instance Add d1 1 d => GoEuclid n d EQ _ord (-1) d1
else instance GoEuclid n d _ord EQ 1 0

class Bezout :: Int -> Int -> Int -> Int -> Int -> Int -> Constraint
class Bezout num den u _u v _v | num den -> u _u v _v

instance Bezout num 0 1 0 0 1
else instance
  ( Bezout den r a b c d
  , Euclid num den q r
  , Mul q c qc
  , Add aqc qc a
  , Mul q d qd
  , Add bqd qd b
  ) => Bezout num den c d aqc bqd 

data Point :: Type
data Point 

foreign import data P :: Int -> Int -> Point

class Double :: Int -> Int -> Point -> Point -> Constraint
class Double m a p1 p2 | m a p1 -> p2

instance
  ( Mul y 2 y2
  , Bezout y2 m u _u v _v
  , Mul x x xsq
  , Mul xsq 3 xsq3
  , Add xsq3 a xsq3a
  , Mul xsq3a u l
  , Euclid l m ___q rl
  , Mul x 2 x2
  , Mul rl rl lsq
  , Add z x2 lsq
  , Add xz z x
  , Mul rl xz lxz
  , Add t y lxz
  , Euclid z m _q rz
  , Euclid t m __q rt
  ) => Double m a (P x y) (P rz rt) 

class Sum :: Int -> Point -> Point -> Point -> Constraint
class Sum m p0 p1 p2 | m p0 p1 -> p2

instance
  ( Add x0 dx x1
  , Bezout dx m u _u v _v
  , Add y0 dy y1
  , Mul dy u l
  , Euclid l m ___q rl
  , Add x0 x1 x
  , Mul rl rl lsq
  , Add x2 x lsq
  , Add xx x2 x0
  , Mul rl xx lxx
  , Add y2 y0 lxx
  , Euclid x2 m _q rx
  , Euclid y2 m __q ry
  ) => Sum m (P x0 y0) (P x1 y1) (P rx ry)

class Sums :: Int -> Int -> Int -> Point -> Point -> Constraint
class Sums m a n p1 pn | m a n p1 -> pn
instance Sums m a 1 p1 p1
else instance 
  ( Double m a p1 p2
  ) => Sums m a 2 p1 p2
else instance 
  ( Double m a p1 p2
  , Sum m p1 p2 p
  ) => Sums m a 3 p1 p
else instance 
  ( Add n1 1 n
  , Sums m a n1 p1 pn1
  , Sum m pn1 p1 pn 
  ) => Sums m a n p1 pn

class Order :: Int -> Int -> Point -> Int -> Constraint
class Order m a p1 o | m a p1 -> o

class GoOrder :: Int -> Int -> Point -> Int -> Int -> Int -> Constraint
class GoOrder m a p1 d o i | m a p1 d i -> o

instance
  ( Sums m a 2 (P x1 y1) (P x y)
  , Add x1 dx x
  , GoOrder m a (P x1 y1) dx 2 o
  ) => Order m a (P x1 y1)  o

instance GoOrder m a p1 0 o o
else instance
  ( Add i 1 i1
  , Sums m a i (P x1 y1) (P x y)
  , Add x1 dx x
  , GoOrder m a (P x1 y1)  dx i1 o
  ) => GoOrder m a (P x1 y1)  _dx  i o

line :: forall i s
  . ToString i s 
  => IsSymbol s 
  => (String -> String) 
  -> Proxy i 
  -> Effect Unit
line f _ = log $ f $ (reflectSymbol :: Proxy s -> String) Proxy

class Fst :: Point -> Int -> Constraint
class Fst p x
instance Fst (P x y) x

class Snd :: Point -> Int -> Constraint
class Snd p x
instance Snd (P x y) y

line2 :: forall i j s t
  . ToString i s 
  => Fst (P i j) i
  => Snd (P i j) j
  => IsSymbol s 
  => ToString j t 
  => IsSymbol t
  => (String -> String)
  -> Proxy (P i j)
  -> Effect Unit
line2 f _ = log $ f $ 
    "("
    <>(reflectSymbol :: Proxy s -> String) Proxy 
    <> ", " 
    <> (reflectSymbol :: Proxy t -> String) Proxy 
    <> ")"
  

main :: Effect Unit
main = do
  --line2 ("" <> _)  $ (Proxy :: forall z t. Sums 17 (0) 17 (P 15 13) (P z t) => Proxy (P z t)) 
  --line ("" <> _)  $ ( Proxy :: forall o. Order 11 (-5) (P 0 10) o => Proxy o)
  line ("" <> _)  $ ( Proxy :: forall o. Order 11 (-5) (P 0 4) o => Proxy o)
    
    {-
    line2 ("" <> _) $ (Proxy :: forall z t. Double 29 (-3) 0 2 z t => Proxy (P z t)) 
    , line2 ("2:" <> _)  $ (Proxy :: forall z t. Double 17 (0) 15 13 z t => Proxy (P z t)) 
    , line2 ("3:" <> _)  $ (Proxy :: forall z t. Sum 17 15 13 2 10 z t => Proxy (P z t)) 
    , line2 ("4:" <> _)  $ (Proxy :: forall z t. Sum 17 15 13 8 3 z t => Proxy (P z t)) 
    , line2 ("5:" <> _)  $ (Proxy :: forall z t. Sum 17 15 13 12 1 z t => Proxy (P z t)) 
    , line2 ("6:" <> _)  $ (Proxy :: forall z t. Sum 17 15 13 6 6 z t => Proxy (P z t)) 
    , line2 ("7:" <> _)  $ (Proxy :: forall z t. Sum 17 15 13 5 8 z t => Proxy (P z t)) 
    , line2 ("8:" <> _)  $ (Proxy :: forall z t. Sum 17 15 13 10 15 z t => Proxy (P z t)) 
    , line2 ("9:" <> _)  $ (Proxy :: forall z t. Sum 17 15 13 1 12 z t => Proxy (P z t)) 
    , line2 ("10:" <> _)  $ (Proxy :: forall z t. Sum 17 15 13 3 0 z t => Proxy (P z t)) 
    , line2 ("11:" <> _)  $ (Proxy :: forall z t. Sum 17 15 13 1 5 z t => Proxy (P z t)) 
    , line2 ("12:" <> _)  $ (Proxy :: forall z t. Sum 17 15 13 10 2 z t => Proxy (P z t)) 
    , line2 ("13:" <> _)  $ (Proxy :: forall z t. Sum 17 15 13 5 9 z t => Proxy (P z t)) 
    , line2 ("14:" <> _)  $ (Proxy :: forall z t. Sum 17 15 13 6 11 z t => Proxy (P z t)) 
    , line2 ("15:" <> _)  $ (Proxy :: forall z t. Sum 17 15 13 12 16 z t => Proxy (P z t)) 
    , line2 ("16:" <> _)  $ (Proxy :: forall z t. Sum 17 15 13 8 14 z t => Proxy (P z t)) 
    , line2 ("17:" <> _)  $ (Proxy :: forall z t. Sum 17 15 13 2 7 z t => Proxy (P z t)) 
    , line2 ("" <> _)  $ (Proxy :: forall z t. Double 17 (0 ) 6 11 z t => Proxy (P z t)) 
    , line2 ("" <> _)  $ (Proxy :: forall z t. Sum 17 15 4 10 2 z t => Proxy (P z t)) 
    
    -}
    

 
