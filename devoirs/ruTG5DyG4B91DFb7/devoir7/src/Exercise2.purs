module Exercise2 where

import Prelude

import Control.Monad.State (StateT)
import Data.Identity (Identity)
import Rand (Rand, rand)
import SporKaTeX (t, nl, section)
import Spork.Html (Html)

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
showSeq {a,b,c} =
  (case a of
    -1 -> "-v_n"
    1 -> "v_n"
    _ -> show a <> "v_n") <> (
    if b < 0
      then show b
      else "+" <> show b)

spacing = "\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;" :: String

exo2 :: forall t35 t40 t78 t85.
  Discard t78 => { code :: Int
                 | t85
                 }
                 -> (String -> StateT (Array (Html t40)) Identity t78)
                    -> t35
                       -> { gen :: Int
                          , seed :: Int
                          , val :: Int
                          }
                          -> StateT (Array (Html t40)) Identity Unit
exo2 model m equation r0 = do
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
  m $ "v_0=" <> spacing <> "v_1=" <> spacing <> "v_2=" <> spacing <> "v_3="

  if model.code < 0
    then do
          nl
          t "réponse: "
          t $ show [c,a*c+b,a*(a*c+b)+b,a*(a*(a*c+b)+b)+b]
    else pure mempty
