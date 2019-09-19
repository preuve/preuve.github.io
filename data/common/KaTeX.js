
exports.setAttribute = function (name) {
  return function (value) {
    return function (element) {
      return function () {
        element.setAttribute(name, value);
        return {};
      };
    };
  };
};


exports.setBodyBackground = function (name) {
      return function () {
        document.querySelector("body")
                .setAttribute("style"
                             , "background:" + name);
        return {};
  };
};

exports.setTitle = function (name){
  return function(){
    document.querySelector("h1")
            .textContent = name;
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