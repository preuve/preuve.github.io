module Main where

import Prelude

import Concur.Core (Widget)
import Concur.VDom (HTML)
import Concur.VDom.Run (runWidgetInDom)
import Effect (Effect)
import Effect.Class (liftEffect)
import Concur.VDom.Props (dangerouslySetInnerHTML, onChange, unsafeTextContent, onClick) as P
import KaTeX (equation, inline)
import Concur.VDom.DOM as D
import Concur.VDom.SVG as S
import Concur.VDom.SVG.Geometry (circle, length, point, segment, vector, normalTo, halfline, rename, meets, middle, line, arc, rightangle)
import Concur.VDom.SVG.Render(class Render, render', defaultContext)
import Data.Maybe (Maybe(..))
import Partial.Unsafe(unsafePartial)

type State = {text :: String}

mathWidget :: Widget HTML Unit
mathWidget = unsafePartial $ do
  ktx <- liftEffect $ equation "\\frac{18}{7}"
  exp1 <- liftEffect $ inline "x^2"
  exp2 <- liftEffect $ inline "x \\times x"
  
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
  D.div'
    [ D.label [P.dangerouslySetInnerHTML ktx] []
    , D.label [P.dangerouslySetInnerHTML exp1] []
    , D.label'  [D.text " signifie "]
    , D.label [P.dangerouslySetInnerHTML exp2] []
    , S.svg
      [ S.width "500"
      , S.height "300"
      , S.viewBox "0 0 1000 800"
      ] $   draw [a,b,e,i,f,h1,h2,h,j]
        <> draw [c,g]
        <> draw d
        <> draw eb
        <> (draw $ line a b)
        <> (draw $ arc (vector i f) i (vector i b) 50.0 
                        false false true $ Just "α")
        <> (draw $ segment i j $ Just "")
        <> (render' ctx{strokeWidth = 2.0} $ segment i f $ Just "u")
        <> (draw $ rightangle (vector a b) a (vector a e) 15.0)
     ]

main :: Effect Unit
main = runWidgetInDom "main"
           $ mathWidget 
