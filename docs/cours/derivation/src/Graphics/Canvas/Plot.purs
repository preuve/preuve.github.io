module Main where

import Prelude
import Effect (Effect)
import Data.Maybe(Maybe(..), maybe, fromJust)
import Data.Array( filter, length, (..), uncons, dropWhile
                 , head, tail)
import Data.Foldable (foldr,foldM)
import Control.Alt(alt)
import SVG.Geometry ( 
    Circle(..), HalfLine(..), Line(..), Point, Segment(..)
  , aPointOnLine, aVectorOfLine, abs, circle
  , line, meets, ord, point, segment, scale, vector, (<+|))
import SVG.Render(class Render, render',defaultContext, Context,svgclear,svgpath,svgtext)
import SVG.Geometry(length) as Geo
import DOM.Editor as DOM
import FRP.Behavior (Behavior, animate, unfold)
import FRP.Event(Event, create)
import FRP.Event.Time(interval)
import FRP.Event.Mouse (getMouse, withPosition, withButtons)
import Data.Set(isEmpty)
import Partial.Unsafe(unsafePartial)
import Data.Int(toNumber, floor, ceil, round)
import Prim hiding(Function)

width = 800.0 :: Number
height = 600.0 :: Number
density = 200 :: Int

type Color = String

white = "#FFFFFF" :: Color
beige = "#FFFFAF" :: Color
blue = "#0602c6" :: Color
purple = "#B314CB" :: Color

tanStyle = _{stroke = purple, strokeWidth = 1.5} :: Context -> Context

type Domain = Number -> Boolean
type Function = {domain :: Domain, expression :: Number -> Number}
type FandDf = {function :: Function, diff :: Function}

square :: FandDf
square = { function: {domain: const true, expression: \x -> x*x}
         , diff: {domain: const true, expression: \x -> 2.0*x}}

inverse :: FandDf
inverse = { function: {domain: \x -> x /= 0.0, expression: \x -> 1.0 / x}
          , diff: {domain: \x -> x /= 0.0, expression: \x -> -1.0 / x / x}}

arbitrary :: FandDf
arbitrary = { function: { domain: \x -> x /= -1.0
                        , expression: \x -> (2.0*x+1.0)/(x+1.0)/(x+1.0)}
            , diff: { domain: \x -> x /= -1.0
                    , expression: \x -> -2.0*x/(x+1.0)/(x+1.0)/(x+1.0)}}

pen :: Partial => Box 
               -> Array Segment 
               -> Maybe {x :: Number, y :: Number} 
               -> Array (Maybe {x :: Number, y :: Number}) -> Array Segment
pen from acc _        [] = acc
pen from acc (Just p) xs =
 let okY y = botY <= y && y <= topY
     botY = ord from.center - from.halfHeight
     topY = ord from.center + from.halfHeight
  in case uncons xs of
      Just {head: hd, tail: tl} -> 
          case hd of
              Just {x, y} -> pen from (
                               if okY p.y && okY y 
                                then acc <> [segment (point "" p.x p.y) 
                                                     (point "" x y) Nothing]
                                else acc) hd tl
              Nothing     -> 
                let ys :: Array (Maybe {x :: Number, y :: Number})
                    ys = dropWhile (_ == Nothing) tl
                 in if length ys == 0 
                     then acc 
                     else pen from acc (unsafePartial fromJust $ head ys) 
                                       (unsafePartial fromJust $ tail ys)
      Nothing -> acc

plot :: Context -> Box -> Box -> Function -> Effect Unit
plot ctx from to {domain, expression} = 
        let botX = abs from.center - from.halfWidth
            topX = abs from.center + from.halfWidth
            zs = dropWhile (_ == Nothing) $ 
              (\x -> 
                if domain x 
                  then Just {x, y: - expression x} {- <- WTF Yaxis! -}
                  else Nothing) <$> 
                   (\n -> botX + 
                     toNumber n * (topX - botX) / toNumber density) <$> 
                     0..density
        in if length zs == 0 
              then pure unit 
              else foldM (\acc s -> 
                      pure acc <> (render' ctx $ FS from to s) ) unit $ 
                           unsafePartial pen from [] 
                             (unsafePartial fromJust $ head zs) 
                             (unsafePartial fromJust $ tail zs)
                           
type Box = {center :: Point, halfWidth :: Number, halfHeight :: Number}

remap :: Box -> Point -> Box -> Point
remap {center: c0, halfWidth: w0, halfHeight: h0}
      p 
      {center: c1, halfWidth: w1, halfHeight: h1} = 
        let v = vector c0 p
            x = abs v * w1 / w0
            y = ord v * h1 / h0
         in point "" (x + abs c1) (y + ord c1)

window = { center: point "" (width/2.0) (height/2.0)
         , halfWidth: width/2.0
         , halfHeight: height/2.0} :: Box

functionDisplay = { center: point "" (width/2.0) (height/4.1)
                  , halfWidth: width/2.0
                  , halfHeight: height/4.1} :: Box

diffDisplay = { center: point "" (width/2.0) (3.1*height/4.1)
                  , halfWidth: width/2.0
                  , halfHeight: height/4.1} :: Box

local = {center: point "" 0.0 0.0, halfWidth: 6.0, halfHeight: 5.0} :: Box

frame :: Box -> Array Segment
frame {center, halfWidth, halfHeight} =
  let seg sx sy tx ty = segment (point "" (abs center + sx * halfWidth)
                                          (ord center + sy * halfHeight))
                                (point "" (abs center + tx *  halfWidth)
                                          (ord center + ty * halfHeight))
                                Nothing
  in [ seg (-1.0) (-1.0)   1.0  (-1.0)
     , seg   1.0  (-1.0)   1.0    1.0
     , seg   1.0    1.0  (-1.0)   1.0
     , seg (-1.0)   1.0  (-1.0) (-1.0)] 

somePosition :: Maybe {x :: Int, y :: Int} -> {x :: Number, y :: Number}
somePosition =
  maybe { x: 0.0, y: 0.0 }
        (\{ x, y } -> { x: toNumber x
                      , y: toNumber y }) 

type StringPos = {value :: String, pos :: {x :: Number, y :: Number}} 

moveWithButton :: Effect (Event StringPos) 
moveWithButton = 
  (\mouse -> 
    (\{value, buttons} -> 
      { value: if isEmpty buttons 
               then "buttonup" 
               else "buttondown"
      , pos: value}) <$>
        withButtons mouse ((\{value,pos} -> 
          somePosition pos) <$> withPosition mouse (interval 10))) <$> 
            getMouse

data Final = FA (Array Final)
  | FP Box Box Point 
  | FL Box Box Line 
  | FC Box Box Circle 
  | FH Box Box HalfLine 
  | FS Box Box Segment

instance drawableFinal :: Render Final where
  render' ctx (FP from to p) = render' ctx $ remap from p to
  render' ctx (FL from to l) = 
    let p = aPointOnLine l
        q = p <+| aVectorOfLine l
      in render' ctx $ line (remap from p to) (remap from q to)
  render' ctx (FC from to (Circle {center, radius})) =
    let p = remap from center to
        q = remap from (point "" (abs center + radius) (ord center)) to
      in render' ctx $ circle p (Geo.length $ vector p q)  
  render' ctx (FH from to (HalfLine {origin, direction})) = 
    let p = remap from origin to
        q = remap from (origin <+| direction) to
     in render' ctx $ HalfLine {origin: p, direction: vector p q}
  render' ctx (FS from to (Segment {origin, extremity,asOriented})) = 
    render' ctx $ Segment { origin: remap from origin to
                         , extremity: remap from extremity to
                         , asOriented}
  render' ctx (FA arr) = render' ctx arr
 
type State = { fAndDf :: FandDf
             , fromF :: Box
             , toF :: Box
             , toD :: Box
             , fromD :: Box
             , displayD :: Boolean
             , displayT :: Boolean
             , numbers :: Array Number
             , previousX :: Number
             , previousY :: Number}

grid :: Context -> Box -> Box -> Effect Unit
grid ctx from to = 
  let topX = abs from.center + from.halfWidth
      botX = abs from.center - from.halfWidth
      topY = ord from.center + from.halfHeight
      botY = ord from.center - from.halfHeight
      seg x y x' y' = FS from to $ 
                        segment (point "" x y) (point "" x' y') Nothing
      segAtX x = seg x botY x topY
      segAtY y = seg botX y topX y
      ctx' lW = ctx{stroke = "#323232", strokeWidth = lW}
   in do
        foldM (\ a n -> 
             pure a <> (render' (ctx' 0.5) $ segAtX $ toNumber n)) unit $ 
                ceil botX .. floor topX
      
        foldM (\ a n ->
          pure a <> (render' (ctx' 0.5) $ segAtY $ toNumber n)) unit $
            ceil botY .. floor topY
        
        render' (ctx' 1.5) $ segAtX 0.0
      
        if botY <= 0.0 && 0.0 <= topY 
          then render' (ctx' 1.5) $ segAtY 0.0
          else pure unit

