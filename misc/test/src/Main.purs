module Main where

import Prelude
import Effect (Effect)
import Effect.Console (log)
import Data.Maybe(Maybe(..))
import Math(sqrt)
import Partial.Unsafe(unsafePartial)
import Type.Prelude(SProxy(..))
import Record(delete, equal,class EqualFields)
import Prim.Row(class Lacks, class Cons)
import Prim.RowList(class RowToList)
import Data.Symbol(class IsSymbol)

type System = {mu :: Maybe Number, mr :: Maybe Number, mi :: Maybe Number} 
type Update = System

extract :: forall a. Maybe a -> a
extract = unsafePartial $ \(Just a) -> a 

content :: System
content = {mu: Nothing, mr: Nothing, mi: Nothing}

mu = SProxy :: SProxy "mu"
mr = SProxy :: SProxy "mr"
mi = SProxy :: SProxy "mi"

is :: forall sp 
             trimmed 
             row 
             ty 
             rs. IsSymbol sp => Lacks sp trimmed 
                             => Cons sp ty trimmed row 
                             => RowToList trimmed rs 
                             => EqualFields rs trimmed 
                             => Record row -> Record row -> SProxy sp -> Boolean
is c u sp = equal (delete sp u) (delete sp c)

update :: Update -> System -> System
update u s@{mu: su, mr: sr, mi: si} =
       case unit of
            unit | is content u mu -> 
                    { mu: u.mu
                    , mr: (\x y -> x * sqrt(extract u.mu/y)) <$> sr <*> su
                    , mi: (\x y -> x * sqrt(extract u.mu/y)) <$> si <*> su}
                 | is content u mr -> 
                  { mu: (\x y -> x * sqrt(extract u.mr/y)) <$> su <*> sr
                  , mr: u.mr
                  , mi: (\x y -> x * sqrt(y/extract u.mr)) <$> si <*> sr}
                 | is content u mi ->
                  { mu: (\x y -> x * sqrt(extract u.mi/y)) <$> su <*> si
                  , mr: (\x y -> x * sqrt(y/extract u.mi)) <$> sr <*> si
                  , mi: u.mi}
            otherwise -> s
 
main :: Effect Unit
main = do
  let system = {mu: Just 6.0, mr: Just 2.0, mi: Just 3.0}
  log $ show $ update content{mu = Just 24.0} system
  log $ show $ update content{mr = Just 5.0} system
