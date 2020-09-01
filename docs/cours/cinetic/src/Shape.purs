module Shape where

import Prelude

import Data.Int (toNumber, round)
import Data.Tuple.Nested ((/\), type (/\))
import Math (cos, sin)

type Coord
  = Int /\ Int

type DynamicCoord =
  { previous :: Coord
  , next :: Coord
  , current :: Coord
  }

toDynamicCoord :: Coord -> DynamicCoord
toDynamicCoord c =
    { previous: 0 /\ 0
    , current: c
    , next: 0 /\ 0
    }

toDynamicState :: State Coord -> State DynamicCoord
toDynamicState {center: c, orientation, tops: ts} =
    { center: toDynamicCoord c
    , orientation
    , tops: toDynamicCoord <$> ts
    }

type State c =
  { center :: c
  , orientation :: Number
  , tops :: Array c
  }

type Shape =
  { stable :: State Coord
  , fugitive :: State DynamicCoord
  , size :: Number
  }

toDrawable :: Shape -> Array Coord
toDrawable {fugitive, size} =
  let cx /\ cy = fugitive.center.current
      phi = fugitive.orientation
  in (\{current: x/\y} ->
      (cx + (round $ size * ( toNumber x * cos phi
                            - toNumber y * sin phi)))
      /\
      (cy + (round $ size * ( toNumber x * sin phi
                          +   toNumber y * cos phi)))
      ) <$> fugitive.tops

evolve :: Array Shape -> Array Shape
evolve xs =
  (\x -> x { fugitive = x.fugitive{orientation = x.fugitive.orientation + 0.1}
           , size = x.size-1.0
           } ) <$> xs
