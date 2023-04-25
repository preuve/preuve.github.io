module Article where

import Prelude

import Control.Monad.State (State, runState)
import Control.Monad.State.Class (class MonadState, modify)
import Control.Monad.State.Class (get) as Control

import Data.Array (snoc, (:), elemIndex, (..), length, unsafeIndex)
import Data.Foldable (foldr)
import Data.Geometry.Plane (Point, point, segment, vector, scale, (<+|), cosAngle, middle, abs, ord, normalTo, normalized)
import Data.Int (round)
import Data.Maybe (Maybe(..), fromJust)
import Data.Number (acos, pi, isNaN, fromString)
import Data.Tuple (fst, snd)
import Data.Tuple.Nested ((/\), type (/\))

import Deku.Attribute ((:=), (!:=), unsafeAttribute, prop', Attribute)
import Deku.Control (text_)
import Deku.Core (Nut)
import Deku.DOM as D

import FRP.Event (Event)

import KaTeX (render, display, textMode) as KaTeX

import Partial.Unsafe (unsafePartial)

get :: forall m s. MonadState s m => m s
get = Control.get

put :: forall a st. Functor st => MonadState (Array a) st => a -> st Unit
put x = void $ modify (flip snoc x)

fromIncremental :: forall a. State (Array a) (Array a) -> Array a
fromIncremental seq = fst $ 
  runState seq []

type Put = forall st. Functor st 
  => MonadState (Array Nut) st 
  => st Unit
    
type PutString =  forall st. Functor st 
  => MonadState (Array Nut) st => String -> st Unit

type PutEvent = forall st. Functor st => MonadState (Array Nut) st => Event String -> st Unit
  
m' :: forall t. String -> Attribute t
m' = \txt -> D.Self := KaTeX.render txt
  
m :: PutEvent
m str = put $ D.label [m' <$> str] []

m_ :: PutString
m_ str = m $ pure str
  
t' :: forall t. String -> Attribute t
t' txt = D.Self := KaTeX.textMode txt

t :: PutEvent
t str = put $ D.label [t' <$> str] []

t_ :: PutString
t_ str = t $ pure str

nl :: Put
nl = put $ D.br_ []

nl' :: forall t. (String -> Attribute t) /\ String
nl' = (\txt -> D.Self := KaTeX.textMode txt) /\ "<br>"

setTitle_ :: String -> Put
setTitle_ str = put $ D.h1_ [text_ str]

equation :: PutEvent
equation str = put $ D.label [(\txt -> D.Self := KaTeX.display txt) <$> str] []

equation_ :: PutString
equation_ str = equation $ pure str
  
em_ :: String -> Put
em_ str = put $ D.em_ [text_ str]

b_ :: String -> Put
b_ str = put $ D.b_ [text_ str]

a_ :: String -> Put
a_ str = put $ D.a [D.Href !:= str] [text_ str]

pre_ :: String -> Put
pre_ str = put $ D.pre_ [text_ str]

section_ :: String -> Put
section_ str = put $ D.h2_ [text_ str]

subsection_ :: String -> Put
subsection_ str = put $ D.h3_ [text_ str]

subsubsection_ :: String -> Put
subsubsection_ str = put $ D.h4_ [text_ str]

subsubsubsection_ :: String -> Put
subsubsubsection_ str = put $ D.h5_ [text_ str]

openSection_ :: String -> String -> Put
openSection_ title points =
  put $ D.div_ 
    [ D.div [D.Style !:= "margin: 0; display: flex; justify-content: space-between"]
        [ D.label [D.Style !:= "font-size: 24px; font-weight: 700;"]  [text_ title]
        , D.label [D.Style !:= "font-size: 16px; font-weight: 700;"] [text_ points]
        ]
    , D.hr_ []
    ]

-- OCCASIONAL TOOLS :

-- compensates the impossible use of length when using events of arrays
pad :: forall t. Int -> Array ((String -> Attribute t) /\ String ) -> Array ((String -> Attribute t) /\ String ) 
pad n arr = arr <> ((\_ -> t' /\ "") <$> (0..(n - length arr - 1)))

-- similar to `sequence` when array length can be provided
toArray :: forall a ev. Functor ev => Int -> ev (Array a) -> Array (ev a) 
toArray n arrEv = (\i -> (\arr -> unsafePartial $ unsafeIndex arr i) <$> arrEv) <$> (0..(n-1))

-- distributes the event property over a tuple
toTuple :: forall a b ev. Functor ev => ev (a /\ b) -> ev a /\ ev b
toTuple tupEv = (fst <$> tupEv) /\ (snd <$> tupEv)

-- splits two uses of an event
splits :: forall ev a b c. Functor ev => (a -> b) /\ (a -> c) -> ev a -> ev (b /\ c)
splits (f /\ g) e = (\x -> f x /\ g x) <$> e

-- | inverses a permutation of [0,1,..,n-1] 
invPerm :: Array Int -> Array Int
invPerm ps = 
  foldr (\i acc -> 
    (unsafePartial $ fromJust 
    $ elemIndex i ps) : acc) [] $ 0..(length ps - 1)

measure :: forall ev e. Applicative ev => Point -> Point -> Number -> Array (ev (Attribute e))
measure p q howFar =
    let grow = (ord q - ord p) * (abs q - abs p) > 0.0
        v = vector p q
        n = normalTo v
        a = round $ (_ / pi) $ (_ * 180.0) $ acos $ cosAngle v $ vector (point "" 0.0 0.0) (point "" 1.0 0.0)
        mid = middle "" (segment p q Nothing) <+| scale howFar (normalized n)
        x = round $ abs mid
        y = round $ ord mid
        pos = show x  <> "," <> show y
    in  [ pure $ unsafeAttribute {key: "x", value: prop' (show x) }
        , pure $ unsafeAttribute {key: "x", value: prop' (show x) }
        , pure $ unsafeAttribute {key: "transform", value: prop' ("rotate(" <> (show $ if grow then a else -a) <> "," <> pos <> ") ") }
        ]

validateInput :: Maybe String -> Maybe Int
validateInput inp =
  inp >>= fromString >>= (\x -> if isNaN x then Nothing else Just (round x))

toSeed :: String -> Int
toSeed txt = case validateInput (Just txt) of
    Just n -> n
    _      -> 0
