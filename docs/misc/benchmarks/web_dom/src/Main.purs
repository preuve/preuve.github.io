module Main where

import Prelude
import Effect (Effect)
import Effect.Console (log)
import Web.DOM.Element (Element, toEventTarget, toNode)
import Web.Event.Event (EventType(..))
import Web.Event.EventTarget (addEventListener,eventListener)
import Web.DOM.ParentNode (QuerySelector(..), querySelector)
import Effect.Ref (Ref, read, modify, new)
import Partial.Unsafe(unsafePartial)
import Data.Maybe(Maybe, fromJust)
import Web.HTML (window)
import Web.HTML.Window (document)
import Web.HTML.HTMLDocument (toDocument)
import Web.DOM.Document(toParentNode)
import Web.DOM.Node (setTextContent)

clickCallBack :: forall a. Ref Int -> Maybe Element -> a -> Effect Unit
clickCallBack count display ev = do
    log "Mouse clicked!"
    void $ modify (\c -> c + 1) count
    render count display

render :: Ref Int -> Maybe Element -> Effect Unit
render count display = do
  c <- read count
  setTextContent (show c) $ toNode $ unsafePartial $ fromJust display

main :: Effect Unit
main = do
  clickCount <- new 0
  
  win        <- window
  htmlDoc  <- document win
  let doc  =  toDocument htmlDoc
  
  canvas <- querySelector (QuerySelector "#canvas") $ toParentNode doc
  display <- querySelector (QuerySelector "#display") $ toParentNode doc
  setTextContent "clic /\\" $ toNode $ unsafePartial $ fromJust display
  
  listener <- eventListener $ clickCallBack clickCount display
  addEventListener (EventType "click") 
                   listener 
                   false 
                   (toEventTarget $ unsafePartial $ fromJust canvas)
