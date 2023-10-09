module Data.AD.Types where

import Prelude hiding (negate, add, mul, recip, div)
import Prelude (negate) as Ring
import Prelude (recip) as DivisionRing
import Prelude (div) as EuclideanRing

import Data.Array (filter, zip)
import Data.Filterable (compact)
import Data.Foldable (minimum)
import Data.Number (acos, asin, atan, cos, exp, log, sin, sqrt) as Math
import Data.Traversable (sequence)
import Data.Tuple (fst, snd, uncurry)
import Data.Tuple.Nested ((/\), type (/\))

newtype Arrow' a b = A' (a -> b /\ (a -> b))

class Monoidal k where
  cross :: forall a b c d
    . k a c 
    -> k b d
    -> k (a /\ b) (c /\ d)

instance Monoidal (->) where
  cross f g = \ (a /\ b) -> f a /\ g b

instance Monoidal Arrow' where
  cross (A' f) (A' g) = A' $ \ (a /\ b) ->
    let c /\ f' = f a
        d /\ g' = g b
    in (c /\ d) /\ cross f' g'

linearPropagation :: forall a b
  . (a -> b) 
  -> (a -> b) 
  -> Arrow' a b
linearPropagation f f' = A' $ \a -> f a /\ f'

instance Semigroupoid Arrow' where
  compose (A' g) (A' f) = A' $ \ a ->
    let b /\ f' = f a
        c /\ g' = g b
      in c /\ compose g' f'

instance Category Arrow' where
  identity = linearPropagation identity identity

class Category k <= Cartesian k where
  exl :: forall a b. k (a /\ b) a
  exr :: forall a b. k (a /\ b) b
  dup :: forall a. k a (a /\ a)

instance Cartesian (->) where
  exl = fst
  exr = snd
  dup x = x /\ x

instance Cartesian Arrow' where
  exl = linearPropagation exl exl
  exr = linearPropagation exr exr
  dup = linearPropagation dup dup

class Space a where
  scale :: a -> (a -> a)
  accum :: (a /\ a) -> a

instance Semiring s => Space s where
  scale a = \ da -> a * da
  accum = \ (a /\ b) -> a + b

class RingCat k s where
  negate :: k s s
  add :: k (s /\ s) s
  mul :: k (s /\ s) s
  
instance Ring s => RingCat (->) s where
  negate = Ring.negate
  add = uncurry (+)
  mul = uncurry (*)

instance Ring s => RingCat Arrow' s where
  negate = linearPropagation negate negate
  add = linearPropagation add add
  mul = A' $ \ (a /\ b) -> 
    (a * b) /\ (accum <<< cross (scale b) (scale a))

class DivisionRingCat k s where
  recip :: k s s
  div :: k (s /\ s) s

instance (DivisionRing s, EuclideanRing s) => DivisionRingCat (->) s where
  recip = DivisionRing.recip
  div = uncurry EuclideanRing.div

recipImpl :: forall b. EuclideanRing b => DivisionRing b => Arrow' b b
recipImpl = A' \x -> recip x /\ (_ * (- (recip $ x * x)))

