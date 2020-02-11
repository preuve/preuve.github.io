module Main where

import Prelude

import Data.Array (filter, length, (..), uncons, dropWhile, head, tail, any, take, drop)
import Data.Const (Const)
import Data.Either (Either(..))
import Data.Foldable (foldr)
import Data.Int (toNumber, floor, ceil, round)
import Data.Map (empty, insert)
import Data.Maybe (Maybe(..), fromJust)
import Data.String (Pattern(..), split)
import Data.String (length, take, drop) as String
import Effect (Effect)
import Global (readFloat)
import Parser.Eval (eval)
import Parser.Parser (parse)
import Parser.Syntax (Dual(..), Cmd(..), Expr(..))
import Partial.Unsafe (unsafePartial)
import SVGpork.Geometry (Circle(..), HalfLine(..), Line(..), Point, Segment(..), aPointOnLine, aVectorOfLine, abs, circle, line, meets, ord, point, segment, scale, vector, (<+|))
import SVGpork.Geometry (length) as Geo
import SVGpork.Render (class Render, render', defaultContext, Context, svgpath, svgtext)
import SporKaTeX (RenderEffect(..), runRenderEffect) as KaTeX
import Spork.App as App
import Spork.Html (Html)
import Spork.Html as H
import Spork.Interpreter (liftNat, merge, never)
import Web.UIEvent.MouseEvent (MouseEvent, pageX, pageY)

svgWidth = 800.0 :: Number
svgHeight = 600.0 :: Number
density = 100 :: Int

type Color = String

white = "#FFFFFF" :: Color
beige = "#FFFFAF" :: Color
blue = "#0602c6" :: Color
purple = "#B314CB" :: Color

tanStyle = _{stroke = purple, strokeWidth = 1.5} :: Context -> Context

type Box = {center :: Point, halfWidth :: Number, halfHeight :: Number}

type Model =
  { texSlot :: Maybe H.ElementRef
  , command :: String
  , argument :: Number
  , isDragged :: Boolean
  , domain :: Array Intrvl
  , message :: String
  , fromF :: Box
  , toF :: Box
  , fromD :: Box
  , toD :: Box
  , displayD :: Boolean
  , displayT :: Boolean
  , numbers :: Array Number
  , previousX :: Number
  , previousY :: Number
  }

initialModel ∷ Model
initialModel =
  { command: ""
  , argument: 0.0
  , isDragged: false
  , domain: []
  , texSlot: Nothing
  , message: ""
  , fromF:  local
  , toF: functionDisplay
  , fromD: local
  , toD: diffDisplay
  , displayD: false
  , displayT: false
  , numbers: []
  , previousX: 0.0
  , previousY: 0.0
  }

transmit :: Model -> String
transmit model =
  case parse model.command of
    Right (Eval expr) -> show expr
    _ -> ""

liftExprDual :: Number -> Expr
liftExprDual x = Lit $ Dual {height: x, slope: 1.0}

execute :: String -> Number -> Expr
execute command x =
  case parse command of
    Right (Eval expr) ->
      case eval (insert "x" (liftExprDual x) empty) expr of
        Right exp -> exp
        _ -> Var "undefined"
    _ -> Var "undefined"

data Ext = R Number | PlusInf | MinusInf
data Intrvl = OpenOpen Ext Ext | OpenClose Ext Ext | CloseOpen Ext Ext | CloseClose Ext Ext

instance showExt :: Show Ext where
  show (R x) = show x
  show PlusInf = "+oo"
  show MinusInf = "-oo"

instance showIntrvl :: Show Intrvl where
  show (OpenOpen a b) = "]" <> show a <> ";" <> show b <> "["
  show (OpenClose a b) = "]" <> show a <> ";" <> show b <> "]"
  show (CloseOpen a b) = "[" <> show a <> ";" <> show b <> "["
  show (CloseClose a b) = "[" <> show a <> ";" <> show b <> "]"

inside :: Intrvl -> Number -> Boolean
inside (OpenOpen MinusInf PlusInf) _ = true
inside (OpenOpen MinusInf (R b)) x = x < b
inside (OpenOpen (R a) (R b)) x = a < x && x < b
inside (OpenOpen (R a) PlusInf) x = a < x
inside (OpenClose MinusInf (R b)) x = x <= b
inside (OpenClose (R a) (R b)) x = a < x && x <= b
inside (CloseOpen (R a) PlusInf) x = a <= x
inside (CloseOpen (R a) (R b)) x = a <= x && x < b
inside (CloseClose (R a) (R b)) x = a <= x && x <= b
inside _ _ = false

parseIntrvl :: String -> Intrvl
parseIntrvl str =
  let n = String.length str
      c0 = String.take 1 str
      cn = String.drop (n - 1) str
      s = String.drop 1 $ String.take (n - 1) str
      parseExtremities xs = case xs of
        "+oo" -> PlusInf
        "-oo" -> MinusInf
        _ -> R (readFloat xs)
      x01 = parseExtremities <$> split (Pattern ";") s
      x0 = unsafePartial $ fromJust $ head x01
      x1 = unsafePartial $ fromJust $ head $ fromJust $ tail x01
  in case c0, cn of
    "]", "[" -> OpenOpen x0 x1
    "]", "]" -> OpenClose x0 x1
    "[", "[" -> CloseOpen x0 x1
    "[", "]" -> CloseClose x0 x1
    _, _ -> OpenOpen MinusInf PlusInf

inDomain :: Array Intrvl -> Number -> Boolean
inDomain domain x =
   any (\intrvl -> inside intrvl x) domain

unused = 0.0 :: Number

image :: String -> Number -> Number
image command x =
  case execute command x of
    Lit (Dual {height: value, slope}) -> value
    _ -> unused

diff :: String -> Number -> Number
diff command x =
  case execute command x of
    Lit (Dual {height, slope: value}) -> value
    _ -> unused

type StringPos = {value :: String, pos :: {x :: Number, y :: Number}}

data Action
  = None
  | SaveRef (Maybe H.ElementRef)
  | UpdateArgument MouseEvent
  | RenderCommand String
  | UpdateDomain String
  | Send String
  | StartDragging MouseEvent
  | EndDragging

update ∷ Model → Action
       → App.Transition KaTeX.RenderEffect Model Action
update model = case _ of
  None →  App.purely model

  SaveRef (Just ref) -> App.purely model{texSlot = Just ref}
  SaveRef _ -> App.purely model

  StartDragging mouse -> App.purely model{ previousX = toNumber $ pageX mouse
                                         , previousY = toNumber $ pageY mouse
                                         , isDragged = true}

  EndDragging -> App.purely model{ isDragged = false}

  UpdateArgument mouse ->   App.purely $
    if model.isDragged
      then
        let x = toNumber $ pageX mouse
            y = toNumber $ pageY mouse
            previous = point "" model.previousX model.previousY
            fromF = model.fromF
            toF = model.toF
            fromD = model.fromD
            toD = model.toD
          in
            if inBox model.toF previous
              then
                 let p = remap toF previous fromF
                     q = remap toF (point "" x y) fromF
                     q0 = remap toF (point "" x model.previousY) fromF
                  in model{ fromF{center = fromF.center <+| vector q p}
                          , fromD{center = fromD.center <+| vector q0 p}
                          , previousX = x
                          , previousY = y
                          , argument = abs fromF.center}
              else
                 if inBox toD previous
                  then
                    let p = remap toD previous fromD
                        q = remap toD (point "" x y) fromD
                        q0 = remap toD (point "" x model.previousY) fromD
                      in model{ fromD{center = fromD.center <+| vector q p}
                              , fromF{center = fromF.center <+| vector q0 p}
                              , previousX = x
                              , previousY = y
                              , argument = abs fromD.center}
                  else model
              else model

  RenderCommand cmd ->
    let  m = model{command = cmd}
         effects =
          case model.texSlot of
            Just(H.Created el) → App.lift (KaTeX.RenderEffect (transmit m) el None)
            Just(H.Removed _)  → mempty
            Nothing -> mempty
    in
      { model: m, effects }

  UpdateDomain str ->  App.purely $
        case str of
          "R" -> model{domain = [OpenOpen MinusInf PlusInf]}
          _   -> model{domain = parseIntrvl <$> split (Pattern "U") str}

  Send str -> App.purely $
    case str of
      "zoomOutX" -> model{ fromF{halfWidth = model.fromF.halfWidth*1.1}
                         , fromD{halfWidth = model.fromD.halfWidth*1.1}}
      "zoomInX" -> model{ fromF{halfWidth = model.fromF.halfWidth/1.1}
                        , fromD{halfWidth = model.fromD.halfWidth/1.1}}
      "F: zoomOutY" -> model{ fromF{halfHeight = model.fromF.halfHeight*1.1}}
      "F: zoomInY" -> model{ fromF{halfHeight = model.fromF.halfHeight/1.1}}
      "F': zoomOutY" -> model{ fromD{halfHeight = model.fromD.halfHeight*1.1}}
      "F': zoomInY" -> model{ fromD{halfHeight = model.fromD.halfHeight/1.1}}
      "show Derivative" -> model{displayD = true}
      "hide Derivative" -> model{displayD = false}
      "show Tangent" -> model{displayT = true}
      "hide Tangent" -> model{displayT = false}
      "mark Coefficient" ->
          model{numbers = model.numbers <> [abs model.fromD.center]}
      _ -> model

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

mkButtonEvent :: String -> Html Action
mkButtonEvent msg =
  H.button [H.onClick (H.always_ $ Send msg)] [H.text msg]

remap :: Box -> Point -> Box -> Point
remap {center: c0, halfWidth: w0, halfHeight: h0}
      p
      {center: c1, halfWidth: w1, halfHeight: h1} =
        let v = vector c0 p
            x = abs v * w1 / w0
            y = ord v * h1 / h0
         in point "" (x + abs c1) (y + ord c1)

window = { center: point "" (svgWidth/2.0) (svgHeight/2.0)
         , halfWidth: svgWidth/2.0
         , halfHeight: svgHeight/2.0} :: Box

functionDisplay = { center: point "" (svgWidth/2.0) (svgHeight/4.1)
                  , halfWidth: svgWidth/2.0
                  , halfHeight: svgHeight/4.1} :: Box

diffDisplay = { center: point "" (svgWidth/2.0) (3.1*svgHeight/4.1)
                  , halfWidth: svgWidth/2.0
                  , halfHeight: svgHeight/4.1} :: Box

local = {center: point "" 0.0 0.0, halfWidth: 6.0, halfHeight: 5.0} :: Box


curryBox :: forall a. (Number -> Number -> Number -> Number -> a)
                      ->  Box -> a
curryBox f {center, halfWidth, halfHeight} =
  f (abs center - halfWidth) (ord center - halfHeight)
    (2.0 * halfWidth)        (2.0 * halfHeight)

rectangle :: forall action. Context -> Number -> Number -> Number -> Number -> Html action
rectangle ctx x y dx dy =
  let bl = point "" x (y+dy)
      br = point "" (x+dx) (y+dy)
      tr = point "" (x+dx) y
      tl = point "" x y
  in svgpath ctx.stroke ctx.strokeWidth ctx.fill $
        "M " <> (show $ abs bl) <> " " <> (show $ ord bl) <> " "
     <> "L " <> (show $ abs br) <> " " <> (show $ ord br) <> " "
     <> "L " <> (show $ abs tr) <> " " <> (show $ ord tr) <> " "
     <> "L " <> (show $ abs tl) <> " " <> (show $ ord tl) <> " "
     <> "z"

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

cursor :: Box -> Segment
cursor {center, halfWidth, halfHeight} =
  segment (point "" (abs center) (ord center - halfHeight))
          (point "" (abs center) (ord center + halfHeight)) Nothing

grid :: forall action. Context -> Box -> Box -> Array (Html action)
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
   in
        ((\ n -> render' (ctx' 0.5) $ segAtX $ toNumber n) =<< (ceil botX .. floor topX))
       <>
        ((\ n -> render' (ctx' 0.5) $ segAtY $ toNumber n) =<< (ceil botY .. floor topY))
       <>
        (render' (ctx' 1.5) $ segAtX 0.0)
       <>
        (if botY <= 0.0 && 0.0 <= topY
          then render' (ctx' 1.5) $ segAtY 0.0
          else [])

