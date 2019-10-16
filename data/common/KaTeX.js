
exports.setTitle = function (name){
  return function(){
    document.querySelector("h1")
            .textContent = name;
  };
};

exports.section = function (name){
  return function(){
     let node = document.createElement("h2");
      node.textContent = name;
      document.querySelector("#description").appendChild(node);
  };
};

exports.subsection = function (name){
  return function(){
     let node = document.createElement("h3");
      node.textContent = name;
      document.querySelector("#description").appendChild(node);
  };
};

exports.subsubsection = function (name){
  return function(){
     let node = document.createElement("h4");
      node.textContent = name;
      document.querySelector("#description").appendChild(node);
  };
};

exports.render = function (content){
    return function(){
      let node = document.createElement("label");
      document.querySelector("#description")
              .appendChild(node);
      katex.render(content,node);
    };
};

exports.line = function (x1){
  return function(y1){
  return function(x2){
  return function(y2){
  return function(){
    let node = document.createElementNS("http://www.w3.org/2000/svg","svg");
    node.setAttribute("style","position: absolute; width:100%; height:100%; ");
    let l = document.createElementNS("http://www.w3.org/2000/svg","line");
    l.setAttributeNS(null,"x1",x1);
    l.setAttributeNS(null,"y1",y1);
    l.setAttributeNS(null,"x2",x2);
    l.setAttributeNS(null,"y2",y2);
    l.setAttributeNS(null,"style", "stroke:#000; stroke-width:1px;");
    node.appendChild(l);
    document.querySelector("#description").appendChild(node);
    };};};};
 };

exports.renderIn = function(location){
   return function (content){
    return function(){
      let node = document.createElement("label");
      location.appendChild(node);
      katex.render(content,node);
    };
};
};

exports.equation = function (content){
    return function(){
      let node = document.createElement("label");
      node.setAttribute("class","center");
      document.querySelector("#description")
              .appendChild(node);
      katex.render(content,node);
    };
};

exports.raw = function (content){
    return function(){
      let node = document.createTextNode(content);
      document.querySelector("#description")
              .appendChild(node);
    };
};

exports.rawIn = function(location){
    return function (content){
    return function(){
      let node = document.createTextNode(content);
      location.appendChild(node);
    };
};
};

exports.newLine = function (){
  return function (){
  let node = document.createElement("br");
  document.querySelector("#description")
          .appendChild(node);
          };
};

exports.newLineIn = function(location){
  return function (){
  return function (){
  let node = document.createElement("br");
  location.appendChild(node);
          };
};};


exports.list = function(xs){
  return function(){
    let node = document.createElement("ul");
    xs.forEach(x => {
      let elem = document.createElement("li");
      node.appendChild(elem);
      x(elem);
      });
   document.querySelector("#description")
           .appendChild(node);
  }
};

exports.cat = function(xs){
    return function(parent){
   xs.forEach(x => x(parent));
  };
};

exports.subrender = function (content){
  return function (parent){
      let node = document.createElement("label");
      parent.appendChild(node);
      katex.render(content, node);
  };
};

exports.subraw = function (content){
  return function (parent){
      parent.appendChild(document.createTextNode(content));
  };
};