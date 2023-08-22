module Main where

import Prelude

import Data.Array ((:), filter, all, uncons)
import Data.Maybe (Maybe(..))
import Data.Rational (Rational, numerator, denominator, (%))
import JS.BigInt (BigInt, fromInt)

import Effect (Effect)
import Effect.Console (log)

harmo :: BigInt -> Rational
harmo n 
  | n == fromInt 1 = n % fromInt 1
  | otherwise = fromInt 1 % n + harmo (n - fromInt 1)

bound :: BigInt -> BigInt -> Rational
bound from n = harmo (from + n - fromInt 1) - harmo (from - fromInt 1)

-- | Value of the last possible first (smallest) denominator f > d
-- | given that the sum has n terms and should exceed 1/d
lastCandidate :: BigInt -> BigInt -> BigInt 
lastCandidate d n =
  go d where 
    go i = 
      if bound (i + fromInt 1) n >= fromInt 1 % d
        then go (i + fromInt 1)
        else i

growing :: Array BigInt -> Boolean
growing xs =
  case uncons xs of
    Just { head: h0, tail: t } ->
        case uncons t of
          Just { head: h1, tail: _} -> h0 < h1 && growing t 
          _ -> true
    _ -> true

range :: BigInt -> BigInt -> Array BigInt
range a b
  | a > b = []
  | otherwise = a : range (a + fromInt 1) b

-- Egyptian sum of n reciprocals equal to u/d with u <= d
egsum :: BigInt -> BigInt -> Int -> Array (Array BigInt)
egsum u d n = filter growing $
  egsumPrime (u / g) (d / g) n where
    g = gcd u d
 
egsumPrime :: BigInt -> BigInt -> Int -> Array (Array BigInt)
egsumPrime u d n 
  | u > fromInt 1 && n == 1 = []
  | u > fromInt 1 =
    (\qs -> (_ / u) <$> qs) 
      <$> filter (\qs -> all (_ == fromInt 0) $ (_ `mod` u) <$> qs) (egsum (fromInt 1) d n) 
  | u == fromInt 1 && n == 1 = [[d]]
  | otherwise =
      do
        q <- range (d + fromInt 1) (d * fromInt 3) -- $  lastCandidate d (fromInt n)
        let f = fromInt 1 % d - fromInt 1 % q
        e <- egsum (numerator f) (denominator f) (n-1)
        pure $ q : e

main :: Effect Unit
main = do
  log $ show $ egsum (fromInt 1) (fromInt 1) 5
