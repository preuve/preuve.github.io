module Main where

import Prelude

import Data.Maybe as Maybe
import Effect (Effect)
import Effect.Aff (launchAff_)
import Halogen as H
import Halogen.Aff as HA
import Halogen.VDom.Driver (runUI)
import Parent as Parent
import Router as R
 

main :: Effect Unit
main = HA.runHalogenAff do
         body <- HA.awaitBody
         current <- H.liftEffect $ Maybe.fromMaybe R.Roast <$> R.getRoute
         io <- runUI Parent.page current body

         let
           changeRoute route = launchAff_ $
                               io.query $
                               H.tell $
                               Parent.ChangeRoute route

         H.liftEffect $ R.router changeRoute


  
