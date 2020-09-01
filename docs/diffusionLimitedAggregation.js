 function diffusionLimitedAggregation(){
      const log = document.querySelector('#log');
      const canvas = document.querySelector('#canvas');
      const context = canvas.getContext('2d');
      
      function dist(a,b,c,d) {return Math.sqrt((a-c)**2+(b-d)**2);}
 
      class Point {
        constructor(x, y) {
          this.x = x;
          this.y = y;
        }
        
        translate(v){
          let that = new Point(this.x, this.y);
          that.x += v.x;
          that.y += v.y;
          return that;
        }
        
        middle(p) {
          return new Point((this.x+p.x)/2, (this.y+p.y)/2);
        }
        
        show(){
          context.beginPath();
          context.arc(this.x, this.y, 1, 0, 2 * Math.PI);
          context.fill();
      
          context.stroke();
        }
      }
      
      class Vector {
        constructor(a, b) {
          this.x = b.x - a.x;
          this.y = b.y - a.y;
        }
        
        static zero(){
          return new Vector(new Point(0,0), new Point(0,0));
        }
        
        add(v) {
          let sum = Vector.zero();
          sum.x = this.x + v.x;
          sum.y = this.y + v.y;
          return sum;
        }
      }

      class Rectangle {
        constructor(x, y, w, h) {
          this.x = x;
          this.y = y;
          this.w = w;
          this.h = h;
        }

        contains(point) {
          return (point.x >= this.x - this.w &&
            point.x < this.x + this.w &&
            point.y >= this.y - this.h &&
            point.y < this.y + this.h);
        }

        intersects(range) {
          return !(range.x - range.w > this.x + this.w ||
            range.x + range.w < this.x - this.w ||
            range.y - range.h > this.y + this.h ||
            range.y + range.h < this.y - this.h);
        }
      }

      class QuadTree {
        constructor(boundary, n) {
          this.boundary = boundary;
          this.capacity = n;
          this.points = [];
          this.divided = false;
        }

        subdivide() {
          let x = this.boundary.x;
          let y = this.boundary.y;
          let w = this.boundary.w;
          let h = this.boundary.h;
          let ne = new Rectangle(x + w / 2, y - h / 2, w / 2, h / 2);
          this.northeast = new QuadTree(ne, this.capacity);
          let nw = new Rectangle(x - w / 2, y - h / 2, w / 2, h / 2);
          this.northwest = new QuadTree(nw, this.capacity);
          let se = new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2);
          this.southeast = new QuadTree(se, this.capacity);
          let sw = new Rectangle(x - w / 2, y + h / 2, w / 2, h / 2);
          this.southwest = new QuadTree(sw, this.capacity);
          this.divided = true;
        }

        insert(point) {

          if (!this.boundary.contains(point)) {
            return false;
          }

          if (this.points.length < this.capacity) {
            this.points.push(point);
            return true;
          } else {
            if (!this.divided) {
              this.subdivide();
            }
            if (this.northeast.insert(point)) {
              return true;
            } else if (this.northwest.insert(point)) {
              return true;
            } else if (this.southeast.insert(point)) {
              return true;
            } else if (this.southwest.insert(point)) {
              return true;
            }
          }
        }

        query(range, found) {
          if (!found) {
            found = [];
          }
          if (!this.boundary.intersects(range)) {
            return;
          } else {
            for (let p of this.points) {
              if (range.contains(p)) {
                found.push(p);
              }
            }
            if (this.divided) {
              this.northwest.query(range, found);
              this.northeast.query(range, found);
              this.southwest.query(range, found);
              this.southeast.query(range, found);
            }
          }
          return found;
        }
      }
      
      const crep = 0.2, cattr = 0.1, lmax = 15, ratio = 1.3;
      
      class Path {
        constructor(points){
          this.points = points;
        }
        
        tree() {
          let qt = new QuadTree(boundary, 10);
          for(let i=0; i<this.points.length; i++)
            qt.insert(this.points[i]);
          return qt;
        }
        
        repulses(tree) {
          let reps = [];
          for(let i=0; i<this.points.length; i++){
            let pt = this.points[i];
            let closest = tree.query(new Rectangle(pt.x, pt.y, lmax, lmax));
            let sum = Vector.zero();
            closest.forEach(p => sum=sum.add(new Vector(p, pt)));
            reps.push(sum);
          }
          return reps;
        }
        
        attractions() {
          let atts = [];
          for(let i=0; i<this.points.length; i++){
            let pt = this.points[i];
            let s = i==this.points.length-1 ? 0 : i+1;
            let att = new Vector(pt, this.points[s].middle(this.points[i]));
            atts.push(att);
          }
          return atts;
        }

        ok(i, reps, atts){
          let x = this.points[i].x +  reps[i].x * crep + atts[i].x * cattr;
          let y = this.points[i].y +  reps[i].y * crep + atts[i].y * cattr;
          return (x>=0 && x < canvas.width && y>=0 && y<canvas.height);
        }
        
        evolve(){
          let tree = this.tree();
          let reps = this.repulses(tree);
          let atts = this.attractions();
          //log.textContent = JSON.stringify(reps);
          for(let i=0; i<this.points.length; i++){
            if(this.ok(i,reps,atts)){
              this.points[i].x += reps[i].x * crep + atts[i].x * cattr;
              this.points[i].y += reps[i].y * crep + atts[i].y * cattr;
            }
          }
          
          let choice = Math.floor(this.points.length * Math.random());
          for(let i=choice+1; i<this.points.length; i++){
            if(i==choice) break;
            if(i==this.points.length) i = 0;
            let s = i==this.points.length-1 ? 0 : i+1;
            let a = this.points[i];
            let b = this.points[s];
            if(dist(a.x,a.y,b.x,b.y) > ratio * lmax){
               this.points.splice(s,0,a.middle(b));
               break;
            }
          }
        }
        
        show(){
          for(let i=0; i<this.points.length; i++){
            this.points[i].show();
            context.moveTo(this.points[i].x, this.points[i].y);
            let s= i==this.points.length-1?0:i+1;
            context.lineTo(this.points[s].x, this.points[s].y);
            context.strokeStyle = 'rgb(195, 194, 199)';
      context.stroke();
          }
        }        
      }
            
      let path;
      
      function renderScene(){
        context.clearRect(0, 0, canvas.width, canvas.height);
        if(path){
          path.evolve();
          path.show();
        }
      }
      
      function resize(){
        canvas.width = window.innerWidth/2;
        canvas.height = window.innerHeight;
        
        if(path) renderScene();
      }
      
      resize();
      let center = new Point(canvas.width/2, canvas.height/2);
      let boundary = new Rectangle(center.x, center.y
                                  , center.x, center.y);
 
      path = new Path([center.translate(new Point(-25,-25))
                     , center.translate(new Point(25,-25))
                     , center.translate(new Point(0,35))]);
      
      setInterval(renderScene, 100);
      
      window.addEventListener('resize', resize);
}