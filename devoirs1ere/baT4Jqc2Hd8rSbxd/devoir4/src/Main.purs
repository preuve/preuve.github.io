module Main where

import Prelude

import Article (fromIncremental, get, m, nl, put, setTitle, validateInput)
import Concur.Core (Widget)
import Concur.Core.FRP (dyn, display, debounce)
import Concur.VDom (HTML)
import Concur.VDom.GeometryRender (render')
import Concur.VDom.Run (runWidgetInDom)
import Concur.VDom.Props (onChange, unsafeTargetValue, onKeyEnter, attr, autoFocus, size) as P
import Concur.VDom.DOM as D
import Concur.VDom.SVG as S
import Data.Array (fromFoldable, last, replicate, uncons, (\\))
import Data.Array (length, (!!)) as Array
import Data.Geometry.Plane (point, segment)
import Data.Maybe (Maybe(..), fromMaybe, maybe)
import Data.Rational (Rational, denominator, fromInt, numerator)
import Data.Traversable (scanl, foldr, all)
import Data.Ord(abs) as Ord
import Effect (Effect)
import Rand (Rand, rand)
import Data.Map (Map, empty, insert, lookup, values)

type State = { seed :: Maybe String
             , enabled :: Boolean 
             }

showFraction :: Rational -> String
showFraction f = 
    if denominator f == 1 
      then show $ numerator f
      else "\\frac{" <> show (numerator f) <> "}{" <> show (denominator f) <> "}"

type Key = String
type Experience = Map Key Rational

cond :: Key -> Key -> Key -> Experience -> Maybe Experience
cond pc pi pr e = 
  case [lookup pc e, lookup pi e, lookup pr e] of
       [Just c, Just i, Nothing] -> Just $ insert pr (i / c) e
       [Just c, Nothing, Just r] -> Just $ insert pi (c * r) e
       [Nothing, Just i, Just r] -> Just $ insert pc (i / r) e
       otherwise -> Nothing

contr :: Key -> Key -> Experience -> Maybe Experience
contr pa pna e = 
  case [lookup pa e, lookup pna e] of
       [Just a, Nothing] -> Just $ insert pna (fromInt 1 - a) e
       [Nothing, Just na] -> Just $ insert pa (fromInt 1 - na) e
       otherwise -> Nothing

ptot :: Key -> Key -> Key -> Experience -> Maybe Experience
ptot pa pab panb e = 
  case [lookup pa e, lookup pab e, lookup panb e] of
       [Just a, Just ab, Nothing] -> Just $ insert panb (a - ab) e
       [Just a, Nothing, Just anb] -> Just $ insert pab (a - anb) e
       [Nothing, Just ab, Just anb] -> Just $ insert pa (ab + anb) e
       otherwise -> Nothing

complete :: Experience -> Experience
complete e =
  let rules = [ contr "pA" "pnA"
              , contr "pB" "pnB"
              , contr "pgAB" "pgAnB"
              , contr "pgnAB" "pgnAnB"
              , contr "pgBA" "pgBnA"
              , contr "pgnBA" "pgnBnA"
              , cond "pgAB" "pAB" "pA"
              , cond "pgAnB" "pAnB" "pA"
              , cond "pgnAB" "pnAB" "pnA"
              , cond "pgnAnB" "pnAnB" "pnA"
              , cond "pgBA" "pAB" "pB"
              , cond "pgBnA" "pnAB" "pB"
              , cond "pgnBA" "pAnB" "pnB"
              , cond "pgnBnA" "pnAnB" "pnB"
              , ptot "pA" "pAB" "pAnB"
              , ptot "pnA" "pnAB" "pnAnB"
              , ptot "pB" "pAB" "pnAB"
              , ptot "pnB" "pAnB" "pnAnB"
              ]
      f xs = 
        case uncons xs of
             Nothing -> e
             Just {head: rule, tail} ->
               case rule e of
                  Just e' -> complete e'
                  Nothing -> f tail
  in f rules

primes :: Array Int
primes = [2,2,2,2,2,2,3,3,3,3,3,5,5,5,5]

avgNbFactors = 2 :: Int

class HasDefault a where
  dflt :: a
  
instance dfltInt :: HasDefault Int where
  dflt = 0

nth :: forall a. HasDefault a => Array a -> Int -> a
nth xs n = case xs Array.!! n of
  Just x -> x
  _      -> dflt

infixr 6 nth as !!

randProba :: Rand -> {probability :: Rational, nextRand :: Rand}
randProba = \ r -> 
  let r0 = rand r
      nbNumFactors = 1 + (r0.val `mod` avgNbFactors)
      r1 = rand r0
      nbDenFactors = 1 + (r1.val `mod` avgNbFactors)
      nrands = (\f -> f r1) <$> (scanl (<<<) identity 
                             $ replicate nbNumFactors rand)
      r2 = fromMaybe r1 $ last nrands
      drands = (\f -> f r2) <$> (scanl (<<<) identity 
                             $ replicate nbDenFactors rand)
      r3 = fromMaybe r2 $ last drands
      nextRand = rand r3
      prime = \ ix -> primes !! ix 
      nums = prime <$> (\rnd -> rnd.val `mod` (Array.length primes)) 
                   <$> nrands
      dens = prime <$> (\rnd -> rnd.val `mod` (Array.length primes)) 
                   <$> drands
      num = foldr (*) 1 $ nums \\ dens
      den = foldr (*) 1 $ dens \\ nums
   in case unit of
           unit | num < den -> {probability: fromInt num / fromInt den, nextRand}
                | num > den -> { probability: fromInt den / fromInt num
                               , nextRand}
                | otherwise -> randProba nextRand 

validExperience :: Experience -> Boolean
validExperience e =
      let valid x = fromInt 0 < x && x < fromInt 1
          vs = fromFoldable $ values e
      in Array.length vs == 16 && all valid vs

print :: Experience -> Key -> String
print e key = 
        case lookup key e of
             Just p -> showFraction p
             Nothing -> ""

infixr 6 print as °

tree :: forall a. Experience  -> Array (Widget HTML a)
tree e = 
-- https://www.sitepoint.com/how-to-translate-from-dom-to-svg-coordinates-and-back-again/
  let o = { x: 9.0, y: 27.0}
      dot {x, y} = point "" x y
      root = dot { x: o.x, y: o.y + 151.0 }
      nodeA = dot { x: o.x + 88.0, y: o.y + 68.0 }
      nodeA' = dot { x: o.x + 88.0, y: o.y + 220.0 }
      startA = dot { x: o.x + 122.0, y: o.y + 60.0 }
      endAB = dot { x: o.x + 188.0, y: o.y}
      endAB' =  dot { x: o.x + 188.0, y: o.y + 112.0 }
      startA' =  dot { x: o.x + 122.0, y: o.y + 244.0 }
      endA'B =  dot { x: o.x + 188.0, y: o.y + 184.0 }
      endA'B' = dot { x: o.x + 188.0, y: o.y + 296.0 }

      dress str x k = 
        case lookup k x of
           Just v -> "\\quad " <> str <> showFraction v 
           Nothing -> "" 
      pB' = dress "P(B)=" e "pB"
      pnB' = dress "P(\\overline{B})=" e "pnB"
      pAB' = dress "P(A\\cap B)=" e "pAB"
      pAnB' = dress "P(A\\cap\\overline{B})=" e "pAnB"
      pnAB' = dress "P(\\overline{A}\\cap B)=" e "pnAB"
      pnAnB' = dress "P(\\overline{A}\\cap\\overline{B})="  e "pnAnB"
      pgBA' = dress "P_B(A)=" e "pgBA"
      pgBnA' = dress "P_B(\\overline{A})=" e "pgBnA"
      pgnBA' = dress "P_{\\overline{B}}(A)=" e "pgnBA"
      pgnBnA' = dress "P_{\\overline{B}}(\\overline{A})=" e "pgnBnA"
      context = { stroke: "#000"
                , strokeWidth: 1.5
                , fill: "#00000000"
                , fontStyle: "italic 15px arial, sans-serif"
                , textFill: "#000"}
  in fromIncremental do
      put $ S.svg 
              [ S.width "500"
              , S.height "400"
              , S.attr "style" "position: absolute; " 
              ] $
              render' context 
                [ segment root nodeA Nothing
                , segment root nodeA' Nothing 
                , segment startA endAB  Nothing
                , segment startA endAB'  Nothing
                , segment startA' endA'B  Nothing
                , segment startA' endA'B'  Nothing
                ]
      m $ "\\boxed{\\begin{array}{cccccccccccl} & & & & & & & & B \\\\ "
          <> "& & & & & " <> e°"pgAB"<> "&&&&&&" <> pB'  <> " \\\\" 
          <> " \\\\ "
          <> "& & & & A "<> "&&&&&&&" <> pnB' <> "\\\\ "
          <> "&" <> e°"pA" <> "&&&&&&&&&&" <> pAB' <> " \\\\ "
          <> "& & & & &" <> e°"pgAnB" <> "&&&&&&" <> pAnB' <> " \\\\ "
          <> "& & & & & & & &" <> "\\overline{B} " <> "&&&" <> pnAB' <> "\\\\ "
          <> "\\cdot " <> "&&&&&&&&&&&" <> pnAnB' <> "\\\\ "
          <> "& & & & & & & &" <> "B " <> "&&&" <> pgBA' <> "\\\\ "
          <> "& & & & & " <> e°"pgnAB" <> "&&&&&&" <> pgBnA' <> " \\\\ "
          <> "&" <> e°"pnA" <> "&&&&&&&&&&" <> pgnBA' <> " \\\\ "
          <> "& & & & \\overline{A}" <> "&&&&&&&" <> pgnBnA' <>  "\\\\ " 
          <> " \\\\"
          <> "& & & & & " <> e°"pgnAnB" <> " \\\\ "
          <> "& & & & & & & & \\overline{B} \\end{array}}"
      get

exercice :: Key -> Key -> Key -> Experience -> Experience 
exercice p1 p2 p3 ref = 
   insert p1 (fromMaybe zero $ lookup p1 ref) 
    $ insert p2 (fromMaybe zero $ lookup p2 ref) 
      $ insert p3 (fromMaybe zero $ lookup p3 ref) empty

majIndex = 12 :: Int 

setWithIndex :: Int -> Rational -> Experience -> Experience
setWithIndex n f e = 
  insert (case n of
       0 -> "pA"
       1 -> "pnA"
       2 -> "pB"
       3 -> "pnB"
       4 -> "pAB"
       5 -> "pAnB"
       6 -> "pnAB"
       7 -> "pnAnB"
       8 -> "pgAB"
       9 -> "pgAnB"
       10 -> "pgnAB"
       11 -> "pgnAnB"
       12 -> "pgBA"
       13 -> "pgBnA"
       14 -> "pgnBA"
       otherwise -> "pgnBnA") f e

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
             $ setWithIndex (modMaj r3.val) p3 empty
   in if validExperience (complete e)
        then {experience: e, nextRand}
        else randExercise nextRand

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

body :: State -> Widget HTML State
body st = dyn $ do
  display $ D.text "Enoncé n° "
  newState <- debounce 50.0 st $ 
                \s -> D.input 
                        [ P.size 6
                        , P.autoFocus true
                        , (\ x -> { seed: show <$> (validateInput $ Just x)
                                  , enabled: false
                                  }
                          )  <$> P.unsafeTargetValue 
                             <$> P.onChange
                        , s { enabled = maybe false (const true) 
                                        $ validateInput s.seed} <$ P.onKeyEnter
                        ]
  let odd = 2 * Ord.abs (fromMaybe 0 $ validateInput newState.seed) + 1
      r0 = rand { val: odd
                , gen: 0
                , seed: odd*odd
                }
  display $ D.div' $ if not newState.enabled 
      then []
      else fromIncremental $ do    
        nl
      
        let r1 = rand r0
        let prob e = 
              if (fromMaybe 0 $ validateInput newState.seed) < 0
                then tree $ complete e
                else tree e
        let {experience: e1, nextRand: r2} = randExercise r1
            {experience: e2, nextRand: r3} = randExercise r2
            {experience: e3, nextRand: r4} = randExercise r3
            {experience: e4, nextRand: r5} = randExercise r4
            {experience: e5, nextRand: r6} = randExercise r5

        put $ D.div' $ prob e1 <> prob e2
        nl
        put $ D.div' $ prob e3 <> prob e4
        nl
        put $ D.div' $ prob e5
        get        
  
initialState = { seed: Nothing 
               , enabled: false
               } :: State

header :: forall a. Widget HTML a
header = D.div' $ fromIncremental $ do
  setTitle "Devoir 4 : Probabilités conditionnelles"
  nl
  put $ D.div [ P.attr "style" "display: grid; grid-template-columns: 1fr 1fr 1fr;"]
      [ D.label [] [D.text "Nom:"]
      , D.label [] [D.text "Prénom:"]
      , D.label [] [D.text "Classe:"]
      ]
  put $ D.ul []
      [ D.li [] [D.text "5 arbres pondérés à compléter à partir des hypothèses"]
      , D.li [] [D.text "1 point par arbre complet"]
      , D.li [] [D.text "calculatrice autorisée"]
      , D.li [] [D.text "documents autorisés"]
      , D.li [] [D.text "toute valeur numérique sous forme fractionnaire"]
      ]
  get

article :: State -> Widget HTML State
article state =
  D.div'
    [ header
    , body state
    ]

main :: Effect Unit
main = runWidgetInDom "main"
           $ article initialState

