module Main where

import Prelude

import Data.Array (concat)
import Data.Either (Either(..), hush)
import Data.Int (toNumber)
import Data.Map (empty, insert)
import Data.Maybe (Maybe(..))
import Effect (Effect)
import Global (readFloat)
import Parser.Error (Expect)
import Parser.Eval (eval, Env)
import Parser.Parser (parse)
import Parser.Syntax (Expr(..))
import Rand (Rand, rand)
import SVGpork.Geometry (Segment, point, segment)
import SVGpork.Render (Context, defaultContext, render')
import Spork.Html as H
import Spork.PureApp as PureApp

type Model =
  { fx :: Maybe (Expr Number)
  , fy :: Maybe (Expr Number)
  , magnitude :: Number
  , h :: Number
  , pathLength :: Int
  , pathCount :: Int
  }

initialModel ∷ Model
initialModel =
  { fx: Nothing
  , fy: Nothing
  , magnitude: 1.0
  , h: 0.07
  , pathLength: 90
  , pathCount: 3
  }

liftExprNumber :: Number -> Expr Number
liftExprNumber x = Lit x

type Solution = {x :: Number, y :: Number}
type Time = Number

withSolution :: Solution -> Time -> Env Number
withSolution {x, y} time =
  insert "x" (liftExprNumber x) $
    insert "y" (liftExprNumber y) $
      insert "t" (liftExprNumber time) empty

fail :: Expect (Expr Number)
fail = parse "x" >>= eval empty

execute :: Model -> Solution -> Time -> Maybe Solution
execute model sol time =
  let evalF (Just f) = Right f >>= eval (withSolution sol time)
      evalF _ = fail
      x_ = evalF model.fx
      y_ = evalF model.fy
    in case x_, y_ of
      Right (Lit x), Right (Lit y) -> Just {x, y}
      _, _                         -> Nothing

data Action
  = Fx String
  | Fy String
  | UpdateMagnitude String
  | UpdateH String
  | IncreaseLength
  | DecreaseLength
  | IncreaseCount
  | DecreaseCount

update ∷ Model → Action → Model
update model = case _ of
  Fx str -> model{fx = hush $ Right str >>= parse}
  Fy str -> model{fy = hush $ Right str >>= parse}
  UpdateMagnitude str -> model{magnitude = readFloat str}
  UpdateH str -> model{h = readFloat str}
  IncreaseLength -> model{pathLength = model.pathLength + 1}
  DecreaseLength -> model{pathLength = ifM (_ > 0)
                                           (_ - 1)
                                           identity model.pathLength}
  IncreaseCount -> model{pathCount = model.pathCount + 1}
  DecreaseCount -> model{pathCount = ifM (_ > 0)
                                         (_ - 1)
                                         identity model.pathCount}

halfheight = 300 :: Int
halfwidth = 400 :: Int

styleCenter :: String
styleCenter = "display: flex; align-items: center; justify-content: center;"

styleCounter :: String
styleCounter = "display: grid; grid-template-columns: 1fr 2fr 1fr 2fr;"

render ∷ Model → H.Html Action
render model =
  let ctx = defaultContext { stroke = "#050409", strokeWidth = 0.2}
   in H.div [H.attr "style" "display: grid; grid-template-columns: 1fr 1fr;"]
            [ H.elemWithNS
                (Just $ H.Namespace "http://www.w3.org/2000/svg")
                "svg"
                [ H.attr "width" $ show (2 * halfwidth) <> "px"
                , H.attr "height" $ show (2 * halfheight) <> "px"
                ] $
                concat $ renderSolutions model.pathCount ctx { gen: 345
                                                             , seed: 543562263
                                                             , val: 75} model

            , H.div []
              [ fx
              , fy
              , H.br []
              , H.label [] [H.text "magnitude (1.0): "]
              , H.input [H.onValueChange $ H.always UpdateMagnitude]
              , H.br []
              , H.label [] [H.text "h (0.07): "]
              , H.input [H.onValueChange $ H.always UpdateH]

              , H.div [H.attr "style" styleCounter]
                [ H.button [H.onClick $ H.always_ DecreaseLength] [H.text "-"]
                , H.label [H.attr "style" styleCenter] [H.text $ show model.pathLength]
                , H.button [H.onClick $ H.always_ IncreaseLength] [H.text "+"]
                , H.label [H.attr "style" styleCenter] [H.text "steps"]
                ]
              , H.div [H.attr "style" styleCounter]
                [ H.button [H.onClick $ H.always_ DecreaseCount] [H.text "-"]
                , H.label [H.attr "style" styleCenter] [H.text $ show model.pathCount]
                , H.button [H.onClick $ H.always_ IncreaseCount] [H.text "+"]
                , H.label [H.attr "style" styleCenter] [H.text "paths"]
                ]
              ]
            ]

fx :: H.Html Action
fx = H.input [ H.autofocus true
             , H.onValueChange  (H.always Fx)]

fy :: H.Html Action
fy = H.input [ H.onValueChange  (H.always Fy)]

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
          x = randomNumberLessThan model.magnitude rx
          ry = rand rx
          y = randomNumberLessThan model.magnitude ry
          rt = rand ry
          t = randomNumberLessThan 0.0005 rt
      in [render' ctx $ segmentSolution model.pathLength model {x, y} t]
        <> renderSolutions (iter-1) ctx (rand rt) model

rk4 :: Model -> Solution -> Time -> Maybe Solution
rk4 model {x, y} t =
  let h = model.h
      mk1 = execute model {x, y} t
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

xoffset = toNumber halfwidth :: Number
yoffset = toNumber halfheight :: Number

segmentSolution :: Int -> Model -> Solution -> Time -> Array Segment
segmentSolution iter model sol@{x, y} t =
  if iter == 0
    then []
    else
      case rk4 model sol t of
        Just sol_@{x: x_, y: y_} ->
          [segment (point "" (x * toNumber halfwidth + xoffset)
                             (- y * toNumber halfheight + yoffset))  -- Yaxis !!
                   (point "" (x_ * toNumber halfwidth + xoffset)
                             (- y_ * toNumber halfheight + yoffset)) Nothing]
          <> segmentSolution (iter-1) model sol_ (t + model.h)
        _ -> []

app ∷ PureApp.PureApp Model Action
app =
  { render
  , update
  , init: initialModel
  }

main ∷ Effect Unit
main = void $ PureApp.makeWithSelector app "#app"
