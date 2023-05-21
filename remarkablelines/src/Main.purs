module Main where

import Prelude

import Data.Array (uncons, sortBy)
import Data.Foldable (for_, traverse_)
import Data.Int (toNumber)
import Data.Maybe (Maybe (..))
import Data.Number (sqrt)
import Data.Tuple (snd)
import Data.Tuple.Nested ((/\), type (/\))

import Deku.Attribute ((!:=), (:=))
import Deku.Do as Deku
import Deku.DOM as D
import Deku.Hooks (useState, useState', useEffect, useRef)
import Deku.Toplevel (runInBody)

import Effect (Effect)

import Web.Event.Event (EventType(..), preventDefault)
import Web.Event.EventTarget (EventListener, addEventListener, eventListener)
import Web.HTML.HTMLDivElement as HTMLDivElement

import Web.TouchEvent.Touch (clientX, clientY) as Touch
import Web.TouchEvent.TouchEvent (fromEvent, changedTouches) as Touch
import Web.TouchEvent.TouchList (item) as Touch
import Web.UIEvent.MouseEvent (clientX, clientY, fromEvent)

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

type Vertex = { x :: Number, y :: Number }

type Setter = Vertex -> Effect Unit

width = 1250.0 :: Number
height = 750.0 :: Number
viewBox = { x: -6.0, y: -6.0, width: 12.0, height: 12.0 } ::
    { x :: Number
    , y :: Number
    , width :: Number
    , height :: Number
    }

remap :: Vertex -> Vertex
remap { x, y } =
    let coef = min width height
    in 
        { x: (viewBox.width * x + viewBox.x * width) / coef
        , y: (viewBox.height * y + viewBox.y * height) / coef 
        }
                
iniA = { x: 2.0, y: 0.0 } :: Vertex
iniB = { x: - 1.0, y: sqrt 3.0 } :: Vertex
iniC = { x: - 1.0, y: - sqrt 3.0 } :: Vertex

ini = { a: iniA, b: iniB, c: iniC } :: { a :: Vertex, b :: Vertex, c :: Vertex }

closest :: Vertex -> Array (Vertex /\ Setter) -> Maybe (Setter /\ Number)
closest r vs =
    let ds = (\ (v/\s) -> s /\ sqrt ((v.x-r.x)*(v.x-r.x)+(v.y-r.y)*(v.y-r.y))) <$> vs
    in case uncons (sortBy (\a b -> compare (snd a) (snd b)) ds) of
            Just { head, tail: _ } -> Just head
            _ -> Nothing

main :: Effect Unit
main = do
    
    runInBody Deku.do
        setOrigin /\ origin <- useState None
        setPosition /\ position <- useState'
        
        setA /\ eA <- useState iniA
        ptA <- useRef iniA eA
        setB /\ eB <- useState iniB
        ptB <- useRef iniB eB
        setC /\ eC <- useState iniC
        ptC <- useRef iniC eC
        
        setAction /\ eaction <- useState (const $ pure unit)
        action <- useRef (const $ pure unit) eaction
                
        useEffect origin $ case _ of
            Special v -> do
                a <- ptA
                b <- ptB
                c <- ptC
                let v' = remap v
                for_ (closest v' [a /\ setA, b /\ setB, c /\ setC]) \ (s /\ _) -> do
                    s v'
                    setAction s
                        
            _ -> pure unit
            
        useEffect position \ v -> do
            s <- action
            s $ remap v

        D.div
            [ D.Self !:= HTMLDivElement.fromElement >>> traverse_ \elt -> do
                
                startTouch <- touchListener $ 
                            setOrigin <<< Special
                addEventListener (EventType "touchstart") startTouch true (HTMLDivElement.toEventTarget elt)

                moveTouch <- touchListener setPosition
                addEventListener (EventType "touchmove") moveTouch true (HTMLDivElement.toEventTarget elt)

                startMouse <- mouseListener $ 
                            setOrigin <<< Special
                addEventListener (EventType "mousedown") startMouse true (HTMLDivElement.toEventTarget elt)

                moveMouse <- mouseListener setPosition
                addEventListener (EventType "mousemove") moveMouse true (HTMLDivElement.toEventTarget elt)

                stopMouse <- eventListener \_ -> do
                    setOrigin None
                    setAction (const $ pure unit)
                addEventListener (EventType "mouseup") stopMouse true (HTMLDivElement.toEventTarget elt)
            ]

            [ D.svg 
                [ D.Width !:= show width
                , D.Height !:= show height
                , D.ViewBox !:= 
                    ( show viewBox.x <> " "
                    <> show viewBox.y <> " "
                    <> show viewBox.width <> " "
                    <> show viewBox.height
                    )
                ]
                [ D.circle
                        [ (\p -> D.Cx := show p.x) <$> eA
                        , (\p -> D.Cy := show p.y) <$> eA
                        , D.R !:= "0.1"
                        , D.Stroke !:= "black"
                        , D.StrokeWidth !:= "1"
                        , D.Fill !:= "red"
                        ]
                        []
                , D.circle
                        [ (\p -> D.Cx := show p.x) <$> eB
                        , (\p -> D.Cy := show p.y) <$> eB
                        , D.R !:= "0.1"
                        , D.Stroke !:= "black"
                        , D.StrokeWidth !:= "1"
                        , D.Fill !:= "green"
                        ]
                        []
                , D.circle
                        [ (\p -> D.Cx := show p.x) <$> eC
                        , (\p -> D.Cy := show p.y) <$> eC
                        , D.R !:= "0.1"
                        , D.Stroke !:= "black"
                        , D.StrokeWidth !:= "1"
                        , D.Fill !:= "blue"
                        ]
                        []
                ]
            ]

 
