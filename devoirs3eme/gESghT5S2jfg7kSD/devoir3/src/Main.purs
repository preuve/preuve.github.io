module Main where

import Prelude

import Article (IncrementalArrayLine, fromIncremental, get, m, nl, put, t, b, validateInput, setTitle, invPerm, measure)
import Concur.Core (Widget)
import Concur.Core.FRP (dyn, display, debounce)
import Concur.VDom (HTML)
import Concur.VDom.DOM as D
import Concur.VDom.GeometryRender(class Render, render', defaultContext)
import Concur.VDom.Props (onChange, unsafeTargetValue, onKeyEnter, attr, autoFocus, size) as P
import Concur.VDom.Run (runWidgetInDom)
import Concur.VDom.SVG as S
import Data.Array (replicate, mapWithIndex)
import Data.Array ((!!), length) as Array
import Data.Enum (succ)
import Data.Foldable (foldr, fold)
import Data.Geometry.Plane (Point, Line, point, segment, vector, (<+|), rename, circle, meets, arc, normalTo, line, middle, length, abs, ord, scale, rightangle)
import Data.Maybe (Maybe(..), fromMaybe, maybe)
import Data.Ord (abs) as Ord
import Data.Rational (Rational, fromInt, numerator, denominator)
import Data.String (CodePoint, codePointFromChar, fromCodePointArray)
import Effect (Effect)
import Rand (Rand, rand, unsort, consume)
import Data.Int (round)

type State = { seed :: Maybe String
             , enabled :: Boolean 
             }

class HasDefault a where
  dflt :: a
  
instance dfltInt :: HasDefault Int where
  dflt = 0
  
instance dfltString :: HasDefault String where
  dflt = ""

instance dfltPoint :: HasDefault Point where
  dflt = point "" 0.0 0.0

instance dfltArray :: HasDefault a => HasDefault (Array a) where
    dflt = []
    
showFraction :: Rational -> String
showFraction p = "\\dfrac{" <> show (numerator p) <> "}{" <> show (denominator p) <> "}"

nth :: forall a. HasDefault a => Array a -> Int -> a
nth xs n = case xs Array.!! n of
  Just x -> x
  _      -> dflt

infixr 6 nth as !!

after :: CodePoint -> Int -> String
after letter n = 
    fromCodePointArray [ foldr (<<<) 
                                identity 
                                (replicate n 
                                            ((\x -> fromMaybe letter x) <<< succ)
                                ) 
                                letter
                        ]

showProp :: forall a. Array String -> Array Int -> Widget HTML a
showProp props ord =
    let a = codePointFromChar 'a'
        templateCols = fold $ const " 1fr" <$> props
    in D.div [P.attr "style" $ "display: grid; grid-template-columns:" <> templateCols <> ";"] $
        mapWithIndex (\i _ ->
            D.label []
                ( fromIncremental $ do
                    t $ after a i <> ") "
                    _ <- m $ props !! (ord !! i)
                    get
                )
            ) props

showSol :: Array Int -> Array Int -> String
showSol reps ord =
    let revOrd = invPerm ord
        a = codePointFromChar 'a'
    in foldr (<>) "" $ ((_ <> ")") <<< after a <<< (revOrd !! _)) <$> reps

primes :: Array (Array Int)
primes = [ [ 2, 4, 8, 16, 32]
         , [ 3, 9, 27, 81 ]
         , [ 5, 25 ]
         , [ 7, 49 ]
         ]

type Problem1 = 
  { a :: Int 
  , b :: Int
  , g :: Int
  , u :: Int
  , v :: Int
  , p :: Int
  , ok :: Boolean
  , unfit :: Int 
  } 
         
randomDataSet :: Rand -> Problem1
randomDataSet r0 = -- assumimg 'consumes 8 r' have been considered
  let r1 = rand r0
      r2 = rand r1
      r3 = rand r2
      r4 = rand r3
      primeLines = unsort 4 r4
      
      p1 = primes !! (primeLines !! 0)
      g1 = p1 !! (r1.val `mod` (Array.length p1 - 1))
      p2 = primes !! (primeLines !! 1)
      g2 = p2 !! (r2.val `mod` (Array.length p2 - 1))
      p3 = primes !! (primeLines !! 2)
      u' = p3 !! (r3.val `mod` (Array.length p3 - 1))
      p4 = primes !! (primeLines !! 3)
      v' = p4 !! (r4.val `mod` (Array.length p4 - 1))
      g = g1 * g2
      { a, b, u, v } = 
        if u' < v' then { a: g * u', b: g * v', u: u', v: v' }
                   else { a: g * v', b: g * u', u: v', v: u' }
      p = a * v
      ok = p == b * u
      unfit = a `div` max g1 g2
  in { a, b, g, u, v, p, ok, unfit } 

ex1 :: forall a. Problem1 -> Widget HTML a
ex1 {a,b,g,u,v,ok,unfit} = 
  D.div' 
    [ D.label' [D.text "Deux amis discutent"]
    , D.br [] []
    , D.br [] []
    , D.em [] [ D.text "•AUREL : " ]
    , D.label' [D.text "Belle pêche ! Combien de poissons et de coquillages vas-tu pouvoir vendre au marché ?"]
    , D.br [] []
    , D.em [] [ D.text "•ANTOINE : "]
    , D.label' [D.text "En tout, je vais pouvoir vendre au marché "]
    , D.label' [D.text $ show a]
    , D.label' [D.text " poissons et "]
    , D.label' [D.text $ show b]
    , D.label' [D.text " coquillages. "]
    , D.br [] []
    , D.br [] []
    , D.label' [D.text "Antoine est un pêcheur professionnel. Il veut vendre des paniers contenant des coquillages et des poissons. Il souhaite concevoir le plus grand nombre possible de paniers identiques. Enfin, il voudrait qu’il ne lui reste aucun coquillage et aucun poisson dans son congélateur."]
    , D.br [] []
    , D.node "ol" []
      [ D.li [] [ D.text "Peut-il concevoir "
                , D.text $ show unfit 
                , D.text " paniers ? Pourquoi ?"
                ]
      , D.li [] [ D.text "Combien de paniers au maximum Antoine pourra t-il concevoir ? Justifier." ]
      , D.li [] [ D.text "Quelle sera la composition de chaque panier ? Justifier."]
      ]
    ]

rep1 :: forall a. Problem1 -> IncrementalArrayLine a
rep1 dataSet = do
  b " I "
  t $ show dataSet.ok
  b $ " I.1) "
  t $ " Non, " <> show dataSet.unfit <> " n'est pas un diviseur de " <> show dataSet.b <> "."
  b $ " I.2) "
  t $ " le plus grand diviseur commun de " <> show dataSet.a <> " et " <> show dataSet.b <> " est " <> show dataSet.g <> " donc il pourra concevoir " <> show dataSet.g <> " paniers au maximum."
  b $ " I.3) "
  t $ show dataSet.u <> " poissons et " <> show dataSet.v <> " coquillages par panier." 

ex2 :: forall a. Problem1 -> Widget HTML a
ex2 {a,b,g,u,v,ok,unfit} = 
  D.div' 
    [ D.label' [D.text "Deux voitures partent en même temps de la ligne de départ et font plusieurs tours d’un même circuit."]
    , D.br [] []
    , D.label' [D.text $ "La voiture A fait le tour du circuit en " <> show a <> " secondes et a voiture B en " <> show b <> " secondes. "]
    , D.br [] []
    , D.label' [D.text $ "Y-a-t-il des moments (autres que le départ!) où les voitures se croisent sur la ligne de départ ? Expliquer."]
    ]

rep2 :: forall a. Problem1 -> IncrementalArrayLine a
rep2 dataSet = do
  b " II "
  t $ show dataSet.ok
  t $ " Oui, comme le plus petit commun multiple de " <> show dataSet.a <> " et de " <> show dataSet.b <> " est " <> show dataSet.p <> ", les voitures se croisent sur la ligne d'arrivée toutes les " <> show dataSet.p <> " secondes."

ex3 :: forall a. Problem1 -> Widget HTML a
ex3 {a,b,g,u,v,ok,unfit} = 
  D.div' 
    [ D.label' [D.text $ "Dans un collège de " <> show b <> " élèves, " <> show a <> " élèves affirment manger au moins cinq fruits et légumes par jour. "]
    , D.br [] []
    , D.label' [D.text "Donner la fraction irréductible représentant la proportion de ces élèves."]
    ]

rep3 :: forall a. Problem1 -> IncrementalArrayLine a
rep3 dataSet = do
  b " III "
  t $ show dataSet.ok
  m $ showFraction $ fromInt dataSet.a / fromInt dataSet.b

mediatrice :: Point -> Point -> Line
mediatrice p q =
  let i = middle "" $ segment p q Nothing
      v = normalTo $ vector p q
  in line i $ i <+| v

circumCenter :: Point -> Point -> Point -> Point
circumCenter p q r =
  let m1 = mediatrice p q
      m2 = mediatrice p r
  in (m1 `meets` m2) !! 0

ex4 :: forall a. Widget HTML a
ex4 =
  D.div' $ fromIncremental do
    put $ D.div [ P.attr "style" "display: grid; grid-template-columns: 1fr 3fr;"]
      [ S.svg
        [ S.width "230"
        , S.height "170"
        ] $ let pA = point "A" 40.0 23.0
                pB = point "B" 190.0 64.0
                pC = point "C" 200.0 120.0
                pO = circumCenter pA pB pC
                bo = line pB pO
                c = circle pO $ length $ vector pO pB
                pD = rename "D" $ (bo `meets` c) !! 1
                pI = rename "I" $ (_ !! 0) $ (line pB pD) `meets` (line pA pC)
                
            in render' defaultContext 
              [ pA, pB, pI, pD, pC ]
              <> render' defaultContext
              [ segment pA pB Nothing
              , segment pC pB Nothing
              , segment pC pD Nothing
              , segment pA pD Nothing
              , segment pA pC Nothing
              , segment pD pB Nothing
              ]
              <> render' defaultContext
              [ arc (vector pA pB) pA (vector pA pC) 30.0 false false false Nothing
              , arc (vector pD pB) pD (vector pD pC) 30.0 false false false Nothing
              ]
          , D.div' $ fromIncremental do 
            m "ABCD"
            t " est un quadrilatère tel que "
            m " \\widehat{BAC}=\\widehat{BDC}"
            t "."
            nl
            t " On note "
            m "I"
            t " le point d'intersection des diagonales "
            m "[AC]"
            t " et "
            m "[BD]"
            t "."
            get
      ]
    nl
    b "a. "
    t "Expliquer pourquoi les angles "
    m "\\widehat{AIB}"
    t " et "
    m "\\widehat{DIC}"
    t " sont de même mesure."
    nl
    b "b. "
    t "En déduire alors que les triangles "
    m "AIB"
    t " et "
    m "DIC"
    t " sont semblables."
    nl
    b "c. "
    t "Montrer alors que "
    m "AI\\times IC = DI \\times IB"
    t "."
    get

rep4 :: forall a. IncrementalArrayLine a
rep4 = do
  b " IV "
  b " a. "
  t "angles opposés par le sommet"
  b " b. "
  t "triangles avec deux angles égaux"
  b " c. "
  m "\\frac{AI}{DI}=\\frac{IB}{IC}"

ex5 :: forall a. Problem1 -> Widget HTML a
ex5 {a,b,g,u,v,ok,unfit} = 
  D.div [ P.attr "style" "display: grid; grid-template-columns: 3fr 2fr;"]
      [ D.div' $ fromIncremental do 
             t "Pendant les vacances, Robin est allé visiter le phare Amédée."
             nl
             nl
             t "Lors d'une sieste sur la plage il a remarqué que le sommet d'un parasol était en parfait alignement avec le sommet du phare. Robin a donc pris quelques mesures et a décidé de faire un schéma de la situation dans le sable pour trouver une estimation de la hauteur du phare."
             nl
             nl
             t "Les points "
             m "B"
             t ", "
             m "J"
             t " et "
             m "R"
             t " sont alignés."
             nl
             m "(SB)"
             t " et "
             m "(BR)"
             t " sont perpendiculaires."
             nl
             m "(PJ)"
             t " et "
             m "(BR)"
             t " sont perpendiculaires."
             nl 
             nl
             t "Quelle hauteur, arrondie au mètre, va-t-il trouver à l'aide de son plan ? Justifier la réponse."
             get
      , S.svg
        [ S.width "400"
        , S.height "450"
        ] $ let origx = 40.0
                origy = 23.0
                largeur_pic_tour = 5.0
                largeur_base_tour = 15.0
                hauteur_tour = 360.0
                mer = origy + hauteur_tour
                plage = origx + dist_tour_para
                hauteur_para = 100.0
                largeur_para = 8.0
                hauteur_pied_para = 30.0
                dist_tour_para = 200.0 
                pS = point "S" origx origy
                pS' = point "" (origx - largeur_pic_tour) origy
                pB = point "B" origx mer
                pB' = point "" (origx - largeur_base_tour) mer
                pP = point "P" plage (mer - hauteur_para)
                pJ = point "J" plage mer
                pQ = point "" plage (mer - hauteur_pied_para)
                pQ' = point "" (plage - largeur_para / 2.0) (mer - hauteur_pied_para)
                pQ'' = point "" (plage + largeur_para / 2.0) (mer - hauteur_pied_para)
                pR = rename "R" $ (_ !! 0) $ line pS pP `meets` line pB pJ
                
                style = [ S.attr "font-size" "17"
                        , S.attr "font-weight" "500"
                        ]
                center p q k o = measure p (p <+| scale k (vector p q)) o <> style
                retrait1 = 60.0
                pO = point "" origx (mer + retrait1)
                pO' = point "" (abs pR) (mer + retrait1)
                
                retrait2 = 30.0
                pM = point "" plage (mer + retrait2)
                pM' = point "" (abs pR) (mer + retrait2)
                
                retrait3 = 30.0
                pN = point "" (plage - retrait3) (ord pP)
                pN' = point "" (plage - retrait3) mer
                
                pI = point "" 350.0 400.0
                pK = middle "" $ segment pP pQ'' Nothing
                pL = point "" 280.0 300.0
 
            in render' defaultContext
              [ segment pB pS Nothing
              , segment pS pS' Nothing
              , segment pS' pB' Nothing
              , segment pB' pR Nothing
              , segment pJ pQ Nothing
              , segment pQ' pQ'' Nothing
              , segment pQ'' pP Nothing
              , segment pP pQ' Nothing
              
              , segment pO pO' $ Just ""
              , segment pO' pO $ Just ""
              
              , segment pM pM' $ Just ""
              , segment pM' pM $ Just ""
              
              , segment pN pN' $ Just ""
              , segment pN' pN $ Just ""
              
              , segment pI pR $ Just ""
              , segment pL pK $ Just ""
              ]
              <> [ S.line 
                    [ S.attr "x1" $ show $ round $ abs pS
                    , S.attr "y1" $ show $ round $ ord pS
                    , S.attr "x2" $ show $ round $ abs pR
                    , S.attr "y2" $ show $ round $ ord pR
                    , S.stroke "#000"
                    , S.strokeWidth 2
                    , S.attr "stroke-dasharray" "5,5"
                    ]
                    []
                  ]
              <> render' defaultContext [pS, pB, pP, pJ, pR]
              <> render' defaultContext (line pB' pR)
              <> [ S.text (center pB' pS' 0.75 (-9.0)) [D.text "Phare"]
                 , S.text (center pO pO' 0.85 (-9.0)) [D.text "34,7 m"]
                 , S.text (center pM pM' 0.4 (-9.0)) [D.text "1,3 m"]
                 , S.text (center pN pN' 1.4 (12.0)) [D.text "2,1 m"]
                 , S.text (center pR pI 2.1 (3.0)) [D.text "moi"]
                 , S.text (center pK pL 2.1 (3.0)) [D.text "parasol"]
                 ]
              <> render' defaultContext
                [ rightangle (vector pB pS) pB (vector pB pJ) 10.0
                , rightangle (vector pJ pP) pJ (vector pJ pB) 10.0
                ]
      ]

rep5 :: forall a. Problem1 -> IncrementalArrayLine a
rep5 dataSet = do
  b " III "
  t $ show dataSet.ok
  m $ showFraction $ fromInt dataSet.a / fromInt dataSet.b

opener :: forall a. String -> String -> IncrementalArrayLine a
opener title points =
  put $ D.div' 
          [ D.div [P.attr "style" "margin: 0; display: flex; justify-content: space-between"]
              [ D.label [P.attr "style" "font-size: 24px; font-weight: 700;"]  [D.text title]
              , D.label [P.attr "style" "font-size: 16px; font-weight: 700;"] [D.text points]
              ]
          , D.hr'
          ]

body :: State -> Widget HTML State
body st = dyn $ do
  display $ D.text "Enoncé n° "
  newState <- debounce 50.0 st $ 
                \s -> D.input 
                        [ P.size 6
                        , P.autoFocus true
                        , (\ x -> { seed: show <$> (validateInput $ Just x)
                                  , enabled: false
                                  }
                          )  <$> P.unsafeTargetValue 
                             <$> P.onChange
                        , s { enabled = maybe false (const true) 
                                        $ validateInput s.seed} <$ P.onKeyEnter
                        ]
  let odd = 2 * Ord.abs (fromMaybe 0 $ validateInput newState.seed) + 1
      r0 = rand { val: odd
                , gen: 0
                , seed: odd*odd
                }
                    
  display $ D.div' $ if not newState.enabled 
      then []
      else fromIncremental $ do 
        let ctx = defaultContext { strokeWidth = 1.0 }
        let render :: forall a b. Render a => a -> Array (Widget HTML b)
            render = render' ctx 
            
            f r r' = if r'.val == r.val
                     then f r $ rand r'
                     else r'

            r1 = consume 8 r0
            r2 = f r1 $ consume 8 r1
            r3 = f r2 $ consume 8 r2
            r5 = f r2 $ consume 8 r3
            
        nl
        opener "Exercice I" "4,5 points"
        let dataSet1 = randomDataSet r1
        put $ ex1 dataSet1
            
        nl
        nl
        opener "Exercice II" "4,5 points"
        let dataSet2 = randomDataSet r2
        put $ ex2 dataSet2
            
        nl
        nl
        opener "Exercice III""3 points"
        let dataSet3 = randomDataSet r3
        put $ ex3 dataSet3
            
        nl
        nl
        opener "Exercice IV" "4 points"
        put ex4
            
        nl
        nl
        opener "Exercice V" "3 points"
        let dataSet5 = randomDataSet r5
        put $ ex5 dataSet5
            
        if (fromMaybe 0 $ validateInput newState.seed) < 0
            then do
              nl
              t "réponses: "
              rep1 dataSet1
              rep2 dataSet2
              rep3 dataSet3
              rep4
              rep5 dataSet5
             else pure mempty

        get

initialState = { seed: Nothing 
               , enabled: false
               } :: State

header :: forall a. Widget HTML a
header = D.div' $ fromIncremental $ do
  setTitle "Devoir 3 : Nombres premiers / Thalès - Triangles semblables"
  nl
  put $ D.div [ P.attr "style" "display: grid; grid-template-columns: 1fr 1fr 1fr;"]
      [ D.label [] [D.text "Nom:"]
      , D.label [] [D.text "Prénom:"]
      , D.label [] [D.text "Classe:"]
      ]
  put $ D.ul []
      [ D.li [] [D.text "Les 5 exercices sont indépendants."]
      , D.li [] [D.text "L'usage de la calculatrice est autorisé."]
      , D.li [] [D.text "On veillera à respecter le format indiqué pour les résultats numériques."]
      , D.li [] [D.text "La maîtrise de la langue et la présentation rapporteront 1 point."]
      ]
  get

article :: State -> Widget HTML State
article state =
  D.div'
    [ header
    , body state
    ]

main :: Effect Unit
main = runWidgetInDom "main"
           $ article initialState
