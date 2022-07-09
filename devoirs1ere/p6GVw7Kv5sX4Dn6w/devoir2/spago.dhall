{-
Welcome to a Spago project!
You can edit this file as you like.
-}
{ name = "my-project"
, dependencies =
  [ "arrays"
  , "concur-core"
  , "concur-vdom"
  , "console"
  , "effect"
  , "foldable-traversable"
  , "geometry-plane"
  , "integers"
  , "maybe"
  , "numbers"
  , "partial"
  , "prelude"
  , "transformers"
  , "tuples"
  ]
, packages = ./packages.dhall
, sources = [ "src/**/*.purs", "test/**/*.purs" ]
}
