module Main where

import Prelude
import Effect (Effect)
import Data.Maybe(Maybe(..), maybe, fromJust)
import Data.Array( filter, length, (..), uncons, dropWhile
                 , head, tail)
import Data.Foldable (foldr)
import Control.Alt(alt)
import Color (Color, rgb)
import Graphics.Drawing (Drawing, FillStyle, fillColor, filled, rectangle, render)
import Graphics.Canvas.Geometry (class DrawableSet, Circle(..), HalfLine(..), Line, Point, Segment(..), aPointOnLine, aVectorOfLine, abs, circle, drawIn, line, meets, ord, point, scale, segment, vector, (<+|))
import Graphics.Canvas.Geometry(length) as Geo
import DOM.Editor as DOM
import FRP.Behavior (Behavior, animate, unfold)
import FRP.Event(Event, create)
import FRP.Event.Time(interval)
import FRP.Event.Mouse (getMouse, withPosition, withButtons)
import Data.Set(isEmpty)
import Partial.Unsafe(unsafePartial)
import Data.Int(toNumber, floor, ceil, round)
import Prim hiding(Function)
import Math(sqrt)
import Data.String(stripPrefix, Pattern(..))

foreign import fromString :: String -> Number

width = 800.0 :: Number
height = 600.0 :: Number
density = 200 :: Int
  
white = fillColor $ rgb 255 255 255 :: FillStyle
beige = fillColor $ rgb 255 255 175 :: FillStyle
blue = rgb 6 2 198 :: Color
purple = rgb 179 14 203 :: Color

type Domain = Number -> Boolean
newtype Function = Function { domain :: Domain
                            , expression :: Number -> Number}

newtype Canonical = Canonical {a :: Number, alpha :: Number, beta :: Number}
newtype Reduced = Reduced {a :: Number, b :: Number, c :: Number}
type Couple = {x :: Number, y :: Number}
newtype Triplet = Triplet {c0 :: Couple, c1 :: Couple, c2 :: Couple}

newtype Factorized = Factorized {a :: Number, x1 :: Number, x2 :: Number}

class Convertible a b where
  convert :: a -> b

instance convCanonicalFactorized :: Convertible Canonical (Maybe Factorized) where
  convert can@(Canonical {a, alpha, beta}) = 
    let Reduced {a,b,c} = convert can
        delta = b*b - 4.0 * a * c
     in if delta < 0.0 
          then Nothing
          else Just $ Factorized {a, x1: (-b+sqrt delta)/2.0/a, x2: (-b-sqrt delta)/2.0/a}


instance convReducedCanonical :: Convertible Reduced Canonical where
  convert r@(Reduced {a, b, c}) = 
    let Function f = convert r :: Function
        alpha = -b/2.0/a
     in Canonical {a, alpha, beta: f.expression alpha}

instance convCanonicalFunction :: Convertible Canonical Function where
  convert (Canonical {a, alpha, beta}) = Function 
    {domain: const true, expression: \x -> a*(x-alpha)*(x-alpha)+beta*1.0}

instance convCanonicalReduced :: Convertible Canonical Reduced where
  convert can = 
    let f = convert can :: Function
     in convert f

instance convReducedFunction :: Convertible Reduced Function where
  convert (Reduced {a, b, c}) = 
    Function {domain: const true, expression: \x -> a*x*x+b*x+c*1.0} {-WTF : javascript!-}

instance convFunctionReduced :: Convertible Function Reduced where
  convert (Function {domain, expression}) = 
    let fm = expression (-1.0)
        f0 = expression 0.0
        fp = expression 1.0
    in Reduced { a: (fm - 2.0 * f0 + fp) / 2.0
       , b: (fp - fm) / 2.0
       , c: f0}

instance convFunctionCanonical :: Convertible Function Canonical where
  convert f = 
    let r = convert f :: Reduced
     in convert r

