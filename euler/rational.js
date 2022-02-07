
let gcd = (a, b) => a > b ? gcd(b,a) : (a==0n ? b : gcd(b%a,a));
let abs = a => a < 0n ? -a : a;
let sign = a => a < 0n ? -1n : 1n;
let increasing = (a, b) => {
    if(a > b) {
        return 1;
    } else if (a < b){
        return -1;
    } else {
        return 0;
    }
};

let sqrt = function (a) {

    let iter = x => (x + a / x) / 2n;

    var b, c = a;
    do {
        b = c;
        c = iter(b);
    } while(c < b);
    return b;
};

class Rational {
    numerator;
    denominator;

    constructor(x,y) {
        this.numerator = x;
        this.denominator = y;
    }

    normalize() {
        if (this.denominator < 0n) {
            this.numerator *= -1n;
            this.denominator *= -1n;
        }
        let g = gcd(abs(this.numerator), this.denominator);
        this.numerator /= g;
        this.denominator /= g;
    }

    add(that) {
        let q = new Rational(
            this.numerator * that.denominator 
                + this.denominator * that.numerator,
            this.denominator * that.denominator);
        q.normalize();
        return q;
    }

    sub(that) {
        let q = new Rational(
            this.numerator * that.denominator 
                - this.denominator * that.numerator,
            this.denominator * that.denominator);
        q.normalize();
        return q;
    }

    mul(that) {
        let q = new Rational(this.numerator * that.numerator,
                             this.denominator * that.denominator);
        q.normalize();
        return q;
    }

    inv() {
        let q = new Rational(this.denominator, this.numerator);
        q.normalize();
        return q;
    }

    div(that) {
        return this.mul(that.inv());
    }

    sqrt() {
        return new Rational (sqrt(this.numerator), sqrt(this.denominator));
    }
    
    equals(that) {
        return this.sub(that).numerator == 0n;
    }

    // fraction p/q as sum of t natural inverses
    egyptian(t) {
        let p = this.numerator;
        let q = this.denominator;

        // first : find the t-terms sums of 1/q
        let sums = egyptianSearch(q,t);

        // then : divide by m those which can be
        return sums
            .filter(arr => arr.every(x => x%p == 0n && x != p))
            .map(arr => arr.map(x => x/p));
    }
}

var getAllSubsets = (nums) => {
  const subsets = [[]];
  for (n of nums) {
    subsets.map((el) => {
      subsets.push([...el, n]);
    });
  }
  return subsets;
};

// unordered partitions of integer n into sums of integers
var partitions = (n) => {
    let ps = [];
    for (let p = 0; p < 2 ** (n-1); p++) {
        let bits = p.toString(2).padStart(n, '0').padEnd(n+1, '0');
        let partition = [];
        let b = 0;
        let i = 1;
        while(i < bits.length) {
            if(bits[i] == 0) {
                partition.push(BigInt(i-b));
                b = i;
            }
            i++;
        }
        ps.push(partition);
    }
    return ps;
};

var cumul = (v) => {
    let a = v.reduce((acc,x) => {return {s:acc.s+x, arr:acc.arr.concat([acc.s+x]) };}, {s:0n, arr:[]});
    return a.arr;
};

var bruteForceEgyptian = (q, inf, sup) => {
    let es = [];
    for (let p of partitions(sup-inf)) {
        let e = cumul(p).map(x=> x + BigInt(inf));
        if (e.reduce((sum, i) => sum.add(new Rational(1n, i)), new Rational(0n, 1n)).equals(q)) {
            es.push(e);
        }
    }
    return es;
};



var egyptianSearch = (q,t) => {
    var delta = Array.from({length: t-1}, (_,__) => 1n);
    var sol = [];
    var running = t-2;
    
    while (delta[0] < BigInt(t - 1) *  q) {
         var lastD = q, d = q, mulD = q, mulDs = [q];
         var lastDelta = 1n, mulDelta = 1n;
         let del;
         let denos = [];
         for (let i=1; i<t+1; i++) {
             if(i==t)del=0n;else del=delta[i-1];
             d = del + mulD;
             mulD *= d;
             mulDs.push(mulD);
             if (lastDelta * lastD >= d) continue;
             if (d % mulDelta != 0n) continue;
             denos.push(d/mulDelta);
             lastD = d;
             lastDelta = del;
             mulDelta *= del;
         }

        if(delta[running] <= BigInt(t-1-running) * mulDs[running]) { 
            if(denos.length == t) sol.push(denos);
        }
        else if(running>0){
            do { 
                running--;
                delta[running]++;
                for (let i = running+1; i < t-1; i++) delta[i] = 1n;
            } while(delta[running] > BigInt(t-1-running)*mulDs[running]);
            running = t-2;
            delta[running]--;
        }
         delta[running]++;
    }
    return sol;
} 
