module Main where

import Prelude
import Effect (Effect)
import Data.Maybe(Maybe(..),fromJust)
import Partial.Unsafe(unsafePartial)
import KaTeX (cat, line, list, newline, raw, render
             , setTitle, subraw, subsection)
import DOM.Editor as DOM
import Data.Array(replicate, (!!), (\\), scanl, last,uncons)
import Data.Array(length) as Array
import Data.Foldable(foldr,all)
import Data.Ord(abs) as Ord
import Fraction (Fraction(..), fromInt)
import Rand (Rand, rand)
import Type.Prelude (SProxy(..))
import Record(set, get)
import Prim.Row(class Cons)
import Data.Symbol(class IsSymbol)

foreign import fromString :: String -> Int 

data P a = P a | Z

instance eqP :: Eq a => Eq (P a) where
  eq (P a) (P b) = a == b
  eq Z Z = true
  eq _ _ = false

unP :: forall a. P a -> a
unP = unsafePartial $ \ (P a) -> a

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
                  , pgnAB :: P Fraction, pgnAnB :: P Fraction 
                  , pgBA :: P Fraction, pgBnA :: P Fraction
                  , pgnBA :: P Fraction, pgnBnA :: P Fraction }

content :: Experience
content = { pA: Z, pnA: Z
          , pB: Z, pnB: Z
          , pAB: Z, pAnB: Z
          , pnAB: Z, pnAnB: Z
          , pgAB: Z, pgAnB: Z 
          , pgnAB: Z, pgnAnB: Z 
          , pgBA: Z, pgBnA: Z 
          , pgnBA: Z, pgnBnA: Z } 

pA = SProxy :: SProxy "pA"
pnA = SProxy :: SProxy "pnA"
pB = SProxy :: SProxy "pB"
pnB = SProxy :: SProxy "pnB"
pAB = SProxy :: SProxy "pAB"
pAnB = SProxy :: SProxy "pAnB"
pnAB = SProxy :: SProxy "pnAB"
pnAnB = SProxy :: SProxy "pnAnB"
pgAB = SProxy :: SProxy "pgAB"
pgAnB = SProxy :: SProxy "pgAnB"
pgnAB = SProxy :: SProxy "pgnAB"
pgnAnB = SProxy :: SProxy "pgnAnB"
pgBA = SProxy :: SProxy "pgBA"
pgBnA = SProxy :: SProxy "pgBnA"
pgnBA = SProxy :: SProxy "pgnBA"
pgnBnA = SProxy :: SProxy "pgnBnA"

cond :: forall pc pi pr row rc ri rr. 
     IsSymbol pc => Cons pc (P Fraction) rc row 
  => IsSymbol pi => Cons pi (P Fraction) ri row
  => IsSymbol pr => Cons pr (P Fraction) rr row =>
     SProxy pc 
  -> SProxy pi 
  -> SProxy pr 
  -> Record row -> P (Record row)
cond pc pi pr e = 
  case [get pc e, get pi e, get pr e] of
       [P c, P i, Z] -> P $ set pr (P $ i / c) e
       [P c, Z, P r] -> P $ set pi (P $ c * r) e
       [Z, P i, P r] -> P $ set pc (P $ i / r) e
       otherwise -> Z

contr :: forall pa pna ra rna row. 
     IsSymbol pa => Cons pa (P Fraction) ra row
  => IsSymbol pna => Cons pna (P Fraction) rna row => 
     SProxy pa 
  -> SProxy pna 
  -> Record row -> P (Record row)
contr pa pna e = 
  case [get pa e, get pna e] of
       [P a, Z] -> P $ set pna (P $ fromInt 1 - a) e
       [Z, P na] -> P $ set pa (P $ fromInt 1 - na) e
       otherwise -> Z

ptot :: forall pa pab panb row ra rab ranb. 
     IsSymbol pa  => Cons pa (P Fraction) ra row 
  => IsSymbol pab => Cons pab (P Fraction) rab row 
  => IsSymbol panb => Cons panb (P Fraction) ranb row =>
     SProxy pa
  -> SProxy pab 
  -> SProxy panb 
  -> Record row -> P (Record row)
ptot pa pab panb e = 
  case [get pa e, get pab e, get panb e] of
       [P a, P ab, Z] -> P $ set panb (P $ a - ab) e
       [P a, Z, P anb] -> P $ set pab (P $ a - anb) e
       [Z, P ab, P anb] -> P $ set pa (P $ ab + anb) e
       otherwise -> Z

