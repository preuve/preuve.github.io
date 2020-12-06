module First where

import Prelude
import Data.Maybe(Maybe(..), fromJust)
import Data.Array((!!),length)
import Rand(Rand)
import Partial.Unsafe(unsafePartial)
import Article (fromIncremental, get, m, nl, put, t, b, em)
import Concur.Core (Widget)
import Concur.VDom (HTML)
import Concur.VDom.DOM as D
import Concur.VDom.GeometryRender(render')
import Concur.VDom.SVG as S
import Data.Geometry.Plane (point, segment)


tree :: forall a. Boolean -> Widget HTML a
tree mode = do
 -- https://www.sitepoint.com/how-to-translate-from-dom-to-svg-coordinates-and-back-again/
    D.div' $ fromIncremental do
        let pF = if mode then "0.52" else "\\dots"
        let pnF = if mode then "0.48" else "\\dots"
        let pgnFS = if mode then "0.175" else "\\dots"
        let pgnFnS = if mode then "0.825" else "\\dots"
      
        put $ S.svg
          [ S.width "500"
          , S.height "400"
          , S.attr "style" "position: absolute; " 
          ] $ 
            let root = point "" 12.0 175.0
                nodeA = point "" 100.0 92.0
                nodeA' = point "" 100.0 244.0
                startA = point "" 134.0 80.0
                endAB = point "" 202.0 24.0
                endAB' = point "" 202.0 136.0
                startA' = point "" 134.0 264.0
                endA'B = point "" 202.0 208.0
                endA'B' = point "" 202.0 320.0

                context = { stroke: "#000"
                          , strokeWidth: 1.5
                          , fill: "#00000000"
                          , fontStyle: "italic 15px arial, sans-serif"
                          , textFill: "#000"
                          }

              in render' context  [ segment root nodeA Nothing
                                  , segment root nodeA' Nothing 
                                  , segment startA endAB  Nothing
                                  , segment startA endAB'  Nothing
                                  , segment startA' endA'B  Nothing
                                  , segment startA' endA'B'  Nothing
                                  ]
        
        m $ "\\begin{array}{ccccccccc} & & & & & & & & S \\\\ "
          <> "& & & & & " <>  " \\\\ \\\\ "
          <> "& & & & F \\\\ "
          <> "& " <> pF <> " \\\\ "
          <> "& & & & & "  <> " \\\\ "
          <> "& & & & & & & &" <> "\\overline{S} \\\\ "
          <> "\\cdot \\\\ "
          <> "& & & & & & & &" <> "S \\\\ "
          <> "& & & & &" <> pgnFS <>" \\\\ "
          <> "&" <> pnF <> " \\\\ "
          <> "& & & & \\overline{F} \\\\ \\\\"
          <> "& & & & & " <> pgnFnS <> " \\\\ "
          <> "& & & & & & & & \\overline{S} \\end{array}"

        get



