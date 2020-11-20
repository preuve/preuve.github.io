

var canvas = document.querySelector("#canvas");
var ctx = canvas.getContext("2d");
//ctx.strokeStyle = "black";
ctx.lineWidth = 1;
var wasPressed = false;
var x = 0;
var y = 0;

width = window.innerWidth;
height = window.innerHeight;

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
}
                
 window.addEventListener('mousemove', function (e) {
    if(wasPressed){
      ctx.beginPath();     
          ctx.moveTo(x, y);    
          pos = getMousePos(canvas, e); 
          x = pos.x;
          y = pos.y;
          ctx.lineTo(x, y); 
          ctx.stroke();       
    }
 })

window.addEventListener('mousedown', function (e) {
  wasPressed = true;
   pos = getMousePos(canvas, e); 
    x = pos.x;
    y = pos.y;
 })
 
 window.addEventListener('mouseup', function (e) {
  wasPressed = false;
  })
