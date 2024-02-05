
export const rotated = (angle) => (content) => (elem) => () => {
	katex.render(content, elem, 
  { "throwOnError": false
  });
   elem.style = "display: inline-block; transform: rotate("+angle+"deg)";
  }

export const render = (content) => (elem) => () =>
	katex.render(content, elem, 
  { "throwOnError": false
  });

export const display = (content) => (elem) => () =>
	katex.render(content, elem, 
  { "throwOnError": false
  , "displayMode": true
  });

export const textMode = (content) => (elem) => () =>
  elem.innerHTML = content;
  
