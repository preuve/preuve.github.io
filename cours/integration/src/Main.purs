module Main where

import Prelude

import Data.Array (foldl, (..), tail, zip)
import Data.Maybe (fromMaybe)
import Data.Int (toNumber)
import Data.Number (cos, sin, pi)
import Data.Tuple (snd)
import Data.Tuple.Nested ((/\))
import Effect (Effect)
import Effect.Console (log)

rk4 f n h a = foldl (\z _ -> rk z) (0.0 /\ a) $ 1 .. n
  where k1 i w = h * f ((h * i)         /\ w)
        k2 i w = h * f ((h * (i + 0.5)) /\ (w + k1 i w / 2.0))
        k3 i w = h * f ((h * (i + 0.5)) /\ (w + k2 i w / 2.0))
        k4 i w = h * f ((h * (i + 1.0)) /\ (w + k3 i w))
        rk (i /\ w) = (i + 1.0) /\ (w + (k1 i w + 2.0 * k2 i w + 2.0 * k3 i w + k4 i w) / 6.0)

integrationRk4 f n a b =
  snd $ rk4 (\(t /\ _) -> f (t + a)) n ((b - a) / (toNumber $ n - 1)) 0.0

integrationTrapeze f n a b =
  foldl (\s (x /\ x') -> s + dx * (f x + f x') / 2.0) 0.0 $ zip  xs xs' 
  where
    dx = (b - a) / (toNumber n) 
    xs = (a + _) <<< (dx * _) <<< toNumber <$> (0 .. n)
    xs' = fromMaybe [] $ tail xs
    
{-

Methode de Simpson

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
integration f n a b =
  foldl (\s (x /\ x') -> s + dx * (f x + 4.0 * f ((x + x') / 2.0) + f x') / 6.0) 0.0 $ zip  xs xs' 
  where
    dx = (b - a) / (toNumber n) 
    xs = (a + _) <<< (dx * _) <<< toNumber <$> (0 .. n)
    xs' = fromMaybe [] $ tail xs
    
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
    
test1 = integrationRk4 (\x -> x * x) 10000 0.0 6.0 -- 72.0216043207202
test2 = integrationTrapeze (\x -> x * x) 100 0.0 6.0
test3 = integration (\x -> x * x) 10 0.0 6.0

bessel1 n x = (_ / pi) $ integration (\t -> cos $ toNumber n * t - x * sin t) 100 0.0 pi

main :: Effect Unit
main = do
  log $ show $ test1
  log $ show $ test2
  log $ show $ test3
  log $ show $ integration38 (\x -> x * x) 5 0.0 6.0

