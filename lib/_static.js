export const initElement = (selector) => {
 let obj = {};

 if (typeof selector === "string") {
  const z = document.querySelectorAll(selector);
  if (z) {
   if (z.length == 1) obj.elem = z[0];
   else obj.elems = z;
  } else {
   throw new Error("(DoodleUI) Element not found!");
  }
 } else if (selector && Array.isArray(selector)) {
  if (selector.length == 1) obj.elem = y[0];
  else {
   let arrOfElements = [];
   selector.map((s) => {
    getElement(initElement(s), (e) => {
     arrOfElements.push(e);
    });
   });
   obj.elems = arrOfElements;
  }
 } else if (selector && typeof selector === "object") {
  if (selector instanceof HTMLElement) {
   obj.elem = selector;
  } else if (selector instanceof NodeList) {
   obj.elems = selector;
  } else if (selector instanceof Document) {
   obj.elems = selector.querySelectorAll("*");
  }
 } else if (selector == null) {
  throw new Error("(DoodleUI) Selector is empty! Provide a selector.");
 }
 return obj;
};

export const getOptions = (name, options) => {
 let o = options;
 if (o && typeof o === "object") {
  o = { ...defaultOptions[name], ...options };
 } else o = defaultOptions[name];
 console.log(o);
 return o;
};

export const getElement = (obj, _e) => {
 if (obj.elem) {
  _e(obj.elem);
 } else if (obj.elems) {
  obj.elems.forEach((e) => {
   _e(e);
  });
 }
};

export const defaultOptions = {
 dragging: {
  transfer: true,
  highlight: false,
 },
};
