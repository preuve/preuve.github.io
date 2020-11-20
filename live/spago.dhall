{-
Welcome to a Spago project!
You can edit this file as you like.
-}
{ name = "my-project"
, dependencies =
  [ "behaviors"
  , "concur-vdom"
  , "console"
  , "drawing"
  , "effect"
  , "geometry-plane"
  , "halogen-vdom"
  , "psci-support"
  , "web-uievents"
  ]
, packages = ./packages.dhall
, sources = [ "src/**/*.purs", "test/**/*.purs" ]
}
