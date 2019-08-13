module Main where

import Prelude
import Effect (Effect)
import Data.Maybe(Maybe(..))
import Partial.Unsafe(unsafePartial)
import Graphics.Canvas (CanvasElement, getCanvasElementById, getContext2D)
import Color (rgb)
import Graphics.Canvas.Geometry
import KaTeX
import Math as Math

main :: Effect Unit
main = void $ unsafePartial do
  _ <- setBodyBackground "#635351"
  Just canvas <- getCanvasElementById "canvas"
  _ <- setAttribute "width" "400" canvas
  _ <- setAttribute "height" "600" canvas
  context2D <- getContext2D canvas
  
  let ctx = { context2D
            , color: rgb 195 194 199
            , lineWidth: 1.50}
  let draw :: forall a. DrawableSet a => a -> Effect Unit
      draw = drawIn ctx 
  
  setTitle "Formules d'addition du sinus et du cosinus"
  
  raw "Sur le cercle trigonométrique du repère "
  let i = "\\overrightarrow{\\imath}"
  let j = "\\overrightarrow{\\jmath}"
  let par x y = "("<>x<>","<>y<>")"
  
  render $ "(O,"<>i<>","<>j<>")"
  raw ", on place "
  let oa = "\\overrightarrow{OA}"
  let oa' = "\\overrightarrow{OA'}"
  let ob = "\\overrightarrow{OB}"
  list [ cat [subrender "A", subraw ", tel que ", subrender $ par i oa <> "=a"]
       , cat [subrender "B", subraw ", tel que ", subrender $ par i ob <> "=a+b"]
       , cat [subrender "A'", subraw ", tel que ", subrender $ par oa oa' <> "=\\frac{\\pi}{2}"]]
  
  let origx = 95.0
  let origy = 350.0
  let unity = 260.0
  let po = point "O" origx origy
  let pi = point "I" (origx + unity) origy
  let pj = point "J" origx (origy - unity)
  let vi = vector po pi
  let vj = vector po pj
  let trigo = circle po (length vi)
  draw po
  draw $ segment po pi $ Just ""
  draw $ segment po pj $ Just ""
  draw trigo
   
  let angleA = -0.35
  let voa = rotated angleA vi
  let pa = rename "A" $ po <+| voa
  draw pa
  draw $ segment po pa $ Just ""
  draw $ arc vi po voa (unity*0.4) false true $ Just "   a"
  
  let angleB = -0.5
  let vob = rotated angleB vi
  let pb = rename "B" $ po <+| vob
  draw pb
  draw $ segment po pb $ Just ""
  draw $ arc vi po vob (unity*0.75) false true $ Just "     a+b"
  
  let angleA' = angleA - Math.pi/2.0
  let voa' = rotated angleA' vi
  let pa' = rename "A'" $ po <+| voa'
  draw pa'
  draw $ segment po pa' $ Just ""
  draw $ rightangle vi po vj (unity / 15.0)
  draw $ rightangle voa po voa' (unity / 6.0)
  
  raw "Par la relation de Chasles, "
  render $ par oa ob <> "=" <> par oa i <> "+" <> par i ob <> "."
  newline
  raw "Donc par construction, "
  render $ par oa ob <> "= -" <> par i oa <> "+" <> par i ob <> "=-a+b-a=b."
  newline
  newline
  raw "Par définition, "
  render $ ob<>"=\\cos(a+b)"<>i<>"+\\sin(a+b)"<>j<>"."
  newline
  raw "Mais comme "
  render $ "(O,"<>oa<>","<>oa'<>")"
  raw " est aussi un repère orthonormé, on a aussi"
  newline
  newline
  equation $ ob<>"=\\cos"<>par oa ob<>oa<>"+"<>"\\sin"<>par oa ob<>oa'<>"."
  raw "Or "
  render $ oa <> "=" <> "\\cos(a)"<>i<>"+\\sin(a)"<>j
  raw " et "
  render $ oa' <> "=" <> "\\cos(a+\\frac{\\pi}{2})"<>i<>"+\\sin(a+\\frac{\\pi}{2})"<>j<>"."
  newline
  raw "Donc"
  equation $ ob<>"=\\cos(b)\\left(\\cos(a)"<>i<>"+\\sin(a)"<>j<>"\\right)"<>"+\\sin(b)\\left(-\\sin(a)"<>i<>"+\\cos(a)"<>j<>"\\right)"<>"."
  raw "Puis par unicité de la décomposition dans une base orthonormée"
  newline
  newline
  equation "\\bigg\\{\\begin{array}{l}\\cos(a+b)=\\cos(a)\\cos(b)-\\sin(a)\\sin(b)\\\\ \\sin(a+b)=\\sin(a)\\cos(b)+\\sin(b)\\cos(a) \\end{array}"
  pure unit
  
