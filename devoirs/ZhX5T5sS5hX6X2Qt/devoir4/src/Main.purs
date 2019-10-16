module Main where

import Prelude
import Effect (Effect)
import Data.Maybe(Maybe(..),fromJust)
import Partial.Unsafe(unsafePartial)
import KaTeX (cat, equation, list, newline, newlineIn, raw, rawIn, render, renderIn, setTitle,
section, subsection, subraw, subrender, line)
import DOM.Editor as DOM
import Data.Array(replicate, (!!), (\\), scanl, last, sort)
import Data.Array(length) as Array
import Data.Foldable(foldr)
import Data.Ord(abs) as Ord
import Data.Ord(min, max)
import Fraction (Fraction(..), inlineFraction, fromInt, abs)
import Rand (Rand, rand)
import Math(pi)

foreign import fromString :: String -> Int 

primes :: Array Int
primes = [2,2,2,2,2,2,3,3,3,3,3,5,5,5,5]

avgNbFactors = 2 :: Int

randFraction :: Rand -> {fraction :: Fraction, nextRand :: Rand}
randFraction = unsafePartial \ r -> 
  let r0 = rand r
      nbNumFactors = 1 + (r0.val `mod` avgNbFactors)
      r1 = rand r0
      nbDenFactors = 1 + (r1.val `mod` avgNbFactors)
      nrands = (\f -> f r1) <$> (scanl (<<<) identity 
                             $ replicate nbNumFactors rand)
      Just r2 = last nrands
      drands = (\f -> f r2) <$> (scanl (<<<) identity 
                             $ replicate nbDenFactors rand)
      Just r3 = last drands
      nextRand = rand r3
      
      prime = unsafePartial $ \ ix -> fromJust $ primes !! ix 
      nums = prime <$> (\rnd -> rnd.val `mod` (Array.length primes)) 
                   <$> nrands
      dens = prime <$> (\rnd -> rnd.val `mod` (Array.length primes)) 
                   <$> drands
      num = foldr (*) 1 $ nums \\ dens
      den = foldr (*) 1 $ dens \\ nums
   in if num < den 
        then {fraction: Fraction {num, den}, nextRand}
        else {fraction: Fraction {num: den, den: num}, nextRand}

type Experience = { pA :: Fraction, pnA :: Fraction
                  , pgAB :: Fraction, pgAnB :: Fraction
                  , pgnAB :: Fraction, pgnAnB :: Fraction
                  , pAB :: Fraction, pAnB :: Fraction
                  , pnAB :: Fraction, pnAnB :: Fraction
                  , pB :: Fraction, pnB :: Fraction}

empty :: Experience
empty = {pA: zero, pgAB: zero, pgnAB: zero, pnA: zero, pAB: zero, pnAB: zero, pB: zero, pnB:
  zero, pgAnB: zero, pgnAnB: zero, pAnB: zero, pnAnB: zero}  

--complete :: forall hyp. hyp -> Experience
complete0 {pA, pgAB, pgnAB} =
  let pnA = fromInt 1 - pA
      pgAnB = fromInt 1 - pgAB
      pgnAnB = fromInt 1 - pgnAB
      pAB = pA * pgAB
      pnAB = pnA * pgnAB
      pAnB = pA * pgAnB
      pB = pAB + pnAB
      pnB = fromInt 1 - pB
      pnAnB = pnA * pgnAnB
   in {pA, pgAB, pgnAB, pnA, pAB, pnAB, pB, pnB, pgAnB, pgnAnB, pAnB, pnAnB}  

complete1 {pA, pgAB, pnAB} =
  let pnA = fromInt 1 - pA
      pgnAB = pnAB / pnA
   in complete0 {pA, pgAB, pgnAB}


complete2 {pnA, pAB, pnAnB} = 
  let pA = fromInt 1 - pnA
      pgAB = pAB / pA
      pnAB = pnA - pnAnB
   in complete1 {pA, pgAB, pnAB}
   

complete3 {pgAB, pgnAB, pnAnB} =
  let pgnAnB = fromInt 1 - pgnAB
      pnA = pnAnB / pgnAnB
      pA = fromInt 1 - pnA
   in complete0 {pA, pgAB, pgnAB}

complete4 {pgAnB, pAB, pnAB} =
  let pgAB = fromInt 1 - pgAnB
      pA = pAB / pgAB
      pnA = fromInt 1 - pA
      pgnAB = pnAB / pnA
   in complete0 {pA, pgAB, pgnAB}

complete5 {pAB, pAnB, pnAB} =
  let pA = pAB + pAnB
      pgAnB = pAnB / pA
  in complete4 {pgAnB, pAB, pnAB}
  
complete6 {pA, pgAB, pnB} = 
  let pAB = pA * pgAB
      pB = fromInt 1 - pnB
      pnAB = pB - pAB
      pnA = fromInt 1 - pA
      pgnAB = pnAB / pnA
   in complete0 {pA, pgAB, pgnAB}
   
complete7 {pnA, pnAnB, pB} =
  let pnB = fromInt 1 - pB
      pAnB = pnB - pnAnB
      pA = fromInt 1 - pnA
      pAB = pA - pAnB
      pgAB = pAB / pA
  in complete6 {pA, pgAB, pnB}