digit2 :: Number -> Number
digit2 a = (_ / 100.0) $ toNumber $ round $ a * 100.0

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

type F = {function :: Number -> Number, domain :: Array Intrvl}

plot :: forall action. Context -> Box -> Box -> F -> Array (Html action)
plot ctx from to {function, domain} =
        let botX = abs from.center - from.halfWidth
            topX = abs from.center + from.halfWidth
            zs = dropWhile (_ == Nothing) $
              (\x ->
                if inDomain domain x
                  then Just {x, y: - function x} {- <- WTF Yaxis! -}
                  else Nothing) <$>
                   (\n -> botX +
                     toNumber n * (topX - botX) / toNumber density) <$>
                     0..density
        in if length zs == 0
              then []
              else (\s -> (render' ctx $ FS from to s) ) =<<
                           (unsafePartial pen from []
                             (unsafePartial fromJust $ head zs)
                             (unsafePartial fromJust $ tail zs))

reframe :: forall action. Context -> Model -> Array (Html action)
reframe ctx { fromF, toF
            , fromD, toD, displayD
            , displayT, numbers
            , previousX, previousY, texSlot
              , command
              , argument
              , isDragged
              , domain
              , message} =
     grid ctx fromF toF
      <> grid ctx fromD toD
      <> plot ctx fromF toF {function: image command, domain}
      <> (if displayD
            then plot ctx fromD toD {function: diff command, domain}
            else [])
{-
  let x = abs $ remap toF toF.center fromF
  if fAndDf.function.domain x
      then do
            let f = fAndDf.function.expression
            let df = fAndDf.diff.expression
            let p = point "" x (- f x) --Yaxis!
            let a = - df x
            let b = -1.0 --Yaxis
            let c = x * df x - f x
            let a2 = digit2 $ -a
            let c2 = digit2 $ -c
            svgtext ctx.svg
                    (svgWidth * 0.7)
                    (svgHeight * 0.05)
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
                                         (svgWidth * 0.7)
                                         (svgHeight * 0.1)
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
                                 p  = point "" n (- df n) --Yaxis!
                              in if inBox fromD p
                                then render' (tanStyle ctx) $ FP fromD toD p
                                else pure unit
                        else pure unit)) unit numbers
    -}


