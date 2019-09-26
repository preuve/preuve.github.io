module DOM.Editor(module DOM.Editor) where

import Prelude
import Data.Traversable(traverse)
import Web.DOM.Element (Element, setAttribute, setId, toEventTarget, toNode, fromNode,fromEventTarget) as DOM
import Web.DOM.Node (Node, appendChild, parentNode, removeChild, setTextContent,replaceChild,textContent) as DOM
import Web.DOM.NonElementParentNode (getElementById) as DOM
import Web.Event.Event (Event,EventType,target) as Event
import Web.Event.EventTarget (addEventListener, eventListener) as Event
import Web.HTML.Event.EventTypes (click,change) as Event
import Web.HTML (Window, window) as HTML
import Web.HTML.Window (document) as HTML
import Web.HTML.HTMLDocument (body, toDocument) as HTML
import Web.DOM.Document (Document, createElement, toNonElementParentNode) as DOM
import Web.HTML.HTMLElement (toNode) as HTML
import Web.HTML.HTMLInputElement (fromElement, fromNode, value, setValue) as HTMLInput
import Web.HTML.HTMLSelectElement (fromElement, value) as HTMLSelect
import Data.Maybe (fromJust)
import Partial.Unsafe (unsafePartial)
import Effect(Effect)
import Graphics.Canvas(Context2D, ImageData)

foreign import getContext2D :: DOM.Node -> Effect Context2D
foreign import getImageData :: 
    Context2D -> Number -> Number -> Number -> Number -> Effect ImageData
foreign import putImageData :: 
    Context2D -> ImageData -> Number -> Number -> Effect Unit

type Document = DOM.Document
type Node = DOM.Node
type Event = Event.Event

selectedValueFromEvent :: Event.Event -> Effect String
selectedValueFromEvent = unsafePartial \ev ->
  HTMLSelect.value $ fromJust $ HTMLSelect.fromElement 
                   $ fromJust $ DOM.fromEventTarget 
                   $ fromJust $ Event.target ev

inputedValueFromEvent :: Event.Event -> Effect String
inputedValueFromEvent = unsafePartial \ev ->
  HTMLInput.value $ fromJust $ HTMLInput.fromElement 
                  $ fromJust $ DOM.fromEventTarget 
                  $ fromJust $ Event.target ev

inputedValue :: DOM.Node -> Effect String
inputedValue = unsafePartial \node -> HTMLInput.value $ fromJust $ HTMLInput.fromNode node

inputValue :: DOM.Node  -> Effect String 
inputValue input = do
  val <- traverse HTMLInput.value (HTMLInput.fromElement $ unsafePartial $ fromJust $ DOM.fromNode input)
  pure $ unsafePartial $ fromJust val

setInputValue :: String -> DOM.Node -> Effect Unit
setInputValue str = unsafePartial $ \ input -> 
  HTMLInput.setValue str $ fromJust
                         $ HTMLInput.fromElement 
                         $ fromJust 
                         $ DOM.fromNode input

setup :: Effect {window :: HTML.Window, document :: DOM.Document, body :: DOM.Node}
setup = do
  window        <- HTML.window
  htmlDocument  <- HTML.document window
  let document  =  HTML.toDocument htmlDocument
  maybeBody     <- HTML.body htmlDocument
  let bodyRaw = unsafePartial $ fromJust maybeBody
  let body = HTML.toNode bodyRaw
  pure {window, document, body}

createElement :: String -> DOM.Document -> Effect DOM.Node
createElement str doc = DOM.toNode <$> DOM.createElement str doc

appendChild :: DOM.Node -> DOM.Node -> Effect DOM.Node
appendChild = DOM.appendChild

replaceChild :: DOM.Node -> DOM.Node -> DOM.Node -> Effect DOM.Node
replaceChild = DOM.replaceChild

removeChild :: DOM.Node -> Effect Unit
removeChild node = do
  parent <- DOM.parentNode node
  _ <- DOM.removeChild node $ unsafePartial $ fromJust parent
  pure unit

toNode :: DOM.Element -> DOM.Node
toNode = DOM.toNode

setTextContent :: String -> DOM.Node -> Effect Unit
setTextContent = DOM.setTextContent

textContent :: DOM.Node -> Effect String
textContent = DOM.textContent

setAttribute :: String -> String -> DOM.Node -> Effect Unit
setAttribute key val node = DOM.setAttribute key val (unsafePartial $ fromJust $ DOM.fromNode node)

setId :: String -> DOM.Node -> Effect Unit
setId id node = DOM.setId id (unsafePartial $ fromJust $ DOM.fromNode node)

getElementById :: String -> DOM.Document -> Effect DOM.Node
getElementById str doc = (\x -> DOM.toNode $ unsafePartial $ fromJust x) <$> DOM.getElementById str (DOM.toNonElementParentNode doc)

addEventListener :: (Event.Event -> Effect Unit) -> Event.EventType -> DOM.Node -> Effect Unit
addEventListener cb ev node = do
  listener <- Event.eventListener cb
  _ <- Event.addEventListener ev listener false (DOM.toEventTarget (unsafePartial $ fromJust $ DOM.fromNode node))
  pure unit

click :: Event.EventType
click = Event.click

change :: Event.EventType
change = Event.change
