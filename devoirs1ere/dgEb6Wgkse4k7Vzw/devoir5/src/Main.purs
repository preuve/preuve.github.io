module Main where

import Prelude

import Article (IncrementalArrayLine, fromIncremental, get, b, t, m, nl, put, equation, validateInput, setTitle)
import Effect (Effect)
import Data.Maybe (Maybe(..), maybe, fromMaybe)
import Data.Ord(abs) as Ord
import Rand (rand)
import Concur.Core (Widget)
import Concur.VDom (HTML)
import Concur.VDom.Run (runWidgetInDom)
import Concur.VDom.DOM as D
import Concur.VDom.Props as P
import Concur.Core.FRP (dyn, display, debounce)

import First(first)
import Second(second)
import Third(third)

type State = { seed :: Maybe String
             , enabled :: Boolean 
             }


opener :: forall a. String -> String -> IncrementalArrayLine a
opener title points =
  put $ D.div' 
          [ D.div [P.attr "style" "margin: 0; display: flex; justify-content: space-between"]
              [ D.label [P.attr "style" "font-size: 24px; font-weight: 700;"]  [D.text title]
              , D.label [P.attr "style" "font-size: 16px; font-weight: 700;"] [D.text points]
              ]
          , D.hr'
          ]


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
      mode = (fromMaybe 0 $ validateInput newState.seed) < 0
      r0 = rand { val: odd
                , gen: 0
                , seed: odd*odd
                }
  display $ D.div' $ if not newState.enabled 
      then []
      else fromIncremental $ do  
         
            nl
            opener "Exercice 1" "5 points"
            let r1 = rand r0
            put $ first r1 mode
            nl
        
            nl
            opener "Exercice 2" "5 points"
            let r2 = rand r1
            put $ second r2 mode
            nl
        
            nl
            opener "Exercice 3" "5 points"
            let r3 = rand r2
            put $ third r3 mode
            nl
        
            nl
            opener "Exercice 4" "5 points"
            b "1••◦"
            t " Résoudre l'inéquation"
            equation "x+\\dfrac{1}{x}-2\\geq 0."
            
            nl
            b "2◦"
            t " En déduire que, pour tout réel "
            m "a>0, \\quad a+\\dfrac{1}{a}\\geq 2."
        
            nl
            b "3••"
            t " Montrer alors que, pour tous réels strictement positifs "
            m "\\alpha"
            t " et "
            m "\\beta"
            t ", on a"
            nl
            m "\\quad"
            b "a) "
            m "\\quad \\dfrac{\\alpha}{\\beta}+\\dfrac{\\beta}{\\alpha}\\geq 2"
            nl
            m "\\quad"
            b "b)"
            m "\\quad (\\alpha+\\beta)(\\dfrac{1}{\\alpha}+\\dfrac{1}{\\beta})\\geq 4."
            
            get        
    
initialState = { seed: Nothing 
               , enabled: false
               } :: State

header :: forall a. Widget HTML a
header = D.div' $ fromIncremental $ do
  setTitle "Devoir 5 : Probabilités conditionnelles / Fonctions de degré 2"
  nl
  put $ D.div [ P.attr "style" "display: grid; grid-template-columns: 1fr 1fr 1fr;"]
      [ D.label [] [D.text "Nom:"]
      , D.label [] [D.text "Prénom:"]
      , D.label [] [D.text "Classe:"]
      ]
  put $ D.ul []
      [ D.li [] [D.text "4 exercices"]
      , D.li [] [D.div' $ fromIncremental do
                    t "5 points par exercice "
                    m "(\\bullet"
                    t " : 1 point, "
                    m "\\circ : \\frac{1}{2}"
                    t " point)"
                    get
                ]
      , D.li [] [D.text "qualité de la rédaction prise en compte"]
      , D.li [] [D.text "sans document"]
      , D.li [] [D.text "calculatrice autorisée"]
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

