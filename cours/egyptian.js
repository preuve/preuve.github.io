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

  // output/Data.Boolean/index.js
  var otherwise = true;

  // output/Data.Function/index.js
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

  // output/Data.Functor/index.js
  var map = function(dict) {
    return dict.map;
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

  // output/Control.Applicative/index.js
  var pure = function(dict) {
    return dict.pure;
  };
  var applicativeArray = {
    pure: function(x) {
      return [x];
    },
    Apply0: function() {
      return applyArray;
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
  var unconsImpl = function(empty2, next, xs) {
    return xs.length === 0 ? empty2({}) : next(xs[0])(xs.slice(1));
  };
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

  // output/Data.Eq/index.js
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
    var eq3 = eq(dictEq);
    return function(dictEuclideanRing) {
      var zero2 = zero(dictEuclideanRing.CommutativeRing0().Ring0().Semiring0());
      var mod1 = mod(dictEuclideanRing);
      return function(a) {
        return function(b) {
          var $24 = eq3(b)(zero2);
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
        return function(pure3) {
          return function(f) {
            return function(array) {
              function go(bot, top2) {
                switch (top2 - bot) {
                  case 0:
                    return pure3([]);
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
    var gcd3 = gcd(dictOrd.Eq0());
    var signum2 = signum(dictOrd);
    var abs3 = abs(dictOrd);
    return function(dictEuclideanRing) {
      var gcd1 = gcd3(dictEuclideanRing);
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
      var sub2 = sub(Ring0);
      var mul3 = mul(Ring0.Semiring0());
      var semiringRatio2 = semiringRatio1(dictEuclideanRing);
      return {
        sub: function(v) {
          return function(v1) {
            return reduce22(sub2(mul3(v.value0)(v1.value1))(mul3(v.value1)(v1.value0)))(mul3(v.value1)(v1.value1));
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
    const xx = x < 0n ? -x : x;
    return BigInt.asIntN(32, xx > 2147483647n ? 2147483647n : xx);
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
  var toRationalBigInt = {
    toRational: function(a) {
      return function(b) {
        return reduce2(a)(b);
      };
    }
  };
  var ringRational = /* @__PURE__ */ ringRatio(ordBigInt)(euclideanRingBigInt);
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
  var add2 = /* @__PURE__ */ add(semiringBigInt);
  var eq2 = /* @__PURE__ */ eq(eqBigInt);
  var toRational2 = /* @__PURE__ */ toRational(toRationalBigInt);
  var lessThan2 = /* @__PURE__ */ lessThan(ordBigInt);
  var map2 = /* @__PURE__ */ map(functorArray);
  var div2 = /* @__PURE__ */ div(euclideanRingBigInt);
  var mod2 = /* @__PURE__ */ mod(euclideanRingBigInt);
  var bind2 = /* @__PURE__ */ bind(bindArray);
  var mul2 = /* @__PURE__ */ mul(semiringBigInt);
  var sub1 = /* @__PURE__ */ sub(ringRational);
  var pure2 = /* @__PURE__ */ pure(applicativeArray);
  var gcd2 = /* @__PURE__ */ gcd(eqBigInt)(euclideanRingBigInt);
  var range2 = function(a) {
    return function(b) {
      if (greaterThan2(a)(b)) {
        return [];
      }
      ;
      if (otherwise) {
        return cons(a)(range2(add2(a)(fromInt(1)))(b));
      }
      ;
      throw new Error("Failed pattern match at Main (line 40, column 1 - line 40, column 42): " + [a.constructor.name, b.constructor.name]);
    };
  };
  var growing = function(xs) {
    var v = uncons(xs);
    if (v instanceof Just) {
      var v1 = uncons(v.value0.tail);
      if (v1 instanceof Just) {
        return lessThan2(v.value0.head)(v1.value0.head) && growing(v.value0.tail);
      }
      ;
      return true;
    }
    ;
    return true;
  };
  var egsumPrime = function(u) {
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
              return eq2(v)(fromInt(0));
            })(map2(function(v) {
              return mod2(v)(u);
            })(qs));
          })(egsum(fromInt(1))(d)(n)));
        }
        ;
        if (eq2(u)(fromInt(1)) && n === 1) {
          return [[d]];
        }
        ;
        if (otherwise) {
          return bind2(range2(add2(d)(fromInt(1)))(mul2(d)(fromInt(3))))(function(q) {
            var f = sub1(toRational2(fromInt(1))(d))(toRational2(fromInt(1))(q));
            return bind2(egsum(numerator2(f))(denominator2(f))(n - 1 | 0))(function(e) {
              return pure2(cons(q)(e));
            });
          });
        }
        ;
        throw new Error("Failed pattern match at Main (line 51, column 1 - line 51, column 62): " + [u.constructor.name, d.constructor.name, n.constructor.name]);
      };
    };
  };
  var egsum = function(u) {
    return function(d) {
      return function(n) {
        var g = gcd2(u)(d);
        return filter(growing)(egsumPrime(div2(u)(g))(div2(d)(g))(n));
      };
    };
  };
  var main = /* @__PURE__ */ log2(/* @__PURE__ */ show(/* @__PURE__ */ showArray(/* @__PURE__ */ showArray(showBigInt)))(/* @__PURE__ */ egsum(/* @__PURE__ */ fromInt(1))(/* @__PURE__ */ fromInt(1))(5)));

  // <stdin>
  main();
})();
