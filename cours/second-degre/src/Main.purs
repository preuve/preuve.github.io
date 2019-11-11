module Main where

import Prelude
import Effect (Effect)
import Data.Maybe(Maybe(..), maybe, fromJust)
import Data.Array( filter, length, (..), uncons, dropWhile
                 , head, tail)
import Data.Foldable (foldr,foldM)
import Control.Alt(alt)
import SVG.Geometry (
  Circle(..), HalfLine(..), Line, Point, Segment(..)
  , aPointOnLine, aVectorOfLine, abs, circle
  , line, meets, ord, point, scale, segment, vector, (<+|))
import SVG.Render(class Render, defaultContext, render', Context, svgclear, svgpath)
import SVG.Geometry(length) as SVG
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
import Data.String(stripPrefix, drop, Pattern(..))

foreign import fromString :: String -> Number

width = 600.0 :: Number
height = 600.0 :: Number
density = 200 :: Int

type Color = String

white = "#FFFFFF" :: Color
beige = "#FFFFAF" :: Color
blue = "#0602C6" :: Color
purple = "#B30ECB" :: Color

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

instance convCanonicalFactorized :: 
  Convertible Canonical (Maybe Factorized) where
  convert can@(Canonical {a, alpha, beta}) = 
    let Reduced {a,b,c} = convert can
        delta = b*b - 4.0 * a * c
     in if delta < 0.0 
          then Nothing
          else Just $ Factorized {a
                                 , x1: (-b+sqrt delta)/2.0/a
                                 , x2: (-b-sqrt delta)/2.0/a}

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
    Function {domain: const true
             , expression: \x -> a*x*x+b*x+c*1.0} {-WTF : javascript!-}

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
        in Reduced { a: (  (c1.x - c2.x) * c0.y 
                         + (c2.x - c0.x) * c1.y
                         + (c0.x - c1.x) * c2.y) / den
                   , b: (  (c2.x*c2.x - c1.x*c1.x) * c0.y
                         + (c0.x*c0.x - c2.x*c2.x) * c1.y
                         + (c1.x*c1.x - c0.x*c0.x) * c2.y) / den
                   , c: (  c1.x * c2.x * (c1.x - c2.x) * c0.y
                        +  c0.x * c2.x * (c2.x - c0.x) * c1.y
                        +  c0.x * c1.x * (c0.x - c1.x) * c2.y) / den}

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

plot :: Context -> Box -> Box -> Function -> Effect Unit
plot ctx from to (Function {domain, expression}) = 
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

instance renderFinal :: Render Final where
  render' ctx (FP from to p) = render' ctx $ remap from p to
  render' ctx (FL from to l) = 
    let p = aPointOnLine l
        q = p <+| aVectorOfLine l
      in render' ctx $ line (remap from p to) (remap from q to)
  render' ctx (FC from to (Circle {center, radius})) =
    let p = remap from center to
        q = remap from (point "" (abs center + radius) (ord center)) to
      in render' ctx $ circle p (SVG.length $ vector p q)  
  render' ctx (FH from to (HalfLine {origin, direction})) = 
    let p = remap from origin to
        q = remap from (origin <+| direction) to
     in render' ctx $ HalfLine {origin: p, direction: vector p q}
  render' ctx (FS from to (Segment {origin, extremity,asOriented})) = 
    render' ctx $ Segment { origin: remap from origin to
                         , extremity: remap from extremity to
                         , asOriented}
  render' ctx (FA arr) = render' ctx arr

