module Children where

import Prelude

import Data.Const (Const)
import Halogen as H
import Halogen.HTML as HH


type Slot = H.Slot (Const Void) Void


-- Very simple component for roast potatoes
roast :: forall m.  H.Component HH.HTML (Const Void) Unit Void m
roast =
  H.mkComponent { initialState: const unit
                , render: renderRoast
                , eval: H.mkEval $ H.defaultEval
                }

renderRoast :: forall m . Unit -> H.ComponentHTML Void () m
renderRoast _ = HH.ul_ [ HH.li_ [ HH.text "Adrianne" ]
                       , HH.li_ [ HH.text "Carolus" ]
                       ]


-- Very simple component for chips
chips :: forall m.  H.Component HH.HTML (Const Void) Unit Void m
chips =
  H.mkComponent { initialState: const unit
                , render: renderChips
                , eval: H.mkEval $ H.defaultEval
                }

renderChips :: forall m . Unit -> H.ComponentHTML Void () m
renderChips _ = HH.ul_ [ HH.li_ [ HH.text "Maris Piper" ]
                       , HH.li_ [ HH.text "Spanish Agria" ]
                       , HH.li_ [ HH.text "Cara" ]
                       ]


-- Very simple component for salad potatos
salad :: forall m.  H.Component HH.HTML (Const Void) Unit Void m
salad =
  H.mkComponent { initialState: const unit
                , render: renderSalad
                , eval: H.mkEval $ H.defaultEval
                }

renderSalad :: forall m . Unit -> H.ComponentHTML Void () m
renderSalad _ = HH.ul_ [ HH.li_ [ HH.text "Athlete" ]
                       , HH.li_ [ HH.text "Pink Fir" ]
                       ]