page :: forall action. Context -> Model -> Array (Html action)
page ctx model = reframe ctx model


render ∷ Model → H.Html Action
render model =
  let ctx = defaultContext { stroke = "#050409"}
      background = rectangle ctx{fill = white} 0.0 0.0 svgWidth svgHeight
      functionBkg = curryBox (rectangle ctx{fill = beige}) functionDisplay
      diffBkg = curryBox (rectangle ctx{fill = beige}) diffDisplay

  in H.div
    [ H.attr "style" "display: grid; grid-template-columns: 3fr 2fr;"]
    [ H.elemWithNS
        (Just $ H.Namespace "http://www.w3.org/2000/svg")
        "svg"
        [ H.attr "width" "800px"
        , H.attr "height" "600px"
        , H.onMouseDown (H.always StartDragging)
        , H.onMouseUp (H.always_ EndDragging)
        , H.onMouseMove (H.always UpdateArgument)
        ]
        ([ background
        , functionBkg
        , diffBkg
        ]
        <> page ctx model
        <> (render' ctx $ frame functionDisplay)
        <> (render' ctx $ frame diffDisplay)
        <> (render' ctx{stroke = blue} $ cursor functionDisplay)
        <> (render' ctx{stroke = blue} $ cursor diffDisplay)
        )
    , H.div [H.attr "style" "display: grid; grid-template-columns: 1fr 1fr;"]
      [ mkButtonEvent "zoomOutX"
      , mkButtonEvent "zoomInX"
      , mkButtonEvent "F: zoomOutY"
      , mkButtonEvent "F: zoomInY"
      , mkButtonEvent "F': zoomOutY"
      , mkButtonEvent "F': zoomInY"
      , mkButtonEvent "show Derivative"
      , mkButtonEvent "hide Derivative"
      , mkButtonEvent "show Tangent"
      , mkButtonEvent "hide Tangent"
      , mkButtonEvent "mark Coefficient"
      , functionInput
      , H.input [ H.onValueChange  (H.always UpdateDomain)]
      , H.label [H.ref (H.always $ SaveRef <<< Just)] []
      , H.label [] [H.text $ show model.argument]
      , H.label [] [H.text $ show $ image model.command model.argument]
      , H.label [] [H.text $ show $ diff model.command model.argument]
      ]
    ]

functionInput :: H.Html Action
functionInput = H.input [ H.autofocus true
                  , H.onValueChange  (H.always RenderCommand)]

app ∷ App.App KaTeX.RenderEffect (Const Void) Model Action
app =
  { render
  , update
  , subs: const mempty
  , init: App.purely initialModel
  }

main ∷ Effect Unit
main = do
  inst ←
    App.makeWithSelector
      (liftNat KaTeX.runRenderEffect `merge` never)
      app
      "#app"
  inst.run
