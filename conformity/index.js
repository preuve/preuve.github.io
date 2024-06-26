function f(z) {
    var one = cplx(0.25,0);
    return atan(z);//power(z,z);//div(mul(z,z),add(z,cplx(1,0)));//div(sub(z,one),sub(conj(z), one));//inv(div(log(z),exp(z)));//mul(mul(z,z),z);//mul(z,z);//
}

function init() {
    var svg = document.getElementById("drawing");
    var i, j;
    var xmin = -3*Math.PI;
    var xmax = 3*Math.PI;
    var ymin = -Math.PI/3.25;
    var ymax = Math.PI/3.25;
    var n=33;
    var d=Math.min((xmax-xmin)/n, (ymax-ymin)/n);
    var nx = Math.ceil((xmax-xmin)/d);
    var ny = Math.ceil((ymax-ymin)/d);
    var z,color;
    var kx, dy;
    
    var mode = "group_square";
    
    if(mode=="group_square") {
        dy = _ => 0;
        kx = 1;
    }
    if (mode=="group_hexagonal") {
        dy = i => i%2==0 ? 0 : d/2;
        kx = Math.sqrt(3)/2
    }
    
    for (i=0; i<nx;i++){
        for(j=1;j<ny;j++){
            z = {re: xmin+d*i*kx, im: ymin+d*j+dy(i)};
            color = charte(z);
            addTile(svg, z.re, z.im, d/2, "rgb("+255*color.r+","+255*color.b+","+255*color.g+")");
        }
    }
}

function addTile(svg, cx, cy, r, color) {
    var lineWidth = 0.003;
    var a, n, fz, fcenter, fr;
    var mode = "tile_hexagonal";

    if(mode == "tile_composite") {
        // General case (long) -> compute each point
        var detail = 80;
        for (n=0; n<detail; n++) {
            a=n*Math.PI*2/detail;
            fz = f({re: cx+r*Math.cos(a), im: cy+r*Math.sin(a)});
            addDot(svg, fz.re, fz.im, lineWidth, color);
        }
    }
    if (mode == "tile_circle") {
        // Conformal case -> compute any point
        fcenter = f(cplx(cx,cy));
        fz = f(cplx(cx+r,cy));
        addDot(svg, fcenter.re, fcenter.im, Math.sqrt(sqmod(sub(fz,fcenter))), color);
    }
    
    if (mode == "tile_square") {
        var center = cplx(cx,cy);
        var z = cplx(cx+r*1.1,cy);
        ftl = f(rotate(center, 3*Math.PI/4, z));
        ftr = f(rotate(center, Math.PI/4, z));
        fbl = f(rotate(center, -3*Math.PI/4, z));
        fbr = f(rotate(center, -Math.PI/4, z));
        addClosedPath(svg, [ftl, ftr, fbr, fbl], color);
    }

    if (mode == "tile_hexagonal") {
        var center = cplx(cx,cy);
        var e = cplx(cx+r*1.1,cy);
        fe = f(e);
        fne = f(rotate(center, Math.PI/3, e));
        fnw = f(rotate(center, 2*Math.PI/3, e));
        fw = f(rotate(center, Math.PI, e));
        fsw = f(rotate(center, -2*Math.PI/3, e));
        fse = f(rotate(center, -Math.PI/3, e));
        addClosedPath(svg, [fe,fne,fnw,fw,fsw,fse], color);
    }
}

function addDot(svg, cx, cy, r, color) {
    let newCirc = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    newCirc.setAttributeNS(null, "cx", cx);
    newCirc.setAttributeNS(null, "cy", cy);
    newCirc.setAttributeNS(null, "r", r);
    newCirc.setAttributeNS(null, "fill", color);
    svg.appendChild(newCirc);
}

function addClosedPath(svg, zs, color) {
    
    let newPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    let data = "M " + zs[0].re + " " + zs[0].im + " ";
    for (var i=1; i<zs.length; i++) {
        data = data + "L " + zs[i].re + " " + zs[i].im + " ";
    }
    data = data + "Z";
    newPath.setAttributeNS(null, "d", data);
    newPath.setAttributeNS(null, "fill", color);
    svg.appendChild(newPath);
}

function charte(p) {
    var x = p.re, y = p.im;
 
    return trilinear(
        { r: 1, g: 1, b: 1 },
        { r: 1, g: 0, b: 1 },
        { r: 0, g: 1, b: 1 }, 
        { r: 1, g: 1, b: 0 },
        { r: 0, g: 1, b: 0 },
        { r: 0, g: 0, b: 1 },
        { r: 1, g: 0, b: 0 },
        { r: 0, g: 0, b: 0 },
        (2*x/(1+x*x+y*y)+1)/2,
        (2*y/(1+x*x+y*y)+1)/2,
        ((-1+x*x+y*y)/(1+x*x+y*y)+1)/2,
     );
}

function trilinearScalaire(
    f000, f001, f010, f011,
    f100, f101, f110, f111,
    x, y, z
) {
    var f00 = (1-x)*f000 + x*f100;
    var f01 = (1-x)*f001 + x*f101;
    var f10 = (1-x)*f010 + x*f110;
    var f11 = (1-x)*f011 + x*f111;

    var f0 = (1-y)*f00 + y*f10;
    var f1 = (1-y)*f01 * y*f11;

    return (1-z)*f0 + z*f1;
}

function trilinear(
    f000, f001, f010, f011,
    f100, f101, f110, f111,
    x, y, z
) {
    return {
        r: trilinearScalaire(
            f000.r, f001.r, f010.r, f011.r,
            f100.r, f101.r, f110.r, f111.r,
            x, y, z
        ),
        g: trilinearScalaire(
            f000.g, f001.g, f010.g, f011.g,
            f100.g, f101.g, f110.g, f111.g,
            x, y, z
        ),
        b: trilinearScalaire(
            f000.b, f001.b, f010.b, f011.b,
            f100.b, f101.b, f110.b, f111.b,
            x, y, z
        )
    };
}

