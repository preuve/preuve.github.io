module Main where

import Prelude

import Concur.Core (Widget)
import Concur.Core.FRP (Signal, step, dyn, display, loopS, loopW)
import Concur.VDom (HTML)
import Nodes (text, div', button, div_) as D
import Handles as P
import Concur.VDom.Run (runWidgetInDom)
import Control.Alt ((<|>))
import Data.Time.Duration (Milliseconds(..))
import Data.Traversable (traverse)
import Effect (Effect)
import Effect.Aff (delay)
import Effect.Aff.Class (liftAff)

hello :: String -> Signal HTML String
hello s = step s do
  greeting <- D.div'
    [ "Hello" <$ D.button [P.onClick] [D.text "Say Hello"]
    , "Namaste" <$ D.button [P.onClick] [D.text "Say Namaste"]
    ]
  void $ D.text (greeting <> " Sailor!") <|> D.button [P.onClick] [D.text "restart"]
  pure (hello greeting)

helloWidget :: forall a. Widget HTML a
helloWidget = dyn $ hello ""

textSignal :: Signal HTML Unit
textSignal = display (D.text "Hello Sailor!")

helloListWithDisplay1 :: Array String -> Signal HTML (Array String)
helloListWithDisplay1 prev = D.div_ [] do
  display (D.text ("Previously selected greetings - " <> show prev))
  traverse hello prev

helloListWidget1 :: Widget HTML String
helloListWidget1 = 
  dyn $ helloListWithDisplay1 ["ab","cd"]

helloListWithDisplay2 :: Array String -> Signal HTML (Array String)
helloListWithDisplay2 prev = loopS prev \prev' -> D.div_ [] do
  display (D.text ("Previously selected greetings - " <> show prev'))
  traverse hello prev'

helloListWidget2 :: Widget HTML String
helloListWidget2 = 
  dyn $ helloListWithDisplay2 ["ab","cd"]

counterWidget :: forall a. Widget HTML a
counterWidget = do
  dyn $ loopS 0 \n -> do
    display $ D.text (show n)
    n' <- incrementTicker n
    counterSignal n'

-- Counter
counterSignal :: Int -> Signal HTML Int
counterSignal init = loopW init $ \n -> D.div'
  [ n+1 <$ D.button [P.onClick] [D.text "+"]
  , D.div' [D.text (show n)]
  , n-1 <$ D.button [P.onClick] [D.text "-"]
  ]

-- Timer
incrementTicker :: Int -> Signal HTML Int
incrementTicker init = loopW init $ \n -> do
  liftAff $ delay $ Milliseconds 1000.0
  pure (n+1)
  
main :: Effect Unit
main = do
  runWidgetInDom "main" $ helloListWidget2 <|> dyn textSignal <|> counterWidget