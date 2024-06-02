module Main where

import Prelude

import Data.Array (foldr, foldl, (..), tail, zip, head)
import Data.Foldable (sum)
import Data.Int (toNumber)
import Data.Maybe (fromMaybe)
import Data.Number (cos, sin, pi, atan)
import Data.Tuple (fst, snd)
import Data.Tuple.Nested ((/\), type (/\))
import Effect (Effect)
import Effect.Console (log)

rk4 :: (Number /\ Number -> Number) -> Int -> Number -> Number -> Number /\ Number
rk4 f n h a = foldl (\z _ -> rk z) (0.0 /\ a) $ 1 .. n
  where k1 i w = h * f ((h * i)         /\ w)
        k2 i w = h * f ((h * (i + 0.5)) /\ (w + k1 i w / 2.0))
        k3 i w = h * f ((h * (i + 0.5)) /\ (w + k2 i w / 2.0))
        k4 i w = h * f ((h * (i + 1.0)) /\ (w + k3 i w))
        rk (i /\ w) = (i + 1.0) /\ (w + (k1 i w + 2.0 * k2 i w + 2.0 * k3 i w + k4 i w) / 6.0)

type IntegrationMethod = (Number -> Number) -> Int -> Number -> Number -> Number

integrationRk4 :: IntegrationMethod
integrationRk4 f n a b =
  snd $ rk4 (\(t /\ _) -> f (t + a)) n ((b - a) / (toNumber $ n - 1)) 0.0

integrationTrapeze :: IntegrationMethod
integrationTrapeze f n a b =
  foldl (\s (x /\ x') -> s + dx * (f x + f x') / 2.0) 0.0 $ zip  xs xs' 
  where
    dx = (b - a) / (toNumber n) 
    xs = (a + _) <<< (dx * _) <<< toNumber <$> (0 .. n)
    xs' = fromMaybe [] $ tail xs
    
{-

Methode 1/3 de Simpson
----------------------

f approximee sur [a,b]
par p: x |-> rx^2+sx+t
avec p(a)=ra^2+sa+t=f(a), p(b)=rb^2+sb+t=f(b) et p((a+b)/2) = r(a+b)^2/4+s(a+b)/2+t = f((a+b)/2)

son integrale est donc approximee par [rx^3/3+sx^2/2+tx]_a^b
soit rb^3/3+sb^2/2+tb-(ra^3/3+sa^2/2+ta)
=r(b^3-a^3)/3+s(b^2-a^2)/2+t(b-a)
=[2r(b^2+ab+a^2)+3s(b+a)+6t]/(b-a)/6
=[rb^2+rb^2+ra^2+ra^2+2rab+sb+sa+2s(b+a)+t+t+4t]/(b-a)/6
=[(ra^2+sa+t)+(rb^2+sb+t)+r(b^2+a^2+2ab)+2s(b+a)+4t]/(b-a)/6
=[f(a)+f(b)+r((a+b)^2)+2s(b+a)+4t]/(b-a)/6
=[f(a)+f(b)+4f((a+b)/2)]/(b-a)/6

-}

integration13 :: IntegrationMethod
integration13 f n a b =
  foldl (\s (x /\ x') -> s + dx * (f x + 4.0 * f ((x + x') / 2.0) + f x') / 6.0) 0.0 $ zip  xs xs' 
  where
    dx = (b - a) / (toNumber n) 
    xs = (a + _) <<< (dx * _) <<< toNumber <$> (0 .. n)
    xs' = fromMaybe [] $ tail xs
    
integration38 :: IntegrationMethod
integration38 f n a b =
  foldl (\s (x /\ x') -> 
    s + dx * (
      f x 
        + 3.0 * f ((2.0 * x + x') / 3.0) 
        + 3.0 * f ((x + 2.0 * x') / 3.0) 
        + f x'
        ) / 8.0) 0.0 $ zip  xs xs' 
  where
    dx = (b - a) / (toNumber n) 
    xs = (a + _) <<< (dx * _) <<< toNumber <$> (0 .. n)
    xs' = fromMaybe [] $ tail xs
    
integrationRomberg :: IntegrationMethod
integrationRomberg f n a b = fromMaybe 0.0 $ head $ snd $ go (4 /\ array)
  where
    array = fst $
      foldl 
        (
          \(arr /\ p /\ s) _ -> 
            let
              hp = (b - a) / toNumber (2*p)
              sjs = do
                j <- 1 .. p
                pure $ f $ a + toNumber (2*j-1) * hp
              sp = s / 2.0 + hp * sum sjs
            in (arr <> [sp]) /\ (2*p) /\ sp
        ) ([s0] /\ 1 /\ s0) $ 0 .. (n-1)
        where
          s0 = (b - a) * (f a + f b) / 2.0
    h (q /\ arr) = 
      (4*q) /\ ((\(r/\r') -> (toNumber q * r' - r) / toNumber (q - 1)) <$> zip arr (fromMaybe [] $ tail arr))
    go (q /\ arr) = foldr (const h) (q /\ arr) (fromMaybe [] $ tail arr)

test1 = integrationRk4 (\x -> x * x) 10000 0.0 6.0 :: Number
test2 = integrationTrapeze (\x -> x * x) 100 0.0 6.0 :: Number
test3 = integration13 (\x -> x * x) 10 0.0 6.0 :: Number
test4 = integration38 (\x -> x * x) 5 0.0 6.0 :: Number

bessel1 :: Int -> Number -> Number
bessel1 n x = (_ / pi) $ integrationRomberg (\t -> cos $ toNumber n * t - x * sin t) 100 0.0 pi

main :: Effect Unit
main = do
  log $ show $ test1
  log $ show $ test2
  log $ show $ test3
  log $ show $ test4
  log $ show $ atan 2.0 + atan 4.0
  log $ show $ integration38 (\x -> 2.0 / (1.0 + 4.0 * x * x)) 2000 (-1.0) 2.0
  log $ show $ integrationRomberg (\x -> 2.0 / (1.0 + 4.0 * x * x)) 10 (-1.0) 2.0
