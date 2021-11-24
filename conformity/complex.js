function cplx(a, b) {
    return {re: a, im: b};
}

function add(z1, z2) {
    return {re: z1.re + z2.re, im: z1.im + z2.im};
}

function conj(z) {
    return {re: z.re, im: -z.im};
}

function sqmod(z) {
    return z.re * z.re + z.im * z.im;
}

function mul(z1, z2) {
    return {re: z1.re * z2.re - z1.im * z2.im, im: z1.re * z2.im + z1.im * z2.re};
}

function sub(z1, z2) {
    return add(z1, mul(cplx(-1.0,0.0), z2));
}

function inv(z) {
    var m2 = sqmod(z);
    return {re: z.re / m2, im: - z.im / m2};
}

function div(z1, z2) {
    return mul(z1, inv(z2));
}

function sqrt(z2) {
    var s = Math.sqrt(Math.sqrt(sqmod(z2))+z2.re);
    var s2 = Math.sqrt(2.0);
    var z = cplx(s/s2, z2.im / (s*s2));
    return [z, mul(cplx(-1.0,0.0),z)];
}

function exp(z) {
    return {re: Math.exp(z.re) * Math.cos(z.im), im: Math.exp(z.re) * Math.sin(z.im)};
}

function log(z) {
    var a = Math.atan2(z.im, z.re);
    return {re: Math.log(sqmod(z))/2, im: a};
}

function power(z, n) {
    return exp(mul(n,log(z)));
}

function cos(z) {
    return div(add(exp(mul(z,cplx(0,1))),exp(mul(z,cplx(0,-1)))),cplx(2,0));
}

function sin(z) {
    return div(sub(exp(mul(z,cplx(0,1))),exp(mul(z,cplx(0,-1)))),cplx(0,2));
}

function tan(z) {
    return div(sin(z), cos(z));
}

function asin(z) { // sin(asin(z)) == z but asin(sin(z)) not necessarly
    return mul(cplx(0,-1),log(add(sqrt(sub(cplx(1,0),mul(z,z)))[0],mul(cplx(0,1),z))));
}

function acos(z) {
    return sub(cplx(Math.PI/2,0), asin(z));
}

function atan(z) {
    return mul(cplx(0,-0.5),log(div(sub(cplx(0,1),z),add(cplx(0,1),z))));
}

function affix(pt) {
    return {re: x(pt), im: y(pt)};
}

function middle(ptM, ptN) {
    return div(add(affix(ptM), affix(ptN)), cplx(2.0,0.0));
}

function isobar(ptL, ptM, ptN) {
    return div(add(affix(ptL),add(affix(ptM), affix(ptN))), cplx(3.0,0.0));
}

function rotate(zc, a, z) {
    return add(zc,mul(sub(z,zc),exp(cplx(0,a))));
}

function degrees(z) {
    return 180.0*Math.atan2(z.im, z.re)/Math.PI;
}


