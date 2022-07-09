(() => {
  // output/Control.Semigroupoid/index.js
  var semigroupoidFn = {
    compose: function(f) {
      return function(g) {
        return function(x) {
          return f(g(x));
        };
      };
    }
  };
  var compose = function(dict) {
    return dict.compose;
  };

  // output/Control.Category/index.js
  var identity = function(dict) {
    return dict.identity;
  };
  var categoryFn = {
    identity: function(x) {
      return x;
    },
    Semigroupoid0: function() {
      return semigroupoidFn;
    }
  };

  // output/Data.Boolean/index.js
  var otherwise = true;

  // output/Data.Function/index.js
  var flip = function(f) {
    return function(b2) {
      return function(a) {
        return f(a)(b2);
      };
    };
  };
  var $$const = function(a) {
    return function(v) {
      return a;
    };
  };

  // output/Data.Functor/foreign.js
  var arrayMap = function(f) {
    return function(arr) {
      var l = arr.length;
      var result = new Array(l);
      for (var i = 0; i < l; i++) {
        result[i] = f(arr[i]);
      }
      return result;
    };
  };

  // output/Data.Unit/foreign.js
  var unit = void 0;

  // output/Data.Functor/index.js
  var map = function(dict) {
    return dict.map;
  };
  var $$void = function(dictFunctor) {
    return map(dictFunctor)($$const(unit));
  };
  var voidRight = function(dictFunctor) {
    return function(x) {
      return map(dictFunctor)($$const(x));
    };
  };
  var functorFn = {
    map: /* @__PURE__ */ compose(semigroupoidFn)
  };
  var functorArray = {
    map: arrayMap
  };

  // output/Control.Apply/index.js
  var apply = function(dict) {
    return dict.apply;
  };
  var applySecond = function(dictApply) {
    return function(a) {
      return function(b2) {
        return apply(dictApply)(map(dictApply.Functor0())($$const(identity(categoryFn)))(a))(b2);
      };
    };
  };

  // output/Control.Applicative/index.js
  var pure = function(dict) {
    return dict.pure;
  };
  var liftA1 = function(dictApplicative) {
    return function(f) {
      return function(a) {
        return apply(dictApplicative.Apply0())(pure(dictApplicative)(f))(a);
      };
    };
  };

  // output/Control.Bind/index.js
  var discard = function(dict) {
    return dict.discard;
  };
  var bind = function(dict) {
    return dict.bind;
  };
  var bindFlipped = function(dictBind) {
    return flip(bind(dictBind));
  };
  var composeKleisliFlipped = function(dictBind) {
    return function(f) {
      return function(g) {
        return function(a) {
          return bindFlipped(dictBind)(f)(g(a));
        };
      };
    };
  };
  var discardUnit = {
    discard: function(dictBind) {
      return bind(dictBind);
    }
  };

  // output/Control.Monad/index.js
  var ap = function(dictMonad) {
    return function(f) {
      return function(a) {
        return bind(dictMonad.Bind1())(f)(function(f$prime) {
          return bind(dictMonad.Bind1())(a)(function(a$prime) {
            return pure(dictMonad.Applicative0())(f$prime(a$prime));
          });
        });
      };
    };
  };

  // output/Data.Semigroup/foreign.js
  var concatArray = function(xs) {
    return function(ys) {
      if (xs.length === 0)
        return ys;
      if (ys.length === 0)
        return xs;
      return xs.concat(ys);
    };
  };

  // output/Data.Semigroup/index.js
  var semigroupUnit = {
    append: function(v) {
      return function(v1) {
        return unit;
      };
    }
  };
  var semigroupArray = {
    append: concatArray
  };
  var append = function(dict) {
    return dict.append;
  };

  // output/Control.Alt/index.js
  var alt = function(dict) {
    return dict.alt;
  };

  // output/Data.Bounded/foreign.js
  var topInt = 2147483647;
  var bottomInt = -2147483648;
  var topChar = String.fromCharCode(65535);
  var bottomChar = String.fromCharCode(0);
  var topNumber = Number.POSITIVE_INFINITY;
  var bottomNumber = Number.NEGATIVE_INFINITY;

  // output/Data.Ord/foreign.js
  var unsafeCompareImpl = function(lt) {
    return function(eq2) {
      return function(gt) {
        return function(x) {
          return function(y) {
            return x < y ? lt : x === y ? eq2 : gt;
          };
        };
      };
    };
  };
  var ordIntImpl = unsafeCompareImpl;

  // output/Data.Eq/foreign.js
  var refEq = function(r1) {
    return function(r2) {
      return r1 === r2;
    };
  };
  var eqIntImpl = refEq;

  // output/Data.Eq/index.js
  var eqInt = {
    eq: eqIntImpl
  };
  var eq = function(dict) {
    return dict.eq;
  };

  // output/Data.Ordering/index.js
  var LT = /* @__PURE__ */ function() {
    function LT2() {
    }
    ;
    LT2.value = new LT2();
    return LT2;
  }();
  var GT = /* @__PURE__ */ function() {
    function GT2() {
    }
    ;
    GT2.value = new GT2();
    return GT2;
  }();
  var EQ = /* @__PURE__ */ function() {
    function EQ2() {
    }
    ;
    EQ2.value = new EQ2();
    return EQ2;
  }();

  // output/Data.Ring/foreign.js
  var intSub = function(x) {
    return function(y) {
      return x - y | 0;
    };
  };

  // output/Data.Semiring/foreign.js
  var intAdd = function(x) {
    return function(y) {
      return x + y | 0;
    };
  };
  var intMul = function(x) {
    return function(y) {
      return x * y | 0;
    };
  };

  // output/Data.Semiring/index.js
  var zero = function(dict) {
    return dict.zero;
  };
  var semiringInt = {
    add: intAdd,
    zero: 0,
    mul: intMul,
    one: 1
  };
  var one = function(dict) {
    return dict.one;
  };
  var mul = function(dict) {
    return dict.mul;
  };
  var add = function(dict) {
    return dict.add;
  };

  // output/Data.Ring/index.js
  var sub = function(dict) {
    return dict.sub;
  };
  var ringInt = {
    sub: intSub,
    Semiring0: function() {
      return semiringInt;
    }
  };
  var negate = function(dictRing) {
    return function(a) {
      return sub(dictRing)(zero(dictRing.Semiring0()))(a);
    };
  };

  // output/Data.Ord/index.js
  var ordInt = /* @__PURE__ */ function() {
    return {
      compare: ordIntImpl(LT.value)(EQ.value)(GT.value),
      Eq0: function() {
        return eqInt;
      }
    };
  }();
  var compare = function(dict) {
    return dict.compare;
  };
  var greaterThan = function(dictOrd) {
    return function(a1) {
      return function(a2) {
        var v = compare(dictOrd)(a1)(a2);
        if (v instanceof GT) {
          return true;
        }
        ;
        return false;
      };
    };
  };
  var greaterThanOrEq = function(dictOrd) {
    return function(a1) {
      return function(a2) {
        var v = compare(dictOrd)(a1)(a2);
        if (v instanceof LT) {
          return false;
        }
        ;
        return true;
      };
    };
  };
  var lessThan = function(dictOrd) {
    return function(a1) {
      return function(a2) {
        var v = compare(dictOrd)(a1)(a2);
        if (v instanceof LT) {
          return true;
        }
        ;
        return false;
      };
    };
  };
  var signum = function(dictOrd) {
    return function(dictRing) {
      return function(x) {
        var $47 = lessThan(dictOrd)(x)(zero(dictRing.Semiring0()));
        if ($47) {
          return negate(dictRing)(one(dictRing.Semiring0()));
        }
        ;
        var $48 = greaterThan(dictOrd)(x)(zero(dictRing.Semiring0()));
        if ($48) {
          return one(dictRing.Semiring0());
        }
        ;
        return x;
      };
    };
  };
  var abs = function(dictOrd) {
    return function(dictRing) {
      return function(x) {
        var $57 = greaterThanOrEq(dictOrd)(x)(zero(dictRing.Semiring0()));
        if ($57) {
          return x;
        }
        ;
        return negate(dictRing)(x);
      };
    };
  };

  // output/Data.Bounded/index.js
  var top = function(dict) {
    return dict.top;
  };
  var boundedInt = {
    top: topInt,
    bottom: bottomInt,
    Ord0: function() {
      return ordInt;
    }
  };
  var bottom = function(dict) {
    return dict.bottom;
  };

  // output/Data.Show/foreign.js
  var showIntImpl = function(n) {
    return n.toString();
  };
  var showArrayImpl = function(f) {
    return function(xs) {
      var ss = [];
      for (var i = 0, l = xs.length; i < l; i++) {
        ss[i] = f(xs[i]);
      }
      return "[" + ss.join(",") + "]";
    };
  };

  // output/Data.Show/index.js
  var showInt = {
    show: showIntImpl
  };
  var show = function(dict) {
    return dict.show;
  };
  var showArray = function(dictShow) {
    return {
      show: showArrayImpl(show(dictShow))
    };
  };

  // output/Data.Maybe/index.js
  var Nothing = /* @__PURE__ */ function() {
    function Nothing2() {
    }
    ;
    Nothing2.value = new Nothing2();
    return Nothing2;
  }();
  var Just = /* @__PURE__ */ function() {
    function Just2(value0) {
      this.value0 = value0;
    }
    ;
    Just2.create = function(value0) {
      return new Just2(value0);
    };
    return Just2;
  }();
  var maybe = function(v) {
    return function(v1) {
      return function(v2) {
        if (v2 instanceof Nothing) {
          return v;
        }
        ;
        if (v2 instanceof Just) {
          return v1(v2.value0);
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 237, column 1 - line 237, column 51): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
      };
    };
  };
  var functorMaybe = {
    map: function(v) {
      return function(v1) {
        if (v1 instanceof Just) {
          return new Just(v(v1.value0));
        }
        ;
        return Nothing.value;
      };
    }
  };
  var fromMaybe = function(a) {
    return maybe(a)(identity(categoryFn));
  };
  var fromJust = function() {
    return function(v) {
      if (v instanceof Just) {
        return v.value0;
      }
      ;
      throw new Error("Failed pattern match at Data.Maybe (line 288, column 1 - line 288, column 46): " + [v.constructor.name]);
    };
  };
  var applyMaybe = {
    apply: function(v) {
      return function(v1) {
        if (v instanceof Just) {
          return map(functorMaybe)(v.value0)(v1);
        }
        ;
        if (v instanceof Nothing) {
          return Nothing.value;
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 67, column 1 - line 69, column 30): " + [v.constructor.name, v1.constructor.name]);
      };
    },
    Functor0: function() {
      return functorMaybe;
    }
  };
  var bindMaybe = {
    bind: function(v) {
      return function(v1) {
        if (v instanceof Just) {
          return v1(v.value0);
        }
        ;
        if (v instanceof Nothing) {
          return Nothing.value;
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 125, column 1 - line 127, column 28): " + [v.constructor.name, v1.constructor.name]);
      };
    },
    Apply0: function() {
      return applyMaybe;
    }
  };

  // output/Data.Either/index.js
  var Left = /* @__PURE__ */ function() {
    function Left2(value0) {
      this.value0 = value0;
    }
    ;
    Left2.create = function(value0) {
      return new Left2(value0);
    };
    return Left2;
  }();
  var Right = /* @__PURE__ */ function() {
    function Right2(value0) {
      this.value0 = value0;
    }
    ;
    Right2.create = function(value0) {
      return new Right2(value0);
    };
    return Right2;
  }();
  var functorEither = {
    map: function(f) {
      return function(m2) {
        if (m2 instanceof Left) {
          return new Left(m2.value0);
        }
        ;
        if (m2 instanceof Right) {
          return new Right(f(m2.value0));
        }
        ;
        throw new Error("Failed pattern match at Data.Either (line 31, column 1 - line 31, column 52): " + [m2.constructor.name]);
      };
    }
  };
  var either = function(v) {
    return function(v1) {
      return function(v2) {
        if (v2 instanceof Left) {
          return v(v2.value0);
        }
        ;
        if (v2 instanceof Right) {
          return v1(v2.value0);
        }
        ;
        throw new Error("Failed pattern match at Data.Either (line 208, column 1 - line 208, column 64): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
      };
    };
  };

  // output/Effect/foreign.js
  var pureE = function(a) {
    return function() {
      return a;
    };
  };
  var bindE = function(a) {
    return function(f) {
      return function() {
        return f(a())();
      };
    };
  };

  // output/Data.EuclideanRing/foreign.js
  var intDegree = function(x) {
    return Math.min(Math.abs(x), 2147483647);
  };
  var intDiv = function(x) {
    return function(y) {
      if (y === 0)
        return 0;
      return y > 0 ? Math.floor(x / y) : -Math.floor(x / -y);
    };
  };
  var intMod = function(x) {
    return function(y) {
      if (y === 0)
        return 0;
      var yy = Math.abs(y);
      return (x % yy + yy) % yy;
    };
  };

  // output/Data.CommutativeRing/index.js
  var commutativeRingInt = {
    Ring0: function() {
      return ringInt;
    }
  };

  // output/Data.EuclideanRing/index.js
  var mod = function(dict) {
    return dict.mod;
  };
  var gcd = function($copy_dictEq) {
    return function($copy_dictEuclideanRing) {
      return function($copy_a) {
        return function($copy_b) {
          var $tco_var_dictEq = $copy_dictEq;
          var $tco_var_dictEuclideanRing = $copy_dictEuclideanRing;
          var $tco_var_a = $copy_a;
          var $tco_done = false;
          var $tco_result;
          function $tco_loop(dictEq, dictEuclideanRing, a, b2) {
            var $8 = eq(dictEq)(b2)(zero(dictEuclideanRing.CommutativeRing0().Ring0().Semiring0()));
            if ($8) {
              $tco_done = true;
              return a;
            }
            ;
            $tco_var_dictEq = dictEq;
            $tco_var_dictEuclideanRing = dictEuclideanRing;
            $tco_var_a = b2;
            $copy_b = mod(dictEuclideanRing)(a)(b2);
            return;
          }
          ;
          while (!$tco_done) {
            $tco_result = $tco_loop($tco_var_dictEq, $tco_var_dictEuclideanRing, $tco_var_a, $copy_b);
          }
          ;
          return $tco_result;
        };
      };
    };
  };
  var euclideanRingInt = {
    degree: intDegree,
    div: intDiv,
    mod: intMod,
    CommutativeRing0: function() {
      return commutativeRingInt;
    }
  };
  var div = function(dict) {
    return dict.div;
  };

  // output/Data.Monoid/index.js
  var monoidUnit = {
    mempty: unit,
    Semigroup0: function() {
      return semigroupUnit;
    }
  };
  var monoidArray = {
    mempty: [],
    Semigroup0: function() {
      return semigroupArray;
    }
  };
  var mempty = function(dict) {
    return dict.mempty;
  };

  // output/Effect/index.js
  var $runtime_lazy = function(name15, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name15 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
      return val;
    };
  };
  var monadEffect = {
    Applicative0: function() {
      return applicativeEffect;
    },
    Bind1: function() {
      return bindEffect;
    }
  };
  var bindEffect = {
    bind: bindE,
    Apply0: function() {
      return $lazy_applyEffect(0);
    }
  };
  var applicativeEffect = {
    pure: pureE,
    Apply0: function() {
      return $lazy_applyEffect(0);
    }
  };
  var $lazy_functorEffect = /* @__PURE__ */ $runtime_lazy("functorEffect", "Effect", function() {
    return {
      map: liftA1(applicativeEffect)
    };
  });
  var $lazy_applyEffect = /* @__PURE__ */ $runtime_lazy("applyEffect", "Effect", function() {
    return {
      apply: ap(monadEffect),
      Functor0: function() {
        return $lazy_functorEffect(0);
      }
    };
  });
  var functorEffect = /* @__PURE__ */ $lazy_functorEffect(20);

  // output/Effect.Exception/foreign.js
  function showErrorImpl(err) {
    return err.stack || err.toString();
  }
  function error(msg) {
    return new Error(msg);
  }
  function throwException(e) {
    return function() {
      throw e;
    };
  }

  // output/Effect.Exception/index.js
  var showError = {
    show: showErrorImpl
  };

  // output/Control.Monad.Error.Class/index.js
  var throwError = function(dict) {
    return dict.throwError;
  };
  var catchError = function(dict) {
    return dict.catchError;
  };
  var $$try = function(dictMonadError) {
    return function(a) {
      return catchError(dictMonadError)(map(dictMonadError.MonadThrow0().Monad0().Bind1().Apply0().Functor0())(Right.create)(a))(function() {
        var $21 = pure(dictMonadError.MonadThrow0().Monad0().Applicative0());
        return function($22) {
          return $21(Left.create($22));
        };
      }());
    };
  };

  // output/Data.Identity/index.js
  var Identity = function(x) {
    return x;
  };
  var functorIdentity = {
    map: function(f) {
      return function(m2) {
        return f(m2);
      };
    }
  };
  var applyIdentity = {
    apply: function(v) {
      return function(v1) {
        return v(v1);
      };
    },
    Functor0: function() {
      return functorIdentity;
    }
  };
  var bindIdentity = {
    bind: function(v) {
      return function(f) {
        return f(v);
      };
    },
    Apply0: function() {
      return applyIdentity;
    }
  };
  var applicativeIdentity = {
    pure: Identity,
    Apply0: function() {
      return applyIdentity;
    }
  };
  var monadIdentity = {
    Applicative0: function() {
      return applicativeIdentity;
    },
    Bind1: function() {
      return bindIdentity;
    }
  };

  // output/Effect.Ref/foreign.js
  var _new = function(val) {
    return function() {
      return { value: val };
    };
  };
  var read = function(ref) {
    return function() {
      return ref.value;
    };
  };
  var write = function(val) {
    return function(ref) {
      return function() {
        ref.value = val;
      };
    };
  };

  // output/Effect.Ref/index.js
  var $$new = _new;

  // output/Data.Tuple/index.js
  var Tuple = /* @__PURE__ */ function() {
    function Tuple2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Tuple2.create = function(value0) {
      return function(value1) {
        return new Tuple2(value0, value1);
      };
    };
    return Tuple2;
  }();
  var snd = function(v) {
    return v.value1;
  };
  var functorTuple = {
    map: function(f) {
      return function(m2) {
        return new Tuple(m2.value0, f(m2.value1));
      };
    }
  };
  var fst = function(v) {
    return v.value0;
  };

  // output/Control.Monad.State.Class/index.js
  var state = function(dict) {
    return dict.state;
  };
  var modify = function(dictMonadState) {
    return function(f) {
      return state(dictMonadState)(function(s) {
        var s$prime = f(s);
        return new Tuple(s$prime, s$prime);
      });
    };
  };
  var get = function(dictMonadState) {
    return state(dictMonadState)(function(s) {
      return new Tuple(s, s);
    });
  };

  // output/Effect.Class/index.js
  var monadEffectEffect = {
    liftEffect: /* @__PURE__ */ identity(categoryFn),
    Monad0: function() {
      return monadEffect;
    }
  };
  var liftEffect = function(dict) {
    return dict.liftEffect;
  };

  // output/Control.Plus/index.js
  var empty = function(dict) {
    return dict.empty;
  };

  // output/Unsafe.Coerce/foreign.js
  var unsafeCoerce2 = function(x) {
    return x;
  };

  // output/Safe.Coerce/index.js
  var coerce = function() {
    return unsafeCoerce2;
  };

  // output/Data.Newtype/index.js
  var wrap = coerce;
  var unwrap = coerce;

  // output/Control.Monad.State.Trans/index.js
  var functorStateT = function(dictFunctor) {
    return {
      map: function(f) {
        return function(v) {
          return function(s) {
            return map(dictFunctor)(function(v1) {
              return new Tuple(f(v1.value0), v1.value1);
            })(v(s));
          };
        };
      }
    };
  };
  var monadStateT = function(dictMonad) {
    return {
      Applicative0: function() {
        return applicativeStateT(dictMonad);
      },
      Bind1: function() {
        return bindStateT(dictMonad);
      }
    };
  };
  var bindStateT = function(dictMonad) {
    return {
      bind: function(v) {
        return function(f) {
          return function(s) {
            return bind(dictMonad.Bind1())(v(s))(function(v1) {
              var v3 = f(v1.value0);
              return v3(v1.value1);
            });
          };
        };
      },
      Apply0: function() {
        return applyStateT(dictMonad);
      }
    };
  };
  var applyStateT = function(dictMonad) {
    return {
      apply: ap(monadStateT(dictMonad)),
      Functor0: function() {
        return functorStateT(dictMonad.Bind1().Apply0().Functor0());
      }
    };
  };
  var applicativeStateT = function(dictMonad) {
    return {
      pure: function(a) {
        return function(s) {
          return pure(dictMonad.Applicative0())(new Tuple(a, s));
        };
      },
      Apply0: function() {
        return applyStateT(dictMonad);
      }
    };
  };
  var monadStateStateT = function(dictMonad) {
    return {
      state: function(f) {
        var $112 = pure(dictMonad.Applicative0());
        return function($113) {
          return $112(f($113));
        };
      },
      Monad0: function() {
        return monadStateT(dictMonad);
      }
    };
  };

  // output/Concur.Core.LiftWidget/index.js
  var widgetLiftWidget = {
    liftWidget: /* @__PURE__ */ identity(categoryFn)
  };
  var liftWidget = function(dict) {
    return dict.liftWidget;
  };

  // output/Data.Foldable/foreign.js
  var foldrArray = function(f) {
    return function(init3) {
      return function(xs) {
        var acc = init3;
        var len = xs.length;
        for (var i = len - 1; i >= 0; i--) {
          acc = f(xs[i])(acc);
        }
        return acc;
      };
    };
  };
  var foldlArray = function(f) {
    return function(init3) {
      return function(xs) {
        var acc = init3;
        var len = xs.length;
        for (var i = 0; i < len; i++) {
          acc = f(acc)(xs[i]);
        }
        return acc;
      };
    };
  };

  // output/Data.Bifunctor/index.js
  var bimap = function(dict) {
    return dict.bimap;
  };

  // output/Data.Foldable/index.js
  var foldr = function(dict) {
    return dict.foldr;
  };
  var traverse_ = function(dictApplicative) {
    return function(dictFoldable) {
      return function(f) {
        return foldr(dictFoldable)(function() {
          var $316 = applySecond(dictApplicative.Apply0());
          return function($317) {
            return $316(f($317));
          };
        }())(pure(dictApplicative)(unit));
      };
    };
  };
  var foldl = function(dict) {
    return dict.foldl;
  };
  var foldMapDefaultR = function(dictFoldable) {
    return function(dictMonoid) {
      return function(f) {
        return foldr(dictFoldable)(function(x) {
          return function(acc) {
            return append(dictMonoid.Semigroup0())(f(x))(acc);
          };
        })(mempty(dictMonoid));
      };
    };
  };
  var foldableArray = {
    foldr: foldrArray,
    foldl: foldlArray,
    foldMap: function(dictMonoid) {
      return foldMapDefaultR(foldableArray)(dictMonoid);
    }
  };

  // output/Data.FunctorWithIndex/foreign.js
  var mapWithIndexArray = function(f) {
    return function(xs) {
      var l = xs.length;
      var result = Array(l);
      for (var i = 0; i < l; i++) {
        result[i] = f(i)(xs[i]);
      }
      return result;
    };
  };

  // output/Data.FunctorWithIndex/index.js
  var mapWithIndex = function(dict) {
    return dict.mapWithIndex;
  };
  var functorWithIndexArray = {
    mapWithIndex: mapWithIndexArray,
    Functor0: function() {
      return functorArray;
    }
  };

  // output/Data.FoldableWithIndex/index.js
  var foldrWithIndex = function(dict) {
    return dict.foldrWithIndex;
  };
  var foldlWithIndex = function(dict) {
    return dict.foldlWithIndex;
  };
  var foldMapWithIndexDefaultR = function(dictFoldableWithIndex) {
    return function(dictMonoid) {
      return function(f) {
        return foldrWithIndex(dictFoldableWithIndex)(function(i) {
          return function(x) {
            return function(acc) {
              return append(dictMonoid.Semigroup0())(f(i)(x))(acc);
            };
          };
        })(mempty(dictMonoid));
      };
    };
  };
  var foldableWithIndexArray = {
    foldrWithIndex: function(f) {
      return function(z) {
        var $167 = foldr(foldableArray)(function(v) {
          return function(y) {
            return f(v.value0)(v.value1)(y);
          };
        })(z);
        var $168 = mapWithIndex(functorWithIndexArray)(Tuple.create);
        return function($169) {
          return $167($168($169));
        };
      };
    },
    foldlWithIndex: function(f) {
      return function(z) {
        var $170 = foldl(foldableArray)(function(y) {
          return function(v) {
            return f(v.value0)(y)(v.value1);
          };
        })(z);
        var $171 = mapWithIndex(functorWithIndexArray)(Tuple.create);
        return function($172) {
          return $170($171($172));
        };
      };
    },
    foldMapWithIndex: function(dictMonoid) {
      return foldMapWithIndexDefaultR(foldableWithIndexArray)(dictMonoid);
    },
    Foldable0: function() {
      return foldableArray;
    }
  };

  // output/Data.Semigroup.Foldable/index.js
  var foldl1 = function(dict) {
    return dict.foldl1;
  };
  var foldMap1DefaultL = function(dictFoldable1) {
    return function(dictFunctor) {
      return function(dictSemigroup) {
        return function(f) {
          var $114 = foldl1(dictFoldable1)(append(dictSemigroup));
          var $115 = map(dictFunctor)(f);
          return function($116) {
            return $114($115($116));
          };
        };
      };
    };
  };
  var foldMap1 = function(dict) {
    return dict.foldMap1;
  };

  // output/Data.Traversable/foreign.js
  var traverseArrayImpl = function() {
    function array1(a) {
      return [a];
    }
    function array2(a) {
      return function(b2) {
        return [a, b2];
      };
    }
    function array3(a) {
      return function(b2) {
        return function(c) {
          return [a, b2, c];
        };
      };
    }
    function concat2(xs) {
      return function(ys) {
        return xs.concat(ys);
      };
    }
    return function(apply2) {
      return function(map2) {
        return function(pure2) {
          return function(f) {
            return function(array) {
              function go2(bot, top2) {
                switch (top2 - bot) {
                  case 0:
                    return pure2([]);
                  case 1:
                    return map2(array1)(f(array[bot]));
                  case 2:
                    return apply2(map2(array2)(f(array[bot])))(f(array[bot + 1]));
                  case 3:
                    return apply2(apply2(map2(array3)(f(array[bot])))(f(array[bot + 1])))(f(array[bot + 2]));
                  default:
                    var pivot = bot + Math.floor((top2 - bot) / 4) * 2;
                    return apply2(map2(concat2)(go2(bot, pivot)))(go2(pivot, top2));
                }
              }
              return go2(0, array.length);
            };
          };
        };
      };
    };
  }();

  // output/Data.List.Types/index.js
  var Nil = /* @__PURE__ */ function() {
    function Nil3() {
    }
    ;
    Nil3.value = new Nil3();
    return Nil3;
  }();
  var Cons = /* @__PURE__ */ function() {
    function Cons3(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Cons3.create = function(value0) {
      return function(value1) {
        return new Cons3(value0, value1);
      };
    };
    return Cons3;
  }();

  // output/Data.List/index.js
  var reverse = /* @__PURE__ */ function() {
    var go2 = function($copy_acc) {
      return function($copy_v) {
        var $tco_var_acc = $copy_acc;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(acc, v) {
          if (v instanceof Nil) {
            $tco_done = true;
            return acc;
          }
          ;
          if (v instanceof Cons) {
            $tco_var_acc = new Cons(v.value0, acc);
            $copy_v = v.value1;
            return;
          }
          ;
          throw new Error("Failed pattern match at Data.List (line 368, column 3 - line 368, column 19): " + [acc.constructor.name, v.constructor.name]);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_acc, $copy_v);
        }
        ;
        return $tco_result;
      };
    };
    return go2(Nil.value);
  }();

  // output/Data.CatQueue/index.js
  var CatQueue = /* @__PURE__ */ function() {
    function CatQueue2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    CatQueue2.create = function(value0) {
      return function(value1) {
        return new CatQueue2(value0, value1);
      };
    };
    return CatQueue2;
  }();
  var uncons = function($copy_v) {
    var $tco_done = false;
    var $tco_result;
    function $tco_loop(v) {
      if (v.value0 instanceof Nil && v.value1 instanceof Nil) {
        $tco_done = true;
        return Nothing.value;
      }
      ;
      if (v.value0 instanceof Nil) {
        $copy_v = new CatQueue(reverse(v.value1), Nil.value);
        return;
      }
      ;
      if (v.value0 instanceof Cons) {
        $tco_done = true;
        return new Just(new Tuple(v.value0.value0, new CatQueue(v.value0.value1, v.value1)));
      }
      ;
      throw new Error("Failed pattern match at Data.CatQueue (line 82, column 1 - line 82, column 63): " + [v.constructor.name]);
    }
    ;
    while (!$tco_done) {
      $tco_result = $tco_loop($copy_v);
    }
    ;
    return $tco_result;
  };
  var snoc = function(v) {
    return function(a) {
      return new CatQueue(v.value0, new Cons(a, v.value1));
    };
  };
  var $$null = function(v) {
    if (v.value0 instanceof Nil && v.value1 instanceof Nil) {
      return true;
    }
    ;
    return false;
  };
  var empty2 = /* @__PURE__ */ function() {
    return new CatQueue(Nil.value, Nil.value);
  }();

  // output/Data.CatList/index.js
  var CatNil = /* @__PURE__ */ function() {
    function CatNil2() {
    }
    ;
    CatNil2.value = new CatNil2();
    return CatNil2;
  }();
  var CatCons = /* @__PURE__ */ function() {
    function CatCons2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    CatCons2.create = function(value0) {
      return function(value1) {
        return new CatCons2(value0, value1);
      };
    };
    return CatCons2;
  }();
  var link = function(v) {
    return function(v1) {
      if (v instanceof CatNil) {
        return v1;
      }
      ;
      if (v1 instanceof CatNil) {
        return v;
      }
      ;
      if (v instanceof CatCons) {
        return new CatCons(v.value0, snoc(v.value1)(v1));
      }
      ;
      throw new Error("Failed pattern match at Data.CatList (line 108, column 1 - line 108, column 54): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var foldr2 = function(k) {
    return function(b2) {
      return function(q) {
        var foldl2 = function($copy_v) {
          return function($copy_c) {
            return function($copy_v1) {
              var $tco_var_v = $copy_v;
              var $tco_var_c = $copy_c;
              var $tco_done = false;
              var $tco_result;
              function $tco_loop(v, c, v1) {
                if (v1 instanceof Nil) {
                  $tco_done = true;
                  return c;
                }
                ;
                if (v1 instanceof Cons) {
                  $tco_var_v = v;
                  $tco_var_c = v(c)(v1.value0);
                  $copy_v1 = v1.value1;
                  return;
                }
                ;
                throw new Error("Failed pattern match at Data.CatList (line 124, column 3 - line 124, column 59): " + [v.constructor.name, c.constructor.name, v1.constructor.name]);
              }
              ;
              while (!$tco_done) {
                $tco_result = $tco_loop($tco_var_v, $tco_var_c, $copy_v1);
              }
              ;
              return $tco_result;
            };
          };
        };
        var go2 = function($copy_xs) {
          return function($copy_ys) {
            var $tco_var_xs = $copy_xs;
            var $tco_done1 = false;
            var $tco_result;
            function $tco_loop(xs, ys) {
              var v = uncons(xs);
              if (v instanceof Nothing) {
                $tco_done1 = true;
                return foldl2(function(x) {
                  return function(i) {
                    return i(x);
                  };
                })(b2)(ys);
              }
              ;
              if (v instanceof Just) {
                $tco_var_xs = v.value0.value1;
                $copy_ys = new Cons(k(v.value0.value0), ys);
                return;
              }
              ;
              throw new Error("Failed pattern match at Data.CatList (line 120, column 14 - line 122, column 67): " + [v.constructor.name]);
            }
            ;
            while (!$tco_done1) {
              $tco_result = $tco_loop($tco_var_xs, $copy_ys);
            }
            ;
            return $tco_result;
          };
        };
        return go2(q)(Nil.value);
      };
    };
  };
  var uncons2 = function(v) {
    if (v instanceof CatNil) {
      return Nothing.value;
    }
    ;
    if (v instanceof CatCons) {
      return new Just(new Tuple(v.value0, function() {
        var $45 = $$null(v.value1);
        if ($45) {
          return CatNil.value;
        }
        ;
        return foldr2(link)(CatNil.value)(v.value1);
      }()));
    }
    ;
    throw new Error("Failed pattern match at Data.CatList (line 99, column 1 - line 99, column 61): " + [v.constructor.name]);
  };
  var empty3 = /* @__PURE__ */ function() {
    return CatNil.value;
  }();
  var append2 = link;
  var semigroupCatList = {
    append: append2
  };
  var snoc2 = function(cat) {
    return function(a) {
      return append2(cat)(new CatCons(a, empty2));
    };
  };

  // output/Control.Monad.Free/index.js
  var $runtime_lazy2 = function(name15, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name15 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
      return val;
    };
  };
  var Free = /* @__PURE__ */ function() {
    function Free2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Free2.create = function(value0) {
      return function(value1) {
        return new Free2(value0, value1);
      };
    };
    return Free2;
  }();
  var Return = /* @__PURE__ */ function() {
    function Return2(value0) {
      this.value0 = value0;
    }
    ;
    Return2.create = function(value0) {
      return new Return2(value0);
    };
    return Return2;
  }();
  var Bind = /* @__PURE__ */ function() {
    function Bind2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Bind2.create = function(value0) {
      return function(value1) {
        return new Bind2(value0, value1);
      };
    };
    return Bind2;
  }();
  var toView = function($copy_v) {
    var $tco_done = false;
    var $tco_result;
    function $tco_loop(v) {
      var runExpF = function(v22) {
        return v22;
      };
      var concatF = function(v22) {
        return function(r) {
          return new Free(v22.value0, append(semigroupCatList)(v22.value1)(r));
        };
      };
      if (v.value0 instanceof Return) {
        var v2 = uncons2(v.value1);
        if (v2 instanceof Nothing) {
          $tco_done = true;
          return new Return(v.value0.value0);
        }
        ;
        if (v2 instanceof Just) {
          $copy_v = concatF(runExpF(v2.value0.value0)(v.value0.value0))(v2.value0.value1);
          return;
        }
        ;
        throw new Error("Failed pattern match at Control.Monad.Free (line 227, column 7 - line 231, column 64): " + [v2.constructor.name]);
      }
      ;
      if (v.value0 instanceof Bind) {
        $tco_done = true;
        return new Bind(v.value0.value0, function(a) {
          return concatF(v.value0.value1(a))(v.value1);
        });
      }
      ;
      throw new Error("Failed pattern match at Control.Monad.Free (line 225, column 3 - line 233, column 56): " + [v.value0.constructor.name]);
    }
    ;
    while (!$tco_done) {
      $tco_result = $tco_loop($copy_v);
    }
    ;
    return $tco_result;
  };
  var resume$prime = function(k) {
    return function(j) {
      return function(f) {
        var v = toView(f);
        if (v instanceof Return) {
          return j(v.value0);
        }
        ;
        if (v instanceof Bind) {
          return k(v.value0)(v.value1);
        }
        ;
        throw new Error("Failed pattern match at Control.Monad.Free (line 213, column 17 - line 215, column 20): " + [v.constructor.name]);
      };
    };
  };
  var resume = function(dictFunctor) {
    return resume$prime(function(g) {
      return function(i) {
        return new Left(map(dictFunctor)(i)(g));
      };
    })(Right.create);
  };
  var fromView = function(f) {
    return new Free(f, empty3);
  };
  var wrap2 = function(f) {
    return fromView(new Bind(f, unsafeCoerce2));
  };
  var freeMonad = {
    Applicative0: function() {
      return freeApplicative;
    },
    Bind1: function() {
      return freeBind;
    }
  };
  var freeFunctor = {
    map: function(k) {
      return function(f) {
        return bindFlipped(freeBind)(function() {
          var $119 = pure(freeApplicative);
          return function($120) {
            return $119(k($120));
          };
        }())(f);
      };
    }
  };
  var freeBind = {
    bind: function(v) {
      return function(k) {
        return new Free(v.value0, snoc2(v.value1)(k));
      };
    },
    Apply0: function() {
      return $lazy_freeApply(0);
    }
  };
  var freeApplicative = {
    pure: function($121) {
      return fromView(Return.create($121));
    },
    Apply0: function() {
      return $lazy_freeApply(0);
    }
  };
  var $lazy_freeApply = /* @__PURE__ */ $runtime_lazy2("freeApply", "Control.Monad.Free", function() {
    return {
      apply: ap(freeMonad),
      Functor0: function() {
        return freeFunctor;
      }
    };
  });
  var liftF = function(f) {
    return fromView(new Bind(f, function() {
      var $122 = pure(freeApplicative);
      return function($123) {
        return $122($123);
      };
    }()));
  };

  // output/Control.MultiAlternative/index.js
  var orr = function(dict) {
    return dict.orr;
  };

  // output/Control.Parallel.Class/index.js
  var sequential = function(dict) {
    return dict.sequential;
  };
  var parallel = function(dict) {
    return dict.parallel;
  };

  // output/Data.Array/foreign.js
  var replicateFill = function(count) {
    return function(value12) {
      if (count < 1) {
        return [];
      }
      var result = new Array(count);
      return result.fill(value12);
    };
  };
  var replicatePolyfill = function(count) {
    return function(value12) {
      var result = [];
      var n = 0;
      for (var i = 0; i < count; i++) {
        result[n++] = value12;
      }
      return result;
    };
  };
  var replicate = typeof Array.prototype.fill === "function" ? replicateFill : replicatePolyfill;
  var fromFoldableImpl = function() {
    function Cons3(head4, tail3) {
      this.head = head4;
      this.tail = tail3;
    }
    var emptyList = {};
    function curryCons(head4) {
      return function(tail3) {
        return new Cons3(head4, tail3);
      };
    }
    function listToArray(list) {
      var result = [];
      var count = 0;
      var xs = list;
      while (xs !== emptyList) {
        result[count++] = xs.head;
        xs = xs.tail;
      }
      return result;
    }
    return function(foldr3) {
      return function(xs) {
        return listToArray(foldr3(curryCons)(emptyList)(xs));
      };
    };
  }();
  var length3 = function(xs) {
    return xs.length;
  };
  var unconsImpl = function(empty7) {
    return function(next) {
      return function(xs) {
        return xs.length === 0 ? empty7({}) : next(xs[0])(xs.slice(1));
      };
    };
  };
  var _updateAt = function(just) {
    return function(nothing) {
      return function(i) {
        return function(a) {
          return function(l) {
            if (i < 0 || i >= l.length)
              return nothing;
            var l1 = l.slice();
            l1[i] = a;
            return just(l1);
          };
        };
      };
    };
  };
  var sortByImpl = function() {
    function mergeFromTo(compare2, fromOrdering, xs1, xs2, from2, to) {
      var mid;
      var i;
      var j;
      var k;
      var x;
      var y;
      var c;
      mid = from2 + (to - from2 >> 1);
      if (mid - from2 > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, from2, mid);
      if (to - mid > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, mid, to);
      i = from2;
      j = mid;
      k = from2;
      while (i < mid && j < to) {
        x = xs2[i];
        y = xs2[j];
        c = fromOrdering(compare2(x)(y));
        if (c > 0) {
          xs1[k++] = y;
          ++j;
        } else {
          xs1[k++] = x;
          ++i;
        }
      }
      while (i < mid) {
        xs1[k++] = xs2[i++];
      }
      while (j < to) {
        xs1[k++] = xs2[j++];
      }
    }
    return function(compare2) {
      return function(fromOrdering) {
        return function(xs) {
          var out;
          if (xs.length < 2)
            return xs;
          out = xs.slice(0);
          mergeFromTo(compare2, fromOrdering, out, xs.slice(0), 0, xs.length);
          return out;
        };
      };
    };
  }();

  // output/Data.Array.ST/foreign.js
  var pushAll = function(as) {
    return function(xs) {
      return function() {
        return xs.push.apply(xs, as);
      };
    };
  };
  var unsafeFreeze = function(xs) {
    return function() {
      return xs;
    };
  };
  function copyImpl(xs) {
    return function() {
      return xs.slice();
    };
  }
  var thaw = copyImpl;
  var sortByImpl2 = function() {
    function mergeFromTo(compare2, fromOrdering, xs1, xs2, from2, to) {
      var mid;
      var i;
      var j;
      var k;
      var x;
      var y;
      var c;
      mid = from2 + (to - from2 >> 1);
      if (mid - from2 > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, from2, mid);
      if (to - mid > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, mid, to);
      i = from2;
      j = mid;
      k = from2;
      while (i < mid && j < to) {
        x = xs2[i];
        y = xs2[j];
        c = fromOrdering(compare2(x)(y));
        if (c > 0) {
          xs1[k++] = y;
          ++j;
        } else {
          xs1[k++] = x;
          ++i;
        }
      }
      while (i < mid) {
        xs1[k++] = xs2[i++];
      }
      while (j < to) {
        xs1[k++] = xs2[j++];
      }
    }
    return function(compare2) {
      return function(fromOrdering) {
        return function(xs) {
          return function() {
            if (xs.length < 2)
              return xs;
            mergeFromTo(compare2, fromOrdering, xs, xs.slice(0), 0, xs.length);
            return xs;
          };
        };
      };
    };
  }();

  // output/Data.Array.ST/index.js
  var withArray = function(f) {
    return function(xs) {
      return function __do() {
        var result = thaw(xs)();
        f(result)();
        return unsafeFreeze(result)();
      };
    };
  };
  var push = function(a) {
    return pushAll([a]);
  };

  // output/Data.Array/index.js
  var updateAt = /* @__PURE__ */ function() {
    return _updateAt(Just.create)(Nothing.value);
  }();
  var uncons3 = /* @__PURE__ */ function() {
    return unconsImpl($$const(Nothing.value))(function(x) {
      return function(xs) {
        return new Just({
          head: x,
          tail: xs
        });
      };
    });
  }();
  var snoc3 = function(xs) {
    return function(x) {
      return withArray(push(x))(xs)();
    };
  };
  var singleton3 = function(a) {
    return [a];
  };
  var cons2 = function(x) {
    return function(xs) {
      return append(semigroupArray)([x])(xs);
    };
  };

  // output/Data.Array.NonEmpty.Internal/foreign.js
  var foldr1Impl = function(f) {
    return function(xs) {
      var acc = xs[xs.length - 1];
      for (var i = xs.length - 2; i >= 0; i--) {
        acc = f(xs[i])(acc);
      }
      return acc;
    };
  };
  var foldl1Impl = function(f) {
    return function(xs) {
      var acc = xs[0];
      var len = xs.length;
      for (var i = 1; i < len; i++) {
        acc = f(acc)(xs[i]);
      }
      return acc;
    };
  };
  var traverse1Impl = function() {
    function Cont(fn) {
      this.fn = fn;
    }
    var emptyList = {};
    var ConsCell = function(head4, tail3) {
      this.head = head4;
      this.tail = tail3;
    };
    function finalCell(head4) {
      return new ConsCell(head4, emptyList);
    }
    function consList(x) {
      return function(xs) {
        return new ConsCell(x, xs);
      };
    }
    function listToArray(list) {
      var arr = [];
      var xs = list;
      while (xs !== emptyList) {
        arr.push(xs.head);
        xs = xs.tail;
      }
      return arr;
    }
    return function(apply2) {
      return function(map2) {
        return function(f) {
          var buildFrom = function(x, ys) {
            return apply2(map2(consList)(f(x)))(ys);
          };
          var go2 = function(acc, currentLen, xs) {
            if (currentLen === 0) {
              return acc;
            } else {
              var last3 = xs[currentLen - 1];
              return new Cont(function() {
                var built = go2(buildFrom(last3, acc), currentLen - 1, xs);
                return built;
              });
            }
          };
          return function(array) {
            var acc = map2(finalCell)(f(array[array.length - 1]));
            var result = go2(acc, array.length - 1, array);
            while (result instanceof Cont) {
              result = result.fn();
            }
            return map2(listToArray)(result);
          };
        };
      };
    };
  }();

  // output/Data.Array.NonEmpty.Internal/index.js
  var NonEmptyArray = function(x) {
    return x;
  };
  var functorNonEmptyArray = functorArray;
  var foldableWithIndexNonEmptyArray = foldableWithIndexArray;
  var foldableNonEmptyArray = foldableArray;
  var foldable1NonEmptyArray = {
    foldMap1: function(dictSemigroup) {
      return foldMap1DefaultL(foldable1NonEmptyArray)(functorNonEmptyArray)(dictSemigroup);
    },
    foldr1: foldr1Impl,
    foldl1: foldl1Impl,
    Foldable0: function() {
      return foldableNonEmptyArray;
    }
  };

  // output/Data.Array.NonEmpty/index.js
  var unsafeFromArrayF = unsafeCoerce2;
  var unsafeFromArray = NonEmptyArray;
  var toArray = function(v) {
    return v;
  };
  var updateAt2 = function(i) {
    return function(x) {
      var $51 = updateAt(i)(x);
      return function($52) {
        return unsafeFromArrayF($51(toArray($52)));
      };
    };
  };
  var snoc4 = function(xs) {
    return function(x) {
      return unsafeFromArray(snoc3(toArray(xs))(x));
    };
  };
  var singleton4 = function($55) {
    return unsafeFromArray(singleton3($55));
  };
  var fromArray = function(xs) {
    if (length3(xs) > 0) {
      return new Just(unsafeFromArray(xs));
    }
    ;
    if (otherwise) {
      return Nothing.value;
    }
    ;
    throw new Error("Failed pattern match at Data.Array.NonEmpty (line 157, column 1 - line 157, column 58): " + [xs.constructor.name]);
  };
  var cons$prime = function(x) {
    return function(xs) {
      return unsafeFromArray(cons2(x)(xs));
    };
  };
  var adaptMaybe = function(f) {
    var $70 = fromJust();
    return function($71) {
      return $70(f(toArray($71)));
    };
  };
  var uncons4 = /* @__PURE__ */ adaptMaybe(uncons3);

  // output/Effect.AVar/foreign.js
  var AVar = function() {
    function MutableQueue() {
      this.head = null;
      this.last = null;
      this.size = 0;
    }
    function MutableCell(queue, value12) {
      this.queue = queue;
      this.value = value12;
      this.next = null;
      this.prev = null;
    }
    function AVar2(value12) {
      this.draining = false;
      this.error = null;
      this.value = value12;
      this.takes = new MutableQueue();
      this.reads = new MutableQueue();
      this.puts = new MutableQueue();
    }
    var EMPTY = {};
    function runEff(eff) {
      try {
        eff();
      } catch (error3) {
        setTimeout(function() {
          throw error3;
        }, 0);
      }
    }
    function putLast(queue, value12) {
      var cell = new MutableCell(queue, value12);
      switch (queue.size) {
        case 0:
          queue.head = cell;
          break;
        case 1:
          cell.prev = queue.head;
          queue.head.next = cell;
          queue.last = cell;
          break;
        default:
          cell.prev = queue.last;
          queue.last.next = cell;
          queue.last = cell;
      }
      queue.size++;
      return cell;
    }
    function takeLast(queue) {
      var cell;
      switch (queue.size) {
        case 0:
          return null;
        case 1:
          cell = queue.head;
          queue.head = null;
          break;
        case 2:
          cell = queue.last;
          queue.head.next = null;
          queue.last = null;
          break;
        default:
          cell = queue.last;
          queue.last = cell.prev;
          queue.last.next = null;
      }
      cell.prev = null;
      cell.queue = null;
      queue.size--;
      return cell.value;
    }
    function takeHead(queue) {
      var cell;
      switch (queue.size) {
        case 0:
          return null;
        case 1:
          cell = queue.head;
          queue.head = null;
          break;
        case 2:
          cell = queue.head;
          queue.last.prev = null;
          queue.head = queue.last;
          queue.last = null;
          break;
        default:
          cell = queue.head;
          queue.head = cell.next;
          queue.head.prev = null;
      }
      cell.next = null;
      cell.queue = null;
      queue.size--;
      return cell.value;
    }
    function deleteCell2(cell) {
      if (cell.queue === null) {
        return;
      }
      if (cell.queue.last === cell) {
        takeLast(cell.queue);
        return;
      }
      if (cell.queue.head === cell) {
        takeHead(cell.queue);
        return;
      }
      if (cell.prev) {
        cell.prev.next = cell.next;
      }
      if (cell.next) {
        cell.next.prev = cell.prev;
      }
      cell.queue.size--;
      cell.queue = null;
      cell.value = null;
      cell.next = null;
      cell.prev = null;
    }
    function drainVar(util, avar) {
      if (avar.draining) {
        return;
      }
      var ps = avar.puts;
      var ts = avar.takes;
      var rs = avar.reads;
      var p, r, t2, value12, rsize;
      avar.draining = true;
      while (1) {
        p = null;
        r = null;
        t2 = null;
        value12 = avar.value;
        rsize = rs.size;
        if (avar.error !== null) {
          value12 = util.left(avar.error);
          while (p = takeHead(ps)) {
            runEff(p.cb(value12));
          }
          while (r = takeHead(rs)) {
            runEff(r(value12));
          }
          while (t2 = takeHead(ts)) {
            runEff(t2(value12));
          }
          break;
        }
        if (value12 === EMPTY && (p = takeHead(ps))) {
          avar.value = value12 = p.value;
        }
        if (value12 !== EMPTY) {
          t2 = takeHead(ts);
          while (rsize-- && (r = takeHead(rs))) {
            runEff(r(util.right(value12)));
          }
          if (t2 !== null) {
            avar.value = EMPTY;
            runEff(t2(util.right(value12)));
          }
        }
        if (p !== null) {
          runEff(p.cb(util.right(void 0)));
        }
        if (avar.value === EMPTY && ps.size === 0 || avar.value !== EMPTY && ts.size === 0) {
          break;
        }
      }
      avar.draining = false;
    }
    AVar2.EMPTY = EMPTY;
    AVar2.putLast = putLast;
    AVar2.takeLast = takeLast;
    AVar2.takeHead = takeHead;
    AVar2.deleteCell = deleteCell2;
    AVar2.drainVar = drainVar;
    return AVar2;
  }();
  function empty4() {
    return new AVar(AVar.EMPTY);
  }
  function _takeVar(util, avar, cb) {
    return function() {
      var cell = AVar.putLast(avar.takes, cb);
      AVar.drainVar(util, avar);
      return function() {
        AVar.deleteCell(cell);
      };
    };
  }
  function _tryPutVar(util, value12, avar) {
    return function() {
      if (avar.value === AVar.EMPTY && avar.error === null) {
        avar.value = value12;
        AVar.drainVar(util, avar);
        return true;
      } else {
        return false;
      }
    };
  }
  function _tryTakeVar(util, avar) {
    return function() {
      var value12 = avar.value;
      if (value12 === AVar.EMPTY) {
        return util.nothing;
      } else {
        avar.value = AVar.EMPTY;
        AVar.drainVar(util, avar);
        return util.just(value12);
      }
    };
  }

  // output/Effect.AVar/index.js
  var Killed = /* @__PURE__ */ function() {
    function Killed2(value0) {
      this.value0 = value0;
    }
    ;
    Killed2.create = function(value0) {
      return new Killed2(value0);
    };
    return Killed2;
  }();
  var Filled = /* @__PURE__ */ function() {
    function Filled2(value0) {
      this.value0 = value0;
    }
    ;
    Filled2.create = function(value0) {
      return new Filled2(value0);
    };
    return Filled2;
  }();
  var Empty = /* @__PURE__ */ function() {
    function Empty3() {
    }
    ;
    Empty3.value = new Empty3();
    return Empty3;
  }();
  var ffiUtil = /* @__PURE__ */ function() {
    return {
      left: Left.create,
      right: Right.create,
      nothing: Nothing.value,
      just: Just.create,
      killed: Killed.create,
      filled: Filled.create,
      empty: Empty.value
    };
  }();
  var take2 = function(avar) {
    return function(cb) {
      return _takeVar(ffiUtil, avar, cb);
    };
  };
  var tryPut = function(value12) {
    return function(avar) {
      return _tryPutVar(ffiUtil, value12, avar);
    };
  };
  var tryTake = function(avar) {
    return _tryTakeVar(ffiUtil, avar);
  };

  // output/Effect.Aff/foreign.js
  var Aff = function() {
    var EMPTY = {};
    var PURE = "Pure";
    var THROW = "Throw";
    var CATCH = "Catch";
    var SYNC = "Sync";
    var ASYNC = "Async";
    var BIND = "Bind";
    var BRACKET = "Bracket";
    var FORK = "Fork";
    var SEQ = "Sequential";
    var MAP = "Map";
    var APPLY = "Apply";
    var ALT = "Alt";
    var CONS = "Cons";
    var RESUME = "Resume";
    var RELEASE = "Release";
    var FINALIZER = "Finalizer";
    var FINALIZED = "Finalized";
    var FORKED = "Forked";
    var FIBER = "Fiber";
    var THUNK = "Thunk";
    function Aff2(tag, _1, _2, _3) {
      this.tag = tag;
      this._1 = _1;
      this._2 = _2;
      this._3 = _3;
    }
    function AffCtr(tag) {
      var fn = function(_1, _2, _3) {
        return new Aff2(tag, _1, _2, _3);
      };
      fn.tag = tag;
      return fn;
    }
    function nonCanceler2(error3) {
      return new Aff2(PURE, void 0);
    }
    function runEff(eff) {
      try {
        eff();
      } catch (error3) {
        setTimeout(function() {
          throw error3;
        }, 0);
      }
    }
    function runSync(left, right, eff) {
      try {
        return right(eff());
      } catch (error3) {
        return left(error3);
      }
    }
    function runAsync(left, eff, k) {
      try {
        return eff(k)();
      } catch (error3) {
        k(left(error3))();
        return nonCanceler2;
      }
    }
    var Scheduler = function() {
      var limit = 1024;
      var size5 = 0;
      var ix = 0;
      var queue = new Array(limit);
      var draining = false;
      function drain() {
        var thunk;
        draining = true;
        while (size5 !== 0) {
          size5--;
          thunk = queue[ix];
          queue[ix] = void 0;
          ix = (ix + 1) % limit;
          thunk();
        }
        draining = false;
      }
      return {
        isDraining: function() {
          return draining;
        },
        enqueue: function(cb) {
          var i, tmp;
          if (size5 === limit) {
            tmp = draining;
            drain();
            draining = tmp;
          }
          queue[(ix + size5) % limit] = cb;
          size5++;
          if (!draining) {
            drain();
          }
        }
      };
    }();
    function Supervisor(util) {
      var fibers = {};
      var fiberId = 0;
      var count = 0;
      return {
        register: function(fiber) {
          var fid = fiberId++;
          fiber.onComplete({
            rethrow: true,
            handler: function(result) {
              return function() {
                count--;
                delete fibers[fid];
              };
            }
          })();
          fibers[fid] = fiber;
          count++;
        },
        isEmpty: function() {
          return count === 0;
        },
        killAll: function(killError, cb) {
          return function() {
            if (count === 0) {
              return cb();
            }
            var killCount = 0;
            var kills = {};
            function kill2(fid) {
              kills[fid] = fibers[fid].kill(killError, function(result) {
                return function() {
                  delete kills[fid];
                  killCount--;
                  if (util.isLeft(result) && util.fromLeft(result)) {
                    setTimeout(function() {
                      throw util.fromLeft(result);
                    }, 0);
                  }
                  if (killCount === 0) {
                    cb();
                  }
                };
              })();
            }
            for (var k in fibers) {
              if (fibers.hasOwnProperty(k)) {
                killCount++;
                kill2(k);
              }
            }
            fibers = {};
            fiberId = 0;
            count = 0;
            return function(error3) {
              return new Aff2(SYNC, function() {
                for (var k2 in kills) {
                  if (kills.hasOwnProperty(k2)) {
                    kills[k2]();
                  }
                }
              });
            };
          };
        }
      };
    }
    var SUSPENDED = 0;
    var CONTINUE = 1;
    var STEP_BIND = 2;
    var STEP_RESULT = 3;
    var PENDING = 4;
    var RETURN = 5;
    var COMPLETED = 6;
    function Fiber(util, supervisor, aff) {
      var runTick = 0;
      var status2 = SUSPENDED;
      var step5 = aff;
      var fail = null;
      var interrupt = null;
      var bhead = null;
      var btail = null;
      var attempts = null;
      var bracketCount = 0;
      var joinId = 0;
      var joins = null;
      var rethrow = true;
      function run3(localRunTick) {
        var tmp, result, attempt;
        while (true) {
          tmp = null;
          result = null;
          attempt = null;
          switch (status2) {
            case STEP_BIND:
              status2 = CONTINUE;
              try {
                step5 = bhead(step5);
                if (btail === null) {
                  bhead = null;
                } else {
                  bhead = btail._1;
                  btail = btail._2;
                }
              } catch (e) {
                status2 = RETURN;
                fail = util.left(e);
                step5 = null;
              }
              break;
            case STEP_RESULT:
              if (util.isLeft(step5)) {
                status2 = RETURN;
                fail = step5;
                step5 = null;
              } else if (bhead === null) {
                status2 = RETURN;
              } else {
                status2 = STEP_BIND;
                step5 = util.fromRight(step5);
              }
              break;
            case CONTINUE:
              switch (step5.tag) {
                case BIND:
                  if (bhead) {
                    btail = new Aff2(CONS, bhead, btail);
                  }
                  bhead = step5._2;
                  status2 = CONTINUE;
                  step5 = step5._1;
                  break;
                case PURE:
                  if (bhead === null) {
                    status2 = RETURN;
                    step5 = util.right(step5._1);
                  } else {
                    status2 = STEP_BIND;
                    step5 = step5._1;
                  }
                  break;
                case SYNC:
                  status2 = STEP_RESULT;
                  step5 = runSync(util.left, util.right, step5._1);
                  break;
                case ASYNC:
                  status2 = PENDING;
                  step5 = runAsync(util.left, step5._1, function(result2) {
                    return function() {
                      if (runTick !== localRunTick) {
                        return;
                      }
                      runTick++;
                      Scheduler.enqueue(function() {
                        if (runTick !== localRunTick + 1) {
                          return;
                        }
                        status2 = STEP_RESULT;
                        step5 = result2;
                        run3(runTick);
                      });
                    };
                  });
                  return;
                case THROW:
                  status2 = RETURN;
                  fail = util.left(step5._1);
                  step5 = null;
                  break;
                case CATCH:
                  if (bhead === null) {
                    attempts = new Aff2(CONS, step5, attempts, interrupt);
                  } else {
                    attempts = new Aff2(CONS, step5, new Aff2(CONS, new Aff2(RESUME, bhead, btail), attempts, interrupt), interrupt);
                  }
                  bhead = null;
                  btail = null;
                  status2 = CONTINUE;
                  step5 = step5._1;
                  break;
                case BRACKET:
                  bracketCount++;
                  if (bhead === null) {
                    attempts = new Aff2(CONS, step5, attempts, interrupt);
                  } else {
                    attempts = new Aff2(CONS, step5, new Aff2(CONS, new Aff2(RESUME, bhead, btail), attempts, interrupt), interrupt);
                  }
                  bhead = null;
                  btail = null;
                  status2 = CONTINUE;
                  step5 = step5._1;
                  break;
                case FORK:
                  status2 = STEP_RESULT;
                  tmp = Fiber(util, supervisor, step5._2);
                  if (supervisor) {
                    supervisor.register(tmp);
                  }
                  if (step5._1) {
                    tmp.run();
                  }
                  step5 = util.right(tmp);
                  break;
                case SEQ:
                  status2 = CONTINUE;
                  step5 = sequential2(util, supervisor, step5._1);
                  break;
              }
              break;
            case RETURN:
              bhead = null;
              btail = null;
              if (attempts === null) {
                status2 = COMPLETED;
                step5 = interrupt || fail || step5;
              } else {
                tmp = attempts._3;
                attempt = attempts._1;
                attempts = attempts._2;
                switch (attempt.tag) {
                  case CATCH:
                    if (interrupt && interrupt !== tmp && bracketCount === 0) {
                      status2 = RETURN;
                    } else if (fail) {
                      status2 = CONTINUE;
                      step5 = attempt._2(util.fromLeft(fail));
                      fail = null;
                    }
                    break;
                  case RESUME:
                    if (interrupt && interrupt !== tmp && bracketCount === 0 || fail) {
                      status2 = RETURN;
                    } else {
                      bhead = attempt._1;
                      btail = attempt._2;
                      status2 = STEP_BIND;
                      step5 = util.fromRight(step5);
                    }
                    break;
                  case BRACKET:
                    bracketCount--;
                    if (fail === null) {
                      result = util.fromRight(step5);
                      attempts = new Aff2(CONS, new Aff2(RELEASE, attempt._2, result), attempts, tmp);
                      if (interrupt === tmp || bracketCount > 0) {
                        status2 = CONTINUE;
                        step5 = attempt._3(result);
                      }
                    }
                    break;
                  case RELEASE:
                    attempts = new Aff2(CONS, new Aff2(FINALIZED, step5, fail), attempts, interrupt);
                    status2 = CONTINUE;
                    if (interrupt && interrupt !== tmp && bracketCount === 0) {
                      step5 = attempt._1.killed(util.fromLeft(interrupt))(attempt._2);
                    } else if (fail) {
                      step5 = attempt._1.failed(util.fromLeft(fail))(attempt._2);
                    } else {
                      step5 = attempt._1.completed(util.fromRight(step5))(attempt._2);
                    }
                    fail = null;
                    bracketCount++;
                    break;
                  case FINALIZER:
                    bracketCount++;
                    attempts = new Aff2(CONS, new Aff2(FINALIZED, step5, fail), attempts, interrupt);
                    status2 = CONTINUE;
                    step5 = attempt._1;
                    break;
                  case FINALIZED:
                    bracketCount--;
                    status2 = RETURN;
                    step5 = attempt._1;
                    fail = attempt._2;
                    break;
                }
              }
              break;
            case COMPLETED:
              for (var k in joins) {
                if (joins.hasOwnProperty(k)) {
                  rethrow = rethrow && joins[k].rethrow;
                  runEff(joins[k].handler(step5));
                }
              }
              joins = null;
              if (interrupt && fail) {
                setTimeout(function() {
                  throw util.fromLeft(fail);
                }, 0);
              } else if (util.isLeft(step5) && rethrow) {
                setTimeout(function() {
                  if (rethrow) {
                    throw util.fromLeft(step5);
                  }
                }, 0);
              }
              return;
            case SUSPENDED:
              status2 = CONTINUE;
              break;
            case PENDING:
              return;
          }
        }
      }
      function onComplete(join3) {
        return function() {
          if (status2 === COMPLETED) {
            rethrow = rethrow && join3.rethrow;
            join3.handler(step5)();
            return function() {
            };
          }
          var jid = joinId++;
          joins = joins || {};
          joins[jid] = join3;
          return function() {
            if (joins !== null) {
              delete joins[jid];
            }
          };
        };
      }
      function kill2(error3, cb) {
        return function() {
          if (status2 === COMPLETED) {
            cb(util.right(void 0))();
            return function() {
            };
          }
          var canceler = onComplete({
            rethrow: false,
            handler: function() {
              return cb(util.right(void 0));
            }
          })();
          switch (status2) {
            case SUSPENDED:
              interrupt = util.left(error3);
              status2 = COMPLETED;
              step5 = interrupt;
              run3(runTick);
              break;
            case PENDING:
              if (interrupt === null) {
                interrupt = util.left(error3);
              }
              if (bracketCount === 0) {
                if (status2 === PENDING) {
                  attempts = new Aff2(CONS, new Aff2(FINALIZER, step5(error3)), attempts, interrupt);
                }
                status2 = RETURN;
                step5 = null;
                fail = null;
                run3(++runTick);
              }
              break;
            default:
              if (interrupt === null) {
                interrupt = util.left(error3);
              }
              if (bracketCount === 0) {
                status2 = RETURN;
                step5 = null;
                fail = null;
              }
          }
          return canceler;
        };
      }
      function join2(cb) {
        return function() {
          var canceler = onComplete({
            rethrow: false,
            handler: cb
          })();
          if (status2 === SUSPENDED) {
            run3(runTick);
          }
          return canceler;
        };
      }
      return {
        kill: kill2,
        join: join2,
        onComplete,
        isSuspended: function() {
          return status2 === SUSPENDED;
        },
        run: function() {
          if (status2 === SUSPENDED) {
            if (!Scheduler.isDraining()) {
              Scheduler.enqueue(function() {
                run3(runTick);
              });
            } else {
              run3(runTick);
            }
          }
        }
      };
    }
    function runPar(util, supervisor, par, cb) {
      var fiberId = 0;
      var fibers = {};
      var killId = 0;
      var kills = {};
      var early = new Error("[ParAff] Early exit");
      var interrupt = null;
      var root = EMPTY;
      function kill2(error3, par2, cb2) {
        var step5 = par2;
        var head4 = null;
        var tail3 = null;
        var count = 0;
        var kills2 = {};
        var tmp, kid;
        loop:
          while (true) {
            tmp = null;
            switch (step5.tag) {
              case FORKED:
                if (step5._3 === EMPTY) {
                  tmp = fibers[step5._1];
                  kills2[count++] = tmp.kill(error3, function(result) {
                    return function() {
                      count--;
                      if (count === 0) {
                        cb2(result)();
                      }
                    };
                  });
                }
                if (head4 === null) {
                  break loop;
                }
                step5 = head4._2;
                if (tail3 === null) {
                  head4 = null;
                } else {
                  head4 = tail3._1;
                  tail3 = tail3._2;
                }
                break;
              case MAP:
                step5 = step5._2;
                break;
              case APPLY:
              case ALT:
                if (head4) {
                  tail3 = new Aff2(CONS, head4, tail3);
                }
                head4 = step5;
                step5 = step5._1;
                break;
            }
          }
        if (count === 0) {
          cb2(util.right(void 0))();
        } else {
          kid = 0;
          tmp = count;
          for (; kid < tmp; kid++) {
            kills2[kid] = kills2[kid]();
          }
        }
        return kills2;
      }
      function join2(result, head4, tail3) {
        var fail, step5, lhs, rhs, tmp, kid;
        if (util.isLeft(result)) {
          fail = result;
          step5 = null;
        } else {
          step5 = result;
          fail = null;
        }
        loop:
          while (true) {
            lhs = null;
            rhs = null;
            tmp = null;
            kid = null;
            if (interrupt !== null) {
              return;
            }
            if (head4 === null) {
              cb(fail || step5)();
              return;
            }
            if (head4._3 !== EMPTY) {
              return;
            }
            switch (head4.tag) {
              case MAP:
                if (fail === null) {
                  head4._3 = util.right(head4._1(util.fromRight(step5)));
                  step5 = head4._3;
                } else {
                  head4._3 = fail;
                }
                break;
              case APPLY:
                lhs = head4._1._3;
                rhs = head4._2._3;
                if (fail) {
                  head4._3 = fail;
                  tmp = true;
                  kid = killId++;
                  kills[kid] = kill2(early, fail === lhs ? head4._2 : head4._1, function() {
                    return function() {
                      delete kills[kid];
                      if (tmp) {
                        tmp = false;
                      } else if (tail3 === null) {
                        join2(fail, null, null);
                      } else {
                        join2(fail, tail3._1, tail3._2);
                      }
                    };
                  });
                  if (tmp) {
                    tmp = false;
                    return;
                  }
                } else if (lhs === EMPTY || rhs === EMPTY) {
                  return;
                } else {
                  step5 = util.right(util.fromRight(lhs)(util.fromRight(rhs)));
                  head4._3 = step5;
                }
                break;
              case ALT:
                lhs = head4._1._3;
                rhs = head4._2._3;
                if (lhs === EMPTY && util.isLeft(rhs) || rhs === EMPTY && util.isLeft(lhs)) {
                  return;
                }
                if (lhs !== EMPTY && util.isLeft(lhs) && rhs !== EMPTY && util.isLeft(rhs)) {
                  fail = step5 === lhs ? rhs : lhs;
                  step5 = null;
                  head4._3 = fail;
                } else {
                  head4._3 = step5;
                  tmp = true;
                  kid = killId++;
                  kills[kid] = kill2(early, step5 === lhs ? head4._2 : head4._1, function() {
                    return function() {
                      delete kills[kid];
                      if (tmp) {
                        tmp = false;
                      } else if (tail3 === null) {
                        join2(step5, null, null);
                      } else {
                        join2(step5, tail3._1, tail3._2);
                      }
                    };
                  });
                  if (tmp) {
                    tmp = false;
                    return;
                  }
                }
                break;
            }
            if (tail3 === null) {
              head4 = null;
            } else {
              head4 = tail3._1;
              tail3 = tail3._2;
            }
          }
      }
      function resolve(fiber) {
        return function(result) {
          return function() {
            delete fibers[fiber._1];
            fiber._3 = result;
            join2(result, fiber._2._1, fiber._2._2);
          };
        };
      }
      function run3() {
        var status2 = CONTINUE;
        var step5 = par;
        var head4 = null;
        var tail3 = null;
        var tmp, fid;
        loop:
          while (true) {
            tmp = null;
            fid = null;
            switch (status2) {
              case CONTINUE:
                switch (step5.tag) {
                  case MAP:
                    if (head4) {
                      tail3 = new Aff2(CONS, head4, tail3);
                    }
                    head4 = new Aff2(MAP, step5._1, EMPTY, EMPTY);
                    step5 = step5._2;
                    break;
                  case APPLY:
                    if (head4) {
                      tail3 = new Aff2(CONS, head4, tail3);
                    }
                    head4 = new Aff2(APPLY, EMPTY, step5._2, EMPTY);
                    step5 = step5._1;
                    break;
                  case ALT:
                    if (head4) {
                      tail3 = new Aff2(CONS, head4, tail3);
                    }
                    head4 = new Aff2(ALT, EMPTY, step5._2, EMPTY);
                    step5 = step5._1;
                    break;
                  default:
                    fid = fiberId++;
                    status2 = RETURN;
                    tmp = step5;
                    step5 = new Aff2(FORKED, fid, new Aff2(CONS, head4, tail3), EMPTY);
                    tmp = Fiber(util, supervisor, tmp);
                    tmp.onComplete({
                      rethrow: false,
                      handler: resolve(step5)
                    })();
                    fibers[fid] = tmp;
                    if (supervisor) {
                      supervisor.register(tmp);
                    }
                }
                break;
              case RETURN:
                if (head4 === null) {
                  break loop;
                }
                if (head4._1 === EMPTY) {
                  head4._1 = step5;
                  status2 = CONTINUE;
                  step5 = head4._2;
                  head4._2 = EMPTY;
                } else {
                  head4._2 = step5;
                  step5 = head4;
                  if (tail3 === null) {
                    head4 = null;
                  } else {
                    head4 = tail3._1;
                    tail3 = tail3._2;
                  }
                }
            }
          }
        root = step5;
        for (fid = 0; fid < fiberId; fid++) {
          fibers[fid].run();
        }
      }
      function cancel(error3, cb2) {
        interrupt = util.left(error3);
        var innerKills;
        for (var kid in kills) {
          if (kills.hasOwnProperty(kid)) {
            innerKills = kills[kid];
            for (kid in innerKills) {
              if (innerKills.hasOwnProperty(kid)) {
                innerKills[kid]();
              }
            }
          }
        }
        kills = null;
        var newKills = kill2(error3, root, cb2);
        return function(killError) {
          return new Aff2(ASYNC, function(killCb) {
            return function() {
              for (var kid2 in newKills) {
                if (newKills.hasOwnProperty(kid2)) {
                  newKills[kid2]();
                }
              }
              return nonCanceler2;
            };
          });
        };
      }
      run3();
      return function(killError) {
        return new Aff2(ASYNC, function(killCb) {
          return function() {
            return cancel(killError, killCb);
          };
        });
      };
    }
    function sequential2(util, supervisor, par) {
      return new Aff2(ASYNC, function(cb) {
        return function() {
          return runPar(util, supervisor, par, cb);
        };
      });
    }
    Aff2.EMPTY = EMPTY;
    Aff2.Pure = AffCtr(PURE);
    Aff2.Throw = AffCtr(THROW);
    Aff2.Catch = AffCtr(CATCH);
    Aff2.Sync = AffCtr(SYNC);
    Aff2.Async = AffCtr(ASYNC);
    Aff2.Bind = AffCtr(BIND);
    Aff2.Bracket = AffCtr(BRACKET);
    Aff2.Fork = AffCtr(FORK);
    Aff2.Seq = AffCtr(SEQ);
    Aff2.ParMap = AffCtr(MAP);
    Aff2.ParApply = AffCtr(APPLY);
    Aff2.ParAlt = AffCtr(ALT);
    Aff2.Fiber = Fiber;
    Aff2.Supervisor = Supervisor;
    Aff2.Scheduler = Scheduler;
    Aff2.nonCanceler = nonCanceler2;
    return Aff2;
  }();
  var _pure = Aff.Pure;
  var _throwError = Aff.Throw;
  function _catchError(aff) {
    return function(k) {
      return Aff.Catch(aff, k);
    };
  }
  function _map(f) {
    return function(aff) {
      if (aff.tag === Aff.Pure.tag) {
        return Aff.Pure(f(aff._1));
      } else {
        return Aff.Bind(aff, function(value12) {
          return Aff.Pure(f(value12));
        });
      }
    };
  }
  function _bind(aff) {
    return function(k) {
      return Aff.Bind(aff, k);
    };
  }
  var _liftEffect = Aff.Sync;
  function _parAffMap(f) {
    return function(aff) {
      return Aff.ParMap(f, aff);
    };
  }
  function _parAffApply(aff1) {
    return function(aff2) {
      return Aff.ParApply(aff1, aff2);
    };
  }
  function _parAffAlt(aff1) {
    return function(aff2) {
      return Aff.ParAlt(aff1, aff2);
    };
  }
  var makeAff = Aff.Async;
  function _makeFiber(util, aff) {
    return function() {
      return Aff.Fiber(util, null, aff);
    };
  }
  var _delay = function() {
    function setDelay(n, k) {
      if (n === 0 && typeof setImmediate !== "undefined") {
        return setImmediate(k);
      } else {
        return setTimeout(k, n);
      }
    }
    function clearDelay(n, t2) {
      if (n === 0 && typeof clearImmediate !== "undefined") {
        return clearImmediate(t2);
      } else {
        return clearTimeout(t2);
      }
    }
    return function(right, ms) {
      return Aff.Async(function(cb) {
        return function() {
          var timer = setDelay(ms, cb(right()));
          return function() {
            return Aff.Sync(function() {
              return right(clearDelay(ms, timer));
            });
          };
        };
      });
    };
  }();
  var _sequential = Aff.Seq;

  // output/Control.Parallel/index.js
  var parTraverse_ = function(dictParallel) {
    return function(dictFoldable) {
      return function(f) {
        var $17 = sequential(dictParallel);
        var $18 = traverse_(dictParallel.Applicative1())(dictFoldable)(function() {
          var $20 = parallel(dictParallel);
          return function($21) {
            return $20(f($21));
          };
        }());
        return function($19) {
          return $17($18($19));
        };
      };
    };
  };
  var parSequence_ = function(dictParallel) {
    return function(dictFoldable) {
      return parTraverse_(dictParallel)(dictFoldable)(identity(categoryFn));
    };
  };

  // output/Effect.Unsafe/foreign.js
  var unsafePerformEffect = function(f) {
    return f();
  };

  // output/Partial.Unsafe/foreign.js
  var _unsafePartial = function(f) {
    return f();
  };

  // output/Partial/foreign.js
  var _crashWith = function(msg) {
    throw new Error(msg);
  };

  // output/Partial/index.js
  var crashWith = function() {
    return _crashWith;
  };

  // output/Partial.Unsafe/index.js
  var unsafePartial = _unsafePartial;
  var unsafeCrashWith = function(msg) {
    return unsafePartial(function() {
      return crashWith()(msg);
    });
  };

  // output/Effect.Aff/index.js
  var $runtime_lazy3 = function(name15, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name15 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
      return val;
    };
  };
  var Canceler = function(x) {
    return x;
  };
  var functorParAff = {
    map: _parAffMap
  };
  var functorAff = {
    map: _map
  };
  var ffiUtil2 = /* @__PURE__ */ function() {
    var unsafeFromRight = function(v) {
      if (v instanceof Right) {
        return v.value0;
      }
      ;
      if (v instanceof Left) {
        return unsafeCrashWith("unsafeFromRight: Left");
      }
      ;
      throw new Error("Failed pattern match at Effect.Aff (line 407, column 21 - line 409, column 54): " + [v.constructor.name]);
    };
    var unsafeFromLeft = function(v) {
      if (v instanceof Left) {
        return v.value0;
      }
      ;
      if (v instanceof Right) {
        return unsafeCrashWith("unsafeFromLeft: Right");
      }
      ;
      throw new Error("Failed pattern match at Effect.Aff (line 402, column 20 - line 404, column 55): " + [v.constructor.name]);
    };
    var isLeft = function(v) {
      if (v instanceof Left) {
        return true;
      }
      ;
      if (v instanceof Right) {
        return false;
      }
      ;
      throw new Error("Failed pattern match at Effect.Aff (line 397, column 12 - line 399, column 21): " + [v.constructor.name]);
    };
    return {
      isLeft,
      fromLeft: unsafeFromLeft,
      fromRight: unsafeFromRight,
      left: Left.create,
      right: Right.create
    };
  }();
  var makeFiber = function(aff) {
    return _makeFiber(ffiUtil2, aff);
  };
  var launchAff = function(aff) {
    return function __do() {
      var fiber = makeFiber(aff)();
      fiber.run();
      return fiber;
    };
  };
  var delay = function(v) {
    return _delay(Right.create, v);
  };
  var applyParAff = {
    apply: _parAffApply,
    Functor0: function() {
      return functorParAff;
    }
  };
  var monadAff = {
    Applicative0: function() {
      return applicativeAff;
    },
    Bind1: function() {
      return bindAff;
    }
  };
  var bindAff = {
    bind: _bind,
    Apply0: function() {
      return $lazy_applyAff(0);
    }
  };
  var applicativeAff = {
    pure: _pure,
    Apply0: function() {
      return $lazy_applyAff(0);
    }
  };
  var $lazy_applyAff = /* @__PURE__ */ $runtime_lazy3("applyAff", "Effect.Aff", function() {
    return {
      apply: ap(monadAff),
      Functor0: function() {
        return functorAff;
      }
    };
  });
  var monadEffectAff = {
    liftEffect: _liftEffect,
    Monad0: function() {
      return monadAff;
    }
  };
  var effectCanceler = /* @__PURE__ */ function() {
    var $41 = liftEffect(monadEffectAff);
    return function($42) {
      return Canceler($$const($41($42)));
    };
  }();
  var monadThrowAff = {
    throwError: _throwError,
    Monad0: function() {
      return monadAff;
    }
  };
  var monadErrorAff = {
    catchError: _catchError,
    MonadThrow0: function() {
      return monadThrowAff;
    }
  };
  var runAff = function(k) {
    return function(aff) {
      return launchAff(bindFlipped(bindAff)(function() {
        var $45 = liftEffect(monadEffectAff);
        return function($46) {
          return $45(k($46));
        };
      }())($$try(monadErrorAff)(aff)));
    };
  };
  var runAff_ = function(k) {
    return function(aff) {
      return $$void(functorEffect)(runAff(k)(aff));
    };
  };
  var parallelAff = {
    parallel: unsafeCoerce2,
    sequential: _sequential,
    Monad0: function() {
      return monadAff;
    },
    Applicative1: function() {
      return $lazy_applicativeParAff(0);
    }
  };
  var $lazy_applicativeParAff = /* @__PURE__ */ $runtime_lazy3("applicativeParAff", "Effect.Aff", function() {
    return {
      pure: function() {
        var $49 = parallel(parallelAff);
        var $50 = pure(applicativeAff);
        return function($51) {
          return $49($50($51));
        };
      }(),
      Apply0: function() {
        return applyParAff;
      }
    };
  });
  var semigroupCanceler = {
    append: function(v) {
      return function(v1) {
        return function(err) {
          return parSequence_(parallelAff)(foldableArray)([v(err), v1(err)]);
        };
      };
    }
  };
  var nonCanceler = /* @__PURE__ */ $$const(/* @__PURE__ */ pure(applicativeAff)(unit));
  var monoidCanceler = {
    mempty: nonCanceler,
    Semigroup0: function() {
      return semigroupCanceler;
    }
  };
  var never = /* @__PURE__ */ makeAff(function(v) {
    return pure(applicativeEffect)(mempty(monoidCanceler));
  });
  var altParAff = {
    alt: _parAffAlt,
    Functor0: function() {
      return functorParAff;
    }
  };
  var altAff = {
    alt: function(a1) {
      return function(a2) {
        return catchError(monadErrorAff)(a1)($$const(a2));
      };
    },
    Functor0: function() {
      return functorAff;
    }
  };
  var plusAff = {
    empty: /* @__PURE__ */ throwError(monadThrowAff)(/* @__PURE__ */ error("Always fails")),
    Alt0: function() {
      return altAff;
    }
  };
  var plusParAff = {
    empty: /* @__PURE__ */ parallel(parallelAff)(/* @__PURE__ */ empty(plusAff)),
    Alt0: function() {
      return altParAff;
    }
  };

  // output/Effect.Aff.AVar/index.js
  var take3 = function(avar) {
    return makeAff(function(k) {
      return function __do() {
        var c = take2(avar)(k)();
        return effectCanceler(c);
      };
    });
  };

  // output/Effect.Console/foreign.js
  var log = function(s) {
    return function() {
      console.log(s);
    };
  };

  // output/Concur.Core.Types/index.js
  var WidgetStepEff = /* @__PURE__ */ function() {
    function WidgetStepEff2(value0) {
      this.value0 = value0;
    }
    ;
    WidgetStepEff2.create = function(value0) {
      return new WidgetStepEff2(value0);
    };
    return WidgetStepEff2;
  }();
  var WidgetStepView = /* @__PURE__ */ function() {
    function WidgetStepView2(value0) {
      this.value0 = value0;
    }
    ;
    WidgetStepView2.create = function(value0) {
      return new WidgetStepView2(value0);
    };
    return WidgetStepView2;
  }();
  var Widget = function(x) {
    return x;
  };
  var widgetShiftMap = {
    shiftMap: function(f) {
      return f(identity(categoryFn));
    }
  };
  var widgetFunctor = freeFunctor;
  var widgetBind = freeBind;
  var widgetApplicative = freeApplicative;
  var widgetMonad = {
    Applicative0: function() {
      return widgetApplicative;
    },
    Bind1: function() {
      return widgetBind;
    }
  };
  var unWidget = function(v) {
    return v;
  };
  var functorWidgetStep = {
    map: function(f) {
      return function(v) {
        if (v instanceof WidgetStepEff) {
          return new WidgetStepEff(map(functorEffect)(f)(v.value0));
        }
        ;
        if (v instanceof WidgetStepView) {
          return new WidgetStepView({
            view: v.value0.view,
            cont: map(functorAff)(f)(v.value0.cont)
          });
        }
        ;
        throw new Error("Failed pattern match at Concur.Core.Types (line 43, column 1 - line 45, column 72): " + [f.constructor.name, v.constructor.name]);
      };
    }
  };
  var effAction = function($80) {
    return Widget(liftF(WidgetStepEff.create($80)));
  };
  var widgetMonadEff = function(dictMonoid) {
    return {
      liftEffect: effAction,
      Monad0: function() {
        return widgetMonad;
      }
    };
  };
  var displayStep = function(v) {
    return new WidgetStepView({
      view: v,
      cont: never
    });
  };
  var display = function(v) {
    return liftF(displayStep(v));
  };
  var widgetSemigroup = function(dictMonoid) {
    return {
      append: function(w1) {
        return function(w2) {
          return orr(widgetMultiAlternative(dictMonoid))([w1, w2]);
        };
      }
    };
  };
  var widgetPlus = function(dictMonoid) {
    return {
      empty: display(mempty(dictMonoid)),
      Alt0: function() {
        return widgetAlt(dictMonoid);
      }
    };
  };
  var widgetMultiAlternative = function(dictMonoid) {
    return {
      orr: function(wss) {
        var merge = function(dictMonoid1) {
          return function(ws) {
            return function(wscs) {
              var wsm = map(functorNonEmptyArray)(function($81) {
                return wrap2(WidgetStepView.create($81));
              })(ws);
              return bind(bindAff)(sequential(parallelAff)(foldlWithIndex(foldableWithIndexNonEmptyArray)(function(i) {
                return function(r) {
                  return function(w) {
                    return alt(altParAff)(parallel(parallelAff)(map(functorAff)(Tuple.create(i))(w)))(r);
                  };
                };
              })(empty(plusParAff))(wscs)))(function(v2) {
                return pure(applicativeAff)(combine(dictMonoid1)(fromMaybe(wsm)(updateAt2(v2.value0)(v2.value1)(wsm))));
              });
            };
          };
        };
        var combineViewsConts = function(dictMonoid1) {
          return function(ws) {
            return wrap2(new WidgetStepView({
              view: foldMap1(foldable1NonEmptyArray)(dictMonoid1.Semigroup0())(function(v2) {
                return v2.view;
              })(ws),
              cont: merge(dictMonoid1)(ws)(map(functorNonEmptyArray)(function(v2) {
                return v2.cont;
              })(ws))
            }));
          };
        };
        var combineInner1 = function(dictMonoid1) {
          return function(ws) {
            return function(freeNarr) {
              var x = uncons4(freeNarr);
              var v2 = resume(functorWidgetStep)(x.head);
              if (v2 instanceof Right) {
                return pure(freeApplicative)(v2.value0);
              }
              ;
              if (v2 instanceof Left && v2.value0 instanceof WidgetStepEff) {
                return wrap2(new WidgetStepEff(function __do() {
                  var w = v2.value0.value0();
                  return combineInner1(dictMonoid1)(ws)(cons$prime(w)(x.tail));
                }));
              }
              ;
              if (v2 instanceof Left && v2.value0 instanceof WidgetStepView) {
                return combineInner(dictMonoid1)(snoc4(ws)(v2.value0.value0))(x.tail);
              }
              ;
              throw new Error("Failed pattern match at Concur.Core.Types (line 130, column 10 - line 135, column 75): " + [v2.constructor.name]);
            };
          };
        };
        var combineInner = function(dictMonoid1) {
          return function(ws) {
            return function(freeArr) {
              var v2 = fromArray(freeArr);
              if (v2 instanceof Nothing) {
                return combineViewsConts(dictMonoid1)(ws);
              }
              ;
              if (v2 instanceof Just) {
                return combineInner1(dictMonoid1)(ws)(v2.value0);
              }
              ;
              throw new Error("Failed pattern match at Concur.Core.Types (line 107, column 31 - line 110, column 49): " + [v2.constructor.name]);
            };
          };
        };
        var combine = function(dictMonoid1) {
          return function(wfs) {
            var x = uncons4(wfs);
            var v2 = resume(functorWidgetStep)(x.head);
            if (v2 instanceof Right) {
              return pure(freeApplicative)(v2.value0);
            }
            ;
            if (v2 instanceof Left && v2.value0 instanceof WidgetStepEff) {
              return wrap2(new WidgetStepEff(function __do() {
                var w = v2.value0.value0();
                return combine(dictMonoid1)(cons$prime(w)(x.tail));
              }));
            }
            ;
            if (v2 instanceof Left && v2.value0 instanceof WidgetStepView) {
              return combineInner(dictMonoid1)(singleton4(v2.value0.value0))(x.tail);
            }
            ;
            throw new Error("Failed pattern match at Concur.Core.Types (line 94, column 10 - line 99, column 77): " + [v2.constructor.name]);
          };
        };
        var v = fromArray(wss);
        if (v instanceof Just) {
          return combine(dictMonoid)(map(functorNonEmptyArray)(unWidget)(v.value0));
        }
        ;
        if (v instanceof Nothing) {
          return empty(widgetPlus(dictMonoid));
        }
        ;
        throw new Error("Failed pattern match at Concur.Core.Types (line 83, column 13 - line 85, column 21): " + [v.constructor.name]);
      },
      Plus0: function() {
        return widgetPlus(dictMonoid);
      }
    };
  };
  var widgetAlt = function(dictMonoid) {
    return {
      alt: append(widgetSemigroup(dictMonoid)),
      Functor0: function() {
        return widgetFunctor;
      }
    };
  };
  var widgetAlternative = function(dictMonoid) {
    return {
      Applicative0: function() {
        return widgetApplicative;
      },
      Plus1: function() {
        return widgetPlus(dictMonoid);
      }
    };
  };
  var affAction = function(v) {
    return function(aff) {
      var handler = function(v1) {
        return function(v2) {
          if (v2 instanceof Left) {
            return log("Aff failed - " + show(showError)(v2.value0));
          }
          ;
          if (v2 instanceof Right) {
            return $$void(functorEffect)(tryPut(v2.value0)(v1));
          }
          ;
          throw new Error("Failed pattern match at Concur.Core.Types (line 229, column 3 - line 229, column 55): " + [v1.constructor.name, v2.constructor.name]);
        };
      };
      return wrap2(new WidgetStepEff(function __do() {
        var $$var = empty4();
        runAff_(handler($$var))(aff)();
        var ma = tryTake($$var)();
        if (ma instanceof Just) {
          return pure(freeApplicative)(ma.value0);
        }
        ;
        if (ma instanceof Nothing) {
          return liftF(new WidgetStepView({
            view: v,
            cont: take3($$var)
          }));
        }
        ;
        throw new Error("Failed pattern match at Concur.Core.Types (line 224, column 8 - line 226, column 71): " + [ma.constructor.name]);
      }));
    };
  };
  var widgetMonadAff = function(dictMonoid) {
    return {
      liftAff: affAction(mempty(dictMonoid)),
      MonadEffect0: function() {
        return widgetMonadEff(dictMonoid);
      }
    };
  };

  // output/Data.Lazy/foreign.js
  var defer2 = function(thunk) {
    var v = null;
    return function() {
      if (thunk === void 0)
        return v;
      v = thunk();
      thunk = void 0;
      return v;
    };
  };
  var force = function(l) {
    return l();
  };

  // output/Data.Lazy/index.js
  var functorLazy = {
    map: function(f) {
      return function(l) {
        return defer2(function(v) {
          return f(force(l));
        });
      };
    }
  };

  // output/Effect.Aff.Class/index.js
  var monadAffAff = {
    liftAff: /* @__PURE__ */ identity(categoryFn),
    MonadEffect0: function() {
      return monadEffectAff;
    }
  };
  var liftAff = function(dict) {
    return dict.liftAff;
  };

  // output/Concur.Core/index.js
  var mkNodeWidget$prime = function(mkView) {
    return function(w) {
      var v = resume(functorWidgetStep)(w);
      if (v instanceof Right) {
        return pure(freeApplicative)(v.value0);
      }
      ;
      if (v instanceof Left && v.value0 instanceof WidgetStepEff) {
        return wrap2(new WidgetStepEff(function __do() {
          var w$prime = v.value0.value0();
          return mkNodeWidget$prime(mkView)(w$prime);
        }));
      }
      ;
      if (v instanceof Left && v.value0 instanceof WidgetStepView) {
        return wrap2(new WidgetStepEff(function __do() {
          var $$var = empty4();
          var eventHandler = function(a) {
            return $$void(functorEffect)(tryPut(pure(freeApplicative)(a))($$var));
          };
          var cont$prime = sequential(parallelAff)(alt(altParAff)(parallel(parallelAff)(liftAff(monadAffAff)(take3($$var))))(parallel(parallelAff)(map(functorAff)(mkNodeWidget$prime(mkView))(v.value0.value0.cont))));
          return wrap2(new WidgetStepView({
            view: mkView(eventHandler)(v.value0.value0.view),
            cont: cont$prime
          }));
        }));
      }
      ;
      throw new Error("Failed pattern match at Concur.Core (line 34, column 26 - line 48, column 10): " + [v.constructor.name]);
    };
  };
  var mkNodeWidget = function(mkView) {
    return function(v) {
      return mkNodeWidget$prime(mkView)(v);
    };
  };

  // output/Concur.Core.Props/index.js
  var PrimProp = /* @__PURE__ */ function() {
    function PrimProp2(value0) {
      this.value0 = value0;
    }
    ;
    PrimProp2.create = function(value0) {
      return new PrimProp2(value0);
    };
    return PrimProp2;
  }();
  var Handler = /* @__PURE__ */ function() {
    function Handler3(value0) {
      this.value0 = value0;
    }
    ;
    Handler3.create = function(value0) {
      return new Handler3(value0);
    };
    return Handler3;
  }();
  var mkProp = function(v) {
    return function(v1) {
      if (v1 instanceof PrimProp) {
        return v1.value0;
      }
      ;
      if (v1 instanceof Handler) {
        return v1.value0(v);
      }
      ;
      throw new Error("Failed pattern match at Concur.Core.Props (line 18, column 1 - line 22, column 7): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var functorProps = {
    map: function(v) {
      return function(v1) {
        if (v1 instanceof PrimProp) {
          return new PrimProp(v1.value0);
        }
        ;
        if (v1 instanceof Handler) {
          return new Handler(function(k) {
            return v1.value0(function($25) {
              return k(v($25));
            });
          });
        }
        ;
        throw new Error("Failed pattern match at Concur.Core.Props (line 13, column 1 - line 15, column 48): " + [v.constructor.name, v1.constructor.name]);
      };
    }
  };
  var filterProp = function(v) {
    return function(v1) {
      if (v1 instanceof PrimProp) {
        return v1;
      }
      ;
      if (v1 instanceof Handler) {
        return new Handler(function(h) {
          return v1.value0(function(a) {
            var $23 = v(a);
            if ($23) {
              return h(a);
            }
            ;
            return pure(applicativeEffect)(unit);
          });
        });
      }
      ;
      throw new Error("Failed pattern match at Concur.Core.Props (line 37, column 1 - line 41, column 12): " + [v.constructor.name, v1.constructor.name]);
    };
  };

  // output/Control.ShiftMap/index.js
  var shiftMap = function(dict) {
    return dict.shiftMap;
  };

  // output/Concur.Core.DOM/index.js
  var el = function(dictShiftMap) {
    return function(dictFunctor) {
      return function(e) {
        return function(props) {
          return shiftMap(dictShiftMap)(function(f) {
            return function(w) {
              return mkNodeWidget(function(h) {
                return function(v) {
                  return e(map(dictFunctor)(function() {
                    var $7 = mkProp(h);
                    var $8 = map(functorProps)(f);
                    return function($9) {
                      return $7($8($9));
                    };
                  }())(props))(v);
                };
              })(w);
            };
          });
        };
      };
    };
  };
  var el$prime = function(dictShiftMap) {
    return function(dictMultiAlternative) {
      return function(dictFunctor) {
        return function(e) {
          return function(props) {
            var $10 = el(dictShiftMap)(dictFunctor)(e)(props);
            var $11 = orr(dictMultiAlternative);
            return function($12) {
              return $10($11($12));
            };
          };
        };
      };
    };
  };

  // output/Data.Function.Uncurried/foreign.js
  var runFn4 = function(fn) {
    return function(a) {
      return function(b2) {
        return function(c) {
          return function(d) {
            return fn(a, b2, c, d);
          };
        };
      };
    };
  };

  // output/Data.Nullable/foreign.js
  var nullImpl = null;
  function nullable(a, r, f) {
    return a == null ? r : f(a);
  }
  function notNull(x) {
    return x;
  }

  // output/Data.Nullable/index.js
  var toNullable = /* @__PURE__ */ maybe(nullImpl)(notNull);
  var toMaybe = function(n) {
    return nullable(n, Nothing.value, Just.create);
  };

  // output/Halogen.VDom.Machine/index.js
  var Step = /* @__PURE__ */ function() {
    function Step2(value0, value1, value22, value32) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
    }
    ;
    Step2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return new Step2(value0, value1, value22, value32);
          };
        };
      };
    };
    return Step2;
  }();
  var unStep = unsafeCoerce2;
  var step = function(v, a) {
    return v.value2(v.value1, a);
  };
  var mkStep = unsafeCoerce2;
  var halt = function(v) {
    return v.value3(v.value1);
  };
  var extract2 = /* @__PURE__ */ unStep(function(v) {
    return v.value0;
  });

  // output/Halogen.VDom.Types/index.js
  var Text = /* @__PURE__ */ function() {
    function Text2(value0) {
      this.value0 = value0;
    }
    ;
    Text2.create = function(value0) {
      return new Text2(value0);
    };
    return Text2;
  }();
  var Elem = /* @__PURE__ */ function() {
    function Elem2(value0, value1, value22, value32) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
    }
    ;
    Elem2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return new Elem2(value0, value1, value22, value32);
          };
        };
      };
    };
    return Elem2;
  }();
  var Keyed = /* @__PURE__ */ function() {
    function Keyed2(value0, value1, value22, value32) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
    }
    ;
    Keyed2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return new Keyed2(value0, value1, value22, value32);
          };
        };
      };
    };
    return Keyed2;
  }();
  var Widget2 = /* @__PURE__ */ function() {
    function Widget3(value0) {
      this.value0 = value0;
    }
    ;
    Widget3.create = function(value0) {
      return new Widget3(value0);
    };
    return Widget3;
  }();
  var Grafted = /* @__PURE__ */ function() {
    function Grafted2(value0) {
      this.value0 = value0;
    }
    ;
    Grafted2.create = function(value0) {
      return new Grafted2(value0);
    };
    return Grafted2;
  }();
  var Graft = /* @__PURE__ */ function() {
    function Graft2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    Graft2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new Graft2(value0, value1, value22);
        };
      };
    };
    return Graft2;
  }();
  var unGraft = function(f) {
    return function($55) {
      return f($55);
    };
  };
  var graft = unsafeCoerce2;
  var bifunctorGraft = {
    bimap: function(f) {
      return function(g) {
        return unGraft(function(v) {
          return graft(new Graft(function($57) {
            return f(v.value0($57));
          }, function($58) {
            return g(v.value1($58));
          }, v.value2));
        });
      };
    }
  };
  var runGraft = /* @__PURE__ */ unGraft(function(v) {
    var go2 = function(v2) {
      if (v2 instanceof Text) {
        return new Text(v2.value0);
      }
      ;
      if (v2 instanceof Elem) {
        return new Elem(v2.value0, v2.value1, v.value0(v2.value2), map(functorArray)(go2)(v2.value3));
      }
      ;
      if (v2 instanceof Keyed) {
        return new Keyed(v2.value0, v2.value1, v.value0(v2.value2), map(functorArray)(map(functorTuple)(go2))(v2.value3));
      }
      ;
      if (v2 instanceof Widget2) {
        return new Widget2(v.value1(v2.value0));
      }
      ;
      if (v2 instanceof Grafted) {
        return new Grafted(bimap(bifunctorGraft)(v.value0)(v.value1)(v2.value0));
      }
      ;
      throw new Error("Failed pattern match at Halogen.VDom.Types (line 86, column 7 - line 86, column 27): " + [v2.constructor.name]);
    };
    return go2(v.value2);
  });

  // output/Halogen.VDom.Util/foreign.js
  function unsafeGetAny(key, obj) {
    return obj[key];
  }
  function unsafeHasAny(key, obj) {
    return obj.hasOwnProperty(key);
  }
  function unsafeSetAny(key, val, obj) {
    obj[key] = val;
  }
  function forE2(a, f) {
    var b2 = [];
    for (var i = 0; i < a.length; i++) {
      b2.push(f(i, a[i]));
    }
    return b2;
  }
  function forEachE(a, f) {
    for (var i = 0; i < a.length; i++) {
      f(a[i]);
    }
  }
  function forInE(o, f) {
    var ks = Object.keys(o);
    for (var i = 0; i < ks.length; i++) {
      var k = ks[i];
      f(k, o[k]);
    }
  }
  function diffWithIxE(a1, a2, f1, f2, f3) {
    var a3 = [];
    var l1 = a1.length;
    var l2 = a2.length;
    var i = 0;
    while (1) {
      if (i < l1) {
        if (i < l2) {
          a3.push(f1(i, a1[i], a2[i]));
        } else {
          f2(i, a1[i]);
        }
      } else if (i < l2) {
        a3.push(f3(i, a2[i]));
      } else {
        break;
      }
      i++;
    }
    return a3;
  }
  function strMapWithIxE(as, fk, f) {
    var o = {};
    for (var i = 0; i < as.length; i++) {
      var a = as[i];
      var k = fk(a);
      o[k] = f(k, i, a);
    }
    return o;
  }
  function diffWithKeyAndIxE(o1, as, fk, f1, f2, f3) {
    var o2 = {};
    for (var i = 0; i < as.length; i++) {
      var a = as[i];
      var k = fk(a);
      if (o1.hasOwnProperty(k)) {
        o2[k] = f1(k, i, o1[k], a);
      } else {
        o2[k] = f3(k, i, a);
      }
    }
    for (var k in o1) {
      if (k in o2) {
        continue;
      }
      f2(k, o1[k]);
    }
    return o2;
  }
  function refEq2(a, b2) {
    return a === b2;
  }
  function createTextNode(s, doc) {
    return doc.createTextNode(s);
  }
  function setTextContent(s, n) {
    n.textContent = s;
  }
  function createElement(ns, name15, doc) {
    if (ns != null) {
      return doc.createElementNS(ns, name15);
    } else {
      return doc.createElement(name15);
    }
  }
  function insertChildIx(i, a, b2) {
    var n = b2.childNodes.item(i) || null;
    if (n !== a) {
      b2.insertBefore(a, n);
    }
  }
  function removeChild(a, b2) {
    if (b2 && a.parentNode === b2) {
      b2.removeChild(a);
    }
  }
  function parentNode(a) {
    return a.parentNode;
  }
  function setAttribute(ns, attr3, val, el2) {
    if (ns != null) {
      el2.setAttributeNS(ns, attr3, val);
    } else {
      el2.setAttribute(attr3, val);
    }
  }
  function removeAttribute(ns, attr3, el2) {
    if (ns != null) {
      el2.removeAttributeNS(ns, attr3);
    } else {
      el2.removeAttribute(attr3);
    }
  }
  function hasAttribute(ns, attr3, el2) {
    if (ns != null) {
      return el2.hasAttributeNS(ns, attr3);
    } else {
      return el2.hasAttribute(attr3);
    }
  }
  function addEventListener(ev, listener, el2) {
    el2.addEventListener(ev, listener, false);
  }
  function removeEventListener(ev, listener, el2) {
    el2.removeEventListener(ev, listener, false);
  }
  var jsUndefined = void 0;

  // output/Foreign.Object.ST/foreign.js
  var newImpl = function() {
    return {};
  };

  // output/Halogen.VDom.Util/index.js
  var unsafeLookup = unsafeGetAny;
  var unsafeFreeze2 = unsafeCoerce2;
  var pokeMutMap = unsafeSetAny;
  var newMutMap = newImpl;

  // output/Web.DOM.Element/foreign.js
  var getProp = function(name15) {
    return function(doctype) {
      return doctype[name15];
    };
  };
  var _namespaceURI = getProp("namespaceURI");
  var _prefix = getProp("prefix");
  var localName = getProp("localName");
  var tagName = getProp("tagName");

  // output/Web.DOM.ParentNode/foreign.js
  var getEffProp = function(name15) {
    return function(node2) {
      return function() {
        return node2[name15];
      };
    };
  };
  var children = getEffProp("children");
  var _firstElementChild = getEffProp("firstElementChild");
  var _lastElementChild = getEffProp("lastElementChild");
  var childElementCount = getEffProp("childElementCount");
  function _querySelector(selector) {
    return function(node2) {
      return function() {
        return node2.querySelector(selector);
      };
    };
  }

  // output/Web.DOM.ParentNode/index.js
  var querySelector = function(qs) {
    var $0 = map(functorEffect)(toMaybe);
    var $1 = _querySelector(qs);
    return function($2) {
      return $0($1($2));
    };
  };

  // output/Web.Internal.FFI/foreign.js
  function _unsafeReadProtoTagged(nothing, just, name15, value12) {
    if (typeof window !== "undefined") {
      var ty = window[name15];
      if (ty != null && value12 instanceof ty) {
        return just(value12);
      }
    }
    var obj = value12;
    while (obj != null) {
      var proto = Object.getPrototypeOf(obj);
      var constructorName = proto.constructor.name;
      if (constructorName === name15) {
        return just(value12);
      } else if (constructorName === "Object") {
        return nothing;
      }
      obj = proto;
    }
    return nothing;
  }

  // output/Web.Internal.FFI/index.js
  var unsafeReadProtoTagged = function(name15) {
    return function(value12) {
      return _unsafeReadProtoTagged(Nothing.value, Just.create, name15, value12);
    };
  };

  // output/Web.DOM.Element/index.js
  var toNode = unsafeCoerce2;
  var fromEventTarget = /* @__PURE__ */ unsafeReadProtoTagged("Element");

  // output/Halogen.VDom.DOM/index.js
  var $runtime_lazy4 = function(name15, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name15 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
      return val;
    };
  };
  var haltWidget = function(v) {
    return halt(v.widget);
  };
  var $lazy_patchWidget = /* @__PURE__ */ $runtime_lazy4("patchWidget", "Halogen.VDom.DOM", function() {
    return function(state3, vdom) {
      if (vdom instanceof Grafted) {
        return $lazy_patchWidget(291)(state3, runGraft(vdom.value0));
      }
      ;
      if (vdom instanceof Widget2) {
        var res = step(state3.widget, vdom.value0);
        var res$prime = unStep(function(v) {
          return mkStep(new Step(v.value0, {
            build: state3.build,
            widget: res
          }, $lazy_patchWidget(296), haltWidget));
        })(res);
        return res$prime;
      }
      ;
      haltWidget(state3);
      return state3.build(vdom);
    };
  });
  var patchWidget = /* @__PURE__ */ $lazy_patchWidget(286);
  var haltText = function(v) {
    var parent2 = parentNode(v.node);
    return removeChild(v.node, parent2);
  };
  var $lazy_patchText = /* @__PURE__ */ $runtime_lazy4("patchText", "Halogen.VDom.DOM", function() {
    return function(state3, vdom) {
      if (vdom instanceof Grafted) {
        return $lazy_patchText(82)(state3, runGraft(vdom.value0));
      }
      ;
      if (vdom instanceof Text) {
        if (state3.value === vdom.value0) {
          return mkStep(new Step(state3.node, state3, $lazy_patchText(85), haltText));
        }
        ;
        if (otherwise) {
          var nextState = {
            build: state3.build,
            node: state3.node,
            value: vdom.value0
          };
          setTextContent(vdom.value0, state3.node);
          return mkStep(new Step(state3.node, nextState, $lazy_patchText(89), haltText));
        }
        ;
      }
      ;
      haltText(state3);
      return state3.build(vdom);
    };
  });
  var patchText = /* @__PURE__ */ $lazy_patchText(77);
  var haltKeyed = function(v) {
    var parent2 = parentNode(v.node);
    removeChild(v.node, parent2);
    forInE(v.children, function(v1, s) {
      return halt(s);
    });
    return halt(v.attrs);
  };
  var haltElem = function(v) {
    var parent2 = parentNode(v.node);
    removeChild(v.node, parent2);
    forEachE(v.children, halt);
    return halt(v.attrs);
  };
  var eqElemSpec = function(ns1, v, ns2, v1) {
    var $58 = v === v1;
    if ($58) {
      if (ns1 instanceof Just && (ns2 instanceof Just && ns1.value0 === ns2.value0)) {
        return true;
      }
      ;
      if (ns1 instanceof Nothing && ns2 instanceof Nothing) {
        return true;
      }
      ;
      return false;
    }
    ;
    return false;
  };
  var $lazy_patchElem = /* @__PURE__ */ $runtime_lazy4("patchElem", "Halogen.VDom.DOM", function() {
    return function(state3, vdom) {
      if (vdom instanceof Grafted) {
        return $lazy_patchElem(135)(state3, runGraft(vdom.value0));
      }
      ;
      if (vdom instanceof Elem && eqElemSpec(state3.ns, state3.name, vdom.value0, vdom.value1)) {
        var v = length3(vdom.value3);
        var v1 = length3(state3.children);
        if (v1 === 0 && v === 0) {
          var attrs2 = step(state3.attrs, vdom.value2);
          var nextState = {
            build: state3.build,
            node: state3.node,
            attrs: attrs2,
            ns: vdom.value0,
            name: vdom.value1,
            children: state3.children
          };
          return mkStep(new Step(state3.node, nextState, $lazy_patchElem(149), haltElem));
        }
        ;
        var onThis = function(v2, s) {
          return halt(s);
        };
        var onThese = function(ix, s, v2) {
          var res = step(s, v2);
          insertChildIx(ix, extract2(res), state3.node);
          return res;
        };
        var onThat = function(ix, v2) {
          var res = state3.build(v2);
          insertChildIx(ix, extract2(res), state3.node);
          return res;
        };
        var children2 = diffWithIxE(state3.children, vdom.value3, onThese, onThis, onThat);
        var attrs2 = step(state3.attrs, vdom.value2);
        var nextState = {
          build: state3.build,
          node: state3.node,
          attrs: attrs2,
          ns: vdom.value0,
          name: vdom.value1,
          children: children2
        };
        return mkStep(new Step(state3.node, nextState, $lazy_patchElem(172), haltElem));
      }
      ;
      haltElem(state3);
      return state3.build(vdom);
    };
  });
  var patchElem = /* @__PURE__ */ $lazy_patchElem(130);
  var $lazy_patchKeyed = /* @__PURE__ */ $runtime_lazy4("patchKeyed", "Halogen.VDom.DOM", function() {
    return function(state3, vdom) {
      if (vdom instanceof Grafted) {
        return $lazy_patchKeyed(222)(state3, runGraft(vdom.value0));
      }
      ;
      if (vdom instanceof Keyed && eqElemSpec(state3.ns, state3.name, vdom.value0, vdom.value1)) {
        var v = length3(vdom.value3);
        if (state3.length === 0 && v === 0) {
          var attrs2 = step(state3.attrs, vdom.value2);
          var nextState = {
            build: state3.build,
            node: state3.node,
            attrs: attrs2,
            ns: vdom.value0,
            name: vdom.value1,
            children: state3.children,
            length: 0
          };
          return mkStep(new Step(state3.node, nextState, $lazy_patchKeyed(237), haltKeyed));
        }
        ;
        var onThis = function(v2, s) {
          return halt(s);
        };
        var onThese = function(v2, ix$prime, s, v3) {
          var res = step(s, v3.value1);
          insertChildIx(ix$prime, extract2(res), state3.node);
          return res;
        };
        var onThat = function(v2, ix, v3) {
          var res = state3.build(v3.value1);
          insertChildIx(ix, extract2(res), state3.node);
          return res;
        };
        var children2 = diffWithKeyAndIxE(state3.children, vdom.value3, fst, onThese, onThis, onThat);
        var attrs2 = step(state3.attrs, vdom.value2);
        var nextState = {
          build: state3.build,
          node: state3.node,
          attrs: attrs2,
          ns: vdom.value0,
          name: vdom.value1,
          children: children2,
          length: v
        };
        return mkStep(new Step(state3.node, nextState, $lazy_patchKeyed(261), haltKeyed));
      }
      ;
      haltKeyed(state3);
      return state3.build(vdom);
    };
  });
  var patchKeyed = /* @__PURE__ */ $lazy_patchKeyed(217);
  var buildWidget = function(v, build, w) {
    var res = v.buildWidget(v)(w);
    var res$prime = unStep(function(v1) {
      return mkStep(new Step(v1.value0, {
        build,
        widget: res
      }, patchWidget, haltWidget));
    })(res);
    return res$prime;
  };
  var buildText = function(v, build, s) {
    var node2 = createTextNode(s, v.document);
    var state3 = {
      build,
      node: node2,
      value: s
    };
    return mkStep(new Step(node2, state3, patchText, haltText));
  };
  var buildKeyed = function(v, build, ns1, name1, as1, ch1) {
    var el2 = createElement(toNullable(ns1), name1, v.document);
    var node2 = toNode(el2);
    var onChild = function(v1, ix, v2) {
      var res = build(v2.value1);
      insertChildIx(ix, extract2(res), node2);
      return res;
    };
    var children2 = strMapWithIxE(ch1, fst, onChild);
    var attrs = v.buildAttributes(el2)(as1);
    var state3 = {
      build,
      node: node2,
      attrs,
      ns: ns1,
      name: name1,
      children: children2,
      length: length3(ch1)
    };
    return mkStep(new Step(node2, state3, patchKeyed, haltKeyed));
  };
  var buildElem = function(v, build, ns1, name1, as1, ch1) {
    var el2 = createElement(toNullable(ns1), name1, v.document);
    var node2 = toNode(el2);
    var onChild = function(ix, child) {
      var res = build(child);
      insertChildIx(ix, extract2(res), node2);
      return res;
    };
    var children2 = forE2(ch1, onChild);
    var attrs = v.buildAttributes(el2)(as1);
    var state3 = {
      build,
      node: node2,
      attrs,
      ns: ns1,
      name: name1,
      children: children2
    };
    return mkStep(new Step(node2, state3, patchElem, haltElem));
  };
  var buildVDom = function(spec) {
    var $lazy_build = $runtime_lazy4("build", "Halogen.VDom.DOM", function() {
      return function(v) {
        if (v instanceof Text) {
          return buildText(spec, $lazy_build(59), v.value0);
        }
        ;
        if (v instanceof Elem) {
          return buildElem(spec, $lazy_build(60), v.value0, v.value1, v.value2, v.value3);
        }
        ;
        if (v instanceof Keyed) {
          return buildKeyed(spec, $lazy_build(61), v.value0, v.value1, v.value2, v.value3);
        }
        ;
        if (v instanceof Widget2) {
          return buildWidget(spec, $lazy_build(62), v.value0);
        }
        ;
        if (v instanceof Grafted) {
          return $lazy_build(63)(runGraft(v.value0));
        }
        ;
        throw new Error("Failed pattern match at Halogen.VDom.DOM (line 58, column 27 - line 63, column 52): " + [v.constructor.name]);
      };
    });
    var build = $lazy_build(58);
    return build;
  };

  // output/Concur.Thunk.Internal/index.js
  var $runtime_lazy5 = function(name15, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name15 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
      return val;
    };
  };
  var unsafeEqThunk = function(v, v1) {
    return refEq2(v.value0, v1.value0) && (refEq2(v.value1, v1.value1) && v.value1(v.value3, v1.value3));
  };
  var runThunk = function(v) {
    return v.value2(v.value3);
  };
  var buildThunk = function(toVDom) {
    var haltThunk = function(state3) {
      return halt(state3.vdom);
    };
    var $lazy_patchThunk = $runtime_lazy5("patchThunk", "Concur.Thunk.Internal", function() {
      return function(state3, t2) {
        var $35 = unsafeEqThunk(state3.thunk, t2);
        if ($35) {
          return mkStep(new Step(extract2(state3.vdom), state3, $lazy_patchThunk(104), haltThunk));
        }
        ;
        var vdom = step(state3.vdom, toVDom(runThunk(t2)));
        return mkStep(new Step(extract2(vdom), {
          vdom,
          thunk: t2
        }, $lazy_patchThunk(107), haltThunk));
      };
    });
    var patchThunk = $lazy_patchThunk(100);
    var renderThunk = function(spec) {
      return function(t2) {
        var vdom = buildVDom(spec)(toVDom(runThunk(t2)));
        return mkStep(new Step(extract2(vdom), {
          thunk: t2,
          vdom
        }, patchThunk, haltThunk));
      };
    };
    return renderThunk;
  };

  // output/Concur.VDom.Types/index.js
  var HTMLNode = function(x) {
    return x;
  };
  var unHTMLNode = function(v) {
    return v;
  };
  var unHTML = function(x) {
    return x;
  };
  var mkHTMLNode = HTMLNode;

  // output/Concur.VDom.DOM/index.js
  var viewAdapter = function(f) {
    return function(ps) {
      return function(vs) {
        return [f(ps)(vs)];
      };
    };
  };
  var text = function(dictLiftWidget) {
    return function(str) {
      var wid = display([mkHTMLNode(new Text(str))]);
      return liftWidget(dictLiftWidget)(wid);
    };
  };
  var nodeBuilder = function(s) {
    return function(prop2) {
      return function(c) {
        return mkHTMLNode(new Elem(Nothing.value, s, prop2, unHTML(c)));
      };
    };
  };
  var el$prime2 = function(dictShiftMap) {
    return function(dictMultiAlternative) {
      return function(f) {
        return el$prime(dictShiftMap)(dictMultiAlternative)(functorArray)(viewAdapter(f));
      };
    };
  };
  var node = function(s) {
    return function(dictMultiAlternative) {
      return function(dictShiftMap) {
        return el$prime2(dictShiftMap)(dictMultiAlternative)(nodeBuilder(s));
      };
    };
  };
  var h1 = function(dictMultiAlternative) {
    return function(dictShiftMap) {
      return node("h1")(dictMultiAlternative)(dictShiftMap);
    };
  };
  var h2 = function(dictMultiAlternative) {
    return function(dictShiftMap) {
      return node("h2")(dictMultiAlternative)(dictShiftMap);
    };
  };
  var input = function(dictMultiAlternative) {
    return function(dictShiftMap) {
      return function(ps) {
        return node("input")(dictMultiAlternative)(dictShiftMap)(ps)([]);
      };
    };
  };
  var label = function(dictMultiAlternative) {
    return function(dictShiftMap) {
      return node("label")(dictMultiAlternative)(dictShiftMap);
    };
  };
  var li = function(dictMultiAlternative) {
    return function(dictShiftMap) {
      return node("li")(dictMultiAlternative)(dictShiftMap);
    };
  };
  var node$prime = function(s) {
    return function(dictMultiAlternative) {
      return function(dictShiftMap) {
        return node(s)(dictMultiAlternative)(dictShiftMap)([]);
      };
    };
  };
  var label$prime = function(dictMultiAlternative) {
    return function(dictShiftMap) {
      return node$prime("label")(dictMultiAlternative)(dictShiftMap);
    };
  };
  var ul = function(dictMultiAlternative) {
    return function(dictShiftMap) {
      return node("ul")(dictMultiAlternative)(dictShiftMap);
    };
  };
  var div$prime = function(dictMultiAlternative) {
    return function(dictShiftMap) {
      return node$prime("div")(dictMultiAlternative)(dictShiftMap);
    };
  };
  var div2 = function(dictMultiAlternative) {
    return function(dictShiftMap) {
      return node("div")(dictMultiAlternative)(dictShiftMap);
    };
  };
  var br = function(dictMultiAlternative) {
    return function(dictShiftMap) {
      return node("br")(dictMultiAlternative)(dictShiftMap);
    };
  };

  // output/Foreign/foreign.js
  function typeOf(value12) {
    return typeof value12;
  }
  var isArray = Array.isArray || function(value12) {
    return Object.prototype.toString.call(value12) === "[object Array]";
  };

  // output/Data.Int/foreign.js
  var fromNumberImpl = function(just) {
    return function(nothing) {
      return function(n) {
        return (n | 0) === n ? just(n) : nothing;
      };
    };
  };
  var toNumber = function(n) {
    return n;
  };

  // output/Data.Number/foreign.js
  var isNaNImpl = isNaN;
  var isFiniteImpl = isFinite;
  function fromStringImpl(str, isFinite2, just, nothing) {
    var num = parseFloat(str);
    if (isFinite2(num)) {
      return just(num);
    } else {
      return nothing;
    }
  }
  var round = Math.round;

  // output/Data.Number/index.js
  var fromString = function(str) {
    return fromStringImpl(str, isFiniteImpl, Just.create, Nothing.value);
  };

  // output/Data.Int/index.js
  var fromNumber = /* @__PURE__ */ function() {
    return fromNumberImpl(Just.create)(Nothing.value);
  }();
  var unsafeClamp = function(x) {
    if (!isFiniteImpl(x)) {
      return 0;
    }
    ;
    if (x >= toNumber(top(boundedInt))) {
      return top(boundedInt);
    }
    ;
    if (x <= toNumber(bottom(boundedInt))) {
      return bottom(boundedInt);
    }
    ;
    if (otherwise) {
      return fromMaybe(0)(fromNumber(x));
    }
    ;
    throw new Error("Failed pattern match at Data.Int (line 72, column 1 - line 72, column 29): " + [x.constructor.name]);
  };
  var round2 = function($23) {
    return unsafeClamp(round($23));
  };

  // output/Foreign.Object/foreign.js
  function _lookup(no, yes, k, m2) {
    return k in m2 ? yes(m2[k]) : no;
  }
  function toArrayWithKey(f) {
    return function(m2) {
      var r = [];
      for (var k in m2) {
        if (hasOwnProperty.call(m2, k)) {
          r.push(f(k)(m2[k]));
        }
      }
      return r;
    };
  }
  var keys = Object.keys || toArrayWithKey(function(k) {
    return function() {
      return k;
    };
  });

  // output/Foreign.Object/index.js
  var lookup = /* @__PURE__ */ function() {
    return runFn4(_lookup)(Nothing.value)(Just.create);
  }();

  // output/Web.Event.EventTarget/foreign.js
  function eventListener(fn) {
    return function() {
      return function(event) {
        return fn(event)();
      };
    };
  }
  function addEventListener2(type) {
    return function(listener) {
      return function(useCapture) {
        return function(target6) {
          return function() {
            return target6.addEventListener(type, listener, useCapture);
          };
        };
      };
    };
  }
  function removeEventListener2(type) {
    return function(listener) {
      return function(useCapture) {
        return function(target6) {
          return function() {
            return target6.removeEventListener(type, listener, useCapture);
          };
        };
      };
    };
  }

  // output/Concur.VDom.Props.Internal/index.js
  var $runtime_lazy6 = function(name15, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name15 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
      return val;
    };
  };
  var Created = /* @__PURE__ */ function() {
    function Created2(value0) {
      this.value0 = value0;
    }
    ;
    Created2.create = function(value0) {
      return new Created2(value0);
    };
    return Created2;
  }();
  var Removed = /* @__PURE__ */ function() {
    function Removed2(value0) {
      this.value0 = value0;
    }
    ;
    Removed2.create = function(value0) {
      return new Removed2(value0);
    };
    return Removed2;
  }();
  var Attribute = /* @__PURE__ */ function() {
    function Attribute2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    Attribute2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new Attribute2(value0, value1, value22);
        };
      };
    };
    return Attribute2;
  }();
  var Property = /* @__PURE__ */ function() {
    function Property2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Property2.create = function(value0) {
      return function(value1) {
        return new Property2(value0, value1);
      };
    };
    return Property2;
  }();
  var Handler2 = /* @__PURE__ */ function() {
    function Handler3(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Handler3.create = function(value0) {
      return function(value1) {
        return new Handler3(value0, value1);
      };
    };
    return Handler3;
  }();
  var Ref = /* @__PURE__ */ function() {
    function Ref2(value0) {
      this.value0 = value0;
    }
    ;
    Ref2.create = function(value0) {
      return new Ref2(value0);
    };
    return Ref2;
  }();
  var unsafeGetProperty = unsafeGetAny;
  var setProperty = unsafeSetAny;
  var removeProperty = function(key, el2) {
    var v = hasAttribute(nullImpl, key, el2);
    if (v) {
      return removeAttribute(nullImpl, key, el2);
    }
    ;
    var v1 = typeOf(unsafeGetAny(key, el2));
    if (v1 === "string") {
      return unsafeSetAny(key, "", el2);
    }
    ;
    if (key === "rowSpan") {
      return unsafeSetAny(key, 1, el2);
    }
    ;
    if (key === "colSpan") {
      return unsafeSetAny(key, 1, el2);
    }
    ;
    return unsafeSetAny(key, jsUndefined, el2);
  };
  var propValue = unsafeCoerce2;
  var propToStrKey = function(v) {
    if (v instanceof Attribute && v.value0 instanceof Just) {
      return "attr/" + (v.value0.value0 + (":" + v.value1));
    }
    ;
    if (v instanceof Attribute) {
      return "attr/:" + v.value1;
    }
    ;
    if (v instanceof Property) {
      return "prop/" + v.value0;
    }
    ;
    if (v instanceof Handler2) {
      return "handler/" + v.value0;
    }
    ;
    if (v instanceof Ref) {
      return "ref";
    }
    ;
    throw new Error("Failed pattern match at Concur.VDom.Props.Internal (line 160, column 16 - line 165, column 16): " + [v.constructor.name]);
  };
  var buildProp = function(el2) {
    var removeProp = function(prevEvents) {
      return function(v, v1) {
        if (v1 instanceof Attribute) {
          return removeAttribute(toNullable(v1.value0), v1.value1, el2);
        }
        ;
        if (v1 instanceof Property) {
          return removeProperty(v1.value0, el2);
        }
        ;
        if (v1 instanceof Handler2) {
          var handler = unsafeLookup(v1.value0, prevEvents);
          return removeEventListener(v1.value0, fst(handler), el2);
        }
        ;
        if (v1 instanceof Ref) {
          return unit;
        }
        ;
        throw new Error("Failed pattern match at Concur.VDom.Props.Internal (line 147, column 5 - line 157, column 18): " + [v1.constructor.name]);
      };
    };
    var haltProp = function(state3) {
      var v = lookup("ref")(state3.props);
      if (v instanceof Just && v.value0 instanceof Ref) {
        return v.value0.value0(new Removed(el2));
      }
      ;
      return unit;
    };
    var diffProp = function(prevEvents, events) {
      return function(v, v1, v11, v2) {
        if (v11 instanceof Attribute && v2 instanceof Attribute) {
          var $47 = v11.value2 === v2.value2;
          if ($47) {
            return v2;
          }
          ;
          setAttribute(toNullable(v2.value0), v2.value1, v2.value2, el2);
          return v2;
        }
        ;
        if (v11 instanceof Property && v2 instanceof Property) {
          var v4 = refEq2(v11.value1, v2.value1);
          if (v4) {
            return v2;
          }
          ;
          if (v2.value0 === "value") {
            var elVal = unsafeGetProperty("value", el2);
            var $56 = refEq2(elVal, v2.value1);
            if ($56) {
              return v2;
            }
            ;
            setProperty(v2.value0, v2.value1, el2);
            return v2;
          }
          ;
          setProperty(v2.value0, v2.value1, el2);
          return v2;
        }
        ;
        if (v11 instanceof Handler2 && v2 instanceof Handler2) {
          var handler = unsafeLookup(v2.value0, prevEvents);
          write(v2.value1)(snd(handler))();
          pokeMutMap(v2.value0, handler, events);
          return v2;
        }
        ;
        return v2;
      };
    };
    var applyProp = function(events) {
      return function(v, v1, v2) {
        if (v2 instanceof Attribute) {
          setAttribute(toNullable(v2.value0), v2.value1, v2.value2, el2);
          return v2;
        }
        ;
        if (v2 instanceof Property) {
          setProperty(v2.value0, v2.value1, el2);
          return v2;
        }
        ;
        if (v2 instanceof Handler2) {
          var v3 = unsafeGetAny(v2.value0, events);
          if (unsafeHasAny(v2.value0, events)) {
            write(v2.value1)(snd(v3))();
            return v2;
          }
          ;
          var ref = $$new(v2.value1)();
          var listener = eventListener(function(ev) {
            return function __do() {
              var f$prime = read(ref)();
              return f$prime(ev);
            };
          })();
          pokeMutMap(v2.value0, new Tuple(listener, ref), events);
          addEventListener(v2.value0, listener, el2);
          return v2;
        }
        ;
        if (v2 instanceof Ref) {
          v2.value0(new Created(el2));
          return v2;
        }
        ;
        throw new Error("Failed pattern match at Concur.VDom.Props.Internal (line 91, column 5 - line 113, column 15): " + [v2.constructor.name]);
      };
    };
    var $lazy_patchProp = $runtime_lazy6("patchProp", "Concur.VDom.Props.Internal", function() {
      return function(state3, ps2) {
        var events = newMutMap();
        var onThis = removeProp(state3.events);
        var onThese = diffProp(state3.events, events);
        var onThat = applyProp(events);
        var props = diffWithKeyAndIxE(state3.props, ps2, propToStrKey, onThese, onThis, onThat);
        var nextState = {
          events: unsafeFreeze2(events),
          props
        };
        return mkStep(new Step(unit, nextState, $lazy_patchProp(82), haltProp));
      };
    });
    var patchProp = $lazy_patchProp(69);
    var renderProp = function(ps1) {
      var events = newMutMap();
      var ps1$prime = strMapWithIxE(ps1, propToStrKey, applyProp(events));
      var state3 = {
        events: unsafeFreeze2(events),
        props: ps1$prime
      };
      return mkStep(new Step(unit, state3, patchProp, haltProp));
    };
    return renderProp;
  };

  // output/Effect.Uncurried/foreign.js
  var mkEffectFn1 = function mkEffectFn12(fn) {
    return function(x) {
      return fn(x)();
    };
  };

  // output/Web.DOM.Node/foreign.js
  var getEffProp2 = function(name15) {
    return function(node2) {
      return function() {
        return node2[name15];
      };
    };
  };
  var baseURI = getEffProp2("baseURI");
  var _ownerDocument = getEffProp2("ownerDocument");
  var _parentNode = getEffProp2("parentNode");
  var _parentElement = getEffProp2("parentElement");
  var childNodes = getEffProp2("childNodes");
  var _firstChild = getEffProp2("firstChild");
  var _lastChild = getEffProp2("lastChild");
  var _previousSibling = getEffProp2("previousSibling");
  var _nextSibling = getEffProp2("nextSibling");
  var _nodeValue = getEffProp2("nodeValue");
  var textContent = getEffProp2("textContent");
  function appendChild(node2) {
    return function(parent2) {
      return function() {
        parent2.appendChild(node2);
      };
    };
  }

  // output/Web.Event.Event/foreign.js
  function _target(e) {
    return e.target;
  }

  // output/Web.Event.Event/index.js
  var target = function($0) {
    return toMaybe(_target($0));
  };

  // output/Web.HTML.HTMLInputElement/foreign.js
  function value(input2) {
    return function() {
      return input2.value;
    };
  }

  // output/Web.HTML.HTMLInputElement/index.js
  var fromElement = /* @__PURE__ */ unsafeReadProtoTagged("HTMLInputElement");

  // output/Concur.VDom.Props/index.js
  var unsafeTargetValue = function(ev) {
    return unsafePerformEffect(maybe(pure(applicativeEffect)(""))(value)(bindFlipped(bindMaybe)(fromElement)(bindFlipped(bindMaybe)(fromEventTarget)(target(ev)))));
  };
  var prop = function(s) {
    return function(v) {
      return new PrimProp(new Property(s, propValue(v)));
    };
  };
  var size3 = /* @__PURE__ */ prop("size");
  var isEnterEvent = function(e) {
    return e.keyCode === 13;
  };
  var handle = function(s) {
    return new Handler(function(f) {
      return new Handler2(wrap()(s), mkEffectFn1(f));
    });
  };
  var onChange = /* @__PURE__ */ handle("input");
  var onKeyDown = /* @__PURE__ */ handle("keydown");
  var onKeyEnter = /* @__PURE__ */ filterProp(isEnterEvent)(onKeyDown);
  var dangerouslySetInnerHTML = /* @__PURE__ */ prop("innerHTML");
  var autoFocus = /* @__PURE__ */ prop("autofocus");
  var attr = function(s) {
    return function(v) {
      return new PrimProp(new Attribute(Nothing.value, s, v));
    };
  };

  // output/Control.Monad.State/index.js
  var runState = function(v) {
    var $16 = unwrap();
    return function($17) {
      return $16(v($17));
    };
  };

  // output/Data.Ratio/index.js
  var Ratio = /* @__PURE__ */ function() {
    function Ratio2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Ratio2.create = function(value0) {
      return function(value1) {
        return new Ratio2(value0, value1);
      };
    };
    return Ratio2;
  }();
  var reduce = function(dictOrd) {
    return function(dictEuclideanRing) {
      return function(n) {
        return function(d) {
          var g = gcd(dictOrd.Eq0())(dictEuclideanRing)(n)(d);
          var d$prime = div(dictEuclideanRing)(d)(g);
          return new Ratio(mul(dictEuclideanRing.CommutativeRing0().Ring0().Semiring0())(div(dictEuclideanRing)(n)(g))(signum(dictOrd)(dictEuclideanRing.CommutativeRing0().Ring0())(d$prime)), abs(dictOrd)(dictEuclideanRing.CommutativeRing0().Ring0())(d$prime));
        };
      };
    };
  };
  var semiringRatio = function(dictOrd) {
    return function(dictEuclideanRing) {
      return {
        one: new Ratio(one(dictEuclideanRing.CommutativeRing0().Ring0().Semiring0()), one(dictEuclideanRing.CommutativeRing0().Ring0().Semiring0())),
        mul: function(v) {
          return function(v1) {
            return reduce(dictOrd)(dictEuclideanRing)(mul(dictEuclideanRing.CommutativeRing0().Ring0().Semiring0())(v.value0)(v1.value0))(mul(dictEuclideanRing.CommutativeRing0().Ring0().Semiring0())(v.value1)(v1.value1));
          };
        },
        zero: new Ratio(zero(dictEuclideanRing.CommutativeRing0().Ring0().Semiring0()), one(dictEuclideanRing.CommutativeRing0().Ring0().Semiring0())),
        add: function(v) {
          return function(v1) {
            return reduce(dictOrd)(dictEuclideanRing)(add(dictEuclideanRing.CommutativeRing0().Ring0().Semiring0())(mul(dictEuclideanRing.CommutativeRing0().Ring0().Semiring0())(v.value0)(v1.value1))(mul(dictEuclideanRing.CommutativeRing0().Ring0().Semiring0())(v.value1)(v1.value0)))(mul(dictEuclideanRing.CommutativeRing0().Ring0().Semiring0())(v.value1)(v1.value1));
          };
        }
      };
    };
  };
  var ringRatio = function(dictOrd) {
    return function(dictEuclideanRing) {
      return {
        sub: function(v) {
          return function(v1) {
            return reduce(dictOrd)(dictEuclideanRing)(sub(dictEuclideanRing.CommutativeRing0().Ring0())(mul(dictEuclideanRing.CommutativeRing0().Ring0().Semiring0())(v.value0)(v1.value1))(mul(dictEuclideanRing.CommutativeRing0().Ring0().Semiring0())(v.value1)(v1.value0)))(mul(dictEuclideanRing.CommutativeRing0().Ring0().Semiring0())(v.value1)(v1.value1));
          };
        },
        Semiring0: function() {
          return semiringRatio(dictOrd)(dictEuclideanRing);
        }
      };
    };
  };
  var numerator = function(v) {
    return v.value0;
  };
  var denominator = function(v) {
    return v.value1;
  };
  var commutativeRingRatio = function(dictOrd) {
    return function(dictEuclideanRing) {
      return {
        Ring0: function() {
          return ringRatio(dictOrd)(dictEuclideanRing);
        }
      };
    };
  };
  var euclideanRingRatio = function(dictOrd) {
    return function(dictEuclideanRing) {
      return {
        degree: function(v) {
          return 1;
        },
        div: function(v) {
          return function(v1) {
            return reduce(dictOrd)(dictEuclideanRing)(mul(dictEuclideanRing.CommutativeRing0().Ring0().Semiring0())(v.value0)(v1.value1))(mul(dictEuclideanRing.CommutativeRing0().Ring0().Semiring0())(v.value1)(v1.value0));
          };
        },
        mod: function(v) {
          return function(v1) {
            return zero(semiringRatio(dictOrd)(dictEuclideanRing));
          };
        },
        CommutativeRing0: function() {
          return commutativeRingRatio(dictOrd)(dictEuclideanRing);
        }
      };
    };
  };

  // output/KaTeX/foreign.js
  var inline = function(content3) {
    return function() {
      return katex.renderToString(content3);
    };
  };

  // output/Article/index.js
  var validateInput = function(inp) {
    return bind(bindMaybe)(bind(bindMaybe)(inp)(fromString))(function(x) {
      var $5 = isNaNImpl(x);
      if ($5) {
        return Nothing.value;
      }
      ;
      return new Just(round2(x));
    });
  };
  var put3 = function(dictFunctor) {
    return function(dictMonadState) {
      return function(x) {
        return $$void(dictFunctor)(modify(dictMonadState)(flip(snoc3)(x)));
      };
    };
  };
  var section = function(str) {
    return put3(functorStateT(functorIdentity))(monadStateStateT(monadIdentity))(h2(widgetMultiAlternative(monoidArray))(widgetShiftMap)([])([text(widgetLiftWidget)(str)]));
  };
  var setTitle = function(str) {
    return put3(functorStateT(functorIdentity))(monadStateStateT(monadIdentity))(h1(widgetMultiAlternative(monoidArray))(widgetShiftMap)([])([text(widgetLiftWidget)(str)]));
  };
  var t = function(str) {
    return put3(functorStateT(functorIdentity))(monadStateStateT(monadIdentity))(label$prime(widgetMultiAlternative(monoidArray))(widgetShiftMap)([text(widgetLiftWidget)(str)]));
  };
  var nl = /* @__PURE__ */ put3(/* @__PURE__ */ functorStateT(functorIdentity))(/* @__PURE__ */ monadStateStateT(monadIdentity))(/* @__PURE__ */ br(/* @__PURE__ */ widgetMultiAlternative(monoidArray))(widgetShiftMap)([])([]));
  var mImpl = function(str) {
    return bind(widgetBind)(liftEffect(widgetMonadEff(monoidArray))(inline(str)))(function(ktx) {
      return label(widgetMultiAlternative(monoidArray))(widgetShiftMap)([dangerouslySetInnerHTML(ktx)])([]);
    });
  };
  var m = function(str) {
    return put3(functorStateT(functorIdentity))(monadStateStateT(monadIdentity))(mImpl(str));
  };
  var get2 = function(dictMonadState) {
    return get(dictMonadState);
  };
  var fromIncremental = function(seq) {
    return fst(runState(seq)([]));
  };

  // output/Control.Cofree/index.js
  var tail2 = function(v) {
    return snd(force(v));
  };
  var mkCofree = function(a) {
    return function(t2) {
      return defer2(function(v) {
        return new Tuple(a, t2);
      });
    };
  };
  var head3 = function(v) {
    return fst(force(v));
  };
  var functorCofree = function(dictFunctor) {
    return {
      map: function(f) {
        var loop2 = function(v) {
          return map(functorLazy)(function(v1) {
            return new Tuple(f(v1.value0), map(dictFunctor)(loop2)(v1.value1));
          })(v);
        };
        return loop2;
      }
    };
  };
  var monadCofree = function(dictAlternative) {
    return {
      Applicative0: function() {
        return applicativeCofree(dictAlternative);
      },
      Bind1: function() {
        return bindCofree(dictAlternative);
      }
    };
  };
  var bindCofree = function(dictAlternative) {
    return {
      bind: function(sa$prime) {
        return function(f) {
          var go$prime = function(sa) {
            return function(sb) {
              var msplit = map(dictAlternative.Plus1().Alt0().Functor0())(go$prime(sa))(tail2(sb));
              var mrestart = map(dictAlternative.Plus1().Alt0().Functor0())(go2)(tail2(sa));
              return mkCofree(head3(sb))(alt(dictAlternative.Plus1().Alt0())(mrestart)(msplit));
            };
          };
          var go2 = function(sa) {
            return go$prime(sa)(f(head3(sa)));
          };
          return go2(sa$prime);
        };
      },
      Apply0: function() {
        return applyCofree(dictAlternative);
      }
    };
  };
  var applyCofree = function(dictAlternative) {
    return {
      apply: ap(monadCofree(dictAlternative)),
      Functor0: function() {
        return functorCofree(dictAlternative.Plus1().Alt0().Functor0());
      }
    };
  };
  var applicativeCofree = function(dictAlternative) {
    return {
      pure: function(a) {
        return mkCofree(a)(empty(dictAlternative.Plus1()));
      },
      Apply0: function() {
        return applyCofree(dictAlternative);
      }
    };
  };

  // output/Concur.Core.FRP/index.js
  var update = tail2;
  var step4 = mkCofree;
  var dyn = function(dictMonad) {
    return function(s) {
      return bind(dictMonad.Bind1())(update(s))(dyn(dictMonad));
    };
  };
  var display2 = function(w) {
    return step4(unit)(w);
  };
  var debounce = function(dictMonad) {
    return function(dictAlt) {
      return function(dictMonadAff) {
        return function(timeoutMs) {
          return function(ainit) {
            return function(winit) {
              var go$prime = function(a) {
                return function(w) {
                  return bind(dictMonad.Bind1())(alt(dictAlt)(map(dictAlt.Functor0())(Just.create)(w(a)))(voidRight(dictAlt.Functor0())(Nothing.value)(liftAff(dictMonadAff)(delay(timeoutMs)))))(function(res) {
                    if (res instanceof Nothing) {
                      return pure(dictMonad.Applicative0())(go2(a)(w));
                    }
                    ;
                    if (res instanceof Just) {
                      return go$prime(res.value0)(w);
                    }
                    ;
                    throw new Error("Failed pattern match at Concur.Core.FRP (line 214, column 7 - line 218, column 28): " + [res.constructor.name]);
                  });
                };
              };
              var go2 = function(a) {
                return function(w) {
                  return step4(a)(bind(dictMonad.Bind1())(w(a))(function(a$prime) {
                    return go$prime(a$prime)(w);
                  }));
                };
              };
              return go2(ainit)(winit);
            };
          };
        };
      };
    };
  };

  // output/Concur.Core.Discharge/index.js
  var dischargePartialEffect = function(dictMonoid) {
    return function(w) {
      var v = resume(functorWidgetStep)(unWidget(w));
      if (v instanceof Right) {
        return pure(applicativeEffect)(new Tuple(w, mempty(dictMonoid)));
      }
      ;
      if (v instanceof Left && v.value0 instanceof WidgetStepEff) {
        return function __do() {
          var w$prime = v.value0.value0();
          return dischargePartialEffect(dictMonoid)(w$prime)();
        };
      }
      ;
      if (v instanceof Left && v.value0 instanceof WidgetStepView) {
        return pure(applicativeEffect)(new Tuple(wrap2(new WidgetStepView(v.value0.value0)), v.value0.value0.view));
      }
      ;
      throw new Error("Failed pattern match at Concur.Core.Discharge (line 40, column 28 - line 45, column 87): " + [v.constructor.name]);
    };
  };
  var discharge = function(dictMonoid) {
    return function(handler) {
      return function(v) {
        var v1 = resume(functorWidgetStep)(v);
        if (v1 instanceof Right) {
          return pure(applicativeEffect)(mempty(dictMonoid));
        }
        ;
        if (v1 instanceof Left && v1.value0 instanceof WidgetStepEff) {
          return function __do() {
            var w$prime = v1.value0.value0();
            return discharge(dictMonoid)(handler)(w$prime)();
          };
        }
        ;
        if (v1 instanceof Left && v1.value0 instanceof WidgetStepView) {
          return function __do() {
            runAff_(function() {
              var $19 = map(functorEither)(Widget);
              return function($20) {
                return handler($19($20));
              };
            }())(v1.value0.value0.cont)();
            return v1.value0.value0.view;
          };
        }
        ;
        throw new Error("Failed pattern match at Concur.Core.Discharge (line 24, column 32 - line 31, column 19): " + [v1.constructor.name]);
      };
    };
  };

  // output/Effect.Class.Console/index.js
  var log3 = function(dictMonadEffect) {
    var $33 = liftEffect(dictMonadEffect);
    return function($34) {
      return $33(log($34));
    };
  };

  // output/Web.HTML/foreign.js
  var windowImpl = function() {
    return window;
  };

  // output/Web.HTML.HTMLDocument/foreign.js
  function _readyState(doc) {
    return function() {
      return doc.readyState;
    };
  }

  // output/Web.HTML.HTMLDocument.ReadyState/index.js
  var Loading = /* @__PURE__ */ function() {
    function Loading2() {
    }
    ;
    Loading2.value = new Loading2();
    return Loading2;
  }();
  var Interactive = /* @__PURE__ */ function() {
    function Interactive2() {
    }
    ;
    Interactive2.value = new Interactive2();
    return Interactive2;
  }();
  var Complete = /* @__PURE__ */ function() {
    function Complete2() {
    }
    ;
    Complete2.value = new Complete2();
    return Complete2;
  }();
  var parse = function(v) {
    if (v === "loading") {
      return new Just(Loading.value);
    }
    ;
    if (v === "interactive") {
      return new Just(Interactive.value);
    }
    ;
    if (v === "complete") {
      return new Just(Complete.value);
    }
    ;
    return Nothing.value;
  };

  // output/Web.HTML.HTMLDocument/index.js
  var toParentNode = unsafeCoerce2;
  var toDocument = unsafeCoerce2;
  var readyState = /* @__PURE__ */ function() {
    var $0 = map(functorEffect)(function() {
      var $2 = fromMaybe(Loading.value);
      return function($3) {
        return $2(parse($3));
      };
    }());
    return function($1) {
      return $0(_readyState($1));
    };
  }();

  // output/Web.HTML.HTMLElement/foreign.js
  function _read(nothing, just, value12) {
    var tag = Object.prototype.toString.call(value12);
    if (tag.indexOf("[object HTML") === 0 && tag.indexOf("Element]") === tag.length - 8) {
      return just(value12);
    } else {
      return nothing;
    }
  }

  // output/Web.HTML.HTMLElement/index.js
  var toNode2 = unsafeCoerce2;
  var fromElement2 = function(x) {
    return _read(Nothing.value, Just.create, x);
  };

  // output/Web.HTML.Window/foreign.js
  function document(window2) {
    return function() {
      return window2.document;
    };
  }

  // output/Web.HTML.Window/index.js
  var toEventTarget = unsafeCoerce2;

  // output/Web.HTML.Event.EventTypes/index.js
  var domcontentloaded = "DOMContentLoaded";

  // output/Concur.VDom.Run/index.js
  var selectElement = function(query2) {
    return bind(bindAff)(liftEffect(monadEffectAff)(bindFlipped(bindEffect)(composeKleisliFlipped(bindEffect)(function() {
      var $12 = querySelector(query2);
      return function($13) {
        return $12(toParentNode($13));
      };
    }())(document))(windowImpl)))(function(mel) {
      return pure(applicativeAff)(bindFlipped(bindMaybe)(fromElement2)(mel));
    });
  };
  var runAffX = /* @__PURE__ */ runAff_(/* @__PURE__ */ either(throwException)(/* @__PURE__ */ $$const(/* @__PURE__ */ pure(applicativeEffect)(unit))));
  var renderComponent = function(spec) {
    return function(parent2) {
      return function(winit) {
        var render = function(v) {
          return unHTMLNode(nodeBuilder("div")([])(v));
        };
        var handler = function(ref) {
          var go2 = function(v) {
            if (v instanceof Left) {
              return log3(monadEffectEffect)("FAILED! " + show(showError)(v.value0));
            }
            ;
            if (v instanceof Right) {
              return function __do() {
                var machine = read(ref)();
                var v1 = discharge(monoidArray)(handler(ref))(v.value0)();
                var res = step(machine, render(v1));
                return write(res)(ref)();
              };
            }
            ;
            throw new Error("Failed pattern match at Concur.VDom.Run (line 75, column 9 - line 75, column 53): " + [v.constructor.name]);
          };
          return go2;
        };
        return function __do() {
          var v = dischargePartialEffect(monoidArray)(winit)();
          var initMachine = buildVDom(spec)(render(v.value1));
          appendChild(extract2(initMachine))(parent2)();
          var ref = $$new(initMachine)();
          return handler(ref)(new Right(v.value0))();
        };
      };
    };
  };
  var mkSpec = function(document2) {
    return {
      buildWidget: buildThunk(unHTMLNode),
      buildAttributes: buildProp,
      document: document2
    };
  };
  var awaitLoad = /* @__PURE__ */ makeAff(function(callback) {
    return function __do() {
      var rs = bindFlipped(bindEffect)(readyState)(bindFlipped(bindEffect)(document)(windowImpl))();
      if (rs instanceof Loading) {
        var et = map(functorEffect)(toEventTarget)(windowImpl)();
        var listener = eventListener(function(v) {
          return callback(new Right(unit));
        })();
        addEventListener2(domcontentloaded)(listener)(false)(et)();
        return effectCanceler(removeEventListener2(domcontentloaded)(listener)(false)(et));
      }
      ;
      callback(new Right(unit))();
      return nonCanceler;
    };
  });
  var renderWidgetInto = function(query2) {
    return function(w) {
      return runAffX(discard(discardUnit)(bindAff)(awaitLoad)(function() {
        return bind(bindAff)(liftEffect(monadEffectAff)(bindFlipped(bindEffect)(document)(windowImpl)))(function(doc) {
          return bind(bindAff)(selectElement(query2))(function(mroot) {
            if (mroot instanceof Nothing) {
              return pure(applicativeAff)(unit);
            }
            ;
            if (mroot instanceof Just) {
              return $$void(functorAff)(liftEffect(monadEffectAff)(renderComponent(mkSpec(toDocument(doc)))(toNode2(mroot.value0))(w)));
            }
            ;
            throw new Error("Failed pattern match at Concur.VDom.Run (line 50, column 3 - line 52, column 120): " + [mroot.constructor.name]);
          });
        });
      }));
    };
  };
  var runWidgetInSelector = function(elemId) {
    return renderWidgetInto(elemId);
  };
  var runWidgetInDom = function(elemId) {
    return runWidgetInSelector("#" + elemId);
  };

  // output/Rand/index.js
  var middle2 = function(nn) {
    var n3$prime = mod(euclideanRingInt)(nn)(1e6);
    var n3 = nn - (div(euclideanRingInt)(nn - n3$prime | 0)(1e6) * 1e6 | 0) | 0;
    var n0 = mod(euclideanRingInt)(nn)(100);
    return div(euclideanRingInt)(n3 - n0 | 0)(100);
  };
  var rand = function(v) {
    return {
      val: middle2(mod(euclideanRingInt)((v.val * v.val | 0) + v.gen | 0)(1e8)),
      gen: mod(euclideanRingInt)(v.gen + v.seed | 0)(1e8),
      seed: v.seed
    };
  };
  var consume = function(v) {
    return function(r) {
      if (v === 0) {
        return r;
      }
      ;
      return rand(consume(v - 1 | 0)(r));
    };
  };

  // output/Exercise1/index.js
  var showSeq = function(v) {
    return function() {
      if (v.a === -1) {
        return "-n";
      }
      ;
      if (v.a === 1) {
        return "n";
      }
      ;
      return show(showInt)(v.a) + "n";
    }() + function() {
      var $4 = v.b < 0;
      if ($4) {
        return show(showInt)(v.b);
      }
      ;
      return "+" + show(showInt)(v.b);
    }();
  };
  var majorant = 10;
  var randomInteger = function(r) {
    var rsign = rand(r);
    var sign2 = (2 * mod(euclideanRingInt)(rsign.val)(2) | 0) - 1 | 0;
    var ri = rand(rsign);
    var i = mod(euclideanRingInt)(ri.val)(majorant);
    return sign2 * i | 0;
  };
  var randomParam = function($copy_r) {
    var $tco_done = false;
    var $tco_result;
    function $tco_loop(r) {
      var ra = rand(r);
      var rb = rand(ra);
      var b2 = randomInteger(rb);
      var a = randomInteger(ra);
      var ok = a !== 1 && (a !== 0 && b2 !== 0);
      if (ok) {
        $tco_done = true;
        return {
          a,
          b: b2
        };
      }
      ;
      $copy_r = rb;
      return;
    }
    ;
    while (!$tco_done) {
      $tco_result = $tco_loop($copy_r);
    }
    ;
    return $tco_result;
  };
  var exo1 = function(mode) {
    return function(r0) {
      return discard(discardUnit)(bindStateT(monadIdentity))(section("Exercice 1"))(function() {
        return discard(discardUnit)(bindStateT(monadIdentity))(t("Soit "))(function() {
          return discard(discardUnit)(bindStateT(monadIdentity))(m("(u_n)"))(function() {
            return discard(discardUnit)(bindStateT(monadIdentity))(t(" la suite d\xE9finie sur "))(function() {
              return discard(discardUnit)(bindStateT(monadIdentity))(m("\\mathbb{N}"))(function() {
                return discard(discardUnit)(bindStateT(monadIdentity))(t(" par "))(function() {
                  var v = randomParam(r0);
                  return discard(discardUnit)(bindStateT(monadIdentity))(m("u_n = " + showSeq({
                    a: v.a,
                    b: v.b
                  })))(function() {
                    return discard(discardUnit)(bindStateT(monadIdentity))(t("."))(function() {
                      return discard(discardUnit)(bindStateT(monadIdentity))(nl)(function() {
                        return discard(discardUnit)(bindStateT(monadIdentity))(nl)(function() {
                          return discard(discardUnit)(bindStateT(monadIdentity))(put3(functorStateT(functorIdentity))(monadStateStateT(monadIdentity))(div2(widgetMultiAlternative(monoidArray))(widgetShiftMap)([attr("style")("display: grid; grid-template-columns: 1fr 1fr 1fr 1fr;")])([label(widgetMultiAlternative(monoidArray))(widgetShiftMap)([])(fromIncremental(discard(discardUnit)(bindStateT(monadIdentity))(m("u_0="))(function() {
                            return get2(monadStateStateT(monadIdentity));
                          }))), label(widgetMultiAlternative(monoidArray))(widgetShiftMap)([])(fromIncremental(discard(discardUnit)(bindStateT(monadIdentity))(m("u_1="))(function() {
                            return get2(monadStateStateT(monadIdentity));
                          }))), label(widgetMultiAlternative(monoidArray))(widgetShiftMap)([])(fromIncremental(discard(discardUnit)(bindStateT(monadIdentity))(m("u_2="))(function() {
                            return get2(monadStateStateT(monadIdentity));
                          }))), label(widgetMultiAlternative(monoidArray))(widgetShiftMap)([])(fromIncremental(discard(discardUnit)(bindStateT(monadIdentity))(m("u_3="))(function() {
                            return get2(monadStateStateT(monadIdentity));
                          })))])))(function() {
                            if (mode) {
                              return discard(discardUnit)(bindStateT(monadIdentity))(nl)(function() {
                                return discard(discardUnit)(bindStateT(monadIdentity))(t("r\xE9ponse: "))(function() {
                                  return t(show(showArray(showInt))([v.b, v.a + v.b | 0, (2 * v.a | 0) + v.b | 0, (3 * v.a | 0) + v.b | 0]));
                                });
                              });
                            }
                            ;
                            return pure(applicativeStateT(monadIdentity))(mempty(monoidUnit));
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    };
  };

  // output/Exercise2/index.js
  var showSeq2 = function(v) {
    return function() {
      if (v.a === -1) {
        return "-v_n";
      }
      ;
      if (v.a === 1) {
        return "v_n";
      }
      ;
      return show(showInt)(v.a) + "v_n";
    }() + function() {
      var $4 = v.b < 0;
      if ($4) {
        return show(showInt)(v.b);
      }
      ;
      return "+" + show(showInt)(v.b);
    }();
  };
  var majorant2 = 10;
  var randomInteger2 = function(r) {
    var rsign = rand(r);
    var sign2 = (2 * mod(euclideanRingInt)(rsign.val)(2) | 0) - 1 | 0;
    var ri = rand(rsign);
    var i = mod(euclideanRingInt)(ri.val)(majorant2);
    return sign2 * i | 0;
  };
  var randomParam2 = function($copy_r) {
    var $tco_done = false;
    var $tco_result;
    function $tco_loop(r) {
      var ra = rand(r);
      var rb = rand(ra);
      var rc = rand(rb);
      var c = randomInteger2(rc);
      var b2 = randomInteger2(rb);
      var a = randomInteger2(ra);
      var ok = c !== 0 && (a !== 1 && (a !== 0 && b2 !== 0));
      if (ok) {
        $tco_done = true;
        return {
          a,
          b: b2,
          c
        };
      }
      ;
      $copy_r = rc;
      return;
    }
    ;
    while (!$tco_done) {
      $tco_result = $tco_loop($copy_r);
    }
    ;
    return $tco_result;
  };
  var exo2 = function(mode) {
    return function(r0) {
      return discard(discardUnit)(bindStateT(monadIdentity))(section("Exercice 2"))(function() {
        return discard(discardUnit)(bindStateT(monadIdentity))(t("Soit "))(function() {
          return discard(discardUnit)(bindStateT(monadIdentity))(m("(v_n)"))(function() {
            return discard(discardUnit)(bindStateT(monadIdentity))(t(" la suite d\xE9finie sur "))(function() {
              return discard(discardUnit)(bindStateT(monadIdentity))(m("\\mathbb{N}"))(function() {
                return discard(discardUnit)(bindStateT(monadIdentity))(t(" par "))(function() {
                  var v = randomParam2(r0);
                  return discard(discardUnit)(bindStateT(monadIdentity))(m("\\left\\{\\begin{array}{l}v_0=" + (show(showInt)(v.c) + ("\\\\" + ("v_{n+1}=" + (showSeq2({
                    a: v.a,
                    b: v.b,
                    c: v.c
                  }) + "\\end{array}\\right."))))))(function() {
                    return discard(discardUnit)(bindStateT(monadIdentity))(t("."))(function() {
                      return discard(discardUnit)(bindStateT(monadIdentity))(nl)(function() {
                        return discard(discardUnit)(bindStateT(monadIdentity))(nl)(function() {
                          return discard(discardUnit)(bindStateT(monadIdentity))(put3(functorStateT(functorIdentity))(monadStateStateT(monadIdentity))(div2(widgetMultiAlternative(monoidArray))(widgetShiftMap)([attr("style")("display: grid; grid-template-columns: 1fr 1fr 1fr 1fr;")])([label(widgetMultiAlternative(monoidArray))(widgetShiftMap)([])(fromIncremental(discard(discardUnit)(bindStateT(monadIdentity))(m("v_0="))(function() {
                            return get2(monadStateStateT(monadIdentity));
                          }))), label(widgetMultiAlternative(monoidArray))(widgetShiftMap)([])(fromIncremental(discard(discardUnit)(bindStateT(monadIdentity))(m("v_1="))(function() {
                            return get2(monadStateStateT(monadIdentity));
                          }))), label(widgetMultiAlternative(monoidArray))(widgetShiftMap)([])(fromIncremental(discard(discardUnit)(bindStateT(monadIdentity))(m("v_2="))(function() {
                            return get2(monadStateStateT(monadIdentity));
                          }))), label(widgetMultiAlternative(monoidArray))(widgetShiftMap)([])(fromIncremental(discard(discardUnit)(bindStateT(monadIdentity))(m("v_3="))(function() {
                            return get2(monadStateStateT(monadIdentity));
                          })))])))(function() {
                            if (mode) {
                              return discard(discardUnit)(bindStateT(monadIdentity))(nl)(function() {
                                return discard(discardUnit)(bindStateT(monadIdentity))(t("r\xE9ponse: "))(function() {
                                  return t(show(showArray(showInt))([v.c, (v.a * v.c | 0) + v.b | 0, (v.a * ((v.a * v.c | 0) + v.b | 0) | 0) + v.b | 0, (v.a * ((v.a * ((v.a * v.c | 0) + v.b | 0) | 0) + v.b | 0) | 0) + v.b | 0]));
                                });
                              });
                            }
                            ;
                            return pure(applicativeStateT(monadIdentity))(mempty(monoidUnit));
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    };
  };

  // output/Data.Rational/index.js
  var fromInt = function(i) {
    return reduce(ordInt)(euclideanRingInt)(i)(1);
  };

  // output/Exercise3/index.js
  var showSeq3 = function(v) {
    return function() {
      if (v.a === -1) {
        return "-n";
      }
      ;
      if (v.a === 1) {
        return "n";
      }
      ;
      return show(showInt)(v.a) + "n";
    }() + function() {
      var $4 = v.b < 0;
      if ($4) {
        return "-" + ("\\dfrac{" + (show(showInt)(-v.b | 0) + ("}{n+" + (show(showInt)(v.c) + "}"))));
      }
      ;
      return "+" + ("\\dfrac{" + (show(showInt)(v.b) + ("}{n+" + (show(showInt)(v.c) + "}"))));
    }();
  };
  var rshow = function(r) {
    var n = numerator(r);
    var d = denominator(r);
    var $8 = d === 1;
    if ($8) {
      return show(showInt)(n);
    }
    ;
    return "\\frac{" + (show(showInt)(n) + ("}{" + (show(showInt)(d) + "}")));
  };
  var majorant3 = 10;
  var randomInteger3 = function(r) {
    var rsign = rand(r);
    var sign2 = (2 * mod(euclideanRingInt)(rsign.val)(2) | 0) - 1 | 0;
    var ri = rand(rsign);
    var i = mod(euclideanRingInt)(ri.val)(majorant3);
    return sign2 * i | 0;
  };
  var randomPositive = function(r) {
    var ri = rand(r);
    var i = mod(euclideanRingInt)(ri.val)(majorant3);
    return i;
  };
  var randomParam3 = function($copy_r) {
    var $tco_done = false;
    var $tco_result;
    function $tco_loop(r) {
      var ra = rand(r);
      var rb = rand(ra);
      var rc = rand(rb);
      var c = randomPositive(rc);
      var b2 = randomInteger3(rb);
      var a = randomInteger3(ra);
      var ok = a !== 0 && (b2 !== 0 && c !== 0);
      if (ok) {
        $tco_done = true;
        return {
          a,
          b: b2,
          c
        };
      }
      ;
      $copy_r = rc;
      return;
    }
    ;
    while (!$tco_done) {
      $tco_result = $tco_loop($copy_r);
    }
    ;
    return $tco_result;
  };
  var exo3 = function(mode) {
    return function(r0) {
      return discard(discardUnit)(bindStateT(monadIdentity))(section("Exercice 3"))(function() {
        return discard(discardUnit)(bindStateT(monadIdentity))(t("Soit "))(function() {
          return discard(discardUnit)(bindStateT(monadIdentity))(m("(w_n)"))(function() {
            return discard(discardUnit)(bindStateT(monadIdentity))(t(" la suite d\xE9finie sur "))(function() {
              return discard(discardUnit)(bindStateT(monadIdentity))(m("\\mathbb{N}"))(function() {
                return discard(discardUnit)(bindStateT(monadIdentity))(t(" par "))(function() {
                  var v = randomParam3(r0);
                  return discard(discardUnit)(bindStateT(monadIdentity))(m("w_n = " + showSeq3({
                    a: v.a,
                    b: v.b,
                    c: v.c
                  })))(function() {
                    return discard(discardUnit)(bindStateT(monadIdentity))(t("."))(function() {
                      return discard(discardUnit)(bindStateT(monadIdentity))(nl)(function() {
                        return discard(discardUnit)(bindStateT(monadIdentity))(nl)(function() {
                          return discard(discardUnit)(bindStateT(monadIdentity))(put3(functorStateT(functorIdentity))(monadStateStateT(monadIdentity))(div2(widgetMultiAlternative(monoidArray))(widgetShiftMap)([attr("style")("display: grid; grid-template-columns: 1fr 1fr 1fr 1fr;")])([label(widgetMultiAlternative(monoidArray))(widgetShiftMap)([])(fromIncremental(discard(discardUnit)(bindStateT(monadIdentity))(m("w_0="))(function() {
                            return get2(monadStateStateT(monadIdentity));
                          }))), label(widgetMultiAlternative(monoidArray))(widgetShiftMap)([])(fromIncremental(discard(discardUnit)(bindStateT(monadIdentity))(m("w_1="))(function() {
                            return get2(monadStateStateT(monadIdentity));
                          }))), label(widgetMultiAlternative(monoidArray))(widgetShiftMap)([])(fromIncremental(discard(discardUnit)(bindStateT(monadIdentity))(m("w_2="))(function() {
                            return get2(monadStateStateT(monadIdentity));
                          }))), label(widgetMultiAlternative(monoidArray))(widgetShiftMap)([])(fromIncremental(discard(discardUnit)(bindStateT(monadIdentity))(m("w_3="))(function() {
                            return get2(monadStateStateT(monadIdentity));
                          })))])))(function() {
                            if (mode) {
                              return discard(discardUnit)(bindStateT(monadIdentity))(nl)(function() {
                                return discard(discardUnit)(bindStateT(monadIdentity))(t("r\xE9ponse: "))(function() {
                                  return discard(discardUnit)(bindStateT(monadIdentity))(m("[" + (rshow(div(euclideanRingRatio(ordInt)(euclideanRingInt))(fromInt(v.b))(fromInt(v.c))) + ("," + (rshow(add(semiringRatio(ordInt)(euclideanRingInt))(fromInt(v.a))(div(euclideanRingRatio(ordInt)(euclideanRingInt))(fromInt(v.b))(fromInt(1 + v.c | 0)))) + ("," + (rshow(add(semiringRatio(ordInt)(euclideanRingInt))(fromInt(2 * v.a | 0))(div(euclideanRingRatio(ordInt)(euclideanRingInt))(fromInt(v.b))(fromInt(2 + v.c | 0)))) + ("," + (rshow(add(semiringRatio(ordInt)(euclideanRingInt))(fromInt(3 * v.a | 0))(div(euclideanRingRatio(ordInt)(euclideanRingInt))(fromInt(v.b))(fromInt(3 + v.c | 0)))) + "]")))))))))(function() {
                                    return t("");
                                  });
                                });
                              });
                            }
                            ;
                            return pure(applicativeStateT(monadIdentity))(mempty(monoidUnit));
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    };
  };

  // output/Exercise4/index.js
  var showSeq4 = function(v) {
    return "\\dfrac{1}{1-s_n}";
  };
  var rshow2 = function(r) {
    var n = numerator(r);
    var d = denominator(r);
    var $4 = d === 1;
    if ($4) {
      return show(showInt)(n);
    }
    ;
    return "\\frac{" + (show(showInt)(n) + ("}{" + (show(showInt)(d) + "}")));
  };
  var majorant4 = 10;
  var randomInteger4 = function(r) {
    var rsign = rand(r);
    var sign2 = (2 * mod(euclideanRingInt)(rsign.val)(2) | 0) - 1 | 0;
    var ri = rand(rsign);
    var i = mod(euclideanRingInt)(ri.val)(majorant4);
    return sign2 * i | 0;
  };
  var randomParam4 = function($copy_r) {
    var $tco_done = false;
    var $tco_result;
    function $tco_loop(r) {
      var ra = rand(r);
      var a = randomInteger4(ra);
      var ok = a !== 1 && a !== 0;
      if (ok) {
        $tco_done = true;
        return {
          a
        };
      }
      ;
      $copy_r = ra;
      return;
    }
    ;
    while (!$tco_done) {
      $tco_result = $tco_loop($copy_r);
    }
    ;
    return $tco_result;
  };
  var exo4 = function(mode) {
    return function(r0) {
      return discard(discardUnit)(bindStateT(monadIdentity))(section("Exercice 4"))(function() {
        return discard(discardUnit)(bindStateT(monadIdentity))(t("Soit "))(function() {
          return discard(discardUnit)(bindStateT(monadIdentity))(m("(s_n)"))(function() {
            return discard(discardUnit)(bindStateT(monadIdentity))(t(" la suite d\xE9finie sur "))(function() {
              return discard(discardUnit)(bindStateT(monadIdentity))(m("\\mathbb{N}"))(function() {
                return discard(discardUnit)(bindStateT(monadIdentity))(t(" par "))(function() {
                  var v = randomParam4(r0);
                  return discard(discardUnit)(bindStateT(monadIdentity))(m("\\left\\{\\begin{array}{l}s_0=" + (show(showInt)(v.a) + ("\\\\" + ("s_{n+1}=" + (showSeq4({
                    a: v.a
                  }) + "\\end{array}\\right."))))))(function() {
                    return discard(discardUnit)(bindStateT(monadIdentity))(t("."))(function() {
                      return discard(discardUnit)(bindStateT(monadIdentity))(nl)(function() {
                        return discard(discardUnit)(bindStateT(monadIdentity))(nl)(function() {
                          return discard(discardUnit)(bindStateT(monadIdentity))(put3(functorStateT(functorIdentity))(monadStateStateT(monadIdentity))(div2(widgetMultiAlternative(monoidArray))(widgetShiftMap)([attr("style")("display: grid; grid-template-columns: 1fr 1fr 1fr 1fr;")])([label(widgetMultiAlternative(monoidArray))(widgetShiftMap)([])(fromIncremental(discard(discardUnit)(bindStateT(monadIdentity))(m("s_0="))(function() {
                            return get2(monadStateStateT(monadIdentity));
                          }))), label(widgetMultiAlternative(monoidArray))(widgetShiftMap)([])(fromIncremental(discard(discardUnit)(bindStateT(monadIdentity))(m("s_1="))(function() {
                            return get2(monadStateStateT(monadIdentity));
                          }))), label(widgetMultiAlternative(monoidArray))(widgetShiftMap)([])(fromIncremental(discard(discardUnit)(bindStateT(monadIdentity))(m("s_2="))(function() {
                            return get2(monadStateStateT(monadIdentity));
                          }))), label(widgetMultiAlternative(monoidArray))(widgetShiftMap)([])(fromIncremental(discard(discardUnit)(bindStateT(monadIdentity))(m("s_3="))(function() {
                            return get2(monadStateStateT(monadIdentity));
                          })))])))(function() {
                            if (mode) {
                              return discard(discardUnit)(bindStateT(monadIdentity))(nl)(function() {
                                return discard(discardUnit)(bindStateT(monadIdentity))(t("r\xE9ponse: "))(function() {
                                  return discard(discardUnit)(bindStateT(monadIdentity))(m("[" + (rshow2(fromInt(v.a)) + ("," + (rshow2(div(euclideanRingRatio(ordInt)(euclideanRingInt))(fromInt(1))(fromInt(1 - v.a | 0))) + ("," + (rshow2(div(euclideanRingRatio(ordInt)(euclideanRingInt))(fromInt(v.a - 1 | 0))(fromInt(v.a))) + ("," + (rshow2(fromInt(v.a)) + "]")))))))))(function() {
                                    return t("");
                                  });
                                });
                              });
                            }
                            ;
                            return pure(applicativeStateT(monadIdentity))(mempty(monoidUnit));
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    };
  };

  // output/Exercise5/index.js
  var showSeq5 = function(v) {
    if (v.a === -1) {
      return "-n^2-t_n";
    }
    ;
    if (v.a === 1) {
      return "n^2-t_n";
    }
    ;
    return show(showInt)(v.a) + "n^2-t_n";
  };
  var majorant5 = 10;
  var randomInteger5 = function(r) {
    var rsign = rand(r);
    var sign2 = (2 * mod(euclideanRingInt)(rsign.val)(2) | 0) - 1 | 0;
    var ri = rand(rsign);
    var i = mod(euclideanRingInt)(ri.val)(majorant5);
    return sign2 * i | 0;
  };
  var randomParam5 = function($copy_r) {
    var $tco_done = false;
    var $tco_result;
    function $tco_loop(r) {
      var ra = rand(r);
      var rb = rand(ra);
      var b2 = randomInteger5(rb);
      var a = randomInteger5(ra);
      var ok = a !== 1 && (a !== 0 && b2 !== 0);
      if (ok) {
        $tco_done = true;
        return {
          a,
          b: b2
        };
      }
      ;
      $copy_r = rb;
      return;
    }
    ;
    while (!$tco_done) {
      $tco_result = $tco_loop($copy_r);
    }
    ;
    return $tco_result;
  };
  var exo5 = function(mode) {
    return function(r0) {
      return discard(discardUnit)(bindStateT(monadIdentity))(section("Exercice 5"))(function() {
        return discard(discardUnit)(bindStateT(monadIdentity))(t("Soit "))(function() {
          return discard(discardUnit)(bindStateT(monadIdentity))(m("(t_n)"))(function() {
            return discard(discardUnit)(bindStateT(monadIdentity))(t(" la suite d\xE9finie sur "))(function() {
              return discard(discardUnit)(bindStateT(monadIdentity))(m("\\mathbb{N}"))(function() {
                return discard(discardUnit)(bindStateT(monadIdentity))(t(" par "))(function() {
                  var v = randomParam5(r0);
                  return discard(discardUnit)(bindStateT(monadIdentity))(m("\\left\\{\\begin{array}{l}t_0=" + (show(showInt)(v.b) + ("\\\\" + ("t_{n+1}=" + (showSeq5({
                    a: v.a,
                    b: v.b
                  }) + "\\end{array}\\right."))))))(function() {
                    return discard(discardUnit)(bindStateT(monadIdentity))(t("."))(function() {
                      return discard(discardUnit)(bindStateT(monadIdentity))(nl)(function() {
                        return discard(discardUnit)(bindStateT(monadIdentity))(nl)(function() {
                          return discard(discardUnit)(bindStateT(monadIdentity))(put3(functorStateT(functorIdentity))(monadStateStateT(monadIdentity))(div2(widgetMultiAlternative(monoidArray))(widgetShiftMap)([attr("style")("display: grid; grid-template-columns: 1fr 1fr 1fr 1fr;")])([label(widgetMultiAlternative(monoidArray))(widgetShiftMap)([])(fromIncremental(discard(discardUnit)(bindStateT(monadIdentity))(m("t_0="))(function() {
                            return get2(monadStateStateT(monadIdentity));
                          }))), label(widgetMultiAlternative(monoidArray))(widgetShiftMap)([])(fromIncremental(discard(discardUnit)(bindStateT(monadIdentity))(m("t_1="))(function() {
                            return get2(monadStateStateT(monadIdentity));
                          }))), label(widgetMultiAlternative(monoidArray))(widgetShiftMap)([])(fromIncremental(discard(discardUnit)(bindStateT(monadIdentity))(m("t_2="))(function() {
                            return get2(monadStateStateT(monadIdentity));
                          }))), label(widgetMultiAlternative(monoidArray))(widgetShiftMap)([])(fromIncremental(discard(discardUnit)(bindStateT(monadIdentity))(m("t_3="))(function() {
                            return get2(monadStateStateT(monadIdentity));
                          })))])))(function() {
                            if (mode) {
                              return discard(discardUnit)(bindStateT(monadIdentity))(nl)(function() {
                                return discard(discardUnit)(bindStateT(monadIdentity))(t("r\xE9ponse: "))(function() {
                                  return t(show(showArray(showInt))([v.b, -v.b | 0, v.a + v.b | 0, (3 * v.a | 0) - v.b | 0]));
                                });
                              });
                            }
                            ;
                            return pure(applicativeStateT(monadIdentity))(mempty(monoidUnit));
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    };
  };

  // output/Main/index.js
  var initialState = /* @__PURE__ */ function() {
    return {
      seed: Nothing.value,
      enabled: false
    };
  }();
  var header = /* @__PURE__ */ div$prime(/* @__PURE__ */ widgetMultiAlternative(monoidArray))(widgetShiftMap)(/* @__PURE__ */ fromIncremental(/* @__PURE__ */ discard(discardUnit)(/* @__PURE__ */ bindStateT(monadIdentity))(/* @__PURE__ */ setTitle("Devoir 7 : Suites num\xE9riques"))(function() {
    return discard(discardUnit)(bindStateT(monadIdentity))(nl)(function() {
      return discard(discardUnit)(bindStateT(monadIdentity))(put3(functorStateT(functorIdentity))(monadStateStateT(monadIdentity))(div2(widgetMultiAlternative(monoidArray))(widgetShiftMap)([attr("style")("display: grid; grid-template-columns: 1fr 1fr 1fr;")])([label(widgetMultiAlternative(monoidArray))(widgetShiftMap)([])([text(widgetLiftWidget)("Nom:")]), label(widgetMultiAlternative(monoidArray))(widgetShiftMap)([])([text(widgetLiftWidget)("Pr\xE9nom:")]), label(widgetMultiAlternative(monoidArray))(widgetShiftMap)([])([text(widgetLiftWidget)("Classe:")])])))(function() {
        return discard(discardUnit)(bindStateT(monadIdentity))(put3(functorStateT(functorIdentity))(monadStateStateT(monadIdentity))(ul(widgetMultiAlternative(monoidArray))(widgetShiftMap)([])([li(widgetMultiAlternative(monoidArray))(widgetShiftMap)([])([text(widgetLiftWidget)("5 exercices")]), li(widgetMultiAlternative(monoidArray))(widgetShiftMap)([])([text(widgetLiftWidget)("4 termes \xE0 d\xE9terminer par exercice")]), li(widgetMultiAlternative(monoidArray))(widgetShiftMap)([])(fromIncremental(discard(discardUnit)(bindStateT(monadIdentity))(m("\\frac{1}{4}"))(function() {
          return discard(discardUnit)(bindStateT(monadIdentity))(t(" point par terme"))(function() {
            return get2(monadStateStateT(monadIdentity));
          });
        }))), li(widgetMultiAlternative(monoidArray))(widgetShiftMap)([])([text(widgetLiftWidget)("calculatrice autoris\xE9e")]), li(widgetMultiAlternative(monoidArray))(widgetShiftMap)([])([text(widgetLiftWidget)("documents autoris\xE9s")])])))(function() {
          return get2(monadStateStateT(monadIdentity));
        });
      });
    });
  })));
  var body = function(st) {
    return dyn(widgetMonad)(discard(discardUnit)(bindCofree(widgetAlternative(monoidArray)))(display2(text(widgetLiftWidget)("Enonc\xE9 n\xB0 ")))(function() {
      return bind(bindCofree(widgetAlternative(monoidArray)))(debounce(widgetMonad)(widgetAlt(monoidArray))(widgetMonadAff(monoidArray))(50)(st)(function(s) {
        return input(widgetMultiAlternative(monoidArray))(widgetShiftMap)([size3(6), autoFocus(true), map(functorProps)(map(functorFn)(function(x) {
          return {
            seed: map(functorMaybe)(show(showInt))(validateInput(new Just(x))),
            enabled: false
          };
        })(unsafeTargetValue))(onChange), voidRight(functorProps)({
          enabled: maybe(false)($$const(true))(validateInput(s.seed)),
          seed: s.seed
        })(onKeyEnter)]);
      }))(function(newState) {
        var odd = (2 * abs(ordInt)(ringInt)(fromMaybe(0)(validateInput(newState.seed))) | 0) + 1 | 0;
        var r0 = rand({
          val: odd,
          gen: 0,
          seed: odd * odd | 0
        });
        return display2(div$prime(widgetMultiAlternative(monoidArray))(widgetShiftMap)(function() {
          var $6 = !newState.enabled;
          if ($6) {
            return [];
          }
          ;
          return fromIncremental(discard(discardUnit)(bindStateT(monadIdentity))(nl)(function() {
            var r1 = consume(30)(r0);
            var r2 = consume(30)(r1);
            var r3 = consume(30)(r2);
            var r4 = consume(30)(r3);
            var r5 = consume(30)(r4);
            var mode = fromMaybe(0)(validateInput(newState.seed)) < 0;
            return discard(discardUnit)(bindStateT(monadIdentity))(exo1(mode)(r1))(function() {
              return discard(discardUnit)(bindStateT(monadIdentity))(exo2(mode)(r2))(function() {
                return discard(discardUnit)(bindStateT(monadIdentity))(exo3(mode)(r3))(function() {
                  return discard(discardUnit)(bindStateT(monadIdentity))(exo4(mode)(r4))(function() {
                    return discard(discardUnit)(bindStateT(monadIdentity))(exo5(mode)(r5))(function() {
                      return get2(monadStateStateT(monadIdentity));
                    });
                  });
                });
              });
            });
          }));
        }()));
      });
    }));
  };
  var article = function(state3) {
    return div$prime(widgetMultiAlternative(monoidArray))(widgetShiftMap)([header, body(state3)]);
  };
  var main = /* @__PURE__ */ runWidgetInDom("main")(/* @__PURE__ */ article(initialState));

  // <stdin>
  main();
})();
