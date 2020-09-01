{-
Welcome to a Spago project!
You can edit this file as you like.
-}
{ name =
    "my-project"
, dependencies =
    [ "behaviors"
    , "canvas"
    , "console"
    , "dom-filereader"
    , "effect"
    , "psci-support"
    , "sparse-polynomials"
    ]
, packages =
    ./packages.dhall
, sources =
    [ "src/**/*.purs", "test/**/*.purs" ]
}
