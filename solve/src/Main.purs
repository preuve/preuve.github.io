module Main where

import Prelude hiding (negate, recip, add, mul, div, min, max)

import Data.AD.Types 
  ( Arrow'(..), (.:.), exl, exr, dup, cst, cross
  , negate, recip
  , add, mul, div
  , exp, sqrt, ln, pow, abs, sign
  , min, max
  , cos, sin, tan, acos, asin, atan
  , cosh, sinh, tanh, acosh, asinh, atanh
  , argmin
  , distance2D, distance3D, transpose2D
  , minimize2, minimize3
  )
import Data.Tuple.Nested ((/\), type (/\))
import Effect (Effect)
import Effect.Console (log)

testRing :: Int /\ Int
testRing = 
  let A' graph = -- x |-> x^3 + 5
        ((identity .:. dup >>> mul) >>> mul
        .:. cst 5) >>> add
      f /\ f' = graph 2
    in f /\ f' 1
    
testNum :: Number /\ Number /\ Number
testNum = 
  let A' graph = -- x/\y |-> exp(-x^2 * y)
        (exl >>> dup >>> mul >>> negate .:. exr) 
          >>> mul
          >>> exp
      f /\ f' = graph $ 0.3 /\ 0.5
    in f /\ (f' $ 1.0 /\ 0.0) /\ (f' $ 0.0 /\ 1.0)

testDiv :: Number /\ Number /\ Number
testDiv = 
  let A' graph = -- x /\ y |-> 7 x / y
        (div .:. cst 7.0) >>> mul
      f /\ f' = graph $ 2.0 /\ 0.25
    in f /\ ((f' $ 1.0 /\ 0.0) /\ (f' $ 0.0 /\ 1.0)) 

testCompound :: Number /\ Number
testCompound = 
  let A' graph = -- x |-> sign (x) * tan (1/x)
        dup >>> (exl >>> sign .:. exr >>> recip >>> tan) >>> mul
      f /\ f' = graph 2.0
    in f /\ f' 1.0 

test1 :: Boolean
test1 = 
  let A' graph = -- x/\y |-> atan (sqrt (x*x + y*y))
        (exl >>> dup >>> mul .:. exr >>> dup >>> mul) >>> add >>> sqrt >>> atan
      f /\ f' = graph $ 0.3 /\ 0.2
      fx = f' $ 1.0 /\ 0.0
      fy = f' $ 0.0 /\ 1.0
  in 0.34604693088 < f && f < 0.34604693089
    && 0.7363276941042 < fx && fx < 0.7363276941043
    && 0.49088512 < fy && fy < 0.49088513

test2 :: Boolean
test2 = 
  let A' graph = -- x/\y |-> -x / ln (x*x + y*y)
        (exl >>> negate .:. (exl >>> dup >>> mul .:. exr >>> dup >>> mul) >>> add >>> ln) >>> div
      f /\ f' = graph $ 0.3 /\ 0.2
      fx = f' $ 1.0 /\ 0.0
      fy = f' $ 0.0 /\ 1.0
  in 0.147042906241016 < f && f < 0.147042906241017
    && 0.8227832712 < fx && fx < 0.82278327121
    && 0.221760166 < fy && fy < 0.221760167

test3 :: Boolean
test3 = 
  let A' graph = pow -- x/\y |-> x ^ y
      f /\ f' = graph $ 0.3 /\ 0.2
      fx = f' $ 1.0 /\ 0.0
      fy = f' $ 0.0 /\ 1.0
  in 0.786003085596622 < f && f < 0.786003085596623
    && 0.52400205706441 < fx && fx < 0.52400205706442
    && -0.946326339174605 < fy && fy < -0.946326339174604

test4 :: Boolean
test4 = 
  let A' graph = sin >>> asin -- x |-> asin (sin x)
      f /\ f' = graph $ 0.4
      fx = f' 1.0
  in 0.39 < f && f < 0.41
    && 0.99 < fx && fx < 1.01
