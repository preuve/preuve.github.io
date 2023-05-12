export const inline = function (content){
  return function (){
    return katex.renderToString(content);
  };
};

export const equation = function (content){
  return function (){
    return katex.renderToString(content, {displayMode: true, throwOnError: false});
  };
};

export const render = (content) => (elem) => () =>
	katex.render(content, elem, {
		throwOnError: false,
  });

export const display = (content) => (elem) => () =>
	katex.render(content, elem, {
		throwOnError: false,
        displayMode: true,
  });

export const textMode = (content) => (elem) => () =>
  elem.innerHTML = content;
  
