module Main where

import Prelude

import Data.Const (Const)
import Effect (Effect)
import Control.Monad.State(State)
import Data.Array(replicate)
import Data.Foldable(foldr)

import Spork.App as App
import Spork.Html as H
import Spork.Interpreter (liftNat, merge, never)

import SporKaTeX(runRenderEffect, fromIncremental, put, RenderEffect(..)) as KaTeX
import SporKaTeX(get, t, mathInline, nl, em, b, setTitle, section, subsection, subsubsection, mathEquation)

type Model =
  { }

initialModel ∷ Model
initialModel =
  { }

data Action
  = None
  | RenderElement String H.ElementRef

update ∷ Model → Action → App.Transition KaTeX.RenderEffect Model Action
update model = case _ of
  None →
    App.purely model

  RenderElement str ref →
    let
      effects = case ref of
        H.Created el → App.lift (KaTeX.RenderEffect str el None)
        H.Removed _  → mempty
    in
      { model, effects }

render ∷ Model → H.Html Action
render model =
  H.div
    []
    $ KaTeX.fromIncremental content

content :: State (Array (H.Html Action)) (Array (H.Html Action))
content = do
  let m = mathInline RenderElement
      equation = mathEquation RenderElement
             
  setTitle "Essai n°1: "
  section "Formule des sinus: "
  m "\\frac{\\sin(\\bar{A})}{a} = \\frac{\\sin(\\bar{B})}{b} = \\frac{\\sin(\\bar{C})}{c}"
  t " où "
  m "A"
  t " est un "
  b "angle."
  nl
  t "And "
  em "now, "
  m "\\pi"
  t "."
  subsection "Interlude"
  subsection "musical"
  subsubsection "symphonique"
  equation "(a+b)^2=a^2+2ab+b^2"
  KaTeX.put $ H.ul [] [H.li [] [H.label [H.ref (H.always (RenderElement "\\pm"))] []]
                      ,H.li [] [H.label [H.ref (H.always (RenderElement "\\int"))] []]
                      ]
  get
    
app ∷ App.App KaTeX.RenderEffect (Const Void) Model Action
app =
  { render
  , update
  , subs: const mempty
  , init: App.purely initialModel
  }

spacex :: Int -> String 
spacex n = foldr (<>) "" $ replicate n "\\;"

main ∷ Effect Unit
main = do
  inst ←
    App.makeWithSelector
      (liftNat KaTeX.runRenderEffect `merge` never)
      app
      "#app"
  inst.run

