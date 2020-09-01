module Fraction where

import Prelude
import Data.Ord(abs) as Ord

newtype Fraction = Fraction {num :: Int, den :: Int}

instance eqFraction :: Eq Fraction where
  eq (Fraction f1) (Fraction f2) = 
    (f1.num == 0 && f2.num == 0) || (f1.num == f2.num && f1.den == f2.den) 

instance showFraction :: Show Fraction where
  show (Fraction f) = 
    if f.den == 1 
      then show f.num
      else "\\frac{" <> show f.num <> "}{" <> show f.den <> "}"

inlineFraction :: Fraction -> String
inlineFraction c =
  case unit of
       unit | c < zero -> "-" <> (show $ abs c)
            | c == zero -> ""
            | otherwise -> "+" <> show c

instance semiRingFraction :: Semiring Fraction where
  add (Fraction f1) (Fraction f2) = 
    let d =  f1.den * f2.den
        n = f1.num * f2.den + f2.num * f1.den
        g = gcd (Ord.abs n) d
    in Fraction {num: n `div` g, den: d `div` g}
  zero = Fraction {num: 0, den: 1}
  mul (Fraction f1) (Fraction f2) = 
    let n = f1.num * f2.num
        d = f1.den * f2.den
        g = gcd (Ord.abs n) d
     in Fraction {num: n `div` g, den:  d `div` g}
  one = Fraction {num: 1, den: 1}

instance ringFraction :: Ring Fraction where
  sub f1 f2 = f1 + fromInt (-1) * f2

instance ordFraction :: Ord Fraction where
  compare f1 f2 = 
    let Fraction f = f1 - f2 
     in case unit of
             unit | f.num < 0 -> LT
                  | f.num > 0 -> GT
                  | otherwise -> EQ

abs :: Fraction -> Fraction
abs (Fraction {num, den}) = Fraction {num: Ord.abs num, den} 

instance divisionRingFraction :: DivisionRing Fraction where
  recip (Fraction f) = 
    if f.num < 0 
      then Fraction {num: -f.den, den: -f.num}
      else Fraction {num: f.den, den: f.num}

instance commutativeRingFraction :: CommutativeRing Fraction

instance euclideanRingFraction :: EuclideanRing Fraction where
  degree = const 1
  div f1 f2 = f1 * recip f2
  mod _ _ = zero

fromInt :: Int -> Fraction
fromInt n = Fraction {num: n, den: 1}

