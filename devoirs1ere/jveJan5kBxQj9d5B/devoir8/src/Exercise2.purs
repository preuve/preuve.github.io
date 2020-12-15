module Exercise2 where

import Prelude

import Control.Monad.State (State)
import Data.Array ((!!), length, take)
import Data.FoldableWithIndex (forWithIndex_, foldMapWithIndex)
import Data.Maybe (fromJust)
import Partial.Unsafe (unsafePartial)
import Rand (Rand, unsort)
import Article (m, em, nl, b, t, put, get, fromIncremental, openSection)
import Concur.Core (Widget)
import Concur.VDom (HTML)
import Concur.VDom.DOM as D
import Concur.VDom.Props (attr) as P

vec :: String -> String
vec u = "\\overrightarrow{" <> u <> "}"

norm :: String -> String
norm u = "\\left\\|" <> vec u <> "\\right\\|"

problems :: forall a t. Array { a :: String
                  , b :: String
                  , c :: String
                  , r :: String
                  , q :: (String -> State (Array (Widget HTML a)) t) -> State (Array (Widget HTML a)) Unit
                  }
                  
problems = [{q: (\ m -> do
                           _ <- m $ "(" <> vec "u" <> "-" <> vec "v"
                                        <> ") \\cdot("
                                        <> vec "u" <> "+" <> vec "v" <> ")"
                           t " est toujours égal à "
                )
                  , a: "2" <> vec "u"
                  , b: vec "u" <> "^2-" <> vec "v" <> "^2"
                  , c: vec "0"
                  , r: "b"}
           ,{q: (\ m -> do
                             _ <- m $ "\\left\\|" <> vec "u" <> "\\right\\|"
                             t " est toujours égal à ")
                  , a: "\\sqrt{" <> vec "u" <> "\\cdot"
                                            <> vec "u" <> "}"
                  , b: vec "u"
                  , c: "\\left\\|" <> vec "u" <> "\\right\\|^2"
                  , r: "a"}
           ,{q: (\ m -> do
                             _ <- m $ "\\cos(" <> vec "u" <> ";" <> vec "v" <> ")"
                             t " est toujours égal à ")
                  , a: norm "u" <> norm "v"
                  , b: vec "u" <> "\\cdot" <> vec "v"
                  , c: "\\dfrac{" <> vec "u"
                                  <> "\\cdot" <> vec "v" <> "}{" <> norm "u" <> norm "v" <> "}"
                  , r: "c"}

           ,{q: (\ m -> do
                             _ <- m $ vec "u" <> "^2"
                             t " est toujours égal à ")
                  , a: "2" <> vec "u"
                  , b: vec "u"
                  , c: "\\left\\|" <> vec "u" <> "\\right\\|^2"
                  , r: "c"}
           ,{q: (\ m -> do
                             _ <- m $ vec "u" <> "\\cdot" <> vec "v"
                             t " est toujours égal à ")
                  , a: norm "u" <> norm "v"
                  , b:  vec "v" <> "\\cdot" <> vec "u"
                  , c: "-" <> vec "v" <> "\\cdot" <> vec "u"
                  , r: "b"}

           ,{q: (\m -> do
                          t "Soit "
                          _ <- m "(u_n)_{n\\in \\mathbb{N}}"
                          t " la suite définie par "
                          _ <- m "u_n=2n^2-1"
                          t "."
                          nl
                          t "L'expression de "
                          _ <- m "u_{n+1}"
                          t " est donnée par")
                  , a: "u_{n+1}=2n^2+4n+1"
                  , b: "u_{n+1}=2n^2"
                  , c: "u_{n+1}=2n^2-2n"
                  , r: "a"}
           ,{q: (\m -> do
                          t "Soit "
                          _ <- m "(u_n)_{n>1}"
                          t " la suite définie par "
                          _ <- m "u_n=\\dfrac{1}{n-1}"
                          t "."
                          nl
                          t "L'expression de "
                          _ <- m "u_{n+1}-u_n"
                          t " est donnée par")
                  , a: "u_{n+1}-u_n=\\dfrac{1}{n(n-1)}"
                  , b: "u_{n+1}-u_n=\\dfrac{1}{n(1-n)}"
                  , c: "u_{n+1}-u_n=\\dfrac{n}{n-1}"
                  , r: "b"}
           ,{q: (\m -> do
                          t "Soit "
                          _ <- m "f"
                          t " une fonction définie sur "
                          _ <- m "\\mathbb{R}"
                          t ". Soit "
                          _ <- m "(u_n) "
                          t " la suite définie par "
                          _ <- m "u_n=f(n)"
                          t "."
                          nl
                          t "Pour déterminer les variations de "
                          _ <- m "(u_n)"
                          t ", il suffit de connaître "
                          )
                  , a: "\\mathrm{les}\\;\\mathrm{signes}\\;\\mathrm{de}\\; f"
                  , b: "\\mathrm{les}\\;\\mathrm{variations}\\;\\mathrm{de}\\; f"
                  , c: "\\mathrm{les}\\;\\mathrm{signes}\\;\\mathrm{de}\\; (u_n)"
                  , r: "b"}
           ,{q: (\m -> do
                          t "Soit "
                          _ <- m "f"
                          t " une fonction définie sur "
                          _ <- m "\\mathbb{R}"
                          t ". Soit "
                          _ <- m "(u_n) "
                          t " une suite vérifiant "
                          _ <- m "u_{n+1}-u_n=f(n)"
                          t "."
                          nl
                          t "Pour déterminer les variations de "
                          _ <- m "(u_n)"
                          t ", il suffit de connaître "
                          )
                  , a: "\\mathrm{les}\\;\\mathrm{signes}\\;\\mathrm{de}\\; f"
                  , b: "\\mathrm{les}\\;\\mathrm{variations}\\;\\mathrm{de}\\; f"
                  , c: "\\mathrm{les}\\;\\mathrm{signes}\\;\\mathrm{de}\\; (u_n)"
                  , r: "a"}
            ,{q: (\m -> do
                           t "Soit "
                           _ <- m "(u_n) "
                           t " une suite monotone vérifiant "
                           _ <- m "\\lim\\limits_{n\\to +\\infty} u_n = 3"
                           t "."
                           nl
                           t "La ligne définissant le début de la boucle "
                           t "tirée d'un programme en Python illustrant la convergence "
                           t "de "
                           _ <- m "(u_n)"
                           t " est ")
                   , a: "\\verb|while abs(u-3) < 0.0001:|"
                   , b: "\\verb|while abs(3+u) > 0.0001:|"
                   , c: "\\verb|while abs(3-u) > 0.0001:|"
                   , r: "c"}
           ]


