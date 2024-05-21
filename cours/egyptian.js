#!/usr/bin/env node
(() => {
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

  // output/Data.Boolean/index.js
  var otherwise = true;

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

  // output/Data.Functor/index.js
  var map = function(dict) {
    return dict.map;
  };
  var functorFn = {
    map: /* @__PURE__ */ compose(semigroupoidFn)
  };
  var functorArray = {
    map: arrayMap
  };

  // output/Control.Apply/index.js
  var applyArray = {
    apply: arrayApply,
    Functor0: function() {
      return functorArray;
    }
  };

  // output/Control.Bind/index.js
  var bindArray = {
    bind: arrayBind,
    Apply0: function() {
      return applyArray;
    }
  };
  var bind = function(dict) {
    return dict.bind;
  };

  // output/Data.Array/foreign.js
  var rangeImpl = function(start, end) {
    var step2 = start > end ? -1 : 1;
    var result = new Array(step2 * (end - start) + 1);
    var i = start, n = 0;
    while (i !== end) {
      result[n++] = i;
      i += step2;
    }
    result[n] = i;
    return result;
  };
  var replicateFill = function(count, value) {
    if (count < 1) {
      return [];
    }
    var result = new Array(count);
    return result.fill(value);
  };
  var replicatePolyfill = function(count, value) {
    var result = [];
    var n = 0;
    for (var i = 0; i < count; i++) {
      result[n++] = value;
    }
    return result;
  };
  var replicateImpl = typeof Array.prototype.fill === "function" ? replicateFill : replicatePolyfill;
  var fromFoldableImpl = function() {
    function Cons(head, tail) {
      this.head = head;
      this.tail = tail;
    }
    var emptyList = {};
    function curryCons(head) {
      return function(tail) {
        return new Cons(head, tail);
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
    return function(foldr2, xs) {
      return listToArray(foldr2(curryCons)(emptyList)(xs));
    };
  }();
  var filterImpl = function(f, xs) {
    return xs.filter(f);
  };
  var sortByImpl = function() {
    function mergeFromTo(compare2, fromOrdering, xs1, xs2, from, to) {
      var mid;
      var i;
      var j;
      var k;
      var x;
      var y;
      var c;
      mid = from + (to - from >> 1);
      if (mid - from > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, from, mid);
      if (to - mid > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, mid, to);
      i = from;
      j = mid;
      k = from;
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
  var zipWithImpl = function(f, xs, ys) {
    var l = xs.length < ys.length ? xs.length : ys.length;
    var result = new Array(l);
    for (var i = 0; i < l; i++) {
      result[i] = f(xs[i])(ys[i]);
    }
    return result;
  };
  var allImpl = function(p, xs) {
    var len = xs.length;
    for (var i = 0; i < len; i++) {
      if (!p(xs[i]))
        return false;
    }
    return true;
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

  // output/Data.Bounded/foreign.js
  var topChar = String.fromCharCode(65535);
  var bottomChar = String.fromCharCode(0);
  var topNumber = Number.POSITIVE_INFINITY;
  var bottomNumber = Number.NEGATIVE_INFINITY;

  // output/Data.Eq/foreign.js
  var refEq = function(r1) {
    return function(r2) {
      return r1 === r2;
    };
  };
  var eqBooleanImpl = refEq;
  var eqArrayImpl = function(f) {
    return function(xs) {
      return function(ys) {
        if (xs.length !== ys.length)
          return false;
        for (var i = 0; i < xs.length; i++) {
          if (!f(xs[i])(ys[i]))
            return false;
        }
        return true;
      };
    };
  };

  // output/Data.Eq/index.js
  var eqBoolean = {
    eq: eqBooleanImpl
  };
  var eq = function(dict) {
    return dict.eq;
  };
  var eq2 = /* @__PURE__ */ eq(eqBoolean);
  var eqArray = function(dictEq) {
    return {
      eq: eqArrayImpl(eq(dictEq))
    };
  };
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

  // output/Data.Semiring/index.js
  var zero = function(dict) {
    return dict.zero;
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
  var negate = function(dictRing) {
    var sub12 = sub(dictRing);
    var zero2 = zero(dictRing.Semiring0());
    return function(a) {
      return sub12(zero2)(a);
    };
  };

  // output/Data.Ord/index.js
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
  var max = function(dictOrd) {
    var compare3 = compare(dictOrd);
    return function(x) {
      return function(y) {
        var v = compare3(x)(y);
        if (v instanceof LT) {
          return y;
        }
        ;
        if (v instanceof EQ) {
          return x;
        }
        ;
        if (v instanceof GT) {
          return x;
        }
        ;
        throw new Error("Failed pattern match at Data.Ord (line 181, column 3 - line 184, column 12): " + [v.constructor.name]);
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

  // output/Data.Show/foreign.js
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

  // output/Data.EuclideanRing/index.js
  var mod = function(dict) {
    return dict.mod;
  };
  var gcd = function(dictEq) {
    var eq4 = eq(dictEq);
    return function(dictEuclideanRing) {
      var zero2 = zero(dictEuclideanRing.CommutativeRing0().Ring0().Semiring0());
      var mod1 = mod(dictEuclideanRing);
      return function(a) {
        return function(b) {
          var $24 = eq4(b)(zero2);
          if ($24) {
            return a;
          }
          ;
          return gcd(dictEq)(dictEuclideanRing)(b)(mod1(a)(b));
        };
      };
    };
  };
  var div = function(dict) {
    return dict.div;
  };

  // output/Data.Array.ST/foreign.js
  var sortByImpl2 = function() {
    function mergeFromTo(compare2, fromOrdering, xs1, xs2, from, to) {
      var mid;
      var i;
      var j;
      var k;
      var x;
      var y;
      var c;
      mid = from + (to - from >> 1);
      if (mid - from > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, from, mid);
      if (to - mid > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, mid, to);
      i = from;
      j = mid;
      k = from;
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

  // output/Data.Function.Uncurried/foreign.js
  var runFn2 = function(fn) {
    return function(a) {
      return function(b) {
        return fn(a, b);
      };
    };
  };
  var runFn3 = function(fn) {
    return function(a) {
      return function(b) {
        return function(c) {
          return fn(a, b, c);
        };
      };
    };
  };

  // output/Data.Traversable/foreign.js
  var traverseArrayImpl = function() {
    function array1(a) {
      return [a];
    }
    function array2(a) {
      return function(b) {
        return [a, b];
      };
    }
    function array3(a) {
      return function(b) {
        return function(c) {
          return [a, b, c];
        };
      };
    }
    function concat2(xs) {
      return function(ys) {
        return xs.concat(ys);
      };
    }
    return function(apply2) {
      return function(map3) {
        return function(pure2) {
          return function(f) {
            return function(array) {
              function go(bot, top2) {
                switch (top2 - bot) {
                  case 0:
                    return pure2([]);
                  case 1:
                    return map3(array1)(f(array[bot]));
                  case 2:
                    return apply2(map3(array2)(f(array[bot])))(f(array[bot + 1]));
                  case 3:
                    return apply2(apply2(map3(array3)(f(array[bot])))(f(array[bot + 1])))(f(array[bot + 2]));
                  default:
                    var pivot = bot + Math.floor((top2 - bot) / 4) * 2;
                    return apply2(map3(concat2)(go(bot, pivot)))(go(pivot, top2));
                }
              }
              return go(0, array.length);
            };
          };
        };
      };
    };
  }();

  // output/Data.Array/index.js
  var append2 = /* @__PURE__ */ append(semigroupArray);
  var zipWith = /* @__PURE__ */ runFn3(zipWithImpl);
  var zip = /* @__PURE__ */ function() {
    return zipWith(Tuple.create);
  }();
  var range2 = /* @__PURE__ */ runFn2(rangeImpl);
  var filter = /* @__PURE__ */ runFn2(filterImpl);
  var cons = function(x) {
    return function(xs) {
      return append2([x])(xs);
    };
  };
  var all2 = /* @__PURE__ */ runFn2(allImpl);

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
    var abs3 = abs(dictOrd);
    return function(dictEuclideanRing) {
      var gcd1 = gcd2(dictEuclideanRing);
      var div3 = div(dictEuclideanRing);
      var Ring0 = dictEuclideanRing.CommutativeRing0().Ring0();
      var mul3 = mul(Ring0.Semiring0());
      var signum1 = signum2(Ring0);
      var abs1 = abs3(Ring0);
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
      var add3 = add(Semiring0);
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
            return reduce22(add3(mul3(v.value0)(v1.value1))(mul3(v.value1)(v1.value0)))(mul3(v.value1)(v1.value1));
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
    var eq4 = eq(dictEq);
    return {
      eq: function(v) {
        return function(v1) {
          return eq4(v.value0)(v1.value0) && eq4(v.value1)(v1.value1);
        };
      }
    };
  };
  var ordRatio = function(dictOrd) {
    var ringRatio1 = ringRatio(dictOrd);
    var Eq0 = dictOrd.Eq0();
    var eq4 = eq(Eq0);
    var greaterThan3 = greaterThan(dictOrd);
    var eqRatio1 = eqRatio(Eq0);
    return function(dictEuclideanRing) {
      var sub3 = sub(ringRatio1(dictEuclideanRing));
      var zero2 = zero(dictEuclideanRing.CommutativeRing0().Ring0().Semiring0());
      return {
        compare: function(x) {
          return function(y) {
            var v = sub3(x)(y);
            var $130 = eq4(v.value0)(zero2);
            if ($130) {
              return EQ.value;
            }
            ;
            var v1 = greaterThan3(v.value1)(zero2);
            var v2 = greaterThan3(v.value0)(zero2);
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

  // output/JS.BigInt/foreign.js
  var fromInt = (n) => BigInt(n);
  var toNumber = (n) => Number(n);
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

  // output/Data.Int/index.js
  var fromNumber = /* @__PURE__ */ function() {
    return fromNumberImpl(Just.create)(Nothing.value);
  }();

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
  var toInt = function($19) {
    return fromNumber(toNumber($19));
  };

  // output/Data.Rational/index.js
  var reduce2 = /* @__PURE__ */ reduce(ordBigInt)(euclideanRingBigInt);
  var toRationalBigInt = {
    toRational: function(a) {
      return function(b) {
        return reduce2(a)(b);
      };
    }
  };
  var semiringRational = /* @__PURE__ */ semiringRatio(ordBigInt)(euclideanRingBigInt);
  var ringRational = /* @__PURE__ */ ringRatio(ordBigInt)(euclideanRingBigInt);
  var ordRational = /* @__PURE__ */ ordRatio(ordBigInt)(euclideanRingBigInt);
  var toRational = function(dict) {
    return dict.toRational;
  };
  var numerator2 = function(v) {
    return numerator(v);
  };
  var denominator2 = function(v) {
    return denominator(v);
  };

  // output/Effect.Console/foreign.js
  var log2 = function(s) {
    return function() {
      console.log(s);
    };
  };

  // output/Main/index.js
  var greaterThan2 = /* @__PURE__ */ greaterThan(ordBigInt);
  var eq3 = /* @__PURE__ */ eq(eqBigInt);
  var map2 = /* @__PURE__ */ map(functorArray);
  var mul2 = /* @__PURE__ */ mul(semiringBigInt);
  var add2 = /* @__PURE__ */ add(semiringBigInt);
  var toRational2 = /* @__PURE__ */ toRational(toRationalBigInt);
  var sub1 = /* @__PURE__ */ sub(ringRational);
  var lessThan2 = /* @__PURE__ */ lessThan(ordBigInt);
  var add1 = /* @__PURE__ */ add(semiringRational);
  var lessThanOrEq2 = /* @__PURE__ */ lessThanOrEq(ordRational);
  var sub2 = /* @__PURE__ */ sub(ringBigInt);
  var greaterThanOrEq2 = /* @__PURE__ */ greaterThanOrEq(ordRational);
  var max3 = /* @__PURE__ */ max(ordBigInt);
  var div2 = /* @__PURE__ */ div(euclideanRingBigInt);
  var map1 = /* @__PURE__ */ map(functorFn);
  var bind2 = /* @__PURE__ */ bind(bindArray);
  var mod2 = /* @__PURE__ */ mod(euclideanRingBigInt);
  var notEq2 = /* @__PURE__ */ notEq(/* @__PURE__ */ eqArray(eqBigInt));
  var notEq1 = /* @__PURE__ */ notEq(eqBigInt);
  var range3 = function(a) {
    return function(b) {
      if (greaterThan2(a)(b)) {
        return [];
      }
      ;
      if (eq3(a)(b)) {
        return [a];
      }
      ;
      if (otherwise) {
        var v = toInt(b);
        var v1 = toInt(a);
        if (v1 instanceof Just && v instanceof Just) {
          return map2(fromInt)(range2(v1.value0)(v.value0));
        }
        ;
        return [];
      }
      ;
      throw new Error("Failed pattern match at Main (line 76, column 1 - line 76, column 42): " + [a.constructor.name, b.constructor.name]);
    };
  };
  var initial = function(q) {
    return function(n) {
      var delta1 = range3(fromInt(1))(mul2(fromInt(n - 1 | 0))(q));
      var d1 = map2(function(v) {
        return add2(q)(v);
      })(delta1);
      return zip(map2(function(v) {
        return cons(v)([]);
      })(d1))(zip(d1)(zip(map2(function(v) {
        return toRational2(fromInt(1))(v);
      })(d1))(zip(delta1)(map2(function(v) {
        return mul2(v)(q);
      })(d1)))));
    };
  };
  var $$final = function(q) {
    return function(s$prime) {
      var f = function(v) {
        var residue = sub1(toRational2(fromInt(1))(q))(v.value1.value1.value0);
        var z = denominator2(residue);
        var $58 = eq3(numerator2(residue))(fromInt(1)) && lessThan2(v.value1.value0)(z);
        if ($58) {
          return cons(z)(v.value0);
        }
        ;
        return [];
      };
      return map2(f)(s$prime);
    };
  };
  var bound = function(from) {
    return function(n) {
      if (n === 1) {
        return toRational2(fromInt(1))(from);
      }
      ;
      if (otherwise) {
        return add1(toRational2(fromInt(1))(from))(bound(add2(from)(fromInt(1)))(n - 1 | 0));
      }
      ;
      throw new Error("Failed pattern match at Main (line 70, column 1 - line 70, column 35): " + [from.constructor.name, n.constructor.name]);
    };
  };
  var limit = function(r) {
    return function(p) {
      return function(n) {
        if (lessThanOrEq2(r)(toRational2(fromInt(0))(fromInt(1)))) {
          return sub2(p)(fromInt(1));
        }
        ;
        if (otherwise) {
          var go = function($copy_i) {
            var $tco_done = false;
            var $tco_result;
            function $tco_loop(i) {
              var $72 = greaterThanOrEq2(bound(add2(i)(fromInt(1)))(n))(r);
              if ($72) {
                $copy_i = add2(i)(fromInt(1));
                return;
              }
              ;
              $tco_done = true;
              return i;
            }
            ;
            while (!$tco_done) {
              $tco_result = $tco_loop($copy_i);
            }
            ;
            return $tco_result;
          };
          return go(sub2(p)(fromInt(1)));
        }
        ;
        throw new Error("Failed pattern match at Main (line 87, column 1 - line 87, column 45): " + [r.constructor.name, p.constructor.name, n.constructor.name]);
      };
    };
  };
  var step = function(q) {
    return function(n) {
      return function(v) {
        var dmin = max3(add2(v.value1.value0)(fromInt(1)))(add2(div2(v.value1.value1.value1.value1)(v.value1.value1.value1.value0))(fromInt(1)));
        var dmax = limit(sub1(toRational2(fromInt(1))(q))(v.value1.value1.value0))(dmin)(n);
        var d = range3(dmin)(dmax);
        var delta = map2(function($97) {
          return function(v1) {
            return sub2(v1)(v.value1.value1.value1.value1);
          }(function(v1) {
            return mul2(v1)(v.value1.value1.value1.value0);
          }($97));
        })(d);
        var pdelta$prime = map2(function(v1) {
          return mul2(v1)(v.value1.value1.value1.value0);
        })(delta);
        var pd$prime = map2(map1(function(v1) {
          return mul2(v1)(v.value1.value1.value1.value0);
        })(function(v1) {
          return mul2(v1)(v.value1.value1.value1.value1);
        }))(d);
        return zip(map2(function(v1) {
          return cons(v1)(v.value0);
        })(d))(zip(d)(zip(map2(function($98) {
          return function(v1) {
            return add1(v1)(v.value1.value1.value0);
          }(function(v1) {
            return toRational2(fromInt(1))(v1);
          }($98));
        })(d))(zip(pdelta$prime)(pd$prime))));
      };
    };
  };
  var steps = function($copy_v) {
    return function($copy_v1) {
      return function($copy_v2) {
        var $tco_var_v = $copy_v;
        var $tco_var_v1 = $copy_v1;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(v, v1, v2) {
          if (v1 === 1) {
            $tco_done = true;
            return v2;
          }
          ;
          $tco_var_v = v;
          $tco_var_v1 = v1 - 1 | 0;
          $copy_v2 = bind2(v2)(step(v)(v1));
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
  var egyptian = function(u) {
    return function(d) {
      return function(n) {
        if (greaterThan2(u)(fromInt(1)) && n === 1) {
          return [];
        }
        ;
        if (greaterThan2(u)(fromInt(1))) {
          return map2(function(qs) {
            return map2(function(v) {
              return div2(v)(u);
            })(qs);
          })(filter(function(qs) {
            return all2(function(v) {
              return eq3(v)(fromInt(0));
            })(map2(function(v) {
              return mod2(v)(u);
            })(qs));
          })(egyptian(fromInt(1))(d)(n)));
        }
        ;
        if (eq3(u)(fromInt(1)) && n === 1) {
          return [[d]];
        }
        ;
        if (otherwise) {
          return filter(function(v) {
            return notEq2(v)([]);
          })($$final(d)(steps(d)(n - 1 | 0)(initial(d)(n))));
        }
        ;
        throw new Error("Failed pattern match at Main (line 131, column 1 - line 131, column 60): " + [u.constructor.name, d.constructor.name, n.constructor.name]);
      };
    };
  };
  var main = /* @__PURE__ */ log2(/* @__PURE__ */ show(/* @__PURE__ */ showArray(/* @__PURE__ */ showArray(showBigInt)))(/* @__PURE__ */ function() {
    var g = function(v) {
      if (v.length === 6) {
        return eq3(mod2(v[0])(fromInt(2)))(fromInt(1)) && (notEq1(mod2(v[0])(fromInt(5)))(fromInt(0)) && (notEq1(mod2(v[0])(fromInt(7)))(fromInt(0)) && (notEq1(mod2(v[0])(fromInt(11)))(fromInt(0)) && (notEq1(mod2(v[0])(fromInt(13)))(fromInt(0)) && (notEq1(mod2(v[0])(fromInt(17)))(fromInt(0)) && notEq1(mod2(v[0])(fromInt(19)))(fromInt(0)))))));
      }
      ;
      return false;
    };
    return filter(g)(egyptian(fromInt(1))(fromInt(1))(6));
  }()));

  // <stdin>
  main();
})();
