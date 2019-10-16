module Rand where

import Prelude

type Rand = {val :: Int, gen :: Int, seed :: Int}

middle :: Int -> Int
middle nn = 
  let n0 = nn `mod` 100
      n3' = nn `mod` 1000000
      n3 = nn - ((nn-n3') `div` 1000000) * 1000000 
   in (n3-n0) `div` 100 

rand :: Rand -> Rand
rand {val, gen, seed} = 
  { val: middle $ (val * val + gen) `mod` 100000000
  , gen: (gen + seed) `mod` 100000000
  , seed}
