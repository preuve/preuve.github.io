module Main where

import Prelude

import Data.Foldable (for_)
import Data.Int (toNumber)
import Data.Tuple.Nested ((/\))
import Deku.Attribute ((:=), (!:=), cb)
import Deku.Do as Deku
import Deku.DOM as D
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
    , strokePath
    )
import Web.UIEvent.MouseEvent (clientX, clientY, fromEvent, buttons)


initialPos = { x: 0.0, y: 0.0 } :: { x :: Number, y :: Number }

main :: Effect Unit
main = do
    runInBody Deku.do
        setPos /\ pos <- useState initialPos
        D.div_
            [ D.canvas
                [ D.Width !:= "2000px"
                , D.Height !:= "2000px"
                , D.Id !:= "LiveCanvas"
                , (\p -> D.OnMousemove := cb \e -> do
                    for_ (fromEvent e)
                        \me -> do
                            let lastX = p.x
                                lastY = p.y
                                x = toNumber $ clientX me
                                y = toNumber $ clientY me
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
                ]
                []
            ]
