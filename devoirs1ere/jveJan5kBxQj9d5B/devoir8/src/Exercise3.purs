module Exercise3 where

import Prelude

import Article (b_, m_, nl, openSection_, t', t_)

import Control.Monad.Writer (Writer, tell, execWriter)

import Data.Array (length, take, unsafeIndex)
import Data.FoldableWithIndex (forWithIndex_, foldMapWithIndex)
import Data.Tuple (fst) 
import Data.Tuple.Nested ((/\), type (/\))

import Deku.Control ((<#~>))
import Deku.Core (Nut)
import Deku.DOM as D

import FRP.Event (Event)

import Partial.Unsafe (unsafePartial)

import Rand (Rand, unsort)

type Problem = 
    { domain :: String
    , sequence :: String
    , answer :: String
    }
        
problems :: Array Problem
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

exo3 :: Event (Rand /\ Boolean) -> Writer Nut Unit
exo3 f0 = do  
    openSection_ "Exercice III" "5 points"
    
    let chooseIndices :: Rand /\ Boolean -> Array Int
        chooseIndices = unsort (length problems) <<< fst
    let questions = 2
    let chooseProblems :: Rand /\ Boolean -> Array Problem
        chooseProblems = 
            (\arr -> 
                take questions $ 
                    (\i -> unsafePartial $ unsafeIndex problems i) <$> arr
            ) <<< chooseIndices
    
    tell $ f0 <#~> \f ->
        execWriter $ forWithIndex_ (chooseProblems f) \i p -> do
            b_ $ (show $ i+1)
            m_ "\\bullet\\bullet\\circ\\;"
            t_ "Soit "
            m_ "(u_n)"
            t_ " la suite définie par "
            m_ p.sequence
            t_ " pour tout "
            m_ p.domain
            t_ "."
            nl
            t_ " Etudier les variations de "
            m_ "(u_n)"
            t_ "."
            nl

    tell $ 
        D.label 
            [ f0 
                <#> (\ x -> x /\ chooseProblems x) 
                <#> (\ ((_r /\ m) /\ arr) -> t' $
                        if m 
                            then 
                                "réponses: " 
                                    <> foldMapWithIndex 
                                        ( \i a -> " " 
                                            <> show (i+1) 
                                            <> ") ("
                                            <> a.answer
                                            <> ")"
                                        ) arr
                            else ""
                    ) 
            ] 
            []
        

