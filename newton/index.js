/*
function trim(pol) {
    if (pol.length == 0) return pol;
    if (pol[pol.length-1] == 0) return trim(pol.slice(0, pol.length - 1));
    return pol;
}

function dominantMonom(pol) {
    var d = pol.length - 1;
    return {degree: d, coefficient: pol[d]};
}

function image(pol,z) {
    switch(pol.length) {
        case 0: return 0;
        default: return pol[0] + z * image(pol.slice(1),z);
    }
}

function roots(pnum) {
    var dominant = dominantMonom(pnum);
    var unitary = pnum.map(x => x/dominant.coefficient);
    var z0 = cplx(1.2, 3.4);
    var indices = Array.from({length: dominant.degree}, (_, i) => i);
    var candidates = indices.map(i => power(z0, cplx(i, 0)));
    var f = function(goods, err) {
        if (err < 1e-7) return goods;
        else {
            var improveAt = function(i) { 
                 var good = goods[i];
                 var one = cplx(1,0);
                 var prod = indices.reduce((j,acc) => i==j ? acc : acc * (good - goods[j]), one);
                 return good - (image(unitary,good)/ prod);
            };
            var betters = indices.map(i => improveAt(i));
            //var residue = unitary - (product $ (\z -> one^1 - z^0) <$> betters)
            //var error = fromMaybe 0.0 $ 
             // maximum $ sqrt <$> magnitudeSquared <$> 
             //   snd <$> (toUnfoldable residue :: Array _);
            
            var error = 0;
            return f(betters, error);
        }
    };
    return f(candidates, 1.0);
}
*/

function factorial (n) {
    return n==0 ? 1 : n * factorial(n-1);
}

function init() {
  var poles = [2,5,11];
    var zeros = [3,7,13];

    var nz = zeros.length;
    var np = poles.length;
    
    var f = (n,r) => r.map(z => Math.pow(z,n));

    var plus = (j,acc)=>j+acc;
    var g = n => f(n,zeros).reduce(plus,0) - f(n,poles).reduce(plus,0);
    var j = Array.from({length: nz+np+1}, (_,i)=> i).map(x=>nz<=np?g(x):-g(x));
    
    var h = (n,i) => factorial(n-1) / factorial(n-i);

    var k = [1];
    for (var n=1; n<nz+np+1; n++) {
        k = [...k,Array.from({length: n}, (_,i) => h(n,i+1) * j[i+1] * k[n-i-1]).reduce(plus,0)];
    }

    var s = function (z,p) {
        if(z == 0 || p == 0) return -j[1];
        if(z == 1 || p==1) return 2 * k[z+p] / ((z+p) * k[z+p-1]) - j[1];
        
        var s1m = s(z-1,p-1);
        if(z<=p){
            var s1 = s(z-1,p);
            var s1p = s(z-1,p+1);
            var s2 = s(z-2,p);
            }
            else {
            var s1 = s(z,p-1);
            var s1p = s(z+1,p-1);
            var s2 =  s(z,p-2);            
            }
        return (s1p*(s1-s2)-s1*(s1m-s2)) / (s1-s1m);
    };

//    return {k,j,s:[s(1,1),s(1,2),s(1,3),s(1,4),s(1,5),s(1,6),s(2,3),s(2,4),s(2,5),s(3,4)]};//s(nz,np);
    return {k,j,s:Array.from({length:49},(_,i)=>s((i-i%7)/7,i%7))};//s(nz,np);
//if s(nz,np) = reduce(+, append(zeros, poles)) then "QED"

}


