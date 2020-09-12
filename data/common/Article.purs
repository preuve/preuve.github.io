module Article where

import Prelude

import Concur.Core (Widget)
import Concur.VDom (HTML)
import Concur.VDom.DOM as D
import Concur.VDom.Props (dangerouslySetInnerHTML) as P

import Control.Monad.State(State, runState)
import Control.Monad.State.Class(class MonadState, modify)
import Control.Monad.State.Class(get) as Control

import Data.Array(snoc, elemIndex, (:), (..), length)
import Data.Int (round)
import Data.Maybe (Maybe(..), fromJust)
import Data.Tuple (fst)
import Data.Foldable (foldr)

import Effect.Class (liftEffect)
import Global (readFloat, isNaN)
import KaTeX (equation, inline) as KaTeX

import Partial.Unsafe(unsafePartial)
      
-- | inverses a permutation of [0,1,..,n-1] 
invPerm :: Array Int -> Array Int
invPerm ps = 
  foldr (\i acc -> 
    (unsafePartial $ fromJust 
    $ elemIndex i ps) : acc) [] $ 0..(length ps - 1)

validateInput :: Maybe String -> Maybe Int
validateInput (Just inp) =
 let r = readFloat inp
  in if isNaN r
    then Nothing
    else 
      Just $ round r
validateInput _ = Nothing

get :: forall m s. MonadState s m => m s
get = Control.get

put :: forall a st. Functor st => MonadState (Array a) st => a -> st Unit
put x = void $ modify (flip snoc x)

fromIncremental :: forall a. State (Array a) (Array a) -> Array a
fromIncremental seq = fst $ runState seq []

type IncrementalArrayLine a = State (Array (Widget HTML a)) Unit

mImpl :: forall a. String -> Widget HTML a
mImpl str = do
  ktx <- liftEffect $ KaTeX.inline str
  D.label [P.dangerouslySetInnerHTML ktx] []

m :: forall a. String -> IncrementalArrayLine a
m str = put $ mImpl str
  
equationImpl :: forall a. String -> Widget HTML a
equationImpl str = do
  ktx <- liftEffect $ KaTeX.equation str
  D.label [P.dangerouslySetInnerHTML ktx] []
  
equation :: forall a. String -> IncrementalArrayLine a
equation str = put $ equationImpl str
 
t :: forall a. String -> IncrementalArrayLine a
t str = put $ D.label' [D.text str]

nl :: forall a. IncrementalArrayLine a
nl = put $ D.br [] []

em :: forall a. String -> IncrementalArrayLine a
em str = put $ D.em [] [D.text str]

b :: forall a. String -> IncrementalArrayLine a
b str = put $ D.b [] [D.text str]

setTitle :: forall a. String -> IncrementalArrayLine a
setTitle str = put $ D.h1 [] [D.text str]

section :: forall a. String -> IncrementalArrayLine a
section str = put $ D.h2 [] [D.text str]

subsection :: forall a. String -> IncrementalArrayLine a
subsection str = put $ D.h3 [] [D.text str]

subsubsection :: forall a. String -> IncrementalArrayLine a
subsubsection str = put $ D.h4 [] [D.text str]

