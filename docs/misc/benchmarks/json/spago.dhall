{-
Welcome to a Spago project!
You can edit this file as you like.
-}
{ name =
    "my-project"
, dependencies =
    [ "aff"
    , "argonaut-codecs"
    , "argonaut-core"
    , "canvas"
    , "console"
    , "dom-filereader"
    , "effect"
    , "psci-support"
    , "transformers"
    , "web-html"
    ]
, packages =
    ./packages.dhall
, sources =
    [ "src/**/*.purs", "test/**/*.purs" ]
}
