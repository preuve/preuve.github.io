exports.render = function (content){
    return function(){
      let node = document.createElement("label");
      document.querySelector("#description")
              .appendChild(node);
      katex.render(content,node);
    };
};
