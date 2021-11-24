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

function affix(pt) {
    return {re: x(pt), im: y(pt)};
}

function middle(ptM, ptN) {
    return div(add(affix(ptM), affix(ptN)), cplx(2.0,0.0));
}

function isobar(ptL, ptM, ptN) {
    return div(add(affix(ptL),add(affix(ptM), affix(ptN))), cplx(3.0,0.0));
}

function degrees(z) {
    return 180.0*Math.atan2(z.im, z.re)/Math.PI;
}


