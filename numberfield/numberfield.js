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
    var map10 = map(dictApply.Functor0());
    return function(a2) {
      return function(b2) {
        return apply1(map10($$const(identity2))(a2))(b2);
      };
    };
  };
  var lift2 = function(dictApply) {
    var apply1 = apply(dictApply);
    var map10 = map(dictApply.Functor0());
    return function(f) {
      return function(a2) {
        return function(b2) {
          return apply1(map10(f)(a2))(b2);
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
    var pure15 = pure(dictApplicative);
    return function(f) {
      return function(a2) {
        return apply5(pure15(f))(a2);
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
  var mul = function(dict) {
    return dict.mul;
  };
  var add = function(dict) {
    return dict.add;
  };

  // output/Data.Ring/index.js
  var ringInt = {
    sub: intSub,
    Semiring0: function() {
      return semiringInt;
    }
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
  var euclideanRingInt = {
    degree: intDegree,
    div: intDiv,
    mod: intMod,
    CommutativeRing0: function() {
      return commutativeRingInt;
    }
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
    var bind4 = bind(dictMonad.Bind1());
    var pure10 = pure(dictMonad.Applicative0());
    return function(f) {
      return function(a2) {
        return bind4(f)(function(f$prime) {
          return bind4(a2)(function(a$prime) {
            return pure10(f$prime(a$prime));
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
    var map10 = map(dictFunctor);
    return {
      map: function(f) {
        return mapWriterT(map10(function(v) {
          return new Tuple(f(v.value0), v.value1);
        }));
      }
    };
  };
  var applyWriterT = function(dictSemigroup) {
    var append7 = append(dictSemigroup);
    return function(dictApply) {
      var apply5 = apply(dictApply);
      var Functor0 = dictApply.Functor0();
      var map10 = map(Functor0);
      var functorWriterT1 = functorWriterT(Functor0);
      return {
        apply: function(v) {
          return function(v1) {
            var k = function(v3) {
              return function(v4) {
                return new Tuple(v3.value0(v4.value0), append7(v3.value1)(v4.value1));
              };
            };
            return apply5(map10(k)(v))(v1);
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
      var bind4 = bind(dictBind);
      var Apply0 = dictBind.Apply0();
      var map10 = map(Apply0.Functor0());
      var applyWriterT2 = applyWriterT1(Apply0);
      return {
        bind: function(v) {
          return function(k) {
            return bind4(v)(function(v1) {
              var v2 = k(v1.value0);
              return map10(function(v3) {
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
      var pure10 = pure(dictApplicative);
      var applyWriterT2 = applyWriterT1(dictApplicative.Apply0());
      return {
        pure: function(a2) {
          return pure10(new Tuple(a2, mempty5));
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
  function copyImpl(xs) {
    return function() {
      return xs.slice();
    };
  }
  var freeze = copyImpl;
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
    var pure10 = pure(dictApplicative);
    return function(dictFoldable) {
      var foldr22 = foldr(dictFoldable);
      return function(f) {
        return foldr22(function($454) {
          return applySecond3(f($454));
        })(pure10(unit));
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
      return function(map10) {
        return function(pure10) {
          return function(f) {
            return function(array) {
              function go2(bot, top3) {
                switch (top3 - bot) {
                  case 0:
                    return pure10([]);
                  case 1:
                    return map10(array1)(f(array[bot]));
                  case 2:
                    return apply5(map10(array2)(f(array[bot])))(f(array[bot + 1]));
                  case 3:
                    return apply5(apply5(map10(array3)(f(array[bot])))(f(array[bot + 1])))(f(array[bot + 2]));
                  default:
                    var pivot = bot + Math.floor((top3 - bot) / 4) * 2;
                    return apply5(map10(concat2)(go2(bot, pivot)))(go2(pivot, top3));
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
  var index = /* @__PURE__ */ function() {
    return indexImpl(Just.create)(Nothing.value);
  }();
  var last = function(xs) {
    return index(xs)(length(xs) - 1 | 0);
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
          return fromJust2(deleteAt(i2)(v2));
        })(findIndex(v(v1))(v2));
      };
    };
  };

  // output/Data.Number/foreign.js
  var isFiniteImpl = isFinite;
  var floor = Math.floor;
  var remainder = function(n) {
    return function(m2) {
      return n % m2;
    };
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
                var v3 = compare3(k)(v2.value1);
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
                var v3 = compare3(k)(v2.value1);
                if (v3 instanceof EQ) {
                  $tco_done1 = true;
                  return fromZipper1(v1)(new Three(v2.value0, k, v, v2.value3, v2.value4, v2.value5, v2.value6));
                }
                ;
                var v4 = compare3(k)(v2.value4);
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
              var v = compare3(k)(m2.value1);
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
              var v = compare3(k)(m2.value4);
              var v3 = compare3(k)(m2.value1);
              if (leaves && v3 instanceof EQ) {
                $tco_done3 = true;
                return new Just(new Tuple(m2.value2, fromZipper1(ctx)(new Two(Leaf.value, m2.value4, m2.value5, Leaf.value))));
              }
              ;
              if (leaves && v instanceof EQ) {
                $tco_done3 = true;
                return new Just(new Tuple(m2.value5, fromZipper1(ctx)(new Two(Leaf.value, m2.value1, m2.value2, Leaf.value))));
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
      var mempty5 = mempty(dictMonoid);
      var append22 = append(dictMonoid.Semigroup0());
      return function(f) {
        return function(m2) {
          if (m2 instanceof Leaf) {
            return mempty5;
          }
          ;
          if (m2 instanceof Two) {
            return append22(foldMap(foldableMap)(dictMonoid)(f)(m2.value0))(append22(f(m2.value2))(foldMap(foldableMap)(dictMonoid)(f)(m2.value3)));
          }
          ;
          if (m2 instanceof Three) {
            return append22(foldMap(foldableMap)(dictMonoid)(f)(m2.value0))(append22(f(m2.value2))(append22(foldMap(foldableMap)(dictMonoid)(f)(m2.value3))(append22(f(m2.value5))(foldMap(foldableMap)(dictMonoid)(f)(m2.value6)))));
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
      var mempty5 = mempty(dictMonoid);
      var append22 = append(dictMonoid.Semigroup0());
      return function(f) {
        return function(m2) {
          if (m2 instanceof Leaf) {
            return mempty5;
          }
          ;
          if (m2 instanceof Two) {
            return append22(foldMapWithIndex(foldableWithIndexMap)(dictMonoid)(f)(m2.value0))(append22(f(m2.value1)(m2.value2))(foldMapWithIndex(foldableWithIndexMap)(dictMonoid)(f)(m2.value3)));
          }
          ;
          if (m2 instanceof Three) {
            return append22(foldMapWithIndex(foldableWithIndexMap)(dictMonoid)(f)(m2.value0))(append22(f(m2.value1)(m2.value2))(append22(foldMapWithIndex(foldableWithIndexMap)(dictMonoid)(f)(m2.value3))(append22(f(m2.value4)(m2.value5))(foldMapWithIndex(foldableWithIndexMap)(dictMonoid)(f)(m2.value6)))));
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
  var $$delete = function(dictOrd) {
    var pop1 = pop(dictOrd);
    return function(k) {
      return function(m2) {
        return maybe(m2)(snd)(pop1(k)(m2));
      };
    };
  };
  var alter = function(dictOrd) {
    var lookup1 = lookup(dictOrd);
    var delete1 = $$delete(dictOrd);
    var insert1 = insert(dictOrd);
    return function(f) {
      return function(k) {
        return function(m2) {
          var v = f(lookup1(k)(m2));
          if (v instanceof Nothing) {
            return delete1(k)(m2);
          }
          ;
          if (v instanceof Just) {
            return insert1(k)(v.value0)(m2);
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
            return function(m3) {
              return function(v) {
                return alter1(function() {
                  var $936 = maybe(v)(f(v));
                  return function($937) {
                    return Just.create($936($937));
                  };
                }())(k)(m3);
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
  var foldr2 = /* @__PURE__ */ foldr(foldableList);
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
        var $133 = foldr2(f)(x);
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
  var map2 = /* @__PURE__ */ map(functorEffect);
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
        return function __do2() {
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
        return function __do2() {
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
          return function __do2() {
            var u2 = v(tf, k);
            return $$void3(liftST2(push(u2)(a2)))();
          };
        })(f)();
        return function __do2() {
          var o = liftST2(freeze(a2))();
          return fastForeachThunk(o);
        };
      };
    };
  };
  var mailbox$prime = function(dictOrd) {
    var alter2 = alter(dictOrd);
    var lookup3 = lookup(dictOrd);
    return function __do2() {
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
      var cancelInner = $$new(pure3(unit))();
      var cancelOuter = v(tf, function(v1) {
        var ci = read(cancelInner)();
        ci();
        var c = v1(tf, k);
        return write(c)(cancelInner)();
      });
      return function __do2() {
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
        return function __do2() {
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
      return function __do2() {
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
        return function __do2() {
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
    var create_ = function __do2() {
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
          return function __do2() {
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
          return function __do2() {
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
                var id = setTimeout2(n)(function __do2() {
                  k(a2);
                  var lid = read(localId)();
                  return maybe(pure3(unit))(function(id2) {
                    return modify_($$delete3(id2))(tid);
                  })(lid)();
                })();
                write(new Just(id))(localId)();
                return modify_(append1(singleton4(id)))(tid)();
              });
              return function __do2() {
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
    return function __do2() {
      unit;
      return function(v) {
        return v;
      }($lazy_backdoor(461).create)();
    };
  });
  var backdoor = /* @__PURE__ */ $lazy_backdoor(678);
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
          return apply3(map2(function(v2) {
            return function(v3) {
              return function __do2() {
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
  var attr = function(dict) {
    return dict.attr;
  };
  var pureAttr = function(dictAttr) {
    var attr1 = attr(dictAttr);
    return function(a2) {
      return function(b2) {
        return pure4(attr1(a2)(b2));
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
      return function(map10) {
        return function(f) {
          var buildFrom = function(x, ys) {
            return apply5(map10(consList)(f(x)))(ys);
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
            var acc = map10(finalCell)(f(array[array.length - 1]));
            var result = go2(acc, array.length - 1, array);
            while (result instanceof Cont) {
              result = result.fn();
            }
            return map10(listToArray)(result);
          };
        };
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
  function _foldM(bind4) {
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
              acc = bind4(acc)(g2(k));
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
  var foldr3 = /* @__PURE__ */ foldr(foldableArray);
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
          return foldr3(f)(z)(values(m2));
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
  var map3 = /* @__PURE__ */ map(functorEvent);
  var merge2 = /* @__PURE__ */ merge(foldableArray);
  var bind2 = /* @__PURE__ */ bind(bindST);
  var pure1 = /* @__PURE__ */ pure(applicativeST);
  var map12 = /* @__PURE__ */ map(functorST);
  var for_3 = /* @__PURE__ */ for_(applicativeST);
  var for_12 = /* @__PURE__ */ for_3(foldableMaybe);
  var $$void4 = /* @__PURE__ */ $$void(functorST);
  var for_23 = /* @__PURE__ */ for_3(foldableArray);
  var map32 = /* @__PURE__ */ map(functorArray);
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
            return merge2(map32(flatten(v)(psr)(interpreter))(v1.value0));
          }
          ;
          if (v1 instanceof EventfulElement$prime) {
            return keepLatest3(map3(flatten(v)(psr)(interpreter))(v1.value0));
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
                    var mic = function __do2() {
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
              return function __do2() {
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
  var map4 = /* @__PURE__ */ map(functorEvent);
  var lcmap2 = /* @__PURE__ */ lcmap(profunctorFn);
  var unwrap2 = /* @__PURE__ */ unwrap();
  var eq2 = /* @__PURE__ */ eq(eqScope);
  var pure5 = /* @__PURE__ */ pure(applicativeST);
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
            return new EventfulElement$prime(map4(f)(ii.value0));
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
                throw new Error("Failed pattern match at Deku.Core (line 451, column 38 - line 467, column 40): " + [v.parent.constructor.name]);
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
                  return pure5(unit);
                },
                pos: Nothing.value,
                dynFamily: new Just(me)
              })(v1)(fes)]), k);
              return function __do2() {
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
  var map5 = /* @__PURE__ */ map(functorEvent);
  var merge4 = /* @__PURE__ */ merge(foldableArray);
  var pure6 = /* @__PURE__ */ pure(applicativeEvent);
  var empty6 = /* @__PURE__ */ empty(plusEvent);
  var pure13 = /* @__PURE__ */ pure(applicativeST);
  var coerce3 = /* @__PURE__ */ coerce();
  var unwrap3 = /* @__PURE__ */ unwrap();
  var eq12 = /* @__PURE__ */ eq(eqScope);
  var alt2 = /* @__PURE__ */ alt(altEvent);
  var append4 = /* @__PURE__ */ append(semigroupArray);
  var mapWithIndex3 = /* @__PURE__ */ mapWithIndex(functorWithIndexArray);
  var map14 = /* @__PURE__ */ map(functorFn);
  var unsafeSetText = function(v) {
    return function(id) {
      return function(txt) {
        return map5(function($146) {
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
        return map5(function($147) {
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
          var unsub = v2(merge4([pure6(v1.makeText({
            id: me,
            parent: v.parent,
            pos: v.pos,
            scope: v.scope,
            dynFamily: v.dynFamily
          })), unsafeSetText(v1)(me)(txt), maybe(empty6)(function(p2) {
            return pure6(v1.attributeParent({
              id: me,
              parent: p2,
              pos: v.pos,
              dynFamily: v.dynFamily,
              ez: v.ez
            }));
          })(v.parent)]), k);
          return function __do2() {
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
            return v2(alt2(pure6(v1.makeRoot({
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
              var unsub = v2(alt2(merge4(append4([pure6(v1.makeElement({
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
              return function __do2() {
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
          return new Element$prime(elementify(en)(aa(attributes))(fixed(coerce3(arr))));
        };
        return step1(mapWithIndex3(map14(map14(function(v) {
          return v;
        }))(unsafeSetPos))(kids));
      };
    };
  };

  // output/Deku.DOM.Attr.Href/index.js
  var Href = /* @__PURE__ */ function() {
    function Href2() {
    }
    ;
    Href2.value = new Href2();
    return Href2;
  }();
  var attrA_HrefString = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "href",
          value: prop$prime(value12)
        });
      };
    }
  };

  // output/Deku.DOM.Elt.A/index.js
  var a = /* @__PURE__ */ elementify2("a");

  // output/Deku.DOM.Elt.Br/index.js
  var br = /* @__PURE__ */ elementify2("br");
  var br_ = /* @__PURE__ */ br(/* @__PURE__ */ empty(plusArray));

  // output/Deku.DOM.Elt.H1/index.js
  var h1 = /* @__PURE__ */ elementify2("h1");
  var h1_ = /* @__PURE__ */ h1(/* @__PURE__ */ empty(plusArray));

  // output/Deku.DOM.Elt.H2/index.js
  var h2 = /* @__PURE__ */ elementify2("h2");
  var h2_ = /* @__PURE__ */ h2(/* @__PURE__ */ empty(plusArray));

  // output/Deku.DOM.Elt.H3/index.js
  var h3 = /* @__PURE__ */ elementify2("h3");
  var h3_ = /* @__PURE__ */ h3(/* @__PURE__ */ empty(plusArray));

  // output/Deku.DOM.Elt.H5/index.js
  var h5 = /* @__PURE__ */ elementify2("h5");
  var h5_ = /* @__PURE__ */ h5(/* @__PURE__ */ empty(plusArray));

  // output/Deku.DOM.Elt.Label/index.js
  var label = /* @__PURE__ */ elementify2("label");

  // output/Deku.DOM.Elt.Li/index.js
  var li = /* @__PURE__ */ elementify2("li");
  var li_ = /* @__PURE__ */ li(/* @__PURE__ */ empty(plusArray));

  // output/Deku.DOM.Elt.Pre/index.js
  var pre = /* @__PURE__ */ elementify2("pre");
  var pre_ = /* @__PURE__ */ pre(/* @__PURE__ */ empty(plusArray));

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
  var attr2 = /* @__PURE__ */ attr(attrSelfElementFunctionEf);
  var tell2 = /* @__PURE__ */ tell(/* @__PURE__ */ monadTellWriterT(monoidNut)(monadIdentity));
  var map15 = /* @__PURE__ */ map(functorEvent);
  var pure7 = /* @__PURE__ */ pure(applicativeEvent);
  var pureAttr2 = /* @__PURE__ */ pureAttr(attrA_HrefString);
  var t$prime = function(txt) {
    return attr2(Self.value)(textMode(txt));
  };
  var t = function(str) {
    return tell2(label([map15(t$prime)(str)])([]));
  };
  var t_ = function(str) {
    return t(pure7(str));
  };
  var subsubsubsection_ = function(str) {
    return tell2(h5_([text_(str)]));
  };
  var setTitle_ = function(str) {
    return tell2(h1_([text_(str)]));
  };
  var section_2 = function(str) {
    return tell2(h2_([text_(str)]));
  };
  var pre_2 = function(str) {
    return tell2(pre_([text_(str)]));
  };
  var nl = /* @__PURE__ */ tell2(/* @__PURE__ */ br_([]));
  var m$prime = function(txt) {
    return attr2(Self.value)(render(txt));
  };
  var m = function(str) {
    return tell2(label([map15(m$prime)(str)])([]));
  };
  var m_ = function(str) {
    return m(pure7(str));
  };
  var equation2 = function(str) {
    return tell2(label([map15(function(txt) {
      return attr2(Self.value)(display(txt));
    })(str)])([]));
  };
  var equation_ = function(str) {
    return equation2(pure7(str));
  };
  var a_2 = function(str) {
    return tell2(a([pureAttr2(Href.value)(str)])([text_(str)]));
  };

  // output/Control.Monad.Writer/index.js
  var unwrap4 = /* @__PURE__ */ unwrap();
  var runWriter = function($5) {
    return unwrap4(runWriterT($5));
  };
  var execWriter = function(m2) {
    return snd(runWriter(m2));
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
  var foldr4 = function(k) {
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
        return foldr4(link2)(CatNil.value)(v.value1);
      }()));
    }
    ;
    throw new Error("Failed pattern match at Data.CatList (line 99, column 1 - line 99, column 61): " + [v.constructor.name]);
  };
  var empty8 = /* @__PURE__ */ function() {
    return CatNil.value;
  }();
  var append5 = link2;
  var semigroupCatList = {
    append: append5
  };
  var snoc3 = function(cat) {
    return function(a2) {
      return append5(cat)(new CatCons(a2, empty7));
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
    var map18 = map(dictFunctor);
    return resume$prime(function(g2) {
      return function(i2) {
        return new Left(map18(i2)(g2));
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
        const key = entries[i2][0];
        if (entries[i2][1] === true) {
          html2 = html2.replace(verb + key + verb, 'data-deku-attr-internal="' + key + '"');
        } else {
          html2 = html2.replace(verb + key + verb, '<span style="display:contents;" data-deku-elt-internal="' + key + '"></span>');
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
      var key = e.getAttribute("data-deku-attr-internal");
      const namespacedKey = key + "@!%" + pxScope;
      state4.units[namespacedKey] = {
        listeners: {},
        main: e,
        scope: scope2
      };
      state4.scopes[scope2].push(namespacedKey);
    });
    tmp.querySelectorAll("[data-deku-elt-internal]").forEach(function(e) {
      var key = e.getAttribute("data-deku-elt-internal");
      const namespacedKey = key + "@!%" + pxScope;
      state4.units[key + "@!%" + pxScope] = {
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
    var map10 = map(dictFunctor);
    return {
      map: function(f) {
        return function(v) {
          return function(s2) {
            return map10(function(v1) {
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
    var bind4 = bind(dictMonad.Bind1());
    return {
      bind: function(v) {
        return function(f) {
          return function(s2) {
            return bind4(v(s2))(function(v1) {
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
    var pure10 = pure(dictMonad.Applicative0());
    return {
      pure: function(a2) {
        return function(s2) {
          return pure10(new Tuple(a2, s2));
        };
      },
      Apply0: function() {
        return applyStateT(dictMonad);
      }
    };
  };
  var monadStateStateT = function(dictMonad) {
    var pure10 = pure(dictMonad.Applicative0());
    var monadStateT1 = monadStateT(dictMonad);
    return {
      state: function(f) {
        return function($200) {
          return pure10(f($200));
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
  var map7 = /* @__PURE__ */ map(functorEvent);
  var map16 = /* @__PURE__ */ map(functorFn);
  var map23 = /* @__PURE__ */ map(functorEffect);
  var $$void5 = /* @__PURE__ */ $$void(functorST);
  var show2 = /* @__PURE__ */ show(showInt);
  var arbitrary2 = /* @__PURE__ */ arbitrary(arbInt);
  var add3 = /* @__PURE__ */ add(semiringInt);
  var pure14 = /* @__PURE__ */ pure(applicativeEffect);
  var mempty3 = /* @__PURE__ */ mempty(/* @__PURE__ */ monoidFn(/* @__PURE__ */ monoidST(monoidUnit)));
  var empty9 = /* @__PURE__ */ empty(plusEvent);
  var coerce4 = /* @__PURE__ */ coerce();
  var unwrap5 = /* @__PURE__ */ unwrap();
  var eq3 = /* @__PURE__ */ eq(eqScope);
  var join2 = /* @__PURE__ */ join(freeBind);
  var pure23 = /* @__PURE__ */ pure(applicativeEvent);
  var EFunctionOfFFIDOMSnapshot = function(x) {
    return x;
  };
  var functorEFunctionOfFFIDOMS = {
    map: function(f) {
      return function(m2) {
        return map7(map16(map23(f)))(m2);
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
  var sendToPos = function(a2) {
    return function(state4) {
      return function __do2() {
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
        return coerce4(giveNewParent_(Just.create)(runOnJust)(newA))(state4)();
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
                scopeEq: eq3
              });
            };
          },
          toElt: function(v) {
            return v;
          }
        })(a2)(b2)(coerce4(c));
      };
    };
  };
  var giveNewParentOrReconstruct = function(di) {
    return function(just) {
      return function(roj) {
        return function(gnp) {
          return join2(liftF(pure23(function(ffi) {
            var needsFreshNut = function() {
              var v = map7(function(a2) {
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
            return function __do2() {
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
      ids: function __do2() {
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
        return liftF(EFunctionOfFFIDOMSnapshot(pure23(sendToPos($101))));
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
  var map8 = /* @__PURE__ */ map(functorEffect);
  var body2 = function(doc) {
    return map8(toMaybe)(function() {
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
  var keepLatest4 = /* @__PURE__ */ keepLatest(eventIsEvent);
  var map9 = /* @__PURE__ */ map(functorEvent);
  var resume2 = /* @__PURE__ */ resume(functorEFunctionOfFFIDOMS);
  var monoidEffect3 = /* @__PURE__ */ monoidEffect(monoidUnit);
  var mempty4 = /* @__PURE__ */ mempty(/* @__PURE__ */ monoidEvent(/* @__PURE__ */ monoidFn(monoidEffect3)));
  var pure9 = /* @__PURE__ */ pure(applicativeEffect);
  var bind3 = /* @__PURE__ */ bind(bindEffect);
  var mapFlipped2 = /* @__PURE__ */ mapFlipped(functorEffect);
  var liftST3 = /* @__PURE__ */ liftST(monadSTEffect);
  var mempty12 = /* @__PURE__ */ mempty(/* @__PURE__ */ monoidEffect(monoidEffect3));
  var map17 = /* @__PURE__ */ map(functorMaybe);
  var $$void6 = /* @__PURE__ */ $$void(functorEffect);
  var flattenToSingleEvent = function(ffi) {
    var go$prime = function(n) {
      var $52 = map9(go2(n));
      return function($53) {
        return keepLatest4($52($53));
      };
    };
    var go2 = function(n) {
      return function($54) {
        return function(v) {
          if (v instanceof Left) {
            return keepLatest4(map9(f(n))(v.value0));
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
          return function __do2() {
            unit;
            bind3(i2(ffi))(k)();
            return pure9(unit);
          };
        }));
      };
    };
    return go$prime(0);
  };
  var runInElement$prime = function(elt) {
    return function(eee) {
      return function __do2() {
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
    return function __do2() {
      var b$prime = bind3(bind3(windowImpl)(document2))(body2)();
      return maybe(mempty12)(function(elt) {
        return runInElement$prime(elt)(eee);
      })(map17(toElement)(b$prime))();
    };
  };
  var runInBody = function(a2) {
    return $$void6(runInBody$prime(a2));
  };

  // output/Main/index.js
  var discard3 = /* @__PURE__ */ discard(discardUnit)(/* @__PURE__ */ bindWriterT(semigroupNut)(bindIdentity));
  var tell3 = /* @__PURE__ */ tell(/* @__PURE__ */ monadTellWriterT(monoidNut)(monadIdentity));
  var documentation = /* @__PURE__ */ discard3(/* @__PURE__ */ setTitle_("Data.Algebraic.NumberField"))(function() {
    return discard3(nl)(function() {
      return discard3(subsubsubsection_("Technical documentation at"))(function() {
        return discard3(a_2("https://pursuit.purescript.org/packages/purescript-numberfield"))(function() {
          return discard3(section_2("Computation with extension fields of the field of rational numbers "))(function() {
            return discard3(t_("Thanks to the introduction of arbitrary precision integers in Javascript, it is now possible to perform ambitious theoretic computations in the browser without drowning in low-level details."))(function() {
              return discard3(nl)(function() {
                return discard3(nl)(function() {
                  return discard3(t_("The main purpose of this page is to show interactively"))(function() {
                    return discard3(tell3(ul_([li_([execWriter(discard3(t_("how to do computations in "))(function() {
                      return discard3(m_("\\mathbb{Q}(\\alpha)"))(function() {
                        return discard3(t_(" where "))(function() {
                          return discard3(m_("\\alpha"))(function() {
                            return t_(" is an algebraic number ");
                          });
                        });
                      });
                    }))]), li_([text_("how to compute minimal polynomials of sums of algebraic numbers")])])))(function() {
                      return discard3(t_("A minimal understanding of how to work with "))(function() {
                        return discard3(a_2("https://pursuit.purescript.org/packages/purescript-sparse-polynomials"))(function() {
                          return discard3(t_(" is assumed."))(function() {
                            return discard3(pre_2("import Prelude\n\n> import Data.Algebraic.NumberField\n> import Data.Ratio (Ratio, (%))\n> import Data.Reflectable (reifyType)\n> import Data.Sparse.Polynomial ((^), display, factor)\n> import JS.BigInt (BigInt, fromInt)"))(function() {
                              return discard3(tell3(h3_([execWriter(discard3(t_("Computations in "))(function() {
                                return m_("\\mathbb{Q}(\\alpha)");
                              }))])))(function() {
                                return discard3(t_("First, let's choose "))(function() {
                                  return discard3(m_("\\mathbb{Q}"))(function() {
                                    return discard3(t_(" as the undelying field by defining its unity"))(function() {
                                      return discard3(pre_2("> bigOne = fromInt 1 % fromInt 1"))(function() {
                                        return discard3(t_("As an initial example, suppose that "))(function() {
                                          return discard3(m_("\\alpha"))(function() {
                                            return discard3(t_(" is an algebraic number we know the minimal polynomial of."))(function() {
                                              return discard3(nl)(function() {
                                                return discard3(t_("For instance, "))(function() {
                                                  return discard3(m_("\\alpha = \\phi"))(function() {
                                                    return discard3(t_(", the golden ratio satisfying"))(function() {
                                                      return discard3(equation_("\\phi ^ 2 = \\phi + 1"))(function() {
                                                        return discard3(t_("or rather"))(function() {
                                                          return discard3(equation_("\\phi ^ 2 - \\phi - 1 = 0."))(function() {
                                                            return discard3(t_("So, the minimal polynomial of "))(function() {
                                                              return discard3(m_("\\alpha"))(function() {
                                                                return discard3(t_(" is"))(function() {
                                                                  return discard3(equation_("P_1(X) = X^2-X-1"))(function() {
                                                                    return discard3(t_("since this expression is irreductible in "))(function() {
                                                                      return discard3(m_("\\mathbb{Q}"))(function() {
                                                                        return discard3(t_(" (see below.)"))(function() {
                                                                          return discard3(nl)(function() {
                                                                            return discard3(nl)(function() {
                                                                              return discard3(t_("According to the rupture fields theory, all computations taking place in "))(function() {
                                                                                return discard3(m_("\\mathbb{Q}(\\alpha)"))(function() {
                                                                                  return discard3(t_(" can be performed in "))(function() {
                                                                                    return discard3(m_("\\mathbb{Q}[X]/ P_1(X)"))(function() {
                                                                                      return discard3(t_(" which is, significant fact, a field "))(function() {
                                                                                        return discard3(m_("-"))(function() {
                                                                                          return discard3(t_(" like "))(function() {
                                                                                            return discard3(m_("\\mathbb{Q} \\, -"))(function() {
                                                                                              return discard3(t_(" whereas "))(function() {
                                                                                                return discard3(m_("\\mathbb{Q}[X]"))(function() {
                                                                                                  return discard3(t_(" is only a ring."))(function() {
                                                                                                    return discard3(nl)(function() {
                                                                                                      return discard3(t_("With the property that "))(function() {
                                                                                                        return discard3(m_("\\mathbb{Q}(\\alpha)"))(function() {
                                                                                                          return discard3(t_(" is also a vector space of the same dimension as the degree of "))(function() {
                                                                                                            return discard3(m_("P_1"))(function() {
                                                                                                              return discard3(t_(", we can conclude that every addition, multiplication, subtraction and inversion involving elements of "))(function() {
                                                                                                                return discard3(m_("\\mathbb{Q}(\\alpha)"))(function() {
                                                                                                                  return discard3(t_(" can eventually be simplified to an expression of the form"))(function() {
                                                                                                                    return discard3(equation_("a\\alpha + b"))(function() {
                                                                                                                      return discard3(t_("where "))(function() {
                                                                                                                        return discard3(m_("a"))(function() {
                                                                                                                          return discard3(t_(" and "))(function() {
                                                                                                                            return discard3(m_("b"))(function() {
                                                                                                                              return discard3(t_(" are elements of "))(function() {
                                                                                                                                return discard3(m_("\\mathbb{Q}."))(function() {
                                                                                                                                  return discard3(nl)(function() {
                                                                                                                                    return discard3(nl)(function() {
                                                                                                                                      return discard3(t_("To illustrate, let's simplify"))(function() {
                                                                                                                                        return discard3(equation_("\\frac{\\phi + 2}{(\\phi-2)^2}."))(function() {
                                                                                                                                          return discard3(t_("This is a 3-step process."))(function() {
                                                                                                                                            return discard3(nl)(function() {
                                                                                                                                              return discard3(t_("The first thing to do is to define a framework in which computations will take place."))(function() {
                                                                                                                                                return discard3(pre_2("> fw1 = framework (bigOne ^ 0) [one ^ 2 - one ^ 1 - one ^ 0]"))(function() {
                                                                                                                                                  return discard3(t_("The first argument is the polynomic representation of unity as a polynomial of arity equal to the number of univariate polynomials that define "))(function() {
                                                                                                                                                    return discard3(m_("\\alpha"))(function() {
                                                                                                                                                      return discard3(t_(", one here."))(function() {
                                                                                                                                                        return discard3(nl)(function() {
                                                                                                                                                          return discard3(t_("The second argument is an array listing the polynomial(s) it(them)self(ves)."))(function() {
                                                                                                                                                            return discard3(nl)(function() {
                                                                                                                                                              return discard3(nl)(function() {
                                                                                                                                                                return discard3(t_("The second step is to define the expression,"))(function() {
                                                                                                                                                                  return discard3(pre_2("> :paste\n\u2026 test1 :: forall f. Expression f _\n\u2026 test1 = const $\n\u2026    let phi = element (bigOne ^ 1)\n\u2026        toFrac n = element ((fromInt n % fromInt 1) ^ 0)\n\u2026     in (phi + toFrac 2) * recip ((phi - toFrac 2) * (phi - toFrac 2))\n\u2026"))(function() {
                                                                                                                                                                    return discard3(t_("then hit "))(function() {
                                                                                                                                                                      return discard3(m_("<"))(function() {
                                                                                                                                                                        return discard3(t_("CTRL"))(function() {
                                                                                                                                                                          return discard3(m_(">"))(function() {
                                                                                                                                                                            return discard3(t_("+D."))(function() {
                                                                                                                                                                              return discard3(pre_2(">"))(function() {
                                                                                                                                                                                return discard3(t_("The compiler will refuse the expression if the type signature is not provided. "))(function() {
                                                                                                                                                                                  return discard3(nl)(function() {
                                                                                                                                                                                    return discard3(t_("The first binding is the selection of our variable, "))(function() {
                                                                                                                                                                                      return discard3(m_("\\phi"))(function() {
                                                                                                                                                                                        return discard3(t_(". This makes the correspondance between the (unique) variable of a univariate polynomial and the minimal polynomial provided."))(function() {
                                                                                                                                                                                          return discard3(nl)(function() {
                                                                                                                                                                                            return discard3(t_("The second binding defines a helper function introducing numerical constants in the expression."))(function() {
                                                                                                                                                                                              return discard3(nl)(function() {
                                                                                                                                                                                                return discard3(t_("Then, the expression is naturally defined with the division replaced by a product with the reciprocal."))(function() {
                                                                                                                                                                                                  return discard3(nl)(function() {
                                                                                                                                                                                                    return discard3(nl)(function() {
                                                                                                                                                                                                      return discard3(t_("From the last step"))(function() {
                                                                                                                                                                                                        return discard3(pre_2('> display ["phi"] $ run $ reifyType fw1 (build test1)\n"(11 % 1)\xD7phi+7 % 1"'))(function() {
                                                                                                                                                                                                          return discard3(t_("we conclude that the simplification gives"))(function() {
                                                                                                                                                                                                            return discard3(equation_("11\\phi+7"))(function() {
                                                                                                                                                                                                              return discard3(tell3(h3_([execWriter(discard3(t_("Computations in "))(function() {
                                                                                                                                                                                                                return m_("\\mathbb{Q}(\\alpha_0,\\alpha_1,\\cdots)");
                                                                                                                                                                                                              }))])))(function() {
                                                                                                                                                                                                                return discard3(t_("This second paragraph is nothing but the general case from which the first paragraph is extracted."))(function() {
                                                                                                                                                                                                                  return discard3(nl)(function() {
                                                                                                                                                                                                                    return discard3(t_("Nevertheless, it will show two new interesting tools which would have seemed trivial if presented earlier."))(function() {
                                                                                                                                                                                                                      return discard3(nl)(function() {
                                                                                                                                                                                                                        return discard3(nl)(function() {
                                                                                                                                                                                                                          return discard3(t_("Now, we want to work with several algebraic numbers, "))(function() {
                                                                                                                                                                                                                            return discard3(m_("\\alpha_i"))(function() {
                                                                                                                                                                                                                              return discard3(t_(", each of which have a known minimal polynomial."))(function() {
                                                                                                                                                                                                                                return discard3(nl)(function() {
                                                                                                                                                                                                                                  return discard3(t_("Behind the scene, the same process happens, as before, "))(function() {
                                                                                                                                                                                                                                    return discard3(t_(" with an algebraic number, "))(function() {
                                                                                                                                                                                                                                      return discard3(m_("\\alpha"))(function() {
                                                                                                                                                                                                                                        return discard3(t_(", along with its minimal polynomial. The difference now is that "))(function() {
                                                                                                                                                                                                                                          return discard3(m_("\\alpha"))(function() {
                                                                                                                                                                                                                                            return discard3(t_(" is not provided anymore, it is computed as the sum of the "))(function() {
                                                                                                                                                                                                                                              return discard3(m_("\\alpha_i"))(function() {
                                                                                                                                                                                                                                                return discard3(t_(" along with its minimal polynomial."))(function() {
                                                                                                                                                                                                                                                  return discard3(nl)(function() {
                                                                                                                                                                                                                                                    return discard3(nl)(function() {
                                                                                                                                                                                                                                                      return discard3(t_("As before, let's illustrate from an example, by expressing"))(function() {
                                                                                                                                                                                                                                                        return discard3(equation_("\\frac{1}{\\sqrt[3]{4}+\\sqrt[3]{2}-\\sqrt{3}}"))(function() {
                                                                                                                                                                                                                                                          return discard3(t_("as a sum rather than a quotient."))(function() {
                                                                                                                                                                                                                                                            return discard3(nl)(function() {
                                                                                                                                                                                                                                                              return discard3(nl)(function() {
                                                                                                                                                                                                                                                                return discard3(t_("With "))(function() {
                                                                                                                                                                                                                                                                  return discard3(m_("\\alpha_0 = \\sqrt[3]{2}"))(function() {
                                                                                                                                                                                                                                                                    return discard3(t_(" and "))(function() {
                                                                                                                                                                                                                                                                      return discard3(m_("\\alpha_1 = \\sqrt{3}"))(function() {
                                                                                                                                                                                                                                                                        return discard3(t_(" and, since "))(function() {
                                                                                                                                                                                                                                                                          return discard3(m_("\\alpha_0^2 = \\sqrt[3]{4}"))(function() {
                                                                                                                                                                                                                                                                            return discard3(t_(", we have only two algebraic numbers to deal with."))(function() {
                                                                                                                                                                                                                                                                              return discard3(pre_2("> fw2 = let f = fromInt in framework (bigOne^0^0) [one^3 - (f 2 % f 1)^0, one^2 - (f 3 % f 1)^0]"))(function() {
                                                                                                                                                                                                                                                                                return discard3(t_("From the following request, the minimal polynomial of "))(function() {
                                                                                                                                                                                                                                                                                  return discard3(m_("\\sqrt[3]{2}+\\sqrt{3}"))(function() {
                                                                                                                                                                                                                                                                                    return discard3(t_(" is"))(function() {
                                                                                                                                                                                                                                                                                      return discard3(equation_("P_2(X)=X^6-9X^4-4X^3+27X^2-36X-23"))(function() {
                                                                                                                                                                                                                                                                                        return discard3(pre_2("> minimalPolynomial fw2\n(1 % 1)\xD7z^6+(-9 % 1)\xD7z^4+(-4 % 1)\xD7z^3+(27 % 1)\xD7z^2+(-36 % 1)\xD7z+(-23 % 1)"))(function() {
                                                                                                                                                                                                                                                                                          return discard3(t_("From the following request, if we define "))(function() {
                                                                                                                                                                                                                                                                                            return discard3(equation_("Q_0(X)=-\\frac{2 }{51}X^5-\\frac{1 }{102}X^4+\\frac{20}{51}X^3+\\frac{13}{51}X^2-\\frac{38}{51}X+\\frac{91}{102}"))(function() {
                                                                                                                                                                                                                                                                                              return discard3(t_("and"))(function() {
                                                                                                                                                                                                                                                                                                return discard3(equation_("Q_1(X)=\\frac{2 }{51}X^5+\\frac{1 }{102}X^4-\\frac{20}{51}X^3-\\frac{13}{51}X^2+\\frac{89}{51}X-\\frac{91}{102}"))(function() {
                                                                                                                                                                                                                                                                                                  return discard3(t_("then"))(function() {
                                                                                                                                                                                                                                                                                                    return discard3(equation_("Q_0(\\sqrt[3]{2}+\\sqrt{3})=\\sqrt[3]{2}"))(function() {
                                                                                                                                                                                                                                                                                                      return discard3(t_("and"))(function() {
                                                                                                                                                                                                                                                                                                        return discard3(equation_("Q_1(\\sqrt[3]{2}+\\sqrt{3})=\\sqrt{3}"))(function() {
                                                                                                                                                                                                                                                                                                          return discard3(pre_2("> toPrimitive fw2\n[(-2 % 51)\xD7z^5+(-1 % 102)\xD7z^4+(20 % 51)\xD7z^3+(13 % 51)\xD7z^2+(-38 % 51)\xD7z+91 % 102,(2 % 51)\xD7z^5+(1 % 102)\xD7z^4+(-20 % 51)\xD7z^3+(-13 % 51)\xD7z^2+(89 % 51)\xD7z+(-91 % 102)]"))(function() {
                                                                                                                                                                                                                                                                                                            return discard3(nl)(function() {
                                                                                                                                                                                                                                                                                                              return discard3(t_("Going back to our initial problem"))(function() {
                                                                                                                                                                                                                                                                                                                return discard3(pre_2("> :paste\n\u2026 test2 :: forall f. Expression f _\n\u2026 test2 = const $\n\u2026    let cbrt2 = element (bigOne ^ 0 ^ 1)\n\u2026        sqrt3 = element (bigOne ^ 1 ^ 0)\n\u2026     in (recip $ cbrt2 * cbrt2 + cbrt2 - sqrt3)\n\u2026"))(function() {
                                                                                                                                                                                                                                                                                                                  return discard3(pre_2('> display ["cr2", "sr3"] $ run $ reifyType fw2 (build test2)\n"((1 % 3)\xD7sr3+(-1 % 3))\xD7cr2^2+(1 % 3)\xD7cr2+(-1 % 3)\xD7sr3+2 % 3"'))(function() {
                                                                                                                                                                                                                                                                                                                    return discard3(t_("the expression we're looking for is"))(function() {
                                                                                                                                                                                                                                                                                                                      return discard3(equation_("\\frac{1}{3}\\sqrt{3}\\sqrt[3]{4}-\\frac{1}{3}\\sqrt[3]{4}+\\frac{1}{3}\\sqrt[3]{2}-\\frac{1}{ 3}\\sqrt{3}+\\frac{2}{3}."))(function() {
                                                                                                                                                                                                                                                                                                                        return discard3(tell3(h3_([execWriter(discard3(t_("Troubleshooting (is "))(function() {
                                                                                                                                                                                                                                                                                                                          return discard3(m_("P"))(function() {
                                                                                                                                                                                                                                                                                                                            return t_(" minimal ?)");
                                                                                                                                                                                                                                                                                                                          });
                                                                                                                                                                                                                                                                                                                        }))])))(function() {
                                                                                                                                                                                                                                                                                                                          return discard3(t_("Given an algebraic expression, it is sometimes harder than it seems to choose the minimal polynomial for it."))(function() {
                                                                                                                                                                                                                                                                                                                            return discard3(nl)(function() {
                                                                                                                                                                                                                                                                                                                              return discard3(t_("For instance, with"))(function() {
                                                                                                                                                                                                                                                                                                                                return discard3(equation_("\\alpha=\\sqrt{7+\\sqrt{24}}"))(function() {
                                                                                                                                                                                                                                                                                                                                  return discard3(t_("we can derive"))(function() {
                                                                                                                                                                                                                                                                                                                                    return discard3(equation_("(\\alpha^2-7)^2=24"))(function() {
                                                                                                                                                                                                                                                                                                                                      return discard3(t_("and"))(function() {
                                                                                                                                                                                                                                                                                                                                        return discard3(equation_("\\alpha^4-14\\alpha^2+49=24"))(function() {
                                                                                                                                                                                                                                                                                                                                          return discard3(t_("However, if we choose"))(function() {
                                                                                                                                                                                                                                                                                                                                            return discard3(equation_("\\tilde{P}(X)=X^4-14X^2+25"))(function() {
                                                                                                                                                                                                                                                                                                                                              return discard3(t_("as the minimal polynomial, we can't get the right answer for "))(function() {
                                                                                                                                                                                                                                                                                                                                                return discard3(m_("\\alpha^3-9\\alpha"))(function() {
                                                                                                                                                                                                                                                                                                                                                  return discard3(t_(" (which is "))(function() {
                                                                                                                                                                                                                                                                                                                                                    return discard3(m_("10"))(function() {
                                                                                                                                                                                                                                                                                                                                                      return discard3(t_(", but we don't know it yet.)"))(function() {
                                                                                                                                                                                                                                                                                                                                                        return discard3(nl)(function() {
                                                                                                                                                                                                                                                                                                                                                          return discard3(t_("The reason of this issue is due to required irreductibility of the minimal polynomial, but that's not the case for "))(function() {
                                                                                                                                                                                                                                                                                                                                                            return discard3(m_("\\tilde{P}"))(function() {
                                                                                                                                                                                                                                                                                                                                                              return discard3(t_(" by looking at the result of the `factor` function which displays some non-trivial  factors of "))(function() {
                                                                                                                                                                                                                                                                                                                                                                return discard3(m_("\\tilde{P}"))(function() {
                                                                                                                                                                                                                                                                                                                                                                  return discard3(t_(":"))(function() {
                                                                                                                                                                                                                                                                                                                                                                    return discard3(pre_2("> frac n = fromInt n % fromInt 1\n> ptilde = frac 1^4 - frac 14^2 + frac 25^0\n>\n> factor ptilde\n[(-1 % 1)\xD7x^2+(-2 % 1)\xD7x+5 % 1,(-1 % 1)\xD7x^2+(2 % 1)\xD7x+5 % 1,(1 % 1)\xD7x^2+(2 % 1)\xD7x+(-5 % 1),(1 % 1)\xD7x^2+(-2 % 1)\xD7x+(-5 % 1)]"))(function() {
                                                                                                                                                                                                                                                                                                                                                                      return discard3(t_("Incidentally, each of these factors can be chosen as a minimal polynomial for "))(function() {
                                                                                                                                                                                                                                                                                                                                                                        return discard3(m_("\\alpha"))(function() {
                                                                                                                                                                                                                                                                                                                                                                          return discard3(t_(". Let's choose the last one, and check that it satisfies "))(function() {
                                                                                                                                                                                                                                                                                                                                                                            return discard3(m_("\\alpha"))(function() {
                                                                                                                                                                                                                                                                                                                                                                              return discard3(t_("'s definition:"))(function() {
                                                                                                                                                                                                                                                                                                                                                                                return discard3(pre_2('> display ["a"] $ run $ reifyType (framework (frac 1 ^ 0) [one ^ 2 - frac 2 ^ 1 - frac 5 ^ 0]) (build ((const $ let a = element (frac 1 ^ 1) in let kst n = element (frac n ^ 0) in (a*a-kst 7)*(a*a-kst 7)) :: forall f. Expression f _))\n"24 % 1"'))(function() {
                                                                                                                                                                                                                                                                                                                                                                                  return discard3(t_("Now, the framework is coherent:"))(function() {
                                                                                                                                                                                                                                                                                                                                                                                    return pre_2('> display ["a"] $ run $ reifyType (framework (frac 1 ^ 0) [one ^ 2 - frac 2 ^ 1 - frac 5 ^ 0]) (build ((const $ let a = element (frac 1 ^ 1) in let kst n = element (frac n ^ 0) in a*a*a -kst 9 *a) :: forall f. Expression f _))\n"10 % 1"');
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
          });
        });
      });
    });
  });
  var main2 = /* @__PURE__ */ runInBody(/* @__PURE__ */ execWriter(documentation));

  // <stdin>
  main2();
})();
