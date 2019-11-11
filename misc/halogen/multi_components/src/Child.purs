module Child where

import Prelude
import Data.Array as Array
import Data.Maybe (Maybe(..))
import Halogen as H
import Halogen.HTML as HH
import Halogen.HTML.Properties as HP
import Halogen.HTML.Events as HE

data Post = Post String Int

type State = { id :: Int
             , received :: Array Post
             , message :: String
             }

data Query a
    = ReceiveMessage Post a
    | CountMessages (Int -> a)

data Message
    = SendMessage Post

type Slot = H.Slot Query Message

type Input =
  { id :: Int }

data Action
  = UpdateMessage String
  | SubmitMessage

control :: forall m. H.Component HH.HTML Query Input Message m
control =
  H.mkComponent { initialState
                , render
                , eval: H.mkEval $ H.defaultEval
                            { handleAction = handleAction
                            , handleQuery = handleQuery
                            }
                }

initialState :: Input -> State
initialState { id } =
  { id
  , received: []
  , message: ""
  }

handleAction :: forall m. Action -> H.HalogenM State Action () Message m Unit
handleAction ( UpdateMessage message ) =
    H.modify_ _{ message = message }
   
handleAction SubmitMessage = do
    state <- H.get
    handleAction $ UpdateMessage ""
    H.raise $ SendMessage $ Post state.message state.id


handleQuery :: forall m a . Query a -> H.HalogenM State Action () Message m (Maybe a) 
handleQuery ( ReceiveMessage post k ) = do
    H.modify_ ( \st -> st { received = Array.snoc st.received post } )
    pure $ Just k

handleQuery ( CountMessages k ) = do
  count <- Array.length <$> H.gets _.received
  pure <<< Just $ k count

render :: forall m. State -> H.ComponentHTML Action () m
render { received, message } =
    HH.div_ [ HH.input [ HP.value message
                       , HE.onValueChange $ Just <<< UpdateMessage ]
            , HH.button [ HE.onClick $ const $ Just SubmitMessage ]
                          [ HH.text "Send" ] 
            , HH.ul_ $ renderReceived <$> received

            , HH.hr_
            ]
    where
      renderReceived (Post postmessage id) =
          HH.li_ [ HH.text $ "From" <> show id <> " : " <> postmessage ] 

