module Main where

import Prelude

import Article (fromIncremental, get, m, nl, put, t, b, validateInput, setTitle, invPerm)
import Concur.Core (Widget)
import Concur.Core.FRP (dyn, display, debounce)
import Concur.VDom (HTML)
import Concur.VDom.Run (runWidgetInDom)
import Concur.VDom.Props (onChange, unsafeTargetValue, onKeyEnter, attr, autoFocus) as P
import Concur.VDom.DOM as D

import Data.Array (replicate, length, sort, (:), catMaybes, all, (..), slice, zipWith)
import Data.Array ((!!)) as Array
import Data.Foldable (foldr)
import Data.Maybe (Maybe(..), fromMaybe, maybe)
import Data.Ord (abs)
import Data.String (joinWith)
import Effect (Effect)
import Rand (Rand, rand, unsort, consume, choose, rands)
import Data.Rational (fromInt, numerator, denominator)

type State = { seed :: Maybe String
             , enabled :: Boolean 
             }

class HasDefault a where
  dflt :: a
  
instance dfltInt :: HasDefault Int where
  dflt = 0
  
instance dfltString :: HasDefault String where
  dflt = ""

newtype Divisors = Div {n :: Int, ds :: Array Int, ps :: String}

instance dfltDiv :: HasDefault Divisors where
  dflt = Div {n: 1, ds: [1], ps: "1"}

newtype Factor = Fact { p :: Int, e :: Int}

instance dfltFact :: HasDefault Factor where
  dflt = Fact {p:1, e: 1}

newtype Factors = Prod (Array Factor)

instance dfltProd :: HasDefault Factors where
  dflt = Prod []

expo :: Factor -> Int
expo (Fact {p, e}) = e

divides :: Factors -> Factors -> Boolean
divides (Prod ds) (Prod ns) =
  all (\i -> (expo $ ds!!i) 
              <= (expo $ ns!!i)) (0..3)

instance showFactors :: Show Factors where
  show (Prod factors) =
    joinWith "\\times" 
      $ catMaybes $ (\(Fact {p,e}) -> 
        case e of
          0 -> Nothing
          1 -> Just $ show p
          _ -> Just $ show p <> "^" <> show e) <$> factors

newtype Fraction = Frac (Array Int)

instance dfltFrac :: HasDefault Fraction where
  dflt = Frac []

instance showFraction :: Show Fraction where
  show (Frac [a,b]) = "\\dfrac{" <> show a <> "}{" <> show b <> "}"
  show _ = ""

nth :: forall a. HasDefault a => Array a -> Int -> a
nth xs n = case xs Array.!! n of
  Just x -> x
  _      -> dflt

infixr 6 nth as !!

pick :: forall a. HasDefault a => Array a -> Rand -> a
pick xs r = xs !! (r.val `mod` (length xs -1))

showProp :: forall a. Array String -> Array Int -> Widget HTML a
showProp props ord =
  D.div [ P.attr "style" "display: grid; grid-template-columns: 1fr 1fr 1fr 1fr;"]
    [ D.label []
      ( fromIncremental $ do
          t "a) "
          _ <- m $ props !! (ord !! 0)
          get
      )
    , D.label []
      ( fromIncremental $ do
          t "b) "
          _ <- m $ props !! (ord !! 1)
          get
      )
    , D.label []
      ( fromIncremental $ do
          t "c) "
          _ <- m $ props !! (ord !! 2)
          get
      )
    , D.label []
      ( fromIncremental $ do
          t "d) "
          _ <- m $ props !! (ord !! 3)
          get
      )
    ]

showSol :: Array Int -> Array Int -> String
showSol reps ord =
    let revOrd = invPerm ord
        showRep rep = case revOrd !! rep of
          0 -> "a)"
          1 -> "b)"
          2 -> "c)"
          _ -> "d)"
      in foldr (<>) "" $ showRep <$> reps

shorts = [2,3,5,7] :: Array Int
            
composites :: Array Divisors
composites = [ Div {n: 12, ds: [1,2,3,4,6,12], ps: "2^2\\times 3"}
             , Div {n: 16, ds: [1,2,4,8,16], ps: "2^4"}
             , Div {n: 18, ds: [1,2,3,6,9,18], ps: "2\\times 3^2"}
             , Div {n: 24, ds: [1,2,3,4,6,8,12,24], ps: "2^3\\times 3"}
             , Div {n: 28, ds: [1,2,4,7,14,28], ps: "2^2\\times 7"}
             , Div {n: 36, ds: [1,2,3,4,6,9,12,18,36], ps: "2^2\\times 3^2"}
             , Div {n: 42, ds: [1,2,3,6,7,14,21,42], ps: "2\\times 3\\times 7"}
             , Div {n: 50, ds: [1,2,5,10,25,50], ps: "2\\times 5^2"}
             , Div {n: 54, ds: [1,2,3,6,9,18,27,54], ps: "2\\times 3^3"}
             ]

