module Main where

import Prelude

import Effect (Effect)
import Effect.Console (logShow)
import Partial.Unsafe(unsafePartial)
import Data.Array(all, head, zip, length, (:), zipWith, (..), concat, filter,sortBy)
import Data.Maybe(fromJust)
import Data.Tuple(Tuple(..))
import Data.Foldable(foldr, foldl)
import Data.Int(toNumber)

type Score = Number
type Student = Array Score

math6Trimestre1 :: Array Student
math6Trimestre1 = 
 [[7.00,13.00,11.50,16.00]
 ,[10.00,19.00,13.50,20.00]
 ,[12.00,18.00,16.25,20.00]
 ,[17.00,16.00,16.00,10.00]
 ,[14.00,9.00,9.50,16.00]
 ,[10.00,16.00,12.00,20.00]
 ,[16.00,18.00,8.25,20.00]
 ,[6.00,12.00,13.50,17.00]
 ,[15.00,10.00,15.50,20.00]
 ,[13.00,14.00,13.00,18.00]
 ,[10.00,13.00,14.00,15.00]
 ,[4.00,14.00,6.25,12.00]
 ,[10.00,1.00,6.75,16.00]
 ,[11.00,9.00,12.00,20.00]
 ,[6.00,10.00,3.00,20.00]
 ,[4.00,11.00,12.25,20.00]
 ,[10.00,18.00,14.50,20.00]
 ,[9.00,4.00,5.00,18.00]
 ,[10.00,17.00,11.50,20.00]
 ,[6.00,11.00,5.00,8.00]
 ,[8.00,13.00,12.75,13.00]
 ]

math1Trimestre1 = 
  [[2.00,9.00,12.25,18.00]
  ,[11.00,16.00,13.75,15.00]
  ,[12.00,20.00,11.25,14.00]
  ,[16.00,9.00,14.00,10.00]
  ,[15.00,13.00,10.25,6.00]
  ,[6.00,14.00,12.25,17.00]
  ,[19.00,14.00,18.00,20.00]
  ,[10.00,11.00,6.25,20.00]
  ,[6.00,18.00,14.75,5.00]
  ,[18.00,18.00,17.00,12.00]
  ,[16.00,20.00,19.25,11.00]
  ,[15.00,14.00,15.00,20.00]
  ,[9.00,18.00,13.75,16.00]
  ,[16.00,11.00,8.50,20.00]
  ,[19.00,8.00,11.25,15.00]
  ,[10.00,17.00,13.50,16.00]
  ,[10.00,17.00,14.00,16.00]
  ,[6.00,6.00,8.50,9.00]
  ,[16.00,16.00,11.50,17.00]
  ,[8.00,12.00,5.25,11.00]
  ,[16.00,15.00,9.00,20.00]
  ,[16.00,9.00,13.75,20.00]
  ,[18.00,19.00,15.50,20.00]
  ,[15.00,9.00,11.50,20.00]]

type Scheme = Array Number

minAvg :: Array Student -> Scheme -> Score
minAvg notes = unsafePartial $ \ coefs ->
  let avgs = (\stud -> foldr (+) 0.0 $ zipWith (*) coefs stud) <$> notes
   in foldl min (unsafePartial $ fromJust $ head avgs) avgs
 
precision = 20 :: Int

candidates :: Array Student -> Array Scheme
candidates notes = 
  let nmarks = length $ unsafePartial $ fromJust $ head notes
      nfree = nmarks - 1
   in complete <$> (filter admissible $ generate nfree)    

complete :: Scheme -> Scheme
complete xs =
  let s = foldr (+) 0.0 xs
  in (1.0 - s):xs

admissible :: Scheme -> Boolean
admissible xs =
  let s = foldr (+) 0.0 xs
  in all (_ >= 0.15) xs && s <= 1.0 - 0.15

generate :: Int -> Array Scheme
generate 0 = [[]]
generate n = 
   let add = (_ / toNumber precision) <$> toNumber <$> 0..precision
       g1 = generate (n-1)
     in concat $ (\a -> (\g -> a:g) <$> g1) <$> add

optimize :: Array Student -> {scheme :: Scheme, score :: Number}
optimize notes = 
  let cs = candidates notes
      res = zip cs $ minAvg notes <$> cs 
      sortRes = sortBy (\(Tuple c1 a1) (Tuple c2 a2) -> compare a2 a1) res
      Tuple scheme score = unsafePartial $ fromJust $ head sortRes
   in {scheme, score}
     
main :: Effect Unit
main = do
  logShow $ optimize math1Trimestre1
      