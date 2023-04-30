module Main where

import Prelude

import Data.Foldable (for_)
import Data.Int (toNumber)
import Data.Maybe (Maybe (..))
import Data.Number (pi)
import Data.Tuple.Nested ((/\))
import Deku.Attribute ((:=), (!:=), cb)
import Deku.Do as Deku
import Deku.DOM as D
import Debug (spy)
import Deku.Hooks (useState)
import Deku.Toplevel (runInBody)
import Effect (Effect)
import Graphics.Canvas 
    ( closePath
    , getCanvasElementById
    , getContext2D
    , lineTo
    , moveTo
    , setLineWidth
    , setStrokeStyle
    , setFillStyle
    , strokePath
    , beginPath
    , fill
    , arc
    )
import Web.Event.Event (preventDefault, stopPropagation)
import Web.TouchEvent.Touch (clientX, clientY) as Touch
import Web.TouchEvent.Touch (pageX, pageY) as Touch
import Web.TouchEvent.TouchEvent (fromEvent, fromUIEvent, changedTouches) as Touch
import Web.TouchEvent.TouchList (item) as Touch
import Web.UIEvent.MouseEvent (clientX, clientY, fromEvent, buttons)

initialPos = Nothing :: Maybe { x :: Number, y :: Number }

main :: Effect Unit
main = do
    runInBody Deku.do
        setPos /\ pos <- useState initialPos
        D.div_
            [ D.canvas
                [ D.Width !:= "2000px"
                , D.Height !:= "2000px"
                , D.Id !:= "LiveCanvas"
                , D.OnMousedown !:= cb \e -> do
                    for_ (fromEvent e)
                        \me -> do
                            let x = toNumber $ clientX me
                                y = toNumber $ clientY me
                            setPos $ Just { x, y }
                , D.OnMouseup !:= cb \e -> do
                    setPos initialPos
                , (\mp -> D.OnMousemove := cb \e -> do
                    for_ mp \p -> do 
                        melem <- getCanvasElementById "LiveCanvas"
                        for_ melem \elem -> do
                            ctx <- getContext2D elem 
                            setStrokeStyle ctx "#00000077"
                            setLineWidth ctx 12.0
                            for_ (fromEvent e)
                                \me -> do
                                    let lastX = p.x
                                        lastY = p.y
                                        x = toNumber $ clientX me
                                        y = toNumber $ clientY me
                                    setPos $ Just { x, y }
                                    
                                    strokePath ctx $ do
                                        moveTo ctx lastX lastY
                                        lineTo ctx x y
                                        closePath ctx
                    ) <$> pos
                    
                    
                    {-
                , D.OnTouchstart !:= cb \e -> do
                    for_ (Touch.fromUIEvent e)
                        \me -> 
                            for_ (Touch.item 0 (Touch.changedTouches me))
                                \t -> do
                                    let x = toNumber $ Touch.pageX t
                                        y = toNumber $ Touch.pageY t
                                    setPos { x, y }
                                    melem <- getCanvasElementById "LiveCanvas"
                                    for_ melem \elem -> do
                                        ctx <- getContext2D elem 
                                        setFillStyle ctx "#00000077"
                                        
                                        beginPath ctx
                                        arc ctx { end: 2.0 * pi, radius: 24.0, start: 0.0, useCounterClockwise: false, x, y }
                                        closePath ctx
                                        fill ctx
                    for_ (Touch.fromEvent e)
                        \me -> 
                            for_ (Touch.item 1 (Touch.changedTouches me))
                                \t -> do
                                    let x = toNumber $ Touch.pageX t
                                        y = toNumber $ Touch.pageY t
                                    setPos { x, y }
                                    melem <- getCanvasElementById "LiveCanvas"
                                    for_ melem \elem -> do
                                        ctx <- getContext2D elem 
                                        setFillStyle ctx "#00000077"
                                        
                                        beginPath ctx
                                        arc ctx { end: 2.0 * pi, radius: 24.0, start: 0.0, useCounterClockwise: false, x, y }
                                        fill ctx
                    for_ (Touch.fromEvent e)
                        \me -> 
                            for_ (Touch.item 2 (Touch.changedTouches me))
                                \t -> do
                                    let x = toNumber $ Touch.pageX t
                                        y = toNumber $ Touch.pageY t
                                    setPos { x, y }
                                    melem <- getCanvasElementById "LiveCanvas"
                                    for_ melem \elem -> do
                                        ctx <- getContext2D elem 
                                        setFillStyle ctx "#00000077"
                                        
                                        beginPath ctx
                                        arc ctx { end: 2.0 * pi, radius: 24.0, start: 0.0, useCounterClockwise: false, x, y }
                                        fill ctx
                    preventDefault e
                    stopPropagation e
                    -}
                    
                    {-
                , (\p -> D.OnTouchmove := cb \e -> do
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
                    preventDefault e
                    stopPropagation e
                    ) <$> pos   
                    -}
                ]
                []
            ]