cursor :: Box -> Segment
cursor {center, halfWidth, halfHeight} = 
  segment (point "" (abs center) (ord center - halfHeight))
          (point "" (abs center) (ord center + halfHeight)) Nothing

initialState :: State
initialState = 
  { fAndDf: inverse 
  , fromF:  local
  , toF: functionDisplay
  , fromD: local
  , toD: diffDisplay
  , displayD: false
  , displayT: false
  , numbers: []
  , previousX: 0.0
  , previousY: 0.0}

digit2 :: Number -> Number
digit2 a = (_ / 100.0) $ toNumber $ round $ a * 100.0

reframe :: Context -> State -> Effect Unit
reframe ctx { fAndDf
            , fromF, toF
            , fromD, toD, displayD
            , displayT, numbers
            , previousX, previousY} = do
  grid ctx fromF toF 
  grid ctx fromD toD
  plot ctx fromF toF fAndDf.function
  if displayD 
     then plot ctx fromD toD fAndDf.diff 
     else pure unit
  
  let x = abs $ remap toF toF.center fromF
  if fAndDf.function.domain x
      then do
            let f = fAndDf.function.expression
            let df = fAndDf.diff.expression
            let p = point "" x (- f x) {-Yaxis!-}
            let a = - df x
            let b = -1.0 {-Yaxis-}
            let c = x * df x - f x
            let a2 = digit2 $ -a
            let c2 = digit2 $ -c
            svgtext ctx.svg
                    (width * 0.7) 
                    (height * 0.05) 
                    blue 
                    "italic bold 15px arial, serif" $
                    "a = " <> (show $ digit2 x)
            if inBox fromF p 
              then render' ctx $ FP fromF toF p
              else pure unit
            if displayT 
              then 
                case lineInBox fromF (Line { a, b, c}) of
                  Just seg -> do render' (tanStyle ctx) $ FS fromF toF seg
                                 svgtext ctx.svg
                                         (width * 0.7) 
                                         (height * 0.1) 
                                         purple
                                         "italic bold 15px arial, serif" $ 
                                         "y = " <> show a2 
                                                <> "x" 
                                                <> (if c2<0.0 
                                                      then show c2 
                                                      else if c2/=0.0
                                                             then "+" <> (show c2)
                                                             else "") 
                  _ -> pure unit
              else pure unit
      else pure unit
  foldM (\ a n ->
           pure a <> (if fAndDf.diff.domain n 
                        then let df = fAndDf.diff.expression
                                 p  = point "" n (- df n) {-Yaxis!-}
                              in if inBox fromD p
                                then render' (tanStyle ctx) $ FP fromD toD p
                                else pure unit
                        else pure unit)) unit numbers
    

