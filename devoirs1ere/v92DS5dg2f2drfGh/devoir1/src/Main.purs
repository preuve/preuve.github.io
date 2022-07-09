module Main where

import Prelude

import Article (equation, fromIncremental, get, m, nl, put, t, b, validateInput, setTitle)
import Concur.Core (Widget)
import Concur.Core.FRP (dyn, display, debounce)
import Concur.VDom (HTML)
import Concur.VDom.Run (runWidgetInDom)
import Concur.VDom.Props (onChange, unsafeTargetValue, onKeyEnter, attr, autoFocus, size) as P
import Concur.VDom.DOM as D
import Concur.VDom.SVG as S
import Data.Geometry.Plane (circle, length, point, rightangle, segment, vector)
import Concur.VDom.GeometryRender(class Render, render', defaultContext)
import Data.Array (replicate, (!!))
import Data.Array (length) as Array
import Data.Foldable (foldr)
import Data.Maybe (Maybe(..), fromMaybe, maybe)
import Data.Ord (abs)
import Effect (Effect)
import Data.Number (pi, cos, sin)
import Rand (rand)

type State = { seed :: Maybe String
             , enabled :: Boolean 
             }

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
  let odd = 2 * abs (fromMaybe 0 $ validateInput newState.seed) + 1
      r0 = rand { val: odd
                , gen: 0
                , seed: odd*odd
                }

  let ctx = defaultContext { strokeWidth = 1.0}
  let render :: forall a b. Render a => a -> Array (Widget HTML b)
      render = render' ctx 
  let angle0 = readWrap dfltPoint points r0.val
                    
  display $ D.div' $ if not newState.enabled 
      then []
      else fromIncremental $ do    
        nl
        b "1."
        t " On considère "
        m "\\mathcal{C}"
        t " le cercle trigonométrique suivant :"
        nl
        put $ D.div [P.attr "style" "display: grid; grid-template-columns: 1fr 5fr ;"]
          [ S.svg
            [ S.width "180"
            , S.height "180"
            , S.viewBox "-10 -10 200 200" 
            ] $ let origx = 80.0
                    origy = 80.0
                    unit = 70.0
                    pO = point "O" origx origy
                    pI = point "I" (origx + unit) origy
                    pJ = point "J" origx (origy - unit)
                    pM = point "M" (origx + unit * cos angle0.approx) 
                                   (origy - unit * sin angle0.approx)
               in render[pO, pI, pJ]
                <> (render $ circle pO $ length $ vector pO pI)
                <> (render $ segment pO pI Nothing)
                <> (render $ segment pO pJ Nothing)
                <> (render $ rightangle (vector pO pI) pO (vector pO pJ) 10.0)
                <> render pM
                <> (render $ segment pO pM Nothing)

           , D.div' $ fromIncremental $ do
                      nl
                      t "Soit "
                      m "M"
                      t " le point de coordonnées "
                      m $ "(" <> angle0.cos <> "," <> angle0.sin <> ")."
                      nl
                      t "Donner la valeur (en radians) du réel compris dans l'intervalle "
                      m "]-\\pi, \\pi]"
                      t " correspondant au point "
                      m "M:"
                      get
          ]

        nl
        b "2."
        t " Compléter la phrase en remplaçant chaque mot manquant par "
        m "\\underline{égaux}"
        t " ou "
        m "\\underline{opposés}:"
        let r1 = rand r0
        let arr = case r1.val `mod` 3 of
                    0 -> thirds
                    1 -> fourths
                    _ -> sixths
        let n = Array.length arr
        let r2 = rand r1
        let i1 = r2.val `mod` n
        let r3 = rand r2
        -- i1 and i2 are distinct:
        let i2 = (i1 + 1 + (r3.val `mod` (n-1))) `mod` n
        let angle1 = readWrap dfltPoint arr i1
        let angle2 = readWrap dfltPoint arr i2
        nl
        t "Les réels "
        m angle1.exact
        t " et "
        m angle2.exact
        t " ont leurs cosinus "
        m $ "\\underline{" <> spacex 16 <> "}"
        t " et leurs sinus "
        m $ "\\underline{" <> spacex 16 <> "}."
        
        nl
        nl
        b "3."
        t " Donner la valeur du réel "
        m "a"
        let r4 = rand r3
        let angle3 = readWrap dfltPoint points r4.val
        t " de l'intervalle "
        m "[0, 2\\pi["
        t " vérifiant "
        nl
        m $ "\\cos(a)=" <> angle3.cos
        t " et "
        nl
        m $ "\\sin(a)=" <> angle3.sin <> ":"
 
        nl
        nl
        b "4."
        t " Etant donné que "
        let r5 = rand r4
        let cosa = readWrap dfltDecimal decimals r5.val
        equation cosa.origin
        nl
        t " et sachant que "
        m "a\\in]-\\pi,0["
        t ", et que "
        m $ "\\cos(a)=" <> cosa.decimal
        t ", déterminer la valeur exacte de "
        m "\\sin(a):"

        nl
        nl
        b "5."
        t " Convertir "
        let r6 = rand r5
        let deg  = readWrap dfltDegree degrees r6.val
        m $ deg.degree <> "^\\circ" 
        t " en radians. On donnera une réponse dans "
        m "[0, 2\\pi["
        t " sous la forme exacte la plus simple possible:"
  
        nl
        nl
        b "6."
        t " Convertir "
        let r7 = rand r6
        let fifth = readWrap dfltDegree fifths r7.val
        m fifth.radian
        t " en degrés. On donnera un entier positif inférieur à "
        m "359^\\circ"
        t ":"
        
        nl
        nl
        b "7."
        t " Soit "
        m "M"
        t " le point du cercle trigonométrique vérifiant "
        let r8 = rand r7
        let angle4 = readWrap dfltPoint points r8.val
        m $ "\\widehat{IOM} =" <> angle4.exact
        t " (remarque: on écrit aussi "
        m $ "(\\overrightarrow{OI},\\overrightarrow{OM})=" <> angle4.exact
        t "). Donner la valeur de "
        m "\\widehat{IOM'} "
        t " comprise entre "
        m "-\\pi"
        t " et "
        m "\\pi"
        t " si "
        m "M'"
        t " est le symétrique de "
        m "M"
        t " par la symétrie d'axe "
        m "(OI):"

        nl
        nl
        b "8."
        t " Soit "
        m "M"
        t " le point du cercle trigonométrique vérifiant "
        let r9 = rand r8
        let angle5 = readWrap dfltPoint  points r9.val
        m $ "\\widehat{IOM} =" <> angle5.exact
        t ". Donner la valeur de "
        m "\\widehat{IOM'}"
        t " comprise entre "
        m "-\\pi"
        t " et "
        m "\\pi"
        t " si "
        m "M'"
        t " est le symétrique de "
        m "M"
        t " par la symétrie d'axe "
        m "(OJ):"

        nl
        nl
        b "9."
        t " Donner la valeur de "
        m $ "\\cos(" <> angle4.exact <> "):"
        
        nl
        nl
        b "10."
        t " Donner la valeur de "
        m $ "\\sin(" <> angle5.exact <> "):"
        
        nl
        let rep = ["réponses: 1)",angle0.princ
                  ,"\\;2)",(if angle1.cos == angle2.cos then "égaux," else "opposés,") <>
                        (if angle1.sin == angle2.sin then "égaux" else "opposés")
                  ,"\\; 3)", positive angle3.princ
                  ,"\\; 4)", cosa.sol
                  ,"\\; 5)", deg.radian
                  ,"\\; 6)", fifth.degree <> "^\\circ"
                  ,"\\; 7)", symx angle4.princ
                  ,"\\; 8)", symy angle5.princ
                  ,"\\; 9)", angle4.cos
                  ,"\\; 10)", angle5.sin
                  ]
        m $ if (fromMaybe 0 $ validateInput newState.seed) < 0 then foldr (<>) "" rep else ""

        get

type Point = { exact :: String
             , approx :: Number
             , cos :: String
             , sin :: String
             , princ :: String
             }

m5pi_6 = "-\\frac{5\\pi}{6}" :: String
m3pi_4 = "-\\frac{3\\pi}{4}" :: String
m2pi_3 = "-\\frac{2\\pi}{3}" :: String
mpi_3 = "-\\frac{\\pi}{3}" :: String
mpi_4 = "-\\frac{\\pi}{4}" :: String
mpi_6 = "-\\frac{\\pi}{6}" :: String

pi_6 = "\\frac{\\pi}{6}" :: String
pi_4 = "\\frac{\\pi}{4}" :: String
pi_3 = "\\frac{\\pi}{3}" :: String
tpi_3 = "\\frac{2\\pi}{3}" :: String
tpi_4 = "\\frac{3\\pi}{4}" :: String
fpi_6 = "\\frac{5\\pi}{6}" :: String

-- | mesure principale symetrique par rapport a l'axe des abcisses
symx :: String -> String
symx a = next
  where
    next  | a == m5pi_6 = fpi_6
          | a == m3pi_4 = tpi_4
          | a == m2pi_3 = tpi_3
          | a == mpi_3 = pi_3
          | a == mpi_4 = pi_4
          | a == mpi_6 = pi_6
          | a == pi_6 = mpi_6
          | a == pi_4 = mpi_4
          | a == pi_3 = mpi_3
          | a == tpi_3 = m2pi_3
          | a == tpi_4 = m3pi_4
          | a == fpi_6 = m5pi_6
          | otherwise = a 
         
-- | mesure principale symetrique par rapport a l'axe des ordonnees
symy :: String -> String
symy a  = next
  where
    next  | a == m5pi_6 = mpi_6
          | a == m3pi_4 = mpi_4
          | a == m2pi_3 = mpi_3
          | a == mpi_3 = m2pi_3
          | a == mpi_4 = m3pi_4
          | a == mpi_6 = m5pi_6
          | a == pi_6 = fpi_6
          | a == pi_4 = tpi_4
          | a == pi_3 = tpi_3
          | a == tpi_3 = pi_3
          | a == tpi_4 = pi_4
          | a == fpi_6 = pi_6
          | otherwise = a 

spi_6 = "\\frac{7\\pi}{6}" :: String
fpi_4 = "\\frac{5\\pi}{4}" :: String
fpi_3 = "\\frac{4\\pi}{3}" :: String
fipi_3 = "\\frac{5\\pi}{3}" :: String
spi_4 = "\\frac{7\\pi}{4}" :: String
epi_6 = "\\frac{11\\pi}{6}" :: String

-- | values of ]-pi;pi] as values of [0;2pi[ 
positive :: String -> String
positive a = next
  where
    next  | a == m5pi_6 = spi_6
          | a == m3pi_4 = fpi_4
          | a == m2pi_3 = fpi_3
          | a == mpi_3 = fipi_3
          | a == mpi_4 = spi_4
          | a == mpi_6 = epi_6
          | otherwise = a

p1_2 = "\\frac{1}{2}" :: String
m1_2 = "-\\frac{1}{2}" :: String
ps2_2 = "\\frac{\\sqrt{2}}{2}" :: String
ms2_2 = "-\\frac{\\sqrt{2}}{2}" :: String
ps3_2 = "\\frac{\\sqrt{3}}{2}" :: String
ms3_2 = "-\\frac{\\sqrt{3}}{2}" :: String

thirds :: Array Point
thirds =  [ 
    {exact: "\\frac{-11\\pi}{3}", approx: -11.0*pi/3.0, cos: p1_2, sin: ps3_2, princ: pi_3}
  , {exact: "\\frac{-10\\pi}{3}", approx: -10.0*pi/3.0, cos: m1_2, sin: ps3_2, princ: tpi_3}
  , {exact: "\\frac{-8\\pi}{3}", approx: -8.0*pi/3.0, cos: m1_2, sin: ms3_2, princ: m2pi_3}
  , {exact: "\\frac{-7\\pi}{3}", approx: -7.0*pi/3.0, cos: p1_2, sin: ms3_2, princ: mpi_3}
  , {exact: "\\frac{-5\\pi}{3}", approx: -5.0*pi/3.0, cos: p1_2, sin: ps3_2, princ: pi_3}
  , {exact: "\\frac{-4\\pi}{3}", approx: -4.0*pi/3.0, cos: m1_2, sin: ps3_2, princ: tpi_3}
  , {exact: fpi_3, approx: 4.0*pi/3.0, cos: m1_2, sin: ms3_2, princ: m2pi_3}
  , {exact: fipi_3, approx: 5.0*pi/3.0, cos: p1_2, sin: ms3_2, princ: mpi_3}
  , {exact: "\\frac{7\\pi}{3}", approx: 7.0*pi/3.0, cos: p1_2, sin: ps3_2, princ: pi_3}
  , {exact: "\\frac{8\\pi}{3}", approx: 8.0*pi/3.0, cos: m1_2, sin: ps3_2, princ: tpi_3}
  , {exact: "\\frac{10\\pi}{3}", approx: 10.0*pi/3.0, cos: m1_2, sin: ms3_2, princ: m2pi_3}
  , {exact: "\\frac{11\\pi}{3}", approx: 11.0*pi/3.0, cos: p1_2, sin: ms3_2, princ: mpi_3}]
  
fourths :: Array Point
fourths = 
  [{exact: "\\frac{-11\\pi}{4}", approx: -11.0*pi/4.0, cos: ms2_2, sin: ms2_2, princ: m3pi_4}
  , {exact: "\\frac{-9\\pi}{4}", approx: -9.0*pi/4.0, cos: ps2_2, sin: ms2_2, princ: mpi_4}
  , {exact: "\\frac{-7\\pi}{4}", approx: -7.0*pi/4.0, cos: ps2_2, sin: ps2_2, princ: pi_4}
  , {exact: "\\frac{-5\\pi}{4}", approx: -5.0*pi/4.0, cos: ms2_2, sin: ps2_2, princ: tpi_4}
  , {exact: fpi_4, approx: 5.0*pi/4.0, cos: ms2_2, sin: ms2_2, princ: m3pi_4}
  , {exact: spi_4, approx: 7.0*pi/4.0, cos: ps2_2, sin: ms2_2, princ: mpi_4}
  , {exact: "\\frac{9\\pi}{4}", approx: 9.0*pi/4.0, cos: ps2_2, sin: ps2_2, princ: pi_4}
  , {exact: "\\frac{11\\pi}{4}", approx: 11.0*pi/4.0, cos: ms2_2, sin: ps2_2, princ: tpi_4}]
 
sixths :: Array Point
sixths = 
  [ {exact: "\\frac{-13\\pi}{6}", approx: -13.0*pi/6.0, cos: ps3_2, sin: m1_2, princ: mpi_6}
  , {exact: "\\frac{-11\\pi}{6}", approx: -11.0*pi/6.0, cos: ps3_2, sin: p1_2, princ: pi_6}
  , {exact: "\\frac{-7\\pi}{6}", approx: -7.0*pi/6.0, cos: ms3_2, sin: p1_2, princ: fpi_6}
  , {exact: "\\frac{-5\\pi}{6}", approx: -5.0*pi/6.0, cos: ms3_2, sin: m1_2, princ: m5pi_6}
  , {exact: fpi_6, approx: 5.0*pi/6.0, cos: ms3_2, sin: p1_2, princ: fpi_6}
  , {exact: spi_6, approx: 7.0*pi/6.0, cos: ms3_2, sin: m1_2, princ: m5pi_6}
  , {exact: epi_6, approx: 11.0*pi/6.0, cos: ps3_2, sin: m1_2, princ: mpi_6}
  , {exact: "\\frac{13\\pi}{6}", approx: 13.0*pi/6.0, cos: ps3_2, sin: p1_2, princ: pi_6}]
  
points :: Array Point
points = thirds <> fourths <> sixths

dfltPoint = 
   { exact: ""
   , approx: 0.0
   , cos: ""
   , sin: ""
   , princ: ""
   } :: Point

type Decimal = {decimal :: String, origin :: String, sol :: String}
relation1 = "\\left(\\frac{6}{10}\\right)^2+\\left(\\frac{8}{10}\\right)^2=1" :: String
relation2 = "\\left(\\frac{28}{100}\\right)^2+\\left(\\frac{96}{100}\\right)^2=1" :: String
relation3 = "\\left(\\frac{352}{1000}\\right)^2+\\left(\\frac{936}{1000}\\right)^2=1" :: String
decimals :: Array Decimal
decimals = [ {decimal: "-0,96", origin: relation2, sol: "-0,28"}
           , {decimal: "-0,936", origin: relation3, sol: "-0,352"}
           , {decimal: "-0,8", origin: relation1, sol: "-0,6"}
           , {decimal: "-0,6", origin: relation1, sol: "-0,8"}
           , {decimal: "-0,352", origin: relation3, sol: "-0,936"}
           , {decimal: "-0,28", origin: relation2, sol: "-0,96"} 
           , {decimal: "0,28", origin: relation2, sol: "-0,96"}
           , {decimal: "0,352", origin: relation3, sol: "-0,936"}
           , {decimal: "0,6", origin: relation1, sol: "-0,8"}
           , {decimal: "0,8", origin: relation1, sol: "-0,6"}
           , {decimal: "0,936", origin: relation3, sol: "-0,352"}
           , {decimal: "0,96", origin: relation2, sol: "-0,28"}]

dfltDecimal =
  { decimal: ""
  , origin: ""
  , sol: ""
  } :: Decimal
  
type FromDegree = {degree :: String , radian :: String}
degrees :: Array FromDegree
degrees = [ {degree: "120", radian: tpi_3}
          , {degree: "135", radian: tpi_4}
          , {degree: "150", radian: fpi_6}
          , {degree: "210", radian: spi_6}
          , {degree: "225", radian: fpi_4} 
          , {degree: "240", radian: fpi_3}
          , {degree: "300", radian: fipi_3}
          , {degree: "315", radian: spi_4}
          , {degree: "330", radian: epi_6}]

dfltDegree =
  { degree: ""
  , radian: ""
  } :: FromDegree
  
type FromRadian = FromDegree  
fifths :: Array FromRadian
fifths = [ {radian: "\\frac{2\\pi}{5}", degree: "72"}
         , {radian: "\\frac{3\\pi}{5}", degree: "108"}
         , {radian: "\\frac{4\\pi}{5}", degree: "144"}
         , {radian: "\\frac{6\\pi}{5}", degree: "216"}
         , {radian: "\\frac{7\\pi}{5}", degree: "252"}
         , {radian: "\\frac{8\\pi}{5}", degree: "288"}
         , {radian: "\\frac{9\\pi}{5}", degree: "324"}]

readWrap :: forall a. a -> Array a -> Int -> a
readWrap a xs i = case xs !! (i `mod` Array.length xs) of
  Just x -> x
  _ -> a
  
spacex :: Int -> String 
spacex n = foldr (<>) "" $ replicate n "\\;"

initialState = { seed: Nothing 
               , enabled: false
               } :: State

header :: forall a. Widget HTML a
header = D.div' $ fromIncremental $ do
  setTitle "Devoir 1 : Trigonométrie"
  nl
  put $ D.div [ P.attr "style" "display: grid; grid-template-columns: 1fr 1fr 1fr;"]
      [ D.label [] [D.text "Nom:"]
      , D.label [] [D.text "Prénom:"]
      , D.label [] [D.text "Classe:"]
      ]
  put $ D.ul []
      [ D.li [] [D.text "10 questions : pour chacune d'elle, indiquer la bonne réponse"]
      , D.li [] (fromIncremental $ do
           m "\\frac{1}{2}"
           t " point par bonne réponse"
           get)
      , D.li [] [D.text "sans calculatrice"]
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
