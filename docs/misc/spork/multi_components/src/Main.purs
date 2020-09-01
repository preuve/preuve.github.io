module Main where

import Prelude
import Parent as Parent
import Effect (Effect)
import Spork.PureApp as PureApp

main ∷ Effect Unit
main = void $ PureApp.makeWithSelector Parent.app "#app"


