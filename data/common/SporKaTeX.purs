module SporKaTeX (fromSeq, render, put, get, RenderEffect(..), runRenderEffect) where

import Prelude

import Effect (Effect)
import Data.Foldable(for_)
import Data.Array(snoc)
import Data.Tuple(fst)

import Control.Monad.State(State, runState)
import Control.Monad.State.Class(class MonadState, get, modify)
import Control.Monad.State.Class(get) as Control

import Web.DOM.Element (Element) as DOM
import Web.HTML.HTMLLabelElement(HTMLLabelElement, fromElement)
 
get :: forall m s. MonadState s m => m s
get = Control.get

foreign import render :: String -> HTMLLabelElement -> Effect Unit
foreign import renderToString :: String -> Effect String

put :: forall a st. Functor st => MonadState (Array a) st => a -> st Unit
put x = void $ modify (flip snoc x)

fromSeq :: forall a. State (Array a) (Array a) -> Array a
fromSeq seq = fst $ runState seq []

data RenderEffect a
  = RenderEffect String DOM.Element a

runRenderEffect ∷ RenderEffect ~> Effect
runRenderEffect (RenderEffect str el next) = do
    for_ (fromElement el) $ 
        render str     
    pure next

