module Main where

import Prelude

import Article (fromIncremental, get, m, nl, put, t, b, validateInput, setTitle, invPerm, measure)
import Concur.Core (Widget)
import Concur.Core.FRP (dyn, display, debounce)
import Concur.VDom (HTML)
import Concur.VDom.DOM as D
import Concur.VDom.GeometryRender(class Render, render', defaultContext)
import Concur.VDom.Props (onChange, unsafeTargetValue, onKeyEnter, attr, autoFocus, size) as P
import Concur.VDom.Run (runWidgetInDom)
import Concur.VDom.SVG as S
import Data.Array ((..), replicate, mapWithIndex)
import Data.Array ((!!)) as Array
import Data.Complex (Cartesian (..), real, imag)
import Data.Enum (succ)
import Data.Foldable (foldr, fold)
import Data.Geometry.Plane (Point, point, segment, vector, scale, (<+|), rename, circle, meets, abs, ord, arc)
import Data.Maybe (Maybe(..), fromMaybe, maybe)
import Data.Ord (abs) as Ord
import Data.Rational (fromInt, numerator, denominator)
import Data.String (CodePoint, codePointFromChar, fromCodePointArray)
import Effect (Effect)
import Rand (rand, unsort, consume, rands)

type State = { seed :: Maybe String
             , enabled :: Boolean 
             }

class HasDefault a where
  dflt :: a
  
instance dfltInt :: HasDefault Int where
  dflt = 0
  
instance dfltString :: HasDefault String where
  dflt = ""

instance dfltArray :: HasDefault a => HasDefault (Array a) where
    dflt = []

newtype Fraction = Frac (Array Int)

instance dfltFrac :: HasDefault Fraction where
  dflt = Frac []

instance dfltPoint :: HasDefault Point where
    dflt = point "" 0.0 0.0
    
instance showFraction :: Show Fraction where
  show (Frac [a,b]) = "\\dfrac{" <> show a <> "}{" <> show b <> "}"
  show _ = ""

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
        let ctx = defaultContext { strokeWidth = 1.0}
        let render :: forall a b. Render a => a -> Array (Widget HTML b)
            render = render' ctx 
            
            r1 = consume 3 r0
            r2 = consume 4 r1
            rs = rands 15 r2

        nl
        b "1." 
        let ab = (_ + 3) $ (rs !! 0) `mod` 10
            bm = (_ + 1) $ (_ + ab) $ (rs !! 1) `mod` 5
            ac = (_ + 1) $ (_ + ab) $ (rs !! 2) `mod` 5
            sol1 = fromInt ((ab + bm) * ac) / fromInt ab - fromInt ac
 
        put $ D.div [P.attr "style" "display: grid; grid-template-columns: 1fr 5fr ;"]
          [ S.svg
            [ S.width "180"
            , S.height "240"
            , S.viewBox "-10 -10 200 200" 
            ] $ let unit = 140.0
                    origx = 80.0
                    origy = 5.0
                    mkPoint name x y = point name (origx + unit * x) (origy - unit * y)
                    pA = mkPoint "A" 0.0 0.0
                    pB = mkPoint "B" (-0.2) (-0.5)
                    pC = mkPoint "C" (0.1) (-0.4)
                    k = 2.4
                    pM = rename "M" $ pA <+| scale k (vector pA pB)
                    pN = rename "N" $ pA <+| scale k (vector pA pC)
                in render[pA, pB, pC, pM, pN]
                    <> render [ segment pA pM Nothing
                              , segment pA pN Nothing
                              , segment pB pC Nothing
                              , segment pM pN Nothing
                              ]
          , D.div' $ fromIncremental $ do
            nl
            t " Sur la figure ci-contre (qui n'est pas à l'échelle), les droites "
            m "(BC)"
            t " et "
            m "(MN)"
            t " sont parallèles."
            nl
            t "On donne "
            m $ "AB =" <> show ab
            t ", "
            m $ "BM =" <> show bm
            t " et "
            m $ "AC =" <> show ac
            t "."
            nl
            t "Calculer la longueur "
            m " CN:"
            nl
            nl
            get
          ]

        nl
        b "2." 
        let ed = (_ + 3) $ (rs !! 3) `mod` 10
            ep = (_ + 1) $ (_ + ed) $ (rs !! 4) `mod` 5
            eq = (_ + 1) $ (_ + ep) $ (rs !! 5) `mod` 5
            sol2 = fromInt (ed * eq) / fromInt ep

        put $ D.div [P.attr "style" "display: grid; grid-template-columns: 1fr 5fr ;"]
          [ S.svg
            [ S.width "180"
            , S.height "240"
            , S.viewBox "-10 -10 200 200" 
            ] $ let unit = 140.0
                    origx = 80.0
                    origy = 5.0
                    mkPoint name x y = point name (origx + unit * x) (origy - unit * y)
                    pE = mkPoint "E" (-0.2) (-0.5)
                    pD = mkPoint "D" 0.0 0.0
                    pF = mkPoint "F" (-0.4) (-0.1)
                    k = -1.3
                    pP = rename "P" $ pE <+| scale k (vector pE pD)
                    pQ = rename "Q" $ pE <+| scale k (vector pE pF)
                in render[pD, pE, pF, pP, pQ]
                    <> render [ segment pD pP Nothing
                              , segment pF pQ Nothing
                              , segment pD pF Nothing
                              , segment pP pQ Nothing
                              ]
          , D.div' $ fromIncremental $ do
            nl
            t " Sur la figure ci-contre (qui n'est pas à l'échelle), les droites "
            m "(DF)"
            t " et "
            m "(PQ)"
            t " sont parallèles."
            nl
            t "On donne "
                
            m $ "ED =" <> show ed
            t ", "
            m $ "EP =" <> show ep
            t " et "
            m $ "EQ =" <> show eq
            t "."
            nl
            t "Calculer la longueur "
            m " EF:"
            nl
            nl
            get
          ]

        nl 
        b "3."
        let props = [ "(BC)\\; \\mathrm{et}\\; (DE) \\;\\mathrm{sont}\\; \\mathrm{parall\\grave{e}les}"
                    , "(BC)\\; \\mathrm{et} \\;(FG)\\; \\mathrm{sont}\\; \\mathrm{parall\\grave{e}les}"
                    , "(DE)\\; \\mathrm{et} \\;(FG)\\; \\mathrm{sont}\\; \\mathrm{parall\\grave{e}les}"
                    ]
            sol3 = [(0..2) !! (rs !! 6) `mod` 3]
            {ab,ac,ad,ae,af,ag} = 
                case sol3 !! 0 of
                     0 ->  {ab:2,ac:3,ad:4,ae:6,af:7,ag:11}
                     1 ->  {ab:3,ac:2,ad:4,ae:6,af:12,ag:8}
                     _ ->  {ab:2,ac:3,ad:3,ae:6,af:4,ag:8}
            ord3 = unsort 3 r0

                    
        put $ D.div [P.attr "style" "display: grid; grid-template-columns: 1fr 5fr ;"]
          [ S.svg
            [ S.width "400"
            , S.height "180"
            , S.viewBox "-10 -35 400 220" 
            ] $ let unit = 150.0
                    origx = 30.0
                    origy = 65.0
                    style = [ S.attr "font-size" "20"
                            , S.attr "font-weight" "700"
                            ]
                    mkPoint name x y = point name (origx + unit * x) (origy - unit * y)
                    pA = mkPoint "A" 0.0 0.0
                    pB = mkPoint "B" (-0.3) (-0.15)
                    pC = mkPoint "C" (-0.4) (0.1)
                    pD = rename "D" $ pA <+| scale (-1.95) (vector pA pB)
                    pE = rename "E" $ pA <+| scale (-1.9) (vector pA pC)
                    pF = rename "F" $ pA <+| scale (-3.3) (vector pA pB)
                    pG = rename "G" $ pA <+| scale (-3.4) (vector pA pC)
                in render[pA, pB, pC, pD, pE, pF, pG]
                    <> render [ segment pB pF Nothing
                              , segment pG pC Nothing
                              , segment pC pB Nothing
                              , segment pE pD Nothing
                              , segment pF pG Nothing
                              ]
                    <> [ S.text (measure pB pA 20.0 <> style) [D.text $ show ab]
                       , S.text (measure pA pE 20.0 <> style) [D.text $ show ae]
                       , S.text (measure pE pG 20.0 <> style) [D.text $ show $ ag - ae]
                       , S.text (measure pC pA (-8.0) <> style) [D.text $ show ac]
                       , S.text (measure pA pD (-8.0) <> style) [D.text $ show ad]
                       , S.text (measure pD pF (-8.0) <> style) [D.text $ show $ af - ad]
                       ]
          , D.div' $ fromIncremental $ do
            nl
            t " Sur la figure ci-contre (qui n'est pas à l'échelle), on a reporté la longueur de six segments."
            nl
            t " Une seule des affirmations ci-dessous est exacte."
            nl
            t " Déterminer laquelle :" 
            get
            ]
        nl
        nl
        put $ showProp props ord3
        nl
 
        nl
        b "4."
        t " Les quatre triangles en gras des figures ci-dessous ont pour sommets des points d'un quadrillage (grille composée de carrés)."
        nl
        t "Trois de ces triangles sont semblables."
        nl
        t "Trouver l'intrus :"
        let type0 = [[0,5,6],[2,3,8],[0,2,7],[1,6,8]]
            typeI = [[0,1,3],[1,3,4],[0,4,1],[0,3,4]
                    ,[1,4,5],[1,2,5],[1,4,2],[2,4,5]
                    ,[3,6,7],[3,7,4],[3,4,6],[4,6,7]
                    ,[4,7,8],[4,8,5],[4,5,7],[5,7,8]
                    ]
            typeII = [[0,4,6],[1,3,7],[1,7,5],[2,4,8]
                     ,[1,3,5],[0,2,4],[3,5,7],[4,6,8]
                     ]
            typeIII = [[0,2,6],[2,6,8],[0,2,8],[0,6,8]]
                       
            sol4 = [0]
            ord4 = unsort 4 r1
            tri0 = type0 !! (rs !! 7) `mod` 4
            triI = typeI !! (rs !! 8) `mod` 16
            triII = typeII !! (rs !! 9) `mod` 8
            triIII = typeIII !! (rs !! 10) `mod` 4
            shuffle n = 
                case ord4 !! n of
                        0 -> tri0
                        1 -> triI
                        2 -> triII
                        _ -> triIII

        nl
        put $ S.svg
            [ S.width "800"
            , S.height "180"
            , S.viewBox "-10 -35 800 220" 
            ] $ let unit = 60.0
                    origy = 5.0
                    offx = 10.0
                    mkPoint name x y origx = point name (origx + unit * x) (origy + unit * y)
                    mkSquare origx tri txt =
                        let pA = mkPoint "" 0.0 0.0 origx
                            pB = mkPoint "" 1.0 0.0 origx
                            pC = mkPoint "" 2.0 0.0 origx
                            pD = mkPoint "" 0.0 1.0 origx
                            pE = mkPoint "" 1.0 1.0 origx
                            pF = mkPoint "" 2.0 1.0 origx
                            pG = mkPoint "" 0.0 2.0 origx
                            pH = mkPoint "" 1.0 2.0 origx
                            pI = mkPoint "" 2.0 2.0 origx
                            vertices = [ pA, pB, pC, pD, pE, pF, pG, pH, pI ]
                        in [ S.text [ S.attr "x" (show $ origx - unit/2.0)
                                    , S.attr "y" (show $ origy + unit)
                                    , S.attr "font-size" "20"
                                    ] [D.text txt]
                           ] 
                          <> render 
                            [ segment pA pC Nothing
                            , segment pA pG Nothing
                            , segment pC pI Nothing
                            , segment pI pG Nothing
                            , segment pB pH Nothing
                            , segment pD pF Nothing
                            ]
                          <>
                          render' defaultContext {strokeWidth = 4.0} 
                            [ segment (vertices !! (tri !! 0)) (vertices !! (tri !! 1)) Nothing
                            , segment (vertices !! (tri !! 1)) (vertices !! (tri !! 2)) Nothing
                            , segment (vertices !! (tri !! 2)) (vertices !! (tri !! 0)) Nothing
                            ]
                        in mkSquare offx (shuffle 0)  "a)"
                    <> mkSquare (offx + 4.0 * unit) (shuffle 1) "b)"
                    <> mkSquare (offx + 8.0 * unit) (shuffle 2) "c)"
                    <> mkSquare (offx + 12.0 * unit) (shuffle 3) "d)"
                    <> []

        nl
        nl
        b "5."
        let inf = (_ + 2) $ (rs !! 11) `mod` 10
            sup = (_ + 2) $ (_ + inf) $ (rs !! 12) `mod` 20
            thirdMin = 1 + max inf (sup - inf)
            thirdMax = sup - 1
            third = thirdMin + (rs !! 13) `mod` (thirdMax - thirdMin + 1)
            coef = (_ + 2) $ (rs !! 14) `mod` 10

        put $ D.div [P.attr "style" "display: grid; grid-template-columns: 1fr 5fr ;"]
          [ S.svg
            [ S.width "400"
            , S.height "180"
            , S.viewBox "-10 -35 400 220" 
            ] $ let lAB = 8.0
                    pA = point "A" 0.0 0.0
                    pB = point "B" lAB 0.0
                    
                    c1 = circle pA 3.0
                    c2 = circle pB 6.0
                    pC = (c1 `meets` c2) !! 0
                    
                    complex p = Cartesian (abs p) (ord p)
                    
                    zA = complex pA
                    zB = complex pB
                    zC = complex pC                    
                    
                    s1 z = 
                        let transA = Cartesian 5.0 20.0
                            transB = Cartesian 150.0 120.0
                            m = (_ / lAB) <$> (transB - transA)
                            p = transA
                        in m * z + p
                        
                    s2 z = 
                        let transA = Cartesian 400.0 80.0
                            transB = Cartesian 150.0 150.0
                            m = (_ / lAB) <$> (transB - transA)
                            p = transA
                        in m * z + p
                    
                    mkPoint z = point "" (real z) (imag z)
                    
                    pD = mkPoint $ s1 zA
                    pE = mkPoint $ s1 zB
                    pF = mkPoint $ s1 zC
                    pG = mkPoint $ s2 zA
                    pH = mkPoint $ s2 zB
                    pI = mkPoint $ s2 zC
                    angle p o q r b1 b2 b3 = arc (vector o p) o (vector o q) r b1 b2 b3 Nothing
                in   render [ segment pD pE Nothing
                            , segment pD pF Nothing
                            , segment pE pF Nothing
                            , segment pG pH Nothing
                            , segment pG pI Nothing
                            , segment pH pI Nothing
                            ]
                    <> render [ angle pF pD pE 25.0 false false false
                              , angle pI pG pH 25.0 false false false
                              , angle pE pF pD 15.0 false false false
                              , angle pH pI pG 15.0 false false false
                              , angle pE pF pD 20.0 false false false
                              , angle pH pI pG 20.0 false false false
                              
                              ]
                    <> [ S.text (measure pD pE 20.0) [D.text $ show sup]
                       , S.text (measure pD pF (-8.0)) [D.text $ show inf]
                       , S.text (measure pH pG (-8.0)) [D.text $ show $ coef * sup]
                       , S.text (measure pH pI 20.0) [D.text $ show $ coef * third]
                       , S.text (measure pI pG 20.0) [D.text $ show $ coef * inf]
                       ]
          , D.div' $ fromIncremental $ do
            nl
            t " On se donne deux triangles semblables."
            nl
            t " Sur la figure ci-contre (qui n'est pas à l'échelle) sont reportées les longueurs de tous leurs côtés sauf une."
            nl
            t " Calculer la longueur manquante :"
            get
            ]
            
            
        if (fromMaybe 0 $ validateInput newState.seed) < 0
            then do
              nl
              t "réponses: "
              b " 1. "
              m $ show $ Frac [numerator sol1, denominator sol1]
              b " 2. "
              m $ show $ Frac [numerator sol2, denominator sol2]
              b " 3. "
              t $ showSol sol3 ord3
              b " 4. "
              t $ showSol sol4 ord4
              b " 5. "
              m $ show third
             else pure mempty

        get

initialState = { seed: Nothing 
               , enabled: false
               } :: State

header :: forall a. Widget HTML a
header = D.div' $ fromIncremental $ do
  setTitle "Devoir 2 : Théorème de Thalès, réciproque. Triangles semblables"
  nl
  put $ D.div [ P.attr "style" "display: grid; grid-template-columns: 1fr 1fr 1fr;"]
      [ D.label [] [D.text "Nom:"]
      , D.label [] [D.text "Prénom:"]
      , D.label [] [D.text "Classe:"]
      ]
  put $ D.ul []
      [ D.li [] [D.text "5 questions"]
      , D.li [] (fromIncremental $ do
           t "1 point par bonne réponse"
           get)
      , D.li [] [D.text "calculatrice autorisée"]
      , D.li [] [D.text "on donnera les résultats numériques sous forme entière ou de fraction irréductible"]
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
