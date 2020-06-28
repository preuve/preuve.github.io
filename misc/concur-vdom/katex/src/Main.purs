module Main where

import Prelude

import Concur.Core (Widget)
import Concur.VDom (HTML)
import Concur.VDom.Run (runWidgetInDom)
import Effect (Effect)
import Effect.Class (liftEffect)
import Concur.VDom.Props (dangerouslySetInnerHTML, onChange, attr, unsafeTextContent) as P
import KaTeX (equation)
import Concur.VDom.DOM as D

type State = {text :: String}

katexWidget :: State -> Widget HTML State
katexWidget st = do
  ktx <- liftEffect $ equation st.text
  st' <- D.div'
    [ D.div [ P.attr "contenteditable" "true"
            , P.attr "spellcheck" "false"
            , ( (\txt -> st{text = txt}) <<< P.unsafeTextContent) <$> P.onChange]
            [ D.text "Click me, then edit \\LaTeX"]
    , D.label [P.dangerouslySetInnerHTML ktx] []
    ]
  katexWidget st'

main :: Effect Unit
main = runWidgetInDom "main"
           $ katexWidget {text: "Click it, then edit \\LaTeX"}
