module Main where

import Prelude

import Data.Const (Const)
import Data.Maybe (Maybe(..), fromJust, maybe)
import Effect (Effect)
import Global.Unsafe (unsafeEncodeURIComponent)
import Partial.Unsafe (unsafePartial)
import Spork.App as App
import Spork.Html (Html, InputType(..))
import Spork.Html as H
import Spork.Interpreter (liftNat, merge, never)
import Web.DOM.Element (Element, setAttribute)
import Web.HTML.HTMLElement (click, fromElement)

type FileContent = String

data Unpure a
    = WriteFile Keys a

type State =
  { link :: Maybe (H.ElemRef Element)
  , filename :: Maybe String
  , textFile :: FileContent
  }

type Keys =
  { element :: Element
  , name :: String
  , text :: FileContent
  }

data Action = None
            | RegisterAnchor (H.ElemRef Element)
            | RegisterFilename String
            | UpdateText FileContent
            | DoWrite

update ∷ State -> Action -> App.Transition Unpure State Action
update s None = App.purely s
update s (RegisterAnchor ref) = App.purely $ s{link = Just ref}
update s (RegisterFilename name) = App.purely $ s{filename = Just name}
update s (UpdateText text) = App.purely $ s{textFile = text}
update s DoWrite =
     let
      effects = case s.link of
        Just (H.Created element) →
                App.lift (WriteFile { element
                                    , text: s.textFile
                                    , name: unsafePartial $ fromJust s.filename
                                    } None)
        _                        → mempty
    in
      { model: s, effects }

render ∷ State → Html Action
render s =
  H.div [] $
  [ H.textarea [H.onValueChange $ H.always UpdateText]
  , H.input [H.type_ InputText, H.onValueChange $ H.always RegisterFilename]
  , H.a [H.style "display=\"none\"", H.ref (H.always RegisterAnchor)] []
  ]
  <> maybe [] (const $ [ H.button [H.onClick $ H.always_ DoWrite]
                                  [H.text "Save"]
                       ]) s.filename

app ∷ App.App Unpure (Const Void) State Action
app = { update
      , subs: const mempty
      , render
      , init: App.purely  { link: Nothing
                          , filename: Nothing
                          , textFile: ""
                          }
      }

runEffect ::  Unpure ~> Effect
runEffect effect =
    case effect of
        WriteFile s next -> do
          setAttribute  "href"
                        ("data:text/plain;charset=utf-8,"
                            <> unsafeEncodeURIComponent s.text)
                        s.element
          setAttribute "download" s.name s.element
          click (unsafePartial $ fromJust $ fromElement s.element)
          pure next

main :: Effect Unit
main = do
    inst <- App.makeWithSelector (liftNat runEffect `merge` never) app "#app"
    inst.run
