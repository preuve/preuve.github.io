module Concur.VDom.SVG where

import Prelude
import Concur.VDom.DOM (El, el') as D
import Concur.VDom.Types (mkHTMLNode, unHTML)
import Halogen.VDom.Types (VDom(..), ElemName(..), Namespace(..)) as H
import Data.Maybe (Maybe(..))
import Concur.VDom.Props.Internal (Prop(..)) as P
import Concur.Core.Props (Props(..))

svgNS = "http://www.w3.org/2000/svg" :: String

svg :: D.El
svg = D.el' (\p c -> mkHTMLNode $ 
                  H.Elem  (Just $ H.Namespace svgNS) 
                          (H.ElemName "svg") 
                          p  
                          (unHTML c))
                          
line :: D.El
line = D.el' (\p _ -> mkHTMLNode $ 
                  H.Elem  (Just $ H.Namespace svgNS) 
                          (H.ElemName "line") 
                          p  
                          [])
 
ellipse :: D.El
ellipse = D.el' (\p _ -> mkHTMLNode $ 
                  H.Elem  (Just $ H.Namespace svgNS) 
                          (H.ElemName "ellipse") 
                          p  
                          [])

path :: D.El
path = D.el' (\p _ -> mkHTMLNode $ 
                  H.Elem  (Just $ H.Namespace svgNS) 
                          (H.ElemName "path") 
                          p  
                          [])
 


-- | Construct a custom key value attr
attr :: forall a. String -> String -> Props P.Prop a
attr s v = PrimProp (P.Attribute Nothing s v)

xmlns :: forall a. String -> Props P.Prop a
xmlns = attr "xmlns"

xlink :: forall a. String -> Props P.Prop a
xlink = attr "xmlns:xlink"

width :: forall a. String -> Props P.Prop a
width = attr "width"

height :: forall a. String -> Props P.Prop a
height = attr "height"

viewBox :: forall a. String -> Props P.Prop a
viewBox = attr "viewBox"

unsafeMkProp :: forall a b. Show b => String -> b -> Props P.Prop a
unsafeMkProp s v = attr s (show v)

strokeWidth :: forall a. Int -> Props P.Prop a
strokeWidth = unsafeMkProp "stroke-width"

stroke :: forall a. String -> Props P.Prop a
stroke = attr "stroke"

fill :: forall a. String -> Props P.Prop a
fill = attr "fill"

d :: forall a. String -> Props P.Prop a
d = attr "d"

transform :: forall a. String -> Props P.Prop a
transform = attr "transform"
