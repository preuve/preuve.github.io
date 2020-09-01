module Main where

import Prelude

import Effect (Effect)
import Spork.Html (Html)
import Spork.Html as H
import Spork.PureApp (PureApp)
import Spork.PureApp as PureApp
import Data.Maybe(Maybe(..))
import Data.Int (toNumber)
import Web.UIEvent.MouseEvent(pageX, pageY)

type State = {x :: Number, y :: Number}

data Action = Update Number Number

update ∷ State → Action → State
update s = case _ of
  Update x y → s{x=x, y=y}

render ∷ State → Html Action
render s =
  H.elemWithNS
    ns
    "svg"
    [ H.attr "width" "100%"
    , H.attr "height" "100%"
    , H.onMouseDown (\mouseev -> Just $ Update (toNumber $ pageX mouseev)
                                               (toNumber $ pageY mouseev))
    ]
    [ H.elemWithNS ns "circle"
      [ H.attr "cx" $ show s.x
      , H.attr "cy" $ show s.y
      , H.attr "r" "2"
      , H.attr "fill" "red"
      ] []
    ]
  where 
    ns = Just $ H.Namespace "http://www.w3.org/2000/svg"
    
app ∷ PureApp State Action
app = { update, render, init: {x: 100.0, y: 500.0} }

main ∷ Effect Unit
main = void $ PureApp.makeWithSelector app "#app"