test5 :: Boolean
test5 = 
  let A' graph = asin >>> sin -- x |-> sin (asin x)
      f /\ f' = graph $ 0.4
      fx = f' 1.0
  in 0.39 < f && f < 0.41
    && 0.99 < fx && fx < 1.01
test6 :: Boolean
test6 = 
  let A' graph = cos >>> acos -- x |-> acos (cos x)
      f /\ f' = graph $ 0.4
      fx = f' 1.0
  in 0.39 < f && f < 0.41
    && 0.99 < fx && fx < 1.01
test7 :: Boolean
test7 = 
  let A' graph = acos >>> cos -- x |-> cos (acos x)
      f /\ f' = graph $ 0.4
      fx = f' 1.0
  in 0.39 < f && f < 0.41
    && 0.99 < fx && fx < 1.01

test8 :: Boolean
test8 = 
  let A' graph = min -- x /\ y |-> min x y
      f /\ f' = graph $ 0.4 /\ 0.3
      fx = f' $ 1.0 /\ 0.0
  in 0.29 < f && f < 0.31
     && 0.99 < fx && fx < 1.01

test9 :: Number /\ Number
test9 = 
  let A' graph = min -- x /\ y |-> min x y
      _ /\ f' = graph $ 0.4 /\ 0.3
      fx = f' $ 1.0 /\ 0.0
      fy = f' $ 0.0 /\ 1.0
  in fx /\ fy

test10 :: Boolean
test10 = 
  let A' graph = max -- x /\ y |-> max x y
      f /\ f' = graph $ 0.4 /\ 0.3
      fx = f' $ 1.0 /\ 0.0
  in 0.39 < f && f < 0.41
     && 0.99 < fx && fx < 1.01

test11 :: Number /\ Number
test11 = 
  let A' graph = max -- x /\ y |-> max x y
      _ /\ f' = graph $ 0.4 /\ 0.3
      fx = f' $ 1.0 /\ 0.0
      fy = f' $ 0.0 /\ 1.0
  in fx /\ fy
test12 :: Boolean
test12 = 
  let A' graph = cosh >>> acosh -- x |-> acosh (cosh x)
      f /\ f' = graph $ 0.4
      fx = f' 1.0
  in 0.39 < f && f < 0.41
    && 0.99 < fx && fx < 1.01
test13 :: Boolean
test13 = 
  let A' graph = acosh >>> cosh -- x |-> cosh (acosh x)
      f /\ f' = graph $ 1.4
      fx = f' 1.0
  in 1.39 < f && f < 1.41
    && 0.99 < fx && fx < 1.01
test14 :: Boolean
test14 = 
  let A' graph = sinh >>> asinh -- x |-> asinh (sinh x)
      f /\ f' = graph $ 0.4
      fx = f' 1.0
  in 0.39 < f && f < 0.41
    && 0.99 < fx && fx < 1.01
test15 :: Boolean
test15 = 
  let A' graph = asinh >>> sinh -- x |-> sinh (asinh x)
      f /\ f' = graph $ 0.4
      fx = f' 1.0
  in 0.39 < f && f < 0.41
    && 0.99 < fx && fx < 1.01
test16 :: Boolean
test16 = 
  let A' graph = tanh >>> atanh -- x |-> atanh (tanh x)
      f /\ f' = graph $ 0.4
      fx = f' 1.0
  in 0.39 < f && f < 0.41
    && 0.99 < fx && fx < 1.01
test17 :: Boolean
test17 = 
  let A' graph = atanh >>> tanh -- x |-> tanh (atanh x)
      f /\ f' = graph $ 0.4
      fx = f' 1.0
  in 0.39 < f && f < 0.41
    && 0.99 < fx && fx < 1.01

test18 :: Number /\ Number
test18 =
  let 
    g1 =
      ((identity .:. (cst 2.0 .:. cst 4.0)) >>> transpose2D >>> cross mul mul >>> add .:. (cst (-7.0))) >>> add
    g2 =
      ((identity .:. (cst 1.0 .:. cst (-3.0))) >>> transpose2D >>> cross mul mul >>> add .:. (cst 2.0)) >>> add
    graph = (g1 .:. g2) >>> cross dup dup >>> cross mul mul >>> add
  in minimize2 graph 1.0 1e-25 (0.0 /\ 0.0)

