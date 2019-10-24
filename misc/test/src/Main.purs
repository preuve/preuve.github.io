module Main where

import Prelude
import Effect (Effect)
import Effect.Console (log)
import Math(sqrt)
import Type.Prelude(SProxy(..))
import Data.Symbol(class IsSymbol)
import Env(Env(..), asks, local)
import Control.Comonad(extract, (=>=))

type Settings = {r :: Number}

type System = { u :: Number
              , i :: Number}

setR :: Number -> Settings -> Settings
setR n set = set{r = n}

class IsSymbol l <= Updatable l where
  update :: SProxy l -> Number -> Env Settings System -> System

instance uUpdatable :: Updatable "u" where
  update SProxy u ess = 
          let {u: _u, i} = extract ess
              r = asks (_.r) ess
           in {u, i: u/r}

instance iUpdatable :: Updatable "i" where
  update SProxy i ess = 
          let {u, i: _i} = extract ess
              r = asks (_.r) ess
           in {u: r*i, i}  

instance rUpdatable :: Updatable "r" where
  update SProxy r1 ess = 
          let f ess' = 
                let {u: u0, i: i0} = extract ess'
                    r0 = u0/i0
                    r = asks (_.r) ess'
                in {u: sqrt(r/r0)*u0 , i: sqrt(r0/r)*i0}
          in f <<< local (setR r1) $ ess

context :: Env Settings System
context = Env {r: 2.0} {u: 6.0, i: 3.0}

x1 = update (SProxy :: SProxy "u") 24.0 :: Env Settings System -> System
x2 = update (SProxy :: SProxy "i") 2.0 :: Env Settings System -> System
x3 = update (SProxy :: SProxy "r") 8.0 :: Env Settings System -> System

main :: Effect Unit
main = do
  log $ show $ x1 context
  log $ show $ x2 context
  log $ show $ x3 context
  log $ show $ x1 =>= x2 $ context
  log $ show $ x2 =>= x1 $ context 
  log $ show $ x1 =>= x3 $ context 
  log $ show $ x3 =>= x1 $ context 

{-
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

-}
