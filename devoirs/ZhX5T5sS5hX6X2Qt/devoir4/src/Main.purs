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

foreign import fromString :: String -> Int 

data P a = P a | Z

perhaps :: forall a b. b -> (a -> b) -> P a  -> b
perhaps _ f (P a) = f a
perhaps default _ Z = default

instance showP :: Show a => Show (P a) where
  show (P a) = show a
  show _ = ""

type Experience = { pA :: P Fraction, pnA :: P Fraction
                  , pB :: P Fraction, pnB :: P Fraction
                  , pAB :: P Fraction, pAnB :: P Fraction
                  , pnAB :: P Fraction, pnAnB :: P Fraction
                  , pgAB :: P Fraction, pgAnB :: P Fraction
                  , pgnAB :: P Fraction, pgnAnB :: P Fraction }

empty :: Experience
empty = { pA: Z, pnA: Z
        , pB: Z, pnB: Z
        , pAB: Z, pAnB: Z
        , pnAB: Z, pnAnB: Z
        , pgAB: Z, pgAnB: Z 
        , pgnAB: Z, pgnAnB: Z } 

complete :: Experience -> Experience
complete e@{pA,pnA,pB,pnB,pAB,pAnB,pnAB,pnAnB,pgAB,pgAnB,pgnAB,pgnAnB} = 
  case [pA,pnA,pB,pnB,pAB,pAnB,pnAB,pnAnB,pgAB,pgAnB,pgnAB,pgnAnB] of
        [P pA',Z,Z,Z,Z,Z,Z,Z,P pgAB',Z,P pgnAB',Z] ->
          let pnA' = fromInt 1 - pA'
              pgAnB' = fromInt 1 - pgAB'
              pgnAnB' = fromInt 1 - pgnAB'
              pAB' = pA' * pgAB'
              pnAB' = pgnAB' * pnA'
              pAnB' = pA' * pgAnB'
              pB' = pAB' + pnAB'
              pnB' = fromInt 1 - pB'
              pnAnB' = pnA' * pgnAnB'
          in { pA, pgAB, pgnAB
             , pnA: P pnA', pAB: P pAB', pnAB: P pnAB'
             , pB: P pB', pnB: P pnB'
             , pgAnB: P pgAnB', pgnAnB: P pgnAnB'
             , pAnB:  P pAnB', pnAnB: P pnAnB'}  
        
        [P pA',Z,Z,Z,Z,Z,P pnAB',Z,P pgAB',Z,Z,Z] ->
          let pnA' = fromInt 1 - pA'
              pgnAB' = pnAB' / pnA'
           in complete empty{pA = pA, pgAB = pgAB, pgnAB = P pgnAB'}

        [Z,P pnA',Z,Z,P pAB',Z,Z,P pnAnB',Z,Z,Z,Z] ->
          let pA' = fromInt 1 - pnA'
              pgAB' = pAB' / pA'
              pnAB' = pnA' - pnAnB'
           in complete empty{pA = P pA', pgAB = P pgAB', pnAB = P pnAB'}

        [Z,Z,Z,Z,Z,Z,Z,P pnAnB',P pgAB',Z,P pgnAB',Z] ->
          let pgnAnB' = fromInt 1 - pgnAB'
              pnA' = pnAnB' / pgnAnB'
              pA' = fromInt 1 - pnA'
          in complete empty{pA = P pA', pgAB = pgAB, pgnAB = pgnAB}

        [Z,Z,Z,Z,P pAB',Z,P pnAB',Z,Z,P pgAnB',Z,Z] ->
          let pgAB' = fromInt 1 - pgAnB'
              pA' = pAB' / pgAB'
              pnA' = fromInt 1 - pA'
              pgnAB' = pnAB' / pnA'
          in complete empty{pA = P pA' , pgAB = P pgAB', pgnAB = P pgnAB'}

        [Z,Z,Z,Z,P pAB', P pAnB', P pnAB',Z,Z,Z,Z,Z] ->
          let pA' = pAB' + pAnB'
              pgAnB' = pAnB' / pA'
          in complete empty {pgAnB = P pgAnB', pAB = pAB, pnAB = pnAB}

        [P pA',Z,Z,P pnB',Z,Z,Z,Z,P pgAB',Z,Z,Z] ->
          let pAB' = pA' * pgAB'
              pB' = fromInt 1 - pnB'
              pnAB' = pB' - pAB'
              pnA' = fromInt 1 - pA'
              pgnAB' = pnAB' / pnA'
          in complete empty{pA = pA, pgAB = pgAB, pgnAB = P pgnAB'}

        [Z,P pnA',P pB',Z,Z,Z,Z,P pnAnB',Z,Z,Z,Z] ->
          let pnB' = fromInt 1 - pB'
              pAnB' = pnB' - pnAnB'
              pA' = fromInt 1 - pnA'
              pAB' = pA' - pAnB'
              pgAB' = pAB' / pA'
          in complete empty{pA = P pA', pgAB = P pgAB', pnB = P pnB'}

        [Z,Z,P pB',Z,Z,Z,Z,Z,P pgAB',Z,P pgnAB',Z] ->
          let mn = min pgAB' pgnAB'
              mx = max pgAB' pgnAB'
          in if mn < pB' && pB' < mx
              then 
                let pA' = (pB' - pgnAB') / (pgAB' - pgnAB')
                    pnB' = fromInt 1 - pB'
                in complete empty{pA = P pA', pgAB = pgAB, pnB = P pnB'}
              else empty

        [Z,Z,Z,P pnB',Z,Z,P pnAB',Z,Z,P pgAnB',Z,Z] ->
          let pB' = fromInt 1 - pnB'
              pAB' = pB' - pnAB'
          in complete empty {pgAnB = pgAnB, pAB = P pAB', pnAB = pnAB}
        [Z,Z,P pB',Z,Z,P pAnB',P pnAB',Z,Z,Z,Z,Z] ->
          let pAB' = pB'- pnAB'
           in complete empty{pAB = P pAB', pAnB = pAnB, pnAB = pnAB}

        otherwise -> e

primes :: Array Int
primes = [2,2,2,2,2,2,3,3,3,3,3,5,5,5,5]

avgNbFactors = 1 :: Int

randProba :: Rand -> {probability :: Fraction, nextRand :: Rand}
randProba = unsafePartial \ r -> 
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
   in case unit of
           unit | num < den -> {probability: Fraction {num, den}, nextRand}
                | num > den -> { probability: Fraction {num: den, den: num}
                               , nextRand}
                | otherwise -> randProba nextRand 

randExperience :: Rand -> { experience :: Experience
                          , nextRand :: Rand}                        
randExperience r = 
  let {probability: pAB, nextRand: r'} = randProba r
      {probability: p', nextRand: r''} = randProba r'
      pnAB = p' * (fromInt 1 - pAB)
      {probability: p'', nextRand} = randProba r''
      pAnB = p'' * (fromInt 1 - pAB - pnAB) 
   in { experience: empty {pAB = P pAB, pnAB = P pnAB, pAnB = P pAnB}
      , nextRand}

tree :: Experience  -> Effect Unit
tree e = do
-- https://www.sitepoint.com/how-to-translate-from-dom-to-svg-coordinates-and-back-again/
  line "12" "175" "100" "92"
  line "12" "175" "100" "244"
  line "126" "80" "202" "24"
  line "126" "80" "202" "136"
  line "126" "264" "202" "208"
  line "126" "264" "202" "320"
  render $ "\\begin{array}{ccccccccc} & & & & & & & & B \\\\ "
          <> "& & & & & " <> show e.pgAB <> " \\\\ \\\\ "
          <> "& & & & A \\\\ "
          <> "&" <> show e.pA <> " \\\\ "
          <> "& & & & &" <> show e.pgAnB <> " \\\\ "
          <> "& & & & & & & &" <> "\\overline{B} \\\\ "
          <> "\\cdot \\\\ "
          <> "& & & & & & & &" <> "B \\\\ "
          <> "& & & & & " <> show e.pgnAB <> " \\\\ "
          <> "&" <> show e.pnA <> " \\\\ "
          <> "& & & & \\overline{A} \\\\ \\\\"
          <> "& & & & & " <> show e.pgnAnB <> " \\\\ "
          <> "& & & & & & & & \\overline{B} \\end{array}"
  let pB = perhaps "" (\x -> "&&&&P(B)=" <> show x <> "\\\\") e.pB
  let pnB = perhaps "" (\x -> "&&&&P(\\overline{B})=" <> show x <> "\\\\") e.pnB
  let pAB = perhaps "" (\x -> "&&&&P(A\\cap B)=" <> show x <> "\\\\") e.pAB
  let pAnB = perhaps "" (\x -> "&&&&P(A\\cap\\overline{B})=" <> show x <> "\\\\") e.pAnB
  let pnAB = perhaps "" (\x -> "&&&&P(\\overline{A}\\cap B)=" <> show x <> "\\\\") e.pnAB
  let pnAnB = perhaps "" (\x -> "&&&&P(\\overline{A}\\cap\\overline{B})=" <> show x <> "\\\\") e.pnAnB
  render $ "\\begin{array}{lllll}" <> pB <> pnB <> pAB <> pAnB <> pnAB <> pnAnB <> "\\end{array}"

exercice :: Int -> Experience -> Experience
exercice n ref =
  case n of
       0 -> empty{pA = ref.pA, pgAB = ref.pgAB, pgnAB = ref.pgnAB}
       1 -> empty{pA = ref.pA, pgAB = ref.pgAB, pnAB = ref.pnAB}
       2 -> empty{pnA = ref.pnA, pAB = ref.pAB, pnAnB = ref.pnAnB}
       3 -> empty{pnAnB = ref.pnAnB, pgAB = ref.pgAB, pgnAB = ref.pgnAB}
       4 -> empty{pAB = ref.pAB, pnAB = ref.pnAB, pgAnB = ref.pgAnB}
       5 -> empty{pAB = ref.pAB, pnAB = ref.pnAB, pAnB = ref.pAnB}
       6 -> empty{pA = ref.pA, pnB = ref.pnB, pgAB = ref.pgAB}
       7 -> empty{pnA = ref.pnA, pB = ref.pB, pnAnB = ref.pnAnB}
       8 -> empty{pB = ref.pB, pgAB = ref.pgAB, pgnAB = ref.pgnAB}
       9 -> empty{pnB = ref.pnB, pnAB = ref.pnAB, pgAnB = ref.pgAnB}
       10 -> empty{pAnB = ref.pAnB, pnAB = ref.pnAB, pB = ref.pB}
       otherwise -> empty
  
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
  let r1 = rand r0
  let {experience: e1, nextRand: r2} = randExperience r0
  let exo = r1.val `mod` 11
  let e2 = exercice exo (complete e1) 
  tree e2

  
  subsection "2)"
  tree $ complete e2
  raw $ show $ complete e2
  
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
  
