#!/usr/bin/env node
(() => {
  // output/Control.Semigroupoid/index.js
  var semigroupoidFn = {
    compose: function(f) {
      return function(g2) {
        return function(x) {
          return f(g2(x));
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
    var map111 = map(dictFunctor);
    return function(fa) {
      return function(f) {
        return map111(f)(fa);
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
    var map26 = map(dictApply.Functor0());
    return function(a2) {
      return function(b2) {
        return apply1(map26($$const(identity2))(a2))(b2);
      };
    };
  };
  var lift2 = function(dictApply) {
    var apply1 = apply(dictApply);
    var map26 = map(dictApply.Functor0());
    return function(f) {
      return function(a2) {
        return function(b2) {
          return apply1(map26(f)(a2))(b2);
        };
      };
    };
  };

  // output/Control.Applicative/index.js
  var pure = function(dict) {
    return dict.pure;
  };
  var liftA1 = function(dictApplicative) {
    var apply5 = apply(dictApplicative.Apply0());
    var pure17 = pure(dictApplicative);
    return function(f) {
      return function(a2) {
        return apply5(pure17(f))(a2);
      };
    };
  };

  // output/Control.Bind/index.js
  var identity3 = /* @__PURE__ */ identity(categoryFn);
  var discard = function(dict) {
    return dict.discard;
  };
  var bind = function(dict) {
    return dict.bind;
  };
  var bindFlipped = function(dictBind) {
    return flip(bind(dictBind));
  };
  var composeKleisli = function(dictBind) {
    var bind1 = bind(dictBind);
    return function(f) {
      return function(g2) {
        return function(a2) {
          return bind1(f(a2))(g2);
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
    var bind1 = bind(dictBind);
    return function(m2) {
      return bind1(m2)(identity3);
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
    return function(eq5) {
      return function(gt) {
        return function(x) {
          return function(y) {
            return x < y ? lt : x === y ? eq5 : gt;
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
    var eq5 = eq(dictEq);
    return function(dictEuclideanRing) {
      var zero2 = zero(dictEuclideanRing.CommutativeRing0().Ring0().Semiring0());
      var mod1 = mod(dictEuclideanRing);
      return function(a2) {
        return function(b2) {
          var $24 = eq5(b2)(zero2);
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
  var semigroupFn = function(dictSemigroup) {
    var append13 = append(dictSemigroup);
    return {
      append: function(f) {
        return function(g2) {
          return function(x) {
            return append13(f(x))(g2(x));
          };
        };
      }
    };
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
  var monoidFn = function(dictMonoid) {
    var mempty13 = mempty(dictMonoid);
    var semigroupFn2 = semigroupFn(dictMonoid.Semigroup0());
    return {
      mempty: function(v) {
        return mempty13;
      },
      Semigroup0: function() {
        return semigroupFn2;
      }
    };
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
  var curry = function(f) {
    return function(a2) {
      return function(b2) {
        return f(new Tuple(a2, b2));
      };
    };
  };

  // output/Control.Monad.Writer.Class/index.js
  var tell = function(dict) {
    return dict.tell;
  };

  // output/Control.Alt/index.js
  var altArray = {
    alt: /* @__PURE__ */ append(semigroupArray),
    Functor0: function() {
      return functorArray;
    }
  };
  var alt = function(dict) {
    return dict.alt;
  };

  // output/Data.Maybe/index.js
  var identity4 = /* @__PURE__ */ identity(categoryFn);
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
    return maybe(a2)(identity4);
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
  var applicativeMaybe = /* @__PURE__ */ function() {
    return {
      pure: Just.create,
      Apply0: function() {
        return applyMaybe;
      }
    };
  }();

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

  // output/Control.Monad/index.js
  var ap = function(dictMonad) {
    var bind7 = bind(dictMonad.Bind1());
    var pure17 = pure(dictMonad.Applicative0());
    return function(f) {
      return function(a2) {
        return bind7(f)(function(f$prime) {
          return bind7(a2)(function(a$prime) {
            return pure17(f$prime(a$prime));
          });
        });
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
  var modify = function(f) {
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
      return $$void2(modify(f)(s2));
    };
  };

  // output/Control.Monad.State.Class/index.js
  var state = function(dict) {
    return dict.state;
  };

  // output/Control.Plus/index.js
  var plusArray = {
    empty: [],
    Alt0: function() {
      return altArray;
    }
  };
  var empty = function(dict) {
    return dict.empty;
  };

  // output/Control.Monad.Writer.Trans/index.js
  var WriterT = function(x) {
    return x;
  };
  var runWriterT = function(v) {
    return v;
  };
  var mapWriterT = function(f) {
    return function(v) {
      return f(v);
    };
  };
  var functorWriterT = function(dictFunctor) {
    var map26 = map(dictFunctor);
    return {
      map: function(f) {
        return mapWriterT(map26(function(v) {
          return new Tuple(f(v.value0), v.value1);
        }));
      }
    };
  };
  var applyWriterT = function(dictSemigroup) {
    var append8 = append(dictSemigroup);
    return function(dictApply) {
      var apply5 = apply(dictApply);
      var Functor0 = dictApply.Functor0();
      var map26 = map(Functor0);
      var functorWriterT1 = functorWriterT(Functor0);
      return {
        apply: function(v) {
          return function(v1) {
            var k = function(v3) {
              return function(v4) {
                return new Tuple(v3.value0(v4.value0), append8(v3.value1)(v4.value1));
              };
            };
            return apply5(map26(k)(v))(v1);
          };
        },
        Functor0: function() {
          return functorWriterT1;
        }
      };
    };
  };
  var bindWriterT = function(dictSemigroup) {
    var append8 = append(dictSemigroup);
    var applyWriterT1 = applyWriterT(dictSemigroup);
    return function(dictBind) {
      var bind7 = bind(dictBind);
      var Apply0 = dictBind.Apply0();
      var map26 = map(Apply0.Functor0());
      var applyWriterT2 = applyWriterT1(Apply0);
      return {
        bind: function(v) {
          return function(k) {
            return bind7(v)(function(v1) {
              var v2 = k(v1.value0);
              return map26(function(v3) {
                return new Tuple(v3.value0, append8(v1.value1)(v3.value1));
              })(v2);
            });
          };
        },
        Apply0: function() {
          return applyWriterT2;
        }
      };
    };
  };
  var applicativeWriterT = function(dictMonoid) {
    var mempty5 = mempty(dictMonoid);
    var applyWriterT1 = applyWriterT(dictMonoid.Semigroup0());
    return function(dictApplicative) {
      var pure17 = pure(dictApplicative);
      var applyWriterT2 = applyWriterT1(dictApplicative.Apply0());
      return {
        pure: function(a2) {
          return pure17(new Tuple(a2, mempty5));
        },
        Apply0: function() {
          return applyWriterT2;
        }
      };
    };
  };
  var monadWriterT = function(dictMonoid) {
    var applicativeWriterT1 = applicativeWriterT(dictMonoid);
    var bindWriterT1 = bindWriterT(dictMonoid.Semigroup0());
    return function(dictMonad) {
      var applicativeWriterT22 = applicativeWriterT1(dictMonad.Applicative0());
      var bindWriterT2 = bindWriterT1(dictMonad.Bind1());
      return {
        Applicative0: function() {
          return applicativeWriterT22;
        },
        Bind1: function() {
          return bindWriterT2;
        }
      };
    };
  };
  var monadTellWriterT = function(dictMonoid) {
    var Semigroup0 = dictMonoid.Semigroup0();
    var monadWriterT1 = monadWriterT(dictMonoid);
    return function(dictMonad) {
      var monadWriterT2 = monadWriterT1(dictMonad);
      return {
        tell: function() {
          var $252 = pure(dictMonad.Applicative0());
          var $253 = Tuple.create(unit);
          return function($254) {
            return WriterT($252($253($254)));
          };
        }(),
        Semigroup0: function() {
          return Semigroup0;
        },
        Monad1: function() {
          return monadWriterT2;
        }
      };
    };
  };

  // output/Data.Array/foreign.js
  var rangeImpl = function(start2, end) {
    var step2 = start2 > end ? -1 : 1;
    var result = new Array(step2 * (end - start2) + 1);
    var i2 = start2, n = 0;
    while (i2 !== end) {
      result[n++] = i2;
      i2 += step2;
    }
    result[n] = i2;
    return result;
  };
  var replicateFill = function(count2, value12) {
    if (count2 < 1) {
      return [];
    }
    var result = new Array(count2);
    return result.fill(value12);
  };
  var replicatePolyfill = function(count2, value12) {
    var result = [];
    var n = 0;
    for (var i2 = 0; i2 < count2; i2++) {
      result[n++] = value12;
    }
    return result;
  };
  var replicateImpl = typeof Array.prototype.fill === "function" ? replicateFill : replicatePolyfill;
  var fromFoldableImpl = function() {
    function Cons2(head4, tail2) {
      this.head = head4;
      this.tail = tail2;
    }
    var emptyList = {};
    function curryCons(head4) {
      return function(tail2) {
        return new Cons2(head4, tail2);
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
    return function(foldr6, xs) {
      return listToArray(foldr6(curryCons)(emptyList)(xs));
    };
  }();
  var length = function(xs) {
    return xs.length;
  };
  var indexImpl = function(just, nothing, xs, i2) {
    return i2 < 0 || i2 >= xs.length ? nothing : just(xs[i2]);
  };
  var findIndexImpl = function(just, nothing, f, xs) {
    for (var i2 = 0, l = xs.length; i2 < l; i2++) {
      if (f(xs[i2]))
        return just(i2);
    }
    return nothing;
  };
  var _deleteAt = function(just, nothing, i2, l) {
    if (i2 < 0 || i2 >= l.length)
      return nothing;
    var l1 = l.slice();
    l1.splice(i2, 1);
    return just(l1);
  };
  var sortByImpl = function() {
    function mergeFromTo(compare3, fromOrdering, xs1, xs2, from3, to2) {
      var mid;
      var i2;
      var j;
      var k;
      var x;
      var y;
      var c;
      mid = from3 + (to2 - from3 >> 1);
      if (mid - from3 > 1)
        mergeFromTo(compare3, fromOrdering, xs2, xs1, from3, mid);
      if (to2 - mid > 1)
        mergeFromTo(compare3, fromOrdering, xs2, xs1, mid, to2);
      i2 = from3;
      j = mid;
      k = from3;
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
    return function(compare3, fromOrdering, xs) {
      var out;
      if (xs.length < 2)
        return xs;
      out = xs.slice(0);
      mergeFromTo(compare3, fromOrdering, out, xs.slice(0), 0, xs.length);
      return out;
    };
  }();
  var sliceImpl = function(s2, e, l) {
    return l.slice(s2, e);
  };
  var unsafeIndexImpl = function(xs, n) {
    return xs[n];
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
  var modify2 = function(f) {
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
  var lift23 = /* @__PURE__ */ lift2(applyST);
  var pure2 = /* @__PURE__ */ pure(applicativeST);
  var semigroupST = function(dictSemigroup) {
    return {
      append: lift23(append(dictSemigroup))
    };
  };
  var monoidST = function(dictMonoid) {
    var semigroupST1 = semigroupST(dictMonoid.Semigroup0());
    return {
      mempty: pure2(mempty(dictMonoid)),
      Semigroup0: function() {
        return semigroupST1;
      }
    };
  };

  // output/Data.Array.ST/foreign.js
  function newSTArray() {
    return [];
  }
  var pushAllImpl = function(as, xs) {
    return xs.push.apply(xs, as);
  };
  var spliceImpl = function(i2, howMany, bs, xs) {
    return xs.splice.apply(xs, [i2, howMany].concat(bs));
  };
  function copyImpl(xs) {
    return xs.slice();
  }
  var freezeImpl = copyImpl;
  var sortByImpl2 = function() {
    function mergeFromTo(compare3, fromOrdering, xs1, xs2, from3, to2) {
      var mid;
      var i2;
      var j;
      var k;
      var x;
      var y;
      var c;
      mid = from3 + (to2 - from3 >> 1);
      if (mid - from3 > 1)
        mergeFromTo(compare3, fromOrdering, xs2, xs1, from3, mid);
      if (to2 - mid > 1)
        mergeFromTo(compare3, fromOrdering, xs2, xs1, mid, to2);
      i2 = from3;
      j = mid;
      k = from3;
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
    return function(compare3, fromOrdering, xs) {
      if (xs.length < 2)
        return xs;
      mergeFromTo(compare3, fromOrdering, xs, xs.slice(0), 0, xs.length);
      return xs;
    };
  }();

  // output/Control.Monad.ST.Uncurried/foreign.js
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
  var runSTFn4 = function runSTFn42(fn) {
    return function(a2) {
      return function(b2) {
        return function(c) {
          return function(d) {
            return function() {
              return fn(a2, b2, c, d);
            };
          };
        };
      };
    };
  };

  // output/Data.Array.ST/index.js
  var splice = /* @__PURE__ */ runSTFn4(spliceImpl);
  var push = function(a2) {
    return runSTFn2(pushAllImpl)([a2]);
  };
  var freeze = /* @__PURE__ */ runSTFn1(freezeImpl);

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

  // output/Data.Foldable/index.js
  var foldr = function(dict) {
    return dict.foldr;
  };
  var traverse_ = function(dictApplicative) {
    var applySecond3 = applySecond(dictApplicative.Apply0());
    var pure17 = pure(dictApplicative);
    return function(dictFoldable) {
      var foldr22 = foldr(dictFoldable);
      return function(f) {
        return foldr22(function($454) {
          return applySecond3(f($454));
        })(pure17(unit));
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
  var foldableMaybe = {
    foldr: function(v) {
      return function(v1) {
        return function(v2) {
          if (v2 instanceof Nothing) {
            return v1;
          }
          ;
          if (v2 instanceof Just) {
            return v(v2.value0)(v1);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
        };
      };
    },
    foldl: function(v) {
      return function(v1) {
        return function(v2) {
          if (v2 instanceof Nothing) {
            return v1;
          }
          ;
          if (v2 instanceof Just) {
            return v(v1)(v2.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
        };
      };
    },
    foldMap: function(dictMonoid) {
      var mempty5 = mempty(dictMonoid);
      return function(v) {
        return function(v1) {
          if (v1 instanceof Nothing) {
            return mempty5;
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
      var append8 = append(dictMonoid.Semigroup0());
      var mempty5 = mempty(dictMonoid);
      return function(f) {
        return foldr22(function(x) {
          return function(acc) {
            return append8(f(x))(acc);
          };
        })(mempty5);
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

  // output/Data.Function.Uncurried/foreign.js
  var runFn2 = function(fn) {
    return function(a2) {
      return function(b2) {
        return fn(a2, b2);
      };
    };
  };
  var runFn3 = function(fn) {
    return function(a2) {
      return function(b2) {
        return function(c) {
          return fn(a2, b2, c);
        };
      };
    };
  };
  var runFn4 = function(fn) {
    return function(a2) {
      return function(b2) {
        return function(c) {
          return function(d) {
            return fn(a2, b2, c, d);
          };
        };
      };
    };
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
  var mapWithIndex = function(dict) {
    return dict.mapWithIndex;
  };
  var functorWithIndexArray = {
    mapWithIndex: mapWithIndexArray,
    Functor0: function() {
      return functorArray;
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
    return function(apply5) {
      return function(map26) {
        return function(pure17) {
          return function(f) {
            return function(array) {
              function go2(bot, top3) {
                switch (top3 - bot) {
                  case 0:
                    return pure17([]);
                  case 1:
                    return map26(array1)(f(array[bot]));
                  case 2:
                    return apply5(map26(array2)(f(array[bot])))(f(array[bot + 1]));
                  case 3:
                    return apply5(apply5(map26(array3)(f(array[bot])))(f(array[bot + 1])))(f(array[bot + 2]));
                  default:
                    var pivot = bot + Math.floor((top3 - bot) / 4) * 2;
                    return apply5(map26(concat2)(go2(bot, pivot)))(go2(pivot, top3));
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
    return runFn2(unsafeIndexImpl);
  };
  var slice = /* @__PURE__ */ runFn3(sliceImpl);
  var take = function(n) {
    return function(xs) {
      var $152 = n < 1;
      if ($152) {
        return [];
      }
      ;
      return slice(0)(n)(xs);
    };
  };
  var range2 = /* @__PURE__ */ runFn2(rangeImpl);
  var index = /* @__PURE__ */ function() {
    return runFn4(indexImpl)(Just.create)(Nothing.value);
  }();
  var last = function(xs) {
    return index(xs)(length(xs) - 1 | 0);
  };
  var foldr2 = /* @__PURE__ */ foldr(foldableArray);
  var findIndex = /* @__PURE__ */ function() {
    return runFn4(findIndexImpl)(Just.create)(Nothing.value);
  }();
  var deleteAt = /* @__PURE__ */ function() {
    return runFn4(_deleteAt)(Just.create)(Nothing.value);
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

  // output/Data.FoldableWithIndex/index.js
  var foldr8 = /* @__PURE__ */ foldr(foldableArray);
  var mapWithIndex2 = /* @__PURE__ */ mapWithIndex(functorWithIndexArray);
  var foldl8 = /* @__PURE__ */ foldl(foldableArray);
  var foldrWithIndex = function(dict) {
    return dict.foldrWithIndex;
  };
  var traverseWithIndex_ = function(dictApplicative) {
    var applySecond3 = applySecond(dictApplicative.Apply0());
    var pure17 = pure(dictApplicative);
    return function(dictFoldableWithIndex) {
      var foldrWithIndex1 = foldrWithIndex(dictFoldableWithIndex);
      return function(f) {
        return foldrWithIndex1(function(i2) {
          var $289 = f(i2);
          return function($290) {
            return applySecond3($289($290));
          };
        })(pure17(unit));
      };
    };
  };
  var forWithIndex_ = function(dictApplicative) {
    var traverseWithIndex_1 = traverseWithIndex_(dictApplicative);
    return function(dictFoldableWithIndex) {
      return flip(traverseWithIndex_1(dictFoldableWithIndex));
    };
  };
  var foldMapWithIndexDefaultR = function(dictFoldableWithIndex) {
    var foldrWithIndex1 = foldrWithIndex(dictFoldableWithIndex);
    return function(dictMonoid) {
      var append8 = append(dictMonoid.Semigroup0());
      var mempty5 = mempty(dictMonoid);
      return function(f) {
        return foldrWithIndex1(function(i2) {
          return function(x) {
            return function(acc) {
              return append8(f(i2)(x))(acc);
            };
          };
        })(mempty5);
      };
    };
  };
  var foldableWithIndexArray = {
    foldrWithIndex: function(f) {
      return function(z) {
        var $291 = foldr8(function(v) {
          return function(y) {
            return f(v.value0)(v.value1)(y);
          };
        })(z);
        var $292 = mapWithIndex2(Tuple.create);
        return function($293) {
          return $291($292($293));
        };
      };
    },
    foldlWithIndex: function(f) {
      return function(z) {
        var $294 = foldl8(function(y) {
          return function(v) {
            return f(v.value0)(y)(v.value1);
          };
        })(z);
        var $295 = mapWithIndex2(Tuple.create);
        return function($296) {
          return $294($295($296));
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
    function Nil2() {
    }
    ;
    Nil2.value = new Nil2();
    return Nil2;
  }();
  var Cons = /* @__PURE__ */ function() {
    function Cons2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Cons2.create = function(value0) {
      return function(value1) {
        return new Cons2(value0, value1);
      };
    };
    return Cons2;
  }();
  var foldableList = {
    foldr: function(f) {
      return function(b2) {
        var rev3 = function() {
          var go2 = function($copy_v) {
            return function($copy_v1) {
              var $tco_var_v = $copy_v;
              var $tco_done = false;
              var $tco_result;
              function $tco_loop(v, v1) {
                if (v1 instanceof Nil) {
                  $tco_done = true;
                  return v;
                }
                ;
                if (v1 instanceof Cons) {
                  $tco_var_v = new Cons(v1.value0, v);
                  $copy_v1 = v1.value1;
                  return;
                }
                ;
                throw new Error("Failed pattern match at Data.List.Types (line 107, column 7 - line 107, column 23): " + [v.constructor.name, v1.constructor.name]);
              }
              ;
              while (!$tco_done) {
                $tco_result = $tco_loop($tco_var_v, $copy_v1);
              }
              ;
              return $tco_result;
            };
          };
          return go2(Nil.value);
        }();
        var $284 = foldl(foldableList)(flip(f))(b2);
        return function($285) {
          return $284(rev3($285));
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
      var mempty5 = mempty(dictMonoid);
      return function(f) {
        return foldl(foldableList)(function(acc) {
          var $286 = append22(acc);
          return function($287) {
            return $286(f($287));
          };
        })(mempty5);
      };
    }
  };

  // output/Data.Map.Internal/index.js
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
  var Leaf = /* @__PURE__ */ function() {
    function Leaf2() {
    }
    ;
    Leaf2.value = new Leaf2();
    return Leaf2;
  }();
  var Node = /* @__PURE__ */ function() {
    function Node2(value0, value1, value22, value32, value42, value52) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
      this.value4 = value42;
      this.value5 = value52;
    }
    ;
    Node2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return function(value42) {
              return function(value52) {
                return new Node2(value0, value1, value22, value32, value42, value52);
              };
            };
          };
        };
      };
    };
    return Node2;
  }();
  var Split = /* @__PURE__ */ function() {
    function Split2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    Split2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new Split2(value0, value1, value22);
        };
      };
    };
    return Split2;
  }();
  var SplitLast = /* @__PURE__ */ function() {
    function SplitLast2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    SplitLast2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new SplitLast2(value0, value1, value22);
        };
      };
    };
    return SplitLast2;
  }();
  var unsafeNode = function(k, v, l, r) {
    if (l instanceof Leaf) {
      if (r instanceof Leaf) {
        return new Node(1, 1, k, v, l, r);
      }
      ;
      if (r instanceof Node) {
        return new Node(1 + r.value0 | 0, 1 + r.value1 | 0, k, v, l, r);
      }
      ;
      throw new Error("Failed pattern match at Data.Map.Internal (line 680, column 5 - line 684, column 39): " + [r.constructor.name]);
    }
    ;
    if (l instanceof Node) {
      if (r instanceof Leaf) {
        return new Node(1 + l.value0 | 0, 1 + l.value1 | 0, k, v, l, r);
      }
      ;
      if (r instanceof Node) {
        return new Node(1 + function() {
          var $277 = l.value0 > r.value0;
          if ($277) {
            return l.value0;
          }
          ;
          return r.value0;
        }() | 0, (1 + l.value1 | 0) + r.value1 | 0, k, v, l, r);
      }
      ;
      throw new Error("Failed pattern match at Data.Map.Internal (line 686, column 5 - line 690, column 68): " + [r.constructor.name]);
    }
    ;
    throw new Error("Failed pattern match at Data.Map.Internal (line 678, column 32 - line 690, column 68): " + [l.constructor.name]);
  };
  var singleton3 = function(k) {
    return function(v) {
      return new Node(1, 1, k, v, Leaf.value, Leaf.value);
    };
  };
  var unsafeBalancedNode = /* @__PURE__ */ function() {
    var height8 = function(v) {
      if (v instanceof Leaf) {
        return 0;
      }
      ;
      if (v instanceof Node) {
        return v.value0;
      }
      ;
      throw new Error("Failed pattern match at Data.Map.Internal (line 735, column 12 - line 737, column 26): " + [v.constructor.name]);
    };
    var rotateLeft = function(k, v, l, rk, rv, rl, rr) {
      if (rl instanceof Node && rl.value0 > height8(rr)) {
        return unsafeNode(rl.value2, rl.value3, unsafeNode(k, v, l, rl.value4), unsafeNode(rk, rv, rl.value5, rr));
      }
      ;
      return unsafeNode(rk, rv, unsafeNode(k, v, l, rl), rr);
    };
    var rotateRight = function(k, v, lk, lv, ll, lr, r) {
      if (lr instanceof Node && height8(ll) <= lr.value0) {
        return unsafeNode(lr.value2, lr.value3, unsafeNode(lk, lv, ll, lr.value4), unsafeNode(k, v, lr.value5, r));
      }
      ;
      return unsafeNode(lk, lv, ll, unsafeNode(k, v, lr, r));
    };
    return function(k, v, l, r) {
      if (l instanceof Leaf) {
        if (r instanceof Leaf) {
          return singleton3(k)(v);
        }
        ;
        if (r instanceof Node && r.value0 > 1) {
          return rotateLeft(k, v, l, r.value2, r.value3, r.value4, r.value5);
        }
        ;
        return unsafeNode(k, v, l, r);
      }
      ;
      if (l instanceof Node) {
        if (r instanceof Node) {
          if (r.value0 > (l.value0 + 1 | 0)) {
            return rotateLeft(k, v, l, r.value2, r.value3, r.value4, r.value5);
          }
          ;
          if (l.value0 > (r.value0 + 1 | 0)) {
            return rotateRight(k, v, l.value2, l.value3, l.value4, l.value5, r);
          }
          ;
        }
        ;
        if (r instanceof Leaf && l.value0 > 1) {
          return rotateRight(k, v, l.value2, l.value3, l.value4, l.value5, r);
        }
        ;
        return unsafeNode(k, v, l, r);
      }
      ;
      throw new Error("Failed pattern match at Data.Map.Internal (line 695, column 40 - line 716, column 34): " + [l.constructor.name]);
    };
  }();
  var $lazy_unsafeSplit = /* @__PURE__ */ $runtime_lazy3("unsafeSplit", "Data.Map.Internal", function() {
    return function(comp, k, m2) {
      if (m2 instanceof Leaf) {
        return new Split(Nothing.value, Leaf.value, Leaf.value);
      }
      ;
      if (m2 instanceof Node) {
        var v = comp(k)(m2.value2);
        if (v instanceof LT) {
          var v1 = $lazy_unsafeSplit(771)(comp, k, m2.value4);
          return new Split(v1.value0, v1.value1, unsafeBalancedNode(m2.value2, m2.value3, v1.value2, m2.value5));
        }
        ;
        if (v instanceof GT) {
          var v1 = $lazy_unsafeSplit(774)(comp, k, m2.value5);
          return new Split(v1.value0, unsafeBalancedNode(m2.value2, m2.value3, m2.value4, v1.value1), v1.value2);
        }
        ;
        if (v instanceof EQ) {
          return new Split(new Just(m2.value3), m2.value4, m2.value5);
        }
        ;
        throw new Error("Failed pattern match at Data.Map.Internal (line 769, column 5 - line 777, column 30): " + [v.constructor.name]);
      }
      ;
      throw new Error("Failed pattern match at Data.Map.Internal (line 765, column 34 - line 777, column 30): " + [m2.constructor.name]);
    };
  });
  var unsafeSplit = /* @__PURE__ */ $lazy_unsafeSplit(764);
  var $lazy_unsafeSplitLast = /* @__PURE__ */ $runtime_lazy3("unsafeSplitLast", "Data.Map.Internal", function() {
    return function(k, v, l, r) {
      if (r instanceof Leaf) {
        return new SplitLast(k, v, l);
      }
      ;
      if (r instanceof Node) {
        var v1 = $lazy_unsafeSplitLast(757)(r.value2, r.value3, r.value4, r.value5);
        return new SplitLast(v1.value0, v1.value1, unsafeBalancedNode(k, v, l, v1.value2));
      }
      ;
      throw new Error("Failed pattern match at Data.Map.Internal (line 754, column 37 - line 758, column 57): " + [r.constructor.name]);
    };
  });
  var unsafeSplitLast = /* @__PURE__ */ $lazy_unsafeSplitLast(753);
  var unsafeJoinNodes = function(v, v1) {
    if (v instanceof Leaf) {
      return v1;
    }
    ;
    if (v instanceof Node) {
      var v2 = unsafeSplitLast(v.value2, v.value3, v.value4, v.value5);
      return unsafeBalancedNode(v2.value0, v2.value1, v2.value2, v1);
    }
    ;
    throw new Error("Failed pattern match at Data.Map.Internal (line 742, column 25 - line 746, column 38): " + [v.constructor.name, v1.constructor.name]);
  };
  var $lazy_unsafeUnionWith = /* @__PURE__ */ $runtime_lazy3("unsafeUnionWith", "Data.Map.Internal", function() {
    return function(comp, app, l, r) {
      if (l instanceof Leaf) {
        return r;
      }
      ;
      if (r instanceof Leaf) {
        return l;
      }
      ;
      if (r instanceof Node) {
        var v = unsafeSplit(comp, r.value2, l);
        var l$prime = $lazy_unsafeUnionWith(787)(comp, app, v.value1, r.value4);
        var r$prime = $lazy_unsafeUnionWith(788)(comp, app, v.value2, r.value5);
        if (v.value0 instanceof Just) {
          return unsafeBalancedNode(r.value2, app(v.value0.value0)(r.value3), l$prime, r$prime);
        }
        ;
        if (v.value0 instanceof Nothing) {
          return unsafeBalancedNode(r.value2, r.value3, l$prime, r$prime);
        }
        ;
        throw new Error("Failed pattern match at Data.Map.Internal (line 789, column 5 - line 793, column 46): " + [v.value0.constructor.name]);
      }
      ;
      throw new Error("Failed pattern match at Data.Map.Internal (line 782, column 42 - line 793, column 46): " + [l.constructor.name, r.constructor.name]);
    };
  });
  var unsafeUnionWith = /* @__PURE__ */ $lazy_unsafeUnionWith(781);
  var unionWith = function(dictOrd) {
    var compare3 = compare(dictOrd);
    return function(app) {
      return function(m1) {
        return function(m2) {
          return unsafeUnionWith(compare3, app, m1, m2);
        };
      };
    };
  };
  var union = function(dictOrd) {
    return unionWith(dictOrd)($$const);
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
          if (v instanceof Node) {
            var v1 = compare3(k)(v.value2);
            if (v1 instanceof LT) {
              $copy_v = v.value4;
              return;
            }
            ;
            if (v1 instanceof GT) {
              $copy_v = v.value5;
              return;
            }
            ;
            if (v1 instanceof EQ) {
              $tco_done = true;
              return new Just(v.value3);
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 281, column 7 - line 284, column 22): " + [v1.constructor.name]);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 278, column 8 - line 284, column 22): " + [v.constructor.name]);
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
  var foldableMap = {
    foldr: function(f) {
      return function(z) {
        var $lazy_go = $runtime_lazy3("go", "Data.Map.Internal", function() {
          return function(m$prime2, z$prime) {
            if (m$prime2 instanceof Leaf) {
              return z$prime;
            }
            ;
            if (m$prime2 instanceof Node) {
              return $lazy_go(170)(m$prime2.value4, f(m$prime2.value3)($lazy_go(170)(m$prime2.value5, z$prime)));
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 167, column 26 - line 170, column 43): " + [m$prime2.constructor.name]);
          };
        });
        var go2 = $lazy_go(167);
        return function(m2) {
          return go2(m2, z);
        };
      };
    },
    foldl: function(f) {
      return function(z) {
        var $lazy_go = $runtime_lazy3("go", "Data.Map.Internal", function() {
          return function(z$prime, m$prime2) {
            if (m$prime2 instanceof Leaf) {
              return z$prime;
            }
            ;
            if (m$prime2 instanceof Node) {
              return $lazy_go(176)(f($lazy_go(176)(z$prime, m$prime2.value4))(m$prime2.value3), m$prime2.value5);
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 173, column 26 - line 176, column 43): " + [m$prime2.constructor.name]);
          };
        });
        var go2 = $lazy_go(173);
        return function(m2) {
          return go2(z, m2);
        };
      };
    },
    foldMap: function(dictMonoid) {
      var mempty5 = mempty(dictMonoid);
      var append13 = append(dictMonoid.Semigroup0());
      return function(f) {
        var go2 = function(v) {
          if (v instanceof Leaf) {
            return mempty5;
          }
          ;
          if (v instanceof Node) {
            return append13(go2(v.value4))(append13(f(v.value3))(go2(v.value5)));
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 179, column 10 - line 182, column 28): " + [v.constructor.name]);
        };
        return go2;
      };
    }
  };
  var foldableWithIndexMap = {
    foldrWithIndex: function(f) {
      return function(z) {
        var $lazy_go = $runtime_lazy3("go", "Data.Map.Internal", function() {
          return function(m$prime2, z$prime) {
            if (m$prime2 instanceof Leaf) {
              return z$prime;
            }
            ;
            if (m$prime2 instanceof Node) {
              return $lazy_go(190)(m$prime2.value4, f(m$prime2.value2)(m$prime2.value3)($lazy_go(190)(m$prime2.value5, z$prime)));
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 187, column 26 - line 190, column 45): " + [m$prime2.constructor.name]);
          };
        });
        var go2 = $lazy_go(187);
        return function(m2) {
          return go2(m2, z);
        };
      };
    },
    foldlWithIndex: function(f) {
      return function(z) {
        var $lazy_go = $runtime_lazy3("go", "Data.Map.Internal", function() {
          return function(z$prime, m$prime2) {
            if (m$prime2 instanceof Leaf) {
              return z$prime;
            }
            ;
            if (m$prime2 instanceof Node) {
              return $lazy_go(196)(f(m$prime2.value2)($lazy_go(196)(z$prime, m$prime2.value4))(m$prime2.value3), m$prime2.value5);
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 193, column 26 - line 196, column 45): " + [m$prime2.constructor.name]);
          };
        });
        var go2 = $lazy_go(193);
        return function(m2) {
          return go2(z, m2);
        };
      };
    },
    foldMapWithIndex: function(dictMonoid) {
      var mempty5 = mempty(dictMonoid);
      var append13 = append(dictMonoid.Semigroup0());
      return function(f) {
        var go2 = function(v) {
          if (v instanceof Leaf) {
            return mempty5;
          }
          ;
          if (v instanceof Node) {
            return append13(go2(v.value4))(append13(f(v.value2)(v.value3))(go2(v.value5)));
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 199, column 10 - line 202, column 30): " + [v.constructor.name]);
        };
        return go2;
      };
    },
    Foldable0: function() {
      return foldableMap;
    }
  };
  var keys = /* @__PURE__ */ function() {
    return foldrWithIndex(foldableWithIndexMap)(function(k) {
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
    var compare3 = compare(dictOrd);
    return function(k) {
      var go2 = function(v) {
        if (v instanceof Leaf) {
          return Leaf.value;
        }
        ;
        if (v instanceof Node) {
          var v1 = compare3(k)(v.value2);
          if (v1 instanceof LT) {
            return unsafeBalancedNode(v.value2, v.value3, go2(v.value4), v.value5);
          }
          ;
          if (v1 instanceof GT) {
            return unsafeBalancedNode(v.value2, v.value3, v.value4, go2(v.value5));
          }
          ;
          if (v1 instanceof EQ) {
            return unsafeJoinNodes(v.value4, v.value5);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 496, column 7 - line 499, column 43): " + [v1.constructor.name]);
        }
        ;
        throw new Error("Failed pattern match at Data.Map.Internal (line 493, column 8 - line 499, column 43): " + [v.constructor.name]);
      };
      return go2;
    };
  };
  var alter = function(dictOrd) {
    var compare3 = compare(dictOrd);
    return function(f) {
      return function(k) {
        return function(m2) {
          var v = unsafeSplit(compare3, k, m2);
          var v2 = f(v.value0);
          if (v2 instanceof Nothing) {
            return unsafeJoinNodes(v.value1, v.value2);
          }
          ;
          if (v2 instanceof Just) {
            return unsafeBalancedNode(k, v2.value0, v.value1, v.value2);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 512, column 3 - line 516, column 41): " + [v2.constructor.name]);
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
          var g2 = gcd1(n)(d);
          var d$prime = div5(d)(g2);
          return new Ratio(mul3(div5(n)(g2))(signum1(d$prime)), abs1(d$prime));
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
  var fastForeachThunk = (as) => {
    for (var i2 = 0, l = as.length; i2 < l; i2++) {
      as[i2]();
    }
  };
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

  // output/Data.List/index.js
  var reverse2 = /* @__PURE__ */ function() {
    var go2 = function($copy_v) {
      return function($copy_v1) {
        var $tco_var_v = $copy_v;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(v, v1) {
          if (v1 instanceof Nil) {
            $tco_done = true;
            return v;
          }
          ;
          if (v1 instanceof Cons) {
            $tco_var_v = new Cons(v1.value0, v);
            $copy_v1 = v1.value1;
            return;
          }
          ;
          throw new Error("Failed pattern match at Data.List (line 368, column 3 - line 368, column 19): " + [v.constructor.name, v1.constructor.name]);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_v, $copy_v1);
        }
        ;
        return $tco_result;
      };
    };
    return go2(Nil.value);
  }();

  // output/Data.Filterable/index.js
  var filterMap = function(dict) {
    return dict.filterMap;
  };
  var filter4 = function(dict) {
    return dict.filter;
  };

  // output/Data.Set/index.js
  var coerce3 = /* @__PURE__ */ coerce();
  var foldMap2 = /* @__PURE__ */ foldMap(foldableList);
  var foldl2 = /* @__PURE__ */ foldl(foldableList);
  var foldr3 = /* @__PURE__ */ foldr(foldableList);
  var union2 = function(dictOrd) {
    return coerce3(union(dictOrd));
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
        var $98 = foldMap12(f);
        return function($99) {
          return $98(toList($99));
        };
      };
    },
    foldl: function(f) {
      return function(x) {
        var $100 = foldl2(f)(x);
        return function($101) {
          return $100(toList($101));
        };
      };
    },
    foldr: function(f) {
      return function(x) {
        var $102 = foldr3(f)(x);
        return function($103) {
          return $102(toList($103));
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
    return coerce3($$delete2(dictOrd));
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
    var append8 = append(semigroupEffect(dictSemigroup));
    return {
      append: function(f1) {
        return function(f2) {
          return mkEffectFn1(function(a2) {
            return append8(runEffectFn1(f1)(a2))(runEffectFn1(f2)(a2));
          });
        };
      }
    };
  };
  var monoidEffectFn1 = function(dictMonoid) {
    var mempty5 = mempty(monoidEffect(dictMonoid));
    var semigroupEffectFn11 = semigroupEffectFn1(dictMonoid.Semigroup0());
    return {
      mempty: mkEffectFn1(function(v) {
        return mempty5;
      }),
      Semigroup0: function() {
        return semigroupEffectFn11;
      }
    };
  };

  // output/FRP.Event.Class/index.js
  var map3 = /* @__PURE__ */ map(functorTuple);
  var pure3 = /* @__PURE__ */ pure(applicativeMaybe);
  var sampleOnRight = function(dict) {
    return dict.sampleOnRight;
  };
  var keepLatest = function(dict) {
    return dict.keepLatest;
  };
  var fix = function(dict) {
    return dict.fix;
  };
  var fold2 = function(dictIsEvent) {
    var fix1 = fix(dictIsEvent);
    var sampleOnRight1 = sampleOnRight(dictIsEvent);
    var Alternative0 = dictIsEvent.Alternative0();
    var alt8 = alt(Alternative0.Plus1().Alt0());
    var pure17 = pure(Alternative0.Applicative0());
    var map111 = map(dictIsEvent.Filterable1().Functor1());
    return function(f) {
      return function(b2) {
        return function(e) {
          return fix1(function(i2) {
            return sampleOnRight1(alt8(i2)(pure17(b2)))(map111(flip(f))(e));
          });
        };
      };
    };
  };
  var mapAccum = function(dictIsEvent) {
    var filterMap2 = filterMap(dictIsEvent.Filterable1());
    var fold12 = fold2(dictIsEvent);
    return function(f) {
      return function(acc) {
        return function(xs) {
          return filterMap2(snd)(fold12(function(v) {
            return function(b2) {
              return map3(pure3)(f(v.value0)(b2));
            };
          })(new Tuple(acc, Nothing.value))(xs));
        };
      };
    };
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
  var $runtime_lazy4 = function(name15, moduleName, init2) {
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
  var pure4 = /* @__PURE__ */ pure(applicativeEffect);
  var liftST2 = /* @__PURE__ */ liftST(monadSTEffect);
  var monoidEffect2 = /* @__PURE__ */ monoidEffect(monoidUnit);
  var $$void3 = /* @__PURE__ */ $$void(functorEffect);
  var append3 = /* @__PURE__ */ append(semigroupArray);
  var mempty2 = /* @__PURE__ */ mempty(/* @__PURE__ */ monoidEffectFn1(monoidUnit));
  var mempty1 = /* @__PURE__ */ mempty(/* @__PURE__ */ monoidSet(ordTimeoutId));
  var $$delete4 = /* @__PURE__ */ $$delete3(ordTimeoutId);
  var append1 = /* @__PURE__ */ append(/* @__PURE__ */ semigroupSet(ordTimeoutId));
  var for_22 = /* @__PURE__ */ for_2(foldableSet);
  var apply3 = /* @__PURE__ */ apply(applyEffect);
  var map4 = /* @__PURE__ */ map(functorEffect);
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
  var merge = function(dictFoldable) {
    var foldMap4 = foldMap(dictFoldable)(monoidEffect2);
    return function(f) {
      return function(tf, k) {
        var a2 = liftST2(newSTArray)();
        foldMap4(function(v) {
          return function __do3() {
            var u2 = v(tf, k);
            return $$void3(liftST2(push(u2)(a2)))();
          };
        })(f)();
        return function __do3() {
          var o = liftST2(freeze(a2))();
          return fastForeachThunk(o);
        };
      };
    };
  };
  var mailbox$prime = function(dictOrd) {
    var alter2 = alter(dictOrd);
    var lookup3 = lookup(dictOrd);
    return function __do3() {
      var r = $$new(empty2)();
      return {
        event: function(a2) {
          return function(v, k2) {
            $$void3(modify(alter2(function(v1) {
              if (v1 instanceof Nothing) {
                return new Just([k2]);
              }
              ;
              if (v1 instanceof Just) {
                return new Just(append3(v1.value0)([k2]));
              }
              ;
              throw new Error("Failed pattern match at FRP.Event (line 568, column 17 - line 570, column 51): " + [v1.constructor.name]);
            })(a2))(r))();
            return $$void3(modify(alter2(function(v1) {
              if (v1 instanceof Nothing) {
                return Nothing.value;
              }
              ;
              if (v1 instanceof Just) {
                return new Just(deleteBy(unsafeRefEq)(k2)(v1.value0));
              }
              ;
              throw new Error("Failed pattern match at FRP.Event (line 577, column 17 - line 579, column 65): " + [v1.constructor.name]);
            })(a2))(r));
          };
        },
        push: function(v) {
          var o = read(r)();
          var v1 = lookup3(v.address)(o);
          if (v1 instanceof Nothing) {
            return unit;
          }
          ;
          if (v1 instanceof Just) {
            return fastForeachE(v1.value0, function(i2) {
              return i2(v.payload);
            });
          }
          ;
          throw new Error("Failed pattern match at FRP.Event (line 586, column 9 - line 588, column 95): " + [v1.constructor.name]);
        }
      };
    };
  };
  var keepLatest2 = function(v) {
    return function(tf, k) {
      var cancelInner = $$new(pure4(unit))();
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
          throw new Error("Failed pattern match at FRP.Event (line 225, column 31 - line 227, column 35): " + [v1.constructor.name]);
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
      throw new Error("Failed pattern match at FRP.Event (line 141, column 13 - line 143, column 25): " + [v.constructor.name]);
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
  var fix2 = function(f) {
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
          throw new Error("Failed pattern match at FRP.Event (line 124, column 13 - line 126, column 33): " + [v.constructor.name]);
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
          throw new Error("Failed pattern match at FRP.Event (line 131, column 13 - line 133, column 32): " + [v.constructor.name]);
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
          no: filter$prime(function($232) {
            return !p2($232);
          })(xs)
        };
      };
    },
    partitionMap: function(f) {
      return function(xs) {
        return {
          left: filterMap(filterableEvent)(function() {
            var $233 = either(Just.create)($$const(Nothing.value));
            return function($234) {
              return $233(f($234));
            };
          }())(xs),
          right: filterMap(filterableEvent)(function($235) {
            return hush(f($235));
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
    }($lazy_backdoor(345).subscribe)(i2);
  };
  var $lazy_backdoor = /* @__PURE__ */ $runtime_lazy4("backdoor", "FRP.Event", function() {
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
      createO: create$prime,
      makeEvent: function() {
        var makeEvent_ = function(e) {
          return function(tf, k) {
            if (tf) {
              return pure4(unit);
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
              return pure4(unit);
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
            var o = function(v, kx) {
              return v(tf, kx);
            };
            return e(o, k);
          };
        };
        return makeLemmingEventO_;
      }(),
      create: create_,
      createPure: create_,
      createPureO: create$prime,
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
        var subscribePureO_ = function(v, k) {
          return v(true, k);
        };
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
            var v1 = $lazy_create(819)();
            k(f(v1.push)(v1.event));
            return pure4(unit);
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
            var v = $lazy_create(837)();
            var unsubscribe = subscribe(e)(v.push)();
            return {
              event: v.event,
              unsubscribe
            };
          };
        };
        return hot_;
      }(),
      mailbox: function() {
        var mailbox_ = function(dictOrd) {
          return function __do3() {
            var v = mailbox$prime(dictOrd)();
            return {
              event: v.event,
              push: function(k) {
                return function() {
                  return v.push(k);
                };
              }
            };
          };
        };
        return mailbox_;
      }(),
      mailboxed: function() {
        var mailboxed_ = function(dictOrd) {
          var mailbox$prime1 = mailbox$prime(dictOrd);
          return function(v) {
            return function(f) {
              return function(b2, k) {
                var v1 = mailbox$prime1();
                k(f(v1.event));
                return v(b2, v1.push);
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
                  return maybe(pure4(unit))(function(id2) {
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
  var $lazy_create = /* @__PURE__ */ $runtime_lazy4("create", "FRP.Event", function() {
    return function __do3() {
      unit;
      return function(v) {
        return v;
      }($lazy_backdoor(461).create)();
    };
  });
  var backdoor = /* @__PURE__ */ $lazy_backdoor(678);
  var bus = function(i2) {
    return function(v) {
      return v;
    }(backdoor.bus)(i2);
  };
  var makeEvent = function(i2) {
    return function(v) {
      return v;
    }(backdoor.makeEvent)(i2);
  };
  var makeLemmingEventO = function(i2) {
    return function(v) {
      return v;
    }(backdoor.makeLemmingEventO)(i2);
  };
  var memoize = function(i2) {
    return function(v) {
      return v;
    }(backdoor.memoize)(i2);
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
  var lift24 = /* @__PURE__ */ lift2(applyEvent);
  var semigroupEvent = function(dictSemigroup) {
    return {
      append: lift24(append(dictSemigroup))
    };
  };
  var applicativeEvent = {
    pure: function(a2) {
      return function(v, k) {
        k(a2);
        return pure4(unit);
      };
    },
    Apply0: function() {
      return applyEvent;
    }
  };
  var pure22 = /* @__PURE__ */ pure(applicativeEvent);
  var monoidEvent = function(dictMonoid) {
    var semigroupEvent1 = semigroupEvent(dictMonoid.Semigroup0());
    return {
      mempty: pure22(mempty(dictMonoid)),
      Semigroup0: function() {
        return semigroupEvent1;
      }
    };
  };
  var altEvent = {
    alt: function(v) {
      return function(v1) {
        return function(tf, k) {
          return apply3(map4(function(v2) {
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
      return pure4(unit);
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
    fix: fix2,
    Alternative0: function() {
      return alternativeEvent;
    },
    Filterable1: function() {
      return filterableEvent;
    }
  };

  // output/Deku.Attribute/index.js
  var pure5 = /* @__PURE__ */ pure(applicativeEvent);
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
  var Unset$prime = /* @__PURE__ */ function() {
    function Unset$prime2() {
    }
    ;
    Unset$prime2.value = new Unset$prime2();
    return Unset$prime2;
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
    var $27 = map(functorFn)(map(functorEffect)($$const(true)));
    return function($28) {
      return Cb($27($28));
    };
  }();
  var attr = function(dict) {
    return dict.attr;
  };
  var pureAttr = function(dictAttr) {
    var attr1 = attr(dictAttr);
    return function(a2) {
      return function(b2) {
        return pure5(attr1(a2)(b2));
      };
    };
  };

  // output/Record/index.js
  var set = function(dictIsSymbol) {
    var reflectSymbol2 = reflectSymbol(dictIsSymbol);
    return function() {
      return function() {
        return function(l) {
          return function(b2) {
            return function(r) {
              return unsafeSet(reflectSymbol2(l))(b2)(r);
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
  var dyn = function(a2) {
    return new DynamicChildren$prime(a2);
  };

  // output/Data.Array.NonEmpty.Internal/foreign.js
  var traverse1Impl = function() {
    function Cont(fn) {
      this.fn = fn;
    }
    var emptyList = {};
    var ConsCell = function(head4, tail2) {
      this.head = head4;
      this.tail = tail2;
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
    return function(apply5, map26, f) {
      var buildFrom = function(x, ys) {
        return apply5(map26(consList)(f(x)))(ys);
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
        var acc = map26(finalCell)(f(array[array.length - 1]));
        var result = go2(acc, array.length - 1, array);
        while (result instanceof Cont) {
          result = result.fn();
        }
        return map26(listToArray)(result);
      };
    };
  }();

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
  var empty4 = {};
  function runST(f) {
    return f();
  }
  function _foldM(bind7) {
    return function(f) {
      return function(mz) {
        return function(m2) {
          var acc = mz;
          function g2(k2) {
            return function(z) {
              return f(z)(k2)(m2[k2]);
            };
          }
          for (var k in m2) {
            if (hasOwnProperty.call(m2, k)) {
              acc = bind7(acc)(g2(k));
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
  var foldr4 = /* @__PURE__ */ foldr(foldableArray);
  var values = /* @__PURE__ */ toArrayWithKey(function(v) {
    return function(v1) {
      return v1;
    };
  });
  var thawST = _copyST;
  var mutate = function(f) {
    return function(m2) {
      return runST(function __do3() {
        var s2 = thawST(m2)();
        f(s2)();
        return s2;
      });
    };
  };
  var insert4 = function(k) {
    return function(v) {
      return mutate(poke2(k)(v));
    };
  };
  var fold3 = /* @__PURE__ */ _foldM(applyFlipped);
  var foldMap3 = function(dictMonoid) {
    var append13 = append(dictMonoid.Semigroup0());
    var mempty5 = mempty(dictMonoid);
    return function(f) {
      return fold3(function(acc) {
        return function(k) {
          return function(v) {
            return append13(acc)(f(k)(v));
          };
        };
      })(mempty5);
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
        return function(m2) {
          return foldr4(f)(z)(values(m2));
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
  var map5 = /* @__PURE__ */ map(functorEvent);
  var merge2 = /* @__PURE__ */ merge(foldableArray);
  var bind2 = /* @__PURE__ */ bind(bindST);
  var pure1 = /* @__PURE__ */ pure(applicativeST);
  var map12 = /* @__PURE__ */ map(functorST);
  var for_3 = /* @__PURE__ */ for_(applicativeST);
  var for_12 = /* @__PURE__ */ for_3(foldableMaybe);
  var $$void4 = /* @__PURE__ */ $$void(functorST);
  var for_23 = /* @__PURE__ */ for_3(foldableArray);
  var map32 = /* @__PURE__ */ map(functorArray);
  var append4 = /* @__PURE__ */ append(/* @__PURE__ */ semigroupST(semigroupString));
  var traverse_2 = /* @__PURE__ */ traverse_(applicativeST)(foldableArray);
  var append12 = /* @__PURE__ */ append(semigroupArray);
  var foldl3 = /* @__PURE__ */ foldl(foldableObject);
  var applySecond2 = /* @__PURE__ */ applySecond(applyST);
  var Begin = /* @__PURE__ */ function() {
    function Begin3() {
    }
    ;
    Begin3.value = new Begin3();
    return Begin3;
  }();
  var Middle = /* @__PURE__ */ function() {
    function Middle2() {
    }
    ;
    Middle2.value = new Middle2();
    return Middle2;
  }();
  var End = /* @__PURE__ */ function() {
    function End3() {
    }
    ;
    End3.value = new End3();
    return End3;
  }();
  var flatten = function(v) {
    return function(psr) {
      return function(interpreter) {
        var element = function(v1) {
          return v1(psr)(interpreter);
        };
        return function(v1) {
          if (v1 instanceof FixedChildren$prime) {
            return merge2(map32(flatten(v)(psr)(interpreter))(v1.value0));
          }
          ;
          if (v1 instanceof EventfulElement$prime) {
            return keepLatest3(map5(flatten(v)(psr)(interpreter))(v1.value0));
          }
          ;
          if (v1 instanceof Element$prime) {
            return element(v.toElt(v1.value0));
          }
          ;
          if (v1 instanceof DynamicChildren$prime) {
            return makeLemmingEventO(function(v2, v3) {
              var cancelInner = newSTRef(empty4)();
              var cancelOuter = v2(v1.value0, function(inner) {
                var myUnsubId = v.ids(interpreter)();
                var myUnsub = newSTRef(pure1(unit))();
                var eltsUnsubId = v.ids(interpreter)();
                var eltsUnsub = newSTRef(pure1(unit))();
                var myIds = newSTRef([])();
                var myImmediateCancellation = newSTRef(pure1(unit))();
                var myScope = map12(Local.create)(function() {
                  if (psr.scope instanceof Global) {
                    return v.ids(interpreter);
                  }
                  ;
                  if (psr.scope instanceof Local) {
                    return append4(pure1(psr.scope.value0))(append4(pure1("!"))(v.ids(interpreter)));
                  }
                  ;
                  throw new Error("Failed pattern match at Bolson.Control (line 547, column 17 - line 549, column 67): " + [psr.scope.constructor.name]);
                }())();
                var stageRef = newSTRef(Begin.value)();
                var c0 = v2(inner, function(kid$prime) {
                  var stage = read2(stageRef)();
                  if (kid$prime instanceof Logic && stage instanceof Middle) {
                    var curId = read2(myIds)();
                    return traverse_2(function(i2) {
                      return function() {
                        return v3(v.doLogic(kid$prime.value0)(interpreter)(i2));
                      };
                    })(curId)();
                  }
                  ;
                  if (kid$prime instanceof Remove && stage instanceof Middle) {
                    $$void4(write2(End.value)(stageRef))();
                    var mic = function __do3() {
                      var idRef = read2(myIds)();
                      for_23(idRef)(function(old) {
                        return for_12(psr.parent)(function(pnt) {
                          return function() {
                            return v3(v.disconnectElement(interpreter)({
                              id: old,
                              parent: pnt,
                              scope: myScope
                            }));
                          };
                        });
                      })();
                      var myu = read2(myUnsub)();
                      myu();
                      var eltu = read2(eltsUnsub)();
                      eltu();
                      $$void4(modify2($$delete5(myUnsubId))(cancelInner))();
                      return $$void4(modify2($$delete5(eltsUnsubId))(cancelInner))();
                    };
                    $$void4(write2(mic)(myImmediateCancellation))();
                    return mic();
                  }
                  ;
                  if (kid$prime instanceof Insert && stage instanceof Begin) {
                    $$void4(write2(Middle.value)(stageRef))();
                    var c1 = v2(flatten(v)(function() {
                      var $132 = {};
                      for (var $133 in psr) {
                        if ({}.hasOwnProperty.call(psr, $133)) {
                          $132[$133] = psr[$133];
                        }
                        ;
                      }
                      ;
                      $132.scope = myScope;
                      $132.raiseId = function(id) {
                        return $$void4(modify2(append12([id]))(myIds));
                      };
                      return $132;
                    }())(interpreter)(kid$prime.value0), v3);
                    $$void4(modify2(insert4(eltsUnsubId)(c1))(cancelInner))();
                    return $$void4(write2(c1)(eltsUnsub))();
                  }
                  ;
                  return unit;
                });
                $$void4(write2(c0)(myUnsub))();
                $$void4(modify2(insert4(myUnsubId)(c0))(cancelInner))();
                var mican = read2(myImmediateCancellation)();
                return mican();
              });
              return function __do3() {
                bind2(read2(cancelInner))(foldl3(applySecond2)(pure1(unit)))();
                return cancelOuter();
              };
            });
          }
          ;
          throw new Error("Failed pattern match at Bolson.Control (line 520, column 17 - line 610, column 20): " + [v1.constructor.name]);
        };
      };
    };
  };

  // output/Data.Profunctor/index.js
  var identity5 = /* @__PURE__ */ identity(categoryFn);
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
      return dimap1(a2b)(identity5);
    };
  };

  // output/Deku.Core/index.js
  var map6 = /* @__PURE__ */ map(functorEvent);
  var lcmap2 = /* @__PURE__ */ lcmap(profunctorFn);
  var unwrap2 = /* @__PURE__ */ unwrap();
  var eq2 = /* @__PURE__ */ eq(eqScope);
  var coerce4 = /* @__PURE__ */ coerce();
  var pure6 = /* @__PURE__ */ pure(applicativeST);
  var pure12 = /* @__PURE__ */ pure(applicativeEvent);
  var empty5 = /* @__PURE__ */ empty(plusEvent);
  var merge3 = /* @__PURE__ */ merge(foldableArray);
  var map13 = /* @__PURE__ */ map(functorArray);
  var unsafeSetPos$prime = function(i2) {
    return function(v) {
      var g2 = function(v1) {
        var f = function(ii) {
          if (ii instanceof Element$prime) {
            return new Element$prime(lcmap2(function(v2) {
              return {
                dynFamily: v2.dynFamily,
                ez: v2.ez,
                parent: v2.parent,
                raiseId: v2.raiseId,
                scope: v2.scope,
                pos: i2
              };
            })(ii.value0));
          }
          ;
          if (ii instanceof EventfulElement$prime) {
            return new EventfulElement$prime(map6(f)(ii.value0));
          }
          ;
          return ii;
        };
        return f(v1);
      };
      return g2(v);
    };
  };
  var unsafeSetPos = function($104) {
    return unsafeSetPos$prime(Just.create($104));
  };
  var remove = /* @__PURE__ */ function() {
    return Remove.value;
  }();
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
      ids: function($105) {
        return function(v) {
          return v.ids;
        }(unwrap2($105));
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
  var insert_ = function(x) {
    var f = function(v) {
      return new Insert(v);
    };
    var b2 = unsafeSetPos$prime(Nothing.value)(x);
    return f(function(v) {
      return v;
    }(b2));
  };
  var bus2 = function(f) {
    return bus(f);
  };
  var bussed = function(f) {
    var z = function(x) {
      return new EventfulElement$prime(coerce4(x));
    };
    var g2 = bus2(f);
    return z(map6(function(v) {
      return v;
    })(g2));
  };
  var bussedUncurried = function($107) {
    return bussed(curry($107));
  };
  var __internalDekuFlatten = function(a2) {
    return function(b2) {
      return function(c) {
        return flatten(portalFlatten1)(a2)(b2)(function(v) {
          return v;
        }(c));
      };
    };
  };
  var dynify = function(f) {
    return function(es) {
      var go2 = function(fes) {
        return function(v) {
          return function(v1) {
            return makeLemmingEventO(function(v2, k) {
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
                throw new Error("Failed pattern match at Deku.Core (line 456, column 38 - line 472, column 40): " + [v.parent.constructor.name]);
              }();
              var unsub = v2(merge3([v3.value0, pure12(v1.makeDynBeacon({
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
                  return pure6(unit);
                },
                pos: Nothing.value,
                dynFamily: new Just(me)
              })(v1)(fes)]), k);
              return function __do3() {
                k(v1.removeDynBeacon({
                  id: me
                }));
                return unsub();
              };
            });
          };
        };
      };
      var go$prime = function(x) {
        return new Element$prime(go2(x));
      };
      return go$prime(function(v) {
        return v;
      }(f(es)));
    };
  };
  var dyn2 = /* @__PURE__ */ function() {
    var myDyn$prime = function(x) {
      return dyn(x);
    };
    var myDyn = function(e) {
      return myDyn$prime(map6(map6(function(v) {
        return v;
      }))(e));
    };
    return dynify(myDyn);
  }();
  var fixed2 = /* @__PURE__ */ function() {
    var myFixed$prime = function(x) {
      return fixed(map13(function(v) {
        return v;
      })(x));
    };
    var myFixed = function(e) {
      return myFixed$prime(map13(function(v) {
        return v;
      })(e));
    };
    return dynify(myFixed);
  }();
  var semigroupNut = {
    append: function(a2) {
      return function(b2) {
        return fixed2([a2, b2]);
      };
    }
  };
  var monoidNut = {
    mempty: /* @__PURE__ */ envy(empty5),
    Semigroup0: function() {
      return semigroupNut;
    }
  };

  // output/Deku.Control/index.js
  var map7 = /* @__PURE__ */ map(functorEvent);
  var merge4 = /* @__PURE__ */ merge(foldableArray);
  var pure7 = /* @__PURE__ */ pure(applicativeEvent);
  var empty6 = /* @__PURE__ */ empty(plusEvent);
  var pure13 = /* @__PURE__ */ pure(applicativeST);
  var mapAccum2 = /* @__PURE__ */ mapAccum(eventIsEvent);
  var keepLatest4 = /* @__PURE__ */ keepLatest(eventIsEvent);
  var filter6 = /* @__PURE__ */ filter4(filterableEvent);
  var eq3 = /* @__PURE__ */ eq(eqInt);
  var coerce5 = /* @__PURE__ */ coerce();
  var unwrap3 = /* @__PURE__ */ unwrap();
  var eq12 = /* @__PURE__ */ eq(eqScope);
  var alt2 = /* @__PURE__ */ alt(altEvent);
  var append5 = /* @__PURE__ */ append(semigroupArray);
  var mapWithIndex4 = /* @__PURE__ */ mapWithIndex(functorWithIndexArray);
  var map14 = /* @__PURE__ */ map(functorFn);
  var unsafeSetText = function(v) {
    return function(id) {
      return function(txt) {
        return map7(function($146) {
          return v.setText(function(v1) {
            return {
              id,
              text: v1
            };
          }($146));
        })(txt);
      };
    };
  };
  var unsafeSetAttribute = function(v) {
    return function(id) {
      return function(atts) {
        return map7(function($147) {
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
            if (v1.value instanceof Unset$prime) {
              return v.unsetAttribute({
                id,
                key: v1.key
              });
            }
            ;
            throw new Error("Failed pattern match at Deku.Control (line 72, column 28 - line 75, column 47): " + [v1.value.constructor.name]);
          }(unsafeUnAttribute($147));
        })(atts);
      };
    };
  };
  var text = function(txt) {
    var go2 = function(v) {
      return function(v1) {
        return makeLemmingEventO(function(v2, k) {
          var me = v1.ids();
          v.raiseId(me)();
          var unsub = v2(merge4([pure7(v1.makeText({
            id: me,
            parent: v.parent,
            pos: v.pos,
            scope: v.scope,
            dynFamily: v.dynFamily
          })), unsafeSetText(v1)(me)(txt), maybe(empty6)(function(p2) {
            return pure7(v1.attributeParent({
              id: me,
              parent: p2,
              pos: v.pos,
              dynFamily: v.dynFamily,
              ez: v.ez
            }));
          })(v.parent)]), k);
          return function __do3() {
            k(v1.deleteFromCache({
              id: me
            }));
            return unsub();
          };
        });
      };
    };
    var go$prime = new Element$prime(go2);
    return go$prime;
  };
  var text_ = function(txt) {
    return text(pure7(txt));
  };
  var switcher = function(f) {
    return function(event) {
      var counter = function() {
        var fn = function(a2) {
          return function(b2) {
            return new Tuple(a2 + 1 | 0, new Tuple(b2, a2));
          };
        };
        return mapAccum2(fn)(0);
      }();
      return dyn2(keepLatest4(memoize(counter(event))(function(cenv) {
        return map7(function(v) {
          return merge4([map7($$const(remove))(filter6(function() {
            var $148 = eq3(v.value1 + 1 | 0);
            return function($149) {
              return $148(snd($149));
            };
          }())(cenv)), pure7(insert_(coerce5(f(v.value0))))]);
        })(cenv);
      })));
    };
  };
  var switcherFlipped = /* @__PURE__ */ flip(switcher);
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
      ids: function($150) {
        return function(v) {
          return v.ids;
        }(unwrap3($150));
      },
      disconnectElement: function(v) {
        return function(v1) {
          return v.disconnectElement({
            id: v1.id,
            scope: v1.scope,
            parent: v1.parent,
            scopeEq: eq12
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
    return function(v) {
      var go2 = function(children) {
        return function(v1) {
          return makeLemmingEventO(function(v2, k) {
            return v2(alt2(pure7(v1.makeRoot({
              id: "deku-root",
              root
            })))(__internalDekuFlatten2({
              parent: new Just("deku-root"),
              scope: new Local("rootScope"),
              raiseId: function(v3) {
                return pure13(unit);
              },
              ez: true,
              pos: Nothing.value,
              dynFamily: Nothing.value
            })(v1)(children)), k);
          });
        };
      };
      return go2(v);
    };
  };
  var elementify = function(tag) {
    return function(atts) {
      return function(children) {
        var go2 = function(v) {
          return function(v1) {
            return makeLemmingEventO(function(v2, k) {
              var me = v1.ids();
              v.raiseId(me)();
              var unsub = v2(alt2(merge4(append5([pure7(v1.makeElement({
                id: me,
                parent: v.parent,
                scope: v.scope,
                tag,
                pos: v.pos,
                dynFamily: v.dynFamily
              })), unsafeSetAttribute(v1)(me)(atts)])(maybe([])(function(p2) {
                return [pure7(v1.attributeParent({
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
              })(v1)(children)), k);
              return function __do3() {
                k(v1.deleteFromCache({
                  id: me
                }));
                return unsub();
              };
            });
          };
        };
        return go2;
      };
    };
  };
  var elementify2 = function(en) {
    return function(attributes) {
      return function(kids) {
        var aa = function(v) {
          if (v.length === 0) {
            return empty6;
          }
          ;
          if (v.length === 1) {
            return v[0];
          }
          ;
          return merge4(v);
        };
        var step1 = function(arr) {
          return new Element$prime(elementify(en)(aa(attributes))(fixed(coerce5(arr))));
        };
        return step1(mapWithIndex4(map14(map14(function(v) {
          return v;
        }))(unsafeSetPos))(kids));
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

  // output/Deku.DOM.Attr.OnKeydown/index.js
  var OnKeydown = /* @__PURE__ */ function() {
    function OnKeydown2() {
    }
    ;
    OnKeydown2.value = new OnKeydown2();
    return OnKeydown2;
  }();
  var attrOnKeydownCb = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "keydown",
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
  var b = /* @__PURE__ */ elementify2("b");
  var b_ = /* @__PURE__ */ b(/* @__PURE__ */ empty(plusArray));

  // output/Deku.DOM.Elt.Br/index.js
  var br = /* @__PURE__ */ elementify2("br");
  var br_ = /* @__PURE__ */ br(/* @__PURE__ */ empty(plusArray));

  // output/Deku.DOM.Elt.Div/index.js
  var div2 = /* @__PURE__ */ elementify2("div");
  var div_ = /* @__PURE__ */ div2(/* @__PURE__ */ empty(plusArray));

  // output/Deku.DOM.Elt.Em/index.js
  var em = /* @__PURE__ */ elementify2("em");
  var em_ = /* @__PURE__ */ em(/* @__PURE__ */ empty(plusArray));

  // output/Deku.DOM.Elt.H1/index.js
  var h1 = /* @__PURE__ */ elementify2("h1");
  var h1_ = /* @__PURE__ */ h1(/* @__PURE__ */ empty(plusArray));

  // output/Deku.DOM.Elt.Hr/index.js
  var hr = /* @__PURE__ */ elementify2("hr");
  var hr_ = /* @__PURE__ */ hr(/* @__PURE__ */ empty(plusArray));

  // output/Deku.DOM.Elt.Input/index.js
  var input = /* @__PURE__ */ elementify2("input");

  // output/Deku.DOM.Elt.Label/index.js
  var label = /* @__PURE__ */ elementify2("label");
  var label_ = /* @__PURE__ */ label(/* @__PURE__ */ empty(plusArray));

  // output/Deku.DOM.Elt.Li/index.js
  var li = /* @__PURE__ */ elementify2("li");
  var li_ = /* @__PURE__ */ li(/* @__PURE__ */ empty(plusArray));

  // output/Deku.DOM.Elt.Ul/index.js
  var ul = /* @__PURE__ */ elementify2("ul");
  var ul_ = /* @__PURE__ */ ul(/* @__PURE__ */ empty(plusArray));

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

  // output/Article/index.js
  var bind3 = /* @__PURE__ */ bind(bindMaybe);
  var attr2 = /* @__PURE__ */ attr(attrSelfElementFunctionEf);
  var tell2 = /* @__PURE__ */ tell(/* @__PURE__ */ monadTellWriterT(monoidNut)(monadIdentity));
  var map9 = /* @__PURE__ */ map(functorEvent);
  var pure8 = /* @__PURE__ */ pure(applicativeEvent);
  var pureAttr2 = /* @__PURE__ */ pureAttr(attrDiv_StyleString);
  var pureAttr1 = /* @__PURE__ */ pureAttr(attrLabel_StyleString);
  var validateInput = function(inp) {
    return bind3(bind3(inp)(fromString))(function(x) {
      var $29 = isNaNImpl(x);
      if ($29) {
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
  var t$prime = function(txt) {
    return attr2(Self.value)(textMode(txt));
  };
  var t = function(str) {
    return tell2(label([map9(t$prime)(str)])([]));
  };
  var t_ = function(str) {
    return t(pure8(str));
  };
  var setTitle_ = function(str) {
    return tell2(h1_([text_(str)]));
  };
  var openSection_ = function(title3) {
    return function(points) {
      return tell2(div_([div2([pureAttr2(Style.value)("margin: 0; display: flex; justify-content: space-between")])([label([pureAttr1(Style.value)("font-size: 24px; font-weight: 700;")])([text_(title3)]), label([pureAttr1(Style.value)("font-size: 16px; font-weight: 700;")])([text_(points)])]), hr_([])]));
    };
  };
  var nl$prime = /* @__PURE__ */ function() {
    return attr2(Self.value)(textMode("<br>"));
  }();
  var nl = /* @__PURE__ */ tell2(/* @__PURE__ */ br_([]));
  var m$prime = function(txt) {
    return attr2(Self.value)(render(txt));
  };
  var m = function(str) {
    return tell2(label([map9(m$prime)(str)])([]));
  };
  var m_ = function(str) {
    return m(pure8(str));
  };
  var equation2 = function(str) {
    return tell2(label([map9(function(txt) {
      return attr2(Self.value)(display(txt));
    })(str)])([]));
  };
  var em_2 = function(str) {
    return tell2(em_([text_(str)]));
  };
  var b_2 = function(str) {
    return tell2(b_([text_(str)]));
  };

  // output/Control.Monad.Writer/index.js
  var unwrap4 = /* @__PURE__ */ unwrap();
  var runWriter = function($5) {
    return unwrap4(runWriterT($5));
  };
  var execWriter = function(m2) {
    return snd(runWriter(m2));
  };

  // output/Deku.Do/index.js
  var bind4 = function(f) {
    return function(a2) {
      return f(a2);
    };
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
    function nonCanceler(error2) {
      return new Aff2(PURE, void 0);
    }
    function runEff(eff) {
      try {
        eff();
      } catch (error2) {
        setTimeout(function() {
          throw error2;
        }, 0);
      }
    }
    function runSync(left, right, eff) {
      try {
        return right(eff());
      } catch (error2) {
        return left(error2);
      }
    }
    function runAsync(left, eff, k) {
      try {
        return eff(k)();
      } catch (error2) {
        k(left(error2))();
        return nonCanceler;
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
        enqueue: function(cb2) {
          var i2, tmp;
          if (size5 === limit) {
            tmp = draining;
            drain();
            draining = tmp;
          }
          queue[(ix + size5) % limit] = cb2;
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
      var count2 = 0;
      return {
        register: function(fiber) {
          var fid = fiberId++;
          fiber.onComplete({
            rethrow: true,
            handler: function(result) {
              return function() {
                count2--;
                delete fibers[fid];
              };
            }
          })();
          fibers[fid] = fiber;
          count2++;
        },
        isEmpty: function() {
          return count2 === 0;
        },
        killAll: function(killError, cb2) {
          return function() {
            if (count2 === 0) {
              return cb2();
            }
            var killCount = 0;
            var kills = {};
            function kill(fid) {
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
                    cb2();
                  }
                };
              })();
            }
            for (var k in fibers) {
              if (fibers.hasOwnProperty(k)) {
                killCount++;
                kill(k);
              }
            }
            fibers = {};
            fiberId = 0;
            count2 = 0;
            return function(error2) {
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
      var status = SUSPENDED;
      var step2 = aff;
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
          switch (status) {
            case STEP_BIND:
              status = CONTINUE;
              try {
                step2 = bhead(step2);
                if (btail === null) {
                  bhead = null;
                } else {
                  bhead = btail._1;
                  btail = btail._2;
                }
              } catch (e) {
                status = RETURN;
                fail = util.left(e);
                step2 = null;
              }
              break;
            case STEP_RESULT:
              if (util.isLeft(step2)) {
                status = RETURN;
                fail = step2;
                step2 = null;
              } else if (bhead === null) {
                status = RETURN;
              } else {
                status = STEP_BIND;
                step2 = util.fromRight(step2);
              }
              break;
            case CONTINUE:
              switch (step2.tag) {
                case BIND:
                  if (bhead) {
                    btail = new Aff2(CONS, bhead, btail);
                  }
                  bhead = step2._2;
                  status = CONTINUE;
                  step2 = step2._1;
                  break;
                case PURE:
                  if (bhead === null) {
                    status = RETURN;
                    step2 = util.right(step2._1);
                  } else {
                    status = STEP_BIND;
                    step2 = step2._1;
                  }
                  break;
                case SYNC:
                  status = STEP_RESULT;
                  step2 = runSync(util.left, util.right, step2._1);
                  break;
                case ASYNC:
                  status = PENDING;
                  step2 = runAsync(util.left, step2._1, function(result2) {
                    return function() {
                      if (runTick !== localRunTick) {
                        return;
                      }
                      runTick++;
                      Scheduler.enqueue(function() {
                        if (runTick !== localRunTick + 1) {
                          return;
                        }
                        status = STEP_RESULT;
                        step2 = result2;
                        run3(runTick);
                      });
                    };
                  });
                  return;
                case THROW:
                  status = RETURN;
                  fail = util.left(step2._1);
                  step2 = null;
                  break;
                case CATCH:
                  if (bhead === null) {
                    attempts = new Aff2(CONS, step2, attempts, interrupt);
                  } else {
                    attempts = new Aff2(CONS, step2, new Aff2(CONS, new Aff2(RESUME, bhead, btail), attempts, interrupt), interrupt);
                  }
                  bhead = null;
                  btail = null;
                  status = CONTINUE;
                  step2 = step2._1;
                  break;
                case BRACKET:
                  bracketCount++;
                  if (bhead === null) {
                    attempts = new Aff2(CONS, step2, attempts, interrupt);
                  } else {
                    attempts = new Aff2(CONS, step2, new Aff2(CONS, new Aff2(RESUME, bhead, btail), attempts, interrupt), interrupt);
                  }
                  bhead = null;
                  btail = null;
                  status = CONTINUE;
                  step2 = step2._1;
                  break;
                case FORK:
                  status = STEP_RESULT;
                  tmp = Fiber(util, supervisor, step2._2);
                  if (supervisor) {
                    supervisor.register(tmp);
                  }
                  if (step2._1) {
                    tmp.run();
                  }
                  step2 = util.right(tmp);
                  break;
                case SEQ:
                  status = CONTINUE;
                  step2 = sequential2(util, supervisor, step2._1);
                  break;
              }
              break;
            case RETURN:
              bhead = null;
              btail = null;
              if (attempts === null) {
                status = COMPLETED;
                step2 = interrupt || fail || step2;
              } else {
                tmp = attempts._3;
                attempt = attempts._1;
                attempts = attempts._2;
                switch (attempt.tag) {
                  case CATCH:
                    if (interrupt && interrupt !== tmp && bracketCount === 0) {
                      status = RETURN;
                    } else if (fail) {
                      status = CONTINUE;
                      step2 = attempt._2(util.fromLeft(fail));
                      fail = null;
                    }
                    break;
                  case RESUME:
                    if (interrupt && interrupt !== tmp && bracketCount === 0 || fail) {
                      status = RETURN;
                    } else {
                      bhead = attempt._1;
                      btail = attempt._2;
                      status = STEP_BIND;
                      step2 = util.fromRight(step2);
                    }
                    break;
                  case BRACKET:
                    bracketCount--;
                    if (fail === null) {
                      result = util.fromRight(step2);
                      attempts = new Aff2(CONS, new Aff2(RELEASE, attempt._2, result), attempts, tmp);
                      if (interrupt === tmp || bracketCount > 0) {
                        status = CONTINUE;
                        step2 = attempt._3(result);
                      }
                    }
                    break;
                  case RELEASE:
                    attempts = new Aff2(CONS, new Aff2(FINALIZED, step2, fail), attempts, interrupt);
                    status = CONTINUE;
                    if (interrupt && interrupt !== tmp && bracketCount === 0) {
                      step2 = attempt._1.killed(util.fromLeft(interrupt))(attempt._2);
                    } else if (fail) {
                      step2 = attempt._1.failed(util.fromLeft(fail))(attempt._2);
                    } else {
                      step2 = attempt._1.completed(util.fromRight(step2))(attempt._2);
                    }
                    fail = null;
                    bracketCount++;
                    break;
                  case FINALIZER:
                    bracketCount++;
                    attempts = new Aff2(CONS, new Aff2(FINALIZED, step2, fail), attempts, interrupt);
                    status = CONTINUE;
                    step2 = attempt._1;
                    break;
                  case FINALIZED:
                    bracketCount--;
                    status = RETURN;
                    step2 = attempt._1;
                    fail = attempt._2;
                    break;
                }
              }
              break;
            case COMPLETED:
              for (var k in joins) {
                if (joins.hasOwnProperty(k)) {
                  rethrow = rethrow && joins[k].rethrow;
                  runEff(joins[k].handler(step2));
                }
              }
              joins = null;
              if (interrupt && fail) {
                setTimeout(function() {
                  throw util.fromLeft(fail);
                }, 0);
              } else if (util.isLeft(step2) && rethrow) {
                setTimeout(function() {
                  if (rethrow) {
                    throw util.fromLeft(step2);
                  }
                }, 0);
              }
              return;
            case SUSPENDED:
              status = CONTINUE;
              break;
            case PENDING:
              return;
          }
        }
      }
      function onComplete(join4) {
        return function() {
          if (status === COMPLETED) {
            rethrow = rethrow && join4.rethrow;
            join4.handler(step2)();
            return function() {
            };
          }
          var jid = joinId++;
          joins = joins || {};
          joins[jid] = join4;
          return function() {
            if (joins !== null) {
              delete joins[jid];
            }
          };
        };
      }
      function kill(error2, cb2) {
        return function() {
          if (status === COMPLETED) {
            cb2(util.right(void 0))();
            return function() {
            };
          }
          var canceler = onComplete({
            rethrow: false,
            handler: function() {
              return cb2(util.right(void 0));
            }
          })();
          switch (status) {
            case SUSPENDED:
              interrupt = util.left(error2);
              status = COMPLETED;
              step2 = interrupt;
              run3(runTick);
              break;
            case PENDING:
              if (interrupt === null) {
                interrupt = util.left(error2);
              }
              if (bracketCount === 0) {
                if (status === PENDING) {
                  attempts = new Aff2(CONS, new Aff2(FINALIZER, step2(error2)), attempts, interrupt);
                }
                status = RETURN;
                step2 = null;
                fail = null;
                run3(++runTick);
              }
              break;
            default:
              if (interrupt === null) {
                interrupt = util.left(error2);
              }
              if (bracketCount === 0) {
                status = RETURN;
                step2 = null;
                fail = null;
              }
          }
          return canceler;
        };
      }
      function join3(cb2) {
        return function() {
          var canceler = onComplete({
            rethrow: false,
            handler: cb2
          })();
          if (status === SUSPENDED) {
            run3(runTick);
          }
          return canceler;
        };
      }
      return {
        kill,
        join: join3,
        onComplete,
        isSuspended: function() {
          return status === SUSPENDED;
        },
        run: function() {
          if (status === SUSPENDED) {
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
    function runPar(util, supervisor, par, cb2) {
      var fiberId = 0;
      var fibers = {};
      var killId = 0;
      var kills = {};
      var early = new Error("[ParAff] Early exit");
      var interrupt = null;
      var root = EMPTY;
      function kill(error2, par2, cb3) {
        var step2 = par2;
        var head4 = null;
        var tail2 = null;
        var count2 = 0;
        var kills2 = {};
        var tmp, kid;
        loop:
          while (true) {
            tmp = null;
            switch (step2.tag) {
              case FORKED:
                if (step2._3 === EMPTY) {
                  tmp = fibers[step2._1];
                  kills2[count2++] = tmp.kill(error2, function(result) {
                    return function() {
                      count2--;
                      if (count2 === 0) {
                        cb3(result)();
                      }
                    };
                  });
                }
                if (head4 === null) {
                  break loop;
                }
                step2 = head4._2;
                if (tail2 === null) {
                  head4 = null;
                } else {
                  head4 = tail2._1;
                  tail2 = tail2._2;
                }
                break;
              case MAP:
                step2 = step2._2;
                break;
              case APPLY:
              case ALT:
                if (head4) {
                  tail2 = new Aff2(CONS, head4, tail2);
                }
                head4 = step2;
                step2 = step2._1;
                break;
            }
          }
        if (count2 === 0) {
          cb3(util.right(void 0))();
        } else {
          kid = 0;
          tmp = count2;
          for (; kid < tmp; kid++) {
            kills2[kid] = kills2[kid]();
          }
        }
        return kills2;
      }
      function join3(result, head4, tail2) {
        var fail, step2, lhs, rhs, tmp, kid;
        if (util.isLeft(result)) {
          fail = result;
          step2 = null;
        } else {
          step2 = result;
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
              cb2(fail || step2)();
              return;
            }
            if (head4._3 !== EMPTY) {
              return;
            }
            switch (head4.tag) {
              case MAP:
                if (fail === null) {
                  head4._3 = util.right(head4._1(util.fromRight(step2)));
                  step2 = head4._3;
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
                  kills[kid] = kill(early, fail === lhs ? head4._2 : head4._1, function() {
                    return function() {
                      delete kills[kid];
                      if (tmp) {
                        tmp = false;
                      } else if (tail2 === null) {
                        join3(fail, null, null);
                      } else {
                        join3(fail, tail2._1, tail2._2);
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
                  step2 = util.right(util.fromRight(lhs)(util.fromRight(rhs)));
                  head4._3 = step2;
                }
                break;
              case ALT:
                lhs = head4._1._3;
                rhs = head4._2._3;
                if (lhs === EMPTY && util.isLeft(rhs) || rhs === EMPTY && util.isLeft(lhs)) {
                  return;
                }
                if (lhs !== EMPTY && util.isLeft(lhs) && rhs !== EMPTY && util.isLeft(rhs)) {
                  fail = step2 === lhs ? rhs : lhs;
                  step2 = null;
                  head4._3 = fail;
                } else {
                  head4._3 = step2;
                  tmp = true;
                  kid = killId++;
                  kills[kid] = kill(early, step2 === lhs ? head4._2 : head4._1, function() {
                    return function() {
                      delete kills[kid];
                      if (tmp) {
                        tmp = false;
                      } else if (tail2 === null) {
                        join3(step2, null, null);
                      } else {
                        join3(step2, tail2._1, tail2._2);
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
            if (tail2 === null) {
              head4 = null;
            } else {
              head4 = tail2._1;
              tail2 = tail2._2;
            }
          }
      }
      function resolve(fiber) {
        return function(result) {
          return function() {
            delete fibers[fiber._1];
            fiber._3 = result;
            join3(result, fiber._2._1, fiber._2._2);
          };
        };
      }
      function run3() {
        var status = CONTINUE;
        var step2 = par;
        var head4 = null;
        var tail2 = null;
        var tmp, fid;
        loop:
          while (true) {
            tmp = null;
            fid = null;
            switch (status) {
              case CONTINUE:
                switch (step2.tag) {
                  case MAP:
                    if (head4) {
                      tail2 = new Aff2(CONS, head4, tail2);
                    }
                    head4 = new Aff2(MAP, step2._1, EMPTY, EMPTY);
                    step2 = step2._2;
                    break;
                  case APPLY:
                    if (head4) {
                      tail2 = new Aff2(CONS, head4, tail2);
                    }
                    head4 = new Aff2(APPLY, EMPTY, step2._2, EMPTY);
                    step2 = step2._1;
                    break;
                  case ALT:
                    if (head4) {
                      tail2 = new Aff2(CONS, head4, tail2);
                    }
                    head4 = new Aff2(ALT, EMPTY, step2._2, EMPTY);
                    step2 = step2._1;
                    break;
                  default:
                    fid = fiberId++;
                    status = RETURN;
                    tmp = step2;
                    step2 = new Aff2(FORKED, fid, new Aff2(CONS, head4, tail2), EMPTY);
                    tmp = Fiber(util, supervisor, tmp);
                    tmp.onComplete({
                      rethrow: false,
                      handler: resolve(step2)
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
                  head4._1 = step2;
                  status = CONTINUE;
                  step2 = head4._2;
                  head4._2 = EMPTY;
                } else {
                  head4._2 = step2;
                  step2 = head4;
                  if (tail2 === null) {
                    head4 = null;
                  } else {
                    head4 = tail2._1;
                    tail2 = tail2._2;
                  }
                }
            }
          }
        root = step2;
        for (fid = 0; fid < fiberId; fid++) {
          fibers[fid].run();
        }
      }
      function cancel(error2, cb3) {
        interrupt = util.left(error2);
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
        var newKills = kill(error2, root, cb3);
        return function(killError) {
          return new Aff2(ASYNC, function(killCb) {
            return function() {
              for (var kid2 in newKills) {
                if (newKills.hasOwnProperty(kid2)) {
                  newKills[kid2]();
                }
              }
              return nonCanceler;
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
      return new Aff2(ASYNC, function(cb2) {
        return function() {
          return runPar(util, supervisor, par, cb2);
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
    Aff2.nonCanceler = nonCanceler;
    return Aff2;
  }();
  var _pure = Aff.Pure;
  var _throwError = Aff.Throw;
  var _liftEffect = Aff.Sync;
  var makeAff = Aff.Async;
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
      return Aff.Async(function(cb2) {
        return function() {
          var timer = setDelay(ms, cb2(right()));
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

  // output/Deku.Hooks/index.js
  var map10 = /* @__PURE__ */ map(functorEvent);
  var alt3 = /* @__PURE__ */ alt(altEvent);
  var pure9 = /* @__PURE__ */ pure(applicativeEvent);
  var useState$prime = bussedUncurried;
  var useMemoized = function(e) {
    return function(f1) {
      var ee = memoize(e)(f1);
      var eee = map10(function(v) {
        return v;
      })(ee);
      var eeee = envy(map10(function(v) {
        return v;
      })(eee));
      return eeee;
    };
  };
  var useState = function(a2) {
    return function(f) {
      return bind4(useState$prime)(function(v) {
        return bind4(useMemoized(alt3(v.value1)(pure9(a2))))(function(m2) {
          return f(new Tuple(v.value0, m2));
        });
      });
    };
  };

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
  function key(e) {
    return e.key;
  }
  function code2(e) {
    return e.code;
  }

  // output/Web.UIEvent.KeyboardEvent/index.js
  var fromEvent = /* @__PURE__ */ unsafeReadProtoTagged("KeyboardEvent");

  // output/Deku.Listeners/index.js
  var map11 = /* @__PURE__ */ map(functorEvent);
  var attr3 = /* @__PURE__ */ attr(attrOnInputCb);
  var for_4 = /* @__PURE__ */ for_(applicativeEffect)(foldableMaybe);
  var bind5 = /* @__PURE__ */ bind(bindMaybe);
  var composeKleisli2 = /* @__PURE__ */ composeKleisli(bindEffect);
  var textInput = /* @__PURE__ */ map11(function(push2) {
    return attr3(OnInput.value)(cb(function(e) {
      return for_4(bind5(target(e))(fromEventTarget))(composeKleisli2(value)(push2));
    }));
  });
  var keyEvent$prime = function(dictFunctor) {
    var map111 = map(dictFunctor);
    return function(dictAttr) {
      var attr22 = attr(dictAttr);
      return function(listener) {
        return map111(function(f) {
          return attr22(listener)(cb(function(e) {
            return for_4(fromEvent(e))(f);
          }));
        });
      };
    };
  };
  var keyEvent$prime1 = /* @__PURE__ */ keyEvent$prime(functorEvent);
  var keyDown = /* @__PURE__ */ function() {
    return keyEvent$prime1(attrOnKeydownCb)(OnKeydown.value);
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
  var uncons2 = function($copy_v) {
    var $tco_done = false;
    var $tco_result;
    function $tco_loop(v) {
      if (v.value0 instanceof Nil && v.value1 instanceof Nil) {
        $tco_done = true;
        return Nothing.value;
      }
      ;
      if (v.value0 instanceof Nil) {
        $copy_v = new CatQueue(reverse2(v.value1), Nil.value);
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
  var snoc2 = function(v) {
    return function(a2) {
      return new CatQueue(v.value0, new Cons(a2, v.value1));
    };
  };
  var $$null = function(v) {
    if (v.value0 instanceof Nil && v.value1 instanceof Nil) {
      return true;
    }
    ;
    return false;
  };
  var empty7 = /* @__PURE__ */ function() {
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
  var link2 = function(v) {
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
        return new CatCons(v.value0, snoc2(v.value1)(v1));
      }
      ;
      throw new Error("Failed pattern match at Data.CatList (line 108, column 1 - line 108, column 54): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var foldr5 = function(k) {
    return function(b2) {
      return function(q2) {
        var foldl4 = function($copy_v) {
          return function($copy_v1) {
            return function($copy_v2) {
              var $tco_var_v = $copy_v;
              var $tco_var_v1 = $copy_v1;
              var $tco_done = false;
              var $tco_result;
              function $tco_loop(v, v1, v2) {
                if (v2 instanceof Nil) {
                  $tco_done = true;
                  return v1;
                }
                ;
                if (v2 instanceof Cons) {
                  $tco_var_v = v;
                  $tco_var_v1 = v(v1)(v2.value0);
                  $copy_v2 = v2.value1;
                  return;
                }
                ;
                throw new Error("Failed pattern match at Data.CatList (line 124, column 3 - line 124, column 59): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
              }
              ;
              while (!$tco_done) {
                $tco_result = $tco_loop($tco_var_v, $tco_var_v1, $copy_v2);
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
              var v = uncons2(xs);
              if (v instanceof Nothing) {
                $tco_done1 = true;
                return foldl4(function(x) {
                  return function(i2) {
                    return i2(x);
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
        return go2(q2)(Nil.value);
      };
    };
  };
  var uncons3 = function(v) {
    if (v instanceof CatNil) {
      return Nothing.value;
    }
    ;
    if (v instanceof CatCons) {
      return new Just(new Tuple(v.value0, function() {
        var $66 = $$null(v.value1);
        if ($66) {
          return CatNil.value;
        }
        ;
        return foldr5(link2)(CatNil.value)(v.value1);
      }()));
    }
    ;
    throw new Error("Failed pattern match at Data.CatList (line 99, column 1 - line 99, column 61): " + [v.constructor.name]);
  };
  var empty8 = /* @__PURE__ */ function() {
    return CatNil.value;
  }();
  var append6 = link2;
  var semigroupCatList = {
    append: append6
  };
  var snoc3 = function(cat) {
    return function(a2) {
      return append6(cat)(new CatCons(a2, empty7));
    };
  };

  // output/Control.Monad.Free/index.js
  var $runtime_lazy5 = function(name15, moduleName, init2) {
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
  var append7 = /* @__PURE__ */ append(semigroupCatList);
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
          return new Free(v22.value0, append7(v22.value1)(r));
        };
      };
      if (v.value0 instanceof Return) {
        var v2 = uncons3(v.value1);
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
        return new Bind(v.value0.value0, function(a2) {
          return concatF(v.value0.value1(a2))(v.value1);
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
    var map111 = map(dictFunctor);
    return resume$prime(function(g2) {
      return function(i2) {
        return new Left(map111(i2)(g2));
      };
    })(Right.create);
  };
  var fromView = function(f) {
    return new Free(f, empty8);
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
          var $189 = pure(freeApplicative);
          return function($190) {
            return $189(k($190));
          };
        }())(f);
      };
    }
  };
  var freeBind = {
    bind: function(v) {
      return function(k) {
        return new Free(v.value0, snoc3(v.value1)(k));
      };
    },
    Apply0: function() {
      return $lazy_freeApply(0);
    }
  };
  var freeApplicative = {
    pure: function($191) {
      return fromView(Return.create($191));
    },
    Apply0: function() {
      return $lazy_freeApply(0);
    }
  };
  var $lazy_freeApply = /* @__PURE__ */ $runtime_lazy5("freeApply", "Control.Monad.Free", function() {
    return {
      apply: ap(freeMonad),
      Functor0: function() {
        return freeFunctor;
      }
    };
  });
  var pure10 = /* @__PURE__ */ pure(freeApplicative);
  var liftF = function(f) {
    return fromView(new Bind(f, function($192) {
      return pure10($192);
    }));
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
              const anchorNode = dom2.childNodes[k];
              if (state4.units[a2.id].startBeacon) {
                dom2.insertBefore(state4.units[a2.id].startBeacon, anchorNode);
                dom2.insertBefore(state4.units[a2.id].endBeacon, anchorNode);
              } else {
                dom2.insertBefore(state4.units[a2.id].main, anchorNode);
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
  var svgTags = /* @__PURE__ */ new Set([
    "animate",
    "animateMotion",
    "animateTransform",
    "circle",
    "clipPath",
    "defs",
    "desc",
    "discard",
    "ellipse",
    "feBlend",
    "feColorMatrix",
    "feComponentTransfer",
    "feComposite",
    "feConvolveMatrix",
    "feDiffuseLighting",
    "feDisplacementMap",
    "feDistantLight",
    "feDropShadow",
    "feFlood",
    "feFuncA",
    "feFuncB",
    "feFuncG",
    "feFuncR",
    "feGaussianBlur",
    "feImage",
    "feMerge",
    "feMergeNode",
    "feMorphology",
    "feOffset",
    "fePointLight",
    "feSpecularLighting",
    "feSpotLight",
    "feTile",
    "feTurbulence",
    "filter",
    "foreignObject",
    "g",
    "image",
    "line",
    "linearGradient",
    "marker",
    "mask",
    "metadata",
    "mpath",
    "path",
    "pattern",
    "polygon",
    "polyline",
    "radialGradient",
    "rect",
    "set",
    "stop",
    "svg",
    "switch",
    "symbol",
    "text",
    "textPath",
    "title",
    "tspan",
    "use",
    "view"
  ]);
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
      const main3 = svgTags.has(a2.tag) ? document.createElementNS("http://www.w3.org/2000/svg", a2.tag) : document.createElement(a2.tag);
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
            var textWasBlank = i2 === 0 || dom2.childNodes[i2 - 1].nodeType !== 3;
            if (textWasBlank && i2 !== 0) {
              dom2.insertBefore(document.createTextNode(""), dom2.childNodes[i2]);
            } else if (textWasBlank) {
              dom2.prepend(document.createTextNode(""));
            } else {
              i2 = i2 - 1;
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
      } else if (state4.units[ptr].main.tagName === "TEXTAREA" && a2.key === "value") {
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
  var unsetAttribute_ = (tryHydration) => (a2) => (state4) => () => {
    if (state4.units[a2.id]) {
      var ptr = a2.id;
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
      state4.units[ptr].main.removeAttribute(a2.key);
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
        if (x === state4.units[ptr].endBeacon) {
          dummy.appendChild(x);
        }
      }
    }
  };
  var stateHasKey = (id) => (state4) => () => {
    return state4.units[id] !== void 0;
  };
  var deleteFromCache_ = (a2) => (state4) => () => {
    if (state4.units[a2.id]) {
      delete state4.units[a2.id];
    }
  };
  var removeDynBeacon_ = deleteFromCache_;

  // output/Data.String.Utils/foreign.js
  function includesImpl(searchString, str) {
    return str.includes(searchString);
  }

  // output/Data.String.CodePoints/foreign.js
  var hasArrayFrom = typeof Array.from === "function";
  var hasStringIterator = typeof Symbol !== "undefined" && Symbol != null && typeof Symbol.iterator !== "undefined" && typeof String.prototype[Symbol.iterator] === "function";
  var hasFromCodePoint = typeof String.prototype.fromCodePoint === "function";
  var hasCodePointAt = typeof String.prototype.codePointAt === "function";

  // output/Data.String.Utils/index.js
  var includes = function(searchString) {
    return function(s2) {
      return includesImpl(searchString, s2);
    };
  };

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

  // output/Control.Monad.State.Trans/index.js
  var functorStateT = function(dictFunctor) {
    var map26 = map(dictFunctor);
    return {
      map: function(f) {
        return function(v) {
          return function(s2) {
            return map26(function(v1) {
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
    var bind7 = bind(dictMonad.Bind1());
    return {
      bind: function(v) {
        return function(f) {
          return function(s2) {
            return bind7(v(s2))(function(v1) {
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
    var pure17 = pure(dictMonad.Applicative0());
    return {
      pure: function(a2) {
        return function(s2) {
          return pure17(new Tuple(a2, s2));
        };
      },
      Apply0: function() {
        return applyStateT(dictMonad);
      }
    };
  };
  var monadStateStateT = function(dictMonad) {
    var pure17 = pure(dictMonad.Applicative0());
    var monadStateT1 = monadStateT(dictMonad);
    return {
      state: function(f) {
        return function($200) {
          return pure17(f($200));
        };
      },
      Monad0: function() {
        return monadStateT1;
      }
    };
  };

  // output/Control.Monad.State/index.js
  var evalState = function(v) {
    return function(s2) {
      var v1 = v(s2);
      return v1.value0;
    };
  };

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
        var $94 = {};
        for (var $95 in s2) {
          if ({}.hasOwnProperty.call(s2, $95)) {
            $94[$95] = s2[$95];
          }
          ;
        }
        ;
        $94.newSeed = lcgNext(s2.newSeed);
        return $94;
      }());
    };
    return state2(f);
  }();
  var functorGen = functorStateT2;
  var map22 = /* @__PURE__ */ map(functorGen);
  var evalGen = function($104) {
    return evalState(unGen($104));
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
      var choose31BitPosNumber = map22(toNumber)(lcgStep);
      var choose32BitPosNumber = apply4(map22(add2)(choose31BitPosNumber))(map22(mul2(2))(choose31BitPosNumber));
      return map22(function($109) {
        return floor2(clamp($109));
      })(choose32BitPosNumber);
    };
  };
  var chooseInt2 = function(a2) {
    return function(b2) {
      var $101 = a2 <= b2;
      if ($101) {
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
  var map15 = /* @__PURE__ */ map(functorEvent);
  var map16 = /* @__PURE__ */ map(functorFn);
  var map23 = /* @__PURE__ */ map(functorEffect);
  var $$void5 = /* @__PURE__ */ $$void(functorST);
  var show2 = /* @__PURE__ */ show(showInt);
  var arbitrary2 = /* @__PURE__ */ arbitrary(arbInt);
  var add3 = /* @__PURE__ */ add(semiringInt);
  var pure14 = /* @__PURE__ */ pure(applicativeEffect);
  var mempty3 = /* @__PURE__ */ mempty(/* @__PURE__ */ monoidFn(/* @__PURE__ */ monoidST(monoidUnit)));
  var empty9 = /* @__PURE__ */ empty(plusEvent);
  var coerce6 = /* @__PURE__ */ coerce();
  var unwrap5 = /* @__PURE__ */ unwrap();
  var eq4 = /* @__PURE__ */ eq(eqScope);
  var join2 = /* @__PURE__ */ join(freeBind);
  var pure23 = /* @__PURE__ */ pure(applicativeEvent);
  var EFunctionOfFFIDOMSnapshot = function(x) {
    return x;
  };
  var functorEFunctionOfFFIDOMS = {
    map: function(f) {
      return function(m2) {
        return map15(map16(map23(f)))(m2);
      };
    }
  };
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
          ez: false,
          raiseId: mempty3,
          ctor: envy(empty9)
        };
        return coerce6(giveNewParent_(Just.create)(runOnJust)(newA))(state4)();
      };
    };
  };
  var __internalDekuFlatten3 = function(a2) {
    return function(b2) {
      return function(c) {
        return flatten({
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
          ids: function($82) {
            return function(v) {
              return v.ids;
            }(unwrap5($82));
          },
          disconnectElement: function(v) {
            return function(v1) {
              return v.disconnectElement({
                id: v1.id,
                scope: v1.scope,
                parent: v1.parent,
                scopeEq: eq4
              });
            };
          },
          toElt: function(v) {
            return v;
          }
        })(a2)(b2)(coerce6(c));
      };
    };
  };
  var giveNewParentOrReconstruct = function(di) {
    return function(just) {
      return function(roj) {
        return function(gnp) {
          return join2(liftF(pure23(function(ffi) {
            var needsFreshNut = function() {
              var v = map15(function(a2) {
                return function(v1) {
                  return pure14(a2);
                };
              })(__internalDekuFlatten3({
                dynFamily: gnp.dynFamily,
                ez: gnp.ez,
                parent: new Just(gnp.parent),
                pos: gnp.pos,
                raiseId: gnp.raiseId,
                scope: gnp.scope
              })(di)(gnp.ctor));
              return pure14(wrap2(v));
            }();
            var hasIdAndInScope = pure14(liftF(pure23(giveNewParent_(just)(roj)(gnp))));
            return function __do3() {
              var hasId = stateHasKey(gnp.id)(ffi)();
              if (hasId) {
                var scope2 = getScope(gnp.id)(ffi)();
                if (scope2 instanceof Global) {
                  return hasIdAndInScope();
                }
                ;
                if (scope2 instanceof Local && gnp.scope instanceof Local) {
                  var $79 = includes(scope2.value0)(gnp.scope.value0);
                  if ($79) {
                    return hasIdAndInScope();
                  }
                  ;
                  return needsFreshNut();
                }
                ;
                return needsFreshNut();
              }
              ;
              return needsFreshNut();
            };
          })));
        };
      };
    };
  };
  var fullDOMInterpret = function(seed) {
    var l = {
      ids: function __do3() {
        var s2 = read2(seed)();
        var o = show2(evalGen(arbitrary2)({
          newSeed: mkSeed(s2),
          size: 5
        }));
        $$void5(modify2(add3(1))(seed))();
        return o;
      },
      makeElement: function() {
        var $83 = makeElement_(runOnJust)(false);
        return function($84) {
          return liftF(EFunctionOfFFIDOMSnapshot(pure23($83($84))));
        };
      }(),
      makeDynBeacon: function() {
        var $85 = makeDynBeacon_(runOnJust)(false);
        return function($86) {
          return liftF(EFunctionOfFFIDOMSnapshot(pure23($85($86))));
        };
      }(),
      attributeParent: function() {
        var $87 = attributeParent_(runOnJust);
        return function($88) {
          return liftF(EFunctionOfFFIDOMSnapshot(pure23($87($88))));
        };
      }(),
      makeRoot: function($89) {
        return liftF(EFunctionOfFFIDOMSnapshot(pure23(makeRoot_($89))));
      },
      makeText: function() {
        var $90 = makeText_(runOnJust)(false)(maybe(unit));
        return function($91) {
          return liftF(EFunctionOfFFIDOMSnapshot(pure23($90($91))));
        };
      }(),
      makePursx: function() {
        var $92 = makePursx_(runOnJust)(false)(maybe(unit));
        return function($93) {
          return liftF(EFunctionOfFFIDOMSnapshot(pure23($92($93))));
        };
      }(),
      setProp: function() {
        var $94 = setProp_(false);
        return function($95) {
          return liftF(EFunctionOfFFIDOMSnapshot(pure23($94($95))));
        };
      }(),
      setCb: function() {
        var $96 = setCb_(false);
        return function($97) {
          return liftF(EFunctionOfFFIDOMSnapshot(pure23($96($97))));
        };
      }(),
      unsetAttribute: function() {
        var $98 = unsetAttribute_(false);
        return function($99) {
          return liftF(EFunctionOfFFIDOMSnapshot(pure23($98($99))));
        };
      }(),
      setText: function($100) {
        return liftF(EFunctionOfFFIDOMSnapshot(pure23(setText_($100))));
      },
      sendToPos: function($101) {
        return liftF(EFunctionOfFFIDOMSnapshot(pure23(sendToPos2($101))));
      },
      removeDynBeacon: function($102) {
        return liftF(EFunctionOfFFIDOMSnapshot(pure23(removeDynBeacon_($102))));
      },
      deleteFromCache: function($103) {
        return liftF(EFunctionOfFFIDOMSnapshot(pure23(deleteFromCache_($103))));
      },
      giveNewParent: function(gnp) {
        return giveNewParentOrReconstruct(l)(Just.create)(runOnJust)(gnp);
      },
      disconnectElement: function($104) {
        return liftF(EFunctionOfFFIDOMSnapshot(pure23(disconnectElement_($104))));
      }
    };
    return l;
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
  var map17 = /* @__PURE__ */ map(functorEffect);
  var body2 = function(doc) {
    return map17(toMaybe)(function() {
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
  var keepLatest5 = /* @__PURE__ */ keepLatest(eventIsEvent);
  var map18 = /* @__PURE__ */ map(functorEvent);
  var resume2 = /* @__PURE__ */ resume(functorEFunctionOfFFIDOMS);
  var monoidEffect3 = /* @__PURE__ */ monoidEffect(monoidUnit);
  var mempty4 = /* @__PURE__ */ mempty(/* @__PURE__ */ monoidEvent(/* @__PURE__ */ monoidFn(monoidEffect3)));
  var pure11 = /* @__PURE__ */ pure(applicativeEffect);
  var bind6 = /* @__PURE__ */ bind(bindEffect);
  var mapFlipped2 = /* @__PURE__ */ mapFlipped(functorEffect);
  var liftST3 = /* @__PURE__ */ liftST(monadSTEffect);
  var mempty12 = /* @__PURE__ */ mempty(/* @__PURE__ */ monoidEffect(monoidEffect3));
  var map19 = /* @__PURE__ */ map(functorMaybe);
  var $$void6 = /* @__PURE__ */ $$void(functorEffect);
  var flattenToSingleEvent = function(ffi) {
    var go$prime = function(n) {
      var $52 = map18(go2(n));
      return function($53) {
        return keepLatest5($52($53));
      };
    };
    var go2 = function(n) {
      return function($54) {
        return function(v) {
          if (v instanceof Left) {
            return keepLatest5(map18(f(n))(v.value0));
          }
          ;
          if (v instanceof Right) {
            return mempty4;
          }
          ;
          throw new Error("Failed pattern match at Deku.Toplevel (line 47, column 21 - line 49, column 22): " + [v.constructor.name]);
        }(resume2($54));
      };
    };
    var f = function(n) {
      return function(i2) {
        return go$prime(n + 1 | 0)(makeEvent(function(k) {
          return function __do3() {
            unit;
            bind6(i2(ffi))(k)();
            return pure11(unit);
          };
        }));
      };
    };
    return go$prime(0);
  };
  var runInElement$prime = function(elt) {
    return function(eee) {
      return function __do3() {
        var ffi = makeFFIDOMSnapshot();
        var evt = mapFlipped2(liftST3(newSTRef(0)))(function() {
          var $55 = deku(elt)(eee);
          return function($56) {
            return $55(fullDOMInterpret($56));
          };
        }())();
        return subscribe(flattenToSingleEvent(ffi)(evt))(function(i2) {
          return i2(ffi);
        })();
      };
    };
  };
  var runInBody$prime = function(eee) {
    return function __do3() {
      var b$prime = bind6(bind6(windowImpl)(document2))(body2)();
      return maybe(mempty12)(function(elt) {
        return runInElement$prime(elt)(eee);
      })(map19(toElement)(b$prime))();
    };
  };
  var runInBody = function(a2) {
    return $$void6(runInBody$prime(a2));
  };

  // output/Rand/index.js
  var fromJust4 = /* @__PURE__ */ fromJust();
  var mod3 = /* @__PURE__ */ mod(euclideanRingInt);
  var div3 = /* @__PURE__ */ div(euclideanRingInt);
  var difference3 = /* @__PURE__ */ difference(eqInt);
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
          return function($copy_v2) {
            var $tco_var_v = $copy_v;
            var $tco_var_v1 = $copy_v1;
            var $tco_done = false;
            var $tco_result;
            function $tco_loop(v, v1, v2) {
              if (v.length === 0) {
                $tco_done = true;
                return v2;
              }
              ;
              if (v.length === 1) {
                $tco_done = true;
                return cons(v[0])(v2);
              }
              ;
              var r$prime$prime = rand(v1);
              var x = fromJust4(index(v)(mod3(r$prime$prime.val)(length(v))));
              $tco_var_v = difference3(v)([x]);
              $tco_var_v1 = r$prime$prime;
              $copy_v2 = cons(x)(v2);
              return;
            }
            ;
            while (!$tco_done) {
              $tco_result = $tco_loop($tco_var_v, $tco_var_v1, $copy_v2);
            }
            ;
            return $tco_result;
          };
        };
      };
      return shake(range2(0)(n - 1 | 0))(r)([]);
    };
  };
  var consume = function(v) {
    return function(v1) {
      if (v === 0) {
        return v1;
      }
      ;
      return rand(consume(v - 1 | 0)(v1));
    };
  };

  // output/Exercise1/index.js
  var show3 = /* @__PURE__ */ show(showInt);
  var unsafeIndex3 = /* @__PURE__ */ unsafeIndex();
  var mod4 = /* @__PURE__ */ mod(euclideanRingInt);
  var reduce2 = /* @__PURE__ */ reduce(ordInt)(euclideanRingInt);
  var discard3 = /* @__PURE__ */ discard(discardUnit)(/* @__PURE__ */ bindWriterT(semigroupNut)(bindIdentity));
  var map20 = /* @__PURE__ */ map(functorEvent);
  var div4 = /* @__PURE__ */ div(/* @__PURE__ */ euclideanRingRatio(ordInt)(euclideanRingInt));
  var showInt2 = function(n) {
    var $33 = n < 0;
    if ($33) {
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
    throw new Error("Failed pattern match at Exercise1 (line 52, column 13 - line 54, column 30): " + [v.constructor.name]);
  };
  var rshow = function(r) {
    var n = numerator(r);
    var d = denominator(r);
    var $35 = d === 1;
    if ($35) {
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
    var v = unsafeIndex3(problems)(mod4(rp2.val)(length(problems)));
    var ra = rand(rp2);
    var a2 = mod4(ra.val)(2) === 0;
    return {
      ac: v.ac,
      ab: v.ab,
      sqrtD: v.sqrtD,
      a: a2
    };
  };
  var fromInt2 = function(i2) {
    return reduce2(i2)(1);
  };
  var exo1 = function(f0) {
    return discard3(openSection_("Exercice I")("5 points"))(function() {
      return discard3(t_("Soit "))(function() {
        return discard3(m_("ABC"))(function() {
          return discard3(t_(" un triangle tel que "))(function() {
            var r0 = map20(fst)(f0);
            var p0 = map20(randomParam)(r0);
            return discard3(m(map20(function($59) {
              return function(v) {
                return "AB = " + v;
              }(show3(function(v) {
                return v.ab;
              }($59)));
            })(p0)))(function() {
              return discard3(t_(", "))(function() {
                return discard3(m(map20(function($60) {
                  return function(v) {
                    return "AC = " + v;
                  }(show3(function(v) {
                    return v.ac;
                  }($60)));
                })(p0)))(function() {
                  return discard3(t_(" et "))(function() {
                    return discard3(m(map20(function($61) {
                      return function(v) {
                        return v + ".";
                      }(function(v) {
                        return "\\widehat{ABC} = " + v;
                      }(showAngle(function(v) {
                        return v.a;
                      }($61))));
                    })(p0)))(function() {
                      return discard3(nl)(function() {
                        return discard3(t_("On note "))(function() {
                          return discard3(m_("BC=x."))(function() {
                            return discard3(nl)(function() {
                              return discard3(nl)(function() {
                                return discard3(b_2("1"))(function() {
                                  return discard3(m_("\\bullet\\bullet\\circ\\;"))(function() {
                                    return discard3(t_("Evaluer, en fonction de  "))(function() {
                                      return discard3(m_("x"))(function() {
                                        return discard3(t_(", le produit scalaire "))(function() {
                                          return discard3(m_("\\overrightarrow{BA}{\\Large\\cdot}\\overrightarrow{BC}"))(function() {
                                            return discard3(t_(" de "))(function() {
                                              return discard3(em_2("deux"))(function() {
                                                return discard3(t_(" mani\xE8res diff\xE9rentes."))(function() {
                                                  return discard3(nl)(function() {
                                                    return discard3(t_("En d\xE9duire que "))(function() {
                                                      return discard3(m_("x"))(function() {
                                                        return discard3(t_(" satisfait l'\xE9quation "))(function() {
                                                          return discard3(equation2(map20(function(v) {
                                                            var v1 = randomParam(v.value0);
                                                            return "x^2" + (function() {
                                                              if (v1.a) {
                                                                return "-";
                                                              }
                                                              ;
                                                              return "+";
                                                            }() + (show3(v1.ab) + ("x" + (showInt2(pow2(v1.ab)(2) - pow2(v1.ac)(2) | 0) + "=0"))));
                                                          })(f0)))(function() {
                                                            return discard3(nl)(function() {
                                                              return discard3(nl)(function() {
                                                                return discard3(b_2("2"))(function() {
                                                                  return discard3(m_("\\bullet\\bullet\\circ\\;"))(function() {
                                                                    return discard3(t_("R\xE9soudre cette \xE9quation, et en d\xE9duire la valeur de "))(function() {
                                                                      return discard3(m_("BC."))(function() {
                                                                        return discard3(nl)(function() {
                                                                          return t(map20(function(v) {
                                                                            var v1 = randomParam(v.value0);
                                                                            if (v.value1) {
                                                                              return "r\xE9ponse: " + rshow(div4(fromInt2(function() {
                                                                                if (v1.a) {
                                                                                  return v1.ab;
                                                                                }
                                                                                ;
                                                                                return -v1.ab | 0;
                                                                              }() + v1.sqrtD | 0))(fromInt2(2)));
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

  // output/Exercise2/index.js
  var discard4 = /* @__PURE__ */ discard(discardUnit)(/* @__PURE__ */ bindWriterT(semigroupNut)(bindIdentity));
  var map21 = /* @__PURE__ */ map(functorArray);
  var unsafeIndex4 = /* @__PURE__ */ unsafeIndex();
  var tell3 = /* @__PURE__ */ tell(/* @__PURE__ */ monadTellWriterT(monoidNut)(monadIdentity));
  var applicativeWriterT2 = /* @__PURE__ */ applicativeWriterT(monoidNut)(applicativeIdentity);
  var forWithIndex_2 = /* @__PURE__ */ forWithIndex_(applicativeWriterT2)(foldableWithIndexArray);
  var show4 = /* @__PURE__ */ show(showInt);
  var for_5 = /* @__PURE__ */ for_(applicativeWriterT2)(foldableArray);
  var pure15 = /* @__PURE__ */ pure(applicativeEvent);
  var pureAttr3 = /* @__PURE__ */ pureAttr(attrDiv_StyleString);
  var mapFlipped3 = /* @__PURE__ */ mapFlipped(functorEvent);
  var foldMapWithIndex2 = /* @__PURE__ */ foldMapWithIndex(foldableWithIndexArray)(monoidString);
  var vec = function(u2) {
    return "\\overrightarrow{" + (u2 + "}");
  };
  var norm = function(u2) {
    return "\\left\\|" + (vec(u2) + "\\right\\|");
  };
  var problems2 = /* @__PURE__ */ function() {
    return [{
      q: [m$prime("(" + (vec("u") + ("-" + (vec("v") + (") \\cdot(" + (vec("u") + ("+" + (vec("v") + ")")))))))), t$prime(" est toujours \xE9gal \xE0 ")],
      a: "2" + vec("u"),
      b: vec("u") + ("^2-" + (vec("v") + "^2")),
      c: vec("0"),
      r: "b"
    }, {
      q: [m$prime("\\left\\|" + (vec("u") + "\\right\\|")), t$prime(" est toujours \xE9gal \xE0 ")],
      a: "\\sqrt{" + (vec("u") + ("\\cdot" + (vec("u") + "}"))),
      b: vec("u"),
      c: "\\left\\|" + (vec("u") + "\\right\\|^2"),
      r: "a"
    }, {
      q: [m$prime("\\cos(" + (vec("u") + (";" + (vec("v") + ")")))), t$prime(" est toujours \xE9gal \xE0 ")],
      a: norm("u") + norm("v"),
      b: vec("u") + ("\\cdot" + vec("v")),
      c: "\\dfrac{" + (vec("u") + ("\\cdot" + (vec("v") + ("}{" + (norm("u") + (norm("v") + "}")))))),
      r: "c"
    }, {
      q: [m$prime(vec("u")), m$prime("^2"), t$prime(" est toujours \xE9gal \xE0 ")],
      a: "2" + vec("u"),
      b: vec("u"),
      c: "\\left\\|" + (vec("u") + "\\right\\|^2"),
      r: "c"
    }, {
      q: [m$prime(vec("u") + ("\\cdot" + vec("v"))), t$prime(" est toujours \xE9gal \xE0 ")],
      a: norm("u") + norm("v"),
      b: vec("v") + ("\\cdot" + vec("u")),
      c: "-" + (vec("v") + ("\\cdot" + vec("u"))),
      r: "b"
    }, {
      q: [t$prime("Soit "), m$prime("(u_n)_{n\\in \\mathbb{N}}"), t$prime(" la suite d\xE9finie par "), m$prime("u_n=2n^2-1"), t$prime("."), nl$prime, t$prime("L'expression de "), m$prime("u_{n+1}"), t$prime(" est donn\xE9e par")],
      a: "u_{n+1}=2n^2+4n+1",
      b: "u_{n+1}=2n^2",
      c: "u_{n+1}=2n^2-2n",
      r: "a"
    }, {
      q: [t$prime("Soit "), m$prime("(u_n)_{n>1}"), t$prime(" la suite d\xE9finie par "), m$prime("u_n=\\dfrac{1}{n-1}"), t$prime("."), nl$prime, t$prime("L'expression de "), m$prime("u_{n+1}-u_n"), t$prime(" est donn\xE9e par")],
      a: "u_{n+1}-u_n=\\dfrac{1}{n(n-1)}",
      b: "u_{n+1}-u_n=\\dfrac{1}{n(1-n)}",
      c: "u_{n+1}-u_n=\\dfrac{n}{n-1}",
      r: "b"
    }, {
      q: [t$prime("Soit "), m$prime("f"), t$prime(" une fonction d\xE9finie sur "), m$prime("\\mathbb{R}"), t$prime(". Soit "), m$prime("(u_n) "), t$prime(" la suite d\xE9finie par "), m$prime("u_n=f(n)"), t$prime("."), nl$prime, t$prime("Pour d\xE9terminer les variations de "), m$prime("(u_n)"), t$prime(", il suffit de conna\xEEtre ")],
      a: "\\mathrm{les}\\;\\mathrm{signes}\\;\\mathrm{de}\\; f",
      b: "\\mathrm{les}\\;\\mathrm{variations}\\;\\mathrm{de}\\; f",
      c: "\\mathrm{les}\\;\\mathrm{signes}\\;\\mathrm{de}\\; (u_n)",
      r: "b"
    }, {
      q: [t$prime("Soit "), m$prime("f"), t$prime(" une fonction d\xE9finie sur "), m$prime("\\mathbb{R}"), t$prime(". Soit "), m$prime("(u_n) "), t$prime(" une suite v\xE9rifiant "), m$prime("u_{n+1}-u_n=f(n)"), t$prime("."), nl$prime, t$prime("Pour d\xE9terminer les variations de "), m$prime("(u_n)"), t$prime(", il suffit de conna\xEEtre ")],
      a: "\\mathrm{les}\\;\\mathrm{signes}\\;\\mathrm{de}\\; f",
      b: "\\mathrm{les}\\;\\mathrm{variations}\\;\\mathrm{de}\\; f",
      c: "\\mathrm{les}\\;\\mathrm{signes}\\;\\mathrm{de}\\; (u_n)",
      r: "a"
    }, {
      q: [t$prime("Soit "), m$prime("(u_n) "), t$prime(" une suite monotone v\xE9rifiant "), m$prime("\\lim\\limits_{n\\to +\\infty} u_n = 3"), t$prime("."), nl$prime, t$prime("La ligne d\xE9finissant le d\xE9but de la boucle "), t$prime("tir\xE9e d'un programme en Python illustrant la convergence "), t$prime("de "), m$prime("(u_n)"), t$prime(" est ")],
      a: "\\verb|while abs(u-3) < 0.0001:|",
      b: "\\verb|while abs(3+u) > 0.0001:|",
      c: "\\verb|while abs(3-u) > 0.0001:|",
      r: "c"
    }];
  }();
  var exo2 = function(f0) {
    return discard4(openSection_("Exercice II")("5 points"))(function() {
      return discard4(em_2("Cet exercice est un questionnaire \xE0 choix multiple. Pour chaque question,"))(function() {
        return discard4(em_2(" une seule des r\xE9ponses propos\xE9es est correcte. Une bonne r\xE9ponse rapporte 1 point, "))(function() {
          return discard4(em_2(" une mauvaise r\xE9ponse enl\xE8ve 1 point tant que la note globale reste positive. "))(function() {
            return discard4(em_2(" Une absence de r\xE9ponse n'apporte et n'enl\xE8ve aucun point. Aucune justification n'est exig\xE9e."))(function() {
              var chooseIndices = function() {
                var $34 = unsort(length(problems2));
                return function($35) {
                  return $34(fst($35));
                };
              }();
              var chooseProblems = function($36) {
                return function(arr) {
                  return take(5)(map21(function(i2) {
                    return unsafeIndex4(problems2)(i2);
                  })(arr));
                }(chooseIndices($36));
              };
              return discard4(nl)(function() {
                return discard4(nl)(function() {
                  return discard4(tell3(switcherFlipped(f0)(function(f) {
                    return execWriter(forWithIndex_2(chooseProblems(f))(function(i2) {
                      return function(p2) {
                        return discard4(b_2(show4(i2 + 1 | 0)))(function() {
                          return discard4(m_("\\bullet\\;"))(function() {
                            return discard4(for_5(p2.q)(function(a2) {
                              return tell3(label([pure15(a2)])([]));
                            }))(function() {
                              return discard4(t_(" :"))(function() {
                                return discard4(nl)(function() {
                                  return discard4(nl)(function() {
                                    return discard4(tell3(div2([pureAttr3(Style.value)("display: grid; grid-template-columns: 1fr 1fr 1fr;")])([label_([execWriter(discard4(t_("(a) "))(function() {
                                      return m_(function(v) {
                                        return v.a;
                                      }(p2));
                                    }))]), label_([execWriter(discard4(t_("(b) "))(function() {
                                      return m_(function(v) {
                                        return v.b;
                                      }(p2));
                                    }))]), label_([execWriter(discard4(t_("(c) "))(function() {
                                      return m_(function(v) {
                                        return v.c;
                                      }(p2));
                                    }))])])))(function() {
                                      return discard4(nl)(function() {
                                        return nl;
                                      });
                                    });
                                  });
                                });
                              });
                            });
                          });
                        });
                      };
                    }));
                  })))(function() {
                    return tell3(label([mapFlipped3(mapFlipped3(f0)(function(x) {
                      return new Tuple(x, chooseProblems(x));
                    }))(function(v) {
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
                    })])([]));
                  });
                });
              });
            });
          });
        });
      });
    });
  };

  // output/Exercise3/index.js
  var discard5 = /* @__PURE__ */ discard(discardUnit)(/* @__PURE__ */ bindWriterT(semigroupNut)(bindIdentity));
  var map24 = /* @__PURE__ */ map(functorArray);
  var unsafeIndex5 = /* @__PURE__ */ unsafeIndex();
  var tell4 = /* @__PURE__ */ tell(/* @__PURE__ */ monadTellWriterT(monoidNut)(monadIdentity));
  var forWithIndex_3 = /* @__PURE__ */ forWithIndex_(/* @__PURE__ */ applicativeWriterT(monoidNut)(applicativeIdentity))(foldableWithIndexArray);
  var show5 = /* @__PURE__ */ show(showInt);
  var mapFlipped4 = /* @__PURE__ */ mapFlipped(functorEvent);
  var foldMapWithIndex3 = /* @__PURE__ */ foldMapWithIndex(foldableWithIndexArray)(monoidString);
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
  var exo3 = function(f0) {
    return discard5(openSection_("Exercice III")("5 points"))(function() {
      var chooseIndices = function() {
        var $27 = unsort(length(problems3));
        return function($28) {
          return $27(fst($28));
        };
      }();
      var chooseProblems = function($29) {
        return function(arr) {
          return take(2)(map24(function(i2) {
            return unsafeIndex5(problems3)(i2);
          })(arr));
        }(chooseIndices($29));
      };
      return discard5(tell4(switcherFlipped(f0)(function(f) {
        return execWriter(forWithIndex_3(chooseProblems(f))(function(i2) {
          return function(p2) {
            return discard5(b_2(show5(i2 + 1 | 0)))(function() {
              return discard5(m_("\\bullet\\bullet\\circ\\;"))(function() {
                return discard5(t_("Soit "))(function() {
                  return discard5(m_("(u_n)"))(function() {
                    return discard5(t_(" la suite d\xE9finie par "))(function() {
                      return discard5(m_(p2.sequence))(function() {
                        return discard5(t_(" pour tout "))(function() {
                          return discard5(m_(p2.domain))(function() {
                            return discard5(t_("."))(function() {
                              return discard5(nl)(function() {
                                return discard5(t_(" Etudier les variations de "))(function() {
                                  return discard5(m_("(u_n)"))(function() {
                                    return discard5(t_("."))(function() {
                                      return nl;
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
        }));
      })))(function() {
        return tell4(label([mapFlipped4(mapFlipped4(f0)(function(x) {
          return new Tuple(x, chooseProblems(x));
        }))(function(v) {
          return t$prime(function() {
            if (v.value0.value1) {
              return "r\xE9ponses: " + foldMapWithIndex3(function(i2) {
                return function(a2) {
                  return " " + (show5(i2 + 1 | 0) + (") (" + (a2.answer + ")")));
                };
              })(v.value1);
            }
            ;
            return "";
          }());
        })])([]));
      });
    });
  };

  // output/Exercise4/index.js
  var discard6 = /* @__PURE__ */ discard(discardUnit)(/* @__PURE__ */ bindWriterT(semigroupNut)(bindIdentity));
  var exo4 = function(v) {
    return discard6(openSection_("Exercice IV")("5 points"))(function() {
      return discard6(t_("Soit "))(function() {
        return discard6(m_("(p_n)"))(function() {
          return discard6(t_(" la suite d\xE9finie pour "))(function() {
            return discard6(m_("n\\geq 2"))(function() {
              return discard6(t_(" par "))(function() {
                return discard6(m_("\\left\\{\\begin{array}{l}p_2=\\sqrt{6}\\\\p_{n+1}=\\sqrt{p_n^2+\\dfrac{6}{n^2}}\\end{array}\\right."))(function() {
                  return discard6(t_("."))(function() {
                    return discard6(nl)(function() {
                      return discard6(nl)(function() {
                        return discard6(b_2("1"))(function() {
                          return discard6(m_("\\bullet\\bullet\\;"))(function() {
                            return discard6(t_("Montrer que "))(function() {
                              return discard6(m_("p_n>0"))(function() {
                                return discard6(t_(" pour tout "))(function() {
                                  return discard6(m_("n\\geq 2"))(function() {
                                    return discard6(t_("."))(function() {
                                      return discard6(nl)(function() {
                                        return discard6(b_2("2"))(function() {
                                          return discard6(m_("\\bullet\\bullet\\;"))(function() {
                                            return discard6(t_("Montrer que "))(function() {
                                              return discard6(m_("(p_n)"))(function() {
                                                return discard6(t_(" est croissante pour tout "))(function() {
                                                  return discard6(m_("n\\geq 2"))(function() {
                                                    return discard6(t_("."))(function() {
                                                      return discard6(nl)(function() {
                                                        return discard6(b_2("3"))(function() {
                                                          return discard6(m_("\\bullet\\;"))(function() {
                                                            return discard6(t_("A l'aide de la calculatrice, dire si la suite semble convergente."))(function() {
                                                              return discard6(nl)(function() {
                                                                return discard6(t_("Si oui, conjecturer la valeur de sa limite quand "))(function() {
                                                                  return discard6(m_("n"))(function() {
                                                                    return discard6(t_(" tend vers "))(function() {
                                                                      return discard6(m_("+\\infty"))(function() {
                                                                        return discard6(t_("."))(function() {
                                                                          return discard6(nl)(function() {
                                                                            return nl;
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

  // output/Main/index.js
  var discard7 = /* @__PURE__ */ discard(discardUnit);
  var discard1 = /* @__PURE__ */ discard7(/* @__PURE__ */ bindWriterT(semigroupNut)(bindIdentity));
  var tell5 = /* @__PURE__ */ tell(/* @__PURE__ */ monadTellWriterT(monoidNut)(monadIdentity));
  var pureAttr4 = /* @__PURE__ */ pureAttr(attrDiv_StyleString);
  var abs4 = /* @__PURE__ */ abs(ordInt)(ringInt);
  var map25 = /* @__PURE__ */ map(functorEvent);
  var set3 = /* @__PURE__ */ set({
    reflectSymbol: function() {
      return "textContent";
    }
  })()();
  var set1 = /* @__PURE__ */ set({
    reflectSymbol: function() {
      return "enabled";
    }
  })()();
  var pureAttr12 = /* @__PURE__ */ pureAttr(attrInput_SizeString);
  var pureAttr22 = /* @__PURE__ */ pureAttr(attrInput_AutofocusString);
  var attr4 = /* @__PURE__ */ attr(attrDiv_StyleString);
  var alt7 = /* @__PURE__ */ alt(altEvent);
  var pure16 = /* @__PURE__ */ pure(applicativeEvent);
  var map110 = /* @__PURE__ */ map(functorFn);
  var header2 = /* @__PURE__ */ discard1(/* @__PURE__ */ setTitle_("Devoir 8 : Produit scalaire / Suites num\xE9riques"))(function() {
    return discard1(nl)(function() {
      return discard1(tell5(div2([pureAttr4(Style.value)("display: grid; grid-template-columns: 1fr 1fr 1fr;")])([label_([text_("Nom:")]), label_([text_("Pr\xE9nom:")]), label_([text_("Classe:")])])))(function() {
        return tell5(ul_([li_([text_("4 exercices")]), li_([execWriter(discard1(t_("5 points par exercice ("))(function() {
          return discard1(m_("\\bullet"))(function() {
            return discard1(t_(": 1 point, "))(function() {
              return discard1(m_("\\circ"))(function() {
                return discard1(t_(": "))(function() {
                  return discard1(m_("\\frac{1}{2}"))(function() {
                    return t_(" point)");
                  });
                });
              });
            });
          });
        }))]), li_([text_("sans document")]), li_([text_("calculatrice n\xE9cessaire")])]));
      });
    });
  });
  var fromRelative = function(n) {
    var odd = (2 * abs4(n) | 0) + 1 | 0;
    return rand({
      val: odd,
      gen: 0,
      seed: odd * odd | 0
    });
  };
  var main2 = function __do2() {
    runInBody(execWriter(header2))();
    return runInBody(bind4(useState({
      textContent: "",
      enabled: false
    }))(function(v) {
      return div_([div_([label_([text_("Enonc\xE9 n\xB0 ")]), input([textInput(map25(function() {
        var $60 = flip(set3($$Proxy.value));
        return function($61) {
          return function(v1) {
            return function($62) {
              return v.value0(v1($62));
            };
          }($60($61));
        };
      }())(v.value1)), keyDown(map25(function() {
        var $63 = flip(function() {
          var $65 = set1($$Proxy.value);
          return function($66) {
            return $65(function(k) {
              return code2(k) === "Enter" || key(k) === "Enter";
            }($66));
          };
        }());
        return function($64) {
          return function(v1) {
            return function($67) {
              return v.value0(v1($67));
            };
          }($63($64));
        };
      }())(v.value1)), pureAttr12(Size.value)("56"), pureAttr22(Autofocus.value)("")])([])]), div2([map25(function(v1) {
        if (v1) {
          return attr4(Style.value)("display: block;");
        }
        ;
        return attr4(Style.value)("display: none;");
      })(alt7(pure16(false))(map25(function(v1) {
        return v1.enabled;
      })(v.value1)))])(function() {
        var f0 = map25(function(x) {
          return new Tuple(fromRelative(x), x < 0);
        })(map25(map110(toSeed)(function(v1) {
          return v1.textContent;
        }))(v.value1));
        var f1 = map25(function(v1) {
          return new Tuple(consume(30)(v1.value0), v1.value1);
        })(f0);
        var f2 = map25(function(v1) {
          return new Tuple(consume(30)(v1.value0), v1.value1);
        })(f1);
        var f3 = map25(function(v1) {
          return new Tuple(consume(30)(v1.value0), v1.value1);
        })(f2);
        return [execWriter(discard1(nl)(function() {
          return discard1(exo1(f1))(function() {
            return discard1(nl)(function() {
              return discard1(nl)(function() {
                return discard1(exo2(f2))(function() {
                  return discard1(nl)(function() {
                    return discard1(nl)(function() {
                      return discard1(exo3(f3))(function() {
                        return discard1(nl)(function() {
                          return discard1(nl)(function() {
                            return exo4(f0);
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        }))];
      }())]);
    }))();
  };

  // <stdin>
  main2();
})();