exo1 :: forall a. Rand -> Boolean -> Widget HTML a
exo1 _ mode = D.div' $ fromIncremental do
  em "Dans cet exercice, on arrondira les résultats au millième."
  nl
  t "Une agence Pôle Emploi étudie l'ensemble des demandeurs d'emploi selon deux critères, le sexe et l'expérience professionnelle."
  nl
  t "Cette étude montre que :"
  nl
  put $ D.ul []
    [ D.li [] [ D.div' $ fromIncremental do
          t "52% des demandeurs d'emploi sont des femmes et 48% sont des hommes ;"
          get
          ]
    , D.li [] [ D.div' $ fromIncremental do
          t "18% des demandeurs d'emploi sont sans expérience et les autres sont avec expérience ;"
          get
          ]
    , D.li [] [ D.div' $ fromIncremental do
          t "parmi les hommes qui sont demandeurs d'emploi, on sait que 17,5% sont sans expérience."
          get
          ]
    ]
  nl
  t "On prélève au hasard la fiche d'un demandeur d'emploi de cette agence. On note:"
  nl
  put $ D.ul [] 
    [ D.li [] [ D.div' $ fromIncremental do
        m "S"
        t" : l'événement \"le demandeur d'emploi est sans expérience\" ;"
        get
        ]
    , D.li [] [ D.div' $ fromIncremental do
        
       m "F"
       t " : l'événement \"le demandeur d'emploi est une femme\"."
       get
       ]
    ]
  
  nl
  b "1•"
  t " Préciser "
  m "p(S)"
  t " et "
  m "p_{\\overline{F}}(S)"
  t "."
  
  nl
  b "2•"
  t " Recopier l'arbre ci-dessous et compléter les pointillés par les probabilités associées."
  nl
  put $ tree mode
  nl
  nl
  b "3•"
  t " Démontrer que "
  m "p(\\overline{F}\\cap S)=0,084"
  t ". Interpréter le résultat."
  
  nl
  b "4•"
  t " La fiche prélevée est celle d'un demandeur d'emploi sans expérience. Calculer la probabilité pour que ce soit un homme."
  
  nl
  b "5•"
  nl
  m "\\quad"
  b " a)"
  t " Justifier que "
  m "p(S\\cap F)=0,096."
  
  nl
  m "\\quad"
  b " b)"
  t " Sachant que la fiche prélevée est celle d'une femme, calculer la probabilité que ce soit la fiche d'un demandeur d'emploi sans expérience."
  
  if mode
    then do
       nl
       t "réponses: 1) p(S)=0.18 pnF(S)=0.175 2)3)4) pS(nF)~0.467 5)a)b) pF(S)~0.185"
    else pure unit
  get

exo2 :: forall a. Rand -> Boolean -> Widget HTML a
exo2 _ mode = 
  D.div' $ fromIncremental do
  em "Dans cet exercice, on arrondira les résultats au millième."
  nl
  t "Une entreprise spécialisée dans la fabrication de confitures fait appel à des producteurs locaux."
  nl
  t "À la livraison, l’entreprise effectue un contrôle qualité à l’issue duquel les fruits sont sélectionnés ou non pour la préparation des confitures."
  nl
  t "Une étude statistique a établi que :"
  put $ D.ul [] 
    [ D.li [] [ D.div' $ fromIncremental do
        t "22% des fruits livrés sont issus de l’agriculture biologique ;"
        get
        ]
    , D.li [] [ D.div' $ fromIncremental do
        t "parmi les fruits issus de l’agriculture biologique, 95% sont sélectionnés pour la préparation des confitures ;"
        get
        ]
    , D.li [] [ D.div' $ fromIncremental do
        t "parmi les fruits non issus de l’agriculture biologique, 90% sont sélectionnés pour la préparation des confitures."
        get
        ]
    ]
  t "On prélève au hasard un fruit et on note :"
  put $ D.ul [] 
    [ D.li [] [ D.div' $ fromIncremental do
        m "B"
        t " l'événement \"le fruit est issu de l’agriculture biologique\" ;"
        get
        ]
        
    , D.li [] [ D.div' $ fromIncremental do
        m "S"
        t " l'événement \"le fruit est sélectionné pour la préparation des confitures\"."
        get
        ]
    ]
  b "1•"
  t " Représenter la situation par un arbre pondéré."
  
  nl
  b "2•◦"
  nl
  m "\\quad"
  b "a)"
  t " Calculer "
  m "p(B\\cap S)."
  nl
  m "\\quad"
  b "b)"
  t " Interpréter ce résultat dans le cadre de l'énoncé."
  
  nl
  b "3•◦"
  t " Montrer que la probabilité que le fruit est selectionné pour la préparation des confitures vaut 0,911."
  
  nl 
  b "4•"
  t " Sachant que le fruit a été selectionné pour la préparation des confitures, déterminer la probabilité qu'il ne soit pas issu de l'agriculture biologique."
  if mode
    then do
       nl
       t "réponses: 1)2)a)p(B/\\S)=0.209 b)3)pS(nB)~0.771"
    else pure unit
  get

first :: forall a. Rand -> Boolean -> Widget HTML a
first r mode = 
  let arr = [exo1 r mode, exo2 r mode]
  in unsafePartial $ fromJust 
                   $ arr !! r.val `mod` (length arr)

