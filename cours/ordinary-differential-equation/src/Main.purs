module Main where

import Prelude

import Data.Array (concat)
import Data.Either (Either(..))
import Data.Int (toNumber)
import Data.Map (empty, insert)
import Data.Maybe (Maybe(..))
import Effect (Effect)
import Parser.Eval (eval, Env)
import Parser.Parser (parse)
import Parser.Syntax (Dual(..), Expr(..))
import Rand (Rand, rand)
import SVGpork.Geometry (Segment, point, segment)
import SVGpork.Render (Context, defaultContext, render')
import Spork.Html as H
import Spork.PureApp as PureApp

type Model =
  { command0 :: String
  , command1 :: String
  }

initialModel ∷ Model
initialModel =
  { command0: ""
  , command1: ""
  }

liftExprDual :: Number -> Expr Dual
liftExprDual x = Lit $ Dual {height: x, slope: 1.0}

type Solution = {x :: Number, y :: Number}
type Time = Number

withSolution :: Solution -> Time -> Env Dual
withSolution {x, y} time =
  insert "x" (liftExprDual x) $
    insert "y" (liftExprDual y) $
      insert "t" (liftExprDual time) empty

execute :: Model -> Solution -> Time -> Maybe Solution
execute model sol time =
  let evalCommand str =
        case parse str of
          Right expr -> case eval (withSolution sol time) expr of
            Right (Lit (Dual {height, slope})) -> Just height
            _                                  -> Nothing
          _           -> Nothing
      x_ = evalCommand model.command0
      y_ = evalCommand model.command1
    in case x_, y_ of
              Just x, Just y -> Just {x, y}
              _, _           -> Nothing

data Action
  = Command0 String
  | Command1 String

update ∷ Model → Action → Model
update model = case _ of
  Command0 str -> model{command0 = str}
  Command1 str -> model{command1 = str}

render ∷ Model → H.Html Action
render model =
  let ctx = defaultContext { stroke = "#050409", strokeWidth = 0.2}
   in H.div []
            [ H.elemWithNS
                (Just $ H.Namespace "http://www.w3.org/2000/svg")
                "svg"
                [ H.attr "width" "800px"
                , H.attr "height" "600px"
                ] $
                concat $ renderSolutions pathNumber ctx {gen: 345, seed: 543562263, val: 75} model

            , command0
            , command1
            ]

command0 :: H.Html Action
command0 = H.input [ H.autofocus true
                  , H.onValueChange  (H.always Command0)]

command1 :: H.Html Action
command1 = H.input [ H.onValueChange  (H.always Command1)]

randomNumberLessThan :: Number -> Rand -> Number
randomNumberLessThan mag r =
  let rs = rand r
      s = if rs.val `mod`2 == 0 then 1.0 else -1.0
      rx = rand rs
    in s * toNumber rx.val / 10000.0 * mag

renderSolutions :: Int -> Context -> Rand -> Model -> Array (Array (H.Html Action))
renderSolutions iter ctx r model =
  if iter == 0
    then []
    else
      let rx = rand r
          x = randomNumberLessThan magnitude rx
          ry = rand rx
          y = randomNumberLessThan magnitude ry
          rt = rand ry
          t = randomNumberLessThan 0.001 rt
      in [render' ctx $ segmentSolution pathLength model {x, y} t]
        <> renderSolutions (iter-1) ctx (rand rt) model

rk4 :: Model -> Solution -> Time -> Maybe Solution
rk4 model {x, y} t =
  let mk1 = execute model {x, y} t
      mk2 = mk1 >>= (\ {x: k1x, y: k1y} ->
                  execute model { x: x + h * k1x / 2.0
                                , y: y + h * k1y / 2.0
                                }
                                $ t + h / 2.0)
      mk3 = mk2 >>= (\ {x: k2x, y: k2y} ->
                  execute model { x: x + h * k2x / 2.0
                                , y: y + h * k2y / 2.0
                                }
                                $ t + h / 2.0)

      mk4 = mk3 >>= (\ {x: k3x, y: k3y} ->
                  execute model { x: x + h * k3x
                                , y: y + h * k3y
                                }
                                $ t + h)
    in (\ {x: x0, y: y0}
          {x: k1x, y: k1y}
          {x: k2x, y: k2y}
          {x: k3x, y: k3y}
          {x: k4x, y: k4y} -> { x: x0 + h * (k1x + 2.0 * k2x + 2.0 * k3x + k4x) / 6.0
                              , y: y0 + h * (k1y + 2.0 * k2y + 2.0 * k3y + k4y) / 6.0}) <$>
                              Just {x, y} <*> mk1 <*> mk2 <*> mk3 <*> mk4

magnitude = 30.0 :: Number
h = 0.1 :: Number
xoffset = 400.0 :: Number
yoffset = 300.0 :: Number
pathLength = 100 :: Int
pathNumber = 5 :: Int

segmentSolution :: Int -> Model -> Solution -> Time -> Array Segment
segmentSolution iter model sol@{x, y} t =
  if iter == 0
    then []
    else
      case rk4 model sol t of
        Just sol_@{x: x_, y: y_} ->
          [segment (point "" (x+xoffset) (y+yoffset)) (point "" (x_+xoffset) (y_+yoffset)) Nothing]
          <> segmentSolution (iter-1) model sol_ (t+h)
        _ -> []

app ∷ PureApp.PureApp Model Action
app =
  { render
  , update
  , init: initialModel
  }

main ∷ Effect Unit
main = void $ PureApp.makeWithSelector app "#app"
