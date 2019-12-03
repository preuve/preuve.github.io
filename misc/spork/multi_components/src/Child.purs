module Child where

import Prelude
import Data.Maybe (Maybe(..))
import Spork.Html (Html)
import Spork.Html as H

type Id = Int

data Post = Post String Id

type State = { id :: Id
             , received :: Array Post
             , message :: String
             }

type Input =
  { id :: Id }

data Action
  = UpdateMessage String Id
  | SubmitMessage Id

initialState :: Input -> State
initialState { id } =
  { id
  , received: []
  , message: ""
  }

render :: State -> Html Action
render { id: from, received, message } =
    H.div [] [ H.input [ H.value message
                       , H.onValueChange $ Just <<< flip UpdateMessage from]
            , H.button [ H.onClick $ const $ Just (SubmitMessage from) ]
                          [ H.text "Send" ] 
            , H.ul [] $ renderReceived <$> received

            , H.hr []
            ]
    where
      renderReceived (Post postmessage id) =
          H.li [] [ H.text $ "From" <> show id <> " : " <> postmessage ] 

