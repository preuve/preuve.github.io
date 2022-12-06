module Main where

import Prelude

import Data.Array ((!!))
import Data.Foldable (for_)
import Data.Maybe (Maybe(..), fromMaybe)
import Data.Number (fromString, pow)
import Data.Number.Format (toStringWith, fixed)
import Data.Symbol (class IsSymbol)
import Data.Tuple.Nested ((/\))
import Deku.Attribute (Attribute, cb, (:=))
import Deku.Control (text, text_)
import Deku.Core (Domable)
import Deku.Hooks (useState)
import Deku.Do as Deku
import Deku.DOM as D
import Deku.Listeners (textInput)
import Deku.Toplevel (runInBody)
import Effect (Effect)
import FRP.Event (Event)
import Prim.Row (class Cons)
import Record (set, get)
import Type.Proxy (Proxy(..))
import Web.Event.Event (target)
import Web.HTML.HTMLSelectElement (fromEventTarget, selectedIndex)

data Frequency = 
     Daily 
   | Weekly 
   | Monthly 
   | ThreeMonthly 
   | FourMonthly 
   | SixMonthly
   | Yearly

instance Show Frequency where
    show = case _ of
                Daily -> "tous les jours"
                Weekly -> "toutes les semaines"
                Monthly -> "tous les mois"
                ThreeMonthly -> "tous les 3 mois"
                FourMonthly -> "tous les 4 mois"
                SixMonthly -> "tous les 6 mois"
                _ -> "tous les ans"
                
frequencies :: Array Frequency
frequencies = 
  [ Daily 
  , Weekly 
  , Monthly 
  , ThreeMonthly 
  , FourMonthly 
  , SixMonthly
  , Yearly
  ]
  
type Year = Number

type RowState = 
  ( capital :: Number
  , taux :: Number
  , frequency :: Frequency
  , duration :: Year
  )
  
type State = Record RowState

nbOfAnnuities :: forall r.{ frequency :: Frequency | r } -> Number
nbOfAnnuities { frequency } =
  case frequency of
     Daily        -> 365.0
     Weekly       -> 52.0
     Monthly      -> 12.0
     ThreeMonthly -> 4.0
     FourMonthly  -> 3.0
     SixMonthly   -> 2.0
     Yearly       -> 1.0

annuity :: State -> Number
annuity s = 
  let n = s.duration
      t = s.taux / 100.0
  in s.capital * t / (1.0 - pow (1.0 + t) (-n))
    
debit :: State -> Number
debit s = annuity s / nbOfAnnuities s

initialState :: State
initialState = 
  { capital: 0.0
  , taux: 0.0
  , frequency: Daily
  , duration: 0.0
  }

selectedIndexChange
  :: forall e
   . Event (Int -> Effect Unit)
  -> Event (Attribute e)
selectedIndexChange = map \push -> D.OnChange := cb \e -> for_
  (target e >>= fromEventTarget)
  (selectedIndex >=> push)

numericInput :: forall tl key lock payload. 
  IsSymbol key 
  => Cons key Number tl RowState 
  => String -> String -> String 
  -> Int -> (State -> Effect Unit) -> Event State 
  -> Proxy key -> Array (Domable lock payload)
numericInput title unity short precision setter getter proxy =
  [ D.p_ [text_ title]
    , D.input
        (textInput $ 
          ( \st -> setter <<< flip (set proxy) st <<< fromMaybe 0.0 <<< fromString
          ) <$> getter
        )
        []
    , D.div_
        [ text $
          (_ <> unity) 
              <<< (short <> _) 
              <<< toStringWith (fixed precision) 
              <<< get proxy
                <$> getter
        ]
    ]

main :: Effect Unit
main = runInBody Deku.do
  setter /\ getter <- useState initialState
  D.div_ $
    numericInput "Montant du prêt (en euros)" " €" "Montant: " 2 setter getter (Proxy :: _ "capital")
    <>  
    numericInput "Taux annuel (en %)" " %" "Taux: " 2 setter getter (Proxy :: _ "taux")
    <>
    numericInput "Durée (en années)" " ans" "Durée: " 0 setter getter (Proxy :: _ "duration")
    <>
    [ D.p_ [ text_ "Fréquence des remboursements: "]
    , D.select 
      ( selectedIndexChange $ 
        ( \st -> setter <<< st { frequency = _ } 
            <<< (\n -> case (frequencies !! n) of
                            Just f -> f
                            Nothing -> Yearly
                )
        ) <$> getter
      )
      (
        ( \freq -> D.option_ [text_ $ show freq]
        ) <$> frequencies
      )
     , D.div_
        [ text $
          ("Fréquence: " <> _) <<< show <<< (_.frequency) <$> getter
        ]
    ,  D.h3_ 
        [ text $ 
          ( \st -> 
            "Dans ces conditions, pour rembourser le prêt de "
            <> toStringWith (fixed 2) st.capital <> "€, il faudra effectuer un versement de "
            <> toStringWith (fixed 2) (debit st) <> " €"
            <> " "
            <> show st.frequency
            <> " pendant "
            <> toStringWith (fixed 0) st.duration
            <> " ans."
           ) <$> getter
          ]
      , D.br_ []
      , D.h3_
        [ text $
          ( \st ->
            "Le coût du prêt est de "
            <> toStringWith (fixed 2) (st.duration * nbOfAnnuities st * debit st - st.capital)
            <> " €."
          ) <$> getter
        ]
    ]
