module SporKaTeX(module SporKaTeX) where

import Prelude
import Effect (Effect)
import Spork.Html (Html)
import Spork.Html as H

foreign import render :: forall a. String -> Html a
