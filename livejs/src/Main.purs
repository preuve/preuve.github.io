module Main where

import Prelude

import Data.Foldable (for_, traverse_)
import Data.Maybe (Maybe (..))

import Data.Number (pi)
import Data.Int (toNumber)
import Data.Tuple.Nested ((/\))

import Deku.Attribute ((!:=), cb)
import Deku.Control (text)
import Deku.Do as Deku
import Deku.DOM as D
import Deku.Hooks (useState, useState', useEffect, useRef)
import Deku.Toplevel (runInBody)

import Effect (Effect)
import Effect.Ref (new, read, write)
import Graphics.Canvas 
    (CanvasElement
    , arc
    , beginPath
    , closePath
    , fill
    , getContext2D
    , lineTo
    , moveTo
    , setFillStyle
    , setLineWidth
    , setStrokeStyle
    , strokePath
    )

import Web.Event.Event (EventType(..), preventDefault)
import Web.Event.EventTarget (EventListener, addEventListener, eventListener)
import Web.HTML.HTMLCanvasElement as HTMLCanvasElement
import Unsafe.Coerce (unsafeCoerce)

import Web.TouchEvent.Touch (clientX, clientY) as Touch
import Web.TouchEvent.TouchEvent (fromEvent, changedTouches) as Touch
import Web.TouchEvent.TouchList (item) as Touch
import Web.UIEvent.MouseEvent (clientX, clientY, fromEvent)

--type Event a = (a -> Effect Unit) -> Effect (Effect Unit)

data Use a = Special a | Regular a | None

for :: forall a f. Applicative f => Use a -> (a -> f Unit) -> f Unit
for (Special x) f = f x 
for (Regular x) f = f x 
for _ _ = pure unit

touchListener :: forall a.              
        ({ x :: Number         
         , y :: Number         
         }                     
         -> Effect a     
        )                      
        -> Effect EventListener

touchListener f =  
    eventListener \e -> do
        preventDefault e
        for_ (Touch.fromEvent e)
            \me -> for_ (Touch.item 0 $ Touch.changedTouches me)
                \t -> do
                    let x = toNumber $ Touch.clientX t
                        y = toNumber $ Touch.clientY t
                    f { x, y }
                          
mouseListener :: forall a.              
        ({ x :: Number         
         , y :: Number         
         }                     
         -> Effect a     
        )                      
        -> Effect EventListener

mouseListener f =  
    eventListener \e -> do
        preventDefault e
        for_ (fromEvent e)
            \me -> do
                    let x = toNumber $ clientX me
                        y = toNumber $ clientY me
                    f { x, y }

main :: Effect Unit
main = do
    emctx <- new Nothing
    
    runInBody Deku.do
        setOrigin /\ origin <- useState None
        rorigin <- useRef None origin
        setPosition /\ position <- useState'
        
        useEffect origin $ case _ of
            Special { x, y } -> do
                mctx <- read emctx
                for_ mctx \ctx -> do
                    beginPath ctx
                    arc ctx 
                        { end: 2.0 * pi
                        , radius: 41.0
                        , start: 0.0
                        , useCounterClockwise: false
                        , x
                        , y 
                        }
                    fill ctx
            _ -> pure unit
            
        useEffect position \ { x, y } -> do
            morig <- rorigin
            for morig \ { x: lastX, y: lastY} -> do
                mctx <- read emctx
                for_ mctx \ctx -> do
                    strokePath ctx $ do
                        moveTo ctx lastX lastY
                        lineTo ctx x y
                        closePath ctx

                setOrigin $ Regular { x, y }
        
        D.div_
            [ D.canvas
                [ D.Height !:= "3000px"
                , D.Width !:= "2000px"
                , D.Self !:= HTMLCanvasElement.fromElement >>> traverse_ \elt -> do
                    let canvas = (unsafeCoerce :: HTMLCanvasElement.HTMLCanvasElement -> CanvasElement) elt
                    initialCtx <- getContext2D canvas
                    setFillStyle initialCtx "#00000277"
                    setStrokeStyle initialCtx "#00000277"
                    setLineWidth initialCtx 12.0
                    write (Just initialCtx) emctx
                    
                    startTouch <- touchListener $ 
                                setOrigin <<< Special
                    addEventListener (EventType "touchstart") startTouch true (HTMLCanvasElement.toEventTarget elt)

                    moveTouch <- touchListener setPosition
                    addEventListener (EventType "touchmove") moveTouch true (HTMLCanvasElement.toEventTarget elt)

                    startMouse <- mouseListener $ 
                                setOrigin <<< Special
                    addEventListener (EventType "mousedown") startMouse true (HTMLCanvasElement.toEventTarget elt)

                    moveMouse <- mouseListener setPosition
                    addEventListener (EventType "mousemove") moveMouse true (HTMLCanvasElement.toEventTarget elt)

                    stopMouse <- eventListener \_ -> setOrigin None
                    addEventListener (EventType "mouseup") stopMouse true (HTMLCanvasElement.toEventTarget elt)
                ]
                []
            , D.button 
                [ D.Style !:= "font-size: 100px;"
                , D.OnClick !:= cb \_ -> do
                    mctx <- read emctx
                    for_ mctx \ctx -> do
                        setFillStyle ctx "#0000FFFF"
                ] 
                [text $ show <$> position]
            ]

 
