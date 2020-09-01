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

getPadChar :: forall a. Env Settings a -> Char 
getPadChar w = ask $ withEnv (_.padChar) w

context :: Env Settings String
context = env ( { padAmount: 3
                , maxLength: 5
                , padChar: '*'}) "Hello World"

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
setPadChar c set = set{padChar = c}

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
