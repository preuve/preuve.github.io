module Main where

import Prelude

import Data.Foldable (for_)
import Data.Int (toNumber)
import Data.Number (pi)
import Data.Tuple.Nested ((/\))
import Deku.Attribute ((:=), (!:=), cb)
import Deku.Do as Deku
import Deku.DOM as D
import Debug (spy)
import Deku.Hooks (useState)
import Deku.Toplevel (runInBody)
import Effect (Effect)
import EmitsTouchEvents (emitsTouchEvents)
import Graphics.Canvas 
    ( closePath
    , getCanvasElementById
    , getContext2D
    , lineTo
    , moveTo
    , setLineWidth
    , setStrokeStyle
    , strokePath
    , beginPath
    , fill
    , arc
    )
import Web.Event.Event (preventDefault)
import Web.TouchEvent.Touch (clientX, clientY) as Touch
import Web.TouchEvent.Touch (pageX, pageY) as Touch
import Web.TouchEvent.TouchEvent (fromEvent, changedTouches) as Touch
import Web.TouchEvent.TouchList (item) as Touch
import Web.UIEvent.MouseEvent (clientX, clientY, fromEvent, buttons)

initialPos = { x: 0.0, y: 0.0 } :: { x :: Number, y :: Number }

main :: Effect Unit
main = do
    isMobile <- emitsTouchEvents
    runInBody Deku.do
        setPos /\ pos <- useState initialPos
        D.div_
            [ D.canvas
                [ D.Width !:= "2000px"
                , D.Height !:= "2000px"
                , D.Id !:= "LiveCanvas"
                , (\p -> D.OnMousemove := cb \e -> do
                    preventDefault e
                    for_ (fromEvent e)
                        \me -> do
                            let lastX = p.x
                                lastY = p.y
                                x = toNumber $ clientX me
                                y = toNumber $ clientY me
                            --spy (show [x,y]) $ 
                            setPos { x, y }
                            melem <- getCanvasElementById "LiveCanvas"
                            for_ melem \elem -> do
                                ctx <- getContext2D elem 
                                setStrokeStyle ctx "#00000077"
                                
                                setLineWidth ctx 12.0
                                
                                if buttons me > 0 
                                    then strokePath ctx $ do
                                        moveTo ctx lastX lastY
                                        lineTo ctx x y
                                        closePath ctx
                                    else pure unit
                    ) <$> pos
                , D.OnTouchstart !:= cb \e -> do
                    preventDefault e
                    for_ (Touch.fromEvent e)
                        \me -> 
                            for_ (Touch.item 0 (Touch.changedTouches me))
                                \t -> do
                                    let x = toNumber $ Touch.pageX t
                                        y = toNumber $ Touch.pageY t
                                    setPos { x, y }
                                    melem <- getCanvasElementById "LiveCanvas"
                                    for_ melem \elem -> do
                                        ctx <- getContext2D elem 
                                        beginPath ctx
                                        arc ctx { end: 2.0 * pi, radius: 4.0, start: 0.0, useCounterClockwise: false, x, y }
                                        fill ctx
                            
                , (\p -> D.OnTouchmove := cb \e -> do
                    preventDefault e
                    for_ (Touch.fromEvent e)
                        \me -> 
                            for_ (Touch.item 0 (Touch.changedTouches me))
                                \t -> do
                                    let lastX = p.x
                                        lastY = p.y
                                        x = toNumber $ Touch.pageX t
                                        y = toNumber $ Touch.pageY t
                                    spy (show [x,y]) $ setPos { x, y }
                                    
                                    melem <- getCanvasElementById "LiveCanvas"
                                    for_ melem \elem -> do
                                        ctx <- getContext2D elem 
                                        setStrokeStyle ctx "#00000077"
                                        
                                        setLineWidth ctx 12.0
                                        
                                        strokePath ctx $ do
                                            moveTo ctx lastX lastY
                                            lineTo ctx x y
                                            closePath ctx
                    ) <$> pos            
                ]
                []
            ]
