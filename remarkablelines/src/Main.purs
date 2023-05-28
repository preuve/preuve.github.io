module Main where

import Prelude

import Data.Array (uncons, sortBy, (!!))
import Data.Foldable (class Foldable, for_, traverse_, fold)
import Data.Int (toNumber)
import Data.Maybe (Maybe (..))
import Data.Number (sqrt)
import Data.Tuple (snd)
import Data.Tuple.Nested ((/\), type (/\))

import Deku.Attribute (Attribute, (!:=), (:=))
import Deku.Attributes (klass, style_)
import Deku.Control (text_)
import Deku.Do as Deku
import Deku.DOM as D
import Deku.Hooks (useState, useState', useEffect, useRef)
import Deku.Listeners (click)
import Deku.Toplevel (runInBody)

import Effect (Effect)
import Effect.Timer (setTimeout)

import FRP.Event (Event)

import Data.Geometry.Plane (point, segment, middle, line, meets, vector, normalTo, (<+|), scale, abs, ord, Segment)

import Web.DOM.Element (getBoundingClientRect)

import Web.Event.Event (EventType(..), preventDefault)
import Web.Event.EventTarget (EventListener, addEventListener, eventListener)
import Web.HTML.HTMLDivElement as HTMLDivElement

import Web.HTML (window)
import Web.HTML.Window (navigator)
import Web.PointerEvent.Navigator (maxTouchPoints)

import Web.TouchEvent.Touch (clientX, clientY) as Touch
import Web.TouchEvent.TouchEvent (fromEvent, changedTouches) as Touch
import Web.TouchEvent.TouchList (item) as Touch
import Web.UIEvent.MouseEvent (clientX, clientY, fromEvent)

bothWithDefault :: forall a. Array a -> a /\ a -> a /\ a
bothWithDefault xs (a/\b) =
    case (xs !! 0) /\ (xs !! 1) of
         Just c /\ Just d -> c /\ d
         _ -> a /\ b

type ViewBox =
    { x :: Number
    , y :: Number
    , width :: Number
    , height :: Number
    }

type Vertex = { x :: Number, y :: Number }

mouseListener :: forall f.
    Foldable f =>
    Effect (f Number) -> (Vertex -> Effect Unit) -> Effect EventListener

mouseListener off f =  
    eventListener \e -> do
        preventDefault e
        
        for_ (fromEvent e) \me -> do
            o <- off
            for_ o \h -> do
                let x = toNumber $ clientX me
                    y = (toNumber $ clientY me) - h
                if y < 0.0
                   then pure unit
                   else f { x, y }

touchListener :: forall f.              
    Foldable f =>
    Effect (f Number) -> (Vertex -> Effect Unit) -> Effect EventListener

touchListener off f =  
    eventListener \e -> do
        preventDefault e
        for_ (Touch.fromEvent e) \me -> 
            for_ (Touch.item 0 $ Touch.changedTouches me) \t -> do
                o <- off
                for_ o \h -> do
                    let x = toNumber $ Touch.clientX t
                        y = (toNumber $ Touch.clientY t) - h
                    if y < 0.0
                        then pure unit
                        else f { x, y }

type Setter = Vertex -> Effect Unit

closest :: Vertex -> Array (Vertex /\ Setter) -> Maybe (Setter /\ Number)
closest r vs =
    let ds = (\ (v/\s) -> s /\ sqrt ((v.x-r.x)*(v.x-r.x)+(v.y-r.y)*(v.y-r.y))) <$> vs
    in case uncons (sortBy (\a b -> compare (snd a) (snd b)) ds) of
            Just { head, tail: _ } -> Just head
            _ -> Nothing

styleItem = "display: grid; grid-template-columns: 1fr 1fr 1fr;" :: String

                        
main :: Effect Unit
main = do
    w <- window
    nav <- navigator w
    tp <- maxTouchPoints nav
    
    let isMobile = tp > 1
        width = 
            if isMobile
               then widthMobile
               else widthDesktop
        height =
            if isMobile
               then heightMobile
               else heightDesktop

        viewBox =
            case compare (specBox.width * height) (specBox.height * width) of
                GT ->
                    { x: specBox.x, y: specBox.y + specBox.height / 2.0 - height * specBox.width / width / 2.0
                    , width: specBox.width, height: height * specBox.width / width
                    }
                LT ->
                    { x: specBox.x + specBox.width / 2.0 - width * specBox.height / height / 2.0, y: specBox.y
                    , width: width * specBox.height / height, height: specBox.height
                    }
                _ ->
                    { x: specBox.x, y: specBox.y
                    , width: specBox.width, height: specBox.height
                    }

        remap { x, y } =
            { x: (viewBox.width * x + viewBox.x * width) / width
            , y: (viewBox.height * y + viewBox.y * height) / height 
            }

        segmentsBox =
            let tl = point "" viewBox.x viewBox.y
                tr = point "" (viewBox.x + viewBox.width) viewBox.y
                br = point "" (viewBox.x + viewBox.width) (viewBox.y + viewBox.height)
                bl = point "" viewBox.x (viewBox.y + viewBox.height)
            in
                [ segment tl tr Nothing
                , segment tr br Nothing
                , segment br bl Nothing
                , segment bl tl Nothing
                ]

        styleButton :: (Boolean -> Effect Unit) -> Event Boolean -> Array (Event (Attribute D.Button_))
        styleButton setter ev =  
            [ style_ $ 
                if isMobile 
                   then "font-size: 80px; font-weight: 900;"
                   else "font-size: 40px;"
            , click $ (\b -> setter (not b)) <$> ev
            , klass $ (\b -> if b then "selected" else "general") <$> ev
            ]

    runInBody Deku.do
        setOffset /\ eoffset <- useState Nothing
        offset <- useRef Nothing eoffset
        
        setOrigin /\ origin <- useState Nothing
        setPosition /\ position <- useState'
        
        setA /\ eA <- useState iniA
        ptA <- useRef iniA eA
        setB /\ eB <- useState iniB
        ptB <- useRef iniB eB
        setC /\ eC <- useState iniC
        ptC <- useRef iniC eC
        
        setAction /\ eaction <- useState (const $ pure unit)
        action <- useRef (const $ pure unit) eaction
        
        setHauteurs /\ hauteurs <- useState false
        setMedianes /\ medianes <- useState false
        setMediatrices /\ mediatrices <- useState false
        setBissectrices /\ bissectrices <- useState false
                
        setOrthocentre /\ orthocentre <- useState false
        setGravite /\ gravite <- useState false
        setCircumcenter /\ circumcenter <- useState false
        setInscenter /\ inscenter <- useState false
        
        setPropO /\ propO <- useState false
        setPropG /\ propG <- useState false
        setPropC /\ propC <- useState false
        setPropI /\ propI <- useState false
        
        useEffect origin $ case _ of
            Just v -> do
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

        let visibleLine p q =
                let pt z = point "" z.x z.y
                    d = line (pt p) (pt q)
                    ms = do
                        s <- segmentsBox
                        (\ m -> { x: abs m, y: ord m }) <$> d `meets` s
                
                in bothWithDefault ms (p /\ q)
            
            mediane eP eQ eR = 
                D.line
                    ([ (\v -> D.Visibility := if v then "visible" else "hidden") <$> medianes 
                    ] <>
                    ((\e1 e2 e3 ->
                    [
                    (\p q r -> 
                        let (a /\ _) = visibleLine { x: (p.x + q.x) / 2.0, y: (p.y + q.y) / 2.0 } r
                        in D.X1 := show a.x) <$> e1 <*> e2 <*> e3
                    , (\p q r -> 
                        let (a /\ _) = visibleLine { x: (p.x + q.x) / 2.0, y: (p.y + q.y) / 2.0 } r
                        in D.Y1 := show a.y) <$> e1 <*> e2 <*> e3
                    , (\p q r -> 
                        let (_ /\ b) = visibleLine { x: (p.x + q.x) / 2.0, y: (p.y + q.y) / 2.0 } r
                        in D.X2 := show b.x) <$> e1 <*> e2 <*> e3
                    , (\p q r -> 
                        let (_ /\ b) = visibleLine { x: (p.x + q.x) / 2.0, y: (p.y + q.y) / 2.0 } r
                        in D.Y2 := show b.y) <$> e1 <*> e2 <*> e3
                    ]) eP eQ eR)
                    <> [ D.Stroke !:= "black"
                    , D.StrokeWidth !:= show lineWidth
                    ])
                    []

            g eP eQ eR = 
                D.circle
                        [ (\v -> D.Visibility := if v then "visible" else "hidden") <$> gravite 
                        , (\p q r -> D.Cx := (show $ (p.x + q.x + r.x) / 3.0)) <$> eP <*> eQ <*> eR
                        , (\p q r -> D.Cy := (show $ (p.y + q.y + r.y) / 3.0)) <$> eP <*> eQ <*> eR
                        , D.R !:= show (pointRadius / 2.0)
                        , D.Fill !:= "black"
                        ]
                        []

            mediatrice eP eQ =
                let pt z = point "" z.x z.y
                    m p q = middle "" $ segment (pt p) (pt q) Nothing
                    n p q = normalTo $ vector (pt p) (pt q)
                    u p q = m p q <+| scale (10.0) (n p q)
                    v p q = m p q <+| scale (-10.0) (n p q)
                in D.line
                    [ (\b -> D.Visibility := if b then "visible" else "hidden") <$> mediatrices 
                    , (\p q -> D.X1 := (show $ abs $ u p q)) <$> eP <*> eQ
                    , (\p q -> D.Y1 := (show $ ord $ u p q)) <$> eP <*> eQ
                    , (\p q -> D.X2 := (show $ abs $ v p q)) <$> eP <*> eQ
                    , (\p q -> D.Y2 := (show $ ord $ v p q)) <$> eP <*> eQ
                    , D.Stroke !:= "black"
                    , D.StrokeWidth !:= show lineWidth
                    ]
                    []
                    
            ccenter eP eQ eR =
                let pt z = point "" z.x z.y
                    m p q = middle "" $ segment (pt p) (pt q) Nothing
                    n p q = normalTo $ vector (pt p) (pt q)
                    u p q = m p q <+| scale (10.0) (n p q)
                    v p q = m p q <+| scale (-10.0) (n p q)
                    c p q r =
                        let u' = u p q
                            v' = v p q
                            u'' = u p r
                            v'' = v p r
                        in line u' v' `meets` line u'' v''
                in D.circle
                        [ (\b -> D.Visibility := if b then "visible" else "hidden") <$> circumcenter 
                        , (\p q r -> D.Cx := (fold $ show <<< abs <$> c p q r)) <$> eP <*> eQ <*> eR
                        , (\p q r -> D.Cy := (fold $ show <<< ord <$> c p q r)) <$> eP <*> eQ <*> eR
                        , D.R !:= show (pointRadius / 2.0)
                        , D.Fill !:= "black"
                        ]
                        []

        D.div_
            [ D.div
                [ D.Self !:= Just >>> traverse_ \elt -> do
                    setTimeout 500 $ do
                        t <- (_.bottom) <$> getBoundingClientRect elt
                        setOffset $ Just t
                ]
                [ D.div
                    [ style_ styleItem]
                    [ D.button (styleButton setHauteurs hauteurs) [text_ "hauteurs"]
                    , D.button (styleButton setOrthocentre orthocentre) [text_ "orthocentre"]
                    , D.button (styleButton setPropO propO) [text_ "propriété"]
                    ]
                , D.div
                    [ style_ styleItem]
                    [ D.button (styleButton setMedianes medianes) [text_ "médianes"]
                    , D.button (styleButton setGravite gravite) [text_ "centre de gravité"]
                    , D.button (styleButton setPropG propG) [text_ "propriété"]
                    ]
                , D.div
                    [ style_ styleItem]
                    [ D.button (styleButton setMediatrices mediatrices) [text_ "médiatrices"]
                    , D.button (styleButton setCircumcenter circumcenter) [text_ "centre du cercle circonscrit"]
                    , D.button (styleButton setPropC propC) [text_ "propriété"]
                    ]
                , D.div
                    [ style_ styleItem]
                    [ D.button (styleButton setBissectrices bissectrices) [text_ "bissectrices"]
                    , D.button (styleButton setInscenter inscenter) [text_ "centre du cercle inscrit"]
                    , D.button (styleButton setPropI propI) [text_ "propriété"]
                    ]
                ]
            , D.div
                [ D.Self !:= HTMLDivElement.fromElement >>> traverse_ \elt -> do
                    let 
                        add e f = 
                            addEventListener 
                                (EventType e) 
                                f 
                                true 
                                (HTMLDivElement.toEventTarget elt)
                    
                    
                    startMouse <- mouseListener offset $ 
                                setOrigin <<< Just
                    add "mousedown" startMouse

                    moveMouse <- mouseListener offset setPosition
                    add "mousemove" moveMouse

                    stopMouse <- eventListener \_ -> do
                        setOrigin Nothing
                        setAction (const $ pure unit)
                    add "mouseup" stopMouse
                
                    startTouch <- touchListener offset $ 
                                setOrigin <<< Just
                    add "touchstart" startTouch

                    moveTouch <- touchListener offset setPosition
                    add "touchmove" moveTouch
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
                            , D.R !:= show pointRadius
                            , D.Fill !:= "red"
                            ]
                            []
                    , D.circle
                            [ (\p -> D.Cx := show p.x) <$> eB
                            , (\p -> D.Cy := show p.y) <$> eB
                            , D.R !:= show pointRadius
                            , D.Fill !:= "green"
                            ]
                            []
                    , D.circle
                            [ (\p -> D.Cx := show p.x) <$> eC
                            , (\p -> D.Cy := show p.y) <$> eC
                            , D.R !:= show pointRadius
                            , D.Fill !:= "blue"
                            ]
                            []
                    , D.line 
                        [ (\p -> D.X1 := show p.x) <$> eA
                        , (\p -> D.Y1 := show p.y) <$> eA
                        , (\p -> D.X2 := show p.x) <$> eB
                        , (\p -> D.Y2 := show p.y) <$> eB
                        , D.Stroke !:= "black"
                        , D.StrokeWidth !:= show lineWidth
                        ]
                        []
                    , D.line 
                        [ (\p -> D.X1 := show p.x) <$> eB
                        , (\p -> D.Y1 := show p.y) <$> eB
                        , (\p -> D.X2 := show p.x) <$> eC
                        , (\p -> D.Y2 := show p.y) <$> eC
                        , D.Stroke !:= "black"
                        , D.StrokeWidth !:= show lineWidth
                        ]
                        []
                    , D.line 
                        [ (\p -> D.X1 := show p.x) <$> eA
                        , (\p -> D.Y1 := show p.y) <$> eA
                        , (\p -> D.X2 := show p.x) <$> eC
                        , (\p -> D.Y2 := show p.y) <$> eC
                        , D.Stroke !:= "black"
                        , D.StrokeWidth !:= show lineWidth
                        ]
                        []
                    , mediane eA eB eC
                    , mediane eB eC eA
                    , mediane eC eA eB
                    , g eA eB eC
                    , mediatrice eA eB
                    , mediatrice eC eB
                    , mediatrice eA eC
                    , ccenter eA eB eC
                    ]
                ]
            ]

widthDesktop = 2000.0 :: Number
heightDesktop = 1000.0 :: Number

widthMobile = 1600.0 :: Number
heightMobile = 3000.0 :: Number

specBox = { x: -3.0, y: -3.0, width: 6.0, height: 6.0 } :: ViewBox

pointRadius = 0.4 :: Number
lineWidth = 0.1 :: Number

iniA = { x: 2.0, y: 0.0 } :: Vertex
iniB = { x: - 1.0, y: sqrt 3.0 } :: Vertex
iniC = { x: - 1.0, y: - sqrt 3.0 } :: Vertex

