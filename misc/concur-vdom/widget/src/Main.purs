module Main where

import Prelude

import Affjax (get) as AX
import Affjax.ResponseFormat (json) as ResponseFormat
import Data.Time.Duration (Milliseconds(..))
import Data.Argonaut.Core as J
import Data.Argonaut.Decode (class DecodeJson, (.:), decodeJson)
import Data.Array (singleton)
import Data.Either (Either(..), either)
import Data.Traversable (traverse)
import Concur.Core (Widget)
import Concur.Core.Types (andd)
import Concur.VDom (HTML)
import Concur.VDom.DOM (text, div', button, input) as D
import Concur.VDom.Props as P
import Concur.VDom.Run (runWidgetInDom)
import Control.Alt ((<|>))
import Control.Monad.Rec.Class (forever)
import Control.MultiAlternative (orr)
import Effect (Effect)
import Effect.Aff (delay)
import Effect.Aff.Class (liftAff)
import Effect.Class (liftEffect)
import Effect.Console (log)

data Action = Changed String | Focused

inputWidget1 :: Widget HTML Action
inputWidget1 = D.input [(Changed <<< P.unsafeTargetValue) <$> P.onChange
                      , Focused <$ P.onFocus]

type State = {focusCount:: Int, currentText :: String}

inputWidget2 :: State -> Widget HTML State
inputWidget2 st = do
      st' <-  D.div' [
              D.text st.currentText
              ,D.text (show st.focusCount)
              ,D.input [st {focusCount = st.focusCount+1} <$ P.onFocus
                       , ((\s -> st {currentText = s})
                                    <<< P.unsafeTargetValue) <$> P.onChange]
                ]
      inputWidget2 st'
      
inputWidget3 :: State -> Widget HTML State
inputWidget3 st = do
    st' <- D.input [st {focusCount = st.focusCount+1} <$ P.onFocus
                       , ((\s -> st {currentText = s})
                                    <<< P.unsafeTargetValue) <$> P.onChange] 
                        <|> D.text (st.currentText <> show st.focusCount)
    inputWidget3 st'
      
pingPong :: forall a. Widget HTML a
pingPong = do
  void $ forever $ do
    void $ D.button [P.onClick] [D.text "Ping"]
    D.button [P.onClick] [D.text "Pong"]
  D.text "This text will never be shown"

counter :: Int -> Widget HTML Int
counter count = do
  void $ D.button [P.onClick] [D.text (show count)]
  pure (count + 1)

listCounters1 :: Array Int -> Widget HTML Int
listCounters1 = orr <<< map counter

listCounters2 :: Array Int -> Widget HTML (Array Int)
listCounters2 initialCounts = andd (map counter initialCounts)

helloWidget :: forall a. Widget HTML a
helloWidget = do
  greeting <- D.div'
    [ "Hello" <$ D.button [P.onClick] [D.text "Say Hello"]
    , "Namaste" <$ D.button [P.onClick] [D.text "Say Namaste"]
    ]
  liftEffect (log ("You chose to say " <> greeting))
  D.text (greeting <> " Sailor!")

timerWidget :: Number -> Widget HTML Unit
timerWidget ms = 
  liftAff (delay (Milliseconds ms)) 
    <|> D.button [unit <$ P.onClick] [D.text "Cancel"]

newtype Post = Post
  { id :: String
  , title :: String
  }

instance decodeJsonPost :: DecodeJson Post where
  decodeJson json = do
    obj <- decodeJson json
    d <- obj .: "data"
    id <- d .: "id"
    title <- d .: "title"
    pure (Post { id, title })

work :: J.Json -> Either String (Array String)
work json = do
  o <- decodeJson json
  d1 <- o .: "data"
  cs <- d1 .: "children"
  os <- decodeJson cs >>= traverse decodeJson
  Right $ (\(Post x) -> x.title) <$> os

fetchWidget :: Widget HTML String
fetchWidget = do
  let url = "https://www.reddit.com/search.json?q=purescript&sort=new"
  resp <- liftAff (
             AX.get ResponseFormat.json url
              >>= either (const $ pure ["invalid response"]) 
                    ( either (const $ pure ["invalid structure"]) pure 
                      <<< work 
                      <<< (_.body)
                    )
                  ) <|> D.text "Fetching posts from subreddit..."
  orr $ D.div' <$> singleton <$> D.text <$> resp

main :: Effect Unit
main = do
  runWidgetInDom "main" $ fetchWidget -- inputWidget2 {currentText: "df", focusCount: 0} -- timerWidget 1500.0 -- 
