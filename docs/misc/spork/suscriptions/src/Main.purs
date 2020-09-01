module Main where

import Prelude

import Data.Const (Const)
import Data.Maybe (Maybe(..), maybe)
import Data.Monoid (guard)
import Effect (Effect)
import Spork.App as App
import Spork.Html as H
import Spork.Interpreter (merge, never)
import Sub (Sub)
import Sub as Sub

type State =
  { subscribing ∷ Boolean
  , coord ∷ Maybe Sub.Coord
  }

initialState ∷ State
initialState =
  { subscribing: false
  , coord: Nothing
  }

data Action
  = UpdateSub Boolean
  | UpdateCoord Sub.Coord

update ∷ State → Action → App.Transition (Const Void) State Action
update model = case _ of
  UpdateSub subscribing →
    App.purely
      { subscribing
      , coord: Nothing
      }

  UpdateCoord coord →
    App.purely $ model { coord = Just coord }

render ∷ State → H.Html Action
render { subscribing, coord } =
  H.div
    [ H.classes [ "wrapper" ] ]
    [ H.button
        [ H.type_ H.ButtonButton
        , H.onClick (H.always_ (UpdateSub (not subscribing)))
        ]
        [ H.text
            if subscribing
              then "Unsubscribe"
              else "Track the Pointer"
        ]
    , H.span
        [ H.classes [ guard subscribing "subscribing" ] ]
        [ H.text
            if subscribing
               then (maybe "Move the pointer" renderCoord coord)
               else ""
        ]
    ]

renderCoord ∷ Sub.Coord → String
renderCoord { x, y } = "(" <> show x <> ", " <> show y <> ")"

subs ∷ State → App.Batch Sub Action
subs { subscribing }
  | subscribing = App.lift (Sub.mouseMove UpdateCoord)
  | otherwise   = mempty

app ∷ App.App (Const Void) Sub State Action
app =
  { render
  , update
  , subs
  , init: App.purely initialState
  }

main ∷ Effect Unit
main = do
  inst ←
    App.makeWithSelector
      (never `merge` Sub.interpreter)
      app
      "#app"

  inst.run
