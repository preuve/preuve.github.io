function x(pt) {
    return parseFloat(pt.getAttribute("cx"));
}

function y(pt) {
    return parseFloat(pt.getAttribute("cy"));
}

function updateLine(line, ptM, ptN) {
    line.setAttributeNS(null, "x1", x(ptM));
	line.setAttributeNS(null, "y1", y(ptM));
	line.setAttributeNS(null, "x2", x(ptN));
	line.setAttributeNS(null, "y2", y(ptN));
}

function foci(ptA, ptB, ptC) {
    var zA = affix(ptA);
    var zB = affix(ptB);
    var zC = affix(ptC);
    
    var a = cplx(3.0,0.0);
    var b = mul(cplx(-2.0,0.0),add(zA,add(zB,zC)));
    var c = add(mul(zA,zB),add(mul(zA,zC),mul(zB,zC)));
    
    var delta = sub(mul(b,b),mul(cplx(4.0,0.0),mul(a,c)));
    var s = sqrt(delta);
    var f1 = div(add(b,s[0]),mul(cplx(-2.0,0.0),a));
    var f2 = div(add(b,s[1]),mul(cplx(-2.0,0.0),a));
    return [f1,f2];
}

function updatePoint(pt, abs, ord) {
    pt.setAttributeNS(null, "cx", abs);
    pt.setAttributeNS(null, "cy", ord);
}

function drag(evt) {
  if (selectedElement) {
    evt.preventDefault();
    var coord = getMousePosition(evt);
    //transform.setTranslate(coord.x - offset.x, coord.y - offset.y);
    updatePoint(selectedElement, coord.x, coord.y);
    
	var ptA = document.getElementById("pointA");
	var ptB = document.getElementById("pointB");
	var ptC = document.getElementById("pointC");
	
	updateLine(document.getElementById("lineAB"), ptA, ptB);
	updateLine(document.getElementById("lineAC"), ptA, ptC);
	updateLine(document.getElementById("lineBC"), ptB, ptC);  

	var zAA = middle(ptB, ptC);
	updatePoint(document.getElementById("pointAA"), zAA.re, zAA.im);
	var zBB = middle(ptA, ptC);
	updatePoint(document.getElementById("pointBB"), zBB.re, zBB.im);
	var zCC = middle(ptA, ptB);
	updatePoint(document.getElementById("pointCC"), zCC.re, zCC.im);
    
	var zS = isobar(ptA, ptB, ptC);
	updatePoint(document.getElementById("pointS"), zS.re, zS.im);
    
    var fs = foci(ptA,ptB,ptC);
    updatePoint(document.getElementById("pointF1"), fs[0].re, fs[0].im);
    updatePoint(document.getElementById("pointF2"), fs[1].re, fs[1].im);
  
    var e = document.getElementById("ellipse");
    e.setAttributeNS(null, "cx", zS.re);
    e.setAttributeNS(null, "cy", zS.im);
    e.setAttributeNS(null, 
        "transform", 
        "rotate(" + degrees(sub(fs[0],zS)) + "," + zS.re + "," + zS.im + ")"
        );
    var ab = sub(affix(ptB),affix(ptA));
    var bc = sub(affix(ptC),affix(ptB));
    var ca = sub(affix(ptA),affix(ptC));
    var m = (sqmod(ab) + sqmod(bc) + sqmod(ca)) / 2.0;
    var n = Math.abs(ab.re*bc.im-ab.im*bc.re) * Math.sqrt(3.0);
    var a = (Math.sqrt(m+n)+Math.sqrt(m-n))/6.0;
	var b = (Math.sqrt(m+n)-Math.sqrt(m-n))/6.0;
	e.setAttributeNS(null, "rx", a);
    e.setAttributeNS(null, "ry", b);
    
	}
}

