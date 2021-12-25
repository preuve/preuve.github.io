function init() {
    
}

function generalizedPentagonal(n) {
    var k;
    var f = k => k*(3n*k-1n)/2n;
    if(n%2n==0n) return f(-n/2n);
    else return f((n+1n)/2n);
}

function partitionNumber(n) {
    return amazing(_=>1n)(n); 
}

function sumDivisors(n) {
    return amazing(n=>n)(n);     
}

var memoize = function (passedFunc) {
    var cache = {};
    return function (key) {
        if (key in cache) {} else cache[key] = {};
        return function (x) {
        if (x in cache[key])  return cache[key][x];
        return cache[key][x] = passedFunc(key) (x);
    };
}
};

var amazing = memoize(function (key){ return function(n) {
    var k=1n;
    var parity = 1n;
    var g=1n;
    
    var p=0n;
    while(n-g>=0n){
        p+=parity*(n==g?key(n):amazing(key)(n-g));
        k++;
        g=generalizedPentagonal(k);
        if((k+1n)%2n==0n) parity *=(-1n);
    }
    return p;
};});

let numberOfDivisors = function(n) {
    var d = 0n;
    for (i = 1n; i<=n; i++) {
        if(n%i == 0) d++;
    }
    return d;
}

function numberOfEgyptianFirstTermsOfOneOver(n) {
    return (numberOfDivisors(n*n) + 1n) / 2n - 1n;
}

function egyptianCoupleOfOneOver(n) {
    var q = new Rational(1n, n);
    var d, ts = [];
    for (let t = n+1n; t<2n * n; t++) {
        d = q.sub((new Rational(1n, t)));
        d.normalize(); 
        if(d.numerator == 1n) ts.push([t,d.denominator]); 
    }
    return ts;
}

function convertDoubleOneOver(n) {
    if(n==2n) return [[2n,3n,6n]];
    //if(n%2n==0n) return [[n/2n]];
    var cs = egyptianCoupleOfOneOver(n);
    return cs.filter(c=>c[0]%2n==0n&&c[1]%2n==0n).map(c=>[c[0]/2n,c[1]/2n]); 
}


let remove = (arr, val) => {
    var i = arr.findIndex(x => x == val);
    return arr.slice(0,i).concat(arr.slice(i+1));
};

function step(ns) {
    var i=0;
    var j;
    var rep;
    do {
        j = ns.slice(i+1).findIndex(x=>x==ns[i]);
        if(j<0) {
            i++;
            continue;
        }
        rep = convertDoubleOneOver(ns[i]);
        ns = ns.slice(0, i).concat(ns.slice(i+1,i+1+j)).concat(ns.slice(i+j+2)).concat(rep[rep.length-1]);
        break;
        } while(i<ns.length);
    return ns;
}

function steps(ns,cpt) {
    if (cpt==0) return ns;
    return steps(step(ns),cpt-1); 
}
