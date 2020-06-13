module Main where

import Prelude

import Concur.Core (Widget)
import Concur.VDom (HTML)
import Concur.VDom.DOM (node') as D
import Concur.VDom.Run (runWidgetInDom)
import Concur.VDom.SVG as S
import Control.Alt ((<|>))
import Data.Array (uncons, zipWith, concat, zip, (..))
import Data.Foldable (sum)
import Data.Int (round, toNumber)
import Data.Maybe (maybe)
import Data.Sparse.Matrix (Matrix(..), luSolve, (??), transpose, (^), trace, eye, height, diagonalize)
import Data.Sparse.Polynomial (Polynomial)
import Data.Tuple.Nested ((/\), type (/\))
import Effect (Effect)
import Effect.Unsafe (unsafePerformEffect)
import Handles (onMouseMove, onMouseDown, onMouseUp) as P
import Math (cos, sin, atan, sqrt, pi)
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

faddeev :: Matrix Number -> Polynomial Number
faddeev a =
  let n = height a
      go 0 _ _ p = p
      go i m c p =
        let k = n - i + 1
            am = a * m + ((_ * c) <$> eye n)
            coef = - trace (a * am) / toNumber k
        in go (i-1) am coef (p+coef^(i-1))
  in go n (Matrix {height: n, width: n, coefficients: zero}) 1.0 (1.0^n)


test = diagonalize $ Matrix {height:2, width:2, coefficients: 1.0^0^0+2.0^0^1+3.0^1^0+4.0^1^1}

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

applyQuadratic :: Quadratic -> Coord -> Number
applyQuadratic m (i /\ j) =
  let x /\ y = toNumber i /\ toNumber j
      v = Matrix {height: 3, width: 1, coefficients: x^0^0+y^1^0+1.0^2^0}
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

main :: Effect Unit
main = runWidgetInDom "main"
           $ modelWidget { pressed: false
                         , lastPosition: 200 /\ 200
                         }
                  <|> (D.node' "pre" [D.text $ show $ test])
