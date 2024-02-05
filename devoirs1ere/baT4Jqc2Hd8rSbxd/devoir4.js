#!/usr/bin/env node
(() => {
  // output/Control.Apply/foreign.js
  var arrayApply = function(fs) {
    return function(xs) {
      var l = fs.length;
      var k = xs.length;
      var result = new Array(l * k);
      var n = 0;
      for (var i = 0; i < l; i++) {
        var f = fs[i];
        for (var j = 0; j < k; j++) {
          result[n++] = f(xs[j]);
        }
      }
      return result;
    };
  };

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
  var composeFlipped = function(dictSemigroupoid) {
    var compose1 = compose(dictSemigroupoid);
    return function(f) {
      return function(g) {
        return compose1(g)(f);
      };
    };
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
    return function(b) {
      return function(a2) {
        return f(a2)(b);
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
      for (var i = 0; i < l; i++) {
        result[i] = f(arr[i]);
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
  var $$void = function(dictFunctor) {
    return map(dictFunctor)($$const(unit));
  };
  var voidLeft = function(dictFunctor) {
    var map111 = map(dictFunctor);
    return function(f) {
      return function(x) {
        return map111($$const(x))(f);
      };
    };
  };
  var functorFn = {
    map: /* @__PURE__ */ compose(semigroupoidFn)
  };
  var functorArray = {
    map: arrayMap
  };

  // output/Control.Apply/index.js
  var identity2 = /* @__PURE__ */ identity(categoryFn);
  var applyFn = {
    apply: function(f) {
      return function(g) {
        return function(x) {
          return f(x)(g(x));
        };
      };
    },
    Functor0: function() {
      return functorFn;
    }
  };
  var applyArray = {
    apply: arrayApply,
    Functor0: function() {
      return functorArray;
    }
  };
  var apply = function(dict) {
    return dict.apply;
  };
  var applySecond = function(dictApply) {
    var apply1 = apply(dictApply);
    var map25 = map(dictApply.Functor0());
    return function(a2) {
      return function(b) {
        return apply1(map25($$const(identity2))(a2))(b);
      };
    };
  };
  var lift2 = function(dictApply) {
    var apply1 = apply(dictApply);
    var map25 = map(dictApply.Functor0());
    return function(f) {
      return function(a2) {
        return function(b) {
          return apply1(map25(f)(a2))(b);
        };
      };
    };
  };

  // output/Control.Applicative/index.js
  var pure = function(dict) {
    return dict.pure;
  };
  var when = function(dictApplicative) {
    var pure19 = pure(dictApplicative);
    return function(v) {
      return function(v1) {
        if (v) {
          return v1;
        }
        ;
        if (!v) {
          return pure19(unit);
        }
        ;
        throw new Error("Failed pattern match at Control.Applicative (line 63, column 1 - line 63, column 63): " + [v.constructor.name, v1.constructor.name]);
      };
    };
  };
  var liftA1 = function(dictApplicative) {
    var apply6 = apply(dictApplicative.Apply0());
    var pure19 = pure(dictApplicative);
    return function(f) {
      return function(a2) {
        return apply6(pure19(f))(a2);
      };
    };
  };
  var applicativeFn = {
    pure: function(x) {
      return function(v) {
        return x;
      };
    },
    Apply0: function() {
      return applyFn;
    }
  };

  // output/Control.Bind/foreign.js
  var arrayBind = function(arr) {
    return function(f) {
      var result = [];
      for (var i = 0, l = arr.length; i < l; i++) {
        Array.prototype.push.apply(result, f(arr[i]));
      }
      return result;
    };
  };

  // output/Control.Bind/index.js
  var identity3 = /* @__PURE__ */ identity(categoryFn);
  var discard = function(dict) {
    return dict.discard;
  };
  var bindArray = {
    bind: arrayBind,
    Apply0: function() {
      return applyArray;
    }
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
  var join = function(dictBind) {
    var bind1 = bind(dictBind);
    return function(m) {
      return bind1(m)(identity3);
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
  var ordStringImpl = unsafeCompareImpl;

  // output/Data.Eq/foreign.js
  var refEq = function(r1) {
    return function(r2) {
      return r1 === r2;
    };
  };
  var eqIntImpl = refEq;
  var eqStringImpl = refEq;

  // output/Data.Symbol/index.js
  var reflectSymbol = function(dict) {
    return dict.reflectSymbol;
  };

  // output/Record.Unsafe/foreign.js
  var unsafeGet = function(label5) {
    return function(rec) {
      return rec[label5];
    };
  };
  var unsafeSet = function(label5) {
    return function(value13) {
      return function(rec) {
        var copy = {};
        for (var key2 in rec) {
          if ({}.hasOwnProperty.call(rec, key2)) {
            copy[key2] = rec[key2];
          }
        }
        copy[label5] = value13;
        return copy;
      };
    };
  };

  // output/Data.Eq/index.js
  var eqString = {
    eq: eqStringImpl
  };
  var eqInt = {
    eq: eqIntImpl
  };
  var eq1 = function(dict) {
    return dict.eq1;
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
    var sub1 = sub(dictRing);
    var zero2 = zero(dictRing.Semiring0());
    return function(a2) {
      return sub1(zero2)(a2);
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
  var compare1 = function(dict) {
    return dict.compare1;
  };
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
  var lessThanOrEq = function(dictOrd) {
    var compare3 = compare(dictOrd);
    return function(a1) {
      return function(a2) {
        var v = compare3(a1)(a2);
        if (v instanceof GT) {
          return false;
        }
        ;
        return true;
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
  var boolNot = function(b) {
    return !b;
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
    implies: function(a2) {
      return function(b) {
        return disj(heytingAlgebraBoolean)(not(heytingAlgebraBoolean)(a2))(b);
      };
    },
    conj: boolConj,
    disj: boolDisj,
    not: boolNot
  };
  var conj = function(dict) {
    return dict.conj;
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
        return function(b) {
          var $24 = eq5(b)(zero2);
          if ($24) {
            return a2;
          }
          ;
          return gcd(dictEq)(dictEuclideanRing)(b)(mod1(a2)(b));
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
  var semigroupRecordNil = {
    appendRecord: function(v) {
      return function(v1) {
        return function(v2) {
          return {};
        };
      };
    }
  };
  var semigroupArray = {
    append: concatArray
  };
  var appendRecord = function(dict) {
    return dict.appendRecord;
  };
  var semigroupRecord = function() {
    return function(dictSemigroupRecord) {
      return {
        append: appendRecord(dictSemigroupRecord)($$Proxy.value)
      };
    };
  };
  var append = function(dict) {
    return dict.append;
  };
  var semigroupFn = function(dictSemigroup) {
    var append13 = append(dictSemigroup);
    return {
      append: function(f) {
        return function(g) {
          return function(x) {
            return append13(f(x))(g(x));
          };
        };
      }
    };
  };
  var semigroupRecordCons = function(dictIsSymbol) {
    var reflectSymbol2 = reflectSymbol(dictIsSymbol);
    return function() {
      return function(dictSemigroupRecord) {
        var appendRecord1 = appendRecord(dictSemigroupRecord);
        return function(dictSemigroup) {
          var append13 = append(dictSemigroup);
          return {
            appendRecord: function(v) {
              return function(ra) {
                return function(rb) {
                  var tail3 = appendRecord1($$Proxy.value)(ra)(rb);
                  var key2 = reflectSymbol2($$Proxy.value);
                  var insert6 = unsafeSet(key2);
                  var get2 = unsafeGet(key2);
                  return insert6(append13(get2(ra))(get2(rb)))(tail3);
                };
              };
            }
          };
        };
      };
    };
  };

  // output/Data.Monoid/index.js
  var semigroupRecord2 = /* @__PURE__ */ semigroupRecord();
  var monoidUnit = {
    mempty: unit,
    Semigroup0: function() {
      return semigroupUnit;
    }
  };
  var monoidRecordNil = {
    memptyRecord: function(v) {
      return {};
    },
    SemigroupRecord0: function() {
      return semigroupRecordNil;
    }
  };
  var memptyRecord = function(dict) {
    return dict.memptyRecord;
  };
  var monoidRecord = function() {
    return function(dictMonoidRecord) {
      var semigroupRecord1 = semigroupRecord2(dictMonoidRecord.SemigroupRecord0());
      return {
        mempty: memptyRecord(dictMonoidRecord)($$Proxy.value),
        Semigroup0: function() {
          return semigroupRecord1;
        }
      };
    };
  };
  var mempty = function(dict) {
    return dict.mempty;
  };
  var monoidFn = function(dictMonoid) {
    var mempty12 = mempty(dictMonoid);
    var semigroupFn2 = semigroupFn(dictMonoid.Semigroup0());
    return {
      mempty: function(v) {
        return mempty12;
      },
      Semigroup0: function() {
        return semigroupFn2;
      }
    };
  };
  var monoidRecordCons = function(dictIsSymbol) {
    var reflectSymbol2 = reflectSymbol(dictIsSymbol);
    var semigroupRecordCons2 = semigroupRecordCons(dictIsSymbol)();
    return function(dictMonoid) {
      var mempty12 = mempty(dictMonoid);
      var Semigroup0 = dictMonoid.Semigroup0();
      return function() {
        return function(dictMonoidRecord) {
          var memptyRecord1 = memptyRecord(dictMonoidRecord);
          var semigroupRecordCons1 = semigroupRecordCons2(dictMonoidRecord.SemigroupRecord0())(Semigroup0);
          return {
            memptyRecord: function(v) {
              var tail3 = memptyRecord1($$Proxy.value);
              var key2 = reflectSymbol2($$Proxy.value);
              var insert6 = unsafeSet(key2);
              return insert6(mempty12)(tail3);
            },
            SemigroupRecord0: function() {
              return semigroupRecordCons1;
            }
          };
        };
      };
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
      return function(m) {
        return new Tuple(m.value0, f(m.value1));
      };
    }
  };
  var fst = function(v) {
    return v.value0;
  };

  // output/Control.Monad.Writer.Class/index.js
  var tell = function(dict) {
    return dict.tell;
  };

  // output/Control.Alt/index.js
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
  var altMaybe = {
    alt: function(v) {
      return function(v1) {
        if (v instanceof Nothing) {
          return v1;
        }
        ;
        return v;
      };
    },
    Functor0: function() {
      return functorMaybe;
    }
  };
  var plusMaybe = /* @__PURE__ */ function() {
    return {
      empty: Nothing.value,
      Alt0: function() {
        return altMaybe;
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
  var foreachE = function(as) {
    return function(f) {
      return function() {
        for (var i = 0, l = as.length; i < l; i++) {
          f(as[i])();
        }
      };
    };
  };

  // output/Control.Monad/index.js
  var ap = function(dictMonad) {
    var bind8 = bind(dictMonad.Bind1());
    var pure19 = pure(dictMonad.Applicative0());
    return function(f) {
      return function(a2) {
        return bind8(f)(function(f$prime) {
          return bind8(a2)(function(a$prime) {
            return pure19(f$prime(a$prime));
          });
        });
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

  // output/Effect.Exception/foreign.js
  function error(msg) {
    return new Error(msg);
  }
  function throwException(e) {
    return function() {
      throw e;
    };
  }

  // output/Data.Identity/index.js
  var Identity = function(x) {
    return x;
  };
  var functorIdentity = {
    map: function(f) {
      return function(m) {
        return f(m);
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

  // output/Control.Plus/index.js
  var empty = function(dict) {
    return dict.empty;
  };

  // output/Effect.Class/index.js
  var liftEffect = function(dict) {
    return dict.liftEffect;
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
    var map25 = map(dictFunctor);
    return {
      map: function(f) {
        return mapWriterT(map25(function(v) {
          return new Tuple(f(v.value0), v.value1);
        }));
      }
    };
  };
  var applyWriterT = function(dictSemigroup) {
    var append7 = append(dictSemigroup);
    return function(dictApply) {
      var apply6 = apply(dictApply);
      var Functor0 = dictApply.Functor0();
      var map25 = map(Functor0);
      var functorWriterT1 = functorWriterT(Functor0);
      return {
        apply: function(v) {
          return function(v1) {
            var k = function(v3) {
              return function(v4) {
                return new Tuple(v3.value0(v4.value0), append7(v3.value1)(v4.value1));
              };
            };
            return apply6(map25(k)(v))(v1);
          };
        },
        Functor0: function() {
          return functorWriterT1;
        }
      };
    };
  };
  var bindWriterT = function(dictSemigroup) {
    var append7 = append(dictSemigroup);
    var applyWriterT1 = applyWriterT(dictSemigroup);
    return function(dictBind) {
      var bind8 = bind(dictBind);
      var Apply0 = dictBind.Apply0();
      var map25 = map(Apply0.Functor0());
      var applyWriterT2 = applyWriterT1(Apply0);
      return {
        bind: function(v) {
          return function(k) {
            return bind8(v)(function(v1) {
              var v2 = k(v1.value0);
              return map25(function(v3) {
                return new Tuple(v3.value0, append7(v1.value1)(v3.value1));
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
      var pure19 = pure(dictApplicative);
      var applyWriterT2 = applyWriterT1(dictApplicative.Apply0());
      return {
        pure: function(a2) {
          return pure19(new Tuple(a2, mempty5));
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
      var applicativeWriterT2 = applicativeWriterT1(dictMonad.Applicative0());
      var bindWriterT2 = bindWriterT1(dictMonad.Bind1());
      return {
        Applicative0: function() {
          return applicativeWriterT2;
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
  var alaF = function() {
    return function() {
      return function() {
        return function() {
          return function(v) {
            return coerce2;
          };
        };
      };
    };
  };

  // output/Control.Monad.Writer/index.js
  var unwrap2 = /* @__PURE__ */ unwrap();
  var runWriter = function($5) {
    return unwrap2(runWriterT($5));
  };
  var execWriter = function(m) {
    return snd(runWriter(m));
  };

  // output/Data.Array/foreign.js
  var replicateFill = function(count2, value13) {
    if (count2 < 1) {
      return [];
    }
    var result = new Array(count2);
    return result.fill(value13);
  };
  var replicatePolyfill = function(count2, value13) {
    var result = [];
    var n = 0;
    for (var i = 0; i < count2; i++) {
      result[n++] = value13;
    }
    return result;
  };
  var replicateImpl = typeof Array.prototype.fill === "function" ? replicateFill : replicatePolyfill;
  var fromFoldableImpl = function() {
    function Cons2(head3, tail3) {
      this.head = head3;
      this.tail = tail3;
    }
    var emptyList = {};
    function curryCons(head3) {
      return function(tail3) {
        return new Cons2(head3, tail3);
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
    return function(foldr7, xs) {
      return listToArray(foldr7(curryCons)(emptyList)(xs));
    };
  }();
  var length = function(xs) {
    return xs.length;
  };
  var unconsImpl = function(empty10, next2, xs) {
    return xs.length === 0 ? empty10({}) : next2(xs[0])(xs.slice(1));
  };
  var indexImpl = function(just, nothing, xs, i) {
    return i < 0 || i >= xs.length ? nothing : just(xs[i]);
  };
  var findIndexImpl = function(just, nothing, f, xs) {
    for (var i = 0, l = xs.length; i < l; i++) {
      if (f(xs[i]))
        return just(i);
    }
    return nothing;
  };
  var _deleteAt = function(just, nothing, i, l) {
    if (i < 0 || i >= l.length)
      return nothing;
    var l1 = l.slice();
    l1.splice(i, 1);
    return just(l1);
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
    return function(compare2, fromOrdering, xs) {
      var out;
      if (xs.length < 2)
        return xs;
      out = xs.slice(0);
      mergeFromTo(compare2, fromOrdering, out, xs.slice(0), 0, xs.length);
      return out;
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
        var t = f(ref.value);
        ref.value = t.state;
        return t.value;
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
  var modify$prime = modifyImpl2;
  var modify = function(f) {
    return modify$prime(function(s) {
      var s$prime = f(s);
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
  function unsafeFreezeThawImpl(xs) {
    return xs;
  }
  var unsafeFreezeImpl = unsafeFreezeThawImpl;
  function copyImpl(xs) {
    return xs.slice();
  }
  var freezeImpl = copyImpl;
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
    return function(compare2, fromOrdering, xs) {
      if (xs.length < 2)
        return xs;
      mergeFromTo(compare2, fromOrdering, xs, xs.slice(0), 0, xs.length);
      return xs;
    };
  }();
  var pushImpl = function(a2, xs) {
    return xs.push(a2);
  };

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
      return function(b) {
        return function() {
          return fn(a2, b);
        };
      };
    };
  };

  // output/Data.Array.ST/index.js
  var unsafeFreeze = /* @__PURE__ */ runSTFn1(unsafeFreezeImpl);
  var push = /* @__PURE__ */ runSTFn2(pushImpl);
  var freeze = /* @__PURE__ */ runSTFn1(freezeImpl);

  // output/Data.Array.ST.Iterator/index.js
  var map3 = /* @__PURE__ */ map(functorST);
  var not2 = /* @__PURE__ */ not(heytingAlgebraBoolean);
  var $$void2 = /* @__PURE__ */ $$void(functorST);
  var Iterator = /* @__PURE__ */ function() {
    function Iterator2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Iterator2.create = function(value0) {
      return function(value1) {
        return new Iterator2(value0, value1);
      };
    };
    return Iterator2;
  }();
  var next = function(v) {
    return function __do6() {
      var i = read2(v.value1)();
      modify(function(v1) {
        return v1 + 1 | 0;
      })(v.value1)();
      return v.value0(i);
    };
  };
  var iterator = function(f) {
    return map3(Iterator.create(f))(newSTRef(0));
  };
  var iterate = function(iter) {
    return function(f) {
      return function __do6() {
        var $$break = newSTRef(false)();
        while (map3(not2)(read2($$break))()) {
          (function __do7() {
            var mx = next(iter)();
            if (mx instanceof Just) {
              return f(mx.value0)();
            }
            ;
            if (mx instanceof Nothing) {
              return $$void2(write2(true)($$break))();
            }
            ;
            throw new Error("Failed pattern match at Data.Array.ST.Iterator (line 42, column 5 - line 44, column 47): " + [mx.constructor.name]);
          })();
        }
        ;
        return {};
      };
    };
  };

  // output/Data.Foldable/foreign.js
  var foldrArray = function(f) {
    return function(init2) {
      return function(xs) {
        var acc = init2;
        var len = xs.length;
        for (var i = len - 1; i >= 0; i--) {
          acc = f(xs[i])(acc);
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
        for (var i = 0; i < len; i++) {
          acc = f(acc)(xs[i]);
        }
        return acc;
      };
    };
  };

  // output/Data.Monoid.Conj/index.js
  var Conj = function(x) {
    return x;
  };
  var semigroupConj = function(dictHeytingAlgebra) {
    var conj2 = conj(dictHeytingAlgebra);
    return {
      append: function(v) {
        return function(v1) {
          return conj2(v)(v1);
        };
      }
    };
  };
  var monoidConj = function(dictHeytingAlgebra) {
    var semigroupConj1 = semigroupConj(dictHeytingAlgebra);
    return {
      mempty: tt(dictHeytingAlgebra),
      Semigroup0: function() {
        return semigroupConj1;
      }
    };
  };

  // output/Data.Monoid.Endo/index.js
  var semigroupEndo = function(dictSemigroupoid) {
    var compose3 = compose(dictSemigroupoid);
    return {
      append: function(v) {
        return function(v1) {
          return compose3(v)(v1);
        };
      }
    };
  };
  var monoidEndo = function(dictCategory) {
    var semigroupEndo1 = semigroupEndo(dictCategory.Semigroupoid0());
    return {
      mempty: identity(dictCategory),
      Semigroup0: function() {
        return semigroupEndo1;
      }
    };
  };

  // output/Data.Foldable/index.js
  var alaF2 = /* @__PURE__ */ alaF()()()();
  var foldr = function(dict) {
    return dict.foldr;
  };
  var oneOf = function(dictFoldable) {
    var foldr22 = foldr(dictFoldable);
    return function(dictPlus) {
      return foldr22(alt(dictPlus.Alt0()))(empty(dictPlus));
    };
  };
  var traverse_ = function(dictApplicative) {
    var applySecond4 = applySecond(dictApplicative.Apply0());
    var pure19 = pure(dictApplicative);
    return function(dictFoldable) {
      var foldr22 = foldr(dictFoldable);
      return function(f) {
        return foldr22(function($454) {
          return applySecond4(f($454));
        })(pure19(unit));
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
      var append7 = append(dictMonoid.Semigroup0());
      var mempty5 = mempty(dictMonoid);
      return function(f) {
        return foldr22(function(x) {
          return function(acc) {
            return append7(f(x))(acc);
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
  var all = function(dictFoldable) {
    var foldMap22 = foldMap(dictFoldable);
    return function(dictHeytingAlgebra) {
      return alaF2(Conj)(foldMap22(monoidConj(dictHeytingAlgebra)));
    };
  };

  // output/Data.Function.Uncurried/foreign.js
  var runFn2 = function(fn) {
    return function(a2) {
      return function(b) {
        return fn(a2, b);
      };
    };
  };
  var runFn3 = function(fn) {
    return function(a2) {
      return function(b) {
        return function(c) {
          return fn(a2, b, c);
        };
      };
    };
  };
  var runFn4 = function(fn) {
    return function(a2) {
      return function(b) {
        return function(c) {
          return function(d) {
            return fn(a2, b, c, d);
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

  // output/Data.Traversable/foreign.js
  var traverseArrayImpl = function() {
    function array1(a2) {
      return [a2];
    }
    function array2(a2) {
      return function(b) {
        return [a2, b];
      };
    }
    function array3(a2) {
      return function(b) {
        return function(c) {
          return [a2, b, c];
        };
      };
    }
    function concat2(xs) {
      return function(ys) {
        return xs.concat(ys);
      };
    }
    return function(apply6) {
      return function(map25) {
        return function(pure19) {
          return function(f) {
            return function(array) {
              function go2(bot, top3) {
                switch (top3 - bot) {
                  case 0:
                    return pure19([]);
                  case 1:
                    return map25(array1)(f(array[bot]));
                  case 2:
                    return apply6(map25(array2)(f(array[bot])))(f(array[bot + 1]));
                  case 3:
                    return apply6(apply6(map25(array3)(f(array[bot])))(f(array[bot + 1])))(f(array[bot + 2]));
                  default:
                    var pivot = bot + Math.floor((top3 - bot) / 4) * 2;
                    return apply6(map25(concat2)(go2(bot, pivot)))(go2(pivot, top3));
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
    pure: function(a2) {
      return function(s) {
        return {
          accum: s,
          value: a2
        };
      };
    },
    Apply0: function() {
      return applyStateL;
    }
  };

  // output/Data.Traversable/index.js
  var identity5 = /* @__PURE__ */ identity(categoryFn);
  var traverse = function(dict) {
    return dict.traverse;
  };
  var sequenceDefault = function(dictTraversable) {
    var traverse2 = traverse(dictTraversable);
    return function(dictApplicative) {
      return traverse2(dictApplicative)(identity5);
    };
  };
  var traversableArray = {
    traverse: function(dictApplicative) {
      var Apply0 = dictApplicative.Apply0();
      return traverseArrayImpl(apply(Apply0))(map(Apply0.Functor0()))(pure(dictApplicative));
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
    var traverse2 = traverse(dictTraversable)(applicativeStateL);
    return function(f) {
      return function(s0) {
        return function(xs) {
          return stateL(traverse2(function(a2) {
            return function(s) {
              return f(s)(a2);
            };
          })(xs))(s0);
        };
      };
    };
  };
  var scanl = function(dictTraversable) {
    var mapAccumL1 = mapAccumL(dictTraversable);
    return function(f) {
      return function(b0) {
        return function(xs) {
          return mapAccumL1(function(b) {
            return function(a2) {
              var b$prime = f(b)(a2);
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

  // output/Data.Array/index.js
  var $$void3 = /* @__PURE__ */ $$void(functorST);
  var fromJust2 = /* @__PURE__ */ fromJust();
  var append2 = /* @__PURE__ */ append(semigroupArray);
  var uncons = /* @__PURE__ */ function() {
    return runFn3(unconsImpl)($$const(Nothing.value))(function(x) {
      return function(xs) {
        return new Just({
          head: x,
          tail: xs
        });
      };
    });
  }();
  var replicate = /* @__PURE__ */ runFn2(replicateImpl);
  var index = /* @__PURE__ */ function() {
    return runFn4(indexImpl)(Just.create)(Nothing.value);
  }();
  var last = function(xs) {
    return index(xs)(length(xs) - 1 | 0);
  };
  var unzip = function(xs) {
    return function __do6() {
      var fsts = newSTArray();
      var snds = newSTArray();
      var iter = iterator(function(v) {
        return index(xs)(v);
      })();
      iterate(iter)(function(v) {
        return function __do7() {
          $$void3(push(v.value0)(fsts))();
          return $$void3(push(v.value1)(snds))();
        };
      })();
      var fsts$prime = unsafeFreeze(fsts)();
      var snds$prime = unsafeFreeze(snds)();
      return new Tuple(fsts$prime, snds$prime);
    }();
  };
  var fromFoldable = function(dictFoldable) {
    return runFn2(fromFoldableImpl)(foldr(dictFoldable));
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
        return maybe(v2)(function(i) {
          return fromJust2(deleteAt(i)(v2));
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
  var listMap = function(f) {
    var chunkedRevMap = function($copy_v) {
      return function($copy_v1) {
        var $tco_var_v = $copy_v;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(v, v1) {
          if (v1 instanceof Cons && (v1.value1 instanceof Cons && v1.value1.value1 instanceof Cons)) {
            $tco_var_v = new Cons(v1, v);
            $copy_v1 = v1.value1.value1.value1;
            return;
          }
          ;
          var unrolledMap = function(v2) {
            if (v2 instanceof Cons && (v2.value1 instanceof Cons && v2.value1.value1 instanceof Nil)) {
              return new Cons(f(v2.value0), new Cons(f(v2.value1.value0), Nil.value));
            }
            ;
            if (v2 instanceof Cons && v2.value1 instanceof Nil) {
              return new Cons(f(v2.value0), Nil.value);
            }
            ;
            return Nil.value;
          };
          var reverseUnrolledMap = function($copy_v2) {
            return function($copy_v3) {
              var $tco_var_v2 = $copy_v2;
              var $tco_done1 = false;
              var $tco_result2;
              function $tco_loop2(v2, v3) {
                if (v2 instanceof Cons && (v2.value0 instanceof Cons && (v2.value0.value1 instanceof Cons && v2.value0.value1.value1 instanceof Cons))) {
                  $tco_var_v2 = v2.value1;
                  $copy_v3 = new Cons(f(v2.value0.value0), new Cons(f(v2.value0.value1.value0), new Cons(f(v2.value0.value1.value1.value0), v3)));
                  return;
                }
                ;
                $tco_done1 = true;
                return v3;
              }
              ;
              while (!$tco_done1) {
                $tco_result2 = $tco_loop2($tco_var_v2, $copy_v3);
              }
              ;
              return $tco_result2;
            };
          };
          $tco_done = true;
          return reverseUnrolledMap(v)(unrolledMap(v1));
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_v, $copy_v1);
        }
        ;
        return $tco_result;
      };
    };
    return chunkedRevMap(Nil.value);
  };
  var functorList = {
    map: listMap
  };
  var map4 = /* @__PURE__ */ map(functorList);
  var foldableList = {
    foldr: function(f) {
      return function(b) {
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
        var $284 = foldl(foldableList)(flip(f))(b);
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
          function $tco_loop(b, v) {
            if (v instanceof Nil) {
              $tco_done1 = true;
              return b;
            }
            ;
            if (v instanceof Cons) {
              $tco_var_b = f(b)(v.value0);
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
      var append23 = append(dictMonoid.Semigroup0());
      var mempty5 = mempty(dictMonoid);
      return function(f) {
        return foldl(foldableList)(function(acc) {
          var $286 = append23(acc);
          return function($287) {
            return $286(f($287));
          };
        })(mempty5);
      };
    }
  };
  var foldr3 = /* @__PURE__ */ foldr(foldableList);
  var semigroupList = {
    append: function(xs) {
      return function(ys) {
        return foldr3(Cons.create)(ys)(xs);
      };
    }
  };
  var append1 = /* @__PURE__ */ append(semigroupList);
  var eq1List = {
    eq1: function(dictEq) {
      var eq5 = eq(dictEq);
      return function(xs) {
        return function(ys) {
          var go2 = function($copy_v) {
            return function($copy_v1) {
              return function($copy_v2) {
                var $tco_var_v = $copy_v;
                var $tco_var_v1 = $copy_v1;
                var $tco_done = false;
                var $tco_result;
                function $tco_loop(v, v1, v2) {
                  if (!v2) {
                    $tco_done = true;
                    return false;
                  }
                  ;
                  if (v instanceof Nil && v1 instanceof Nil) {
                    $tco_done = true;
                    return v2;
                  }
                  ;
                  if (v instanceof Cons && v1 instanceof Cons) {
                    $tco_var_v = v.value1;
                    $tco_var_v1 = v1.value1;
                    $copy_v2 = v2 && eq5(v1.value0)(v.value0);
                    return;
                  }
                  ;
                  $tco_done = true;
                  return false;
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
          return go2(xs)(ys)(true);
        };
      };
    }
  };
  var eq12 = /* @__PURE__ */ eq1(eq1List);
  var eqList = function(dictEq) {
    return {
      eq: eq12(dictEq)
    };
  };
  var ord1List = {
    compare1: function(dictOrd) {
      var compare2 = compare(dictOrd);
      return function(xs) {
        return function(ys) {
          var go2 = function($copy_v) {
            return function($copy_v1) {
              var $tco_var_v = $copy_v;
              var $tco_done = false;
              var $tco_result;
              function $tco_loop(v, v1) {
                if (v instanceof Nil && v1 instanceof Nil) {
                  $tco_done = true;
                  return EQ.value;
                }
                ;
                if (v instanceof Nil) {
                  $tco_done = true;
                  return LT.value;
                }
                ;
                if (v1 instanceof Nil) {
                  $tco_done = true;
                  return GT.value;
                }
                ;
                if (v instanceof Cons && v1 instanceof Cons) {
                  var v2 = compare2(v.value0)(v1.value0);
                  if (v2 instanceof EQ) {
                    $tco_var_v = v.value1;
                    $copy_v1 = v1.value1;
                    return;
                  }
                  ;
                  $tco_done = true;
                  return v2;
                }
                ;
                throw new Error("Failed pattern match at Data.List.Types (line 60, column 5 - line 60, column 20): " + [v.constructor.name, v1.constructor.name]);
              }
              ;
              while (!$tco_done) {
                $tco_result = $tco_loop($tco_var_v, $copy_v1);
              }
              ;
              return $tco_result;
            };
          };
          return go2(xs)(ys);
        };
      };
    },
    Eq10: function() {
      return eq1List;
    }
  };
  var compare12 = /* @__PURE__ */ compare1(ord1List);
  var ordList = function(dictOrd) {
    var eqList1 = eqList(dictOrd.Eq0());
    return {
      compare: compare12(dictOrd),
      Eq0: function() {
        return eqList1;
      }
    };
  };
  var applyList = {
    apply: function(v) {
      return function(v1) {
        if (v instanceof Nil) {
          return Nil.value;
        }
        ;
        if (v instanceof Cons) {
          return append1(map4(v.value0)(v1))(apply(applyList)(v.value1)(v1));
        }
        ;
        throw new Error("Failed pattern match at Data.List.Types (line 157, column 1 - line 159, column 48): " + [v.constructor.name, v1.constructor.name]);
      };
    },
    Functor0: function() {
      return functorList;
    }
  };
  var applicativeList = {
    pure: function(a2) {
      return new Cons(a2, Nil.value);
    },
    Apply0: function() {
      return applyList;
    }
  };

  // output/Data.Map.Internal/index.js
  var $runtime_lazy3 = function(name15, moduleName, init2) {
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
    var height9 = function(v) {
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
      if (rl instanceof Node && rl.value0 > height9(rr)) {
        return unsafeNode(rl.value2, rl.value3, unsafeNode(k, v, l, rl.value4), unsafeNode(rk, rv, rl.value5, rr));
      }
      ;
      return unsafeNode(rk, rv, unsafeNode(k, v, l, rl), rr);
    };
    var rotateRight = function(k, v, lk, lv, ll, lr, r) {
      if (lr instanceof Node && height9(ll) <= lr.value0) {
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
    return function(comp, k, m) {
      if (m instanceof Leaf) {
        return new Split(Nothing.value, Leaf.value, Leaf.value);
      }
      ;
      if (m instanceof Node) {
        var v = comp(k)(m.value2);
        if (v instanceof LT) {
          var v1 = $lazy_unsafeSplit(771)(comp, k, m.value4);
          return new Split(v1.value0, v1.value1, unsafeBalancedNode(m.value2, m.value3, v1.value2, m.value5));
        }
        ;
        if (v instanceof GT) {
          var v1 = $lazy_unsafeSplit(774)(comp, k, m.value5);
          return new Split(v1.value0, unsafeBalancedNode(m.value2, m.value3, m.value4, v1.value1), v1.value2);
        }
        ;
        if (v instanceof EQ) {
          return new Split(new Just(m.value3), m.value4, m.value5);
        }
        ;
        throw new Error("Failed pattern match at Data.Map.Internal (line 769, column 5 - line 777, column 30): " + [v.constructor.name]);
      }
      ;
      throw new Error("Failed pattern match at Data.Map.Internal (line 765, column 34 - line 777, column 30): " + [m.constructor.name]);
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
  var lookup = function(dictOrd) {
    var compare2 = compare(dictOrd);
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
            var v1 = compare2(k)(v.value2);
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
  var insert = function(dictOrd) {
    var compare2 = compare(dictOrd);
    return function(k) {
      return function(v) {
        var go2 = function(v1) {
          if (v1 instanceof Leaf) {
            return singleton3(k)(v);
          }
          ;
          if (v1 instanceof Node) {
            var v2 = compare2(k)(v1.value2);
            if (v2 instanceof LT) {
              return unsafeBalancedNode(v1.value2, v1.value3, go2(v1.value4), v1.value5);
            }
            ;
            if (v2 instanceof GT) {
              return unsafeBalancedNode(v1.value2, v1.value3, v1.value4, go2(v1.value5));
            }
            ;
            if (v2 instanceof EQ) {
              return new Node(v1.value0, v1.value1, k, v, v1.value4, v1.value5);
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 469, column 7 - line 472, column 35): " + [v2.constructor.name]);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 466, column 8 - line 472, column 35): " + [v1.constructor.name]);
        };
        return go2;
      };
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
        return function(m) {
          return go2(m, z);
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
        return function(m) {
          return go2(z, m);
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
  var values = /* @__PURE__ */ function() {
    return foldr(foldableMap)(Cons.create)(Nil.value);
  }();
  var foldSubmapBy = function(dictOrd) {
    var lessThan1 = lessThan(dictOrd);
    var greaterThan1 = greaterThan(dictOrd);
    var lessThanOrEq1 = lessThanOrEq(dictOrd);
    return function(appendFn) {
      return function(memptyValue) {
        return function(kmin) {
          return function(kmax) {
            return function(f) {
              var tooSmall = function() {
                if (kmin instanceof Just) {
                  return function(k) {
                    return lessThan1(k)(kmin.value0);
                  };
                }
                ;
                if (kmin instanceof Nothing) {
                  return $$const(false);
                }
                ;
                throw new Error("Failed pattern match at Data.Map.Internal (line 387, column 7 - line 391, column 22): " + [kmin.constructor.name]);
              }();
              var tooLarge = function() {
                if (kmax instanceof Just) {
                  return function(k) {
                    return greaterThan1(k)(kmax.value0);
                  };
                }
                ;
                if (kmax instanceof Nothing) {
                  return $$const(false);
                }
                ;
                throw new Error("Failed pattern match at Data.Map.Internal (line 394, column 7 - line 398, column 22): " + [kmax.constructor.name]);
              }();
              var inBounds = function() {
                if (kmin instanceof Just && kmax instanceof Just) {
                  return function(k) {
                    return lessThanOrEq1(kmin.value0)(k) && lessThanOrEq1(k)(kmax.value0);
                  };
                }
                ;
                if (kmin instanceof Just && kmax instanceof Nothing) {
                  return function(k) {
                    return lessThanOrEq1(kmin.value0)(k);
                  };
                }
                ;
                if (kmin instanceof Nothing && kmax instanceof Just) {
                  return function(k) {
                    return lessThanOrEq1(k)(kmax.value0);
                  };
                }
                ;
                if (kmin instanceof Nothing && kmax instanceof Nothing) {
                  return $$const(true);
                }
                ;
                throw new Error("Failed pattern match at Data.Map.Internal (line 401, column 7 - line 409, column 21): " + [kmin.constructor.name, kmax.constructor.name]);
              }();
              var go2 = function(v) {
                if (v instanceof Leaf) {
                  return memptyValue;
                }
                ;
                if (v instanceof Node) {
                  return appendFn(appendFn(function() {
                    var $640 = tooSmall(v.value2);
                    if ($640) {
                      return memptyValue;
                    }
                    ;
                    return go2(v.value4);
                  }())(function() {
                    var $641 = inBounds(v.value2);
                    if ($641) {
                      return f(v.value2)(v.value3);
                    }
                    ;
                    return memptyValue;
                  }()))(function() {
                    var $642 = tooLarge(v.value2);
                    if ($642) {
                      return memptyValue;
                    }
                    ;
                    return go2(v.value5);
                  }());
                }
                ;
                throw new Error("Failed pattern match at Data.Map.Internal (line 411, column 10 - line 417, column 66): " + [v.constructor.name]);
              };
              return go2;
            };
          };
        };
      };
    };
  };
  var foldSubmap = function(dictOrd) {
    var foldSubmapBy1 = foldSubmapBy(dictOrd);
    return function(dictMonoid) {
      return foldSubmapBy1(append(dictMonoid.Semigroup0()))(mempty(dictMonoid));
    };
  };
  var empty2 = /* @__PURE__ */ function() {
    return Leaf.value;
  }();
  var $$delete2 = function(dictOrd) {
    var compare2 = compare(dictOrd);
    return function(k) {
      var go2 = function(v) {
        if (v instanceof Leaf) {
          return Leaf.value;
        }
        ;
        if (v instanceof Node) {
          var v1 = compare2(k)(v.value2);
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
    var compare2 = compare(dictOrd);
    return function(f) {
      return function(k) {
        return function(m) {
          var v = unsafeSplit(compare2, k, m);
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
      var div3 = div(dictEuclideanRing);
      var Ring0 = dictEuclideanRing.CommutativeRing0().Ring0();
      var mul3 = mul(Ring0.Semiring0());
      var signum1 = signum2(Ring0);
      var abs1 = abs5(Ring0);
      return function(n) {
        return function(d) {
          var g = gcd1(n)(d);
          var d$prime = div3(d)(g);
          return new Ratio(mul3(div3(n)(g))(signum1(d$prime)), abs1(d$prime));
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
  var eqRatio = function(dictEq) {
    var eq5 = eq(dictEq);
    return {
      eq: function(v) {
        return function(v1) {
          return eq5(v.value0)(v1.value0) && eq5(v.value1)(v1.value1);
        };
      }
    };
  };
  var ordRatio = function(dictOrd) {
    var ringRatio1 = ringRatio(dictOrd);
    var Eq0 = dictOrd.Eq0();
    var eq5 = eq(Eq0);
    var greaterThan2 = greaterThan(dictOrd);
    var eqRatio1 = eqRatio(Eq0);
    return function(dictEuclideanRing) {
      var sub3 = sub(ringRatio1(dictEuclideanRing));
      var zero2 = zero(dictEuclideanRing.CommutativeRing0().Ring0().Semiring0());
      return {
        compare: function(x) {
          return function(y) {
            var v = sub3(x)(y);
            var $130 = eq5(v.value0)(zero2);
            if ($130) {
              return EQ.value;
            }
            ;
            var v1 = greaterThan2(v.value1)(zero2);
            var v2 = greaterThan2(v.value0)(zero2);
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
          return eqRatio1;
        }
      };
    };
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

  // output/JS.BigInt/foreign.js
  var fromInt = (n) => BigInt(n);
  var biAdd = (x) => (y) => x + y;
  var biMul = (x) => (y) => x * y;
  var biSub = (x) => (y) => x - y;
  var biMod = (x) => (y) => {
    if (y === 0n)
      return 0n;
    const yy = y < 0n ? -y : y;
    return (x % yy + yy) % yy;
  };
  var biDiv = (x) => (y) => {
    if (y === 0n)
      return 0n;
    return (x - biMod(x)(y)) / y;
  };
  var biDegree = (x) => {
    return x < 0n ? -x : x;
  };
  var biZero = 0n;
  var biOne = 1n;
  var biEquals = (x) => (y) => x == y;
  var biCompare = (x) => (y) => {
    if (x === y)
      return 0;
    else if (x > y)
      return 1;
    else
      return -1;
  };
  var toString = (x) => x.toString();

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
  var remainder = function(n) {
    return function(m) {
      return n % m;
    };
  };
  var round = Math.round;
  var sqrt = Math.sqrt;

  // output/Data.Number/index.js
  var fromString = function(str) {
    return fromStringImpl(str, isFiniteImpl, Just.create, Nothing.value);
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

  // output/JS.BigInt/index.js
  var showBigInt = {
    show: toString
  };
  var semiringBigInt = {
    add: biAdd,
    zero: biZero,
    mul: biMul,
    one: biOne
  };
  var ringBigInt = {
    sub: biSub,
    Semiring0: function() {
      return semiringBigInt;
    }
  };
  var eqBigInt = {
    eq: biEquals
  };
  var ordBigInt = {
    compare: function(x) {
      return function(y) {
        var v = biCompare(x)(y);
        if (v === 1) {
          return GT.value;
        }
        ;
        if (v === 0) {
          return EQ.value;
        }
        ;
        return LT.value;
      };
    },
    Eq0: function() {
      return eqBigInt;
    }
  };
  var commutativeRingBigInt = {
    Ring0: function() {
      return ringBigInt;
    }
  };
  var euclideanRingBigInt = {
    degree: biDegree,
    div: biDiv,
    mod: biMod,
    CommutativeRing0: function() {
      return commutativeRingBigInt;
    }
  };

  // output/Data.Rational/index.js
  var reduce2 = /* @__PURE__ */ reduce(ordBigInt)(euclideanRingBigInt);
  var semiringRational = /* @__PURE__ */ semiringRatio(ordBigInt)(euclideanRingBigInt);
  var ringRational = /* @__PURE__ */ ringRatio(ordBigInt)(euclideanRingBigInt);
  var ordRational = /* @__PURE__ */ ordRatio(ordBigInt)(euclideanRingBigInt);
  var euclideanRingRational = /* @__PURE__ */ euclideanRingRatio(ordBigInt)(euclideanRingBigInt);
  var numerator2 = function(v) {
    return numerator(v);
  };
  var fromInt2 = function(i) {
    return reduce2(fromInt(i))(fromInt(1));
  };
  var denominator2 = function(v) {
    return denominator(v);
  };

  // output/FRP.Event/foreign.js
  var fastForeachThunk = (as) => {
    for (var i = 0, l = as.length; i < l; i++) {
      as[i]();
    }
  };
  var fastForeachE = (as, f) => {
    for (var i = 0, l = as.length; i < l; i++) {
      f(as[i]);
    }
  };
  var objHack = () => {
    return { r: false, q: [], m: [{}] };
  };
  var insertObjHack = (k, v, o) => {
    o.m[o.m.length - 1][k] = v;
  };
  var deleteObjHack = (k, o) => {
    for (const m of o.m) {
      if (delete m[k]) {
        return true;
      }
    }
    return false;
  };
  var fastForeachOhE = (o, ff2) => {
    let f = ff2;
    while (true) {
      if (o.r) {
        o.q.push(f);
        return;
      }
      o.r = true;
      const M = {};
      const run3 = (i) => {
        o.m.push({});
        for (const kv of Object.entries(o.m[i])) {
          const k = kv[0];
          const v = kv[1];
          f(v);
          if (Object.keys(o.m[i + 1]).length)
            run3(i + 1);
          o.m[i + 1] = {};
          o.m.length = i + 1 + 1;
          M[k] = v;
        }
      };
      run3(0);
      o.m.length = 0;
      o.m.push(M);
      o.r = false;
      f = o.q.shift();
      if (f == void 0) {
        break;
      }
    }
  };

  // output/Control.Monad.ST.Global/index.js
  var toEffect = unsafeCoerce2;

  // output/Control.Monad.ST.Class/index.js
  var monadSTST = {
    liftST: /* @__PURE__ */ identity(categoryFn),
    Monad0: function() {
      return monadST;
    }
  };
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
  var foldr4 = /* @__PURE__ */ foldr(foldableList);
  var snoc = function(xs) {
    return function(x) {
      return foldr4(Cons.create)(new Cons(x, Nil.value))(xs);
    };
  };

  // output/Data.Compactable/index.js
  var compact = function(dict) {
    return dict.compact;
  };

  // output/Data.Filterable/index.js
  var maybeBool = function(p) {
    return function(x) {
      var $66 = p(x);
      if ($66) {
        return new Just(x);
      }
      ;
      return Nothing.value;
    };
  };
  var filterMap = function(dict) {
    return dict.filterMap;
  };
  var eitherBool = function(p) {
    return function(x) {
      var $84 = p(x);
      if ($84) {
        return new Right(x);
      }
      ;
      return new Left(x);
    };
  };

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
  var map5 = /* @__PURE__ */ map(functorTuple);
  var pure3 = /* @__PURE__ */ pure(applicativeMaybe);
  var sampleOnRight = function(dict) {
    return dict.sampleOnRight;
  };
  var sampleOnRightOp = function(dictIsEvent) {
    var sampleOnRight1 = sampleOnRight(dictIsEvent);
    var map111 = map(dictIsEvent.Filterable2().Functor1());
    return function(ef) {
      return function(ea) {
        return sampleOnRight1(ef)(map111(applyFlipped)(ea));
      };
    };
  };
  var sampleOnLeft = function(dict) {
    return dict.sampleOnLeft;
  };
  var once = function(dict) {
    return dict.once;
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
    var alt6 = alt(dictIsEvent.Alt1());
    var Functor1 = dictIsEvent.Filterable2().Functor1();
    var voidLeft4 = voidLeft(Functor1);
    var once12 = once(dictIsEvent);
    var map111 = map(Functor1);
    return function(f) {
      return function(b) {
        return function(e) {
          return fix1(function(i) {
            return sampleOnRight1(alt6(i)(voidLeft4(once12(e))(b)))(map111(flip(f))(e));
          });
        };
      };
    };
  };
  var mapAccum = function(dictIsEvent) {
    var filterMap4 = filterMap(dictIsEvent.Filterable2());
    var fold12 = fold2(dictIsEvent);
    return function(f) {
      return function(acc) {
        return function(xs) {
          return filterMap4(snd)(fold12(function(v) {
            return function(b) {
              return map5(pure3)(f(v.value0)(b));
            };
          })(new Tuple(acc, Nothing.value))(xs));
        };
      };
    };
  };

  // output/Unsafe.Reference/foreign.js
  function reallyUnsafeRefEq(a2) {
    return function(b) {
      return a2 === b;
    };
  }

  // output/Unsafe.Reference/index.js
  var unsafeRefEq = reallyUnsafeRefEq;

  // output/FRP.Event/index.js
  var $$void4 = /* @__PURE__ */ $$void(functorEffect);
  var liftST2 = /* @__PURE__ */ liftST(monadSTEffect);
  var for_2 = /* @__PURE__ */ for_(applicativeEffect)(foldableMaybe);
  var pure4 = /* @__PURE__ */ pure(applicativeST);
  var void1 = /* @__PURE__ */ $$void(functorST);
  var join2 = /* @__PURE__ */ join(bindST);
  var liftST1 = /* @__PURE__ */ liftST(monadSTST);
  var append3 = /* @__PURE__ */ append(semigroupArray);
  var mempty2 = /* @__PURE__ */ mempty(/* @__PURE__ */ monoidEffectFn1(monoidUnit));
  var identity6 = /* @__PURE__ */ identity(categoryFn);
  var apply2 = /* @__PURE__ */ apply(applyST);
  var map1 = /* @__PURE__ */ map(functorST);
  var subscribe = function(v) {
    return function(k) {
      return function() {
        return v(false, mkEffectFn1(k));
      };
    };
  };
  var sampleOnRight2 = function(v) {
    return function(v1) {
      return function(b, k) {
        var latest = newSTRef(Nothing.value)();
        var c1 = v(b, function(a2) {
          return $$void4(liftST2(write2(new Just(a2))(latest)))();
        });
        var c2 = v1(b, function(f) {
          var o = liftST2(read2(latest))();
          return for_2(o)(function(a2) {
            return function() {
              return k(f(a2));
            };
          })();
        });
        return function __do6() {
          c1();
          return c2();
        };
      };
    };
  };
  var sampleOnLeft2 = function(v) {
    return function(v1) {
      return function(b, k) {
        var latest = newSTRef(Nothing.value)();
        var c1 = v(b, function(a2) {
          var o = liftST2(read2(latest))();
          return for_2(o)(function(f) {
            return function() {
              return k(f(a2));
            };
          })();
        });
        var c2 = v1(b, function(f) {
          return liftST2(void1(write2(new Just(f))(latest)))();
        });
        return function __do6() {
          c1();
          return c2();
        };
      };
    };
  };
  var once2 = function(v) {
    return function(b, k) {
      var latest = newSTRef(Nothing.value)();
      var u = newSTRef(pure4(unit))();
      var c = v(b, function(a2) {
        var o2 = liftST2(read2(latest))();
        if (o2 instanceof Nothing) {
          $$void4(liftST2(write2(new Just(a2))(latest)))();
          k(a2);
          return liftST2(join2(read2(u)))();
        }
        ;
        if (o2 instanceof Just) {
          return unit;
        }
        ;
        throw new Error("Failed pattern match at FRP.Event (line 185, column 9 - line 191, column 30): " + [o2.constructor.name]);
      });
      void1(write2(c)(u))();
      var o = liftST1(read2(latest))();
      (function() {
        if (o instanceof Just) {
          return c();
        }
        ;
        return unit;
      })();
      return c;
    };
  };
  var mergeMap = function(f0) {
    return function(f) {
      return function(tf, k) {
        var a2 = newSTArray();
        foreachE(f)(function(x) {
          var v = f0(x);
          return function __do6() {
            var u = v(tf, k);
            return void1(liftST1(push(u)(a2)))();
          };
        })();
        return function __do6() {
          var o = liftST1(freeze(a2))();
          return fastForeachThunk(o);
        };
      };
    };
  };
  var merge = function(f) {
    return function(tf, k) {
      var a2 = newSTArray();
      foreachE(f)(function(v) {
        return function __do6() {
          var u = v(tf, k);
          return void1(liftST1(push(u)(a2)))();
        };
      })();
      return function __do6() {
        var o = liftST1(freeze(a2))();
        return fastForeachThunk(o);
      };
    };
  };
  var makeLemmingEvent = function(e) {
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
  var mailbox$prime = function(dictOrd) {
    var alter3 = alter(dictOrd);
    var lookup4 = lookup(dictOrd);
    return function __do6() {
      var r = newSTRef(empty2)();
      return {
        event: function(a2) {
          return function(v, k2) {
            void1(modify(alter3(function(v1) {
              if (v1 instanceof Nothing) {
                return new Just([k2]);
              }
              ;
              if (v1 instanceof Just) {
                return new Just(append3(v1.value0)([k2]));
              }
              ;
              throw new Error("Failed pattern match at FRP.Event (line 547, column 17 - line 549, column 51): " + [v1.constructor.name]);
            })(a2))(r))();
            return void1(modify(alter3(function(v1) {
              if (v1 instanceof Nothing) {
                return Nothing.value;
              }
              ;
              if (v1 instanceof Just) {
                return new Just(deleteBy(unsafeRefEq)(k2)(v1.value0));
              }
              ;
              throw new Error("Failed pattern match at FRP.Event (line 556, column 17 - line 558, column 65): " + [v1.constructor.name]);
            })(a2))(r));
          };
        },
        push: function(v) {
          var o = liftST2(read2(r))();
          var v1 = lookup4(v.address)(o);
          if (v1 instanceof Nothing) {
            return unit;
          }
          ;
          if (v1 instanceof Just) {
            return fastForeachE(v1.value0, function(i) {
              return i(v.payload);
            });
          }
          ;
          throw new Error("Failed pattern match at FRP.Event (line 565, column 9 - line 567, column 95): " + [v1.constructor.name]);
        }
      };
    };
  };
  var mailbox = function(dictOrd) {
    return function __do6() {
      var v = mailbox$prime(dictOrd)();
      return {
        push: function(ap2) {
          return function() {
            return v.push(ap2);
          };
        },
        event: v.event
      };
    };
  };
  var keepLatest2 = function(v) {
    return function(tf, k) {
      var cancelInner = newSTRef(pure4(unit))();
      var cancelOuter = v(tf, function(v1) {
        return liftST2(function __do6() {
          var ci = read2(cancelInner)();
          ci();
          var c = v1(tf, k);
          return void1(liftST1(write2(c)(cancelInner)))();
        })();
      });
      return function __do6() {
        var ci = read2(cancelInner)();
        ci();
        return cancelOuter();
      };
    };
  };
  var functorEvent = {
    map: function(f) {
      return function(v) {
        return function(b, k) {
          return v(b, function(a2) {
            return k(f(a2));
          });
        };
      };
    }
  };
  var map22 = /* @__PURE__ */ map(functorEvent);
  var filter3 = function(p) {
    return function(v) {
      return function(tf, k) {
        return v(tf, function(a2) {
          var v1 = p(a2);
          if (v1 instanceof Just) {
            return k(v1.value0);
          }
          ;
          if (v1 instanceof Nothing) {
            return unit;
          }
          ;
          throw new Error("Failed pattern match at FRP.Event (line 206, column 31 - line 208, column 35): " + [v1.constructor.name]);
        });
      };
    };
  };
  var filter$prime = function(f) {
    return filter3(function(a2) {
      var v = f(a2);
      if (v) {
        return new Just(a2);
      }
      ;
      if (!v) {
        return Nothing.value;
      }
      ;
      throw new Error("Failed pattern match at FRP.Event (line 112, column 13 - line 114, column 25): " + [v.constructor.name]);
    });
  };
  var create_ = function __do() {
    var subscribers = objHack();
    var idx = newSTRef(0)();
    return {
      event: function(v, k) {
        var rk = newSTRef(k)();
        var ix = read2(idx)();
        insertObjHack(ix, rk, subscribers);
        void1(modify(function(v1) {
          return v1 + 1 | 0;
        })(idx))();
        return function __do6() {
          void1(write2(mempty2)(rk))();
          deleteObjHack(ix, subscribers);
          return unit;
        };
      },
      push: function(a2) {
        return function() {
          return fastForeachOhE(subscribers, function(rk) {
            var k = liftST2(read2(rk))();
            return k(a2);
          });
        };
      }
    };
  };
  var createPure = create_;
  var create$prime = function __do2() {
    var subscribers = objHack();
    var idx = newSTRef(0)();
    return {
      event: function(v, k) {
        var rk = newSTRef(k)();
        var ix = read2(idx)();
        insertObjHack(ix, rk, subscribers);
        void1(modify(function(v1) {
          return v1 + 1 | 0;
        })(idx))();
        return function __do6() {
          void1(write2(mempty2)(rk))();
          deleteObjHack(ix, subscribers);
          return unit;
        };
      },
      push: function(a2) {
        return fastForeachOhE(subscribers, function(rk) {
          var k = liftST2(read2(rk))();
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
      return function __do6() {
        c1();
        return c2();
      };
    };
  };
  var create = create_;
  var compactableEvent = {
    compact: /* @__PURE__ */ filter3(identity6),
    separate: function(xs) {
      return {
        left: filter3(function(v) {
          if (v instanceof Left) {
            return new Just(v.value0);
          }
          ;
          if (v instanceof Right) {
            return Nothing.value;
          }
          ;
          throw new Error("Failed pattern match at FRP.Event (line 95, column 13 - line 97, column 33): " + [v.constructor.name]);
        })(xs),
        right: filter3(function(v) {
          if (v instanceof Right) {
            return new Just(v.value0);
          }
          ;
          if (v instanceof Left) {
            return Nothing.value;
          }
          ;
          throw new Error("Failed pattern match at FRP.Event (line 102, column 13 - line 104, column 32): " + [v.constructor.name]);
        })(xs)
      };
    }
  };
  var filterableEvent = {
    filter: filter$prime,
    filterMap: filter3,
    partition: function(p) {
      return function(xs) {
        return {
          yes: filter$prime(p)(xs),
          no: filter$prime(function($175) {
            return !p($175);
          })(xs)
        };
      };
    },
    partitionMap: function(f) {
      return function(xs) {
        return {
          left: filterMap(filterableEvent)(function() {
            var $176 = either(Just.create)($$const(Nothing.value));
            return function($177) {
              return $176(f($177));
            };
          }())(xs),
          right: filterMap(filterableEvent)(function($178) {
            return hush(f($178));
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
        var latest1 = newSTRef(Nothing.value)();
        var latest2 = newSTRef(Nothing.value)();
        var c1 = v(tf, function(a2) {
          $$void4(liftST2(write2(new Just(a2))(latest1)))();
          var res = liftST2(read2(latest2))();
          return for_2(res)(function(f) {
            return function() {
              return k(f(a2));
            };
          })();
        });
        var c2 = v1(tf, function(f) {
          $$void4(liftST2(write2(new Just(f))(latest2)))();
          var res = liftST2(read2(latest1))();
          return for_2(res)(function(a2) {
            return function() {
              return k(f(a2));
            };
          })();
        });
        return function __do6() {
          c1();
          return c2();
        };
      };
    };
  };
  var applyEvent = {
    apply: function(a2) {
      return function(b) {
        return biSampleOn(a2)(map22(applyFlipped)(b));
      };
    },
    Functor0: function() {
      return functorEvent;
    }
  };
  var altEvent = {
    alt: function(v) {
      return function(v1) {
        return function(tf, k) {
          return apply2(map1(function(v2) {
            return function(v3) {
              return function __do6() {
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
  var eventIsEvent = {
    keepLatest: keepLatest2,
    sampleOnRight: sampleOnRight2,
    sampleOnLeft: sampleOnLeft2,
    fix: fix2,
    once: once2,
    Plus0: function() {
      return plusEvent;
    },
    Alt1: function() {
      return altEvent;
    },
    Filterable2: function() {
      return filterableEvent;
    }
  };

  // output/Web.HTML/foreign.js
  var windowImpl = function() {
    return window;
  };

  // output/Web.Internal.FFI/foreign.js
  function _unsafeReadProtoTagged(nothing, just, name15, value13) {
    if (typeof window !== "undefined") {
      var ty = window[name15];
      if (ty != null && value13 instanceof ty) {
        return just(value13);
      }
    }
    var obj = value13;
    while (obj != null) {
      var proto = Object.getPrototypeOf(obj);
      var constructorName = proto.constructor.name;
      if (constructorName === name15) {
        return just(value13);
      } else if (constructorName === "Object") {
        return nothing;
      }
      obj = proto;
    }
    return nothing;
  }

  // output/Web.Internal.FFI/index.js
  var unsafeReadProtoTagged = function(name15) {
    return function(value13) {
      return _unsafeReadProtoTagged(Nothing.value, Just.create, name15, value13);
    };
  };

  // output/Data.Nullable/foreign.js
  function nullable(a2, r, f) {
    return a2 == null ? r : f(a2);
  }

  // output/Data.Nullable/index.js
  var toMaybe = function(n) {
    return nullable(n, Nothing.value, Just.create);
  };

  // output/Web.HTML.HTMLDocument/foreign.js
  function _body(doc) {
    return doc.body;
  }

  // output/Web.HTML.HTMLDocument/index.js
  var map6 = /* @__PURE__ */ map(functorEffect);
  var body = function(doc) {
    return map6(toMaybe)(function() {
      return _body(doc);
    });
  };

  // output/Web.HTML.HTMLElement/foreign.js
  function focus(elt) {
    return function() {
      return elt.focus();
    };
  }

  // output/Web.HTML.HTMLElement/index.js
  var toElement = unsafeCoerce2;

  // output/Web.HTML.HTMLInputElement/foreign.js
  function value3(input3) {
    return function() {
      return input3.value;
    };
  }

  // output/Web.HTML.HTMLInputElement/index.js
  var toHTMLElement = unsafeCoerce2;
  var fromEventTarget = /* @__PURE__ */ unsafeReadProtoTagged("HTMLInputElement");
  var fromElement = /* @__PURE__ */ unsafeReadProtoTagged("HTMLInputElement");

  // output/Web.HTML.HTMLTextAreaElement/foreign.js
  function value11(textarea) {
    return function() {
      return textarea.value;
    };
  }

  // output/Web.HTML.HTMLTextAreaElement/index.js
  var fromEventTarget2 = /* @__PURE__ */ unsafeReadProtoTagged("HTMLTextAreaElement");

  // output/Web.HTML.Window/foreign.js
  function document2(window2) {
    return function() {
      return window2.document;
    };
  }

  // output/FRP.Poll/index.js
  var pure5 = /* @__PURE__ */ pure(applicativeST);
  var map7 = /* @__PURE__ */ map(functorFn);
  var identity7 = /* @__PURE__ */ identity(categoryFn);
  var oneOf2 = /* @__PURE__ */ oneOf(foldableArray);
  var empty3 = /* @__PURE__ */ empty(plusMaybe);
  var $$void5 = /* @__PURE__ */ $$void(functorST);
  var join3 = /* @__PURE__ */ join(bindST);
  var when2 = /* @__PURE__ */ when(applicativeST);
  var once1 = /* @__PURE__ */ once(eventIsEvent);
  var sampleOnRightOp2 = /* @__PURE__ */ sampleOnRightOp(eventIsEvent);
  var composeFlipped2 = /* @__PURE__ */ composeFlipped(semigroupoidFn);
  var map12 = /* @__PURE__ */ map(functorMaybe);
  var APoll = function(x) {
    return x;
  };
  var KeepLatestStart = /* @__PURE__ */ function() {
    function KeepLatestStart2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    KeepLatestStart2.create = function(value0) {
      return function(value1) {
        return new KeepLatestStart2(value0, value1);
      };
    };
    return KeepLatestStart2;
  }();
  var KeepLatestLast = /* @__PURE__ */ function() {
    function KeepLatestLast2(value0) {
      this.value0 = value0;
    }
    ;
    KeepLatestLast2.create = function(value0) {
      return new KeepLatestLast2(value0);
    };
    return KeepLatestLast2;
  }();
  var pollable = function(dictIsEvent) {
    return {
      sample: function(v) {
        return function(ab) {
          return v(ab);
        };
      }
    };
  };
  var pollable1 = /* @__PURE__ */ pollable(eventIsEvent);
  var sample = function(dict) {
    return dict.sample;
  };
  var sample1 = /* @__PURE__ */ sample(pollable1);
  var poll = APoll;
  var sham = function(dictIsEvent) {
    var sampleOnLeft1 = sampleOnLeft(dictIsEvent);
    return function(i) {
      return poll(function(e) {
        return sampleOnLeft1(i)(e);
      });
    };
  };
  var sham1 = /* @__PURE__ */ sham(eventIsEvent);
  var once3 = function(dictPollable) {
    var sample22 = sample(dictPollable);
    return function(dictIsEvent) {
      var once22 = once(dictIsEvent);
      return function(a2) {
        return poll(function(e) {
          return once22(sample22(a2)(e));
        });
      };
    };
  };
  var merge2 = function(a2) {
    return function(e) {
      return mergeMap(flip(sample1)(e))(a2);
    };
  };
  var mailbox2 = function(dictOrd) {
    return function __do6() {
      var v = mailbox(dictOrd)();
      return {
        poll: map7(sham1)(v.event),
        push: v.push
      };
    };
  };
  var functorAPoll = function(dictFunctor) {
    var map25 = map(dictFunctor);
    return {
      map: function(f) {
        return function(v) {
          return function(e) {
            return v(map25(function(v1) {
              return function($478) {
                return v1(f($478));
              };
            })(e));
          };
        };
      }
    };
  };
  var sampleBy = function(dictPollable) {
    var sample22 = sample(dictPollable);
    return function(dictFunctor) {
      var map25 = map(functorAPoll(dictFunctor));
      return function(dictFunctor1) {
        var map32 = map(dictFunctor1);
        return function(f) {
          return function(b) {
            return function(e) {
              return sample22(map25(f)(b))(map32(applyFlipped)(e));
            };
          };
        };
      };
    };
  };
  var keepLatest3 = function(dictFilterable) {
    var filterMap1 = filterMap(dictFilterable);
    var Functor1 = dictFilterable.Functor1();
    return function(dictIsEvent) {
      var fix1 = fix(dictIsEvent);
      var oneOf1 = oneOf2(dictIsEvent.Plus0());
      var keepLatest1 = keepLatest(dictIsEvent);
      var once22 = once(dictIsEvent);
      return function(dictPollable) {
        var sampleBy22 = sampleBy(dictPollable)(Functor1)(Functor1);
        return function(a2) {
          return function(e) {
            return filterMap1(function(v) {
              if (v instanceof KeepLatestLast) {
                return new Just(v.value0);
              }
              ;
              return Nothing.value;
            })(fix1(function(ie) {
              return oneOf1([sampleBy22(KeepLatestStart.create)(a2)(e), keepLatest1(flip(filterMap1)(ie)(function(v) {
                if (v instanceof KeepLatestStart) {
                  return new Just(sampleBy22(function(bb) {
                    return function(v1) {
                      return new KeepLatestLast(v.value1(bb));
                    };
                  })(v.value0)(once22(ie)));
                }
                ;
                return empty3;
              }))]);
            }));
          };
        };
      };
    };
  };
  var sample_ = function(dictPollable) {
    var sampleBy22 = sampleBy(dictPollable);
    return function(dictFunctor) {
      var sampleBy3 = sampleBy22(dictFunctor);
      return function(dictFunctor1) {
        return sampleBy3(dictFunctor1)($$const);
      };
    };
  };
  var sample_1 = /* @__PURE__ */ sample_(pollable1)(functorEvent)(functorEvent);
  var rant = function(a2) {
    return function __do6() {
      var ep = createPure();
      var started = newSTRef(false)();
      var unsub = newSTRef(pure5(unit))();
      return {
        unsubscribe: join3(read2(unsub)),
        poll: poll(function(e) {
          return makeLemmingEvent(function(s) {
            return function(k) {
              return function __do7() {
                var st = read2(started)();
                when2(!st)(function __do8() {
                  var unsubscribe = s(sample_1(a2)(once1(e)))(ep.push)();
                  $$void5(write2(true)(started))();
                  return $$void5(flip(write2)(unsub)(unsubscribe))();
                })();
                var u3 = s(sampleOnRightOp2(e)(ep.event))(k)();
                return u3;
              };
            };
          });
        })
      };
    };
  };
  var sampleOnLeft3 = function(dictPollable) {
    var sample_22 = sample_(dictPollable);
    var sampleBy22 = sampleBy(dictPollable);
    return function(dictIsEvent) {
      var sampleOnLeft1 = sampleOnLeft(dictIsEvent);
      var Functor1 = dictIsEvent.Filterable2().Functor1();
      var sample_32 = sample_22(Functor1)(Functor1);
      var sampleBy3 = sampleBy22(Functor1)(Functor1);
      return function(a2) {
        return function(b) {
          return poll(function(e) {
            return sampleOnLeft1(sample_32(a2)(e))(sampleBy3(composeFlipped2)(b)(e));
          });
        };
      };
    };
  };
  var sampleOnRight3 = function(dictPollable) {
    var sample_22 = sample_(dictPollable);
    var sampleBy22 = sampleBy(dictPollable);
    return function(dictIsEvent) {
      var sampleOnRight1 = sampleOnRight(dictIsEvent);
      var Functor1 = dictIsEvent.Filterable2().Functor1();
      var sample_32 = sample_22(Functor1)(Functor1);
      var sampleBy3 = sampleBy22(Functor1)(Functor1);
      return function(a2) {
        return function(b) {
          return poll(function(e) {
            return sampleOnRight1(sample_32(a2)(e))(sampleBy3(composeFlipped2)(b)(e));
          });
        };
      };
    };
  };
  var altAPoll = function(dictAlt) {
    var alt6 = alt(dictAlt);
    var functorAPoll1 = functorAPoll(dictAlt.Functor0());
    return {
      alt: function(v) {
        return function(v1) {
          return function(e) {
            return alt6(v(e))(v1(e));
          };
        };
      },
      Functor0: function() {
        return functorAPoll1;
      }
    };
  };
  var plusAPoll = function(dictPlus) {
    var empty1 = empty(dictPlus);
    var altAPoll1 = altAPoll(dictPlus.Alt0());
    return {
      empty: function(v) {
        return empty1;
      },
      Alt0: function() {
        return altAPoll1;
      }
    };
  };
  var fix3 = function(dictPollable) {
    var sampleBy22 = sampleBy(dictPollable);
    return function(dictIsEvent) {
      var Functor1 = dictIsEvent.Filterable2().Functor1();
      var map25 = map(Functor1);
      var fix1 = fix(dictIsEvent);
      var sampleBy3 = sampleBy22(Functor1)(Functor1);
      var sham2 = sham(dictIsEvent);
      return function(f) {
        return poll(function(e) {
          return map25(function(v) {
            return v.value1(v.value0);
          })(fix1(function(ee) {
            return sampleBy3(Tuple.create)(f(sham2(map25(fst)(ee))))(e);
          }));
        });
      };
    };
  };
  var filterMap2 = function(dictCompactable) {
    var compact2 = compact(dictCompactable);
    return function(dictPollable) {
      var sampleBy22 = sampleBy(dictPollable);
      return function(dictFunctor) {
        var sampleBy3 = sampleBy22(dictFunctor)(dictFunctor);
        return function(f) {
          return function(b) {
            return poll(function(e) {
              return compact2(sampleBy3(function(a2) {
                return function(ff2) {
                  return map12(ff2)(f(a2));
                };
              })(b)(e));
            });
          };
        };
      };
    };
  };
  var partitionMap = function(dictPollable) {
    return function(dictCompactable) {
      var filterMap1 = filterMap2(dictCompactable)(dictPollable);
      return function(dictFunctor) {
        var map25 = map(functorAPoll(dictFunctor));
        var filterMap22 = filterMap1(dictFunctor);
        return function(f) {
          return function(b) {
            var fb = map25(f)(b);
            return {
              left: filterMap22(either(Just.create)($$const(Nothing.value)))(fb),
              right: filterMap22(either($$const(Nothing.value))(Just.create))(fb)
            };
          };
        };
      };
    };
  };
  var compactableAPoll = function(dictFunctor) {
    return function(dictCompactable) {
      var filterMap1 = filterMap2(dictCompactable);
      return function(dictPollable) {
        return {
          compact: filterMap1(dictPollable)(dictFunctor)(identity7),
          separate: partitionMap(dictPollable)(dictCompactable)(dictFunctor)(identity7)
        };
      };
    };
  };
  var filterableAPoll = function(dictFunctor) {
    var compactableAPoll1 = compactableAPoll(dictFunctor);
    var functorAPoll1 = functorAPoll(dictFunctor);
    return function(dictCompactable) {
      var filterMap1 = filterMap2(dictCompactable);
      var compactableAPoll2 = compactableAPoll1(dictCompactable);
      return function(dictPollable) {
        var filterMap22 = filterMap1(dictPollable)(dictFunctor);
        var partitionMap1 = partitionMap(dictPollable)(dictCompactable)(dictFunctor);
        var compactableAPoll3 = compactableAPoll2(dictPollable);
        return {
          filterMap: filterMap22,
          filter: function($479) {
            return filterMap22(maybeBool($479));
          },
          partitionMap: partitionMap1,
          partition: function(p) {
            return function(xs) {
              var o = partitionMap1(eitherBool(p))(xs);
              return {
                no: o.left,
                yes: o.right
              };
            };
          },
          Compactable0: function() {
            return compactableAPoll3;
          },
          Functor1: function() {
            return functorAPoll1;
          }
        };
      };
    };
  };
  var isEventAPoll = function(dictIsEvent) {
    var Filterable2 = dictIsEvent.Filterable2();
    var keepLatest1 = keepLatest3(Filterable2)(dictIsEvent);
    var plusAPoll1 = plusAPoll(dictIsEvent.Plus0());
    var altAPoll1 = altAPoll(dictIsEvent.Alt1());
    var filterableAPoll1 = filterableAPoll(Filterable2.Functor1())(Filterable2.Compactable0());
    return function(dictPlus) {
      return function(dictPollable) {
        var filterableAPoll2 = filterableAPoll1(dictPollable);
        return {
          sampleOnRight: sampleOnRight3(dictPollable)(dictIsEvent),
          sampleOnLeft: sampleOnLeft3(dictPollable)(dictIsEvent),
          keepLatest: keepLatest1(dictPollable),
          fix: fix3(dictPollable)(dictIsEvent),
          once: once3(dictPollable)(dictIsEvent),
          Plus0: function() {
            return plusAPoll1;
          },
          Alt1: function() {
            return altAPoll1;
          },
          Filterable2: function() {
            return filterableAPoll2;
          }
        };
      };
    };
  };
  var functorWithIndexAPoll = function(dictIsEvent) {
    var isEventAPoll1 = isEventAPoll(dictIsEvent)(dictIsEvent.Plus0());
    var functorAPoll1 = functorAPoll(dictIsEvent.Filterable2().Functor1());
    return function(dictPollable) {
      var mapAccum2 = mapAccum(isEventAPoll1(dictPollable));
      return {
        mapWithIndex: function(f) {
          return function(e) {
            return mapAccum2(function(a2) {
              return function(b) {
                return new Tuple(a2 + 1 | 0, f(a2)(b));
              };
            })(0)(e);
          };
        },
        Functor0: function() {
          return functorAPoll1;
        }
      };
    };
  };
  var createPure2 = function __do3() {
    var v = createPure();
    return {
      poll: sham1(v.event),
      push: v.push
    };
  };
  var create4 = function __do4() {
    var v = create();
    var v1 = rant(sham1(v.event))();
    return {
      poll: v1.poll,
      push: v.push
    };
  };
  var applyAPoll = function(dictApply) {
    var apply6 = apply(dictApply);
    var Functor0 = dictApply.Functor0();
    var map25 = map(Functor0);
    var voidLeft4 = voidLeft(Functor0);
    var functorAPoll1 = functorAPoll(Functor0);
    return {
      apply: function(v) {
        return function(v1) {
          return function(e) {
            return apply6(map25(function(ff2) {
              return function(v2) {
                return v2.value0(ff2(v2.value1));
              };
            })(v(voidLeft4(e)(identity7))))(v1(map25(Tuple.create)(e)));
          };
        };
      },
      Functor0: function() {
        return functorAPoll1;
      }
    };
  };
  var applicativeAPoll = function(dictApply) {
    var map25 = map(dictApply.Functor0());
    var applyAPoll1 = applyAPoll(dictApply);
    return {
      pure: function(a2) {
        return function(e) {
          return map25(applyFlipped(a2))(e);
        };
      },
      Apply0: function() {
        return applyAPoll1;
      }
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
  var dyn = function(a2) {
    return new DynamicChildren$prime(a2);
  };

  // output/Data.Array.NonEmpty.Internal/foreign.js
  var traverse1Impl = function() {
    function Cont(fn) {
      this.fn = fn;
    }
    var emptyList = {};
    var ConsCell = function(head3, tail3) {
      this.head = head3;
      this.tail = tail3;
    };
    function finalCell(head3) {
      return new ConsCell(head3, emptyList);
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
    return function(apply6, map25, f) {
      var buildFrom = function(x, ys) {
        return apply6(map25(consList)(f(x)))(ys);
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
        var acc = map25(finalCell)(f(array[array.length - 1]));
        var result = go2(acc, array.length - 1, array);
        while (result instanceof Cont) {
          result = result.fn();
        }
        return map25(listToArray)(result);
      };
    };
  }();

  // output/Foreign.Object/foreign.js
  function _copyST(m) {
    return function() {
      var r = {};
      for (var k in m) {
        if (hasOwnProperty.call(m, k)) {
          r[k] = m[k];
        }
      }
      return r;
    };
  }
  var empty4 = {};
  function runST(f) {
    return f();
  }
  function _foldM(bind8) {
    return function(f) {
      return function(mz) {
        return function(m) {
          var acc = mz;
          function g(k2) {
            return function(z) {
              return f(z)(k2)(m[k2]);
            };
          }
          for (var k in m) {
            if (hasOwnProperty.call(m, k)) {
              acc = bind8(acc)(g(k));
            }
          }
          return acc;
        };
      };
    };
  }
  function toArrayWithKey(f) {
    return function(m) {
      var r = [];
      for (var k in m) {
        if (hasOwnProperty.call(m, k)) {
          r.push(f(k)(m[k]));
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

  // output/Foreign.Object.ST/foreign.js
  function poke2(k) {
    return function(v) {
      return function(m) {
        return function() {
          m[k] = v;
          return m;
        };
      };
    };
  }
  var deleteImpl = function(k) {
    return function(m) {
      return function() {
        delete m[k];
        return m;
      };
    };
  };

  // output/Foreign.Object/index.js
  var foldr5 = /* @__PURE__ */ foldr(foldableArray);
  var values2 = /* @__PURE__ */ toArrayWithKey(function(v) {
    return function(v1) {
      return v1;
    };
  });
  var thawST = _copyST;
  var mutate = function(f) {
    return function(m) {
      return runST(function __do6() {
        var s = thawST(m)();
        f(s)();
        return s;
      });
    };
  };
  var insert3 = function(k) {
    return function(v) {
      return mutate(poke2(k)(v));
    };
  };
  var fold3 = /* @__PURE__ */ _foldM(applyFlipped);
  var foldMap2 = function(dictMonoid) {
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
        return function(m) {
          return foldr5(f)(z)(values2(m));
        };
      };
    },
    foldMap: function(dictMonoid) {
      var foldMap12 = foldMap2(dictMonoid);
      return function(f) {
        return foldMap12($$const(f));
      };
    }
  };
  var $$delete3 = function(k) {
    return mutate(deleteImpl(k));
  };

  // output/Bolson.Control/index.js
  var map8 = /* @__PURE__ */ map(functorArray);
  var pollable2 = /* @__PURE__ */ pollable(eventIsEvent);
  var sample2 = /* @__PURE__ */ sample(pollable2);
  var bind2 = /* @__PURE__ */ bind(bindST);
  var pure6 = /* @__PURE__ */ pure(applicativeST);
  var liftST3 = /* @__PURE__ */ liftST(monadSTST);
  var sample_2 = /* @__PURE__ */ sample_(pollable2)(functorEvent)(functorEvent);
  var $$void6 = /* @__PURE__ */ $$void(functorST);
  var applySecond2 = /* @__PURE__ */ applySecond(applyST);
  var map13 = /* @__PURE__ */ map(functorST);
  var show2 = /* @__PURE__ */ show(showInt);
  var append4 = /* @__PURE__ */ append(/* @__PURE__ */ semigroupFn(semigroupString));
  var pure1 = /* @__PURE__ */ pure(applicativeFn);
  var append12 = /* @__PURE__ */ append(semigroupList);
  var append22 = /* @__PURE__ */ append(semigroupArray);
  var voidLeft2 = /* @__PURE__ */ voidLeft(functorEvent);
  var once4 = /* @__PURE__ */ once(eventIsEvent);
  var identity8 = /* @__PURE__ */ identity(categoryFn);
  var for_3 = /* @__PURE__ */ for_(applicativeST);
  var for_1 = /* @__PURE__ */ for_3(foldableArray);
  var for_22 = /* @__PURE__ */ for_3(foldableMaybe);
  var join4 = /* @__PURE__ */ join(bindST);
  var foldl2 = /* @__PURE__ */ foldl(foldableObject);
  var Listening = /* @__PURE__ */ function() {
    function Listening2() {
    }
    ;
    Listening2.value = new Listening2();
    return Listening2;
  }();
  var Closed = /* @__PURE__ */ function() {
    function Closed2() {
    }
    ;
    Closed2.value = new Closed2();
    return Closed2;
  }();
  var flatten = function(v) {
    return function(etty) {
      return function(psr) {
        return function(interpreter) {
          var element = function(v1) {
            return v1(psr)(interpreter);
          };
          if (etty instanceof FixedChildren$prime) {
            return poll(function(e) {
              return merge(map8(function(ex) {
                return sample2(flatten(v)(ex)(psr)(interpreter))(e);
              })(etty.value0));
            });
          }
          ;
          if (etty instanceof Element$prime) {
            return element(v.toElt(etty.value0));
          }
          ;
          if (etty instanceof DynamicChildren$prime) {
            return poll(function(e0) {
              return makeLemmingEvent(function(subscribe2) {
                return function(k0) {
                  return function __do6() {
                    var urf = newSTRef(pure6(unit))();
                    var cancelInner = liftST3(newSTRef(empty4))();
                    var ugh = subscribe2(e0)(function(f) {
                      return function __do7() {
                        var fireId1 = liftST3(v.ids(interpreter))();
                        k0(f(v.deferPayload(interpreter)(psr.deferralPath)(v.forcePayload(interpreter)(snoc(psr.deferralPath)(fireId1)))))();
                        var eepp = createPure();
                        var unsubscribe = subscribe2(sample_2(etty.value0)(e0))(eepp.push)();
                        var memoKids = {
                          unsubscribe,
                          event: eepp.event
                        };
                        $$void6(modify(function(v1) {
                          return applySecond2(v1)(memoKids.unsubscribe);
                        })(urf))();
                        var cancelOuter = subscribe2(memoKids.event)(function(inner) {
                          return function __do8() {
                            var fireId2 = liftST3(v.ids(interpreter))();
                            var myUnsubId = liftST3(v.ids(interpreter))();
                            var myUnsub = liftST3(newSTRef(pure6(unit)))();
                            var eltsUnsubId = liftST3(v.ids(interpreter))();
                            var eltsUnsub = liftST3(newSTRef(pure6(unit)))();
                            var myIds = liftST3(newSTRef([]))();
                            var myScope = liftST3(map13(Local.create)(function() {
                              if (psr.scope instanceof Global) {
                                return map13(show2)(v.ids(interpreter));
                              }
                              ;
                              if (psr.scope instanceof Local) {
                                return map13(append4(pure1(psr.scope.value0))(append4(pure1("!"))(show2)))(v.ids(interpreter));
                              }
                              ;
                              throw new Error("Failed pattern match at Bolson.Control (line 733, column 15 - line 735, column 74): " + [psr.scope.constructor.name]);
                            }()))();
                            var stageRef = liftST3(newSTRef(Listening.value))();
                            $$void6(liftST3(write2(Listening.value)(stageRef)))();
                            var evt = sample2(flatten(v)(snd(inner))(function() {
                              var $112 = {};
                              for (var $113 in psr) {
                                if ({}.hasOwnProperty.call(psr, $113)) {
                                  $112[$113] = psr[$113];
                                }
                                ;
                              }
                              ;
                              $112.scope = myScope;
                              $112.deferralPath = append12(psr.deferralPath)(new Cons(fireId1, new Cons(fireId2, Nil.value)));
                              $112.raiseId = function(id2) {
                                return $$void6(modify(append22([id2]))(myIds));
                              };
                              return $112;
                            }())(interpreter))(voidLeft2(once4(memoKids.event))(identity8));
                            var c1 = liftST3(subscribe2(evt)(function($208) {
                              return k0(f($208));
                            }))();
                            $$void6(liftST3(modify(insert3(show2(eltsUnsubId))(c1))(cancelInner)))();
                            $$void6(liftST3(write2(c1)(eltsUnsub)))();
                            var c0 = liftST3(subscribe2(sample_2(fst(inner))(once4(memoKids.event)))(function(kid$prime) {
                              return function __do9() {
                                var stage = liftST3(read2(stageRef))();
                                if (kid$prime instanceof Logic && stage instanceof Listening) {
                                  var cid = liftST3(read2(myIds))();
                                  return for_1(cid)(function() {
                                    var $209 = v.doLogic(kid$prime.value0)(interpreter);
                                    return function($210) {
                                      return k0(f($209($210)));
                                    };
                                  }())();
                                }
                                ;
                                if (kid$prime instanceof Remove && stage instanceof Listening) {
                                  $$void6(liftST3(write2(Closed.value)(stageRef)))();
                                  var idRef = liftST3(read2(myIds))();
                                  for_1(idRef)(function(old) {
                                    return for_22(psr.parent)(function(pnt) {
                                      return k0(f(v.disconnectElement(interpreter)({
                                        id: old,
                                        parent: pnt,
                                        scope: myScope
                                      })));
                                    });
                                  })();
                                  k0(f(v.forcePayload(interpreter)(append12(psr.deferralPath)(new Cons(fireId1, new Cons(fireId2, Nil.value))))))();
                                  var myu = liftST3(read2(myUnsub))();
                                  liftST3(myu)();
                                  var eltu = liftST3(read2(eltsUnsub))();
                                  liftST3(eltu)();
                                  $$void6(liftST3(modify($$delete3(show2(myUnsubId)))(cancelInner)))();
                                  return $$void6(liftST3(modify($$delete3(show2(eltsUnsubId)))(cancelInner)))();
                                }
                                ;
                                return unit;
                              };
                            }))();
                            $$void6(liftST3(write2(c0)(myUnsub)))();
                            return $$void6(liftST3(modify(insert3(show2(myUnsubId))(c0))(cancelInner)))();
                          };
                        })();
                        return $$void6(modify(function(v1) {
                          return applySecond2(v1)(cancelOuter);
                        })(urf))();
                      };
                    })();
                    return function __do7() {
                      liftST3(join4(read2(urf)))();
                      ugh();
                      return bind2(read2(cancelInner))(foldl2(applySecond2)(pure6(unit)))();
                    };
                  };
                };
              });
            });
          }
          ;
          throw new Error("Failed pattern match at Bolson.Control (line 702, column 17 - line 800, column 58): " + [etty.constructor.name]);
        };
      };
    };
  };
  var behaving$prime = function(iii) {
    return poll(function(e) {
      return makeLemmingEvent(function(subscribe2) {
        return function(kx) {
          return function __do6() {
            var urf = newSTRef(pure6(unit))();
            var ugh = subscribe2(e)(function(f) {
              return iii(f)(e)(function($211) {
                return kx(f($211));
              })(function(z) {
                return function(fkx) {
                  return function __do7() {
                    var acsu = subscribe2(z)(fkx(kx))();
                    return $$void6(modify(function(v) {
                      return applySecond2(v)(acsu);
                    })(urf))();
                  };
                };
              });
            })();
            return function __do7() {
              liftST3(join4(read2(urf)))();
              return ugh();
            };
          };
        };
      });
    });
  };
  var behaving_ = function(iii) {
    return behaving$prime(function(v) {
      return iii;
    });
  };
  var behaving = function(iii) {
    return behaving_(function(a2) {
      return function(b) {
        return function(c) {
          return iii(a2)(b)(flip(c)(identity8));
        };
      };
    });
  };

  // output/Data.Profunctor/index.js
  var identity9 = /* @__PURE__ */ identity(categoryFn);
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
      return dimap1(a2b)(identity9);
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
    var $10 = map(functorFn)(map(functorEffect)($$const(true)));
    return function($11) {
      return Cb($10($11));
    };
  }();

  // output/Deku.Core/index.js
  var lcmap2 = /* @__PURE__ */ lcmap(profunctorFn);
  var eq2 = /* @__PURE__ */ eq(eqScope);
  var show3 = /* @__PURE__ */ show(showInt);
  var pure7 = /* @__PURE__ */ pure(applicativeST);
  var sample3 = /* @__PURE__ */ sample(/* @__PURE__ */ pollable(eventIsEvent));
  var for_4 = /* @__PURE__ */ for_(applicativeST)(foldableArray);
  var append5 = /* @__PURE__ */ append(semigroupArray);
  var map9 = /* @__PURE__ */ map(/* @__PURE__ */ functorAPoll(functorEvent));
  var map14 = /* @__PURE__ */ map(functorArray);
  var empty5 = /* @__PURE__ */ empty(plusEvent);
  var Child = function(x) {
    return x;
  };
  var unsafeSetPos$prime = function(i) {
    return function(v) {
      var g = function(v1) {
        var f = function(ii) {
          if (ii instanceof Element$prime) {
            return new Element$prime(lcmap2(function(v2) {
              return {
                pos: i,
                deferralPath: v2.deferralPath,
                dynFamily: v2.dynFamily,
                ez: v2.ez,
                parent: v2.parent,
                raiseId: v2.raiseId,
                scope: v2.scope
              };
            })(ii.value0));
          }
          ;
          return ii;
        };
        return f(v1);
      };
      return g(v);
    };
  };
  var unsafeSetPos = function($95) {
    return unsafeSetPos$prime(Just.create($95));
  };
  var sendToPos = function(i) {
    return new Logic(i);
  };
  var remove = /* @__PURE__ */ function() {
    return Remove.value;
  }();
  var flattenArgs = {
    doLogic: function(pos) {
      return function(v) {
        return function(id2) {
          return v.sendToPos({
            id: id2,
            pos
          });
        };
      };
    },
    deferPayload: function(v) {
      return v.deferPayload;
    },
    forcePayload: function(v) {
      return v.forcePayload;
    },
    ids: /* @__PURE__ */ function() {
      var $96 = unwrap();
      return function($97) {
        return function(v) {
          return v.ids;
        }($96($97));
      };
    }(),
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
  var __internalDekuFlatten = function(a2) {
    return function(b) {
      return function(c) {
        return flatten(flattenArgs)(function(v) {
          return v;
        }(a2))(b)(c);
      };
    };
  };
  var dynify = function(dfun) {
    return function(es) {
      var go2 = function(fes) {
        return function(v) {
          return function(v1) {
            return behaving(function(e) {
              return function(kx) {
                return function(subscribe2) {
                  return function __do6() {
                    var me = v1.ids();
                    v.raiseId(show3(me))();
                    var v2 = function() {
                      if (v.parent instanceof Nothing) {
                        var dummyParent = v1.ids();
                        return new Tuple([v1.makeElement({
                          id: show3(dummyParent),
                          parent: Nothing.value,
                          scope: v.scope,
                          tag: "div",
                          ns: Nothing.value,
                          pos: Nothing.value,
                          dynFamily: Nothing.value
                        })], show3(dummyParent));
                      }
                      ;
                      if (v.parent instanceof Just) {
                        return new Tuple([], v.parent.value0);
                      }
                      ;
                      throw new Error("Failed pattern match at Deku.Core (line 355, column 32 - line 371, column 31): " + [v.parent.constructor.name]);
                    }();
                    var evt = sample3(__internalDekuFlatten(fes)({
                      parent: new Just(v2.value1),
                      scope: v.scope,
                      ez: false,
                      raiseId: function(v3) {
                        return pure7(unit);
                      },
                      deferralPath: v.deferralPath,
                      pos: Nothing.value,
                      dynFamily: new Just(show3(me))
                    })(v1))(e);
                    for_4(append5(v2.value0)([v1.makeDynBeacon({
                      id: show3(me),
                      parent: new Just(v2.value1),
                      scope: v.scope,
                      dynFamily: v.dynFamily,
                      pos: v.pos
                    }), v1.attributeParent({
                      id: show3(me),
                      parent: v2.value1,
                      pos: v.pos,
                      dynFamily: v.dynFamily,
                      ez: v.ez
                    })]))(kx)();
                    for_4([v1.removeDynBeacon({
                      id: show3(me)
                    })])(function() {
                      var $98 = v1.deferPayload(v.deferralPath);
                      return function($99) {
                        return kx($98($99));
                      };
                    }())();
                    return subscribe2(evt)();
                  };
                };
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
      }(dfun(es)));
    };
  };
  var dyn2 = /* @__PURE__ */ function() {
    var myDyn$prime = function(x) {
      return dyn(x);
    };
    var bolsonify = function(v) {
      return new Tuple(map9(function(v1) {
        return v1;
      })(v.value0), function(v1) {
        return v1;
      }(v.value1));
    };
    var myDyn = function(e) {
      return myDyn$prime(map9(bolsonify)(e));
    };
    return dynify(myDyn);
  }();
  var fixed2 = /* @__PURE__ */ function() {
    var myFixed$prime = function(x) {
      return fixed(map14(function(v) {
        return v;
      })(x));
    };
    var myFixed = function(e) {
      return myFixed$prime(map14(function(v) {
        return v;
      })(e));
    };
    return dynify(myFixed);
  }();
  var semigroupNut = {
    append: function(a2) {
      return function(b) {
        return fixed2([a2, b]);
      };
    }
  };
  var monoidNut = /* @__PURE__ */ function() {
    return {
      mempty: new Element$prime(function(v) {
        return function(v1) {
          return poll(function(v2) {
            return empty5;
          });
        };
      }),
      Semigroup0: function() {
        return semigroupNut;
      }
    };
  }();

  // output/Deku.Control/index.js
  var show4 = /* @__PURE__ */ show(showInt);
  var for_5 = /* @__PURE__ */ for_(applicativeST);
  var for_12 = /* @__PURE__ */ for_5(foldableMaybe);
  var pollable3 = /* @__PURE__ */ pollable(eventIsEvent);
  var sampleBy2 = /* @__PURE__ */ sampleBy(pollable3)(functorEvent)(functorEvent);
  var pure8 = /* @__PURE__ */ pure(/* @__PURE__ */ applicativeAPoll(applyEvent));
  var for_23 = /* @__PURE__ */ for_5(foldableArray);
  var pure12 = /* @__PURE__ */ pure(applicativeList);
  var sample4 = /* @__PURE__ */ sample(pollable3);
  var pure22 = /* @__PURE__ */ pure(applicativeST);
  var empty6 = /* @__PURE__ */ empty(/* @__PURE__ */ plusAPoll(plusEvent));
  var coerce3 = /* @__PURE__ */ coerce();
  var mapWithIndex3 = /* @__PURE__ */ mapWithIndex(functorWithIndexArray);
  var map10 = /* @__PURE__ */ map(functorFn);
  var unsafeSetText = function(v) {
    return function(id2) {
      return function(txt) {
        return v.setText(function(v1) {
          return {
            id: id2,
            text: v1
          };
        }(txt));
      };
    };
  };
  var unsafeSetAttribute = function(v) {
    return function(id2) {
      return function(v1) {
        if (v1.value instanceof Prop$prime) {
          return v.setProp({
            id: id2,
            key: v1.key,
            value: v1.value.value0
          });
        }
        ;
        if (v1.value instanceof Cb$prime) {
          return v.setCb({
            id: id2,
            key: v1.key,
            value: v1.value.value0
          });
        }
        ;
        if (v1.value instanceof Unset$prime) {
          return v.unsetAttribute({
            id: id2,
            key: v1.key
          });
        }
        ;
        throw new Error("Failed pattern match at Deku.Control (line 66, column 3 - line 69, column 41): " + [v1.value.constructor.name]);
      };
    };
  };
  var text5 = function(t2) {
    var go2 = function(v) {
      return function(v1) {
        return behaving(function(e) {
          return function(kx) {
            return function(subscribe2) {
              return function __do6() {
                var me = v1.ids();
                v.raiseId(show4(me))();
                kx(v1.makeText({
                  id: show4(me),
                  parent: v.parent,
                  pos: v.pos,
                  scope: v.scope,
                  dynFamily: v.dynFamily
                }))();
                for_12(v.parent)(function(p) {
                  return kx(v1.attributeParent({
                    id: show4(me),
                    parent: p,
                    pos: v.pos,
                    dynFamily: v.dynFamily,
                    ez: v.ez
                  }));
                })();
                kx(v1.deferPayload(v.deferralPath)(v1.deleteFromCache({
                  id: show4(me)
                })))();
                return subscribe2(sampleBy2(function(ttt) {
                  return function(fff) {
                    return fff(unsafeSetText(v1)(show4(me))(ttt));
                  };
                })(t2)(e))();
              };
            };
          };
        });
      };
    };
    var go$prime = new Element$prime(go2);
    return go$prime;
  };
  var text_ = function(s) {
    return text5(pure8(s));
  };
  var __internalDekuFlatten2 = function(v) {
    return function(a2) {
      return function(b) {
        return flatten(flattenArgs)(v)(a2)(b);
      };
    };
  };
  var deku = function(root) {
    return function(v) {
      var go2 = function(children2) {
        return function(v1) {
          return behaving(function(ee) {
            return function(kx) {
              return function(subscribe2) {
                return function __do6() {
                  var headRedecorator = v1.ids();
                  kx(v1.makeRoot({
                    id: "deku-root",
                    root
                  }))();
                  for_23([v1.forcePayload(pure12(headRedecorator)), v1.deleteFromCache({
                    id: "deku-root"
                  })])(function() {
                    var $125 = v1.deferPayload(pure12(headRedecorator));
                    return function($126) {
                      return kx($125($126));
                    };
                  }())();
                  return subscribe2(sample4(__internalDekuFlatten2(children2)({
                    parent: new Just("deku-root"),
                    deferralPath: pure12(headRedecorator),
                    scope: new Local("rootScope"),
                    raiseId: function(v2) {
                      return pure22(unit);
                    },
                    ez: true,
                    pos: Nothing.value,
                    dynFamily: Nothing.value
                  })(v1))(ee))();
                };
              };
            };
          });
        };
      };
      return go2(v);
    };
  };
  var elementify = function(ns) {
    return function(tag) {
      return function(atts) {
        return function(children2) {
          var go2 = function(v) {
            return function(v1) {
              return behaving(function(ee) {
                return function(kx) {
                  return function(subscribe2) {
                    return function __do6() {
                      var me = v1.ids();
                      v.raiseId(show4(me))();
                      kx(v1.makeElement({
                        id: show4(me),
                        parent: v.parent,
                        scope: v.scope,
                        ns,
                        tag,
                        pos: v.pos,
                        dynFamily: v.dynFamily
                      }))();
                      for_12(v.parent)(function(p) {
                        return kx(v1.attributeParent({
                          id: show4(me),
                          parent: p,
                          pos: v.pos,
                          dynFamily: v.dynFamily,
                          ez: v.ez
                        }));
                      })();
                      kx(v1.deferPayload(v.deferralPath)(v1.deleteFromCache({
                        id: show4(me)
                      })))();
                      subscribe2(sample4(__internalDekuFlatten2(children2)({
                        parent: new Just(show4(me)),
                        deferralPath: v.deferralPath,
                        scope: v.scope,
                        ez: true,
                        raiseId: function(v2) {
                          return pure22(unit);
                        },
                        pos: Nothing.value,
                        dynFamily: Nothing.value
                      })(v1))(ee))();
                      return subscribe2(sampleBy2(function(zzz) {
                        return function(fff) {
                          return fff(unsafeSetAttribute(v1)(show4(me))(unsafeUnAttribute(zzz)));
                        };
                      })(atts)(ee))();
                    };
                  };
                };
              });
            };
          };
          return go2;
        };
      };
    };
  };
  var elementify2 = function(ns) {
    return function(en) {
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
            return merge2(v);
          };
          var step1 = function(arr) {
            return new Element$prime(elementify(ns)(en)(aa(attributes))(fixed(coerce3(arr))));
          };
          return step1(mapWithIndex3(map10(map10(function(v) {
            return v;
          }))(unsafeSetPos))(kids));
        };
      };
    };
  };

  // output/Deku.DOM/index.js
  var ul = /* @__PURE__ */ function() {
    return elementify2(Nothing.value)("ul");
  }();
  var ul_ = /* @__PURE__ */ ul([]);
  var tr = /* @__PURE__ */ function() {
    return elementify2(Nothing.value)("tr");
  }();
  var tr_ = /* @__PURE__ */ tr([]);
  var td = /* @__PURE__ */ function() {
    return elementify2(Nothing.value)("td");
  }();
  var td_ = /* @__PURE__ */ td([]);
  var table = /* @__PURE__ */ function() {
    return elementify2(Nothing.value)("table");
  }();
  var li = /* @__PURE__ */ function() {
    return elementify2(Nothing.value)("li");
  }();
  var li_ = /* @__PURE__ */ li([]);
  var label4 = /* @__PURE__ */ function() {
    return elementify2(Nothing.value)("label");
  }();
  var label_ = /* @__PURE__ */ label4([]);
  var input = /* @__PURE__ */ function() {
    return elementify2(Nothing.value)("input");
  }();
  var h1 = /* @__PURE__ */ function() {
    return elementify2(Nothing.value)("h1");
  }();
  var h1_ = /* @__PURE__ */ h1([]);
  var div2 = /* @__PURE__ */ function() {
    return elementify2(Nothing.value)("div");
  }();
  var div_ = /* @__PURE__ */ div2([]);
  var br = /* @__PURE__ */ function() {
    return elementify2(Nothing.value)("br");
  }();
  var br_ = /* @__PURE__ */ br([]);

  // output/Deku.DOM.Self/index.js
  var map11 = /* @__PURE__ */ map(/* @__PURE__ */ functorAPoll(functorEvent));
  var pure9 = /* @__PURE__ */ pure(/* @__PURE__ */ applicativeAPoll(applyEvent));
  var self = /* @__PURE__ */ map11(function($51) {
    return unsafeAttribute(function(v) {
      return {
        key: "@self@",
        value: v
      };
    }(cb$prime(cb($51))));
  });
  var self_ = function($52) {
    return self(pure9($52));
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
          var i, tmp;
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
      function onComplete(join7) {
        return function() {
          if (status === COMPLETED) {
            rethrow = rethrow && join7.rethrow;
            join7.handler(step2)();
            return function() {
            };
          }
          var jid = joinId++;
          joins = joins || {};
          joins[jid] = join7;
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
      function join6(cb2) {
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
        join: join6,
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
        var head3 = null;
        var tail3 = null;
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
                if (head3 === null) {
                  break loop;
                }
                step2 = head3._2;
                if (tail3 === null) {
                  head3 = null;
                } else {
                  head3 = tail3._1;
                  tail3 = tail3._2;
                }
                break;
              case MAP:
                step2 = step2._2;
                break;
              case APPLY:
              case ALT:
                if (head3) {
                  tail3 = new Aff2(CONS, head3, tail3);
                }
                head3 = step2;
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
      function join6(result, head3, tail3) {
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
            if (head3 === null) {
              cb2(fail || step2)();
              return;
            }
            if (head3._3 !== EMPTY) {
              return;
            }
            switch (head3.tag) {
              case MAP:
                if (fail === null) {
                  head3._3 = util.right(head3._1(util.fromRight(step2)));
                  step2 = head3._3;
                } else {
                  head3._3 = fail;
                }
                break;
              case APPLY:
                lhs = head3._1._3;
                rhs = head3._2._3;
                if (fail) {
                  head3._3 = fail;
                  tmp = true;
                  kid = killId++;
                  kills[kid] = kill(early, fail === lhs ? head3._2 : head3._1, function() {
                    return function() {
                      delete kills[kid];
                      if (tmp) {
                        tmp = false;
                      } else if (tail3 === null) {
                        join6(fail, null, null);
                      } else {
                        join6(fail, tail3._1, tail3._2);
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
                  head3._3 = step2;
                }
                break;
              case ALT:
                lhs = head3._1._3;
                rhs = head3._2._3;
                if (lhs === EMPTY && util.isLeft(rhs) || rhs === EMPTY && util.isLeft(lhs)) {
                  return;
                }
                if (lhs !== EMPTY && util.isLeft(lhs) && rhs !== EMPTY && util.isLeft(rhs)) {
                  fail = step2 === lhs ? rhs : lhs;
                  step2 = null;
                  head3._3 = fail;
                } else {
                  head3._3 = step2;
                  tmp = true;
                  kid = killId++;
                  kills[kid] = kill(early, step2 === lhs ? head3._2 : head3._1, function() {
                    return function() {
                      delete kills[kid];
                      if (tmp) {
                        tmp = false;
                      } else if (tail3 === null) {
                        join6(step2, null, null);
                      } else {
                        join6(step2, tail3._1, tail3._2);
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
              head3 = null;
            } else {
              head3 = tail3._1;
              tail3 = tail3._2;
            }
          }
      }
      function resolve(fiber) {
        return function(result) {
          return function() {
            delete fibers[fiber._1];
            fiber._3 = result;
            join6(result, fiber._2._1, fiber._2._2);
          };
        };
      }
      function run3() {
        var status = CONTINUE;
        var step2 = par;
        var head3 = null;
        var tail3 = null;
        var tmp, fid;
        loop:
          while (true) {
            tmp = null;
            fid = null;
            switch (status) {
              case CONTINUE:
                switch (step2.tag) {
                  case MAP:
                    if (head3) {
                      tail3 = new Aff2(CONS, head3, tail3);
                    }
                    head3 = new Aff2(MAP, step2._1, EMPTY, EMPTY);
                    step2 = step2._2;
                    break;
                  case APPLY:
                    if (head3) {
                      tail3 = new Aff2(CONS, head3, tail3);
                    }
                    head3 = new Aff2(APPLY, EMPTY, step2._2, EMPTY);
                    step2 = step2._1;
                    break;
                  case ALT:
                    if (head3) {
                      tail3 = new Aff2(CONS, head3, tail3);
                    }
                    head3 = new Aff2(ALT, EMPTY, step2._2, EMPTY);
                    step2 = step2._1;
                    break;
                  default:
                    fid = fiberId++;
                    status = RETURN;
                    tmp = step2;
                    step2 = new Aff2(FORKED, fid, new Aff2(CONS, head3, tail3), EMPTY);
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
                if (head3 === null) {
                  break loop;
                }
                if (head3._1 === EMPTY) {
                  head3._1 = step2;
                  status = CONTINUE;
                  step2 = head3._2;
                  head3._2 = EMPTY;
                } else {
                  head3._2 = step2;
                  step2 = head3;
                  if (tail3 === null) {
                    head3 = null;
                  } else {
                    head3 = tail3._1;
                    tail3 = tail3._2;
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
  function _map(f) {
    return function(aff) {
      if (aff.tag === Aff.Pure.tag) {
        return Aff.Pure(f(aff._1));
      } else {
        return Aff.Bind(aff, function(value13) {
          return Aff.Pure(f(value13));
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

  // output/Effect.Aff/index.js
  var $runtime_lazy4 = function(name15, moduleName, init2) {
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
  var $$void7 = /* @__PURE__ */ $$void(functorEffect);
  var functorAff = {
    map: _map
  };
  var ffiUtil = /* @__PURE__ */ function() {
    var unsafeFromRight = function(v) {
      if (v instanceof Right) {
        return v.value0;
      }
      ;
      if (v instanceof Left) {
        return unsafeCrashWith("unsafeFromRight: Left");
      }
      ;
      throw new Error("Failed pattern match at Effect.Aff (line 412, column 21 - line 414, column 54): " + [v.constructor.name]);
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
      throw new Error("Failed pattern match at Effect.Aff (line 407, column 20 - line 409, column 55): " + [v.constructor.name]);
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
      throw new Error("Failed pattern match at Effect.Aff (line 402, column 12 - line 404, column 21): " + [v.constructor.name]);
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
    return _makeFiber(ffiUtil, aff);
  };
  var launchAff = function(aff) {
    return function __do6() {
      var fiber = makeFiber(aff)();
      fiber.run();
      return fiber;
    };
  };
  var launchAff_ = function($75) {
    return $$void7(launchAff($75));
  };
  var delay = function(v) {
    return _delay(Right.create, v);
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
  var $lazy_applyAff = /* @__PURE__ */ $runtime_lazy4("applyAff", "Effect.Aff", function() {
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

  // output/Web.Event.Event/foreign.js
  function _target(e) {
    return e.target;
  }

  // output/Web.Event.Event/index.js
  var target5 = function($3) {
    return toMaybe(_target($3));
  };

  // output/Deku.DOM.Combinators/index.js
  var map15 = /* @__PURE__ */ map(/* @__PURE__ */ functorAPoll(functorEvent));
  var discard2 = /* @__PURE__ */ discard(discardUnit);
  var for_6 = /* @__PURE__ */ for_(applicativeEffect)(foldableMaybe);
  var bind3 = /* @__PURE__ */ bind(bindMaybe);
  var composeKleisli2 = /* @__PURE__ */ composeKleisli(bindEffect);
  var pure10 = /* @__PURE__ */ pure(/* @__PURE__ */ applicativeAPoll(applyEvent));
  var discard22 = /* @__PURE__ */ discard2(bindAff);
  var liftEffect2 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var valueOn = function(listener) {
    var $17 = map15(function(push2) {
      return function(e) {
        return function __do6() {
          for_6(bind3(target5(e))(fromEventTarget))(composeKleisli2(value3)(push2))();
          return for_6(bind3(target5(e))(fromEventTarget2))(composeKleisli2(value11)(push2))();
        };
      };
    });
    return function($18) {
      return listener($17($18));
    };
  };
  var valueOn_ = function(listener) {
    var $19 = valueOn(listener);
    return function($20) {
      return $19(pure10($20));
    };
  };
  var injectElement = function(f) {
    return self_(function(s) {
      return launchAff_(discard22(delay(0))(function() {
        return liftEffect2(f(s));
      }));
    });
  };

  // output/Deku.DOM.Attributes/index.js
  var map16 = /* @__PURE__ */ map(/* @__PURE__ */ functorAPoll(functorEvent));
  var pure11 = /* @__PURE__ */ pure(/* @__PURE__ */ applicativeAPoll(applyEvent));
  var style = /* @__PURE__ */ map16(function($280) {
    return unsafeAttribute(function(v) {
      return {
        key: "style",
        value: v
      };
    }(prop$prime($280)));
  });
  var style_ = function($281) {
    return style(pure11($281));
  };
  var size4 = /* @__PURE__ */ map16(function($304) {
    return unsafeAttribute(function(v) {
      return {
        key: "size",
        value: v
      };
    }(prop$prime($304)));
  });
  var size_ = function($305) {
    return size4(pure11($305));
  };

  // output/Deku.DOM.Listeners/index.js
  var map17 = /* @__PURE__ */ map(/* @__PURE__ */ functorAPoll(functorEvent));
  var pure13 = /* @__PURE__ */ pure(/* @__PURE__ */ applicativeAPoll(applyEvent));
  var keydown = /* @__PURE__ */ map17(function($291) {
    return unsafeAttribute(function(v) {
      return {
        key: "keydown",
        value: v
      };
    }(cb$prime(cb($291))));
  });
  var keydown_ = function($292) {
    return keydown(pure13($292));
  };
  var input2 = /* @__PURE__ */ map17(function($295) {
    return unsafeAttribute(function(v) {
      return {
        key: "input",
        value: v
      };
    }(cb$prime(cb($295))));
  });

  // output/Deku.DOM.SVG/index.js
  var svg = /* @__PURE__ */ function() {
    return elementify2(new Just("http://www.w3.org/2000/svg"))("svg");
  }();
  var line = /* @__PURE__ */ function() {
    return elementify2(new Just("http://www.w3.org/2000/svg"))("line");
  }();

  // output/Deku.DOM.SVG.Attributes/index.js
  var map18 = /* @__PURE__ */ map(/* @__PURE__ */ functorAPoll(functorEvent));
  var pure14 = /* @__PURE__ */ pure(/* @__PURE__ */ applicativeAPoll(applyEvent));
  var y2 = /* @__PURE__ */ map18(function($217) {
    return unsafeAttribute(function(v) {
      return {
        key: "y2",
        value: v
      };
    }(prop$prime($217)));
  });
  var y2_ = function($218) {
    return y2(pure14($218));
  };
  var y1 = /* @__PURE__ */ map18(function($219) {
    return unsafeAttribute(function(v) {
      return {
        key: "y1",
        value: v
      };
    }(prop$prime($219)));
  });
  var y1_ = function($220) {
    return y1(pure14($220));
  };
  var x2 = /* @__PURE__ */ map18(function($235) {
    return unsafeAttribute(function(v) {
      return {
        key: "x2",
        value: v
      };
    }(prop$prime($235)));
  });
  var x2_ = function($236) {
    return x2(pure14($236));
  };
  var x1 = /* @__PURE__ */ map18(function($237) {
    return unsafeAttribute(function(v) {
      return {
        key: "x1",
        value: v
      };
    }(prop$prime($237)));
  });
  var x1_ = function($238) {
    return x1(pure14($238));
  };
  var width8 = /* @__PURE__ */ map18(function($245) {
    return unsafeAttribute(function(v) {
      return {
        key: "width",
        value: v
      };
    }(prop$prime($245)));
  });
  var strokeWidth = /* @__PURE__ */ map18(function($289) {
    return unsafeAttribute(function(v) {
      return {
        key: "stroke-width",
        value: v
      };
    }(prop$prime($289)));
  });
  var strokeWidth_ = function($290) {
    return strokeWidth(pure14($290));
  };
  var stroke = /* @__PURE__ */ map18(function($323) {
    return unsafeAttribute(function(v) {
      return {
        key: "stroke",
        value: v
      };
    }(prop$prime($323)));
  });
  var stroke_ = function($324) {
    return stroke(pure14($324));
  };
  var height8 = /* @__PURE__ */ map18(function($505) {
    return unsafeAttribute(function(v) {
      return {
        key: "height",
        value: v
      };
    }(prop$prime($505)));
  });

  // output/Deku.Do/index.js
  var bind4 = function(f) {
    return function(a2) {
      return f(a2);
    };
  };

  // output/Deku.Hooks/index.js
  var eq3 = /* @__PURE__ */ eq(eqScope);
  var empty7 = /* @__PURE__ */ empty(/* @__PURE__ */ plusAPoll(plusEvent));
  var pollable4 = /* @__PURE__ */ pollable(eventIsEvent);
  var sample5 = /* @__PURE__ */ sample(pollable4);
  var identity10 = /* @__PURE__ */ identity(categoryFn);
  var mailbox3 = /* @__PURE__ */ mailbox2(ordInt);
  var functorAPoll2 = /* @__PURE__ */ functorAPoll(functorEvent);
  var voidLeft3 = /* @__PURE__ */ voidLeft(functorAPoll2);
  var map19 = /* @__PURE__ */ map(functorAPoll2);
  var mapWithIndex4 = /* @__PURE__ */ mapWithIndex(/* @__PURE__ */ functorWithIndexAPoll(eventIsEvent)(pollable4));
  var sample_3 = /* @__PURE__ */ sample_(pollable4)(functorEvent)(functorEvent);
  var filterMap3 = /* @__PURE__ */ filterMap(/* @__PURE__ */ filterableAPoll(functorEvent)(compactableEvent)(pollable4));
  var alt5 = /* @__PURE__ */ alt(/* @__PURE__ */ altAPoll(altEvent));
  var pure15 = /* @__PURE__ */ pure(/* @__PURE__ */ applicativeAPoll(applyEvent));
  var flattenArgs2 = {
    doLogic: function(pos) {
      return function(v) {
        return function(id2) {
          return v.sendToPos({
            id: id2,
            pos
          });
        };
      };
    },
    ids: /* @__PURE__ */ function() {
      var $147 = unwrap();
      return function($148) {
        return function(v) {
          return v.ids;
        }($147($148));
      };
    }(),
    deferPayload: function(v) {
      return v.deferPayload;
    },
    forcePayload: function(v) {
      return v.forcePayload;
    },
    disconnectElement: function(v) {
      return function(v1) {
        return v.disconnectElement({
          id: v1.id,
          scope: v1.scope,
          parent: v1.parent,
          scopeEq: eq3
        });
      };
    },
    toElt: function(v) {
      return v;
    }
  };
  var dynOptions = {
    sendTo: function(v) {
      return empty7;
    },
    remove: function(v) {
      return empty7;
    }
  };
  var __internalDekuFlatten3 = function(v) {
    return function(a2) {
      return function(b) {
        return flatten(flattenArgs2)(v)(a2)(b);
      };
    };
  };
  var useDynWith = function(e) {
    return function(opts) {
      return function(f) {
        var go2 = function(i) {
          return function(di) {
            return behaving(function(ee) {
              return function(v) {
                return function(subscribe2) {
                  return function __do6() {
                    var c1 = mailbox3();
                    var mc = function(ix) {
                      return function(v12) {
                        return new Tuple(merge2([voidLeft3(opts.remove(v12.value1))(Remove.value), map19(function($149) {
                          return Child(Logic.create($149));
                        })(opts.sendTo(v12.value1)), c1.poll(ix)]), unsafeSetPos(v12.value0)(f({
                          value: v12.value1,
                          remove: c1.push({
                            address: ix,
                            payload: remove
                          }),
                          sendTo: function($150) {
                            return c1.push(function(v3) {
                              return {
                                address: ix,
                                payload: v3
                              };
                            }(sendToPos($150)));
                          }
                        })));
                      };
                    };
                    var v1 = dyn2(mapWithIndex4(mc)(e));
                    return subscribe2(sample5(__internalDekuFlatten3(v1)(i)(di))(ee))();
                  };
                };
              };
            });
          };
        };
        var go$prime = new Element$prime(go2);
        return go$prime;
      };
    };
  };
  var useDynAtBeginningWith = function(e) {
    return useDynWith(map19(function(v) {
      return new Tuple(0, v);
    })(e));
  };
  var useMemoized = function(xs) {
    return function(f) {
      var go2 = function(i) {
        return function(di) {
          return behaving$prime(function(v) {
            return function(ee) {
              return function(v1) {
                return function(subscribe2) {
                  return function __do6() {
                    var memo = createPure2();
                    var v2 = f(memo.poll);
                    subscribe2(sample5(__internalDekuFlatten3(v2)(i)(di))(ee))(identity10)();
                    return subscribe2(sample_3(xs)(ee))(function(v3) {
                      return memo.push;
                    })();
                  };
                };
              };
            };
          });
        };
      };
      var go$prime = new Element$prime(go2);
      return go$prime;
    };
  };
  var switcher = function(f) {
    return function(poll2) {
      return bind4(useMemoized(mapWithIndex4(Tuple.create)(poll2)))(function(ctr) {
        return bind4(useDynAtBeginningWith(ctr)({
          sendTo: dynOptions.sendTo,
          remove: function(v1) {
            return filterMap3(function(v2) {
              var $117 = v2.value0 === (v1.value0 + 1 | 0);
              if ($117) {
                return new Just(unit);
              }
              ;
              return Nothing.value;
            })(ctr);
          }
        }))(function(v) {
          return f(snd(v.value));
        });
      });
    };
  };
  var switcherFlipped = function(a2) {
    return function(b) {
      return switcher(b)(a2);
    };
  };
  var useState$prime = function(f) {
    var go2 = function(i) {
      return function(di) {
        return behaving(function(ee) {
          return function(v) {
            return function(subscribe2) {
              return function __do6() {
                var v1 = create4();
                var v2 = f(new Tuple(v1.push, v1.poll));
                return subscribe2(sample5(__internalDekuFlatten3(v2)(i)(di))(ee))();
              };
            };
          };
        });
      };
    };
    var go$prime = new Element$prime(go2);
    return go$prime;
  };
  var useState = function(a2) {
    return function(f) {
      return bind4(useState$prime)(function(v) {
        return f(new Tuple(v.value0, alt5(pure15(a2))(v.value1)));
      });
    };
  };

  // output/Deku.Interpret/foreign.js
  var associateWithUnsubscribe_ = (a2) => (state3) => () => {
    state3.units[a2.id].unsubscribe = a2.unsubscribe;
  };
  var attributeParent_ = (runOnJust2) => (a2) => (state3) => () => {
    if (state3.units[a2.id]) {
      const dom2 = state3.units[a2.parent].main;
      if (!(state3.units[a2.id].main && state3.units[a2.id].main.parentNode || state3.units[a2.id].startBeacon && state3.units[a2.id].startBeacon.parentNode)) {
        const iRan = a2.ez ? (() => {
          if (state3.units[a2.id].main) {
            dom2.appendChild(state3.units[a2.id].main);
          } else {
            dom2.appendChild(state3.units[a2.id].startBeacon);
            dom2.appendChild(state3.units[a2.id].endBeacon);
          }
          return true;
        })() : runOnJust2(a2.pos)((pos) => () => {
          return runOnJust2(a2.dynFamily)((dynFamily) => () => {
            var i = 0;
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
              if (state3.units[a2.id].startBeacon) {
                dom2.insertBefore(state3.units[a2.id].startBeacon, anchorNode);
                dom2.insertBefore(state3.units[a2.id].endBeacon, anchorNode);
              } else {
                dom2.insertBefore(state3.units[a2.id].main, anchorNode);
              }
            };
            while (j < dom2.childNodes.length) {
              var tmpDekuId;
              if (tmpDekuId = dom2.childNodes[j].$dekuId) {
                const insertHappened = runOnJust2(state3.units[tmpDekuId].dynFamily)((tmpDynFamily) => () => {
                  const insertHappened2 = runOnJust2(state3.units[tmpDekuId].pos)((tmpPos) => () => {
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
              if (i === pos) {
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
                i++;
              }
              if (dom2.childNodes[j].nodeType === 8 && dom2.childNodes[j].nodeValue === terminalDyn) {
                terminalDyn = void 0;
                i++;
              }
              j++;
            }
            return false;
          })();
        })();
        if (!iRan) {
          if (a2.parent.indexOf("@!%") !== -1) {
            const usedDynBeacon = runOnJust2(a2.dynFamily)((df) => () => {
              if (state3.units[a2.id].main) {
                state3.units[df].endBeacon.parentNode.insertBefore(state3.units[a2.id].main, state3.units[df].endBeacon);
              } else {
                state3.units[df].endBeacon.parentNode.insertBefore(state3.units[a2.id].endBeacon, state3.units[df].endBeacon);
                state3.units[df].endBeacon.parentNode.insertBefore(state3.units[a2.id].startBeacon, state3.units[a2.id].endBeacon);
              }
              return true;
            })();
            if (usedDynBeacon) {
            } else if (state3.units[a2.id].main) {
              dom2.parentNode.replaceChild(state3.units[a2.id].main, dom2);
            } else {
              dom2.parentNode.replaceChild(state3.units[a2.id].endBeacon, dom2);
              state3.units[a2.id].endBeacon.parentNode.insertBefore(state3.units[a2.id].startBeacon, state3.units[a2.id].endBeacon);
            }
          } else {
            const hasADynFamily = runOnJust2(a2.dynFamily)((dynFamily) => () => {
              if (state3.units[a2.id].startBeacon) {
                dom2.insertBefore(state3.units[a2.id].startBeacon, state3.units[dynFamily].endBeacon);
                dom2.insertBefore(state3.units[a2.id].endBeacon, state3.units[dynFamily].endBeacon);
              } else {
                dom2.insertBefore(state3.units[a2.id].main, state3.units[dynFamily].endBeacon);
              }
              return true;
            })();
            if (!hasADynFamily) {
              if (state3.units[a2.id].startBeacon) {
                dom2.appendChild(state3.units[a2.id].startBeacon);
                dom2.appendChild(state3.units[a2.id].endBeacon);
              } else {
                dom2.appendChild(state3.units[a2.id].main);
              }
            }
          }
        }
      }
    }
  };
  var makeDynBeacon_ = (runOnJust2) => (tryHydration) => (a2) => (state3) => () => {
    var startBeacon;
    var endBeacon;
    var ptr = a2.id;
    if (!state3.scopes[a2.scope]) {
      state3.scopes[a2.scope] = [];
    }
    state3.scopes[a2.scope].push(ptr);
    const iRan = runOnJust2(a2.parent)(() => () => {
      if (state3.hydrating && tryHydration && (startBeacon = state3.allBeacons[a2.id]) && (endBeacon = state3.allBeacons[`${a2.id}%-%`])) {
        state3.units[ptr] = {
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
      state3.units[ptr] = {
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
  var getDynFamily = (id2) => (state3) => () => state3.units[id2] && state3.units[id2].dynFamily ? state3.units[id2].dynFamily : (() => {
    throw new Error(`No dyn family for ${id2}`);
  })();
  var getParent = (id2) => (state3) => () => state3.units[id2] && state3.units[id2].main && state3.units[id2].main.parentNode && state3.units[id2].main.parentNode.$dekuId ? state3.units[id2].main.parentNode.$dekuId : state3.units[id2] && state3.units[id2].startBeacon && state3.units[id2].startBeacon.parentNode && state3.units[id2].startBeacon.parentNode.$dekuId ? state3.units[id2].startBeacon.parentNode.$dekuId : (() => {
    throw new Error(`No parent information for ${id2}`);
  })();
  var getScope = (id2) => (state3) => () => state3.units[id2] && state3.units[id2].scope ? state3.units[id2].scope : (() => {
    throw new Error(`No scope information for ${id2}`);
  })();
  var makeElement_ = (runOnJust2) => (tryHydration) => (a2) => (state3) => () => {
    var dom2;
    var ptr = a2.id;
    if (!state3.scopes[a2.scope]) {
      state3.scopes[a2.scope] = [];
    }
    state3.scopes[a2.scope].push(ptr);
    const iRan = runOnJust2(a2.parent)(() => () => {
      if (state3.hydrating && tryHydration && (dom2 = document.documentElement.querySelector(`[data-deku-ssr="${ptr}"]`))) {
        state3.units[ptr] = {
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
      let namespace = null;
      runOnJust2(a2.ns)((ns) => () => {
        namespace = ns;
        return true;
      })();
      const main2 = namespace === null ? document.createElement(a2.tag) : document.createElementNS(namespace, a2.tag);
      state3.units[ptr] = {
        listeners: {},
        parent: a2.parent,
        pos: a2.pos,
        scope: a2.scope,
        dynFamily: a2.dynFamily,
        main: main2
      };
      main2.$dekuId = ptr;
    }
  };
  var makeText_ = (runOnJust2) => (tryHydration) => (maybe2) => (a2) => (state3) => () => {
    var ptr = a2.id;
    var dom2;
    if (!state3.scopes[a2.scope]) {
      state3.scopes[a2.scope] = [];
    }
    state3.scopes[a2.scope].push(ptr);
    const iRan = runOnJust2(a2.parent)((parent2) => () => {
      if (state3.hydrating && tryHydration && (dom2 = document.documentElement.querySelector(`[data-deku-ssr="${parent2}"]`))) {
        var i = 0;
        for (; i < dom2.childNodes.length; i++) {
          const ptrSplit = ptr.split("@-@");
          if (dom2.childNodes[i].nodeType === 8 && dom2.childNodes[i].nodeValue === ptrSplit[0]) {
            var textWasBlank = i === 0 || dom2.childNodes[i - 1].nodeType !== 3;
            if (textWasBlank && i !== 0) {
              dom2.insertBefore(document.createTextNode(""), dom2.childNodes[i]);
            } else if (textWasBlank) {
              dom2.prepend(document.createTextNode(""));
            } else {
              i = i - 1;
            }
            break;
          }
        }
        const main2 = dom2.childNodes[i];
        state3.units[ptr] = {
          main: main2,
          pos: a2.pos,
          parent: a2.parent,
          scope: a2.scope,
          dynFamily: a2.dynFamily
        };
        main2.$dekuId = ptr;
        return true;
      }
      return false;
    })();
    if (!iRan) {
      const main2 = document.createTextNode("");
      state3.units[ptr] = {
        main: main2,
        parent: a2.parent,
        scope: a2.scope,
        pos: a2.pos,
        dynFamily: a2.dynFamily
      };
      main2.$dekuId = ptr;
    }
  };
  function makeFFIDOMSnapshot() {
    return {
      units: {},
      scopes: {},
      allBeacons: {}
    };
  }
  var setProp_ = (tryHydration) => (a2) => (state3) => () => {
    if (state3.units[a2.id]) {
      var ptr = a2.id;
      var avv = a2.value;
      if (state3.hydrating && tryHydration && !state3.units[ptr] && (dom = document.documentElement.querySelector(`[data-deku-ssr="${ptr}"]`))) {
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
      } else if (state3.units[ptr].main.tagName === "TEXTAREA" && a2.key === "value") {
        state3.units[ptr].main.value = avv;
      } else if (state3.units[ptr].main.tagName === "INPUT" && a2.key === "checked") {
        state3.units[ptr].main.checked = avv === "true";
      } else if (a2.key === "disabled") {
        state3.units[ptr].main.disabled = avv === "true";
      } else {
        state3.units[ptr].main.setAttribute(a2.key, avv);
      }
    }
  };
  var setCb_ = (tryHydration) => (a2) => (state3) => () => {
    if (state3.units[a2.id]) {
      var ptr = a2.id;
      var avv = a2.value;
      if (state3.hydrating && tryHydration && !state3.units[ptr] && (dom = document.documentElement.querySelector(`[data-deku-ssr="${ptr}"]`))) {
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
    }
  };
  var unsetAttribute_ = (tryHydration) => (a2) => (state3) => () => {
    if (state3.units[a2.id]) {
      var ptr = a2.id;
      if (state3.hydrating && tryHydration && !state3.units[ptr] && (dom = document.documentElement.querySelector(`[data-deku-ssr="${ptr}"]`))) {
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
      state3.units[ptr].main.removeAttribute(a2.key);
    }
  };
  var setText_ = (a2) => (state3) => () => {
    if (state3.units[a2.id]) {
      var ptr = a2.id;
      state3.units[ptr].main.nodeValue = a2.text;
    }
  };
  var makePursx_ = (runOnJust2) => (tryHydration) => (maybe2) => (a2) => (state3) => () => {
    var dom2;
    var tmp;
    var ptr = a2.id;
    var html = a2.html;
    var dynFamily = a2.dynFamily;
    var verb = a2.verb;
    var cache = a2.cache;
    var parent2 = a2.parent;
    var scope2 = a2.scope;
    var pxScope = a2.pxScope;
    const iRan = runOnJust2(a2.parent)(() => () => {
      if (state3.hydrating && tryHydration && (dom2 = document.documentElement.querySelector(`[data-deku-ssr="${ptr}"]`))) {
        state3.units[ptr] = {
          listeners: {},
          pos: a2.pos,
          scope: scope2,
          parent: parent2,
          main: dom2,
          dynFamily
        };
        dom2.$dekuId = ptr;
        return true;
      }
      return false;
    })();
    if (!iRan) {
      const entries = Object.entries(cache);
      for (var i = 0; i < entries.length; i++) {
        const key2 = entries[i][0];
        if (entries[i][1] === true) {
          html = html.replace(verb + key2 + verb, 'data-deku-attr-internal="' + key2 + '"');
        } else {
          html = html.replace(verb + key2 + verb, '<span style="display:contents;" data-deku-elt-internal="' + key2 + '"></span>');
        }
      }
      tmp = document.createElement("div");
      tmp.innerHTML = html.trim();
      state3.units[ptr] = {
        listeners: {},
        pos: a2.pos,
        scope: scope2,
        dynFamily,
        parent: parent2,
        main: tmp.firstChild
      };
      tmp.firstChild.$dekuId = ptr;
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
      const namespacedKey = key2 + "@!%" + pxScope;
      state3.units[namespacedKey] = {
        listeners: {},
        main: e,
        scope: scope2
      };
      state3.scopes[scope2].push(namespacedKey);
    });
    tmp.querySelectorAll("[data-deku-elt-internal]").forEach(function(e) {
      var key2 = e.getAttribute("data-deku-elt-internal");
      const namespacedKey = key2 + "@!%" + pxScope;
      state3.units[key2 + "@!%" + pxScope] = {
        listeners: {},
        main: e,
        scope: scope2
      };
      state3.scopes[scope2].push(namespacedKey);
    });
    if (!iRan) {
      state3.units[ptr].main.remove();
    }
  };
  var makeRoot_ = (a2) => (state3) => () => {
    var ptr = a2.id;
    state3.units[ptr] = {
      main: a2.root
    };
    a2.root.$dekuId = ptr;
  };
  var giveNewParent_ = (just) => (runOnJust2) => (b) => (state3) => () => {
    const insertAt2 = (ptr, parent2, node) => {
      if (state3.units[ptr].startBeacon) {
        var x3 = state3.units[ptr].startBeacon;
        var y3 = x3.nextSibling;
        state3.units[parent2].main.insertBefore(x3, node);
        x3 = y3;
        while (x3 && x3 !== state3.units[ptr].endBeacon) {
          y3 = x3.nextSibling;
          state3.units[parent2].main.insertBefore(x3, node);
          x3 = y3;
        }
      } else {
        state3.units[parent2].main.insertBefore(state3.units[ptr].main, node);
      }
    };
    const runMe = [];
    runMe.push(b);
    for (var z = 0; z < runMe.length; z++) {
      const a2 = runMe[z];
      const ptr = a2.id;
      const parent2 = a2.parent;
      state3.units[ptr].containingScope = a2.scope;
      var aPos = void 0;
      runOnJust2(a2.pos)((myPos) => () => {
        aPos = myPos;
        return true;
      })();
      if (aPos === void 0) {
        aPos = Number.MAX_VALUE;
      }
      const nodes = state3.units[parent2].main.childNodes;
      var i = 0;
      var didInsert = false;
      var pos = 0;
      while (i < nodes.length) {
        var dkid;
        if (dkid = nodes[i].$dekuId) {
          const insertedBeforeEndBeacon = runOnJust2(a2.dynFamily)((df) => () => {
            if (didInsert) {
              return false;
            }
            if (state3.units[dkid].endBeacon === nodes[i] && df === dkid) {
              state3.units[ptr].pos = just(pos);
              insertAt2(ptr, parent2, nodes[i]);
              return true;
            }
            return false;
          })();
          if (insertedBeforeEndBeacon) {
            didInsert = true;
            break;
          }
          if (state3.units[dkid].dynFamily !== a2.dynFamily) {
            i++;
            continue;
          }
          if (didInsert) {
            i++;
            continue;
          }
          if (pos === aPos) {
            insertAt2(ptr, parent2, nodes[i]);
            pos++;
            didInsert = true;
          } else if (state3.units[dkid].endBeacon !== nodes[i]) {
            state3.units[dkid].pos = just(pos);
            pos++;
          }
        }
        i++;
      }
      if (didInsert) {
        return;
      }
      if (state3.units[ptr].main) {
        state3.units[parent2].main.appendChild(state3.units[ptr].main);
      } else {
        var x = state3.units[ptr].startBeacon;
        var y = x.nextSibling;
        state3.units[parent2].main.appendChild(x);
        x = y;
        while (x && x !== state3.units[ptr].endBeacon) {
          y = x.nextSibling;
          state3.units[parent2].main.appendChild(x);
          x = y;
        }
      }
    }
  };
  var disconnectElement_ = (a2) => (state3) => () => {
    if (state3.units[a2.id]) {
      var ptr = a2.id;
      if (state3.units[ptr].containingScope && !a2.scopeEq(state3.units[ptr].containingScope)(a2.scope)) {
        return;
      }
      if (state3.units[ptr].main) {
        state3.units[ptr].main.remove();
      } else {
        const dummy = document.createElement("div");
        var x = state3.units[ptr].startBeacon;
        var y = x.nextSibling;
        dummy.appendChild(x);
        x = y;
        while (x && x !== state3.units[ptr].endBeacon) {
          y = x.nextSibling;
          dummy.appendChild(x);
          x = y;
        }
        if (x === state3.units[ptr].endBeacon) {
          dummy.appendChild(x);
        }
      }
    }
  };
  var stateHasKey = (id2) => (state3) => () => {
    return state3.units[id2] !== void 0;
  };
  var deleteFromCache_ = (a2) => (state3) => () => {
    if (state3.units[a2.id]) {
      if (state3.units[a2.id].unsubscribe) {
        state3.units[a2.id].unsubscribe();
      }
      delete state3.units[a2.id];
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
    return function(s) {
      return includesImpl(searchString, s);
    };
  };

  // output/Deku.Interpret/index.js
  var $$void8 = /* @__PURE__ */ $$void(functorST);
  var append6 = /* @__PURE__ */ append(semigroupArray);
  var pure16 = /* @__PURE__ */ pure(applicativeEffect);
  var mempty3 = /* @__PURE__ */ mempty(/* @__PURE__ */ monoidFn(/* @__PURE__ */ monoidST(monoidUnit)));
  var mempty1 = /* @__PURE__ */ mempty(monoidNut);
  var coerce4 = /* @__PURE__ */ coerce();
  var add2 = /* @__PURE__ */ add(semiringInt);
  var ordList2 = /* @__PURE__ */ ordList(ordInt);
  var monoidEndo2 = /* @__PURE__ */ monoidEndo(categoryFn);
  var foldSubmap2 = /* @__PURE__ */ foldSubmap(ordList2)(/* @__PURE__ */ monoidRecord()(/* @__PURE__ */ monoidRecordCons({
    reflectSymbol: function() {
      return "instructions";
    }
  })(monoidEndo2)()(/* @__PURE__ */ monoidRecordCons({
    reflectSymbol: function() {
      return "newMap";
    }
  })(monoidEndo2)()(monoidRecordNil))));
  var $$delete4 = /* @__PURE__ */ $$delete2(ordList2);
  var discard3 = /* @__PURE__ */ discard(discardUnit);
  var unwrap3 = /* @__PURE__ */ unwrap();
  var join5 = /* @__PURE__ */ join(bindArray);
  var alter2 = /* @__PURE__ */ alter(ordList2);
  var liftST4 = /* @__PURE__ */ liftST(monadSTEffect);
  var applySecond3 = /* @__PURE__ */ applySecond(applyFn);
  var liftST12 = /* @__PURE__ */ liftST(monadSTST);
  var sample6 = /* @__PURE__ */ sample(/* @__PURE__ */ pollable(eventIsEvent));
  var identity11 = /* @__PURE__ */ identity(categoryFn);
  var for_7 = /* @__PURE__ */ for_(applicativeEffect)(foldableMaybe);
  var runOnJust = function(v) {
    return function(v1) {
      if (v instanceof Just) {
        return v1(v.value0);
      }
      ;
      return pure16(false);
    };
  };
  var sendToPos2 = function(a2) {
    return function(state3) {
      return function __do6() {
        var scope2 = getScope(a2.id)(state3)();
        var parent2 = getParent(a2.id)(state3)();
        var dynFamily = getDynFamily(a2.id)(state3)();
        var newA = {
          scope: scope2,
          parent: parent2,
          dynFamily,
          id: a2.id,
          deferralPath: Nil.value,
          pos: new Just(a2.pos),
          ez: false,
          raiseId: mempty3,
          ctor: function(v) {
            return v;
          }(mempty1)
        };
        return coerce4(giveNewParent_(Just.create)(runOnJust)(newA))(state3)();
      };
    };
  };
  var forcePayloadE = function(dictFunctor) {
    var void12 = $$void(dictFunctor);
    return function(dictMonadST) {
      var Monad0 = dictMonadST.Monad0();
      var Bind1 = Monad0.Bind1();
      var bind22 = bind(Bind1);
      var liftST22 = liftST(dictMonadST);
      var discard32 = discard3(Bind1);
      var for_13 = for_(Monad0.Applicative0())(foldableArray);
      return function(deferredCache) {
        return function(executor) {
          return function(l) {
            var fn = function(v) {
              return bind22(liftST22(read2(deferredCache)))(function(o) {
                var tail3 = function(v12) {
                  if (v12 instanceof Cons && v12.value1 instanceof Nil) {
                    return new Cons(v12.value0 + 1 | 0, Nil.value);
                  }
                  ;
                  if (v12 instanceof Cons) {
                    return new Cons(v12.value0, tail3(v12.value1));
                  }
                  ;
                  return v12;
                };
                var rightBound = new Just(tail3(l));
                var leftBound = new Just(l);
                var v1 = flip(foldSubmap2(leftBound)(rightBound))(o)(function(k) {
                  return function(v2) {
                    return {
                      newMap: $$delete4(k),
                      instructions: cons(v2)
                    };
                  };
                });
                return discard32(void12(liftST22(modify(unwrap3(v1.newMap))(deferredCache))))(function() {
                  return for_13(join5(unwrap3(v1.instructions)([])))(executor);
                });
              });
            };
            return fn;
          };
        };
      };
    };
  };
  var forcePayloadE2 = /* @__PURE__ */ forcePayloadE(functorEffect)(monadSTEffect);
  var deferPayloadE = function(dictFunctor) {
    var void12 = $$void(dictFunctor);
    return function(dictMonadST) {
      var liftST22 = liftST(dictMonadST);
      return function(deferredCache) {
        return function(l) {
          return function(p) {
            return function(v) {
              return void12(liftST22(modify(flip(alter2)(l)(function(v1) {
                if (v1 instanceof Nothing) {
                  return new Just([p]);
                }
                ;
                if (v1 instanceof Just) {
                  return new Just(append6(v1.value0)([p]));
                }
                ;
                throw new Error("Failed pattern match at Deku.Interpret (line 395, column 24 - line 397, column 36): " + [v1.constructor.name]);
              }))(deferredCache)));
            };
          };
        };
      };
    };
  };
  var deferPayloadE2 = /* @__PURE__ */ deferPayloadE(functorEffect)(monadSTEffect);
  var __internalDekuFlatten4 = function(c) {
    return function(a2) {
      return function(b) {
        return flatten(flattenArgs)(coerce4(c))(a2)(b);
      };
    };
  };
  var giveNewParentOrReconstruct = function(v) {
    return function(executor) {
      return function(just) {
        return function(roj) {
          return function(gnp) {
            return function(ffi) {
              var needsFreshNut = function __do6() {
                var myId = liftST4(newSTRef(Nothing.value))();
                var newRaiseId = applySecond3(gnp.raiseId)(function() {
                  var $130 = flip(write2)(myId);
                  return function($131) {
                    return $$void8(liftST12($130(Just.create($131))));
                  };
                }());
                var ohBehave = __internalDekuFlatten4(gnp.ctor)({
                  dynFamily: gnp.dynFamily,
                  ez: gnp.ez,
                  deferralPath: gnp.deferralPath,
                  parent: new Just(gnp.parent),
                  pos: gnp.pos,
                  raiseId: newRaiseId,
                  scope: gnp.scope
                })(v);
                var pump = liftST4(create)();
                var unsubscribe = liftST4(subscribe(sample6(ohBehave)(pump.event))(executor))();
                pump.push(identity11)();
                var fetchedId = liftST4(read2(myId))();
                return for_7(fetchedId)(function($132) {
                  return executor(v.associateWithUnsubscribe(function(v1) {
                    return {
                      unsubscribe,
                      id: v1
                    };
                  }($132)));
                })();
              };
              var hasIdAndInScope = giveNewParent_(just)(roj)(gnp)(ffi);
              return function __do6() {
                var hasId = stateHasKey(gnp.id)(ffi)();
                if (hasId) {
                  var scope2 = getScope(gnp.id)(ffi)();
                  if (scope2 instanceof Global) {
                    return hasIdAndInScope();
                  }
                  ;
                  if (scope2 instanceof Local && gnp.scope instanceof Local) {
                    var $126 = includes(scope2.value0)(gnp.scope.value0);
                    if ($126) {
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
            };
          };
        };
      };
    };
  };
  var fullDOMInterpret = function(seed) {
    return function(deferredCache) {
      return function(executor) {
        var l = {
          ids: function __do6() {
            var s = read2(seed)();
            $$void8(modify(add2(1))(seed))();
            return s;
          },
          associateWithUnsubscribe: associateWithUnsubscribe_,
          deferPayload: deferPayloadE2(deferredCache),
          forcePayload: forcePayloadE2(deferredCache)(executor),
          makeElement: makeElement_(runOnJust)(false),
          makeDynBeacon: makeDynBeacon_(runOnJust)(false),
          attributeParent: attributeParent_(runOnJust),
          makeRoot: makeRoot_,
          makeText: makeText_(runOnJust)(false)(maybe(unit)),
          makePursx: makePursx_(runOnJust)(false)(maybe(unit)),
          setProp: setProp_(false),
          setCb: setCb_(false),
          unsetAttribute: unsetAttribute_(false),
          setText: setText_,
          sendToPos: sendToPos2,
          removeDynBeacon: removeDynBeacon_,
          deleteFromCache: deleteFromCache_,
          giveNewParent: function(gnp) {
            return giveNewParentOrReconstruct(l)(executor)(Just.create)(runOnJust)(gnp);
          },
          disconnectElement: disconnectElement_
        };
        return l;
      };
    };
  };

  // output/Deku.Toplevel/index.js
  var bind5 = /* @__PURE__ */ bind(bindEffect);
  var liftST5 = /* @__PURE__ */ liftST(monadSTEffect);
  var sample_4 = /* @__PURE__ */ sample_(/* @__PURE__ */ pollable(eventIsEvent))(functorEvent)(functorEvent);
  var for_8 = /* @__PURE__ */ for_(applicativeEffect)(foldableMap);
  var traverse_2 = /* @__PURE__ */ traverse_(applicativeEffect)(foldableArray);
  var map20 = /* @__PURE__ */ map(functorMaybe);
  var $$void9 = /* @__PURE__ */ $$void(functorEffect);
  var runInElement$prime = function(elt) {
    return function(eee) {
      return function __do6() {
        var ffi = makeFFIDOMSnapshot();
        var seed = liftST5(newSTRef(0))();
        var cache = liftST5(newSTRef(empty2))();
        var executor = function(f) {
          return f(ffi);
        };
        var bhv = deku(elt)(eee)(fullDOMInterpret(seed)(cache)(executor));
        var bang = liftST5(create)();
        var u = liftST5(subscribe(sample_4(bhv)(bang.event))(executor))();
        bang.push(unit)();
        return function __do7() {
          var o = liftST5(read2(cache))();
          for_8(o)(traverse_2(executor))();
          liftST5(u)();
          return ffi;
        };
      };
    };
  };
  var runInBody$prime = function(eee) {
    return function __do6() {
      var b$prime = bind5(bind5(windowImpl)(document2))(body)();
      return maybe(throwException(error("Could not find element")))(flip(runInElement$prime)(eee))(map20(toElement)(b$prime))();
    };
  };
  var runInBody = function(a2) {
    return $$void9(runInBody$prime(a2));
  };

  // output/Dependances.KaTeX/foreign.js
  var render = (content3) => (elem3) => () => katex.render(content3, elem3, {
    "throwOnError": false
  });

  // output/Dependances.GeometryRender/index.js
  var show5 = /* @__PURE__ */ show(showNumber);
  var line2 = function(x12) {
    return function(y12) {
      return function(x22) {
        return function(y22) {
          return function(color) {
            return function(size5) {
              return line([x1_(show5(x12)), x2_(show5(x22)), y1_(show5(y12)), y2_(show5(y22)), stroke_(color), strokeWidth_(show5(size5))])([]);
            };
          };
        };
      };
    };
  };

  // output/Dependances.SVGTree/index.js
  var show6 = /* @__PURE__ */ show(showNumber);
  var apply4 = /* @__PURE__ */ apply(/* @__PURE__ */ applyAPoll(applyEvent));
  var map21 = /* @__PURE__ */ map(/* @__PURE__ */ functorAPoll(functorEvent));
  var valueEdge = function(rect) {
    return function(orig) {
      return function(expr) {
        return function(v) {
          return function(k) {
            return function(extr) {
              var pin = function(v1) {
                return function(v2) {
                  return function(r) {
                    var ya = (v1.value1 + v2.value1) / 2 - r.top;
                    var y12$prime = v2.value1 - v1.value1;
                    var xa = (v1.value0 + v2.value0) / 2 - r.left;
                    var x12$prime = v2.value0 - v1.value0;
                    var d12 = sqrt(x12$prime * x12$prime + y12$prime * y12$prime);
                    var x12 = x12$prime / d12;
                    var yn = -x12;
                    var yh = ya + k * yn;
                    var y12 = y12$prime / d12;
                    var xc = function() {
                      var $38 = x12 * y12 < 0;
                      if ($38) {
                        return xa + v.value0 / 2;
                      }
                      ;
                      return xa - v.value0 / 2;
                    }();
                    var x = function() {
                      var $39 = x12 * y12 < 0;
                      if ($39) {
                        return xc - v.value0;
                      }
                      ;
                      return xc;
                    }();
                    var xh = xa + k * y12;
                    var yc = yh + (xc - xh) * y12 / x12;
                    var y = yc - v.value1;
                    return "position: absolute; left: " + (show6(x) + ("px; top: " + (show6(y) + "px;")));
                  };
                };
              };
              return label4([style(apply4(apply4(map21(pin)(orig))(extr))(rect)), self(map21(render)(expr))])([]);
            };
          };
        };
      };
    };
  };
  var renderEdge = function(rect) {
    return function(orig) {
      return function(extr) {
        return switcher(function(v) {
          return line2(v.value1.value0.value0 - v.value0.left)(v.value1.value0.value1 - v.value0.top)(v.value1.value1.value0 - v.value0.left)(v.value1.value1.value1 - v.value0.top)("#000")(1);
        })(apply4(apply4(map21(function(a2) {
          return function(b) {
            return function(c) {
              return new Tuple(a2, new Tuple(b, c));
            };
          };
        })(rect))(orig))(extr));
      };
    };
  };

  // output/Dependances.Article/index.js
  var bind6 = /* @__PURE__ */ bind(bindMaybe);
  var tell2 = /* @__PURE__ */ tell(/* @__PURE__ */ monadTellWriterT(monoidNut)(monadIdentity));
  var valueEdge2 = valueEdge;
  var validateInput = function(inp) {
    return bind6(bind6(inp)(fromString))(function(x) {
      var $11 = isNaNImpl(x);
      if ($11) {
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
  var setTitle_ = function(str) {
    return tell2(h1_([text_(str)]));
  };
  var renderEdge2 = renderEdge;
  var nl = /* @__PURE__ */ tell2(/* @__PURE__ */ br_([]));
  var m$prime = function(txt) {
    return self_(render(txt));
  };
  var m_ = function(str) {
    return tell2(label4([m$prime(str)])([]));
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
  function getBoundingClientRect(el) {
    return function() {
      var rect = el.getBoundingClientRect();
      return {
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        x: rect.x,
        y: rect.y
      };
    };
  }

  // output/Web.DOM.ParentNode/foreign.js
  var getEffProp = function(name15) {
    return function(node) {
      return function() {
        return node[name15];
      };
    };
  };
  var children = getEffProp("children");
  var _firstElementChild = getEffProp("firstElementChild");
  var _lastElementChild = getEffProp("lastElementChild");
  var childElementCount = getEffProp("childElementCount");

  // output/Web.UIEvent.KeyboardEvent/foreign.js
  function key(e) {
    return e.key;
  }
  function code(e) {
    return e.code;
  }

  // output/Devoir4.Main/index.js
  var eq4 = /* @__PURE__ */ eq(eqBigInt);
  var show7 = /* @__PURE__ */ show(showBigInt);
  var insert5 = /* @__PURE__ */ insert(ordString);
  var lookup3 = /* @__PURE__ */ lookup(ordString);
  var sub2 = /* @__PURE__ */ sub(ringRational);
  var add3 = /* @__PURE__ */ add(semiringRational);
  var map23 = /* @__PURE__ */ map(/* @__PURE__ */ functorAPoll(functorEvent));
  var bind7 = /* @__PURE__ */ bind(bindEffect);
  var map110 = /* @__PURE__ */ map(functorArray);
  var pure17 = /* @__PURE__ */ pure(/* @__PURE__ */ applicativeAPoll(applyEvent));
  var show1 = /* @__PURE__ */ show(showNumber);
  var compose2 = /* @__PURE__ */ compose(semigroupoidFn);
  var fromFoldable4 = /* @__PURE__ */ fromFoldable(foldableList);
  var lessThan2 = /* @__PURE__ */ lessThan(ordRational);
  var all4 = /* @__PURE__ */ all(foldableArray)(heytingAlgebraBoolean);
  var discard4 = /* @__PURE__ */ discard(discardUnit);
  var discard1 = /* @__PURE__ */ discard4(/* @__PURE__ */ bindWriterT(semigroupNut)(bindIdentity));
  var tell3 = /* @__PURE__ */ tell(/* @__PURE__ */ monadTellWriterT(monoidNut)(monadIdentity));
  var abs4 = /* @__PURE__ */ abs(ordInt)(ringInt);
  var div1 = /* @__PURE__ */ div(euclideanRingRational);
  var mul2 = /* @__PURE__ */ mul(semiringRational);
  var mod3 = /* @__PURE__ */ mod(euclideanRingInt);
  var scanl3 = /* @__PURE__ */ scanl(traversableArray);
  var identity12 = /* @__PURE__ */ identity(categoryFn);
  var map24 = /* @__PURE__ */ map(functorFn);
  var foldr6 = /* @__PURE__ */ foldr(foldableArray);
  var mul1 = /* @__PURE__ */ mul(semiringInt);
  var difference2 = /* @__PURE__ */ difference(eqInt);
  var pure18 = /* @__PURE__ */ pure(applicativeEffect);
  var apply5 = /* @__PURE__ */ apply(/* @__PURE__ */ applyAPoll(applyEvent));
  var mempty4 = /* @__PURE__ */ mempty(monoidNut);
  var showFraction = function(f) {
    var $88 = eq4(denominator2(f))(fromInt(1));
    if ($88) {
      return show7(numerator2(f));
    }
    ;
    return "\\frac{" + (show7(numerator2(f)) + ("}{" + (show7(denominator2(f)) + "}")));
  };
  var setWithHexaIndex = function(n) {
    return function(f) {
      return function(e) {
        return insert5(function() {
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
          var v = new Tuple(lookup3(pa)(e), new Tuple(lookup3(pab)(e), lookup3(panb)(e)));
          if (v.value0 instanceof Just && (v.value1.value0 instanceof Just && v.value1.value1 instanceof Nothing)) {
            return new Just(insert5(panb)(sub2(v.value0.value0)(v.value1.value0.value0))(e));
          }
          ;
          if (v.value0 instanceof Just && (v.value1.value0 instanceof Nothing && v.value1.value1 instanceof Just)) {
            return new Just(insert5(pab)(sub2(v.value0.value0)(v.value1.value1.value0))(e));
          }
          ;
          if (v.value0 instanceof Nothing && (v.value1.value0 instanceof Just && v.value1.value1 instanceof Just)) {
            return new Just(insert5(pa)(add3(v.value1.value0.value0)(v.value1.value1.value0))(e));
          }
          ;
          return Nothing.value;
        };
      };
    };
  };
  var print6 = function(e) {
    return function(key2) {
      var v = lookup3(key2)(e);
      if (v instanceof Just) {
        return showFraction(v.value0);
      }
      ;
      if (v instanceof Nothing) {
        return "";
      }
      ;
      throw new Error("Failed pattern match at Devoir4.Main (line 182, column 9 - line 184, column 27): " + [v.constructor.name]);
    };
  };
  var tree = function(e) {
    var out = function(p) {
      return map23(function(r) {
        return new Tuple(r.right, (r.top + r.bottom) / 2);
      })(p);
    };
    var on_ = function(str) {
      return td_([execWriter(m_(str))]);
    };
    var on2 = function(str) {
      return function(f) {
        return td([injectElement(function($204) {
          return function(v) {
            return bind7(v)(f);
          }(getBoundingClientRect($204));
        })])([execWriter(m_(str))]);
      };
    };
    var off = td_([execWriter(m_("\\qquad"))]);
    var ins = function(p) {
      return map23(function(r) {
        return new Tuple(r.left, (r.top + r.bottom) / 2);
      })(p);
    };
    var dress = function(str) {
      return function(x) {
        return function(k) {
          var v = lookup3(k)(x);
          if (v instanceof Just) {
            return "\\quad " + (str + showFraction(v.value0));
          }
          ;
          if (v instanceof Nothing) {
            return "";
          }
          ;
          throw new Error("Failed pattern match at Devoir4.Main (line 244, column 9 - line 246, column 25): " + [v.constructor.name]);
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
    var brkpt = function(f) {
      return injectElement(function($205) {
        return function(v) {
          return bind7(v)(f);
        }(getBoundingClientRect($205));
      });
    };
    return bind4(useState$prime)(function(v) {
      return bind4(useState$prime)(function(v1) {
        return bind4(useState$prime)(function(v2) {
          return bind4(useState$prime)(function(v3) {
            return bind4(useState$prime)(function(v4) {
              return bind4(useState$prime)(function(v5) {
                return bind4(useState$prime)(function(v6) {
                  return bind4(useState$prime)(function(v7) {
                    var weightedEdge = function(v8) {
                      return new Tuple(renderEdge2(v.value1)(v8.value0)(v8.value1.value1.value1.value1), valueEdge2(v.value1)(v8.value0)(v8.value1.value0)(v8.value1.value1.value0)(v8.value1.value1.value1.value0)(v8.value1.value1.value1.value1));
                    };
                    var wes = $$const(unzip(map110(weightedEdge)([new Tuple(out(v1.value1), new Tuple(pure17(print6(e)("pA")), new Tuple(new Tuple(9, 23), new Tuple(6, ins(v2.value1))))), new Tuple(out(v2.value1), new Tuple(pure17(print6(e)("pgAB")), new Tuple(new Tuple(9, 23), new Tuple(6, ins(v4.value1))))), new Tuple(out(v2.value1), new Tuple(pure17(print6(e)("pgAnB")), new Tuple(new Tuple(9, 23), new Tuple(6, ins(v5.value1))))), new Tuple(out(v1.value1), new Tuple(pure17(print6(e)("pnA")), new Tuple(new Tuple(9, 23), new Tuple(6, ins(v3.value1))))), new Tuple(out(v3.value1), new Tuple(pure17(print6(e)("pgnAB")), new Tuple(new Tuple(9, 23), new Tuple(6, ins(v6.value1))))), new Tuple(out(v3.value1), new Tuple(pure17(print6(e)("pgnAnB")), new Tuple(new Tuple(9, 23), new Tuple(6, ins(v7.value1)))))])));
                    return div_([table([brkpt(v.value0), style_("padding: 5px; border: 2px solid black; ")])([tr_([off, off, off, off, off, off, on_(pB$prime)]), tr_([off, off, off, off, on2("B")(v4.value0), off, on_(pnB$prime)]), tr_([off, off, off, off, off, off, off]), tr_([off, off, on2("A")(v2.value0), off, off, off, on_(pAB$prime)]), tr_([off, off, off, off, off, off, on_(pAnB$prime)]), tr_([off, off, off, off, on2("\\overline{B}")(v5.value0), off, on_(pnAB$prime)]), tr_([on2("")(v1.value0), off, off, off, off, off, on_(pnAnB$prime)]), tr_([off, off, off, off, on2("B")(v6.value0), off, off]), tr_([off, off, off, off, off, off, on_(pgnBA$prime)]), tr_([off, off, on2("\\overline{A}")(v3.value0), off, off, off, on_(pgBA$prime)]), tr_([off, off, off, off, off, off, on_(pgnBnA$prime)]), tr_([off, off, off, off, on2("\\overline{B}")(v7.value0), off, on_(pgBnA$prime)])]), div2([style(map23(function(r) {
                      return "position: absolute; top: " + (show1(r.top) + ("px; left: " + (show1(r.left) + "px; ")));
                    })(v.value1))])([svg([width8(map23(function($206) {
                      return show1(function(v8) {
                        return v8.width;
                      }($206));
                    })(v.value1)), height8(map23(function($207) {
                      return show1(function(v8) {
                        return v8.height;
                      }($207));
                    })(v.value1))])(fst(wes(unit))), div_(snd(wes(unit)))])]);
                  });
                });
              });
            });
          });
        });
      });
    });
  };
  var primes = [2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 5, 5, 5, 5];
  var maxHexaIndex = 16;
  var validExperience = function(e) {
    var vs = fromFoldable4(values(e));
    var valid = function(x) {
      return lessThan2(fromInt2(0))(x) && lessThan2(x)(fromInt2(1));
    };
    return length(vs) === maxHexaIndex && all4(valid)(vs);
  };
  var majIndex = 12;
  var header = /* @__PURE__ */ discard1(/* @__PURE__ */ setTitle_("Devoir 4 : Probabilit\xE9s conditionnelles"))(function() {
    return discard1(nl)(function() {
      return discard1(tell3(div2([style_("display: grid; grid-template-columns: 1fr 1fr 1fr;")])([label_([text_("Nom:")]), label_([text_("Pr\xE9nom:")]), label_([text_("Classe:")])])))(function() {
        return tell3(ul_([li_([text_("5 arbres pond\xE9r\xE9s \xE0 compl\xE9ter \xE0 partir des hypoth\xE8ses")]), li_([text_("1 point par arbre complet")]), li_([text_("calculatrice autoris\xE9e")]), li_([text_("documents autoris\xE9s")]), li_([text_("toute valeur num\xE9rique sous forme fractionnaire")])]));
      });
    });
  });
  var fromRelative = function(n) {
    return mkSeed(abs4(n));
  };
  var dfltInt = {
    dflt: 0
  };
  var dflt = function(dict) {
    return dict.dflt;
  };
  var nth = function(dictHasDefault) {
    var dflt1 = dflt(dictHasDefault);
    return function(xs) {
      return function(n) {
        var v = index(xs)(n);
        if (v instanceof Just) {
          return v.value0;
        }
        ;
        return dflt1;
      };
    };
  };
  var nth1 = /* @__PURE__ */ nth(dfltInt);
  var contr = function(pa) {
    return function(pna) {
      return function(e) {
        var v = new Tuple(lookup3(pa)(e), lookup3(pna)(e));
        if (v.value0 instanceof Just && v.value1 instanceof Nothing) {
          return new Just(insert5(pna)(sub2(fromInt2(1))(v.value0.value0))(e));
        }
        ;
        if (v.value0 instanceof Nothing && v.value1 instanceof Just) {
          return new Just(insert5(pa)(sub2(fromInt2(1))(v.value1.value0))(e));
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
          var v = new Tuple(lookup3(pc)(e), new Tuple(lookup3(pi2)(e), lookup3(pr)(e)));
          if (v.value0 instanceof Just && (v.value1.value0 instanceof Just && v.value1.value1 instanceof Nothing)) {
            return new Just(insert5(pr)(div1(v.value1.value0.value0)(v.value0.value0))(e));
          }
          ;
          if (v.value0 instanceof Just && (v.value1.value0 instanceof Nothing && v.value1.value1 instanceof Just)) {
            return new Just(insert5(pi2)(mul2(v.value0.value0)(v.value1.value1.value0))(e));
          }
          ;
          if (v.value0 instanceof Nothing && (v.value1.value0 instanceof Just && v.value1.value1 instanceof Just)) {
            return new Just(insert5(pc)(div1(v.value1.value0.value0)(v.value1.value1.value0))(e));
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
          var v = uncons(xs);
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
            throw new Error("Failed pattern match at Devoir4.Main (line 140, column 16 - line 142, column 36): " + [v1.constructor.name]);
          }
          ;
          throw new Error("Failed pattern match at Devoir4.Main (line 137, column 9 - line 142, column 36): " + [v.constructor.name]);
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
  var randProba = function(r) {
    var r0 = lcgNext(r);
    var r1 = lcgNext(r0);
    var prime = function(ix) {
      return nth1(primes)(ix);
    };
    var nbNumFactors = 1 + mod3(unSeed(r0))(avgNbFactors) | 0;
    var nrands = map110(function(f) {
      return f(r1);
    })(scanl3(compose2)(identity12)(replicate(nbNumFactors)(lcgNext)));
    var nums = map110(map24(prime)(function(rnd) {
      return mod3(unSeed(rnd))(length(primes));
    }))(nrands);
    var r2 = fromMaybe(r1)(last(nrands));
    var nbDenFactors = 1 + mod3(unSeed(r1))(avgNbFactors) | 0;
    var drands = map110(function(f) {
      return f(r2);
    })(scanl3(compose2)(identity12)(replicate(nbDenFactors)(lcgNext)));
    var r3 = fromMaybe(r2)(last(drands));
    var nextRand = lcgNext(r3);
    var dens = map110(map24(prime)(function(rnd) {
      return mod3(unSeed(rnd))(length(primes));
    }))(drands);
    var num = foldr6(mul1)(1)(difference2(nums)(dens));
    var den = foldr6(mul1)(1)(difference2(dens)(nums));
    var record = function() {
      if (num < den) {
        return {
          probability: div1(fromInt2(num))(fromInt2(den)),
          nextRand
        };
      }
      ;
      if (num > den) {
        return {
          probability: div1(fromInt2(den))(fromInt2(num)),
          nextRand
        };
      }
      ;
      if (otherwise) {
        return randProba(nextRand);
      }
      ;
      throw new Error("Failed pattern match at Devoir4.Main (line 209, column 7 - line 212, column 41): " + []);
    }();
    return record;
  };
  var randExercise = function($copy_r1) {
    var $tco_done = false;
    var $tco_result;
    function $tco_loop(r1) {
      var modMaj = function(x) {
        return mod3(x)(majIndex);
      };
      var f3 = function($copy_r) {
        return function($copy_s) {
          var $tco_var_r = $copy_r;
          var $tco_done1 = false;
          var $tco_result2;
          function $tco_loop2(r, s) {
            var t = lcgNext(s);
            var $181 = modMaj(unSeed(t)) === modMaj(unSeed(r)) || modMaj(unSeed(t)) === modMaj(unSeed(s));
            if ($181) {
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
          var s = lcgNext(r);
          var $182 = modMaj(unSeed(s)) === modMaj(unSeed(r));
          if ($182) {
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
      var e = setWithHexaIndex(modMaj(unSeed(r1)))(v.probability)(setWithHexaIndex(modMaj(unSeed(r2)))(v1.probability)(setWithHexaIndex(modMaj(unSeed(r3)))(v2.probability)(empty2)));
      var $186 = validExperience(complete2(e));
      if ($186) {
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
  var main = function __do5() {
    runInBody(execWriter(header))();
    return runInBody(bind4(useState(""))(function(v) {
      return bind4(useState(false))(function(v1) {
        var absoluteSeed = map23(toSeed)(v.value1);
        var seed = map23(fromRelative)(absoluteSeed);
        var solved = map23(function(v2) {
          return v2 < 0;
        })(absoluteSeed);
        return div_([div_([label_([text_("Enonc\xE9 n\xB0 ")]), input([valueOn_(input2)(v.value0), keydown_(function(k) {
          return v1.value0(code(k) === "Enter" || key(k) === "Enter");
        }), size_("56"), self_(function(e) {
          return maybe(pure18(unit))(function($208) {
            return focus(toHTMLElement($208));
          })(fromElement(e));
        })])([])]), div_([switcherFlipped(apply5(map23(Tuple.create)(v1.value1))(solved))(function(v2) {
          if (v2.value0) {
            return execWriter(discard1(nl)(function() {
              var r1 = map23(lcgNext)(seed);
              var rec1 = map23(randExercise)(r1);
              var rec2 = map23(randExercise)(map23(function(v3) {
                return v3.nextRand;
              })(rec1));
              var rec3 = map23(randExercise)(map23(function(v3) {
                return v3.nextRand;
              })(rec2));
              var rec4 = map23(randExercise)(map23(function(v3) {
                return v3.nextRand;
              })(rec3));
              var rec5 = map23(randExercise)(map23(function(v3) {
                return v3.nextRand;
              })(rec4));
              var prob = function(rec) {
                if (v2.value1) {
                  return tree(complete2(rec.experience));
                }
                ;
                return tree(rec.experience);
              };
              return discard1(tell3(div2([style_("display: grid; grid-template-columns: 1fr 1fr; ")])([switcher(prob)(rec1), switcher(prob)(rec2)])))(function() {
                return discard1(nl)(function() {
                  return discard1(tell3(div2([style_("display: grid; grid-template-columns: 1fr 1fr; ")])([switcher(prob)(rec3), switcher(prob)(rec4)])))(function() {
                    return discard1(nl)(function() {
                      return tell3(div_([switcher(prob)(rec5)]));
                    });
                  });
                });
              });
            }));
          }
          ;
          return mempty4;
        })])]);
      });
    }))();
  };

  // <stdin>
  main();
})();