ePage :: Array ButtonEvent -> Context -> Effect (Behavior (Effect Unit)) 
ePage events ctx = liftA1 (reframe ctx) <$> 
  (\ event -> 
    unfold (\{value, pos: {x,y}} st -> 
      case value of
        "inverse" -> st{fAndDf = inverse, numbers = []}
        "square" -> st{fAndDf = square, numbers = []}
        "arbitrary" -> st{fAndDf = arbitrary, numbers = []}
        "zoomOutX" -> st{ fromF{halfWidth = st.fromF.halfWidth*1.1}
                        , fromD{halfWidth = st.fromD.halfWidth*1.1}}
        "zoomInX" -> st{ fromF{halfWidth = st.fromF.halfWidth/1.1}
                       , fromD{halfWidth = st.fromD.halfWidth/1.1}}
        "F: zoomOutY" -> st{ fromF{halfHeight = st.fromF.halfHeight*1.1}}
        "F: zoomInY" -> st{ fromF{halfHeight = st.fromF.halfHeight/1.1}}
        "F': zoomOutY" -> st{ fromD{halfHeight = st.fromD.halfHeight*1.1}}
        "F': zoomInY" -> st{ fromD{halfHeight = st.fromD.halfHeight/1.1}}
        "show Derivative" -> st{displayD = true}
        "hide Derivative" -> st{displayD = false}
        "show Tangent" -> st{displayT = true}
        "hide Tangent" -> st{displayT = false}
        "mark Coefficient" -> 
          st{numbers = st.numbers <> [abs st.fromD.center]}
        "buttonup" -> st{previousX = x, previousY = y}
        "buttondown" ->
          let previous = point "" st.previousX st.previousY
              fromF = st.fromF
              toF = st.toF
              fromD = st.fromD
              toD = st.toD
           in if inBox st.toF previous
               then let p = remap toF previous fromF
                        q = remap toF (point "" x y) fromF
                        q0 = remap toF (point "" x st.previousY) fromF
                     in st{ fromF{center = fromF.center <+| vector q p}
                          , fromD{center = fromD.center <+| vector q0 p}
                          , previousX = x
                          , previousY = y}
               else 
                 if inBox toD previous
                  then let p = remap toD previous fromD
                           q = remap toD (point "" x y) fromD
                           q0 = remap toD (point "" x st.previousY) fromD
                       in st{ fromD{center = fromD.center <+| vector q p}
                            , fromF{center = fromF.center <+| vector q0 p}
                            , previousX = x
                            , previousY = y}
                  else st
                       
        otherwise -> st
        ) (foldr alt event $ (_.event) <$> events) initialState) <$>
            moveWithButton
   
