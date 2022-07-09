{ name = "deku4-pursx"
, dependencies =
  [ "arrays"
  , "control"
  , "deku"
  , "effect"
  , "event"
  , "foldable-traversable"
  , "geometry-plane"
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
