{-
Welcome to a Spago project!
You can edit this file as you like.
-}
{ name =
    "my-project"
, dependencies =
    [ "aff"
    , "arrays"
    , "behaviors"
    , "canvas"
    , "console"
    , "dom-filereader"
    , "effect"
    , "enums"
    , "foldable-traversable"
    , "math"
    , "psci-support"
    , "sparse-polynomials"
    , "strings"
    ]
, packages =
    ./packages.dhall
, sources =
    [ "src/**/*.purs", "test/**/*.purs" ]
}