complete8 {pgAB, pgnAB, pB} = 
  let mn = min pgAB pgnAB
      mx = max pgAB pgnAB
  in if mn < pB && pB < mx
       then let pA = (pB - pgnAB) / (pgAB - pgnAB)
                pnB = fromInt 1 - pB
             in complete6 {pA, pgAB, pnB}
       else empty
       
complete9 {pgAnB, pnAB, pnB} = 
  let pB = fromInt 1 - pnB
      pAB = pB - pnAB
  in complete4 {pgAnB, pAB, pnAB}

fractions :: Array Fraction
fractions = [ Fraction {num: 1, den: 24}, Fraction {num: 1, den: 12}
            , Fraction {num: 1, den: 8}, Fraction {num: 1, den: 6}
            , Fraction {num: 1, den: 6}, Fraction {num: 5, den: 24}
            , Fraction {num: 1, den: 4}, Fraction {num: 7, den: 24}
            , Fraction {num: 1, den: 3}, Fraction {num: 3, den: 8}
            , Fraction {num: 5, den: 12}, Fraction {num: 11, den: 24}
            , Fraction {num: 1, den: 2}, Fraction {num: 13, den: 24}
            , Fraction {num: 7, den: 12}, Fraction {num: 5, den: 8}
            , Fraction {num: 2, den: 3}, Fraction {num: 17, den: 24}
            , Fraction {num: 3, den: 4}, Fraction {num: 19, den: 24}
            , Fraction {num: 5, den: 6}, Fraction {num: 7, den: 8}
            , Fraction {num: 11, den: 12}, Fraction {num: 23, den: 24}]
{-
randExperience :: Rand -> { experience :: { pAB :: Fraction
                                          , pnAB :: Fraction
                                          , pAnB :: Fraction}
                          , nextRand :: Rand}
                          -}
randExperience r = 
  let r1 = rand r
      r2 = rand r1
      r3 = rand r2
      f1 = fromJust $ fractions !! (r1.val `mod` (Array.length fractions))
      f2 = fromJust $ fractions !! (r2.val `mod` (Array.length fractions))
      f3 = fromJust $ fractions !! (r3.val `mod` (Array.length fractions))
      fs = sort [f1, f2, f3]
  in fs


tree :: forall r. { pA :: Fraction
                  , pgAB :: Fraction
                  , pgAnB :: Fraction
                  , pnA :: Fraction
                  , pgnAB :: Fraction
                  , pgnAnB :: Fraction | r}  -> Effect Unit
tree {pA, pgAB, pgAnB, pnA, pgnAB, pgnAnB} = do
  line "12" "175" "100" "92"
  line "12" "175" "100" "244"
  line "126" "80" "202" "24"
  line "126" "80" "202" "136"
  line "126" "264" "202" "208"
  line "126" "264" "202" "320"
  render $ "\\begin{array}{ccccccccc} & & & & & & & & B \\\\ "
          <> "& & & & & " <> show pgAB <> " \\\\ \\\\ "
          <> "& & & & A \\\\ "
          <> "&" <> show pA <> " \\\\ "
          <> "& & & & &" <> show pgAnB <> " \\\\ "
          <> "& & & & & & & &" <> "\\overline{B} \\\\ "
          <> "\\cdot \\\\ "
          <> "& & & & & & & &" <> "B \\\\ "
          <> "& & & & & " <> show pgnAB <> " \\\\ "
          <> "&" <> show pnA <> " \\\\ "
          <> "& & & & \\overline{A} \\\\ \\\\"
          <> "& & & & & " <> show pgnAnB <> " \\\\ "
          <> "& & & & & & & & \\overline{B} \\end{array}"

cb :: DOM.Document -> DOM.Event -> Effect Unit
cb doc = unsafePartial $ \ev -> do
  val <- DOM.inputedValueFromEvent ev
  let odd = 2 * (Ord.abs $ fromString val) + 1
  let r0 = {val: odd, gen: 0, seed: odd * odd}
  newline
  
  list [ cat [subraw "10 arbres pondérés à compléter à partir des hypothèses"] 
       , cat [subraw "1 point par arbre complet"]
       , cat [subraw "calculatrice autorisée"]
       , cat [subraw "toute valeur numérique sous forme entière ou fractionnaire"]]
  
  newline
  thisPosition <- DOM.getElementById "description" doc
  
  subsection "1)"
  tree empty
  raw $ show $ randExperience r0
  
  subsection "2)"
  tree empty
  
  newline
  let rep = ["réponses: " ]
  render $ if fromString val < 0 then foldr (<>) "" rep else ""
    
spacex :: Int -> String 
spacex n = foldr (<>) "" $ replicate n "\\;"

main :: Effect Unit
main = void $ unsafePartial do
  setup <- DOM.setup
  
  seed <- DOM.createElement "input" setup.document
  _ <- DOM.addEventListener (cb setup.document) DOM.change seed
  _ <- DOM.appendChild seed setup.body
  
  setTitle "Devoir 4 : Probabilités conditionnelles"
  raw "Nom:"
  render $ spacex 40
  raw "Prénom:"
  render $ spacex 40
  raw "Classe:"
  pure unit
  
