module Exercise2 where

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

type Param = {a :: Int, b :: Int, c :: Int}

randomParam :: Rand -> Param
randomParam r =
  let ra = rand r
      a = randomInteger ra
      rb = rand ra
      b = randomInteger rb
      rc = rand rb
      c = randomInteger rc
      ok = c /= 0 && a /= 1 && a /= 0 && b /= 0
    in if ok
        then {a,b,c}
        else randomParam rc

showSeq :: Param -> String
showSeq {a,b,c: _c} =
  (case a of
    -1 -> "-v_n"
    1 -> "v_n"
    _ -> show a <> "v_n") <> (
    if b < 0
      then show b
      else "+" <> show b)

exo2 :: forall a. Boolean -> Rand -> State (Array (Widget HTML a)) Unit
exo2 mode r0 = do
  section "Exercice 2"
  t "Soit "
  m "(v_n)"
  t " la suite définie sur "
  m "\\mathbb{N}"
  t " par "
  let {a,b,c} = randomParam r0
  m $ "\\left\\{\\begin{array}{l}v_0=" <> show c <> "\\\\"
                                 <> "v_{n+1}=" <> showSeq {a,b,c}
                                 <> "\\end{array}\\right."
  t "."
  nl
  nl
  put $ D.div [ P.attr "style" "display: grid; grid-template-columns: 1fr 1fr 1fr 1fr;"]
      [ D.label [] $ fromIncremental $ do 
                                        m "v_0="
                                        get
      , D.label [] $ fromIncremental $ do 
                                        m "v_1="
                                        get
      , D.label [] $ fromIncremental $ do 
                                        m "v_2="
                                        get
      , D.label [] $ fromIncremental $ do 
                                        m "v_3="
                                        get
      ]

  if mode
    then do
          nl
          t "réponse: "
          t $ show [c,a*c+b,a*(a*c+b)+b,a*(a*(a*c+b)+b)+b]
    else pure mempty
