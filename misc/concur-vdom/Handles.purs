module Handles where

import Prelude

import Concur.VDom.Props (handle, prop) as P
import Concur.Core.Props (Props(..))
import Web.Event.Event (Event, target)
import Effect.Unsafe (unsafePerformEffect)
import Web.DOM.Element (fromEventTarget, toNode)
import Web.DOM.Node (textContent)
import Web.HTML.HTMLInputElement (fromElement, value) as Input
import Data.Maybe (Maybe(..), maybe)
import Concur.VDom.Props.Internal (Prop(..)) as P

onClick :: Props P.Prop Event
onClick = P.handle "click"

onChange :: Props P.Prop Event
onChange = P.handle "input"

onFocus :: Props P.Prop Event
onFocus = P.handle "focus"

onMouseMove :: Props P.Prop Event
onMouseMove = P.handle "mousemove"

onMouseDown :: Props P.Prop Event
onMouseDown = P.handle "mousedown"

onMouseUp :: Props P.Prop Event
onMouseUp = P.handle "mouseup"

unsafeTargetValue :: Event -> String
unsafeTargetValue ev = 
  unsafePerformEffect 
    $ maybe (pure "") Input.value 
    $ Input.fromElement =<< fromEventTarget =<< target ev

unsafeTextContent :: Event -> String
unsafeTextContent ev = 
  unsafePerformEffect 
    $ maybe (pure "") textContent 
    $ (Just <<< toNode) =<< fromEventTarget =<< target ev

_type :: forall a. String -> Props P.Prop a
_type = P.prop "type"

value :: forall a. String -> Props P.Prop a
value = P.prop "value"

checked :: forall a. Boolean -> Props P.Prop a
checked = P.prop "checked"

dangerouslySetInnerHTML :: forall a. String -> Props P.Prop a
dangerouslySetInnerHTML = P.prop "innerHTML"

-- | Construct a custom key value attr
attr :: forall a. String -> String -> Props P.Prop a
attr s v = PrimProp (P.Attribute Nothing s v)

