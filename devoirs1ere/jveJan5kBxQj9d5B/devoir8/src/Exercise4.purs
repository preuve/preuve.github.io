module Exercise4 where

import Prelude

import Control.Monad.State (State)
import Concur.Core (Widget)
import Concur.VDom (HTML)
import Rand (Rand)
import Article (t, m, nl, b, openSection)

exo4 :: forall a. Boolean -> Rand -> State (Array (Widget HTML a)) Unit
exo4 mode r0 = do
  openSection "Exercice IV" "5 points"
  
  t "Soit "
  m "(p_n)"
  t " la suite définie pour "
  m "n\\geq 2"
  t " par "
  m $ "\\left\\{\\begin{array}{l}p_2=\\sqrt{6}\\\\"
                                 <> "p_{n+1}=\\sqrt{p_n^2+\\dfrac{6}{n^2}}"
                                 <> "\\end{array}\\right."
  t "."
  nl
  nl

  b "1"
  m "\\bullet\\bullet\\;"
  t "Montrer que "
  m "p_n>0"
  t " pour tout "
  m "n\\geq 2"
  t "."
  nl

  b "2"
  m "\\bullet\\bullet\\;"
  t "Montrer que "
  m "(p_n)"
  t " est croissante pour tout "
  m "n\\geq 2"
  t "."
  nl

  b "3"
  m "\\bullet\\;"
  t "A l'aide de la calculatrice, dire si la suite semble convergente."
  nl
  t "Si oui, conjecturer la valeur de sa limite quand "
  m "n"
  t " tend vers "
  m "+\\infty"
  t "."
  nl
  nl
