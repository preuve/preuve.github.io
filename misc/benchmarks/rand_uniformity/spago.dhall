{-
Welcome to a Spago project!
You can edit this file as you like.
-}
{ name =
    "my-project"
, dependencies =
    [ "aff"
    , "arrays"
    , "canvas"
    , "console"
    , "dom-filereader"
    , "effect"
    , "enums"
    , "math"
    , "maybe"
    , "psci-support"
    , "sparse-polynomials"
    , "strings"
    , "web-html"
    ]
, packages =
    ./packages.dhall
, sources =
    [ "src/**/*.purs", "test/**/*.purs" ]
}