type State = { parabola :: Triplet 
             , fromF :: Box
             , toF :: Box
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

initialState :: State
initialState = 
  { parabola: convert $ Function {domain: const true, expression: \x -> x*x}
  , fromF:  local
  , toF: window
  , previousX: 0.0
  , previousY: 0.0}

digit3 :: Number -> Number
digit3 a = (_ / 1000.0) $ toNumber $ round $ a * 1000.0

reframe :: Context -> State -> Effect Unit
reframe ctx { parabola
            , fromF, toF
           , previousX, previousY} = do
  grid ctx fromF toF 
  plot ctx fromF toF (convert parabola)
  let Reduced {a,b,c} = convert parabola
  pure unit
  let delta = b*b-4.0*a*c
  if delta >= 0.0
    then do let p1 = point "" ((-b+sqrt delta)/2.0/a) 0.0
            if inBox fromF p1
                 then render' ctx $ FP fromF toF p1
                 else pure unit
            let p2 = point "" ((-b-sqrt delta)/2.0/a) 0.0
            if inBox fromF p2
                 then render' ctx $ FP fromF toF p2
                 else pure unit
    else pure unit 

ePage :: Array ButtonEvent -> Context 
        -> Effect (Behavior (Effect Unit)) 
ePage events ctx = liftA1 (reframe ctx) <$> 
  (\ event -> 
    unfold (\{value, pos: {x,y}} st -> 
      case value of
        "ABCa" -> st{ parabola = (let Reduced {a,b,c} = convert st.parabola
                                   in convert $ Reduced {a: x,b,c})}
        "ABCb" -> st{ parabola = (let Reduced {a,b,c} = convert st.parabola
                                   in convert $ Reduced {a,b: x,c})}
        "ABCc" -> st{ parabola = (let Reduced {a,b,c} = convert st.parabola
                                   in convert $ Reduced {a,b,c: x})}
        "CANa" -> st{ parabola = (
                    let Canonical {a,alpha,beta} = convert st.parabola
                    in convert $ Canonical {a: x,alpha,beta})}
        "CANα" -> st{ parabola = (
                    let Canonical {a,alpha,beta} = convert st.parabola
                     in convert $ Canonical {a,alpha: x,beta})}
        "CANβ" -> st{ parabola = (
                    let Canonical {a,alpha,beta} = convert st.parabola
                     in convert $ Canonical {a,alpha,beta: x})}
        "PTSx0" -> st{ parabola = (
                     let Triplet t = st.parabola
                      in Triplet t{c0{x=x}})}
        "PTSy0" -> st{ parabola = (
                     let Triplet t = st.parabola
                      in Triplet t{c0{y=x}})}
        "PTSx1" -> st{ parabola = (
                     let Triplet t = st.parabola
                      in Triplet t{c1{x=x}})}
        "PTSy1" -> st{ parabola = (
                     let Triplet t = st.parabola
                      in Triplet t{c1{y=x}})}
        "PTSx2" -> st{ parabola = (
                     let Triplet t = st.parabola
                      in Triplet t{c2{x=x}})}
        "PTSy2" -> st{ parabola = (
                     let Triplet t = st.parabola
                      in Triplet t{c2{y=x}})}
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

cbButton :: forall a. String -> ButtonEvent -> a -> Effect Unit
cbButton msg {event, push} ev = do
  push {value: msg, pos: {x: 0.0, y: 0.0}}

mkButtonEvent :: DOM.Node -> String -> DOM.Document -> Effect ButtonEvent
mkButtonEvent node msg doc = do
  b <- DOM.createElement "button" doc
  _ <- DOM.setTextContent msg b
  _ <- DOM.appendChild b node
  ev <- create
  _ <- DOM.addEventListener (cbButton msg ev) DOM.click b 
  pure ev

cbInput :: String -> ButtonEvent -> DOM.Document -> DOM.Event -> Effect Unit
cbInput msg {event, push} doc ev = do
  val <- DOM.inputedValueFromEvent ev
  reduced <- DOM.getElementById "reduced" doc 
  canonical <- DOM.getElementById "canonical" doc 
  factorized <- DOM.getElementById "factorized" doc 
  push {value: msg, pos: {x: fromString val, y: 0.0}}
  inA <- DOM.getElementById "ABCa" doc
  inB <- DOM.getElementById "ABCb" doc
  inC <- DOM.getElementById "ABCc" doc
  incA <- DOM.getElementById "CANa" doc
  inAlpha <- DOM.getElementById "CANα" doc
  inBeta <- DOM.getElementById "CANβ" doc
  inX0 <- DOM.getElementById "PTSx0" doc
  inY0 <- DOM.getElementById "PTSy0" doc
  inX1 <- DOM.getElementById "PTSx1" doc
  inY1 <- DOM.getElementById "PTSy1" doc
  inX2 <- DOM.getElementById "PTSx2" doc
  inY2 <- DOM.getElementById "PTSy2" doc
  
  _ <- case stripPrefix (Pattern "ABC") msg of
         Just _ -> do 
            vala <- DOM.inputValue inA
            valb <- DOM.inputValue inB
            valc <- DOM.inputValue inC
            let red = Reduced { a: fromString vala
                              , b: fromString valb
                              , c: fromString valc}
            let can@(Canonical {a, alpha, beta}) = convert red
            _ <- DOM.setInputValue (show a) incA
            _ <- DOM.setInputValue (show alpha) inAlpha
            _ <- DOM.setInputValue (show beta) inBeta
            let pts@(Triplet{ c0, c1, c2}) = convert red
            _ <- DOM.setInputValue (show $ c0.x) inX0
            _ <- DOM.setInputValue (show $ c0.y) inY0
            _ <- DOM.setInputValue (show $ c1.x) inX1
            _ <- DOM.setInputValue (show $ c1.y) inY1
            _ <- DOM.setInputValue (show $ c2.x) inX2
            _ <- DOM.setInputValue (show $ c2.y) inY2
            let mFact = convert can :: Maybe Factorized
            expressions red reduced can canonical mFact factorized
         _ -> pure unit

  _ <- case stripPrefix (Pattern "CAN") msg of
         Just _ -> do
            coefa <- DOM.inputValue incA
            coefalpha <- DOM.inputValue inAlpha
            coefbeta <- DOM.inputValue inBeta
            let can = Canonical { a: fromString coefa
                                , alpha: fromString coefalpha
                                , beta: fromString coefbeta}
            let red@(Reduced {a,b,c}) = convert can
            _ <- DOM.setInputValue (show a) inA
            _ <- DOM.setInputValue (show b) inB
            _ <- DOM.setInputValue (show c) inC
            let pts@(Triplet{ c0, c1, c2}) = convert red
            _ <- DOM.setInputValue (show $ c0.x) inX0
            _ <- DOM.setInputValue (show $ c0.y) inY0
            _ <- DOM.setInputValue (show $ c1.x) inX1
            _ <- DOM.setInputValue (show $ c1.y) inY1
            _ <- DOM.setInputValue (show $ c2.x) inX2
            _ <- DOM.setInputValue (show $ c2.y) inY2
            let mFact = convert can :: Maybe Factorized
            expressions red reduced can canonical mFact factorized
         _ -> pure unit

  _ <- case stripPrefix (Pattern "PTS") msg of
         Just _ -> do
            x0 <- DOM.inputValue inX0
            y0 <- DOM.inputValue inY0
            x1 <- DOM.inputValue inX1
            y1 <- DOM.inputValue inY1
            x2 <- DOM.inputValue inX2
            y2 <- DOM.inputValue inY2
            let tri = Triplet { c0: {x: fromString x0, y: fromString y0}
                              , c1: {x: fromString x1, y: fromString y1}
                              , c2: {x: fromString x2, y: fromString y2}}
            let red@(Reduced {a,b,c}) = convert tri
            _ <- DOM.setInputValue (show a) inA
            _ <- DOM.setInputValue (show b) inB
            _ <- DOM.setInputValue (show c) inC
            let can@(Canonical {a, alpha, beta}) = convert red
            _ <- DOM.setInputValue (show a) incA
            _ <- DOM.setInputValue (show alpha) inAlpha
            _ <- DOM.setInputValue (show beta) inBeta
            let mFact = convert can :: Maybe Factorized
            expressions red reduced can canonical mFact factorized
         _ -> pure unit

  pure unit

expressions :: Reduced -> DOM.Node
        -> Canonical -> DOM.Node
        -> Maybe Factorized -> DOM.Node -> Effect Unit
expressions (Reduced {a,b,c}) reduced 
        (Canonical {a: ca,alpha,beta}) canonical
        mFact factorized = do
  _ <- DOM.setTextContent 
         ("f(x) = " <> show a <> "x^2 + (" 
                    <> show b <> ")x + (" 
                    <> show c <> ")") reduced
  _ <- DOM.setTextContent
         ("f(x) = " <> show ca 
                    <> "(x - (" <> show alpha 
                    <> "))^2 + (" <> show beta <> ")") canonical
  _ <- case mFact of
          Just (Factorized {a: fa,x1,x2}) -> 
            DOM.setTextContent
              ("f(x) = " <> show fa <> "(x - (" <> show x1
                         <> ")) (x - (" <> show x2
                         <> "))") factorized
          _ -> DOM.setTextContent "" factorized
  pure unit

input :: String -> String -> ButtonEvent 
      -> DOM.Node -> DOM.Document -> Effect Unit
input id ini bev div doc = do
  label <- DOM.createElement "label" doc
  let str = drop 3 id
  _ <- DOM.setTextContent (str <> ": ") label
  _ <- DOM.appendChild label div
  node <- DOM.createElement "input" doc
  _ <- DOM.setId id node
  _ <- DOM.setInputValue ini node
  _ <- DOM.addEventListener (cbInput id bev doc) DOM.change node
  _ <- DOM.appendChild node div
  br <- DOM.createElement "br" doc
  _ <- DOM.appendChild br div
  pure unit

inputABC :: ButtonEvent -> DOM.Node -> DOM.Document -> Effect Unit
inputABC bevent div doc = do 
  _ <- input "ABCa" "1.0" bevent div doc
  _ <- input "ABCb" "0.0" bevent div doc
  _ <- input "ABCc" "0.0" bevent div doc
  pure unit

inputCanonical :: ButtonEvent -> DOM.Node -> DOM.Document -> Effect Unit
inputCanonical bevent div doc = do
  _ <- input "CANa" "1.0" bevent div doc
  _ <- input "CANα" "0.0" bevent div doc
  _ <- input "CANβ" "0.0" bevent div doc
  pure unit

inputThreePoints :: ButtonEvent -> DOM.Node -> DOM.Document -> Effect Unit
inputThreePoints bevent div doc = do
  _ <- input "PTSx0" "-1.0" bevent div doc
  _ <- input "PTSy0" "1.0" bevent div doc
  _ <- input "PTSx1" "0.0" bevent div doc
  _ <- input "PTSy1" "0.0" bevent div doc
  _ <- input "PTSx2" "1.0" bevent div doc
  _ <- input "PTSy2" "1.0" bevent div doc
  pure unit

cbOption :: DOM.Document -> DOM.Event -> Effect Unit
cbOption doc = unsafePartial \ ev -> do
  memo <- DOM.getElementById "memo" doc
  label <- DOM.textContent memo
  currentNode <- DOM.getElementById label doc
  msg <- DOM.selectedValueFromEvent ev
  newNode <- case msg of
        "fromABC" -> do
           _ <- DOM.setTextContent "Reduced" memo
           DOM.getElementById "Reduced" doc
        "fromCanonical" -> do
           _ <- DOM.setTextContent "Canonical" memo
           DOM.getElementById "Canonical" doc
        "fromThreePoints" -> do
          _ <- DOM.setTextContent "ThreePoints" memo
          DOM.getElementById "ThreePoints" doc 
  _ <- DOM.setAttribute "style" "display: none;" currentNode
  _ <- DOM.setAttribute "style" "display: inline;" newNode
  pure unit

mkOption :: forall r. {body :: DOM.Node, document :: DOM.Document | r}
  -> DOM.Node
  -> String
  -> Effect Unit
mkOption setup select msg = do
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
   
  svg <- DOM.newSVG "position: absolute; width:50%; height:100%;" setup.body
  
  let ctx = (defaultContext svg) { stroke = "#050409"}

  let background = rectangle ctx{fill = white} 0.0 0.0 width height
  let functionBkg = curryBox (rectangle ctx{fill = beige}) window

  mntr <- DOM.createElement "div" setup.document
  zox <- mkButtonEvent mntr "zoomOutX" setup.document
  zix <- mkButtonEvent mntr "zoomInX" setup.document
  zofy <- mkButtonEvent mntr "zoomOutY" setup.document
  zify <- mkButtonEvent mntr "zoomInY" setup.document

  ev <- create
  
  divABC <- DOM.createElement "div" setup.document
  _ <- inputABC ev divABC setup.document
  _ <- DOM.setId "Reduced" divABC
  _ <- DOM.setAttribute "style" "display: inline;" divABC

  divThreePoints <- DOM.createElement "div" setup.document
  _ <- inputThreePoints ev divThreePoints setup.document
  _ <- DOM.setId "ThreePoints" divThreePoints
  _ <- DOM.setAttribute "style" "display: none;" divThreePoints

  divCanonical <- DOM.createElement "div" setup.document
  _ <- inputCanonical ev divCanonical setup.document
  _ <- DOM.setId "Canonical" divCanonical
  _ <- DOM.setAttribute "style" "display: none;" divCanonical

  list <- DOM.createElement "select" setup.document
  _ <- mkOption setup list "fromABC"
  _ <- mkOption setup list "fromCanonical"
  _ <- mkOption setup list "fromThreePoints"
  _ <- DOM.addEventListener (cbOption setup.document) DOM.change list
  _ <- DOM.appendChild list mntr

  _ <- DOM.createElement "br" setup.document >>= flip DOM.appendChild mntr 
  
  _ <- DOM.appendChild divABC mntr
  _ <- DOM.appendChild divThreePoints mntr
  _ <- DOM.appendChild divCanonical mntr

  _ <- DOM.createElement "br" setup.document >>= flip DOM.appendChild mntr 
  
  reduced <- DOM.createElement "label" setup.document
  _ <- DOM.setId "reduced" reduced
  _ <- DOM.appendChild reduced mntr

  _ <- DOM.createElement "br" setup.document >>= flip DOM.appendChild mntr 
  
  canonical <- DOM.createElement "label" setup.document
  _ <- DOM.setId "canonical" canonical
  _ <- DOM.appendChild canonical mntr

  _ <- DOM.createElement "br" setup.document >>= flip DOM.appendChild mntr 
  
  factorized <- DOM.createElement "label" setup.document
  _ <- DOM.setId "factorized" factorized
  _ <- DOM.appendChild factorized mntr

  _ <- DOM.createElement "br" setup.document >>= flip DOM.appendChild mntr 
  
  memo <- DOM.createElement "label" setup.document
  _ <- DOM.setId "memo" memo
  _ <- DOM.setAttribute "style" "display: none;" memo
  _ <- DOM.setTextContent "Reduced" memo
  _ <- DOM.appendChild memo mntr

  _ <- DOM.appendChild mntr setup.body
  _ <- DOM.setAttribute "style" 
       "display: grid; grid-template-columns: repeat(2, 1fr);" 
       setup.body

  page <- ePage [zox,zix,zofy,zify,ev] ctx
  _ <- animate (
            pure (svgclear svg)
         <> pure background 
         <> pure functionBkg 
         <> page 
         <> pure (render' ctx $ frame window)
          ) identity
  pure unit

