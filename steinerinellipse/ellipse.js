var shapeSlider = function(slider, attrName) {
	var value = slider.value;
	var circle = document.getElementById("ellipse");
	circle.setAttributeNS(null, "transform", "rotate(0)");
	circle.setAttributeNS(null, attrName, value);
};

var rotEllipseSlider = function(slider) {
	var value = slider.value;
	var circle = document.getElementById("ellipse");
	var x = circle.getAttribute("cx");
	var y = circle.getAttribute("cy");
	circle.setAttributeNS(null, "transform", "rotate(" + value * 5 + " " + x + " " + y + ")");
};

var selectedElement, offset, transform, svg;

function getMousePosition(evt) {
	svg = document.getElementById("drawing");
	var CTM = svg.getScreenCTM();
	if(evt.touches) {evt = evt.touches[0];}
	return {
	  x: (evt.clientX - CTM.e) / CTM.a,
	  y: (evt.clientY - CTM.f) / CTM.d
	};
}

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

function startDrag(evt) {
  if (evt.target.classList.contains('draggable')) {
    svg = document.getElementById("drawing");
	selectedElement = evt.target;
    offset = getMousePosition(evt);
    // Get all the transforms currently on this element
    var transforms = selectedElement.transform.baseVal;
    // Ensure the first transform is a translate transform
    if (transforms.length === 0 ||
        transforms.getItem(0).type !== SVGTransform.SVG_TRANSFORM_TRANSLATE) {
      // Create an transform that translates by (0, 0)
      var translate = svg.createSVGTransform();
      translate.setTranslate(0, 0);
      // Add the translation to the front of the transforms list
      selectedElement.transform.baseVal.insertItemBefore(translate, 0);
    }
    // Get initial translation amount
    transform = transforms.getItem(0);
    offset.x -= transform.matrix.e;
    offset.y -= transform.matrix.f;
  }
}

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
    var sc = sub(affix(ptC),zS);
    var ab = sub(affix(ptB),affix(ptA));
    var m = (sqmod(sc)+sqmod(ab)/3.0)/4.0;
    var n = Math.abs(sc.re*ab.im-sc.im*ab.re)/4.0/Math.sqrt(3.0);
    var a = (Math.sqrt(m+2.0*n)+Math.sqrt(m-2.0*n))/2.0;
	var b = (Math.sqrt(m+2.0*n)-Math.sqrt(m-2.0*n))/2.0;
	e.setAttributeNS(null, "rx", a);
    e.setAttributeNS(null, "ry", b);
    
	}
}

function endDrag(evt) {
  selectedElement = null;
}

