module Main where

import Prelude
import Effect (Effect)
import DOM.Editor as DOM
import Rand(rands)
import SVG.Geometry (point,segment)
import SVG.Render(class Render, defaultContext, render')
import Data.Array(concat, foldM, range, replicate, updateAt, zip, (!!))
import Partial.Unsafe(unsafePartial)
import Data.Maybe(fromJust,Maybe(..))
import Data.Foldable(foldr)
import Data.Int(toNumber)
import Data.Tuple(Tuple(..))

type Index = Int
type Count = Int

inc :: Index -> Array Count -> Array Count
inc n arr = unsafePartial $ fromJust $ updateAt n (1 + (unsafePartial $ fromJust $ arr !! n)) arr

classes = 200 :: Int
slice = 10000 / classes :: Int

initial :: Array Count
initial = replicate classes 0

indices :: Array Index
indices = range 0 (classes - 1)

classify :: Int -> Array Count -> Array Count
classify n hist = 
  let rest = n `mod` slice
      cl = (n - rest) / slice
   in inc cl hist

main :: Effect Unit
main = do
  setup <- DOM.setup
  svg <- DOM.newSVG setup.body
  let context = defaultContext svg
  let render = render' context :: forall a. Render a => a -> Effect Unit
  
  let sample = 900
  let width = 5.0
  let height = 30.0
  let r0 = {val: 0, gen: 0, seed: 97153}
  let rnds = rands sample r0
  let hist = foldr classify initial rnds
  let rects = 
        concat $ (\(Tuple i n) -> 
                   let pA = point "" (width * toNumber i) 500.0
                       pB = point "" (width * toNumber (i+1)) 500.0
                       pC = point "" (width * toNumber (i+1)) (500.0 - height * toNumber n)
                       pD = point "" (width * toNumber i) (500.0 - height * toNumber n)
                     in [ segment pA pB Nothing
                        , segment pB pC Nothing
                        , segment pC pD Nothing
                        , segment pD pA Nothing]) <$> zip indices hist
  foldM (\a b -> pure a <> render b) unit rects
 