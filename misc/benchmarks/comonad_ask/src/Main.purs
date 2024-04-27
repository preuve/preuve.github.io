module Main where

import Control.Comonad (extend, extract, (=>=))
import Control.Comonad.Env (Env, ask, withEnv, local, env)
import Data.String (codePointFromChar, fromCodePointArray, take)
import Data.Tuple (Tuple(..), fst)
import Prelude
import Data.Array (replicate)
import Effect (Effect)
import Effect.Console (log)

type Settings = { padAmount :: Int
                , maxLength :: Int
                , padChar :: Char
                }

-- type Env e a
-- class Comonad w
-- instance Comonad (Env e)
--
-- [coreturn, counit] extract :: forall a. w a -> a
-- [cobind] extend = (<<=) :: forall a b. (w a -> b) -> w a -> w b
-- [cojoin] duplicate :: forall a. w a -> w (w a)
-- [coKleisli] (=>=) :: forall b a c. (w a -> b) -> (w b -> c) -> w a -> c
-- env :: forall e a. e -> a -> Env e a
-- ask :: forall a. Env e a -> e
-- withEnv :: forall e1 e2 a. (e1 -> e2) -> Env e1 a -> Env e2 a
-- local :: forall e a. (e -> e) -> Env e a -> Env e a
-- track :: forall a. t -> w a -> a
-- pos :: forall a. w a -> s
-- peek :: forall a. s -> w a -> a

-- extract <<= xs = xs
-- extract (f <<= xs) = f xs
-- extend f <<< extend g = extend (f <<< extend g)
-- duplicate = extend identity
-- extend f = map f <<< duplicate
-- extract (f (duplicate z)) = f z
-- -- ENV --
-- ask (local f x) = f (ask x)
-- extract (local _ x) = extract a
-- extend g (local f x) = extend (g <<< local f) x
-- -- TRACED --
-- track mempty = extract
-- (track s =<= track t) x = track (s <> t) x
-- -- STORE --
-- pos (extend _ x) = pos x
-- peek (pos x) x = extract x



getPadChar :: forall a. Env Settings a -> Char 
getPadChar w = ask $ withEnv (_.padChar) w

context :: Env Settings String
context = env ( { padAmount: 3
                , maxLength: 5
                , padChar: '*'
                }
              ) "Hello World"

trunc :: Env Settings String -> String
trunc w = 
  let mxLngth = ask $ withEnv (_.maxLength) w
   in take mxLngth (extract w)

pad :: Env Settings String -> String
pad = do
  let padding = fromCodePointArray <$>
                  (replicate <$> (ask <<< withEnv (_.padAmount)) 
                             <*> (ask <<< withEnv (codePointFromChar <<< (_.padChar))))
  padding <> extract <> padding

setPadChar :: Char -> Settings -> Settings
setPadChar c set = set { padChar = c }

main :: Effect Unit
main = do
  log $ show $ ask $ env 42 "Hello sailor!"                           -- 42
  log $ show $ ask $ withEnv fst $ env (Tuple "first" "second") 1337  -- "first"
  log $ show $ getPadChar context                                     -- '*'
  log $ show $ ask $ withEnv (_.padAmount) context                    -- 3
  log $ extract context                                               -- Hello World
  log $ trunc context                                                 -- Hello
  log $ pad context                                                   -- ***Hello World***
  log $ trunc <<< (extend pad) $ context                              -- ***He
  log $ pad =>= trunc $ context                                       -- ***He
  log $ trunc =>= pad $ context                                       -- ***Hello***
  log $ trunc =>= pad <<< local (setPadChar '_') =>= pad $ context    -- ***___Hello___***
