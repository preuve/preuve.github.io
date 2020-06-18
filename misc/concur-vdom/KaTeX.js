exports.inline = function (content){
  return function (){
    return katex.renderToString(content);
  };
};

exports.equation = function (content){
  return function (){
    return katex.renderToString(content, {displayMode: true, throwOnError: false});
  };
};
