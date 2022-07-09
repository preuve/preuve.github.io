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
      return function(a2) {
        return f(a2)(b2);
      };
    };
  };
  var $$const = function(a2) {
    return function(v) {
      return a2;
    };
  };
  var applyFlipped = function(x) {
    return function(f) {
      return f(x);
    };
  };

  // output/Data.Unit/foreign.js
  var unit = void 0;

  // output/Type.Proxy/index.js
  var $$Proxy = /* @__PURE__ */ function() {
    function $$Proxy2() {
    }
    ;
    $$Proxy2.value = new $$Proxy2();
    return $$Proxy2;
  }();

  // output/Data.Functor/index.js
  var map = function(dict) {
    return dict.map;
  };
  var mapFlipped = function(dictFunctor) {
    return function(fa) {
      return function(f) {
        return map(dictFunctor)(f)(fa);
      };
    };
  };
  var $$void = function(dictFunctor) {
    return map(dictFunctor)($$const(unit));
  };
  var functorFn = {
    map: /* @__PURE__ */ compose(semigroupoidFn)
  };

  // output/Control.Apply/index.js
  var apply = function(dict) {
    return dict.apply;
  };
  var applySecond = function(dictApply) {
    return function(a2) {
      return function(b2) {
        return apply(dictApply)(map(dictApply.Functor0())($$const(identity(categoryFn)))(a2))(b2);
      };
    };
  };
  var lift2 = function(dictApply) {
    return function(f) {
      return function(a2) {
        return function(b2) {
          return apply(dictApply)(map(dictApply.Functor0())(f)(a2))(b2);
        };
      };
    };
  };

  // output/Control.Applicative/index.js
  var pure = function(dict) {
    return dict.pure;
  };
  var when = function(dictApplicative) {
    return function(v) {
      return function(v1) {
        if (v) {
          return v1;
        }
        ;
        if (!v) {
          return pure(dictApplicative)(unit);
        }
        ;
        throw new Error("Failed pattern match at Control.Applicative (line 63, column 1 - line 63, column 63): " + [v.constructor.name, v1.constructor.name]);
      };
    };
  };
  var liftA1 = function(dictApplicative) {
    return function(f) {
      return function(a2) {
        return apply(dictApplicative.Apply0())(pure(dictApplicative)(f))(a2);
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
  var composeKleisli = function(dictBind) {
    return function(f) {
      return function(g) {
        return function(a2) {
          return bind(dictBind)(f(a2))(g);
        };
      };
    };
  };
  var discardUnit = {
    discard: function(dictBind) {
      return bind(dictBind);
    }
  };
  var join = function(dictBind) {
    return function(m2) {
      return bind(dictBind)(m2)(identity(categoryFn));
    };
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

  // output/Data.Symbol/index.js
  var reflectSymbol = function(dict) {
    return dict.reflectSymbol;
  };

  // output/Record.Unsafe/foreign.js
  var unsafeSet = function(label5) {
    return function(value12) {
      return function(rec) {
        var copy = {};
        for (var key2 in rec) {
          if ({}.hasOwnProperty.call(rec, key2)) {
            copy[key2] = rec[key2];
          }
        }
        copy[label5] = value12;
        return copy;
      };
    };
  };

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
  var ringInt = {
    sub: intSub,
    Semiring0: function() {
      return semiringInt;
    }
  };
  var negate = function(dictRing) {
    return function(a2) {
      return sub(dictRing)(zero(dictRing.Semiring0()))(a2);
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

  // output/Data.Show/index.js
  var showInt = {
    show: showIntImpl
  };
  var show = function(dict) {
    return dict.show;
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
  var not = function(dict) {
    return dict.not;
  };
  var disj = function(dict) {
    return dict.disj;
  };
  var heytingAlgebraBoolean = {
    ff: false,
    tt: true,
    implies: function(a2) {
      return function(b2) {
        return disj(heytingAlgebraBoolean)(not(heytingAlgebraBoolean)(a2))(b2);
      };
    },
    conj: boolConj,
    disj: boolDisj,
    not: boolNot
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
          function $tco_loop(dictEq, dictEuclideanRing, a2, b2) {
            var $8 = eq(dictEq)(b2)(zero(dictEuclideanRing.CommutativeRing0().Ring0().Semiring0()));
            if ($8) {
              $tco_done = true;
              return a2;
            }
            ;
            $tco_var_dictEq = dictEq;
            $tco_var_dictEuclideanRing = dictEuclideanRing;
            $tco_var_a = b2;
            $copy_b = mod(dictEuclideanRing)(a2)(b2);
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

  // output/Data.Monoid/index.js
  var monoidUnit = {
    mempty: unit,
    Semigroup0: function() {
      return semigroupUnit;
    }
  };
  var mempty = function(dict) {
    return dict.mempty;
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
  var fst = function(v) {
    return v.value0;
  };

  // output/Control.Monad.State.Class/index.js
  var state = function(dict) {
    return dict.state;
  };
  var modify = function(dictMonadState) {
    return function(f) {
      return state(dictMonadState)(function(s2) {
        var s$prime = f(s2);
        return new Tuple(s$prime, s$prime);
      });
    };
  };
  var get = function(dictMonadState) {
    return state(dictMonadState)(function(s2) {
      return new Tuple(s2, s2);
    });
  };

  // output/Control.Alt/index.js
  var alt = function(dict) {
    return dict.alt;
  };

  // output/Control.Monad/index.js
  var ap = function(dictMonad) {
    return function(f) {
      return function(a2) {
        return bind(dictMonad.Bind1())(f)(function(f$prime) {
          return bind(dictMonad.Bind1())(a2)(function(a$prime) {
            return pure(dictMonad.Applicative0())(f$prime(a$prime));
          });
        });
      };
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
  var fromMaybe = function(a2) {
    return maybe(a2)(identity(categoryFn));
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
  var hush = /* @__PURE__ */ function() {
    return either($$const(Nothing.value))(Just.create);
  }();

  // output/Effect/foreign.js
  var pureE = function(a2) {
    return function() {
      return a2;
    };
  };
  var bindE = function(a2) {
    return function(f) {
      return function() {
        return f(a2())();
      };
    };
  };

  // output/Effect/index.js
  var $runtime_lazy = function(name15, moduleName, init2) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name15 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init2();
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
  var applyEffect = /* @__PURE__ */ $lazy_applyEffect(23);
  var semigroupEffect = function(dictSemigroup) {
    return {
      append: lift2(applyEffect)(append(dictSemigroup))
    };
  };
  var monoidEffect = function(dictMonoid) {
    return {
      mempty: pureE(mempty(dictMonoid)),
      Semigroup0: function() {
        return semigroupEffect(dictMonoid.Semigroup0());
      }
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
  var modifyImpl = function(f) {
    return function(ref) {
      return function() {
        var t2 = f(ref.value);
        ref.value = t2.state;
        return t2.value;
      };
    };
  };

  // output/Effect.Ref/index.js
  var $$new = _new;
  var modify$prime = modifyImpl;
  var modify2 = function(f) {
    return modify$prime(function(s2) {
      var s$prime = f(s2);
      return {
        state: s$prime,
        value: s$prime
      };
    });
  };

  // output/Control.Plus/index.js
  var empty = function(dict) {
    return dict.empty;
  };

  // output/Control.Monad.State.Trans/index.js
  var functorStateT = function(dictFunctor) {
    return {
      map: function(f) {
        return function(v) {
          return function(s2) {
            return map(dictFunctor)(function(v1) {
              return new Tuple(f(v1.value0), v1.value1);
            })(v(s2));
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
          return function(s2) {
            return bind(dictMonad.Bind1())(v(s2))(function(v1) {
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
      pure: function(a2) {
        return function(s2) {
          return pure(dictMonad.Applicative0())(new Tuple(a2, s2));
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

  // output/Unsafe.Coerce/foreign.js
  var unsafeCoerce2 = function(x) {
    return x;
  };

  // output/Safe.Coerce/index.js
  var coerce = function() {
    return unsafeCoerce2;
  };

  // output/Data.Newtype/index.js
  var unwrap = coerce;

  // output/Control.Monad.State/index.js
  var runState = function(v) {
    var $16 = unwrap();
    return function($17) {
      return $16(v($17));
    };
  };
  var evalState = function(v) {
    return function(s2) {
      var v1 = v(s2);
      return v1.value0;
    };
  };

  // output/Data.Array/foreign.js
  var replicateFill = function(count2) {
    return function(value12) {
      if (count2 < 1) {
        return [];
      }
      var result = new Array(count2);
      return result.fill(value12);
    };
  };
  var replicatePolyfill = function(count2) {
    return function(value12) {
      var result = [];
      var n = 0;
      for (var i2 = 0; i2 < count2; i2++) {
        result[n++] = value12;
      }
      return result;
    };
  };
  var replicate = typeof Array.prototype.fill === "function" ? replicateFill : replicatePolyfill;
  var fromFoldableImpl = function() {
    function Cons3(head5, tail2) {
      this.head = head5;
      this.tail = tail2;
    }
    var emptyList = {};
    function curryCons(head5) {
      return function(tail2) {
        return new Cons3(head5, tail2);
      };
    }
    function listToArray(list) {
      var result = [];
      var count2 = 0;
      var xs = list;
      while (xs !== emptyList) {
        result[count2++] = xs.head;
        xs = xs.tail;
      }
      return result;
    }
    return function(foldr2) {
      return function(xs) {
        return listToArray(foldr2(curryCons)(emptyList)(xs));
      };
    };
  }();
  var length = function(xs) {
    return xs.length;
  };
  var findIndexImpl = function(just) {
    return function(nothing) {
      return function(f) {
        return function(xs) {
          for (var i2 = 0, l = xs.length; i2 < l; i2++) {
            if (f(xs[i2]))
              return just(i2);
          }
          return nothing;
        };
      };
    };
  };
  var _deleteAt = function(just) {
    return function(nothing) {
      return function(i2) {
        return function(l) {
          if (i2 < 0 || i2 >= l.length)
            return nothing;
          var l1 = l.slice();
          l1.splice(i2, 1);
          return just(l1);
        };
      };
    };
  };
  var sortByImpl = function() {
    function mergeFromTo(compare2, fromOrdering, xs1, xs2, from2, to2) {
      var mid;
      var i2;
      var j;
      var k;
      var x;
      var y;
      var c;
      mid = from2 + (to2 - from2 >> 1);
      if (mid - from2 > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, from2, mid);
      if (to2 - mid > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, mid, to2);
      i2 = from2;
      j = mid;
      k = from2;
      while (i2 < mid && j < to2) {
        x = xs2[i2];
        y = xs2[j];
        c = fromOrdering(compare2(x)(y));
        if (c > 0) {
          xs1[k++] = y;
          ++j;
        } else {
          xs1[k++] = x;
          ++i2;
        }
      }
      while (i2 < mid) {
        xs1[k++] = xs2[i2++];
      }
      while (j < to2) {
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

  // output/Control.Monad.ST.Internal/foreign.js
  var map_ = function(f) {
    return function(a2) {
      return function() {
        return f(a2());
      };
    };
  };
  function newSTRef(val) {
    return function() {
      return { value: val };
    };
  }
  var read2 = function(ref) {
    return function() {
      return ref.value;
    };
  };
  var modifyImpl2 = function(f) {
    return function(ref) {
      return function() {
        var t2 = f(ref.value);
        ref.value = t2.state;
        return t2.value;
      };
    };
  };
  var write2 = function(a2) {
    return function(ref) {
      return function() {
        return ref.value = a2;
      };
    };
  };

  // output/Control.Monad.ST.Internal/index.js
  var modify$prime2 = modifyImpl2;
  var modify3 = function(f) {
    return modify$prime2(function(s2) {
      var s$prime = f(s2);
      return {
        state: s$prime,
        value: s$prime
      };
    });
  };
  var functorST = {
    map: map_
  };

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
    function mergeFromTo(compare2, fromOrdering, xs1, xs2, from2, to2) {
      var mid;
      var i2;
      var j;
      var k;
      var x;
      var y;
      var c;
      mid = from2 + (to2 - from2 >> 1);
      if (mid - from2 > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, from2, mid);
      if (to2 - mid > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, mid, to2);
      i2 = from2;
      j = mid;
      k = from2;
      while (i2 < mid && j < to2) {
        x = xs2[i2];
        y = xs2[j];
        c = fromOrdering(compare2(x)(y));
        if (c > 0) {
          xs1[k++] = y;
          ++j;
        } else {
          xs1[k++] = x;
          ++i2;
        }
      }
      while (i2 < mid) {
        xs1[k++] = xs2[i2++];
      }
      while (j < to2) {
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
      return function __do2() {
        var result = thaw(xs)();
        f(result)();
        return unsafeFreeze(result)();
      };
    };
  };
  var push = function(a2) {
    return pushAll([a2]);
  };

  // output/Data.Foldable/foreign.js
  var foldrArray = function(f) {
    return function(init2) {
      return function(xs) {
        var acc = init2;
        var len = xs.length;
        for (var i2 = len - 1; i2 >= 0; i2--) {
          acc = f(xs[i2])(acc);
        }
        return acc;
      };
    };
  };
  var foldlArray = function(f) {
    return function(init2) {
      return function(xs) {
        var acc = init2;
        var len = xs.length;
        for (var i2 = 0; i2 < len; i2++) {
          acc = f(acc)(xs[i2]);
        }
        return acc;
      };
    };
  };

  // output/Data.Monoid.Endo/index.js
  var semigroupEndo = function(dictSemigroupoid) {
    return {
      append: function(v) {
        return function(v1) {
          return compose(dictSemigroupoid)(v)(v1);
        };
      }
    };
  };
  var monoidEndo = function(dictCategory) {
    return {
      mempty: identity(dictCategory),
      Semigroup0: function() {
        return semigroupEndo(dictCategory.Semigroupoid0());
      }
    };
  };

  // output/Data.Foldable/index.js
  var foldr = function(dict) {
    return dict.foldr;
  };
  var oneOf = function(dictFoldable) {
    return function(dictPlus) {
      return foldr(dictFoldable)(alt(dictPlus.Alt0()))(empty(dictPlus));
    };
  };
  var oneOfMap = function(dictFoldable) {
    return function(dictPlus) {
      return function(f) {
        return foldr(dictFoldable)(function() {
          var $314 = alt(dictPlus.Alt0());
          return function($315) {
            return $314(f($315));
          };
        }())(empty(dictPlus));
      };
    };
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
  var for_ = function(dictApplicative) {
    return function(dictFoldable) {
      return flip(traverse_(dictApplicative)(dictFoldable));
    };
  };
  var sequence_ = function(dictApplicative) {
    return function(dictFoldable) {
      return traverse_(dictApplicative)(dictFoldable)(identity(categoryFn));
    };
  };
  var foldl = function(dict) {
    return dict.foldl;
  };
  var foldableMaybe = {
    foldr: function(v) {
      return function(z) {
        return function(v1) {
          if (v1 instanceof Nothing) {
            return z;
          }
          ;
          if (v1 instanceof Just) {
            return v(v1.value0)(z);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v.constructor.name, z.constructor.name, v1.constructor.name]);
        };
      };
    },
    foldl: function(v) {
      return function(z) {
        return function(v1) {
          if (v1 instanceof Nothing) {
            return z;
          }
          ;
          if (v1 instanceof Just) {
            return v(z)(v1.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v.constructor.name, z.constructor.name, v1.constructor.name]);
        };
      };
    },
    foldMap: function(dictMonoid) {
      return function(v) {
        return function(v1) {
          if (v1 instanceof Nothing) {
            return mempty(dictMonoid);
          }
          ;
          if (v1 instanceof Just) {
            return v(v1.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v.constructor.name, v1.constructor.name]);
        };
      };
    }
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

  // output/Data.Traversable/foreign.js
  var traverseArrayImpl = function() {
    function array1(a2) {
      return [a2];
    }
    function array2(a2) {
      return function(b2) {
        return [a2, b2];
      };
    }
    function array3(a2) {
      return function(b2) {
        return function(c) {
          return [a2, b2, c];
        };
      };
    }
    function concat2(xs) {
      return function(ys) {
        return xs.concat(ys);
      };
    }
    return function(apply3) {
      return function(map3) {
        return function(pure2) {
          return function(f) {
            return function(array) {
              function go2(bot, top2) {
                switch (top2 - bot) {
                  case 0:
                    return pure2([]);
                  case 1:
                    return map3(array1)(f(array[bot]));
                  case 2:
                    return apply3(map3(array2)(f(array[bot])))(f(array[bot + 1]));
                  case 3:
                    return apply3(apply3(map3(array3)(f(array[bot])))(f(array[bot + 1])))(f(array[bot + 2]));
                  default:
                    var pivot = bot + Math.floor((top2 - bot) / 4) * 2;
                    return apply3(map3(concat2)(go2(bot, pivot)))(go2(pivot, top2));
                }
              }
              return go2(0, array.length);
            };
          };
        };
      };
    };
  }();

  // output/Data.Array/index.js
  var snoc = function(xs) {
    return function(x) {
      return withArray(push(x))(xs)();
    };
  };
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
        return maybe(v2)(function(i2) {
          return fromJust()(deleteAt(i2)(v2));
        })(findIndex(v(v1))(v2));
      };
    };
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
  var floor = Math.floor;
  var remainder = function(n) {
    return function(m2) {
      return n % m2;
    };
  };
  var round = Math.round;

  // output/Data.Number/index.js
  var fromString = function(str) {
    return fromStringImpl(str, isFiniteImpl, Just.create, Nothing.value);
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
  var pow2 = function(x) {
    return function(y) {
      return Math.pow(x, y) | 0;
    };
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
  var floor2 = function($25) {
    return unsafeClamp(floor($25));
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

  // output/Deku.Attribute/index.js
  var Cb = function(x) {
    return x;
  };
  var Prop$prime = /* @__PURE__ */ function() {
    function Prop$prime2(value0) {
      this.value0 = value0;
    }
    ;
    Prop$prime2.create = function(value0) {
      return new Prop$prime2(value0);
    };
    return Prop$prime2;
  }();
  var Cb$prime = /* @__PURE__ */ function() {
    function Cb$prime2(value0) {
      this.value0 = value0;
    }
    ;
    Cb$prime2.create = function(value0) {
      return new Cb$prime2(value0);
    };
    return Cb$prime2;
  }();
  var Attribute = function(x) {
    return x;
  };
  var unsafeUnAttribute = /* @__PURE__ */ coerce();
  var unsafeAttribute = Attribute;
  var prop$prime = /* @__PURE__ */ function() {
    return Prop$prime.create;
  }();
  var cb$prime = /* @__PURE__ */ function() {
    return Cb$prime.create;
  }();
  var cb = /* @__PURE__ */ function() {
    var $6 = map(functorFn)(map(functorEffect)($$const(true)));
    return function($7) {
      return Cb($6($7));
    };
  }();
  var attr = function(dict) {
    return dict.attr;
  };

  // output/Control.Monad.ST.Global/index.js
  var toEffect = unsafeCoerce2;

  // output/Control.Monad.ST.Class/index.js
  var monadSTEffect = {
    liftST: toEffect,
    Monad0: function() {
      return monadEffect;
    }
  };
  var liftST = function(dict) {
    return dict.liftST;
  };

  // output/Data.Filterable/index.js
  var filterMap = function(dict) {
    return dict.filterMap;
  };

  // output/Data.Monoid.Always/index.js
  var always2 = function(dictMonoid) {
    return {
      always: identity(categoryFn),
      Monoid0: function() {
        return dictMonoid;
      }
    };
  };

  // output/FRP.Event.Class/index.js
  var keepLatest = function(dict) {
    return dict.keepLatest;
  };

  // output/Unsafe.Reference/foreign.js
  function reallyUnsafeRefEq(a2) {
    return function(b2) {
      return a2 === b2;
    };
  }

  // output/Unsafe.Reference/index.js
  var unsafeRefEq = reallyUnsafeRefEq;

  // output/FRP.Event/index.js
  var AnEvent = function(x) {
    return x;
  };
  var subscribe = function(v) {
    return function(k) {
      return v(k);
    };
  };
  var sampleOn2 = function(dictMonadST) {
    return function(dictApplicative) {
      return function(v) {
        return function(v1) {
          return function(k) {
            return bind(dictMonadST.Monad0().Bind1())(liftST(dictMonadST)(newSTRef(Nothing.value)))(function(latest) {
              return bind(dictMonadST.Monad0().Bind1())(v(function(a2) {
                return liftST(dictMonadST)($$void(functorST)(write2(new Just(a2))(latest)));
              }))(function(c1) {
                return bind(dictMonadST.Monad0().Bind1())(v1(function(f) {
                  return bind(dictMonadST.Monad0().Bind1())(liftST(dictMonadST)(read2(latest)))(traverse_(dictApplicative)(foldableMaybe)(function($91) {
                    return k(f($91));
                  }));
                }))(function(c2) {
                  return pure(dictApplicative)(applySecond(dictApplicative.Apply0())(c1)(c2));
                });
              });
            });
          };
        };
      };
    };
  };
  var makeEvent = AnEvent;
  var keepLatest2 = function(dictMonadST) {
    return function(v) {
      return function(k) {
        return bind(dictMonadST.Monad0().Bind1())(liftST(dictMonadST)(newSTRef(Nothing.value)))(function(cancelInner) {
          return bind(dictMonadST.Monad0().Bind1())(v(function(inner) {
            return discard(discardUnit)(dictMonadST.Monad0().Bind1())(bind(dictMonadST.Monad0().Bind1())(liftST(dictMonadST)(read2(cancelInner)))(sequence_(dictMonadST.Monad0().Applicative0())(foldableMaybe)))(function() {
              return bind(dictMonadST.Monad0().Bind1())(subscribe(inner)(k))(function(c) {
                return liftST(dictMonadST)($$void(functorST)(write2(new Just(c))(cancelInner)));
              });
            });
          }))(function(cancelOuter) {
            return pure(dictMonadST.Monad0().Applicative0())(discard(discardUnit)(dictMonadST.Monad0().Bind1())(bind(dictMonadST.Monad0().Bind1())(liftST(dictMonadST)(read2(cancelInner)))(sequence_(dictMonadST.Monad0().Applicative0())(foldableMaybe)))(function() {
              return cancelOuter;
            }));
          });
        });
      };
    };
  };
  var functorEvent = {
    map: function(f) {
      return function(v) {
        return function(k) {
          return v(function($92) {
            return k(f($92));
          });
        };
      };
    }
  };
  var fold3 = function(dictMonadST) {
    return function(f) {
      return function(v) {
        return function(b2) {
          return function(k) {
            return bind(dictMonadST.Monad0().Bind1())(liftST(dictMonadST)(newSTRef(b2)))(function(result) {
              return v(function(a2) {
                return bind(dictMonadST.Monad0().Bind1())(liftST(dictMonadST)(modify3(f(a2))(result)))(k);
              });
            });
          };
        };
      };
    };
  };
  var filter5 = function(dictApplicative) {
    return function(p2) {
      return function(v) {
        return function(k) {
          return v(function(a2) {
            var v1 = p2(a2);
            if (v1 instanceof Just) {
              return k(v1.value0);
            }
            ;
            if (v1 instanceof Nothing) {
              return pure(dictApplicative)(unit);
            }
            ;
            throw new Error("Failed pattern match at FRP.Event (line 126, column 13 - line 128, column 27): " + [v1.constructor.name]);
          });
        };
      };
    };
  };
  var filter$prime = function(dictApplicative) {
    return function(f) {
      return filter5(dictApplicative)(function(a2) {
        var v = f(a2);
        if (v) {
          return new Just(a2);
        }
        ;
        if (!v) {
          return Nothing.value;
        }
        ;
        throw new Error("Failed pattern match at FRP.Event (line 84, column 13 - line 86, column 25): " + [v.constructor.name]);
      });
    };
  };
  var create = function(dictMonadST) {
    return function(dictMonadST1) {
      return bind(dictMonadST.Monad0().Bind1())(liftST(dictMonadST)(newSTRef([])))(function(subscribers) {
        return pure(dictMonadST.Monad0().Applicative0())({
          event: function(k) {
            return bind(dictMonadST1.Monad0().Bind1())(liftST(dictMonadST1)(modify3(function(v) {
              return append(semigroupArray)(v)([k]);
            })(subscribers)))(function() {
              return pure(dictMonadST1.Monad0().Applicative0())(bind(dictMonadST1.Monad0().Bind1())(liftST(dictMonadST1)(modify3(deleteBy(unsafeRefEq)(k))(subscribers)))(function() {
                return pure(dictMonadST1.Monad0().Applicative0())(unit);
              }));
            });
          },
          push: function(a2) {
            return bind(dictMonadST1.Monad0().Bind1())(liftST(dictMonadST1)(read2(subscribers)))(traverse_(dictMonadST1.Monad0().Applicative0())(foldableArray)(function(k) {
              return k(a2);
            }));
          }
        });
      });
    };
  };
  var fix3 = function(dictMonadST) {
    return function(dictMonad) {
      return function(f) {
        return function(k) {
          return bind(dictMonad.Bind1())(create(dictMonadST)(dictMonadST))(function(v) {
            var v1 = f(v.event);
            return bind(dictMonad.Bind1())(subscribe(v1.input)(v.push))(function(c1) {
              return bind(dictMonad.Bind1())(subscribe(v1.output)(k))(function(c2) {
                return pure(dictMonad.Applicative0())(applySecond(dictMonad.Bind1().Apply0())(c1)(c2));
              });
            });
          });
        };
      };
    };
  };
  var compactableEvent = function(dictApplicative) {
    return {
      compact: filter5(dictApplicative)(identity(categoryFn)),
      separate: function(xs) {
        return {
          left: filter5(dictApplicative)(function(v) {
            if (v instanceof Left) {
              return new Just(v.value0);
            }
            ;
            if (v instanceof Right) {
              return Nothing.value;
            }
            ;
            throw new Error("Failed pattern match at FRP.Event (line 67, column 13 - line 69, column 33): " + [v.constructor.name]);
          })(xs),
          right: filter5(dictApplicative)(function(v) {
            if (v instanceof Right) {
              return new Just(v.value0);
            }
            ;
            if (v instanceof Left) {
              return Nothing.value;
            }
            ;
            throw new Error("Failed pattern match at FRP.Event (line 74, column 13 - line 76, column 32): " + [v.constructor.name]);
          })(xs)
        };
      }
    };
  };
  var filterableEvent = function(dictApplicative) {
    return {
      filter: filter$prime(dictApplicative),
      filterMap: filter5(dictApplicative),
      partition: function(p2) {
        return function(xs) {
          return {
            yes: filter$prime(dictApplicative)(p2)(xs),
            no: filter$prime(dictApplicative)(function() {
              var $93 = not(heytingAlgebraBoolean);
              return function($94) {
                return $93(p2($94));
              };
            }())(xs)
          };
        };
      },
      partitionMap: function(f) {
        return function(xs) {
          return {
            left: filterMap(filterableEvent(dictApplicative))(function() {
              var $95 = either(Just.create)($$const(Nothing.value));
              return function($96) {
                return $95(f($96));
              };
            }())(xs),
            right: filterMap(filterableEvent(dictApplicative))(function($97) {
              return hush(f($97));
            })(xs)
          };
        };
      },
      Compactable0: function() {
        return compactableEvent(dictApplicative);
      },
      Functor1: function() {
        return functorEvent;
      }
    };
  };
  var bang = function(dictApplicative) {
    return function(a2) {
      return function(k) {
        return map(dictApplicative.Apply0().Functor0())(function(v) {
          return pure(dictApplicative)(unit);
        })(k(a2));
      };
    };
  };
  var altEvent = function(dictApplicative) {
    return {
      alt: function(v) {
        return function(v1) {
          return function(k) {
            return apply(dictApplicative.Apply0())(map(dictApplicative.Apply0().Functor0())(function(v2) {
              return function(v3) {
                return applySecond(dictApplicative.Apply0())(v2)(v3);
              };
            })(v(k)))(v1(k));
          };
        };
      },
      Functor0: function() {
        return functorEvent;
      }
    };
  };
  var plusEvent = function(dictApplicative) {
    return {
      empty: function(v) {
        return pure(dictApplicative)(pure(dictApplicative)(unit));
      },
      Alt0: function() {
        return altEvent(dictApplicative);
      }
    };
  };
  var eventIsEvent = function(dictMonadST) {
    return {
      fold: fold3(dictMonadST),
      keepLatest: keepLatest2(dictMonadST),
      sampleOn: sampleOn2(dictMonadST)(dictMonadST.Monad0().Applicative0()),
      fix: fix3(dictMonadST)(dictMonadST.Monad0()),
      bang: bang(dictMonadST.Monad0().Applicative0()),
      Plus0: function() {
        return plusEvent(dictMonadST.Monad0().Applicative0());
      },
      Filterable1: function() {
        return filterableEvent(dictMonadST.Monad0().Applicative0());
      }
    };
  };

  // output/FRP.Event.VBus/foreign.js
  var _____$__$_$$_vbus = "_____$__$_$$_vbus";
  function unsafeDestroyS(s2) {
    return () => {
      for (const key2 in s2) {
        delete s2[key2];
      }
    };
  }
  function unsafePE(u2) {
    return () => {
      const doAssigns = (s3, p3, e2, u3) => {
        const ok = Object.keys(u3);
        for (var i2 = 0; i2 < ok.length; i2++) {
          if (u3[ok[i2]] instanceof Object && u3[ok[i2]][_____$__$_$$_vbus] === _____$__$_$$_vbus) {
            const p0 = {};
            const e0 = {};
            doAssigns(s3, p0, e0, u3[ok[i2]]);
            p3[ok[i2]] = p0;
            e2[ok[i2]] = e0;
          } else {
            const rn = `${Math.random()}`;
            s3[rn] = {};
            p3[ok[i2]] = (v) => () => {
              const rnk = Object.keys(s3[rn]);
              for (var j = 0; j < rnk.length; j++) {
                s3[rn][rnk[j]](v)();
              }
            };
            e2[ok[i2]] = (f) => () => {
              const k = `${Math.random()}`;
              s3[rn][k] = f;
              return () => {
                delete s3[rn][k];
              };
            };
          }
        }
      };
      const s2 = {};
      const p2 = {};
      const e = {};
      doAssigns(s2, p2, e, u2);
      return { p: p2, e, s: s2 };
    };
  }

  // output/Record/index.js
  var insert2 = function(dictIsSymbol) {
    return function() {
      return function() {
        return function(l) {
          return function(a2) {
            return function(r) {
              return unsafeSet(reflectSymbol(dictIsSymbol)(l))(a2)(r);
            };
          };
        };
      };
    };
  };

  // output/FRP.Event.VBus/index.js
  var vbusNil = {
    vb: function(v) {
      return function(v1) {
        return function(v2) {
          return {};
        };
      };
    }
  };
  var vb = function(dict) {
    return dict.vb;
  };
  var vbus = function() {
    return function(dictMonadST) {
      return function(dictVBus) {
        return function(v) {
          return function(f) {
            var vbd = vb(dictVBus)($$Proxy.value)($$Proxy.value)($$Proxy.value);
            return makeEvent(function(k) {
              return bind(dictMonadST.Monad0().Bind1())(unsafePE(vbd))(function(upe) {
                return discard(discardUnit)(dictMonadST.Monad0().Bind1())(k(f(upe.p)(upe.e)))(function() {
                  return pure(dictMonadST.Monad0().Applicative0())(unsafeDestroyS(upe.s));
                });
              });
            });
          };
        };
      };
    };
  };
  var vbusCons2 = function(dictIsSymbol) {
    return function() {
      return function() {
        return function(dictVBus) {
          return function() {
            return function() {
              return function() {
                return function() {
                  return {
                    vb: function(v) {
                      return function(v1) {
                        return function(v2) {
                          return insert2(dictIsSymbol)()()($$Proxy.value)(unit)(vb(dictVBus)($$Proxy.value)($$Proxy.value)($$Proxy.value));
                        };
                      };
                    }
                  };
                };
              };
            };
          };
        };
      };
    };
  };

  // output/Bolson.Core/index.js
  var Local = /* @__PURE__ */ function() {
    function Local2(value0) {
      this.value0 = value0;
    }
    ;
    Local2.create = function(value0) {
      return new Local2(value0);
    };
    return Local2;
  }();
  var Global = /* @__PURE__ */ function() {
    function Global2() {
    }
    ;
    Global2.value = new Global2();
    return Global2;
  }();
  var Insert = /* @__PURE__ */ function() {
    function Insert2(value0) {
      this.value0 = value0;
    }
    ;
    Insert2.create = function(value0) {
      return new Insert2(value0);
    };
    return Insert2;
  }();
  var Remove = /* @__PURE__ */ function() {
    function Remove2() {
    }
    ;
    Remove2.value = new Remove2();
    return Remove2;
  }();
  var Logic = /* @__PURE__ */ function() {
    function Logic2(value0) {
      this.value0 = value0;
    }
    ;
    Logic2.create = function(value0) {
      return new Logic2(value0);
    };
    return Logic2;
  }();
  var DynamicChildren$prime = /* @__PURE__ */ function() {
    function DynamicChildren$prime2(value0) {
      this.value0 = value0;
    }
    ;
    DynamicChildren$prime2.create = function(value0) {
      return new DynamicChildren$prime2(value0);
    };
    return DynamicChildren$prime2;
  }();
  var FixedChildren$prime = /* @__PURE__ */ function() {
    function FixedChildren$prime2(value0) {
      this.value0 = value0;
    }
    ;
    FixedChildren$prime2.create = function(value0) {
      return new FixedChildren$prime2(value0);
    };
    return FixedChildren$prime2;
  }();
  var EventfulElement$prime = /* @__PURE__ */ function() {
    function EventfulElement$prime2(value0) {
      this.value0 = value0;
    }
    ;
    EventfulElement$prime2.create = function(value0) {
      return new EventfulElement$prime2(value0);
    };
    return EventfulElement$prime2;
  }();
  var Element$prime = /* @__PURE__ */ function() {
    function Element$prime2(value0) {
      this.value0 = value0;
    }
    ;
    Element$prime2.create = function(value0) {
      return new Element$prime2(value0);
    };
    return Element$prime2;
  }();
  var eqScope = {
    eq: function(x) {
      return function(y) {
        if (x instanceof Local && y instanceof Local) {
          return x.value0 === y.value0;
        }
        ;
        if (x instanceof Global && y instanceof Global) {
          return true;
        }
        ;
        return false;
      };
    }
  };
  var fixed = function(a2) {
    return new FixedChildren$prime(a2);
  };

  // output/Foreign.Object/foreign.js
  function _copyST(m2) {
    return function() {
      var r = {};
      for (var k in m2) {
        if (hasOwnProperty.call(m2, k)) {
          r[k] = m2[k];
        }
      }
      return r;
    };
  }
  var empty3 = {};
  function runST(f) {
    return f();
  }
  function _foldM(bind2) {
    return function(f) {
      return function(mz) {
        return function(m2) {
          var acc = mz;
          function g(k2) {
            return function(z) {
              return f(z)(k2)(m2[k2]);
            };
          }
          for (var k in m2) {
            if (hasOwnProperty.call(m2, k)) {
              acc = bind2(acc)(g(k));
            }
          }
          return acc;
        };
      };
    };
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
  var keys2 = Object.keys || toArrayWithKey(function(k) {
    return function() {
      return k;
    };
  });

  // output/Foreign.Object.ST/foreign.js
  function poke2(k) {
    return function(v) {
      return function(m2) {
        return function() {
          m2[k] = v;
          return m2;
        };
      };
    };
  }
  var deleteImpl = function(k) {
    return function(m2) {
      return function() {
        delete m2[k];
        return m2;
      };
    };
  };

  // output/Foreign.Object/index.js
  var values = /* @__PURE__ */ toArrayWithKey(function(v) {
    return function(v1) {
      return v1;
    };
  });
  var thawST = _copyST;
  var mutate = function(f) {
    return function(m2) {
      return runST(function __do2() {
        var s2 = thawST(m2)();
        f(s2)();
        return s2;
      });
    };
  };
  var insert3 = function(k) {
    return function(v) {
      return mutate(poke2(k)(v));
    };
  };
  var fold4 = /* @__PURE__ */ _foldM(applyFlipped);
  var foldMap2 = function(dictMonoid) {
    return function(f) {
      return fold4(function(acc) {
        return function(k) {
          return function(v) {
            return append(dictMonoid.Semigroup0())(acc)(f(k)(v));
          };
        };
      })(mempty(dictMonoid));
    };
  };
  var foldableObject = {
    foldl: function(f) {
      return fold4(function(z) {
        return function(v) {
          return f(z);
        };
      });
    },
    foldr: function(f) {
      return function(z) {
        return function(m2) {
          return foldr(foldableArray)(f)(z)(values(m2));
        };
      };
    },
    foldMap: function(dictMonoid) {
      return function(f) {
        return foldMap2(dictMonoid)($$const(f));
      };
    }
  };
  var $$delete3 = function(k) {
    return mutate(deleteImpl(k));
  };

  // output/Bolson.Control/index.js
  var Begin = /* @__PURE__ */ function() {
    function Begin2() {
    }
    ;
    Begin2.value = new Begin2();
    return Begin2;
  }();
  var Middle = /* @__PURE__ */ function() {
    function Middle2() {
    }
    ;
    Middle2.value = new Middle2();
    return Middle2;
  }();
  var End = /* @__PURE__ */ function() {
    function End2() {
    }
    ;
    End2.value = new End2();
    return End2;
  }();
  var flatten = function(dictApplicative) {
    return function(dictMonadST) {
      return function(v) {
        return function(psr) {
          return function(interpreter) {
            var element = function(v1) {
              return v1(psr)(interpreter);
            };
            return function(v1) {
              if (v1 instanceof FixedChildren$prime) {
                return oneOfMap(foldableArray)(plusEvent(dictApplicative))(flatten(dictApplicative)(dictMonadST)(v)(psr)(interpreter))(v1.value0);
              }
              ;
              if (v1 instanceof EventfulElement$prime) {
                return keepLatest(eventIsEvent(dictMonadST))(map(functorEvent)(flatten(dictApplicative)(dictMonadST)(v)(psr)(interpreter))(v1.value0));
              }
              ;
              if (v1 instanceof Element$prime) {
                return element(v.toElt(v1.value0));
              }
              ;
              if (v1 instanceof DynamicChildren$prime) {
                return makeEvent(function(v2) {
                  return bind(dictMonadST.Monad0().Bind1())(liftST(dictMonadST)(newSTRef(empty3)))(function(cancelInner) {
                    return bind(dictMonadST.Monad0().Bind1())(subscribe(v1.value0)(function(inner) {
                      return bind(dictMonadST.Monad0().Bind1())(v.ids(interpreter))(function(myUnsubId) {
                        return bind(dictMonadST.Monad0().Bind1())(liftST(dictMonadST)(newSTRef(pure(dictApplicative)(unit))))(function(myUnsub) {
                          return bind(dictMonadST.Monad0().Bind1())(v.ids(interpreter))(function(eltsUnsubId) {
                            return bind(dictMonadST.Monad0().Bind1())(liftST(dictMonadST)(newSTRef(pure(dictApplicative)(unit))))(function(eltsUnsub) {
                              return bind(dictMonadST.Monad0().Bind1())(liftST(dictMonadST)(newSTRef([])))(function(myIds) {
                                return bind(dictMonadST.Monad0().Bind1())(liftST(dictMonadST)(newSTRef(pure(dictApplicative)(unit))))(function(myImmediateCancellation) {
                                  return bind(dictMonadST.Monad0().Bind1())(map(dictApplicative.Apply0().Functor0())(Local.create)(v.ids(interpreter)))(function(myScope) {
                                    return bind(dictMonadST.Monad0().Bind1())(liftST(dictMonadST)(newSTRef(Begin.value)))(function(stageRef) {
                                      return bind(dictMonadST.Monad0().Bind1())(subscribe(inner)(function(kid$prime) {
                                        return bind(dictMonadST.Monad0().Bind1())(liftST(dictMonadST)(read2(stageRef)))(function(stage) {
                                          if (kid$prime instanceof Logic && stage instanceof Middle) {
                                            return bind(dictMonadST.Monad0().Bind1())(liftST(dictMonadST)(read2(myIds)))(traverse_(dictApplicative)(foldableArray)(function() {
                                              var $68 = v.doLogic(kid$prime.value0)(interpreter);
                                              return function($69) {
                                                return v2($68($69));
                                              };
                                            }()));
                                          }
                                          ;
                                          if (kid$prime instanceof Remove && stage instanceof Middle) {
                                            return discard(discardUnit)(dictMonadST.Monad0().Bind1())($$void(dictApplicative.Apply0().Functor0())(liftST(dictMonadST)(write2(End.value)(stageRef))))(function() {
                                              var mic = applySecond(dictApplicative.Apply0())(applySecond(dictApplicative.Apply0())(applySecond(dictApplicative.Apply0())(applySecond(dictApplicative.Apply0())(bind(dictMonadST.Monad0().Bind1())(liftST(dictMonadST)(read2(myIds)))(traverse_(dictApplicative)(foldableArray)(function(old) {
                                                return for_(dictApplicative)(foldableMaybe)(psr.parent)(function(pnt) {
                                                  return v2(v.disconnectElement(interpreter)({
                                                    id: old,
                                                    parent: pnt,
                                                    scope: myScope
                                                  }));
                                                });
                                              })))(join(dictMonadST.Monad0().Bind1())(liftST(dictMonadST)(read2(myUnsub)))))(join(dictMonadST.Monad0().Bind1())(liftST(dictMonadST)(read2(eltsUnsub)))))($$void(dictApplicative.Apply0().Functor0())(liftST(dictMonadST)(modify3($$delete3(myUnsubId))(cancelInner)))))($$void(dictApplicative.Apply0().Functor0())(liftST(dictMonadST)(modify3($$delete3(eltsUnsubId))(cancelInner))));
                                              return applySecond(dictApplicative.Apply0())($$void(dictApplicative.Apply0().Functor0())(liftST(dictMonadST)(write2(mic)(myImmediateCancellation))))(mic);
                                            });
                                          }
                                          ;
                                          if (kid$prime instanceof Insert && stage instanceof Begin) {
                                            return discard(discardUnit)(dictMonadST.Monad0().Bind1())($$void(dictApplicative.Apply0().Functor0())(liftST(dictMonadST)(write2(Middle.value)(stageRef))))(function() {
                                              return bind(dictMonadST.Monad0().Bind1())(subscribe(flatten(dictApplicative)(dictMonadST)(v)({
                                                parent: psr.parent,
                                                scope: myScope,
                                                raiseId: function(id) {
                                                  return $$void(dictApplicative.Apply0().Functor0())(liftST(dictMonadST)(modify3(append(semigroupArray)([id]))(myIds)));
                                                }
                                              })(interpreter)(kid$prime.value0))(v2))(function(c1) {
                                                return discard(discardUnit)(dictMonadST.Monad0().Bind1())($$void(dictApplicative.Apply0().Functor0())(liftST(dictMonadST)(modify3(insert3(eltsUnsubId)(c1))(cancelInner))))(function() {
                                                  return $$void(dictApplicative.Apply0().Functor0())(liftST(dictMonadST)(write2(c1)(eltsUnsub)));
                                                });
                                              });
                                            });
                                          }
                                          ;
                                          return pure(dictApplicative)(unit);
                                        });
                                      }))(function(c0) {
                                        return discard(discardUnit)(dictMonadST.Monad0().Bind1())($$void(dictApplicative.Apply0().Functor0())(liftST(dictMonadST)(write2(c0)(myUnsub))))(function() {
                                          return discard(discardUnit)(dictMonadST.Monad0().Bind1())($$void(dictApplicative.Apply0().Functor0())(liftST(dictMonadST)(modify3(insert3(myUnsubId)(c0))(cancelInner))))(function() {
                                            return join(dictMonadST.Monad0().Bind1())(liftST(dictMonadST)(read2(myImmediateCancellation)));
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
                    }))(function(cancelOuter) {
                      return pure(dictApplicative)(discard(discardUnit)(dictMonadST.Monad0().Bind1())(bind(dictMonadST.Monad0().Bind1())(liftST(dictMonadST)(read2(cancelInner)))(foldl(foldableObject)(applySecond(dictApplicative.Apply0()))(pure(dictApplicative)(unit))))(function() {
                        return cancelOuter;
                      }));
                    });
                  });
                });
              }
              ;
              throw new Error("Failed pattern match at Bolson.Control (line 208, column 17 - line 291, column 20): " + [v1.constructor.name]);
            };
          };
        };
      };
    };
  };

  // output/Deku.Control/index.js
  var unsafeText = function(v) {
    return v.makeText;
  };
  var unsafeSetText = function(v) {
    return function(id) {
      return function(txt) {
        return map(functorEvent)(function($118) {
          return v.setText(function(v1) {
            return {
              id,
              text: v1
            };
          }($118));
        })(txt);
      };
    };
  };
  var unsafeSetAttribute = function(v) {
    return function(id) {
      return function(atts) {
        return map(functorEvent)(function($119) {
          return function(v1) {
            if (v1.value instanceof Prop$prime) {
              return v.setProp({
                id,
                key: v1.key,
                value: v1.value.value0
              });
            }
            ;
            if (v1.value instanceof Cb$prime) {
              return v.setCb({
                id,
                key: v1.key,
                value: v1.value.value0
              });
            }
            ;
            throw new Error("Failed pattern match at Deku.Control (line 75, column 26 - line 77, column 45): " + [v1.value.constructor.name]);
          }(unsafeUnAttribute($119));
        })(atts);
      };
    };
  };
  var unsafeElement = function(v) {
    return v.makeElement;
  };
  var unsafeConnect = function(v) {
    return v.attributeParent;
  };
  var text = function(dictMonad) {
    return function(txt) {
      var go2 = function(v) {
        return function(v1) {
          return makeEvent(function(k) {
            return bind(dictMonad.Bind1())(v1.ids)(function(me) {
              return discard(discardUnit)(dictMonad.Bind1())(v.raiseId(me))(function() {
                return map(dictMonad.Bind1().Apply0().Functor0())(applySecond(dictMonad.Bind1().Apply0())(k(v1.deleteFromCache({
                  id: me
                }))))(subscribe(oneOf(foldableArray)(plusEvent(dictMonad.Applicative0()))([bang(dictMonad.Applicative0())(unsafeText(v1)({
                  id: me,
                  parent: v.parent,
                  scope: v.scope
                })), unsafeSetText(v1)(me)(txt)]))(k));
              });
            });
          });
        };
      };
      return new Element$prime(go2);
    };
  };
  var text_ = function(dictMonad) {
    return function(txt) {
      return text(dictMonad)(bang(dictMonad.Applicative0())(txt));
    };
  };
  var __internalDekuFlatten = function(dictKorok) {
    return flatten(dictKorok.MonadST5().Monad0().Applicative0())(dictKorok.MonadST5())({
      doLogic: function(v) {
        return function(v1) {
          return function(id) {
            return v1.sendToTop({
              id
            });
          };
        };
      },
      ids: function() {
        var $120 = unwrap();
        return function($121) {
          return function(v) {
            return v.ids;
          }($120($121));
        };
      }(),
      disconnectElement: function(v) {
        return function(v1) {
          return v.disconnectElement({
            id: v1.id,
            scope: v1.scope,
            parent: v1.parent,
            scopeEq: eq(eqScope)
          });
        };
      },
      toElt: function(v) {
        return v;
      }
    });
  };
  var deku = function(dictKorok) {
    return function(root) {
      return function(children) {
        return function(v) {
          return makeEvent(function(k) {
            return bind(dictKorok.MonadST5().Monad0().Bind1())(v.ids)(function(me) {
              return subscribe(alt(altEvent(dictKorok.MonadST5().Monad0().Applicative0()))(bang(dictKorok.MonadST5().Monad0().Applicative0())(v.makeRoot({
                id: me,
                root
              })))(__internalDekuFlatten(dictKorok)({
                parent: new Just(me),
                scope: new Local("rootScope"),
                raiseId: function(v1) {
                  return pure(dictKorok.MonadST5().Monad0().Applicative0())(unit);
                }
              })(v)(children)))(k);
            });
          });
        };
      };
    };
  };
  var deku1 = function(dictKorok) {
    return function(root) {
      return function(children) {
        return deku(dictKorok)(root)(new EventfulElement$prime(children));
      };
    };
  };
  var dekuA = function(dictKorok) {
    return function(root) {
      return function(children) {
        return deku(dictKorok)(root)(new FixedChildren$prime(children));
      };
    };
  };
  var elementify = function(dictKorok) {
    return function(tag) {
      return function(atts) {
        return function(children) {
          var go2 = function(v) {
            return function(v1) {
              return makeEvent(function(k) {
                return bind(dictKorok.MonadST5().Monad0().Bind1())(v1.ids)(function(me) {
                  return discard(discardUnit)(dictKorok.MonadST5().Monad0().Bind1())(v.raiseId(me))(function() {
                    return map(dictKorok.MonadST5().Monad0().Bind1().Apply0().Functor0())(applySecond(dictKorok.MonadST5().Monad0().Bind1().Apply0())(k(v1.deleteFromCache({
                      id: me
                    }))))(subscribe(alt(altEvent(dictKorok.MonadST5().Monad0().Applicative0()))(oneOf(foldableArray)(plusEvent(dictKorok.MonadST5().Monad0().Applicative0()))(append(semigroupArray)([bang(dictKorok.MonadST5().Monad0().Applicative0())(unsafeElement(v1)({
                      id: me,
                      parent: v.parent,
                      scope: v.scope,
                      tag
                    })), unsafeSetAttribute(v1)(me)(atts)])(maybe([])(function(p2) {
                      return [bang(dictKorok.MonadST5().Monad0().Applicative0())(unsafeConnect(v1)({
                        id: me,
                        parent: p2
                      }))];
                    })(v.parent))))(__internalDekuFlatten(dictKorok)({
                      parent: new Just(me),
                      scope: v.scope,
                      raiseId: function(v2) {
                        return pure(dictKorok.MonadST5().Monad0().Applicative0())(unit);
                      }
                    })(v1)(children)))(k));
                  });
                });
              });
            };
          };
          return go2;
        };
      };
    };
  };

  // output/Deku.DOM.Attr.Autofocus/index.js
  var Autofocus = /* @__PURE__ */ function() {
    function Autofocus2() {
    }
    ;
    Autofocus2.value = new Autofocus2();
    return Autofocus2;
  }();
  var attrInput_AutofocusString = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "autofocus",
          value: prop$prime(value12)
        });
      };
    }
  };

  // output/Deku.DOM.Attr.OnInput/index.js
  var OnInput = /* @__PURE__ */ function() {
    function OnInput2() {
    }
    ;
    OnInput2.value = new OnInput2();
    return OnInput2;
  }();
  var attrOnInputCb = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "input",
          value: cb$prime(value12)
        });
      };
    }
  };

  // output/Deku.DOM.Attr.OnKeyup/index.js
  var OnKeyup = /* @__PURE__ */ function() {
    function OnKeyup2() {
    }
    ;
    OnKeyup2.value = new OnKeyup2();
    return OnKeyup2;
  }();
  var attrOnKeyupCb = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "keyup",
          value: cb$prime(value12)
        });
      };
    }
  };

  // output/Deku.DOM.Attr.Size/index.js
  var Size = /* @__PURE__ */ function() {
    function Size2() {
    }
    ;
    Size2.value = new Size2();
    return Size2;
  }();
  var attrInput_SizeString = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "size",
          value: prop$prime(value12)
        });
      };
    }
  };

  // output/Deku.DOM.Attr.Style/index.js
  var Style = /* @__PURE__ */ function() {
    function Style2() {
    }
    ;
    Style2.value = new Style2();
    return Style2;
  }();
  var attrLabel_StyleString = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "style",
          value: prop$prime(value12)
        });
      };
    }
  };
  var attrDiv_StyleString = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "style",
          value: prop$prime(value12)
        });
      };
    }
  };

  // output/Deku.DOM.Elt.B/index.js
  var b = function(dictKorok) {
    return function(attributes) {
      return function(kids) {
        return new Element$prime(elementify(dictKorok)("b")(attributes)(fixed(kids)));
      };
    };
  };
  var b_ = function(dictKorok) {
    return b(dictKorok)(empty(plusEvent(dictKorok.MonadST5().Monad0().Applicative0())));
  };

  // output/Deku.DOM.Elt.Br/index.js
  var br = function(dictKorok) {
    return function(attributes) {
      return function(kids) {
        return new Element$prime(elementify(dictKorok)("br")(attributes)(fixed(kids)));
      };
    };
  };
  var br_ = function(dictKorok) {
    return br(dictKorok)(empty(plusEvent(dictKorok.MonadST5().Monad0().Applicative0())));
  };

  // output/Deku.DOM.Elt.Div/index.js
  var div2 = function(dictKorok) {
    return function(attributes) {
      return function(kids) {
        return new Element$prime(elementify(dictKorok)("div")(attributes)(fixed(kids)));
      };
    };
  };
  var div_ = function(dictKorok) {
    return div2(dictKorok)(empty(plusEvent(dictKorok.MonadST5().Monad0().Applicative0())));
  };

  // output/Deku.DOM.Elt.Em/index.js
  var em = function(dictKorok) {
    return function(attributes) {
      return function(kids) {
        return new Element$prime(elementify(dictKorok)("em")(attributes)(fixed(kids)));
      };
    };
  };
  var em_ = function(dictKorok) {
    return em(dictKorok)(empty(plusEvent(dictKorok.MonadST5().Monad0().Applicative0())));
  };

  // output/Deku.DOM.Elt.H1/index.js
  var h1 = function(dictKorok) {
    return function(attributes) {
      return function(kids) {
        return new Element$prime(elementify(dictKorok)("h1")(attributes)(fixed(kids)));
      };
    };
  };
  var h1_ = function(dictKorok) {
    return h1(dictKorok)(empty(plusEvent(dictKorok.MonadST5().Monad0().Applicative0())));
  };

  // output/Deku.DOM.Elt.Hr/index.js
  var hr = function(dictKorok) {
    return function(attributes) {
      return function(kids) {
        return new Element$prime(elementify(dictKorok)("hr")(attributes)(fixed(kids)));
      };
    };
  };
  var hr_ = function(dictKorok) {
    return hr(dictKorok)(empty(plusEvent(dictKorok.MonadST5().Monad0().Applicative0())));
  };

  // output/Deku.DOM.Elt.Input/index.js
  var input = function(dictKorok) {
    return function(attributes) {
      return function(kids) {
        return new Element$prime(elementify(dictKorok)("input")(attributes)(fixed(kids)));
      };
    };
  };

  // output/Deku.DOM.Elt.Label/index.js
  var label = function(dictKorok) {
    return function(attributes) {
      return function(kids) {
        return new Element$prime(elementify(dictKorok)("label")(attributes)(fixed(kids)));
      };
    };
  };
  var label_ = function(dictKorok) {
    return label(dictKorok)(empty(plusEvent(dictKorok.MonadST5().Monad0().Applicative0())));
  };

  // output/Deku.DOM.Elt.Li/index.js
  var li = function(dictKorok) {
    return function(attributes) {
      return function(kids) {
        return new Element$prime(elementify(dictKorok)("li")(attributes)(fixed(kids)));
      };
    };
  };
  var li_ = function(dictKorok) {
    return li(dictKorok)(empty(plusEvent(dictKorok.MonadST5().Monad0().Applicative0())));
  };

  // output/Deku.DOM.Elt.Ul/index.js
  var ul = function(dictKorok) {
    return function(attributes) {
      return function(kids) {
        return new Element$prime(elementify(dictKorok)("ul")(attributes)(fixed(kids)));
      };
    };
  };
  var ul_ = function(dictKorok) {
    return ul(dictKorok)(empty(plusEvent(dictKorok.MonadST5().Monad0().Applicative0())));
  };

  // output/Deku.DOM/index.js
  var Self = /* @__PURE__ */ function() {
    function Self2() {
    }
    ;
    Self2.value = new Self2();
    return Self2;
  }();
  var attrSelfElementFunctionEf = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "@self@",
          value: cb$prime(value12)
        });
      };
    }
  };

  // output/KaTeX/foreign.js
  var render = (content3) => (elem3) => () => katex.render(content3, elem3, {
    throwOnError: false
  });
  var display = (content3) => (elem3) => () => katex.render(content3, elem3, {
    throwOnError: false,
    displayMode: true
  });

  // output/Web.Event.Event/foreign.js
  function _target(e) {
    return e.target;
  }

  // output/Data.Nullable/foreign.js
  function nullable(a2, r, f) {
    return a2 == null ? r : f(a2);
  }

  // output/Data.Nullable/index.js
  var toMaybe = function(n) {
    return nullable(n, Nothing.value, Just.create);
  };

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

  // output/Web.HTML.HTMLInputElement/index.js
  var fromEventTarget = /* @__PURE__ */ unsafeReadProtoTagged("HTMLInputElement");

  // output/Web.UIEvent.KeyboardEvent/foreign.js
  function code2(e) {
    return e.code;
  }

  // output/Web.UIEvent.KeyboardEvent/index.js
  var fromEvent = /* @__PURE__ */ unsafeReadProtoTagged("KeyboardEvent");

  // output/Article/index.js
  var validateInput = function(inp) {
    return bind(bindMaybe)(bind(bindMaybe)(inp)(fromString))(function(x) {
      var $52 = isNaNImpl(x);
      if ($52) {
        return Nothing.value;
      }
      ;
      return new Just(round2(x));
    });
  };
  var toSeed = function(txt) {
    var v = validateInput(new Just(txt));
    if (v instanceof Just) {
      return v.value0;
    }
    ;
    return 0;
  };
  var splits = function(v) {
    return function(e) {
      return map(functorEvent)(function(x) {
        return new Tuple(v.value0(x), v.value1(x));
      })(e);
    };
  };
  var runningText = function(dictApplicative) {
    return map(functorEvent)(function(push2) {
      return attr(attrOnInputCb)(OnInput.value)(cb(function(e) {
        return for_(applicativeEffect)(foldableMaybe)(bind(bindMaybe)(target(e))(fromEventTarget))(composeKleisli(bindEffect)(value)(push2));
      }));
    });
  };
  var put2 = function(dictFunctor) {
    return function(dictMonadState) {
      return function(x) {
        return $$void(dictFunctor)(modify(dictMonadState)(flip(snoc)(x)));
      };
    };
  };
  var setTitle_ = function(str) {
    return function(dictFunctor) {
      return function(dictMonadState) {
        return function(dictKorok) {
          return put2(dictFunctor)(dictMonadState)(h1_(dictKorok)([text_(dictKorok.MonadST5().Monad0())(str)]));
        };
      };
    };
  };
  var t = function(dictKorok) {
    return function(dictFunctor) {
      return function(dictMonadState) {
        return function(str) {
          return put2(dictFunctor)(dictMonadState)(label_(dictKorok)([text(dictKorok.MonadST5().Monad0())(str)]));
        };
      };
    };
  };
  var t_ = function(dictKorok) {
    return function(dictFunctor) {
      return function(dictMonadState) {
        return function(str) {
          return t(dictKorok)(dictFunctor)(dictMonadState)(bang(dictKorok.MonadST5().Monad0().Applicative0())(str));
        };
      };
    };
  };
  var openSection_ = function(title4) {
    return function(points) {
      return function(dictFunctor) {
        return function(dictMonadState) {
          return function(dictKorok) {
            return put2(dictFunctor)(dictMonadState)(div_(dictKorok)([div2(dictKorok)(bang(dictKorok.MonadST5().Monad0().Applicative0())(attr(attrDiv_StyleString)(Style.value)("margin: 0; display: flex; justify-content: space-between")))([label(dictKorok)(bang(dictKorok.MonadST5().Monad0().Applicative0())(attr(attrLabel_StyleString)(Style.value)("font-size: 24px; font-weight: 700;")))([text_(dictKorok.MonadST5().Monad0())(title4)]), label(dictKorok)(bang(dictKorok.MonadST5().Monad0().Applicative0())(attr(attrLabel_StyleString)(Style.value)("font-size: 16px; font-weight: 700;")))([text_(dictKorok.MonadST5().Monad0())(points)])]), hr_(dictKorok)([])]));
          };
        };
      };
    };
  };
  var nl = function(dictFunctor) {
    return function(dictMonadState) {
      return function(dictKorok) {
        return put2(dictFunctor)(dictMonadState)(br_(dictKorok)([]));
      };
    };
  };
  var m = function(dictKorok) {
    return function(dictFunctor) {
      return function(dictMonadState) {
        return function(str) {
          return put2(dictFunctor)(dictMonadState)(label(dictKorok)(map(functorEvent)(function(txt) {
            return attr(attrSelfElementFunctionEf)(Self.value)(render(txt));
          })(str))([]));
        };
      };
    };
  };
  var m_ = function(dictKorok) {
    return function(dictFunctor) {
      return function(dictMonadState) {
        return function(str) {
          return m(dictKorok)(dictFunctor)(dictMonadState)(bang(dictKorok.MonadST5().Monad0().Applicative0())(str));
        };
      };
    };
  };
  var get2 = function(dictMonadState) {
    return get(dictMonadState);
  };
  var fromIncremental = function(seq) {
    return fst(runState(seq)([]));
  };
  var equation2 = function(dictKorok) {
    return function(dictFunctor) {
      return function(dictMonadState) {
        return function(str) {
          return put2(dictFunctor)(dictMonadState)(label(dictKorok)(map(functorEvent)(function(txt) {
            return attr(attrSelfElementFunctionEf)(Self.value)(display(txt));
          })(str))([]));
        };
      };
    };
  };
  var enterHit = function(dictApplicative) {
    return map(functorEvent)(function(push2) {
      return attr(attrOnKeyupCb)(OnKeyup.value)(cb(function(e) {
        return for_(applicativeEffect)(foldableMaybe)(fromEvent(e))(function(kevt) {
          return function __do2() {
            push2(false)();
            return when(applicativeEffect)(code2(kevt) === "Enter")(push2(true))();
          };
        });
      }));
    });
  };
  var em_2 = function(str) {
    return function(dictFunctor) {
      return function(dictMonadState) {
        return function(dictKorok) {
          return put2(dictFunctor)(dictMonadState)(em_(dictKorok)([text_(dictKorok.MonadST5().Monad0())(str)]));
        };
      };
    };
  };
  var b_2 = function(str) {
    return function(dictFunctor) {
      return function(dictMonadState) {
        return function(dictKorok) {
          return put2(dictFunctor)(dictMonadState)(b_(dictKorok)([text_(dictKorok.MonadST5().Monad0())(str)]));
        };
      };
    };
  };

  // output/Deku.Core/index.js
  var korokGlobalEffect = {
    Always0: function() {
      return always2(monoidEffect(monoidUnit));
    },
    Always1: function() {
      return always2(monoidEffect(monoidEffect(monoidUnit)));
    },
    Always2: function() {
      return always2(monoidEffect(monoidUnit));
    },
    Always3: function() {
      return always2(monoidEndo(categoryFn));
    },
    Always4: function() {
      return always2(monoidEndo(categoryFn));
    },
    MonadST5: function() {
      return monadSTEffect;
    }
  };

  // output/Deku.Interpret/foreign.js
  var connectXToY_ = (maybe2, x, y$, state3) => {
    maybe2((y) => state3.units[y].main.appendChild(state3.units[x].main))(y$);
  };
  var attributeParent_ = (a2) => (state3) => () => {
    if (!state3.units[a2.id].main.parentNode) {
      state3.units[a2.parent].main.appendChild(state3.units[a2.id].main);
    }
  };
  var makeElement_ = (tryHydration) => (a2) => (state3) => () => {
    var dom2;
    var ptr = a2.id;
    if (!state3.scopes[a2.scope]) {
      state3.scopes[a2.scope] = [];
    }
    state3.scopes[a2.scope].push(ptr);
    if (tryHydration && a2.parent.value0 && (dom2 = document.body.querySelectorAll("[data-deku-ssr-" + ptr + "]").item(0))) {
      state3.units[ptr] = {
        listeners: {},
        parent: a2.parent,
        scope: a2.scope,
        main: dom2
      };
    } else {
      state3.units[ptr] = {
        listeners: {},
        parent: a2.parent,
        scope: a2.scope,
        main: document.createElement(a2.tag)
      };
    }
  };
  var makeText_ = (tryHydration) => (maybe2) => (a2) => (state3) => () => {
    var ptr = a2.id;
    var dom2;
    if (!state3.scopes[a2.scope]) {
      state3.scopes[a2.scope] = [];
    }
    state3.scopes[a2.scope].push(ptr);
    if (tryHydration && a2.parent.value0 && (dom2 = document.body.querySelectorAll("[data-deku-ssr-" + a2.parent.value0 + "]").item(0))) {
      state3.units[ptr] = {
        main: dom2.childNodes[0],
        parent: a2.parent,
        scope: a2.scope
      };
    } else {
      state3.units[ptr] = {
        main: document.createTextNode(""),
        parent: a2.parent,
        scope: a2.scope
      };
      connectXToY_(maybe2, ptr, a2.parent, state3);
    }
  };
  function makeFFIDOMSnapshot() {
    return {
      units: {},
      scopes: {}
    };
  }
  var setProp_ = (tryHydration) => (a2) => (state3) => () => {
    var ptr = a2.id;
    var avv = a2.value;
    if (tryHydration && !state3.units[ptr] && (dom = document.body.querySelectorAll("[data-deku-ssr-" + ptr + "]").item(0))) {
      state3.units[ptr] = {
        listeners: {},
        parent: a2.parent,
        scope: a2.scope,
        main: dom
      };
      if (!state3.scopes[a2.scope]) {
        state3.scopes[a2.scope] = [];
      }
      state3.scopes[a2.scope].push(ptr);
    }
    if (state3.units[ptr].main.tagName === "INPUT" && a2.key === "value") {
      state3.units[ptr].main.value = avv;
    } else if (state3.units[ptr].main.tagName === "INPUT" && a2.key === "checked") {
      state3.units[ptr].main.checked = avv === "true";
    } else {
      state3.units[ptr].main.setAttribute(a2.key, avv);
    }
  };
  var setCb_ = (tryHydration) => (a2) => (state3) => () => {
    var ptr = a2.id;
    var avv = a2.value;
    if (tryHydration && !state3.units[ptr] && (dom = document.body.querySelectorAll("[data-deku-ssr-" + ptr + "]").item(0))) {
      state3.units[ptr] = {
        listeners: {},
        parent: a2.parent,
        scope: a2.scope,
        main: dom
      };
      if (!state3.scopes[a2.scope]) {
        state3.scopes[a2.scope] = [];
      }
      state3.scopes[a2.scope].push(ptr);
    }
    if (a2.key === "@self@") {
      avv(state3.units[ptr].main)();
    } else {
      if (state3.units[ptr].listeners[a2.key]) {
        state3.units[ptr].main.removeEventListener(a2.key, state3.units[ptr].listeners[a2.key]);
      }
      var el = (e) => avv(e)();
      state3.units[ptr].main.addEventListener(a2.key, el);
      state3.units[ptr].listeners[a2.key] = el;
    }
  };
  var setText_ = (a2) => (state3) => () => {
    var ptr = a2.id;
    state3.units[ptr].main.nodeValue = a2.text;
  };
  var makePursx_ = (tryHydration) => (maybe2) => (a2) => (state3) => () => {
    var dom2;
    var tmp;
    var ptr = a2.id;
    var html2 = a2.html;
    var verb = a2.verb;
    var cache = a2.cache;
    var parent2 = a2.parent;
    var scope2 = a2.scope;
    var pxScope = a2.pxScope;
    if (tryHydration && a2.parent.value0 && (dom2 = document.body.querySelectorAll("[data-deku-ssr-" + ptr + "]").item(0))) {
      state3.units[ptr] = {
        listeners: {},
        scope: scope2,
        parent: parent2,
        main: dom2
      };
    } else {
      const entries = Object.entries(cache);
      for (var i2 = 0; i2 < entries.length; i2++) {
        const key2 = entries[i2][0];
        if (entries[i2][1] === true) {
          html2 = html2.replace(verb + key2 + verb, 'data-deku-attr-internal="' + key2 + '"');
        } else {
          html2 = html2.replace(verb + key2 + verb, '<span style="display:contents;" data-deku-elt-internal="' + key2 + '"></span>');
        }
      }
      tmp = document.createElement("div");
      tmp.innerHTML = html2.trim();
      state3.units[ptr] = {
        listeners: {},
        scope: scope2,
        parent: parent2,
        main: tmp.firstChild
      };
    }
    if (!state3.scopes[scope2]) {
      state3.scopes[scope2] = [];
    }
    state3.scopes[scope2].push(ptr);
    if (!tmp) {
      tmp = dom2;
    }
    tmp.querySelectorAll("[data-deku-attr-internal]").forEach(function(e) {
      var key2 = e.getAttribute("data-deku-attr-internal");
      const namespacedKey = key2 + pxScope;
      state3.units[namespacedKey] = {
        listeners: {},
        main: e,
        scope: scope2
      };
      state3.scopes[scope2].push(namespacedKey);
    });
    tmp.querySelectorAll("[data-deku-elt-internal]").forEach(function(e) {
      var key2 = e.getAttribute("data-deku-elt-internal");
      const namespacedKey = key2 + pxScope;
      state3.units[key2 + pxScope] = {
        listeners: {},
        main: e,
        scope: scope2
      };
      state3.scopes[scope2].push(namespacedKey);
    });
    if (!dom2) {
      connectXToY_(maybe2, ptr, parent2, state3);
    }
  };
  var makeRoot_ = (a2) => (state3) => () => {
    var ptr = a2.id;
    state3.units[ptr] = {
      main: a2.root
    };
  };
  var giveNewParent_ = (a2) => (state3) => () => {
    var ptr = a2.id;
    var parent2 = a2.parent;
    state3.units[ptr].containingScope = a2.scope;
    state3.units[parent2].main.prepend(state3.units[ptr].main);
  };
  var disconnectElement_ = (a2) => (state3) => () => {
    var ptr = a2.id;
    if (state3.units[ptr].noop) {
      return;
    }
    if (state3.units[ptr].containingScope && !a2.scopeEq(state3.units[ptr].containingScope)(a2.scope)) {
      return;
    }
    state3.units[ptr].main.remove();
  };
  var deleteFromCache_ = (a2) => (state3) => () => {
    delete state3.units[a2.id];
  };
  var sendToTop_ = (a2) => (state3) => () => {
    var ptr = a2.id;
    state3.units[ptr].main.parentNode.prepend(state3.units[ptr].main);
  };

  // output/Random.LCG/index.js
  var unSeed = function(v) {
    return v;
  };
  var seedMin = 1;
  var lcgM = 2147483647;
  var seedMax = /* @__PURE__ */ function() {
    return lcgM - 1 | 0;
  }();
  var mkSeed = function(x) {
    var ensureBetween = function(min5) {
      return function(max6) {
        return function(n) {
          var rangeSize = max6 - min5 | 0;
          var n$prime = mod(euclideanRingInt)(n)(rangeSize);
          var $13 = n$prime < min5;
          if ($13) {
            return n$prime + max6 | 0;
          }
          ;
          return n$prime;
        };
      };
    };
    return ensureBetween(seedMin)(seedMax)(x);
  };
  var lcgC = 0;
  var lcgA = 48271;
  var lcgPerturb = function(d) {
    return function(v) {
      return fromJust()(fromNumber(remainder(toNumber(lcgA) * toNumber(v) + toNumber(d))(toNumber(lcgM))));
    };
  };
  var lcgNext = /* @__PURE__ */ lcgPerturb(lcgC);

  // output/Data.Array.NonEmpty.Internal/foreign.js
  var traverse1Impl = function() {
    function Cont(fn) {
      this.fn = fn;
    }
    var emptyList = {};
    var ConsCell = function(head5, tail2) {
      this.head = head5;
      this.tail = tail2;
    };
    function finalCell(head5) {
      return new ConsCell(head5, emptyList);
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
    return function(apply3) {
      return function(map3) {
        return function(f) {
          var buildFrom = function(x, ys) {
            return apply3(map3(consList)(f(x)))(ys);
          };
          var go2 = function(acc, currentLen, xs) {
            if (currentLen === 0) {
              return acc;
            } else {
              var last2 = xs[currentLen - 1];
              return new Cont(function() {
                var built = go2(buildFrom(last2, acc), currentLen - 1, xs);
                return built;
              });
            }
          };
          return function(array) {
            var acc = map3(finalCell)(f(array[array.length - 1]));
            var result = go2(acc, array.length - 1, array);
            while (result instanceof Cont) {
              result = result.fn();
            }
            return map3(listToArray)(result);
          };
        };
      };
    };
  }();

  // output/Test.QuickCheck.Gen/index.js
  var unGen = function(v) {
    return v;
  };
  var lcgStep = /* @__PURE__ */ function() {
    var f = function(s2) {
      return new Tuple(unSeed(s2.newSeed), function() {
        var $30 = {};
        for (var $31 in s2) {
          if ({}.hasOwnProperty.call(s2, $31)) {
            $30[$31] = s2[$31];
          }
          ;
        }
        ;
        $30.newSeed = lcgNext(s2.newSeed);
        return $30;
      }());
    };
    return state(monadStateStateT(monadIdentity))(f);
  }();
  var functorGen = /* @__PURE__ */ functorStateT(functorIdentity);
  var evalGen = function($40) {
    return evalState(unGen($40));
  };
  var applyGen = /* @__PURE__ */ applyStateT(monadIdentity);
  var chooseInt$prime = function(a2) {
    return function(b2) {
      var numB = toNumber(b2);
      var numA = toNumber(a2);
      var clamp = function(x) {
        return numA + remainder(x)(numB - numA + 1);
      };
      var choose31BitPosNumber = map(functorGen)(toNumber)(lcgStep);
      var choose32BitPosNumber = apply(applyGen)(map(functorGen)(add(semiringNumber))(choose31BitPosNumber))(map(functorGen)(mul(semiringNumber)(2))(choose31BitPosNumber));
      return map(functorGen)(function($45) {
        return floor2(clamp($45));
      })(choose32BitPosNumber);
    };
  };
  var chooseInt2 = function(a2) {
    return function(b2) {
      var $37 = a2 <= b2;
      if ($37) {
        return chooseInt$prime(a2)(b2);
      }
      ;
      return chooseInt$prime(b2)(a2);
    };
  };

  // output/Test.QuickCheck.Arbitrary/index.js
  var arbitrary = function(dict) {
    return dict.arbitrary;
  };
  var arbInt = /* @__PURE__ */ function() {
    return {
      arbitrary: chooseInt2(-1e6 | 0)(1e6)
    };
  }();

  // output/Deku.Interpret/index.js
  var fullDOMInterpret = function(seed) {
    return {
      ids: function __do2() {
        var s2 = read(seed)();
        var o = show(showInt)(evalGen(arbitrary(arbInt))({
          newSeed: mkSeed(s2),
          size: 5
        }));
        $$void(functorEffect)(modify2(add(semiringInt)(1))(seed))();
        return o;
      },
      makeElement: makeElement_(false),
      attributeParent: attributeParent_,
      makeRoot: makeRoot_,
      makeText: makeText_(false)(maybe(unit)),
      makePursx: makePursx_(false)(maybe(unit)),
      setProp: setProp_(false),
      setCb: setCb_(false),
      setText: setText_,
      sendToTop: sendToTop_,
      deleteFromCache: deleteFromCache_,
      giveNewParent: giveNewParent_,
      disconnectElement: disconnectElement_
    };
  };

  // output/Web.HTML/foreign.js
  var windowImpl = function() {
    return window;
  };

  // output/Web.HTML.HTMLDocument/foreign.js
  function _body(doc) {
    return function() {
      return doc.body;
    };
  }

  // output/Web.HTML.HTMLDocument/index.js
  var body2 = /* @__PURE__ */ function() {
    var $10 = map(functorEffect)(toMaybe);
    return function($11) {
      return $10(_body($11));
    };
  }();

  // output/Web.HTML.HTMLElement/index.js
  var toElement = unsafeCoerce2;

  // output/Web.HTML.Window/foreign.js
  function document2(window2) {
    return function() {
      return window2.document;
    };
  }

  // output/Deku.Toplevel/index.js
  var runInElementA$prime = function(elt) {
    return function(eee) {
      return function __do2() {
        var ffi = makeFFIDOMSnapshot();
        var evt = mapFlipped(functorEffect)($$new(0))(function() {
          var $29 = dekuA(korokGlobalEffect)(elt)(eee);
          return function($30) {
            return $29(fullDOMInterpret($30));
          };
        }())();
        return subscribe(evt)(function(i2) {
          return i2(ffi);
        })();
      };
    };
  };
  var runInElement1$prime = function(elt) {
    return function(eee) {
      return function __do2() {
        var ffi = makeFFIDOMSnapshot();
        var evt = mapFlipped(functorEffect)($$new(0))(function() {
          var $31 = deku1(korokGlobalEffect)(elt)(eee);
          return function($32) {
            return $31(fullDOMInterpret($32));
          };
        }())();
        return subscribe(evt)(function(i2) {
          return i2(ffi);
        })();
      };
    };
  };
  var runInBodyA$prime = function(eee) {
    return function __do2() {
      var b$prime = bind(bindEffect)(bind(bindEffect)(windowImpl)(document2))(body2)();
      return maybe(mempty(monoidEffect(monoidEffect(monoidUnit))))(function(elt) {
        return runInElementA$prime(elt)(eee);
      })(map(functorMaybe)(toElement)(b$prime))();
    };
  };
  var runInBodyA = function(a2) {
    return $$void(functorEffect)(runInBodyA$prime(a2));
  };
  var runInBody1$prime = function(eee) {
    return function __do2() {
      var b$prime = bind(bindEffect)(bind(bindEffect)(windowImpl)(document2))(body2)();
      return maybe(mempty(monoidEffect(monoidEffect(monoidUnit))))(function(elt) {
        return runInElement1$prime(elt)(eee);
      })(map(functorMaybe)(toElement)(b$prime))();
    };
  };
  var runInBody1 = function(a2) {
    return $$void(functorEffect)(runInBody1$prime(a2));
  };

  // output/Data.Rational/index.js
  var fromInt = function(i2) {
    return reduce(ordInt)(euclideanRingInt)(i2)(1);
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
  var showInt2 = function(n) {
    var $16 = n < 0;
    if ($16) {
      return show(showInt)(n);
    }
    ;
    return "+" + show(showInt)(n);
  };
  var showAngle = function(v) {
    if (v) {
      return "\\frac{\\pi}{3}";
    }
    ;
    if (!v) {
      return "\\frac{2\\pi}{3}";
    }
    ;
    throw new Error("Failed pattern match at Exercise1 (line 51, column 13 - line 53, column 30): " + [v.constructor.name]);
  };
  var rshow = function(r) {
    var n = numerator(r);
    var d = denominator(r);
    var $18 = d === 1;
    if ($18) {
      return show(showInt)(n);
    }
    ;
    return "\\frac{" + (show(showInt)(n) + ("}{" + (show(showInt)(d) + "}")));
  };
  var problems = [{
    ac: 7,
    ab: 3,
    sqrtD: 13
  }, {
    ac: 7,
    ab: 5,
    sqrtD: 11
  }, {
    ac: 13,
    ab: 7,
    sqrtD: 23
  }, {
    ac: 13,
    ab: 8,
    sqrtD: 22
  }, {
    ac: 14,
    ab: 6,
    sqrtD: 26
  }, {
    ac: 14,
    ab: 10,
    sqrtD: 22
  }, {
    ac: 19,
    ab: 5,
    sqrtD: 37
  }, {
    ac: 19,
    ab: 16,
    sqrtD: 26
  }, {
    ac: 21,
    ab: 9,
    sqrtD: 39
  }, {
    ac: 21,
    ab: 15,
    sqrtD: 33
  }, {
    ac: 26,
    ab: 14,
    sqrtD: 46
  }, {
    ac: 26,
    ab: 16,
    sqrtD: 44
  }, {
    ac: 28,
    ab: 12,
    sqrtD: 52
  }, {
    ac: 28,
    ab: 20,
    sqrtD: 44
  }, {
    ac: 31,
    ab: 11,
    sqrtD: 59
  }, {
    ac: 31,
    ab: 24,
    sqrtD: 46
  }, {
    ac: 35,
    ab: 15,
    sqrtD: 65
  }, {
    ac: 35,
    ab: 25,
    sqrtD: 55
  }, {
    ac: 37,
    ab: 7,
    sqrtD: 73
  }, {
    ac: 37,
    ab: 33,
    sqrtD: 47
  }, {
    ac: 38,
    ab: 10,
    sqrtD: 74
  }, {
    ac: 38,
    ab: 32,
    sqrtD: 52
  }, {
    ac: 39,
    ab: 21,
    sqrtD: 69
  }, {
    ac: 39,
    ab: 24,
    sqrtD: 66
  }];
  var randomParam = function(r) {
    var rp2 = rand(r);
    var v = problems[mod(euclideanRingInt)(rp2.val)(length(problems))];
    var ra = rand(rp2);
    var a2 = mod(euclideanRingInt)(ra.val)(2) === 0;
    return {
      ac: v.ac,
      ab: v.ab,
      sqrtD: v.sqrtD,
      a: a2
    };
  };
  var exo1 = function(dictKorok) {
    return function(dictFunctor) {
      return function(dictMonadState) {
        return function(f0) {
          return discard(discardUnit)(dictMonadState.Monad0().Bind1())(openSection_("Exercice I")("5 points")(dictFunctor)(dictMonadState)(dictKorok))(function() {
            return discard(discardUnit)(dictMonadState.Monad0().Bind1())(t_(dictKorok)(dictFunctor)(dictMonadState)("Soit "))(function() {
              return discard(discardUnit)(dictMonadState.Monad0().Bind1())(m_(dictKorok)(dictFunctor)(dictMonadState)("ABC"))(function() {
                return discard(discardUnit)(dictMonadState.Monad0().Bind1())(t_(dictKorok)(dictFunctor)(dictMonadState)(" un triangle tel que "))(function() {
                  var r0 = map(functorEvent)(fst)(f0);
                  var p0 = map(functorEvent)(randomParam)(r0);
                  return discard(discardUnit)(dictMonadState.Monad0().Bind1())(m(dictKorok)(dictFunctor)(dictMonadState)(map(functorEvent)(function() {
                    var $42 = show(showInt);
                    return function($43) {
                      return function(v) {
                        return "AB = " + v;
                      }($42(function(v) {
                        return v.ab;
                      }($43)));
                    };
                  }())(p0)))(function() {
                    return discard(discardUnit)(dictMonadState.Monad0().Bind1())(t_(dictKorok)(dictFunctor)(dictMonadState)(", "))(function() {
                      return discard(discardUnit)(dictMonadState.Monad0().Bind1())(m(dictKorok)(dictFunctor)(dictMonadState)(map(functorEvent)(function() {
                        var $44 = show(showInt);
                        return function($45) {
                          return function(v) {
                            return "AC = " + v;
                          }($44(function(v) {
                            return v.ac;
                          }($45)));
                        };
                      }())(p0)))(function() {
                        return discard(discardUnit)(dictMonadState.Monad0().Bind1())(t_(dictKorok)(dictFunctor)(dictMonadState)(" et "))(function() {
                          return discard(discardUnit)(dictMonadState.Monad0().Bind1())(m(dictKorok)(dictFunctor)(dictMonadState)(map(functorEvent)(function($46) {
                            return function(v) {
                              return v + ".";
                            }(function(v) {
                              return "\\widehat{ABC} = " + v;
                            }(showAngle(function(v) {
                              return v.a;
                            }($46))));
                          })(p0)))(function() {
                            return discard(discardUnit)(dictMonadState.Monad0().Bind1())(nl(dictFunctor)(dictMonadState)(dictKorok))(function() {
                              return discard(discardUnit)(dictMonadState.Monad0().Bind1())(t_(dictKorok)(dictFunctor)(dictMonadState)("On note "))(function() {
                                return discard(discardUnit)(dictMonadState.Monad0().Bind1())(m_(dictKorok)(dictFunctor)(dictMonadState)("BC=x."))(function() {
                                  return discard(discardUnit)(dictMonadState.Monad0().Bind1())(nl(dictFunctor)(dictMonadState)(dictKorok))(function() {
                                    return discard(discardUnit)(dictMonadState.Monad0().Bind1())(nl(dictFunctor)(dictMonadState)(dictKorok))(function() {
                                      return discard(discardUnit)(dictMonadState.Monad0().Bind1())(b_2("1")(dictFunctor)(dictMonadState)(dictKorok))(function() {
                                        return discard(discardUnit)(dictMonadState.Monad0().Bind1())(m_(dictKorok)(dictFunctor)(dictMonadState)("\\bullet\\bullet\\circ\\;"))(function() {
                                          return discard(discardUnit)(dictMonadState.Monad0().Bind1())(t_(dictKorok)(dictFunctor)(dictMonadState)("Evaluer, en fonction de  "))(function() {
                                            return discard(discardUnit)(dictMonadState.Monad0().Bind1())(m_(dictKorok)(dictFunctor)(dictMonadState)("x"))(function() {
                                              return discard(discardUnit)(dictMonadState.Monad0().Bind1())(t_(dictKorok)(dictFunctor)(dictMonadState)(", le produit scalaire "))(function() {
                                                return discard(discardUnit)(dictMonadState.Monad0().Bind1())(m_(dictKorok)(dictFunctor)(dictMonadState)("\\overrightarrow{BA}{\\large\\cdot}\\overrightarrow{BC}"))(function() {
                                                  return discard(discardUnit)(dictMonadState.Monad0().Bind1())(t_(dictKorok)(dictFunctor)(dictMonadState)(" de "))(function() {
                                                    return discard(discardUnit)(dictMonadState.Monad0().Bind1())(em_2("deux")(dictFunctor)(dictMonadState)(dictKorok))(function() {
                                                      return discard(discardUnit)(dictMonadState.Monad0().Bind1())(t_(dictKorok)(dictFunctor)(dictMonadState)(" mani\xE8res diff\xE9rentes."))(function() {
                                                        return discard(discardUnit)(dictMonadState.Monad0().Bind1())(nl(dictFunctor)(dictMonadState)(dictKorok))(function() {
                                                          return discard(discardUnit)(dictMonadState.Monad0().Bind1())(t_(dictKorok)(dictFunctor)(dictMonadState)("En d\xE9duire que "))(function() {
                                                            return discard(discardUnit)(dictMonadState.Monad0().Bind1())(m_(dictKorok)(dictFunctor)(dictMonadState)("x"))(function() {
                                                              return discard(discardUnit)(dictMonadState.Monad0().Bind1())(t_(dictKorok)(dictFunctor)(dictMonadState)(" satisfait l'\xE9quation "))(function() {
                                                                return discard(discardUnit)(dictMonadState.Monad0().Bind1())(equation2(dictKorok)(dictFunctor)(dictMonadState)(map(functorEvent)(function(v) {
                                                                  var v1 = randomParam(v.value0);
                                                                  return "x^2" + (function() {
                                                                    if (v1.a) {
                                                                      return "-";
                                                                    }
                                                                    ;
                                                                    return "+";
                                                                  }() + (show(showInt)(v1.ab) + ("x" + (showInt2(pow2(v1.ab)(2) - pow2(v1.ac)(2) | 0) + "=0"))));
                                                                })(f0)))(function() {
                                                                  return discard(discardUnit)(dictMonadState.Monad0().Bind1())(nl(dictFunctor)(dictMonadState)(dictKorok))(function() {
                                                                    return discard(discardUnit)(dictMonadState.Monad0().Bind1())(nl(dictFunctor)(dictMonadState)(dictKorok))(function() {
                                                                      return discard(discardUnit)(dictMonadState.Monad0().Bind1())(b_2("2")(dictFunctor)(dictMonadState)(dictKorok))(function() {
                                                                        return discard(discardUnit)(dictMonadState.Monad0().Bind1())(m_(dictKorok)(dictFunctor)(dictMonadState)("\\bullet\\bullet\\circ\\;"))(function() {
                                                                          return discard(discardUnit)(dictMonadState.Monad0().Bind1())(t_(dictKorok)(dictFunctor)(dictMonadState)("R\xE9soudre cette \xE9quation, et en d\xE9duire la valeur de "))(function() {
                                                                            return discard(discardUnit)(dictMonadState.Monad0().Bind1())(m_(dictKorok)(dictFunctor)(dictMonadState)("BC."))(function() {
                                                                              return discard(discardUnit)(dictMonadState.Monad0().Bind1())(nl(dictFunctor)(dictMonadState)(dictKorok))(function() {
                                                                                return t(dictKorok)(dictFunctor)(dictMonadState)(map(functorEvent)(function(v) {
                                                                                  var v1 = randomParam(v.value0);
                                                                                  if (v.value1) {
                                                                                    return "r\xE9ponse: " + rshow(div(euclideanRingRatio(ordInt)(euclideanRingInt))(fromInt(function() {
                                                                                      if (v1.a) {
                                                                                        return v1.ab;
                                                                                      }
                                                                                      ;
                                                                                      return -v1.ab | 0;
                                                                                    }() + v1.sqrtD | 0))(fromInt(2)));
                                                                                  }
                                                                                  ;
                                                                                  return "";
                                                                                })(f0));
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
            });
          });
        };
      };
    };
  };

  // output/Main/index.js
  var header2 = function(dictKorok) {
    return fromIncremental(discard(discardUnit)(bindStateT(monadIdentity))(setTitle_("Devoir 9 : Suites arithm\xE9tiques et g\xE9om\xE9triques")(functorStateT(functorIdentity))(monadStateStateT(monadIdentity))(dictKorok))(function() {
      return discard(discardUnit)(bindStateT(monadIdentity))(nl(functorStateT(functorIdentity))(monadStateStateT(monadIdentity))(dictKorok))(function() {
        return discard(discardUnit)(bindStateT(monadIdentity))(put2(functorStateT(functorIdentity))(monadStateStateT(monadIdentity))(div2(dictKorok)(bang(dictKorok.MonadST5().Monad0().Applicative0())(attr(attrDiv_StyleString)(Style.value)("display: grid; grid-template-columns: 1fr 1fr 1fr;")))([label_(dictKorok)([text_(dictKorok.MonadST5().Monad0())("Nom:")]), label_(dictKorok)([text_(dictKorok.MonadST5().Monad0())("Pr\xE9nom:")]), label_(dictKorok)([text_(dictKorok.MonadST5().Monad0())("Classe:")])])))(function() {
          return discard(discardUnit)(bindStateT(monadIdentity))(put2(functorStateT(functorIdentity))(monadStateStateT(monadIdentity))(ul_(dictKorok)([li_(dictKorok)([text_(dictKorok.MonadST5().Monad0())("4 exercices")]), li_(dictKorok)(fromIncremental(discard(discardUnit)(bindStateT(monadIdentity))(t_(dictKorok)(functorStateT(functorIdentity))(monadStateStateT(monadIdentity))("5 points par exercice ("))(function() {
            return discard(discardUnit)(bindStateT(monadIdentity))(m_(dictKorok)(functorStateT(functorIdentity))(monadStateStateT(monadIdentity))("\\bullet"))(function() {
              return discard(discardUnit)(bindStateT(monadIdentity))(t_(dictKorok)(functorStateT(functorIdentity))(monadStateStateT(monadIdentity))(": 1 point, "))(function() {
                return discard(discardUnit)(bindStateT(monadIdentity))(m_(dictKorok)(functorStateT(functorIdentity))(monadStateStateT(monadIdentity))("\\circ"))(function() {
                  return discard(discardUnit)(bindStateT(monadIdentity))(t_(dictKorok)(functorStateT(functorIdentity))(monadStateStateT(monadIdentity))(": "))(function() {
                    return discard(discardUnit)(bindStateT(monadIdentity))(m_(dictKorok)(functorStateT(functorIdentity))(monadStateStateT(monadIdentity))("\\frac{1}{2}"))(function() {
                      return discard(discardUnit)(bindStateT(monadIdentity))(t_(dictKorok)(functorStateT(functorIdentity))(monadStateStateT(monadIdentity))(" point)"))(function() {
                        return get2(monadStateStateT(monadIdentity));
                      });
                    });
                  });
                });
              });
            });
          }))), li_(dictKorok)([text_(dictKorok.MonadST5().Monad0())("sans document")]), li_(dictKorok)([text_(dictKorok.MonadST5().Monad0())("calculatrice n\xE9cessaire")])])))(function() {
            return get2(monadStateStateT(monadIdentity));
          });
        });
      });
    }));
  };
  var fromRelative = function(n) {
    var odd = (2 * abs(ordInt)(ringInt)(n) | 0) + 1 | 0;
    return rand({
      val: odd,
      gen: 0,
      seed: odd * odd | 0
    });
  };
  var main2 = function __do() {
    runInBodyA(header2(korokGlobalEffect))();
    return runInBody1(vbus()(monadSTEffect)(vbusCons2({
      reflectSymbol: function() {
        return "enabled";
      }
    })()()(vbusCons2({
      reflectSymbol: function() {
        return "textContent";
      }
    })()()(vbusNil)()()()())()()()())($$Proxy.value)(function(push2) {
      return function(event) {
        var doc = function(seed) {
          return function(enabled) {
            return div2(korokGlobalEffect)(map(functorEvent)(function(v) {
              if (v) {
                return attr(attrDiv_StyleString)(Style.value)("display: block;");
              }
              ;
              return attr(attrDiv_StyleString)(Style.value)("display: none;");
            })(enabled))(function() {
              var f0 = splits(new Tuple(fromRelative, function(v) {
                return v < 0;
              }))(seed);
              var f1 = map(functorEvent)(function(v) {
                return new Tuple(consume(30)(v.value0), v.value1);
              })(f0);
              return fromIncremental(discard(discardUnit)(bindStateT(monadIdentity))(nl(functorStateT(functorIdentity))(monadStateStateT(monadIdentity))(korokGlobalEffect))(function() {
                return discard(discardUnit)(bindStateT(monadIdentity))(exo1(korokGlobalEffect)(functorStateT(functorIdentity))(monadStateStateT(monadIdentity))(f1))(function() {
                  return get2(monadStateStateT(monadIdentity));
                });
              }));
            }());
          };
        };
        return div_(korokGlobalEffect)([div_(korokGlobalEffect)([label_(korokGlobalEffect)([text_(monadEffect)("Enonc\xE9 n\xB0 ")]), input(korokGlobalEffect)(alt(altEvent(applicativeEffect))(runningText(applicativeEffect)(bang(applicativeEffect)(push2.textContent)))(alt(altEvent(applicativeEffect))(enterHit(applicativeEffect)(bang(applicativeEffect)(push2.enabled)))(oneOfMap(foldableArray)(plusEvent(applicativeEffect))(bang(applicativeEffect))([attr(attrInput_SizeString)(Size.value)("56"), attr(attrInput_AutofocusString)(Autofocus.value)("")]))))([])]), doc(map(functorEvent)(toSeed)(event.textContent))(alt(altEvent(applicativeEffect))(bang(applicativeEffect)(false))(event.enabled))]);
      };
    }))();
  };

  // <stdin>
  main2();
})();
