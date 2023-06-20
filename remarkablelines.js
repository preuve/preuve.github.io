(() => {
  // output/Control.Apply/foreign.js
  var arrayApply = function(fs) {
    return function(xs) {
      var l = fs.length;
      var k = xs.length;
      var result = new Array(l * k);
      var n = 0;
      for (var i2 = 0; i2 < l; i2++) {
        var f = fs[i2];
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
    var map20 = map(dictApply.Functor0());
    return function(a2) {
      return function(b2) {
        return apply1(map20($$const(identity2))(a2))(b2);
      };
    };
  };
  var lift2 = function(dictApply) {
    var apply1 = apply(dictApply);
    var map20 = map(dictApply.Functor0());
    return function(f) {
      return function(a2) {
        return function(b2) {
          return apply1(map20(f)(a2))(b2);
        };
      };
    };
  };

  // output/Control.Applicative/index.js
  var pure = function(dict) {
    return dict.pure;
  };
  var liftA1 = function(dictApplicative) {
    var apply6 = apply(dictApplicative.Apply0());
    var pure15 = pure(dictApplicative);
    return function(f) {
      return function(a2) {
        return apply6(pure15(f))(a2);
      };
    };
  };

  // output/Control.Bind/foreign.js
  var arrayBind = function(arr) {
    return function(f) {
      var result = [];
      for (var i2 = 0, l = arr.length; i2 < l; i2++) {
        Array.prototype.push.apply(result, f(arr[i2]));
      }
      return result;
    };
  };

  // output/Control.Bind/index.js
  var identity3 = /* @__PURE__ */ identity(categoryFn);
  var bindArray = {
    bind: arrayBind,
    Apply0: function() {
      return applyArray;
    }
  };
  var bind = function(dict) {
    return dict.bind;
  };
  var bindFlipped = function(dictBind) {
    return flip(bind(dictBind));
  };
  var join = function(dictBind) {
    var bind12 = bind(dictBind);
    return function(m) {
      return bind12(m)(identity3);
    };
  };

  // output/Data.Array/foreign.js
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
    return function(foldr6, xs) {
      return listToArray(foldr6(curryCons)(emptyList)(xs));
    };
  }();
  var length = function(xs) {
    return xs.length;
  };
  var unconsImpl = function(empty9, next, xs) {
    return xs.length === 0 ? empty9({}) : next(xs[0])(xs.slice(1));
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
  var filterImpl = function(f, xs) {
    return xs.filter(f);
  };
  var sortByImpl = function() {
    function mergeFromTo(compare4, fromOrdering, xs1, xs2, from3, to2) {
      var mid;
      var i2;
      var j;
      var k;
      var x;
      var y;
      var c;
      mid = from3 + (to2 - from3 >> 1);
      if (mid - from3 > 1)
        mergeFromTo(compare4, fromOrdering, xs2, xs1, from3, mid);
      if (to2 - mid > 1)
        mergeFromTo(compare4, fromOrdering, xs2, xs1, mid, to2);
      i2 = from3;
      j = mid;
      k = from3;
      while (i2 < mid && j < to2) {
        x = xs2[i2];
        y = xs2[j];
        c = fromOrdering(compare4(x)(y));
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
    return function(compare4, fromOrdering, xs) {
      var out;
      if (xs.length < 2)
        return xs;
      out = xs.slice(0);
      mergeFromTo(compare4, fromOrdering, out, xs.slice(0), 0, xs.length);
      return out;
    };
  }();

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
    var append14 = append(dictSemigroup);
    return {
      append: function(f) {
        return function(g2) {
          return function(x) {
            return append14(f(x))(g2(x));
          };
        };
      }
    };
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

  // output/Control.Lazy/index.js
  var defer = function(dict) {
    return dict.defer;
  };

  // output/Control.Monad/index.js
  var ap = function(dictMonad) {
    var bind5 = bind(dictMonad.Bind1());
    var pure11 = pure(dictMonad.Applicative0());
    return function(f) {
      return function(a2) {
        return bind5(f)(function(f$prime) {
          return bind5(a2)(function(a$prime) {
            return pure11(f$prime(a$prime));
          });
        });
      };
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
    return function(eq4) {
      return function(gt) {
        return function(x) {
          return function(y) {
            return x < y ? lt : x === y ? eq4 : gt;
          };
        };
      };
    };
  };
  var ordIntImpl = unsafeCompareImpl;
  var ordNumberImpl = unsafeCompareImpl;
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

  // output/Data.Eq/index.js
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
  var eq2 = /* @__PURE__ */ eq(eqBoolean);
  var notEq = function(dictEq) {
    var eq32 = eq(dictEq);
    return function(x) {
      return function(y) {
        return eq2(eq32(x)(y))(false);
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
    var sub1 = sub(dictRing);
    var zero2 = zero(dictRing.Semiring0());
    return function(a2) {
      return sub1(zero2)(a2);
    };
  };

  // output/Data.Ord/index.js
  var ordNumber = /* @__PURE__ */ function() {
    return {
      compare: ordNumberImpl(LT.value)(EQ.value)(GT.value),
      Eq0: function() {
        return eqNumber;
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
  var euclideanRingInt = {
    degree: intDegree,
    div: intDiv,
    mod: intMod,
    CommutativeRing0: function() {
      return commutativeRingInt;
    }
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
        var t = f(ref.value);
        ref.value = t.state;
        return t.value;
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
    function mergeFromTo(compare4, fromOrdering, xs1, xs2, from3, to2) {
      var mid;
      var i2;
      var j;
      var k;
      var x;
      var y;
      var c;
      mid = from3 + (to2 - from3 >> 1);
      if (mid - from3 > 1)
        mergeFromTo(compare4, fromOrdering, xs2, xs1, from3, mid);
      if (to2 - mid > 1)
        mergeFromTo(compare4, fromOrdering, xs2, xs1, mid, to2);
      i2 = from3;
      j = mid;
      k = from3;
      while (i2 < mid && j < to2) {
        x = xs2[i2];
        y = xs2[j];
        c = fromOrdering(compare4(x)(y));
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
    return function(compare4, fromOrdering, xs) {
      if (xs.length < 2)
        return xs;
      mergeFromTo(compare4, fromOrdering, xs, xs.slice(0), 0, xs.length);
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
  var fst = function(v) {
    return v.value0;
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
  var traverse_ = function(dictApplicative) {
    var applySecond3 = applySecond(dictApplicative.Apply0());
    var pure11 = pure(dictApplicative);
    return function(dictFoldable) {
      var foldr22 = foldr(dictFoldable);
      return function(f) {
        return foldr22(function($454) {
          return applySecond3(f($454));
        })(pure11(unit));
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
              var $303 = eq12(cmp(v.value0)(v1))(GT.value);
              if ($303) {
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
    var compare4 = compare(dictOrd);
    return function(dictFoldable) {
      return maximumBy(dictFoldable)(compare4);
    };
  };
  var sum = function(dictFoldable) {
    var foldl22 = foldl(dictFoldable);
    return function(dictSemiring) {
      return foldl22(add(dictSemiring))(zero(dictSemiring));
    };
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
    return function(apply6) {
      return function(map20) {
        return function(pure11) {
          return function(f) {
            return function(array) {
              function go2(bot, top3) {
                switch (top3 - bot) {
                  case 0:
                    return pure11([]);
                  case 1:
                    return map20(array1)(f(array[bot]));
                  case 2:
                    return apply6(map20(array2)(f(array[bot])))(f(array[bot + 1]));
                  case 3:
                    return apply6(apply6(map20(array3)(f(array[bot])))(f(array[bot + 1])))(f(array[bot + 2]));
                  default:
                    var pivot = bot + Math.floor((top3 - bot) / 4) * 2;
                    return apply6(map20(concat2)(go2(bot, pivot)))(go2(pivot, top3));
                }
              }
              return go2(0, array.length);
            };
          };
        };
      };
    };
  }();

  // output/Data.Unfoldable/foreign.js
  var unfoldrArrayImpl = function(isNothing2) {
    return function(fromJust6) {
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
                var tuple = fromJust6(maybe2);
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
    return function(fromJust6) {
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
                value12 = fromJust6(maybe2);
              }
            };
          };
        };
      };
    };
  };

  // output/Data.Unfoldable1/index.js
  var fromJust2 = /* @__PURE__ */ fromJust();
  var unfoldable1Array = {
    unfoldr1: /* @__PURE__ */ unfoldr1ArrayImpl(isNothing)(fromJust2)(fst)(snd)
  };

  // output/Data.Unfoldable/index.js
  var fromJust3 = /* @__PURE__ */ fromJust();
  var unfoldr = function(dict) {
    return dict.unfoldr;
  };
  var unfoldableArray = {
    unfoldr: /* @__PURE__ */ unfoldrArrayImpl(isNothing)(fromJust3)(fst)(snd),
    Unfoldable10: function() {
      return unfoldable1Array;
    }
  };

  // output/Data.Array/index.js
  var fromJust4 = /* @__PURE__ */ fromJust();
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
  var sortBy = function(comp) {
    return runFn3(sortByImpl)(comp)(function(v) {
      if (v instanceof GT) {
        return 1;
      }
      ;
      if (v instanceof EQ) {
        return 0;
      }
      ;
      if (v instanceof LT) {
        return -1 | 0;
      }
      ;
      throw new Error("Failed pattern match at Data.Array (line 897, column 38 - line 900, column 11): " + [v.constructor.name]);
    });
  };
  var index = /* @__PURE__ */ function() {
    return runFn4(indexImpl)(Just.create)(Nothing.value);
  }();
  var last = function(xs) {
    return index(xs)(length(xs) - 1 | 0);
  };
  var findIndex = /* @__PURE__ */ function() {
    return runFn4(findIndexImpl)(Just.create)(Nothing.value);
  }();
  var filter = /* @__PURE__ */ runFn2(filterImpl);
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
          return fromJust4(deleteAt(i2)(v2));
        })(findIndex(v(v1))(v2));
      };
    };
  };

  // output/Data.Number/foreign.js
  var isFiniteImpl = isFinite;
  var floor = Math.floor;
  var remainder = function(n) {
    return function(m) {
      return n % m;
    };
  };
  var sqrt = Math.sqrt;

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
  var floor2 = function($39) {
    return unsafeClamp(floor($39));
  };

  // output/Data.FoldableWithIndex/index.js
  var foldrWithIndex = function(dict) {
    return dict.foldrWithIndex;
  };
  var foldlWithIndex = function(dict) {
    return dict.foldlWithIndex;
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

  // output/Data.List.Lazy.Types/index.js
  var unwrap2 = /* @__PURE__ */ unwrap();
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
  var step = function($319) {
    return force(unwrap2($319));
  };
  var lazyList = {
    defer: function(f) {
      return defer2(function($320) {
        return step(f($320));
      });
    }
  };
  var defer3 = /* @__PURE__ */ defer(lazyList);
  var cons = function(x) {
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
          var rev3 = foldl(foldableList2)(flip(cons))(nil);
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
            var v = step(xs);
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
      var append22 = append(dictMonoid.Semigroup0());
      var mempty5 = mempty(dictMonoid);
      return function(f) {
        return foldl(foldableList2)(function(b2) {
          return function(a2) {
            return append22(b2)(f(a2));
          };
        })(mempty5);
      };
    }
  };
  var unfoldable1List = {
    unfoldr1: /* @__PURE__ */ function() {
      var go2 = function(f) {
        return function(b2) {
          return defer3(function(v) {
            var v1 = f(b2);
            if (v1.value1 instanceof Just) {
              return cons(v1.value0)(go2(f)(v1.value1.value0));
            }
            ;
            if (v1.value1 instanceof Nothing) {
              return cons(v1.value0)(nil);
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
          return defer3(function(v) {
            var v1 = f(b2);
            if (v1 instanceof Nothing) {
              return nil;
            }
            ;
            if (v1 instanceof Just) {
              return cons(v1.value0.value0)(go2(f)(v1.value0.value1));
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
  var map2 = /* @__PURE__ */ map(functorLazy);
  var unwrap3 = /* @__PURE__ */ unwrap();
  var filter2 = function(p2) {
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
          if (p2(v.value0)) {
            $tco_done = true;
            return new Cons2(v.value0, filter2(p2)(v.value1));
          }
          ;
          if (otherwise) {
            $copy_v = step(v.value1);
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
    var $344 = map2(go2);
    return function($345) {
      return List($344(unwrap3($345)));
    };
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
  var toUnfoldable = function(dictUnfoldable) {
    var unfoldr3 = unfoldr(dictUnfoldable);
    return function(m) {
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
              $copy_v = new Cons(v.value0.value0, new Cons(singleton3(v.value0.value1)(v.value0.value2), new Cons(v.value0.value3, v.value1)));
              return;
            }
            ;
            if (v.value0 instanceof Three) {
              $copy_v = new Cons(v.value0.value0, new Cons(singleton3(v.value0.value1)(v.value0.value2), new Cons(v.value0.value3, new Cons(singleton3(v.value0.value4)(v.value0.value5), new Cons(v.value0.value6, v.value1)))));
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
      return unfoldr3(go2)(new Cons(m, Nil.value));
    };
  };
  var toUnfoldable1 = /* @__PURE__ */ toUnfoldable(unfoldableList);
  var lookup = function(dictOrd) {
    var compare4 = compare(dictOrd);
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
            var v2 = compare4(k)(v.value1);
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
            var v3 = compare4(k)(v.value1);
            if (v3 instanceof EQ) {
              $tco_done = true;
              return new Just(v.value2);
            }
            ;
            var v4 = compare4(k)(v.value4);
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
      return function($copy_v1) {
        var $tco_var_dictOrd = $copy_dictOrd;
        var $tco_var_v = $copy_v;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(dictOrd, v, v1) {
          if (v instanceof Nil) {
            $tco_done = true;
            return v1;
          }
          ;
          if (v instanceof Cons) {
            if (v.value0 instanceof TwoLeft) {
              $tco_var_dictOrd = dictOrd;
              $tco_var_v = v.value1;
              $copy_v1 = new Two(v1, v.value0.value0, v.value0.value1, v.value0.value2);
              return;
            }
            ;
            if (v.value0 instanceof TwoRight) {
              $tco_var_dictOrd = dictOrd;
              $tco_var_v = v.value1;
              $copy_v1 = new Two(v.value0.value0, v.value0.value1, v.value0.value2, v1);
              return;
            }
            ;
            if (v.value0 instanceof ThreeLeft) {
              $tco_var_dictOrd = dictOrd;
              $tco_var_v = v.value1;
              $copy_v1 = new Three(v1, v.value0.value0, v.value0.value1, v.value0.value2, v.value0.value3, v.value0.value4, v.value0.value5);
              return;
            }
            ;
            if (v.value0 instanceof ThreeMiddle) {
              $tco_var_dictOrd = dictOrd;
              $tco_var_v = v.value1;
              $copy_v1 = new Three(v.value0.value0, v.value0.value1, v.value0.value2, v1, v.value0.value3, v.value0.value4, v.value0.value5);
              return;
            }
            ;
            if (v.value0 instanceof ThreeRight) {
              $tco_var_dictOrd = dictOrd;
              $tco_var_v = v.value1;
              $copy_v1 = new Three(v.value0.value0, v.value0.value1, v.value0.value2, v.value0.value3, v.value0.value4, v.value0.value5, v1);
              return;
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 462, column 3 - line 467, column 88): " + [v.value0.constructor.name]);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 459, column 1 - line 459, column 80): " + [v.constructor.name, v1.constructor.name]);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_dictOrd, $tco_var_v, $copy_v1);
        }
        ;
        return $tco_result;
      };
    };
  };
  var insert = function(dictOrd) {
    var fromZipper1 = fromZipper(dictOrd);
    var compare4 = compare(dictOrd);
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
        var down = function($copy_v1) {
          return function($copy_v2) {
            var $tco_var_v1 = $copy_v1;
            var $tco_done1 = false;
            var $tco_result;
            function $tco_loop(v1, v2) {
              if (v2 instanceof Leaf) {
                $tco_done1 = true;
                return up(v1)(new KickUp(Leaf.value, k, v, Leaf.value));
              }
              ;
              if (v2 instanceof Two) {
                var v3 = compare4(k)(v2.value1);
                if (v3 instanceof EQ) {
                  $tco_done1 = true;
                  return fromZipper1(v1)(new Two(v2.value0, k, v, v2.value3));
                }
                ;
                if (v3 instanceof LT) {
                  $tco_var_v1 = new Cons(new TwoLeft(v2.value1, v2.value2, v2.value3), v1);
                  $copy_v2 = v2.value0;
                  return;
                }
                ;
                $tco_var_v1 = new Cons(new TwoRight(v2.value0, v2.value1, v2.value2), v1);
                $copy_v2 = v2.value3;
                return;
              }
              ;
              if (v2 instanceof Three) {
                var v3 = compare4(k)(v2.value1);
                if (v3 instanceof EQ) {
                  $tco_done1 = true;
                  return fromZipper1(v1)(new Three(v2.value0, k, v, v2.value3, v2.value4, v2.value5, v2.value6));
                }
                ;
                var v4 = compare4(k)(v2.value4);
                if (v4 instanceof EQ) {
                  $tco_done1 = true;
                  return fromZipper1(v1)(new Three(v2.value0, v2.value1, v2.value2, v2.value3, k, v, v2.value6));
                }
                ;
                if (v3 instanceof LT) {
                  $tco_var_v1 = new Cons(new ThreeLeft(v2.value1, v2.value2, v2.value3, v2.value4, v2.value5, v2.value6), v1);
                  $copy_v2 = v2.value0;
                  return;
                }
                ;
                if (v3 instanceof GT && v4 instanceof LT) {
                  $tco_var_v1 = new Cons(new ThreeMiddle(v2.value0, v2.value1, v2.value2, v2.value4, v2.value5, v2.value6), v1);
                  $copy_v2 = v2.value3;
                  return;
                }
                ;
                $tco_var_v1 = new Cons(new ThreeRight(v2.value0, v2.value1, v2.value2, v2.value3, v2.value4, v2.value5), v1);
                $copy_v2 = v2.value6;
                return;
              }
              ;
              throw new Error("Failed pattern match at Data.Map.Internal (line 478, column 3 - line 478, column 55): " + [v1.constructor.name, v2.constructor.name]);
            }
            ;
            while (!$tco_done1) {
              $tco_result = $tco_loop($tco_var_v1, $copy_v2);
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
    var compare4 = compare(dictOrd);
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
          function $tco_loop(ctx, m) {
            if (m instanceof Two && (m.value0 instanceof Leaf && m.value3 instanceof Leaf)) {
              $tco_done1 = true;
              return up(ctx)(Leaf.value);
            }
            ;
            if (m instanceof Two) {
              $tco_var_ctx = new Cons(new TwoRight(m.value0, m.value1, m.value2), ctx);
              $copy_m = m.value3;
              return;
            }
            ;
            if (m instanceof Three && (m.value0 instanceof Leaf && (m.value3 instanceof Leaf && m.value6 instanceof Leaf))) {
              $tco_done1 = true;
              return up(new Cons(new TwoRight(Leaf.value, m.value1, m.value2), ctx))(Leaf.value);
            }
            ;
            if (m instanceof Three) {
              $tco_var_ctx = new Cons(new ThreeRight(m.value0, m.value1, m.value2, m.value3, m.value4, m.value5), ctx);
              $copy_m = m.value6;
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
        function $tco_loop(m) {
          if (m instanceof Two && m.value3 instanceof Leaf) {
            $tco_done2 = true;
            return {
              key: m.value1,
              value: m.value2
            };
          }
          ;
          if (m instanceof Two) {
            $copy_m = m.value3;
            return;
          }
          ;
          if (m instanceof Three && m.value6 instanceof Leaf) {
            $tco_done2 = true;
            return {
              key: m.value4,
              value: m.value5
            };
          }
          ;
          if (m instanceof Three) {
            $copy_m = m.value6;
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
          function $tco_loop(ctx, m) {
            if (m instanceof Leaf) {
              $tco_done3 = true;
              return Nothing.value;
            }
            ;
            if (m instanceof Two) {
              var v = compare4(k)(m.value1);
              if (m.value3 instanceof Leaf && v instanceof EQ) {
                $tco_done3 = true;
                return new Just(new Tuple(m.value2, up(ctx)(Leaf.value)));
              }
              ;
              if (v instanceof EQ) {
                var max6 = maxNode(m.value0);
                $tco_done3 = true;
                return new Just(new Tuple(m.value2, removeMaxNode(new Cons(new TwoLeft(max6.key, max6.value, m.value3), ctx))(m.value0)));
              }
              ;
              if (v instanceof LT) {
                $tco_var_ctx = new Cons(new TwoLeft(m.value1, m.value2, m.value3), ctx);
                $copy_m = m.value0;
                return;
              }
              ;
              $tco_var_ctx = new Cons(new TwoRight(m.value0, m.value1, m.value2), ctx);
              $copy_m = m.value3;
              return;
            }
            ;
            if (m instanceof Three) {
              var leaves = function() {
                if (m.value0 instanceof Leaf && (m.value3 instanceof Leaf && m.value6 instanceof Leaf)) {
                  return true;
                }
                ;
                return false;
              }();
              var v = compare4(k)(m.value4);
              var v3 = compare4(k)(m.value1);
              if (leaves && v3 instanceof EQ) {
                $tco_done3 = true;
                return new Just(new Tuple(m.value2, fromZipper1(ctx)(new Two(Leaf.value, m.value4, m.value5, Leaf.value))));
              }
              ;
              if (leaves && v instanceof EQ) {
                $tco_done3 = true;
                return new Just(new Tuple(m.value5, fromZipper1(ctx)(new Two(Leaf.value, m.value1, m.value2, Leaf.value))));
              }
              ;
              if (v3 instanceof EQ) {
                var max6 = maxNode(m.value0);
                $tco_done3 = true;
                return new Just(new Tuple(m.value2, removeMaxNode(new Cons(new ThreeLeft(max6.key, max6.value, m.value3, m.value4, m.value5, m.value6), ctx))(m.value0)));
              }
              ;
              if (v instanceof EQ) {
                var max6 = maxNode(m.value3);
                $tco_done3 = true;
                return new Just(new Tuple(m.value5, removeMaxNode(new Cons(new ThreeMiddle(m.value0, m.value1, m.value2, max6.key, max6.value, m.value6), ctx))(m.value3)));
              }
              ;
              if (v3 instanceof LT) {
                $tco_var_ctx = new Cons(new ThreeLeft(m.value1, m.value2, m.value3, m.value4, m.value5, m.value6), ctx);
                $copy_m = m.value0;
                return;
              }
              ;
              if (v3 instanceof GT && v instanceof LT) {
                $tco_var_ctx = new Cons(new ThreeMiddle(m.value0, m.value1, m.value2, m.value4, m.value5, m.value6), ctx);
                $copy_m = m.value3;
                return;
              }
              ;
              $tco_var_ctx = new Cons(new ThreeRight(m.value0, m.value1, m.value2, m.value3, m.value4, m.value5), ctx);
              $copy_m = m.value6;
              return;
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 525, column 16 - line 548, column 80): " + [m.constructor.name]);
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
        return function(m) {
          if (m instanceof Leaf) {
            return z;
          }
          ;
          if (m instanceof Two) {
            return foldr(foldableMap)(f)(f(m.value2)(foldr(foldableMap)(f)(z)(m.value3)))(m.value0);
          }
          ;
          if (m instanceof Three) {
            return foldr(foldableMap)(f)(f(m.value2)(foldr(foldableMap)(f)(f(m.value5)(foldr(foldableMap)(f)(z)(m.value6)))(m.value3)))(m.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 133, column 17 - line 136, column 85): " + [m.constructor.name]);
        };
      };
    },
    foldl: function(f) {
      return function(z) {
        return function(m) {
          if (m instanceof Leaf) {
            return z;
          }
          ;
          if (m instanceof Two) {
            return foldl(foldableMap)(f)(f(foldl(foldableMap)(f)(z)(m.value0))(m.value2))(m.value3);
          }
          ;
          if (m instanceof Three) {
            return foldl(foldableMap)(f)(f(foldl(foldableMap)(f)(f(foldl(foldableMap)(f)(z)(m.value0))(m.value2))(m.value3))(m.value5))(m.value6);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 137, column 17 - line 140, column 85): " + [m.constructor.name]);
        };
      };
    },
    foldMap: function(dictMonoid) {
      var mempty5 = mempty(dictMonoid);
      var append22 = append(dictMonoid.Semigroup0());
      return function(f) {
        return function(m) {
          if (m instanceof Leaf) {
            return mempty5;
          }
          ;
          if (m instanceof Two) {
            return append22(foldMap(foldableMap)(dictMonoid)(f)(m.value0))(append22(f(m.value2))(foldMap(foldableMap)(dictMonoid)(f)(m.value3)));
          }
          ;
          if (m instanceof Three) {
            return append22(foldMap(foldableMap)(dictMonoid)(f)(m.value0))(append22(f(m.value2))(append22(foldMap(foldableMap)(dictMonoid)(f)(m.value3))(append22(f(m.value5))(foldMap(foldableMap)(dictMonoid)(f)(m.value6)))));
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 141, column 17 - line 144, column 93): " + [m.constructor.name]);
        };
      };
    }
  };
  var foldableWithIndexMap = {
    foldrWithIndex: function(f) {
      return function(z) {
        return function(m) {
          if (m instanceof Leaf) {
            return z;
          }
          ;
          if (m instanceof Two) {
            return foldrWithIndex(foldableWithIndexMap)(f)(f(m.value1)(m.value2)(foldrWithIndex(foldableWithIndexMap)(f)(z)(m.value3)))(m.value0);
          }
          ;
          if (m instanceof Three) {
            return foldrWithIndex(foldableWithIndexMap)(f)(f(m.value1)(m.value2)(foldrWithIndex(foldableWithIndexMap)(f)(f(m.value4)(m.value5)(foldrWithIndex(foldableWithIndexMap)(f)(z)(m.value6)))(m.value3)))(m.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 147, column 26 - line 150, column 120): " + [m.constructor.name]);
        };
      };
    },
    foldlWithIndex: function(f) {
      return function(z) {
        return function(m) {
          if (m instanceof Leaf) {
            return z;
          }
          ;
          if (m instanceof Two) {
            return foldlWithIndex(foldableWithIndexMap)(f)(f(m.value1)(foldlWithIndex(foldableWithIndexMap)(f)(z)(m.value0))(m.value2))(m.value3);
          }
          ;
          if (m instanceof Three) {
            return foldlWithIndex(foldableWithIndexMap)(f)(f(m.value4)(foldlWithIndex(foldableWithIndexMap)(f)(f(m.value1)(foldlWithIndex(foldableWithIndexMap)(f)(z)(m.value0))(m.value2))(m.value3))(m.value5))(m.value6);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 151, column 26 - line 154, column 120): " + [m.constructor.name]);
        };
      };
    },
    foldMapWithIndex: function(dictMonoid) {
      var mempty5 = mempty(dictMonoid);
      var append22 = append(dictMonoid.Semigroup0());
      return function(f) {
        return function(m) {
          if (m instanceof Leaf) {
            return mempty5;
          }
          ;
          if (m instanceof Two) {
            return append22(foldMapWithIndex(foldableWithIndexMap)(dictMonoid)(f)(m.value0))(append22(f(m.value1)(m.value2))(foldMapWithIndex(foldableWithIndexMap)(dictMonoid)(f)(m.value3)));
          }
          ;
          if (m instanceof Three) {
            return append22(foldMapWithIndex(foldableWithIndexMap)(dictMonoid)(f)(m.value0))(append22(f(m.value1)(m.value2))(append22(foldMapWithIndex(foldableWithIndexMap)(dictMonoid)(f)(m.value3))(append22(f(m.value4)(m.value5))(foldMapWithIndex(foldableWithIndexMap)(dictMonoid)(f)(m.value6)))));
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 155, column 26 - line 158, column 128): " + [m.constructor.name]);
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
  var fromFoldable = function(dictOrd) {
    var insert1 = insert(dictOrd);
    return function(dictFoldable) {
      return foldl(dictFoldable)(function(m) {
        return function(v) {
          return insert1(v.value0)(v.value1)(m);
        };
      })(empty2);
    };
  };
  var filterWithKey = function(dictOrd) {
    var fromFoldable1 = fromFoldable(dictOrd)(foldableList2);
    return function(predicate) {
      var $927 = filter2(uncurry(predicate));
      return function($928) {
        return fromFoldable1($927(toUnfoldable1($928)));
      };
    };
  };
  var filter3 = function(dictOrd) {
    var filterWithKey1 = filterWithKey(dictOrd);
    return function(predicate) {
      return filterWithKey1($$const(predicate));
    };
  };
  var mapMaybeWithKey = function(dictOrd) {
    var insert1 = insert(dictOrd);
    return function(f) {
      return foldrWithIndex2(function(k) {
        return function(a2) {
          return function(acc) {
            return maybe(acc)(function(b2) {
              return insert1(k)(b2)(acc);
            })(f(k)(a2));
          };
        };
      })(empty2);
    };
  };
  var mapMaybe = function(dictOrd) {
    var $930 = mapMaybeWithKey(dictOrd);
    return function($931) {
      return $930($$const($931));
    };
  };
  var $$delete = function(dictOrd) {
    var pop1 = pop(dictOrd);
    return function(k) {
      return function(m) {
        return maybe(m)(snd)(pop1(k)(m));
      };
    };
  };
  var alter = function(dictOrd) {
    var lookup1 = lookup(dictOrd);
    var delete1 = $$delete(dictOrd);
    var insert1 = insert(dictOrd);
    return function(f) {
      return function(k) {
        return function(m) {
          var v = f(lookup1(k)(m));
          if (v instanceof Nothing) {
            return delete1(k)(m);
          }
          ;
          if (v instanceof Just) {
            return insert1(k)(v.value0)(m);
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
        return function(m2) {
          var go2 = function(k) {
            return function(m) {
              return function(v) {
                return alter1(function() {
                  var $936 = maybe(v)(f(v));
                  return function($937) {
                    return Just.create($936($937));
                  };
                }())(k)(m);
              };
            };
          };
          return foldlWithIndex2(go2)(m2)(m1);
        };
      };
    };
  };
  var union = function(dictOrd) {
    return unionWith(dictOrd)($$const);
  };

  // output/Data.Sparse.Polynomial/index.js
  var filter4 = /* @__PURE__ */ filter3(ordInt);
  var unionWith2 = /* @__PURE__ */ unionWith(ordInt);
  var foldr2 = /* @__PURE__ */ foldr(foldableArray);
  var map3 = /* @__PURE__ */ map(functorArray);
  var foldrWithIndex3 = /* @__PURE__ */ foldrWithIndex(foldableWithIndexMap);
  var insert2 = /* @__PURE__ */ insert(ordInt);
  var toUnfoldable2 = /* @__PURE__ */ toUnfoldable(unfoldableArray);
  var mapMaybe2 = /* @__PURE__ */ mapMaybe(ordInt);
  var lookup3 = /* @__PURE__ */ lookup(ordInt);
  var semiringPolynomial = function(dictEq) {
    var notEq1 = notEq(dictEq);
    return function(dictSemiring) {
      var zero2 = zero(dictSemiring);
      var add1 = add(dictSemiring);
      var mul22 = mul(dictSemiring);
      return {
        add: function(v) {
          return function(v1) {
            return filter4(function(v2) {
              return notEq1(v2)(zero2);
            })(unionWith2(add1)(v)(v1));
          };
        },
        mul: function(v) {
          return function(v1) {
            return filter4(function(v2) {
              return notEq1(v2)(zero2);
            })(foldr2(unionWith2(add1))(empty2)(map3(function(v2) {
              return foldrWithIndex3(function(j) {
                return function(w) {
                  return function(acc) {
                    return insert2(v2.value0 + j | 0)(mul22(v2.value1)(w))(acc);
                  };
                };
              })(empty2)(v1);
            })(toUnfoldable2(v))));
          };
        },
        zero: empty2,
        one: singleton3(0)(one(dictSemiring))
      };
    };
  };
  var functorPolynomial = {
    map: function(f) {
      return function(v) {
        return mapMaybe2(function(v1) {
          return new Just(f(v1));
        })(v);
      };
    }
  };
  var map32 = /* @__PURE__ */ map(functorPolynomial);
  var ringPolynomial = function(dictEq) {
    var semiringPolynomial1 = semiringPolynomial(dictEq);
    return function(dictRing) {
      var Semiring0 = dictRing.Semiring0();
      var semiringPolynomial22 = semiringPolynomial1(Semiring0);
      var add1 = add(semiringPolynomial22);
      var mul22 = mul(Semiring0);
      var negate1 = negate(dictRing);
      var one1 = one(Semiring0);
      return {
        sub: function(p1) {
          return function(p2) {
            return add1(p1)(map32(function(v) {
              return mul22(v)(negate1(one1));
            })(p2));
          };
        },
        Semiring0: function() {
          return semiringPolynomial22;
        }
      };
    };
  };
  var query = function(dictSemiring) {
    var zero2 = zero(dictSemiring);
    return function(v) {
      return function(n) {
        return fromMaybe(zero2)(lookup3(n)(v));
      };
    };
  };
  var monoPol = function(x) {
    return function(n) {
      return insert2(n)(x)(empty2);
    };
  };

  // output/Data.Geometry.Plane/index.js
  var sub2 = /* @__PURE__ */ sub(/* @__PURE__ */ ringPolynomial(eqNumber)(ringNumber));
  var semiringPolynomial2 = /* @__PURE__ */ semiringPolynomial(eqNumber)(semiringNumber);
  var add2 = /* @__PURE__ */ add(semiringPolynomial2);
  var mul2 = /* @__PURE__ */ mul(semiringPolynomial2);
  var query2 = /* @__PURE__ */ query(semiringNumber);
  var vector = function(v) {
    return function(v1) {
      return sub2(v1.coordinates)(v.coordinates);
    };
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
  var scale = function(k) {
    return function(v) {
      return mul2(monoPol(k)(0))(v);
    };
  };
  var point = function(name15) {
    return function(x) {
      return function(y) {
        return {
          name: name15,
          coordinates: add2(monoPol(x)(0))(monoPol(y)(1))
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
        coordinates: mul2(add2(v.origin.coordinates)(v.extremity.coordinates))(monoPol(0.5)(0))
      };
    };
  };
  var meets = function(dict) {
    return dict.meets;
  };
  var length3 = function(dict) {
    return dict.length;
  };
  var interLineLine = {
    meets: function(v) {
      return function(v1) {
        var delta = v.a * v1.b - v1.a * v.b;
        var next = function() {
          if (delta === 0) {
            return [];
          }
          ;
          if (otherwise) {
            return [point("")((v.b * v1.c - v1.b * v.c) / delta)((v1.a * v.c - v.a * v1.c) / delta)];
          }
          ;
          throw new Error("Failed pattern match at Data.Geometry.Plane (line 190, column 7 - line 193, column 65): " + []);
        }();
        return next;
      };
    }
  };
  var meets1 = /* @__PURE__ */ meets(interLineLine);
  var halfline = function(origin2) {
    return function(direction) {
      return {
        origin: origin2,
        direction
      };
    };
  };
  var coords = function(dict) {
    return dict.coords;
  };
  var circle = function(p2) {
    return function(r) {
      return {
        center: p2,
        radius: r
      };
    };
  };
  var basedVector = {
    abs: function(v) {
      return query2(v)(0);
    },
    ord: function(v) {
      return query2(v)(1);
    },
    coords: function(v) {
      return v;
    }
  };
  var coords1 = /* @__PURE__ */ coords(basedVector);
  var ord1 = /* @__PURE__ */ ord(basedVector);
  var basedPoint = {
    abs: function(v) {
      return query2(v.coordinates)(0);
    },
    ord: function(v) {
      return query2(v.coordinates)(1);
    },
    coords: function(v) {
      return v.coordinates;
    }
  };
  var coords2 = /* @__PURE__ */ coords(basedPoint);
  var ord2 = /* @__PURE__ */ ord(basedPoint);
  var summublePointVector = {
    plus: function(p2) {
      return function(v) {
        return {
          name: "",
          coordinates: add2(coords2(p2))(coords1(v))
        };
      };
    }
  };
  var plus1 = /* @__PURE__ */ plus(summublePointVector);
  var abs3 = function(dict) {
    return dict.abs;
  };
  var abs1 = /* @__PURE__ */ abs3(basedPoint);
  var abs22 = /* @__PURE__ */ abs3(basedVector);
  var line = function(m) {
    return function(n) {
      return {
        a: ord2(m) - ord2(n),
        b: abs1(n) - abs1(m),
        c: abs1(m) * ord2(n) - ord2(m) * abs1(n)
      };
    };
  };
  var measurableVector = {
    length: function(v) {
      return sqrt(abs22(v) * abs22(v) + ord1(v) * ord1(v));
    }
  };
  var length1 = /* @__PURE__ */ length3(measurableVector);
  var cosAngle = function(u2) {
    return function(v) {
      return (abs22(u2) * abs22(v) + ord1(u2) * ord1(v)) / (length1(u2) * length1(v));
    };
  };
  var interLineHalfLine = {
    meets: function(l) {
      return function(v) {
        var l$prime = line(v.origin)(plus1(v.origin)(v.direction));
        return filter(function(p2) {
          return cosAngle(vector(v.origin)(p2))(v.direction) >= 0;
        })(meets1(l)(l$prime));
      };
    }
  };
  var meets2 = /* @__PURE__ */ meets(interLineHalfLine);
  var interHalfLineLine = {
    meets: function(hl) {
      return function(l) {
        return meets2(l)(hl);
      };
    }
  };
  var meets3 = /* @__PURE__ */ meets(interHalfLineLine);
  var interSegmentLine = {
    meets: function(v) {
      return function(l) {
        var hl = halfline(v.origin)(vector(v.origin)(v.extremity));
        return filter(function(p2) {
          return cosAngle(vector(v.extremity)(p2))(vector(v.extremity)(v.origin)) >= 0;
        })(meets3(hl)(l));
      };
    }
  };
  var meets4 = /* @__PURE__ */ meets(interSegmentLine);
  var interLineSegment = {
    meets: function(l) {
      return function(s2) {
        return meets4(s2)(l);
      };
    }
  };
  var normalTo = function(v) {
    return add2(monoPol(-ord1(v))(0))(monoPol(abs22(v))(1));
  };
  var projection = function(direction) {
    return function(v) {
      return scale((abs22(v) * abs22(direction) + ord1(v) * ord1(direction)) / (length1(direction) * length1(direction)))(direction);
    };
  };
  var aVectorOfLine = function(v) {
    return add2(monoPol(-v.b)(0))(monoPol(v.a)(1));
  };
  var aPointOnLine = function(v) {
    return point("")(-v.a * v.c / (v.a * v.a + v.b * v.b))(-v.b * v.c / (v.a * v.a + v.b * v.b));
  };
  var interLineCircle = {
    meets: function(l) {
      return function(v) {
        var u2 = aVectorOfLine(l);
        var m = aPointOnLine(l);
        var n = plus1(m)(projection(u2)(vector(m)(v.center)));
        var ob = length1(vector(v.center)(n));
        var next = function() {
          if (ob > v.radius) {
            return [];
          }
          ;
          if (ob === v.radius) {
            return [n];
          }
          ;
          if (otherwise) {
            var om = sqrt(v.radius * v.radius - ob * ob);
            var v1 = scale(om / length1(u2))(u2);
            return [plus1(n)(v1), plus1(n)(scale(-1)(v1))];
          }
          ;
          throw new Error("Failed pattern match at Data.Geometry.Plane (line 212, column 9 - line 217, column 55): " + []);
        }();
        return next;
      };
    }
  };
  var meets7 = /* @__PURE__ */ meets(interLineCircle);
  var interCircleLine = {
    meets: function(c) {
      return function(l) {
        return meets7(l)(c);
      };
    }
  };
  var meets8 = /* @__PURE__ */ meets(interCircleLine);
  var interHalfLineCircle = {
    meets: function(v) {
      return function(c) {
        var l$prime = line(v.origin)(plus1(v.origin)(v.direction));
        return filter(function(p2) {
          return cosAngle(vector(v.origin)(p2))(v.direction) >= 0;
        })(meets8(c)(l$prime));
      };
    }
  };
  var meets9 = /* @__PURE__ */ meets(interHalfLineCircle);
  var interCircleHalfLine = {
    meets: function(c) {
      return function(hl) {
        return meets9(hl)(c);
      };
    }
  };

  // output/Data.String.CodePoints/foreign.js
  var hasArrayFrom = typeof Array.from === "function";
  var hasStringIterator = typeof Symbol !== "undefined" && Symbol != null && typeof Symbol.iterator !== "undefined" && typeof String.prototype[Symbol.iterator] === "function";
  var hasFromCodePoint = typeof String.prototype.fromCodePoint === "function";
  var hasCodePointAt = typeof String.prototype.codePointAt === "function";
  var _unsafeCodePointAt0 = function(fallback) {
    return hasCodePointAt ? function(str) {
      return str.codePointAt(0);
    } : fallback;
  };
  var _toCodePointArray = function(fallback) {
    return function(unsafeCodePointAt02) {
      if (hasArrayFrom) {
        return function(str) {
          return Array.from(str, unsafeCodePointAt02);
        };
      }
      return fallback;
    };
  };

  // output/Data.Enum/foreign.js
  function toCharCode(c) {
    return c.charCodeAt(0);
  }
  function fromCharCode(c) {
    return String.fromCharCode(c);
  }

  // output/Data.Enum/index.js
  var bottom1 = /* @__PURE__ */ bottom(boundedChar);
  var top1 = /* @__PURE__ */ top(boundedChar);
  var fromEnum = function(dict) {
    return dict.fromEnum;
  };
  var defaultSucc = function(toEnum$prime) {
    return function(fromEnum$prime) {
      return function(a2) {
        return toEnum$prime(fromEnum$prime(a2) + 1 | 0);
      };
    };
  };
  var defaultPred = function(toEnum$prime) {
    return function(fromEnum$prime) {
      return function(a2) {
        return toEnum$prime(fromEnum$prime(a2) - 1 | 0);
      };
    };
  };
  var charToEnum = function(v) {
    if (v >= toCharCode(bottom1) && v <= toCharCode(top1)) {
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
      cardinality: toCharCode(top1) - toCharCode(bottom1) | 0,
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

  // output/Data.String.CodeUnits/foreign.js
  var length4 = function(s2) {
    return s2.length;
  };
  var drop = function(n) {
    return function(s2) {
      return s2.substring(n);
    };
  };

  // output/Data.String.Unsafe/foreign.js
  var charAt = function(i2) {
    return function(s2) {
      if (i2 >= 0 && i2 < s2.length)
        return s2.charAt(i2);
      throw new Error("Data.String.Unsafe.charAt: Invalid index.");
    };
  };

  // output/Data.String.CodePoints/index.js
  var fromEnum2 = /* @__PURE__ */ fromEnum(boundedEnumChar);
  var map4 = /* @__PURE__ */ map(functorMaybe);
  var unfoldr2 = /* @__PURE__ */ unfoldr(unfoldableArray);
  var unsurrogate = function(lead) {
    return function(trail) {
      return (((lead - 55296 | 0) * 1024 | 0) + (trail - 56320 | 0) | 0) + 65536 | 0;
    };
  };
  var isTrail = function(cu) {
    return 56320 <= cu && cu <= 57343;
  };
  var isLead = function(cu) {
    return 55296 <= cu && cu <= 56319;
  };
  var uncons2 = function(s2) {
    var v = length4(s2);
    if (v === 0) {
      return Nothing.value;
    }
    ;
    if (v === 1) {
      return new Just({
        head: fromEnum2(charAt(0)(s2)),
        tail: ""
      });
    }
    ;
    var cu1 = fromEnum2(charAt(1)(s2));
    var cu0 = fromEnum2(charAt(0)(s2));
    var $43 = isLead(cu0) && isTrail(cu1);
    if ($43) {
      return new Just({
        head: unsurrogate(cu0)(cu1),
        tail: drop(2)(s2)
      });
    }
    ;
    return new Just({
      head: cu0,
      tail: drop(1)(s2)
    });
  };
  var unconsButWithTuple = function(s2) {
    return map4(function(v) {
      return new Tuple(v.head, v.tail);
    })(uncons2(s2));
  };
  var toCodePointArrayFallback = function(s2) {
    return unfoldr2(unconsButWithTuple)(s2);
  };
  var unsafeCodePointAt0Fallback = function(s2) {
    var cu0 = fromEnum2(charAt(0)(s2));
    var $47 = isLead(cu0) && length4(s2) > 1;
    if ($47) {
      var cu1 = fromEnum2(charAt(1)(s2));
      var $48 = isTrail(cu1);
      if ($48) {
        return unsurrogate(cu0)(cu1);
      }
      ;
      return cu0;
    }
    ;
    return cu0;
  };
  var unsafeCodePointAt0 = /* @__PURE__ */ _unsafeCodePointAt0(unsafeCodePointAt0Fallback);
  var toCodePointArray = /* @__PURE__ */ _toCodePointArray(toCodePointArrayFallback)(unsafeCodePointAt0);
  var length5 = function($74) {
    return length(toCodePointArray($74));
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
  var singleton5 = function(a2) {
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
  var $$delete2 = function(dictOrd) {
    var delete1 = $$delete(dictOrd);
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
  function clearTimeoutImpl(id2) {
    return function() {
      clearTimeout(id2);
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
  var pure3 = /* @__PURE__ */ pure(applicativeEffect);
  var liftST2 = /* @__PURE__ */ liftST(monadSTEffect);
  var monoidEffect2 = /* @__PURE__ */ monoidEffect(monoidUnit);
  var $$void3 = /* @__PURE__ */ $$void(functorEffect);
  var append2 = /* @__PURE__ */ append(semigroupArray);
  var mempty2 = /* @__PURE__ */ mempty(/* @__PURE__ */ monoidEffectFn1(monoidUnit));
  var mempty1 = /* @__PURE__ */ mempty(/* @__PURE__ */ monoidSet(ordTimeoutId));
  var $$delete3 = /* @__PURE__ */ $$delete2(ordTimeoutId);
  var append1 = /* @__PURE__ */ append(/* @__PURE__ */ semigroupSet(ordTimeoutId));
  var for_22 = /* @__PURE__ */ for_2(foldableSet);
  var apply3 = /* @__PURE__ */ apply(applyEffect);
  var map5 = /* @__PURE__ */ map(functorEffect);
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
        return function __do4() {
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
        return function __do4() {
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
          return function __do4() {
            var u2 = v(tf, k);
            return $$void3(liftST2(push(u2)(a2)))();
          };
        })(f)();
        return function __do4() {
          var o = liftST2(freeze(a2))();
          return fastForeachThunk(o);
        };
      };
    };
  };
  var mailbox$prime = function(dictOrd) {
    var alter2 = alter(dictOrd);
    var lookup4 = lookup(dictOrd);
    return function __do4() {
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
                return new Just(append2(v1.value0)([k2]));
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
          var v1 = lookup4(v.address)(o);
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
      var cancelInner = $$new(pure3(unit))();
      var cancelOuter = v(tf, function(v1) {
        var ci = read(cancelInner)();
        ci();
        var c = v1(tf, k);
        return write(c)(cancelInner)();
      });
      return function __do4() {
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
  var filter6 = function(p2) {
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
    return filter6(function(a2) {
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
        return function __do4() {
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
      return function __do4() {
        c1();
        return c2();
      };
    };
  };
  var compactableEvent = {
    compact: /* @__PURE__ */ filter6(/* @__PURE__ */ identity(categoryFn)),
    separate: function(xs) {
      return {
        left: filter6(function(v) {
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
        right: filter6(function(v) {
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
    filterMap: filter6,
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
        return function __do4() {
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
  var $lazy_backdoor = /* @__PURE__ */ $runtime_lazy3("backdoor", "FRP.Event", function() {
    var create_ = function __do4() {
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
          return function __do5() {
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
              return pure3(unit);
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
              return pure3(unit);
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
            return pure3(unit);
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
          return function __do4() {
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
          return function __do4() {
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
                var id2 = setTimeout2(n)(function __do4() {
                  k(a2);
                  var lid = read(localId)();
                  return maybe(pure3(unit))(function(id3) {
                    return modify_($$delete3(id3))(tid);
                  })(lid)();
                })();
                write(new Just(id2))(localId)();
                return modify_(append1(singleton5(id2)))(tid)();
              });
              return function __do4() {
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
    return function __do4() {
      unit;
      return function(v) {
        return v;
      }($lazy_backdoor(461).create)();
    };
  });
  var backdoor = /* @__PURE__ */ $lazy_backdoor(678);
  var createPure = function __do2() {
    unit;
    return backdoor.createPure();
  };
  var makeEvent = function(i2) {
    return function(v) {
      return v;
    }(backdoor.makeEvent)(i2);
  };
  var makeEventO = function(i2) {
    return function(v) {
      return v;
    }(backdoor.makeEventO)(i2);
  };
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
  var memoize = function(i2) {
    return function(v) {
      return v;
    }(backdoor.memoize)(i2);
  };
  var subscribeO = /* @__PURE__ */ function() {
    return function(v) {
      return v;
    }(backdoor.subscribeO);
  }();
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
        return pure3(unit);
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
          return apply3(map5(function(v2) {
            return function(v3) {
              return function __do4() {
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
      return pure3(unit);
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
  var pure4 = /* @__PURE__ */ pure(applicativeEvent);
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
  var mapAttr = function(dictFunctor) {
    var map20 = map(dictFunctor);
    return function(dictAttr) {
      var attr12 = attr(dictAttr);
      return function(a2) {
        return function(b2) {
          return map20(function(v) {
            return attr12(a2)(v);
          })(b2);
        };
      };
    };
  };
  var pureAttr = function(dictAttr) {
    var attr12 = attr(dictAttr);
    return function(a2) {
      return function(b2) {
        return pure4(attr12(a2)(b2));
      };
    };
  };

  // output/Deku.DOM.Attr.Class/index.js
  var Class = /* @__PURE__ */ function() {
    function Class2() {
    }
    ;
    Class2.value = new Class2();
    return Class2;
  }();
  var attrButton_ClassString = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "class",
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
  var attrText_StyleString = {
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
  var attrButton_StyleString = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "style",
          value: prop$prime(value12)
        });
      };
    }
  };

  // output/Deku.Attributes/index.js
  var mapFlipped2 = /* @__PURE__ */ mapFlipped(functorEvent);
  var pure5 = /* @__PURE__ */ pure(applicativeEvent);
  var style = function(dictAttr) {
    var attr11 = attr(dictAttr);
    return function(e) {
      return mapFlipped2(e)(function(v) {
        return attr11(Style.value)(v);
      });
    };
  };
  var style_ = function(dictAttr) {
    var $23 = style(dictAttr);
    return function($24) {
      return $23(pure5($24));
    };
  };
  var klass = function(dictAttr) {
    var attr11 = attr(dictAttr);
    return function(e) {
      return mapFlipped2(e)(function(v) {
        return attr11(Class.value)(v);
      });
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
    return function(apply6, map20, f) {
      var buildFrom = function(x, ys) {
        return apply6(map20(consList)(f(x)))(ys);
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
        var acc = map20(finalCell)(f(array[array.length - 1]));
        var result = go2(acc, array.length - 1, array);
        while (result instanceof Cont) {
          result = result.fn();
        }
        return map20(listToArray)(result);
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
  function _foldM(bind5) {
    return function(f) {
      return function(mz) {
        return function(m) {
          var acc = mz;
          function g2(k2) {
            return function(z) {
              return f(z)(k2)(m[k2]);
            };
          }
          for (var k in m) {
            if (hasOwnProperty.call(m, k)) {
              acc = bind5(acc)(g2(k));
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
  var keys2 = Object.keys || toArrayWithKey(function(k) {
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
  var foldr4 = /* @__PURE__ */ foldr(foldableArray);
  var values = /* @__PURE__ */ toArrayWithKey(function(v) {
    return function(v1) {
      return v1;
    };
  });
  var thawST = _copyST;
  var mutate = function(f) {
    return function(m) {
      return runST(function __do4() {
        var s2 = thawST(m)();
        f(s2)();
        return s2;
      });
    };
  };
  var insert5 = function(k) {
    return function(v) {
      return mutate(poke2(k)(v));
    };
  };
  var fold3 = /* @__PURE__ */ _foldM(applyFlipped);
  var foldMap3 = function(dictMonoid) {
    var append14 = append(dictMonoid.Semigroup0());
    var mempty5 = mempty(dictMonoid);
    return function(f) {
      return fold3(function(acc) {
        return function(k) {
          return function(v) {
            return append14(acc)(f(k)(v));
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
          return foldr4(f)(z)(values(m));
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
  var map6 = /* @__PURE__ */ map(functorEvent);
  var merge2 = /* @__PURE__ */ merge(foldableArray);
  var bind2 = /* @__PURE__ */ bind(bindST);
  var pure1 = /* @__PURE__ */ pure(applicativeST);
  var map12 = /* @__PURE__ */ map(functorST);
  var for_3 = /* @__PURE__ */ for_(applicativeST);
  var for_12 = /* @__PURE__ */ for_3(foldableMaybe);
  var $$void4 = /* @__PURE__ */ $$void(functorST);
  var for_23 = /* @__PURE__ */ for_3(foldableArray);
  var map33 = /* @__PURE__ */ map(functorArray);
  var append3 = /* @__PURE__ */ append(/* @__PURE__ */ semigroupST(semigroupString));
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
            return merge2(map33(flatten(v)(psr)(interpreter))(v1.value0));
          }
          ;
          if (v1 instanceof EventfulElement$prime) {
            return keepLatest3(map6(flatten(v)(psr)(interpreter))(v1.value0));
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
                    return append3(pure1(psr.scope.value0))(append3(pure1("!"))(v.ids(interpreter)));
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
                    var mic = function __do4() {
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
                      $132.raiseId = function(id2) {
                        return $$void4(modify2(append12([id2]))(myIds));
                      };
                      return $132;
                    }())(interpreter)(kid$prime.value0), v3);
                    $$void4(modify2(insert5(eltsUnsubId)(c1))(cancelInner))();
                    return $$void4(write2(c1)(eltsUnsub))();
                  }
                  ;
                  return unit;
                });
                $$void4(write2(c0)(myUnsub))();
                $$void4(modify2(insert5(myUnsubId)(c0))(cancelInner))();
                var mican = read2(myImmediateCancellation)();
                return mican();
              });
              return function __do4() {
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
  var map7 = /* @__PURE__ */ map(functorEvent);
  var lcmap2 = /* @__PURE__ */ lcmap(profunctorFn);
  var unsafeSetPos$prime = function(i2) {
    return function(v) {
      var g2 = function(v1) {
        var f = function(ii) {
          if (ii instanceof Element$prime) {
            return new Element$prime(lcmap2(function(v2) {
              return {
                pos: i2,
                dynFamily: v2.dynFamily,
                ez: v2.ez,
                parent: v2.parent,
                raiseId: v2.raiseId,
                scope: v2.scope
              };
            })(ii.value0));
          }
          ;
          if (ii instanceof EventfulElement$prime) {
            return new EventfulElement$prime(map7(f)(ii.value0));
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

  // output/Deku.Control/index.js
  var map8 = /* @__PURE__ */ map(functorEvent);
  var merge3 = /* @__PURE__ */ merge(foldableArray);
  var pure6 = /* @__PURE__ */ pure(applicativeEvent);
  var empty5 = /* @__PURE__ */ empty(plusEvent);
  var pure12 = /* @__PURE__ */ pure(applicativeST);
  var coerce3 = /* @__PURE__ */ coerce();
  var unwrap4 = /* @__PURE__ */ unwrap();
  var eq13 = /* @__PURE__ */ eq(eqScope);
  var alt2 = /* @__PURE__ */ alt(altEvent);
  var append4 = /* @__PURE__ */ append(semigroupArray);
  var mapWithIndex3 = /* @__PURE__ */ mapWithIndex(functorWithIndexArray);
  var map13 = /* @__PURE__ */ map(functorFn);
  var unsafeSetText = function(v) {
    return function(id2) {
      return function(txt) {
        return map8(function($146) {
          return v.setText(function(v1) {
            return {
              id: id2,
              text: v1
            };
          }($146));
        })(txt);
      };
    };
  };
  var unsafeSetAttribute = function(v) {
    return function(id2) {
      return function(atts) {
        return map8(function($147) {
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
          var unsub = v2(merge3([pure6(v1.makeText({
            id: me,
            parent: v.parent,
            pos: v.pos,
            scope: v.scope,
            dynFamily: v.dynFamily
          })), unsafeSetText(v1)(me)(txt), maybe(empty5)(function(p2) {
            return pure6(v1.attributeParent({
              id: me,
              parent: p2,
              pos: v.pos,
              dynFamily: v.dynFamily,
              ez: v.ez
            }));
          })(v.parent)]), k);
          return function __do4() {
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
    return text(pure6(txt));
  };
  var portalFlatten = function() {
    return {
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
      ids: function($150) {
        return function(v) {
          return v.ids;
        }(unwrap4($150));
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
  var portalFlatten1 = /* @__PURE__ */ portalFlatten();
  var __internalDekuFlatten = function(a2) {
    return function(b2) {
      return function(v) {
        return flatten(portalFlatten1)(a2)(b2)(v);
      };
    };
  };
  var deku = function(root) {
    return function(v) {
      var go2 = function(children2) {
        return function(v1) {
          return makeLemmingEventO(function(v2, k) {
            return v2(alt2(pure6(v1.makeRoot({
              id: "deku-root",
              root
            })))(__internalDekuFlatten({
              parent: new Just("deku-root"),
              scope: new Local("rootScope"),
              raiseId: function(v3) {
                return pure12(unit);
              },
              ez: true,
              pos: Nothing.value,
              dynFamily: Nothing.value
            })(v1)(children2)), k);
          });
        };
      };
      return go2(v);
    };
  };
  var elementify = function(tag) {
    return function(atts) {
      return function(children2) {
        var go2 = function(v) {
          return function(v1) {
            return makeLemmingEventO(function(v2, k) {
              var me = v1.ids();
              v.raiseId(me)();
              var unsub = v2(alt2(merge3(append4([pure6(v1.makeElement({
                id: me,
                parent: v.parent,
                scope: v.scope,
                tag,
                pos: v.pos,
                dynFamily: v.dynFamily
              })), unsafeSetAttribute(v1)(me)(atts)])(maybe([])(function(p2) {
                return [pure6(v1.attributeParent({
                  id: me,
                  parent: p2,
                  pos: v.pos,
                  dynFamily: v.dynFamily,
                  ez: v.ez
                }))];
              })(v.parent))))(__internalDekuFlatten({
                parent: new Just(me),
                scope: v.scope,
                ez: true,
                raiseId: function(v3) {
                  return pure12(unit);
                },
                pos: Nothing.value,
                dynFamily: Nothing.value
              })(v1)(children2)), k);
              return function __do4() {
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
            return empty5;
          }
          ;
          if (v.length === 1) {
            return v[0];
          }
          ;
          return merge3(v);
        };
        var step1 = function(arr) {
          return new Element$prime(elementify(en)(aa(attributes))(fixed(coerce3(arr))));
        };
        return step1(mapWithIndex3(map13(map13(function(v) {
          return v;
        }))(unsafeSetPos))(kids));
      };
    };
  };

  // output/Deku.DOM.Attr.Cx/index.js
  var Cx = /* @__PURE__ */ function() {
    function Cx2() {
    }
    ;
    Cx2.value = new Cx2();
    return Cx2;
  }();
  var attrCircle_CxString = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "cx",
          value: prop$prime(value12)
        });
      };
    }
  };

  // output/Deku.DOM.Attr.Cy/index.js
  var Cy = /* @__PURE__ */ function() {
    function Cy2() {
    }
    ;
    Cy2.value = new Cy2();
    return Cy2;
  }();
  var attrCircle_CyString = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "cy",
          value: prop$prime(value12)
        });
      };
    }
  };

  // output/Deku.DOM.Attr.Fill/index.js
  var Fill = /* @__PURE__ */ function() {
    function Fill2() {
    }
    ;
    Fill2.value = new Fill2();
    return Fill2;
  }();
  var attrRect_FillString = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "fill",
          value: prop$prime(value12)
        });
      };
    }
  };
  var attrCircle_FillString = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "fill",
          value: prop$prime(value12)
        });
      };
    }
  };

  // output/Deku.DOM.Attr.Height/index.js
  var Height = /* @__PURE__ */ function() {
    function Height2() {
    }
    ;
    Height2.value = new Height2();
    return Height2;
  }();
  var attrSvg_HeightString = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "height",
          value: prop$prime(value12)
        });
      };
    }
  };
  var attrRect_HeightString = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "height",
          value: prop$prime(value12)
        });
      };
    }
  };

  // output/Deku.DOM.Attr.OnClick/index.js
  var voidLeft2 = /* @__PURE__ */ voidLeft(functorEffect);
  var OnClick = /* @__PURE__ */ function() {
    function OnClick2() {
    }
    ;
    OnClick2.value = new OnClick2();
    return OnClick2;
  }();
  var attrOnClickEffectUnit = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "click",
          value: cb$prime($$const(voidLeft2(value12)(true)))
        });
      };
    }
  };

  // output/Deku.DOM.Attr.OnMousedown/index.js
  var OnMousedown = /* @__PURE__ */ function() {
    function OnMousedown2() {
    }
    ;
    OnMousedown2.value = new OnMousedown2();
    return OnMousedown2;
  }();
  var attrOnMousedownCb = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "mousedown",
          value: cb$prime(value12)
        });
      };
    }
  };

  // output/Deku.DOM.Attr.OnMousemove/index.js
  var OnMousemove = /* @__PURE__ */ function() {
    function OnMousemove2() {
    }
    ;
    OnMousemove2.value = new OnMousemove2();
    return OnMousemove2;
  }();
  var attrOnMousemoveCb = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "mousemove",
          value: cb$prime(value12)
        });
      };
    }
  };

  // output/Deku.DOM.Attr.OnMouseup/index.js
  var OnMouseup = /* @__PURE__ */ function() {
    function OnMouseup2() {
    }
    ;
    OnMouseup2.value = new OnMouseup2();
    return OnMouseup2;
  }();
  var attrOnMouseupCb = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "mouseup",
          value: cb$prime(value12)
        });
      };
    }
  };

  // output/Deku.DOM.Attr.R/index.js
  var R = /* @__PURE__ */ function() {
    function R2() {
    }
    ;
    R2.value = new R2();
    return R2;
  }();
  var attrCircle_RString = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "r",
          value: prop$prime(value12)
        });
      };
    }
  };

  // output/Deku.DOM.Attr.Rx/index.js
  var Rx = /* @__PURE__ */ function() {
    function Rx2() {
    }
    ;
    Rx2.value = new Rx2();
    return Rx2;
  }();
  var attrRect_RxString = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "rx",
          value: prop$prime(value12)
        });
      };
    }
  };

  // output/Deku.DOM.Attr.Stroke/index.js
  var Stroke = /* @__PURE__ */ function() {
    function Stroke2() {
    }
    ;
    Stroke2.value = new Stroke2();
    return Stroke2;
  }();
  var attrLine_StrokeString = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "stroke",
          value: prop$prime(value12)
        });
      };
    }
  };
  var attrCircle_StrokeString = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "stroke",
          value: prop$prime(value12)
        });
      };
    }
  };

  // output/Deku.DOM.Attr.StrokeWidth/index.js
  var StrokeWidth = /* @__PURE__ */ function() {
    function StrokeWidth2() {
    }
    ;
    StrokeWidth2.value = new StrokeWidth2();
    return StrokeWidth2;
  }();
  var attrLine_StrokeWidthStrin = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "stroke-width",
          value: prop$prime(value12)
        });
      };
    }
  };
  var attrCircle_StrokeWidthStr = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "stroke-width",
          value: prop$prime(value12)
        });
      };
    }
  };

  // output/Deku.DOM.Attr.ViewBox/index.js
  var ViewBox = /* @__PURE__ */ function() {
    function ViewBox2() {
    }
    ;
    ViewBox2.value = new ViewBox2();
    return ViewBox2;
  }();
  var attrSvg_ViewBoxString = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "viewBox",
          value: prop$prime(value12)
        });
      };
    }
  };

  // output/Deku.DOM.Attr.Visibility/index.js
  var Visibility = /* @__PURE__ */ function() {
    function Visibility2() {
    }
    ;
    Visibility2.value = new Visibility2();
    return Visibility2;
  }();
  var attrText_VisibilityString = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "visibility",
          value: prop$prime(value12)
        });
      };
    }
  };
  var attrLine_VisibilityString = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "visibility",
          value: prop$prime(value12)
        });
      };
    }
  };
  var attrG_VisibilityString = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "visibility",
          value: prop$prime(value12)
        });
      };
    }
  };
  var attrCircle_VisibilityStri = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "visibility",
          value: prop$prime(value12)
        });
      };
    }
  };

  // output/Deku.DOM.Attr.Width/index.js
  var Width = /* @__PURE__ */ function() {
    function Width2() {
    }
    ;
    Width2.value = new Width2();
    return Width2;
  }();
  var attrSvg_WidthString = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "width",
          value: prop$prime(value12)
        });
      };
    }
  };
  var attrRect_WidthString = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "width",
          value: prop$prime(value12)
        });
      };
    }
  };

  // output/Deku.DOM.Attr.X/index.js
  var X = /* @__PURE__ */ function() {
    function X3() {
    }
    ;
    X3.value = new X3();
    return X3;
  }();
  var attrText_XString = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "x",
          value: prop$prime(value12)
        });
      };
    }
  };
  var attrRect_XString = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "x",
          value: prop$prime(value12)
        });
      };
    }
  };

  // output/Deku.DOM.Attr.X1/index.js
  var X1 = /* @__PURE__ */ function() {
    function X12() {
    }
    ;
    X12.value = new X12();
    return X12;
  }();
  var attrLine_X1String = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "x1",
          value: prop$prime(value12)
        });
      };
    }
  };

  // output/Deku.DOM.Attr.X2/index.js
  var X2 = /* @__PURE__ */ function() {
    function X22() {
    }
    ;
    X22.value = new X22();
    return X22;
  }();
  var attrLine_X2String = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "x2",
          value: prop$prime(value12)
        });
      };
    }
  };

  // output/Deku.DOM.Attr.Y/index.js
  var Y = /* @__PURE__ */ function() {
    function Y3() {
    }
    ;
    Y3.value = new Y3();
    return Y3;
  }();
  var attrText_YString = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "y",
          value: prop$prime(value12)
        });
      };
    }
  };
  var attrRect_YString = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "y",
          value: prop$prime(value12)
        });
      };
    }
  };

  // output/Deku.DOM.Attr.Y1/index.js
  var Y1 = /* @__PURE__ */ function() {
    function Y12() {
    }
    ;
    Y12.value = new Y12();
    return Y12;
  }();
  var attrLine_Y1String = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "y1",
          value: prop$prime(value12)
        });
      };
    }
  };

  // output/Deku.DOM.Attr.Y2/index.js
  var Y2 = /* @__PURE__ */ function() {
    function Y22() {
    }
    ;
    Y22.value = new Y22();
    return Y22;
  }();
  var attrLine_Y2String = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "y2",
          value: prop$prime(value12)
        });
      };
    }
  };

  // output/Deku.DOM.Elt.Button/index.js
  var button = /* @__PURE__ */ elementify2("button");

  // output/Deku.DOM.Elt.Circle/index.js
  var circle2 = /* @__PURE__ */ elementify2("circle");

  // output/Deku.DOM.Elt.Div/index.js
  var div2 = /* @__PURE__ */ elementify2("div");
  var div_ = /* @__PURE__ */ div2(/* @__PURE__ */ empty(plusArray));

  // output/Deku.DOM.Elt.G/index.js
  var g = /* @__PURE__ */ elementify2("g");

  // output/Deku.DOM.Elt.Line/index.js
  var line2 = /* @__PURE__ */ elementify2("line");

  // output/Deku.DOM.Elt.Rect/index.js
  var rect = /* @__PURE__ */ elementify2("rect");

  // output/Deku.DOM.Elt.Svg/index.js
  var svg = /* @__PURE__ */ elementify2("svg");

  // output/Deku.DOM.Elt.Text/index.js
  var text2 = /* @__PURE__ */ elementify2("text");

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

  // output/Deku.Do/index.js
  var bind3 = function(f) {
    return function(a2) {
      return f(a2);
    };
  };
  var discard3 = bind3;

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
      var step3 = aff;
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
                step3 = bhead(step3);
                if (btail === null) {
                  bhead = null;
                } else {
                  bhead = btail._1;
                  btail = btail._2;
                }
              } catch (e) {
                status = RETURN;
                fail = util.left(e);
                step3 = null;
              }
              break;
            case STEP_RESULT:
              if (util.isLeft(step3)) {
                status = RETURN;
                fail = step3;
                step3 = null;
              } else if (bhead === null) {
                status = RETURN;
              } else {
                status = STEP_BIND;
                step3 = util.fromRight(step3);
              }
              break;
            case CONTINUE:
              switch (step3.tag) {
                case BIND:
                  if (bhead) {
                    btail = new Aff2(CONS, bhead, btail);
                  }
                  bhead = step3._2;
                  status = CONTINUE;
                  step3 = step3._1;
                  break;
                case PURE:
                  if (bhead === null) {
                    status = RETURN;
                    step3 = util.right(step3._1);
                  } else {
                    status = STEP_BIND;
                    step3 = step3._1;
                  }
                  break;
                case SYNC:
                  status = STEP_RESULT;
                  step3 = runSync(util.left, util.right, step3._1);
                  break;
                case ASYNC:
                  status = PENDING;
                  step3 = runAsync(util.left, step3._1, function(result2) {
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
                        step3 = result2;
                        run3(runTick);
                      });
                    };
                  });
                  return;
                case THROW:
                  status = RETURN;
                  fail = util.left(step3._1);
                  step3 = null;
                  break;
                case CATCH:
                  if (bhead === null) {
                    attempts = new Aff2(CONS, step3, attempts, interrupt);
                  } else {
                    attempts = new Aff2(CONS, step3, new Aff2(CONS, new Aff2(RESUME, bhead, btail), attempts, interrupt), interrupt);
                  }
                  bhead = null;
                  btail = null;
                  status = CONTINUE;
                  step3 = step3._1;
                  break;
                case BRACKET:
                  bracketCount++;
                  if (bhead === null) {
                    attempts = new Aff2(CONS, step3, attempts, interrupt);
                  } else {
                    attempts = new Aff2(CONS, step3, new Aff2(CONS, new Aff2(RESUME, bhead, btail), attempts, interrupt), interrupt);
                  }
                  bhead = null;
                  btail = null;
                  status = CONTINUE;
                  step3 = step3._1;
                  break;
                case FORK:
                  status = STEP_RESULT;
                  tmp = Fiber(util, supervisor, step3._2);
                  if (supervisor) {
                    supervisor.register(tmp);
                  }
                  if (step3._1) {
                    tmp.run();
                  }
                  step3 = util.right(tmp);
                  break;
                case SEQ:
                  status = CONTINUE;
                  step3 = sequential2(util, supervisor, step3._1);
                  break;
              }
              break;
            case RETURN:
              bhead = null;
              btail = null;
              if (attempts === null) {
                status = COMPLETED;
                step3 = interrupt || fail || step3;
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
                      step3 = attempt._2(util.fromLeft(fail));
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
                      step3 = util.fromRight(step3);
                    }
                    break;
                  case BRACKET:
                    bracketCount--;
                    if (fail === null) {
                      result = util.fromRight(step3);
                      attempts = new Aff2(CONS, new Aff2(RELEASE, attempt._2, result), attempts, tmp);
                      if (interrupt === tmp || bracketCount > 0) {
                        status = CONTINUE;
                        step3 = attempt._3(result);
                      }
                    }
                    break;
                  case RELEASE:
                    attempts = new Aff2(CONS, new Aff2(FINALIZED, step3, fail), attempts, interrupt);
                    status = CONTINUE;
                    if (interrupt && interrupt !== tmp && bracketCount === 0) {
                      step3 = attempt._1.killed(util.fromLeft(interrupt))(attempt._2);
                    } else if (fail) {
                      step3 = attempt._1.failed(util.fromLeft(fail))(attempt._2);
                    } else {
                      step3 = attempt._1.completed(util.fromRight(step3))(attempt._2);
                    }
                    fail = null;
                    bracketCount++;
                    break;
                  case FINALIZER:
                    bracketCount++;
                    attempts = new Aff2(CONS, new Aff2(FINALIZED, step3, fail), attempts, interrupt);
                    status = CONTINUE;
                    step3 = attempt._1;
                    break;
                  case FINALIZED:
                    bracketCount--;
                    status = RETURN;
                    step3 = attempt._1;
                    fail = attempt._2;
                    break;
                }
              }
              break;
            case COMPLETED:
              for (var k in joins) {
                if (joins.hasOwnProperty(k)) {
                  rethrow = rethrow && joins[k].rethrow;
                  runEff(joins[k].handler(step3));
                }
              }
              joins = null;
              if (interrupt && fail) {
                setTimeout(function() {
                  throw util.fromLeft(fail);
                }, 0);
              } else if (util.isLeft(step3) && rethrow) {
                setTimeout(function() {
                  if (rethrow) {
                    throw util.fromLeft(step3);
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
            join4.handler(step3)();
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
              step3 = interrupt;
              run3(runTick);
              break;
            case PENDING:
              if (interrupt === null) {
                interrupt = util.left(error2);
              }
              if (bracketCount === 0) {
                if (status === PENDING) {
                  attempts = new Aff2(CONS, new Aff2(FINALIZER, step3(error2)), attempts, interrupt);
                }
                status = RETURN;
                step3 = null;
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
                step3 = null;
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
        var step3 = par2;
        var head5 = null;
        var tail2 = null;
        var count2 = 0;
        var kills2 = {};
        var tmp, kid;
        loop:
          while (true) {
            tmp = null;
            switch (step3.tag) {
              case FORKED:
                if (step3._3 === EMPTY) {
                  tmp = fibers[step3._1];
                  kills2[count2++] = tmp.kill(error2, function(result) {
                    return function() {
                      count2--;
                      if (count2 === 0) {
                        cb3(result)();
                      }
                    };
                  });
                }
                if (head5 === null) {
                  break loop;
                }
                step3 = head5._2;
                if (tail2 === null) {
                  head5 = null;
                } else {
                  head5 = tail2._1;
                  tail2 = tail2._2;
                }
                break;
              case MAP:
                step3 = step3._2;
                break;
              case APPLY:
              case ALT:
                if (head5) {
                  tail2 = new Aff2(CONS, head5, tail2);
                }
                head5 = step3;
                step3 = step3._1;
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
      function join3(result, head5, tail2) {
        var fail, step3, lhs, rhs, tmp, kid;
        if (util.isLeft(result)) {
          fail = result;
          step3 = null;
        } else {
          step3 = result;
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
            if (head5 === null) {
              cb2(fail || step3)();
              return;
            }
            if (head5._3 !== EMPTY) {
              return;
            }
            switch (head5.tag) {
              case MAP:
                if (fail === null) {
                  head5._3 = util.right(head5._1(util.fromRight(step3)));
                  step3 = head5._3;
                } else {
                  head5._3 = fail;
                }
                break;
              case APPLY:
                lhs = head5._1._3;
                rhs = head5._2._3;
                if (fail) {
                  head5._3 = fail;
                  tmp = true;
                  kid = killId++;
                  kills[kid] = kill(early, fail === lhs ? head5._2 : head5._1, function() {
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
                  step3 = util.right(util.fromRight(lhs)(util.fromRight(rhs)));
                  head5._3 = step3;
                }
                break;
              case ALT:
                lhs = head5._1._3;
                rhs = head5._2._3;
                if (lhs === EMPTY && util.isLeft(rhs) || rhs === EMPTY && util.isLeft(lhs)) {
                  return;
                }
                if (lhs !== EMPTY && util.isLeft(lhs) && rhs !== EMPTY && util.isLeft(rhs)) {
                  fail = step3 === lhs ? rhs : lhs;
                  step3 = null;
                  head5._3 = fail;
                } else {
                  head5._3 = step3;
                  tmp = true;
                  kid = killId++;
                  kills[kid] = kill(early, step3 === lhs ? head5._2 : head5._1, function() {
                    return function() {
                      delete kills[kid];
                      if (tmp) {
                        tmp = false;
                      } else if (tail2 === null) {
                        join3(step3, null, null);
                      } else {
                        join3(step3, tail2._1, tail2._2);
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
              head5 = null;
            } else {
              head5 = tail2._1;
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
        var step3 = par;
        var head5 = null;
        var tail2 = null;
        var tmp, fid;
        loop:
          while (true) {
            tmp = null;
            fid = null;
            switch (status) {
              case CONTINUE:
                switch (step3.tag) {
                  case MAP:
                    if (head5) {
                      tail2 = new Aff2(CONS, head5, tail2);
                    }
                    head5 = new Aff2(MAP, step3._1, EMPTY, EMPTY);
                    step3 = step3._2;
                    break;
                  case APPLY:
                    if (head5) {
                      tail2 = new Aff2(CONS, head5, tail2);
                    }
                    head5 = new Aff2(APPLY, EMPTY, step3._2, EMPTY);
                    step3 = step3._1;
                    break;
                  case ALT:
                    if (head5) {
                      tail2 = new Aff2(CONS, head5, tail2);
                    }
                    head5 = new Aff2(ALT, EMPTY, step3._2, EMPTY);
                    step3 = step3._1;
                    break;
                  default:
                    fid = fiberId++;
                    status = RETURN;
                    tmp = step3;
                    step3 = new Aff2(FORKED, fid, new Aff2(CONS, head5, tail2), EMPTY);
                    tmp = Fiber(util, supervisor, tmp);
                    tmp.onComplete({
                      rethrow: false,
                      handler: resolve(step3)
                    })();
                    fibers[fid] = tmp;
                    if (supervisor) {
                      supervisor.register(tmp);
                    }
                }
                break;
              case RETURN:
                if (head5 === null) {
                  break loop;
                }
                if (head5._1 === EMPTY) {
                  head5._1 = step3;
                  status = CONTINUE;
                  step3 = head5._2;
                  head5._2 = EMPTY;
                } else {
                  head5._2 = step3;
                  step3 = head5;
                  if (tail2 === null) {
                    head5 = null;
                  } else {
                    head5 = tail2._1;
                    tail2 = tail2._2;
                  }
                }
            }
          }
        root = step3;
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

  // output/Control.Monad.State.Class/index.js
  var state = function(dict) {
    return dict.state;
  };

  // output/Deku.Hooks/index.js
  var liftST3 = /* @__PURE__ */ liftST(monadSTEffect);
  var $$void5 = /* @__PURE__ */ $$void(functorST);
  var map10 = /* @__PURE__ */ map(functorEvent);
  var alt3 = /* @__PURE__ */ alt(altEvent);
  var pure7 = /* @__PURE__ */ pure(applicativeEvent);
  var coerce4 = /* @__PURE__ */ coerce();
  var for_4 = /* @__PURE__ */ for_(applicativeST)(foldableMaybe);
  var useRef = function(a2) {
    return function(e) {
      return function(f) {
        var ee = makeLemmingEvent(function(s2) {
          return function(k) {
            return function __do4() {
              var r = newSTRef(a2)();
              k(f(liftST3(read2(r))))();
              return s2(e)(function(i2) {
                return $$void5(write2(i2)(r));
              })();
            };
          };
        });
        var eee = map10(function(v) {
          return v;
        })(ee);
        var eeee = envy(map10(function(v) {
          return v;
        })(eee));
        return eeee;
      };
    };
  };
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
  var useHot$prime = function(f) {
    var ee = envy(coerce4(makeLemmingEventO(function(v, k) {
      var v1 = createPure();
      var current = newSTRef(Nothing.value)();
      var writeVal = function(v2) {
        return write2(new Just(v2))(current);
      };
      var push$prime$prime = function(i2) {
        return liftST3(function __do4() {
          writeVal(i2)();
          return v1.push(i2)();
        });
      };
      var event$prime = makeLemmingEventO(function(v2, k$prime) {
        var val = read2(current)();
        for_4(val)(function(x) {
          return function() {
            return k$prime(x);
          };
        })();
        return v(v1.event, k$prime);
      });
      k(function(v2) {
        return v2;
      }(f(new Tuple(push$prime$prime, event$prime))));
      return v(v1.event, function(v2) {
        return $$void5(writeVal(v2))();
      });
    })));
    return ee;
  };
  var useHot = function(a2) {
    return function(f) {
      var ee = envy(coerce4(makeLemmingEventO(function(v, k) {
        var v1 = createPure();
        var current = newSTRef(Nothing.value)();
        var writeVal = function(v2) {
          return write2(new Just(v2))(current);
        };
        var push$prime$prime = function(i2) {
          return liftST3(function __do4() {
            writeVal(i2)();
            return v1.push(i2)();
          });
        };
        var event$prime = makeLemmingEventO(function(v2, k$prime) {
          var val = read2(current)();
          k$prime(fromMaybe(a2)(val));
          return v(v1.event, k$prime);
        });
        k(function(v2) {
          return v2;
        }(f(new Tuple(push$prime$prime, event$prime))));
        return v(v1.event, function(v2) {
          return $$void5(writeVal(v2))();
        });
      })));
      return ee;
    };
  };
  var useEffect = function(e) {
    return function(f1) {
      return function(f2) {
        var eee = alt3(pure7(f2(unit)))(makeEventO(function(v) {
          return subscribeO(e, mkEffectFn1(f1));
        }));
        var eeee = map10(function(v) {
          return v;
        })(eee);
        var eeeee = map10(function(v) {
          return v;
        })(eeee);
        var ee = envy(eeeee);
        return ee;
      };
    };
  };

  // output/Web.Event.Event/foreign.js
  function preventDefault(e) {
    return function() {
      return e.preventDefault();
    };
  }

  // output/Data.Nullable/foreign.js
  function nullable(a2, r, f) {
    return a2 == null ? r : f(a2);
  }

  // output/Data.Nullable/index.js
  var toMaybe = function(n) {
    return nullable(n, Nothing.value, Just.create);
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

  // output/Deku.Listeners/index.js
  var map11 = /* @__PURE__ */ map(functorEvent);
  var click = function(dictAttr) {
    return map11(attr(dictAttr)(OnClick.value));
  };

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
  var uncons3 = function($copy_v) {
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
  var empty6 = /* @__PURE__ */ function() {
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
              var v = uncons3(xs);
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
  var uncons4 = function(v) {
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
  var empty7 = /* @__PURE__ */ function() {
    return CatNil.value;
  }();
  var append5 = link2;
  var semigroupCatList = {
    append: append5
  };
  var snoc3 = function(cat) {
    return function(a2) {
      return append5(cat)(new CatCons(a2, empty6));
    };
  };

  // output/Control.Monad.Free/index.js
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
  var append6 = /* @__PURE__ */ append(semigroupCatList);
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
          return new Free(v22.value0, append6(v22.value1)(r));
        };
      };
      if (v.value0 instanceof Return) {
        var v2 = uncons4(v.value1);
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
    return new Free(f, empty7);
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
  var $lazy_freeApply = /* @__PURE__ */ $runtime_lazy4("freeApply", "Control.Monad.Free", function() {
    return {
      apply: ap(freeMonad),
      Functor0: function() {
        return freeFunctor;
      }
    };
  });
  var pure8 = /* @__PURE__ */ pure(freeApplicative);
  var liftF = function(f) {
    return fromView(new Bind(f, function($192) {
      return pure8($192);
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
  var getDynFamily = (id2) => (state4) => () => state4.units[id2] && state4.units[id2].dynFamily ? state4.units[id2].dynFamily : (() => {
    throw new Error(`No positional information for ${id2}`);
  })();
  var getParent = (id2) => (state4) => () => state4.units[id2] && state4.units[id2].main && state4.units[id2].main.parentNode && state4.units[id2].main.parentNode.$dekuId ? state4.units[id2].main.parentNode.$dekuId : state4.units[id2] && state4.units[id2].startBeacon && state4.units[id2].startBeacon.parentNode && state4.units[id2].startBeacon.parentNode.$dekuId ? state4.units[id2].startBeacon.parentNode.$dekuId : (() => {
    throw new Error(`No parent information for ${id2}`);
  })();
  var getScope = (id2) => (state4) => () => state4.units[id2] && state4.units[id2].scope ? state4.units[id2].scope : (() => {
    throw new Error(`No scope information for ${id2}`);
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
  var stateHasKey = (id2) => (state4) => () => {
    return state4.units[id2] !== void 0;
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

  // output/Data.String.Utils/index.js
  var includes = function(searchString) {
    return function(s2) {
      return includesImpl(searchString, s2);
    };
  };

  // output/Random.LCG/index.js
  var mod2 = /* @__PURE__ */ mod(euclideanRingInt);
  var fromJust5 = /* @__PURE__ */ fromJust();
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
      return fromJust5(fromNumber(remainder(toNumber(lcgA) * toNumber(v) + toNumber(d))(toNumber(lcgM))));
    };
  };
  var lcgNext = /* @__PURE__ */ lcgPerturb(lcgC);

  // output/Control.Monad.State.Trans/index.js
  var functorStateT = function(dictFunctor) {
    var map20 = map(dictFunctor);
    return {
      map: function(f) {
        return function(v) {
          return function(s2) {
            return map20(function(v1) {
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
    var pure11 = pure(dictMonad.Applicative0());
    return {
      pure: function(a2) {
        return function(s2) {
          return pure11(new Tuple(a2, s2));
        };
      },
      Apply0: function() {
        return applyStateT(dictMonad);
      }
    };
  };
  var monadStateStateT = function(dictMonad) {
    var pure11 = pure(dictMonad.Applicative0());
    var monadStateT1 = monadStateT(dictMonad);
    return {
      state: function(f) {
        return function($200) {
          return pure11(f($200));
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
  var mul3 = /* @__PURE__ */ mul(semiringNumber);
  var add3 = /* @__PURE__ */ add(semiringNumber);
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
      var choose32BitPosNumber = apply4(map22(add3)(choose31BitPosNumber))(map22(mul3(2))(choose31BitPosNumber));
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
  var map14 = /* @__PURE__ */ map(functorEvent);
  var map15 = /* @__PURE__ */ map(functorFn);
  var map23 = /* @__PURE__ */ map(functorEffect);
  var $$void6 = /* @__PURE__ */ $$void(functorST);
  var show2 = /* @__PURE__ */ show(showInt);
  var arbitrary2 = /* @__PURE__ */ arbitrary(arbInt);
  var add4 = /* @__PURE__ */ add(semiringInt);
  var pure13 = /* @__PURE__ */ pure(applicativeEffect);
  var mempty3 = /* @__PURE__ */ mempty(/* @__PURE__ */ monoidFn(/* @__PURE__ */ monoidST(monoidUnit)));
  var empty8 = /* @__PURE__ */ empty(plusEvent);
  var coerce5 = /* @__PURE__ */ coerce();
  var unwrap5 = /* @__PURE__ */ unwrap();
  var eq3 = /* @__PURE__ */ eq(eqScope);
  var join2 = /* @__PURE__ */ join(freeBind);
  var pure23 = /* @__PURE__ */ pure(applicativeEvent);
  var EFunctionOfFFIDOMSnapshot = function(x) {
    return x;
  };
  var functorEFunctionOfFFIDOMS = {
    map: function(f) {
      return function(m) {
        return map14(map15(map23(f)))(m);
      };
    }
  };
  var runOnJust = function(v) {
    return function(v1) {
      if (v instanceof Just) {
        return v1(v.value0);
      }
      ;
      return pure13(false);
    };
  };
  var sendToPos2 = function(a2) {
    return function(state4) {
      return function __do4() {
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
          ctor: envy(empty8)
        };
        return coerce5(giveNewParent_(Just.create)(runOnJust)(newA))(state4)();
      };
    };
  };
  var __internalDekuFlatten2 = function(a2) {
    return function(b2) {
      return function(c) {
        return flatten({
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
                scopeEq: eq3
              });
            };
          },
          toElt: function(v) {
            return v;
          }
        })(a2)(b2)(coerce5(c));
      };
    };
  };
  var giveNewParentOrReconstruct = function(di) {
    return function(just) {
      return function(roj) {
        return function(gnp) {
          return join2(liftF(pure23(function(ffi) {
            var needsFreshNut = function() {
              var v = map14(function(a2) {
                return function(v1) {
                  return pure13(a2);
                };
              })(__internalDekuFlatten2({
                dynFamily: gnp.dynFamily,
                ez: gnp.ez,
                parent: new Just(gnp.parent),
                pos: gnp.pos,
                raiseId: gnp.raiseId,
                scope: gnp.scope
              })(di)(gnp.ctor));
              return pure13(wrap2(v));
            }();
            var hasIdAndInScope = pure13(liftF(pure23(giveNewParent_(just)(roj)(gnp))));
            return function __do4() {
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
      ids: function __do4() {
        var s2 = read2(seed)();
        var o = show2(evalGen(arbitrary2)({
          newSeed: mkSeed(s2),
          size: 5
        }));
        $$void6(modify2(add4(1))(seed))();
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

  // output/Web.HTML.HTMLDivElement/index.js
  var toEventTarget = unsafeCoerce2;
  var fromElement = /* @__PURE__ */ unsafeReadProtoTagged("HTMLDivElement");

  // output/Web.HTML.HTMLDocument/foreign.js
  function _body(doc) {
    return doc.body;
  }

  // output/Web.HTML.HTMLDocument/index.js
  var map16 = /* @__PURE__ */ map(functorEffect);
  var body2 = function(doc) {
    return map16(toMaybe)(function() {
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
  function navigator(window2) {
    return function() {
      return window2.navigator;
    };
  }
  function innerWidth(window2) {
    return function() {
      return window2.innerWidth;
    };
  }
  function innerHeight(window2) {
    return function() {
      return window2.innerHeight;
    };
  }

  // output/Deku.Toplevel/index.js
  var keepLatest4 = /* @__PURE__ */ keepLatest(eventIsEvent);
  var map17 = /* @__PURE__ */ map(functorEvent);
  var resume2 = /* @__PURE__ */ resume(functorEFunctionOfFFIDOMS);
  var monoidEffect3 = /* @__PURE__ */ monoidEffect(monoidUnit);
  var mempty4 = /* @__PURE__ */ mempty(/* @__PURE__ */ monoidEvent(/* @__PURE__ */ monoidFn(monoidEffect3)));
  var pure9 = /* @__PURE__ */ pure(applicativeEffect);
  var bind4 = /* @__PURE__ */ bind(bindEffect);
  var mapFlipped3 = /* @__PURE__ */ mapFlipped(functorEffect);
  var liftST4 = /* @__PURE__ */ liftST(monadSTEffect);
  var mempty12 = /* @__PURE__ */ mempty(/* @__PURE__ */ monoidEffect(monoidEffect3));
  var map18 = /* @__PURE__ */ map(functorMaybe);
  var $$void7 = /* @__PURE__ */ $$void(functorEffect);
  var flattenToSingleEvent = function(ffi) {
    var go$prime = function(n) {
      var $52 = map17(go2(n));
      return function($53) {
        return keepLatest4($52($53));
      };
    };
    var go2 = function(n) {
      return function($54) {
        return function(v) {
          if (v instanceof Left) {
            return keepLatest4(map17(f(n))(v.value0));
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
          return function __do4() {
            unit;
            bind4(i2(ffi))(k)();
            return pure9(unit);
          };
        }));
      };
    };
    return go$prime(0);
  };
  var runInElement$prime = function(elt) {
    return function(eee) {
      return function __do4() {
        var ffi = makeFFIDOMSnapshot();
        var evt = mapFlipped3(liftST4(newSTRef(0)))(function() {
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
    return function __do4() {
      var b$prime = bind4(bind4(windowImpl)(document2))(body2)();
      return maybe(mempty12)(function(elt) {
        return runInElement$prime(elt)(eee);
      })(map18(toElement)(b$prime))();
    };
  };
  var runInBody = function(a2) {
    return $$void7(runInBody$prime(a2));
  };

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
      var rect2 = el.getBoundingClientRect();
      return {
        top: rect2.top,
        right: rect2.right,
        bottom: rect2.bottom,
        left: rect2.left,
        width: rect2.width,
        height: rect2.height,
        x: rect2.x,
        y: rect2.y
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

  // output/Web.Event.EventTarget/foreign.js
  function eventListener(fn) {
    return function() {
      return function(event) {
        return fn(event)();
      };
    };
  }
  function addEventListener(type) {
    return function(listener) {
      return function(useCapture) {
        return function(target7) {
          return function() {
            return target7.addEventListener(type, listener, useCapture);
          };
        };
      };
    };
  }

  // output/Web.PointerEvent.Navigator/foreign.js
  function maxTouchPoints(nav2) {
    return function() {
      return nav2.maxTouchPoints;
    };
  }

  // output/Web.TouchEvent.Touch/foreign.js
  function clientX(t) {
    return t.clientX;
  }
  function clientY(t) {
    return t.clientY;
  }

  // output/Web.TouchEvent.TouchEvent/foreign.js
  function changedTouches(e) {
    return e.changedTouches;
  }

  // output/Web.TouchEvent.TouchEvent/index.js
  var fromEvent2 = /* @__PURE__ */ unsafeReadProtoTagged("TouchEvent");

  // output/Web.TouchEvent.TouchList/foreign.js
  function _item(i2, l) {
    return l.item(i2);
  }

  // output/Web.TouchEvent.TouchList/index.js
  var item = function(i2) {
    return function(l) {
      return toMaybe(_item(i2, l));
    };
  };

  // output/Web.UIEvent.MouseEvent/foreign.js
  function clientX2(e) {
    return e.clientX;
  }
  function clientY2(e) {
    return e.clientY;
  }

  // output/Web.UIEvent.MouseEvent/index.js
  var fromEvent3 = /* @__PURE__ */ unsafeReadProtoTagged("MouseEvent");

  // output/Main/index.js
  var for_5 = /* @__PURE__ */ for_(applicativeEffect);
  var for_13 = /* @__PURE__ */ for_5(foldableMaybe);
  var pure10 = /* @__PURE__ */ pure(applicativeEffect);
  var abs4 = /* @__PURE__ */ abs3(basedPoint);
  var ord3 = /* @__PURE__ */ ord(basedPoint);
  var map19 = /* @__PURE__ */ map(functorArray);
  var compare3 = /* @__PURE__ */ compare(ordNumber);
  var map110 = /* @__PURE__ */ map(functorEffect);
  var style_3 = /* @__PURE__ */ style_(attrButton_StyleString);
  var click3 = /* @__PURE__ */ click(attrOnClickEffectUnit);
  var map24 = /* @__PURE__ */ map(functorEvent);
  var klass2 = /* @__PURE__ */ klass(attrButton_ClassString);
  var apply5 = /* @__PURE__ */ apply(applyEvent);
  var plus2 = /* @__PURE__ */ plus(summublePointVector);
  var meets5 = /* @__PURE__ */ meets(interLineLine);
  var sum2 = /* @__PURE__ */ sum(foldableArray)(semiringNumber);
  var append13 = /* @__PURE__ */ append(semigroupArray);
  var meets12 = /* @__PURE__ */ meets(interCircleHalfLine);
  var traverse_3 = /* @__PURE__ */ traverse_(applicativeEffect)(foldableMaybe);
  var bind1 = /* @__PURE__ */ bind(bindArray);
  var meets22 = /* @__PURE__ */ meets(interLineSegment);
  var attr2 = /* @__PURE__ */ attr(attrLine_VisibilityString);
  var pureAttr2 = /* @__PURE__ */ pureAttr(attrLine_StrokeString);
  var pureAttr1 = /* @__PURE__ */ pureAttr(attrLine_StrokeWidthStrin);
  var show3 = /* @__PURE__ */ show(showNumber);
  var keepLatest5 = /* @__PURE__ */ keepLatest(eventIsEvent);
  var oneOf3 = /* @__PURE__ */ oneOf(foldableArray)(plusEvent);
  var pureAttr22 = /* @__PURE__ */ pureAttr(attrLine_X1String);
  var pureAttr3 = /* @__PURE__ */ pureAttr(attrLine_Y1String);
  var pureAttr4 = /* @__PURE__ */ pureAttr(attrLine_X2String);
  var pureAttr5 = /* @__PURE__ */ pureAttr(attrLine_Y2String);
  var attr1 = /* @__PURE__ */ attr(attrText_VisibilityString);
  var pureAttr6 = /* @__PURE__ */ pureAttr(attrText_StyleString);
  var attr22 = /* @__PURE__ */ attr(attrText_XString);
  var attr3 = /* @__PURE__ */ attr(attrText_YString);
  var attr4 = /* @__PURE__ */ attr(attrCircle_VisibilityStri);
  var attr5 = /* @__PURE__ */ attr(attrCircle_CxString);
  var attr6 = /* @__PURE__ */ attr(attrCircle_CyString);
  var pureAttr7 = /* @__PURE__ */ pureAttr(attrCircle_RString);
  var pureAttr8 = /* @__PURE__ */ pureAttr(attrCircle_FillString);
  var maximum2 = /* @__PURE__ */ maximum(ordInt)(foldableArray);
  var mapAttr2 = /* @__PURE__ */ mapAttr(functorFn);
  var mapAttr1 = /* @__PURE__ */ mapAttr2(attrG_VisibilityString);
  var pureAttr9 = /* @__PURE__ */ pureAttr(attrRect_XString);
  var pureAttr10 = /* @__PURE__ */ pureAttr(attrRect_YString);
  var pureAttr11 = /* @__PURE__ */ pureAttr(attrRect_WidthString);
  var pureAttr12 = /* @__PURE__ */ pureAttr(attrRect_HeightString);
  var pureAttr13 = /* @__PURE__ */ pureAttr(attrRect_RxString);
  var pureAttr14 = /* @__PURE__ */ pureAttr(attrRect_FillString);
  var mapWithIndex4 = /* @__PURE__ */ mapWithIndex(functorWithIndexArray);
  var pureAttr15 = /* @__PURE__ */ pureAttr(attrText_XString);
  var pureAttr16 = /* @__PURE__ */ pureAttr(attrText_YString);
  var pureAttr17 = /* @__PURE__ */ pureAttr(attrCircle_CxString);
  var pureAttr18 = /* @__PURE__ */ pureAttr(attrCircle_CyString);
  var mapAttr22 = /* @__PURE__ */ mapAttr2(attrLine_VisibilityString);
  var pureAttr19 = /* @__PURE__ */ pureAttr(attrSelfElementFunctionEf);
  var style_1 = /* @__PURE__ */ style_(attrDiv_StyleString);
  var pureAttr20 = /* @__PURE__ */ pureAttr(attrDiv_StyleString);
  var pureAttr21 = /* @__PURE__ */ pureAttr(attrOnMousedownCb);
  var pureAttr222 = /* @__PURE__ */ pureAttr(attrOnMousemoveCb);
  var pureAttr23 = /* @__PURE__ */ pureAttr(attrOnMouseupCb);
  var pureAttr24 = /* @__PURE__ */ pureAttr(attrSvg_WidthString);
  var pureAttr25 = /* @__PURE__ */ pureAttr(attrSvg_HeightString);
  var pureAttr26 = /* @__PURE__ */ pureAttr(attrSvg_ViewBoxString);
  var pure14 = /* @__PURE__ */ pure(applicativeEvent);
  var attr7 = /* @__PURE__ */ attr(attrLine_X1String);
  var attr8 = /* @__PURE__ */ attr(attrLine_Y1String);
  var attr9 = /* @__PURE__ */ attr(attrLine_X2String);
  var attr10 = /* @__PURE__ */ attr(attrLine_Y2String);
  var mapAttr3 = /* @__PURE__ */ mapAttr2(attrCircle_VisibilityStri);
  var pureAttr27 = /* @__PURE__ */ pureAttr(attrCircle_StrokeString);
  var pureAttr28 = /* @__PURE__ */ pureAttr(attrCircle_StrokeWidthStr);
  var touchListener = function(dictFoldable) {
    var for_24 = for_5(dictFoldable);
    return function(off) {
      return function(f) {
        return eventListener(function(e) {
          return function __do4() {
            preventDefault(e)();
            return for_13(fromEvent2(e))(function(me) {
              return for_13(item(0)(changedTouches(me)))(function(t) {
                return function __do5() {
                  var o = off();
                  return for_24(o)(function(h) {
                    var y = toNumber(clientY(t)) - h;
                    var x = toNumber(clientX(t));
                    var $135 = y < 0;
                    if ($135) {
                      return pure10(unit);
                    }
                    ;
                    return f({
                      x,
                      y
                    });
                  })();
                };
              });
            })();
          };
        });
      };
    };
  };
  var touchListener1 = /* @__PURE__ */ touchListener(foldableMaybe);
  var toVertex = function(z) {
    return {
      x: abs4(z),
      y: ord3(z)
    };
  };
  var svgFontSize = 0.4;
  var styleItem = "display: grid; grid-template-columns: 30% 33% 37%; ";
  var specBox = /* @__PURE__ */ function() {
    return {
      x: -3,
      y: -3,
      width: 6,
      height: 6
    };
  }();
  var pointRadius = 0.2;
  var pointName = function(v) {
    return v.name;
  };
  var mouseCb = function(dictFoldable) {
    var for_24 = for_5(dictFoldable);
    return function(off) {
      return function(f) {
        return cb(function(e) {
          return function __do4() {
            preventDefault(e)();
            return for_13(fromEvent3(e))(function(me) {
              return function __do5() {
                var o = off();
                return for_24(o)(function(h) {
                  var y = toNumber(clientY2(me)) - h;
                  var x = toNumber(clientX2(me));
                  var $137 = y < 0;
                  if ($137) {
                    return pure10(unit);
                  }
                  ;
                  return f({
                    x,
                    y
                  });
                })();
              };
            })();
          };
        });
      };
    };
  };
  var mouseCb1 = /* @__PURE__ */ mouseCb(foldableMaybe);
  var mobileButtonFontSize = "80px; ";
  var lineWidth = 0.05;
  var iniC = /* @__PURE__ */ function() {
    return point("C")(-1)(-sqrt(3));
  }();
  var iniB = /* @__PURE__ */ function() {
    return point("B")(-1)(sqrt(3));
  }();
  var iniA = /* @__PURE__ */ point("A")(2)(0);
  var fromVertex = function(v) {
    return point("")(v.x)(v.y);
  };
  var desktopButtonFontSize = "40px; ";
  var closest = function(r) {
    return function(vs) {
      var ds = map19(function(v2) {
        return new Tuple(v2.value1, sqrt((v2.value0.x - r.x) * (v2.value0.x - r.x) + (v2.value0.y - r.y) * (v2.value0.y - r.y)));
      })(vs);
      var v = uncons(sortBy(function(a2) {
        return function(b2) {
          return compare3(snd(a2))(snd(b2));
        };
      })(ds));
      if (v instanceof Just) {
        return new Just(v.value0.head);
      }
      ;
      return Nothing.value;
    };
  };
  var bothWithDefault = function(xs) {
    return function(v) {
      var v1 = new Tuple(index(xs)(0), index(xs)(1));
      if (v1.value0 instanceof Just && v1.value1 instanceof Just) {
        return new Tuple(v1.value0.value0, v1.value1.value0);
      }
      ;
      return new Tuple(v.value0, v.value1);
    };
  };
  var main2 = function __do3() {
    var win = windowImpl();
    var width8 = map110(toNumber)(innerWidth(win))();
    var height8 = map110(toNumber)(innerHeight(win))();
    var nav2 = navigator(win)();
    var tp = maxTouchPoints(nav2)();
    var viewBox = function() {
      var v = compare3(specBox.width * height8)(specBox.height * width8);
      if (v instanceof GT) {
        return {
          x: specBox.x,
          y: specBox.y + specBox.height / 2 - height8 * specBox.width / width8 / 2,
          width: specBox.width,
          height: height8 * specBox.width / width8
        };
      }
      ;
      if (v instanceof LT) {
        return {
          x: specBox.x + specBox.width / 2 - width8 * specBox.height / height8 / 2,
          y: specBox.y,
          width: width8 * specBox.height / height8,
          height: specBox.height
        };
      }
      ;
      return {
        x: specBox.x,
        y: specBox.y,
        width: specBox.width,
        height: specBox.height
      };
    }();
    var segmentsBox = function() {
      var tr2 = point("")(viewBox.x + viewBox.width)(viewBox.y);
      var tl = point("")(viewBox.x)(viewBox.y);
      var br2 = point("")(viewBox.x + viewBox.width)(viewBox.y + viewBox.height);
      var bl = point("")(viewBox.x)(viewBox.y + viewBox.height);
      return [segment(tl)(tr2)(Nothing.value), segment(tr2)(br2)(Nothing.value), segment(br2)(bl)(Nothing.value), segment(bl)(tl)(Nothing.value)];
    }();
    var remap = function(v) {
      return {
        x: (viewBox.width * v.x + viewBox.x * width8) / width8,
        y: (viewBox.height * v.y + viewBox.y * height8) / height8
      };
    };
    var isMobile = tp > 1;
    var styleButton = function(v) {
      return [style_3(function() {
        if (isMobile) {
          return "font-size: " + (mobileButtonFontSize + "font-weight: 900;");
        }
        ;
        return "font-size: " + desktopButtonFontSize;
      }()), click3(map24(function(b2) {
        return v.value0(!b2);
      })(v.value1)), klass2(map24(function(b2) {
        if (b2) {
          return "selected";
        }
        ;
        return "general";
      })(v.value1))];
    };
    return runInBody(bind3(useHot(Nothing.value))(function(v) {
      return bind3(useRef(Nothing.value)(v.value1))(function(offset) {
        return bind3(useHot(Nothing.value))(function(v1) {
          return bind3(useHot$prime)(function(v2) {
            return bind3(useHot(toVertex(iniA)))(function(v3) {
              return bind3(useRef(toVertex(iniA))(v3.value1))(function(ptA) {
                return bind3(useHot(toVertex(iniB)))(function(v4) {
                  return bind3(useRef(toVertex(iniB))(v4.value1))(function(ptB) {
                    return bind3(useHot(toVertex(iniC)))(function(v5) {
                      return bind3(useRef(toVertex(iniC))(v5.value1))(function(ptC) {
                        return bind3(useHot($$const(pure10(unit))))(function(v6) {
                          return bind3(useRef($$const(pure10(unit)))(v6.value1))(function(action2) {
                            return bind3(useHot(false))(function(hauteurs) {
                              return bind3(useHot(false))(function(medianes) {
                                return bind3(useHot(false))(function(mediatrices) {
                                  return bind3(useHot(false))(function(bissectrices) {
                                    return bind3(useHot(false))(function(orthocentre) {
                                      return bind3(useHot(false))(function(gravite) {
                                        return bind3(useHot(false))(function(circumcenter) {
                                          return bind3(useHot(false))(function(inscenter) {
                                            return bind3(useHot(false))(function(propO) {
                                              return bind3(useHot(false))(function(propG) {
                                                return bind3(useHot(false))(function(propC) {
                                                  return bind3(useHot(false))(function(propI) {
                                                    var anyProperty = apply5(apply5(apply5(map24(function(a2) {
                                                      return function(b2) {
                                                        return function(c) {
                                                          return function(d) {
                                                            return a2 || (b2 || (c || d));
                                                          };
                                                        };
                                                      };
                                                    })(snd(propO)))(snd(propG)))(snd(propC)))(snd(propI));
                                                    return bind3(useMemoized(apply5(apply5(map24(function(p2) {
                                                      return function(q2) {
                                                        return function(r) {
                                                          var u2 = function(p$prime) {
                                                            return function(q$prime) {
                                                              return function(r$prime) {
                                                                return plus2(fromVertex(q$prime))(projection(vector(fromVertex(q$prime))(fromVertex(r$prime)))(vector(fromVertex(q$prime))(fromVertex(p$prime))));
                                                              };
                                                            };
                                                          };
                                                          var hq = u2(q2)(p2)(r);
                                                          var hp = u2(p2)(q2)(r);
                                                          var o = meets5(line(fromVertex(p2))(hp))(line(fromVertex(q2))(hq));
                                                          return {
                                                            x: sum2(map19(abs4)(o)),
                                                            y: sum2(map19(ord3)(o))
                                                          };
                                                        };
                                                      };
                                                    })(v3.value1))(v4.value1))(v5.value1)))(function(eocenter) {
                                                      return bind3(useMemoized(apply5(apply5(map24(function(p2) {
                                                        return function(q2) {
                                                          return function(r) {
                                                            return {
                                                              x: (p2.x + q2.x + r.x) / 3,
                                                              y: (p2.y + q2.y + r.y) / 3
                                                            };
                                                          };
                                                        };
                                                      })(v3.value1))(v4.value1))(v5.value1)))(function(egravity) {
                                                        return bind3(useMemoized(apply5(apply5(map24(function(p2) {
                                                          return function(q2) {
                                                            return function(r) {
                                                              var n = function(p$prime) {
                                                                return function(q$prime) {
                                                                  return normalTo(vector(fromVertex(p$prime))(fromVertex(q$prime)));
                                                                };
                                                              };
                                                              var m = function(p$prime) {
                                                                return function(q$prime) {
                                                                  return middle("")(segment(fromVertex(p$prime))(fromVertex(q$prime))(Nothing.value));
                                                                };
                                                              };
                                                              var u2 = function(p$prime) {
                                                                return function(q$prime) {
                                                                  return plus2(m(p$prime)(q$prime))(n(p$prime)(q$prime));
                                                                };
                                                              };
                                                              var c = meets5(line(m(p2)(q2))(u2(p2)(q2)))(line(m(p2)(r))(u2(p2)(r)));
                                                              return {
                                                                x: sum2(map19(abs4)(c)),
                                                                y: sum2(map19(ord3)(c))
                                                              };
                                                            };
                                                          };
                                                        })(v3.value1))(v4.value1))(v5.value1)))(function(eccenter) {
                                                          return bind3(useMemoized(apply5(apply5(map24(function(p2) {
                                                            return function(q2) {
                                                              return function(r) {
                                                                var aux = function(p$prime) {
                                                                  return function(q$prime) {
                                                                    return function(r$prime) {
                                                                      var pt = fromVertex(p$prime);
                                                                      var c = circle(pt)(1);
                                                                      return bothWithDefault(append13(meets12(c)(halfline(pt)(vector(pt)(fromVertex(q$prime)))))(meets12(c)(halfline(pt)(vector(pt)(fromVertex(r$prime))))))(new Tuple(fromVertex(q$prime), fromVertex(r$prime)));
                                                                    };
                                                                  };
                                                                };
                                                                var v7 = aux(q2)(r)(p2);
                                                                var v8 = aux(r)(p2)(q2);
                                                                var cci = meets5(line(fromVertex(q2))(middle("")(segment(v7.value0)(v7.value1)(Nothing.value))))(line(fromVertex(r))(middle("")(segment(v8.value0)(v8.value1)(Nothing.value))));
                                                                return {
                                                                  x: sum2(map19(abs4)(cci)),
                                                                  y: sum2(map19(ord3)(cci))
                                                                };
                                                              };
                                                            };
                                                          })(v3.value1))(v4.value1))(v5.value1)))(function(eicenter) {
                                                            var emiddle = function(eP) {
                                                              return function(eQ) {
                                                                return useMemoized(apply5(map24(function(p2) {
                                                                  return function(q2) {
                                                                    return {
                                                                      x: (p2.x + q2.x) / 2,
                                                                      y: (p2.y + q2.y) / 2
                                                                    };
                                                                  };
                                                                })(eP))(eQ));
                                                              };
                                                            };
                                                            return bind3(emiddle(v4.value1)(v5.value1))(function(eA$prime) {
                                                              return bind3(emiddle(v3.value1)(v5.value1))(function(eB$prime) {
                                                                return bind3(emiddle(v3.value1)(v4.value1))(function(eC$prime) {
                                                                  var eproj = function(eP) {
                                                                    return function(eQ) {
                                                                      return function(eR) {
                                                                        return useMemoized(apply5(apply5(map24(function(p2) {
                                                                          return function(q2) {
                                                                            return function(r) {
                                                                              return toVertex(plus2(fromVertex(q2))(projection(vector(fromVertex(q2))(fromVertex(r)))(vector(fromVertex(q2))(fromVertex(p2)))));
                                                                            };
                                                                          };
                                                                        })(eP))(eQ))(eR));
                                                                      };
                                                                    };
                                                                  };
                                                                  return bind3(eproj(eicenter)(v4.value1)(v5.value1))(function(eJ) {
                                                                    return bind3(eproj(eicenter)(v3.value1)(v5.value1))(function(eK) {
                                                                      return bind3(eproj(eicenter)(v3.value1)(v4.value1))(function(eL) {
                                                                        var styleRadio = function(v7) {
                                                                          return [style_3(function() {
                                                                            if (isMobile) {
                                                                              return "font-size: " + (mobileButtonFontSize + "font-weight: 900;");
                                                                            }
                                                                            ;
                                                                            return "font-size: " + desktopButtonFontSize;
                                                                          }()), click3(map24(function($$this) {
                                                                            if ($$this) {
                                                                              return v7.value0(false);
                                                                            }
                                                                            ;
                                                                            return function __do4() {
                                                                              fst(propO)(false)();
                                                                              fst(propG)(false)();
                                                                              fst(propC)(false)();
                                                                              fst(propI)(false)();
                                                                              return v7.value0(true)();
                                                                            };
                                                                          })(v7.value1)), klass2(map24(function(b2) {
                                                                            if (b2) {
                                                                              return "selected";
                                                                            }
                                                                            ;
                                                                            return "general";
                                                                          })(v7.value1))];
                                                                        };
                                                                        return discard3(useEffect(v1.value1)(traverse_3(function(v7) {
                                                                          return function __do4() {
                                                                            var a2 = ptA();
                                                                            var b2 = ptB();
                                                                            var c = ptC();
                                                                            var v$prime = remap(v7);
                                                                            return for_13(closest(v$prime)([new Tuple(a2, v3.value0), new Tuple(b2, v4.value0), new Tuple(c, v5.value0)]))(function(v8) {
                                                                              return function __do5() {
                                                                                v8.value0(v$prime)();
                                                                                return v6.value0(v8.value0)();
                                                                              };
                                                                            })();
                                                                          };
                                                                        })))(function() {
                                                                          return discard3(useEffect(v2.value1)(function(v7) {
                                                                            return function __do4() {
                                                                              var s2 = action2();
                                                                              return s2(remap(v7))();
                                                                            };
                                                                          }))(function() {
                                                                            var visibleLine = function(p2) {
                                                                              return function(q2) {
                                                                                var d = line(fromVertex(p2))(fromVertex(q2));
                                                                                var ms = bind1(segmentsBox)(function(s2) {
                                                                                  return map19(toVertex)(meets22(d)(s2));
                                                                                });
                                                                                return bothWithDefault(ms)(new Tuple(p2, q2));
                                                                              };
                                                                            };
                                                                            var screenSegment = function(eP) {
                                                                              return function(eQ) {
                                                                                return function(eCond) {
                                                                                  return line2([map24(function(po) {
                                                                                    return attr2(Visibility.value)(function() {
                                                                                      if (po) {
                                                                                        return "visible";
                                                                                      }
                                                                                      ;
                                                                                      return "hidden";
                                                                                    }());
                                                                                  })(eCond), pureAttr2(Stroke.value)("black"), pureAttr1(StrokeWidth.value)(show3(lineWidth / 2)), keepLatest5(apply5(map24(function(p2) {
                                                                                    return function(q2) {
                                                                                      return oneOf3([pureAttr22(X1.value)(show3(p2.x)), pureAttr3(Y1.value)(show3(p2.y)), pureAttr4(X2.value)(show3(q2.x)), pureAttr5(Y2.value)(show3(q2.y))]);
                                                                                    };
                                                                                  })(eP))(eQ))])([]);
                                                                                };
                                                                              };
                                                                            };
                                                                            var screenPointName = function(eP) {
                                                                              return function(eCond) {
                                                                                return function(str) {
                                                                                  return text2([map24(function(po) {
                                                                                    return attr1(Visibility.value)(function() {
                                                                                      if (po) {
                                                                                        return "visible";
                                                                                      }
                                                                                      ;
                                                                                      return "hidden";
                                                                                    }());
                                                                                  })(eCond), pureAttr6(Style.value)("font-family: sans-serif; font-size: " + (show3(svgFontSize) + "px; ")), map24(function(p2) {
                                                                                    return attr22(X.value)(show3(p2.x + svgFontSize / 2.5));
                                                                                  })(eP), map24(function(p2) {
                                                                                    return attr3(Y.value)(show3(p2.y - svgFontSize / 2.5));
                                                                                  })(eP)])([text_(str)]);
                                                                                };
                                                                              };
                                                                            };
                                                                            var screenPoint = function(eP) {
                                                                              return function(eCond) {
                                                                                return function(color) {
                                                                                  return function(size5) {
                                                                                    return circle2([map24(function(po) {
                                                                                      return attr4(Visibility.value)(function() {
                                                                                        if (po) {
                                                                                          return "visible";
                                                                                        }
                                                                                        ;
                                                                                        return "hidden";
                                                                                      }());
                                                                                    })(eCond), map24(function(p2) {
                                                                                      return attr5(Cx.value)(show3(p2.x));
                                                                                    })(eP), map24(function(p2) {
                                                                                      return attr6(Cy.value)(show3(p2.y));
                                                                                    })(eP), pureAttr7(R.value)(show3(size5 * pointRadius)), pureAttr8(Fill.value)(color)])([]);
                                                                                  };
                                                                                };
                                                                              };
                                                                            };
                                                                            var property = function(eprop) {
                                                                              return function(content3) {
                                                                                var nLines = (2 * length(content3) | 0) + 1 | 0;
                                                                                var nColumns = fromMaybe(0)(maximum2(map19(length5)(content3)));
                                                                                var labelWidth = toNumber(nColumns) * (svgFontSize / 3.5);
                                                                                var labelX = viewBox.x + labelWidth / 20;
                                                                                var labelHeight = toNumber(nLines) * (svgFontSize / 2);
                                                                                var labelY = viewBox.y + labelHeight / 40;
                                                                                return g([map24(mapAttr1(Visibility.value)(function(v7) {
                                                                                  if (v7) {
                                                                                    return "visible";
                                                                                  }
                                                                                  ;
                                                                                  return "hidden";
                                                                                }))(snd(eprop))])(append13([rect([pureAttr9(X.value)(show3(labelX)), pureAttr10(Y.value)(show3(labelY)), pureAttr11(Width.value)(show3(labelWidth)), pureAttr12(Height.value)(show3(labelHeight)), pureAttr13(Rx.value)(show3(0.1)), pureAttr14(Fill.value)("#AAAA")])([])])(mapWithIndex4(function(j) {
                                                                                  return function(str) {
                                                                                    return text2([pureAttr6(Style.value)("font-family: sans-serif; font-size: " + (show3(svgFontSize / 2) + "px; ")), pureAttr15(X.value)(show3(labelX + labelWidth / 10)), pureAttr16(Y.value)(show3(labelY + labelHeight / 10 + (2 * toNumber(j) + 1) * (svgFontSize / 2)))])([text_(str)]);
                                                                                  };
                                                                                })(content3)));
                                                                              };
                                                                            };
                                                                            var meetingPoint = function(eshow) {
                                                                              return function(eprop) {
                                                                                return function(ecoord) {
                                                                                  return circle2([apply5(map24(function(s2) {
                                                                                    return function(p2) {
                                                                                      return attr4(Visibility.value)(function() {
                                                                                        var $192 = s2 || p2;
                                                                                        if ($192) {
                                                                                          return "visible";
                                                                                        }
                                                                                        ;
                                                                                        return "hidden";
                                                                                      }());
                                                                                    };
                                                                                  })(snd(eshow)))(snd(eprop)), pureAttr7(R.value)(show3(pointRadius / 2)), pureAttr8(Fill.value)("black"), keepLatest5(map24(function(v7) {
                                                                                    return oneOf3([pureAttr17(Cx.value)(show3(v7.x)), pureAttr18(Cy.value)(show3(v7.y))]);
                                                                                  })(ecoord))])([]);
                                                                                };
                                                                              };
                                                                            };
                                                                            var mediatrice = function(eM) {
                                                                              return line2([map24(mapAttr22(Visibility.value)(function(v7) {
                                                                                if (v7) {
                                                                                  return "visible";
                                                                                }
                                                                                ;
                                                                                return "hidden";
                                                                              }))(snd(mediatrices)), pureAttr2(Stroke.value)("black"), pureAttr1(StrokeWidth.value)(show3(lineWidth)), keepLatest5(apply5(map24(function(c) {
                                                                                return function(m) {
                                                                                  var v7 = visibleLine(c)(m);
                                                                                  return oneOf3([pureAttr22(X1.value)(show3(v7.value0.x)), pureAttr3(Y1.value)(show3(v7.value0.y)), pureAttr4(X2.value)(show3(v7.value1.x)), pureAttr5(Y2.value)(show3(v7.value1.y))]);
                                                                                };
                                                                              })(eccenter))(eM))])([]);
                                                                            };
                                                                            var mediane = function(eP) {
                                                                              return function(eQ) {
                                                                                return function(eR) {
                                                                                  return line2([map24(mapAttr22(Visibility.value)(function(v7) {
                                                                                    if (v7) {
                                                                                      return "visible";
                                                                                    }
                                                                                    ;
                                                                                    return "hidden";
                                                                                  }))(snd(medianes)), pureAttr2(Stroke.value)("black"), pureAttr1(StrokeWidth.value)(show3(lineWidth)), keepLatest5(apply5(apply5(map24(function(p2) {
                                                                                    return function(q2) {
                                                                                      return function(r) {
                                                                                        var v7 = visibleLine({
                                                                                          x: (p2.x + q2.x) / 2,
                                                                                          y: (p2.y + q2.y) / 2
                                                                                        })(r);
                                                                                        return oneOf3([pureAttr22(X1.value)(show3(v7.value0.x)), pureAttr3(Y1.value)(show3(v7.value0.y)), pureAttr4(X2.value)(show3(v7.value1.x)), pureAttr5(Y2.value)(show3(v7.value1.y))]);
                                                                                      };
                                                                                    };
                                                                                  })(eP))(eQ))(eR))])([]);
                                                                                };
                                                                              };
                                                                            };
                                                                            var hauteur = function(eP) {
                                                                              return line2([map24(mapAttr22(Visibility.value)(function(v7) {
                                                                                if (v7) {
                                                                                  return "visible";
                                                                                }
                                                                                ;
                                                                                return "hidden";
                                                                              }))(snd(hauteurs)), pureAttr2(Stroke.value)("black"), pureAttr1(StrokeWidth.value)(show3(lineWidth)), keepLatest5(apply5(map24(function(o) {
                                                                                return function(p2) {
                                                                                  var v7 = visibleLine(o)(p2);
                                                                                  return oneOf3([pureAttr22(X1.value)(show3(v7.value0.x)), pureAttr3(Y1.value)(show3(v7.value0.y)), pureAttr4(X2.value)(show3(v7.value1.x)), pureAttr5(Y2.value)(show3(v7.value1.y))]);
                                                                                };
                                                                              })(eocenter))(eP))])([]);
                                                                            };
                                                                            var droiteEuler = line2([apply5(apply5(map24(function(c) {
                                                                              return function(o) {
                                                                                return function(gr) {
                                                                                  return attr2(Visibility.value)(function() {
                                                                                    var $208 = c && (o && gr);
                                                                                    if ($208) {
                                                                                      return "visible";
                                                                                    }
                                                                                    ;
                                                                                    return "hidden";
                                                                                  }());
                                                                                };
                                                                              };
                                                                            })(snd(circumcenter)))(snd(orthocentre)))(snd(gravite)), pureAttr2(Stroke.value)("purple"), pureAttr1(StrokeWidth.value)(show3(lineWidth / 2)), keepLatest5(apply5(map24(function(c) {
                                                                              return function(o) {
                                                                                var v7 = visibleLine(c)(o);
                                                                                return oneOf3([pureAttr22(X1.value)(show3(v7.value0.x)), pureAttr3(Y1.value)(show3(v7.value0.y)), pureAttr4(X2.value)(show3(v7.value1.x)), pureAttr5(Y2.value)(show3(v7.value1.y))]);
                                                                              };
                                                                            })(eccenter))(eocenter))])([]);
                                                                            var bissectrice = function(eP) {
                                                                              return line2([map24(mapAttr22(Visibility.value)(function(v7) {
                                                                                if (v7) {
                                                                                  return "visible";
                                                                                }
                                                                                ;
                                                                                return "hidden";
                                                                              }))(snd(bissectrices)), pureAttr2(Stroke.value)("black"), pureAttr1(StrokeWidth.value)(show3(lineWidth)), keepLatest5(apply5(map24(function(i2) {
                                                                                return function(p2) {
                                                                                  var v7 = visibleLine(p2)(i2);
                                                                                  return oneOf3([pureAttr22(X1.value)(show3(v7.value0.x)), pureAttr3(Y1.value)(show3(v7.value0.y)), pureAttr4(X2.value)(show3(v7.value1.x)), pureAttr5(Y2.value)(show3(v7.value1.y))]);
                                                                                };
                                                                              })(eicenter))(eP))])([]);
                                                                            };
                                                                            return div_([div2([pureAttr19(Self.value)(function() {
                                                                              var $232 = traverse_3(function(elt) {
                                                                                return setTimeout2(400)(function __do4() {
                                                                                  var t = map110(function(v7) {
                                                                                    return v7.bottom;
                                                                                  })(getBoundingClientRect(elt))();
                                                                                  return v.value0(new Just(t))();
                                                                                });
                                                                              });
                                                                              return function($233) {
                                                                                return $232(Just.create($233));
                                                                              };
                                                                            }())])([div2([style_1(styleItem)])([button(styleButton(hauteurs))([text_("hauteurs")]), button(styleButton(orthocentre))([text_("orthocentre")]), button(styleRadio(propO))([text_("propri\xE9t\xE9")])]), div2([style_1(styleItem)])([button(styleButton(medianes))([text_("m\xE9dianes")]), button(styleButton(gravite))([text_("centre de gravit\xE9")]), button(styleRadio(propG))([text_("propri\xE9t\xE9")])]), div2([style_1(styleItem)])([button(styleButton(mediatrices))([text_("m\xE9diatrices")]), button(styleButton(circumcenter))([text_("centre du cercle circonscrit")]), button(styleRadio(propC))([text_("propri\xE9t\xE9")])]), div2([style_1(styleItem)])([button(styleButton(bissectrices))([text_("bissectrices")]), button(styleButton(inscenter))([text_("centre du cercle inscrit")]), button(styleRadio(propI))([text_("propri\xE9t\xE9")])])]), div2([pureAttr20(Style.value)("height: 100%;"), pureAttr21(OnMousedown.value)(mouseCb1(offset)(function($234) {
                                                                              return v1.value0(Just.create($234));
                                                                            })), pureAttr222(OnMousemove.value)(mouseCb1(offset)(v2.value0)), pureAttr23(OnMouseup.value)(cb(function(v7) {
                                                                              return function __do4() {
                                                                                v1.value0(Nothing.value)();
                                                                                return v6.value0($$const(pure10(unit)))();
                                                                              };
                                                                            })), pureAttr19(Self.value)(function() {
                                                                              var $235 = traverse_3(function(elt) {
                                                                                var add22 = function(e) {
                                                                                  return function(f) {
                                                                                    return addEventListener(e)(f)(true)(toEventTarget(elt));
                                                                                  };
                                                                                };
                                                                                return function __do4() {
                                                                                  var startTouch = touchListener1(offset)(function($237) {
                                                                                    return v1.value0(Just.create($237));
                                                                                  })();
                                                                                  add22("touchstart")(startTouch)();
                                                                                  var moveTouch = touchListener1(offset)(v2.value0)();
                                                                                  return add22("touchmove")(moveTouch)();
                                                                                };
                                                                              });
                                                                              return function($236) {
                                                                                return $235(fromElement($236));
                                                                              };
                                                                            }())])([svg([pureAttr24(Width.value)(show3(width8)), pureAttr25(Height.value)(show3(height8)), pureAttr26(ViewBox.value)(show3(viewBox.x) + (" " + (show3(viewBox.y) + (" " + (show3(viewBox.width) + (" " + show3(viewBox.height)))))))])([screenPoint(v3.value1)(pure14(true))("red")(1), screenPointName(v3.value1)(anyProperty)(pointName(iniA)), screenPoint(v4.value1)(pure14(true))("green")(1), screenPointName(v4.value1)(anyProperty)(pointName(iniB)), screenPoint(v5.value1)(pure14(true))("blue")(1), screenPointName(v5.value1)(anyProperty)(pointName(iniC)), line2([map24(function(p2) {
                                                                              return attr7(X1.value)(show3(p2.x));
                                                                            })(v3.value1), map24(function(p2) {
                                                                              return attr8(Y1.value)(show3(p2.y));
                                                                            })(v3.value1), map24(function(p2) {
                                                                              return attr9(X2.value)(show3(p2.x));
                                                                            })(v4.value1), map24(function(p2) {
                                                                              return attr10(Y2.value)(show3(p2.y));
                                                                            })(v4.value1), pureAttr2(Stroke.value)("black"), pureAttr1(StrokeWidth.value)(show3(lineWidth))])([]), line2([map24(function(p2) {
                                                                              return attr7(X1.value)(show3(p2.x));
                                                                            })(v4.value1), map24(function(p2) {
                                                                              return attr8(Y1.value)(show3(p2.y));
                                                                            })(v4.value1), map24(function(p2) {
                                                                              return attr9(X2.value)(show3(p2.x));
                                                                            })(v5.value1), map24(function(p2) {
                                                                              return attr10(Y2.value)(show3(p2.y));
                                                                            })(v5.value1), pureAttr2(Stroke.value)("black"), pureAttr1(StrokeWidth.value)(show3(lineWidth))])([]), line2([map24(function(p2) {
                                                                              return attr7(X1.value)(show3(p2.x));
                                                                            })(v3.value1), map24(function(p2) {
                                                                              return attr8(Y1.value)(show3(p2.y));
                                                                            })(v3.value1), map24(function(p2) {
                                                                              return attr9(X2.value)(show3(p2.x));
                                                                            })(v5.value1), map24(function(p2) {
                                                                              return attr10(Y2.value)(show3(p2.y));
                                                                            })(v5.value1), pureAttr2(Stroke.value)("black"), pureAttr1(StrokeWidth.value)(show3(lineWidth))])([]), mediane(v3.value1)(v4.value1)(v5.value1), mediane(v4.value1)(v5.value1)(v3.value1), mediane(v5.value1)(v3.value1)(v4.value1), meetingPoint(gravite)(propG)(egravity), screenPointName(egravity)(snd(propG))("G"), property(propG)(["si G=grav(ABC), A' milieu de [BC], B' milieu de [AC], et C' milieu de [AB]", "alors", "Aire(A'GC)=Aire(A'GB)=Aire(C'GB)=Aire(C'GA)=Aire(B'GA)=Aire(B'GC)"]), mediatrice(eA$prime), mediatrice(eB$prime), mediatrice(eC$prime), meetingPoint(circumcenter)(propC)(eccenter), screenPointName(eccenter)(snd(propC))("O"), property(propC)(["si O=ccc(ABC)", "alors", "OA=OB=OC"]), hauteur(v3.value1), hauteur(v4.value1), hauteur(v5.value1), meetingPoint(orthocentre)(propO)(eocenter), screenPointName(eocenter)(snd(propO))("H"), property(propO)(["si H=orth(ABC)", "alors", "A=orth(HBC), B=orth(AHC) et C=orth(ABH)"]), bissectrice(v3.value1), bissectrice(v4.value1), bissectrice(v5.value1), meetingPoint(inscenter)(propI)(eicenter), screenPointName(eicenter)(snd(propI))("I"), property(propI)(["si I=cci(ABC)", "alors", "dist(I,(AB))=dist(I,(BC))=dist(I,(AC))"]), droiteEuler, circle2([keepLatest5(apply5(map24(function(o) {
                                                                              return function(p2) {
                                                                                var r = sqrt((o.x - p2.x) * (o.x - p2.x) + (o.y - p2.y) * (o.y - p2.y));
                                                                                return oneOf3([map24(mapAttr3(Visibility.value)(function(v7) {
                                                                                  if (v7) {
                                                                                    return "visible";
                                                                                  }
                                                                                  ;
                                                                                  return "hidden";
                                                                                }))(snd(propC)), pureAttr17(Cx.value)(show3(o.x)), pureAttr18(Cy.value)(show3(o.y)), pureAttr7(R.value)(show3(r)), pureAttr8(Fill.value)("none"), pureAttr27(Stroke.value)("orange"), pureAttr28(StrokeWidth.value)(show3(lineWidth / 2))]);
                                                                              };
                                                                            })(eccenter))(v3.value1))])([]), screenPoint(eA$prime)(snd(propG))("black")(0.5), screenPointName(eA$prime)(snd(propG))("A'"), screenPoint(eB$prime)(snd(propG))("black")(0.5), screenPointName(eB$prime)(snd(propG))("B'"), screenPoint(eC$prime)(snd(propG))("black")(0.5), screenPointName(eC$prime)(snd(propG))("C'"), screenSegment(v3.value1)(eA$prime)(snd(propG)), screenSegment(v4.value1)(eB$prime)(snd(propG)), screenSegment(v5.value1)(eC$prime)(snd(propG)), screenSegment(eocenter)(v3.value1)(snd(propO)), screenSegment(eocenter)(v4.value1)(snd(propO)), screenSegment(eocenter)(v5.value1)(snd(propO)), circle2([keepLatest5(apply5(apply5(map24(function(i2) {
                                                                              return function(p2) {
                                                                                return function(q2) {
                                                                                  var h = toVertex(plus2(fromVertex(p2))(projection(vector(fromVertex(p2))(fromVertex(q2)))(vector(fromVertex(p2))(fromVertex(i2)))));
                                                                                  var r = sqrt((i2.x - h.x) * (i2.x - h.x) + (i2.y - h.y) * (i2.y - h.y));
                                                                                  return oneOf3([map24(mapAttr3(Visibility.value)(function(v7) {
                                                                                    if (v7) {
                                                                                      return "visible";
                                                                                    }
                                                                                    ;
                                                                                    return "hidden";
                                                                                  }))(snd(propI)), pureAttr17(Cx.value)(show3(i2.x)), pureAttr18(Cy.value)(show3(i2.y)), pureAttr7(R.value)(show3(r)), pureAttr8(Fill.value)("none"), pureAttr27(Stroke.value)("indigo"), pureAttr28(StrokeWidth.value)(show3(lineWidth / 2))]);
                                                                                };
                                                                              };
                                                                            })(eicenter))(v3.value1))(v4.value1))])([]), screenSegment(eicenter)(eJ)(snd(propI)), screenSegment(eicenter)(eK)(snd(propI)), screenSegment(eicenter)(eL)(snd(propI))])])]);
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
    }))();
  };

  // <stdin>
  main2();
})();