inInterval :: Number -> Number -> Number -> Boolean
inInterval a b x = a <= x && x <= b

inBox :: Box -> Point -> Boolean
inBox {center, halfWidth, halfHeight} p = 
  inInterval (abs center - halfWidth) (abs center + halfWidth) (abs p) &&
  inInterval (ord center - halfHeight) (ord center + halfHeight) (ord p)

segmentInBox ::  Box -> Segment -> Maybe Segment
segmentInBox = unsafePartial \ b@{center, halfWidth, halfHeight} 
                               s@(Segment sCore) ->
  let candidates = filter ((_ == 1) <<< length) $ (s `meets` _) <$> frame b
   in case unit of
       unit | inBox b sCore.origin && inBox b sCore.extremity -> Just s
            | inBox b sCore.origin -> 
                let [[p]] = candidates 
                in Just $ segment sCore.origin p Nothing
            | inBox b sCore.extremity ->
               let [[p]] = candidates 
                in Just $ segment sCore.extremity p Nothing
            | otherwise -> 
                if length candidates == 2 
                  then let [[p],[q]] = candidates 
                        in Just $ segment p q Nothing
                  else Nothing

lineInBox :: Box -> Line -> Maybe Segment
lineInBox b l = 
  let p = aPointOnLine l
      v = aVectorOfLine l
   in segmentInBox b $ 
       segment (p <+| scale (-50.0) v) (p <+| scale 50.0 v) Nothing

type ButtonEvent = { event :: Event StringPos
                   , push :: StringPos -> Effect Unit}

cb :: forall a. String -> ButtonEvent -> a -> Effect Unit
cb msg {event, push} ev = do
  push {value: msg, pos: {x: 0.0, y: 0.0}}

cbOption :: ButtonEvent -> DOM.Event -> Effect Unit
cbOption {event, push} = unsafePartial \ ev -> do
  msg <- DOM.selectedValueFromEvent ev
  push {value: msg, pos: {x: 0.0, y: 0.0}}

mkButtonEvent :: forall r. {body :: DOM.Node, document :: DOM.Document | r} 
  -> DOM.Node
  -> String 
  -> Effect ButtonEvent
