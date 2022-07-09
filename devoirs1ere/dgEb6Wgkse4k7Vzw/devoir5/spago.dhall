{-
Welcome to a Spago project!
You can edit this file as you like.
-}
{ name = "my-project"
, dependencies =
  [ "arrays"
  , "canvas"
  , "concur-core"
  , "concur-vdom"
  , "console"
  , "effect"
  , "foldable-traversable"
  , "geometry-plane"
  , "halogen-vdom"
  , "integers"
  , "maybe"
  , "numbers"
  , "ordered-collections"
  , "partial"
  , "prelude"
  , "psci-support"
  , "rationals"
  , "sparse-polynomials"
  , "transformers"
  , "tuples"
  , "web-html"
  ]
, packages = ./packages.dhall
, sources = [ "src/**/*.purs", "test/**/*.purs" ]
}
