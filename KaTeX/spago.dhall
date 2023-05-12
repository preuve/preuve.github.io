{ name = "KaTeX"
, dependencies =
  [ "arrays"
  , "deku"
  , "effect"
  , "foldable-traversable"
  , "geometry-plane"
  , "hyrule"
  , "integers"
  , "maybe"
  , "numbers"
  , "partial"
  , "prelude"
  , "transformers"
  , "tuples"
  , "web-dom"
  ]
, packages = ./packages.dhall
, sources = [ "src/**/*.purs" ]
}
