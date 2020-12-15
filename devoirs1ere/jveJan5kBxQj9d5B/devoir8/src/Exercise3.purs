module Exercise3 where

import Prelude

import Control.Monad.State (State)
import Data.Array ((!!), length, take)
import Data.FoldableWithIndex (forWithIndex_, foldMapWithIndex)
import Data.Maybe (fromJust)
import Partial.Unsafe (unsafePartial)
import Rand (Rand, unsort)
import Concur.Core (Widget)
import Concur.VDom (HTML)
import Article (b, m, t, nl, openSection)

problems :: Array { domain :: String
                  , sequence :: String
                  , answer :: String}
problems = [{ domain: "n\\in\\mathbb{N}"
            , sequence: "u_n=\\dfrac{2n+1}{n+3}"
            , answer: "strictement croissante pour tout n"
            }
           ,{ domain: "n\\in\\mathbb{N}"
            , sequence: "u_n=2n^2-3n-2"
            , answer: "décroissante sur {0,1}, croissante sur pour n>=1"
            }
           ,{ domain: "n\\in\\mathbb{N}"
            , sequence: "u_n=1+\\dfrac{1}{n+1}"
            , answer: "décroissante pour tout n"
            }
           ,{ domain: "n\\in\\mathbb{N}"
            , sequence: "u_n=\\dfrac{3n-1}{2-5n}"
             , answer: "décroissante sur {0,1} puis croissante pour n>=1"
            }
             ,{ domain: "n\\geq 1"
              , sequence: "u_n=\\dfrac{2^n}{n}"
               , answer: "croissante pour n>=1"
              }
              ]

exo3 :: forall a. Boolean -> Rand -> State (Array (Widget HTML a)) Unit
exo3 mode r0 = do
        openSection "Exercice III" "5 points"
  
        let chosen_indices = unsort (length problems) r0
        let chosen_problems =
              take 2 $ (\i ->
                   unsafePartial $ fromJust
                                 $ problems !! i) <$> chosen_indices
        forWithIndex_ chosen_problems (\i p -> do
            b $ (show $ i+1)
            m "\\bullet\\bullet\\circ\\;"
            t "Soit "
            _ <- m "(u_n)"
            t " la suite définie par "
            _ <- m p.sequence
            t " pour tout "
            _ <- m p.domain
            t "."
            nl
            t " Etudier les variations de "
            _ <- m "(u_n)"
            t "."
            nl)

        if mode
         then t $ "réponses: " <> foldMapWithIndex (\i p ->
                " " <> show (i+1)
                    <> ") "
                    <> p.answer) chosen_problems
         else pure unit
