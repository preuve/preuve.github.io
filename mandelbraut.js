function mandelbraut(){
      function hsv2rgb(h,s,v) {
      v=1
      s=0.2
	      let p, q, t, ff;
	      let i;

	      if (s <= 0) // < is bogus, just shuts up warnings
		      return {r:v, g:v, b:v};
	      
	      if (h >= 360)	h = 0;
	      h /= 60;
	      i = Math.floor(h);
	      ff = h - i;
	      p = v * (1 - s);
	      q = v * (1 - (s * ff));
	      t = v * (1 - (s * (1 - ff)));
	     c=(1+h/4);
	   return {r: c*99, g:c*83, b: c*81}
	     // return [{r:v,g:t,b:p},{r:q,g:v,b:p},{r:p,g:v,b:t}
	     // ,{r:p,g:q,b:v},{r:t,g:p,b:v},{r:v,g:p,b:q}][i];
      }

      const canvas = document.getElementById('canvas');
      canvas.setAttribute('style',"height: 300px; width: 500px;");
      //canvas.width = window.width/13;
      //canvas.height = window.height/16;
      
      // Canvas resizing from http://stackoverflow.com/a/43364730/2142626
      let width = canvas.clientWidth;
      let height = canvas.clientHeight;
      
      //canvas.width = window.width/3;
      //canvas.height = window.height/3;
       
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      
      const context = canvas.getContext('2d');
      let pr, pi;			// real and imaginary part of the pixel p
	    let newRe, newIm, oldRe, oldIm; // real and imaginary parts of new and old z
	    let color;			// the RGB color value for the pixel
	    let maxIterations = 360;					 // after how much iterations the function should stop. Chosen to make take up full HSV hue range.


      const imageData = new ImageData(width, height);
      let buffer = imageData.data;

      let zoom, moveX, moveY ;
      zoom=1;
      moveX = -0.5;
      moveY = 0;
 
      const realPart = (x,scale,dx) => 1.5 * (x - width / 2) / (0.5 * scale * width) + dx;
      const imagPart = (y,scale,dy) => (y - height / 2) / (0.5 * scale * height) + dy;

  let state = {lastCheck:[],currentCheck:[],changed:true};

      function draw(){
	      // loop through every pixel
	      state.lastCheck = [];
	      state.currentCheck.forEach((x,i)=> state.lastCheck[i]=x);
	      state.currentCheck = [];
	      for (let y = 0; y < height; y++)
		      for (let x = 0; x < width; x++) {
			      // calculate the initial real and imaginary part of z, based on the pixel location and zoom and position values
			      pr = realPart(x,zoom,moveX);
			      pi = imagPart(y,zoom,moveY);
			      newRe = newIm = oldRe = oldIm = 0; //these should start at 0,0
			      // "i" will represent the number of iterations
			      let i;
			      // start the iteration process
			      for (i = 0; i < maxIterations; i++)	{
				      // remember value of previous iteration
				      oldRe = newRe;
				      oldIm = newIm;
				      // the actual iteration, the real and imaginary part are calculated
				      newRe = oldRe * oldRe - oldIm * oldIm + pr;
				      newIm = 2 * oldRe * oldIm + pi;
				      // if the point is outside the circle with radius 2: stop
				      if ((newRe * newRe + newIm * newIm) > 4)
					      break;
			      }
			      // use color model conversion to get rainbow palette, make brightness black if maxIterations reached
			
			      color = hsv2rgb(i,1,i<maxIterations);
			      //draw the pixel
			      let bufferOffset = (x + y * width) * 4;
			      buffer[bufferOffset + 0] = color.r //* 255;
			      buffer[bufferOffset + 1] = color.g //* 255;
			      buffer[bufferOffset + 2] = color.b //* 255;
			      buffer[bufferOffset + 3] = 255;
			      state.currentCheck[i]++;
		      }
        context.putImageData(imageData, 0, 0);
        let cond1 = state.lastCheck.length>0 && Object.keys(state.lastCheck).reduce(
                     (a,k)=>a && state.lastCheck[k] == state.currentCheck[k])
        let cond2 = state.currentCheck.length>0 && Object.keys(state.currentCheck).reduce(
                     (a,k)=>a && state.lastCheck[k] == state.currentCheck[k])
        if (cond1 && cond2) state.changed=false;
      }
            
      draw();
     //execute(width/3.5,height/119);
     
     function change(){
      if(!state.changed) {
         zoom=1
          moveX = -0.5;
      moveY = 0;
      execute(width/3.48,height/119);
      state.changed = true
 }
       let x = width / (2 + (Math.random()*0.05-0.1));
       let y = height / (2 + (Math.random()*0.05-0.1)); 
       execute(x,y);      
      }
     
     function execute(x,y){
           let xx = realPart(x,zoom,moveX);
        let yy = imagPart(y,zoom,moveY);
       
        zoom *=1.1;
        moveX = xx;
        moveY = yy;
        draw();

     }
     
      window.addEventListener('click',ev=>{
        let x = ev.pageX;
        let y = ev.pageY;
       
        let xx = realPart(x,zoom,moveX);
        let yy = imagPart(y,zoom,moveY);
       
        zoom *=1.1;
        moveX = xx;
        moveY = yy;
        draw();
      });
      
      setInterval(change,200);
 }