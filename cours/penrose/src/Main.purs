module Main where

import Prelude
import Data.Ord (abs) as Ord

import Data.Array ((!!)) as Array
import Data.Array (concat, filter, findIndex, fold, length, mapWithIndex, (..))
import Data.Int (toNumber)
import Data.Maybe (Maybe(..), fromJust, maybe)
import Effect (Effect)
import Math (sqrt, pi, atan2)
import Partial.Unsafe (unsafePartial)
import SVGpork.Geometry (Point, Vector, abs, ord, point, rotated, scale, vector, (<+|))
import SVGpork.Render (Context, defaultContext, svgline)
import Spork.Html (Html)
import Spork.Html as H
import Spork.PureApp (PureApp)
import Spork.PureApp as PureApp
import Web.UIEvent.MouseEvent (MouseEvent, clientX, clientY)

nth :: forall a. Array a -> Int -> a
nth xs i = unsafePartial $ fromJust $ xs Array.!! i

infix 5 nth as !!

un = 50.0 :: Number
svgWidth = 800.0 :: Number
svgHeight = 600.0 :: Number

orig = point "" (svgWidth/2.0) (svgHeight/2.0) :: Point

type Angle = Number

phi = (1.0 + sqrt 5.0) / 2.0 :: Number

a36 = pi / 5.0        :: Angle
a54 = 3.0 * pi / 10.0 :: Angle
a72 = 2.0 * pi / 5.0  :: Angle
a108 = 3.0 * pi / 5.0 :: Angle
a144 = 4.0 * pi / 5.0 :: Angle

data Length = One | Phi
derive instance eqLength :: Eq Length

instance showLength :: Show Length where
  show One = "One"
  show Phi = "Phi"

type Edge =
  { p0 :: Int
  , p1 :: Int
  , length :: Length
  , active :: Boolean
  , selected :: Boolean
  , locked :: Boolean
  }

type Mesh = {points :: Array Point, edges :: Array Edge}

vOne = vector (point "" 0.0 0.0) (point "" un 0.0) :: Vector
vPhi = scale phi vOne :: Vector

-- | Penrose Tile 1 : 2 triangles (phi,phi,1) glued on phi
-- | point is the "flat" arrow head
-- | angle is the inclination in radians of the vector from point to sharp head
vexe :: Point -> Angle -> Mesh
vexe q0 a =
  let v0 = rotated a vOne
      q1 = q0 <+| rotated (-a72) v0
      q2 = q0 <+| scale phi v0
      q3 = q0 <+| rotated a72 v0
      points = [q0,q1,q2,q3]
      edges =
        [ {p0: 0, p1: 1, length: One, active: true, selected: false, locked: false}
        , {p0: 1, p1: 2, length: Phi, active: true, selected: false, locked: false}
        , {p0: 2, p1: 3, length: Phi, active: true, selected: false, locked: false}
        , {p0: 3, p1: 0, length: One, active: true, selected: false, locked: false}
      ]
    in {points, edges}

-- | Penrose Tile 2 : 2 triangles (phi,1,1) glued on 1
-- | point is the "flat" inner arrow head
-- | angle is the inclination in radians of the vector from point to sharp head
cave :: Point -> Angle -> Mesh
cave q0 a =
  let v0 = rotated a vOne
      q1 = q0 <+| rotated (-a108) v0
      q2 = q0 <+| v0
      q3 = q0 <+| rotated a108 v0
      points = [q0,q1,q2,q3]
      edges =
        [ {p0: 0, p1: 1, length: One, active: true, selected: false, locked: false}
        , {p0: 1, p1: 2, length: Phi, active: true, selected: false, locked: false}
        , {p0: 2, p1: 3, length: Phi, active: true, selected: false, locked: false}
        , {p0: 3, p1: 0, length: One, active: true, selected: false, locked: false}
      ]
    in {points, edges}

extensions :: Length -> Array (Point -> Angle -> Mesh)
extensions One =
  [ \ q0 a -> vexe q0 (a-a72)
  , \ q0 a -> vexe (q0 <+| vOne) (a+a108)
  , \ q0 a -> vexe (q0 <+| vOne) (a-a108)
  , \ q0 a -> vexe q0 (a+a72)
  , \ q0 a -> cave q0 (a-a108)
  , \ q0 a -> cave q0 (a+a108)
  , \ q0 a -> cave (q0 <+| vOne) (a+a72)
  , \ q0 a -> cave (q0 <+| vOne) (a-a72)
  ]

extensions Phi =
  [ \ q0 a -> vexe (q0 <+| rotated a72 vOne) (a-a36)
  , \ q0 a -> vexe (q0 <+| rotated (-a72) vOne) (a+a36)
  , \ q0 a -> vexe (q0 <+| rotated (-a36) vPhi) (a+a144)
  , \ q0 a -> vexe (q0 <+| rotated a36 vPhi) (a-a144)
  , \ q0 a -> cave (q0 <+| rotated (-a36) vOne) (a+a36)
  , \ q0 a -> cave (q0 <+| rotated a36 vOne) (a-a36)
  , \ q0 a -> cave (q0 <+| rotated (-a36) vOne) (a+a144)
  , \ q0 a -> cave (q0 <+| rotated a36 vOne) (a-a144)
  ]

type State =
  { tiling :: Mesh
  , propositions :: Array (Point -> Angle -> Mesh)
  , preview :: Maybe Mesh
  }

data Action =
    Probe MouseEvent
  | Chooz MouseEvent