test19 :: Number /\ Number
test19 =
  let
    ptA = (-4.0) /\ 1.0
    ptB = (-1.0) /\ (-3.0)
    ptC = 2.0 /\ 2.0
    
    d1 = (identity .:. cst ptA) >>> distance2D
    d2 = (identity .:. cst ptB) >>> distance2D
    d3 = (identity .:. cst ptC) >>> distance2D
    
    g1 = (d1 .:. d2 >>> negate) >>> add
    g2 = (d1 .:. d3 >>> negate) >>> add
    
    graph = (g1 .:. g2) >>> cross dup dup >>> cross mul mul >>> add
  in minimize2 graph 1.0 1e-25 (1.0 /\ 1.0) -- -43/54 /\ 5/18

test20 :: Number /\ Number /\ Number
test20 =
  let
    a3D = (-2.0) /\ 1.0 /\ (-2.0)
    b3D = (-1.0) /\ (-2.0) /\ 0.0
    c3D =  2.0 /\ 2.0 /\ 1.0
    d3D = (-3.0) /\ (-2.0) /\ 2.0

    d1 = (identity .:. cst a3D) >>> distance3D
    d2 = (identity .:. cst b3D) >>> distance3D
    d3 = (identity .:. cst c3D) >>> distance3D
    d4 = (identity .:. cst d3D) >>> distance3D
    
    g1 = (d1 .:. d2 >>> negate) >>> add
    g2 = (d2 .:. d3 >>> negate) >>> add
    g3 = (d3 .:. d4 >>> negate) >>> add
    
    graph = ((g1 .:. g2) >>> cross dup dup >>> cross mul mul >>> add .:. g3 >>> dup >>> mul) >>> add
  in minimize3 graph 1.1 1e-25 (1.0 /\ 0.0 /\ 0.0) -- -35/24 /\ 29/24 /\ 37/24

test21 :: Number /\ Number
test21 =
  let
    ptA = (-4.0) /\ 1.0
    ptB = (-1.0) /\ (-3.0)
    ptC = 2.0 /\ 2.0
    
    d1 = (identity .:. cst ptA) >>> distance2D
    d2 = (identity .:. cst ptB) >>> distance2D
    d3 = (identity .:. cst ptC) >>> distance2D
    
    graph = ((d1 .:. d2) >>> cross dup dup >>> cross mul mul >>> add .:. d3 >>> dup >>> mul) >>> add
  in minimize2 graph 1.0 1e-25 (1.0 /\ 1.0) -- -1 /\ 0

test22 :: Number /\ Number
test22 =
  let
    ptA = (-4.0) /\ 1.0
    ptB = (-1.0) /\ (-3.0)
    ptC = 2.0 /\ 2.0
    
    d1 = (identity .:. cst ptA) >>> distance2D
    d2 = (identity .:. cst ptB) >>> distance2D
    d3 = (identity .:. cst ptC) >>> distance2D
    
    graph = ((d1 .:. d2) >>> add .:. d3) >>> add
  in minimize2 graph 1.0 1e-25 (1.0 /\ 1.0) -- (-213+67sqrt(3))/78 /\ (-9+sqrt(3))/26

main :: Effect Unit
main = do
  log $ show testRing
  log $ show testNum
  log $ show testDiv
  log $ show testCompound
  log $ show test1
  log $ show test2
  log $ show test3
  log $ show test4
  log $ show test5
  log $ show test6
  log $ show test7
  log $ show test8
  log $ show test9
  log $ show test10
  log $ show test11
  log $ show test12
  log $ show test13
  log $ show test14
  log $ show test15
  log $ show test16
  log $ show test17
  log $ show $ argmin 
    (\x -> 
      let A' graph = cos >>> abs
          f /\ _ = graph x
      in f
    ) [0.0, 0.5, 1.0, 1.5, 2.0] 
  log $ show test18
  log $ show test19
  log $ show test20
  log $ show test21
  log $ show test22