instance (DivisionRing s, EuclideanRing s, RingCat Arrow' s) 
  => DivisionRingCat Arrow' s where
  recip = recipImpl
  div = (exl .:. exr >>> recipImpl) >>> mul

expImpl :: Arrow' Number Number
expImpl = A' \a -> Math.exp a /\ scale (Math.exp a)
  
lnImpl :: Arrow' Number Number
lnImpl = A' \a -> Math.log a /\ scale (1.0 / a)
  
sinImpl :: Arrow' Number Number
sinImpl = A' \a -> Math.sin a /\ scale (Math.cos a)

cosImpl :: Arrow' Number Number
cosImpl = A' \a -> Math.cos a /\ scale (- Math.sin a)

sqrtImpl :: Arrow' Number Number
sqrtImpl = A' \a -> Math.sqrt a /\ scale (0.5 / Math.sqrt a)

absImpl :: Arrow' Number Number
absImpl = dup >>> mul >>> sqrtImpl

atanImpl :: Arrow' Number Number
atanImpl = A' \a -> Math.atan a /\ scale (1.0 / (1.0 + a * a))
  
coshImpl :: Arrow' Number Number
coshImpl = (dup >>> (exl >>> expImpl .:. exr >>> negate >>> expImpl) >>> add .:. cst 0.5) >>> mul

sinhImpl :: Arrow' Number Number
sinhImpl = (dup >>> (exl >>> expImpl .:. exr >>> negate >>> expImpl >>> negate) >>> add .:. cst 0.5) >>> mul

class NumCat k where
  exp :: k Number Number
  sqrt :: k Number Number
  sin :: k Number Number
  cos :: k Number Number
  tan :: k Number Number
  asin :: k Number Number
  acos :: k Number Number
  atan :: k Number Number
  sinh :: k Number Number
  cosh :: k Number Number
  tanh :: k Number Number
  asinh :: k Number Number
  acosh :: k Number Number
  atanh :: k Number Number
  ln :: k Number Number
  abs :: k Number Number
  sign :: k Number Number
  atan2 :: k (Number /\ Number) Number
  pow :: k (Number /\ Number) Number
  min :: k (Number /\ Number) Number
  max :: k (Number /\ Number) Number

instance NumCat Arrow' where
  exp = expImpl
  ln = lnImpl
  pow = (exl >>> lnImpl .:. exr) >>> mul >>> expImpl
  sqrt = sqrtImpl
  sin = sinImpl
  cos = cosImpl
  tan = dup >>> (exl >>> sinImpl .:. exr >>> cosImpl) >>> div
  asin = A' \a -> Math.asin a /\ scale (1.0 / Math.sqrt (1.0 - a * a))
  acos = A' \a -> Math.acos a /\ scale (-1.0 / Math.sqrt (1.0 - a * a))
  atan = atanImpl
  atan2 = div >>> atanImpl
  abs = absImpl
  sign = dup >>> (exl .:. exr >>> absImpl) >>> div
  min = ((add .:. (exl .:. exr >>> negate) >>> add >>> absImpl >>> negate) >>> add .:. cst 0.5) >>> mul
  max = ((add .:. (exl .:. exr >>> negate) >>> add >>> absImpl) >>> add .:. cst 0.5) >>> mul
  cosh = coshImpl
  sinh = sinhImpl
  tanh = dup >>> (exl >>> sinhImpl .:. exr >>> coshImpl) >>> div
  asinh = dup >>> (exl .:. (exr >>> dup >>> mul .:. cst 1.0) >>> add >>> sqrtImpl) >>> add >>> lnImpl
  acosh = dup >>> (exl .:. (exr >>> dup >>> mul .:. cst (-1.0)) >>> add >>> sqrtImpl) >>> add >>> lnImpl
  atanh = 
    (
      dup >>> 
        (
          (cst 1.0 .:. exl) >>> add .:. (cst 1.0 .:. exr >>> negate) >>> add
        ) >>> div >>> lnImpl 
          .:. cst 0.5
    ) >>> mul

pair :: forall a c d k
  . Cartesian k 
  => Monoidal k 
  => k a c -> k a d -> k a (c /\ d)
pair f g = cross f g <<< dup

infix 5 pair as .:.

cst :: forall a s. Semiring s => s -> Arrow' a s
cst n = A' $ const $ n  /\ const zero

minimize2 :: Arrow' (Number /\ Number) Number -> Number -> Number -> (Number /\ Number) -> Number /\ Number
minimize2 (A' graph) lambda epsilon (x0 /\ y0) =
  let
    go (x /\ y) =
      let _ /\ f' = graph $ x /\ y
          fx /\ fy = (f' (1.0 /\ 0.0)) /\ (f' (0.0 /\ 1.0))
          _ /\ u' = graph $ (x + lambda * fx) /\ (y + lambda * fy)
          ux /\ uy = (u' (1.0 /\ 0.0)) /\ (u' (0.0 /\ 1.0))
        in 
          if fx * fx + fy * fy < epsilon 
              then x /\ y
              else
              let
                k = - (fx * ux + fy * uy) / (ux * ux + uy * uy)
              in go $ (x + k * fx) /\ (y + k * fy) 
    
  in go (x0 /\ y0)

minimize3 :: Arrow' (Number /\ Number /\ Number) Number -> Number -> Number -> (Number /\ Number /\ Number) -> Number /\ Number /\ Number
minimize3 (A' graph) lambda epsilon (x0 /\ y0 /\ z0) =
  let
    go (x /\ y /\ z) =
      let _ /\ f' = graph $ x /\ y /\ z
          fx /\ fy /\ fz = (f' (1.0 /\ 0.0 /\ 0.0)) /\ (f' (0.0 /\ 1.0 /\ 0.0)) /\ (f' (0.0 /\ 0.0 /\ 1.0))
          _ /\ u' = graph $ (x + lambda * fx) /\ (y + lambda * fy) /\ (z + lambda * fz)
          ux /\ uy /\ uz = (u' (1.0 /\ 0.0 /\ 0.0)) /\ (u' (0.0 /\ 1.0 /\ 0.0)) /\ (u' (0.0 /\ 0.0 /\ 1.0))
        in 
          if fx * fx + fy * fy + fz * fz < epsilon 
              then x /\ y /\ z
              else
              let
                k = - (fx * ux + fy * uy + fz * uz) / (ux * ux + uy * uy + uz * uz)
              in go $ (x + k * fx) /\ (y + k * fy) /\ (z + k * fz) 
    
    in go (x0 /\ y0 /\ z0)

class Transposable a b | a -> b where
  transpose :: Arrow' a b
  
instance
  ( Transposable ((b/\x)/\(d/\y)) e
  ) => Transposable ((a/\ (b/\x))/\( c/\ (d/\y))) ((a /\ c) /\ e) where
    transpose = cross exl exl .:. cross exr exr >>> transpose

else instance Transposable ((a/\ b)/\( c/\ d)) ((a/\ c)/\( b/\ d)) where
  transpose = cross exl exl .:. cross exr exr  
  
class Cumulative c a where
  cumulate :: Arrow' (a /\ c) a

instance
  ( Ring a
  , Cumulative c a
  ) => Cumulative (a /\ c) a where
    cumulate = cross identity cumulate >>> add
    
else instance Ring a => Cumulative a a where 
  cumulate = add

class Fmapable a c b k | b c -> k where
  fmap :: Arrow' a b -> Arrow' c k

instance Fmapable a a b b where
  fmap f = f  

else instance
  ( Fmapable a c b k
  ) => Fmapable a (a /\ c) b (b /\ k) where
    fmap f = cross f (fmap f)

distance2 :: forall a b c d t
  . Transposable a b 
  => Fmapable (Number /\ Number) b (Number /\ Number) c 
  => Fmapable (Number /\ Number) c Number (d /\ t) 
  => Cumulative t d 
  => Arrow' a d
distance2 = 
  transpose 
    >>> fmap (cross identity negate :: Arrow' (Number /\ Number) (Number /\ Number)) 
    >>> fmap (add >>> dup >>> mul :: Arrow' (Number /\ Number) Number)
    >>> cumulate
 
distance :: forall a b c t
  . Transposable a b 
  => Fmapable (Number /\ Number) b (Number /\ Number) c 
  => Fmapable (Number /\ Number) c Number (Number /\ t) 
  => Cumulative t Number
  => Arrow' a Number
distance = distance2 >>> sqrt

argmin :: forall b t. Eq t => Ord t => (b -> t) -> Array b -> Array b
argmin h rs = 
  fst <$> 
    ( compact $ 
      sequence ((\m -> filter ((_ == m) <<< snd) (zip rs hs)) <$> minimum hs)
    ) where
      hs = h <$> rs
