module Main where

import Prelude
import Effect (Effect)
import Data.Maybe(Maybe(..),fromJust)
import Partial.Unsafe(unsafePartial)
import KaTeX (equation, newline, newlineIn, raw, rawIn
             , render, renderIn, setTitle, list, cat, subrender, subraw)
import DOM.Editor as DOM
import Data.Array(replicate, (!!), (\\), scanl, last)
import Data.Array(length) as Array
import Data.Foldable(foldr)
import Data.Ord(abs)

foreign import fromString :: String -> Int 

primes :: Array Int
primes = [2,2,2,2,2,2,3,3,3,3,3,5,5,5,5]

avgNbFactors = 2 :: Int

newtype Fraction = Fraction {num :: Int, den :: Int}

instance eqFraction :: Eq Fraction where
  eq (Fraction f1) (Fraction f2) = f1.num == f2.num && f1.den == f2.den 

instance showFraction :: Show Fraction where
  show (Fraction f) = 
    if f.den == 1 
      then show f.num
      else "\\frac{" <> show f.num <> "}{" <> show f.den <> "}"

instance semiRingFraction :: Semiring Fraction where
  add (Fraction f1) (Fraction f2) = 
    let d =  f1.den * f2.den
        n = f1.num * f2.den + f2.num * f1.den
        g = gcd (abs n) d
    in Fraction {num: n `div` g, den: d `div` g}
  zero = Fraction {num: 0, den: 1}
  mul (Fraction f1) (Fraction f2) = 
    let n = f1.num * f2.num
        d = f1.den * f2.den
        g = gcd (abs n) d
     in Fraction {num: n `div` g, den:  d `div` g}
  one = Fraction {num: 1, den: 1}

instance ringFraction :: Ring Fraction where
  sub f1 f2 = f1 + (Fraction {num: -1, den: 1}) * f2

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

randFraction :: Rand -> {fraction :: Fraction, nextRand :: Rand}
randFraction = unsafePartial \ r -> 
  let r0 = rand avgNbFactors r
      nbNumFactors = 1 + r0.val
      r1 = rand avgNbFactors r0
      nbDenFactors = 1 + r1.val
      nrands = (\f -> f r1) <$> (scanl (<<<) identity 
                             $ replicate nbNumFactors 
                                         (rand $ Array.length primes))
      Just r2 = last nrands
      drands = (\f -> f r2) <$> (scanl (<<<) identity 
                             $ replicate nbDenFactors 
                                         (rand $ Array.length primes))
      Just r3 = last drands
      nextRand = rand 2 r3
      sign = 2 * nextRand.val - 1
      prime = unsafePartial $ \ ix -> fromJust $ primes !! ix 
      nums = prime <$> (\rnd -> rnd.val) <$> nrands
      dens = prime <$> (\rnd -> rnd.val) <$> drands
      num = foldr (*) 1 $ nums \\ dens
      den = foldr (*) 1 $ dens \\ nums
   in if num > den 
        then {fraction: Fraction {num: sign * num, den}, nextRand}
        else {fraction: Fraction {num: sign * den, den: num}, nextRand}

aVeryBigPowerOf2 = 33554432 :: Int -- 2^25

type Rand = {val :: Int, gen :: Int}

rand :: Int -> Rand -> Rand
rand max {val, gen} = 
  let y = (gen * (4*gen + 1) +1) `mod` aVeryBigPowerOf2
  in {val: y `mod` max, gen: y} 

cb :: DOM.Document -> DOM.Event -> Effect Unit
cb doc = unsafePartial $ \ev -> do
  val <- DOM.inputedValueFromEvent ev
  let r0 = {val: abs $ fromString val, gen: abs $ fromString val}
  newline
  
  list [ cat [subraw "5 questions"] 
       , cat [subrender "1", subraw " point par bonne réponse"]]
  newline
  raw "1) Deux nombres "
  render "x_1"
  raw " et "
  render "x_2"
  raw " vérifient "
  let f1 = randFraction r0
  let f2 = randFraction f1.nextRand 
  render $ "\\left\\{\\begin{array}{l}x_1+x_2=" 
                    <> (show $ f1.fraction + f2.fraction) 
                    <> "\\\\ x_1x_2 = " 
                    <> (show $ f1.fraction * f2.fraction)
                    <> "\\end{array}\\right."
  newline
  raw "Donner l'ensemble des couples "
  render "(x_1, x_2)"
  raw " possibles:"
  newline 
  newline
  newline

  raw "2) "

  newline
  newline
  let rep = ["réponses: 1)"
      ,"\\mathcal{S}=" 
              <> (if f1.fraction == f2.fraction
                 then "\\{(" <> show f1.fraction <> ","  
                          <> show f2.fraction <> ")}\\"
                else "\\{(" <> show f1.fraction <> ","
                          <> show f2.fraction <> "),("
                        <> show f2.fraction <> ","
                        <> show f1.fraction <> ")\\}"),"\\; 10)"]
  render $ if fromString val < 0 then foldr (<>) "" rep else ""
  
  
spacex :: Int -> String 
spacex n = foldr (<>) "" $ replicate n "\\;"

main :: Effect Unit
main = void $ unsafePartial do
  setup <- DOM.setup
  
  seed <- DOM.createElement "input" setup.document
  _ <- DOM.addEventListener (cb setup.document) DOM.change seed
  _ <- DOM.appendChild seed setup.body
  setTitle "Devoir 2 : Second degré"
  raw "Nom:"
  render $ spacex 40
  raw "Prénom:"
  render $ spacex 40
  raw "Classe:"
  pure unit
  
