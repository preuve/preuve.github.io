module Exercise5 where

import Prelude

import Control.Monad.State (State)
import Rand (Rand, rand)
import Article (m, nl, section, t, put, get, fromIncremental)
import Concur.Core (Widget)
import Concur.VDom (HTML)
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

type Param = {a :: Int, b :: Int}

randomParam :: Rand -> Param
randomParam r =
  let ra = rand r
      a = randomInteger ra
      rb = rand ra
      b = randomInteger rb
      ok = a /= 1 && a /= 0 && b /= 0
    in if ok
        then {a,b}
        else randomParam rb

showSeq :: Param -> String
showSeq {a,b: _b} =
  (case a of
    -1 -> "-n^2-t_n"
    1 -> "n^2-t_n"
    _ -> show a <> "n^2-t_n")

exo5 :: forall a. Boolean -> Rand -> State (Array (Widget HTML a)) Unit
exo5 mode r0 = do
  section "Exercice 5"
  t "Soit "
  m "(t_n)"
  t " la suite définie sur "
  m "\\mathbb{N}"
  t " par "
  let {a,b} = randomParam r0
  m $ "\\left\\{\\begin{array}{l}t_0=" <> show b <> "\\\\"
                                 <> "t_{n+1}=" <> showSeq {a,b}
                                 <> "\\end{array}\\right."
  t "."
  nl
  nl
  put $ D.div [ P.attr "style" "display: grid; grid-template-columns: 1fr 1fr 1fr 1fr;"]
      [ D.label [] $ fromIncremental $ do 
                                        m "t_0="
                                        get
      , D.label [] $ fromIncremental $ do 
                                        m "t_1="
                                        get
      , D.label [] $ fromIncremental $ do 
                                        m "t_2="
                                        get
      , D.label [] $ fromIncremental $ do 
                                        m "t_3="
                                        get
      ]


  if mode
    then do
          nl
          t "réponse: "
          t $ show [b,-b,a+b,3*a-b]
    else pure mempty
