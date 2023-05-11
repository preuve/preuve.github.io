module Article where

import Prelude

import Control.Monad.Writer (Writer, tell)

import Data.Array ((:), elemIndex, (..), length, unsafeIndex)
import Data.Foldable (foldr)
import Data.Geometry.Plane 
  (Point
  , point, segment, vector
  , scale, (<+|), cosAngle, middle, abs, ord, normalTo, normalized)
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

m' :: forall t. String -> Attribute t
m' = \txt -> D.Self := KaTeX.render txt
  
m :: Event String -> Writer Nut Unit
m str = tell $ D.label [m' <$> str] []

m_ :: String -> Writer Nut Unit
m_ str = m $ pure str
  
t' :: forall t. String -> Attribute t
t' txt = D.Self := KaTeX.textMode txt

t :: Event String -> Writer Nut Unit
t str = tell $ D.label [t' <$> str] []

t_ :: String -> Writer Nut Unit
t_ str = t $ pure str

nl :: Writer Nut Unit
nl = tell $ D.br_ []

nl' :: forall t. Attribute t
nl' = D.Self := KaTeX.textMode "<br>" 

setTitle_ :: String -> Writer Nut Unit
setTitle_ str = tell $ D.h1_ [text_ str]

equation :: Event String -> Writer Nut Unit
equation str = tell $ D.label [(\txt -> D.Self := KaTeX.display txt) <$> str] []

equation_ :: String -> Writer Nut Unit
equation_ str = equation $ pure str
  
em_ :: String -> Writer Nut Unit
em_ str = tell $ D.em_ [text_ str]

b_ :: String -> Writer Nut Unit
b_ str = tell $ D.b_ [text_ str]

a_ :: String -> Writer Nut Unit     
a_ str = tell $ D.a [D.Href !:= str] [text_ str]

pre_ :: String -> Writer Nut Unit 
pre_ str = tell $ D.pre_ [text_ str]

section_ :: String -> Writer Nut Unit
section_ str = tell $ D.h2_ [text_ str]

subsection_ :: String -> Writer Nut Unit 
subsection_ str = tell $ D.h3_ [text_ str]

subsubsection_ :: String -> Writer Nut Unit 
subsubsection_ str = tell $ D.h4_ [text_ str]

subsubsubsection_ :: String -> Writer Nut Unit
subsubsubsection_ str = tell $ D.h5_ [text_ str]

openSection_ :: String -> String -> Writer Nut Unit 
openSection_ title points =
  tell $ D.div_ 
    [ D.div [D.Style !:= "margin: 0; display: flex; justify-content: space-between"]
        [ D.label [D.Style !:= "font-size: 24px; font-weight: 700;"]  [text_ title]
        , D.label [D.Style !:= "font-size: 16px; font-weight: 700;"] [text_ points]
        ]
    , D.hr_ []
    ]

-- OCCASIONAL TOOLS :

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
