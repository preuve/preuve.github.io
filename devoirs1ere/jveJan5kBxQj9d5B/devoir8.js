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

  // output/Data.Functor/foreign.js
  var arrayMap = function(f) {
    return function(arr) {
      var l = arr.length;
      var result = new Array(l);
      for (var i2 = 0; i2 < l; i2++) {
        result[i2] = f(arr[i2]);
      }
      return result;
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
    var map18 = map(dictFunctor);
    return function(fa) {
      return function(f) {
        return map18(f)(fa);
      };
    };
  };
  var $$void = function(dictFunctor) {
    return map(dictFunctor)($$const(unit));
  };
  var functorFn = {
    map: /* @__PURE__ */ compose(semigroupoidFn)
  };
  var functorArray = {
    map: arrayMap
  };

  // output/Control.Apply/index.js
  var identity2 = /* @__PURE__ */ identity(categoryFn);
  var apply = function(dict) {
    return dict.apply;
  };
  var applySecond = function(dictApply) {
    var apply1 = apply(dictApply);
    var map18 = map(dictApply.Functor0());
    return function(a2) {
      return function(b2) {
        return apply1(map18($$const(identity2))(a2))(b2);
      };
    };
  };
  var lift2 = function(dictApply) {
    var apply1 = apply(dictApply);
    var map18 = map(dictApply.Functor0());
    return function(f) {
      return function(a2) {
        return function(b2) {
          return apply1(map18(f)(a2))(b2);
        };
      };
    };
  };

  // output/Control.Applicative/index.js
  var pure = function(dict) {
    return dict.pure;
  };
  var when = function(dictApplicative) {
    var pure15 = pure(dictApplicative);
    return function(v) {
      return function(v1) {
        if (v) {
          return v1;
        }
        ;
        if (!v) {
          return pure15(unit);
        }
        ;
        throw new Error("Failed pattern match at Control.Applicative (line 63, column 1 - line 63, column 63): " + [v.constructor.name, v1.constructor.name]);
      };
    };
  };
  var liftA1 = function(dictApplicative) {
    var apply5 = apply(dictApplicative.Apply0());
    var pure15 = pure(dictApplicative);
    return function(f) {
      return function(a2) {
        return apply5(pure15(f))(a2);
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
    var bind1 = bind(dictBind);
    return function(f) {
      return function(g) {
        return function(a2) {
          return bind1(f(a2))(g);
        };
      };
    };
  };
  var discardUnit = {
    discard: function(dictBind) {
      return bind(dictBind);
    }
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
    return function(eq3) {
      return function(gt) {
        return function(x) {
          return function(y) {
            return x < y ? lt : x === y ? eq3 : gt;
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
  var eqOrdering = {
    eq: function(v) {
      return function(v1) {
        if (v instanceof LT && v1 instanceof LT) {
          return true;
        }
        ;
        if (v instanceof GT && v1 instanceof GT) {
          return true;
        }
        ;
        if (v instanceof EQ && v1 instanceof EQ) {
          return true;
        }
        ;
        return false;
      };
    }
  };

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
    var sub1 = sub(dictRing);
    var zero2 = zero(dictRing.Semiring0());
    return function(a2) {
      return sub1(zero2)(a2);
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
    var compare3 = compare(dictOrd);
    return function(a1) {
      return function(a2) {
        var v = compare3(a1)(a2);
        if (v instanceof GT) {
          return true;
        }
        ;
        return false;
      };
    };
  };
  var greaterThanOrEq = function(dictOrd) {
    var compare3 = compare(dictOrd);
    return function(a1) {
      return function(a2) {
        var v = compare3(a1)(a2);
        if (v instanceof LT) {
          return false;
        }
        ;
        return true;
      };
    };
  };
  var lessThan = function(dictOrd) {
    var compare3 = compare(dictOrd);
    return function(a1) {
      return function(a2) {
        var v = compare3(a1)(a2);
        if (v instanceof LT) {
          return true;
        }
        ;
        return false;
      };
    };
  };
  var signum = function(dictOrd) {
    var lessThan1 = lessThan(dictOrd);
    var greaterThan1 = greaterThan(dictOrd);
    return function(dictRing) {
      var Semiring0 = dictRing.Semiring0();
      var zero2 = zero(Semiring0);
      var negate1 = negate(dictRing);
      var one2 = one(Semiring0);
      return function(x) {
        var $89 = lessThan1(x)(zero2);
        if ($89) {
          return negate1(one2);
        }
        ;
        var $90 = greaterThan1(x)(zero2);
        if ($90) {
          return one2;
        }
        ;
        return x;
      };
    };
  };
  var abs = function(dictOrd) {
    var greaterThanOrEq1 = greaterThanOrEq(dictOrd);
    return function(dictRing) {
      var zero2 = zero(dictRing.Semiring0());
      var negate1 = negate(dictRing);
      return function(x) {
        var $99 = greaterThanOrEq1(x)(zero2);
        if ($99) {
          return x;
        }
        ;
        return negate1(x);
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
  var gcd = function(dictEq) {
    var eq3 = eq(dictEq);
    return function(dictEuclideanRing) {
      var zero2 = zero(dictEuclideanRing.CommutativeRing0().Ring0().Semiring0());
      var mod1 = mod(dictEuclideanRing);
      return function(a2) {
        return function(b2) {
          var $24 = eq3(b2)(zero2);
          if ($24) {
            return a2;
          }
          ;
          return gcd(dictEq)(dictEuclideanRing)(b2)(mod1(a2)(b2));
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
  var concatString = function(s1) {
    return function(s2) {
      return s1 + s2;
    };
  };
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
  var semigroupString = {
    append: concatString
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
  var monoidString = {
    mempty: "",
    Semigroup0: function() {
      return semigroupString;
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
  var snd = function(v) {
    return v.value1;
  };
  var fst = function(v) {
    return v.value0;
  };

  // output/Control.Monad.State.Class/index.js
  var state = function(dict) {
    return dict.state;
  };
  var modify = function(dictMonadState) {
    var state1 = state(dictMonadState);
    return function(f) {
      return state1(function(s2) {
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
    var bind5 = bind(dictMonad.Bind1());
    var pure9 = pure(dictMonad.Applicative0());
    return function(f) {
      return function(a2) {
        return bind5(f)(function(f$prime) {
          return bind5(a2)(function(a$prime) {
            return pure9(f$prime(a$prime));
          });
        });
      };
    };
  };

  // output/Data.Maybe/index.js
  var identity3 = /* @__PURE__ */ identity(categoryFn);
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
  var map2 = /* @__PURE__ */ map(functorMaybe);
  var fromMaybe = function(a2) {
    return maybe(a2)(identity3);
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
          return map2(v.value0)(v1);
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
    var state4 = 0;
    var val;
    return function(lineNumber) {
      if (state4 === 2)
        return val;
      if (state4 === 1)
        throw new ReferenceError(name15 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state4 = 1;
      val = init2();
      state4 = 2;
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
  var lift22 = /* @__PURE__ */ lift2(applyEffect);
  var semigroupEffect = function(dictSemigroup) {
    return {
      append: lift22(append(dictSemigroup))
    };
  };
  var monoidEffect = function(dictMonoid) {
    var semigroupEffect1 = semigroupEffect(dictMonoid.Semigroup0());
    return {
      mempty: pureE(mempty(dictMonoid)),
      Semigroup0: function() {
        return semigroupEffect1;
      }
    };
  };

  // output/Data.Identity/index.js
  var Identity = function(x) {
    return x;
  };
  var functorIdentity = {
    map: function(f) {
      return function(m3) {
        return f(m3);
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
  var write = function(val) {
    return function(ref) {
      return function() {
        ref.value = val;
      };
    };
  };

  // output/Effect.Ref/index.js
  var $$void2 = /* @__PURE__ */ $$void(functorEffect);
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
  var modify_ = function(f) {
    return function(s2) {
      return $$void2(modify2(f)(s2));
    };
  };

  // output/Control.Plus/index.js
  var empty = function(dict) {
    return dict.empty;
  };

  // output/Control.Monad.State.Trans/index.js
  var functorStateT = function(dictFunctor) {
    var map18 = map(dictFunctor);
    return {
      map: function(f) {
        return function(v) {
          return function(s2) {
            return map18(function(v1) {
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
    var bind5 = bind(dictMonad.Bind1());
    return {
      bind: function(v) {
        return function(f) {
          return function(s2) {
            return bind5(v(s2))(function(v1) {
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
    var functorStateT1 = functorStateT(dictMonad.Bind1().Apply0().Functor0());
    return {
      apply: ap(monadStateT(dictMonad)),
      Functor0: function() {
        return functorStateT1;
      }
    };
  };
  var applicativeStateT = function(dictMonad) {
    var pure9 = pure(dictMonad.Applicative0());
    return {
      pure: function(a2) {
        return function(s2) {
          return pure9(new Tuple(a2, s2));
        };
      },
      Apply0: function() {
        return applyStateT(dictMonad);
      }
    };
  };
  var monadStateStateT = function(dictMonad) {
    var pure9 = pure(dictMonad.Applicative0());
    var monadStateT1 = monadStateT(dictMonad);
    return {
      state: function(f) {
        return function($200) {
          return pure9(f($200));
        };
      },
      Monad0: function() {
        return monadStateT1;
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
  var coerce2 = /* @__PURE__ */ coerce();
  var unwrap = function() {
    return coerce2;
  };

  // output/Control.Monad.State/index.js
  var unwrap2 = /* @__PURE__ */ unwrap();
  var runState = function(v) {
    return function($18) {
      return unwrap2(v($18));
    };
  };
  var evalState = function(v) {
    return function(s2) {
      var v1 = v(s2);
      return v1.value0;
    };
  };

  // output/Data.Array/foreign.js
  var range = function(start2) {
    return function(end) {
      var step3 = start2 > end ? -1 : 1;
      var result = new Array(step3 * (end - start2) + 1);
      var i2 = start2, n = 0;
      while (i2 !== end) {
        result[n++] = i2;
        i2 += step3;
      }
      result[n] = i2;
      return result;
    };
  };
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
    return function(foldr5) {
      return function(xs) {
        return listToArray(foldr5(curryCons)(emptyList)(xs));
      };
    };
  }();
  var length = function(xs) {
    return xs.length;
  };
  var indexImpl = function(just) {
    return function(nothing) {
      return function(xs) {
        return function(i2) {
          return i2 < 0 || i2 >= xs.length ? nothing : just(xs[i2]);
        };
      };
    };
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
    function mergeFromTo(compare3, fromOrdering, xs1, xs2, from2, to2) {
      var mid;
      var i2;
      var j;
      var k;
      var x;
      var y;
      var c;
      mid = from2 + (to2 - from2 >> 1);
      if (mid - from2 > 1)
        mergeFromTo(compare3, fromOrdering, xs2, xs1, from2, mid);
      if (to2 - mid > 1)
        mergeFromTo(compare3, fromOrdering, xs2, xs1, mid, to2);
      i2 = from2;
      j = mid;
      k = from2;
      while (i2 < mid && j < to2) {
        x = xs2[i2];
        y = xs2[j];
        c = fromOrdering(compare3(x)(y));
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
    return function(compare3) {
      return function(fromOrdering) {
        return function(xs) {
          var out;
          if (xs.length < 2)
            return xs;
          out = xs.slice(0);
          mergeFromTo(compare3, fromOrdering, out, xs.slice(0), 0, xs.length);
          return out;
        };
      };
    };
  }();
  var slice = function(s2) {
    return function(e) {
      return function(l) {
        return l.slice(s2, e);
      };
    };
  };
  var zipWith = function(f) {
    return function(xs) {
      return function(ys) {
        var l = xs.length < ys.length ? xs.length : ys.length;
        var result = new Array(l);
        for (var i2 = 0; i2 < l; i2++) {
          result[i2] = f(xs[i2])(ys[i2]);
        }
        return result;
      };
    };
  };
  var unsafeIndexImpl = function(xs) {
    return function(n) {
      return xs[n];
    };
  };

  // output/Control.Monad.ST.Internal/foreign.js
  var map_ = function(f) {
    return function(a2) {
      return function() {
        return f(a2());
      };
    };
  };
  var pure_ = function(a2) {
    return function() {
      return a2;
    };
  };
  var bind_ = function(a2) {
    return function(f) {
      return function() {
        return f(a2())();
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
  var $runtime_lazy2 = function(name15, moduleName, init2) {
    var state4 = 0;
    var val;
    return function(lineNumber) {
      if (state4 === 2)
        return val;
      if (state4 === 1)
        throw new ReferenceError(name15 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state4 = 1;
      val = init2();
      state4 = 2;
      return val;
    };
  };
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
  var monadST = {
    Applicative0: function() {
      return applicativeST;
    },
    Bind1: function() {
      return bindST;
    }
  };
  var bindST = {
    bind: bind_,
    Apply0: function() {
      return $lazy_applyST(0);
    }
  };
  var applicativeST = {
    pure: pure_,
    Apply0: function() {
      return $lazy_applyST(0);
    }
  };
  var $lazy_applyST = /* @__PURE__ */ $runtime_lazy2("applyST", "Control.Monad.ST.Internal", function() {
    return {
      apply: ap(monadST),
      Functor0: function() {
        return functorST;
      }
    };
  });
  var applyST = /* @__PURE__ */ $lazy_applyST(47);

  // output/Data.Array.ST/foreign.js
  function newSTArray() {
    return [];
  }
  var pushAll = function(as) {
    return function(xs) {
      return function() {
        return xs.push.apply(xs, as);
      };
    };
  };
  var splice = function(i2) {
    return function(howMany) {
      return function(bs) {
        return function(xs) {
          return function() {
            return xs.splice.apply(xs, [i2, howMany].concat(bs));
          };
        };
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
  var freeze = copyImpl;
  var thaw = copyImpl;
  var sortByImpl2 = function() {
    function mergeFromTo(compare3, fromOrdering, xs1, xs2, from2, to2) {
      var mid;
      var i2;
      var j;
      var k;
      var x;
      var y;
      var c;
      mid = from2 + (to2 - from2 >> 1);
      if (mid - from2 > 1)
        mergeFromTo(compare3, fromOrdering, xs2, xs1, from2, mid);
      if (to2 - mid > 1)
        mergeFromTo(compare3, fromOrdering, xs2, xs1, mid, to2);
      i2 = from2;
      j = mid;
      k = from2;
      while (i2 < mid && j < to2) {
        x = xs2[i2];
        y = xs2[j];
        c = fromOrdering(compare3(x)(y));
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
    return function(compare3) {
      return function(fromOrdering) {
        return function(xs) {
          return function() {
            if (xs.length < 2)
              return xs;
            mergeFromTo(compare3, fromOrdering, xs, xs.slice(0), 0, xs.length);
            return xs;
          };
        };
      };
    };
  }();

  // output/Data.Array.ST/index.js
  var withArray = function(f) {
    return function(xs) {
      return function __do3() {
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

  // output/Data.Foldable/index.js
  var eq12 = /* @__PURE__ */ eq(eqOrdering);
  var foldr = function(dict) {
    return dict.foldr;
  };
  var oneOf = function(dictFoldable) {
    var foldr22 = foldr(dictFoldable);
    return function(dictPlus) {
      return foldr22(alt(dictPlus.Alt0()))(empty(dictPlus));
    };
  };
  var oneOfMap = function(dictFoldable) {
    var foldr22 = foldr(dictFoldable);
    return function(dictPlus) {
      var alt7 = alt(dictPlus.Alt0());
      var empty8 = empty(dictPlus);
      return function(f) {
        return foldr22(function($448) {
          return alt7(f($448));
        })(empty8);
      };
    };
  };
  var traverse_ = function(dictApplicative) {
    var applySecond3 = applySecond(dictApplicative.Apply0());
    var pure9 = pure(dictApplicative);
    return function(dictFoldable) {
      var foldr22 = foldr(dictFoldable);
      return function(f) {
        return foldr22(function($449) {
          return applySecond3(f($449));
        })(pure9(unit));
      };
    };
  };
  var for_ = function(dictApplicative) {
    var traverse_1 = traverse_(dictApplicative);
    return function(dictFoldable) {
      return flip(traverse_1(dictFoldable));
    };
  };
  var foldl = function(dict) {
    return dict.foldl;
  };
  var maximumBy = function(dictFoldable) {
    var foldl22 = foldl(dictFoldable);
    return function(cmp) {
      var max$prime = function(v) {
        return function(v1) {
          if (v instanceof Nothing) {
            return new Just(v1);
          }
          ;
          if (v instanceof Just) {
            return new Just(function() {
              var $298 = eq12(cmp(v.value0)(v1))(GT.value);
              if ($298) {
                return v.value0;
              }
              ;
              return v1;
            }());
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 441, column 3 - line 441, column 27): " + [v.constructor.name, v1.constructor.name]);
        };
      };
      return foldl22(max$prime)(Nothing.value);
    };
  };
  var maximum = function(dictOrd) {
    var compare3 = compare(dictOrd);
    return function(dictFoldable) {
      return maximumBy(dictFoldable)(compare3);
    };
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
      var mempty4 = mempty(dictMonoid);
      return function(v) {
        return function(v1) {
          if (v1 instanceof Nothing) {
            return mempty4;
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
    var foldr22 = foldr(dictFoldable);
    return function(dictMonoid) {
      var append7 = append(dictMonoid.Semigroup0());
      var mempty4 = mempty(dictMonoid);
      return function(f) {
        return foldr22(function(x) {
          return function(acc) {
            return append7(f(x))(acc);
          };
        })(mempty4);
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
    return function(apply5) {
      return function(map18) {
        return function(pure9) {
          return function(f) {
            return function(array) {
              function go2(bot, top3) {
                switch (top3 - bot) {
                  case 0:
                    return pure9([]);
                  case 1:
                    return map18(array1)(f(array[bot]));
                  case 2:
                    return apply5(map18(array2)(f(array[bot])))(f(array[bot + 1]));
                  case 3:
                    return apply5(apply5(map18(array3)(f(array[bot])))(f(array[bot + 1])))(f(array[bot + 2]));
                  default:
                    var pivot = bot + Math.floor((top3 - bot) / 4) * 2;
                    return apply5(map18(concat2)(go2(bot, pivot)))(go2(pivot, top3));
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
  var fromJust2 = /* @__PURE__ */ fromJust();
  var append2 = /* @__PURE__ */ append(semigroupArray);
  var unsafeIndex = function() {
    return unsafeIndexImpl;
  };
  var take = function(n) {
    return function(xs) {
      var $146 = n < 1;
      if ($146) {
        return [];
      }
      ;
      return slice(0)(n)(xs);
    };
  };
  var snoc = function(xs) {
    return function(x) {
      return withArray(push(x))(xs)();
    };
  };
  var mapWithIndex = function(f) {
    return function(xs) {
      return zipWith(f)(range(0)(length(xs) - 1 | 0))(xs);
    };
  };
  var index = /* @__PURE__ */ function() {
    return indexImpl(Just.create)(Nothing.value);
  }();
  var last = function(xs) {
    return index(xs)(length(xs) - 1 | 0);
  };
  var foldr2 = /* @__PURE__ */ foldr(foldableArray);
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
          return fromJust2(deleteAt(i2)(v2));
        })(findIndex(v(v1))(v2));
      };
    };
  };
  var $$delete = function(dictEq) {
    return deleteBy(eq(dictEq));
  };
  var difference = function(dictEq) {
    return foldr2($$delete(dictEq));
  };
  var cons = function(x) {
    return function(xs) {
      return append2([x])(xs);
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
    return function(m3) {
      return n % m3;
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
  var top2 = /* @__PURE__ */ top(boundedInt);
  var bottom2 = /* @__PURE__ */ bottom(boundedInt);
  var fromNumber = /* @__PURE__ */ function() {
    return fromNumberImpl(Just.create)(Nothing.value);
  }();
  var unsafeClamp = function(x) {
    if (!isFiniteImpl(x)) {
      return 0;
    }
    ;
    if (x >= toNumber(top2)) {
      return top2;
    }
    ;
    if (x <= toNumber(bottom2)) {
      return bottom2;
    }
    ;
    if (otherwise) {
      return fromMaybe(0)(fromNumber(x));
    }
    ;
    throw new Error("Failed pattern match at Data.Int (line 72, column 1 - line 72, column 29): " + [x.constructor.name]);
  };
  var round2 = function($37) {
    return unsafeClamp(round($37));
  };
  var floor2 = function($39) {
    return unsafeClamp(floor($39));
  };

  // output/Data.FunctorWithIndex/foreign.js
  var mapWithIndexArray = function(f) {
    return function(xs) {
      var l = xs.length;
      var result = Array(l);
      for (var i2 = 0; i2 < l; i2++) {
        result[i2] = f(i2)(xs[i2]);
      }
      return result;
    };
  };

  // output/Data.FunctorWithIndex/index.js
  var mapWithIndex2 = function(dict) {
    return dict.mapWithIndex;
  };
  var functorWithIndexArray = {
    mapWithIndex: mapWithIndexArray,
    Functor0: function() {
      return functorArray;
    }
  };

  // output/Data.FoldableWithIndex/index.js
  var foldr8 = /* @__PURE__ */ foldr(foldableArray);
  var mapWithIndex3 = /* @__PURE__ */ mapWithIndex2(functorWithIndexArray);
  var foldl8 = /* @__PURE__ */ foldl(foldableArray);
  var foldrWithIndex = function(dict) {
    return dict.foldrWithIndex;
  };
  var traverseWithIndex_ = function(dictApplicative) {
    var applySecond3 = applySecond(dictApplicative.Apply0());
    var pure9 = pure(dictApplicative);
    return function(dictFoldableWithIndex) {
      var foldrWithIndex1 = foldrWithIndex(dictFoldableWithIndex);
      return function(f) {
        return foldrWithIndex1(function(i2) {
          var $287 = f(i2);
          return function($288) {
            return applySecond3($287($288));
          };
        })(pure9(unit));
      };
    };
  };
  var forWithIndex_ = function(dictApplicative) {
    var traverseWithIndex_1 = traverseWithIndex_(dictApplicative);
    return function(dictFoldableWithIndex) {
      return flip(traverseWithIndex_1(dictFoldableWithIndex));
    };
  };
  var foldlWithIndex = function(dict) {
    return dict.foldlWithIndex;
  };
  var foldMapWithIndexDefaultR = function(dictFoldableWithIndex) {
    var foldrWithIndex1 = foldrWithIndex(dictFoldableWithIndex);
    return function(dictMonoid) {
      var append7 = append(dictMonoid.Semigroup0());
      var mempty4 = mempty(dictMonoid);
      return function(f) {
        return foldrWithIndex1(function(i2) {
          return function(x) {
            return function(acc) {
              return append7(f(i2)(x))(acc);
            };
          };
        })(mempty4);
      };
    };
  };
  var foldableWithIndexArray = {
    foldrWithIndex: function(f) {
      return function(z) {
        var $289 = foldr8(function(v) {
          return function(y) {
            return f(v.value0)(v.value1)(y);
          };
        })(z);
        var $290 = mapWithIndex3(Tuple.create);
        return function($291) {
          return $289($290($291));
        };
      };
    },
    foldlWithIndex: function(f) {
      return function(z) {
        var $292 = foldl8(function(y) {
          return function(v) {
            return f(v.value0)(y)(v.value1);
          };
        })(z);
        var $293 = mapWithIndex3(Tuple.create);
        return function($294) {
          return $292($293($294));
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
        var $281 = foldl(foldableList)(flip(f))(b2);
        return function($282) {
          return $281(rev3($282));
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
      var append22 = append(dictMonoid.Semigroup0());
      var mempty4 = mempty(dictMonoid);
      return function(f) {
        return foldl(foldableList)(function(acc) {
          var $283 = append22(acc);
          return function($284) {
            return $283(f($284));
          };
        })(mempty4);
      };
    }
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
  var crashWith2 = /* @__PURE__ */ crashWith();
  var unsafePartial = _unsafePartial;
  var unsafeCrashWith = function(msg) {
    return unsafePartial(function() {
      return crashWith2(msg);
    });
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
  var singleton3 = function(k) {
    return function(v) {
      return new Two(Leaf.value, k, v, Leaf.value);
    };
  };
  var lookup = function(dictOrd) {
    var compare3 = compare(dictOrd);
    return function(k) {
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
            var v2 = compare3(k)(v.value1);
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
            var v3 = compare3(k)(v.value1);
            if (v3 instanceof EQ) {
              $tco_done = true;
              return new Just(v.value2);
            }
            ;
            var v4 = compare3(k)(v.value4);
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
        function $tco_loop(dictOrd, v, tree) {
          if (v instanceof Nil) {
            $tco_done = true;
            return tree;
          }
          ;
          if (v instanceof Cons) {
            if (v.value0 instanceof TwoLeft) {
              $tco_var_dictOrd = dictOrd;
              $tco_var_v = v.value1;
              $copy_tree = new Two(tree, v.value0.value0, v.value0.value1, v.value0.value2);
              return;
            }
            ;
            if (v.value0 instanceof TwoRight) {
              $tco_var_dictOrd = dictOrd;
              $tco_var_v = v.value1;
              $copy_tree = new Two(v.value0.value0, v.value0.value1, v.value0.value2, tree);
              return;
            }
            ;
            if (v.value0 instanceof ThreeLeft) {
              $tco_var_dictOrd = dictOrd;
              $tco_var_v = v.value1;
              $copy_tree = new Three(tree, v.value0.value0, v.value0.value1, v.value0.value2, v.value0.value3, v.value0.value4, v.value0.value5);
              return;
            }
            ;
            if (v.value0 instanceof ThreeMiddle) {
              $tco_var_dictOrd = dictOrd;
              $tco_var_v = v.value1;
              $copy_tree = new Three(v.value0.value0, v.value0.value1, v.value0.value2, tree, v.value0.value3, v.value0.value4, v.value0.value5);
              return;
            }
            ;
            if (v.value0 instanceof ThreeRight) {
              $tco_var_dictOrd = dictOrd;
              $tco_var_v = v.value1;
              $copy_tree = new Three(v.value0.value0, v.value0.value1, v.value0.value2, v.value0.value3, v.value0.value4, v.value0.value5, tree);
              return;
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 462, column 3 - line 467, column 88): " + [v.value0.constructor.name]);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 459, column 1 - line 459, column 80): " + [v.constructor.name, tree.constructor.name]);
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
  var insert = function(dictOrd) {
    var fromZipper1 = fromZipper(dictOrd);
    var compare3 = compare(dictOrd);
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
                  return fromZipper1(v1.value1)(new Three(v2.value0, v2.value1, v2.value2, v2.value3, v1.value0.value0, v1.value0.value1, v1.value0.value2));
                }
                ;
                if (v1.value0 instanceof TwoRight) {
                  $tco_done = true;
                  return fromZipper1(v1.value1)(new Three(v1.value0.value0, v1.value0.value1, v1.value0.value2, v2.value0, v2.value1, v2.value2, v2.value3));
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
                var v2 = compare3(k)(v1.value1);
                if (v2 instanceof EQ) {
                  $tco_done1 = true;
                  return fromZipper1(ctx)(new Two(v1.value0, k, v, v1.value3));
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
                var v3 = compare3(k)(v1.value1);
                if (v3 instanceof EQ) {
                  $tco_done1 = true;
                  return fromZipper1(ctx)(new Three(v1.value0, k, v, v1.value3, v1.value4, v1.value5, v1.value6));
                }
                ;
                var v4 = compare3(k)(v1.value4);
                if (v4 instanceof EQ) {
                  $tco_done1 = true;
                  return fromZipper1(ctx)(new Three(v1.value0, v1.value1, v1.value2, v1.value3, k, v, v1.value6));
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
    var fromZipper1 = fromZipper(dictOrd);
    var compare3 = compare(dictOrd);
    return function(k) {
      var up = function($copy_ctxs) {
        return function($copy_tree) {
          var $tco_var_ctxs = $copy_ctxs;
          var $tco_done = false;
          var $tco_result;
          function $tco_loop(ctxs, tree) {
            if (ctxs instanceof Nil) {
              $tco_done = true;
              return tree;
            }
            ;
            if (ctxs instanceof Cons) {
              if (ctxs.value0 instanceof TwoLeft && (ctxs.value0.value2 instanceof Leaf && tree instanceof Leaf)) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Two(Leaf.value, ctxs.value0.value0, ctxs.value0.value1, Leaf.value));
              }
              ;
              if (ctxs.value0 instanceof TwoRight && (ctxs.value0.value0 instanceof Leaf && tree instanceof Leaf)) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Two(Leaf.value, ctxs.value0.value1, ctxs.value0.value2, Leaf.value));
              }
              ;
              if (ctxs.value0 instanceof TwoLeft && ctxs.value0.value2 instanceof Two) {
                $tco_var_ctxs = ctxs.value1;
                $copy_tree = new Three(tree, ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2.value0, ctxs.value0.value2.value1, ctxs.value0.value2.value2, ctxs.value0.value2.value3);
                return;
              }
              ;
              if (ctxs.value0 instanceof TwoRight && ctxs.value0.value0 instanceof Two) {
                $tco_var_ctxs = ctxs.value1;
                $copy_tree = new Three(ctxs.value0.value0.value0, ctxs.value0.value0.value1, ctxs.value0.value0.value2, ctxs.value0.value0.value3, ctxs.value0.value1, ctxs.value0.value2, tree);
                return;
              }
              ;
              if (ctxs.value0 instanceof TwoLeft && ctxs.value0.value2 instanceof Three) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Two(new Two(tree, ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2.value0), ctxs.value0.value2.value1, ctxs.value0.value2.value2, new Two(ctxs.value0.value2.value3, ctxs.value0.value2.value4, ctxs.value0.value2.value5, ctxs.value0.value2.value6)));
              }
              ;
              if (ctxs.value0 instanceof TwoRight && ctxs.value0.value0 instanceof Three) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Two(new Two(ctxs.value0.value0.value0, ctxs.value0.value0.value1, ctxs.value0.value0.value2, ctxs.value0.value0.value3), ctxs.value0.value0.value4, ctxs.value0.value0.value5, new Two(ctxs.value0.value0.value6, ctxs.value0.value1, ctxs.value0.value2, tree)));
              }
              ;
              if (ctxs.value0 instanceof ThreeLeft && (ctxs.value0.value2 instanceof Leaf && (ctxs.value0.value5 instanceof Leaf && tree instanceof Leaf))) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Three(Leaf.value, ctxs.value0.value0, ctxs.value0.value1, Leaf.value, ctxs.value0.value3, ctxs.value0.value4, Leaf.value));
              }
              ;
              if (ctxs.value0 instanceof ThreeMiddle && (ctxs.value0.value0 instanceof Leaf && (ctxs.value0.value5 instanceof Leaf && tree instanceof Leaf))) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Three(Leaf.value, ctxs.value0.value1, ctxs.value0.value2, Leaf.value, ctxs.value0.value3, ctxs.value0.value4, Leaf.value));
              }
              ;
              if (ctxs.value0 instanceof ThreeRight && (ctxs.value0.value0 instanceof Leaf && (ctxs.value0.value3 instanceof Leaf && tree instanceof Leaf))) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Three(Leaf.value, ctxs.value0.value1, ctxs.value0.value2, Leaf.value, ctxs.value0.value4, ctxs.value0.value5, Leaf.value));
              }
              ;
              if (ctxs.value0 instanceof ThreeLeft && ctxs.value0.value2 instanceof Two) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Two(new Three(tree, ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2.value0, ctxs.value0.value2.value1, ctxs.value0.value2.value2, ctxs.value0.value2.value3), ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5));
              }
              ;
              if (ctxs.value0 instanceof ThreeMiddle && ctxs.value0.value0 instanceof Two) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Two(new Three(ctxs.value0.value0.value0, ctxs.value0.value0.value1, ctxs.value0.value0.value2, ctxs.value0.value0.value3, ctxs.value0.value1, ctxs.value0.value2, tree), ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5));
              }
              ;
              if (ctxs.value0 instanceof ThreeMiddle && ctxs.value0.value5 instanceof Two) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Two(ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2, new Three(tree, ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5.value0, ctxs.value0.value5.value1, ctxs.value0.value5.value2, ctxs.value0.value5.value3)));
              }
              ;
              if (ctxs.value0 instanceof ThreeRight && ctxs.value0.value3 instanceof Two) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Two(ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2, new Three(ctxs.value0.value3.value0, ctxs.value0.value3.value1, ctxs.value0.value3.value2, ctxs.value0.value3.value3, ctxs.value0.value4, ctxs.value0.value5, tree)));
              }
              ;
              if (ctxs.value0 instanceof ThreeLeft && ctxs.value0.value2 instanceof Three) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Three(new Two(tree, ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2.value0), ctxs.value0.value2.value1, ctxs.value0.value2.value2, new Two(ctxs.value0.value2.value3, ctxs.value0.value2.value4, ctxs.value0.value2.value5, ctxs.value0.value2.value6), ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5));
              }
              ;
              if (ctxs.value0 instanceof ThreeMiddle && ctxs.value0.value0 instanceof Three) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Three(new Two(ctxs.value0.value0.value0, ctxs.value0.value0.value1, ctxs.value0.value0.value2, ctxs.value0.value0.value3), ctxs.value0.value0.value4, ctxs.value0.value0.value5, new Two(ctxs.value0.value0.value6, ctxs.value0.value1, ctxs.value0.value2, tree), ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5));
              }
              ;
              if (ctxs.value0 instanceof ThreeMiddle && ctxs.value0.value5 instanceof Three) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Three(ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2, new Two(tree, ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5.value0), ctxs.value0.value5.value1, ctxs.value0.value5.value2, new Two(ctxs.value0.value5.value3, ctxs.value0.value5.value4, ctxs.value0.value5.value5, ctxs.value0.value5.value6)));
              }
              ;
              if (ctxs.value0 instanceof ThreeRight && ctxs.value0.value3 instanceof Three) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Three(ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2, new Two(ctxs.value0.value3.value0, ctxs.value0.value3.value1, ctxs.value0.value3.value2, ctxs.value0.value3.value3), ctxs.value0.value3.value4, ctxs.value0.value3.value5, new Two(ctxs.value0.value3.value6, ctxs.value0.value4, ctxs.value0.value5, tree)));
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
          function $tco_loop(ctx, m3) {
            if (m3 instanceof Two && (m3.value0 instanceof Leaf && m3.value3 instanceof Leaf)) {
              $tco_done1 = true;
              return up(ctx)(Leaf.value);
            }
            ;
            if (m3 instanceof Two) {
              $tco_var_ctx = new Cons(new TwoRight(m3.value0, m3.value1, m3.value2), ctx);
              $copy_m = m3.value3;
              return;
            }
            ;
            if (m3 instanceof Three && (m3.value0 instanceof Leaf && (m3.value3 instanceof Leaf && m3.value6 instanceof Leaf))) {
              $tco_done1 = true;
              return up(new Cons(new TwoRight(Leaf.value, m3.value1, m3.value2), ctx))(Leaf.value);
            }
            ;
            if (m3 instanceof Three) {
              $tco_var_ctx = new Cons(new ThreeRight(m3.value0, m3.value1, m3.value2, m3.value3, m3.value4, m3.value5), ctx);
              $copy_m = m3.value6;
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
        function $tco_loop(m3) {
          if (m3 instanceof Two && m3.value3 instanceof Leaf) {
            $tco_done2 = true;
            return {
              key: m3.value1,
              value: m3.value2
            };
          }
          ;
          if (m3 instanceof Two) {
            $copy_m = m3.value3;
            return;
          }
          ;
          if (m3 instanceof Three && m3.value6 instanceof Leaf) {
            $tco_done2 = true;
            return {
              key: m3.value4,
              value: m3.value5
            };
          }
          ;
          if (m3 instanceof Three) {
            $copy_m = m3.value6;
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
      var down = function($copy_ctx) {
        return function($copy_m) {
          var $tco_var_ctx = $copy_ctx;
          var $tco_done3 = false;
          var $tco_result;
          function $tco_loop(ctx, m3) {
            if (m3 instanceof Leaf) {
              $tco_done3 = true;
              return Nothing.value;
            }
            ;
            if (m3 instanceof Two) {
              var v = compare3(k)(m3.value1);
              if (m3.value3 instanceof Leaf && v instanceof EQ) {
                $tco_done3 = true;
                return new Just(new Tuple(m3.value2, up(ctx)(Leaf.value)));
              }
              ;
              if (v instanceof EQ) {
                var max6 = maxNode(m3.value0);
                $tco_done3 = true;
                return new Just(new Tuple(m3.value2, removeMaxNode(new Cons(new TwoLeft(max6.key, max6.value, m3.value3), ctx))(m3.value0)));
              }
              ;
              if (v instanceof LT) {
                $tco_var_ctx = new Cons(new TwoLeft(m3.value1, m3.value2, m3.value3), ctx);
                $copy_m = m3.value0;
                return;
              }
              ;
              $tco_var_ctx = new Cons(new TwoRight(m3.value0, m3.value1, m3.value2), ctx);
              $copy_m = m3.value3;
              return;
            }
            ;
            if (m3 instanceof Three) {
              var leaves = function() {
                if (m3.value0 instanceof Leaf && (m3.value3 instanceof Leaf && m3.value6 instanceof Leaf)) {
                  return true;
                }
                ;
                return false;
              }();
              var v = compare3(k)(m3.value4);
              var v3 = compare3(k)(m3.value1);
              if (leaves && v3 instanceof EQ) {
                $tco_done3 = true;
                return new Just(new Tuple(m3.value2, fromZipper1(ctx)(new Two(Leaf.value, m3.value4, m3.value5, Leaf.value))));
              }
              ;
              if (leaves && v instanceof EQ) {
                $tco_done3 = true;
                return new Just(new Tuple(m3.value5, fromZipper1(ctx)(new Two(Leaf.value, m3.value1, m3.value2, Leaf.value))));
              }
              ;
              if (v3 instanceof EQ) {
                var max6 = maxNode(m3.value0);
                $tco_done3 = true;
                return new Just(new Tuple(m3.value2, removeMaxNode(new Cons(new ThreeLeft(max6.key, max6.value, m3.value3, m3.value4, m3.value5, m3.value6), ctx))(m3.value0)));
              }
              ;
              if (v instanceof EQ) {
                var max6 = maxNode(m3.value3);
                $tco_done3 = true;
                return new Just(new Tuple(m3.value5, removeMaxNode(new Cons(new ThreeMiddle(m3.value0, m3.value1, m3.value2, max6.key, max6.value, m3.value6), ctx))(m3.value3)));
              }
              ;
              if (v3 instanceof LT) {
                $tco_var_ctx = new Cons(new ThreeLeft(m3.value1, m3.value2, m3.value3, m3.value4, m3.value5, m3.value6), ctx);
                $copy_m = m3.value0;
                return;
              }
              ;
              if (v3 instanceof GT && v instanceof LT) {
                $tco_var_ctx = new Cons(new ThreeMiddle(m3.value0, m3.value1, m3.value2, m3.value4, m3.value5, m3.value6), ctx);
                $copy_m = m3.value3;
                return;
              }
              ;
              $tco_var_ctx = new Cons(new ThreeRight(m3.value0, m3.value1, m3.value2, m3.value3, m3.value4, m3.value5), ctx);
              $copy_m = m3.value6;
              return;
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 525, column 16 - line 548, column 80): " + [m3.constructor.name]);
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
        return function(m3) {
          if (m3 instanceof Leaf) {
            return z;
          }
          ;
          if (m3 instanceof Two) {
            return foldr(foldableMap)(f)(f(m3.value2)(foldr(foldableMap)(f)(z)(m3.value3)))(m3.value0);
          }
          ;
          if (m3 instanceof Three) {
            return foldr(foldableMap)(f)(f(m3.value2)(foldr(foldableMap)(f)(f(m3.value5)(foldr(foldableMap)(f)(z)(m3.value6)))(m3.value3)))(m3.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 133, column 17 - line 136, column 85): " + [m3.constructor.name]);
        };
      };
    },
    foldl: function(f) {
      return function(z) {
        return function(m3) {
          if (m3 instanceof Leaf) {
            return z;
          }
          ;
          if (m3 instanceof Two) {
            return foldl(foldableMap)(f)(f(foldl(foldableMap)(f)(z)(m3.value0))(m3.value2))(m3.value3);
          }
          ;
          if (m3 instanceof Three) {
            return foldl(foldableMap)(f)(f(foldl(foldableMap)(f)(f(foldl(foldableMap)(f)(z)(m3.value0))(m3.value2))(m3.value3))(m3.value5))(m3.value6);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 137, column 17 - line 140, column 85): " + [m3.constructor.name]);
        };
      };
    },
    foldMap: function(dictMonoid) {
      var mempty4 = mempty(dictMonoid);
      var append22 = append(dictMonoid.Semigroup0());
      return function(f) {
        return function(m3) {
          if (m3 instanceof Leaf) {
            return mempty4;
          }
          ;
          if (m3 instanceof Two) {
            return append22(foldMap(foldableMap)(dictMonoid)(f)(m3.value0))(append22(f(m3.value2))(foldMap(foldableMap)(dictMonoid)(f)(m3.value3)));
          }
          ;
          if (m3 instanceof Three) {
            return append22(foldMap(foldableMap)(dictMonoid)(f)(m3.value0))(append22(f(m3.value2))(append22(foldMap(foldableMap)(dictMonoid)(f)(m3.value3))(append22(f(m3.value5))(foldMap(foldableMap)(dictMonoid)(f)(m3.value6)))));
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 141, column 17 - line 144, column 93): " + [m3.constructor.name]);
        };
      };
    }
  };
  var foldableWithIndexMap = {
    foldrWithIndex: function(f) {
      return function(z) {
        return function(m3) {
          if (m3 instanceof Leaf) {
            return z;
          }
          ;
          if (m3 instanceof Two) {
            return foldrWithIndex(foldableWithIndexMap)(f)(f(m3.value1)(m3.value2)(foldrWithIndex(foldableWithIndexMap)(f)(z)(m3.value3)))(m3.value0);
          }
          ;
          if (m3 instanceof Three) {
            return foldrWithIndex(foldableWithIndexMap)(f)(f(m3.value1)(m3.value2)(foldrWithIndex(foldableWithIndexMap)(f)(f(m3.value4)(m3.value5)(foldrWithIndex(foldableWithIndexMap)(f)(z)(m3.value6)))(m3.value3)))(m3.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 147, column 26 - line 150, column 120): " + [m3.constructor.name]);
        };
      };
    },
    foldlWithIndex: function(f) {
      return function(z) {
        return function(m3) {
          if (m3 instanceof Leaf) {
            return z;
          }
          ;
          if (m3 instanceof Two) {
            return foldlWithIndex(foldableWithIndexMap)(f)(f(m3.value1)(foldlWithIndex(foldableWithIndexMap)(f)(z)(m3.value0))(m3.value2))(m3.value3);
          }
          ;
          if (m3 instanceof Three) {
            return foldlWithIndex(foldableWithIndexMap)(f)(f(m3.value4)(foldlWithIndex(foldableWithIndexMap)(f)(f(m3.value1)(foldlWithIndex(foldableWithIndexMap)(f)(z)(m3.value0))(m3.value2))(m3.value3))(m3.value5))(m3.value6);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 151, column 26 - line 154, column 120): " + [m3.constructor.name]);
        };
      };
    },
    foldMapWithIndex: function(dictMonoid) {
      var mempty4 = mempty(dictMonoid);
      var append22 = append(dictMonoid.Semigroup0());
      return function(f) {
        return function(m3) {
          if (m3 instanceof Leaf) {
            return mempty4;
          }
          ;
          if (m3 instanceof Two) {
            return append22(foldMapWithIndex(foldableWithIndexMap)(dictMonoid)(f)(m3.value0))(append22(f(m3.value1)(m3.value2))(foldMapWithIndex(foldableWithIndexMap)(dictMonoid)(f)(m3.value3)));
          }
          ;
          if (m3 instanceof Three) {
            return append22(foldMapWithIndex(foldableWithIndexMap)(dictMonoid)(f)(m3.value0))(append22(f(m3.value1)(m3.value2))(append22(foldMapWithIndex(foldableWithIndexMap)(dictMonoid)(f)(m3.value3))(append22(f(m3.value4)(m3.value5))(foldMapWithIndex(foldableWithIndexMap)(dictMonoid)(f)(m3.value6)))));
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 155, column 26 - line 158, column 128): " + [m3.constructor.name]);
        };
      };
    },
    Foldable0: function() {
      return foldableMap;
    }
  };
  var foldrWithIndex2 = /* @__PURE__ */ foldrWithIndex(foldableWithIndexMap);
  var foldlWithIndex2 = /* @__PURE__ */ foldlWithIndex(foldableWithIndexMap);
  var keys = /* @__PURE__ */ function() {
    return foldrWithIndex2(function(k) {
      return function(v) {
        return function(acc) {
          return new Cons(k, acc);
        };
      };
    })(Nil.value);
  }();
  var empty2 = /* @__PURE__ */ function() {
    return Leaf.value;
  }();
  var $$delete2 = function(dictOrd) {
    var pop1 = pop(dictOrd);
    return function(k) {
      return function(m3) {
        return maybe(m3)(snd)(pop1(k)(m3));
      };
    };
  };
  var alter = function(dictOrd) {
    var lookup1 = lookup(dictOrd);
    var delete1 = $$delete2(dictOrd);
    var insert1 = insert(dictOrd);
    return function(f) {
      return function(k) {
        return function(m3) {
          var v = f(lookup1(k)(m3));
          if (v instanceof Nothing) {
            return delete1(k)(m3);
          }
          ;
          if (v instanceof Just) {
            return insert1(k)(v.value0)(m3);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 596, column 15 - line 598, column 25): " + [v.constructor.name]);
        };
      };
    };
  };
  var unionWith = function(dictOrd) {
    var alter1 = alter(dictOrd);
    return function(f) {
      return function(m1) {
        return function(m22) {
          var go2 = function(k) {
            return function(m3) {
              return function(v) {
                return alter1(function() {
                  var $932 = maybe(v)(f(v));
                  return function($933) {
                    return Just.create($932($933));
                  };
                }())(k)(m3);
              };
            };
          };
          return foldlWithIndex2(go2)(m22)(m1);
        };
      };
    };
  };
  var union = function(dictOrd) {
    return unionWith(dictOrd)($$const);
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
    var gcd2 = gcd(dictOrd.Eq0());
    var signum2 = signum(dictOrd);
    var abs5 = abs(dictOrd);
    return function(dictEuclideanRing) {
      var gcd1 = gcd2(dictEuclideanRing);
      var div5 = div(dictEuclideanRing);
      var Ring0 = dictEuclideanRing.CommutativeRing0().Ring0();
      var mul3 = mul(Ring0.Semiring0());
      var signum1 = signum2(Ring0);
      var abs1 = abs5(Ring0);
      return function(n) {
        return function(d) {
          var g = gcd1(n)(d);
          var d$prime = div5(d)(g);
          return new Ratio(mul3(div5(n)(g))(signum1(d$prime)), abs1(d$prime));
        };
      };
    };
  };
  var semiringRatio = function(dictOrd) {
    var reduce1 = reduce(dictOrd);
    return function(dictEuclideanRing) {
      var Semiring0 = dictEuclideanRing.CommutativeRing0().Ring0().Semiring0();
      var one2 = one(Semiring0);
      var reduce22 = reduce1(dictEuclideanRing);
      var mul3 = mul(Semiring0);
      var add4 = add(Semiring0);
      return {
        one: new Ratio(one2, one2),
        mul: function(v) {
          return function(v1) {
            return reduce22(mul3(v.value0)(v1.value0))(mul3(v.value1)(v1.value1));
          };
        },
        zero: new Ratio(zero(Semiring0), one2),
        add: function(v) {
          return function(v1) {
            return reduce22(add4(mul3(v.value0)(v1.value1))(mul3(v.value1)(v1.value0)))(mul3(v.value1)(v1.value1));
          };
        }
      };
    };
  };
  var ringRatio = function(dictOrd) {
    var reduce1 = reduce(dictOrd);
    var semiringRatio1 = semiringRatio(dictOrd);
    return function(dictEuclideanRing) {
      var reduce22 = reduce1(dictEuclideanRing);
      var Ring0 = dictEuclideanRing.CommutativeRing0().Ring0();
      var sub3 = sub(Ring0);
      var mul3 = mul(Ring0.Semiring0());
      var semiringRatio2 = semiringRatio1(dictEuclideanRing);
      return {
        sub: function(v) {
          return function(v1) {
            return reduce22(sub3(mul3(v.value0)(v1.value1))(mul3(v.value1)(v1.value0)))(mul3(v.value1)(v1.value1));
          };
        },
        Semiring0: function() {
          return semiringRatio2;
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
    var ringRatio1 = ringRatio(dictOrd);
    return function(dictEuclideanRing) {
      var ringRatio2 = ringRatio1(dictEuclideanRing);
      return {
        Ring0: function() {
          return ringRatio2;
        }
      };
    };
  };
  var euclideanRingRatio = function(dictOrd) {
    var reduce1 = reduce(dictOrd);
    var semiringRatio1 = semiringRatio(dictOrd);
    var commutativeRingRatio1 = commutativeRingRatio(dictOrd);
    return function(dictEuclideanRing) {
      var reduce22 = reduce1(dictEuclideanRing);
      var mul3 = mul(dictEuclideanRing.CommutativeRing0().Ring0().Semiring0());
      var zero2 = zero(semiringRatio1(dictEuclideanRing));
      var commutativeRingRatio2 = commutativeRingRatio1(dictEuclideanRing);
      return {
        degree: function(v) {
          return 1;
        },
        div: function(v) {
          return function(v1) {
            return reduce22(mul3(v.value0)(v1.value1))(mul3(v.value1)(v1.value0));
          };
        },
        mod: function(v) {
          return function(v1) {
            return zero2;
          };
        },
        CommutativeRing0: function() {
          return commutativeRingRatio2;
        }
      };
    };
  };

  // output/FRP.Event/foreign.js
  var fastForeachE = (as, f) => {
    for (var i2 = 0, l = as.length; i2 < l; i2++) {
      f(as[i2]);
    }
  };
  var fastForeachOhE = (o, f) => {
    for (const a2 in o) {
      f(o[a2]);
    }
  };
  var objHack = () => ({});
  var insertObjHack = (k, v, o) => {
    o[k] = v;
  };
  var deleteObjHack = (k, o) => {
    delete o[k];
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

  // output/Control.Monad.ST.Uncurried/foreign.js
  var mkSTFn1 = function mkSTFn12(fn) {
    return function(x) {
      return fn(x)();
    };
  };
  var mkSTFn2 = function mkSTFn22(fn) {
    return function(a2, b2) {
      return fn(a2)(b2)();
    };
  };
  var runSTFn1 = function runSTFn12(fn) {
    return function(a2) {
      return function() {
        return fn(a2);
      };
    };
  };
  var runSTFn2 = function runSTFn22(fn) {
    return function(a2) {
      return function(b2) {
        return function() {
          return fn(a2, b2);
        };
      };
    };
  };

  // output/Data.Filterable/index.js
  var filterMap = function(dict) {
    return dict.filterMap;
  };

  // output/Data.Set/index.js
  var foldMap2 = /* @__PURE__ */ foldMap(foldableList);
  var foldl2 = /* @__PURE__ */ foldl(foldableList);
  var foldr3 = /* @__PURE__ */ foldr(foldableList);
  var union2 = function(dictOrd) {
    var union1 = union(dictOrd);
    return function(v) {
      return function(v1) {
        return union1(v)(v1);
      };
    };
  };
  var toList = function(v) {
    return keys(v);
  };
  var singleton4 = function(a2) {
    return singleton3(a2)(unit);
  };
  var semigroupSet = function(dictOrd) {
    return {
      append: union2(dictOrd)
    };
  };
  var foldableSet = {
    foldMap: function(dictMonoid) {
      var foldMap12 = foldMap2(dictMonoid);
      return function(f) {
        var $129 = foldMap12(f);
        return function($130) {
          return $129(toList($130));
        };
      };
    },
    foldl: function(f) {
      return function(x) {
        var $131 = foldl2(f)(x);
        return function($132) {
          return $131(toList($132));
        };
      };
    },
    foldr: function(f) {
      return function(x) {
        var $133 = foldr3(f)(x);
        return function($134) {
          return $133(toList($134));
        };
      };
    }
  };
  var empty3 = empty2;
  var monoidSet = function(dictOrd) {
    var semigroupSet1 = semigroupSet(dictOrd);
    return {
      mempty: empty3,
      Semigroup0: function() {
        return semigroupSet1;
      }
    };
  };
  var $$delete3 = function(dictOrd) {
    var delete1 = $$delete2(dictOrd);
    return function(a2) {
      return function(v) {
        return delete1(a2)(v);
      };
    };
  };

  // output/Effect.Timer/foreign.js
  function setTimeoutImpl(ms) {
    return function(fn) {
      return function() {
        return setTimeout(fn, ms);
      };
    };
  }
  function clearTimeoutImpl(id) {
    return function() {
      clearTimeout(id);
    };
  }

  // output/Effect.Timer/index.js
  var compare2 = /* @__PURE__ */ compare(ordInt);
  var setTimeout2 = setTimeoutImpl;
  var eqTimeoutId = {
    eq: function(x) {
      return function(y) {
        return x === y;
      };
    }
  };
  var ordTimeoutId = {
    compare: function(x) {
      return function(y) {
        return compare2(x)(y);
      };
    },
    Eq0: function() {
      return eqTimeoutId;
    }
  };
  var clearTimeout2 = clearTimeoutImpl;

  // output/Effect.Uncurried/foreign.js
  var mkEffectFn1 = function mkEffectFn12(fn) {
    return function(x) {
      return fn(x)();
    };
  };
  var runEffectFn1 = function runEffectFn12(fn) {
    return function(a2) {
      return function() {
        return fn(a2);
      };
    };
  };

  // output/Effect.Uncurried/index.js
  var semigroupEffectFn1 = function(dictSemigroup) {
    var append7 = append(semigroupEffect(dictSemigroup));
    return {
      append: function(f1) {
        return function(f2) {
          return mkEffectFn1(function(a2) {
            return append7(runEffectFn1(f1)(a2))(runEffectFn1(f2)(a2));
          });
        };
      }
    };
  };
  var monoidEffectFn1 = function(dictMonoid) {
    var mempty4 = mempty(monoidEffect(dictMonoid));
    var semigroupEffectFn11 = semigroupEffectFn1(dictMonoid.Semigroup0());
    return {
      mempty: mkEffectFn1(function(v) {
        return mempty4;
      }),
      Semigroup0: function() {
        return semigroupEffectFn11;
      }
    };
  };

  // output/FRP.Event.Class/index.js
  var sampleOnRight = function(dict) {
    return dict.sampleOnRight;
  };
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
  var $runtime_lazy3 = function(name15, moduleName, init2) {
    var state4 = 0;
    var val;
    return function(lineNumber) {
      if (state4 === 2)
        return val;
      if (state4 === 1)
        throw new ReferenceError(name15 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state4 = 1;
      val = init2();
      state4 = 2;
      return val;
    };
  };
  var for_2 = /* @__PURE__ */ for_(applicativeEffect);
  var for_1 = /* @__PURE__ */ for_2(foldableMaybe);
  var pure2 = /* @__PURE__ */ pure(applicativeEffect);
  var mempty2 = /* @__PURE__ */ mempty(/* @__PURE__ */ monoidEffectFn1(monoidUnit));
  var liftST2 = /* @__PURE__ */ liftST(monadSTEffect);
  var $$void3 = /* @__PURE__ */ $$void(functorEffect);
  var append3 = /* @__PURE__ */ append(semigroupArray);
  var mempty1 = /* @__PURE__ */ mempty(/* @__PURE__ */ monoidSet(ordTimeoutId));
  var $$delete4 = /* @__PURE__ */ $$delete3(ordTimeoutId);
  var append1 = /* @__PURE__ */ append(/* @__PURE__ */ semigroupSet(ordTimeoutId));
  var for_22 = /* @__PURE__ */ for_2(foldableSet);
  var apply2 = /* @__PURE__ */ apply(applyEffect);
  var map3 = /* @__PURE__ */ map(functorEffect);
  var sampleOnRight2 = function(v) {
    return function(v1) {
      return function(b2, k) {
        var latest = $$new(Nothing.value)();
        var c1 = v(b2, function(a2) {
          return write(new Just(a2))(latest)();
        });
        var c2 = v1(b2, function(f) {
          var o = read(latest)();
          return for_1(o)(function(a2) {
            return function() {
              return k(f(a2));
            };
          })();
        });
        return function __do3() {
          c1();
          return c2();
        };
      };
    };
  };
  var sampleOnLeft = function(v) {
    return function(v1) {
      return function(b2, k) {
        var latest = $$new(Nothing.value)();
        var c1 = v(b2, function(a2) {
          var o = read(latest)();
          return for_1(o)(function(f) {
            return function() {
              return k(f(a2));
            };
          })();
        });
        var c2 = v1(b2, function(f) {
          return write(new Just(f))(latest)();
        });
        return function __do3() {
          c1();
          return c2();
        };
      };
    };
  };
  var keepLatest2 = function(v) {
    return function(tf, k) {
      var cancelInner = $$new(pure2(unit))();
      var cancelOuter = v(tf, function(v1) {
        var ci = read(cancelInner)();
        ci();
        var c = v1(tf, k);
        return write(c)(cancelInner)();
      });
      return function __do3() {
        var ci = read(cancelInner)();
        ci();
        return cancelOuter();
      };
    };
  };
  var functorEvent = {
    map: function(f) {
      return function(v) {
        return function(b2, k) {
          return v(b2, function(a2) {
            return k(f(a2));
          });
        };
      };
    }
  };
  var map1 = /* @__PURE__ */ map(functorEvent);
  var filter5 = function(p2) {
    return function(v) {
      return function(tf, k) {
        return v(tf, function(a2) {
          var v1 = p2(a2);
          if (v1 instanceof Just) {
            return k(v1.value0);
          }
          ;
          if (v1 instanceof Nothing) {
            return unit;
          }
          ;
          throw new Error("Failed pattern match at FRP.Event (line 201, column 31 - line 203, column 35): " + [v1.constructor.name]);
        });
      };
    };
  };
  var filter$prime = function(f) {
    return filter5(function(a2) {
      var v = f(a2);
      if (v) {
        return new Just(a2);
      }
      ;
      if (!v) {
        return Nothing.value;
      }
      ;
      throw new Error("Failed pattern match at FRP.Event (line 129, column 13 - line 131, column 25): " + [v.constructor.name]);
    });
  };
  var create$prime = function __do() {
    var subscribers = objHack();
    var idx = $$new(0)();
    return {
      event: function(v, k) {
        var rk = $$new(k)();
        var ix = read(idx)();
        insertObjHack(ix, rk, subscribers);
        modify_(function(v1) {
          return v1 + 1 | 0;
        })(idx)();
        return function __do3() {
          write(mempty2)(rk)();
          deleteObjHack(ix, subscribers);
          return unit;
        };
      },
      push: function(a2) {
        return fastForeachOhE(subscribers, function(rk) {
          var k = read(rk)();
          return k(a2);
        });
      }
    };
  };
  var fix3 = function(f) {
    return function(tf, k) {
      var v = create$prime();
      var v1 = f(v.event);
      var c2 = v.event(tf, k);
      var c1 = v1(tf, v.push);
      return function __do3() {
        c1();
        return c2();
      };
    };
  };
  var compactableEvent = {
    compact: /* @__PURE__ */ filter5(/* @__PURE__ */ identity(categoryFn)),
    separate: function(xs) {
      return {
        left: filter5(function(v) {
          if (v instanceof Left) {
            return new Just(v.value0);
          }
          ;
          if (v instanceof Right) {
            return Nothing.value;
          }
          ;
          throw new Error("Failed pattern match at FRP.Event (line 112, column 13 - line 114, column 33): " + [v.constructor.name]);
        })(xs),
        right: filter5(function(v) {
          if (v instanceof Right) {
            return new Just(v.value0);
          }
          ;
          if (v instanceof Left) {
            return Nothing.value;
          }
          ;
          throw new Error("Failed pattern match at FRP.Event (line 119, column 13 - line 121, column 32): " + [v.constructor.name]);
        })(xs)
      };
    }
  };
  var filterableEvent = {
    filter: filter$prime,
    filterMap: filter5,
    partition: function(p2) {
      return function(xs) {
        return {
          yes: filter$prime(p2)(xs),
          no: filter$prime(function($206) {
            return !p2($206);
          })(xs)
        };
      };
    },
    partitionMap: function(f) {
      return function(xs) {
        return {
          left: filterMap(filterableEvent)(function() {
            var $207 = either(Just.create)($$const(Nothing.value));
            return function($208) {
              return $207(f($208));
            };
          }())(xs),
          right: filterMap(filterableEvent)(function($209) {
            return hush(f($209));
          })(xs)
        };
      };
    },
    Compactable0: function() {
      return compactableEvent;
    },
    Functor1: function() {
      return functorEvent;
    }
  };
  var biSampleOn = function(v) {
    return function(v1) {
      return function(tf, k) {
        var latest1 = $$new(Nothing.value)();
        var replay1 = liftST2(newSTArray)();
        var latest2 = $$new(Nothing.value)();
        var replay2 = liftST2(newSTArray)();
        var capturing = $$new(true)();
        var c1 = v(tf, function(a2) {
          var o = read(capturing)();
          if (o) {
            return $$void3(liftST2(push(a2)(replay1)))();
          }
          ;
          write(new Just(a2))(latest1)();
          var res = read(latest2)();
          return for_1(res)(function(f) {
            return function() {
              return k(f(a2));
            };
          })();
        });
        var c2 = v1(tf, function(f) {
          var o = read(capturing)();
          if (o) {
            return $$void3(liftST2(push(f)(replay2)))();
          }
          ;
          write(new Just(f))(latest2)();
          var res = read(latest1)();
          return for_1(res)(function(a2) {
            return function() {
              return k(f(a2));
            };
          })();
        });
        write(false)(capturing)();
        var samples1 = liftST2(freeze(replay1))();
        var samples2 = liftST2(freeze(replay2))();
        (function() {
          if (samples1.length === 0) {
            return write(last(samples2))(latest2)();
          }
          ;
          return fastForeachE(samples1, function(a2) {
            write(new Just(a2))(latest1)();
            return fastForeachE(samples2, function(f) {
              write(new Just(f))(latest2)();
              return k(f(a2));
            });
          });
        })();
        liftST2(splice(0)(length(samples1))([])(replay1))();
        liftST2(splice(0)(length(samples2))([])(replay2))();
        return function __do3() {
          c1();
          return c2();
        };
      };
    };
  };
  var subscribe = function(i2) {
    return function(v) {
      return v;
    }($lazy_backdoor(321).subscribe)(i2);
  };
  var $lazy_backdoor = /* @__PURE__ */ $runtime_lazy3("backdoor", "FRP.Event", function() {
    var create_ = function __do3() {
      var subscribers = objHack();
      var idx = $$new(0)();
      return {
        event: function(v, k) {
          var rk = $$new(k)();
          var ix = read(idx)();
          insertObjHack(ix, rk, subscribers);
          modify_(function(v1) {
            return v1 + 1 | 0;
          })(idx)();
          return function __do4() {
            write(mempty2)(rk)();
            deleteObjHack(ix, subscribers);
            return unit;
          };
        },
        push: function(a2) {
          return function() {
            return fastForeachOhE(subscribers, function(rk) {
              var k = read(rk)();
              return k(a2);
            });
          };
        }
      };
    };
    return {
      makeEvent: function() {
        var makeEvent_ = function(e) {
          return function(tf, k) {
            if (tf) {
              return pure2(unit);
            }
            ;
            return e(function(a2) {
              return function() {
                return k(a2);
              };
            })();
          };
        };
        return makeEvent_;
      }(),
      makeEventO: function() {
        var makeEventO_ = function(e) {
          return function(tf, k) {
            if (tf) {
              return pure2(unit);
            }
            ;
            return e(k);
          };
        };
        return makeEventO_;
      }(),
      makePureEvent: function() {
        var makePureEvent_ = function(e) {
          return function(v, k) {
            return e(function(a2) {
              return function() {
                return k(a2);
              };
            })();
          };
        };
        return makePureEvent_;
      }(),
      makeLemmingEvent: function() {
        var makeLemmingEvent_ = function(e) {
          return function(tf, k) {
            var o = function(v) {
              return function(kx) {
                return function() {
                  return v(tf, mkEffectFn1(kx));
                };
              };
            };
            return e(o)(function(a2) {
              return function() {
                return k(a2);
              };
            })();
          };
        };
        return makeLemmingEvent_;
      }(),
      makeLemmingEventO: function() {
        var makeLemmingEventO_ = function(e) {
          return function(tf, k) {
            var o = mkSTFn2(function(v) {
              return function(kx) {
                return function() {
                  return v(tf, kx);
                };
              };
            });
            return e(o, k);
          };
        };
        return makeLemmingEventO_;
      }(),
      create: create_,
      createPure: create_,
      subscribe: function() {
        var subscribe_ = function(v) {
          return function(k) {
            return function() {
              return v(false, mkEffectFn1(k));
            };
          };
        };
        return subscribe_;
      }(),
      subscribeO: function() {
        var subscribeO_ = function(v, k) {
          return v(false, k);
        };
        return subscribeO_;
      }(),
      subscribePureO: function() {
        var subscribePureO_ = mkSTFn2(function(v) {
          return function(k) {
            return function() {
              return v(true, k);
            };
          };
        });
        return subscribePureO_;
      }(),
      subscribePure: function() {
        var subscribePure_ = function() {
          var o = function(v) {
            return function(k) {
              return function() {
                return v(true, mkEffectFn1(k));
              };
            };
          };
          return o;
        }();
        return subscribePure_;
      }(),
      bus: function() {
        var bus_ = function(f) {
          return function(v, k) {
            var v1 = $lazy_create(722)();
            k(f(v1.push)(v1.event));
            return pure2(unit);
          };
        };
        return bus_;
      }(),
      memoize: function() {
        var memoize_ = function(v) {
          return function(f) {
            return function(b2, k) {
              var v1 = create$prime();
              k(f(v1.event));
              return v(b2, v1.push);
            };
          };
        };
        return memoize_;
      }(),
      hot: function() {
        var hot_ = function(e) {
          return function __do3() {
            var v = $lazy_create(740)();
            var unsubscribe = subscribe(e)(v.push)();
            return {
              event: v.event,
              unsubscribe
            };
          };
        };
        return hot_;
      }(),
      mailboxed: function() {
        var mailboxed_ = function(dictOrd) {
          var alter2 = alter(dictOrd);
          var lookup2 = lookup(dictOrd);
          return function(v) {
            return function(f) {
              return function(tf, k1) {
                var r = $$new(empty2)();
                k1(f(function(a2) {
                  return function(v1, k2) {
                    $$void3(modify2(alter2(function(v2) {
                      if (v2 instanceof Nothing) {
                        return new Just([k2]);
                      }
                      ;
                      if (v2 instanceof Just) {
                        return new Just(append3(v2.value0)([k2]));
                      }
                      ;
                      throw new Error("Failed pattern match at FRP.Event (line 753, column 21 - line 755, column 55): " + [v2.constructor.name]);
                    })(a2))(r))();
                    return $$void3(modify2(alter2(function(v2) {
                      if (v2 instanceof Nothing) {
                        return Nothing.value;
                      }
                      ;
                      if (v2 instanceof Just) {
                        return new Just(deleteBy(unsafeRefEq)(k2)(v2.value0));
                      }
                      ;
                      throw new Error("Failed pattern match at FRP.Event (line 762, column 21 - line 764, column 69): " + [v2.constructor.name]);
                    })(a2))(r));
                  };
                }));
                var unsub = v(tf, function(v1) {
                  var o = read(r)();
                  var v2 = lookup2(v1.address)(o);
                  if (v2 instanceof Nothing) {
                    return unit;
                  }
                  ;
                  if (v2 instanceof Just) {
                    return fastForeachE(v2.value0, function(i2) {
                      return i2(v1.payload);
                    });
                  }
                  ;
                  throw new Error("Failed pattern match at FRP.Event (line 771, column 13 - line 773, column 99): " + [v2.constructor.name]);
                });
                return function __do3() {
                  $$void3(write(empty2)(r))();
                  return unsub();
                };
              };
            };
          };
        };
        return mailboxed_;
      }(),
      delay: function() {
        var delay_ = function(n) {
          return function(v) {
            return function(tf, k) {
              var tid = $$new(mempty1)();
              var canceler = v(tf, function(a2) {
                var localId = $$new(Nothing.value)();
                var id = setTimeout2(n)(function __do3() {
                  k(a2);
                  var lid = read(localId)();
                  return maybe(pure2(unit))(function(id2) {
                    return modify_($$delete4(id2))(tid);
                  })(lid)();
                })();
                write(new Just(id))(localId)();
                return modify_(append1(singleton4(id)))(tid)();
              });
              return function __do3() {
                var ids = read(tid)();
                for_22(ids)(clearTimeout2)();
                return canceler();
              };
            };
          };
        };
        return delay_;
      }()
    };
  });
  var $lazy_create = /* @__PURE__ */ $runtime_lazy3("create", "FRP.Event", function() {
    return function __do3() {
      unit;
      return function(v) {
        return v;
      }($lazy_backdoor(437).create)();
    };
  });
  var backdoor = /* @__PURE__ */ $lazy_backdoor(583);
  var create = /* @__PURE__ */ $lazy_create(434);
  var makeLemmingEvent = function(i2) {
    return function(v) {
      return v;
    }(backdoor.makeLemmingEvent)(i2);
  };
  var makeLemmingEventO = function(i2) {
    return function(v) {
      return v;
    }(backdoor.makeLemmingEventO)(i2);
  };
  var applyEvent = {
    apply: function(a2) {
      return function(b2) {
        return biSampleOn(a2)(map1(applyFlipped)(b2));
      };
    },
    Functor0: function() {
      return functorEvent;
    }
  };
  var applicativeEvent = {
    pure: function(a2) {
      return function(v, k) {
        k(a2);
        return pure2(unit);
      };
    },
    Apply0: function() {
      return applyEvent;
    }
  };
  var altEvent = {
    alt: function(v) {
      return function(v1) {
        return function(tf, k) {
          return apply2(map3(function(v2) {
            return function(v3) {
              return function __do3() {
                v2();
                return v3();
              };
            };
          })(function() {
            return v(tf, k);
          }))(function() {
            return v1(tf, k);
          })();
        };
      };
    },
    Functor0: function() {
      return functorEvent;
    }
  };
  var plusEvent = {
    empty: function(v, v1) {
      return pure2(unit);
    },
    Alt0: function() {
      return altEvent;
    }
  };
  var alternativeEvent = {
    Applicative0: function() {
      return applicativeEvent;
    },
    Plus1: function() {
      return plusEvent;
    }
  };
  var eventIsEvent = {
    keepLatest: keepLatest2,
    sampleOnRight: sampleOnRight2,
    sampleOnLeft,
    fix: fix3,
    Alternative0: function() {
      return alternativeEvent;
    },
    Filterable1: function() {
      return filterableEvent;
    }
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
    var $29 = map(functorFn)(map(functorEffect)($$const(true)));
    return function($30) {
      return Cb($29($30));
    };
  }();
  var attr = function(dict) {
    return dict.attr;
  };

  // output/Record/index.js
  var insert2 = function(dictIsSymbol) {
    var reflectSymbol2 = reflectSymbol(dictIsSymbol);
    return function() {
      return function() {
        return function(l) {
          return function(a2) {
            return function(r) {
              return unsafeSet(reflectSymbol2(l))(a2)(r);
            };
          };
        };
      };
    };
  };

  // output/FRP.Event.VBus/index.js
  var pure3 = /* @__PURE__ */ pure(applicativeST);
  var vbusNil = {
    vb: function(v) {
      return pure3(new Tuple({}, {}));
    }
  };
  var vb = function(dict) {
    return dict.vb;
  };
  var vbackdoor = {
    vbus: /* @__PURE__ */ function() {
      var vbus__ = function() {
        return function(dictVBus) {
          var vb1 = vb(dictVBus);
          return function(v) {
            return function(f) {
              return makeLemmingEvent(function(v1) {
                return function(k) {
                  return function __do3() {
                    var v2 = vb1($$Proxy.value)();
                    k(f(v2.value0)(v2.value1))();
                    return pure3(unit);
                  };
                };
              });
            };
          };
        };
      };
      var vbus__1 = vbus__();
      var vbus_ = function() {
        return function(dictVBus) {
          return vbus__1(dictVBus);
        };
      };
      return vbus_;
    }()
  };
  var vbus = function() {
    return function(dictVBus) {
      return function(i2) {
        return function(v) {
          return v()(dictVBus);
        }(vbackdoor.vbus)(i2);
      };
    };
  };
  var vbusCons2 = function(dictIsSymbol) {
    var insert6 = insert2(dictIsSymbol)()();
    return function() {
      return function() {
        return function(dictVBus) {
          var vb1 = vb(dictVBus);
          return function() {
            return function() {
              return {
                vb: function(v) {
                  return function __do3() {
                    var v1 = vb1($$Proxy.value)();
                    var v2 = create();
                    return new Tuple(insert6($$Proxy.value)(v2.push)(v1.value0), insert6($$Proxy.value)(v2.event)(v1.value1));
                  };
                }
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
  var envy = function(a2) {
    return new EventfulElement$prime(a2);
  };

  // output/Foreign.Object/foreign.js
  function _copyST(m3) {
    return function() {
      var r = {};
      for (var k in m3) {
        if (hasOwnProperty.call(m3, k)) {
          r[k] = m3[k];
        }
      }
      return r;
    };
  }
  var empty4 = {};
  function runST(f) {
    return f();
  }
  function _foldM(bind5) {
    return function(f) {
      return function(mz) {
        return function(m3) {
          var acc = mz;
          function g(k2) {
            return function(z) {
              return f(z)(k2)(m3[k2]);
            };
          }
          for (var k in m3) {
            if (hasOwnProperty.call(m3, k)) {
              acc = bind5(acc)(g(k));
            }
          }
          return acc;
        };
      };
    };
  }
  function toArrayWithKey(f) {
    return function(m3) {
      var r = [];
      for (var k in m3) {
        if (hasOwnProperty.call(m3, k)) {
          r.push(f(k)(m3[k]));
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
      return function(m3) {
        return function() {
          m3[k] = v;
          return m3;
        };
      };
    };
  }
  var deleteImpl = function(k) {
    return function(m3) {
      return function() {
        delete m3[k];
        return m3;
      };
    };
  };

  // output/Foreign.Object/index.js
  var foldr4 = /* @__PURE__ */ foldr(foldableArray);
  var values = /* @__PURE__ */ toArrayWithKey(function(v) {
    return function(v1) {
      return v1;
    };
  });
  var thawST = _copyST;
  var mutate = function(f) {
    return function(m3) {
      return runST(function __do3() {
        var s2 = thawST(m3)();
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
  var fold3 = /* @__PURE__ */ _foldM(applyFlipped);
  var foldMap3 = function(dictMonoid) {
    var append12 = append(dictMonoid.Semigroup0());
    var mempty4 = mempty(dictMonoid);
    return function(f) {
      return fold3(function(acc) {
        return function(k) {
          return function(v) {
            return append12(acc)(f(k)(v));
          };
        };
      })(mempty4);
    };
  };
  var foldableObject = {
    foldl: function(f) {
      return fold3(function(z) {
        return function(v) {
          return f(z);
        };
      });
    },
    foldr: function(f) {
      return function(z) {
        return function(m3) {
          return foldr4(f)(z)(values(m3));
        };
      };
    },
    foldMap: function(dictMonoid) {
      var foldMap12 = foldMap3(dictMonoid);
      return function(f) {
        return foldMap12($$const(f));
      };
    }
  };
  var $$delete5 = function(k) {
    return mutate(deleteImpl(k));
  };

  // output/Bolson.Control/index.js
  var keepLatest3 = /* @__PURE__ */ keepLatest(eventIsEvent);
  var map4 = /* @__PURE__ */ map(functorEvent);
  var bind2 = /* @__PURE__ */ bind(bindST);
  var pure1 = /* @__PURE__ */ pure(applicativeST);
  var map22 = /* @__PURE__ */ map(functorST);
  var for_3 = /* @__PURE__ */ for_(applicativeST);
  var for_12 = /* @__PURE__ */ for_3(foldableMaybe);
  var $$void4 = /* @__PURE__ */ $$void(functorST);
  var for_23 = /* @__PURE__ */ for_3(foldableArray);
  var oneOfMap2 = /* @__PURE__ */ oneOfMap(foldableArray)(plusEvent);
  var traverse_2 = /* @__PURE__ */ traverse_(applicativeST)(foldableArray);
  var append4 = /* @__PURE__ */ append(semigroupArray);
  var foldl3 = /* @__PURE__ */ foldl(foldableObject);
  var applySecond2 = /* @__PURE__ */ applySecond(applyST);
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
  var flatten = function(v) {
    return function(psr) {
      return function(interpreter) {
        var element = function(v1) {
          return v1(psr)(interpreter);
        };
        return function(v1) {
          if (v1 instanceof FixedChildren$prime) {
            return oneOfMap2(flatten(v)(psr)(interpreter))(v1.value0);
          }
          ;
          if (v1 instanceof EventfulElement$prime) {
            return keepLatest3(map4(flatten(v)(psr)(interpreter))(v1.value0));
          }
          ;
          if (v1 instanceof Element$prime) {
            return element(v.toElt(v1.value0));
          }
          ;
          if (v1 instanceof DynamicChildren$prime) {
            return makeLemmingEventO(mkSTFn2(function(v2) {
              return function(v3) {
                return function __do3() {
                  var cancelInner = newSTRef(empty4)();
                  var cancelOuter = runSTFn2(v2)(v1.value0)(mkSTFn1(function(inner) {
                    return function __do4() {
                      var myUnsubId = v.ids(interpreter)();
                      var myUnsub = newSTRef(pure1(unit))();
                      var eltsUnsubId = v.ids(interpreter)();
                      var eltsUnsub = newSTRef(pure1(unit))();
                      var myIds = newSTRef([])();
                      var myImmediateCancellation = newSTRef(pure1(unit))();
                      var myScope = map22(Local.create)(v.ids(interpreter))();
                      var stageRef = newSTRef(Begin.value)();
                      var c0 = runSTFn2(v2)(inner)(mkSTFn1(function(kid$prime) {
                        return function __do5() {
                          var stage = read2(stageRef)();
                          if (kid$prime instanceof Logic && stage instanceof Middle) {
                            var curId = read2(myIds)();
                            return traverse_2(function(i2) {
                              return runSTFn1(v3)(v.doLogic(kid$prime.value0)(interpreter)(i2));
                            })(curId)();
                          }
                          ;
                          if (kid$prime instanceof Remove && stage instanceof Middle) {
                            $$void4(write2(End.value)(stageRef))();
                            var mic = function __do6() {
                              var idRef = read2(myIds)();
                              for_23(idRef)(function(old) {
                                return for_12(psr.parent)(function(pnt) {
                                  return runSTFn1(v3)(v.disconnectElement(interpreter)({
                                    id: old,
                                    parent: pnt,
                                    scope: myScope
                                  }));
                                });
                              })();
                              var myu = read2(myUnsub)();
                              myu();
                              var eltu = read2(eltsUnsub)();
                              eltu();
                              $$void4(modify3($$delete5(myUnsubId))(cancelInner))();
                              return $$void4(modify3($$delete5(eltsUnsubId))(cancelInner))();
                            };
                            $$void4(write2(mic)(myImmediateCancellation))();
                            return mic();
                          }
                          ;
                          if (kid$prime instanceof Insert && stage instanceof Begin) {
                            $$void4(write2(Middle.value)(stageRef))();
                            var c1 = runSTFn2(v2)(flatten(v)(function() {
                              var $125 = {};
                              for (var $126 in psr) {
                                if ({}.hasOwnProperty.call(psr, $126)) {
                                  $125[$126] = psr[$126];
                                }
                                ;
                              }
                              ;
                              $125.scope = myScope;
                              $125.raiseId = function(id) {
                                return $$void4(modify3(append4([id]))(myIds));
                              };
                              return $125;
                            }())(interpreter)(kid$prime.value0))(v3)();
                            $$void4(modify3(insert3(eltsUnsubId)(c1))(cancelInner))();
                            return $$void4(write2(c1)(eltsUnsub))();
                          }
                          ;
                          return unit;
                        };
                      }))();
                      $$void4(write2(c0)(myUnsub))();
                      $$void4(modify3(insert3(myUnsubId)(c0))(cancelInner))();
                      var mican = read2(myImmediateCancellation)();
                      return mican();
                    };
                  }))();
                  return function __do4() {
                    bind2(read2(cancelInner))(foldl3(applySecond2)(pure1(unit)))();
                    return cancelOuter();
                  };
                };
              };
            }));
          }
          ;
          throw new Error("Failed pattern match at Bolson.Control (line 544, column 17 - line 630, column 20): " + [v1.constructor.name]);
        };
      };
    };
  };

  // output/Data.Profunctor/index.js
  var identity4 = /* @__PURE__ */ identity(categoryFn);
  var profunctorFn = {
    dimap: function(a2b) {
      return function(c2d) {
        return function(b2c) {
          return function($18) {
            return c2d(b2c(a2b($18)));
          };
        };
      };
    }
  };
  var dimap = function(dict) {
    return dict.dimap;
  };
  var lcmap = function(dictProfunctor) {
    var dimap1 = dimap(dictProfunctor);
    return function(a2b) {
      return dimap1(a2b)(identity4);
    };
  };

  // output/Deku.Core/index.js
  var coerce3 = /* @__PURE__ */ coerce();
  var lcmap2 = /* @__PURE__ */ lcmap(profunctorFn);
  var map5 = /* @__PURE__ */ map(functorEvent);
  var unwrap3 = /* @__PURE__ */ unwrap();
  var eq2 = /* @__PURE__ */ eq(eqScope);
  var pure4 = /* @__PURE__ */ pure(applicativeST);
  var pure12 = /* @__PURE__ */ pure(applicativeEvent);
  var empty5 = /* @__PURE__ */ empty(plusEvent);
  var oneOf2 = /* @__PURE__ */ oneOf(foldableArray)(plusEvent);
  var unsafeSetPos$prime = function(i2) {
    return function(v) {
      var f = function(v1) {
        if (v1 instanceof Element$prime) {
          return new Element$prime(lcmap2(function(v2) {
            return {
              pos: i2,
              dynFamily: v2.dynFamily,
              ez: v2.ez,
              parent: v2.parent,
              raiseId: v2.raiseId,
              scope: v2.scope
            };
          })(v1.value0));
        }
        ;
        if (v1 instanceof EventfulElement$prime) {
          return new EventfulElement$prime(map5(f)(v1.value0));
        }
        ;
        return v;
      };
      return f(v);
    };
  };
  var unsafeSetPos = function($77) {
    return unsafeSetPos$prime(Just.create($77));
  };
  var portalFlatten = function() {
    return {
      doLogic: function(pos) {
        return function(v) {
          return function(id) {
            return v.sendToPos({
              id,
              pos
            });
          };
        };
      },
      ids: function($78) {
        return function(v) {
          return v.ids;
        }(unwrap3($78));
      },
      disconnectElement: function(v) {
        return function(v1) {
          return v.disconnectElement({
            id: v1.id,
            scope: v1.scope,
            parent: v1.parent,
            scopeEq: eq2
          });
        };
      },
      toElt: function(v) {
        return v;
      }
    };
  };
  var portalFlatten1 = /* @__PURE__ */ portalFlatten();
  var __internalDekuFlatten = function(a2) {
    return function(b2) {
      return function(v) {
        return flatten(portalFlatten1)(a2)(b2)(v);
      };
    };
  };
  var dynify = function(f) {
    return function(es) {
      var go2 = function(v) {
        return function(v1) {
          return makeLemmingEventO(mkSTFn2(function(v2) {
            return function(k) {
              return function __do3() {
                var me = v1.ids();
                v.raiseId(me)();
                var v3 = function() {
                  if (v.parent instanceof Nothing) {
                    var dummyParent = v1.ids();
                    return new Tuple(pure12(v1.makeElement({
                      id: dummyParent,
                      parent: Nothing.value,
                      scope: v.scope,
                      tag: "div",
                      pos: Nothing.value,
                      dynFamily: Nothing.value
                    })), dummyParent);
                  }
                  ;
                  if (v.parent instanceof Just) {
                    return new Tuple(empty5, v.parent.value0);
                  }
                  ;
                  throw new Error("Failed pattern match at Deku.Core (line 339, column 34 - line 353, column 36): " + [v.parent.constructor.name]);
                }();
                var unsub = runSTFn2(v2)(oneOf2([v3.value0, pure12(v1.makeDynBeacon({
                  id: me,
                  parent: new Just(v3.value1),
                  scope: v.scope,
                  dynFamily: v.dynFamily,
                  pos: v.pos
                })), pure12(v1.attributeParent({
                  id: me,
                  parent: v3.value1,
                  pos: v.pos,
                  dynFamily: v.dynFamily,
                  ez: v.ez
                })), __internalDekuFlatten({
                  parent: new Just(v3.value1),
                  scope: v.scope,
                  ez: false,
                  raiseId: function(v4) {
                    return pure4(unit);
                  },
                  pos: Nothing.value,
                  dynFamily: new Just(me)
                })(v1)(f(es))]))(k)();
                return function __do4() {
                  runSTFn1(k)(v1.removeDynBeacon({
                    id: me
                  }))();
                  return unsub();
                };
              };
            };
          }));
        };
      };
      return new Element$prime(go2);
    };
  };
  var envy2 = /* @__PURE__ */ dynify(/* @__PURE__ */ coerce3(envy));

  // output/Deku.Control/index.js
  var map6 = /* @__PURE__ */ map(functorEvent);
  var oneOf3 = /* @__PURE__ */ oneOf(foldableArray)(plusEvent);
  var pure5 = /* @__PURE__ */ pure(applicativeEvent);
  var empty6 = /* @__PURE__ */ empty(plusEvent);
  var pure13 = /* @__PURE__ */ pure(applicativeST);
  var unwrap4 = /* @__PURE__ */ unwrap();
  var eq13 = /* @__PURE__ */ eq(eqScope);
  var alt2 = /* @__PURE__ */ alt(altEvent);
  var append5 = /* @__PURE__ */ append(semigroupArray);
  var unsafeSetText = function(v) {
    return function(id) {
      return function(txt) {
        return map6(function($130) {
          return v.setText(function(v1) {
            return {
              id,
              text: v1
            };
          }($130));
        })(txt);
      };
    };
  };
  var unsafeSetAttribute = function(v) {
    return function(id) {
      return function(atts) {
        return map6(function($131) {
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
            throw new Error("Failed pattern match at Deku.Control (line 62, column 26 - line 64, column 45): " + [v1.value.constructor.name]);
          }(unsafeUnAttribute($131));
        })(atts);
      };
    };
  };
  var text = function(txt) {
    var go2 = function(v) {
      return function(v1) {
        return makeLemmingEventO(mkSTFn2(function(v2) {
          return function(k) {
            return function __do3() {
              var me = v1.ids();
              v.raiseId(me)();
              var unsub = runSTFn2(v2)(oneOf3([pure5(v1.makeText({
                id: me,
                parent: v.parent,
                pos: v.pos,
                scope: v.scope,
                dynFamily: v.dynFamily
              })), unsafeSetText(v1)(me)(txt), maybe(empty6)(function(p2) {
                return pure5(v1.attributeParent({
                  id: me,
                  parent: p2,
                  pos: v.pos,
                  dynFamily: v.dynFamily,
                  ez: v.ez
                }));
              })(v.parent)]))(k)();
              return function __do4() {
                runSTFn1(k)(v1.deleteFromCache({
                  id: me
                }))();
                return unsub();
              };
            };
          };
        }));
      };
    };
    return new Element$prime(go2);
  };
  var text_ = function(txt) {
    return text(pure5(txt));
  };
  var portalFlatten2 = function() {
    return {
      doLogic: function(pos) {
        return function(v) {
          return function(id) {
            return v.sendToPos({
              id,
              pos
            });
          };
        };
      },
      ids: function($134) {
        return function(v) {
          return v.ids;
        }(unwrap4($134));
      },
      disconnectElement: function(v) {
        return function(v1) {
          return v.disconnectElement({
            id: v1.id,
            scope: v1.scope,
            parent: v1.parent,
            scopeEq: eq13
          });
        };
      },
      toElt: function(v) {
        return v;
      }
    };
  };
  var portalFlatten12 = /* @__PURE__ */ portalFlatten2();
  var __internalDekuFlatten2 = function(a2) {
    return function(b2) {
      return function(v) {
        return flatten(portalFlatten12)(a2)(b2)(v);
      };
    };
  };
  var deku = function(root) {
    return function(children) {
      return function(v) {
        return makeLemmingEventO(mkSTFn2(function(v1) {
          return function(k) {
            return runSTFn2(v1)(alt2(pure5(v.makeRoot({
              id: "deku-root",
              root
            })))(__internalDekuFlatten2({
              parent: new Just("deku-root"),
              scope: new Local("rootScope"),
              raiseId: function(v2) {
                return pure13(unit);
              },
              ez: true,
              pos: Nothing.value,
              dynFamily: Nothing.value
            })(v)(children)))(k);
          };
        }));
      };
    };
  };
  var elementify = function(tag) {
    return function(atts) {
      return function(children) {
        var go2 = function(v) {
          return function(v1) {
            return makeLemmingEventO(mkSTFn2(function(v2) {
              return function(k) {
                return function __do3() {
                  var me = v1.ids();
                  v.raiseId(me)();
                  var unsub = runSTFn2(v2)(alt2(oneOf3(append5([pure5(v1.makeElement({
                    id: me,
                    parent: v.parent,
                    scope: v.scope,
                    tag,
                    pos: v.pos,
                    dynFamily: v.dynFamily
                  })), unsafeSetAttribute(v1)(me)(atts)])(maybe([])(function(p2) {
                    return [pure5(v1.attributeParent({
                      id: me,
                      parent: p2,
                      pos: v.pos,
                      dynFamily: v.dynFamily,
                      ez: v.ez
                    }))];
                  })(v.parent))))(__internalDekuFlatten2({
                    parent: new Just(me),
                    scope: v.scope,
                    ez: true,
                    raiseId: function(v3) {
                      return pure13(unit);
                    },
                    pos: Nothing.value,
                    dynFamily: Nothing.value
                  })(v1)(children)))(k)();
                  return function __do4() {
                    runSTFn1(k)(v1.deleteFromCache({
                      id: me
                    }))();
                    return unsub();
                  };
                };
              };
            }));
          };
        };
        return go2;
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
  var coerce4 = /* @__PURE__ */ coerce();
  var b = function(attributes) {
    return function(kids) {
      return new Element$prime(elementify("b")(attributes)(coerce4(fixed(coerce4(mapWithIndex(unsafeSetPos)(kids))))));
    };
  };
  var b_ = /* @__PURE__ */ b(/* @__PURE__ */ empty(plusEvent));

  // output/Deku.DOM.Elt.Br/index.js
  var coerce5 = /* @__PURE__ */ coerce();
  var br = function(attributes) {
    return function(kids) {
      return new Element$prime(elementify("br")(attributes)(coerce5(fixed(coerce5(mapWithIndex(unsafeSetPos)(kids))))));
    };
  };
  var br_ = /* @__PURE__ */ br(/* @__PURE__ */ empty(plusEvent));

  // output/Deku.DOM.Elt.Div/index.js
  var coerce6 = /* @__PURE__ */ coerce();
  var div2 = function(attributes) {
    return function(kids) {
      return new Element$prime(elementify("div")(attributes)(coerce6(fixed(coerce6(mapWithIndex(unsafeSetPos)(kids))))));
    };
  };
  var div_ = /* @__PURE__ */ div2(/* @__PURE__ */ empty(plusEvent));

  // output/Deku.DOM.Elt.Em/index.js
  var coerce7 = /* @__PURE__ */ coerce();
  var em = function(attributes) {
    return function(kids) {
      return new Element$prime(elementify("em")(attributes)(coerce7(fixed(coerce7(mapWithIndex(unsafeSetPos)(kids))))));
    };
  };
  var em_ = /* @__PURE__ */ em(/* @__PURE__ */ empty(plusEvent));

  // output/Deku.DOM.Elt.H1/index.js
  var coerce8 = /* @__PURE__ */ coerce();
  var h1 = function(attributes) {
    return function(kids) {
      return new Element$prime(elementify("h1")(attributes)(coerce8(fixed(coerce8(mapWithIndex(unsafeSetPos)(kids))))));
    };
  };
  var h1_ = /* @__PURE__ */ h1(/* @__PURE__ */ empty(plusEvent));

  // output/Deku.DOM.Elt.Hr/index.js
  var coerce9 = /* @__PURE__ */ coerce();
  var hr = function(attributes) {
    return function(kids) {
      return new Element$prime(elementify("hr")(attributes)(coerce9(fixed(coerce9(mapWithIndex(unsafeSetPos)(kids))))));
    };
  };
  var hr_ = /* @__PURE__ */ hr(/* @__PURE__ */ empty(plusEvent));

  // output/Deku.DOM.Elt.Input/index.js
  var coerce10 = /* @__PURE__ */ coerce();
  var input = function(attributes) {
    return function(kids) {
      return new Element$prime(elementify("input")(attributes)(coerce10(fixed(coerce10(mapWithIndex(unsafeSetPos)(kids))))));
    };
  };

  // output/Deku.DOM.Elt.Label/index.js
  var coerce11 = /* @__PURE__ */ coerce();
  var label = function(attributes) {
    return function(kids) {
      return new Element$prime(elementify("label")(attributes)(coerce11(fixed(coerce11(mapWithIndex(unsafeSetPos)(kids))))));
    };
  };
  var label_ = /* @__PURE__ */ label(/* @__PURE__ */ empty(plusEvent));

  // output/Deku.DOM.Elt.Li/index.js
  var coerce12 = /* @__PURE__ */ coerce();
  var li = function(attributes) {
    return function(kids) {
      return new Element$prime(elementify("li")(attributes)(coerce12(fixed(coerce12(mapWithIndex(unsafeSetPos)(kids))))));
    };
  };
  var li_ = /* @__PURE__ */ li(/* @__PURE__ */ empty(plusEvent));

  // output/Deku.DOM.Elt.Ul/index.js
  var coerce13 = /* @__PURE__ */ coerce();
  var ul = function(attributes) {
    return function(kids) {
      return new Element$prime(elementify("ul")(attributes)(coerce13(fixed(coerce13(mapWithIndex(unsafeSetPos)(kids))))));
    };
  };
  var ul_ = /* @__PURE__ */ ul(/* @__PURE__ */ empty(plusEvent));

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
  var textMode = (content3) => (elem3) => () => elem3.innerHTML = content3;

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
  var target = function($3) {
    return toMaybe(_target($3));
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
  var bind3 = /* @__PURE__ */ bind(bindMaybe);
  var map8 = /* @__PURE__ */ map(functorArray);
  var unsafeIndex2 = /* @__PURE__ */ unsafeIndex();
  var attr2 = /* @__PURE__ */ attr(attrSelfElementFunctionEf);
  var attr1 = /* @__PURE__ */ attr(attrOnInputCb);
  var for_4 = /* @__PURE__ */ for_(applicativeEffect)(foldableMaybe);
  var composeKleisli2 = /* @__PURE__ */ composeKleisli(bindEffect);
  var map12 = /* @__PURE__ */ map(functorEvent);
  var pure6 = /* @__PURE__ */ pure(applicativeEvent);
  var append6 = /* @__PURE__ */ append(semigroupArray);
  var attr22 = /* @__PURE__ */ attr(attrDiv_StyleString);
  var attr3 = /* @__PURE__ */ attr(attrLabel_StyleString);
  var attr4 = /* @__PURE__ */ attr(attrOnKeyupCb);
  var when2 = /* @__PURE__ */ when(applicativeEffect);
  var validateInput = function(inp) {
    return bind3(bind3(inp)(fromString))(function(x) {
      var $111 = isNaNImpl(x);
      if ($111) {
        return Nothing.value;
      }
      ;
      return new Just(round2(x));
    });
  };
  var toTuple = function(dictFunctor) {
    var map24 = map(dictFunctor);
    return function(tupEv) {
      return new Tuple(map24(fst)(tupEv), map24(snd)(tupEv));
    };
  };
  var toSeed = function(txt) {
    var v = validateInput(new Just(txt));
    if (v instanceof Just) {
      return v.value0;
    }
    ;
    return 0;
  };
  var toArray2 = function(dictFunctor) {
    var map24 = map(dictFunctor);
    return function(n) {
      return function(arrEv) {
        return map8(function(i2) {
          return map24(function(arr) {
            return unsafeIndex2(arr)(i2);
          })(arrEv);
        })(range(0)(n - 1 | 0));
      };
    };
  };
  var t$prime = function(txt) {
    return attr2(Self.value)(textMode(txt));
  };
  var splits = function(dictFunctor) {
    var map24 = map(dictFunctor);
    return function(v) {
      return function(e) {
        return map24(function(x) {
          return new Tuple(v.value0(x), v.value1(x));
        })(e);
      };
    };
  };
  var runningText = function(dictFunctor) {
    return map(dictFunctor)(function(push2) {
      return attr1(OnInput.value)(cb(function(e) {
        return for_4(bind3(target(e))(fromEventTarget))(composeKleisli2(value)(push2));
      }));
    });
  };
  var put2 = function(dictFunctor) {
    var $$void7 = $$void(dictFunctor);
    return function(dictMonadState) {
      var modify6 = modify(dictMonadState);
      return function(x) {
        return $$void7(modify6(flip(snoc)(x)));
      };
    };
  };
  var setTitle_ = function(str) {
    return function(dictFunctor) {
      var put1 = put2(dictFunctor);
      return function(dictMonadState) {
        return put1(dictMonadState)(h1_([text_(str)]));
      };
    };
  };
  var t = function(dictFunctor) {
    var put1 = put2(dictFunctor);
    return function(dictMonadState) {
      var put22 = put1(dictMonadState);
      return function(str) {
        return put22(label(map12(t$prime)(str))([]));
      };
    };
  };
  var t_ = function(dictFunctor) {
    var t1 = t(dictFunctor);
    return function(dictMonadState) {
      var t2 = t1(dictMonadState);
      return function(str) {
        return t2(pure6(str));
      };
    };
  };
  var pad = function(n) {
    return function(arr) {
      return append6(arr)(map8(function(v) {
        return new Tuple(t$prime, "");
      })(range(0)((n - length(arr) | 0) - 1 | 0)));
    };
  };
  var openSection_ = function(title3) {
    return function(points) {
      return function(dictFunctor) {
        var put1 = put2(dictFunctor);
        return function(dictMonadState) {
          return put1(dictMonadState)(div_([div2(pure6(attr22(Style.value)("margin: 0; display: flex; justify-content: space-between")))([label(pure6(attr3(Style.value)("font-size: 24px; font-weight: 700;")))([text_(title3)]), label(pure6(attr3(Style.value)("font-size: 16px; font-weight: 700;")))([text_(points)])]), hr_([])]));
        };
      };
    };
  };
  var nl$prime = /* @__PURE__ */ function() {
    return new Tuple(function(txt) {
      return attr2(Self.value)(textMode(txt));
    }, "<br>");
  }();
  var nl = function(dictFunctor) {
    var put1 = put2(dictFunctor);
    return function(dictMonadState) {
      return put1(dictMonadState)(br_([]));
    };
  };
  var m$prime = function(txt) {
    return attr2(Self.value)(render(txt));
  };
  var m = function(dictFunctor) {
    var put1 = put2(dictFunctor);
    return function(dictMonadState) {
      var put22 = put1(dictMonadState);
      return function(str) {
        return put22(label(map12(m$prime)(str))([]));
      };
    };
  };
  var m_ = function(dictFunctor) {
    var m1 = m(dictFunctor);
    return function(dictMonadState) {
      var m22 = m1(dictMonadState);
      return function(str) {
        return m22(pure6(str));
      };
    };
  };
  var get2 = function(dictMonadState) {
    return get(dictMonadState);
  };
  var fromIncremental = function(seq) {
    return fst(runState(seq)([]));
  };
  var equation2 = function(dictFunctor) {
    var put1 = put2(dictFunctor);
    return function(dictMonadState) {
      var put22 = put1(dictMonadState);
      return function(str) {
        return put22(label(map12(function(txt) {
          return attr2(Self.value)(display(txt));
        })(str))([]));
      };
    };
  };
  var enterHit = function(dictFunctor) {
    return map(dictFunctor)(function(push2) {
      return attr4(OnKeyup.value)(cb(function(e) {
        return for_4(fromEvent(e))(function(kevt) {
          return function __do3() {
            push2(false)();
            return when2(code2(kevt) === "Enter")(push2(true))();
          };
        });
      }));
    });
  };
  var em_2 = function(str) {
    return function(dictFunctor) {
      var put1 = put2(dictFunctor);
      return function(dictMonadState) {
        return put1(dictMonadState)(em_([text_(str)]));
      };
    };
  };
  var b_2 = function(str) {
    return function(dictFunctor) {
      var put1 = put2(dictFunctor);
      return function(dictMonadState) {
        return put1(dictMonadState)(b_([text_(str)]));
      };
    };
  };

  // output/Deku.Interpret/foreign.js
  var attributeParent_ = (runOnJust2) => (a2) => (state4) => () => {
    if (state4.units[a2.id]) {
      const dom2 = state4.units[a2.parent].main;
      if (!(state4.units[a2.id].main && state4.units[a2.id].main.parentNode || state4.units[a2.id].startBeacon && state4.units[a2.id].startBeacon.parentNode)) {
        const iRan = a2.ez ? (() => {
          if (state4.units[a2.id].main) {
            dom2.appendChild(state4.units[a2.id].main);
          } else {
            dom2.appendChild(state4.units[a2.id].startBeacon);
            dom2.appendChild(state4.units[a2.id].endBeacon);
          }
          return true;
        })() : runOnJust2(a2.pos)((pos) => () => {
          return runOnJust2(a2.dynFamily)((dynFamily) => () => {
            var i2 = 0;
            var j = 0;
            var terminalDyn;
            while (j < dom2.childNodes.length) {
              if (dom2.childNodes[j].nodeType === 8 && dom2.childNodes[j].nodeValue === "%-%" + dynFamily) {
                j += 1;
                break;
              }
              j++;
            }
            const inserter = (k) => {
              if (state4.units[a2.id].startBeacon) {
                dom2.insertBefore(state4.units[a2.id].startBeacon, dom2.childNodes[k]);
                dom2.insertBefore(state4.units[a2.id].endBeacon, dom2.childNodes[k]);
              } else {
                dom2.insertBefore(state4.units[a2.id].main, dom2.childNodes[k]);
              }
            };
            while (j < dom2.childNodes.length) {
              var tmpDekuId;
              if (tmpDekuId = dom2.childNodes[j].$dekuId) {
                const insertHappened = runOnJust2(state4.units[tmpDekuId].dynFamily)((tmpDynFamily) => () => {
                  const insertHappened2 = runOnJust2(state4.units[tmpDekuId].pos)((tmpPos) => () => {
                    if (dynFamily === tmpDynFamily && pos <= tmpPos) {
                      inserter(j);
                      return true;
                    }
                    return false;
                  })();
                  return insertHappened2;
                })();
                if (insertHappened) {
                  return true;
                }
              }
              if (i2 === pos) {
                inserter(j);
                return true;
              }
              if (dom2.childNodes[j].nodeType === 8 && dom2.childNodes[j].nodeValue === "%-%" + dynFamily + "%-%") {
                inserter(j);
                return true;
              }
              if (dom2.childNodes[j].nodeType === 8 && dom2.childNodes[j].nodeValue.substring(0, 3) === "%-%" && !terminalDyn) {
                terminalDyn = dom2.childNodes[j].nodeValue + "%-%";
              }
              if (!terminalDyn) {
                i2++;
              }
              if (dom2.childNodes[j].nodeType === 8 && dom2.childNodes[j].nodeValue === terminalDyn) {
                terminalDyn = void 0;
                i2++;
              }
              j++;
            }
            return false;
          })();
        })();
        if (!iRan) {
          if (a2.parent.indexOf("@!%") !== -1) {
            const usedDynBeacon = runOnJust2(a2.dynFamily)((df) => () => {
              if (state4.units[a2.id].main) {
                state4.units[df].endBeacon.parentNode.insertBefore(state4.units[a2.id].main, state4.units[df].endBeacon);
              } else {
                state4.units[df].endBeacon.parentNode.insertBefore(state4.units[a2.id].endBeacon, state4.units[df].endBeacon);
                state4.units[df].endBeacon.parentNode.insertBefore(state4.units[a2.id].startBeacon, state4.units[a2.id].endBeacon);
              }
              return true;
            })();
            if (usedDynBeacon) {
            } else if (state4.units[a2.id].main) {
              dom2.parentNode.replaceChild(state4.units[a2.id].main, dom2);
            } else {
              dom2.parentNode.replaceChild(state4.units[a2.id].endBeacon, dom2);
              state4.units[a2.id].endBeacon.parentNode.insertBefore(state4.units[a2.id].startBeacon, state4.units[a2.id].endBeacon);
            }
          } else {
            const hasADynFamily = runOnJust2(a2.dynFamily)((dynFamily) => () => {
              if (state4.units[a2.id].startBeacon) {
                dom2.insertBefore(state4.units[a2.id].startBeacon, state4.units[dynFamily].endBeacon);
                dom2.insertBefore(state4.units[a2.id].endBeacon, state4.units[dynFamily].endBeacon);
              } else {
                dom2.insertBefore(state4.units[a2.id].main, state4.units[dynFamily].endBeacon);
              }
              return true;
            })();
            if (!hasADynFamily) {
              if (state4.units[a2.id].startBeacon) {
                dom2.appendChild(state4.units[a2.id].startBeacon);
                dom2.appendChild(state4.units[a2.id].endBeacon);
              } else {
                dom2.appendChild(state4.units[a2.id].main);
              }
            }
          }
        }
      }
    }
  };
  var makeDynBeacon_ = (runOnJust2) => (tryHydration) => (a2) => (state4) => () => {
    var startBeacon;
    var endBeacon;
    var ptr = a2.id;
    if (!state4.scopes[a2.scope]) {
      state4.scopes[a2.scope] = [];
    }
    state4.scopes[a2.scope].push(ptr);
    const iRan = runOnJust2(a2.parent)(() => () => {
      if (state4.hydrating && tryHydration && (startBeacon = state4.allBeacons[a2.id]) && (endBeacon = state4.allBeacons[`${a2.id}%-%`])) {
        state4.units[ptr] = {
          listeners: {},
          parent: a2.parent,
          scope: a2.scope,
          pos: a2.pos,
          dynFamily: a2.dynFamily,
          startBeacon,
          endBeacon
        };
        startBeacon.$dekuId = ptr;
        endBeacon.$dekuId = ptr;
        return true;
      }
      return false;
    })();
    if (!iRan) {
      const startBeacon2 = document.createComment(`%-%${a2.id}`);
      const endBeacon2 = document.createComment(`%-%${a2.id}%-%`);
      state4.units[ptr] = {
        listeners: {},
        parent: a2.parent,
        dynFamily: a2.dynFamily,
        scope: a2.scope,
        pos: a2.pos,
        startBeacon: startBeacon2,
        endBeacon: endBeacon2
      };
      startBeacon2.$dekuId = ptr;
      endBeacon2.$dekuId = ptr;
    }
  };
  var getDynFamily = (id) => (state4) => () => state4.units[id] && state4.units[id].dynFamily ? state4.units[id].dynFamily : (() => {
    throw new Error(`No positional information for ${id}`);
  })();
  var getParent = (id) => (state4) => () => state4.units[id] && state4.units[id].main && state4.units[id].main.parentNode && state4.units[id].main.parentNode.$dekuId ? state4.units[id].main.parentNode.$dekuId : state4.units[id] && state4.units[id].startBeacon && state4.units[id].startBeacon.parentNode && state4.units[id].startBeacon.parentNode.$dekuId ? state4.units[id].startBeacon.parentNode.$dekuId : (() => {
    throw new Error(`No parent information for ${id}`);
  })();
  var getScope = (id) => (state4) => () => state4.units[id] && state4.units[id].scope ? state4.units[id].scope : (() => {
    throw new Error(`No scope information for ${id}`);
  })();
  var makeElement_ = (runOnJust2) => (tryHydration) => (a2) => (state4) => () => {
    var dom2;
    var ptr = a2.id;
    if (!state4.scopes[a2.scope]) {
      state4.scopes[a2.scope] = [];
    }
    state4.scopes[a2.scope].push(ptr);
    const iRan = runOnJust2(a2.parent)(() => () => {
      if (state4.hydrating && tryHydration && (dom2 = document.documentElement.querySelector(`[data-deku-ssr="${ptr}"]`))) {
        state4.units[ptr] = {
          listeners: {},
          pos: a2.pos,
          parent: a2.parent,
          scope: a2.scope,
          dynFamily: a2.dynFamily,
          main: dom2
        };
        dom2.$dekuId = ptr;
        return true;
      }
      return false;
    })();
    if (!iRan) {
      const main3 = document.createElement(a2.tag);
      state4.units[ptr] = {
        listeners: {},
        parent: a2.parent,
        pos: a2.pos,
        scope: a2.scope,
        dynFamily: a2.dynFamily,
        main: main3
      };
      main3.$dekuId = ptr;
    }
  };
  var makeText_ = (runOnJust2) => (tryHydration) => (maybe2) => (a2) => (state4) => () => {
    var ptr = a2.id;
    var dom2;
    if (!state4.scopes[a2.scope]) {
      state4.scopes[a2.scope] = [];
    }
    state4.scopes[a2.scope].push(ptr);
    const iRan = runOnJust2(a2.parent)((parent2) => () => {
      if (state4.hydrating && tryHydration && (dom2 = document.documentElement.querySelector(`[data-deku-ssr="${parent2}"]`))) {
        var i2 = 0;
        for (; i2 < dom2.childNodes.length; i2++) {
          const ptrSplit = ptr.split("@-@");
          if (dom2.childNodes[i2].nodeType === 8 && dom2.childNodes[i2].nodeValue === ptrSplit[0]) {
            i2 = i2 - 1;
            var textWasBlank = i2 === -1;
            var textWasBlankAfterDynBeacon = i2 >= 0 && dom2.childNodes[i2].nodeType === 8;
            if (textWasBlank) {
              dom2.prepend(document.createTextNode(""));
            }
            if (textWasBlankAfterDynBeacon) {
              dom2.insertBefore(document.createTextNode(""), dom2.childNodes[i2 + 1]);
            }
            break;
          }
        }
        const main3 = dom2.childNodes[i2];
        state4.units[ptr] = {
          main: main3,
          pos: a2.pos,
          parent: a2.parent,
          scope: a2.scope
        };
        main3.$dekuId = ptr;
        return true;
      }
      return false;
    })();
    if (!iRan) {
      const main3 = document.createTextNode("");
      state4.units[ptr] = {
        main: main3,
        parent: a2.parent,
        scope: a2.scope,
        pos: a2.pos,
        dynFamily: a2.dynFamily
      };
      main3.$dekuId = ptr;
    }
  };
  function makeFFIDOMSnapshot() {
    return {
      units: {},
      scopes: {},
      allBeacons: {}
    };
  }
  var setProp_ = (tryHydration) => (a2) => (state4) => () => {
    if (state4.units[a2.id]) {
      var ptr = a2.id;
      var avv = a2.value;
      if (state4.hydrating && tryHydration && !state4.units[ptr] && (dom = document.documentElement.querySelector(`[data-deku-ssr="${ptr}"]`))) {
        state4.units[ptr] = {
          listeners: {},
          parent: a2.parent,
          scope: a2.scope,
          main: dom
        };
        if (!state4.scopes[a2.scope]) {
          state4.scopes[a2.scope] = [];
        }
        state4.scopes[a2.scope].push(ptr);
      }
      if (state4.units[ptr].main.tagName === "INPUT" && a2.key === "value") {
        state4.units[ptr].main.value = avv;
      } else if (state4.units[ptr].main.tagName === "INPUT" && a2.key === "checked") {
        state4.units[ptr].main.checked = avv === "true";
      } else if (a2.key === "disabled") {
        state4.units[ptr].main.disabled = avv === "true";
      } else {
        state4.units[ptr].main.setAttribute(a2.key, avv);
      }
    }
  };
  var setCb_ = (tryHydration) => (a2) => (state4) => () => {
    if (state4.units[a2.id]) {
      var ptr = a2.id;
      var avv = a2.value;
      if (state4.hydrating && tryHydration && !state4.units[ptr] && (dom = document.documentElement.querySelector(`[data-deku-ssr="${ptr}"]`))) {
        state4.units[ptr] = {
          listeners: {},
          parent: a2.parent,
          scope: a2.scope,
          main: dom
        };
        if (!state4.scopes[a2.scope]) {
          state4.scopes[a2.scope] = [];
        }
        state4.scopes[a2.scope].push(ptr);
      }
      if (a2.key === "@self@") {
        avv(state4.units[ptr].main)();
      } else {
        if (state4.units[ptr].listeners[a2.key]) {
          state4.units[ptr].main.removeEventListener(a2.key, state4.units[ptr].listeners[a2.key]);
        }
        var el = (e) => avv(e)();
        state4.units[ptr].main.addEventListener(a2.key, el);
        state4.units[ptr].listeners[a2.key] = el;
      }
    }
  };
  var setText_ = (a2) => (state4) => () => {
    if (state4.units[a2.id]) {
      var ptr = a2.id;
      state4.units[ptr].main.nodeValue = a2.text;
    }
  };
  var makePursx_ = (runOnJust2) => (tryHydration) => (maybe2) => (a2) => (state4) => () => {
    var dom2;
    var tmp;
    var ptr = a2.id;
    var html2 = a2.html;
    var verb = a2.verb;
    var cache = a2.cache;
    var parent2 = a2.parent;
    var scope2 = a2.scope;
    var pxScope = a2.pxScope;
    const iRan = runOnJust2(a2.parent)(() => () => {
      if (state4.hydrating && tryHydration && (dom2 = document.documentElement.querySelector(`[data-deku-ssr="${ptr}"]`))) {
        state4.units[ptr] = {
          listeners: {},
          pos: a2.pos,
          scope: scope2,
          parent: parent2,
          main: dom2
        };
        dom2.$dekuId = ptr;
        return true;
      }
      return false;
    })();
    if (!iRan) {
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
      state4.units[ptr] = {
        listeners: {},
        pos: a2.pos,
        scope: scope2,
        parent: parent2,
        main: tmp.firstChild
      };
      tmp.firstChild.$dekuId = ptr;
    }
    if (!state4.scopes[scope2]) {
      state4.scopes[scope2] = [];
    }
    state4.scopes[scope2].push(ptr);
    if (!tmp) {
      tmp = dom2;
    }
    tmp.querySelectorAll("[data-deku-attr-internal]").forEach(function(e) {
      var key2 = e.getAttribute("data-deku-attr-internal");
      const namespacedKey = key2 + "@!%" + pxScope;
      state4.units[namespacedKey] = {
        listeners: {},
        main: e,
        scope: scope2
      };
      state4.scopes[scope2].push(namespacedKey);
    });
    tmp.querySelectorAll("[data-deku-elt-internal]").forEach(function(e) {
      var key2 = e.getAttribute("data-deku-elt-internal");
      const namespacedKey = key2 + "@!%" + pxScope;
      state4.units[key2 + "@!%" + pxScope] = {
        listeners: {},
        main: e,
        scope: scope2
      };
      state4.scopes[scope2].push(namespacedKey);
    });
    if (!iRan) {
      state4.units[ptr].main.remove();
    }
  };
  var makeRoot_ = (a2) => (state4) => () => {
    var ptr = a2.id;
    state4.units[ptr] = {
      main: a2.root
    };
    a2.root.$dekuId = ptr;
  };
  var giveNewParent_ = (just) => (runOnJust2) => (b2) => (state4) => () => {
    const insertAt2 = (ptr, parent2, node) => {
      if (state4.units[ptr].startBeacon) {
        var x2 = state4.units[ptr].startBeacon;
        var y2 = x2.nextSibling;
        state4.units[parent2].main.insertBefore(x2, node);
        x2 = y2;
        while (x2 && x2 !== state4.units[ptr].endBeacon) {
          y2 = x2.nextSibling;
          state4.units[parent2].main.insertBefore(x2, node);
          x2 = y2;
        }
      } else {
        state4.units[parent2].main.insertBefore(state4.units[ptr].main, node);
      }
    };
    const runMe = [];
    runMe.push(b2);
    for (var z = 0; z < runMe.length; z++) {
      const a2 = runMe[z];
      const ptr = a2.id;
      const parent2 = a2.parent;
      state4.units[ptr].containingScope = a2.scope;
      var aPos = void 0;
      runOnJust2(a2.pos)((myPos) => () => {
        aPos = myPos;
        return true;
      })();
      if (aPos === void 0) {
        aPos = Number.MAX_VALUE;
      }
      const nodes = state4.units[parent2].main.childNodes;
      var i2 = 0;
      var didInsert = false;
      var pos = 0;
      while (i2 < nodes.length) {
        var dkid;
        if (dkid = nodes[i2].$dekuId) {
          const insertedBeforeEndBeacon = runOnJust2(a2.dynFamily)((df) => () => {
            if (didInsert) {
              return false;
            }
            if (state4.units[dkid].endBeacon === nodes[i2] && df === dkid) {
              state4.units[ptr].pos = just(pos);
              insertAt2(ptr, parent2, nodes[i2]);
              return true;
            }
            return false;
          })();
          if (insertedBeforeEndBeacon) {
            didInsert = true;
            break;
          }
          if (state4.units[dkid].dynFamily !== state4.units[ptr].dynFamily) {
            i2++;
            continue;
          }
          if (didInsert) {
            i2++;
            continue;
          }
          if (pos === aPos) {
            insertAt2(ptr, parent2, nodes[i2]);
            pos++;
            didInsert = true;
          } else if (state4.units[dkid].endBeacon !== nodes[i2]) {
            state4.units[dkid].pos = just(pos);
            pos++;
          }
        }
        i2++;
      }
      if (didInsert) {
        return;
      }
      ;
      if (state4.units[ptr].main) {
        state4.units[parent2].main.appendChild(state4.units[ptr].main);
      } else {
        var x = state4.units[ptr].startBeacon;
        var y = x.nextSibling;
        state4.units[parent2].main.appendChild(x);
        x = y;
        while (x && x !== state4.units[ptr].endBeacon) {
          y = x.nextSibling;
          state4.units[parent2].main.appendChild(x);
          x = y;
        }
      }
    }
  };
  var disconnectElement_ = (a2) => (state4) => () => {
    if (state4.units[a2.id]) {
      var ptr = a2.id;
      if (state4.units[ptr].containingScope && !a2.scopeEq(state4.units[ptr].containingScope)(a2.scope)) {
        return;
      }
      if (state4.units[ptr].main) {
        state4.units[ptr].main.remove();
      } else {
        const dummy = document.createElement("div");
        var x = state4.units[ptr].startBeacon;
        var y = x.nextSibling;
        dummy.appendChild(x);
        x = y;
        while (x && x !== state4.units[ptr].endBeacon) {
          y = x.nextSibling;
          dummy.appendChild(x);
          x = y;
        }
      }
    }
  };
  var deleteFromCache_ = (a2) => (state4) => () => {
    if (state4.units[a2.id]) {
      delete state4.units[a2.id];
    }
  };
  var removeDynBeacon_ = deleteFromCache_;

  // output/Random.LCG/index.js
  var mod2 = /* @__PURE__ */ mod(euclideanRingInt);
  var fromJust3 = /* @__PURE__ */ fromJust();
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
          var n$prime = mod2(n)(rangeSize);
          var $25 = n$prime < min5;
          if ($25) {
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
      return fromJust3(fromNumber(remainder(toNumber(lcgA) * toNumber(v) + toNumber(d))(toNumber(lcgM))));
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
    return function(apply5) {
      return function(map18) {
        return function(f) {
          var buildFrom = function(x, ys) {
            return apply5(map18(consList)(f(x)))(ys);
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
            var acc = map18(finalCell)(f(array[array.length - 1]));
            var result = go2(acc, array.length - 1, array);
            while (result instanceof Cont) {
              result = result.fn();
            }
            return map18(listToArray)(result);
          };
        };
      };
    };
  }();

  // output/Test.QuickCheck.Gen/index.js
  var monadStateStateT2 = /* @__PURE__ */ monadStateStateT(monadIdentity);
  var state2 = /* @__PURE__ */ state(monadStateStateT2);
  var functorStateT2 = /* @__PURE__ */ functorStateT(functorIdentity);
  var mul2 = /* @__PURE__ */ mul(semiringNumber);
  var add2 = /* @__PURE__ */ add(semiringNumber);
  var unGen = function(v) {
    return v;
  };
  var lcgStep = /* @__PURE__ */ function() {
    var f = function(s2) {
      return new Tuple(unSeed(s2.newSeed), function() {
        var $93 = {};
        for (var $94 in s2) {
          if ({}.hasOwnProperty.call(s2, $94)) {
            $93[$94] = s2[$94];
          }
          ;
        }
        ;
        $93.newSeed = lcgNext(s2.newSeed);
        return $93;
      }());
    };
    return state2(f);
  }();
  var functorGen = functorStateT2;
  var map23 = /* @__PURE__ */ map(functorGen);
  var evalGen = function($103) {
    return evalState(unGen($103));
  };
  var applyGen = /* @__PURE__ */ applyStateT(monadIdentity);
  var apply4 = /* @__PURE__ */ apply(applyGen);
  var chooseInt$prime = function(a2) {
    return function(b2) {
      var numB = toNumber(b2);
      var numA = toNumber(a2);
      var clamp = function(x) {
        return numA + remainder(x)(numB - numA + 1);
      };
      var choose31BitPosNumber = map23(toNumber)(lcgStep);
      var choose32BitPosNumber = apply4(map23(add2)(choose31BitPosNumber))(map23(mul2(2))(choose31BitPosNumber));
      return map23(function($108) {
        return floor2(clamp($108));
      })(choose32BitPosNumber);
    };
  };
  var chooseInt2 = function(a2) {
    return function(b2) {
      var $100 = a2 <= b2;
      if ($100) {
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
  var $$void5 = /* @__PURE__ */ $$void(functorST);
  var show2 = /* @__PURE__ */ show(showInt);
  var arbitrary2 = /* @__PURE__ */ arbitrary(arbInt);
  var add3 = /* @__PURE__ */ add(semiringInt);
  var pure14 = /* @__PURE__ */ pure(applicativeEffect);
  var runOnJust = function(v) {
    return function(v1) {
      if (v instanceof Just) {
        return v1(v.value0);
      }
      ;
      return pure14(false);
    };
  };
  var sendToPos2 = function(a2) {
    return function(state4) {
      return function __do3() {
        var scope2 = getScope(a2.id)(state4)();
        var parent2 = getParent(a2.id)(state4)();
        var dynFamily = getDynFamily(a2.id)(state4)();
        var newA = {
          scope: scope2,
          parent: parent2,
          dynFamily,
          id: a2.id,
          pos: new Just(a2.pos),
          ez: false
        };
        return giveNewParent_(Just.create)(runOnJust)(newA)(state4)();
      };
    };
  };
  var fullDOMInterpret = function(seed) {
    return {
      ids: function __do3() {
        var s2 = read2(seed)();
        var o = show2(evalGen(arbitrary2)({
          newSeed: mkSeed(s2),
          size: 5
        }));
        $$void5(modify3(add3(1))(seed))();
        return o;
      },
      makeElement: makeElement_(runOnJust)(false),
      makeDynBeacon: makeDynBeacon_(runOnJust)(false),
      attributeParent: attributeParent_(runOnJust),
      makeRoot: makeRoot_,
      makeText: makeText_(runOnJust)(false)(maybe(unit)),
      makePursx: makePursx_(runOnJust)(false)(maybe(unit)),
      setProp: setProp_(false),
      setCb: setCb_(false),
      setText: setText_,
      sendToPos: sendToPos2,
      removeDynBeacon: removeDynBeacon_,
      deleteFromCache: deleteFromCache_,
      giveNewParent: giveNewParent_(Just.create)(runOnJust),
      disconnectElement: disconnectElement_
    };
  };

  // output/Web.HTML/foreign.js
  var windowImpl = function() {
    return window;
  };

  // output/Web.HTML.HTMLDocument/foreign.js
  function _body(doc) {
    return doc.body;
  }

  // output/Web.HTML.HTMLDocument/index.js
  var map9 = /* @__PURE__ */ map(functorEffect);
  var body2 = function(doc) {
    return map9(toMaybe)(function() {
      return _body(doc);
    });
  };

  // output/Web.HTML.HTMLElement/index.js
  var toElement = unsafeCoerce2;

  // output/Web.HTML.Window/foreign.js
  function document2(window2) {
    return function() {
      return window2.document;
    };
  }

  // output/Deku.Toplevel/index.js
  var bind4 = /* @__PURE__ */ bind(bindEffect);
  var mapFlipped2 = /* @__PURE__ */ mapFlipped(functorEffect);
  var liftST3 = /* @__PURE__ */ liftST(monadSTEffect);
  var mempty3 = /* @__PURE__ */ mempty(/* @__PURE__ */ monoidEffect(/* @__PURE__ */ monoidEffect(monoidUnit)));
  var map10 = /* @__PURE__ */ map(functorMaybe);
  var $$void6 = /* @__PURE__ */ $$void(functorEffect);
  var runInElement$prime = function(elt) {
    return function(eee) {
      return function __do3() {
        var ffi = makeFFIDOMSnapshot();
        var evt = mapFlipped2(liftST3(newSTRef(0)))(function() {
          var $50 = deku(elt)(eee);
          return function($51) {
            return $50(fullDOMInterpret($51));
          };
        }())();
        return subscribe(evt)(function(i2) {
          return i2(ffi);
        })();
      };
    };
  };
  var runInBody$prime = function(eee) {
    return function __do3() {
      var b$prime = bind4(bind4(windowImpl)(document2))(body2)();
      return maybe(mempty3)(function(elt) {
        return runInElement$prime(elt)(eee);
      })(map10(toElement)(b$prime))();
    };
  };
  var runInBody = function(a2) {
    return $$void6(runInBody$prime(a2));
  };

  // output/Data.Rational/index.js
  var reduce2 = /* @__PURE__ */ reduce(ordInt)(euclideanRingInt);
  var fromInt = function(i2) {
    return reduce2(i2)(1);
  };

  // output/Rand/index.js
  var fromJust4 = /* @__PURE__ */ fromJust();
  var mod3 = /* @__PURE__ */ mod(euclideanRingInt);
  var div3 = /* @__PURE__ */ div(euclideanRingInt);
  var difference2 = /* @__PURE__ */ difference(eqInt);
  var middle2 = function(nn) {
    var n3$prime = mod3(nn)(1e6);
    var n3 = nn - (div3(nn - n3$prime | 0)(1e6) * 1e6 | 0) | 0;
    var n0 = mod3(nn)(100);
    return div3(n3 - n0 | 0)(100);
  };
  var rand = function(v) {
    return {
      val: middle2(mod3((v.val * v.val | 0) + v.gen | 0)(1e8)),
      gen: mod3(v.gen + v.seed | 0)(1e8),
      seed: v.seed
    };
  };
  var unsort = function(n) {
    return function(r) {
      var shake = function($copy_v) {
        return function($copy_v1) {
          return function($copy_ys) {
            var $tco_var_v = $copy_v;
            var $tco_var_v1 = $copy_v1;
            var $tco_done = false;
            var $tco_result;
            function $tco_loop(v, v1, ys) {
              if (v.length === 0) {
                $tco_done = true;
                return ys;
              }
              ;
              if (v.length === 1) {
                $tco_done = true;
                return cons(v[0])(ys);
              }
              ;
              var r$prime$prime = rand(v1);
              var x = fromJust4(index(v)(mod3(r$prime$prime.val)(length(v))));
              $tco_var_v = difference2(v)([x]);
              $tco_var_v1 = r$prime$prime;
              $copy_ys = cons(x)(ys);
              return;
            }
            ;
            while (!$tco_done) {
              $tco_result = $tco_loop($tco_var_v, $tco_var_v1, $copy_ys);
            }
            ;
            return $tco_result;
          };
        };
      };
      return shake(range(0)(n - 1 | 0))(r)([]);
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
  var show3 = /* @__PURE__ */ show(showInt);
  var unsafeIndex4 = /* @__PURE__ */ unsafeIndex();
  var mod4 = /* @__PURE__ */ mod(euclideanRingInt);
  var discard2 = /* @__PURE__ */ discard(discardUnit);
  var map11 = /* @__PURE__ */ map(functorEvent);
  var div4 = /* @__PURE__ */ div(/* @__PURE__ */ euclideanRingRatio(ordInt)(euclideanRingInt));
  var showInt2 = function(n) {
    var $45 = n < 0;
    if ($45) {
      return show3(n);
    }
    ;
    return "+" + show3(n);
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
    var $47 = d === 1;
    if ($47) {
      return show3(n);
    }
    ;
    return "\\frac{" + (show3(n) + ("}{" + (show3(d) + "}")));
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
    var v = unsafeIndex4(problems)(mod4(rp2.val)(length(problems)));
    var ra = rand(rp2);
    var a2 = mod4(ra.val)(2) === 0;
    return {
      ac: v.ac,
      ab: v.ab,
      sqrtD: v.sqrtD,
      a: a2
    };
  };
  var exo1 = function(dictFunctor) {
    var t_4 = t_(dictFunctor);
    var m_3 = m_(dictFunctor);
    var m3 = m(dictFunctor);
    var nl3 = nl(dictFunctor);
    var equation3 = equation2(dictFunctor);
    var t2 = t(dictFunctor);
    return function(dictMonadState) {
      var discard13 = discard2(dictMonadState.Monad0().Bind1());
      var t_1 = t_4(dictMonadState);
      var m_1 = m_3(dictMonadState);
      var m1 = m3(dictMonadState);
      var nl1 = nl3(dictMonadState);
      var equation1 = equation3(dictMonadState);
      var t1 = t2(dictMonadState);
      return function(f0) {
        return discard13(openSection_("Exercice I")("5 points")(dictFunctor)(dictMonadState))(function() {
          return discard13(t_1("Soit "))(function() {
            return discard13(m_1("ABC"))(function() {
              return discard13(t_1(" un triangle tel que "))(function() {
                var r0 = map11(fst)(f0);
                var p0 = map11(randomParam)(r0);
                return discard13(m1(map11(function($71) {
                  return function(v) {
                    return "AB = " + v;
                  }(show3(function(v) {
                    return v.ab;
                  }($71)));
                })(p0)))(function() {
                  return discard13(t_1(", "))(function() {
                    return discard13(m1(map11(function($72) {
                      return function(v) {
                        return "AC = " + v;
                      }(show3(function(v) {
                        return v.ac;
                      }($72)));
                    })(p0)))(function() {
                      return discard13(t_1(" et "))(function() {
                        return discard13(m1(map11(function($73) {
                          return function(v) {
                            return v + ".";
                          }(function(v) {
                            return "\\widehat{ABC} = " + v;
                          }(showAngle(function(v) {
                            return v.a;
                          }($73))));
                        })(p0)))(function() {
                          return discard13(nl1)(function() {
                            return discard13(t_1("On note "))(function() {
                              return discard13(m_1("BC=x."))(function() {
                                return discard13(nl1)(function() {
                                  return discard13(nl1)(function() {
                                    return discard13(b_2("1")(dictFunctor)(dictMonadState))(function() {
                                      return discard13(m_1("\\bullet\\bullet\\circ\\;"))(function() {
                                        return discard13(t_1("Evaluer, en fonction de  "))(function() {
                                          return discard13(m_1("x"))(function() {
                                            return discard13(t_1(", le produit scalaire "))(function() {
                                              return discard13(m_1("\\overrightarrow{BA}{\\Large\\cdot}\\overrightarrow{BC}"))(function() {
                                                return discard13(t_1(" de "))(function() {
                                                  return discard13(em_2("deux")(dictFunctor)(dictMonadState))(function() {
                                                    return discard13(t_1(" mani\xE8res diff\xE9rentes."))(function() {
                                                      return discard13(nl1)(function() {
                                                        return discard13(t_1("En d\xE9duire que "))(function() {
                                                          return discard13(m_1("x"))(function() {
                                                            return discard13(t_1(" satisfait l'\xE9quation "))(function() {
                                                              return discard13(equation1(map11(function(v) {
                                                                var v1 = randomParam(v.value0);
                                                                return "x^2" + (function() {
                                                                  if (v1.a) {
                                                                    return "-";
                                                                  }
                                                                  ;
                                                                  return "+";
                                                                }() + (show3(v1.ab) + ("x" + (showInt2(pow2(v1.ab)(2) - pow2(v1.ac)(2) | 0) + "=0"))));
                                                              })(f0)))(function() {
                                                                return discard13(nl1)(function() {
                                                                  return discard13(nl1)(function() {
                                                                    return discard13(b_2("2")(dictFunctor)(dictMonadState))(function() {
                                                                      return discard13(m_1("\\bullet\\bullet\\circ\\;"))(function() {
                                                                        return discard13(t_1("R\xE9soudre cette \xE9quation, et en d\xE9duire la valeur de "))(function() {
                                                                          return discard13(m_1("BC."))(function() {
                                                                            return discard13(nl1)(function() {
                                                                              return t1(map11(function(v) {
                                                                                var v1 = randomParam(v.value0);
                                                                                if (v.value1) {
                                                                                  return "r\xE9ponse: " + rshow(div4(fromInt(function() {
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

  // output/Exercise2/index.js
  var discard3 = /* @__PURE__ */ discard(discardUnit);
  var map13 = /* @__PURE__ */ map(functorArray);
  var unsafeIndex5 = /* @__PURE__ */ unsafeIndex();
  var toArray4 = /* @__PURE__ */ toArray2(functorEvent);
  var map14 = /* @__PURE__ */ map(functorEvent);
  var fromJust5 = /* @__PURE__ */ fromJust();
  var maximum2 = /* @__PURE__ */ maximum(ordInt)(foldableArray);
  var show4 = /* @__PURE__ */ show(showInt);
  var toTuple2 = /* @__PURE__ */ toTuple(functorEvent);
  var sampleOnRight3 = /* @__PURE__ */ sampleOnRight(eventIsEvent);
  var pure7 = /* @__PURE__ */ pure(applicativeEvent);
  var attr5 = /* @__PURE__ */ attr(attrDiv_StyleString);
  var discard1 = /* @__PURE__ */ discard3(/* @__PURE__ */ bindStateT(monadIdentity));
  var functorStateT3 = /* @__PURE__ */ functorStateT(functorIdentity);
  var monadStateStateT3 = /* @__PURE__ */ monadStateStateT(monadIdentity);
  var t_2 = /* @__PURE__ */ t_(functorStateT3)(monadStateStateT3);
  var m2 = /* @__PURE__ */ m(functorStateT3)(monadStateStateT3);
  var get3 = /* @__PURE__ */ get2(monadStateStateT3);
  var foldMapWithIndex2 = /* @__PURE__ */ foldMapWithIndex(foldableWithIndexArray)(monoidString);
  var splits2 = /* @__PURE__ */ splits(functorEvent);
  var identity5 = /* @__PURE__ */ identity(categoryFn);
  var vec = function(u2) {
    return "\\overrightarrow{" + (u2 + "}");
  };
  var norm = function(u2) {
    return "\\left\\|" + (vec(u2) + "\\right\\|");
  };
  var problems2 = /* @__PURE__ */ function() {
    return [{
      q: [new Tuple(m$prime, "(" + (vec("u") + ("-" + (vec("v") + (") \\cdot(" + (vec("u") + ("+" + (vec("v") + ")")))))))), new Tuple(t$prime, " est toujours \xE9gal \xE0 ")],
      a: "2" + vec("u"),
      b: vec("u") + ("^2-" + (vec("v") + "^2")),
      c: vec("0"),
      r: "b"
    }, {
      q: [new Tuple(m$prime, "\\left\\|" + (vec("u") + "\\right\\|")), new Tuple(t$prime, " est toujours \xE9gal \xE0 ")],
      a: "\\sqrt{" + (vec("u") + ("\\cdot" + (vec("u") + "}"))),
      b: vec("u"),
      c: "\\left\\|" + (vec("u") + "\\right\\|^2"),
      r: "a"
    }, {
      q: [new Tuple(m$prime, "\\cos(" + (vec("u") + (";" + (vec("v") + ")")))), new Tuple(t$prime, " est toujours \xE9gal \xE0 ")],
      a: norm("u") + norm("v"),
      b: vec("u") + ("\\cdot" + vec("v")),
      c: "\\dfrac{" + (vec("u") + ("\\cdot" + (vec("v") + ("}{" + (norm("u") + (norm("v") + "}")))))),
      r: "c"
    }, {
      q: [new Tuple(m$prime, vec("u")), new Tuple(m$prime, "^2"), new Tuple(t$prime, " est toujours \xE9gal \xE0 ")],
      a: "2" + vec("u"),
      b: vec("u"),
      c: "\\left\\|" + (vec("u") + "\\right\\|^2"),
      r: "c"
    }, {
      q: [new Tuple(m$prime, vec("u") + ("\\cdot" + vec("v"))), new Tuple(t$prime, " est toujours \xE9gal \xE0 ")],
      a: norm("u") + norm("v"),
      b: vec("v") + ("\\cdot" + vec("u")),
      c: "-" + (vec("v") + ("\\cdot" + vec("u"))),
      r: "b"
    }, {
      q: [new Tuple(t$prime, "Soit "), new Tuple(m$prime, "(u_n)_{n\\in \\mathbb{N}}"), new Tuple(t$prime, " la suite d\xE9finie par "), new Tuple(m$prime, "u_n=2n^2-1"), new Tuple(t$prime, "."), nl$prime, new Tuple(t$prime, "L'expression de "), new Tuple(m$prime, "u_{n+1}"), new Tuple(t$prime, " est donn\xE9e par")],
      a: "u_{n+1}=2n^2+4n+1",
      b: "u_{n+1}=2n^2",
      c: "u_{n+1}=2n^2-2n",
      r: "a"
    }, {
      q: [new Tuple(t$prime, "Soit "), new Tuple(m$prime, "(u_n)_{n>1}"), new Tuple(t$prime, " la suite d\xE9finie par "), new Tuple(m$prime, "u_n=\\dfrac{1}{n-1}"), new Tuple(t$prime, "."), nl$prime, new Tuple(t$prime, "L'expression de "), new Tuple(m$prime, "u_{n+1}-u_n"), new Tuple(t$prime, " est donn\xE9e par")],
      a: "u_{n+1}-u_n=\\dfrac{1}{n(n-1)}",
      b: "u_{n+1}-u_n=\\dfrac{1}{n(1-n)}",
      c: "u_{n+1}-u_n=\\dfrac{n}{n-1}",
      r: "b"
    }, {
      q: [new Tuple(t$prime, "Soit "), new Tuple(m$prime, "f"), new Tuple(t$prime, " une fonction d\xE9finie sur "), new Tuple(m$prime, "\\mathbb{R}"), new Tuple(t$prime, ". Soit "), new Tuple(m$prime, "(u_n) "), new Tuple(t$prime, " la suite d\xE9finie par "), new Tuple(m$prime, "u_n=f(n)"), new Tuple(t$prime, "."), nl$prime, new Tuple(t$prime, "Pour d\xE9terminer les variations de "), new Tuple(m$prime, "(u_n)"), new Tuple(t$prime, ", il suffit de conna\xEEtre ")],
      a: "\\mathrm{les}\\;\\mathrm{signes}\\;\\mathrm{de}\\; f",
      b: "\\mathrm{les}\\;\\mathrm{variations}\\;\\mathrm{de}\\; f",
      c: "\\mathrm{les}\\;\\mathrm{signes}\\;\\mathrm{de}\\; (u_n)",
      r: "b"
    }, {
      q: [new Tuple(t$prime, "Soit "), new Tuple(m$prime, "f"), new Tuple(t$prime, " une fonction d\xE9finie sur "), new Tuple(m$prime, "\\mathbb{R}"), new Tuple(t$prime, ". Soit "), new Tuple(m$prime, "(u_n) "), new Tuple(t$prime, " une suite v\xE9rifiant "), new Tuple(m$prime, "u_{n+1}-u_n=f(n)"), new Tuple(t$prime, "."), nl$prime, new Tuple(t$prime, "Pour d\xE9terminer les variations de "), new Tuple(m$prime, "(u_n)"), new Tuple(t$prime, ", il suffit de conna\xEEtre ")],
      a: "\\mathrm{les}\\;\\mathrm{signes}\\;\\mathrm{de}\\; f",
      b: "\\mathrm{les}\\;\\mathrm{variations}\\;\\mathrm{de}\\; f",
      c: "\\mathrm{les}\\;\\mathrm{signes}\\;\\mathrm{de}\\; (u_n)",
      r: "a"
    }, {
      q: [new Tuple(t$prime, "Soit "), new Tuple(m$prime, "(u_n) "), new Tuple(t$prime, " une suite monotone v\xE9rifiant "), new Tuple(m$prime, "\\lim\\limits_{n\\to +\\infty} u_n = 3"), new Tuple(t$prime, "."), nl$prime, new Tuple(t$prime, "La ligne d\xE9finissant le d\xE9but de la boucle "), new Tuple(t$prime, "tir\xE9e d'un programme en Python illustrant la convergence "), new Tuple(t$prime, "de "), new Tuple(m$prime, "(u_n)"), new Tuple(t$prime, " est ")],
      a: "\\verb|while abs(u-3) < 0.0001:|",
      b: "\\verb|while abs(3+u) > 0.0001:|",
      c: "\\verb|while abs(3-u) > 0.0001:|",
      r: "c"
    }];
  }();
  var exo2 = function(dictFunctor) {
    var nl3 = nl(dictFunctor);
    var m_3 = m_(dictFunctor);
    var put4 = put2(dictFunctor);
    var t_1 = t_(dictFunctor);
    return function(dictMonadState) {
      var Monad0 = dictMonadState.Monad0();
      var discard22 = discard3(Monad0.Bind1());
      var nl1 = nl3(dictMonadState);
      var Applicative0 = Monad0.Applicative0();
      var forWithIndex_2 = forWithIndex_(Applicative0)(foldableWithIndexArray);
      var m_1 = m_3(dictMonadState);
      var for_5 = for_(Applicative0)(foldableArray);
      var put1 = put4(dictMonadState);
      var t_22 = t_1(dictMonadState);
      return function(f0) {
        return discard22(openSection_("Exercice II")("5 points")(dictFunctor)(dictMonadState))(function() {
          return discard22(em_2("Cet exercice est un questionnaire \xE0 choix multiple. Pour chaque question,")(dictFunctor)(dictMonadState))(function() {
            return discard22(em_2(" une seule des r\xE9ponses propos\xE9es est correcte. Une bonne r\xE9ponse rapporte 1 point, ")(dictFunctor)(dictMonadState))(function() {
              return discard22(em_2(" une mauvaise r\xE9ponse enl\xE8ve 1 point tant que la note globale reste positive. ")(dictFunctor)(dictMonadState))(function() {
                return discard22(em_2(" Une absence de r\xE9ponse n'apporte et n'enl\xE8ve aucun point. Aucune justification n'est exig\xE9e.")(dictFunctor)(dictMonadState))(function() {
                  var chosen_indices = function() {
                    var $63 = unsort(length(problems2));
                    return function($64) {
                      return $63(fst($64));
                    };
                  }();
                  var chosen_event = function($65) {
                    return function(arr) {
                      return take(5)(map13(function(i2) {
                        return unsafeIndex5(problems2)(i2);
                      })(arr));
                    }(chosen_indices($65));
                  };
                  var chosen_problems = toArray4(5)(map14(chosen_event)(f0));
                  var longestQuestion = fromJust5(maximum2(map13(length)(map13(function(v) {
                    return v.q;
                  })(problems2))));
                  return discard22(nl1)(function() {
                    return discard22(nl1)(function() {
                      return discard22(forWithIndex_2(chosen_problems)(function(i2) {
                        return function(p2) {
                          return discard22(b_2(show4(i2 + 1 | 0))(dictFunctor)(dictMonadState))(function() {
                            return discard22(m_1("\\bullet\\;"))(function() {
                              return discard22(for_5(toArray4(longestQuestion)(map14(function() {
                                var $66 = pad(longestQuestion);
                                return function($67) {
                                  return $66(function(v) {
                                    return v.q;
                                  }($67));
                                };
                              }())(p2)))(function(tupEv) {
                                var v = toTuple2(tupEv);
                                return put1(label(sampleOnRight3(v.value1)(v.value0))([]));
                              }))(function() {
                                return discard22(t_22(" :"))(function() {
                                  return discard22(nl1)(function() {
                                    return discard22(nl1)(function() {
                                      return discard22(put1(div2(pure7(attr5(Style.value)("display: grid; grid-template-columns: 1fr 1fr 1fr;")))([label_(fromIncremental(discard1(t_2("(a) "))(function() {
                                        return discard1(m2(map14(function(v) {
                                          return v.a;
                                        })(p2)))(function() {
                                          return get3;
                                        });
                                      }))), label_(fromIncremental(discard1(t_2("(b) "))(function() {
                                        return discard1(m2(map14(function(v) {
                                          return v.b;
                                        })(p2)))(function() {
                                          return get3;
                                        });
                                      }))), label_(fromIncremental(discard1(t_2("(c) "))(function() {
                                        return discard1(m2(map14(function(v) {
                                          return v.c;
                                        })(p2)))(function() {
                                          return get3;
                                        });
                                      })))])))(function() {
                                        return discard22(nl1)(function() {
                                          return nl1;
                                        });
                                      });
                                    });
                                  });
                                });
                              });
                            });
                          });
                        };
                      }))(function() {
                        return put1(label(map14(function(v) {
                          return t$prime(function() {
                            if (v.value0.value1) {
                              return "r\xE9ponses: " + foldMapWithIndex2(function(i2) {
                                return function(a2) {
                                  return " " + (show4(i2 + 1 | 0) + (") (" + (a2.r + ")")));
                                };
                              })(v.value1);
                            }
                            ;
                            return "";
                          }());
                        })(splits2(new Tuple(identity5, chosen_event))(f0)))([]));
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

  // output/Exercise3/index.js
  var discard4 = /* @__PURE__ */ discard(discardUnit);
  var map15 = /* @__PURE__ */ map(functorArray);
  var unsafeIndex6 = /* @__PURE__ */ unsafeIndex();
  var toArray5 = /* @__PURE__ */ toArray2(functorEvent);
  var map16 = /* @__PURE__ */ map(functorEvent);
  var show5 = /* @__PURE__ */ show(showInt);
  var foldMapWithIndex3 = /* @__PURE__ */ foldMapWithIndex(foldableWithIndexArray)(monoidString);
  var splits3 = /* @__PURE__ */ splits(functorEvent);
  var identity6 = /* @__PURE__ */ identity(categoryFn);
  var problems3 = [{
    domain: "n\\in\\mathbb{N}",
    sequence: "u_n=\\dfrac{2n+1}{n+3}",
    answer: "strictement croissante pour tout n"
  }, {
    domain: "n\\in\\mathbb{N}",
    sequence: "u_n=2n^2-3n-2",
    answer: "d\xE9croissante sur {0,1}, croissante sur pour n>=1"
  }, {
    domain: "n\\in\\mathbb{N}",
    sequence: "u_n=1+\\dfrac{1}{n+1}",
    answer: "d\xE9croissante pour tout n"
  }, {
    domain: "n\\in\\mathbb{N}",
    sequence: "u_n=\\dfrac{3n-1}{2-5n}",
    answer: "d\xE9croissante sur {0,1} puis croissante pour n>=1"
  }, {
    domain: "n\\geq 1",
    sequence: "u_n=\\dfrac{2^n}{n}",
    answer: "croissante pour n>=1"
  }];
  var exo3 = function(dictFunctor) {
    var m_3 = m_(dictFunctor);
    var t_4 = t_(dictFunctor);
    var m3 = m(dictFunctor);
    var nl3 = nl(dictFunctor);
    var put4 = put2(dictFunctor);
    return function(dictMonadState) {
      var Monad0 = dictMonadState.Monad0();
      var discard13 = discard4(Monad0.Bind1());
      var forWithIndex_2 = forWithIndex_(Monad0.Applicative0())(foldableWithIndexArray);
      var m_1 = m_3(dictMonadState);
      var t_1 = t_4(dictMonadState);
      var m1 = m3(dictMonadState);
      var nl1 = nl3(dictMonadState);
      var put1 = put4(dictMonadState);
      return function(f0) {
        return discard13(openSection_("Exercice III")("5 points")(dictFunctor)(dictMonadState))(function() {
          var chosen_indices = function() {
            var $40 = unsort(length(problems3));
            return function($41) {
              return $40(fst($41));
            };
          }();
          var chosen_event = function($42) {
            return function(arr) {
              return take(2)(map15(function(i2) {
                return unsafeIndex6(problems3)(i2);
              })(arr));
            }(chosen_indices($42));
          };
          var chosen_problems = toArray5(2)(map16(chosen_event)(f0));
          return discard13(forWithIndex_2(chosen_problems)(function(i2) {
            return function(p2) {
              return discard13(b_2(show5(i2 + 1 | 0))(dictFunctor)(dictMonadState))(function() {
                return discard13(m_1("\\bullet\\bullet\\circ\\;"))(function() {
                  return discard13(t_1("Soit "))(function() {
                    return discard13(m_1("(u_n)"))(function() {
                      return discard13(t_1(" la suite d\xE9finie par "))(function() {
                        return discard13(m1(map16(function(v) {
                          return v.sequence;
                        })(p2)))(function() {
                          return discard13(t_1(" pour tout "))(function() {
                            return discard13(m1(map16(function(v) {
                              return v.domain;
                            })(p2)))(function() {
                              return discard13(t_1("."))(function() {
                                return discard13(nl1)(function() {
                                  return discard13(t_1(" Etudier les variations de "))(function() {
                                    return discard13(m_1("(u_n)"))(function() {
                                      return discard13(t_1("."))(function() {
                                        return nl1;
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
          }))(function() {
            return put1(label(map16(function(v) {
              return t$prime(function() {
                if (v.value0.value1) {
                  return "r\xE9ponses: " + foldMapWithIndex3(function(i2) {
                    return function(p2) {
                      return " " + (show5(i2 + 1 | 0) + (") " + p2.answer));
                    };
                  })(v.value1);
                }
                ;
                return "";
              }());
            })(splits3(new Tuple(identity6, chosen_event))(f0)))([]));
          });
        });
      };
    };
  };

  // output/Exercise4/index.js
  var discard5 = /* @__PURE__ */ discard(discardUnit);
  var exo4 = function(dictFunctor) {
    var t_4 = t_(dictFunctor);
    var m_3 = m_(dictFunctor);
    var nl3 = nl(dictFunctor);
    return function(dictMonadState) {
      var discard13 = discard5(dictMonadState.Monad0().Bind1());
      var t_1 = t_4(dictMonadState);
      var m_1 = m_3(dictMonadState);
      var nl1 = nl3(dictMonadState);
      return function(v) {
        return discard13(openSection_("Exercice IV")("5 points")(dictFunctor)(dictMonadState))(function() {
          return discard13(t_1("Soit "))(function() {
            return discard13(m_1("(p_n)"))(function() {
              return discard13(t_1(" la suite d\xE9finie pour "))(function() {
                return discard13(m_1("n\\geq 2"))(function() {
                  return discard13(t_1(" par "))(function() {
                    return discard13(m_1("\\left\\{\\begin{array}{l}p_2=\\sqrt{6}\\\\p_{n+1}=\\sqrt{p_n^2+\\dfrac{6}{n^2}}\\end{array}\\right."))(function() {
                      return discard13(t_1("."))(function() {
                        return discard13(nl1)(function() {
                          return discard13(nl1)(function() {
                            return discard13(b_2("1")(dictFunctor)(dictMonadState))(function() {
                              return discard13(m_1("\\bullet\\bullet\\;"))(function() {
                                return discard13(t_1("Montrer que "))(function() {
                                  return discard13(m_1("p_n>0"))(function() {
                                    return discard13(t_1(" pour tout "))(function() {
                                      return discard13(m_1("n\\geq 2"))(function() {
                                        return discard13(t_1("."))(function() {
                                          return discard13(nl1)(function() {
                                            return discard13(b_2("2")(dictFunctor)(dictMonadState))(function() {
                                              return discard13(m_1("\\bullet\\bullet\\;"))(function() {
                                                return discard13(t_1("Montrer que "))(function() {
                                                  return discard13(m_1("(p_n)"))(function() {
                                                    return discard13(t_1(" est croissante pour tout "))(function() {
                                                      return discard13(m_1("n\\geq 2"))(function() {
                                                        return discard13(t_1("."))(function() {
                                                          return discard13(nl1)(function() {
                                                            return discard13(b_2("3")(dictFunctor)(dictMonadState))(function() {
                                                              return discard13(m_1("\\bullet\\;"))(function() {
                                                                return discard13(t_1("A l'aide de la calculatrice, dire si la suite semble convergente."))(function() {
                                                                  return discard13(nl1)(function() {
                                                                    return discard13(t_1("Si oui, conjecturer la valeur de sa limite quand "))(function() {
                                                                      return discard13(m_1("n"))(function() {
                                                                        return discard13(t_1(" tend vers "))(function() {
                                                                          return discard13(m_1("+\\infty"))(function() {
                                                                            return discard13(t_1("."))(function() {
                                                                              return discard13(nl1)(function() {
                                                                                return nl1;
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
        });
      };
    };
  };

  // output/Main/index.js
  var discard6 = /* @__PURE__ */ discard(discardUnit);
  var discard12 = /* @__PURE__ */ discard6(/* @__PURE__ */ bindStateT(monadIdentity));
  var functorStateT4 = /* @__PURE__ */ functorStateT(functorIdentity);
  var monadStateStateT4 = /* @__PURE__ */ monadStateStateT(monadIdentity);
  var nl2 = /* @__PURE__ */ nl(functorStateT4)(monadStateStateT4);
  var put3 = /* @__PURE__ */ put2(functorStateT4)(monadStateStateT4);
  var pure8 = /* @__PURE__ */ pure(applicativeEvent);
  var attr6 = /* @__PURE__ */ attr(attrDiv_StyleString);
  var t_3 = /* @__PURE__ */ t_(functorStateT4)(monadStateStateT4);
  var m_2 = /* @__PURE__ */ m_(functorStateT4)(monadStateStateT4);
  var get4 = /* @__PURE__ */ get2(monadStateStateT4);
  var abs4 = /* @__PURE__ */ abs(ordInt)(ringInt);
  var vbus2 = /* @__PURE__ */ vbus()(/* @__PURE__ */ vbusCons2({
    reflectSymbol: function() {
      return "enabled";
    }
  })()()(/* @__PURE__ */ vbusCons2({
    reflectSymbol: function() {
      return "textContent";
    }
  })()()(vbusNil)()())()());
  var map17 = /* @__PURE__ */ map(functorEvent);
  var splits4 = /* @__PURE__ */ splits(functorEvent);
  var exo12 = /* @__PURE__ */ exo1(functorStateT4)(monadStateStateT4);
  var exo22 = /* @__PURE__ */ exo2(functorStateT4)(monadStateStateT4);
  var exo32 = /* @__PURE__ */ exo3(functorStateT4)(monadStateStateT4);
  var exo42 = /* @__PURE__ */ exo4(functorStateT4)(monadStateStateT4);
  var alt6 = /* @__PURE__ */ alt(altEvent);
  var runningText2 = /* @__PURE__ */ runningText(functorEvent);
  var enterHit2 = /* @__PURE__ */ enterHit(functorEvent);
  var oneOfMap3 = /* @__PURE__ */ oneOfMap(foldableArray)(plusEvent);
  var attr12 = /* @__PURE__ */ attr(attrInput_SizeString);
  var attr23 = /* @__PURE__ */ attr(attrInput_AutofocusString);
  var header2 = /* @__PURE__ */ fromIncremental(/* @__PURE__ */ discard12(/* @__PURE__ */ setTitle_("Devoir 8 : Produit scalaire / Suites num\xE9riques")(functorStateT4)(monadStateStateT4))(function() {
    return discard12(nl2)(function() {
      return discard12(put3(div2(pure8(attr6(Style.value)("display: grid; grid-template-columns: 1fr 1fr 1fr;")))([label_([text_("Nom:")]), label_([text_("Pr\xE9nom:")]), label_([text_("Classe:")])])))(function() {
        return discard12(put3(ul_([li_([text_("4 exercices")]), li_(fromIncremental(discard12(t_3("5 points par exercice ("))(function() {
          return discard12(m_2("\\bullet"))(function() {
            return discard12(t_3(": 1 point, "))(function() {
              return discard12(m_2("\\circ"))(function() {
                return discard12(t_3(": "))(function() {
                  return discard12(m_2("\\frac{1}{2}"))(function() {
                    return discard12(t_3(" point)"))(function() {
                      return get4;
                    });
                  });
                });
              });
            });
          });
        }))), li_([text_("sans document")]), li_([text_("calculatrice n\xE9cessaire")])])))(function() {
          return get4;
        });
      });
    });
  }));
  var fromRelative = function(n) {
    var odd = (2 * abs4(n) | 0) + 1 | 0;
    return rand({
      val: odd,
      gen: 0,
      seed: odd * odd | 0
    });
  };
  var main2 = function __do2() {
    runInBody(div_(header2))();
    return runInBody(envy2(vbus2($$Proxy.value)(function(push2) {
      return function(event) {
        var doc = function(seed) {
          return function(enabled) {
            return div2(map17(function(v) {
              if (v) {
                return attr6(Style.value)("display: block;");
              }
              ;
              return attr6(Style.value)("display: none;");
            })(enabled))(function() {
              var f0 = splits4(new Tuple(fromRelative, function(v) {
                return v < 0;
              }))(seed);
              var f1 = map17(function(v) {
                return new Tuple(consume(30)(v.value0), v.value1);
              })(f0);
              var f2 = map17(function(v) {
                return new Tuple(consume(30)(v.value0), v.value1);
              })(f1);
              var f3 = map17(function(v) {
                return new Tuple(consume(30)(v.value0), v.value1);
              })(f2);
              return fromIncremental(discard12(nl2)(function() {
                return discard12(exo12(f1))(function() {
                  return discard12(exo22(f2))(function() {
                    return discard12(exo32(f3))(function() {
                      return discard12(exo42(f0))(function() {
                        return get4;
                      });
                    });
                  });
                });
              }));
            }());
          };
        };
        return div_([div_([label_([text_("Enonc\xE9 n\xB0 ")]), input(alt6(runningText2(pure8(push2.textContent)))(alt6(enterHit2(pure8(push2.enabled)))(oneOfMap3(pure8)([attr12(Size.value)("56"), attr23(Autofocus.value)("")]))))([])]), doc(map17(toSeed)(event.textContent))(alt6(pure8(false))(event.enabled))]);
      };
    })))();
  };

  // <stdin>
  main2();
})();
