function reactionDiffusion(){ 
        const canvas = document.querySelector("canvas");
        const context = canvas.getContext('2d');
        canvas.setAttribute('style',"height: 300px; width: 500px;");
      let width = canvas.clientWidth;
      let height = canvas.clientHeight;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      const imageData = new ImageData(width, height);
      let buffer = imageData.data;
      
      
      var dA = 1;
var dB = 0.5;
var feed = 0.055;
var k = 0.062;
var grid;
var next;

  grid = [];
  next = [];
  for (var x = 0; x < width; x++) {
    grid[x] = [];
    next[x] = [];
    for (var y = 0; y < height; y++) {
      grid[x][y] = {
        a: 1,
        b: 0
      };
      next[x][y] = {
        a: 1,
        b: 0
      };
    }
  }

  for (var i = 100; i < 150; i++) {
    for (var j = 100; j < 150; j++) {
      if(Math.random()<0.05) grid[i][j].b = 1;
    }
  }

    
function laplaceA(x, y) {
  var sumA = 0;
  sumA += grid[x][y].a * -1;
  sumA += grid[x - 1][y].a * 0.2;
  sumA += grid[x + 1][y].a * 0.2;
  sumA += grid[x][y + 1].a * 0.2;
  sumA += grid[x][y - 1].a * 0.2;
  sumA += grid[x - 1][y - 1].a * 0.05;
  sumA += grid[x + 1][y - 1].a * 0.05;
  sumA += grid[x + 1][y + 1].a * 0.05;
  sumA += grid[x - 1][y + 1].a * 0.05;
  return sumA;
}

function laplaceB(x, y) {
  var sumB = 0;
  sumB += grid[x][y].b * -1;
  sumB += grid[x - 1][y].b * 0.2;
  sumB += grid[x + 1][y].b * 0.2;
  sumB += grid[x][y + 1].b * 0.2;
  sumB += grid[x][y - 1].b * 0.2;
  sumB += grid[x - 1][y - 1].b * 0.05;
  sumB += grid[x + 1][y - 1].b * 0.05;
  sumB += grid[x + 1][y + 1].b * 0.05;
  sumB += grid[x - 1][y + 1].b * 0.05;
  return sumB;
}

function constrain(a,mi,ma){
 if(a<mi) return mi;
 if(a>ma) return ma;
 return a;
}
 

function swap() {
  var temp = grid;
  grid = next;
  next = temp;
}
 
      function change(){ 
      
       for (var x = 1; x < width - 1; x++) {
    for (var y = 1; y < height - 1; y++) {
      var a = grid[x][y].a;
      var b = grid[x][y].b;
      next[x][y].a = a +
        (dA * laplaceA(x, y)) -
        (a * b * b) +
        (feed * (1 - a));
      next[x][y].b = b +
        (dB * laplaceB(x, y)) +
        (a * b * b) -
        ((k + feed) * b);

      next[x][y].a = constrain(next[x][y].a, 0, 1);
      next[x][y].b = constrain(next[x][y].b, 0, 1);
    }
  }

      
      
        for (let y = 0; y < height; y++)
		      for (let x = 0; x < width; x++) {
		      
		            var pix = (x + y * width) * 4;
      var a = next[x][y].a;
      var b = next[x][y].b;
      var c = Math.floor(180-(a - b) * 100);
 
		      
			   //draw the pixel
			      let bufferOffset = (x + y * width) * 4;
			      buffer[bufferOffset + 0] = constrain(c, 99, 195) ;
			      buffer[bufferOffset + 1] = constrain(c, 83, 194) ;
			      buffer[bufferOffset + 2] = constrain(c, 81, 199) ;
			      buffer[bufferOffset + 3] = 255;
		      }
        context.putImageData(imageData, 0, 0);
        
         swap();
      }
      
      setTimeout(()=>setInterval(change, 1),500);
}