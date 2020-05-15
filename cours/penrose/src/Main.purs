module Main where

import Prelude

import Data.Array ((!!)) as Array
import Data.Array (filter, length)
import Data.Int (toNumber)
import Data.Maybe (Maybe(..), fromJust, maybe)
import Effect (Effect)
import Math (sqrt, pi)
import Partial.Unsafe (unsafePartial)
import SVGpork.Geometry (Point, abs, ord, point, rotated, scale, vector, (<+|))
import SVGpork.Render (Context, defaultContext, svgline)
import Spork.Html (Html)
import Spork.Html as H
import Spork.PureApp (PureApp)
import Spork.PureApp as PureApp
import Web.UIEvent.MouseEvent (MouseEvent, pageX, pageY)

nth :: forall a. Array a -> Int -> a
nth xs i = unsafePartial $ fromJust $ xs Array.!! i

infix 5 nth as !!

un = 50.0 :: Number
svgWidth = 800.0 :: Number
svgHeight = 600.0 :: Number

orig = point "" (svgWidth/2.0) (svgHeight/2.0) :: Point

type Angle = Number

phi = (1.0+sqrt 5.0)/2.0 :: Number

type Edge = {p0 :: Int, p1 :: Int, selected :: Boolean}
type Mesh = {points :: Array Point, edges :: Array Edge}

-- | Penrose Tile 1 : 2 triangles (phi,phi,1) glued on phi
-- | point is the "flat" arrow head
-- | angle is the inclination in radians of the vector from point to sharp head
vexe :: Point -> Angle -> Mesh
vexe q0 a =
  let v0 = rotated a $ vector (point "" 0.0 0.0) (point "" un 0.0)
      q1 = q0 <+| rotated (-2.0*pi/5.0) v0
      q2 = q0 <+| scale phi v0
      q3 = q0 <+| rotated (2.0*pi/5.0) v0
      points = [q0,q1,q2,q3]
      edges =
        [ {p0: 0, p1: 1, selected: false}
        , {p0: 1, p1: 2, selected: false}
        , {p0: 2, p1: 3, selected: false}
        , {p0: 3, p1: 0, selected: false}
      ]
    in {points, edges}

type State = Mesh

data Action = Probe MouseEvent

probe :: Number -> Number -> Mesh -> Mesh
probe x y m =
  let close e =
       let q0 = m.points !! e.p0
           q1 = m.points !! e.p1
           xI = (abs q0 + abs q1) / 2.0
           yI = (ord q0 + ord q1) / 2.0
        in (xI - x)*(xI - x)+(yI - y)*(yI - y) < (un / 5.0)*(un / 5.0)
      candidates = filter close m.edges
      edge =
        if length candidates == 0
          then Nothing
          else Just $ candidates !! 0
  in maybe m {edges = (_{selected=false}) <$> m.edges}
           (\e -> m{edges = (\e' -> if e==e' then e{selected=true} else e') <$> m.edges})
           edge

update ∷ State → Action → State
update m = case _ of
  Probe mouse →
    let x = toNumber $ pageX mouse
        y = toNumber $ pageY mouse
      in probe x y m

type Color = String

white = "#FFFFFF" :: Color
beige = "#FFFFAF" :: Color
blue = "#0602c6" :: Color
lightblue = "#060236" :: Color
purple = "#B314CB" :: Color
grey = "#050409" :: Color

mesh :: forall action. Context -> Mesh -> Array (Html action)
mesh ctx m =
  (\edge ->
    let stroke =
          if edge.selected
            then purple
            else ctx.stroke
        q0 = m.points !! edge.p0
        q1 = m.points !! edge.p1
      in svgline (abs q0) (ord q0) (abs q1) (ord q1) stroke ctx.strokeWidth)
       <$> m.edges

render ∷ State → Html Action
render m =
  let ctx = defaultContext { stroke = lightblue, strokeWidth = 2.0}

  in H.elemWithNS
        (Just $ H.Namespace "http://www.w3.org/2000/svg")
        "svg"
        [ H.attr "width" "800px"
        , H.attr "height" "600px"
        , H.onMouseMove (H.always Probe)
        {-, H.onMouseDown (H.always StartDragging)
        , H.onMouseUp (H.always_ EndDragging)
        ,
        -}
        ]
        (mesh ctx m

        {-
        <> page ctx model
        <> (render' ctx $ frame functionDisplay)
        <> (render' ctx $ frame diffDisplay)
        <> (render' ctx{stroke = blue} $ cursor functionDisplay)
        <> (render' ctx{stroke = blue} $ cursor diffDisplay)
        -}
        )



app ∷ PureApp State Action
app = { update, render, init: vexe orig 0.0}

main ∷ Effect Unit
main = void $ PureApp.makeWithSelector app "#app"
