module Main where

import Prelude

import Article  ( fromIncremental
                , get, m, nl, put, t, b, em, validateInput
                , setTitle, invPerm)
import Concur.Core (Widget)
import Concur.Core.FRP (dyn, display, debounce)
import Concur.VDom (HTML)
import Concur.VDom.DOM as D
import Concur.VDom.GeometryRender(class Render, render', defaultContext)
import Concur.VDom.Props  (onChange, unsafeTargetValue
                          , onKeyEnter, attr, autoFocus, size) as P
import Concur.VDom.Run (runWidgetInDom)
import Data.Array (replicate, mapWithIndex)
import Data.Array ((!!)) as Array
import Data.Enum (succ)
import Data.Foldable (fold, foldr)
import Data.Int (toNumber, round)
import Data.Maybe (Maybe(..), fromMaybe, maybe)
import Data.String (CodePoint, codePointFromChar, fromCodePointArray)
import Data.Tuple.Nested ((/\), type (/\))
import Data.Ord (abs) as Ord
import Effect (Effect)
import Math (pi)
import Rand (rand, consume, rands, unsort)

type State = { seed :: Maybe String
             , enabled :: Boolean 
             }

class HasDefault a where
  dflt :: a
  
instance dfltInt :: HasDefault Int where
  dflt = 0

instance dfltString :: HasDefault String where
  dflt = ""
  
nth :: forall a. HasDefault a => Array a -> Int -> a
nth xs n = case xs Array.!! n of
  Just x -> x
  _      -> dflt

infixr 6 nth as !!

-- | Two different random integers in [mi; ma[
randDifferentRadii :: Int -> Int -> Int /\ Int -> Int /\ Int
randDifferentRadii ra rb (mi /\ ma) =
  let x = ra `mod` (ma - mi)
      dx = 1 + rb `mod` (ma - mi - 2)
  in (mi + x) /\ (mi + (x + dx) `mod` (ma - mi))

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
                        , s { enabled = 
                                maybe false (const true) 
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
        
            r1 = consume 4 r0
            r2 = consume 4 r1
            r3 = consume 4 r2
            r4 = consume 4 r3
            r5 = consume 4 r4
            r6 = consume 4 r5
            r7 = consume 4 r6
            r8 = consume 4 r7
            r9 = consume 4 r8
            rs = rands 12 r9
            rad1 /\ rad2 = randDifferentRadii (rs !! 0) (rs !! 1) (5 /\ 10)
            halfrad3 /\ halfrad4 = randDifferentRadii (rs !! 2) (rs !! 3) (5 /\ 10)
            latitude /\ longitude = randDifferentRadii (rs !! 4) (rs !! 5) (10 /\ 81)
            thirdrad7 /\ thirdrad8 = randDifferentRadii (rs !! 6) (rs !! 7) (5 /\ 10)
            rad9 /\ rad10 = randDifferentRadii (rs !! 8) (rs !! 9) (5 /\ 10)
            m' /\ n' = randDifferentRadii (rs !! 10) (rs !! 11) (5 /\ 10)
            
            sol1 = [0]
            ord1 = unsort 4 r0
            sol2 = [1]
            ord2 = unsort 4 r1
            sol3 = [2]
            ord3 = unsort 4 r2
            sol4 = [2]
            ord4 = unsort 4 r3
            sol5 = [0,3]
            ord5 = unsort 4 r4
            sol6 = [3]
            ord6 = unsort 4 r5
            sol7 = [0]
            ord7 = unsort 4 r6
            sol8 = [0]
            ord8 = unsort 4 r7
            sol9 = [1,2]
            ord9 = unsort 4 r8
            sol10 = [0,3]
            ord10 = unsort 4 r9
            
        nl
        
        nl
        b "1. "
        t "Soit "
        m "M"
        t " un point sur une sphère de centre "
        m "O"
        t " et de rayon "
        m $ show rad1
        t " cm."
        nl
        t "On peut être sûr que"
        nl
        nl
        let props rad = [ "OM =" <> show rad <> "\\;\\mathrm{cm}"
                        , "OM \\leq" <> show rad <> "\\;\\mathrm{cm}"
                        , "OM \\geq " <> show rad <> "\\;\\mathrm{cm}"
                        , "OM > " <> show rad <> "\\;\\mathrm{cm}"
                        ]
              
        put $ showProp (props rad1) ord1
        nl
 
        nl
        b "2. "
        t "Soit "
        m "M"
        t " un point dans une boule de centre "
        m "O"
        t " et de rayon "
        m $ show rad2
        t " cm."
        nl
        t "On peut être sûr que"
        nl
        nl
        put $ showProp (props rad2) ord2
        nl
 
        nl
        b "3. "
        t "On considère deux points antipodaux sur une sphère de rayon "
        m $ show $ 2 * halfrad3
        t " cm."
        nl
        t "Quelle distance les sépare ?"
        nl
        nl
        let choice halfrad other =  [ show halfrad <> "\\;\\mathrm{cm}"
                                    , show (2 * halfrad) <> "\\;\\mathrm{cm}"
                                    , show (4 * halfrad) <> "\\;\\mathrm{cm}"
                                    , show (2 * other + 1) <> "\\;\\mathrm{cm}"
                                    ]
        put $ showProp (choice halfrad3 halfrad4) ord3
        nl
 
        nl
        b "4. "
        t "On considère un grand cercle sur une sphère de rayon "
        m $ show $ 2 * halfrad4
        t " cm."
        nl
        t "Quel est son diamètre ?"
        nl
        nl
        put $ showProp (choice halfrad4 halfrad3) ord4
        nl
 
        nl
        b "5. "
        t "Selectionner les notions associées :"
        nl
        nl
        let tuples =  [ "\\mathrm{parall\\grave{e}les}\\;\\mathrm{et}\\;\\mathrm{latitudes}"
                      , "\\mathrm{parall\\grave{e}les}\\;\\mathrm{et}\\;\\mathrm{longitudes}"
                      , "\\mathrm{m\\acute{e}ridiens}\\;\\mathrm{et}\\;\\mathrm{latitudes}"
                      , "\\mathrm{m\\acute{e}ridiens}\\;\\mathrm{et}\\;\\mathrm{longitudes}"
                      ]
        put $ showProp tuples ord5
        nl
 
        nl
        b "6. "
        t "Soit "
        m "P"
        t " le point de la surface globe terrestre de coordonnées "
        m $ "(" <> show latitude <> "^\\circ\\; \\mathrm{nord}," <> show longitude <> "^\\circ\\;  \\mathrm{est})."
        nl
        t "Quelles sont les coordonnées du point A antipodal de P ?"
        nl
        nl
        let coord lat long = 
              [ "(" <> show (90-lat) <> "^\\circ\\;\\mathrm{nord}," <> show (180-long) <> "^\\circ\\;\\mathrm{ouest})"
              , "(" <> show lat <> "^\\circ\\;\\mathrm{sud}," <> show long <> "^\\circ\\;\\mathrm{ouest})"
              , "(" <> show lat <> "^\\circ\\;\\mathrm{nord}," <> show (180-long) <> "^\\circ\\;\\mathrm{est})"
              , "(" <> show (90-lat) <> "^\\circ\\;  \\mathrm{sud}," <> show (180-long) <> "^\\circ\\;\\mathrm{ouest})"
              ]
        put $ showProp (coord latitude longitude) ord6
        nl
 
        nl
        b "7. "
        t "Quelle est l'aire "
        em "exacte"
        t " d'une sphère de rayon  "
        m $ show (3*thirdrad7)
        t " cm."
        nl
        nl
        let aera third = 
              [ show (4*(3*third)*(3*third)) <> "\\pi\\;\\mathrm{cm}^2" 
              , show (4*(3*third)*(3*third)*third) <> "\\pi\\;\\mathrm{cm}^3" 
              , show (TwoDecimals $ 4.0*(3.0*toNumber third)*(3.0*toNumber third)*pi) <> "\\;\\mathrm{cm}^2" 
              , show (9*third*third) <> "\\pi\\;\\mathrm{cm}^2" 
              ]
        put $ showProp (aera thirdrad7) ord7
        nl
 
        nl
        b "8. "
        t "Quel est le volume "
        em "exact"
        t " d'une boule de rayon  "
        m $ show (3*thirdrad8)
        t " cm."
        nl
        nl
        let volume third = 
              [ show (4*(3*third)*(3*third)*third) <> "\\pi\\;\\mathrm{cm}^3" 
              , show (4*(3*third)*(3*third)) <> "\\pi\\;\\mathrm{cm}^2" 
              , show (TwoDecimals $ 4.0*(3.0*toNumber third)*(3.0*toNumber third)*pi*toNumber third) <> "\\;\\mathrm{cm}^3" 
              , show (4*9*third*third) <> "\\pi\\;\\mathrm{cm}^3" 
              ]
        put $ showProp (volume thirdrad8) ord8
        nl
 
        nl
        b "9. "
        t "Un plan est tangent en un point "
        m "T"
        t " à une sphère de centre "
        m "O"
        t " et de rayon "
        m $ show rad9
        t " cm. "
        nl
        t "On considère un point "
        m "P"
        t " du plan, distinct de "
        m "T"
        t ". On peut être sûr que"
        nl
        nl
        let cas1 = 
              [ "(TO)\\;\\mathrm{et}\\;(TP)\\;\\mathrm{sont}\\;\\mathrm{parall\\grave{e}les}"
              , "(TO)\\;\\mathrm{et}\\;(TP)\\;\\mathrm{sont}\\;\\mathrm{perpendiculaires}"
              , "OP>" <> show rad9 <> "\\;\\mathrm{cm}"
              , "OP=" <> show rad9 <> "\\;\\mathrm{cm}"
              ]
        put $ showProp cas1 ord9
        nl
 
        nl
        let mm /\ nn = max m' n' /\ min m' n'
            aa = rad10 * (mm * mm - nn * nn)
            bb = rad10 * 2 * mm * nn
            cc = rad10 * (mm * mm + nn * nn)
        b "10. "
        t "La section par un plan d'une sphère de centre "
        m "O"
        t " et de rayon "
        m $ show cc
        t " cm est un cercle de centre "
        m "H"
        t " et de rayon "
        m $ show bb
        t " cm."
        nl
        t "On peut être sûr que"
        nl
        nl
        let cas2 = 
              [ "OH=" <> show aa <> "\\;\\mathrm{cm}"
              , "OH=" <> show bb <> "\\;\\mathrm{cm}"
              , "OH=" <> show cc <> "\\;\\mathrm{cm}"
              , "(OH)\\;\\mathrm{perpendiculaire}\\;\\mathrm{au}\\;\\mathrm{plan}"
              ]
        put $ showProp cas2 ord10
        nl
 
        if (fromMaybe 0 $ validateInput newState.seed) < 0
            then do
              nl
              t "réponses: "
              b " 1. "
              t $ showSol sol1 ord1
                
              b " 2. "
              t $ showSol sol2 ord2
                
              b " 3. "
              t $ showSol sol3 ord3
                
              b " 4. "
              t $ showSol sol4 ord4

              b " 5. "
              t $ showSol sol5 ord5
                
              b " 6. "
              t $ showSol sol6 ord6
                
              b " 7. "
              t $ showSol sol7 ord7
                
              b " 8. "
              t $ showSol sol8 ord8
                
              b " 9. "
              t $ showSol sol9 ord9
                
              b " 10. "
              t $ showSol sol10 ord10
                
            else pure mempty

        get

newtype TwoDecimals = TwoDecimals Number

instance showTwoDecimals :: Show TwoDecimals where
  show (TwoDecimals x) =
    let r = round $ x * 100.0
        dec = r `mod` 100
        int = (r - dec) / 100
    in show int <> ",\\!" <> show dec
    
initialState = { seed: Nothing 
               , enabled: false
               } :: State

header :: forall a. Widget HTML a
header = D.div' $ fromIncremental $ do
  setTitle "Devoir 5 : Sphères et boules"
  nl
  put $ D.div [ P.attr "style" $ "display: grid; "
                        <> "grid-template-columns: 1fr 1fr 1fr;"]
      [ D.label [] [D.text "Nom:"]
      , D.label [] [D.text "Prénom:"]
      , D.label [] [D.text "Classe:"]
      ]
  put $ D.ul []
      [ D.li [] [D.text "Ce devoir est un QCM."]
      , D.li [] [D.text "Entourer la ou les bonnes réponses."]
      , D.li [] [D.text "Aucun document."]
      , D.li [] [D.text "Aucune justification demandée."]
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
