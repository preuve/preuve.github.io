{-
Welcome to a Spago project!
You can edit this file as you like.
-}
{ name = "my-project"
, dependencies =
  [ "canvas"
  , "colors"
  , "console"
  , "control"
  , "deku"
  , "effect"
  , "foldable-traversable"
  , "integers"
  , "lists"
  , "maybe"
  , "numbers"
  , "prelude"
  , "tuples"
  , "web-uievents"
  ]
, packages = ./packages.dhall
, sources = [ "src/**/*.purs", "test/**/*.purs" ]
}
