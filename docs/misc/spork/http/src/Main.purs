module Main where

import Prelude

import Effect (Effect)
import Effect.Aff (Aff)
import Effect.Exception as Exception

import Data.Const (Const)
import Data.Maybe (Maybe(..), maybe)
import Data.Either (Either(..))

import Data.Argonaut.Core as J
import Data.Argonaut.Parser(jsonParser)
import Data.Argonaut.Decode(getField)
import Affjax (get) as Affjax
import Affjax.ResponseFormat (string) as Affjax

import Spork.App as App
import Spork.Html (Html, div, button, onClick, text, h2, img, src, label) as H
import Spork.Interpreter (merge, never, throughAff)

import Data.String(take, drop, length)

type Model =
    { topic :: String
    , gifUrl :: String
    }

data Msg
    = MorePlease
    | NewGif (Either String String)

data Unpure a
    = GetRandomGif String (Either String String -> a)
    
init :: App.Transition Unpure Model Msg
init =
    App.purely { topic: "cats", gifUrl: "" }

trim :: String -> String
trim str = 
  let len = length str
  in drop 1 $ take (len - 1) str
  
render :: Model -> H.Html Msg
render model =
    H.div []
        [ H.h2 [] [H.text model.topic]
        , H.img [H.src $ model.gifUrl]
        , H.label [] [H.text $ model.gifUrl]
        , H.button [ H.onClick (const $ Just MorePlease) ] [ H.text "More Please!" ]
        ]

update :: Model -> Msg -> App.Transition Unpure Model Msg
update model msg =
    case msg of
        MorePlease ->
            { model, effects: App.lift (GetRandomGif model.topic NewGif) }

        NewGif (Left error) ->
            App.purely model

        NewGif (Right newUrl) ->
            App.purely $ model { gifUrl = newUrl }

app :: App.App Unpure (Const Void) Model Msg
app =
    { render
    , update
    , subs: const mempty
    , init
    }

type Key = String

getValue :: String -> Key -> Either String String
getValue str key = 
  case jsonParser str of
    Right json -> maybe (Left $ "not an json object or " 
                                <> key 
                                <> " not present") 
                        (\o -> J.stringify <$> getField o key) 
                        (J.toObject json) 
    _          -> Left "not a valid json"

runUnpure :: Unpure ~> Aff
runUnpure unpure =
    case unpure of
        GetRandomGif topic next -> do
           let url = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" <> topic
           res <- Affjax.get Affjax.string url
           pure <<< next $ case res of
             Right a -> case getValue a.body "data" of
                Right b -> trim <$> getValue b "image_url"
                _       -> Left "unvalid data"
             _       -> Left "unvalid response"
 
handleErrors :: Exception.Error -> Effect Unit
handleErrors error =
    -- TODO what is this?
    pure unit

main :: Effect Unit
main = do
    let interpreter = throughAff runUnpure handleErrors
    inst <- App.makeWithSelector (interpreter `merge` never) app "#app"
    inst.run
 