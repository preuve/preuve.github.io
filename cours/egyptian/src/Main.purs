module Main where

import Prelude

import Data.Array ((:), filter, all, (..), zip, group, sort,uncons, length, (\\), unzip)
import Data.Foldable (minimumBy, sum, lookup, minimum, maximum)
import Data.Maybe (Maybe(..), fromMaybe)
import Data.Rational (Rational, numerator, denominator, (%))
import Data.Tuple (fst)
import Data.Tuple.Nested ((/\), type (/\))

import Effect (Effect)
import Effect.Console (log)
import JS.BigInt (BigInt, fromInt, toInt)
import Data.Array.NonEmpty (toArray) as NonEmpty

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
type LastInserted = BigInt
type ProdOfDs = BigInt
type ProdOfDeltas = BigInt

type Step = InProgress /\ LastInserted /\ PartialSum /\ ProdOfDeltas /\ ProdOfDs

initial :: BigInt -> Int -> Array Step
initial q n =
  let 
    delta1 = range (fromInt 1) (fromInt (n - 1) * q)
    d1 = (q + _) <$> delta1
  in 
    zip ((_ : []) <$> d1) 
      $ zip d1
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
  | r <= fromInt 0 % fromInt 1 = p - fromInt 1
  | otherwise = go (p - fromInt 1) where 
    go i = 
      if bound (i + fromInt 1) n >= r
        then go (i + fromInt 1)
        else i

steps :: BigInt -> Int -> Array Step -> Array Step
steps _ 1 xs = xs
steps d n xs = 
  steps d (n-1) $ xs >>= step d n

step :: BigInt -> Int -> Step -> Array Step
step q n (ds /\ x /\ s /\ pdelta /\ pd) =
  let
    dmin = max (x + fromInt 1) $ pd / pdelta + fromInt 1
    dmax = limit (fromInt 1 % q - s) dmin n
    d = range dmin dmax
    pd' = (_ * pdelta) <$> (_ * pd) <$> d
    delta = ((_ - pd) <<< (_ * pdelta)) <$> d
    pdelta' = (_ * pdelta) <$> delta
  in zip ((_ : ds) <$> d) 
    $ zip d
    $ zip (((_ + s) <<< (fromInt 1 % _ )) <$> d) 
    $ zip pdelta' pd'

final :: BigInt -> Array Step -> Array InProgress
final q s' =
  let
    f (ds /\ y /\ s /\ _ /\ _) =
      let 
        residue = fromInt 1 % q - s
        z = denominator residue
      in 
        if numerator residue == fromInt 1 && y < z
           then z : ds
           else []
  in f <$> s'

-- | Egyptian sums of n distinct reciprocals equal to u/d with u <= d:
-- | The algorithm searches for the solutions summing to 1/d,
-- | then filters those that are divisible by u. 
egyptian :: Rational -> Int -> Array (Array BigInt)
egyptian f n = go u' d'
  where
    u' = numerator f
    d' = denominator f
    go u d
      | u > fromInt 1 && n == 1 = []
      | u > fromInt 1 =
        (\qs -> (_ / u) <$> qs) 
          <$> filter (\qs -> all (_ == fromInt 0) $ (_ `mod` u) <$> qs) 
            (go (fromInt 1) d) 
      | u == fromInt 1 && n == 1 = [[d]]
      | otherwise =
          filter (_ /= []) 
              $ final d 
                $ steps d (n-1) $ initial d n 

-- | There are (tau(n^2)-1)/2 distinct ways to express 1/n as a sum of _two_ distinct reciprocals.

tau :: Int -> Int
tau n = sum ((\i -> if n `mod` i == 0 then 1 else 0) <$> (1..n))

histogram :: Array Int -> Array (Int /\ Int)
histogram = 
  let defaultHead xs =
        case uncons xs of
             Just { head, tail: _ } -> head
             _ -> 0
  in map (\x -> defaultHead x /\ length x) <<< map NonEmpty.toArray <<< group <<< sort
 
rmod :: Rational -> Rational -> Rational
rmod p q = 
  let k = numerator p * denominator q / (numerator q * denominator p) 
  in p - (k % fromInt 1) * q

alias :: forall a b
  . Eq a
  => Ord a
  => Eq b
  => EuclideanRing a
  => Array (a /\ b) 
  -> Array ((a /\ Maybe b) /\ (a /\ Maybe b))
alias zs = go xs'
  where
    xs' = (\(a /\ b) -> a /\ Just b) <$> zs
    go xs =
      if allEqual nums 
          then map (\(x /\ s) -> ((x /\ s) /\ (zero /\ Nothing))) xs
          else entry : go (((maxi - comp) /\ smaxi) : ys)
      where
        n = sum $ const one <$> xs
        nums = fst $ unzip xs
        moy = (_ / n) $ sum nums
        extr f = m /\ symbol
          where
            m = fromMaybe zero $ f nums
            symbol = join $ lookup m xs
        one@(mini /\ _) = extr minimum
        two@(maxi /\ smaxi) = extr maximum
        comp = moy - mini
        entry 
          | mini < comp = one /\ (comp /\ smaxi) 
          | otherwise = (comp /\ smaxi) /\ one
        allEqual bs =
          case uncons bs of
            Just { head: b, tail: cs } ->
                case uncons cs of
                  Just { head: c, tail: _ } ->
                      b == c && allEqual cs
                  _ -> true
            _ -> true  
        ys = xs \\ [one, two]

distribution =
  [ 1%7 /\ 8    
  , 1%8 /\ 6
  , 1%9 /\ 5
  , 1%10 /\ 4     
  , 1%11 /\ 3 
  , 1%15 /\ 2 
  , 1%18 /\ 1 
  , 1%20 /\ 0 
  , 1%21 /\ (-1) 
  , 1%22 /\ (-2) 
  , 1%24 /\ (-3) 
  , 1%28 /\ (-4) 
  , 1%30 /\ (-5) 
  , 1%33 /\ (-6)
  , 1%42 /\ (-8)
  ] :: Array (Rational /\ Int)

        
main :: Effect Unit
main = do
  log $ show $ 
    let 
        f [a,_,_,_,b] [c,_,_,_,d] =  if a-b<c-d then LT else GT
        f _ _ = EQ
        g [b,_,_,_,_,_] = 
          b `mod` fromInt 2 == fromInt 1
          && b `mod` fromInt 5 /= fromInt 0
          && b `mod` fromInt 7 /= fromInt 0
          && b `mod` fromInt 11 /= fromInt 0
          && b `mod` fromInt 13 /= fromInt 0
          && b `mod` fromInt 17 /= fromInt 0
          && b `mod` fromInt 19 /= fromInt 0
        g _ = false
    in (minimumBy f $ egyptian (fromInt 1 % fromInt 1) 5)
    /\ (filter g $ egyptian (fromInt 1 % fromInt 1) 6)
