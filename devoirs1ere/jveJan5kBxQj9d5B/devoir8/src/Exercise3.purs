module Exercise3 where

import Prelude

import Article (b_, m, m_, nl, openSection_, put, splits, t', t_, toArray)

import Control.Monad.State.Class (class MonadState)

import Data.Array (length, take, unsafeIndex)
import Data.FoldableWithIndex (forWithIndex_, foldMapWithIndex)
import Data.Tuple (fst) 
import Data.Tuple.Nested ((/\), type (/\))

import Deku.Core (Nut)
import Deku.DOM as D

import FRP.Event (Event)

import Partial.Unsafe (unsafePartial)

import Rand (Rand, unsort)

problems :: 
    Array   { domain :: String
            , sequence :: String
            , answer :: String
            }
problems = 
    [   { domain: "n\\in\\mathbb{N}"
        , sequence: "u_n=\\dfrac{2n+1}{n+3}"
        , answer: "strictement croissante pour tout n"
        }
    ,   { domain: "n\\in\\mathbb{N}"
        , sequence: "u_n=2n^2-3n-2"
        , answer: "décroissante sur {0,1}, croissante sur pour n>=1"
        }
    ,   { domain: "n\\in\\mathbb{N}"
        , sequence: "u_n=1+\\dfrac{1}{n+1}"
        , answer: "décroissante pour tout n"
    }
    ,   { domain: "n\\in\\mathbb{N}"
        , sequence: "u_n=\\dfrac{3n-1}{2-5n}"
        , answer: "décroissante sur {0,1} puis croissante pour n>=1"
        }
    ,   { domain: "n\\geq 1"
        , sequence: "u_n=\\dfrac{2^n}{n}"
        , answer: "croissante pour n>=1"
        }
    ]

exo3 :: forall st.  
  Functor st =>
  MonadState (Array Nut) st =>
  Event (Rand /\ Boolean) -> st Unit
exo3 f0 = do  
    openSection_ "Exercice III" "5 points"
  
    let chosen_indices = unsort (length problems) <<< fst
    let questions = 2
    let chosen_event =  (\arr -> take questions $ (\i -> unsafePartial $ 
                unsafeIndex problems i) <$> arr) <<< (chosen_indices )
    let chosen_problems = toArray questions $ chosen_event <$> f0
    
    forWithIndex_ chosen_problems (\i p -> do
        b_ $ (show $ i+1)
        m_ "\\bullet\\bullet\\circ\\;"
        t_ "Soit "
        m_ "(u_n)"
        t_ " la suite définie par "
        m $ (_.sequence) <$> p
        t_ " pour tout "
        m $ (_.domain) <$> p
        t_ "."
        nl
        t_ " Etudier les variations de "
        m_ "(u_n)"
        t_ "."
        nl
    )

    put $ D.label [(\ ((_r /\ m) /\ arr) -> t' $
        if m 
           then "réponses: " <> foldMapWithIndex (\i p ->
                " " <> show (i+1)
                    <> ") "
                    <> p.answer)  arr
           else ""
        ) <$> (identity /\ chosen_event) `splits` f0] []
        

