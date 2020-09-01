module Main where

import Prelude
import Data.Const (Const)
import Data.Maybe (Maybe(..))
import Data.Int(toNumber)
import Effect (Effect)
import Halogen as H
import Halogen.Aff as HA
import Halogen.HTML as HH
import Halogen.HTML.Properties as HP
import Halogen.HTML.Events as HE
import Halogen.VDom.Driver (runUI)
import Halogen.VDom.Types(ElemName(..), Namespace(..)) as HT
import Halogen.HTML.Core(AttrName(..), PropName(..)) as HC
import Web.UIEvent.MouseEvent(pageX, pageY)

type State = { x :: Number, y :: Number }

data Action = UpdatePos Number Number

page ∷ forall m. H.Component HH.HTML (Const Void) Unit Void m 
page = 
    H.mkComponent { initialState: const initialState
                  , render
                  , eval: H.mkEval $ H.defaultEval
                    { handleAction = handleAction }
                  }

initialState ∷ State
initialState = { x:  100.0, y: 100.0}

handleAction :: forall m. Action -> H.HalogenM State Action () Void m Unit
handleAction ( UpdatePos x y ) = 
    H.modify_ _{ x = x, y = y }

radius = 50.0 :: Number 
render :: forall m. State -> H.ComponentHTML Action () m
render state =
    HH.element (HT.ElemName "svg")
              [ HP.attr (HC.AttrName "xmlns") "http://www.w3.org/2000/svg"
              , HP.prop (HC.PropName "style") 
                        "position: absolute; width:100%; height:100%;"
              , HE.onMouseDown (\mouseev -> 
                        Just $ UpdatePos (toNumber $ pageX mouseev) 
                                         (toNumber $ pageY mouseev))]
              [ HH.element (HT.ElemName "path")
                 [ HP.attr (HC.AttrName "d") 
                    ("M " <> (show $ state.x - radius) <> " " 
                          <> (show $ state.y- radius) <> " "
                     <> "a " <> (show radius) <> " " <> (show radius) <> " "
                             <> "0 1 0 " <> (show $ 2.0 * radius) <> " 0" )
                 , HP.attr (HC.AttrName "style") 
                          "stroke: #00F; fill: #F00;"
                ]
                []
               , HH.element (HT.ElemName "path")
                 [ HP.attr (HC.AttrName "d") 
                    ("M " <> (show $ state.x - radius) <> " " 
                          <> (show $ state.y- radius) <> " "
                     <> "a " <> (show radius) <> " " <> (show radius) <> " "
                             <> "0 1 1 " <> (show $ 2.0 * radius) <> " 0" )
                 , HP.attr (HC.AttrName "style") 
                          "stroke: #00F; fill: #F00;"
                ]
                []
              ]
   
main :: Effect Unit
main = HA.runHalogenAff $
       HA.awaitBody >>= runUI page unit

