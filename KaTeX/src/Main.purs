module Main where

import Prelude

import Control.Monad.Writer (Writer, tell, execWriter)
import Data.Maybe (maybe)
import Data.Tuple.Nested  ((/\))

import Deku.Attribute (Attribute)
import Deku.Core (Nut)
import Deku.Do as Deku
import Deku.DOM as D
import Deku.DOM.Attributes as DA
import Deku.DOM.Listeners as DL
import Deku.DOM.Self as Self
import Deku.Hooks (useState')
import Deku.Toplevel (runInBody)

import Effect (Effect)
import FRP.Poll (Poll)
import Web.DOM (Element)
import Web.HTML.HTMLElement (focus)
import Web.HTML.HTMLInputElement (toHTMLElement, fromElement)

foreign import rotated :: Number -> String -> Element -> Effect Unit
foreign import display :: String -> Element -> Effect Unit
foreign import render :: String -> Element -> Effect Unit
foreign import textMode :: String -> Element -> Effect Unit

m' :: forall t. String -> Poll (Attribute t)
m' = \txt -> Self.self_ $ render txt

m :: Poll String -> Writer Nut Unit
m p = tell $ D.label [Self.self $ render <$> p] []

m_ :: String -> Writer Nut Unit
m_ str = tell $ D.label [m' str] []
  
t' :: forall t. String -> Poll (Attribute t)
t' txt = Self.self_ $ textMode txt

t_ :: String -> Writer Nut Unit
t_ str = tell $ D.label [t' str] []

main :: Effect Unit
main = 
  runInBody Deku.do
    setTextContent /\ textContent <- useState'
    D.div_
      [ execWriter $ do
          m_ "\\begin{CD} A @>a>> B \\\\ @VbVV @AAcA \\\\ C @= D \\end{CD}"
          t_ "Enter a "
          m_ "\\KaTeX"
          t_ " expression: "
      , D.input
          [ DL.valueOn_ DL.input setTextContent
          , DA.size_ "56"
          , Self.self_ $ \e -> maybe (pure unit) (focus <<< toHTMLElement) $ fromElement e
          ]
          []
      , D.div_ [execWriter $ m textContent]
      ]
  
