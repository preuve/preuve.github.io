{-
Welcome to a Spago project!
You can edit this file as you like.
-}
{ name = "my-project"
, dependencies =
  [ "concur-vdom"
  , "console"
  , "effect"
  , "halogen-vdom"
  , "psci-support"
  , "sparse-matrices"
  , "sparse-polynomials"
  , "web-uievents"
  ]
, packages = ./packages.dhall
, sources = [ "src/**/*.purs", "test/**/*.purs" ]
}
