{-
Welcome to your new Dhall package-set!

Below are instructions for how to edit this file for most use
cases, so that you don't need to know Dhall to use it.

## Warning: Don't Move This Top-Level Comment!

Due to how `dhall format` currently works, this comment's
instructions cannot appear near corresponding sections below
because `dhall format` will delete the comment. However,
it will not delete a top-level comment like this one.

## Use Cases

Most will want to do one or both of these options:
1. Override/Patch a package's dependency
2. Add a package not already in the default package set

This file will continue to work whether you use one or both options.
Instructions for each option are explained below.

### Overriding/Patching a package

Purpose:
- Change a package's dependency to a newer/older release than the
    default package set's release
- Use your own modified version of some dependency that may
    include new API, changed API, removed API by
    using your custom git repo of the library rather than
    the package set's repo

Syntax:
Replace the overrides' "{=}" (an empty record) with the following idea
The "//" or "⫽" means "merge these two records and
  when they have the same value, use the one on the right:"
-------------------------------
let override =
  { packageName =
      upstream.packageName // { updateEntity1 = "new value", updateEntity2 = "new value" }
  , packageName =
      upstream.packageName // { version = "v4.0.0" }
  , packageName =
      upstream.packageName // { repo = "https://www.example.com/path/to/new/repo.git" }
  }
-------------------------------

Example:
-------------------------------
let overrides =
  { halogen =
      upstream.halogen // { version = "master" }
  , halogen-vdom =
      upstream.halogen-vdom // { version = "v4.0.0" }
  }
-------------------------------

### Additions

Purpose:
- Add packages that aren't already included in the default package set

Syntax:
Replace the additions' "{=}" (an empty record) with the following idea:
-------------------------------
let additions =
  { package-name =
       { dependencies =
           [ "dependency1"
           , "dependency2"
           ]
       , repo =
           "https://example.com/path/to/git/repo.git"
       , version =
           "tag ('v4.0.0') or branch ('master')"
       }
  , package-name =
       { dependencies =
           [ "dependency1"
           , "dependency2"
           ]
       , repo =
           "https://example.com/path/to/git/repo.git"
       , version =
           "tag ('v4.0.0') or branch ('master')"
       }
  , etc.
  }
-------------------------------

Example:
-------------------------------
let additions =
  { benchotron =
      { dependencies =
          [ "arrays"
          , "exists"
          , "profunctor"
          , "strings"
          , "quickcheck"
          , "lcg"
          , "transformers"
          , "foldable-traversable"
          , "exceptions"
          , "node-fs"
          , "node-buffer"
          , "node-readline"
          , "datetime"
          , "now"
          ]
      , repo =
          "https://github.com/hdgarrood/purescript-benchotron.git"
      , version =
          "v7.0.0"
      }
  }
-------------------------------
-}
let additions =
      { concur-react =
        { dependencies =
           [ "aff"
            , "arrays"
            , "avar"
            , "console"
            , "concur-core"
            , "foldable-traversable"
            , "free"
            , "nonempty"
            , "profunctor-lenses"
            , "react"
            , "react-dom"
            , "tailrec"
            , "web-dom"
            , "web-html"
        ]
        , repo = "https://github.com/purescript-concur/purescript-concur-react.git"
        , version = "v0.4.2"
        },
        concur-core =
        { dependencies =
           [ "aff"
            , "aff-bus"
            , "arrays"
            , "avar"
            , "console"
            , "foldable-traversable"
            , "free"
            , "profunctor-lenses"
            , "tailrec"
            , "control"
            , "datetime"
            , "effect"
            , "either"
            , "exceptions"
            , "identity"
            , "lazy"
            , "maybe"
            , "newtype"
            , "parallel"
            , "prelude"
            , "transformers"
            , "tuples"
            ]
        , repo = "https://github.com/Ebmtranceboy/purescript-concur-core.git"
        , version = "v0.5.0"
        },
        concur-vdom = { 
            dependencies =
                [ "aff"
                , "arrays"
                , "avar"
                , "concur-core"
                , "console"
                , "foldable-traversable"
                , "free"
                , "geometry-plane"
                , "halogen-vdom"
                , "nonempty"
                , "profunctor-lenses"
                , "sparse-polynomials"
                , "tailrec"
                , "web-dom"
                , "web-html"
                ]
        , repo = "https://github.com/Ebmtranceboy/purescript-concur-vdom.git"
        , version = "v0.1.1"
        }
      }

let upstream =
      https://github.com/purescript/package-sets/releases/download/psc-0.15.0-20220515/packages.dhall
        sha256:6d7cde12a37db772a5fb78a1d8877481445abfd3351d57605e2ceb5e66892022
     

in  upstream // additions
