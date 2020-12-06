module Third where

import Prelude
import Data.Maybe(fromJust)
import Data.Array((!!),length,take)
import Rand(Rand, unsort)
import Partial.Unsafe(unsafePartial)
import Data.FoldableWithIndex(foldMapWithIndex)
import Article (fromIncremental, get, t, b, m, nl, put, equation)
import Concur.Core (Widget)
import Concur.VDom (HTML)
import Concur.VDom.DOM as D

problems :: Array { domain :: String
                  , inequation :: String
                  , answer :: String}
problems = [{ domain: "\\mathbb{R} \\backslash \\{1;2\\}"
            , inequation: "\\dfrac{2}{x-1}-\\dfrac{1}{x-2}<3"
            , answer: "]-\\infty; 1[\\cup]2;+\\infty["
            }
           ,{ domain: "\\mathbb{R} \\backslash \\{0;4\\}"
            , inequation: "\\dfrac{3x-2}{4-x}\\geq \\dfrac{1}{x}"
            , answer: "[-1;0[\\cup[\\dfrac{4}{3};4["
            }
           ,{ domain: "\\mathbb{R} \\backslash \\{-1;1\\}"
            , inequation: "\\dfrac{x}{x^2-1}\\leq \\dfrac{1}{1-x^2}"
            , answer: "]-\\infty;-1[\\cup]-1;1["
            }
           ] 

third :: forall  a. Rand -> Boolean -> Widget HTML a
third r mode = 
  D.div' $ fromIncremental do
        let chosen_indices = unsort (length problems) r
        let chosen_problems = 
              take 2 $ (\i -> 
                   unsafePartial $ fromJust 
                                 $ problems !! i) <$> chosen_indices
        put $ D.div' $ foldMapWithIndex  (\i p -> fromIncremental do
            b $ (show $ i+1) <> "••◦"
            t " Résoudre dans "
            m p.domain
            t " :"
            nl
            equation p.inequation
            get
            ) chosen_problems
        
        if mode 
          then m $ "réponses: " <> foldMapWithIndex (\i p -> 
                  " " <> show (i+1) 
                      <> ") " 
                      <> p.answer 
                      <> "\\quad") chosen_problems
          else pure unit
        get
