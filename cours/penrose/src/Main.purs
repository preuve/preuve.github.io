module Main where

import Prelude

import Data.Array ((!!), (..)) as Array
import Data.Array (concat, filter, findIndex, fold, length, mapWithIndex, take, uncons)
import Data.Const (Const)
import Data.Int (toNumber)
import Data.Maybe (Maybe(..), fromJust, maybe)
import Data.Ord (abs) as Ord
import Data.Tuple (Tuple(..))
import Effect (Effect)
import Math (sqrt, pi, atan2)
import Partial.Unsafe (unsafePartial)
import SVGpork.Geometry (Point, Vector, abs, ord, point, rotated, scale, vector, (<+|))
import SVGpork.Render (Context, defaultContext, svgline)
import Spork.App as App
import Spork.Html (Html)
import Spork.Html as H
import Spork.Interpreter (liftNat, merge, never)
import Web.HTML.HTMLElement (HTMLElement, fromElement, getBoundingClientRect)
import Web.UIEvent.MouseEvent (MouseEvent, clientX, clientY)

nth :: forall a. Array a -> Int -> a
nth xs i = unsafePartial $ fromJust $ xs Array.!! i

infix 5 nth as !!

range :: Int -> Int -> Array Int
range a b =
  if a < b
    then Array.(..) a b
    else []

infix 5 range as ..

type Corner =
  { left :: Number
  , top :: Number
  }

data Measure a
  = Measure (Maybe HTMLElement) (Corner -> a) a

getCorner ∷ Measure ~> Effect
getCorner (Measure (Just el) next _) = do
  {bottom, height, left, right, top, width} <- getBoundingClientRect el
  pure $ next {left, top}
getCorner (Measure _ _ none) = pure none

svgWidth = 800 :: Int
svgHeight = 600 :: Int

orig = point "" (toNumber svgWidth/2.0) (toNumber svgHeight/2.0) :: Point

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
  , selected :: Boolean
  , locked :: Boolean
  }

type Mesh = {points :: Array Point, edges :: Array Edge}

vOne :: Number -> Vector
vOne un = vector (point "" 0.0 0.0) (point "" un 0.0)
vPhi :: Number -> Vector
vPhi un = scale phi $ vOne un

defaultEdge :: Length -> Int -> Int -> Edge
defaultEdge length p0 p1 =
   {p0
  , p1
  , length
  , selected: false
  , locked: false}

defaultShape :: Array Edge
defaultShape =
    [ defaultEdge One 0 1
    , defaultEdge Phi 1 2
    , defaultEdge Phi 2 3
    , defaultEdge One 3 0
    ]

-- | Penrose Tile 1 : 2 triangles (phi,phi,1) glued on phi
-- | point is the "flat" arrow head
-- | angle is the inclination in radians of the vector from point to sharp head
vexe :: Number -> Point -> Angle -> Mesh
vexe un q0 a =
  let v0 = rotated a $ vOne un
      q1 = q0 <+| rotated (-a72) v0
      q2 = q0 <+| scale phi v0
      q3 = q0 <+| rotated a72 v0
      points = [q0,q1,q2,q3]
      edges = defaultShape
    in {points, edges}

-- | Penrose Tile 2 : 2 triangles (phi,1,1) glued on 1
-- | point is the "flat" inner arrow head
-- | angle is the inclination in radians of the vector from point to sharp head
cave :: Number -> Point -> Angle -> Mesh
cave un q0 a =
  let v0 = rotated a $ vOne un
      q1 = q0 <+| rotated (-a108) v0
      q2 = q0 <+| v0
      q3 = q0 <+| rotated a108 v0
      points = [q0,q1,q2,q3]
      edges = defaultShape
    in {points, edges}

extensions :: Number -> Length -> Array (Point -> Angle -> Mesh)
extensions un One =
  [ \ q0 a -> vexe un q0 (a-a72)
  , \ q0 a -> vexe un (q0 <+| (rotated a $ vOne un)) (a+a108)
  , \ q0 a -> vexe un (q0 <+| (rotated a $ vOne un)) (a-a108)
  , \ q0 a -> vexe un q0 (a+a72)
  , \ q0 a -> cave un q0 (a-a108)
  , \ q0 a -> cave un q0 (a+a108)
  , \ q0 a -> cave un (q0 <+| (rotated a $ vOne un)) (a+a72)
  , \ q0 a -> cave un (q0 <+| (rotated a $ vOne un)) (a-a72)
  ]

