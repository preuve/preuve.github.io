module Parent where

import Prelude

import Children as Children
import Data.Maybe (Maybe(..))
import Data.Symbol (SProxy(..))
import Halogen as H
import Halogen.HTML as HH
import Halogen.HTML.Properties as HP
import Router as R


type ChildSlots = ( roast :: Children.Slot Unit
                  , chips :: Children.Slot Unit
                  , salad :: Children.Slot Unit
                  )

_roast :: SProxy "roast"
_roast = SProxy

_chips :: SProxy "chips"
_chips = SProxy

_salad :: SProxy "salad"
_salad = SProxy


type State = { currentRoute :: R.Route }

data Query a = ChangeRoute R.Route a

type Input = R.Route

page :: forall m. H.Component HH.HTML Query Input Void m
page = H.mkComponent { initialState
                     , render
                     , eval : H.mkEval $ H.defaultEval
                                { handleQuery = handleQuery }
                     }


initialState :: Input -> State
initialState route = { currentRoute : route }


handleQuery :: forall m a. Query a -> H.HalogenM State Void ChildSlots Void m (Maybe a)
handleQuery (ChangeRoute route k) = do
    H.modify_ _{ currentRoute = route }
    pure $ Just k


renderMenu :: forall m . H.ComponentHTML Void ChildSlots m
renderMenu = HH.div_ [ HH.a [ HP.href "#roast" ]
                                [ HH.text "Roast" ]
                     , HH.text " | "
                     , HH.a [ HP.href "#chips" ]
                                [ HH.text "Chips" ]
                     , HH.text " | "
                     , HH.a [ HP.href "#salad" ]
                                [ HH.text "Salad" ]
                     ]

renderPane :: forall m . State -> H.ComponentHTML Void ChildSlots m
renderPane state = HH.div_ [ case state.currentRoute of
                               R.Roast -> HH.slot _roast unit Children.roast unit absurd
                               R.Chips -> HH.slot _chips unit Children.chips unit absurd
                               R.Salad -> HH.slot _salad unit Children.salad unit absurd
                           ]

render :: forall m . State -> H.ComponentHTML Void ChildSlots m
render state =
  HH.div_ [ renderMenu
          , renderPane state
          ] 
