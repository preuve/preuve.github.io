module Exercise4 where

import Prelude

import Control.Monad.State (State)
import Rand (Rand, rand)
import Article (m, nl, section, t, put, get, fromIncremental)
import Concur.Core (Widget)
import Concur.VDom (HTML)
import Data.Rational(Rational, fromInt, numerator, denominator)
import Concur.VDom.DOM as D
import Concur.VDom.Props (attr) as P

majorant :: Int
majorant = 10

randomInteger :: Rand -> Int
randomInteger r =
  let rsign = rand r
      sign = 2 * (mod rsign.val 2) - 1
      ri = rand rsign
      i = mod ri.val majorant
  in sign * i

type Param = {a :: Int}

randomParam :: Rand -> Param
randomParam r =
  let ra = rand r
      a = randomInteger ra
      ok = a /= 1 && a /= 0
    in if ok
        then {a}
        else randomParam ra

showSeq :: Param -> String
showSeq {a} =
  "\\dfrac{1}{1-s_n}"

rshow :: Rational -> String
rshow r =
  let n = numerator r
      d = denominator r
   in if d == 1
        then show n
        else "\\frac{" <> show n
                    <> "}{"
                    <> show d
                    <> "}"


exo4 :: forall a. Boolean -> Rand -> State (Array (Widget HTML a)) Unit
exo4 mode r0 = do
  section "Exercice 4"
  t "Soit "
  m "(s_n)"
  t " la suite définie sur "
  m "\\mathbb{N}"
  t " par "
  let {a} = randomParam r0
  m $ "\\left\\{\\begin{array}{l}s_0=" <> show a <> "\\\\"
                                 <> "s_{n+1}=" <> showSeq {a}
                                 <> "\\end{array}\\right."
  t "."
  nl
  nl
  put $ D.div [ P.attr "style" "display: grid; grid-template-columns: 1fr 1fr 1fr 1fr;"]
      [ D.label [] $ fromIncremental $ do 
                                        m "s_0="
                                        get
      , D.label [] $ fromIncremental $ do 
                                        m "s_1="
                                        get
      , D.label [] $ fromIncremental $ do 
                                        m "s_2="
                                        get
      , D.label [] $ fromIncremental $ do 
                                        m "s_3="
                                        get
      ]

  if mode
    then do
          nl
          t "réponse: "
          m $ "[" <> (rshow $ fromInt a) <> ","
                  <> (rshow $ fromInt 1 / (fromInt $ 1 - a)) <> ","
                  <> (rshow $ fromInt (a-1) / fromInt a) <> ","
                  <> (rshow $ fromInt a) <> "]"
          t ""
    else pure mempty
