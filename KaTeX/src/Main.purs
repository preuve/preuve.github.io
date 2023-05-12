module Main where

import Prelude

import Article(m, m_, t_)
import Control.Monad.Writer (execWriter)
import Data.Tuple.Nested  ((/\))
import Deku.Attribute ((!:=))
import Deku.Do as Deku
import Deku.DOM as D
import Deku.Hooks (useState')
import Deku.Toplevel (runInBody)
import Deku.Listeners (textInput)
import Effect (Effect)

main :: Effect Unit
main = 
  runInBody Deku.do
    setTextContent /\ textContent <- useState'
    D.div_
      [ execWriter $ do
          t_ "Enter a "
          m_ "\\KaTeX"
          t_ " expression: "
      , D.input
          [ textInput $ pure setTextContent
          , D.Size !:= "56"
          , D.Autofocus !:= ""
          ]
          []
      , D.div_ [execWriter $ m textContent]
      ]
  
