module Exercise4 where

import Prelude

import Article (b_, m_, nl, openSection_, t_)
import Control.Monad.Writer (Writer)
import Data.Tuple.Nested (type (/\))
import Deku.Core (Nut)
import FRP.Event (Event)
import Rand (Rand)

exo4 :: Event (Rand /\ Boolean) -> Writer Nut Unit
exo4 _ = do  
  openSection_ "Exercice IV" "5 points"
  
  t_ "Soit "
  m_ "(p_n)"
  t_ " la suite définie pour "
  m_ "n\\geq 2"
  t_ " par "
  m_ $ "\\left\\{\\begin{array}{l}p_2=\\sqrt{6}\\\\"
                                 <> "p_{n+1}=\\sqrt{p_n^2+\\dfrac{6}{n^2}}"
                                 <> "\\end{array}\\right."
  t_ "."
  nl
  nl

  b_ "1"
  m_ "\\bullet\\bullet\\;"
  t_ "Montrer que "
  m_ "p_n>0"
  t_ " pour tout "
  m_ "n\\geq 2"
  t_ "."
  nl

  b_ "2"
  m_ "\\bullet\\bullet\\;"
  t_ "Montrer que "
  m_ "(p_n)"
  t_ " est croissante pour tout "
  m_ "n\\geq 2"
  t_ "."
  nl

  b_ "3"
  m_ "\\bullet\\;"
  t_ "A l'aide de la calculatrice, dire si la suite semble convergente."
  nl
  t_ "Si oui, conjecturer la valeur de sa limite quand "
  m_ "n"
  t_ " tend vers "
  m_ "+\\infty"
  t_ "."
  nl
  nl