extensions un Phi =
  [ \ q0 a -> vexe un (q0 <+| (rotated (a+a72) $ vOne un)) (a-a36)
  , \ q0 a -> vexe un (q0 <+| (rotated (a-a72) $ vOne un)) (a+a36)
  , \ q0 a -> vexe un (q0 <+| (rotated (a-a36) $ vPhi un)) (a+a144)
  , \ q0 a -> vexe un (q0 <+| (rotated (a+a36) $ vPhi un)) (a-a144)
  , \ q0 a -> cave un (q0 <+| (rotated (a-a36) $ vOne un )) (a+a36)
  , \ q0 a -> cave un (q0 <+| (rotated (a+a36) $ vOne un)) (a-a36)
  , \ q0 a -> cave un (q0 <+| (rotated (a-a36) $ vOne un)) (a+a144)
  , \ q0 a -> cave un (q0 <+| (rotated (a+a36) $ vOne un)) (a-a144)
  ]

type Model =
  { unity :: Number
  , corner :: Maybe Corner
  , tiling :: Mesh
  , propositions :: Array (Point -> Angle -> Mesh)
  , preview :: Maybe Mesh
  , path :: Array (Tuple Int Int)
  }

closeEdge :: Number -> Mesh -> Number -> Number -> Edge -> Boolean
closeEdge un m x y e =
   let q0 = m.points !! e.p0
       q1 = m.points !! e.p1
       xI = (abs q0 + abs q1) / 2.0
       yI = (ord q0 + ord q1) / 2.0
    in (xI - x)*(xI - x) + (yI - y)*(yI - y) < (un / 5.0)*(un / 5.0)

