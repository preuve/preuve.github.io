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

/* expected in main:
//
function drag(evt) {
  if (selectedElement) {
        evt.preventDefault();
        var coord = getMousePosition(evt);
        // ...
        // do something with coord
        // ...
    }
}
//
*/

function endDrag(evt) {
  selectedElement = null;
}

