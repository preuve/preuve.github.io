module Main where

import Prelude

import Concur.Core (Widget)
import Concur.VDom (HTML)
import Concur.VDom.DOM (node') as D
import Concur.VDom.Run (runWidgetInDom)
import Concur.VDom.SVG as S
import Control.Alt ((<|>))
import Data.Array (concat, foldr, uncons, zip, zipWith, (..))
import Data.Foldable (sum)
import Data.Int (round, toNumber)
import Data.Maybe (maybe)
import Data.Sparse.Matrix (Matrix(..), diagonalize, height, luSolve, transpose, (??), (^))
import Data.Sparse.Polynomial (Polynomial, (?))
import Data.Tuple.Nested ((/\), type (/\))
import Effect (Effect)
import Effect.Unsafe (unsafePerformEffect)
import Handles (onMouseMove, onMouseDown, onMouseUp) as P
import Math (abs, atan, cos, pi, sin, sqrt)
import Nodes (text) as D
import Web.UIEvent.MouseEvent (pageX, pageY, fromEvent)

type Coord
  = Int /\ Int

points1 :: Array Coord
points1 = [ 150 /\ 150
          , 240 /\ 80
          , 270 /\ 120
          , 220 /\ 200
          , 160 /\ 250
          ]

points2 :: Array Coord
points2 = [ 150 /\ 150
          , 240 /\ 80
          , 270 /\ 120
          , 220 /\ 200
          , 120 /\ 100
          ]

type Vector = Matrix Number

mkMatrix :: Array Coord -> Matrix Number
mkMatrix ps =
  let  line :: Int /\ (Number /\ Number) -> _
       line (i /\ (x /\ y)) = (x*x)^i^0 + (y*y)^i^1 + (x*y)^i^2 + x^i^3 + y^i^4
  in Matrix { height: 5
            , width: 5
            , coefficients:
                sum $ line <$> (zip (0..5)
                             $(\(x/\y) -> toNumber x /\ toNumber y) <$> ps)
            }

secondMember :: Vector
secondMember =
  Matrix
    { coefficients: (-1.0)^0^0+(-1.0)^1^0+(-1.0)^2^0+(-1.0)^3^0+(-1.0)^4^0
    , height: 5
    , width: 1
    }

type Quadratic = Matrix Number

mkQuadraticMatrix :: Matrix Number -> Quadratic
mkQuadraticMatrix m =
  Matrix
    { height: 3
    , width: 3
    , coefficients:
        (m??[0,0])^0^0     + (m??[2,0]/2.0)^0^1 + (m??[3,0]/2.0)^0^2
      + (m??[2,0]/2.0)^1^0 + (m??[1,0])^1^1     + (m??[4,0]/2.0)^1^2
      + (m??[3,0]/2.0)^2^0 + (m??[4,0]/2.0)^2^1 + 1.0^2^2
    }

fromCoord :: Coord -> Vector
fromCoord (i /\ j) =
  let x /\ y = toNumber i /\ toNumber j
  in Matrix {height: 3, width: 1, coefficients: x^0^0+y^1^0+1.0^2^0}

applyQuadratic :: Quadratic -> Coord -> Number
applyQuadratic m p =
  let v = fromCoord p
  in (transpose v * m * v)??[0,0]

type Rotation = Matrix Number

rotation :: Number -> Rotation
rotation t =
  let c /\ s = cos t /\ sin t
  in  Matrix { height: 3
             , width: 3
             , coefficients: c^0^0+(-s)^0^1+s^1^0+c^1^1+1.0^2^2
             }

unCouple :: Quadratic -> Number /\ Quadratic
unCouple m =
  let t = 0.5 * atan ((2.0 * m??[0,1]) / (m??[1,1] - m??[0,0]))
      r = rotation t
  in t /\ (r * m * transpose r)

center :: Quadratic -> Coord
center m =
  let t /\ u = unCouple m
      x /\ y = (- u??[0,2] / u??[0,0]) /\ (-u??[1,2] / u??[1,1])
      r = rotation t
      c = transpose r * Matrix { height: 3
                               , width: 1
                               , coefficients: x^0^0+y^1^0+1.0^2^0
                               }
  in (round $ c??[0,0]) /\ (round $ c??[1,0])

coefficients :: forall a. Matrix a -> Polynomial (Polynomial a)
coefficients (Matrix m) = m.coefficients

toQuadratic :: forall a. Polynomial (Polynomial a) -> Matrix a
toQuadratic p =
   Matrix { height: 3
          , width: 3
          , coefficients: p
          }

toColumn :: forall a. Int -> Polynomial a -> Matrix a
toColumn j p = toQuadratic $ p^j

ellipseFivePoints :: Array Coord -> Quadratic
ellipseFivePoints points =
    mkQuadraticMatrix
                 $ luSolve (mkMatrix points) secondMember

pointSize = 10 :: Int

makePoint :: forall a. Coord -> Array (Widget HTML a)
makePoint (x /\ y) =
  [ makeLine ( (x - pointSize) /\ (y + pointSize) )
             ( (x + pointSize) /\ (y - pointSize) )
  , makeLine ( (x - pointSize) /\ (y - pointSize) )
             ( (x + pointSize) /\ (y + pointSize) )
  ]

makePoints :: forall a. Array Coord -> Array (Widget HTML a)
makePoints points = concat $ makePoint <$> points

makeCenter :: forall a. Array Coord -> Array (Widget HTML a)
makeCenter points = makePoint $ center $ mkQuadraticMatrix
             $ luSolve (mkMatrix points) secondMember

makeEllipse :: forall a. Array Coord -> Widget HTML a
makeEllipse points =
  let m = mkQuadraticMatrix
               $ luSolve (mkMatrix points) secondMember
      t /\ u = unCouple m
      g = -u??[2,2] + u??[0,2] * u??[0,2] / u??[0,0] + u??[1,2] * u??[1,2] / u??[1,1]
      cx /\ cy = center m
      rx /\ ry = (sqrt $ g / (u??[0,0])) /\ (sqrt $ g / (u??[1,1]))
  in S.ellipse
    [ S.unsafeMkProp "cx" cx
    , S.unsafeMkProp "cy" cy
    , S.unsafeMkProp "rx" rx
    , S.unsafeMkProp "ry" ry
    , S.fill "none"
    , S.stroke "#000000"
    , S.strokeWidth 2
    , S.transform $ "rotate("
      <> show (- 180.0 * t / pi) <> ", "
      <> show cx <> ","
      <> show cy <> ")"
    ]
    []

type Model
  = { pressed :: Boolean
    , lastPosition :: Coord
    }

makeLine :: forall a. Coord -> Coord -> Widget HTML a
makeLine (xa /\ ya) (xb /\ yb) =
  S.line
    [ S.unsafeMkProp "x1" xa
    , S.unsafeMkProp "x2" xb
    , S.unsafeMkProp "y1" ya
    , S.unsafeMkProp "y2" yb
    , S.stroke "#000000"
    , S.strokeWidth 2
    ]
    []

closed :: forall a. Array a -> Array a
closed xs =
  maybe [] (\{head, tail} -> xs <> [head]) (uncons xs)

makeLines :: forall a. Array Coord -> Array (Widget HTML a)
makeLines xs =
  maybe []
        (\ {head, tail} -> zipWith makeLine xs tail)
        (uncons xs)

shapeSide = 50 :: Int

makeShape :: forall a. Model -> Array (Widget HTML a)
makeShape model =
  let x /\ y = model.lastPosition
      _x = x - shapeSide
      x_ = x + shapeSide
      _y = y - shapeSide
      y_ = y + shapeSide
  in [makeEllipse points1] <> makeCenter points1
     <> [makeEllipse points2] <> makeCenter points2 <>  ((makeLines <<< closed)
    if model.pressed
       then [ _x /\ _y
            , _x /\ y_
            , x_ /\ y_
            , x_ /\ _y
            ]
        else  [ _x /\ _y
              , _x /\ y_
              , x /\ y
              ])

get :: Effect Number -> Int
get val = round (unsafePerformEffect val)

modelWidget :: Model -> Widget HTML Model
modelWidget model = do
  newModel <- S.svg
            [ S.width "500"
            , S.height "500"
            , S.viewBox "6 6 506 506"
            , (\ev ->
                 model { lastPosition =
                          maybe model.lastPosition
                                (\mouse -> pageX mouse /\ pageY mouse)
                                (fromEvent ev)
                       }
                )  <$> P.onMouseMove
              , model { pressed = true } <$ P.onMouseDown
              , model { pressed = false } <$ P.onMouseUp
              ]
                    $ makeShape model
  modelWidget newModel

normalizeColumn :: Quadratic -> Quadratic -> Int -> _--Quadratic
normalizeColumn ref vec j =
  let sc x y =
        let app v = transpose v * ref * v
        in (_ * 0.5) <$> (app (x+y) - app x - app y)

      p = coefficients vec ? j
      v0 = toColumn 0 p
      z = Matrix {height:3, width: 1, coefficients: 1.0^2^0}
      --r0 = (transpose v0 * v0) ?? [0,0]
      --v1 = (_ * (sqrt $ 1.0 / r0)) <$> v0
      --r = (sc v1 * ref * v1) ?? [0,0]
      r = (sc v0 v0 + ((_ * 7000.0) <$> sc z z)) ?? [0,0]
--  in toColumn j $ (_ * (sqrt $ 1.0 / r)) <$> (coefficients v1 ? 0)
  in toColumn j $ (_ * (sqrt $ 1.0 / r )) <$> (coefficients v0 ? 0)

interEllipses :: Quadratic -> Quadratic -> _ --Array Coord
interEllipses k m =
  let a = recip m * k
      {val, vec} = diagonalize a
      nvec = sum $ normalizeColumn m vec <$> 0..(height m - 1)
  in {val, nvec}

k = ellipseFivePoints points2
m = ellipseFivePoints points1
i12 = interEllipses k m
p1 = (2400) /\ (220)
n1 =  (recip i12.nvec) * fromCoord p1
-- n1t = (transpose $ fromCoord p1) * i12.nvec

{-
kk = Matrix {height:2, width: 2, coefficients:3.0^0^0+(-2.0)^0^1+(-2.0)^1^0+1.0^1^1}
mm = Matrix {height:2, width: 2, coefficients:1.0^0^0+(-1.0)^0^1+(-1.0)^1^0+2.0^1^1}
sc x y =
  let app v = transpose v * mm * v
  in (_ * 0.5) <$> (app (x+y) - app x - app y)

aa = recip mm * kk
dd = diagonalize aa
ref = dd.vec
v1 = ref ??[0,0]
v2 = ref ??[0,1]
v3 = ref  ??[1,0]
v4 = ref  ??[1,1]
n1 = Matrix {height:2, width: 1, coefficients: v1^0^0+v3^1^0}
n2 = Matrix {height:2, width: 1, coefficients: v2^0^0+v4^1^0}
s1 = sqrt $ (transpose n1 * n1) ??[0,0]
s2 = sqrt $ (transpose n2 * n2) ?? [0,0]
r1 = sqrt $ (sc n1 n1) ??[0,0]
r2 = sqrt $ (sc n2 n2) ?? [0,0]
u = Matrix {height:2, width: 1, coefficients:3.0^0^0+5.0^1^0}

nvec = Matrix {height:2, width: 2
     , coefficients: (v1/r1)^0^0+(v2/r2)^0^1
                    +(v3/r1)^1^0+(v4/r2)^1^1}

v = recip nvec * u
-}
main :: Effect Unit
main = runWidgetInDom "main"
           $ modelWidget { pressed: false
                         , lastPosition: 200 /\ 200
                         }
                  <|> (D.node' "pre" [D.text
                    $ (show $ k) <> "\n"
                          <> (show $ m)<> "\n"
                          <> (show $ applyQuadratic k p1)<> "\n"
                          <> (show $ applyQuadratic m p1) <> "\n"
                          <> (show $ i12) <> "\n"
                          <> (show $ transpose n1 * n1) <> "\n"
                           ])