dep :: forall pa pb pgab pgnab row ra rb rgab rgnab. 
     IsSymbol pa  => Cons pa (P Fraction) ra row 
  => IsSymbol pb => Cons pb (P Fraction) rb row 
  => IsSymbol pgab => Cons pgab (P Fraction) rgab row
  => IsSymbol pgnab => Cons pgnab (P Fraction) rgnab row =>
     SProxy pa 
  -> SProxy pb 
  -> SProxy pgab 
  -> SProxy pgnab 
  -> Record row -> P (Record row)
dep pa pb pgab pgnab e = 
  case [get pa e, get pb e, get pgab e, get pgnab e] of
       [P a, P b, P gab, Z] -> 
         P $ set pgnab (P $ (b-gab*a)/(fromInt 1 -a)) e
       [P a, P b, Z, P gnab] -> 
         P $ set pgab (P $ (b-gnab*(fromInt 1 - a))/a) e
       [P a, Z, P gab, P gnab] -> 
         P $ set pb (P $ gab*a+gnab*(fromInt 1 - a)) e
       [Z, P b, P gab, P gnab] -> 
         P $ set pa (P $ (b-gnab)/(gab-gnab)) e
       otherwise -> Z


complete :: Experience -> Experience
complete e =
  let rules = [ contr pA pnA e
              , contr pB pnB e
              , contr pgAB pgAnB e
              , contr pgnAB pgnAnB e
              , contr pgBA pgBnA e
              , contr pgnBA pgnBnA e
              , cond pgAB pAB pA e
              , cond pgAnB pAnB pA e
              , cond pgnAB pnAB pnA e
              , cond pgnAnB pnAnB pnA e
              , cond pgBA pAB pB e
              , cond pgBnA pnAB pB e
              , cond pgnBA pAnB pnB e
              , cond pgnBnA pnAnB pnB e
              , ptot pA pAB pAnB e
              , ptot pnA pnAB pnAnB e
              , ptot pB pAB pnAB e
              , ptot pnB pAnB pnAnB e
              , dep pA pB pgAB pgnAB e]
      f xs = 
        case uncons xs of
             Nothing -> e
             Just {head: r, tail: rs} ->
               case r of
                  P e' -> complete e'
                  Z -> f rs
  in f rules

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

validExperience :: Experience -> Boolean
validExperience { pA: P pA', pnA: P pnA'
                , pB: P pB', pnB: P pnB'
                , pAB: P pAB', pAnB: P pAnB'
                , pnAB: P pnAB', pnAnB: P pnAnB'
                , pgAB: P pgAB', pgAnB: P pgAnB' 
                , pgnAB: P pgnAB', pgnAnB: P pgnAnB' 
                , pgBA: P pgBA', pgBnA: P pgBnA' 
                , pgnBA: P pgnBA', pgnBnA: P pgnBnA' } =
      let valid x = fromInt 0 < x && x < fromInt 1
      in all valid [pA',pnA',pB',pnB',pAB',pAnB',pnAB',pnAnB'
                   ,pgAB',pgAnB',pgnAB',pgnAnB',pgBA',pgBnA',pgnBA',pgnBnA']
validExperience _ = false

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
  let dress str x = "&&&&" <> str <> show x <> "\\\\" 
  let pB' = perhaps "" (dress "P(B)=") e.pB
  let pnB' = perhaps "" (dress "P(\\overline{B})=") e.pnB
  let pAB' = perhaps "" (dress "P(A\\cap B)=") e.pAB
  let pAnB' = perhaps "" (dress "P(A\\cap\\overline{B})=") e.pAnB
  let pnAB' = perhaps "" (dress "P(\\overline{A}\\cap B)=") e.pnAB
  let pnAnB' = perhaps "" (dress "P(\\overline{A}\\cap\\overline{B})=") e.pnAnB
  let pgBA' = perhaps "" (dress "P_B(A)=") e.pgBA
  let pgBnA' = perhaps "" (dress "P_B(\\overline{A})=") e.pgBnA
  let pgnBA' = perhaps "" (dress "P_{\\overline{B}}(A)=") e.pgnBA
  let pgnBnA' = perhaps "" (dress "P_{\\overline{B}}(\\overline{A})=") e.pgnBnA
  render $ "\\begin{array}{lllll}" <> pB' <> pnB' 
                                   <> pAB' <> pAnB' <> pnAB' <> pnAnB' 
                                   <> pgBA' <> pgBnA' <> pgnBA' <> pgnBnA' 
                                   <>"\\end{array}"

