module Main where

import Prelude
import Effect (Effect)
import Effect.Console (log)
import Data.Maybe(Maybe(..))
import Math(sqrt)

type System = {mu :: Maybe Number, mr :: Maybe Number, mi :: Maybe Number} 
type Update = System

default :: System
default = {mu: Nothing, mr: Nothing, mi: Nothing}

update :: Update -> System -> System
update {mu: uu, mr: ur, mi: ui} s@{mu, mr, mi} =
       case [uu,ur,ui] of
            [Just u, Nothing, Nothing] -> 
                    { mu: Just u
                    , mr: (\x y -> x * sqrt(u/y)) <$> mr <*> mu
                    , mi: (\x y -> x * sqrt(u/y)) <$> mi <*> mu}
            [Nothing, Just r, Nothing] -> 
                  { mu: (\x y -> x * sqrt(r/y)) <$> mu <*> mr
                  , mr: Just r
                  , mi: (\x y -> x * sqrt(y/r)) <$> mi <*> mr}
            [Nothing, Nothing, Just i] ->
                  { mu: (\x y -> x * sqrt(i/y)) <$> mu <*> mi
                  , mr: (\x y -> x * sqrt(y/i)) <$> mr <*> mi
                  , mi: Just i}
            otherwise -> s

main :: Effect Unit
main = do
  let system = {mu: Just 6.0, mr: Just 2.0, mi: Just 3.0}
  log $ show $ update default{mu = Just 24.0} system
  log $ show $ update default{mr = Just 5.0} system
