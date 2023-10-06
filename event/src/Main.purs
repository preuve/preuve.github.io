module Main where

import Prelude

import Affjax.ResponseFormat as ResponseFormat
import Affjax.Web as AX
import Control.Alt ((<|>))
import Control.Monad.Error.Class (throwError)
import Control.Plus (class Alt, class Plus, empty)
import Data.Argonaut.Core (stringifyWithIndent)
import Data.Array (deleteBy)
import Data.DateTime.Instant (Instant)
import Data.Function (applyFlipped)
import Data.Maybe (Maybe(..), maybe)
import Data.Number (round)
import Data.Traversable (traverse_, for_)
import Data.Tuple.Nested ((/\), type (/\))
import Effect (Effect)
import Effect.Aff (killFiber, launchAff)
import Effect.Class (liftEffect)
import Effect.Exception (error)
import Effect.Now (now)
import Effect.Random (random)
import Effect.Ref (new, read, write, modify)
import Effect.Timer (clearInterval, setInterval)
import Data.Either (Either(..))
import Fetch (Method(..))
import Unsafe.Reference (unsafeRefEq)
import Web.DOM.Document (Document, createElement, createTextNode)
import Web.DOM.Element (setAttribute, toEventTarget, toNode)
import Web.DOM.Internal.Types (Element)
import Web.DOM.Node (appendChild, setTextContent)
import Web.DOM.Text as TN
import Web.Event.Event (EventType(..))
import Web.Event.EventTarget (addEventListener, eventListener)
import Web.HTML (window)
import Web.HTML.HTMLDocument (body, toDocument)
import Web.HTML.HTMLElement (HTMLElement)
import Web.HTML.HTMLElement as HTMLElement
import Web.HTML.Window (document)

always42 :: Poll Number
always42 = (_ * 2.0) <$> Poll (_ <@> 21.0)

unspeakable :: Poll Void
unspeakable = Poll (const empty)

---------
-- API --
---------

newtype Event a = Event ((a -> Effect Unit) -> Effect (Effect Unit))

instance Functor Event where
  map :: forall a b. (a -> b) -> Event a -> Event b
  map f (Event e) = Event
    \ k -> e (\a -> k (f a))

biSampleOn :: forall a b. Event a -> Event (a -> b) -> Event b
biSampleOn (Event e1) (Event e2) =
  Event $ \k -> do
    latest1 <- new Nothing
    latest2 <- new Nothing
    c1 <-
      e1 $ \a -> do
        void $ write (Just a) latest1
        res <- read latest2
        for_ res (\f -> k (f a))
    c2 <-
      e2 $ \f -> do
        void $ write (Just f) latest2
        res <- read latest1
        for_ res (\a -> k (f a))
    pure do
      c1
      c2
  
