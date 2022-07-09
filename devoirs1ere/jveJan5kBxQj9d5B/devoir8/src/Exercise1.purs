module Exercise1 where

import Prelude

import Article (m, m_, nl, t_, t, b_, em_, equation, openSection_)

import Control.Monad.State.Class(class MonadState)

import Data.Array (length, unsafeIndex)
import Data.Int (pow)
import Data.Tuple (fst) 
import Data.Tuple.Nested ((/\), type (/\))
import Data.Rational (Rational, numerator, denominator, fromInt)

import Deku.Core (Domable, class Korok)

import FRP.Event (AnEvent)

import Partial.Unsafe (unsafePartial)

import Rand (Rand, rand)

type Acute = Boolean -- is angle pi/3 or 2pi/3
type Param = {ac :: Int, ab :: Int, sqrtD :: Int, a :: Acute}

problems :: Array {ac :: Int, ab :: Int, sqrtD :: Int}
problems = [ {ac: 7, ab: 3, sqrtD: 13}, {ac: 7, ab: 5, sqrtD: 11}
           , {ac: 13, ab: 7, sqrtD: 23}, {ac: 13, ab: 8, sqrtD: 22}
           , {ac: 14, ab: 6, sqrtD: 26}, {ac: 14, ab: 10, sqrtD: 22}
           , {ac: 19, ab: 5, sqrtD: 37}, {ac: 19, ab: 16, sqrtD: 26}
           , {ac: 21, ab: 9, sqrtD: 39}, {ac: 21, ab: 15, sqrtD: 33}
           , {ac: 26, ab: 14, sqrtD: 46}, {ac: 26, ab: 16, sqrtD: 44}
           , {ac: 28, ab: 12, sqrtD: 52}, {ac: 28, ab: 20, sqrtD: 44}
           , {ac: 31, ab: 11, sqrtD: 59}, {ac: 31, ab: 24, sqrtD: 46}
           , {ac: 35, ab: 15, sqrtD: 65}, {ac: 35, ab: 25, sqrtD: 55}
           , {ac: 37, ab: 7, sqrtD: 73}, {ac: 37, ab: 33, sqrtD: 47}
           , {ac: 38, ab: 10, sqrtD: 74}, {ac: 38, ab: 32, sqrtD: 52}
           , {ac: 39, ab: 21, sqrtD: 69}, {ac: 39, ab: 24, sqrtD: 66}]

randomParam :: Rand -> Param
randomParam r =
  let rp = rand r
      {ac, ab, sqrtD} = 
        unsafePartial $ unsafeIndex 
          problems (rp.val `mod` (length problems))
      ra = rand rp
      a = ra.val `mod` 2 == 0
  in { ac, ab, sqrtD, a}

showAngle :: Acute -> String
showAngle = case _ of
  true -> "\\frac{\\pi}{3}"
  false -> "\\frac{2\\pi}{3}"

infix 8 pow as **

showInt :: Int -> String
showInt n =
  if n < 0
    then show n
    else "+" <> show n

rshow :: Rational -> String
rshow r =
  let n = numerator r
      d = denominator r
   in if d == 1
        then show n
        else "\\frac{" <> show n
                    <> "}{"
                    <> show d
                    <> "}"

exo1 :: forall st s m lock payload
  . Korok s m 
  => Functor st 
  => MonadState (Array (Domable m lock payload)) st 
  => AnEvent m (Rand /\ Boolean) 
  -> st Unit
exo1 f0 = do
  openSection_ "Exercice I" "5 points"

  t_ "Soit "
  m_ "ABC"
  t_ " un triangle tel que "
  let r0 = fst <$> f0
  let p0 = randomParam <$> r0
  m $ ((_.ab) >>> show >>> ("AB = " <> _)) <$> p0
  t_ ", "
  m $ ((_.ac) >>> show >>> ("AC = " <> _)) <$> p0
  t_ " et "
  m $ ((_.a) >>> showAngle >>> ("\\widehat{ABC} = " <> _) >>> (_ <> ".")) <$> p0
  nl
  t_ "On note "
  m_ "BC=x."
  nl
  nl
  b_ "1"
  m_ "\\bullet\\bullet\\circ\\;"
  t_ "Evaluer, en fonction de  "
  m_ "x"
  t_ ", le produit scalaire "
  m_ "\\overrightarrow{BA}{\\Large\\cdot}\\overrightarrow{BC}"
  t_ " de "
  em_ "deux"
  t_ " manières différentes."
  nl
  t_ "En déduire que "
  m_ "x"
  t_ " satisfait l'équation "
  equation $ ( \ ( r /\ _m) -> 
    let {ab, ac, sqrtD: _sqrtD, a} = randomParam r
    in "x^2" <> (if a then "-" else "+") <> show ab <> "x" <> showInt (ab**2-ac**2) <> "=0"
    ) <$> f0
  nl
  nl
  b_ "2"
  m_ "\\bullet\\bullet\\circ\\;"
  t_ "Résoudre cette équation, et en déduire la valeur de "
  m_ "BC."
  nl
  t $ ( \ (r /\ m) -> 
    let {ab, ac: _ac, sqrtD, a} = randomParam r
    in 
      if m 
         then ("réponse: " <> rshow (((fromInt $ (if a then ab else -ab) + sqrtD)) / (fromInt 2))) 
         else ""
    ) <$> f0
