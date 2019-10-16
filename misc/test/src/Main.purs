module Main where

import Prelude
import Effect (Effect)
import Effect.Console (log)

type Some = {a:: Int, b:: Int, c:: Int}

{-
f {b} = {a: 2, b, c: 4}
f {a} = {a, b: 2, c: 3}
f {c} = {a: 3, b: 4, c}
-}
f x = case x of
  {a} -> {a, b: 2, c: 3}
  {b} -> {a: 2, b, c: 4}
  {c} -> {a: 3, b: 4, c}
  otherwise -> {a: 0, b: 0, c: 0}
  
main :: Effect Unit
main = do
  log $ show $ f {a: 9}
  --log $ show $ f {b: 10}
  --log $ show $ f {c: 11}