body :: State -> Widget HTML State
body st = dyn $ do
  display $ D.text "Enoncé n° "
  newState <- debounce 50.0 st $ 
                \s -> D.input 
                        [ P.autoFocus true
                        , (\ x -> { seed: show <$> (validateInput $ Just x)
                                  , enabled: false
                                  }
                          )  <$> P.unsafeTargetValue 
                             <$> P.onChange
                        , s { enabled = maybe false (const true) 
                                        $ validateInput s.seed} <$ P.onKeyEnter
                        ]
  let odd = 2 * abs (fromMaybe 0 $ validateInput newState.seed) + 1
      r0 = rand { val: odd
                , gen: 0
                , seed: odd*odd
                }
                    
  display $ D.div' $ if not newState.enabled 
      then []
      else fromIncremental $ do 
        
        nl
        b "1." 
        let composites1 = [9,15,21,25,27]
        t " Quelle est la seule liste uniquement composée de nombres premiers ?"
        let ps = shorts <> [11,13,17,19,23,29]
            np = length ps
            r1 = consume np r0
            rep1 = sort $ choose 4 ps r0
            
            rc2 = rand r1
            c2 = pick composites1 rc2
            r2 = consume np rc2
            rep2 = sort $ c2 : choose 3 ps r1
        
            rc3 = rand r2
            c3 = pick composites1 rc3
            r3 = consume np rc3
            rep3 = sort $ c3 : choose 3 ps r2
        
            rc4 = rand r3
            c4 = pick composites1 rc4
            r4 = consume np rc4
            rep4 = sort $ c4 : choose 3 ps r3
        
        let prop1 = (joinWith "," <<< (\xs -> show <$> xs)) <$> [rep1, rep2, rep3, rep4]
            good1 = [0]
            rs1 = consume 4 r4
            ord1 = unsort 4 r4
        nl
        nl
        put $ showProp prop1 ord1
        
        nl
        b "2."
        t " Écrire la liste des diviseurs de "
        let rs2 = consume 2 rs1
            cs = choose 2 composites rs1
            composite2 = cs!!0
        m $ show $ let Div {n, ds, ps} = composite2 in n
        t " :"
        nl
        
        nl
        b "3."
        t " Donner la décomposition en produit de facteurs premiers de "
        let rs3 = rand rs2
            composite3 = cs!!1
        m $ show $ let Div {n, ds, ps} = composite3 in n
        t " : "
        nl
        
        nl
        b "4."
        let rs'4 = consume 20 rs3
            es = (_ `mod` 5) <$> rands 20 rs3
            n = Prod $ zipWith (\p e -> Fact {p, e:e+1}) shorts $ slice 0 3 es
            n0 = Prod $ zipWith (\p e -> Fact {p, e}) shorts $ slice 4 7 es
            n1 = Prod $ zipWith (\p e -> Fact {p, e}) shorts $ slice 8 11 es
            n2 = Prod $ zipWith (\p e -> Fact {p, e}) shorts $ slice 12 15 es
            n3 = Prod $ zipWith (\p e -> Fact {p, e}) shorts $ slice 16 19 es
        t " Déterminer lesquelles de ces décompositions sont des diviseurs de "
        m $ show n
        t " (il peut ne pas y en avoir) :"
        let prop4 = show <$> [n0,n1,n2,n3]
            good4 = catMaybes  [ if divides n0 n then Just 0 else Nothing
                               , if divides n1 n then Just 1 else Nothing
                               , if divides n2 n then Just 2 else Nothing
                               , if divides n3 n then Just 3 else Nothing
                               ]
                            
            rs4 = consume 4 rs'4
            ord4 = unsort 4 rs'4
        nl     
        nl     
        put $ showProp prop4 ord4
        nl
        
        nl
        b "5."
        t " Donner la forme irréductible de "
        let fractions = Frac <$> [[27, 108]
                                 ,[420,504]
                                 ,[42,504]
                                 ,[420,252]
                                 ,[168,180]
                                 ,[70,196]
                                 ,[270,720]
                                 ,[177,264]
                                 ,[210,75]
                                 ] 
            fraction = pick fractions rs4
        m $ show fraction
        t " :"

        if (fromMaybe 0 $ validateInput newState.seed) < 0
            then do
              nl
              t "réponses: "
              b " 1. "
              t $ showSol good1 ord1
              b " 2. "
              t $ show $ let Div {n, ds, ps} = composite2 in ds
              b " 3. "
              m $ let Div {n, ds, ps} = composite3 in ps
              b " 4. "
              t $ showSol good4 ord4
              b "5. "
              m $ let Frac xs = fraction 
                      q = fromInt (xs !! 0) / fromInt (xs !! 1)
                      num = numerator q
                      den = denominator q
                   in show $ Frac [num, den]
             else pure mempty

        get

spacex :: Int -> String 
spacex n = foldr (<>) "" $ replicate n "\\;"

initialState = { seed: Nothing 
               , enabled: false
               } :: State

header :: forall a. Widget HTML a
header = D.div' $ fromIncremental $ do
  setTitle "Devoir 1 : Nombres premiers"
  nl
  put $ D.div [ P.attr "style" "display: grid; grid-template-columns: 1fr 1fr 1fr;"]
      [ D.label [] [D.text "Nom:"]
      , D.label [] [D.text "Prénom:"]
      , D.label [] [D.text "Classe:"]
      ]
  put $ D.ul []
      [ D.li [] [D.text "5 questions : pour chacune d'elle, indiquer la bonne réponse"]
      , D.li [] (fromIncremental $ do
           t "1 point par bonne réponse"
           get)
      , D.li [] [D.text "sans calculatrice"]
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
