module Exercise2 where

import Prelude

import Article (t', m', m_, nl, nl', t_, b_, em_, openSection_)

import Control.Monad.Writer (Writer, execWriter, tell)

import Data.Array (length, take, unsafeIndex)
import Data.Traversable (for_)
import Data.FoldableWithIndex (forWithIndex_, foldMapWithIndex)
import Data.Tuple (fst) 
import Data.Tuple.Nested ((/\), type (/\))

import Deku.Attribute ((!:=), Attribute)
import Deku.Control (switcher)
import Deku.Core (Nut)
import Deku.DOM as D

import FRP.Event (Event)

import Partial.Unsafe (unsafePartial)

import Rand (Rand, unsort)

vec :: String -> String
vec u = "\\overrightarrow{" <> u <> "}"

norm :: String -> String
norm u = "\\left\\|" <> vec u <> "\\right\\|"

type Problem t = 
    { a :: String
    , b :: String
    , c :: String
    , r :: String
    , q :: Array (Attribute t)
    }
    
problems :: forall t. Array (Problem t)
problems = 
    [   { q:  
            [ m' ("(" <> vec "u" <> "-" <> vec "v"
                            <> ") \\cdot("
                            <> vec "u" <> "+" <> vec "v" <> ")")
            , t' " est toujours égal à "
            ]
            
        , a: "2" <> vec "u"
        , b: vec "u" <> "^2-" <> vec "v" <> "^2"
        , c: vec "0"
        , r: "b"
        }

    ,   { q:    [ m' ("\\left\\|" <> vec "u" <> "\\right\\|")
                , t' " est toujours égal à "
                ]
        , a: "\\sqrt{" <> vec "u" <> "\\cdot"
                        <> vec "u" <> "}"
        , b: vec "u"
        , c: "\\left\\|" <> vec "u" <> "\\right\\|^2"
        , r: "a"
        }
    ,   { q:    [ m' ("\\cos(" <> vec "u" <> ";" <> vec "v" <> ")")
                , t' " est toujours égal à "
                ]
        , a: norm "u" <> norm "v"
        , b: vec "u" <> "\\cdot" <> vec "v"
        , c: "\\dfrac{" <> vec "u"
                        <> "\\cdot" <> vec "v" <> "}{" <> norm "u" <> norm "v" <> "}"
        , r: "c"
        }
    ,   { q:    [ m' (vec "u" )
                , m' "^2"
                , t' " est toujours égal à "
                ]
        , a: "2" <> vec "u"
        , b: vec "u"
        , c: "\\left\\|" <> vec "u" <> "\\right\\|^2"
        , r: "c"
        }
    ,   { q:    [ m' (vec "u" <> "\\cdot" <> vec "v")
                , t' " est toujours égal à "
                ]
        , a: norm "u" <> norm "v"
        , b:  vec "v" <> "\\cdot" <> vec "u"
        , c: "-" <> vec "v" <> "\\cdot" <> vec "u"
        , r: "b"
        }
    ,   { q:    [ t' "Soit "
                , m' "(u_n)_{n\\in \\mathbb{N}}"
                , t' " la suite définie par "
                , m' "u_n=2n^2-1"
                , t' "."
                , nl'
                , t' "L'expression de "
                , m' "u_{n+1}"
                , t' " est donnée par"
                ]
        , a: "u_{n+1}=2n^2+4n+1"
        , b: "u_{n+1}=2n^2"
        , c: "u_{n+1}=2n^2-2n"
        , r: "a"
        }
    ,   { q:    [ t' "Soit "
                , m' "(u_n)_{n>1}"
                , t' " la suite définie par "
                , m' "u_n=\\dfrac{1}{n-1}"
                , t' "."
                , nl'
                , t' "L'expression de "
                , m' "u_{n+1}-u_n"
                , t' " est donnée par"
                ]
        , a: "u_{n+1}-u_n=\\dfrac{1}{n(n-1)}"
        , b: "u_{n+1}-u_n=\\dfrac{1}{n(1-n)}"
        , c: "u_{n+1}-u_n=\\dfrac{n}{n-1}"
        , r: "b"
        }
    ,   { q:    [ t' "Soit "
                , m' "f"
                , t' " une fonction définie sur "
                , m' "\\mathbb{R}"
                , t' ". Soit "
                , m' "(u_n) "
                , t' " la suite définie par "
                , m' "u_n=f(n)"
                , t'  "."
                , nl'
                , t' "Pour déterminer les variations de "
                , m' "(u_n)"
                , t' ", il suffit de connaître "
                ]
        , a: "\\mathrm{les}\\;\\mathrm{signes}\\;\\mathrm{de}\\; f"
        , b: "\\mathrm{les}\\;\\mathrm{variations}\\;\\mathrm{de}\\; f"
        , c: "\\mathrm{les}\\;\\mathrm{signes}\\;\\mathrm{de}\\; (u_n)"
        , r: "b"
        }
    ,   { q:    [ t' "Soit "
                , m' "f"
                , t' " une fonction définie sur "
                , m' "\\mathbb{R}"
                , t' ". Soit "
                , m' "(u_n) "
                , t' " une suite vérifiant "
                , m' "u_{n+1}-u_n=f(n)"
                , t' "."
                , nl'
                , t' "Pour déterminer les variations de "
                , m' "(u_n)"
                , t' ", il suffit de connaître "
                ]
        , a: "\\mathrm{les}\\;\\mathrm{signes}\\;\\mathrm{de}\\; f"
        , b: "\\mathrm{les}\\;\\mathrm{variations}\\;\\mathrm{de}\\; f"
        , c: "\\mathrm{les}\\;\\mathrm{signes}\\;\\mathrm{de}\\; (u_n)"
        , r: "a"
        }
    ,   { q:    [ t' "Soit "
                , m' "(u_n) "
                , t' " une suite monotone vérifiant "
                , m' "\\lim\\limits_{n\\to +\\infty} u_n = 3"
                , t' "."
                , nl'
                , t' "La ligne définissant le début de la boucle "
                , t' "tirée d'un programme en Python illustrant la convergence "
                , t' "de "
                , m' "(u_n)"
                , t' " est "
                ]
        , a: "\\verb|while abs(u-3) < 0.0001:|"
        , b: "\\verb|while abs(3+u) > 0.0001:|"
        , c: "\\verb|while abs(3-u) > 0.0001:|"
        , r: "c"
        }
    ]
           
