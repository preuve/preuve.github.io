module Main where

import Prelude
import SEAD (AddFun(..), D(..), Dual(..), mulC, addC, constC, cosC, invC, (.:.))
import Math (pi)
import Data.Tuple.Nested ((/\))
import Effect (Effect)
import Effect.Console (log)

main :: Effect Unit
main = do
  let --D xPlus = invC <<< cosC <<< (addC <<< (identity .:. constC pi))
      D xPlus = addC <<< (mulC <<< ((addC <<< (identity .:. constC 3.0)) .:. identity) .:. constC 4.0) 
      c /\ Dual (AddFun f') = xPlus $ 3.0
      c /\ Dual (AddFun f'_) = xPlus $ 3.00001
  log $ show $ c /\ f' 1.0 /\ (f'_ 1.0 - f' 1.0) * 100000.0
