module Main where

import Prelude

import Data.Const (Const)
import Data.Either (Either(..))
import Data.Map (empty, insert)
import Data.Maybe (Maybe(..))
import Effect (Effect)
import Global (readFloat)
import Parser.Eval (eval)
import Parser.Parser (parse)
import Parser.Syntax (Dual(..), Cmd(..), Expr(..))
import SporKaTeX (RenderEffect(..), runRenderEffect) as KaTeX
import Spork.App as App
import Spork.Html as H
import Spork.Interpreter (liftNat, merge, never)

type Model =
  { texSlot :: Maybe H.ElementRef
  , command :: String
  , argument :: String
  }

initialModel ∷ Model
initialModel =
  { command: ""
  , argument: ""
  , texSlot: Nothing
  }

transmit :: Model -> String
transmit model =
  case parse model.command of
    Right (Eval expr) -> show expr
    _ -> ""

liftExprDual :: Number -> Expr
liftExprDual x = Lit $ Dual {height: x, slope: 1.0}

execute :: Model -> Expr
execute model =
  case parse model.command of
    Right (Eval expr) ->
      case eval (insert "x" (liftExprDual $ readFloat model.argument) empty) expr of
        Right exp -> exp
        _ -> Var "undefined"
    _ -> Var "undefined"

data Action
  = None
  | SaveRef (Maybe H.ElementRef)
  | UpdateArgument String
  | RenderCommand String

update ∷ Model → Action
       → App.Transition KaTeX.RenderEffect Model Action
update model = case _ of
  None →  App.purely model

  SaveRef (Just ref) -> App.purely model{texSlot = Just ref}
  SaveRef _ -> App.purely model

  UpdateArgument str -> App.purely model{argument = str}

  RenderCommand cmd ->
    let  m = model{command = cmd}
         effects =
          case model.texSlot of
            Just(H.Created el) → App.lift (KaTeX.RenderEffect (transmit m) el None)
            Just(H.Removed _)  → mempty
            Nothing -> mempty
    in
      { model: m, effects }

render ∷ Model → H.Html Action
render model =
  H.div
    []
    [ command
    , content model
    ]

command :: H.Html Action
command = H.input [ H.autofocus true
                  , H.onValueChange  (H.always RenderCommand)]

content :: Model -> H.Html Action
content model =
  let e = execute model
  in H.div []
                [ H.label [H.ref (H.always $ SaveRef <<< Just)] []
                , H.br []
                , H.input [H.onValueChange (H.always UpdateArgument)]
                , H.br []
                , H.label [] [H.text $
                  case e of
                    Lit (Dual {height, slope}) -> show height
                    _ -> ""]
                , H.br []
                , H.label [] [H.text $
                  case e of
                    Lit (Dual {height, slope}) -> show slope
                    _ -> ""]
                ]

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
