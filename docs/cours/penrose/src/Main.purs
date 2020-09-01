module Main where

import Prelude

import Control.Apply (lift2)
import Data.Array ((!!), (..)) as Array
import Data.Array (concat, filter, findIndex, fold, length, mapWithIndex, take, uncons)
import Data.Const (Const)
import Data.Int (toNumber)
import Data.Maybe (Maybe(..), fromJust, maybe)
import Data.Ord (abs) as Ord
import Data.Traversable (find)
import Data.Tuple (Tuple(..))
import Effect (Effect)
import Math (sqrt, pi, atan2)
import Partial.Unsafe (unsafePartial)
import SVGpork.Geometry (length) as Geo
import SVGpork.Geometry (Point, Vector, abs, ord, point, rotated, scale, vector, (<+|), segment, middle)
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
  { bottom, height, left, right, top, width } <- getBoundingClientRect el
  pure $ next { left, top }
getCorner (Measure _ _ none) = pure none

svgWidth = 800 :: Int
svgHeight = 600 :: Int

orig = point "" (toNumber svgWidth / 2.0) (toNumber svgHeight / 2.0) :: Point

type Angle = Number

phi = (1.0 + sqrt 5.0) / 2.0 :: Number

a36 = pi / 5.0        :: Angle
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
  , opposed :: Boolean
  }

type Mesh =
  { points :: Array Point
  , edges :: Array Edge
  }

vOne :: Number -> Vector
vOne un = vector (point "" 0.0 0.0) (point "" un 0.0)
vPhi :: Number -> Vector
vPhi un = scale phi $ vOne un

defaultEdge :: Length -> Int -> Int -> Boolean -> Edge
defaultEdge length p0 p1 opposed =
    { p0
    , p1
    , length
    , selected: false
    , locked: false
    , opposed
    }

defaultShape :: Boolean -> Array Edge
defaultShape opposed =
    [ defaultEdge One 0 1 opposed
    , defaultEdge Phi 1 2 $ not opposed
    , defaultEdge Phi 2 3 $ opposed
    , defaultEdge One 3 0 $ not opposed
    ]

-- | Penrose Kite : 2 triangles (phi,phi,1) glued on phi
-- | point is the "flat" arrow head
-- | angle is the inclination in radians of the vector from point to sharp head
vexe :: Number -> Point -> Angle -> Mesh
vexe un q0 a =
  let v0 = rotated a $ vOne un
      q1 = q0 <+| rotated (-a72) v0
      q2 = q0 <+| scale phi v0
      q3 = q0 <+| rotated a72 v0
      points = [q0,q1,q2,q3]
      edges = defaultShape true
    in {points, edges}

-- | Penrose Dart : 2 triangles (phi,1,1) glued on 1
-- | point is the "flat" inner arrow head
-- | angle is the inclination in radians of the vector from point to sharp head
cave :: Number -> Point -> Angle -> Mesh
cave un q0 a =
  let v0 = rotated a $ vOne un
      q1 = q0 <+| rotated (-a108) v0
      q2 = q0 <+| v0
      q3 = q0 <+| rotated a108 v0
      points = [q0,q1,q2,q3]
      edges = defaultShape false
    in {points, edges}

extensions :: Number -> Boolean -> Length -> Array (Point -> Angle -> Mesh)
extensions un opposed One =
  if opposed
    then
      [ \ q0 a -> vexe un q0 (a-a72)
      , \ q0 a -> vexe un q0 (a+a72)
      , \ q0 a -> cave un (q0 <+| (rotated a $ vOne un)) (a+a72)
      , \ q0 a -> cave un (q0 <+| (rotated a $ vOne un)) (a-a72)
      ]
    else
      [ \ q0 a -> vexe un (q0 <+| (rotated a $ vOne un)) (a+a108)
      , \ q0 a -> vexe un (q0 <+| (rotated a $ vOne un)) (a-a108)
      , \ q0 a -> cave un q0 (a-a108)
      , \ q0 a -> cave un q0 (a+a108)
      ]

