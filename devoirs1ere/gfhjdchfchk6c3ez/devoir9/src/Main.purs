module Main where

import Prelude

import Article(fromIncremental, get, nl, t_, m_, put, setTitle_, runningText, enterHit, toSeed, splits)

import Control.Alt ((<|>))

import Data.Array((!!)) as Array
import Data.Foldable (oneOfMap)
import Data.Maybe(Maybe (..))
import Data.Ord(abs) as Ord
import Data.Tuple.Nested ((/\))

import Deku.Attribute ((:=))
import Deku.Core (Domable, class Korok)
import Deku.Control(text_)
import Deku.DOM as D
import Deku.Toplevel (runInBody1, runInBodyA)

import Exercise1 (exo1)

import Effect (Effect)
import FRP.Event (bang)
import FRP.Event.VBus (V, vbus)

import Rand(Rand, rand, consume)

import Type.Proxy (Proxy(..))

type Nuts = forall s m lock payload. Korok s m 
  => Array (Domable m lock payload)

type State = V
  ( textContent :: String
  , enabled :: Boolean
  )
  
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
  runInBodyA header
  runInBody1 ( vbus (Proxy :: _ State) \push event -> 
   let 
      doc seed enabled = 
        D.div ((if _ then D.Style := "display: block;" else D.Style := "display: none;") <$> enabled) $ 
            let f0 = (fromRelative /\ (_ < 0)) `splits` seed
                f1 = (\(a/\b) -> consume 30 a /\ b) <$> f0
            in fromIncremental $ do    
              nl    
              exo1 f1
              get
              
     in D.div_
        [ D.div_  
          [ D.label_ [text_ "Enoncé n° "]
          , D.input
            ( runningText (bang push.textContent) 
              <|> enterHit (bang push.enabled)
              <|> oneOfMap bang
                [ D.Size := "56"
                , D.Autofocus := ""
                ]
            )
            []
          ]
          , doc (toSeed <$> event.textContent) (bang false <|> event.enabled)
        ]
      )

header :: Nuts
header = fromIncremental $ do
  setTitle_ "Devoir 9 : Suites arithmétiques et géométriques"
  nl
  put $ D.div (bang $ D.Style := "display: grid; grid-template-columns: 1fr 1fr 1fr;")
      [ D.label_ [text_ "Nom:"]
      , D.label_ [text_ "Prénom:"]
      , D.label_ [text_ "Classe:"]
      ]
  put $ D.ul_
      [ D.li_ [text_ "4 exercices"]
      , D.li_ (fromIncremental $ do
           t_ "5 points par exercice ("
           m_ "\\bullet"
           t_ ": 1 point, "
           m_ "\\circ"
           t_ ": "
           m_ "\\frac{1}{2}"
           t_ " point)"
           get)
      , D.li_ [text_ "sans document"]
      , D.li_ [text_ "calculatrice nécessaire"]
      ]
  get