instance Apply Event where
  apply a b = biSampleOn a ((#) <$> b)

instance Alt Event where
  alt (Event f) (Event g) =
    Event \k -> ado
      c1 <- f k
      c2 <- g k
      in
        do
          c1
          c2

instance Plus Event where
  empty = Event (\ _ -> pure (pure unit))

bindToEffect :: forall a b. Event a -> (a -> Effect b) -> Event b
bindToEffect e f =  Event \k -> do
  u <- subscribe e (f >=> k)
  pure u

create
  :: forall a
    . Effect
      { event :: Event a
      , push :: a -> Effect Unit
      }
create = do
  subscribers <- new []
  pure
    { event: Event \k -> do
        void $ modify (_ <> [k]) subscribers
        pure $ void $ modify (deleteBy unsafeRefEq k) subscribers
    , push: \a -> read subscribers >>= traverse_ ((#) a)
    }

subscribe
  :: forall r a
   . Event a
  -> (a -> Effect r)
  -> Effect (Effect Unit)
subscribe (Event e) k = e (void <<< k)

fold :: forall a b. (a -> b -> b) -> Event a -> b -> Event b
fold f (Event e) b = Event \k -> do
  result <- new b
  e \a -> modify (f a) result >>= k

sampleOnLeft :: forall a b. Event a -> Event (a -> b) -> Event b
sampleOnLeft (Event e1) (Event e2) = Event $ \k -> do
  latest <- new Nothing
  c1 <- e1 \a -> do
    read latest >>= traverse_ (\f -> k (f a))
  c2 <- e2 \f -> do
    write (Just f) latest
  pure (c1 *> c2)

sampleOnRight :: forall a b. Event a -> Event (a -> b) -> Event b
sampleOnRight (Event e1) (Event e2) = Event $ \k -> do
  latest <- new Nothing
  c1 <- e1 \a -> do
    write (Just a) latest
  c2 <- e2 \f -> do
    read latest >>= traverse_ (k <<< f)
  pure (c1 *> c2)

once :: forall a. Event a -> Event a
once (Event e) =
  Event $ \k -> do
    latest <- new Nothing
    u <- new $ pure unit
    c <-
      e $ \a -> do
        o <- read latest
        case o of
          Nothing -> do
            void $ write (Just a) latest
            k a
            join (read u)
          -- should not hit here
          Just _ -> pure unit
    void $ write c u
    o <- read latest
    case o of
      Just _ -> c
      _ -> pure unit
    pure do
      c

type Behavior a = Effect (Effect Unit /\ Effect a)

bindB :: forall a b. Behavior a -> (a -> Behavior b) -> Behavior b
bindB ea f = do
    uu <- new (pure unit)
    ua /\ aa <- ea
    pure $ (/\) (ua *> join (read uu)) do
      a <- aa
      let eb = f a
      ub /\ b <- eb
      join (read uu)
      write ub uu
      b

sampleB :: forall a b. Behavior a -> Event (a -> b) -> Event b
sampleB ea (Event eAb) = Event \k -> do
  ua /\ ba <- ea
  u <- eAb \f -> ba >>= k <<< f
  pure do
    ua
    u

newtype Poll a = Poll (forall b. Event (a -> b) -> Event b)

instance Functor Poll where
  map f (Poll e) = Poll \ k -> e $ (_ <<< f) <$> k

instance Apply Poll where
  apply (Poll f) (Poll a) = 
    Poll \e -> 
      (map (\ff (bc /\ aaa) -> 
        bc (ff aaa)) (f (e $> identity))) <*> a (map (/\) e)

instance Applicative Poll where
  pure a = Poll \e -> applyFlipped a <$> e

instance Alt Poll where
  alt (Poll a) (Poll b) = Poll \e -> a e <|> b e

sample :: forall a b. Poll a -> Event (a -> b) -> Event b
sample (Poll a) ab = a ab

effectToPoll :: Effect ~> Poll
effectToPoll ee = do
  Poll \e -> Event \k -> subscribe e \f -> ee >>= k <<< f

step :: forall a. a -> Event a -> Poll a
step a e = Poll (\e0 -> sampleOnRight ((once e0 $> a) <|> e) e0)

-------------------
-- Some examples --
-------------------

randomBehavior :: Behavior Number
randomBehavior = pure (pure unit /\ random)

interval 
  :: Int 
    -> Effect 
      { event :: Event Instant
      , unsubscribe :: Effect Unit 
      }
interval n = do 
  { event, push } <- create
  unsubscribe <- do
    id <- setInterval n do
      time <- now
      push time
    pure (clearInterval id)
  pure { event, unsubscribe }

eventNumber :: Event Number
eventNumber = Event \cb -> do
  random >>= cb
  i <- setInterval 400 do
    random >>= cb
  pure do
    clearInterval i

-- Helping functions:

label :: String -> Document -> HTMLElement -> Effect Unit
label str doc bod = do
  txt <- createTextNode str doc
  appendChild (TN.toNode txt) (HTMLElement.toNode bod)

design 
  :: String
    -> Document 
    -> HTMLElement 
    -> Effect 
      { anchor :: Element
      , div :: Element
      }
design str doc bod = do
  anchor <- createElement "a" doc
  setAttribute "class" "cursor-pointer" anchor
  setTextContent str (toNode anchor)
  label " " doc bod
  div <- createElement "div" doc
  setAttribute "style" "hidden" div
  appendChild (toNode anchor) (HTMLElement.toNode bod)
  appendChild (toNode div) (HTMLElement.toNode bod)
  pure { anchor, div }

display :: forall a. Show a => Element -> a -> Effect Unit
display el n = setTextContent (show n) (toNode el) 

----------
-- Main --
----------

main :: Effect Unit
main = join $ do
  bod <- window >>= document >>= body >>= maybe
    (throwError $ error "Could not find body")
    pure
  doc <- window >>= document <#> toDocument

  -----------------
  -- Ref design: --
  -----------------
  
  { anchor: anchor1, div: div1} <- design "Turn on event" doc bod
  onOff1 <- new false
  unsubscribe1 <- new (pure unit)
  el1 <- eventListener \_ -> do
    read onOff1 >>= case _ of
      false -> do
        u <- ((\(Event e) -> e) eventNumber) $ display div1
        write u unsubscribe1
        write true onOff1
        setTextContent "Turn off event" (toNode anchor1)
      true -> do
        u <- read unsubscribe1
        u
        write false onOff1
        setTextContent "Turn on event" (toNode anchor1)
  addEventListener (EventType "click") el1 true
    (toEventTarget anchor1)
    
  --------------------------------
  -- Event subscription design: --
  --------------------------------
  
  { anchor: anchor2, div: div2} <- design "Turn on event" doc bod
  { event: onOff2      , push: setOnOff2 }        <- create
  { event: unsubscribe2, push: setUnsubscribe2 }  <- create
  { event: trigger2    , push: setTrigger2 }      <- create

  void $ subscribe
    (fold (const not) onOff2 true :: Event Boolean)
    (case _ of
      false -> do
        e <- ((\(Event e) -> e) eventNumber) $ display div2
        setUnsubscribe2 (const e)
        setTextContent "Turn off event" (toNode anchor2)
      true -> do
        setTrigger2 unit
        setUnsubscribe2 (const $ pure unit)
        setTextContent "Turn on event" (toNode anchor2)
    )

  void $ subscribe
    (sampleOnLeft trigger2 unsubscribe2)
    identity

  el2 <- eventListener \_ -> do
    setOnOff2 unit
  addEventListener (EventType "click") el2 true
    (toEventTarget anchor2)

  ----------------------
  -- Behavior design: --
  ----------------------

  { anchor: anchor3, div: div3} <- design "Turn on event" doc bod
  { event: onOff3       , push: setOnOff3 }         <- create
  { event: unsubscribe3 , push: setUnsubscribe3 }   <- create
  { event: trigger3     , push: setTrigger3 }       <- create

  void $ subscribe
    (fold (const not) onOff3 true :: Event Boolean)
    (case _ of
      false -> do
        Event ee <-
          sampleB randomBehavior
            <$> ((const <$> _) <$> ((_.event ) <$> interval 400))
        e <- ee $ display div3
        setUnsubscribe3 (const e)
        setTextContent "Turn off event" (toNode anchor3)
      true -> do
        setTrigger3 unit
        setUnsubscribe3 (const $ pure unit)
        setTextContent "Turn on event" (toNode anchor2)
    )

  void $ subscribe
    (sampleOnLeft trigger3 unsubscribe3)
    identity

  el3 <- eventListener \_ -> do
    setOnOff3 unit
  addEventListener (EventType "click") el3 true
    (toEventTarget anchor3)

  ------------------
  -- Poll design: --
  ------------------

  { anchor: anchor4, div: _div4} <- design "" doc bod
  tick <- (_.event) <$> interval 1250
  void $ subscribe 
    ( show <$> sample
      ( Poll ( flip bindToEffect (_ <$> ((/\) <$> random <*> random)))
      )
      ( tick $>
        ( \ (a /\ b) -> (round $ a * 100.0) /\ (round $ b * 1000.0)
        )
      )
    )
    (display anchor4)

  { anchor: anchor5, div: _div5} <- design "random user:" doc bod
  i <- interval 2000
  void $ subscribe 
    ( show <$> sample
              ( pure "Fetching..." <|> Poll \e -> Event \k -> do
                  fiber <- new (pure unit)
                  subscribe e \ff -> do
                    fb <- launchAff do
                      f <- liftEffect $ read fiber
                    
                      killFiber (error "cancelling") f
                      result <- AX.request
                        ( AX.defaultRequest
                            { url = "https://randomuser.me/api/"
                            , method = Left GET
                            , responseFormat = ResponseFormat.json
                            }
                        )

                      liftEffect case result of
                        Left err -> k $ ff (AX.printError err)
                        Right response -> k $ ff
                          (stringifyWithIndent 2 response.body)
                    
                    void $ write fb fiber
              
              )

              (i.event $> ("Here's a random user: " <> _))
    )
    (display anchor5)

  pure (pure unit)
