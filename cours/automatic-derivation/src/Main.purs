module Main where

import Prelude

import Data.Array (filter, length, (..), uncons, dropWhile, head, tail, any)
import Data.Const (Const)
import Data.Either (Either(..), hush)
import Data.Int (toNumber, floor, ceil, round)
import Data.Map (empty, insert, lookup)
import Data.Maybe (Maybe(..), fromJust)
import Data.String (Pattern(..), split, take, drop, joinWith)
import Data.String (length) as String
import Effect (Effect)
import Global (readFloat)
import Parser.Eval (eval)
import Parser.Parser (parse)
import Parser.Syntax (Dual(..), Expr(..))
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

type Color = String

white = "#FFFFFF" :: Color
beige = "#FFFFAF" :: Color
blue = "#0602c6" :: Color
purple = "#B314CB" :: Color

tanStyle = _{stroke = purple, strokeWidth = 1.5} :: Context -> Context

type Box = {center :: Point, halfWidth :: Number, halfHeight :: Number}

type Model =
  { functionSlot :: Maybe H.ElementRef
  , domainSlot :: Maybe H.ElementRef
  , f :: Maybe (Expr Dual)
  , argument :: Number
  , isDragged :: Boolean
  , domain :: Array Intrvl
  , message :: String
  , density :: Int
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
  { f: Nothing
  , argument: 0.0
  , isDragged: false
  , domain: []
  , functionSlot: Nothing
  , domainSlot: Nothing
  , message: ""
  , density: 100
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
  case model.f of
    Just expr -> show expr
    _ -> ""

liftExprDual :: Number -> Expr Dual
liftExprDual x = Lit $ Dual {height: x, slope: 1.0}

execute :: Maybe (Expr Dual) -> Number -> Expr Dual
execute f x =
  case f of
    Just expr ->
      case eval (insert "x" (liftExprDual x) empty) expr of
        Right exp -> exp
        _ -> Var "undefined"
    _ -> Var "undefined"

data Ext = R Number | PlusInf | MinusInf
data Intrvl = OpenOpen Ext Ext
            | OpenClose Ext Ext
            | CloseOpen Ext Ext
            | CloseClose Ext Ext

instance showExt :: Show Ext where
  show (R x) = show x
  show PlusInf = "+\\infty"
  show MinusInf = "-\\infty"

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
      c0 = take 1 str
      cn = drop (n - 1) str
      s = drop 1 $ take (n - 1) str
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

image :: Maybe (Expr Dual) -> Number -> Number
image f x =
  case execute f x of
    Lit (Dual {height: value, slope}) -> value
    _ -> unused

diff :: Maybe (Expr Dual) -> Number -> Number
diff f x =
  case execute f x of
    Lit (Dual {height, slope: value}) -> value
    _ -> unused

zoomOutX = "zoomOutX" :: String
zoomInX = "zoomInX" :: String
fzoomOutY = "F: zoomOutY" :: String
fzoomInY = "F: zoomInY" :: String
f'zoomOutY = "F': zoomOutY" :: String
f'zoomInY = "F': zoomInY" :: String
showDerivative = "show Derivative" :: String
hideDerivative = "hide Derivative" :: String
showTangent = "show Tangent" :: String
hideTangent = "hide Tangent" :: String
markCoefficient = "mark Coefficient" :: String

data Action
  = None
  | FunctionSlot (Maybe H.ElementRef)
  | DomainSlot (Maybe H.ElementRef)
  | UpdateArgument MouseEvent
  | RenderCommand String
  | RenderDomain String
  | Send String
  | StartDragging MouseEvent
  | EndDragging
  | IncreaseDensity
  | DecreaseDensity

update ∷ Model → Action
       → App.Transition KaTeX.RenderEffect Model Action
update model action = case action of
  None →  App.purely model

  IncreaseDensity -> App.purely model{density = model.density + 10}

  DecreaseDensity -> App.purely $ model{density = ifM (_ > 10)
                                                      (_ - 10)
                                                      identity model.density}

  FunctionSlot (Just ref) -> App.purely model{functionSlot = Just ref}
  FunctionSlot _ -> App.purely model

  DomainSlot (Just ref) -> App.purely model{domainSlot = Just ref}
  DomainSlot _ -> App.purely model

  StartDragging mouse -> App.purely model{ previousX = toNumber $ pageX mouse
                                         , previousY = toNumber $ pageY mouse
                                         , isDragged = true}

  EndDragging -> App.purely model{ isDragged = false}

  UpdateArgument mouse -> App.purely $
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
    let  m = model{f = hush $ Right cmd >>= parse}
         effects =
          case model.functionSlot of
            Just(H.Created el) →
              App.lift (KaTeX.RenderEffect (transmit m) el None)
            Just(H.Removed _)  → mempty
            Nothing -> mempty
    in
      { model: m, effects }

  RenderDomain str ->
    let ds = case str of
              "R+" -> [CloseOpen (R 0.0) PlusInf]
              "R*" -> [OpenOpen MinusInf (R 0.0), OpenOpen (R 0.0) PlusInf]
              "R" -> [OpenOpen MinusInf PlusInf]
              _   -> parseIntrvl <$> split (Pattern "U") str
        renderDs = joinWith "\\cup" $ show <$> ds
        effects =
          case model.domainSlot of
            Just(H.Created el) →
              App.lift (KaTeX.RenderEffect renderDs el None)
            Just(H.Removed _)  → mempty
            Nothing -> mempty
      in {model: model{domain = ds}, effects}

  Send str ->
    App.purely $
      let m = insert zoomOutX
                     (model{ fromF{halfWidth = model.fromF.halfWidth*1.1}
                           , fromD{halfWidth = model.fromD.halfWidth*1.1}})
              $ insert zoomInX
                       (model{ fromF{halfWidth = model.fromF.halfWidth/1.1}
                             , fromD{halfWidth = model.fromD.halfWidth/1.1}})
              $ insert fzoomOutY
                       (model{ fromF{halfHeight = model.fromF.halfHeight*1.1}})
              $ insert fzoomInY
                       (model{ fromF{halfHeight = model.fromF.halfHeight/1.1}})
              $ insert f'zoomOutY
                       (model{ fromD{halfHeight = model.fromD.halfHeight*1.1}})
              $ insert f'zoomInY
                       (model{ fromD{halfHeight = model.fromD.halfHeight/1.1}})
              $ insert showDerivative
                       (model{displayD = true})
              $ insert hideDerivative
                       (model{displayD = false})
              $ insert showTangent
                       (model{displayT = true})
              $ insert hideTangent
                       (model{displayT = false})
              $ insert markCoefficient
                       (model{numbers = model.numbers
                                       <> [abs model.fromD.center]})
                       empty
        in case lookup str m of
              Just v -> v
              _      -> model

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

rectangle :: forall action. Context -> Number -> Number -> Number -> Number
                                    -> Html action
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
        ((\ n -> render' (ctx' 0.5) $ segAtX
                                    $ toNumber n) =<< (ceil botX .. floor topX))
       <>
        ((\ n -> render' (ctx' 0.5) $ segAtY
                                    $ toNumber n) =<< (ceil botY .. floor topY))
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

