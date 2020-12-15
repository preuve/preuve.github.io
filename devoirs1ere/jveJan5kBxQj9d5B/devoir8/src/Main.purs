module Main where

import Prelude

import Effect (Effect)
import Data.Array((!!)) as Array
import Data.Maybe(Maybe (..), maybe, fromMaybe)
import Data.Ord(abs) as Ord

import Article (fromIncremental, get, nl, t, m, put, setTitle, validateInput)
import Concur.Core (Widget)
import Concur.Core.FRP (dyn, display, debounce)
import Concur.VDom (HTML)
import Concur.VDom.Run (runWidgetInDom)
import Concur.VDom.Props (onChange, unsafeTargetValue, onKeyEnter, attr, autoFocus, size) as P
import Concur.VDom.DOM as D

import Rand(rand, consume)
import Exercise1 (exo1)
import Exercise2 (exo2)
import Exercise3 (exo3)
import Exercise4 (exo4)

type State = { seed :: Maybe String
             , enabled :: Boolean 
             }

class HasDefault a where
  dflt :: a
  
instance dfltInt :: HasDefault Int where
  dflt = 0

nth :: forall a. HasDefault a => Array a -> Int -> a
nth xs n = case xs Array.!! n of
  Just x -> x
  _      -> dflt

infixr 6 nth as !!

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
      
        let mode = (fromMaybe 0 $ validateInput newState.seed) < 0
            r1 = consume 30 r0
            r2 = consume 30 r1
            r3 = consume 30 r2
            r4 = consume 30 r3
 
        exo1 mode r1 
        exo2 mode r2 
        exo3 mode r3 
        exo4 mode r4 
       
        get        
  
initialState = { seed: Nothing 
               , enabled: false
               } :: State

header :: forall a. Widget HTML a
header = D.div' $ fromIncremental $ do
  setTitle "Devoir 8 : Produit scalaire / Suites numériques"
  nl
  put $ D.div [ P.attr "style" "display: grid; grid-template-columns: 1fr 1fr 1fr;"]
      [ D.label [] [D.text "Nom:"]
      , D.label [] [D.text "Prénom:"]
      , D.label [] [D.text "Classe:"]
      ]
  put $ D.ul []
      [ D.li [] [D.text "4 exercices"]
      , D.li [] (fromIncremental $ do
           t "5 points par exercice ("
           m "\\bullet"
           t ": 1 point, "
           m "\\circ"
           t ": "
           m "\\frac{1}{2}"
           t " point)"
           get)
      , D.li [] [D.text "sans document"]
      , D.li [] [D.text "calculatrice nécessaire"]
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

