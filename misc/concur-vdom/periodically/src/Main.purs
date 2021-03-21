module Main where

import Prelude

import Concur.Core.FRP (Signal, hold, dyn, display, loopS)
import Concur.Core.Types (Widget)
import Concur.React (HTML)
import Concur.React.DOM (div') as D
import Concur.React.Props as P
import Concur.React.Run (runWidgetInDom)
import Concur.React.SVG as S
import Data.Array (elem, filter, fromFoldable, length)
import Data.Int (round, toNumber)
import Data.Map (Map, empty, insert, values, lookup)
import Data.Maybe (Maybe(..), fromMaybe, maybe)
import Data.Time.Duration (Milliseconds(..))
import Data.Traversable (minimum)
import Data.Tuple.Nested ((/\), type (/\))
import Effect (Effect)
import Effect.Aff (Aff, delay)
import Effect.Aff.Class (liftAff)
import Math (cos, sin)
import Prim.Row (class Cons, class Lacks)
import Prim.RowList (Cons, Nil)
import Record (delete, get)
import Record (insert) as Record
import Record.Extra (class Keys, class MapRecord, class SequenceRecord
                  , class ZipRecord, keys, mapRecord, sequenceRecord, zipRecord)
import Type.Prelude (class IsSymbol, class RowToList
                   , reflectSymbol)
import Type.Proxy(Proxy(..))

-- | Geometric SVG Setup

type Color = String
type Coord = Int /\ Int
type Line = { ptA :: Coord
            , ptB :: Coord
            , color :: Color
            }

black = "#000000" :: Color
blue = "#0000FF" :: Color
red = "#FF0000" :: Color
green = "#00FF00" :: Color

nextColor :: Color -> Color
nextColor "#000000" = blue
nextColor "#0000FF" = red
nextColor "#FF0000" = green
nextColor _ = black

line :: forall a. Line ->  Widget HTML a
line {ptA: x1/\y1, ptB: x2/\y2, color} =
  S.line  [ P.unsafeMkProp "x1" x1
          , P.unsafeMkProp "y1" y1
          , P.unsafeMkProp "x2" x2
          , P.unsafeMkProp "y2" y2
          , P.stroke color
          ]
        []

type Angle = Number

rot :: Coord -> Angle -> Coord -> Coord
rot (cx/\cy) a (x/\y) =
  let ncx/\ncy = toNumber cx /\ toNumber cy
      nx/\ny = toNumber x /\ toNumber y
  in  (round $ ncx + (nx-ncx) * cos a - (ny-ncy) * sin a)
  /\  (round $ ncy + (nx-ncx) * sin a + (ny-ncy) * cos a)

lines :: forall a. Color -> Int -> Coord -> Angle -> Array (Widget HTML a)
lines color t0 pt1 a1 =
  let pt2 = (50)/\(150)
      pt3 = (100)/\(150)
      pt4 = (50)/\(200)
      r = rot pt1 a1
      t (x/\y) = (x+t0)/\y
      ptA = t $r pt2
      ptB = t $r pt3
      ptC = t $ r pt4
  in [ line { ptA
            , ptB
            , color
            }
      , line  { ptA
              , ptB: ptC
              , color
              }
      , line  { ptA: ptC
              , ptB
              , color
              }
      ]

-- | End of Geometric SVG Setup

-- | Library

class ToMap row list a | list → row
  where
    toMapImpl ∷ Proxy list → Record row → Map String a

instance toMapNil ∷ ToMap () Nil a where
  toMapImpl _ _ = empty

instance toMapCons ∷
  ( RowToList row list
  , IsSymbol l
  , Lacks l row'
  , Cons l a row' row
  , RowToList row' list'
  , ToMap row' list' a
  )
  ⇒ ToMap row (Cons l a list') a where
  toMapImpl _ record =
    insert key value (toMapImpl (Proxy ∷ Proxy list') record')
    where
      keyS = Proxy ∷ Proxy l
      key = reflectSymbol keyS
      value = get keyS record
      record' :: Record row'
      record' = delete keyS record

toMap ∷ ∀ row list a
   . RowToList row list
   ⇒ ToMap row list a
   ⇒ Record row
   → Map String a
toMap = toMapImpl (Proxy :: Proxy list)

minPos :: forall p ps
   . RowToList p ps
  => ToMap p ps Number
  => Record p -> Number
minPos onset =
  fromMaybe 0.0 $ minimum $ filter (not <<< (_ == 0.0))
                $ fromFoldable $ values $ toMap onset

modulo :: Number -> Number -> Number
modulo x m  | x < 0.0   = modulo (x + m) m
            | x >= m    = modulo (x - m) m
            | otherwise = x

allNaught :: forall rec rs seq ss ms
   . RowToList ms ss
  => SequenceRecord ss ms () seq Maybe
  => RowToList rec rs
  => MapRecord rs rec Number (Maybe Boolean) () ms
  => Record rec -> Boolean
allNaught rec =
  let m = sequenceRecord
            $ mapRecord (\v ->
                if v == 0.0
                  then Just true
                  else Nothing) rec
    in maybe false (const true) m

filterNaught :: forall ms from
  . RowToList from ms
  => Keys ms
  => ToMap from ms Number
  => Record from -> Array String /\ Int
filterNaught rec =
  let m = toMap rec
      ks = fromFoldable $ keys rec
      fs = filter (\k -> maybe false (_ == 0.0) $ lookup k m) ks
    in fs /\ length fs

trim :: forall ms ss seq rec zs z rs
  . RowToList ms ss
  => SequenceRecord ss ms () seq Maybe
  => MapRecord rs rec Number (Maybe Boolean) () ms
  => ToMap rec rs Number
  => RowToList rec rs
  => RowToList z zs
  => MapRecord zs z (Number /\ Number) Number () rec
  => ZipRecord rs rec rs rec () z
  => Record rec -> Record rec -> Record rec /\ Number
trim period onset =
  if allNaught onset
      then trim period period
  else
    let mp = minPos period
        mo = minPos onset
        m = min mp mo
    in
      mapRecord (\(o/\p) -> modulo (o - m) p) (zipRecord onset period)
     /\ m

class RecordApplyWithLabels fs rf xs rx ry | -> ry where
  recordApplyImpl :: Number -> Array String -> Proxy fs -> Record rf
                          -> Proxy xs -> Record rx -> Record ry

instance applyNil
  :: RecordApplyWithLabels Nil rf Nil ry ry where
  recordApplyImpl _ _ _ _ _ rec = rec

instance applyCons ::
  ( IsSymbol k
  , RecordApplyWithLabels fst rft xst rxt ryt
  , Cons k xtyp rxt rx
  , Lacks k rxt
  , Cons k (xtyp -> Number -> Aff xtyp) rft rf
  , Lacks k rft
  , Cons k (Aff xtyp) ryt ry
  , Lacks k ryt
  ) => RecordApplyWithLabels (Cons k (xtyp -> Number -> Aff xtyp) fst) rf
                 (Cons k xtyp xst) rx ry where
  recordApplyImpl n keys fs recf xs recx =
    let key = Proxy :: Proxy k
        nextf = delete key recf :: Record rft
        nextx = delete key recx :: Record rxt
        itr = recordApplyImpl n keys (Proxy :: Proxy fst) nextf
                           (Proxy :: Proxy xst) nextx :: Record ryt
    in Record.insert key
              (if (reflectSymbol key) `elem` keys
                  then
                    get key recf
                      (get key recx)
                      n
                    else (pure :: xtyp -> Aff xtyp) $ get key recx
                )
              itr :: Record ry

recordApplyWithLabels
  :: forall fs rf xs rx ry
   . RecordApplyWithLabels fs rf xs rx ry
   => RowToList rf fs
   => RowToList rx xs
   => Number -> Array String -> Record rf -> Record rx -> Record ry
recordApplyWithLabels n keys recf recx =
  recordApplyImpl n
                  keys
                  (Proxy :: Proxy fs) recf
                  (Proxy :: Proxy xs) recx

periodically
  :: forall r z zs p seq mss ms ps affss affs s ss f fs
   . RowToList ms mss
   => SequenceRecord mss ms () seq Maybe
   => MapRecord ps p Number (Maybe Boolean) () ms
   => RowToList z zs
   => MapRecord zs z (Number /\ Number) Number () p
   => ZipRecord ps p ps p () z
   => RowToList p ps
   => Keys ps
   => ToMap p ps Number
   => RowToList affs affss
   => SequenceRecord affss affs () s Aff
   => RecordApplyWithLabels fs f ss s affs
   => RowToList f fs
   => RowToList s ss
   => Record f -> Record p -> { sample :: Record s, period :: Record p | r}
    -> Signal HTML { sample :: Record s, period :: Record p | r}
periodically fs period model = do
  let t /\ sn = trim period model.period
  let zeroTags /\ n = filterNaught t
  if n > 0
        then
          do
            updated <- hold model.sample
                  $ liftAff
                  $ sequenceRecord $
                      recordApplyWithLabels
                        (sn / toNumber n)
                        zeroTags
                        fs
                        model.sample

            pure model { sample = updated
                       , period = t
                       }
        else pure model { period = t }

-- | End of Library


-- | New solution

type PAff a = a -> Number -> Aff a

type Update =   { t :: PAff Int, r :: PAff Angle, c :: PAff Color }
type Movement = { t :: Int     , r :: Angle ,     c :: Color }
type Onset =    { t :: Number  , r :: Number,     c :: Number }

type Model
  = { sample :: Movement
    , period :: Onset
    }

tickerAff0 :: PAff Int
tickerAff0 t del = do
  delay $ Milliseconds del
  pure $
    if t < 400
      then t + 2
      else 150

tickerAff1 :: PAff Angle
tickerAff1 r del = do
  delay $ Milliseconds del
  pure $ r - 0.1

tickerAff2 :: PAff Color
tickerAff2 c del = do
  delay $ Milliseconds del
  pure $ nextColor c


widget3 :: forall a. Widget HTML a
widget3 = dyn $ do

  let init = { sample: { t: 0
                       , r: 0.0
                       , c: black
                       }
             , period: { t: 10.0
                       , r: 20.0
                       , c: 30.0
                       }
             }
  loopS init \model -> do

    m <- periodically { t: tickerAff0
                      , r: tickerAff1
                      , c: tickerAff2
                      }
                      { t: 50.0
                      , r: 20.0
                      , c: 1000.0
                      } model

    display $ D.div'
      [S.svg [ P.width "500"
              , P.height "500"
              ]
        $ lines m.sample.c m.sample.t (100/\200) m.sample.r
      ]
    pure m

main :: Effect Unit
main = runWidgetInDom "main" $
        D.div'
          [ widget3
          ]
