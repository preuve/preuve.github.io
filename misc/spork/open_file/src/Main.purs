module Main where

import Prelude

import Data.Const (Const)
import Data.Maybe (Maybe(..), fromJust, maybe)
import Effect (Effect)
import Effect.Aff (Aff)
import Effect.Class (liftEffect)
import Partial.Unsafe (unsafePartial)
import Spork.App as App
import Spork.Html (Html)
import Spork.Html as H
import Spork.Interpreter (merge, never, throughAff)
import Web.Event.Event (Event, target)
import Web.File.File (toBlob)
import Web.File.FileList (item)
import Web.File.FileReader.Aff (readAsText)
import Web.HTML.HTMLInputElement (files, fromEventTarget)


type FileContent = String

data Unpure a
    = GetFileText Event (FileContent -> a)

type State =
  { textFile :: FileContent
  }

data Action = UpdateFileText Event
            | DoneReading FileContent

update ∷ State -> Action -> App.Transition Unpure State Action
update s (UpdateFileText ev) =
  { model: s
  , effects: App.lift (GetFileText ev DoneReading)
  }
update s (DoneReading text) = App.purely $ s{textFile = text}


render ∷ State → Html Action
render s =
  H.div []
  [ H.input [H.type_ H.InputFile, H.onChange $ H.always UpdateFileText]
  , H.label [] [H.text $ s.textFile]
  ]

app ∷ App.App Unpure (Const Void) State Action
app = { update
      , subs: const mempty
      , render
      , init: App.purely  { textFile: ""
                          }
      }

runUnpure ::  Unpure ~> Aff
runUnpure unpure =
    case unpure of
        GetFileText ev next -> do
          mfs <- liftEffect $ files (unsafePartial
              $ fromJust $ fromEventTarget =<< target ev)
          next <$> (maybe (pure "") readAsText
                      $ (Just <<< toBlob) =<< item 0 =<< mfs)

main :: Effect Unit
main = do
    let interpreter = throughAff runUnpure (const $ pure unit)
    inst <- App.makeWithSelector (interpreter `merge` never) app "#app"
    inst.run