extensions un opposed Phi =
  if opposed
    then
      [ \ q0 a -> vexe un (q0 <+| (rotated (a-a36) $ vPhi un)) (a+a144)
      , \ q0 a -> vexe un (q0 <+| (rotated (a+a36) $ vPhi un)) (a-a144)
      , \ q0 a -> cave un (q0 <+| (rotated (a-a36) $ vOne un )) (a+a36)
      , \ q0 a -> cave un (q0 <+| (rotated (a+a36) $ vOne un)) (a-a36)
      ]
    else
      [ \ q0 a -> vexe un (q0 <+| (rotated (a+a72) $ vOne un)) (a-a36)
      , \ q0 a -> vexe un (q0 <+| (rotated (a-a72) $ vOne un)) (a+a36)
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

closeEdge :: Number -> Mesh -> Point -> Edge -> Boolean
closeEdge un m q e =
   let q0 = m.points !! e.p0
       q1 = m.points !! e.p1
       qI = middle "" $ segment q0 q1 Nothing
    in Geo.length (vector q qI) < (un / 5.0)

probe :: Number -> Point -> Mesh -> Mesh
probe un q m =
  let sample = filter (\ e -> not e.locked) m.edges
      edge = find (closeEdge un m q) sample
  in maybe m {edges = ifM (_.locked)
                          identity
                          (_ { selected = false }) <$> m.edges}
           (\e -> m {edges = ifM (_ == e)
                                 (_ { selected = true })
                                 identity <$> m.edges}
           )
           edge

toggleLock :: Point -> Model -> Model
toggleLock q m =
  let sample = filter (\e -> e.selected || e.locked) m.tiling.edges
      edge = find (closeEdge m.unity m.tiling q) sample

      tiling' =
        maybe m.tiling
              (\e -> m.tiling { edges =
                                  ifM (_ == e) (_ { locked = not e.locked
                                                  , selected = e.locked
                                                  }
                                               )
                                               (_ { locked = false})
                                      <$> m.tiling.edges
                              }
              )
              edge

      propositions' =
        concat $ ifM (_.locked) (lift2 (extensions m.unity) _.opposed _.length) (const [])
                      <$> tiling'.edges

    in m { tiling = tiling'
         , propositions = propositions'
         }

det :: Point -> Point -> Number
det p0 p1 = abs p0 * ord p1 - abs p1 * ord p0

surf :: Point -> Point -> Point -> Number
surf q0 q1 q2 =
  0.5 * (det q0 q1 + det q1 q2 + det q2 q0)

inside :: Point -> Mesh -> Boolean
inside q m =
  let q0 = m.points !! 0
      q1 = m.points !! 1
      q2 = m.points !! 2
      q3 = m.points !! 3
    in (Ord.abs (surf q0 q1 q2) + Ord.abs (surf q0 q2 q3)) * 1.05
        >= Ord.abs (surf q0 q1 q)
        +  Ord.abs (surf q1 q2 q)
        +  Ord.abs (surf q2 q3 q)
        +  Ord.abs (surf q3 q0 q)

extend :: Model -> Model
extend m =
  maybe  m
         (\preview ->
            { tiling: { points: m.tiling.points <> preview.points
                      , edges: m.tiling.edges
                          <> ((\e -> e { p0 = e.p0 +  length m.tiling.points
                                       , p1 = e.p1 + length m.tiling.points
                                       }) <$> preview.edges
                             )
                       }
             , propositions: []
             , preview: Nothing
             , path: [Tuple (length m.tiling.points) (length m.tiling.edges)]
                      <> m.path
             , corner: m.corner
             , unity: m.unity
             })
         m.preview

teaser :: Point -> Model -> Model
teaser q m =
  let index = findIndex (\i -> inside q ((m.propositions !! i) (ref i) 0.0))
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
  in maybe m { preview = Nothing }
           identity
           $ (\ i r0 a ->
            m {preview = Just $ (m.propositions !! i) r0 a})
              <$> index <*> q0 <*> angle

homothecy :: Number -> Point -> Point
homothecy r p = orig <+| (scale (-r) $ vector p orig)

homRatio = 1.1 :: Number

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

    TransmitRef href ->
      let effects =
            case href of
              H.Created el -> App.lift $ Measure (fromElement el) SetCorner None
              _            -> mempty
      in {model, effects}

    SetCorner corner ->  App.purely model {corner = Just corner}

    Probe mouse →
      case model.corner of
        Just {left, top} ->
          let x = (_ - left) $ toNumber $ clientX mouse
              y = (_ - top) $ toNumber $ clientY mouse
              q = point ""  x y
            in App.purely
                $ teaser q
                $ model { tiling = probe model.unity q model.tiling}
        _               -> App.purely model

    Chooz mouse →
      case model.corner of
        Just {left, top} ->
          let x = (_ - left) $ toNumber $ clientX mouse
              y = (_ - top) $ toNumber $ clientY mouse
              q = point "" x y
          in App.purely $ extend (toggleLock q model)
        _               -> App.purely model

    Undo -> App.purely $
      maybe model
            (\ {head: Tuple np ne, tail} ->
              model { tiling = { points: take np model.tiling.points
                               , edges: take ne model.tiling.edges}
                               , path = tail
                               }
            )
            $ uncons model.path

    Minus -> App.purely $
                model { unity = model.unity / homRatio
                      , tiling = model.tiling {
                          points = homothecy (1.0 / homRatio)
                                      <$> model.tiling.points}
                     , preview = maybe model.preview (\m ->
                            Just $ m {points  =  homothecy (1.0 / homRatio)
                                            <$> m.points}) model.preview
                      , propositions = []
                      }

    Plus -> App.purely $
                 model { unity = model.unity * homRatio
                       , tiling =
                          model.tiling {
                            points = homothecy homRatio
                                        <$> model.tiling.points}
                       , preview = maybe model.preview (\m ->
                              Just $ m {points  =  homothecy homRatio
                                              <$> m.points}) model.preview
                       , propositions =[]
                       }

svgline :: forall action. Point -> Point -> Color -> Size -> Html action
svgline q0 q1 stroke strokeWidth =
  H.elemWithNS (Just $ H.Namespace "http://www.w3.org/2000/svg") "line"
      [ H.attr "x1" $ show $ abs q0
      , H.attr "y1" $ show $ ord q0
      , H.attr "x2" $ show $ abs q1
      , H.attr "y2" $ show $ ord q1
      , H.attr "style" $ "stroke:" <> stroke
                    <> "; stroke-width:" <> show strokeWidth <> "px;"
      ] []

type Color = String
type Size = Number
type FontStyle = String

white = "#FFFFFF" :: Color
beige = "#FFFFAF" :: Color
blue = "#0602c6" :: Color
lightblue = "#060276" :: Color
purple = "#B314CB" :: Color
grey = "#050409" :: Color
red = "#FF0000" :: Color

type Context =
   { stroke :: Color
   , fill :: Color
   , strokeWidth :: Size
   , fontStyle :: FontStyle
   , textFill :: Color}

defaultContext :: Context
defaultContext =
  { stroke: "#000"
  , fill: "#00000000"
  , strokeWidth: 1.5
  , fontStyle: "italic 15px arial, sans-serif"
  , textFill: "#000"
  }

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
      in svgline q0 q1 stroke ctx.strokeWidth
  ) <$> m.edges

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
        <> (maybe [] (mesh ctx) m.preview)
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
                  , edges: [defaultEdge One 0 1 true]
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