exercice :: forall p1 p2 p3 row r1 r2 r3. 
     IsSymbol p1  => Cons p1 (P Fraction) r1 row 
  => IsSymbol p2  => Cons p2 (P Fraction) r2 row
  => IsSymbol p3  => Cons p3 (P Fraction) r3 row => 
     Record row 
  -> SProxy p1 
  -> SProxy p2 
  -> SProxy p3 
  -> Record row -> Record row
exercice cnt p1 p2 p3 ref = 
  set p1 (get p1 ref) $ set p2 (get p2 ref) 
    $ set p3 (get p3 ref) cnt

majIndex = 16 :: Int 

setWithIndex :: Int -> Fraction -> Experience -> Experience
setWithIndex n f e = 
  case n of
       0 -> set pA (P f) e
       1 -> set pnA (P f) e
       2 -> set pB (P f) e
       3 -> set pnB (P f) e
       4 -> set pAB (P f) e
       5 -> set pAnB (P f) e
       6 -> set pnAB (P f) e
       7 -> set pnAnB (P f) e
       8 -> set pgAB (P f) e
       9 -> set pgAnB (P f) e
       10 -> set pgnAB (P f) e
       11 -> set pgnAnB (P f) e
       12 -> set pgBA (P f) e
       13 -> set pgBnA (P f) e
       14 -> set pgnBA (P f) e
       otherwise -> set pgnBnA (P f) e

randExercise :: Rand -> {experience :: Experience, nextRand :: Rand}
randExercise r1 =
  let modMaj x = x `mod` majIndex
      f2 r = 
        let s = rand r
        in if modMaj s.val  == modMaj r.val
            then f2 s
            else s
      f3 r s = 
        let t = rand s
        in if modMaj t.val == modMaj r.val || modMaj t.val == modMaj s.val
             then f3 s t
             else t
      r2 = f2 r1
      r3 = f3 r1 r2
      {probability: p1, nextRand: r4} = randProba r3
      {probability: p2, nextRand: r5} = randProba r4
      {probability: p3, nextRand} = randProba r5
      e = setWithIndex (modMaj r1.val) p1
             $ setWithIndex (modMaj r2.val) p2
             $ setWithIndex (modMaj r3.val) p3 content
   in if validExperience (complete e)
        then {experience: e, nextRand}
        else randExercise nextRand

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
  let {experience: e1, nextRand: r2} = randExercise r1
    {-      
            pA pgAB pgnAB
            pAB pnAB pgAnB
            pAB pAnB pnAB
            pA pnAB pgAB
            pnA pAB pnAnB
            pnAnB pgAB pgnAB
            pA pnB pgAB
            pnA pB pnAnB
            pB pgAB pgnAB
            pnB pnAB pgAnB
            pB pAnB pnAB
            -}
  tree e1
  tree $ complete e1
  raw $ show $ complete e1

  subsection "2)"
  let {experience: e2, nextRand: r3} = randExercise r2
  tree e2
  tree $ complete e2
  raw $ show $ complete e2
  
  subsection "3)"
  let e3 = content { pAB = P (Fraction {num: 1, den: 4})
                   , pAnB = P (Fraction {num: 1, den: 2})
                   , pnAB = P (Fraction {num: 1, den: 5})}
  tree e3
  tree $ complete e3
  raw $ show $ complete e3
  
  subsection "4)"
  let e4 = content { pgAB = P (Fraction {num: 1, den: 6})
                   , pgnAB = P (Fraction {num: 1, den: 4})
                   , pB = P (Fraction {num: 1, den: 5})}
  tree e4
  tree $ complete e4
  raw $ show $ complete e4
  
  subsection "5)"
  let e5 = content { pgBA = P (Fraction {num: 1, den: 6})
                   , pgnBA = P (Fraction {num: 1, den: 6})
                   , pB = P (Fraction {num: 1, den: 5})}
  tree e5
  tree $ complete e5
  raw $ show $ complete e5

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

  _ <- DOM.focus seed
  pure unit
  
