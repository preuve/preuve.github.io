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
  , "transformers"
  , "tuples"
  , "web-dom"
  , "web-events"
  , "web-html"
  , "web-uievents"
  ]
, packages = ./packages.dhall
, sources = [ "src/**/*.purs" ]
}
