module Main where

import Prelude

import Effect (Effect)
import Global(readFloat)
import Data.Maybe(Maybe(..))
import Math (pow)
import Data.Number.Format(toStringWith, fixed)
import Spork.Html (Html)
import Spork.Html as H
import Spork.PureApp (PureApp)
import Spork.PureApp as PureApp

type Year = Number

type State = { capital :: Number
             , taux :: Number
             , frequency :: Frequency
             , duration :: Year
             }

data Frequency = 
     Daily 
   | Weekly 
   | Monthly 
   | ThreeMonthly 
   | FourMonthly 
   | SixMonthly
   | Yearly

nbOfAnnuities :: forall r.{frequency :: Frequency, duration :: Year |r} -> Number
nbOfAnnuities {frequency, duration} =
  duration * case frequency of
     Daily        -> 365.0
     Weekly       -> 52.0
     Monthly      -> 12.0
     ThreeMonthly -> 4.0
     FourMonthly  -> 3.0
     SixMonthly   -> 2.0
     Yearly       -> 1.0

annuity :: State -> Number
annuity s = 
  let n = nbOfAnnuities s
      t = s.taux / 100.0
  in s.capital * t / (1.0 - pow (1.0 + t) (-n))
      
data Action = 
    Capital Number 
  | Taux Number 
  | Period Frequency 
  | Duration Year

update ∷ State → Action → State
update s = case _ of
    Capital c  -> s{capital = c }
    Taux t     -> s{taux = t}
    Period f   -> s{frequency = f}
    Duration d -> s{duration = d}

floatEntry :: String 
                -> (Number -> Action) 
                -> Array (Html Action)
floatEntry str cnstr = 
  [ H.p [] [H.text $ str <> ": "]
  , H.input [ H.type_ H.InputText
              , H.onValueInput $ Just <<< cnstr <<< readFloat
              ]
  ]

render ∷ State → Html Action
render s =
  H.div [] $
       floatEntry "Montant du prêt (en euros)" Capital
    <> floatEntry "Taux (en %)" Taux
    <> floatEntry "Durée (en années)" Duration
    <> [ H.p [] [ H.text "Fréquence des remboursements: "]
       , H.select [ H.onSelectedIndexChange $ Just <<< Period <<< case _ of
           0 -> Daily 
           1 -> Weekly 
           2 -> Monthly 
           3 -> ThreeMonthly 
           4 -> FourMonthly 
           5 -> SixMonthly
           _ -> Yearly
        ]
                 [ H.option [] [ H.text "tous les jours"]
                 , H.option [] [ H.text "toutes les semaines"]
                 , H.option [] [ H.text "tous les mois"]
                 , H.option [] [ H.text "tous les 3 mois"]
                 , H.option [] [ H.text "tous les 4 mois"]
                 , H.option [] [ H.text "tous les 6 mois"]
                 , H.option [] [ H.text "tous les ans"]
                 ]
      ]
    <> [ H.h3 [] [H.text $ (toStringWith (fixed 2) $ annuity s) <> "€"]]

app ∷ PureApp State Action
app = { update, render, init: {capital: 0.0, taux: 0.0, frequency: Daily, duration: 0.0} }

main ∷ Effect Unit
main = void $ PureApp.makeWithSelector app "#app"
