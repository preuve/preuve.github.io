module Main where

import Prelude

import Data.Array (uncons, sortBy, (!!), length)
import Data.Foldable (class Foldable, for_, traverse_, oneOf, maximum, sum)
import Data.FunctorWithIndex (mapWithIndex)
import Data.Geometry.Plane
  ( Point(..)
  , abs
  , circle
  , halfline
  , line
  , meets
  , middle
  , normalTo
  , ord
  , point
  , projection
  , segment
  , vector
  , (<+|)
  )
import Data.Int (toNumber)
import Data.Maybe (Maybe(..), fromMaybe)
import Data.Number (sqrt)
import Data.String (length) as String
import Data.Tuple (fst, snd)
import Data.Tuple.Nested ((/\), type (/\))

import Deku.Attribute (Attribute, Cb, (!:=), (:=), (<:=>), cb)
import Deku.Attributes (klass, style_)
import Deku.Control (text_)
import Deku.Do as Deku
import Deku.DOM as D
import Deku.Hooks (useRef, useHot, useHot', useMemoized)
import Deku.Listeners (click)
import Deku.Toplevel (runInBody)

import Effect (Effect)
import Effect.Timer (setTimeout)

import FRP.Event (Event, keepLatest)

import Web.CSSOM.MouseEvent (offsetX, offsetY)
import Web.DOM.Element (getBoundingClientRect)

import Web.Event.Event (EventType(..), preventDefault)
import Web.Event.EventTarget (EventListener, eventListener, addEventListener)

import Web.HTML (window)
import Web.HTML.HTMLDivElement as HTMLDivElement
import Web.HTML.Window (navigator, innerWidth, innerHeight)

import Web.PointerEvent.Navigator (maxTouchPoints)
import Web.TouchEvent.Touch (clientX, clientY) as Touch
import Web.TouchEvent.TouchEvent (fromEvent, changedTouches) as Touch
import Web.TouchEvent.TouchList (item) as Touch
import Web.UIEvent.MouseEvent (fromEvent)

bothWithDefault :: forall a. Array a -> a /\ a -> a /\ a
bothWithDefault xs (a /\ b) =
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

fromVertex :: Vertex -> Point
fromVertex { x, y } = point "" x y

toVertex :: Point -> Vertex
toVertex z = { x: abs z, y: ord z }

mouseCb :: (Vertex -> Effect Unit) -> Cb
mouseCb f =
  cb \e -> do
    preventDefault e

    for_ (fromEvent e) \me -> do
      let
        x = toNumber $ offsetX me
        y = toNumber $ offsetY me
      if y < 0.0 then pure unit
      else f { x, y }

touchListener ::
  forall f.
  Foldable f =>
  Effect (f Number) ->
  (Vertex -> Effect Unit) ->
  Effect EventListener

touchListener off f =
  eventListener \e -> do
    preventDefault e
    for_ (Touch.fromEvent e) \me ->
      for_ (Touch.item 0 $ Touch.changedTouches me) \t -> do
        o <- off
        for_ o \h -> do
          let
            x = toNumber $ Touch.clientX t
            y = (toNumber $ Touch.clientY t) - h
          if y < 0.0 then pure unit
          else f { x, y }

type Setter = Vertex -> Effect Unit

closest :: Vertex -> Array (Vertex /\ Setter) -> Maybe (Setter /\ Number)
closest r vs =
  let
    ds = (\(v /\ s) -> s /\ sqrt ((v.x - r.x) * (v.x - r.x) + (v.y - r.y) * (v.y - r.y))) <$> vs
  in
    case uncons (sortBy (\a b -> compare (snd a) (snd b)) ds) of
      Just { head, tail: _ } -> Just head
      _ -> Nothing

styleItem = "display: grid; grid-template-columns: 30% 33% 37%; " :: String

pointName :: Point -> String
pointName (Point rec) = rec.name

main :: Effect Unit
main = do

  win <- window

  width <- toNumber <$> innerWidth win
  height <- toNumber <$> innerHeight win
  nav <- navigator win
  tp <- maxTouchPoints nav

  let
    isMobile = tp > 1
    viewBox =
      case compare (specBox.width * height) (specBox.height * width) of
        GT ->
          { x: specBox.x
          , y: specBox.y + specBox.height / 2.0 - height * specBox.width / width / 2.0
          , width: specBox.width
          , height: height * specBox.width / width
          }
        LT ->
          { x: specBox.x + specBox.width / 2.0 - width * specBox.height / height / 2.0
          , y: specBox.y
          , width: width * specBox.height / height
          , height: specBox.height
          }
        _ ->
          { x: specBox.x
          , y: specBox.y
          , width: specBox.width
          , height: specBox.height
          }

    remap { x, y } =
      { x: (viewBox.width * x + viewBox.x * width) / width
      , y: (viewBox.height * y + viewBox.y * height) / height
      }

    segmentsBox =
      let
        tl = point "" viewBox.x viewBox.y
        tr = point "" (viewBox.x + viewBox.width) viewBox.y
        br = point "" (viewBox.x + viewBox.width) (viewBox.y + viewBox.height)
        bl = point "" viewBox.x (viewBox.y + viewBox.height)
      in
        [ segment tl tr Nothing
        , segment tr br Nothing
        , segment br bl Nothing
        , segment bl tl Nothing
        ]

    styleButton :: ((Boolean -> Effect Unit) /\ Event Boolean) -> Array (Event (Attribute D.Button_))
    styleButton (setter /\ ev) =
      [ style_ $
          if isMobile then "font-size: " <> mobileButtonFontSize <> "font-weight: 900;"
          else "font-size: " <> desktopButtonFontSize
      , click $ (\b -> setter (not b)) <$> ev
      , klass $ (\b -> if b then "selected" else "general") <$> ev
      ]

  runInBody Deku.do
    setOffset /\ eoffset <- useHot Nothing
    offset <- useRef Nothing eoffset

    setOrigin /\ _ <- useHot Nothing
    setPosition /\ _ <- useHot'

    setA /\ eA <- useHot (toVertex iniA)
    ptA <- useRef (toVertex iniA) eA
    setB /\ eB <- useHot (toVertex iniB)
    ptB <- useRef (toVertex iniB) eB
    setC /\ eC <- useHot (toVertex iniC)
    ptC <- useRef (toVertex iniC) eC

    setAction /\ eaction <- useHot (const $ pure unit)
    action <- useRef (const $ pure unit) eaction

    hauteurs <- useHot false
    medianes <- useHot false
    mediatrices <- useHot false
    bissectrices <- useHot false

    orthocentre <- useHot false
    gravite <- useHot false
    circumcenter <- useHot false
    inscenter <- useHot false

    propO <- useHot false
    propG <- useHot false
    propC <- useHot false
    propI <- useHot false

    let
      anyProperty =
        ( (\a b c d -> a || b || c || d)
            <$> snd propO
            <*> snd propG
            <*> snd propC
            <*> snd propI
        )

    eocenter <- useMemoized $
      ( \p q r ->
          let
            u p' q' r' =
              fromVertex q' <+| projection
                (vector (fromVertex q') (fromVertex r'))
                (vector (fromVertex q') (fromVertex p'))
            hp = u p q r
            hq = u q p r
            o = line (fromVertex p) hp `meets` line (fromVertex q) hq
          in
            { x: sum $ abs <$> o
            , y: sum $ ord <$> o
            }
      ) <$> eA <*> eB <*> eC

    egravity <- useMemoized $
      ( \p q r ->
          { x: (p.x + q.x + r.x) / 3.0
          , y: (p.y + q.y + r.y) / 3.0
          }
      ) <$> eA <*> eB <*> eC

    eccenter <- useMemoized $
      ( \p q r ->
          let
            m p' q' = middle "" $ segment (fromVertex p') (fromVertex q') Nothing
            n p' q' = normalTo $ vector (fromVertex p') (fromVertex q')
            u p' q' = m p' q' <+| n p' q'
            c = line (m p q) (u p q) `meets` line (m p r) (u p r)
          in
            { x: sum $ abs <$> c
            , y: sum $ ord <$> c
            }
      ) <$> eA <*> eB <*> eC

    eicenter <- useMemoized $
      ( \p q r ->
          let
            aux p' q' r' =
              let
                pt = fromVertex p'
                c = circle pt 1.0
              in
                bothWithDefault
                  ( (c `meets` halfline pt (vector pt $ fromVertex q'))
                      <> (c `meets` halfline pt (vector pt $ fromVertex r'))
                  )
                  (fromVertex q' /\ fromVertex r')
            s /\ t = aux q r p
            u /\ v = aux r p q
            cci = line (fromVertex q) (middle "" $ segment s t Nothing)
              `meets` line (fromVertex r) (middle "" $ segment u v Nothing)
          in
            { x: sum $ abs <$> cci
            , y: sum $ ord <$> cci
            }
      ) <$> eA <*> eB <*> eC

    let
      emiddle eP eQ = useMemoized $
        ( \p q ->
            { x: (p.x + q.x) / 2.0
            , y: (p.y + q.y) / 2.0
            }
        ) <$> eP <*> eQ

    eA' <- emiddle eB eC
    eB' <- emiddle eA eC
    eC' <- emiddle eA eB

    let
      eproj eP eQ eR = useMemoized $
        ( \p q r -> toVertex $
            fromVertex q <+|
              projection
                (vector (fromVertex q) $ fromVertex r)
                (vector (fromVertex q) $ fromVertex p)
        ) <$> eP <*> eQ <*> eR

    eJ <- eproj eicenter eB eC
    eK <- eproj eicenter eA eC
    eL <- eproj eicenter eA eB

    let
      styleRadio :: ((Boolean -> Effect Unit) /\ Event Boolean) -> Array (Event (Attribute D.Button_))
      styleRadio (setter /\ ev) =
        [ style_ $
            if isMobile then "font-size: " <> mobileButtonFontSize <> "font-weight: 900;"
            else "font-size: " <> desktopButtonFontSize
        , click $
            ( \this ->
                if this then setter false
                else do
                  fst propO false
                  fst propG false
                  fst propC false
                  fst propI false
                  setter true
            ) <$> ev
        , klass $ (\b -> if b then "selected" else "general") <$> ev
        ]

    let
      setOriginEtAl o = do
        setOrigin o
        for_ o \v -> do
          a <- ptA
          b <- ptB
          c <- ptC

          let
            v' = remap v
          for_ (closest v' [ a /\ setA, b /\ setB, c /\ setC ]) \(s /\ _) -> do
            s v'
            setAction s

      setPositionEtAl p = do
        setPosition p
        s <- action
        s $ remap p

      visibleLine p q =
        let
          d = line (fromVertex p) (fromVertex q)
          ms = do
            s <- segmentsBox
            toVertex <$> d `meets` s
        in
          bothWithDefault ms (p /\ q)

      meetingPoint eshow eprop ecoord =
        D.circle
          [ ( \s p -> D.Visibility := (if s || p then "visible" else "hidden")
            )
              <$> snd eshow
              <*> snd eprop
          , D.R !:= show (pointRadius / 2.0)
          , D.Fill !:= "black"
          , keepLatest $
              ( \{ x, y } -> oneOf
                  [ D.Cx !:= show x
                  , D.Cy !:= show y
                  ]
              ) <$> ecoord
          ]
          []

      hauteur eP =
        D.line
          [ (D.Visibility <:=> (if _ then "visible" else "hidden")) <$> snd hauteurs
          , D.Stroke !:= "black"
          , D.StrokeWidth !:= show lineWidth
          , keepLatest $
              ( \o p ->
                  let
                    a /\ b = visibleLine o p
                  in
                    oneOf
                      [ D.X1 !:= show a.x
                      , D.Y1 !:= show a.y
                      , D.X2 !:= show b.x
                      , D.Y2 !:= show b.y
                      ]
              ) <$> eocenter <*> eP
          ]
          []

      mediane eP eQ eR =
        D.line
          [ (D.Visibility <:=> (if _ then "visible" else "hidden")) <$> snd medianes
          , D.Stroke !:= "black"
          , D.StrokeWidth !:= show lineWidth
          , keepLatest $
              ( \p q r ->
                  let
                    a /\ b =
                      visibleLine
                        { x: (p.x + q.x) / 2.0
                        , y: (p.y + q.y) / 2.0
                        }
                        r
                  in
                    oneOf
                      [ D.X1 !:= show a.x
                      , D.Y1 !:= show a.y
                      , D.X2 !:= show b.x
                      , D.Y2 !:= show b.y
                      ]
              ) <$> eP <*> eQ <*> eR
          ]
          []

      mediatrice eM =
        D.line
          [ (D.Visibility <:=> (if _ then "visible" else "hidden")) <$> snd mediatrices
          , D.Stroke !:= "black"
          , D.StrokeWidth !:= show lineWidth
          , keepLatest $
              ( \c m ->
                  let
                    a /\ b = visibleLine c m
                  in
                    oneOf
                      [ D.X1 !:= show a.x
                      , D.Y1 !:= show a.y
                      , D.X2 !:= show b.x
                      , D.Y2 !:= show b.y
                      ]
              ) <$> eccenter <*> eM
          ]
          []

      bissectrice eP =
        D.line
          [ (D.Visibility <:=> (if _ then "visible" else "hidden")) <$> snd bissectrices
          , D.Stroke !:= "black"
          , D.StrokeWidth !:= show lineWidth
          , keepLatest $
              ( \i p ->
                  let
                    a /\ b = visibleLine p i
                  in
                    oneOf
                      [ D.X1 !:= show a.x
                      , D.Y1 !:= show a.y
                      , D.X2 !:= show b.x
                      , D.Y2 !:= show b.y
                      ]
              ) <$> eicenter <*> eP
          ]
          []

      droiteEuler =
        D.line
          [ ( \c o gr ->
                D.Visibility := (if c && o && gr then "visible" else "hidden")
            )
              <$> snd circumcenter
              <*> snd orthocentre
              <*> snd gravite
          , D.Stroke !:= "purple"
          , D.StrokeWidth !:= show (lineWidth / 2.0)
          , keepLatest $
              ( \c o ->
                  let
                    a /\ b = visibleLine c o
                  in
                    oneOf
                      [ D.X1 !:= show a.x
                      , D.Y1 !:= show a.y
                      , D.X2 !:= show b.x
                      , D.Y2 !:= show b.y
                      ]
              ) <$> eccenter <*> eocenter
          ]
          []

      property eprop content =
        let
          nLines = 2 * length content + 1
          labelHeight = toNumber nLines * (svgFontSize / 2.0)
          nColumns = fromMaybe 0 $ maximum $ (String.length <$> content)
          labelWidth = toNumber nColumns * (svgFontSize / 3.5)
          labelX = viewBox.x + labelWidth / 20.0
          labelY = viewBox.y + labelHeight / 40.0
        in
          D.g
            [ (D.Visibility <:=> (if _ then "visible" else "hidden")) <$> snd eprop
            ] $
            [ D.rect
                [ D.X !:= show labelX
                , D.Y !:= show labelY
                , D.Width !:= show labelWidth
                , D.Height !:= show labelHeight
                , D.Rx !:= show 0.1
                , D.Fill !:= "#AAAA"
                ]
                []
            ] <>
              ( ( \j str -> D.text
                    [ D.Style !:= ("font-family: sans-serif; font-size: " <> show (svgFontSize / 2.0) <> "px; ")
                    , D.X !:= (show $ labelX + labelWidth / 10.0)
                    , D.Y !:=
                        ( show $ labelY + labelHeight / 10.0
                            + (2.0 * toNumber j + 1.0) * (svgFontSize / 2.0)
                        )
                    ]
                    [ text_ str ]
                ) `mapWithIndex` content
              )

      screenPoint eP eCond color size =
        D.circle
          [ ( \po ->
                D.Visibility := (if po then "visible" else "hidden")
            )
              <$> eCond
          , (\p -> D.Cx := show p.x) <$> eP
          , (\p -> D.Cy := show p.y) <$> eP
          , D.R !:= show (size * pointRadius)
          , D.Fill !:= color
          ]
          []

      screenPointName eP eCond str =
        D.text
          [ ( \po ->
                D.Visibility := (if po then "visible" else "hidden")
            )
              <$> eCond
          , D.Style !:= ("font-family: sans-serif; font-size: " <> show svgFontSize <> "px; ")
          , (\p -> D.X := show (p.x + svgFontSize / 2.5)) <$> eP
          , (\p -> D.Y := show (p.y - svgFontSize / 2.5)) <$> eP
          ]
          [ text_ str ]

      screenSegment eP eQ eCond =
        D.line
          [ ( \po ->
                D.Visibility := (if po then "visible" else "hidden")
            )
              <$> eCond
          , D.Stroke !:= "black"
          , D.StrokeWidth !:= show (lineWidth / 2.0)
          , keepLatest $
              ( \p q ->
                  oneOf
                    [ D.X1 !:= show p.x
                    , D.Y1 !:= show p.y
                    , D.X2 !:= show q.x
                    , D.Y2 !:= show q.y
                    ]
              ) <$> eP <*> eQ
          ]
          []

    D.div_
      [ D.div
          [ D.Self !:= Just >>> traverse_ \elt -> do
              setTimeout 400 $ do
                t <- (_.bottom) <$> getBoundingClientRect elt
                setOffset $ Just t
          ]
          [ D.div
              [ style_ styleItem ]
              [ D.button (styleButton hauteurs) [ text_ "hauteurs" ]
              , D.button (styleButton orthocentre) [ text_ "orthocentre" ]
              , D.button (styleRadio propO) [ text_ "propriété" ]
              ]
          , D.div
              [ style_ styleItem ]
              [ D.button (styleButton medianes) [ text_ "médianes" ]
              , D.button (styleButton gravite) [ text_ "centre de gravité" ]
              , D.button (styleRadio propG) [ text_ "propriété" ]
              ]
          , D.div
              [ style_ styleItem ]
              [ D.button (styleButton mediatrices) [ text_ "médiatrices" ]
              , D.button (styleButton circumcenter) [ text_ "centre du cercle circonscrit" ]
              , D.button (styleRadio propC) [ text_ "propriété" ]
              ]
          , D.div
              [ style_ styleItem ]
              [ D.button (styleButton bissectrices) [ text_ "bissectrices" ]
              , D.button (styleButton inscenter) [ text_ "centre du cercle inscrit" ]
              , D.button (styleRadio propI) [ text_ "propriété" ]
              ]
          ]
      , D.div
          [ D.Style !:= "height: 100%;"
          , D.OnMousedown !:= mouseCb (setOriginEtAl <<< Just)
          , D.OnMousemove !:= mouseCb setPositionEtAl
          , D.OnMouseup !:= cb \_ -> do
              setOriginEtAl Nothing
              setAction (const $ pure unit)
          , D.Self !:= HTMLDivElement.fromElement >>> traverse_ \elt -> do

              let
                add e f =
                  addEventListener
                    (EventType e)
                    f
                    true
                    (HTMLDivElement.toEventTarget elt)
              startTouch <- touchListener offset $
                setOriginEtAl <<< Just
              add "touchstart" startTouch

              moveTouch <- touchListener offset setPositionEtAl
              add "touchmove" moveTouch
          ]
          [ D.svg
              [ D.Width !:= show width
              , D.Height !:= show height
              , D.ViewBox !:=
                  ( show viewBox.x
                      <> " "
                      <> show viewBox.y
                      <> " "
                      <> show viewBox.width
                      <> " "
                      <> show viewBox.height
                  )
              ]
              [ screenPoint eA (pure true) "red" 1.0
              , screenPointName eA anyProperty (pointName iniA)
              , screenPoint eB (pure true) "green" 1.0
              , screenPointName eB anyProperty (pointName iniB)
              , screenPoint eC (pure true) "blue" 1.0
              , screenPointName eC anyProperty (pointName iniC)

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
              , meetingPoint gravite propG egravity
              , screenPointName egravity (snd propG) "G"
              , property propG
                  [ "si G=grav(ABC), A' milieu de [BC], B' milieu de [AC], et C' milieu de [AB]"
                  , "alors"
                  , "Aire(A'GC)=Aire(A'GB)=Aire(C'GB)=Aire(C'GA)=Aire(B'GA)=Aire(B'GC)"
                  ]

              , mediatrice eA'
              , mediatrice eB'
              , mediatrice eC'
              , meetingPoint circumcenter propC eccenter
              , screenPointName eccenter (snd propC) "O"
              , property propC [ "si O=ccc(ABC)", "alors", "OA=OB=OC" ]

              , hauteur eA
              , hauteur eB
              , hauteur eC
              , meetingPoint orthocentre propO eocenter
              , screenPointName eocenter (snd propO) "H"
              , property propO [ "si H=orth(ABC)", "alors", "A=orth(HBC), B=orth(AHC) et C=orth(ABH)" ]

              , bissectrice eA
              , bissectrice eB
              , bissectrice eC
              , meetingPoint inscenter propI eicenter
              , screenPointName eicenter (snd propI) "I"
              , property propI [ "si I=cci(ABC)", "alors", "dist(I,(AB))=dist(I,(BC))=dist(I,(AC))" ]

              , droiteEuler

              , D.circle
                  [ keepLatest $
                      ( \o p ->
                          let
                            r = sqrt ((o.x - p.x) * (o.x - p.x) + (o.y - p.y) * (o.y - p.y))
                          in
                            oneOf
                              [ (D.Visibility <:=> (if _ then "visible" else "hidden")) <$> snd propC
                              , D.Cx !:= show o.x
                              , D.Cy !:= show o.y
                              , D.R !:= show r
                              , D.Fill !:= "none"
                              , D.Stroke !:= "orange"
                              , D.StrokeWidth !:= show (lineWidth / 2.0)
                              ]
                      ) <$> eccenter <*> eA
                  ]
                  []

              , screenPoint eA' (snd propG) "black" 0.5
              , screenPointName eA' (snd propG) "A'"
              , screenPoint eB' (snd propG) "black" 0.5
              , screenPointName eB' (snd propG) "B'"
              , screenPoint eC' (snd propG) "black" 0.5
              , screenPointName eC' (snd propG) "C'"

              , screenSegment eA eA' (snd propG)
              , screenSegment eB eB' (snd propG)
              , screenSegment eC eC' (snd propG)

              , screenSegment eocenter eA (snd propO)
              , screenSegment eocenter eB (snd propO)
              , screenSegment eocenter eC (snd propO)

              , D.circle
                  [ keepLatest $
                      ( \i p q ->
                          let
                            h = toVertex $ fromVertex p <+|
                              projection
                                (vector (fromVertex p) $ fromVertex q)
                                (vector (fromVertex p) $ fromVertex i)
                            r = sqrt ((i.x - h.x) * (i.x - h.x) + (i.y - h.y) * (i.y - h.y))
                          in
                            oneOf
                              [ (D.Visibility <:=> (if _ then "visible" else "hidden")) <$> snd propI
                              , D.Cx !:= show i.x
                              , D.Cy !:= show i.y
                              , D.R !:= show r
                              , D.Fill !:= "none"
                              , D.Stroke !:= "indigo"
                              , D.StrokeWidth !:= show (lineWidth / 2.0)
                              ]
                      ) <$> eicenter <*> eA <*> eB
                  ]
                  []

              , screenSegment eicenter eJ (snd propI)
              , screenSegment eicenter eK (snd propI)
              , screenSegment eicenter eL (snd propI)
              ]
          ]
      ]

mobileButtonFontSize = "80px; " :: String
desktopButtonFontSize = "40px; " :: String
svgFontSize = 0.4 :: Number

specBox = { x: -3.0, y: -3.0, width: 6.0, height: 6.0 } :: ViewBox

pointRadius = 0.2 :: Number
lineWidth = 0.05 :: Number

iniA = point "A" 2.0 0.0 :: Point
iniB = point "B" (-1.0) (sqrt 3.0) :: Point
iniC = point "C" (-1.0) (-sqrt 3.0) :: Point