exo2 :: forall a. Boolean -> Rand -> State (Array (Widget HTML a)) Unit
exo2 mode r0 = do
  openSection "Exercice II" "5 points"
        
  em "Cet exercice est un questionnaire à choix multiple. Pour chaque question,"
  em " une seule des réponses proposées est correcte. Une bonne réponse rapporte 1 point, "
  em " une mauvaise réponse enlève 1 point tant que la note globale reste positive. "
  em " Une absence de réponse n'apporte et n'enlève aucun point. Aucune justification n'est exigée."
  nl
  nl
  let chosen_indices = unsort (length problems) r0
  let chosen_problems =
         take 5 $ (\i -> unsafePartial $ fromJust
                                       $ problems !! i) <$> chosen_indices
  forWithIndex_ chosen_problems (\i p -> do
                    b $ (show $ i+1)
                    m "\\bullet\\;"
                    p.q m
                    t " :"
                    nl
                    nl
                    put $ D.div [ P.attr "style" "display: grid; grid-template-columns: 1fr 1fr 1fr;"]
                            [ D.label [] $ fromIncremental $ do 
                                                              t "(a) "
                                                              m p.a         
                                                              get
                            , D.label [] $ fromIncremental $ do 
                                                              t "(b) "
                                                              m p.b       
                                                              get
                            , D.label [] $ fromIncremental $ do 
                                                              t "(c) "
                                                              m p.c       
                                                              get
                            , D.label [] $ fromIncremental $ do 
                                                              m "u_3="
                                                              get
                            ]
                    nl
                    nl
                            

                    )
  if mode
    then t $ "réponses: " <> foldMapWithIndex (\i a -> " " <> show (i+1) <> ") ("<> a.r <> ")") chosen_problems
    else pure mempty
