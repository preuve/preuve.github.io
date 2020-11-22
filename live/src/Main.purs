module Main where

import Prelude

import Color (rgb)
import Data.Int (toNumber)
import Data.Maybe (Maybe (..), maybe)
import Data.Set (Set, isEmpty)
import Effect (Effect)
import FRP.Behavior (Behavior, animate, fixB)
import FRP.Behavior.Mouse (buttons, position) as Mouse
import FRP.Event.Mouse (Mouse, getMouse)
import Graphics.Canvas (getCanvasElementById, getCanvasHeight, getCanvasWidth, getContext2D)
import Graphics.Drawing (Drawing, path, lineWidth, outlineColor, outlined, render, scale)
import Web.HTML (window)
import Web.HTML.Window (innerHeight,innerWidth)

type Coord = { x :: Number, y :: Number}

defaultCoord :: Coord
defaultCoord = { x: 0.0, y: 0.0 }

type Segment = { from :: Coord, to :: Coord }

defaultSegment :: Segment
defaultSegment = { from: defaultCoord, to: defaultCoord }

scene :: Mouse -> Coord -> Coord -> Behavior Drawing
scene mouse { x: cw, y: ch } { x: ww, y: wh } = 
  renderSegment <$> Mouse.buttons mouse <*> segment where
  
  scaleX :: Number
  scaleX = cw /ww

  scaleY :: Number
  scaleY = ch / wh 

  renderSegment :: Set Int -> Segment-> Drawing
  renderSegment bs { from, to } =
    let cursor =
          scale scaleX scaleY $
            outlined
              (outlineColor (rgb 0 0 0) <> lineWidth (1.5))
              (path [from, to])
     in if isEmpty bs then mempty
        else cursor
        
  segment :: Behavior Segment
  segment = fixB defaultSegment $ \ seg -> toSegment <$> coord <*> seg where
    toSegment c s = { from: s.to, to: c.from }

  coord :: Behavior Segment
  coord = fromCoord <$> Mouse.position mouse where
    fromCoord = maybe defaultSegment $ \ { x, y } -> 
      { from: { x: toNumber x / scaleX
              , y: toNumber y / scaleY}
      , to: defaultCoord
      }

main :: Effect Unit
main = do
  win <- window
  wh <- innerHeight win
  ww <- innerWidth win
  mcanvas <- getCanvasElementById "canvas"
  case mcanvas of
    Nothing -> pure unit
    Just canvas -> do
        ctx <- getContext2D canvas
        cw <- getCanvasWidth canvas
        ch <- getCanvasHeight canvas
        mouse <- getMouse
        _ <- animate (scene mouse { x: cw, y: ch } 
                                  { x: toNumber ww, y: toNumber wh }) 
                                  (render ctx)
        pure unit
