function gaussianSphere(){
      function dot(a1, a2){
        let a = [];
        let v,c;
        for(let i=0; i<a1.length; i++){
          v=[];
          for(let k=0; k<a2[0].length; k++){
            c=0;
            for(let j=0; j<a2.length; j++)
              c+=a1[i][j]*a2[j][k];
            v.push(c);
          }
          a.push(v);
        }
        return a;
      }

      class Quaternion{
        constructor(w,x,y,z){
          this.w = w;
          this.x = x;
          this.y = y;
          this.z = z;
          this.matrix = [[w,-x,-y,-z],[x,w,-z,y],[y,z,w,-x],[z,-y,x,w]];
        }
        times(q){
          let p = dot(this.matrix, q.matrix);
          return new Quaternion(p[0][0], p[1][0], p[2][0], p[3][0]);
        }
        norm2(){
          return this.w**2+this.x**2+this.y**2+this.z**2;
        }
        conj(){
          return new Quaternion(this.w,-this.x,-this.y,-this.z);
        }
        scale(k){
          return new Quaternion(this.w*k,this.x*k,this.y*k,this.z*k);
        }
        inv(){
          return this.conj().scale(1/this.norm2());
        }
      }
      
      class Vector3{
        constructor(x,y,z){
          this.x = x;
          this.y = y;
          this.z = z;
        }
        norm(){
          return Math.sqrt(this.x**2+this.y**2+this.z**2);
        }
        scale(k){
          return new Vector3(this.x*k,this.y*k,this.z*k);
        }
        rotation(u, alpha){
          let n = Math.sqrt(u.x**2+u.y**2+u.z**2);
          u = new Vector3(u.x/n,u.y/n,u.z/n);
          let s = Math.sin(alpha/2);
          let v = new Quaternion(0,this.x, this.y, this.z);
          let q = new Quaternion(Math.cos(alpha/2),u.x*s,u.y*s,u.z*s);
          let r = q.times(v).times(q.inv());
          return new Vector3(r.x,r.y,r.z);
        }
        show(){
          return `(${this.x}, ${this.y}, ${this.z})`;
        }
      }
    
      function boxMuller(param1, param2, n){
        const u1 = Array.from({length:n}, _=> Math.random());
        const u2 = Array.from({length:n}, _=> Math.random());
        
        const n1 = Array.from({length:n}
                  , (_,i) => Math.sqrt(-2*Math.log(u1[i]))*Math.cos(2*Math.PI*u2[i]));
        const n2 = Array.from({length:n}
                  , (_,i) => Math.sqrt(-2*Math.log(u1[i]))*Math.sin(2*Math.PI*u2[i]));
        return [n1.map(x=>x*param1.sigma+param1.mu), n2.map(x=>x*param2.sigma+param2.mu)];
      }
      
      function iAmAPhone(){
        let brands = ["android","iphone","blackberry","ipad","mobile"];
        return brands.map(x=>navigator.userAgent.toLowerCase().indexOf(x)>0)
                     .reduce((a,b)=>a || b);
      }
      
      const canvas = document.querySelector('#canvas');
      canvas.width = window.innerWidth/2;
      canvas.height = window.innerHeight;
      const context = canvas.getContext('2d');
      context.fillStyle = "#c9baa5";
          
      const population = 5000;
      const canonical = {mu:0, sigma:1};
      let normalxy = boxMuller(canonical, canonical, population);
      let normalz_ = boxMuller(canonical, canonical, population);
      let points = Array.from({length:population}
        , (_,i)=> {
        let v = new Vector3(normalxy[0][i],normalxy[1][i],normalz_[0][i]);
        return v.scale((1+Math.random()*0.05)/v.norm());
      });
      
      const center = {x: 250, y:280};
      const radius = 200;
      let alpha=0;
      
      let vx=1, vy= 1, vz = 0;
       
      function draw(){
        context.clearRect(0,0,canvas.width,canvas.height);
        points.forEach(pt=>{
          let rp = pt.rotation(new Vector3(vx,vy,vz), alpha);
          if(rp.z>0){
            rp.x = rp.x*radius+center.x;
            rp.y = rp.y*radius+center.y;
            context.fillRect(rp.x, rp.y, 1, 1);
          }
        });
        alpha += iAmAPhone() ? 0.01 : 0.001;
        vx += Math.random()/2;
        vy += Math.random()/2;
        vz += Math.random()/2;
        
      }
      
      setInterval(draw, 10);
}      