module Main where

import Prelude

import Article (nl, t_, m_, setTitle_, toSeed)

import Control.Alt ((<|>))
import Control.Monad.Writer (Writer, execWriter, tell)

import Data.Array((!!)) as Array
import Data.Maybe(Maybe (..))
import Data.Ord(abs) as Ord
import Data.Tuple.Nested ((/\))

import Deku.Attribute ((:=), (!:=))
import Deku.Core (Nut)
import Deku.Control (text_)
import Deku.Hooks (useState)
import Deku.Do as Deku
import Deku.DOM as D
import Deku.Listeners (textInput, keyDown)
import Deku.Toplevel (runInBody)

import Effect (Effect)

import Exercise1 (exo1)
import Exercise2 (exo2)
import Exercise3 (exo3)
import Exercise4 (exo4)

import FRP.Event.Class ((<**>))

import Rand(Rand, rand, consume)
import Record (set)
import Type.Proxy (Proxy (..))
import Web.UIEvent.KeyboardEvent (code)

class HasDefault a where
  dflt :: a
  
instance dfltInt :: HasDefault Int where
  dflt = 0

nth :: forall a. HasDefault a => Array a -> Int -> a
nth xs n = case xs Array.!! n of
  Just x -> x
  _      -> dflt

infixr 6 nth as !!

fromRelative :: Int -> Rand
fromRelative n = 
  let odd = 2 * Ord.abs n + 1
  in rand { val: odd, gen: 0, seed: odd * odd}

main :: Effect Unit
main = do
  runInBody $ execWriter header

  runInBody Deku.do
    setState /\ state <- useState { textContent: "", enabled: false }

    let doc seed enabled = 
          D.div [(if _ then D.Style := "display: block;" else D.Style := "display: none;") <$> enabled] $ 
              let f0 = seed <**> (pure \x -> fromRelative x /\ (x < 0))
                  f1 = (\(a/\b) -> consume 30 a /\ b) <$> f0
                  f2 = (\(a/\b) -> consume 30 a /\ b) <$> f1
                  f3 = (\(a/\b) -> consume 30 a /\ b) <$> f2
              in 
                [ execWriter $ do    
                    nl    
                    exo1 f1
                    nl    
                    nl    
                    exo2 f2
                    nl    
                    nl    
                    exo3 f3
                    nl    
                    nl    
                    exo4 f0 -- no seed needed for this exo
                ]
                
    D.div_
          [ D.div_  
            [ D.label_ [text_ "Enoncé n° "]
            , D.input
              [ textInput $
                  ( (setState <<< _) <<< flip 
                      (set (Proxy :: _ "textContent")
                      )
                  ) <$> state
              , keyDown $
                  ( (setState <<< _) <<< flip 
                      (set (Proxy :: _ "enabled") 
                        <<< (\key -> code key == "Enter")
                      )
                  ) <$> state
              , D.Size !:= "56"
              , D.Autofocus !:= ""
              ]
              []
            ]
            , doc ((toSeed <$> (_.textContent)) <$> state) (pure false <|> (_.enabled) <$> state)
          ]

header :: Writer Nut Unit
header = do
  setTitle_ "Devoir 8 : Produit scalaire / Suites numériques"
  nl
  
  tell $ D.div [D.Style !:= "display: grid; grid-template-columns: 1fr 1fr 1fr;"]
      [ D.label_ [text_ "Nom:"]
      , D.label_ [text_ "Prénom:"]
      , D.label_ [text_ "Classe:"]
      ]
  
  tell $ D.ul_
      [ D.li_ [text_ "4 exercices"]
      , D.li_ 
        [ execWriter $ do
           t_ "5 points par exercice ("
           m_ "\\bullet"
           t_ ": 1 point, "
           m_ "\\circ"
           t_ ": "
           m_ "\\frac{1}{2}"
           t_ " point)"
        ]
      , D.li_ [text_ "sans document"]
      , D.li_ [text_ "calculatrice nécessaire"]
      ]

