module Exercise1 where

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
showSeq {a,b} =
  (case a of
    -1 -> "-n"
    1 -> "n"
    _ -> show a <> "n") <> (
    if b < 0
      then show b
      else "+" <> show b)

exo1 :: forall a. Boolean -> Rand -> State (Array (Widget HTML a)) Unit
exo1 mode r0 = do
  section "Exercice 1"
  t "Soit "
  m "(u_n)"
  t " la suite définie sur "
  m "\\mathbb{N}"
  t " par "
  let {a,b} = randomParam r0
  m $ "u_n = " <> showSeq {a,b}
  t "."
  nl
  nl
  put $ D.div [ P.attr "style" "display: grid; grid-template-columns: 1fr 1fr 1fr 1fr;"]
      [ D.label [] $ fromIncremental $ do 
                                        m "u_0="
                                        get
      , D.label [] $ fromIncremental $ do 
                                        m "u_1="
                                        get
      , D.label [] $ fromIncremental $ do 
                                        m "u_2="
                                        get
      , D.label [] $ fromIncremental $ do 
                                        m "u_3="
                                        get
      ]
  
  if mode
    then do
          nl
          t "réponse: "
          t $ show [b,a+b,2*a+b,3*a+b]
    else pure mempty
