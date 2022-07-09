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
  var ordStringImpl = unsafeCompareImpl;
  var ordCharImpl = unsafeCompareImpl;

  // output/Data.Eq/foreign.js
  var refEq = function(r1) {
    return function(r2) {
      return r1 === r2;
    };
  };
  var eqBooleanImpl = refEq;
  var eqIntImpl = refEq;
  var eqNumberImpl = refEq;
  var eqCharImpl = refEq;
  var eqStringImpl = refEq;

  // output/Data.Eq/index.js
  var eqString = {
    eq: eqStringImpl
  };
  var eqNumber = {
    eq: eqNumberImpl
  };
  var eqInt = {
    eq: eqIntImpl
  };
  var eqChar = {
    eq: eqCharImpl
  };
  var eqBoolean = {
    eq: eqBooleanImpl
  };
  var eq = function(dict) {
    return dict.eq;
  };
  var notEq = function(dictEq) {
    return function(x) {
      return function(y) {
        return eq(eqBoolean)(eq(dictEq)(x)(y))(false);
      };
    };
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
  var numSub = function(n1) {
    return function(n2) {
      return n1 - n2;
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
  var numAdd = function(n1) {
    return function(n2) {
      return n1 + n2;
    };
  };
  var numMul = function(n1) {
    return function(n2) {
      return n1 * n2;
    };
  };

  // output/Data.Semiring/index.js
  var zero = function(dict) {
    return dict.zero;
  };
  var semiringNumber = {
    add: numAdd,
    zero: 0,
    mul: numMul,
    one: 1
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
  var ringNumber = {
    sub: numSub,
    Semiring0: function() {
      return semiringNumber;
    }
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
  var ordString = /* @__PURE__ */ function() {
    return {
      compare: ordStringImpl(LT.value)(EQ.value)(GT.value),
      Eq0: function() {
        return eqString;
      }
    };
  }();
  var ordInt = /* @__PURE__ */ function() {
    return {
      compare: ordIntImpl(LT.value)(EQ.value)(GT.value),
      Eq0: function() {
        return eqInt;
      }
    };
  }();
  var ordChar = /* @__PURE__ */ function() {
    return {
      compare: ordCharImpl(LT.value)(EQ.value)(GT.value),
      Eq0: function() {
        return eqChar;
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
  var boundedChar = {
    top: topChar,
    bottom: bottomChar,
    Ord0: function() {
      return ordChar;
    }
  };
  var bottom = function(dict) {
    return dict.bottom;
  };

  // output/Data.Show/foreign.js
  var showIntImpl = function(n) {
    return n.toString();
  };
  var showNumberImpl = function(n) {
    var str = n.toString();
    return isNaN(str + ".0") ? str : str + ".0";
  };

  // output/Data.Show/index.js
  var showNumber = {
    show: showNumberImpl
  };
  var showInt = {
    show: showIntImpl
  };
  var show = function(dict) {
    return dict.show;
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
  var isNothing = /* @__PURE__ */ maybe(true)(/* @__PURE__ */ $$const(false));
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

  // output/Control.Lazy/index.js
  var defer = function(dict) {
    return dict.defer;
  };

  // output/Data.HeytingAlgebra/foreign.js
  var boolConj = function(b1) {
    return function(b2) {
      return b1 && b2;
    };
  };
  var boolDisj = function(b1) {
    return function(b2) {
      return b1 || b2;
    };
  };
  var boolNot = function(b2) {
    return !b2;
  };

  // output/Data.HeytingAlgebra/index.js
  var tt = function(dict) {
    return dict.tt;
  };
  var not = function(dict) {
    return dict.not;
  };
  var disj = function(dict) {
    return dict.disj;
  };
  var heytingAlgebraBoolean = {
    ff: false,
    tt: true,
    implies: function(a) {
      return function(b2) {
        return disj(heytingAlgebraBoolean)(not(heytingAlgebraBoolean)(a))(b2);
      };
    },
    conj: boolConj,
    disj: boolDisj,
    not: boolNot
  };
  var conj = function(dict) {
    return dict.conj;
  };

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
  var uncurry = function(f) {
    return function(v) {
      return f(v.value0)(v.value1);
    };
  };
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
  var alaF = function() {
    return function() {
      return function() {
        return function() {
          return function(v) {
            return coerce();
          };
        };
      };
    };
  };

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

  // output/Data.Monoid.Conj/index.js
  var Conj = function(x) {
    return x;
  };
  var semigroupConj = function(dictHeytingAlgebra) {
    return {
      append: function(v) {
        return function(v1) {
          return conj(dictHeytingAlgebra)(v)(v1);
        };
      }
    };
  };
  var monoidConj = function(dictHeytingAlgebra) {
    return {
      mempty: tt(dictHeytingAlgebra),
      Semigroup0: function() {
        return semigroupConj(dictHeytingAlgebra);
      }
    };
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
  var foldMap = function(dict) {
    return dict.foldMap;
  };
  var all = function(dictFoldable) {
    return function(dictHeytingAlgebra) {
      return alaF()()()()(Conj)(foldMap(dictFoldable)(monoidConj(dictHeytingAlgebra)));
    };
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
  var foldMapWithIndex = function(dict) {
    return dict.foldMapWithIndex;
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

  // output/Data.Traversable.Accum.Internal/index.js
  var stateL = function(v) {
    return v;
  };
  var functorStateL = {
    map: function(f) {
      return function(k) {
        return function(s) {
          var v = stateL(k)(s);
          return {
            accum: v.accum,
            value: f(v.value)
          };
        };
      };
    }
  };
  var applyStateL = {
    apply: function(f) {
      return function(x) {
        return function(s) {
          var v = stateL(f)(s);
          var v1 = stateL(x)(v.accum);
          return {
            accum: v1.accum,
            value: v.value(v1.value)
          };
        };
      };
    },
    Functor0: function() {
      return functorStateL;
    }
  };
  var applicativeStateL = {
    pure: function(a) {
      return function(s) {
        return {
          accum: s,
          value: a
        };
      };
    },
    Apply0: function() {
      return applyStateL;
    }
  };

  // output/Data.Traversable/index.js
  var traverse = function(dict) {
    return dict.traverse;
  };
  var sequenceDefault = function(dictTraversable) {
    return function(dictApplicative) {
      return traverse(dictTraversable)(dictApplicative)(identity(categoryFn));
    };
  };
  var traversableArray = {
    traverse: function(dictApplicative) {
      return traverseArrayImpl(apply(dictApplicative.Apply0()))(map(dictApplicative.Apply0().Functor0()))(pure(dictApplicative));
    },
    sequence: function(dictApplicative) {
      return sequenceDefault(traversableArray)(dictApplicative);
    },
    Functor0: function() {
      return functorArray;
    },
    Foldable1: function() {
      return foldableArray;
    }
  };
  var mapAccumL = function(dictTraversable) {
    return function(f) {
      return function(s0) {
        return function(xs) {
          return stateL(traverse(dictTraversable)(applicativeStateL)(function(a) {
            return function(s) {
              return f(s)(a);
            };
          })(xs))(s0);
        };
      };
    };
  };
  var scanl = function(dictTraversable) {
    return function(f) {
      return function(b0) {
        return function(xs) {
          return mapAccumL(dictTraversable)(function(b2) {
            return function(a) {
              var b$prime = f(b2)(a);
              return {
                accum: b$prime,
                value: b$prime
              };
            };
          })(b0)(xs).value;
        };
      };
    };
  };

  // output/Data.Unfoldable/foreign.js
  var unfoldrArrayImpl = function(isNothing2) {
    return function(fromJust2) {
      return function(fst2) {
        return function(snd2) {
          return function(f) {
            return function(b2) {
              var result = [];
              var value12 = b2;
              while (true) {
                var maybe2 = f(value12);
                if (isNothing2(maybe2))
                  return result;
                var tuple = fromJust2(maybe2);
                result.push(fst2(tuple));
                value12 = snd2(tuple);
              }
            };
          };
        };
      };
    };
  };

  // output/Data.Unfoldable1/foreign.js
  var unfoldr1ArrayImpl = function(isNothing2) {
    return function(fromJust2) {
      return function(fst2) {
        return function(snd2) {
          return function(f) {
            return function(b2) {
              var result = [];
              var value12 = b2;
              while (true) {
                var tuple = f(value12);
                result.push(fst2(tuple));
                var maybe2 = snd2(tuple);
                if (isNothing2(maybe2))
                  return result;
                value12 = fromJust2(maybe2);
              }
            };
          };
        };
      };
    };
  };

  // output/Data.Unfoldable1/index.js
  var unfoldable1Array = {
    unfoldr1: /* @__PURE__ */ unfoldr1ArrayImpl(isNothing)(/* @__PURE__ */ fromJust())(fst)(snd)
  };

  // output/Data.Unfoldable/index.js
  var unfoldr = function(dict) {
    return dict.unfoldr;
  };
  var unfoldableArray = {
    unfoldr: /* @__PURE__ */ unfoldrArrayImpl(isNothing)(/* @__PURE__ */ fromJust())(fst)(snd),
    Unfoldable10: function() {
      return unfoldable1Array;
    }
  };

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
  var foldableList = {
    foldr: function(f) {
      return function(b2) {
        var rev3 = function() {
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
                throw new Error("Failed pattern match at Data.List.Types (line 107, column 7 - line 107, column 23): " + [acc.constructor.name, v.constructor.name]);
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
        var $205 = foldl(foldableList)(flip(f))(b2);
        return function($206) {
          return $205(rev3($206));
        };
      };
    },
    foldl: function(f) {
      var go2 = function($copy_b) {
        return function($copy_v) {
          var $tco_var_b = $copy_b;
          var $tco_done1 = false;
          var $tco_result;
          function $tco_loop(b2, v) {
            if (v instanceof Nil) {
              $tco_done1 = true;
              return b2;
            }
            ;
            if (v instanceof Cons) {
              $tco_var_b = f(b2)(v.value0);
              $copy_v = v.value1;
              return;
            }
            ;
            throw new Error("Failed pattern match at Data.List.Types (line 111, column 12 - line 113, column 30): " + [v.constructor.name]);
          }
          ;
          while (!$tco_done1) {
            $tco_result = $tco_loop($tco_var_b, $copy_v);
          }
          ;
          return $tco_result;
        };
      };
      return go2;
    },
    foldMap: function(dictMonoid) {
      return function(f) {
        return foldl(foldableList)(function(acc) {
          var $207 = append(dictMonoid.Semigroup0())(acc);
          return function($208) {
            return $207(f($208));
          };
        })(mempty(dictMonoid));
      };
    }
  };

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
    return function(foldr4) {
      return function(xs) {
        return listToArray(foldr4(curryCons)(emptyList)(xs));
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
  var indexImpl = function(just) {
    return function(nothing) {
      return function(xs) {
        return function(i) {
          return i < 0 || i >= xs.length ? nothing : just(xs[i]);
        };
      };
    };
  };
  var findIndexImpl = function(just) {
    return function(nothing) {
      return function(f) {
        return function(xs) {
          for (var i = 0, l = xs.length; i < l; i++) {
            if (f(xs[i]))
              return just(i);
          }
          return nothing;
        };
      };
    };
  };
  var _deleteAt = function(just) {
    return function(nothing) {
      return function(i) {
        return function(l) {
          if (i < 0 || i >= l.length)
            return nothing;
          var l1 = l.slice();
          l1.splice(i, 1);
          return just(l1);
        };
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
  var concat = function(xss) {
    if (xss.length <= 1e4) {
      return Array.prototype.concat.apply([], xss);
    }
    var result = [];
    for (var i = 0, l = xss.length; i < l; i++) {
      var xs = xss[i];
      for (var j = 0, m2 = xs.length; j < m2; j++) {
        result.push(xs[j]);
      }
    }
    return result;
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
  var index = /* @__PURE__ */ function() {
    return indexImpl(Just.create)(Nothing.value);
  }();
  var last = function(xs) {
    return index(xs)(length3(xs) - 1 | 0);
  };
  var fromFoldable = function(dictFoldable) {
    return fromFoldableImpl(foldr(dictFoldable));
  };
  var foldr3 = /* @__PURE__ */ foldr(foldableArray);
  var findIndex = /* @__PURE__ */ function() {
    return findIndexImpl(Just.create)(Nothing.value);
  }();
  var deleteAt = /* @__PURE__ */ function() {
    return _deleteAt(Just.create)(Nothing.value);
  }();
  var deleteBy = function(v) {
    return function(v1) {
      return function(v2) {
        if (v2.length === 0) {
          return [];
        }
        ;
        return maybe(v2)(function(i) {
          return fromJust()(deleteAt(i)(v2));
        })(findIndex(v(v1))(v2));
      };
    };
  };
  var $$delete = function(dictEq) {
    return deleteBy(eq(dictEq));
  };
  var difference = function(dictEq) {
    return foldr3($$delete(dictEq));
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
      var p, r, t, value12, rsize;
      avar.draining = true;
      while (1) {
        p = null;
        r = null;
        t = null;
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
          while (t = takeHead(ts)) {
            runEff(t(value12));
          }
          break;
        }
        if (value12 === EMPTY && (p = takeHead(ps))) {
          avar.value = value12 = p.value;
        }
        if (value12 !== EMPTY) {
          t = takeHead(ts);
          while (rsize-- && (r = takeHead(rs))) {
            runEff(r(util.right(value12)));
          }
          if (t !== null) {
            avar.value = EMPTY;
            runEff(t(util.right(value12)));
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
    function clearDelay(n, t) {
      if (n === 0 && typeof clearImmediate !== "undefined") {
        return clearImmediate(t);
      } else {
        return clearTimeout(t);
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
          return function(d2) {
            return fn(a, b2, c, d2);
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
      return function(t) {
        var vdom = buildVDom(spec)(toVDom(runThunk(t)));
        return mkStep(new Step(extract2(vdom), {
          thunk: t,
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
  var atan2 = function(y) {
    return function(x) {
      return Math.atan2(y, x);
    };
  };
  var cos = Math.cos;
  var round = Math.round;
  var sin = Math.sin;
  var sqrt = Math.sqrt;

  // output/Data.Number/index.js
  var pi = 3.141592653589793;
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

  // output/Data.String.CodeUnits/foreign.js
  var singleton5 = function(c) {
    return c;
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

  // output/Data.Enum/foreign.js
  function toCharCode(c) {
    return c.charCodeAt(0);
  }
  function fromCharCode(c) {
    return String.fromCharCode(c);
  }

  // output/Data.Enum/index.js
  var toEnum = function(dict) {
    return dict.toEnum;
  };
  var fromEnum = function(dict) {
    return dict.fromEnum;
  };
  var toEnumWithDefaults = function(dictBoundedEnum) {
    return function(low2) {
      return function(high2) {
        return function(x) {
          var v = toEnum(dictBoundedEnum)(x);
          if (v instanceof Just) {
            return v.value0;
          }
          ;
          if (v instanceof Nothing) {
            var $54 = x < fromEnum(dictBoundedEnum)(bottom(dictBoundedEnum.Bounded0()));
            if ($54) {
              return low2;
            }
            ;
            return high2;
          }
          ;
          throw new Error("Failed pattern match at Data.Enum (line 158, column 33 - line 160, column 62): " + [v.constructor.name]);
        };
      };
    };
  };
  var defaultSucc = function(toEnum$prime) {
    return function(fromEnum$prime) {
      return function(a) {
        return toEnum$prime(fromEnum$prime(a) + 1 | 0);
      };
    };
  };
  var defaultPred = function(toEnum$prime) {
    return function(fromEnum$prime) {
      return function(a) {
        return toEnum$prime(fromEnum$prime(a) - 1 | 0);
      };
    };
  };
  var charToEnum = function(v) {
    if (v >= bottom(boundedInt) && v <= top(boundedInt)) {
      return new Just(fromCharCode(v));
    }
    ;
    return Nothing.value;
  };
  var enumChar = {
    succ: /* @__PURE__ */ defaultSucc(charToEnum)(toCharCode),
    pred: /* @__PURE__ */ defaultPred(charToEnum)(toCharCode),
    Ord0: function() {
      return ordChar;
    }
  };
  var boundedEnumChar = /* @__PURE__ */ function() {
    return {
      cardinality: toCharCode(top(boundedChar)) - toCharCode(bottom(boundedChar)) | 0,
      toEnum: charToEnum,
      fromEnum: toCharCode,
      Bounded0: function() {
        return boundedChar;
      },
      Enum1: function() {
        return enumChar;
      }
    };
  }();

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

  // output/Concur.VDom.SVG/index.js
  var svgNS = "http://www.w3.org/2000/svg";
  var text2 = function(dictMultiAlternative) {
    return function(dictShiftMap) {
      return el$prime2(dictShiftMap)(dictMultiAlternative)(function(p) {
        return function(c) {
          return mkHTMLNode(new Elem(new Just(svgNS), "text", p, unHTML(c)));
        };
      });
    };
  };
  var svg = function(dictMultiAlternative) {
    return function(dictShiftMap) {
      return el$prime2(dictShiftMap)(dictMultiAlternative)(function(p) {
        return function(c) {
          return mkHTMLNode(new Elem(new Just(svgNS), "svg", p, unHTML(c)));
        };
      });
    };
  };
  var path = function(dictMultiAlternative) {
    return function(dictShiftMap) {
      return el$prime2(dictShiftMap)(dictMultiAlternative)(function(p) {
        return function(v) {
          return mkHTMLNode(new Elem(new Just(svgNS), "path", p, []));
        };
      });
    };
  };
  var line = function(dictMultiAlternative) {
    return function(dictShiftMap) {
      return el$prime2(dictShiftMap)(dictMultiAlternative)(function(p) {
        return function(v) {
          return mkHTMLNode(new Elem(new Just(svgNS), "line", p, []));
        };
      });
    };
  };
  var attr2 = function(s) {
    return function(v) {
      return new PrimProp(new Attribute(Nothing.value, s, v));
    };
  };
  var d = /* @__PURE__ */ attr2("d");
  var height2 = /* @__PURE__ */ attr2("height");
  var stroke = /* @__PURE__ */ attr2("stroke");
  var style = /* @__PURE__ */ attr2("style");
  var unsafeMkProp = function(dictShow) {
    return function(s) {
      return function(v) {
        return attr2(s)(show(dictShow)(v));
      };
    };
  };
  var strokeWidth = /* @__PURE__ */ unsafeMkProp(showInt)("stroke-width");
  var width2 = /* @__PURE__ */ attr2("width");

  // output/Control.Monad.State/index.js
  var runState = function(v) {
    var $16 = unwrap();
    return function($17) {
      return $16(v($17));
    };
  };

  // output/Data.List.Lazy.Types/index.js
  var List = function(x) {
    return x;
  };
  var Nil2 = /* @__PURE__ */ function() {
    function Nil3() {
    }
    ;
    Nil3.value = new Nil3();
    return Nil3;
  }();
  var Cons2 = /* @__PURE__ */ function() {
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
  var nil = /* @__PURE__ */ defer2(function(v) {
    return Nil2.value;
  });
  var step3 = /* @__PURE__ */ function() {
    var $225 = unwrap();
    return function($226) {
      return force($225($226));
    };
  }();
  var lazyList = {
    defer: function(f) {
      return defer2(function($227) {
        return step3(f($227));
      });
    }
  };
  var cons3 = function(x) {
    return function(xs) {
      return defer2(function(v) {
        return new Cons2(x, xs);
      });
    };
  };
  var foldableList2 = {
    foldr: function(op) {
      return function(z) {
        return function(xs) {
          var rev3 = foldl(foldableList2)(flip(cons3))(nil);
          return foldl(foldableList2)(flip(op))(z)(rev3(xs));
        };
      };
    },
    foldl: function(op) {
      var go2 = function($copy_b) {
        return function($copy_xs) {
          var $tco_var_b = $copy_b;
          var $tco_done = false;
          var $tco_result;
          function $tco_loop(b2, xs) {
            var v = step3(xs);
            if (v instanceof Nil2) {
              $tco_done = true;
              return b2;
            }
            ;
            if (v instanceof Cons2) {
              $tco_var_b = op(b2)(v.value0);
              $copy_xs = v.value1;
              return;
            }
            ;
            throw new Error("Failed pattern match at Data.List.Lazy.Types (line 127, column 7 - line 129, column 40): " + [v.constructor.name]);
          }
          ;
          while (!$tco_done) {
            $tco_result = $tco_loop($tco_var_b, $copy_xs);
          }
          ;
          return $tco_result;
        };
      };
      return go2;
    },
    foldMap: function(dictMonoid) {
      return function(f) {
        return foldl(foldableList2)(function(b2) {
          return function(a) {
            return append(dictMonoid.Semigroup0())(b2)(f(a));
          };
        })(mempty(dictMonoid));
      };
    }
  };
  var unfoldable1List = {
    unfoldr1: /* @__PURE__ */ function() {
      var go2 = function(f) {
        return function(b2) {
          return defer(lazyList)(function(v) {
            var v1 = f(b2);
            if (v1.value1 instanceof Just) {
              return cons3(v1.value0)(go2(f)(v1.value1.value0));
            }
            ;
            if (v1.value1 instanceof Nothing) {
              return cons3(v1.value0)(nil);
            }
            ;
            throw new Error("Failed pattern match at Data.List.Lazy.Types (line 151, column 28 - line 153, column 33): " + [v1.constructor.name]);
          });
        };
      };
      return go2;
    }()
  };
  var unfoldableList = {
    unfoldr: /* @__PURE__ */ function() {
      var go2 = function(f) {
        return function(b2) {
          return defer(lazyList)(function(v) {
            var v1 = f(b2);
            if (v1 instanceof Nothing) {
              return nil;
            }
            ;
            if (v1 instanceof Just) {
              return cons3(v1.value0.value0)(go2(f)(v1.value0.value1));
            }
            ;
            throw new Error("Failed pattern match at Data.List.Lazy.Types (line 157, column 28 - line 159, column 39): " + [v1.constructor.name]);
          });
        };
      };
      return go2;
    }(),
    Unfoldable10: function() {
      return unfoldable1List;
    }
  };

  // output/Data.List.Lazy/index.js
  var filter3 = function(p) {
    var go2 = function($copy_v) {
      var $tco_done = false;
      var $tco_result;
      function $tco_loop(v) {
        if (v instanceof Nil2) {
          $tco_done = true;
          return Nil2.value;
        }
        ;
        if (v instanceof Cons2) {
          if (p(v.value0)) {
            $tco_done = true;
            return new Cons2(v.value0, filter3(p)(v.value1));
          }
          ;
          if (otherwise) {
            $copy_v = step3(v.value1);
            return;
          }
          ;
        }
        ;
        throw new Error("Failed pattern match at Data.List.Lazy (line 416, column 3 - line 416, column 15): " + [v.constructor.name]);
      }
      ;
      while (!$tco_done) {
        $tco_result = $tco_loop($copy_v);
      }
      ;
      return $tco_result;
    };
    var $268 = map(functorLazy)(go2);
    var $269 = unwrap();
    return function($270) {
      return List($268($269($270)));
    };
  };

  // output/Data.Map.Internal/index.js
  var Leaf = /* @__PURE__ */ function() {
    function Leaf2() {
    }
    ;
    Leaf2.value = new Leaf2();
    return Leaf2;
  }();
  var Two = /* @__PURE__ */ function() {
    function Two2(value0, value1, value22, value32) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
    }
    ;
    Two2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return new Two2(value0, value1, value22, value32);
          };
        };
      };
    };
    return Two2;
  }();
  var Three = /* @__PURE__ */ function() {
    function Three2(value0, value1, value22, value32, value42, value52, value62) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
      this.value4 = value42;
      this.value5 = value52;
      this.value6 = value62;
    }
    ;
    Three2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return function(value42) {
              return function(value52) {
                return function(value62) {
                  return new Three2(value0, value1, value22, value32, value42, value52, value62);
                };
              };
            };
          };
        };
      };
    };
    return Three2;
  }();
  var TwoLeft = /* @__PURE__ */ function() {
    function TwoLeft2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    TwoLeft2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new TwoLeft2(value0, value1, value22);
        };
      };
    };
    return TwoLeft2;
  }();
  var TwoRight = /* @__PURE__ */ function() {
    function TwoRight2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    TwoRight2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new TwoRight2(value0, value1, value22);
        };
      };
    };
    return TwoRight2;
  }();
  var ThreeLeft = /* @__PURE__ */ function() {
    function ThreeLeft2(value0, value1, value22, value32, value42, value52) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
      this.value4 = value42;
      this.value5 = value52;
    }
    ;
    ThreeLeft2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return function(value42) {
              return function(value52) {
                return new ThreeLeft2(value0, value1, value22, value32, value42, value52);
              };
            };
          };
        };
      };
    };
    return ThreeLeft2;
  }();
  var ThreeMiddle = /* @__PURE__ */ function() {
    function ThreeMiddle2(value0, value1, value22, value32, value42, value52) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
      this.value4 = value42;
      this.value5 = value52;
    }
    ;
    ThreeMiddle2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return function(value42) {
              return function(value52) {
                return new ThreeMiddle2(value0, value1, value22, value32, value42, value52);
              };
            };
          };
        };
      };
    };
    return ThreeMiddle2;
  }();
  var ThreeRight = /* @__PURE__ */ function() {
    function ThreeRight2(value0, value1, value22, value32, value42, value52) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
      this.value4 = value42;
      this.value5 = value52;
    }
    ;
    ThreeRight2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return function(value42) {
              return function(value52) {
                return new ThreeRight2(value0, value1, value22, value32, value42, value52);
              };
            };
          };
        };
      };
    };
    return ThreeRight2;
  }();
  var KickUp = /* @__PURE__ */ function() {
    function KickUp2(value0, value1, value22, value32) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
    }
    ;
    KickUp2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return new KickUp2(value0, value1, value22, value32);
          };
        };
      };
    };
    return KickUp2;
  }();
  var singleton7 = function(k) {
    return function(v) {
      return new Two(Leaf.value, k, v, Leaf.value);
    };
  };
  var toUnfoldable2 = function(dictUnfoldable) {
    return function(m2) {
      var go2 = function($copy_v) {
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(v) {
          if (v instanceof Nil) {
            $tco_done = true;
            return Nothing.value;
          }
          ;
          if (v instanceof Cons) {
            if (v.value0 instanceof Leaf) {
              $copy_v = v.value1;
              return;
            }
            ;
            if (v.value0 instanceof Two && (v.value0.value0 instanceof Leaf && v.value0.value3 instanceof Leaf)) {
              $tco_done = true;
              return new Just(new Tuple(new Tuple(v.value0.value1, v.value0.value2), v.value1));
            }
            ;
            if (v.value0 instanceof Two && v.value0.value0 instanceof Leaf) {
              $tco_done = true;
              return new Just(new Tuple(new Tuple(v.value0.value1, v.value0.value2), new Cons(v.value0.value3, v.value1)));
            }
            ;
            if (v.value0 instanceof Two) {
              $copy_v = new Cons(v.value0.value0, new Cons(singleton7(v.value0.value1)(v.value0.value2), new Cons(v.value0.value3, v.value1)));
              return;
            }
            ;
            if (v.value0 instanceof Three) {
              $copy_v = new Cons(v.value0.value0, new Cons(singleton7(v.value0.value1)(v.value0.value2), new Cons(v.value0.value3, new Cons(singleton7(v.value0.value4)(v.value0.value5), new Cons(v.value0.value6, v.value1)))));
              return;
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 624, column 18 - line 633, column 71): " + [v.value0.constructor.name]);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 623, column 3 - line 623, column 19): " + [v.constructor.name]);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($copy_v);
        }
        ;
        return $tco_result;
      };
      return unfoldr(dictUnfoldable)(go2)(new Cons(m2, Nil.value));
    };
  };
  var lookup2 = function(dictOrd) {
    return function(k) {
      var comp = compare(dictOrd);
      var go2 = function($copy_v) {
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(v) {
          if (v instanceof Leaf) {
            $tco_done = true;
            return Nothing.value;
          }
          ;
          if (v instanceof Two) {
            var v2 = comp(k)(v.value1);
            if (v2 instanceof EQ) {
              $tco_done = true;
              return new Just(v.value2);
            }
            ;
            if (v2 instanceof LT) {
              $copy_v = v.value0;
              return;
            }
            ;
            $copy_v = v.value3;
            return;
          }
          ;
          if (v instanceof Three) {
            var v3 = comp(k)(v.value1);
            if (v3 instanceof EQ) {
              $tco_done = true;
              return new Just(v.value2);
            }
            ;
            var v4 = comp(k)(v.value4);
            if (v4 instanceof EQ) {
              $tco_done = true;
              return new Just(v.value5);
            }
            ;
            if (v3 instanceof LT) {
              $copy_v = v.value0;
              return;
            }
            ;
            if (v4 instanceof GT) {
              $copy_v = v.value6;
              return;
            }
            ;
            $copy_v = v.value3;
            return;
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 241, column 5 - line 241, column 22): " + [v.constructor.name]);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($copy_v);
        }
        ;
        return $tco_result;
      };
      return go2;
    };
  };
  var fromZipper = function($copy_dictOrd) {
    return function($copy_v) {
      return function($copy_tree) {
        var $tco_var_dictOrd = $copy_dictOrd;
        var $tco_var_v = $copy_v;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(dictOrd, v, tree2) {
          if (v instanceof Nil) {
            $tco_done = true;
            return tree2;
          }
          ;
          if (v instanceof Cons) {
            if (v.value0 instanceof TwoLeft) {
              $tco_var_dictOrd = dictOrd;
              $tco_var_v = v.value1;
              $copy_tree = new Two(tree2, v.value0.value0, v.value0.value1, v.value0.value2);
              return;
            }
            ;
            if (v.value0 instanceof TwoRight) {
              $tco_var_dictOrd = dictOrd;
              $tco_var_v = v.value1;
              $copy_tree = new Two(v.value0.value0, v.value0.value1, v.value0.value2, tree2);
              return;
            }
            ;
            if (v.value0 instanceof ThreeLeft) {
              $tco_var_dictOrd = dictOrd;
              $tco_var_v = v.value1;
              $copy_tree = new Three(tree2, v.value0.value0, v.value0.value1, v.value0.value2, v.value0.value3, v.value0.value4, v.value0.value5);
              return;
            }
            ;
            if (v.value0 instanceof ThreeMiddle) {
              $tco_var_dictOrd = dictOrd;
              $tco_var_v = v.value1;
              $copy_tree = new Three(v.value0.value0, v.value0.value1, v.value0.value2, tree2, v.value0.value3, v.value0.value4, v.value0.value5);
              return;
            }
            ;
            if (v.value0 instanceof ThreeRight) {
              $tco_var_dictOrd = dictOrd;
              $tco_var_v = v.value1;
              $copy_tree = new Three(v.value0.value0, v.value0.value1, v.value0.value2, v.value0.value3, v.value0.value4, v.value0.value5, tree2);
              return;
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 462, column 3 - line 467, column 88): " + [v.value0.constructor.name]);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 459, column 1 - line 459, column 80): " + [v.constructor.name, tree2.constructor.name]);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_dictOrd, $tco_var_v, $copy_tree);
        }
        ;
        return $tco_result;
      };
    };
  };
  var insert2 = function(dictOrd) {
    return function(k) {
      return function(v) {
        var up = function($copy_v1) {
          return function($copy_v2) {
            var $tco_var_v1 = $copy_v1;
            var $tco_done = false;
            var $tco_result;
            function $tco_loop(v1, v2) {
              if (v1 instanceof Nil) {
                $tco_done = true;
                return new Two(v2.value0, v2.value1, v2.value2, v2.value3);
              }
              ;
              if (v1 instanceof Cons) {
                if (v1.value0 instanceof TwoLeft) {
                  $tco_done = true;
                  return fromZipper(dictOrd)(v1.value1)(new Three(v2.value0, v2.value1, v2.value2, v2.value3, v1.value0.value0, v1.value0.value1, v1.value0.value2));
                }
                ;
                if (v1.value0 instanceof TwoRight) {
                  $tco_done = true;
                  return fromZipper(dictOrd)(v1.value1)(new Three(v1.value0.value0, v1.value0.value1, v1.value0.value2, v2.value0, v2.value1, v2.value2, v2.value3));
                }
                ;
                if (v1.value0 instanceof ThreeLeft) {
                  $tco_var_v1 = v1.value1;
                  $copy_v2 = new KickUp(new Two(v2.value0, v2.value1, v2.value2, v2.value3), v1.value0.value0, v1.value0.value1, new Two(v1.value0.value2, v1.value0.value3, v1.value0.value4, v1.value0.value5));
                  return;
                }
                ;
                if (v1.value0 instanceof ThreeMiddle) {
                  $tco_var_v1 = v1.value1;
                  $copy_v2 = new KickUp(new Two(v1.value0.value0, v1.value0.value1, v1.value0.value2, v2.value0), v2.value1, v2.value2, new Two(v2.value3, v1.value0.value3, v1.value0.value4, v1.value0.value5));
                  return;
                }
                ;
                if (v1.value0 instanceof ThreeRight) {
                  $tco_var_v1 = v1.value1;
                  $copy_v2 = new KickUp(new Two(v1.value0.value0, v1.value0.value1, v1.value0.value2, v1.value0.value3), v1.value0.value4, v1.value0.value5, new Two(v2.value0, v2.value1, v2.value2, v2.value3));
                  return;
                }
                ;
                throw new Error("Failed pattern match at Data.Map.Internal (line 498, column 5 - line 503, column 108): " + [v1.value0.constructor.name, v2.constructor.name]);
              }
              ;
              throw new Error("Failed pattern match at Data.Map.Internal (line 495, column 3 - line 495, column 56): " + [v1.constructor.name, v2.constructor.name]);
            }
            ;
            while (!$tco_done) {
              $tco_result = $tco_loop($tco_var_v1, $copy_v2);
            }
            ;
            return $tco_result;
          };
        };
        var comp = compare(dictOrd);
        var down = function($copy_ctx) {
          return function($copy_v1) {
            var $tco_var_ctx = $copy_ctx;
            var $tco_done1 = false;
            var $tco_result;
            function $tco_loop(ctx, v1) {
              if (v1 instanceof Leaf) {
                $tco_done1 = true;
                return up(ctx)(new KickUp(Leaf.value, k, v, Leaf.value));
              }
              ;
              if (v1 instanceof Two) {
                var v2 = comp(k)(v1.value1);
                if (v2 instanceof EQ) {
                  $tco_done1 = true;
                  return fromZipper(dictOrd)(ctx)(new Two(v1.value0, k, v, v1.value3));
                }
                ;
                if (v2 instanceof LT) {
                  $tco_var_ctx = new Cons(new TwoLeft(v1.value1, v1.value2, v1.value3), ctx);
                  $copy_v1 = v1.value0;
                  return;
                }
                ;
                $tco_var_ctx = new Cons(new TwoRight(v1.value0, v1.value1, v1.value2), ctx);
                $copy_v1 = v1.value3;
                return;
              }
              ;
              if (v1 instanceof Three) {
                var v3 = comp(k)(v1.value1);
                if (v3 instanceof EQ) {
                  $tco_done1 = true;
                  return fromZipper(dictOrd)(ctx)(new Three(v1.value0, k, v, v1.value3, v1.value4, v1.value5, v1.value6));
                }
                ;
                var v4 = comp(k)(v1.value4);
                if (v4 instanceof EQ) {
                  $tco_done1 = true;
                  return fromZipper(dictOrd)(ctx)(new Three(v1.value0, v1.value1, v1.value2, v1.value3, k, v, v1.value6));
                }
                ;
                if (v3 instanceof LT) {
                  $tco_var_ctx = new Cons(new ThreeLeft(v1.value1, v1.value2, v1.value3, v1.value4, v1.value5, v1.value6), ctx);
                  $copy_v1 = v1.value0;
                  return;
                }
                ;
                if (v3 instanceof GT && v4 instanceof LT) {
                  $tco_var_ctx = new Cons(new ThreeMiddle(v1.value0, v1.value1, v1.value2, v1.value4, v1.value5, v1.value6), ctx);
                  $copy_v1 = v1.value3;
                  return;
                }
                ;
                $tco_var_ctx = new Cons(new ThreeRight(v1.value0, v1.value1, v1.value2, v1.value3, v1.value4, v1.value5), ctx);
                $copy_v1 = v1.value6;
                return;
              }
              ;
              throw new Error("Failed pattern match at Data.Map.Internal (line 478, column 3 - line 478, column 55): " + [ctx.constructor.name, v1.constructor.name]);
            }
            ;
            while (!$tco_done1) {
              $tco_result = $tco_loop($tco_var_ctx, $copy_v1);
            }
            ;
            return $tco_result;
          };
        };
        return down(Nil.value);
      };
    };
  };
  var pop = function(dictOrd) {
    return function(k) {
      var up = function($copy_ctxs) {
        return function($copy_tree) {
          var $tco_var_ctxs = $copy_ctxs;
          var $tco_done = false;
          var $tco_result;
          function $tco_loop(ctxs, tree2) {
            if (ctxs instanceof Nil) {
              $tco_done = true;
              return tree2;
            }
            ;
            if (ctxs instanceof Cons) {
              if (ctxs.value0 instanceof TwoLeft && (ctxs.value0.value2 instanceof Leaf && tree2 instanceof Leaf)) {
                $tco_done = true;
                return fromZipper(dictOrd)(ctxs.value1)(new Two(Leaf.value, ctxs.value0.value0, ctxs.value0.value1, Leaf.value));
              }
              ;
              if (ctxs.value0 instanceof TwoRight && (ctxs.value0.value0 instanceof Leaf && tree2 instanceof Leaf)) {
                $tco_done = true;
                return fromZipper(dictOrd)(ctxs.value1)(new Two(Leaf.value, ctxs.value0.value1, ctxs.value0.value2, Leaf.value));
              }
              ;
              if (ctxs.value0 instanceof TwoLeft && ctxs.value0.value2 instanceof Two) {
                $tco_var_ctxs = ctxs.value1;
                $copy_tree = new Three(tree2, ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2.value0, ctxs.value0.value2.value1, ctxs.value0.value2.value2, ctxs.value0.value2.value3);
                return;
              }
              ;
              if (ctxs.value0 instanceof TwoRight && ctxs.value0.value0 instanceof Two) {
                $tco_var_ctxs = ctxs.value1;
                $copy_tree = new Three(ctxs.value0.value0.value0, ctxs.value0.value0.value1, ctxs.value0.value0.value2, ctxs.value0.value0.value3, ctxs.value0.value1, ctxs.value0.value2, tree2);
                return;
              }
              ;
              if (ctxs.value0 instanceof TwoLeft && ctxs.value0.value2 instanceof Three) {
                $tco_done = true;
                return fromZipper(dictOrd)(ctxs.value1)(new Two(new Two(tree2, ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2.value0), ctxs.value0.value2.value1, ctxs.value0.value2.value2, new Two(ctxs.value0.value2.value3, ctxs.value0.value2.value4, ctxs.value0.value2.value5, ctxs.value0.value2.value6)));
              }
              ;
              if (ctxs.value0 instanceof TwoRight && ctxs.value0.value0 instanceof Three) {
                $tco_done = true;
                return fromZipper(dictOrd)(ctxs.value1)(new Two(new Two(ctxs.value0.value0.value0, ctxs.value0.value0.value1, ctxs.value0.value0.value2, ctxs.value0.value0.value3), ctxs.value0.value0.value4, ctxs.value0.value0.value5, new Two(ctxs.value0.value0.value6, ctxs.value0.value1, ctxs.value0.value2, tree2)));
              }
              ;
              if (ctxs.value0 instanceof ThreeLeft && (ctxs.value0.value2 instanceof Leaf && (ctxs.value0.value5 instanceof Leaf && tree2 instanceof Leaf))) {
                $tco_done = true;
                return fromZipper(dictOrd)(ctxs.value1)(new Three(Leaf.value, ctxs.value0.value0, ctxs.value0.value1, Leaf.value, ctxs.value0.value3, ctxs.value0.value4, Leaf.value));
              }
              ;
              if (ctxs.value0 instanceof ThreeMiddle && (ctxs.value0.value0 instanceof Leaf && (ctxs.value0.value5 instanceof Leaf && tree2 instanceof Leaf))) {
                $tco_done = true;
                return fromZipper(dictOrd)(ctxs.value1)(new Three(Leaf.value, ctxs.value0.value1, ctxs.value0.value2, Leaf.value, ctxs.value0.value3, ctxs.value0.value4, Leaf.value));
              }
              ;
              if (ctxs.value0 instanceof ThreeRight && (ctxs.value0.value0 instanceof Leaf && (ctxs.value0.value3 instanceof Leaf && tree2 instanceof Leaf))) {
                $tco_done = true;
                return fromZipper(dictOrd)(ctxs.value1)(new Three(Leaf.value, ctxs.value0.value1, ctxs.value0.value2, Leaf.value, ctxs.value0.value4, ctxs.value0.value5, Leaf.value));
              }
              ;
              if (ctxs.value0 instanceof ThreeLeft && ctxs.value0.value2 instanceof Two) {
                $tco_done = true;
                return fromZipper(dictOrd)(ctxs.value1)(new Two(new Three(tree2, ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2.value0, ctxs.value0.value2.value1, ctxs.value0.value2.value2, ctxs.value0.value2.value3), ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5));
              }
              ;
              if (ctxs.value0 instanceof ThreeMiddle && ctxs.value0.value0 instanceof Two) {
                $tco_done = true;
                return fromZipper(dictOrd)(ctxs.value1)(new Two(new Three(ctxs.value0.value0.value0, ctxs.value0.value0.value1, ctxs.value0.value0.value2, ctxs.value0.value0.value3, ctxs.value0.value1, ctxs.value0.value2, tree2), ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5));
              }
              ;
              if (ctxs.value0 instanceof ThreeMiddle && ctxs.value0.value5 instanceof Two) {
                $tco_done = true;
                return fromZipper(dictOrd)(ctxs.value1)(new Two(ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2, new Three(tree2, ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5.value0, ctxs.value0.value5.value1, ctxs.value0.value5.value2, ctxs.value0.value5.value3)));
              }
              ;
              if (ctxs.value0 instanceof ThreeRight && ctxs.value0.value3 instanceof Two) {
                $tco_done = true;
                return fromZipper(dictOrd)(ctxs.value1)(new Two(ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2, new Three(ctxs.value0.value3.value0, ctxs.value0.value3.value1, ctxs.value0.value3.value2, ctxs.value0.value3.value3, ctxs.value0.value4, ctxs.value0.value5, tree2)));
              }
              ;
              if (ctxs.value0 instanceof ThreeLeft && ctxs.value0.value2 instanceof Three) {
                $tco_done = true;
                return fromZipper(dictOrd)(ctxs.value1)(new Three(new Two(tree2, ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2.value0), ctxs.value0.value2.value1, ctxs.value0.value2.value2, new Two(ctxs.value0.value2.value3, ctxs.value0.value2.value4, ctxs.value0.value2.value5, ctxs.value0.value2.value6), ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5));
              }
              ;
              if (ctxs.value0 instanceof ThreeMiddle && ctxs.value0.value0 instanceof Three) {
                $tco_done = true;
                return fromZipper(dictOrd)(ctxs.value1)(new Three(new Two(ctxs.value0.value0.value0, ctxs.value0.value0.value1, ctxs.value0.value0.value2, ctxs.value0.value0.value3), ctxs.value0.value0.value4, ctxs.value0.value0.value5, new Two(ctxs.value0.value0.value6, ctxs.value0.value1, ctxs.value0.value2, tree2), ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5));
              }
              ;
              if (ctxs.value0 instanceof ThreeMiddle && ctxs.value0.value5 instanceof Three) {
                $tco_done = true;
                return fromZipper(dictOrd)(ctxs.value1)(new Three(ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2, new Two(tree2, ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5.value0), ctxs.value0.value5.value1, ctxs.value0.value5.value2, new Two(ctxs.value0.value5.value3, ctxs.value0.value5.value4, ctxs.value0.value5.value5, ctxs.value0.value5.value6)));
              }
              ;
              if (ctxs.value0 instanceof ThreeRight && ctxs.value0.value3 instanceof Three) {
                $tco_done = true;
                return fromZipper(dictOrd)(ctxs.value1)(new Three(ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2, new Two(ctxs.value0.value3.value0, ctxs.value0.value3.value1, ctxs.value0.value3.value2, ctxs.value0.value3.value3), ctxs.value0.value3.value4, ctxs.value0.value3.value5, new Two(ctxs.value0.value3.value6, ctxs.value0.value4, ctxs.value0.value5, tree2)));
              }
              ;
              $tco_done = true;
              return unsafeCrashWith("The impossible happened in partial function `up`.");
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 552, column 5 - line 573, column 86): " + [ctxs.constructor.name]);
          }
          ;
          while (!$tco_done) {
            $tco_result = $tco_loop($tco_var_ctxs, $copy_tree);
          }
          ;
          return $tco_result;
        };
      };
      var removeMaxNode = function($copy_ctx) {
        return function($copy_m) {
          var $tco_var_ctx = $copy_ctx;
          var $tco_done1 = false;
          var $tco_result;
          function $tco_loop(ctx, m2) {
            if (m2 instanceof Two && (m2.value0 instanceof Leaf && m2.value3 instanceof Leaf)) {
              $tco_done1 = true;
              return up(ctx)(Leaf.value);
            }
            ;
            if (m2 instanceof Two) {
              $tco_var_ctx = new Cons(new TwoRight(m2.value0, m2.value1, m2.value2), ctx);
              $copy_m = m2.value3;
              return;
            }
            ;
            if (m2 instanceof Three && (m2.value0 instanceof Leaf && (m2.value3 instanceof Leaf && m2.value6 instanceof Leaf))) {
              $tco_done1 = true;
              return up(new Cons(new TwoRight(Leaf.value, m2.value1, m2.value2), ctx))(Leaf.value);
            }
            ;
            if (m2 instanceof Three) {
              $tco_var_ctx = new Cons(new ThreeRight(m2.value0, m2.value1, m2.value2, m2.value3, m2.value4, m2.value5), ctx);
              $copy_m = m2.value6;
              return;
            }
            ;
            $tco_done1 = true;
            return unsafeCrashWith("The impossible happened in partial function `removeMaxNode`.");
          }
          ;
          while (!$tco_done1) {
            $tco_result = $tco_loop($tco_var_ctx, $copy_m);
          }
          ;
          return $tco_result;
        };
      };
      var maxNode = function($copy_m) {
        var $tco_done2 = false;
        var $tco_result;
        function $tco_loop(m2) {
          if (m2 instanceof Two && m2.value3 instanceof Leaf) {
            $tco_done2 = true;
            return {
              key: m2.value1,
              value: m2.value2
            };
          }
          ;
          if (m2 instanceof Two) {
            $copy_m = m2.value3;
            return;
          }
          ;
          if (m2 instanceof Three && m2.value6 instanceof Leaf) {
            $tco_done2 = true;
            return {
              key: m2.value4,
              value: m2.value5
            };
          }
          ;
          if (m2 instanceof Three) {
            $copy_m = m2.value6;
            return;
          }
          ;
          $tco_done2 = true;
          return unsafeCrashWith("The impossible happened in partial function `maxNode`.");
        }
        ;
        while (!$tco_done2) {
          $tco_result = $tco_loop($copy_m);
        }
        ;
        return $tco_result;
      };
      var comp = compare(dictOrd);
      var down = function($copy_ctx) {
        return function($copy_m) {
          var $tco_var_ctx = $copy_ctx;
          var $tco_done3 = false;
          var $tco_result;
          function $tco_loop(ctx, m2) {
            if (m2 instanceof Leaf) {
              $tco_done3 = true;
              return Nothing.value;
            }
            ;
            if (m2 instanceof Two) {
              var v = comp(k)(m2.value1);
              if (m2.value3 instanceof Leaf && v instanceof EQ) {
                $tco_done3 = true;
                return new Just(new Tuple(m2.value2, up(ctx)(Leaf.value)));
              }
              ;
              if (v instanceof EQ) {
                var max6 = maxNode(m2.value0);
                $tco_done3 = true;
                return new Just(new Tuple(m2.value2, removeMaxNode(new Cons(new TwoLeft(max6.key, max6.value, m2.value3), ctx))(m2.value0)));
              }
              ;
              if (v instanceof LT) {
                $tco_var_ctx = new Cons(new TwoLeft(m2.value1, m2.value2, m2.value3), ctx);
                $copy_m = m2.value0;
                return;
              }
              ;
              $tco_var_ctx = new Cons(new TwoRight(m2.value0, m2.value1, m2.value2), ctx);
              $copy_m = m2.value3;
              return;
            }
            ;
            if (m2 instanceof Three) {
              var leaves = function() {
                if (m2.value0 instanceof Leaf && (m2.value3 instanceof Leaf && m2.value6 instanceof Leaf)) {
                  return true;
                }
                ;
                return false;
              }();
              var v = comp(k)(m2.value4);
              var v3 = comp(k)(m2.value1);
              if (leaves && v3 instanceof EQ) {
                $tco_done3 = true;
                return new Just(new Tuple(m2.value2, fromZipper(dictOrd)(ctx)(new Two(Leaf.value, m2.value4, m2.value5, Leaf.value))));
              }
              ;
              if (leaves && v instanceof EQ) {
                $tco_done3 = true;
                return new Just(new Tuple(m2.value5, fromZipper(dictOrd)(ctx)(new Two(Leaf.value, m2.value1, m2.value2, Leaf.value))));
              }
              ;
              if (v3 instanceof EQ) {
                var max6 = maxNode(m2.value0);
                $tco_done3 = true;
                return new Just(new Tuple(m2.value2, removeMaxNode(new Cons(new ThreeLeft(max6.key, max6.value, m2.value3, m2.value4, m2.value5, m2.value6), ctx))(m2.value0)));
              }
              ;
              if (v instanceof EQ) {
                var max6 = maxNode(m2.value3);
                $tco_done3 = true;
                return new Just(new Tuple(m2.value5, removeMaxNode(new Cons(new ThreeMiddle(m2.value0, m2.value1, m2.value2, max6.key, max6.value, m2.value6), ctx))(m2.value3)));
              }
              ;
              if (v3 instanceof LT) {
                $tco_var_ctx = new Cons(new ThreeLeft(m2.value1, m2.value2, m2.value3, m2.value4, m2.value5, m2.value6), ctx);
                $copy_m = m2.value0;
                return;
              }
              ;
              if (v3 instanceof GT && v instanceof LT) {
                $tco_var_ctx = new Cons(new ThreeMiddle(m2.value0, m2.value1, m2.value2, m2.value4, m2.value5, m2.value6), ctx);
                $copy_m = m2.value3;
                return;
              }
              ;
              $tco_var_ctx = new Cons(new ThreeRight(m2.value0, m2.value1, m2.value2, m2.value3, m2.value4, m2.value5), ctx);
              $copy_m = m2.value6;
              return;
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 525, column 16 - line 548, column 80): " + [m2.constructor.name]);
          }
          ;
          while (!$tco_done3) {
            $tco_result = $tco_loop($tco_var_ctx, $copy_m);
          }
          ;
          return $tco_result;
        };
      };
      return down(Nil.value);
    };
  };
  var foldableMap = {
    foldr: function(f) {
      return function(z) {
        return function(m2) {
          if (m2 instanceof Leaf) {
            return z;
          }
          ;
          if (m2 instanceof Two) {
            return foldr(foldableMap)(f)(f(m2.value2)(foldr(foldableMap)(f)(z)(m2.value3)))(m2.value0);
          }
          ;
          if (m2 instanceof Three) {
            return foldr(foldableMap)(f)(f(m2.value2)(foldr(foldableMap)(f)(f(m2.value5)(foldr(foldableMap)(f)(z)(m2.value6)))(m2.value3)))(m2.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 133, column 17 - line 136, column 85): " + [m2.constructor.name]);
        };
      };
    },
    foldl: function(f) {
      return function(z) {
        return function(m2) {
          if (m2 instanceof Leaf) {
            return z;
          }
          ;
          if (m2 instanceof Two) {
            return foldl(foldableMap)(f)(f(foldl(foldableMap)(f)(z)(m2.value0))(m2.value2))(m2.value3);
          }
          ;
          if (m2 instanceof Three) {
            return foldl(foldableMap)(f)(f(foldl(foldableMap)(f)(f(foldl(foldableMap)(f)(z)(m2.value0))(m2.value2))(m2.value3))(m2.value5))(m2.value6);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 137, column 17 - line 140, column 85): " + [m2.constructor.name]);
        };
      };
    },
    foldMap: function(dictMonoid) {
      return function(f) {
        return function(m2) {
          if (m2 instanceof Leaf) {
            return mempty(dictMonoid);
          }
          ;
          if (m2 instanceof Two) {
            return append(dictMonoid.Semigroup0())(foldMap(foldableMap)(dictMonoid)(f)(m2.value0))(append(dictMonoid.Semigroup0())(f(m2.value2))(foldMap(foldableMap)(dictMonoid)(f)(m2.value3)));
          }
          ;
          if (m2 instanceof Three) {
            return append(dictMonoid.Semigroup0())(foldMap(foldableMap)(dictMonoid)(f)(m2.value0))(append(dictMonoid.Semigroup0())(f(m2.value2))(append(dictMonoid.Semigroup0())(foldMap(foldableMap)(dictMonoid)(f)(m2.value3))(append(dictMonoid.Semigroup0())(f(m2.value5))(foldMap(foldableMap)(dictMonoid)(f)(m2.value6)))));
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 141, column 17 - line 144, column 93): " + [m2.constructor.name]);
        };
      };
    }
  };
  var foldableWithIndexMap = {
    foldrWithIndex: function(f) {
      return function(z) {
        return function(m2) {
          if (m2 instanceof Leaf) {
            return z;
          }
          ;
          if (m2 instanceof Two) {
            return foldrWithIndex(foldableWithIndexMap)(f)(f(m2.value1)(m2.value2)(foldrWithIndex(foldableWithIndexMap)(f)(z)(m2.value3)))(m2.value0);
          }
          ;
          if (m2 instanceof Three) {
            return foldrWithIndex(foldableWithIndexMap)(f)(f(m2.value1)(m2.value2)(foldrWithIndex(foldableWithIndexMap)(f)(f(m2.value4)(m2.value5)(foldrWithIndex(foldableWithIndexMap)(f)(z)(m2.value6)))(m2.value3)))(m2.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 147, column 26 - line 150, column 120): " + [m2.constructor.name]);
        };
      };
    },
    foldlWithIndex: function(f) {
      return function(z) {
        return function(m2) {
          if (m2 instanceof Leaf) {
            return z;
          }
          ;
          if (m2 instanceof Two) {
            return foldlWithIndex(foldableWithIndexMap)(f)(f(m2.value1)(foldlWithIndex(foldableWithIndexMap)(f)(z)(m2.value0))(m2.value2))(m2.value3);
          }
          ;
          if (m2 instanceof Three) {
            return foldlWithIndex(foldableWithIndexMap)(f)(f(m2.value4)(foldlWithIndex(foldableWithIndexMap)(f)(f(m2.value1)(foldlWithIndex(foldableWithIndexMap)(f)(z)(m2.value0))(m2.value2))(m2.value3))(m2.value5))(m2.value6);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 151, column 26 - line 154, column 120): " + [m2.constructor.name]);
        };
      };
    },
    foldMapWithIndex: function(dictMonoid) {
      return function(f) {
        return function(m2) {
          if (m2 instanceof Leaf) {
            return mempty(dictMonoid);
          }
          ;
          if (m2 instanceof Two) {
            return append(dictMonoid.Semigroup0())(foldMapWithIndex(foldableWithIndexMap)(dictMonoid)(f)(m2.value0))(append(dictMonoid.Semigroup0())(f(m2.value1)(m2.value2))(foldMapWithIndex(foldableWithIndexMap)(dictMonoid)(f)(m2.value3)));
          }
          ;
          if (m2 instanceof Three) {
            return append(dictMonoid.Semigroup0())(foldMapWithIndex(foldableWithIndexMap)(dictMonoid)(f)(m2.value0))(append(dictMonoid.Semigroup0())(f(m2.value1)(m2.value2))(append(dictMonoid.Semigroup0())(foldMapWithIndex(foldableWithIndexMap)(dictMonoid)(f)(m2.value3))(append(dictMonoid.Semigroup0())(f(m2.value4)(m2.value5))(foldMapWithIndex(foldableWithIndexMap)(dictMonoid)(f)(m2.value6)))));
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 155, column 26 - line 158, column 128): " + [m2.constructor.name]);
        };
      };
    },
    Foldable0: function() {
      return foldableMap;
    }
  };
  var values = /* @__PURE__ */ function() {
    return foldr(foldableMap)(Cons.create)(Nil.value);
  }();
  var empty6 = /* @__PURE__ */ function() {
    return Leaf.value;
  }();
  var fromFoldable3 = function(dictOrd) {
    return function(dictFoldable) {
      return foldl(dictFoldable)(function(m2) {
        return function(v) {
          return insert2(dictOrd)(v.value0)(v.value1)(m2);
        };
      })(empty6);
    };
  };
  var filterWithKey = function(dictOrd) {
    return function(predicate) {
      var $797 = fromFoldable3(dictOrd)(foldableList2);
      var $798 = filter3(uncurry(predicate));
      var $799 = toUnfoldable2(unfoldableList);
      return function($800) {
        return $797($798($799($800)));
      };
    };
  };
  var filter4 = function(dictOrd) {
    return function(predicate) {
      return filterWithKey(dictOrd)($$const(predicate));
    };
  };
  var mapMaybeWithKey = function(dictOrd) {
    return function(f) {
      return foldrWithIndex(foldableWithIndexMap)(function(k) {
        return function(a) {
          return function(acc) {
            return maybe(acc)(function(b2) {
              return insert2(dictOrd)(k)(b2)(acc);
            })(f(k)(a));
          };
        };
      })(empty6);
    };
  };
  var mapMaybe3 = function(dictOrd) {
    var $802 = mapMaybeWithKey(dictOrd);
    return function($803) {
      return $802($$const($803));
    };
  };
  var $$delete2 = function(dictOrd) {
    return function(k) {
      return function(m2) {
        return maybe(m2)(snd)(pop(dictOrd)(k)(m2));
      };
    };
  };
  var alter = function(dictOrd) {
    return function(f) {
      return function(k) {
        return function(m2) {
          var v = f(lookup2(dictOrd)(k)(m2));
          if (v instanceof Nothing) {
            return $$delete2(dictOrd)(k)(m2);
          }
          ;
          if (v instanceof Just) {
            return insert2(dictOrd)(k)(v.value0)(m2);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 596, column 15 - line 598, column 25): " + [v.constructor.name]);
        };
      };
    };
  };
  var unionWith = function(dictOrd) {
    return function(f) {
      return function(m1) {
        return function(m2) {
          var go2 = function(k) {
            return function(m3) {
              return function(v) {
                return alter(dictOrd)(function() {
                  var $808 = maybe(v)(f(v));
                  return function($809) {
                    return Just.create($808($809));
                  };
                }())(k)(m3);
              };
            };
          };
          return foldlWithIndex(foldableWithIndexMap)(go2)(m2)(m1);
        };
      };
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
        return function(d2) {
          var g = gcd(dictOrd.Eq0())(dictEuclideanRing)(n)(d2);
          var d$prime = div(dictEuclideanRing)(d2)(g);
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
  var eqRatio = function(dictEq) {
    return {
      eq: function(v) {
        return function(v1) {
          return eq(dictEq)(v.value0)(v1.value0) && eq(dictEq)(v.value1)(v1.value1);
        };
      }
    };
  };
  var ordRatio = function(dictOrd) {
    return function(dictEuclideanRing) {
      return {
        compare: function(x) {
          return function(y) {
            var v = sub(ringRatio(dictOrd)(dictEuclideanRing))(x)(y);
            var $70 = eq(dictOrd.Eq0())(v.value0)(zero(dictEuclideanRing.CommutativeRing0().Ring0().Semiring0()));
            if ($70) {
              return EQ.value;
            }
            ;
            var v1 = greaterThan(dictOrd)(v.value1)(zero(dictEuclideanRing.CommutativeRing0().Ring0().Semiring0()));
            var v2 = greaterThan(dictOrd)(v.value0)(zero(dictEuclideanRing.CommutativeRing0().Ring0().Semiring0()));
            if (v2 && v1) {
              return GT.value;
            }
            ;
            if (!v2 && !v1) {
              return GT.value;
            }
            ;
            return LT.value;
          };
        },
        Eq0: function() {
          return eqRatio(dictOrd.Eq0());
        }
      };
    };
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

  // output/Data.Sparse.Polynomial/index.js
  var Poly = /* @__PURE__ */ function() {
    function Poly2(value0) {
      this.value0 = value0;
    }
    ;
    Poly2.create = function(value0) {
      return new Poly2(value0);
    };
    return Poly2;
  }();
  var semiringPoly = function(dictEq) {
    return function(dictSemiring) {
      return {
        add: function(v) {
          return function(v1) {
            return new Poly(filter4(ordInt)(function(v2) {
              return notEq(dictEq)(v2)(zero(dictSemiring));
            })(unionWith(ordInt)(add(dictSemiring))(v.value0)(v1.value0)));
          };
        },
        mul: function(v) {
          return function(v1) {
            return new Poly(filter4(ordInt)(function(v2) {
              return notEq(dictEq)(v2)(zero(dictSemiring));
            })(foldr(foldableArray)(unionWith(ordInt)(add(dictSemiring)))(empty6)(map(functorArray)(function(v2) {
              return foldrWithIndex(foldableWithIndexMap)(function(j) {
                return function(w) {
                  return function(acc) {
                    return insert2(ordInt)(v2.value0 + j | 0)(mul(dictSemiring)(v2.value1)(w))(acc);
                  };
                };
              })(empty6)(v1.value0);
            })(toUnfoldable2(unfoldableArray)(v.value0)))));
          };
        },
        zero: new Poly(empty6),
        one: new Poly(singleton7(0)(one(dictSemiring)))
      };
    };
  };
  var query = function(dictSemiring) {
    return function(v) {
      return function(n) {
        return fromMaybe(zero(dictSemiring))(lookup2(ordInt)(n)(v.value0));
      };
    };
  };
  var monoPol = function(x) {
    return function(n) {
      return new Poly(insert2(ordInt)(n)(x)(empty6));
    };
  };
  var functorPoly = {
    map: function(f) {
      return function(v) {
        return new Poly(mapMaybe3(ordInt)(function(v1) {
          return new Just(f(v1));
        })(v.value0));
      };
    }
  };
  var ringPoly = function(dictEq) {
    return function(dictSemiring) {
      return function(dictRing) {
        return {
          sub: function(p1) {
            return function(p2) {
              return add(semiringPoly(dictEq)(dictRing.Semiring0()))(p1)(map(functorPoly)(function(v) {
                return mul(dictRing.Semiring0())(v)(negate(dictRing)(one(dictRing.Semiring0())));
              })(p2));
            };
          },
          Semiring0: function() {
            return semiringPoly(dictEq)(dictRing.Semiring0());
          }
        };
      };
    };
  };

  // output/Data.Geometry.Plane/index.js
  var vector = function(v) {
    return function(v1) {
      return sub(ringPoly(eqNumber)(semiringNumber)(ringNumber))(v1.coordinates)(v.coordinates);
    };
  };
  var summableVectorVector = {
    plus: function(v) {
      return function(v1) {
        return add(semiringPoly(eqNumber)(semiringNumber))(v)(v1);
      };
    }
  };
  var segment = function(origin2) {
    return function(extremity) {
      return function(asOriented) {
        return {
          origin: origin2,
          extremity,
          asOriented
        };
      };
    };
  };
  var point = function(name15) {
    return function(x) {
      return function(y) {
        return {
          name: name15,
          coordinates: add(semiringPoly(eqNumber)(semiringNumber))(monoPol(x)(0))(monoPol(y)(1))
        };
      };
    };
  };
  var plus = function(dict) {
    return dict.plus;
  };
  var ord = function(dict) {
    return dict.ord;
  };
  var middle = function(name15) {
    return function(v) {
      return {
        name: name15,
        coordinates: mul(semiringPoly(eqNumber)(semiringNumber))(add(semiringPoly(eqNumber)(semiringNumber))(v.origin.coordinates)(v.extremity.coordinates))(monoPol(0.5)(0))
      };
    };
  };
  var length5 = function(dict) {
    return dict.length;
  };
  var coords = function(dict) {
    return dict.coords;
  };
  var basedVector = {
    abs: function(v) {
      return query(semiringNumber)(v)(0);
    },
    ord: function(v) {
      return query(semiringNumber)(v)(1);
    },
    coords: function(v) {
      return v;
    }
  };
  var basedPoint = {
    abs: function(v) {
      return query(semiringNumber)(v.coordinates)(0);
    },
    ord: function(v) {
      return query(semiringNumber)(v.coordinates)(1);
    },
    coords: function(v) {
      return v.coordinates;
    }
  };
  var summublePointVector = {
    plus: function(p) {
      return function(v) {
        return {
          name: "",
          coordinates: add(semiringPoly(eqNumber)(semiringNumber))(coords(basedPoint)(p))(coords(basedVector)(v))
        };
      };
    }
  };
  var abs3 = function(dict) {
    return dict.abs;
  };
  var measurableVector = {
    length: function(v) {
      return sqrt(abs3(basedVector)(v) * abs3(basedVector)(v) + ord(basedVector)(v) * ord(basedVector)(v));
    }
  };
  var rotated = function(ang) {
    return function(v) {
      return add(semiringPoly(eqNumber)(semiringNumber))(monoPol(abs3(basedVector)(v) * cos(ang) - ord(basedVector)(v) * sin(ang))(0))(monoPol(abs3(basedVector)(v) * sin(ang) + ord(basedVector)(v) * cos(ang))(1));
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
  var setTitle = function(str) {
    return put3(functorStateT(functorIdentity))(monadStateStateT(monadIdentity))(h1(widgetMultiAlternative(monoidArray))(widgetShiftMap)([])([text(widgetLiftWidget)(str)]));
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
    return function(t) {
      return defer2(function(v) {
        return new Tuple(a, t);
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

  // output/Data.String.CodePoints/foreign.js
  var hasArrayFrom = typeof Array.from === "function";
  var hasStringIterator = typeof Symbol !== "undefined" && Symbol != null && typeof Symbol.iterator !== "undefined" && typeof String.prototype[Symbol.iterator] === "function";
  var hasFromCodePoint = typeof String.prototype.fromCodePoint === "function";
  var hasCodePointAt = typeof String.prototype.codePointAt === "function";
  var _singleton = function(fallback) {
    return hasFromCodePoint ? String.fromCodePoint : fallback;
  };

  // output/Data.String.CodePoints/index.js
  var $runtime_lazy7 = function(name15, moduleName, init3) {
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
  var fromCharCode2 = /* @__PURE__ */ function() {
    var $53 = toEnumWithDefaults(boundedEnumChar)(bottom(boundedChar))(top(boundedChar));
    return function($54) {
      return singleton5($53($54));
    };
  }();
  var singletonFallback = function(v) {
    if (v <= 65535) {
      return fromCharCode2(v);
    }
    ;
    var lead = div(euclideanRingInt)(v - 65536 | 0)(1024) + 55296 | 0;
    var trail = mod(euclideanRingInt)(v - 65536 | 0)(1024) + 56320 | 0;
    return fromCharCode2(lead) + fromCharCode2(trail);
  };
  var singleton8 = /* @__PURE__ */ _singleton(singletonFallback);
  var eqCodePoint = {
    eq: function(x) {
      return function(y) {
        return x === y;
      };
    }
  };
  var ordCodePoint = {
    compare: function(x) {
      return function(y) {
        return compare(ordInt)(x)(y);
      };
    },
    Eq0: function() {
      return eqCodePoint;
    }
  };
  var boundedCodePoint = {
    bottom: 0,
    top: 1114111,
    Ord0: function() {
      return ordCodePoint;
    }
  };
  var boundedEnumCodePoint = /* @__PURE__ */ function() {
    return {
      cardinality: 1114111 + 1 | 0,
      fromEnum: function(v) {
        return v;
      },
      toEnum: function(n) {
        if (n >= 0 && n <= 1114111) {
          return new Just(n);
        }
        ;
        if (otherwise) {
          return Nothing.value;
        }
        ;
        throw new Error("Failed pattern match at Data.String.CodePoints (line 63, column 1 - line 68, column 26): " + [n.constructor.name]);
      },
      Bounded0: function() {
        return boundedCodePoint;
      },
      Enum1: function() {
        return $lazy_enumCodePoint(0);
      }
    };
  }();
  var $lazy_enumCodePoint = /* @__PURE__ */ $runtime_lazy7("enumCodePoint", "Data.String.CodePoints", function() {
    return {
      succ: defaultSucc(toEnum(boundedEnumCodePoint))(fromEnum(boundedEnumCodePoint)),
      pred: defaultPred(toEnum(boundedEnumCodePoint))(fromEnum(boundedEnumCodePoint)),
      Ord0: function() {
        return ordCodePoint;
      }
    };
  });

  // output/Concur.VDom.GeometryRender/index.js
  var text3 = function(x) {
    return function(y) {
      return function(color) {
        return function(fontStyle) {
          return function(str) {
            return text2(widgetMultiAlternative(monoidArray))(widgetShiftMap)([unsafeMkProp(showInt)("x")(round2(x)), unsafeMkProp(showInt)("y")(round2(y)), style("fill:" + (color + ("; font:" + (fontStyle + "; "))))])([text(widgetLiftWidget)(str)]);
          };
        };
      };
    };
  };
  var render$prime = function(dict) {
    return dict["render'"];
  };
  var renderSequence = function(dictRender) {
    return {
      "render'": function(ctx) {
        return function(arr) {
          return concat(map(functorArray)(render$prime(dictRender)(ctx))(arr));
        };
      }
    };
  };
  var pathCoord = function(p) {
    return " " + (show(showNumber)(abs3(basedPoint)(p)) + (" " + (show(showNumber)(ord(basedPoint)(p)) + " ")));
  };
  var path2 = function(stroke2) {
    return function(strokeWidth2) {
      return function(fill) {
        return function(content3) {
          return path(widgetMultiAlternative(monoidArray))(widgetShiftMap)([d(content3), style("stroke:" + (stroke2 + ("; stroke-width:" + (show(showInt)(round2(strokeWidth2)) + ("; fill:" + (fill + ";"))))))])([]);
        };
      };
    };
  };
  var line2 = function(x1) {
    return function(y1) {
      return function(x2) {
        return function(y2) {
          return function(color) {
            return function(size5) {
              return line(widgetMultiAlternative(monoidArray))(widgetShiftMap)([unsafeMkProp(showInt)("x1")(round2(x1)), unsafeMkProp(showInt)("x2")(round2(x2)), unsafeMkProp(showInt)("y1")(round2(y1)), unsafeMkProp(showInt)("y2")(round2(y2)), stroke(color), strokeWidth(round2(size5))])([]);
            };
          };
        };
      };
    };
  };
  var arrowLength = 20;
  var arrowBluntness = 0.2;
  var arrowTip = function(v) {
    var v1 = vector(v.origin)(v.extremity);
    var v0 = monoPol(length5(measurableVector)(v1))(0);
    var ang = atan2(ord(basedVector)(v1))(abs3(basedVector)(v1));
    var f = function(theta) {
      var v11 = rotated(theta)(monoPol(arrowLength)(0));
      return plus(summublePointVector)(v.origin)(rotated(ang)(plus(summableVectorVector)(v11)(v0)));
    };
    return {
      at1: f(pi - arrowBluntness),
      at2: f(pi + arrowBluntness)
    };
  };
  var renderSegment = {
    "render'": function(v) {
      return function(v1) {
        var m2 = middle("")(v1);
        return append(semigroupArray)([line2(abs3(basedPoint)(v1.origin))(ord(basedPoint)(v1.origin))(abs3(basedPoint)(v1.extremity))(ord(basedPoint)(v1.extremity))(v.stroke)(v.strokeWidth)])(append(semigroupArray)(maybe([])(function(v2) {
          var v3 = arrowTip(v1);
          return [path2(v.stroke)(v.strokeWidth)(v.stroke)("M" + (pathCoord(v3.at1) + ("L" + (pathCoord(v1.extremity) + ("L" + (pathCoord(v3.at2) + "Z"))))))];
        })(v1.asOriented))(maybe([])(function(str) {
          return [text3(abs3(basedPoint)(m2) + 10)(ord(basedPoint)(m2) - 10)(v.textFill)(v.fontStyle)(str), text3(abs3(basedPoint)(m2) + 10)(ord(basedPoint)(m2) - 23)(v.textFill)(v.fontStyle)(function() {
            var $82 = str === "";
            if ($82) {
              return "";
            }
            ;
            return singleton8(fromJust()(toEnum(boundedEnumCodePoint)(8594)));
          }())];
        })(v1.asOriented)));
      };
    }
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

  // output/Data.Rational/index.js
  var fromInt = function(i) {
    return reduce(ordInt)(euclideanRingInt)(i)(1);
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

  // output/Main/index.js
  var validExperience = function(e) {
    var vs = fromFoldable(foldableList)(values(e));
    var valid = function(x) {
      return lessThan(ordRatio(ordInt)(euclideanRingInt))(fromInt(0))(x) && lessThan(ordRatio(ordInt)(euclideanRingInt))(x)(fromInt(1));
    };
    return length3(vs) === 16 && all(foldableArray)(heytingAlgebraBoolean)(valid)(vs);
  };
  var showFraction = function(f) {
    var $16 = denominator(f) === 1;
    if ($16) {
      return show(showInt)(numerator(f));
    }
    ;
    return "\\frac{" + (show(showInt)(numerator(f)) + ("}{" + (show(showInt)(denominator(f)) + "}")));
  };
  var setWithIndex = function(n) {
    return function(f) {
      return function(e) {
        return insert2(ordString)(function() {
          if (n === 0) {
            return "pA";
          }
          ;
          if (n === 1) {
            return "pnA";
          }
          ;
          if (n === 2) {
            return "pB";
          }
          ;
          if (n === 3) {
            return "pnB";
          }
          ;
          if (n === 4) {
            return "pAB";
          }
          ;
          if (n === 5) {
            return "pAnB";
          }
          ;
          if (n === 6) {
            return "pnAB";
          }
          ;
          if (n === 7) {
            return "pnAnB";
          }
          ;
          if (n === 8) {
            return "pgAB";
          }
          ;
          if (n === 9) {
            return "pgAnB";
          }
          ;
          if (n === 10) {
            return "pgnAB";
          }
          ;
          if (n === 11) {
            return "pgnAnB";
          }
          ;
          if (n === 12) {
            return "pgBA";
          }
          ;
          if (n === 13) {
            return "pgBnA";
          }
          ;
          if (n === 14) {
            return "pgnBA";
          }
          ;
          return "pgnBnA";
        }())(f)(e);
      };
    };
  };
  var ptot = function(pa) {
    return function(pab) {
      return function(panb) {
        return function(e) {
          var $18 = [lookup2(ordString)(pa)(e), lookup2(ordString)(pab)(e), lookup2(ordString)(panb)(e)];
          if ($18.length === 3 && ($18[0] instanceof Just && ($18[1] instanceof Just && $18[2] instanceof Nothing))) {
            return new Just(insert2(ordString)(panb)(sub(ringRatio(ordInt)(euclideanRingInt))($18[0].value0)($18[1].value0))(e));
          }
          ;
          if ($18.length === 3 && ($18[0] instanceof Just && ($18[1] instanceof Nothing && $18[2] instanceof Just))) {
            return new Just(insert2(ordString)(pab)(sub(ringRatio(ordInt)(euclideanRingInt))($18[0].value0)($18[2].value0))(e));
          }
          ;
          if ($18.length === 3 && ($18[0] instanceof Nothing && ($18[1] instanceof Just && $18[2] instanceof Just))) {
            return new Just(insert2(ordString)(pa)(add(semiringRatio(ordInt)(euclideanRingInt))($18[1].value0)($18[2].value0))(e));
          }
          ;
          return Nothing.value;
        };
      };
    };
  };
  var print6 = function(e) {
    return function(key) {
      var v = lookup2(ordString)(key)(e);
      if (v instanceof Just) {
        return showFraction(v.value0);
      }
      ;
      if (v instanceof Nothing) {
        return "";
      }
      ;
      throw new Error("Failed pattern match at Main (line 143, column 9 - line 145, column 27): " + [v.constructor.name]);
    };
  };
  var tree = function(e) {
    var o = {
      x: 9,
      y: 27
    };
    var dress = function(str) {
      return function(x) {
        return function(k) {
          var v = lookup2(ordString)(k)(x);
          if (v instanceof Just) {
            return "\\quad " + (str + showFraction(v.value0));
          }
          ;
          if (v instanceof Nothing) {
            return "";
          }
          ;
          throw new Error("Failed pattern match at Main (line 165, column 9 - line 167, column 25): " + [v.constructor.name]);
        };
      };
    };
    var pAB$prime = dress("P(A\\cap B)=")(e)("pAB");
    var pAnB$prime = dress("P(A\\cap\\overline{B})=")(e)("pAnB");
    var pB$prime = dress("P(B)=")(e)("pB");
    var pgBA$prime = dress("P_B(A)=")(e)("pgBA");
    var pgBnA$prime = dress("P_B(\\overline{A})=")(e)("pgBnA");
    var pgnBA$prime = dress("P_{\\overline{B}}(A)=")(e)("pgnBA");
    var pgnBnA$prime = dress("P_{\\overline{B}}(\\overline{A})=")(e)("pgnBnA");
    var pnAB$prime = dress("P(\\overline{A}\\cap B)=")(e)("pnAB");
    var pnAnB$prime = dress("P(\\overline{A}\\cap\\overline{B})=")(e)("pnAnB");
    var pnB$prime = dress("P(\\overline{B})=")(e)("pnB");
    var dot = function(v) {
      return point("")(v.x)(v.y);
    };
    var endA$primeB = dot({
      x: o.x + 188,
      y: o.y + 184
    });
    var endA$primeB$prime = dot({
      x: o.x + 188,
      y: o.y + 296
    });
    var endAB = dot({
      x: o.x + 188,
      y: o.y
    });
    var endAB$prime = dot({
      x: o.x + 188,
      y: o.y + 112
    });
    var nodeA = dot({
      x: o.x + 88,
      y: o.y + 68
    });
    var nodeA$prime = dot({
      x: o.x + 88,
      y: o.y + 220
    });
    var root = dot({
      x: o.x,
      y: o.y + 151
    });
    var startA = dot({
      x: o.x + 122,
      y: o.y + 60
    });
    var startA$prime = dot({
      x: o.x + 122,
      y: o.y + 244
    });
    var context = {
      stroke: "#000",
      strokeWidth: 1.5,
      fill: "#00000000",
      fontStyle: "italic 15px arial, sans-serif",
      textFill: "#000"
    };
    return fromIncremental(discard(discardUnit)(bindStateT(monadIdentity))(put3(functorStateT(functorIdentity))(monadStateStateT(monadIdentity))(svg(widgetMultiAlternative(monoidArray))(widgetShiftMap)([width2("500"), height2("400"), attr2("style")("position: absolute; ")])(render$prime(renderSequence(renderSegment))(context)([segment(root)(nodeA)(Nothing.value), segment(root)(nodeA$prime)(Nothing.value), segment(startA)(endAB)(Nothing.value), segment(startA)(endAB$prime)(Nothing.value), segment(startA$prime)(endA$primeB)(Nothing.value), segment(startA$prime)(endA$primeB$prime)(Nothing.value)]))))(function() {
      return discard(discardUnit)(bindStateT(monadIdentity))(m("\\boxed{\\begin{array}{cccccccccccl} & & & & & & & & B \\\\ " + ("& & & & & " + (print6(e)("pgAB") + ("&&&&&&" + (pB$prime + (" \\\\" + (" \\\\ " + ("& & & & A " + ("&&&&&&&" + (pnB$prime + ("\\\\ " + ("&" + (print6(e)("pA") + ("&&&&&&&&&&" + (pAB$prime + (" \\\\ " + ("& & & & &" + (print6(e)("pgAnB") + ("&&&&&&" + (pAnB$prime + (" \\\\ " + ("& & & & & & & &" + ("\\overline{B} " + ("&&&" + (pnAB$prime + ("\\\\ " + ("\\cdot " + ("&&&&&&&&&&&" + (pnAnB$prime + ("\\\\ " + ("& & & & &\xA0& & &" + ("B " + ("&&&" + (pgBA$prime + ("\\\\ " + ("& & & & & " + (print6(e)("pgnAB") + ("&&&&&&" + (pgBnA$prime + (" \\\\ " + ("&" + (print6(e)("pnA") + ("&&&&&&&&&&" + (pgnBA$prime + (" \\\\ " + ("& & & & \\overline{A}" + ("&&&&&&&" + (pgnBnA$prime + ("\\\\ " + (" \\\\" + ("& & & & & " + (print6(e)("pgnAnB") + " \\\\ & & & & & & & & \\overline{B} \\end{array}}")))))))))))))))))))))))))))))))))))))))))))))))))))))(function() {
        return get2(monadStateStateT(monadIdentity));
      });
    }));
  };
  var primes = [2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 5, 5, 5, 5];
  var majIndex = 12;
  var initialState = /* @__PURE__ */ function() {
    return {
      seed: Nothing.value,
      enabled: false
    };
  }();
  var header = /* @__PURE__ */ div$prime(/* @__PURE__ */ widgetMultiAlternative(monoidArray))(widgetShiftMap)(/* @__PURE__ */ fromIncremental(/* @__PURE__ */ discard(discardUnit)(/* @__PURE__ */ bindStateT(monadIdentity))(/* @__PURE__ */ setTitle("Devoir 4 : Probabilit\xE9s conditionnelles"))(function() {
    return discard(discardUnit)(bindStateT(monadIdentity))(nl)(function() {
      return discard(discardUnit)(bindStateT(monadIdentity))(put3(functorStateT(functorIdentity))(monadStateStateT(monadIdentity))(div2(widgetMultiAlternative(monoidArray))(widgetShiftMap)([attr("style")("display: grid; grid-template-columns: 1fr 1fr 1fr;")])([label(widgetMultiAlternative(monoidArray))(widgetShiftMap)([])([text(widgetLiftWidget)("Nom:")]), label(widgetMultiAlternative(monoidArray))(widgetShiftMap)([])([text(widgetLiftWidget)("Pr\xE9nom:")]), label(widgetMultiAlternative(monoidArray))(widgetShiftMap)([])([text(widgetLiftWidget)("Classe:")])])))(function() {
        return discard(discardUnit)(bindStateT(monadIdentity))(put3(functorStateT(functorIdentity))(monadStateStateT(monadIdentity))(ul(widgetMultiAlternative(monoidArray))(widgetShiftMap)([])([li(widgetMultiAlternative(monoidArray))(widgetShiftMap)([])([text(widgetLiftWidget)("5 arbres pond\xE9r\xE9s \xE0 compl\xE9ter \xE0 partir des hypoth\xE8ses")]), li(widgetMultiAlternative(monoidArray))(widgetShiftMap)([])([text(widgetLiftWidget)("1 point par arbre complet")]), li(widgetMultiAlternative(monoidArray))(widgetShiftMap)([])([text(widgetLiftWidget)("calculatrice autoris\xE9e")]), li(widgetMultiAlternative(monoidArray))(widgetShiftMap)([])([text(widgetLiftWidget)("documents autoris\xE9s")]), li(widgetMultiAlternative(monoidArray))(widgetShiftMap)([])([text(widgetLiftWidget)("toute valeur num\xE9rique sous forme fractionnaire")])])))(function() {
          return get2(monadStateStateT(monadIdentity));
        });
      });
    });
  })));
  var dfltInt = {
    dflt: 0
  };
  var dflt = function(dict) {
    return dict.dflt;
  };
  var nth = function(dictHasDefault) {
    return function(xs) {
      return function(n) {
        var v = index(xs)(n);
        if (v instanceof Just) {
          return v.value0;
        }
        ;
        return dflt(dictHasDefault);
      };
    };
  };
  var contr = function(pa) {
    return function(pna) {
      return function(e) {
        var $44 = [lookup2(ordString)(pa)(e), lookup2(ordString)(pna)(e)];
        if ($44.length === 2 && ($44[0] instanceof Just && $44[1] instanceof Nothing)) {
          return new Just(insert2(ordString)(pna)(sub(ringRatio(ordInt)(euclideanRingInt))(fromInt(1))($44[0].value0))(e));
        }
        ;
        if ($44.length === 2 && ($44[0] instanceof Nothing && $44[1] instanceof Just)) {
          return new Just(insert2(ordString)(pa)(sub(ringRatio(ordInt)(euclideanRingInt))(fromInt(1))($44[1].value0))(e));
        }
        ;
        return Nothing.value;
      };
    };
  };
  var cond = function(pc) {
    return function(pi2) {
      return function(pr) {
        return function(e) {
          var $51 = [lookup2(ordString)(pc)(e), lookup2(ordString)(pi2)(e), lookup2(ordString)(pr)(e)];
          if ($51.length === 3 && ($51[0] instanceof Just && ($51[1] instanceof Just && $51[2] instanceof Nothing))) {
            return new Just(insert2(ordString)(pr)(div(euclideanRingRatio(ordInt)(euclideanRingInt))($51[1].value0)($51[0].value0))(e));
          }
          ;
          if ($51.length === 3 && ($51[0] instanceof Just && ($51[1] instanceof Nothing && $51[2] instanceof Just))) {
            return new Just(insert2(ordString)(pi2)(mul(semiringRatio(ordInt)(euclideanRingInt))($51[0].value0)($51[2].value0))(e));
          }
          ;
          if ($51.length === 3 && ($51[0] instanceof Nothing && ($51[1] instanceof Just && $51[2] instanceof Just))) {
            return new Just(insert2(ordString)(pc)(div(euclideanRingRatio(ordInt)(euclideanRingInt))($51[1].value0)($51[2].value0))(e));
          }
          ;
          return Nothing.value;
        };
      };
    };
  };
  var complete2 = function($copy_e) {
    var $tco_done = false;
    var $tco_result;
    function $tco_loop(e) {
      var rules = [contr("pA")("pnA"), contr("pB")("pnB"), contr("pgAB")("pgAnB"), contr("pgnAB")("pgnAnB"), contr("pgBA")("pgBnA"), contr("pgnBA")("pgnBnA"), cond("pgAB")("pAB")("pA"), cond("pgAnB")("pAnB")("pA"), cond("pgnAB")("pnAB")("pnA"), cond("pgnAnB")("pnAnB")("pnA"), cond("pgBA")("pAB")("pB"), cond("pgBnA")("pnAB")("pB"), cond("pgnBA")("pAnB")("pnB"), cond("pgnBnA")("pnAnB")("pnB"), ptot("pA")("pAB")("pAnB"), ptot("pnA")("pnAB")("pnAnB"), ptot("pB")("pAB")("pnAB"), ptot("pnB")("pAnB")("pnAnB")];
      var f = function($copy_xs) {
        var $tco_done1 = false;
        var $tco_result2;
        function $tco_loop2(xs) {
          var v = uncons3(xs);
          if (v instanceof Nothing) {
            $tco_done = true;
            $tco_done1 = true;
            return e;
          }
          ;
          if (v instanceof Just) {
            var v1 = v.value0.head(e);
            if (v1 instanceof Just) {
              $copy_e = v1.value0;
              $tco_done1 = true;
              return;
            }
            ;
            if (v1 instanceof Nothing) {
              $copy_xs = v.value0.tail;
              return;
            }
            ;
            throw new Error("Failed pattern match at Main (line 86, column 16 - line 88, column 36): " + [v1.constructor.name]);
          }
          ;
          throw new Error("Failed pattern match at Main (line 83, column 9 - line 88, column 36): " + [v.constructor.name]);
        }
        ;
        while (!$tco_done1) {
          $tco_result2 = $tco_loop2($copy_xs);
        }
        ;
        return $tco_result2;
      };
      return f(rules);
    }
    ;
    while (!$tco_done) {
      $tco_result = $tco_loop($copy_e);
    }
    ;
    return $tco_result;
  };
  var avgNbFactors = 2;
  var randProba = function($copy_r) {
    var $tco_done = false;
    var $tco_result;
    function $tco_loop(r) {
      var r0 = rand(r);
      var r1 = rand(r0);
      var prime = function(ix) {
        return nth(dfltInt)(primes)(ix);
      };
      var nbNumFactors = 1 + mod(euclideanRingInt)(r0.val)(avgNbFactors) | 0;
      var nrands = map(functorArray)(function(f) {
        return f(r1);
      })(scanl(traversableArray)(compose(semigroupoidFn))(identity(categoryFn))(replicate(nbNumFactors)(rand)));
      var nums = map(functorArray)(map(functorFn)(prime)(function(rnd) {
        return mod(euclideanRingInt)(rnd.val)(length3(primes));
      }))(nrands);
      var r2 = fromMaybe(r1)(last(nrands));
      var nbDenFactors = 1 + mod(euclideanRingInt)(r1.val)(avgNbFactors) | 0;
      var drands = map(functorArray)(function(f) {
        return f(r2);
      })(scanl(traversableArray)(compose(semigroupoidFn))(identity(categoryFn))(replicate(nbDenFactors)(rand)));
      var r3 = fromMaybe(r2)(last(drands));
      var nextRand = rand(r3);
      var dens = map(functorArray)(map(functorFn)(prime)(function(rnd) {
        return mod(euclideanRingInt)(rnd.val)(length3(primes));
      }))(drands);
      var num = foldr(foldableArray)(mul(semiringInt))(1)(difference(eqInt)(nums)(dens));
      var den = foldr(foldableArray)(mul(semiringInt))(1)(difference(eqInt)(dens)(nums));
      if (num < den) {
        $tco_done = true;
        return {
          probability: div(euclideanRingRatio(ordInt)(euclideanRingInt))(fromInt(num))(fromInt(den)),
          nextRand
        };
      }
      ;
      if (num > den) {
        $tco_done = true;
        return {
          probability: div(euclideanRingRatio(ordInt)(euclideanRingInt))(fromInt(den))(fromInt(num)),
          nextRand
        };
      }
      ;
      if (otherwise) {
        $copy_r = nextRand;
        return;
      }
      ;
      throw new Error("Failed pattern match at Main (line 129, column 7 - line 133, column 50): " + [unit.constructor.name]);
    }
    ;
    while (!$tco_done) {
      $tco_result = $tco_loop($copy_r);
    }
    ;
    return $tco_result;
  };
  var randExercise = function($copy_r1) {
    var $tco_done = false;
    var $tco_result;
    function $tco_loop(r1) {
      var modMaj = function(x) {
        return mod(euclideanRingInt)(x)(majIndex);
      };
      var f3 = function($copy_r) {
        return function($copy_s) {
          var $tco_var_r = $copy_r;
          var $tco_done1 = false;
          var $tco_result2;
          function $tco_loop2(r, s) {
            var t = rand(s);
            var $74 = modMaj(t.val) === modMaj(r.val) || modMaj(t.val) === modMaj(s.val);
            if ($74) {
              $tco_var_r = s;
              $copy_s = t;
              return;
            }
            ;
            $tco_done1 = true;
            return t;
          }
          ;
          while (!$tco_done1) {
            $tco_result2 = $tco_loop2($tco_var_r, $copy_s);
          }
          ;
          return $tco_result2;
        };
      };
      var f2 = function($copy_r) {
        var $tco_done2 = false;
        var $tco_result2;
        function $tco_loop2(r) {
          var s = rand(r);
          var $75 = modMaj(s.val) === modMaj(r.val);
          if ($75) {
            $copy_r = s;
            return;
          }
          ;
          $tco_done2 = true;
          return s;
        }
        ;
        while (!$tco_done2) {
          $tco_result2 = $tco_loop2($copy_r);
        }
        ;
        return $tco_result2;
      };
      var r2 = f2(r1);
      var r3 = f3(r1)(r2);
      var v = randProba(r3);
      var v1 = randProba(v.nextRand);
      var v2 = randProba(v1.nextRand);
      var e = setWithIndex(modMaj(r1.val))(v.probability)(setWithIndex(modMaj(r2.val))(v1.probability)(setWithIndex(modMaj(r3.val))(v2.probability)(empty6)));
      var $79 = validExperience(complete2(e));
      if ($79) {
        $tco_done = true;
        return {
          experience: e,
          nextRand: v2.nextRand
        };
      }
      ;
      $copy_r1 = v2.nextRand;
      return;
    }
    ;
    while (!$tco_done) {
      $tco_result = $tco_loop($copy_r1);
    }
    ;
    return $tco_result;
  };
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
          var $86 = !newState.enabled;
          if ($86) {
            return [];
          }
          ;
          return fromIncremental(discard(discardUnit)(bindStateT(monadIdentity))(nl)(function() {
            var r1 = rand(r0);
            var prob = function(e) {
              var $87 = fromMaybe(0)(validateInput(newState.seed)) < 0;
              if ($87) {
                return tree(complete2(e));
              }
              ;
              return tree(e);
            };
            var v = randExercise(r1);
            var v1 = randExercise(v.nextRand);
            var v2 = randExercise(v1.nextRand);
            var v3 = randExercise(v2.nextRand);
            var v4 = randExercise(v3.nextRand);
            return discard(discardUnit)(bindStateT(monadIdentity))(put3(functorStateT(functorIdentity))(monadStateStateT(monadIdentity))(div$prime(widgetMultiAlternative(monoidArray))(widgetShiftMap)(append(semigroupArray)(prob(v.experience))(prob(v1.experience)))))(function() {
              return discard(discardUnit)(bindStateT(monadIdentity))(nl)(function() {
                return discard(discardUnit)(bindStateT(monadIdentity))(put3(functorStateT(functorIdentity))(monadStateStateT(monadIdentity))(div$prime(widgetMultiAlternative(monoidArray))(widgetShiftMap)(append(semigroupArray)(prob(v2.experience))(prob(v3.experience)))))(function() {
                  return discard(discardUnit)(bindStateT(monadIdentity))(nl)(function() {
                    return discard(discardUnit)(bindStateT(monadIdentity))(put3(functorStateT(functorIdentity))(monadStateStateT(monadIdentity))(div$prime(widgetMultiAlternative(monoidArray))(widgetShiftMap)(prob(v4.experience))))(function() {
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
