module Main where

import Prelude

import Article
  ( nl, t_, m_, a_, equation_
  , setTitle_, subsubsubsection_, pre_, section_)
import Control.Monad.Writer (Writer, execWriter, tell)
import Deku.Core (Nut)
import Deku.Control(text_)
import Deku.DOM as D
import Deku.Toplevel (runInBody)
import Effect (Effect)

documentation :: Writer Nut Unit
documentation = do
  setTitle_ "Data.Algebraic.NumberField"
  
  nl
  
  subsubsubsection_ "Technical documentation at"
  
  a_ "https://pursuit.purescript.org/packages/purescript-numberfield"
  
  section_ "Computation with extension fields of the field of rational numbers "
  t_ $ "Thanks to the introduction of arbitrary precision integers in Javascript, "
    <> "it is now possible to perform ambitious theoretic computations in the browser "
    <> "without drowning in low-level details."
  nl
  nl
  
  t_ "The main purpose of this page is to show interactively"
  tell $ D.ul_ 
    [ D.li_ 
        [ execWriter $ do
            t_ "how to do computations in "
            m_ "\\mathbb{Q}(\\alpha)"
            t_ " where "
            m_ "\\alpha"
            t_ " is an algebraic number "
          ]
    , D.li_ [text_ "how to compute minimal polynomials of sums of algebraic numbers"]
    ]

  t_ "A minimal understanding of how to work with "
  a_ "https://pursuit.purescript.org/packages/purescript-sparse-polynomials"
  t_ " is assumed."

  pre_ $ "import Prelude" 
      <> "\n\n> import Data.Algebraic.NumberField" 
      <> "\n> import Data.Ratio (Ratio, (%))"
      <> "\n> import Data.Reflectable (reifyType)"
      <> "\n> import Data.Sparse.Polynomial ((^), display, factor)"
      <> "\n> import JS.BigInt (BigInt, fromInt)"

  tell $ D.h3_ 
    [ execWriter $ do
        t_ "Computations in "
        m_ "\\mathbb{Q}(\\alpha)"
    ]

  t_ "First, let's choose "
  m_ "\\mathbb{Q}"
  t_ " as the undelying field by defining its unity"
  pre_ "> bigOne = fromInt 1 % fromInt 1"
  t_ "As an initial example, suppose that "
  m_ "\\alpha"
  t_ " is an algebraic number we know the minimal polynomial of."
  nl
  t_ "For instance, "
  m_ "\\alpha = \\phi"
  t_ ", the golden ratio satisfying"
  equation_ "\\phi ^ 2 = \\phi + 1"
  t_ "or rather"
  equation_ "\\phi ^ 2 - \\phi - 1 = 0." 
  t_ "So, the minimal polynomial of "
  m_ "\\alpha"
  t_ " is"
  equation_ "P_1(X) = X^2-X-1"
  t_ "since this expression is irreductible in "
  m_ "\\mathbb{Q}"
  t_ " (see below.)"
  nl
  nl
  t_ "According to the rupture fields theory, all computations taking place in "
  m_ "\\mathbb{Q}(\\alpha)"
  t_ " can be performed in "
  m_ "\\mathbb{Q}[X]/ P_1(X)"
  t_ " which is, significant fact, a field "
  m_ "-"
  t_ " like "
  m_ "\\mathbb{Q} \\, -"
  t_ " whereas "
  m_ "\\mathbb{Q}[X]"
  t_ " is only a ring."
  nl
  t_ "With the property that "
  m_ "\\mathbb{Q}(\\alpha)"
  t_ " is also a vector space of the same dimension as the degree of "
  m_ "P_1"
  t_ $ ", we can conclude that every addition, multiplication, subtraction and inversion "
    <> "involving elements of "
  m_ "\\mathbb{Q}(\\alpha)"
  t_ " can eventually be simplified to an expression of the form"
  equation_ "a\\alpha + b"
  t_ "where "
  m_ "a"
  t_ " and "
  m_ "b"
  t_ " are elements of "
  m_ "\\mathbb{Q}."
  nl
  nl
  t_ "To illustrate, let's simplify"
  equation_ "\\frac{\\phi + 2}{(\\phi-2)^2}."
  t_ "This is a 3-step process."
  nl
  t_ $ "The first thing to do is to define a framework in which "
    <> "computations will take place."
  pre_ "> fw1 = framework (bigOne ^ 0) [one ^ 2 - one ^ 1 - one ^ 0]"
  t_ $ "The first argument is the polynomic representation of unity "
    <> "as a polynomial of arity equal to the number of univariate polynomials "
    <> "that define "
  m_ "\\alpha"
  t_ ", one here."
  nl 
  t_ "The second argument is an array listing the polynomial(s) it(them)self(ves)."
  nl
  nl
  t_ "The second step is to define the expression,"
  pre_ $ "> :paste"
      <> "\n… test1 :: forall f. Expression f _"
      <> "\n… test1 = const $"
      <> "\n…    let phi = element (bigOne ^ 1)"
      <> "\n…        toFrac n = element ((fromInt n % fromInt 1) ^ 0)"
      <> "\n…     in (phi + toFrac 2) * recip ((phi - toFrac 2) * (phi - toFrac 2))"
      <> "\n…"
  t_ "then hit "
  m_ "<"
  t_ "CTRL"
  m_ ">"
  t_ "+D."
  pre_ ">"
  t_ "The compiler will refuse the expression if the type signature is not provided. "
  nl
  t_ "The first binding is the selection of our variable, "
  m_ "\\phi"
  t_ $ ". This makes the correspondance between the (unique) variable of "
    <> "a univariate polynomial and the minimal polynomial provided."
  nl
  t_ $ "The second binding defines a helper function "
    <> "introducing numerical constants in the expression."
  nl
  t_ $ "Then, the expression is naturally defined with the division replaced "
    <> "by a product with the reciprocal."
  nl
  nl
  t_ "From the last step"
  pre_ $ "> display [\"phi\"] $ run $ reifyType fw1 (build test1)"
      <> "\n\"(11 % 1)×phi+7 % 1\""
  t_ "we conclude that the simplification gives"
  equation_ "11\\phi+7"

  tell $ D.h3_ 
    [ execWriter $ do
      t_ "Computations in "
      m_ "\\mathbb{Q}(\\alpha_0,\\alpha_1,\\cdots)"
    ]

  t_ $ "This second paragraph is nothing but the general case from which "
    <> "the first paragraph is extracted."
  nl
  t_ $ "Nevertheless, it will show two new interesting tools which would have seemed trivial "
    <> "if presented earlier."
  nl
  nl
  t_ "Now, we want to work with several algebraic numbers, "
  m_ "\\alpha_i"
  t_ $ ", each of which have a known minimal polynomial."
  nl
  t_ $ "Behind the scene, the same process happens, as before, "
  t_ " with an algebraic number, "
  m_ "\\alpha"
  t_ $ ", along with its minimal polynomial. The difference now is that "
  m_ "\\alpha"
  t_ " is not provided anymore, it is computed as the sum of the "
  m_ "\\alpha_i"
  t_ " along with its minimal polynomial."
  nl
  nl
  t_ "As before, let's illustrate from an example, by expressing"
  equation_ "\\frac{1}{\\sqrt[3]{4}+\\sqrt[3]{2}-\\sqrt{3}}"
  t_ "as a sum rather than a quotient."
  nl
  nl
  t_ "With "
  m_ "\\alpha_0 = \\sqrt[3]{2}"
  t_ " and "
  m_ "\\alpha_1 = \\sqrt{3}"
  t_ " and, since "
  m_ "\\alpha_0^2 = \\sqrt[3]{4}"
  t_ ", we have only two algebraic numbers to deal with."
  pre_ "> fw2 = let f = fromInt in framework (bigOne^0^0) [one^3 - (f 2 % f 1)^0, one^2 - (f 3 % f 1)^0]"
  t_ "From the following request, the minimal polynomial of "
  m_ "\\sqrt[3]{2}+\\sqrt{3}"
  t_ " is"
  equation_ "P_2(X)=X^6-9X^4-4X^3+27X^2-36X-23"
  pre_ $ "> minimalPolynomial fw2"
      <> "\n(1 % 1)×z^6+(-9 % 1)×z^4+(-4 % 1)×z^3+(27 % 1)×z^2+(-36 % 1)×z+(-23 % 1)"
  t_ "From the following request, if we define "
  equation_ "Q_0(X)=-\\frac{2 }{51}X^5-\\frac{1 }{102}X^4+\\frac{20}{51}X^3+\\frac{13}{51}X^2-\\frac{38}{51}X+\\frac{91}{102}"
  t_ "and"
  equation_ "Q_1(X)=\\frac{2 }{51}X^5+\\frac{1 }{102}X^4-\\frac{20}{51}X^3-\\frac{13}{51}X^2+\\frac{89}{51}X-\\frac{91}{102}"
  t_ "then"
  equation_ "Q_0(\\sqrt[3]{2}+\\sqrt{3})=\\sqrt[3]{2}"
  t_ "and"
  equation_ "Q_1(\\sqrt[3]{2}+\\sqrt{3})=\\sqrt{3}"
  pre_ $ "> toPrimitive fw2"
      <> "\n[(-2 % 51)×z^5+(-1 % 102)×z^4+(20 % 51)×z^3+(13 % 51)×z^2+(-38 % 51)×z+91 % 102,(2 % 51)×z^5+(1 % 102)×z^4+(-20 % 51)×z^3+(-13 % 51)×z^2+(89 % 51)×z+(-91 % 102)]"
  nl
  t_ "Going back to our initial problem"
  pre_ $ "> :paste"
      <> "\n… test2 :: forall f. Expression f _"
      <> "\n… test2 = const $"
      <> "\n…    let cbrt2 = element (bigOne ^ 0 ^ 1)"
      <> "\n…        sqrt3 = element (bigOne ^ 1 ^ 0)"
      <> "\n…     in (recip $ cbrt2 * cbrt2 + cbrt2 - sqrt3)"
      <> "\n…" 
  pre_ $ "> display [\"cr2\", \"sr3\"] $ run $ reifyType fw2 (build test2)"
      <> "\n\"((1 % 3)×sr3+(-1 % 3))×cr2^2+(1 % 3)×cr2+(-1 % 3)×sr3+2 % 3\""
  t_ "the expression we're looking for is"
  equation_ "\\frac{1}{3}\\sqrt{3}\\sqrt[3]{4}-\\frac{1}{3}\\sqrt[3]{4}+\\frac{1}{3}\\sqrt[3]{2}-\\frac{1}{ 3}\\sqrt{3}+\\frac{2}{3}."
  
  tell $ D.h3_
    [ execWriter $ do
      t_ "Troubleshooting (is "
      m_ "P"
      t_ " minimal ?)"
    ]

  t_ $ "Given an algebraic expression, it is sometimes harder than it seems to choose the minimal "
    <> "polynomial for it."
  nl
  t_ "For instance, with"
  equation_ "\\alpha=\\sqrt{7+\\sqrt{24}}"
  t_ "we can derive"
  equation_ "(\\alpha^2-7)^2=24"
  t_ "and"
  equation_ "\\alpha^4-14\\alpha^2+49=24"
  t_ "However, if we choose"
  equation_ "\\tilde{P}(X)=X^4-14X^2+25"
  t_ "as the minimal polynomial, we can't get the right answer for "
  m_ "\\alpha^3-9\\alpha" 
  t_ " (which is "
  m_ "10"
  t_ ", but we don't know it yet.)"
  nl
  t_ $ "The reason of this issue is due to required irreductibility of "
    <> "the minimal polynomial, but that's not the case for "
  m_ "\\tilde{P}"
  t_ $ " by looking at the result of the `factor` function which displays some non-trivial "
    <> " factors of "
  m_ "\\tilde{P}"
  t_ ":"
  pre_ $ "> frac n = fromInt n % fromInt 1"
      <> "\n> ptilde = frac 1^4 - frac 14^2 + frac 25^0"
      <> "\n>"
      <> "\n> factor ptilde"
      <> "\n[(-1 % 1)×x^2+(-2 % 1)×x+5 % 1,(-1 % 1)×x^2+(2 % 1)×x+5 % 1,(1 % 1)×x^2+(2 % 1)×x+(-5 % 1),(1 % 1)×x^2+(-2 % 1)×x+(-5 % 1)]"
  t_ "Incidentally, each of these factors can be chosen as a minimal polynomial for "
  m_ "\\alpha"
  t_ ". Let's choose the last one, and check that it satisfies "
  m_ "\\alpha"
  t_ "'s definition:"
  pre_ $ "> display [\"a\"] $ run $ reifyType (framework (frac 1 ^ 0) [one ^ 2 - frac 2 ^ 1 - frac 5 ^ 0]) (build ((const $ let a = element (frac 1 ^ 1) in let kst n = element (frac n ^ 0) in (a*a-kst 7)*(a*a-kst 7)) :: forall f. Expression f _))"
      <> "\n\"24 % 1\""
  t_ "Now, the framework is coherent:"
  pre_ $ "> display [\"a\"] $ run $ reifyType (framework (frac 1 ^ 0) [one ^ 2 - frac 2 ^ 1 - frac 5 ^ 0]) (build ((const $ let a = element (frac 1 ^ 1) in let kst n = element (frac n ^ 0) in a*a*a -kst 9 *a) :: forall f. Expression f _))"
      <> "\n\"10 % 1\""

main :: Effect Unit
main = execWriter documentation # runInBody
