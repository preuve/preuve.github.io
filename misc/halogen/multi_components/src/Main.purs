module Main where

import Prelude
import Halogen.Aff as HA
import Parent as Parent
import Halogen.VDom.Driver (runUI)
import Effect (Effect)


main :: Effect Unit
main = HA.runHalogenAff $
       HA.awaitBody >>= runUI Parent.page unit


