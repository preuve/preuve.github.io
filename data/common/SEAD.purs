module SEAD
  ( D (..)
  , Dual (..)
  , AddFun (..)
  , class Scalable
  , scale
  , class Cocartesian
  , inl
  , inr
  , jam
  , class Cartesian
  , dup
  , exl
  , exr
  , class Monoidal
  , cross
  , up
  , (.:.)
  , class RingCat
  , negateC
  , addC
  , mulC
  , constC
  , class NumCat
  , sinC
  , cosC
  , invC 
  , sqrtC 
  , expC 
  , logC 
  , asinC 
  , acosC
  ) where

import Prelude

import Data.Tuple (fst, snd, uncurry)
import Data.Tuple.Nested ((/\), type (/\))
import Math (sin, cos, sqrt, exp, log, asin, acos)
import Undefined (undefined)

class Category k <= Monoidal a b c d k where
  cross :: k a c -> k b d -> k (a /\ b) (c /\ d)

instance monoFun :: Monoidal a b c d (->) where
  cross f g = \ (a /\ b) -> f a /\ g b

class Category k <= Cartesian z k where
  exl :: forall a. k (a /\ z) a
  exr :: forall a. k (z /\ a) a
  dup :: k z (z /\ z)

instance cartFun :: Cartesian z (->) where
  exl = fst
  exr = snd
  dup x = x /\ x

up :: forall a c d k. Cartesian a k
                   => Monoidal a a c d k 
                   => k a c -> k a d -> k a (c /\ d)
up f g = cross f g <<< dup

infix 5 up as .:.

class Category k <= Cocartesian z k where
  inl :: forall a. k a (a /\ z)
  inr :: forall a. k a (z /\ a)
  jam :: k (z /\ z) z

grab :: forall k a b z
  .  Cocartesian z k
  => Monoidal a b z z k
  =>  k a z /\ k b z -> k (a /\ b) z
grab (f /\ g) = jam <<< cross f g

ungrab :: forall z a b k
    .  Cocartesian b k
    => Cocartesian a k => k (a /\ b) z -> k a z /\ k b z
ungrab h = (h <<< inl) /\ (h <<< inr) 

class Scalable k a where
  scale :: a -> k a a

class Ring z <= RingCat k z where
  negateC :: k z z
  addC :: k (z /\ z) z
  mulC :: k (z /\ z) z
  constC :: z -> k z z

instance rcFun :: Ring z => RingCat (->) z where
  negateC = negate
  addC = uncurry (+)
  mulC = uncurry (*)
  constC c = const c
  
newtype AddFun a b = AddFun (a -> b)

instance sgAdd :: Semigroupoid AddFun where
  compose (AddFun g ) (AddFun f) = AddFun (compose g f)
  
instance catAdd :: Category AddFun where
  identity = AddFun identity
  
instance monoAdd :: Monoidal a b c d AddFun where
  cross (AddFun f) (AddFun g) = AddFun $ cross f g

instance cartAdd :: Cartesian z AddFun where
  exl = AddFun exl
  exr = AddFun exr
  dup = AddFun dup

instance cocartAdd:: Semiring z => Cocartesian z AddFun where
  inl = AddFun $ \ a -> a /\ zero 
  inr = AddFun $ \ b -> zero /\ b
  jam = AddFun $ \ (a /\ b) -> a + b

instance scalAdd :: Semiring z => Scalable AddFun z where
  scale a = AddFun \ da -> a * da

instance rcAdd :: Ring z => RingCat AddFun z where
  negateC = AddFun negateC
  addC = AddFun addC
  mulC = AddFun mulC
  constC c = AddFun (constC c)

newtype D k a b = D (a -> b /\ k a b)

linearD :: forall a b k. (a -> b) -> k a b -> D k a b
linearD f f' = D $ \a -> f a /\ f'

instance sgD :: Semigroupoid k => Semigroupoid (D k) where
  compose (D g) (D f) = D $ \ a ->
    let b /\ f' = f a
        c /\ g' = g b
      in c /\ compose g' f'

instance catD :: Category k => Category (D k) where
  identity = linearD identity identity

instance monoD :: 
  Monoidal a b c d k => Monoidal a b c d (D k) where
  cross (D f) (D g) = D \ (a /\ b) -> 
    let c /\ f' = f a
        d /\ g' = g b
    in (c /\ d) /\ cross f' g'

instance cartD :: Cartesian z k => Cartesian z (D k) where
  exl = linearD exl exl
  exr = linearD exr exr
  dup = linearD dup dup

--instance scaleD :: Scalable (D (Dual AddFun)) Number where
--  scale x = D $ \a -> (a*x) /\ scale x 

instance rcD ::
  ( Scalable k z
  , RingCat k z
  , Cocartesian z k
  , Monoidal z z z z k
  ) => RingCat (D k) z where
  negateC = linearD negateC negateC
  addC = linearD addC addC
  mulC = D $ \ (a /\ b) -> (a * b) /\ grab (scale b /\ scale a)
  constC c = D $ \ a -> c /\ scale zero

class NumCat k where
  sinC :: k Number Number
  cosC :: k Number Number
  invC :: k Number Number
  sqrtC :: k Number Number
  expC :: k Number Number
  logC :: k Number Number
  asinC :: k Number Number
  acosC :: k Number Number

instance ncFun :: NumCat AddFun where
  sinC = AddFun sin
  cosC = AddFun cos
  invC = AddFun (1.0 / _)
  sqrtC = AddFun sqrt
  expC = AddFun exp
  logC = AddFun log
  asinC = AddFun asin
  acosC = AddFun acos

instance ncD :: Scalable k Number => NumCat (D k) where
  sinC = D $ \ a -> 
            sin a /\ scale (cos a)
  cosC = D $ \ a -> 
            cos a /\ scale (- sin a)
  invC = D $ \ a ->
            1.0 / a /\ scale ( -1.0 / (a * a))
  sqrtC = D $ \ a -> 
              let sa = sqrt a
              in sa /\ scale ( 1.0 / (2.0 * sa))
  expC = D $ \ a -> 
              let ea = exp a
              in ea /\ scale ea
  logC = D $ \ a -> 
              log a /\ scale (1.0 / a)
  asinC = D $ \ a ->
              asin a /\ scale ( 1.0 / sqrt (1.0 - a*a))
  acosC = D $ \ a ->
              acos a /\ scale ( -1.0 / sqrt (1.0 - a*a))

newtype Dual h a b = Dual (h b a)

instance sgDual :: Semigroupoid h => Semigroupoid (Dual h) where
  compose (Dual g) (Dual f) = Dual (f <<< g)

instance catDual :: Category h => Category (Dual h) where
  identity = Dual identity
  
instance monoDual :: 
  Monoidal c d a b h => Monoidal a b c d (Dual h) where
  cross (Dual f) (Dual g) = Dual (cross f g)

instance cartDual :: 
  Semiring z => Cartesian z (Dual AddFun) where
  exl = Dual inl
  exr = Dual inr
  dup = Dual jam

instance cocartDual :: 
  ( Semiring a
  , Cartesian a h
  ) => Cocartesian a (Dual h) where
  inl = Dual exl
  inr = Dual exr
  jam = Dual dup

instance scalDual :: Scalable h z => Scalable (Dual h) z where
  scale s = Dual $ scale s

instance rcDual :: Ring z => RingCat (Dual AddFun) z where
  negateC = Dual negateC
  addC = jam
  mulC = undefined
  constC c = Dual (constC c)


