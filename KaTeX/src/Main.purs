module Main where

import Prelude

import Article(fromIncremental, get, m, m_, runningText)

import Control.Alt ((<|>))

import Data.Foldable (oneOfMap)

import Deku.Attribute ((:=))
import Deku.Control(text_)
import Deku.DOM as D
import Deku.Toplevel (runInBody1)

import Effect (Effect)
import FRP.Event (bang)
import FRP.Event.VBus (V, vbus)

import Type.Proxy (Proxy(..))

type State = V
  ( textContent :: String
  )

main :: Effect Unit
main = do
  runInBody1 ( vbus (Proxy :: _ State) \push event -> 
   let 
      doc txt = 
        D.div_ $ fromIncremental do
          m txt
          get
              
   in D.div_ $ 
        [ D.label_ [text_ "Enter a "] ]
        <> ( fromIncremental do
          m_ "\\KaTeX"
          get
        )
        <>
        [ D.label_ [text_ " expression: "]
        , D.input
            ( runningText (bang push.textContent) 
              <|> oneOfMap bang
                [ D.Size := "56"
                , D.Autofocus := ""
                ]
            )
            []
        , doc event.textContent 
        ]
      )
