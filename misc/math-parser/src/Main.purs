module Main where

import Prelude

import Data.Either (Either(..))
import Data.Map (empty)
import Data.Maybe (Maybe(..))
import Effect (Effect)
import Parser.Eval (eval)
import Parser.Parser (parse)
import Parser.Syntax (Cmd(..))
import Data.Const (Const)

import Spork.App as App
import Spork.Html as H
import Spork.Interpreter (liftNat, merge, never)

import SporKaTeX( RenderEffect(..), runRenderEffect) as KaTeX

type Model =
  { renderedExpression :: String
  , ref :: Maybe H.ElementRef
  }

initialModel ∷ Model
initialModel =
  { renderedExpression: ""
  , ref: Nothing
  }

data Action
  = None
  | Render String
  | SaveRef (Maybe H.ElementRef)

update ∷ Model → Action
       → App.Transition KaTeX.RenderEffect Model Action
update model = case _ of
  None →  App.purely model

  SaveRef (Just ref) -> App.purely model{ref = Just ref}
  SaveRef _ -> App.purely model

  Render cmd ->
    let
      rExpr = case parse cmd of
        Right (Eval expr) -> case eval empty expr of
           Right exp -> show exp
           _ -> ""
        _ -> ""
      effects = case model.ref of
        Just(H.Created el) → App.lift (KaTeX.RenderEffect rExpr el None)
        Just(H.Removed _)  → mempty

        Nothing -> mempty
    in
      { model: model{renderedExpression=rExpr}, effects }

render ∷ Model → H.Html Action
render model =
  H.div
    []
    [ content
    , command
    ]

content :: H.Html Action
content = H.div [] [ H.label [H.ref (H.always $ SaveRef <<< Just)] []]

command :: H.Html Action
command = H.input [ H.autofocus true
                  , H.onValueChange  (H.always Render)]

app ∷ App.App KaTeX.RenderEffect (Const Void) Model Action
app =
  { render
  , update
  , subs: const mempty
  , init: App.purely initialModel
  }

main ∷ Effect Unit
main = do
  inst ←
    App.makeWithSelector
      (liftNat KaTeX.runRenderEffect `merge` never)
      app
      "#app"
  inst.run
