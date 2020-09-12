module Main where

import Prelude

import Article( equation, fromIncremental, get, m, nl, put, setTitle, t )
import Concur.Core (Widget)
import Concur.VDom (HTML)
import Concur.VDom.Run (runWidgetInDom)
import Concur.VDom.DOM as D
import Concur.VDom.Props as P
import Concur.VDom.SVG as S
import Data.Geometry.Plane (arc, circle, length, point, rename, rightangle, rotated, segment, vector, (<+|))
import Concur.VDom.GeometryRender (class Render, defaultContext, render')
import Data.Maybe (Maybe (..))
import Effect (Effect)
import Math as Math

main :: Effect Unit
main = runWidgetInDom "main" $ D.div' $ fromIncremental do
  setTitle "Formules d'addition du sinus et du cosinus"
  put $
    D.div
      [ P.attr "style" "display: grid; grid-template-columns: 2fr 3fr;"
      ]
      [ S.svg
        [ S.width "600"
        , S.height "100%"
        ] $   let ctx = defaultContext { strokeWidth = 1.0
                                       , stroke = "#c3c2c7"
                                       , textFill = "#c3c2c7"
                                       }
                  draw :: forall a b. Render a => a -> Array (Widget HTML b)
                  draw = render' ctx 
    
                  origx = 95.0
                  origy = 350.0
                  unity = 260.0
                  po = point "O" origx origy
                  pi = point "I" (origx + unity) origy
                  pj = point "J" origx (origy - unity)
                  vi = vector po pi
                  vj = vector po pj
                  trigo = circle po (length vi)
                  
                  angleA = -0.35
                  voa = rotated angleA vi
                  pa = rename "A" $ po <+| voa
    
                  angleB = -0.5
                  vob = rotated angleB vi
                  pb = rename "B" $ po <+| vob
    
                  angleA' = angleA - Math.pi/2.0
                  voa' = rotated angleA' vi
                  pa' = rename "A'" $ po <+| voa'

                in   draw po
                  <> (draw $ segment po pi $ Just "")
                  <> (draw $ segment po pj $ Just "")
                  <> draw trigo
                  <> draw pa
                  <> (draw $ segment po pa $ Just "")
                  <> (draw $ arc vi po voa (unity*0.4) false true false $ Just "   a")
                  <> draw pb
                  <> (draw $ segment po pb $ Just "")
                  <> (draw $ arc vi po vob (unity*0.75) false true false $ Just "     a+b")
                  <> (draw pa')
                  <> (draw $ segment po pa' $ Just "")
                  <> (draw $ rightangle vi po vj (unity / 15.0))
                  <> (draw $ rightangle voa po voa' (unity / 6.0))

      , D.div' $ fromIncremental $ do
          t "Sur le cercle trigonométrique du repère "
          let i = "\\overrightarrow{\\imath}"
          let j = "\\overrightarrow{\\jmath}"
          let par x y = "("<>x<>","<>y<>")"

          m $ "(O,"<>i<>","<>j<>")"
          t ", on place "
          let oa = "\\overrightarrow{OA}"
          let oa' = "\\overrightarrow{OA'}"
          let ob = "\\overrightarrow{OB}"
          put $ D.ul []
            [ D.li [] $ fromIncremental do 
                m "A"
                t ", tel que "
                m $ par i oa <> "=a"
                get
            , D.li [] $ fromIncremental do
                  m "B"
                  t ", tel que "
                  m $ par i ob <> "=a+b"
                  get

             , D.li [] $ fromIncremental do 
                  m "A'"
                  t ", tel que "
                  m $ par oa oa' <> "= \\frac{\\pi}{2}"
                  get
              ]

          t "Par la relation de Chasles, "
          m $ par oa ob <> "=" <> par oa i <> "+" <> par i ob <> "."
          nl
          t "Donc par construction, "
          m $ par oa ob <> "= -" <> par i oa <> "+" <> par i ob <> "=-a+b-a=b."
          nl
          nl
          t "Par définition, "
          m $ ob<>"=\\cos(a+b)"<>i<>"+\\sin(a+b)"<>j<>"."
          nl
          t "Mais comme "
          m $ "(O,"<>oa<>","<>oa'<>")"
          t " est aussi un repère orthonormé, on a aussi"
          nl
          nl
          equation $ ob<>"=\\cos"<>par oa ob<>oa<>"+"<>"\\sin"<>par oa ob<>oa'<>"."
          t "Or "
          m $ oa <> "=" <> "\\cos(a)"<>i<>"+\\sin(a)"<>j
          t " et "
          m $ oa' <> "=" <> "\\cos(a+\\frac{\\pi}{2})"<>i<>"+\\sin(a+\\frac{\\pi}{2})"<>j<>"."
          nl
          t "Donc"
          equation $ ob<>"=\\cos(b)\\left(\\cos(a)"<>i<>"+\\sin(a)"<>j<>"\\right)"<>"+\\sin(b)\\left(-\\sin(a)"<>i<>"+\\cos(a)"<>j<>"\\right)"<>"."
          t "Puis par unicité de la décomposition dans une base orthonormée"
          nl
          nl
          equation "\\bigg\\{\\begin{array}{l}\\cos(a+b)=\\cos(a)\\cos(b)-\\sin(a)\\sin(b)\\\\ \\sin(a+b)=\\sin(a)\\cos(b)+\\sin(b)\\cos(a) \\end{array}"
          get
      ]
  get
 