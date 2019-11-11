module Main where

import Prelude

import Effect (Effect)
import Spork.Html (Html)
import Spork.Html as H
import Spork.PureApp (PureApp)
import Spork.PureApp as PureApp
import Data.Maybe(Maybe(..))

data Planet = Mars | Neptune | Uranus

derive instance eqPlanet :: Eq Planet
instance showPlanet :: Show Planet where
    show Mars = "Mars"
    show Neptune = "Neptune"
    show Uranus = "Uranus"

type AskNameStage = { name :: Maybe String }

type AskPlanetStage = { name :: String
                      , planet :: Maybe Planet
                      }

type GreetStage = { name :: String
                  , planet :: Planet
                  }

data Stage = AskName AskNameStage
           | AskPlanet AskPlanetStage
           | Greet GreetStage

type State = { stage :: Stage }

data Action
  = UpdateName AskNameStage String
  | SetPlanet AskPlanetStage Planet
  | GotoPlanetStage AskPlanetStage
  | GotoGreetStage GreetStage

page  ∷  PureApp State Action 
page =  { init: initialState
        , render
        , update: handleAction }

initialState  ∷ State
initialState = { stage: AskName { name: Nothing } }

handleAction :: State -> Action -> State
handleAction state ( UpdateName stage newName ) = 
    let
      updated = stage { name = Just newName }
    in 
      state{ stage = AskName updated }


handleAction state ( SetPlanet stage newPlanet ) =
    let
      updated = stage { planet = Just newPlanet }
    in 
      state{ stage = AskPlanet updated}

handleAction state (GotoPlanetStage stage) = 
    state{ stage = AskPlanet stage }

handleAction state (GotoGreetStage stage ) =
    state{ stage = Greet stage } 

renderNextButton :: Maybe Action -> Html Action
renderNextButton action =
  H.button 
  ( case action of
      Nothing -> [ H.disabled true ]
      Just action' -> [ H.onClick <<< const $ Just action' ] )
  [ H.text "Next >" ]

render ::  State -> Html Action
render { stage: AskName stage } = 
    H.div [] [ H.p [] [ H.text "What is your name?" ]
             , H.input [ H.type_ H.InputText
                       , H.onValueInput $ Just <<< UpdateName stage
                       ]
             , renderNextButton $ makeNextStage <$> stage.name
             ]
    where
      makeNextStage name = GotoPlanetStage { name
                                           , planet: Nothing
                                           } 

render { stage: AskPlanet stage } =
  H.div [] 
        [ H.p [] [ H.text $ "So " <> stage.name <> ", what planet do you hail from?" ]
        , makeButton Mars
        , makeButton Neptune
        , makeButton Uranus
        , renderNextButton $ makeNextStage <$> pure stage.name <*> stage.planet
        ]
    where
      makeButton planet =
        H.div []  [ H.input [ H.type_ H.InputRadio
                            , H.checked $ stage.planet == Just planet
                            , H.onChecked <<< const <<< Just $ SetPlanet stage planet ]
                 , H.label [] [ H.text $ show planet ]
                 ]
          
      makeNextStage name planet = GotoGreetStage { name
                                                 , planet
                                                 } 

render { stage: Greet stage } = 
    H.div [] [ H.text $ "Greetings " <>
                        stage.name <>
                        " from " <>
                        show stage.planet ]

main :: Effect Unit
main = void $ PureApp.makeWithSelector page "#app"