probe :: Number -> Number -> Number -> Mesh -> Mesh
probe un x y m =
  let sample = filter (\ e -> not e.locked) m.edges
      candidates = filter (closeEdge un m x y) sample
      edge =
        if length candidates == 0
          then Nothing
          else Just $ candidates !! 0
  in maybe m {edges = (\e ->
                        if e.locked
                          then e
                          else e{selected = false}) <$> m.edges}
           (\e -> m {edges = (\e' ->
                              if e == e'
                                then e{selected = true}
                                else e') <$> m.edges})
           edge

toggleLock :: Number -> Number -> Model -> Model
toggleLock x y m =
  let candidates =
        filter (closeEdge m.unity m.tiling x y)
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
                      then extensions m.unity e.length
                      else [])
                      <$> tiling.edges

    in {tiling, propositions, preview: m.preview, path: m.path, corner: m.corner, unity: m.unity}

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
    in (Ord.abs (surf q0 q1 q2) + Ord.abs (surf q0 q2 q3)) * 1.05
        >= Ord.abs (surf q0 q1 q)
        +  Ord.abs (surf q1 q2 q)
        +  Ord.abs (surf q2 q3 q)
        +  Ord.abs (surf q3 q0 q)

extend :: Number -> Number -> Model -> Model
extend x y m =
  maybe  m
         (\preview ->
            { tiling: { points: m.tiling.points <> preview.points
                       , edges: m.tiling.edges
                          <> ((\ {p0,p1,selected,locked,length: l} ->
                              { p0: p0 + length m.tiling.points
                              , p1: p1 + length m.tiling.points
                              ,selected
                              ,locked
                              ,length: l}) <$> preview.edges)
                       }
             , propositions: []
             , preview: Nothing
             , path: [Tuple (length m.tiling.points) (length m.tiling.edges)]
                      <> m.path
             , corner: m.corner
             , unity: m.unity
             })
         m.preview

teaser :: Number -> Number -> Model -> Model
teaser x y m =
  let index = findIndex (\i -> inside x y ((m.propositions !! i) (ref i) 0.0))
              $ 0 .. (length m.propositions - 1)

      locked = filter (_.locked) m.tiling.edges
      q0 =
        if length locked == 0
          then Nothing
          else Just $ m.tiling.points !! ((locked !! 0).p0)
      q1 =
        if length locked == 0
          then Nothing
          else Just $ m.tiling.points !! ((locked !! 0).p1)
      angle =
        (\r0 r1 -> atan2 (ord r1 - ord r0) (abs r1 - abs r0)) <$> q0 <*> q1
  in maybe m {preview = Nothing}
           identity
           $ (\ i r0 a ->
            m {preview = Just $ (m.propositions !! i) r0 a})
              <$> index <*> q0 <*> angle

homothecy :: Number -> Point -> Point
homothecy r p = orig <+| (scale (-r) $ vector p orig)

data Action =
  None
  | TransmitRef H.ElementRef
  | SetCorner Corner
  | Probe MouseEvent
  | Chooz MouseEvent
  | Undo
  | Plus
  | Minus

update ∷ Model → Action → App.Transition Measure Model Action
update model =
  case _ of
    None -> App.purely model

    SetCorner corner ->  App.purely model {corner = Just corner}

    TransmitRef href ->
      let effects =
            case href of
              H.Created el -> App.lift $ Measure (fromElement el) SetCorner None
              _            -> mempty
      in {model, effects}

    Probe mouse →
      case model.corner of
        Just {left, top} ->
          let x = (_ - left) $ toNumber $ clientX mouse
              y = (_ - top) $ toNumber $ clientY mouse
            in App.purely $ teaser x y $ model { tiling = probe model.unity x y model.tiling}
        _               -> App.purely model

    Chooz mouse →
      case model.corner of
        Just {left, top} ->
          let x = (_ - left) $ toNumber $ clientX mouse
              y = (_ - top) $ toNumber $ clientY mouse
          in App.purely $ extend x y (toggleLock x y model)
        _               -> App.purely model

    Undo -> App.purely $
      maybe model
            (\ {head: Tuple np ne, tail} ->
              model { tiling = { points: take np model.tiling.points
                           , edges: take ne model.tiling.edges}
                , path = tail
                })
            $ uncons model.path

    Minus -> App.purely $ model { unity = model.unity / 1.1
                                , tiling = model.tiling {points = homothecy (1.0/1.1) <$> model.tiling.points}
                                }
    Plus -> App.purely $ model { unity = model.unity * 1.1
                                , tiling = model.tiling {points = homothecy (1.1) <$> model.tiling.points}
                               }

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
          case edge.selected, edge.locked of
            false, false -> ctx.stroke
            true, false -> purple
            false, true -> red
            _, _ -> ctx.stroke
        q0 = m.points !! edge.p0
        q1 = m.points !! edge.p1
      in svgline (abs q0) (ord q0) (abs q1) (ord q1) stroke ctx.strokeWidth)
       <$> m.edges

render ∷ Model → Html Action
render m =
  let ctx = defaultContext { stroke = grey, strokeWidth = 2.0}

  in H.div []
    [ H.div []
      [ H.button [H.classes ["fa", "fa-minus"], H.onClick $ H.always_ Minus] []
      , H.button [H.classes ["fa", "fa-plus"], H.onClick $ H.always_ Plus] []
      ]
    , H.button [H.classes ["fa", "fa-undo"], H.onClick $ H.always_ Undo] []
    , H.div [ H.ref (H.always TransmitRef)]
      [H.elemWithNS
        (Just $ H.Namespace "http://www.w3.org/2000/svg")
        "svg"
        [ H.attr "width" $ show svgWidth <> "px"
        , H.attr "height" $ show svgHeight <> "px"
        , H.onMouseMove (H.always Probe)
        , H.onMouseDown (H.always Chooz)
        ]
        (mesh ctx m.tiling
        <> (fold $ mesh ctx
              <$> mapWithIndex (\i prop ->
                     prop (ref i) 0.0) m.propositions)
        <> (maybe [] (\msh -> mesh ctx msh) m.preview)
        )
        ]
    ]

ref :: Int -> Point
ref i = point "" (toNumber $ (i+1) * dx) dy

dx = 85 :: Int
dy = 100.0 :: Number
initialUnity = 50.0 :: Number

initialModel :: Model
initialModel =
        { unity: initialUnity
        , corner: Nothing
        , tiling: { points: [orig, orig <+| vOne initialUnity]
                  , edges: [defaultEdge One 0 1]
                  }
        , propositions: []
        , preview: Nothing
        , path: []
        }

app ∷ App.App Measure (Const Void) Model Action
app = { update
      , render
      , init: App.purely initialModel
      , subs: const mempty
      }

main ∷ Effect Unit
main = do
  inst ←
    App.makeWithSelector
      (liftNat getCorner `merge` never)
      app
      "#app"
  inst.run
