module Main where

import Prelude
import Data.Const (Const)
import Data.Maybe (Maybe(..))
import Effect (Effect)
import Halogen as H
import Halogen.Aff as HA
import Halogen.HTML as HH
import Halogen.HTML.Properties as HP
import Halogen.HTML.Events as HE
import Halogen.VDom.Driver (runUI)

type State = { name ∷ String }

data Action = UpdateName String

page ∷ forall m. H.Component HH.HTML (Const Void) Unit Void m 
page = 
    H.mkComponent { initialState: const initialState
                  , render
                  , eval: H.mkEval $ H.defaultEval
                    { handleAction = handleAction }
                  }

initialState ∷ State
initialState = { name: "" }

handleAction :: forall m. Action -> H.HalogenM State Action () Void m Unit
handleAction ( UpdateName newName ) = 
    H.modify_ _{ name = newName }

render :: forall m. State -> H.ComponentHTML Action () m
render state =
    HH.div_ [ HH.p_ [ HH.text "What is your name?" ]
            , HH.input [ HP.type_ HP.InputText
                       , HE.onValueInput $ Just <<< UpdateName
                       ]
            , hello
            ]

    where
      hello = if state.name == ""
              then HH.p_ []
              else HH.p_ [ HH.text $ "Hello " <> state.name ]


main :: Effect Unit
main = HA.runHalogenAff $
       HA.awaitBody >>= runUI page unit

