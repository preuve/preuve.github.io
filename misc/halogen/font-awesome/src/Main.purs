module Main where

import Prelude

import CSS (body, (?), fontFamily
          , sansSerif, key, Prefixed (..),display
          , inlineBlock, fromString, Key(..), fontSize, em)
import Data.Array as Array
import Data.NonEmpty as NonEmpty
import Data.Traversable (traverse_, fold)
import Effect (Effect)
import Halogen as H
import Halogen.Aff as HA
import Halogen.HTML as HH
import Halogen.HTML.CSS as HC
import Halogen.HTML.Properties as HP
import Halogen.Hooks as Hooks
import Halogen.VDom.Driver (runUI)
import Web.DOM.ParentNode (QuerySelector(..))

type HM m = Hooks.HookM m Unit  

contentComponent :: forall q i o m. H.Component HH.HTML q i o m
contentComponent = Hooks.component \_ _ -> Hooks.do

  Hooks.pure do
    HH.div_ [ HH.span [HP.class_ $ HH.ClassName "icon myclass"] []
            ]

seq :: String
seq = fold $ (\ n -> "\\f00" <> show n <> "\n") <$> 0 Array... 9

styleComponent :: forall q i o m. H.Component HH.HTML q i o m
styleComponent = Hooks.component \_ _ -> Hooks.do
  Hooks.pure do
    HC.stylesheet $ body ? do
                        (fromString ".icon") ? do
                          display inlineBlock
                          fontSize $ em 6.0
                        (fromString ".myclass::before") ? do
                          fontFamily ["Font Awesome 5 Free"] $ NonEmpty.singleton sansSerif
                          key (Key $ Plain "content") 
                            $ "'" <> seq <> "'"
scriptComponent :: forall q i o m. H.Component HH.HTML q i o m
scriptComponent = Hooks.component \_ _ -> Hooks.do
  Hooks.pure do
    HH.script
      [ HP.src "https://kit.fontawesome.com/4958828633.js"
      , HP.prop (HH.PropName "crossorigin") "anonymous"
      ]
      [
      ]

main :: Effect Unit
main = HA.runHalogenAff do
  HA.awaitLoad
  let drivenBy tag component = 
        traverse_ (runUI component unit) =<< HA.selectElement (QuerySelector tag)
  "head" `drivenBy` scriptComponent
  "head" `drivenBy` styleComponent
  "body" `drivenBy` contentComponent
