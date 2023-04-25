{ name = "devoir8"
, dependencies =
  [ "arrays"
  , "control"
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
  , "rationals"
  , "record"
  , "transformers"
  , "tuples"
  , "web-dom"
  , "web-uievents"
  ]
, packages = ./packages.dhall
, sources = [ "src/**/*.purs" ]
}
