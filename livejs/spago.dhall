{-
Welcome to a Spago project!
You can edit this file as you like.
-}
{ name = "my-project"
, dependencies =
  [ "canvas"
  , "console"
  , "debug"
  , "deku"
  , "effect"
  , "foldable-traversable"
  , "integers"
  , "maybe"
  , "numbers"
  , "prelude"
  , "tuples"
  , "web-events"
  , "web-touchevents"
  , "web-uievents"
  ]
, packages = ./packages.dhall
, sources = [ "src/**/*.purs", "test/**/*.purs" ]
}
