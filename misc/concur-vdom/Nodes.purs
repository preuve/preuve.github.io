module Nodes where

import Prelude hiding (div)

import Concur.VDom.DOM as D
import Concur.VDom.Props.Internal (Prop)
import Concur.VDom.Types (HTML)
import Concur.Core.Types (Widget)
import Concur.Core.Props (Props)
import Control.MultiAlternative (class MultiAlternative)
import Control.ShiftMap (class ShiftMap)

div :: D.El
div = D.node "div"

div' :: D.El'
div' = D.node' "div"

div_ :: D.El1
div_ = D.node_ "div"

h2 :: D.El
h2 = D.node "h2"

h2_ :: D.El1
h2_ = D.node_ "h2"

p :: D.El
p = D.node "p"

p' :: D.El'
p' = D.node' "p"

label :: D.El
label = D.node "label"

label' :: D.El'
label' = D.node' "label"

type Leaf m a = forall m a. MultiAlternative m => ShiftMap (Widget HTML) m => Array (Props Prop a) -> m a

hr :: forall m a. Leaf m a
hr ps = D.node "hr" ps []

hr' :: forall m a. MultiAlternative m => ShiftMap (Widget HTML) m => m a
hr' = hr []

button :: D.El
button = D.node "button"

button' :: D.El'
button' = D.node' "button"

text :: D.ElLeafFunc' String
text = D.text

input :: forall m a. Leaf m a
input ps = D.node "input" ps []
