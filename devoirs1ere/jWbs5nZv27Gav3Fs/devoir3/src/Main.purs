module Main where

import Prelude

import Article (equation, fromIncremental, get, m, em, nl, put, t, b, validateInput, setTitle, section)
import Concur.Core (Widget)
import Concur.Core.FRP (dyn, display, debounce)
import Concur.VDom (HTML)
import Concur.VDom.GeometryRender(class Render, render', defaultContext)
import Concur.VDom.Run (runWidgetInDom)
import Concur.VDom.Props (onChange, unsafeTargetValue, onKeyEnter, attr, autoFocus, size) as P
import Concur.VDom.DOM as D
import Concur.VDom.SVG as S
import Data.Array (replicate, last, (\\))
import Data.Array (length, (!!)) as Array
import Data.Geometry.Plane (point, segment, middle, meets, line, rename)
import Data.Geometry.Plane (Point) as Geo
import Data.Maybe (Maybe(..), fromMaybe, maybe)
import Data.Ratio (reduce)
import Data.Rational (Rational, Ratio, fromInt, numerator, denominator)
import Data.Traversable (foldr, scanl)
import Data.Ord(abs) as Ord
import Effect (Effect)
import Data.Number (pi)
import Rand (Rand, rand)

type State = { seed :: Maybe String
             , enabled :: Boolean 
             }

showFraction :: Rational -> String
showFraction f = 
    if denominator f == 1 
      then show $ numerator f
      else "\\frac{" <> show (numerator f) <> "}{" <> show (denominator f) <> "}"

inlineFraction :: Rational -> String
inlineFraction c = next
  where 
    next  | c < zero = "-" <> (showFraction $ Ord.abs c)
          | c == zero = ""
            | otherwise = "+" <> showFraction c

primes :: Array Int
primes = [2,2,2,2,2,2,3,3,3,3,3,5,5,5,5]

avgNbFactors = 2 :: Int

class HasDefault a where
  dflt :: a
  
instance dfltInt :: HasDefault Int where
  dflt = 0
  
instance dfltRational :: (EuclideanRing a, Ord a, HasDefault  a) => HasDefault (Ratio a) where
  dflt = reduce dflt one

instance dfltPoint :: HasDefault Geo.Point where
    dflt = point "" 0.0 0.0

newtype Triple = Triple {a :: Int, b :: Int, c :: Int}

instance dfltTriple :: HasDefault Triple where
  dflt = Triple {a: 3, b: 4, c: 5}
  
nth :: forall a. HasDefault a => Array a -> Int -> a
nth xs n = case xs Array.!! n of
  Just x -> x
  _      -> dflt

infixr 6 nth as !!


randFraction :: Rand -> {fraction :: Rational, nextRand :: Rand}
randFraction = \ r -> 
  let r0 = rand r
      nbNumFactors = 1 + (r0.val `mod` avgNbFactors)
      r1 = rand r0
      nbDenFactors = 1 + (r1.val `mod` avgNbFactors)
      nrands = (\f -> f r1) <$> (scanl (<<<) identity 
                             $ replicate nbNumFactors rand)
      r2 = fromMaybe r1 $ last nrands
      drands = (\f -> f r2) <$> (scanl (<<<) identity 
                             $ replicate nbDenFactors rand)
      r3 = fromMaybe r2 $ last drands
      nextRand = rand r3
      sign = 2 * (nextRand.val `mod` 2) - 1
      prime = \ ix -> primes !! ix 
      nums = prime <$> (\rnd -> rnd.val `mod` (Array.length primes)) 
                   <$> nrands
      dens = prime <$> (\rnd -> rnd.val `mod` (Array.length primes)) 
                   <$> drands
      num = foldr (*) 1 $ nums \\ dens
      den = foldr (*) 1 $ dens \\ nums
   in if num > den 
        then {fraction: fromInt (sign * num) / fromInt den, nextRand}
        else {fraction: fromInt (sign * den) / fromInt num, nextRand}

alpha :: Rational -> Rational -> Rational -> Rational
alpha a b _ = -b/a/fromInt 2

beta :: Rational -> Rational -> Rational -> Rational
beta a b c = 
  let al = alpha a b c
      f x = a * x * x + b * x + c
   in f al

delta :: Rational -> Rational -> Rational -> Rational
delta a b c = b * b - fromInt 4 * a * c

showTrinom :: Rational -> Rational -> Rational -> String
showTrinom a b c =
  let m2 = next
        where
          next  | a == - one = "-x^2"
                | a == one = "x^2"
                | otherwise = showFraction a <> "x^2"
      m1 = next
        where
          next  | b == - one = "-x"
                | b < zero = "-" <> (showFraction $ Ord.abs b) <> "x"
                | b == zero = ""
                | b == one = "+x"
                | otherwise = "+" <> showFraction b <> "x"
   in m2 <> m1 <> inlineFraction c 

type Point = { exact :: String
             , approx :: Number
             , cos :: String
             , sin :: String
             , princ :: String}

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

type FromRadian = FromDegree  
fifths :: Array FromRadian
fifths = [ {radian: "\\frac{2\\pi}{5}", degree: "72"}
         , {radian: "\\frac{3\\pi}{5}", degree: "108"}
         , {radian: "\\frac{4\\pi}{5}", degree: "144"}
         , {radian: "\\frac{6\\pi}{5}", degree: "216"}
         , {radian: "\\frac{7\\pi}{5}", degree: "252"}
         , {radian: "\\frac{8\\pi}{5}", degree: "288"}
         , {radian: "\\frac{9\\pi}{5}", degree: "324"}]

pythagoreanTriples :: Array Triple
pythagoreanTriples = Triple <$> [ {a: 3, b: 4, c: 5}
                     , {a: 20, b: 21, c: 29}
                     , {a: 11, b: 60, c: 61}
                     , {a: 13, b: 84, c: 85}
                     , {a: 5, b: 12, c: 13}
                     , {a: 12, b: 35, c: 37}
                     , {a: 16, b: 63, c: 65}
                     , {a: 36, b: 77, c: 85}
                     , {a: 8, b: 15, c: 17}
                     , {a: 9, b: 40,c: 41}
                     , {a: 33, b: 56, c: 65}
                     , {a: 39, b: 80,c: 89}
                     , {a: 7, b: 24, c: 25}
                     , {a: 28, b: 45, c: 53}
                     , {a: 48, b: 55, c: 73}
                     , {a: 65, b: 72, c: 97}
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
              nl
              nl
              
              section "Exercice 1"
              
              let r1 = rand r0
                  Triple triple = pythagoreanTriples !! (r1.val `mod` Array.length pythagoreanTriples)
                  ab = triple.b
                  ad = triple.a
              
              put $ D.div [P.attr "style" "display: grid; grid-template-columns : 2fr 4fr;"] 
                [ S.svg 
                  [ S.width "400"
                  , S.height "310"
                  ] $
                
                    let ctx = defaultContext{ strokeWidth = 1.0}
                        dt1 :: forall a b. Render a => a -> Array (Widget HTML b)
                        dt1 = render' ctx 
                        origx1 = 150.0
                        origy1 = 90.0
                        theUnit1 = 55.0
                        x' = 25.0
                        pO = point "O" (origx1)  (origy1)
                        pA = point "A" (origx1 - 2.0 * theUnit1)  (origy1 + theUnit1)
                        pB = point "B" (origx1 + 2.0 * theUnit1) (origy1 + theUnit1)
                        pC = point "C" (origx1 + 2.0 * theUnit1) (origy1 - theUnit1)
                        pD = point "D" (origx1 - 2.0 * theUnit1) (origy1 - theUnit1)
                        pE = point "" (origx1 - 2.0 * theUnit1 + x')  (origy1 + theUnit1 - x')
                        pF = point "" (origx1 + 2.0 * theUnit1 - x') (origy1 + theUnit1 - x')
                        pG = point "" (origx1 + 2.0 * theUnit1 - x') (origy1 - theUnit1 + x')
                        pH = point "" (origx1 - 2.0 * theUnit1 + x') (origy1 - theUnit1 + x')
                        pI = middle "" $ segment pA pD Nothing
                        pK = (_ !! 0) $ (line pO pI) `meets` (line pE pH)
                        pJ = middle "" $ segment pB pC Nothing
                        pL = (_ !! 0) $ (line pO pJ) `meets` (line pF pG)
                        pM = middle "" $ segment pA pB Nothing
                        pN = (_ !! 0) $ (line pO pM) `meets` (line pE pF)
                        pP = middle "" $ segment pC pD Nothing
                        pQ = (_ !! 0) $ (line pO pP) `meets` (line pG pH)
                  in 
                    dt1 [pO, pA, pB, pC, pD]
                    <> dt1 [segment pA pB Nothing, segment pB pC Nothing, segment pC pD Nothing, segment pD pA Nothing]
                    <> dt1 [segment pE pF Nothing, segment pF pG Nothing, segment pG pH Nothing, segment pH pE Nothing]
                    <> dt1 [ rename "𝑥" pI, pK]
                    <> dt1 ( segment pI pK Nothing )
                    
                    <> dt1 [ rename "𝑥" pL, pJ]
                    <> dt1 ( segment pJ pL Nothing )
                    
                    <> dt1 [ rename "𝑥" pM, pN]
                    <> dt1 ( segment pM pN Nothing )
                    
                    <> dt1 [ rename "𝑥" pQ, pP]
                    <> dt1 ( segment pQ pP Nothing )

            , D.div' $ fromIncremental do
                  t "Soit "
                  m "ABCD"
                  t " un rectangle de centre "
                  m "O"
                  t "."
                  nl 
                  t "On construit un autre rectangle de centre "
                  m "O"
                  t " à l'intérieur de "
                  m "ABCD"
                  t " de manière à laisser entre les deux rectangles "
                  t "une bande de largeur constante "
                  m "x"
                  t "."
                  nl
                  nl
                  t "Le but de l'exercice est de trouver la valeur de "
                  m "x"
                  t " pour laquelle "
                  t " l'aire du rectangle intérieur est égale à la "
                  em "moitié"
                  t " de l'aire de "
                  m "ABCD"
                  t "."
                  nl
                  nl
                  t "On donne "
                  m $ " AB=" <> show ab
                  t " et "
                  m $ "AD=" <> show ad
                  t " (la figure n'est pas à l'échelle)."
                  nl
                  nl 
                
                  get
                ]
                                    
              b "1◦"
              t " Expliquer brièvement pourquoi le rectangle intérieur a pour longeur "
              m $ show ab <> "-2x"
              t " et pour hauteur "
              m $ show ad <> "-2x"
              t "."
              nl
              t "Ceci implique que "
              m "x"
              t " ne peut dépasser une valeur maximale. Laquelle ? Expliquer brièvement."
              nl
              nl
              
              b "2•◦"
              t " Donner l'aire de "
              m "ABCD."
              nl
              t "Montrer que l'aire du rectangle intérieur est "
              m $ "4x^2 -" <> show (2*(ab+ad)) <> "x+" <> show (ab*ad)
              t "."
              nl
              t "En déduire que l'équation que doit vérifier "
              m "x"
              t " est"
              equation $ "4x^2 -" <> show (2*(ab+ad)) <> "x+" <> show ((ab*ad) `div` 2) <> "=0"
              
              b "3••◦"
              t " Résoudre cette équation dans "
              m "\\mathbb{R}"
              t "."
              nl
              nl
              
              b "4◦"
              t " En prenant en compte les contraintes sur "
              m "x"
              t " établies à la question 1, donner "
              em "la"
              t " valeur de "
              m "x"
              t " répondant au problème."
              nl
              nl
              
              section "Exercice 2"
              t "Dans un repère orthonormé, soient "
              nl
              m "J"
              t " le point de coordonnées "
              m "(0;1)"
              t ", "
              nl
              m "K"
              t " le point de coordonnées "
              m "\\left(\\cos(\\frac{ -5\\pi}{6}); \\sin(\\frac{ -5\\pi}{6})\\right)"
              t " et "
              nl
              m "L"
              t " le point de coordonnées "
              m "\\left(\\cos(\\frac{ -\\pi}{6}); \\sin(\\frac{ -\\pi}{6})\\right)"
              t "."
              nl
              nl
                           
              b "1•••◦"
              t " Calculer les distances "
              m "JK"
              t ", "
              m "KL"
              t " et "
              m "LJ"
              t "."
              nl
              t "Pour rappel, la distance entre "
              m "A" 
              t " et "
              m "B"
              t " est "
              m "\\sqrt{(x_B-x_A)^2+(y_B-y_A)^2}"
              t " dans un repère orthonormé."
              nl
              nl
              
              b "2•◦"
              t " En déduire la nature du triangle "
              m "JKL"
              t ","
              nl
              t " puis une mesure "
              em "en radians"
              t " de l'angle "
              m "\\widehat{JKL}"
              t "."
              nl
              nl
              
              section "Exercice 3"
              t "Le but de cet exercice est de résoudre le système en "
              m "x"
              t " et "
              m "y"
              t " suivant "
              let f1 = randFraction r1
              let f2 = randFraction f1.nextRand 
              nl
              nl
              equation $ "\\left\\{\\begin{array}{l}x-y=" 
                                <> (showFraction $ f1.fraction - f2.fraction) 
                                <> "\\\\ xy = " 
                                <> (showFraction $ f1.fraction * f2.fraction)
                                <> "\\end{array}\\right."
              nl
              b "1◦"
              t " En effectuant les changements de variables "
              m "X=x"
              t " et "
              m "Y=-y"
              t ", montrer que le système initial devient"
              nl
              nl
              equation $ "\\left\\{\\begin{array}{l}X+Y=" 
                                <> (showFraction $ f1.fraction - f2.fraction) 
                                <> "\\\\ XY = " 
                                <> (showFraction $ - f1.fraction * f2.fraction)
                                <> "\\end{array}\\right."
              
              b "2•••◦"
              t " Résoudre le système de la question 1, c'est-à-dire "
              nl
              t "trouver tous les couples "
              m "(X;Y)"
              t " solutions du système avec la méthode du cours."
              nl
              nl
              
              b "3•"
              t " En déduire l'ensemble des couples "
              m "(x;y)"
              t " solutions du système initial en utilisant à nouveau les changements de variables."
              nl
              nl
              
              section "Exercice 4"
              t "Dire si chacune des affirmations suivantes est vraie ou fausse."
              nl
              t "Si elle est vraie, justifier brièvement pourquoi par une propriété du cours, ou un argument géométrique."
              nl
              t "Sinon, donner un contre-exemple."
              nl
              t "Toutes les questions sont indépendantes les unes des autres."
              nl
              nl
              
              b "1•◦"
              t " Soient "
              m "S"
              t " et "
              m "P"
              t " deux nombres réels. Il est toujours possible de trouver "
              nl
              t "deux nombres réels "
              m "x_1"
              t " et "
              m "x_2"
              t " tels que "
              m "x_1+x_2=S"
              t " et "
              m "x_1x_2=P"
              t "."
              nl
              nl
              
              b "2◦"
              t " Quelque soient "
              m "x"
              t " et "
              m "y"
              t ", "
              m "\\cos(x)+\\sin(y)=\\cos(y)+\\sin(x)"
              t "."
              nl
              nl
              
              b "3•◦"
              t " Soit "
              m "f"
              t " la fonction définie par "
              m "f(x)=a(x-\\alpha)^2+\\beta"
              t "."
              nl
              t "Si "
              m "a" 
              t " et "
              m "\\beta"
              t " sont de signes contraires, alors "
              m "f"
              t " admet deux racines réelles distinctes."
              nl
              nl
              
              b "4◦"
              t " Quelque soit "
              m "x"
              t ", "
              m "\\cos^2(x)-\\sin^2(x)=1"
              t "."
              nl
              nl
              
              b "5◦"
              t " Soit "
              m "f"
              t " une fonction polynôme du second degré. "
              nl
              t "Si "
              m "f"
              t " possède la racine "
              m "x_1"
              t ", alors elle possède aussi la racine "
              m "x_2"
              t " et "
              m "x_2\\not = x_1"
              t "."
              nl
              nl
              
              b "6◦"
              t " Quelque soient "
              m "x"
              t " et "
              m "y"
              t ", "
              m "\\cos(x)\\sin(y)=\\cos(y)\\sin(x)"
              t "."
              nl
              nl

              nl
              let rep = ["réponses: "
                  ,"\\; 1)1◦ \\; 0<x<"<> showFraction (fromInt ad / fromInt 2)
                  ,"\\; 1)2•◦ \\;", "AB AD = "<> show (ab*ad)
                  ,"\\; 1)3••◦ \\;", "\\mathcal{S}=\\{" <> showFraction (fromInt (ab+ad-triple.c) 
            / fromInt 4) <> "," <> showFraction (fromInt (ab+ad+triple.c) / fromInt 4) <> "\\} "
                  ,"\\; 1)4◦"
                  ,"\\; 2)1•••◦ \\;JK=KL=LJ=\\sqrt{3}"
                  ,"\\; 2)2•◦ \\;\\widehat{JKL}=\\frac{\\pi}{3}"
                  ,"\\; 3)1◦"
                  ,"\\; 3)2•••◦ \\;\\mathcal{S}=\\{(" <> showFraction f1.fraction <> "," <> showFraction (-f2.fraction)
                                                <> "),(" <> showFraction (-f2.fraction) <> ","  <> showFraction f1.fraction <> ")\\}"
                  ,"\\; 3)3•\\; \\mathcal{S}=\\{(" <> showFraction f1.fraction <> "," <> showFraction f2.fraction
                                                <> "),(" <> showFraction (-f2.fraction) <> ","  <> showFraction (-f1.fraction) <> ")\\}"
                  ,"\\; 4)1•◦"
                  ,"\\; 4)2◦"
                  ,"\\; 4)3•◦"
                  ,"\\; 4)4◦"
                  ,"\\; 4)5◦"
                  ,"\\; 4)6◦"
                ]
              m $ if (fromMaybe 0 $ validateInput newState.seed) < 0 then foldr (<>) "" rep else ""
              get


initialState = { seed: Nothing 
               , enabled: false
               } :: State

header :: forall a. Widget HTML a
header = D.div' $ fromIncremental $ do
  setTitle "Devoir 3 : Cercle trigonométrique / Equations de degré 2"
  nl
  put $ D.div [ P.attr "style" "display: grid; grid-template-columns: 1fr 1fr 1fr;"]
      [ D.label [] [D.text "Nom:"]
      , D.label [] [D.text "Prénom:"]
      , D.label [] [D.text "Classe:"]
      ]
  put $ D.ul []
      [ D.li [] [D.text "4 exercices"]
      , D.li [] (fromIncremental $ do
          t "5 points par exercice"
          m "(\\bullet"
          t " : 1 point, "
          m "\\circ : \\frac{1}{2}"
          t " point)"
          get)
      , D.li [] [D.text "qualité de la rédaction prise en compte"]
      , D.li [] [D.text "sans document"]
      , D.li [] [D.text "calculatrice autorisée"]
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

