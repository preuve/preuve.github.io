module Main where

import Prelude

import Data.Array ((:), filter, all, (..), zip, nub, length, sort)
import Data.Foldable (minimumBy)
import Data.Maybe (Maybe(..))
import Data.Rational (Rational, numerator, denominator, (%))
import Data.Tuple.Nested ((/\), type (/\))

import Effect (Effect)
import Effect.Console (log)
import JS.BigInt (BigInt, fromInt, toInt)

-- | Algorithm for the decomposition of 1/q:
-- | --------------------------------------
-- | Each sum can be presented as
-- |
-- | 1/q = 
-- |       1/(q+delta1) 
-- |     + delta1/(delta2+q(q+delta1)) 
-- |     + delta1 delta2/(delta3+q(q+delta1)(delta2+q(q+delta1)))
-- |     + ...
-- |     + prod(deltai) / Dn
-- | 
-- | with Di = deltai+prod(Dk)
-- |      D0 = q
-- |      delta0 = 1
-- |      deltan = 0.
-- |
-- | Thus, each new deltai1 should satisfy
-- | 1) prod(deltai) | deltai1 + prod(Di):
-- | deltai1 + prod(Di) = 0 [prod(deltai)]
-- | deltai1 = -prod(Di) [prod(deltai)]
-- | Let dmin s.t. dmin prod(deltai) - prod(Di) > 0 
-- |          and (dmin-1)[prod(deltai)-prod(Di) < 0
-- |    => dmin = ceil[prod(Di)/prod(deltai)]
-- |
-- | and, with the quotient di1=(deltai1 + prod(Di))/prod(deltai):
-- | 2) sum of the reciprocals of the n next consecutive integers after di1 
-- | be enough to reach the target => dmax
-- |
-- | Then deltai1 in 
-- | { dmin prod(deltai) - prod(Di)
-- | , (dmin+1) prod(deltai) - prod(Di)
-- | , ...
-- | , dmax prod(deltai) - prod(Di)
-- | }

type InProgress = Array BigInt
type PartialSum = Rational
type ProdOfDs = BigInt
type ProdOfDeltas = BigInt

type Step = InProgress /\ PartialSum /\ ProdOfDeltas /\ ProdOfDs

initial :: BigInt -> Int -> Array Step
initial q n =
  let 
    delta1 = range (fromInt 1) (fromInt n * q)
    d1 = (q + _) <$> delta1
  in 
    zip ((_ : []) <$> d1) 
      $ (zip ((fromInt 1 % _ ) <$> d1) 
      $ zip delta1 ((_ * q) <$> d1))

-- | 1/from + 1/(from+1) + ... + 1/(from+n-1)
bound :: BigInt -> Int -> Rational
bound from n
  | n == 1 = fromInt 1 % from
  | otherwise = fromInt 1 % from + bound (from + fromInt 1) (n - 1)
  
-- | [a, a+1, ..., b]
range :: BigInt -> BigInt -> Array BigInt
range a b 
  | a > b = []
  | a == b = [a]
  | otherwise = 
      case toInt a, toInt b of
          Just i, Just j -> fromInt <$> (i .. j)
          _, _ -> [] 

-- | Value of the last possible first (smallest) denominator f > p
-- | given that the sum has n terms and should exceed r 
limit :: Rational -> BigInt -> Int -> BigInt 
limit r p n 
  | r <= fromInt 0 % fromInt 1 = p
  | otherwise = go p where 
    go i = 
      if bound (i + fromInt 1) n >= r
        then go (i + fromInt 1)
        else i

steps :: BigInt -> Int -> Array Step -> Array Step
steps _ 2 xs = xs
steps d n xs = 
  steps d (n-1) $ xs >>= step d n

step :: BigInt -> Int -> Step -> Array Step
step q n (ds /\ s /\ pdelta /\ pd) =
  let
    dmin = pd / pdelta + fromInt 1
    dmax = limit (fromInt 1 % q - s) dmin (n-1)
    d = range dmin dmax
    pd' = (_ * pd) <$> d
    delta = ((_ - pd) <<< (_ * pdelta)) <$> d
    pdelta' = (_ * pdelta) <$> delta
  in zip ((_ : ds) <$> d) 
    $ zip (((_ + s) <<< (fromInt 1 % _ )) <$> d) 
    $ zip pdelta' pd'

final :: BigInt -> Array Step -> Array InProgress
final q s' =
  let
    f (ds /\ s /\ _ /\ _) =
      let 
        residue = fromInt 1 % q - s
      in 
        if numerator residue == fromInt 1
           then denominator residue : ds
           else []
  in f <$> s'

-- | Egyptian sums of n distinct reciprocals equal to u/d with u <= d:
-- | The algorithm searches for the solutions summing to 1/d,
-- | then filters those that are divisible by u. 
egyptian :: BigInt -> BigInt -> Int -> Array (Array BigInt)
egyptian u d n 
  | u > fromInt 1 && n == 1 = []
  | u > fromInt 1 =
    (\qs -> (_ / u) <$> qs) 
      <$> filter (\qs -> all (_ == fromInt 0) $ (_ `mod` u) <$> qs) 
        (egyptian (fromInt 1) d n
        ) 
  | u == fromInt 1 && n == 1 = [[d]]
  | otherwise =
      nub $ filter ((_ == n) <<< length) 
        $ (nub <<< sort) <$> 
          (
            filter (_ /= []) 
                $ final d 
                  $ steps d n $ initial d (n) 
          )

main :: Effect Unit
main = do
  log $ show $ 
    let 
      --  f [a,_,_,_,_,b] [c,_,_,_,_,d] =  if b-a<d-c then LT else GT
      --  f _ _ = EQ
        g [_,_,_,_,_,b] = 
          b `mod` fromInt 2 == fromInt 1
          && b `mod` fromInt 5 /= fromInt 0
          && b `mod` fromInt 7 /= fromInt 0
          && b `mod` fromInt 11 /= fromInt 0
          && b `mod` fromInt 13 /= fromInt 0
          && b `mod` fromInt 17 /= fromInt 0
          && b `mod` fromInt 19 /= fromInt 0
        g _ = false
   -- in minimumBy f $ egyptian (fromInt 1) (fromInt 1) 6
    in filter g $ egyptian (fromInt 1) (fromInt 1) 6
