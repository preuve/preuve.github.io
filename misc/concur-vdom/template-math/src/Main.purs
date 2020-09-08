module Main where

import Prelude

import Article (equation, fromIncremental, get, m, nl, put, t, validateInput, setTitle)
import Concur.Core (Widget)
import Concur.Core.FRP (dyn, display, debounce)
import Concur.VDom (HTML)
import Concur.VDom.Run (runWidgetInDom)
import Effect (Effect)
import Concur.VDom.Props (onChange, unsafeTargetValue, onKeyEnter, attr, autoFocus) as P
import Concur.VDom.DOM as D
import Concur.VDom.SVG as S
import Concur.VDom.SVG.Geometry (circle, length, point, segment, vector, normalTo, halfline, rename, meets, middle, line, arc, rightangle)
import Concur.VDom.SVG.Render(class Render, render', defaultContext)
import Data.Maybe (Maybe(..), fromMaybe, maybe)
import Data.Ord (abs)
import Partial.Unsafe(unsafePartial)
import Rand (Rand, rand)

type State = { seed :: Maybe String
             , enabled :: Boolean 
             }

intMax = 7 :: Int

randPositive :: Rand -> Rand
randPositive r =
  if r.val `mod` intMax == 0
    then randPositive (rand r)
    else r

header :: forall a. Widget HTML a
header = D.div' $ fromIncremental $ do
  setTitle "Devoir 10 : Suites arithmétiques / Suites géométriques / Fonctions dérivées"
  nl
  put $ D.div [ P.attr "style" "display: grid; grid-template-columns: 1fr 1fr 1fr;"]
      [ D.label [] [D.text "Nom:"]
      , D.label [] [D.text "Prénom:"]
      , D.label [] [D.text "Classe:"]
      ]
  put $ D.ul []
      [ D.li [] [D.text "10 questions : pour chacune d'elle, indiquer la (ou les) bonne(s) réponse(s)"]
      , D.li [] (fromIncremental $ do
           t "1 point par question"
           get)
      , D.li [] [D.text "sans document"]
      , D.li [] [D.text "calculatrice autorisée"]
      ]
  get


body :: State -> Widget HTML State
body st = unsafePartial $ dyn $ do
  newState <- debounce 50.0 st $ 
                \s -> D.input 
                        [ P.autoFocus true
                        , (\ x -> { seed: show <$> (validateInput $ Just x)
                                  , enabled: false
                                  }
                          )  <$> P.unsafeTargetValue 
                             <$> P.onChange
                        , s { enabled = maybe false (const true) 
                                        $ validateInput s.seed} <$ P.onKeyEnter
                        ]
  let odd = 2 * abs (fromMaybe 0 $ validateInput newState.seed) + 1
      r0 = rand { val: odd
                , gen: 0
                , seed: odd*odd
                }

  let ctx = defaultContext { strokeWidth = 1.0}
  let draw :: forall a b. Render a => a -> Array (Widget HTML b)
      draw = render' ctx 
      
  let a = point "A" 310.0 320.0
  let b = point "B" 100.0 210.0
  let c = circle a (length $ vector a b)
  let n = normalTo $ vector a b
  let d = halfline a n
  let [e] = (rename "E") <$> (d `meets` c)
  let eb = segment e b Nothing
  let i = middle "I" eb
  let [f] = (rename "F") <$> c `meets` (halfline a (vector b a))
  let g = circle f (length $ vector i e)
  let [h1,h2] = g `meets` c
  let [h] = (rename "H") <$> (line a e) `meets` (line i f)
  -- The following line is useless but valid:
  let [] = (segment b h Nothing) `meets` (segment e f Nothing)
  let [j] = (rename "J") <$> (halfline b (vector b h)) `meets` 
                              (segment e f Nothing)
                              
  display $ D.div' $ 
    if not newState.enabled 
      then []
      else fromIncremental $ do
        equation $ "\\frac{18}{7}" <> fromMaybe "" newState.seed
        m "x^2"
        t " signifie "
        m "x\\times x"
        nl
        t "Et "
        m "\\frac{2}{3}"
        t " est irréductible."
        put $ S.svg
          [ S.width "500"
          , S.height "300"
          , S.viewBox "0 0 1000 800"
          ] $  draw [a,b,e,i,f,h1,h2,h,j]
            <> draw [c,g ]
            <> draw d
            <> draw eb
            <> (draw $ line a b)
            <> (draw $ arc (vector i f) i (vector i b) 50.0 
                            false false true $ Just "α")
            <> (draw $ segment i j $ Just "")
            <> (render' ctx{strokeWidth = 2.0} $ segment i f $ Just "u")
            <> (draw $ rightangle (vector a b) a (vector a e) 15.0)
        get
  
initialState = { seed: Nothing 
               , enabled: false
               } :: State

article :: State -> Widget HTML State
article state =
  D.div'
    [ header
    , body state
    ]

main :: Effect Unit
main = runWidgetInDom "main"
           $ article initialState
