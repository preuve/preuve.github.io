module Rand where

import Prelude

import Data.Array ((\\), (!!), (:), (..), length, take)
import Partial.Unsafe (unsafePartial)
import Data.Maybe (fromJust)
import Data.Foldable (foldr)

-- | 0 <= val < 1e4, 0 <= gen < 1e8, seed is a big odd integer 
type Rand = {val :: Int, gen :: Int, seed :: Int}

-- | takes the 1e4 int at the middle of a 1e8 int
middle :: Int -> Int
middle nn = 
  let n0 = nn `mod` 100
      n3' = nn `mod` 1000000
      n3 = nn - ((nn-n3') `div` 1000000) * 1000000 
   in (n3-n0) `div` 100 

-- | iterates the pseudo random generation of a value 
-- | between 0 and 9999
rand :: Rand -> Rand
rand {val, gen, seed} = 
  { val: middle $ (val * val + gen) `mod` 100000000
  , gen: (gen + seed) `mod` 100000000
  , seed}

-- | auxiliary function to keep PRNG in phase
-- | should be used with rands, unsort and choose
-- | ex: r1 = consumes 7 r0
-- |     rs = rands 7 r0
-- |     continue with r1 ...
 
consume :: Int -> Rand -> Rand
consume 0 r = r
consume n r = rand $ consume (n-1) r

-- | generates an array of n PRN between 0 and 9999
rands :: Int -> Rand -> Array Int
rands 0 r = [r.val]
rands n r = [r.val] <> rands (n-1) (rand r)

-- | generates a random permutation of [0,1,..,n-1] 
unsort :: Int -> Rand -> Array Int
unsort n r =
  let shake :: Array Int -> Rand -> Array Int -> Array Int
      shake [] _ ys = ys
      shake [x] _ ys = x : ys
      shake xs r' ys = 
        let r'' = rand r'
            x = unsafePartial $  fromJust 
                              $ xs !! (r''.val `mod` length xs)
        in shake (xs \\ [x]) r'' (x : ys)
   in shake (0..(n-1)) r []

-- | sorts the list elements according to a list of indices     
shuffle :: forall a. Array Int -> Array a -> Array a
shuffle ps xs = 
  foldr (\i acc -> 
    (unsafePartial $ fromJust 
    $ xs !! (unsafePartial $ fromJust 
      $ ps !! i)) : acc) [] $ 0..(length xs - 1)

choose :: forall a. Int -> Array a -> Rand -> Array a
choose n xs r =
  let ps = unsort (length xs) r
  in take n $ shuffle ps xs