instance convFunctionTriplet :: Convertible Function Triplet where
  convert (Function {domain, expression}) = Triplet 
    { c0: {x: -1.0, y: expression (-1.0)}
    , c1: {x:  0.0, y: expression 0.0}
    , c2: {x:  1.0, y: expression 1.0}}

instance convTripletFunction :: Convertible Triplet Function where
  convert t = 
    let r = convert t :: Reduced
     in convert r

instance convTripletReduced :: Convertible Triplet Reduced where
  convert (Triplet {c0, c1, c2}) =
    let den =  c0.x*c0.x*(c1.x-c2.x)
             + c1.x*c1.x*(c2.x-c0.x)
             + c2.x*c2.x*(c0.x-c1.x)
        in Reduced { a: (c0.x - c1.x) * c2.y / den
                   , b: (c1.x*c1.x-c0.x*c0.x)*c2.y / den
                   , c: c0.x*c1.x*(c0.x-c1.x) * c2.y / den}

instance convReducedTriple :: Convertible Reduced Triplet where
  convert r =
    let f = convert r :: Function
     in convert f

instance convTripletCanonical :: Convertible Triplet Canonical where
  convert t =
    let r = convert t :: Reduced
     in convert r

instance convCanonicalTriplet :: Convertible Canonical Triplet where
  convert c =
    let f = convert c :: Function 
     in convert f

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

plot :: (Final -> Drawing) -> Box -> Box -> Function -> Drawing
plot draw from to (Function {domain, expression}) = 
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
              then mempty 
              else foldr (\s acc -> acc <> (draw $ FS from to s) ) mempty $ 
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

instance drawableFinal :: DrawableSet Final where
  drawIn ctx (FP from to p) = drawIn ctx $ remap from p to
  drawIn ctx (FL from to l) = 
    let p = aPointOnLine l
        q = p <+| aVectorOfLine l
      in drawIn ctx $ line (remap from p to) (remap from q to)
  drawIn ctx (FC from to (Circle {center, radius})) =
    let p = remap from center to
        q = remap from (point "" (abs center + radius) (ord center)) to
      in drawIn ctx $ circle p (Geo.length $ vector p q)  
  drawIn ctx (FH from to (HalfLine {origin, direction})) = 
    let p = remap from origin to
        q = remap from (origin <+| direction) to
     in drawIn ctx $ HalfLine {origin: p, direction: vector p q}
  drawIn ctx (FS from to (Segment {origin, extremity,asOriented})) = 
    drawIn ctx $ Segment { origin: remap from origin to
                         , extremity: remap from extremity to
                         , asOriented}
  drawIn ctx (FA arr) = drawIn ctx arr

type State = { parabola :: Function
             , fromF :: Box
             , toF :: Box
             , previousX :: Number
             , previousY :: Number}

grid :: Box -> Box -> Drawing
grid from to = 
  let topX = abs from.center + from.halfWidth
      botX = abs from.center - from.halfWidth
      topY = ord from.center + from.halfHeight
      botY = ord from.center - from.halfHeight
      seg x y x' y' = FS from to $ 
                        segment (point "" x y) (point "" x' y') Nothing
      segAtX x = seg x botY x topY
      segAtY y = seg botX y topX y
      ctx lW = {color: rgb 50 50 50, lineWidth: lW}
   in  ( foldr (<>) mempty $ 
         (\ n -> drawIn (ctx 0.5) $
           segAtX $ toNumber n) <$> ceil botX .. floor topX)
           <>
      ( foldr (<>) mempty $ 
         (\ n -> drawIn (ctx 0.5) $
           segAtY $ toNumber n) <$> ceil botY .. floor topY)
                 <> (drawIn (ctx 1.5) $ segAtX 0.0)
                 <> (if botY <= 0.0 && 0.0 <= topY 
                       then drawIn (ctx 1.5) $ segAtY 0.0
                       else mempty)

