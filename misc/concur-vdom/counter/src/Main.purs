module Main where

import Prelude hiding (div)

import Effect (Effect)
import Effect.Class (liftEffect)
import Effect.Console (log)
import Concur.Core (Widget)
import Nodes as D
import Handles as P
import Concur.VDom (HTML, runWidgetInDom)
import Control.Alt ((<|>))
import Control.MultiAlternative (orr)

counterWidget :: forall a. Int -> Widget HTML a
counterWidget count = do
  n <- D.div'
        [ D.hr'
        , D.p' [D.text ("State: " <> show count)]
        , D.button [P.onClick] [D.text "Increment"] $> count+1
        , D.button [P.onClick] [D.text "Decrement"] $> count-1
        ]
  liftEffect (log ("COUNT IS NOW: " <> show n))
  counterWidget n
  
main :: Effect Unit
main = do
    runWidgetInDom "main" $ orr
      [ widget (counterWidget 0 <|> counterWidget 100) "Counter"
      ]
  where
    widget w s = orr
      [ D.h2_ [] $ D.text s
      , D.div_ [] w
      ]
