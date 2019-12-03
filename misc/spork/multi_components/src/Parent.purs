module Parent where

import Prelude
import Child as Child
import Data.Maybe(Maybe, maybe)
import Data.Array ((..), filter, snoc, uncons)
import Spork.Html (Html)
import Spork.Html as H
import Spork.PureApp (PureApp)

type State = Array Child.State

app ∷ PureApp State Child.Action
app = { init
      , update
      , render
      }

init :: State
init = (\i -> Child.initialState {id: i}) <$> 1..5

getChild :: Child.Id -> State -> Maybe Child.State
getChild id children = 
   (_.head) <$> uncons (filter ((==) id <<< (_.id)) children)

update :: State -> Child.Action -> State 
update children (Child.UpdateMessage message from) = 
  ifM ((==) from <<< (_.id)) (_{message = message}) 
                             identity              
                                    <$> children

update children (Child.SubmitMessage from) = 
  let message = maybe "" (_.message) $ getChild from children
  in  ifM ((==) from <<< (_.id)) 
               (_{message = ""}) 
               (\child -> 
                    child{received = 
                               snoc (child.received)
                                    (Child.Post message from)
                         }
               )                    <$> children  
  
render :: State -> Html Child.Action
render st =
  H.div [] (Child.render <$> st)