initialState :: State
initialState = 
  { parabola: Function {domain: const true, expression: \x -> x*x}
  , fromF:  local
  , toF: window
  , previousX: 0.0
  , previousY: 0.0}

digit3 :: Number -> Number
digit3 a = (_ / 1000.0) $ toNumber $ round $ a * 1000.0

reframe :: (Final -> Drawing) -> State -> Drawing
reframe draw { parabola
             , fromF, toF
             , previousX, previousY} =
  grid fromF toF 
    <> plot draw fromF toF parabola
    <> (let Reduced {a,b,c} = convert parabola
            delta = b*b-4.0*a*c
         in if delta >= 0.0
              then (let p1 = point "" ((-b+sqrt delta)/2.0/a) 0.0
                    in if inBox fromF p1
                         then draw $ FP fromF toF p1
                         else mempty)
                    <>(let p2 = point "" ((-b-sqrt delta)/2.0/a) 0.0
                        in if inBox fromF p2
                             then draw $ FP fromF toF p2
                             else mempty)
              else mempty)

ePage :: Array ButtonEvent -> (Final -> Drawing) 
        -> Effect (Behavior Drawing) 
ePage events draw = liftA1 (reframe draw) <$> 
  (\ event -> 
    unfold (\{value, pos: {x,y}} st -> 
      case value of
        "ABCa" -> st{ parabola = (let Reduced {a,b,c} = convert st.parabola
                                   in convert $ Reduced {a: x,b,c})}
        "ABCb" -> st{ parabola = (let Reduced {a,b,c} = convert st.parabola
                                   in convert $ Reduced {a,b: x,c})}
        "ABCc" -> st{ parabola = (let Reduced {a,b,c} = convert st.parabola
                                   in convert $ Reduced {a,b,c: x})}
        "zoomOutX" -> st{ fromF{halfWidth = st.fromF.halfWidth*1.1}}
        "zoomInX" -> st{ fromF{halfWidth = st.fromF.halfWidth/1.1 }}
        "zoomOutY" -> st{ fromF{halfHeight = st.fromF.halfHeight*1.1}}
        "zoomInY" -> st{ fromF{halfHeight = st.fromF.halfHeight/1.1}}
        "buttonup" -> st{previousX = x, previousY = y}
        "buttondown" ->
          let previous = point "" st.previousX st.previousY
              fromF = st.fromF
              toF = st.toF
           in if inBox st.toF previous
               then let p = remap toF previous fromF
                        q = remap toF (point "" x y) fromF
                        q0 = remap toF (point "" x st.previousY) fromF
                     in st{ fromF{center = fromF.center <+| vector q p}
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

cbInput :: String -> ButtonEvent -> DOM.Document -> DOM.Event -> Effect Unit
cbInput msg {event, push} doc ev = do
  val <- DOM.inputedValueFromEvent ev
  reduced <- DOM.getElementById "reduced" doc 
  canonical <- DOM.getElementById "canonical" doc 
  factorized <- DOM.getElementById "factorized" doc 
  push {value: msg, pos: {x: fromString val, y: 0.0}}
  _ <- case stripPrefix (Pattern "ABC") msg of
         Just _ -> do 
            inA <- DOM.getElementById "ABCa" doc
            inB <- DOM.getElementById "ABCb" doc
            inC <- DOM.getElementById "ABCc" doc
            a <- DOM.inputedValue inA
            b <- DOM.inputedValue inB
            c <- DOM.inputedValue inC
            _ <- DOM.setTextContent 
                   ("f(x) = " <> a <> "x^2 + (" 
                              <> b <> ")x + (" 
                              <> c <> ")") reduced
            let can@(Canonical {a,alpha,beta}) = convert $ 
                                           Reduced { a: fromString a
                                                   , b: fromString b
                                                   , c: fromString c}
            _ <- DOM.setTextContent
                  ("f(x) = " <> show a 
                             <> "(x - (" <> show alpha 
                             <> "))^2 + (" <> show beta <> ")") canonical
            _ <- case (convert can :: Maybe Factorized) of
                   Just (Factorized {a,x1,x2}) -> DOM.setTextContent
                                     ("f(x) = " <> show a <> "(x - (" <> show x1
                                                     <> ")) (x - (" <> show x2
                                                     <> "))") factorized
                   _ -> DOM.setTextContent "" factorized
            pure unit
         Nothing -> pure unit
  pure unit

inputABC :: ButtonEvent -> DOM.Node -> DOM.Document -> Effect Unit
inputABC bevent div doc = do 
  inA <- DOM.createElement "input" doc
  _ <- DOM.setId "ABCa" inA
  _ <- DOM.setAttribute "value" "1.0" inA
  _ <- DOM.addEventListener (cbInput "ABCa" bevent doc) DOM.change inA 
  _ <- DOM.appendChild inA div
  inB <- DOM.createElement "input" doc
  _ <- DOM.setId "ABCb" inB
  _ <- DOM.setAttribute "value" "0.0" inB
  _ <- DOM.addEventListener (cbInput "ABCb" bevent doc) DOM.change inB 
  _ <- DOM.appendChild inB div
  inC <- DOM.createElement "input" doc
  _ <- DOM.setId "ABCc" inC
  _ <- DOM.setAttribute "value" "0.0" inC
  _ <- DOM.addEventListener (cbInput "ABCc" bevent doc) DOM.change inC
  _ <- DOM.appendChild inC div
  pure unit

inputCanonical :: ButtonEvent -> DOM.Node -> DOM.Document -> Effect Unit
inputCanonical {event, push} div doc = do 
  inA <- DOM.createElement "input" doc
  _ <- DOM.setId "CANa" inA
  _ <- DOM.appendChild inA div
  inAlpha <- DOM.createElement "input" doc
  _ <- DOM.setId "CANalpha" inAlpha
  _ <- DOM.appendChild inAlpha div
  inBeta <- DOM.createElement "input" doc
  _ <- DOM.setId "CANbeta" inBeta
  _ <- DOM.appendChild inBeta div
  pure unit

input3Points :: ButtonEvent -> DOM.Node -> DOM.Document -> Effect Unit
input3Points {event, push} div doc = do 
  x0 <- DOM.createElement "input" doc
  _ <- DOM.appendChild x0 div
  y0 <- DOM.createElement "input" doc
  _ <- DOM.appendChild y0 div
  x1 <- DOM.createElement "input" doc
  _ <- DOM.appendChild x1 div
  y1 <- DOM.createElement "input" doc
  _ <- DOM.appendChild y1 div
  x2 <- DOM.createElement "input" doc
  _ <- DOM.appendChild x2 div
  y2 <- DOM.createElement "input" doc
  _ <- DOM.appendChild y2 div
  pure unit

cbOption :: DOM.Document -> DOM.Event -> Effect Unit
cbOption doc = unsafePartial \ ev -> do
  mntr <- DOM.getElementById "monitor" doc
  memo <- DOM.getElementById "memo" doc
  label <- DOM.textContent memo
  current <- DOM.getElementById label doc
  msg <- DOM.selectedValueFromEvent ev
  new <- case msg of
        "fromABC" -> do
           _ <- DOM.setTextContent "ABC" memo
           DOM.getElementById "ABC" doc
        "fromCanonical" -> do
           _ <- DOM.setTextContent "Canonical" memo
           DOM.getElementById "Canonical" doc
        "from3Points" -> do
          _ <- DOM.setTextContent "3Points" memo
          DOM.getElementById "3Points" doc 
  _ <- DOM.setAttribute "style" "display: none;" current
  _ <- DOM.setAttribute "style" "display: inline;" new
  pure unit

mkButtonEvent :: DOM.Node -> String -> DOM.Document -> Effect ButtonEvent
mkButtonEvent node msg doc = do
  b <- DOM.createElement "button" doc
  _ <- DOM.setTextContent msg b
  _ <- DOM.appendChild b node
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

main :: Effect Unit
main = do
  setup <- DOM.setup
  canvas <- DOM.getElementById "canvas" setup.document
  context2D <- DOM.getContext2D canvas
  _ <- DOM.setAttribute "width" (show width) canvas
  _ <- DOM.setAttribute "height" (show height) canvas
  
  let ctx = { color: rgb 5 4 9
            , lineWidth: 1.50}

  let background = filled white (rectangle 0.0 0.0 width height)
  let functionBkg = filled beige (curryBox rectangle window)

  mntr <- DOM.createElement "div" setup.document
  _ <- DOM.setId "monitor" mntr
  zox <- mkButtonEvent mntr "zoomOutX" setup.document
  zix <- mkButtonEvent mntr "zoomInX" setup.document
  zofy <- mkButtonEvent mntr "zoomOutY" setup.document
  zify <- mkButtonEvent mntr "zoomInY" setup.document

  ev <- create
  
  divABC <- DOM.createElement "div" setup.document
  _ <- inputABC ev divABC setup.document
  _ <- DOM.setId "ABC" divABC
  _ <- DOM.setAttribute "style" "display: inline;" divABC

  div3Points <- DOM.createElement "div" setup.document
  _ <- input3Points ev div3Points setup.document
  _ <- DOM.setId "3Points" div3Points
  _ <- DOM.setAttribute "style" "display: none;" div3Points

  divCanonical <- DOM.createElement "div" setup.document
  _ <- inputCanonical ev divCanonical setup.document
  _ <- DOM.setId "Canonical" divCanonical
  _ <- DOM.setAttribute "style" "display: none;" divCanonical

  list <- DOM.createElement "select" setup.document
  _ <- mkOptionEvent setup list "fromABC"
  _ <- mkOptionEvent setup list "fromCanonical"
  _ <- mkOptionEvent setup list "from3Points"
  _ <- DOM.addEventListener (cbOption setup.document) DOM.change list
  _ <- DOM.appendChild list mntr

  br <- DOM.createElement "br" setup.document
  _ <- DOM.appendChild br mntr
  
  _ <- DOM.appendChild divABC mntr
  _ <- DOM.appendChild div3Points mntr
  _ <- DOM.appendChild divCanonical mntr

  br <- DOM.createElement "br" setup.document
  _ <- DOM.appendChild br mntr
  
  reduced <- DOM.createElement "label" setup.document
  _ <- DOM.setId "reduced" reduced
  _ <- DOM.appendChild reduced mntr

  br <- DOM.createElement "br" setup.document
  _ <- DOM.appendChild br mntr
  
  canonical <- DOM.createElement "label" setup.document
  _ <- DOM.setId "canonical" canonical
  _ <- DOM.appendChild canonical mntr

  br <- DOM.createElement "br" setup.document
  _ <- DOM.appendChild br mntr
  
  factorized <- DOM.createElement "label" setup.document
  _ <- DOM.setId "factorized" factorized
  _ <- DOM.appendChild factorized mntr

  br <- DOM.createElement "br" setup.document
  _ <- DOM.appendChild br mntr
  
  memo <- DOM.createElement "label" setup.document
  _ <- DOM.setId "memo" memo
  _ <- DOM.setTextContent "ABC" memo
  --_ <- DOM.appendChild memo mntr

  _ <- DOM.appendChild mntr setup.body
  _ <- DOM.setAttribute "style" 
       "display: grid; grid-template-columns: repeat(2, 1fr);" 
       setup.body

  page <- ePage [zox,zix,zofy,zify,ev] $ 
           (drawIn ctx :: forall a. DrawableSet a => a -> Drawing)
  _ <- animate (
         pure background 
           <> pure functionBkg 
           <> page 
           <> pure (drawIn ctx $ frame window)
          ) (render context2D)
  pure unit