closeEdge :: Mesh -> Number -> Number -> Edge -> Boolean
closeEdge m x y e =
   let q0 = m.points !! e.p0
       q1 = m.points !! e.p1
       xI = (abs q0 + abs q1) / 2.0
       yI = (ord q0 + ord q1) / 2.0
    in (xI - x)*(xI - x) + (yI - y)*(yI - y) < (un / 5.0)*(un / 5.0)

probe :: Number -> Number -> Mesh -> Mesh
probe x y m =
  let sample = filter (\ e -> e.active && not e.locked) m.edges
      candidates = filter (closeEdge m x y) sample
      edge =
        if length candidates == 0
          then Nothing
          else Just $ candidates !! 0
  in maybe m {edges = (\e -> if e.locked then e else e{selected = false}) <$> m.edges}
           (\e -> m{edges = (\e' -> if e == e' then e{selected = true} else e') <$> m.edges})
           edge

toggleLock :: Number -> Number -> State -> State
toggleLock x y m =
  let candidates =
        filter (closeEdge m.tiling x y)
          $ filter (\e -> e.selected || e.locked) m.tiling.edges
      edge =
        if length candidates == 0
          then Nothing
          else Just $ candidates !! 0

      tiling =
        maybe m.tiling
              (\e -> m.tiling{edges = (\e' ->
                              if e == e'
                                then e{ locked = not e.locked
                                      , selected = e.locked}
                                else e'{locked = false})
                              <$> m.tiling.edges})
              edge

      propositions =
        concat $ (\ e ->
                    if e.locked
                      then extensions e.length
                      else [])
                      <$> tiling.edges

    in {tiling, propositions, preview: m.preview}

det :: Point -> Point -> Number
det p0 p1 = abs p0 * ord p1 - abs p1 * ord p0

surf :: Point -> Point -> Point -> Number
surf q0 q1 q2 =
  0.5 * (det q0 q1 + det q1 q2 + det q2 q0)

inside :: Number -> Number -> Mesh -> Boolean
inside x y m =
  let q0 = m.points !! 0
      q1 = m.points !! 1
      q2 = m.points !! 2
      q3 = m.points !! 3
      q = point "" x y
    in Ord.abs (surf q0 q1 q2) + Ord.abs (surf q0 q2 q3)
        >= Ord.abs (surf q0 q1 q)
        +  Ord.abs (surf q1 q2 q)
        +  Ord.abs (surf q2 q3 q)
        +  Ord.abs (surf q3 q0 q)

merge :: Mesh -> Mesh -> Mesh
merge tiling proposition = proposition

extend :: Number -> Number -> State -> State
extend x y m =
  let index = findIndex (\i -> inside x y ((m.propositions !! i) (ref i) 0.0))
                $ 0 .. (length m.propositions - 1)
      proposition =  (\i -> (m.propositions !! i) (ref i) 0.0) <$> index
  in maybe  m
            (\prop ->  { tiling: merge m.tiling prop
                       , propositions: []
                       , preview: Nothing
                       })
            proposition

teaser :: Number -> Number -> State -> State
teaser x y m =
  let index = findIndex (\i -> inside x y ((m.propositions !! i) (ref i) 0.0))
              $ 0 .. (length m.propositions - 1)
      locked = maybe Nothing (const $ Just $ (filter (_.locked) m.tiling.edges) !! 0) index
      q0 = maybe Nothing (\lckd -> Just $ m.tiling.points !! (lckd.p0)) locked
      q1 = maybe Nothing (\lckd -> Just $ m.tiling.points !! (lckd.p1)) locked
      angle = (\r0 r1 -> atan2 (ord r1 - ord r0) (abs r1 - abs r0)) <$> q0 <*> q1
  in maybe m identity $ (\ i r0 a -> m {preview = Just $ (m.propositions !! i) r0 a}) <$> index <*> q0 <*> angle
  {-maybe  m
            (\i ->  m{ preview = Just $ (m.propositions !! i) q0 angle})
            index
-}
update ∷ State → Action → State
update m =
 case _ of
    Probe mouse →
        let x = (_ - 5.0) $ toNumber $ clientX mouse
            y = (_ - 5.0) $ toNumber $ clientY mouse
        in teaser x y $ m { tiling = probe x y m.tiling}
    Chooz mouse →
        let x = (_ - 5.0) $ toNumber $ clientX mouse
            y = (_ - 5.0) $ toNumber $ clientY mouse
    in extend x y (toggleLock x y m)

type Color = String

white = "#FFFFFF" :: Color
beige = "#FFFFAF" :: Color
blue = "#0602c6" :: Color
lightblue = "#060276" :: Color
purple = "#B314CB" :: Color
grey = "#050409" :: Color
red = "#FF0000" :: Color

mesh :: forall action. Context -> Mesh -> Array (Html action)
mesh ctx m =
  (\edge ->
    let stroke =
          case edge.active, edge.selected, edge.locked of
            true, false, false -> ctx.stroke
            false, _, _ -> grey
            true, true, false -> purple
            true, false, true -> red
            _, _, _ -> ctx.stroke
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
        , H.onMouseDown (H.always Chooz)
        ]
        (mesh ctx m.tiling
        <> (fold $ mesh ctx
              <$> mapWithIndex (\i prop ->
                     prop (ref i) 0.0) m.propositions)
        <> (maybe [] (\msh -> mesh ctx msh) m.preview)
        )

ref :: Int -> Point
ref i = point "" (toNumber $ (i+1) * dx) dy

dx = 85 :: Int
dy = 100.0 :: Number

app ∷ PureApp State Action
app = { update, render, init: {tiling: vexe orig 0.0, propositions: [], preview: Nothing}}

main ∷ Effect Unit
main = void $ PureApp.makeWithSelector app "#app"
