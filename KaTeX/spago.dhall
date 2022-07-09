{ name = "KaTeX"
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
