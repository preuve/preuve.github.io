module Router where

import Prelude

import Data.Maybe (Maybe(..))
import Effect (Effect)
import Web.Event.EventTarget as EventTarget
import Web.HTML (window)
import Web.HTML.Event.HashChangeEvent.EventTypes as ET
import Web.HTML.Location as Location
import Web.HTML.Window as Window


data Route = Roast | Chips | Salad


router :: (Route -> Effect Unit) -> Effect Unit
router cb = do
  listener <- EventTarget.eventListener $ const matchRoute
  window' <- window 
  EventTarget.addEventListener ET.hashchange listener false $ Window.toEventTarget window'
  where
    matchRoute = do
              route <- getRoute
              case route of
                Just route' -> cb route'
                Nothing -> pure unit
     

getRoute :: Effect (Maybe Route)
getRoute = do
  hash <- window >>= Window.location >>= Location.hash 
  pure $ case hash of
           "#roast" -> Just Roast
           "#chips" -> Just Chips
           "#salad" -> Just Salad
           _ -> Nothing
 