exo2 :: Event (Rand /\ Boolean) -> Writer Nut Unit
exo2 f0 = do  
    openSection_ "Exercice II" "5 points"
        
    em_ "Cet exercice est un questionnaire à choix multiple. Pour chaque question,"
    em_ " une seule des réponses proposées est correcte. Une bonne réponse rapporte 1 point, "
    em_ " une mauvaise réponse enlève 1 point tant que la note globale reste positive. "
    em_ " Une absence de réponse n'apporte et n'enlève aucun point. Aucune justification n'est exigée."
    
    let chooseIndices :: Rand /\ Boolean -> Array Int
        chooseIndices = unsort (length problems) <<< fst
    let questions = 5
    let chooseProblems :: forall t. Rand /\ Boolean -> Array (Problem t)
        chooseProblems = 
            (\arr -> 
                take questions $ 
                    (\i -> unsafePartial $ unsafeIndex problems i) <$> arr
            ) <<< chooseIndices
    nl 
    nl
    
    tell $ 
        switcher 
            (\f ->
                let chosenProblems = chooseProblems f
                in execWriter $ forWithIndex_ chosenProblems (\i p -> do
                    b_ $ (show $ i+1)
                    m_ "\\bullet\\;"
                    
                    for_ p.q \a ->
                        tell $ D.label [pure a] []

                    t_ " :"
                    nl
                    nl
                    tell $ D.div [D.Style !:=  "display: grid; grid-template-columns: 1fr 1fr 1fr;"]
                        [ D.label_ 
                            [ execWriter $ do 
                                t_ "(a) "
                                m_ $ (_.a) p
                            ]
                        , D.label_ 
                            [ execWriter $ do 
                                t_ "(b) "
                                m_ $ (_.b) p
                            ]
                        , D.label_ 
                            [ execWriter $ do 
                                t_ "(c) "
                                m_ $ (_.c) p
                            ]
                        ]
                    nl
                    nl
                    )
            ) f0
                               
    tell $ D.label [(\ ((_r /\ m) /\ arr) -> t' $
        if m 
           then "réponses: " <> foldMapWithIndex (\i a -> " " <> show (i+1) <> ") ("<> a.r <> ")") arr
           else ""
        ) <$> ((pure \ x -> x /\ chooseProblems x) <*> f0)] []
    