mkButtonEvent setup div msg = do
  b <- DOM.createElement "button" setup.document
  _ <- DOM.setTextContent msg b
  _ <- DOM.appendChild b div
  ev <- create
  _ <- DOM.addEventListener (cb msg ev) DOM.click b 
  pure ev

mkOptionEvent :: forall r. {body :: DOM.Node, document :: DOM.Document | r} 
  -> DOM.Node
  -> String 
  -> Effect Unit
mkOptionEvent setup select msg = do
  o <- DOM.createElement "option" setup.document
  _ <- DOM.setTextContent msg o
  _ <- DOM.appendChild o select
  pure unit

curryBox :: forall a. (Number -> Number -> Number -> Number -> a) 
                      ->  Box -> a
curryBox f {center, halfWidth, halfHeight} = 
  f (abs center - halfWidth) (ord center - halfHeight) 
    (2.0 * halfWidth)        (2.0 * halfHeight)

rectangle :: Context -> Number -> Number -> Number -> Number -> Effect Unit
rectangle ctx x y dx dy = do 
  let bl = point "" x (y+dy)
  let br = point "" (x+dx) (y+dy)
  let tr = point "" (x+dx) y
  let tl = point "" x y
  svgpath ctx.svg ctx.stroke ctx.strokeWidth ctx.fill $
        "M " <> (show $ abs bl) <> " " <> (show $ ord bl) <> " "
     <> "L " <> (show $ abs br) <> " " <> (show $ ord br) <> " "
     <> "L " <> (show $ abs tr) <> " " <> (show $ ord tr) <> " "
     <> "L " <> (show $ abs tl) <> " " <> (show $ ord tl) <> " "
     <> "z"

main :: Effect Unit
main = do
  setup <- DOM.setup
  
  display <- DOM.createElement "div" setup.document
  _ <- DOM.setAttribute "style" "display: grid; grid-template-columns: 3fr 2fr;" display

  svg <- DOM.newSVG "position: relative; width:800px; height:600px;" display
  
  div <- DOM.createElement "div" setup.document
  _ <- DOM.appendChild div display

  let ctx = (defaultContext svg) { stroke = "#050409"}

  let background = rectangle ctx{fill = white} 0.0 0.0 width height
  let functionBkg = curryBox (rectangle ctx{fill = beige}) functionDisplay
  let diffBkg = curryBox (rectangle ctx{fill = beige}) diffDisplay
 
  zox <- mkButtonEvent setup div "zoomOutX"
  zix <- mkButtonEvent setup div "zoomInX"
  zofy <- mkButtonEvent setup div "F: zoomOutY"
  zify <- mkButtonEvent setup div "F: zoomInY"
  zody <- mkButtonEvent setup div "F': zoomOutY"
  zidy <- mkButtonEvent setup div "F': zoomInY"
  showDiff <- mkButtonEvent setup div "show Derivative"
  hideDiff <- mkButtonEvent setup div "hide Derivative"
  showTan <- mkButtonEvent setup div "show Tangent"
  hideTan <- mkButtonEvent setup div "hide Tangent"
  markCoef <- mkButtonEvent setup div "mark Coefficient"

  list <- DOM.createElement "select" setup.document
  _ <- mkOptionEvent setup list "inverse"
  _ <- mkOptionEvent setup list "square"
  _ <- mkOptionEvent setup list "arbitrary"
  ev <- create
  _ <- DOM.addEventListener (cbOption ev) DOM.change list

  _ <- DOM.appendChild list div
  
  _ <- DOM.appendChild display setup.body

  page <- ePage [showDiff,hideDiff,showTan,hideTan,markCoef
                ,zox,zix,zody,zidy,zofy,zify,ev] ctx
  _ <- animate ( pure (svgclear svg)
              <> pure background 
              <> pure functionBkg 
              <> pure diffBkg 
              <> page 
              <> pure (render' ctx $ frame functionDisplay)
              <> pure (render' ctx $ frame diffDisplay)
              <> pure (render' ctx{stroke = blue} $ cursor functionDisplay)
              <> pure (render' ctx{stroke = blue} $ cursor diffDisplay)
          ) identity
  pure unit