plot :: forall action. Context -> Box -> Box -> Int -> F -> Array (Html action)
plot ctx from to density {function, domain} =
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

localDrawings :: forall action. Context -> Number
                            -> Maybe (Expr Dual) -> Box -> Box -> Boolean
                            -> Array (Html action)
localDrawings ctx x fun fromF toF displayT =
  let f = image fun
      df = diff fun
      p = point "" x (- f x) --Yaxis!
      a = - df x
      b = -1.0  --Yaxis
      c = x * df x - f x
      a2 = digit2 $ -a
      c2 = digit2 $ -c
  in  [ svgtext
          (svgWidth * 0.7)
          (svgHeight * 0.05)
          blue
          "italic bold 15px arial, serif" $
            "a = " <> (show $ digit2 x)
      ]
      <> (if inBox fromF p
            then render' ctx $ FP fromF toF p
            else [] )
      <> (if displayT
            then
              case lineInBox fromF (Line { a, b, c}) of
                  Just seg -> (render' (tanStyle ctx) $ FS fromF toF seg)
                                <> [svgtext
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
                                                    else "")]
                  _ -> []
                else []
          )

markDrawing :: forall action. Context -> F -> Box -> Box -> Number
                             -> Array (Html action)
markDrawing ctx {function: df, domain} fromD toD x  =
  if inDomain domain x
    then
      let p  = point "" x (- df x) --Yaxis!
      in
        if inBox fromD p
            then render' (tanStyle ctx) $ FP fromD toD p
            else []
    else []

page :: forall action. Context -> Model -> Array (Html action)
page ctx { fromF, toF
            , fromD, toD, displayD
            , displayT, numbers
            , previousX, previousY, functionSlot, domainSlot
              , f
              , argument
              , density
              , isDragged
              , domain
              , message} =
   grid ctx fromF toF
    <> grid ctx fromD toD
    <> plot ctx fromF toF density {function: image f, domain}
    <> (if displayD
          then plot ctx fromD toD density {function: diff f, domain}
          else [])
    <> (let x = abs $ remap toF toF.center fromF
        in if inDomain domain x
            then localDrawings ctx x f fromF toF displayT
            else [])
    <> (markDrawing ctx {function: diff f, domain} fromD toD =<< numbers)

styleCenter :: String
styleCenter = "display: flex; align-items: center; justify-content: center;"

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
      [ mkButtonEvent zoomOutX
      , mkButtonEvent zoomInX
      , mkButtonEvent fzoomOutY
      , mkButtonEvent fzoomInY
      , mkButtonEvent f'zoomOutY
      , mkButtonEvent f'zoomInY
      , mkButtonEvent showDerivative
      , mkButtonEvent hideDerivative
      , mkButtonEvent showTangent
      , mkButtonEvent hideTangent
      , mkButtonEvent markCoefficient
      , H.div [H.attr "style" "display: grid; grid-template-columns: 1fr 2fr 1fr;"]
        [ H.button [H.onClick (H.always_ DecreaseDensity)] [H.text "-"]
        , H.label [H.attr "style" styleCenter] [H.text $ show model.density]
        , H.button [H.onClick (H.always_ IncreaseDensity)] [H.text "+"]
        ]
      , functionInput
      , H.label [ H.attr "style" styleCenter
                , H.ref (H.always $ FunctionSlot <<< Just)] []
      , H.input [ H.onValueChange  (H.always RenderDomain)]
      , H.label [ H.attr "style" styleCenter
                , H.ref (H.always $ DomainSlot <<< Just)] []
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
