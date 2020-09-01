module Parent where

import Prelude
import Child as Child
import Data.Array ((..))
import Data.Const (Const)
import Data.Maybe (Maybe(..))
import Data.Symbol (SProxy(..))
import Data.Traversable (traverse_)
import Halogen as H
import Halogen.HTML as HH


type ChildSlots = ( child :: Child.Slot Int )

_child :: SProxy "child"
_child= SProxy

type State = Unit

data Action
  = ReceiveMessage Child.Message


page :: forall m . H.Component HH.HTML (Const Void) Unit Void m
page =
  H.mkComponent { initialState: const unit
                , render
                , eval: H.mkEval $ H.defaultEval
                            { handleAction = handleAction }
                }


handleAction :: forall m. Action -> H.HalogenM State Action ChildSlots Void m Unit
handleAction ( ReceiveMessage ( Child.SendMessage post@(Child.Post _ id) ) ) = 
    traverse_ send ( 1..3 ) 
    where
      send id'
        | id' == id = pure Nothing
        | otherwise = H.query _child id' <<<
                      H.tell $ 
                      Child.ReceiveMessage post


render :: forall m. State -> H.ComponentHTML Action ChildSlots m
render _ =
  HH.div_ $ renderSlot <$> 1..3
      where
        renderSlot id = 
            HH.slot _child id Child.control { id } ( Just <<< ReceiveMessage )

