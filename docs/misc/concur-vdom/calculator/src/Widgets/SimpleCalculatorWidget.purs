module Widgets.SimpleCalculatorWidget where

import Concur.Core (Widget)
import Concur.VDom (HTML)
import Concur.VDom.DOM (node, text)
import Concur.VDom.Props as P
import Control.Bind (bind)
import Data.Function (($))
import Data.Functor ((<$))
import SimpleCalculator as SimpleCalculator

operator = "width: 114px; margin-left: 2px; padding: 3px; background-color: lightgray; text-align: left;    fontsize: 6pt; color: gray; margin-bottom: 4px;" :: String
display = "width: 200px; margin-left: 2px; padding: 2px; border: 1px solid gray; text-align: right;" :: String
decimal = "background-color: green; text-align: center; width: 20px; border: 1px solid lightgreen; color: lightgreen;" :: String
result = "background-color: chocolate; text-align: center; width: 20px; border: 1px solid maroon; color: white;" :: String
cancel = "background-color: violet; text-align: center; width: 20px; border: 1px solid purple; color: purple;" :: String
std =  "background-color: yellow; text-align: center; width: 25px; border: 1px solid green;" :: String
memory = "width: 114px; margin-left: 2px; padding: 3px; background-color: lightgray; text-align: left; font-size: 6pt; color: gray; margin-bottom: 1px;" :: String
           
calculatorWidget :: SimpleCalculator.Status -> Widget HTML SimpleCalculator.Key
calculatorWidget status = node "div" [] [
    node "div" [P.prop "style" display] [text status.display],
    node "table" [] [
        node "tbody" [] [
            node "tr" [] [
                key 1 std          SimpleCalculator.K_7        "7",
                key 1 std          SimpleCalculator.K_8        "8",
                key 1 std          SimpleCalculator.K_9        "9",
                key 1 operator  SimpleCalculator.K_Divide   "/"
            ],
            node "tr" [] [
                key 1 std          SimpleCalculator.K_4        "4",
                key 1 std          SimpleCalculator.K_5        "5",
                key 1 std          SimpleCalculator.K_6        "6",
                key 1 operator  SimpleCalculator.K_Multiple "*"
            ],
            node "tr" [] [
                key 1 std          SimpleCalculator.K_1        "1",
                key 1 std          SimpleCalculator.K_2        "2",
                key 1 std          SimpleCalculator.K_3        "3",
                key 1 operator  SimpleCalculator.K_Subtract "-"
            ],
            node "tr" [] [
                key 2 std          SimpleCalculator.K_0        "0",
                key 1 decimal   SimpleCalculator.K_Dot      ".",
                key 1 operator  SimpleCalculator.K_Add      "+"
            ],
            node "tr" [] [
                key 3 result    SimpleCalculator.K_Equal    "=",
                key 1 cancel    SimpleCalculator.K_C        "C"
            ]
        ]
    ]
]
    where
        key :: Int -> String -> SimpleCalculator.Key -> String -> Widget HTML SimpleCalculator.Key
        key colSpan styleContent action label = action <$ node "td" [P.prop "colSpan" colSpan, P.prop "style" styleContent, P.handle "click"] [text label]

widget :: forall a. Widget HTML a
widget = go SimpleCalculator.initialState
    where
        go :: SimpleCalculator.Status -> Widget HTML a
        go status = do
            key <- calculatorWidget status
            go $ SimpleCalculator.handleKey status key
