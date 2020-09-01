{-
Welcome to a Spago project!
You can edit this file as you like.
-}
{ name = "my-project"
, dependencies =
    [ "console"
    , "datetime"
    , "effect"
    , "js-timers"
    , "now"
    , "psci-support"
    , "refs"
    , "spork"
    ]
, packages = ./packages.dhall
, sources = [ "src/**/*.purs", "test/**/*.purs" ]
}
