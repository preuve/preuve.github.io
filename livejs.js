var canvas = document.querySelector("#canvas");
var ctx = canvas.getContext("2d");
ctx.lineWidth = 1;
var wasPressed = false;
var pos = {x: 0, y: 0};

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
      ctx.moveTo(pos.x, pos.y);    
      pos = getMousePos(canvas, e); 
      ctx.lineTo(pos.x, pos.y); 
      ctx.closePath();   
      ctx.stroke();       
    }
})

window.addEventListener('mousedown', function (e) {
  wasPressed = true;
  pos = getMousePos(canvas, e); 
})
 
window.addEventListener('mouseup', function (e) {
  wasPressed = false;
})
