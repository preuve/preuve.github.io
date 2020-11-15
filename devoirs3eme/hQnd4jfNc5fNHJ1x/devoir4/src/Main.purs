module Main where

import Prelude

import Article  ( fromIncremental
                , get, m, nl, put, t, b, validateInput
                , setTitle)
import Concur.Core (Widget)
import Concur.Core.FRP (dyn, display, debounce)
import Concur.VDom (HTML)
import Concur.VDom.DOM as D
import Concur.VDom.GeometryRender(class Render, render', defaultContext)
import Concur.VDom.Props  (onChange, unsafeTargetValue
                          , onKeyEnter, attr, autoFocus, size) as P
import Concur.VDom.Run (runWidgetInDom)
import Data.Maybe (Maybe(..), fromMaybe, maybe)
import Data.Ord (abs) as Ord
import Effect (Effect)
import Rand (Rand, rand)
import Data.Rational (Rational, fromInt, numerator, denominator)

type State = { seed :: Maybe String
             , enabled :: Boolean 
             }

intMax = 9 :: Int

randPositive :: Rand -> Rand
randPositive r =
  if r.val `mod` intMax == 0
    then randPositive (rand r)
    else r

-- m /= 0, p  /= 0
randAffine :: Rand -> {m :: Int, p :: Int, r :: Rand}
randAffine r =
  let rm = randPositive $ rand r
      rp = randPositive $ rand rm
      rsm = rand rp
      rsp = rand rsm
      sm = if rsm.val `mod` 2 == 0 then 1 else -1
      sp = if rsp.val `mod` 2 == 0 then 1 else -1
  in { m: sm * (1 + rm.val `mod` intMax)
     , p: sp * (1 + rp.val `mod` intMax)
     , r: rsp
     }

showHead :: Int -> String -> String
showHead n suffix =
    (case unit of
      unit | n == 1    -> ""
           | n == -1   -> "-"
           | otherwise -> show n)
    <> suffix

showInline :: Int -> String -> String
showInline n suffix =
  case unit of
    unit | n == 1 && suffix == ""  -> "+1"
         | n == -1 && suffix == "" -> "-1"
         | n == 1                  -> "+" <> suffix
         | n == -1                 -> "-" <> suffix
         | n < 0                   -> show n <> suffix
         | n == 0                  -> ""
         | otherwise               -> "+" <> show n <> suffix

showAffine :: {m :: Int, p :: Int} -> String
showAffine {m,p} =
  showHead m "x"
  <> showInline p ""

showTrinom :: Int -> Int -> Int -> String
showTrinom a b c =
  let m2 = 
        case unit of
             unit | a == - one -> "-x^2"
                  | a == one -> "x^2"
                  | otherwise -> show a <> "x^2"
      m1 =
        case unit of
             unit | b == - one -> "-x"
                  | b < zero -> "-" <> (show $ Ord.abs b) <> "x"
                  | b == zero -> ""
                  | b == one -> "+x"
                  | otherwise -> "+" <> show b <> "x"
   in m2 <> m1 <> case unit of
       unit | c < zero -> "-" <> (show $ Ord.abs c)
            | c == zero -> ""
            | otherwise -> "+" <> show c

showFraction :: Rational -> String
showFraction f = 
    if denominator f == 1 
      then show $ numerator f
      else "\\frac{" <> show (numerator f) <> "}{" <> show (denominator f) <> "}"
  
type Problem1 = 
  { affine1 :: { m :: Int, p :: Int}
  , affine2 :: { m :: Int, p :: Int}
  } 

values :: Problem1 -> { m1 :: Int, m2 :: Int, p1 :: Int, p2 :: Int }
values { affine1, affine2 } =
  { m1: affine1.m , m2: affine2.m, p1: affine1.p, p2: affine2.p }
  
randomDataSet :: Rand -> { problem :: Problem1, next :: Rand}
randomDataSet r0 = 
  let { m: m1, p: p1, r: r1} = randAffine r0
      { m: m2, p: p2, r: r2} = randAffine r1
  in 
    if m1 == m2 
       then randomDataSet r1 
       else { problem: { affine1: { m: m1, p: p1}
                       , affine2: { m: m2, p: p2}
                       }
            , next: r2
            }

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
                        , s { enabled = 
                                maybe false (const true) 
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
        let ctx = defaultContext { strokeWidth = 1.0 }
        let render :: forall a b. Render a => a -> Array (Widget HTML b)
            render = render' ctx 
            
        nl
        b "1. "
        let { problem: dataSet1, next: r1 } = randomDataSet r0
        t "L'expression développée réduite de "
        m $ "(" <> showAffine dataSet1.affine1 
          <> ")(" <> showAffine dataSet1.affine2 <> ")"
        t " est "
        nl
        
        nl
        b "2. "
        let { problem: dataSet2, next: r2 } = randomDataSet r1
            { m1, m2, p1, p2 } = values dataSet2
            common = "(" <> showAffine dataSet2.affine2 <> ")" 
        t "L'expression factorisée de "
        m $ showAffine {m: m1, p:0} <> common 
          <> showInline p1 "" <> common
        t " est "
        nl
        
        nl
        b "3. "
        let { problem: dataSet3, next: r3 } = randomDataSet r2
        t "La solution de l'équation "
        m $ showAffine dataSet3.affine1 <> "=" <> showAffine dataSet3.affine2
        t " est "
        nl
        
        nl
        b "4. "
        let { problem: dataSet4, next: r4 } = randomDataSet r3
        t "Les solutions de l'équation "
        m $ "(" <> showAffine dataSet4.affine1 
                <> ")(" <> showAffine dataSet4.affine2 <> ")=0" 
        t " sont "
        nl
        
        nl
        b "5. "
        let { problem: dataSet5, next: r5 } = randomDataSet r4
            order = case r5.val `mod` 4 of
                         0 -> "<"
                         1 -> "\\leq"
                         2 -> ">"
                         _ -> "\\geq"
        t "Les solutions de l'inéquation "
        m $ showAffine dataSet5.affine1 <> order 
           <> showAffine dataSet5.affine2
        t " sont les nombres "
        nl
        
        
        if (fromMaybe 0 $ validateInput newState.seed) < 0
            then do
              nl
              t "réponses: "
              
              b " 1. "
              let { m1, m2, p1, p2 } = values dataSet1
              m $ showTrinom (m1*m2) (m1*p2+m2*p1) (p1*p2)
               
              b " 2. "
              m $ "(" <> showAffine dataSet2.affine1 
                    <> ")(" <> showAffine dataSet2.affine2 <> ")"
                    
              b " 3. "
              let { m1, m2, p1, p2 } = values dataSet3
              m $ showFraction $ fromInt (p2 - p1) / fromInt (m1 - m2)

              b " 4. "
              let { m1, m2, p1, p2 } = values dataSet4
              m $ showFraction $ fromInt (- p1) / fromInt m1
              t " et "
              m $ showFraction $ fromInt (- p2) / fromInt m2
              
              b " 5. "
              let { m1, m2, p1, p2 } = values dataSet5
              t $ case order of
                   "<" -> if m1 < m2
                             then "strictement supérieurs à "
                             else "strictement inférieurs à "
                   ">" -> if m1 < m2
                             then "strictement inférieurs à "
                             else "strictement supérieurs à "
                   "\\leq" -> if m1 < m2
                             then "supérieurs ou égaux à "
                             else "inférieurs ou égaux à "
                   _ -> if m1 < m2
                             then "inférieurs ou égaux à "
                             else "supérieurs ou égaux à "
              m $ showFraction $ fromInt (p2 - p1) / fromInt (m1 - m2)

          else pure mempty

        get

initialState = { seed: Nothing 
               , enabled: false
               } :: State

header :: forall a. Widget HTML a
header = D.div' $ fromIncremental $ do
  setTitle "Devoir 4 : Calcul littéral - Equations - Inéquations"
  nl
  put $ D.div [ P.attr "style" $ "display: grid; "
                        <> "grid-template-columns: 1fr 1fr 1fr;"]
      [ D.label [] [D.text "Nom:"]
      , D.label [] [D.text "Prénom:"]
      , D.label [] [D.text "Classe:"]
      ]
  put $ D.ul []
      [ D.li [] [D.text "Voici cinq phrases indépendantes à compléter."]
      , D.li [] [D.text "Chaque phrase correctement complétée rapporte 1 point."]
      , D.li [] [D.text "Les valeurs numériques seront données sous forme entière ou de fraction irréductible."]
      , D.li [] [D.text "L'usage de la calculatrice est autorisé."]
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
