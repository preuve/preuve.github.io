module Main where

import Prelude
import Data.Const (Const)
import Data.Maybe (Maybe(..))
import Halogen as H
import Halogen.Aff as HA
import Halogen.HTML as HH
import Halogen.HTML.Properties as HP
import Halogen.HTML.Events as HE
import Halogen.VDom.Driver (runUI)
import Effect (Effect)


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


page ∷ forall m. H.Component HH.HTML (Const Void) Unit Void m 
page = 
    H.mkComponent { initialState: const initialState
                  , render
                  , eval: H.mkEval $ H.defaultEval
                    { handleAction = handleAction }
                  }


initialState ∷ State
initialState = { stage : AskName { name : Nothing } }


handleAction :: forall m. Action -> H.HalogenM State Action () Void m Unit
handleAction ( UpdateName stage newName ) = 
    let
      updated = stage { name = Just newName }
    in 
      H.modify_ _{ stage = AskName updated }


handleAction ( SetPlanet stage newPlanet ) =
    let
      updated = stage { planet = Just newPlanet }
    in 
      H.modify_ _{ stage = AskPlanet updated}


handleAction (GotoPlanetStage stage) = 
    H.modify_ _{ stage = AskPlanet stage }


handleAction (GotoGreetStage stage ) =
    H.modify_ _{ stage = Greet stage } 



renderNextButton :: forall m. Maybe Action -> H.ComponentHTML Action () m
renderNextButton action =
  HH.button
  ( case action of
      Nothing -> [ HP.disabled true ]
      Just action' -> [ HE.onClick <<< const $ Just action' ] )
  [ HH.text "Next >" ]


render :: forall m. State -> H.ComponentHTML Action () m
render { stage: AskName stage } = 
    HH.div_ [ HH.p_ [ HH.text "What is your name?" ]
            , HH.input [ HP.type_ HP.InputText
                       , HE.onValueInput $ Just <<< UpdateName stage
                       ]
            , renderNextButton $ makeNextStage <$> stage.name
            ]
    where
      makeNextStage name = GotoPlanetStage { name
                                           , planet: Nothing
                                           } 

render { stage: AskPlanet stage } =
  HH.div_ [ HH.p_ [ HH.text $ "So " <> stage.name <> ", what planet do you hail from?" ]
          , makeButton Mars
          , makeButton Neptune
          , makeButton Uranus
          , renderNextButton $ makeNextStage <$> pure stage.name <*> stage.planet
          ]
    where
      makeButton planet =
        HH.div_  [ HH.input [ HP.type_ HP.InputRadio
                            , HP.checked $ stage.planet == Just planet
                            , HE.onChecked <<< const <<< Just $ SetPlanet stage planet ]
                 , HH.label_ [ HH.text $ show planet ]
                 ]
          
      makeNextStage name planet = GotoGreetStage { name
                                                 , planet
                                                 } 

render { stage: Greet stage } = 
    HH.div_ [ HH.text $ "Greetings " <>
                        stage.name <>
                        " from " <>
                        show stage.planet ]


main :: Effect Unit
main = HA.runHalogenAff $
       HA.awaitBody >>= runUI page unit



