export const initObject = (selector, config) => {
 let obj = {};
 obj.options = defaultOptions;

 if (typeof selector === "string") {
  const z = document.querySelectorAll(selector);
  if (z) {
   if (z.length == 1) obj.elem = z[0];
   else obj.elems = z;
  } else {
   throw new Error("(DoodleUI) Element not found!");
  }
  if (config && typeof config === "object") {
   obj.options = Object.assign(obj.options, config);
  }
 } else if (selector && Array.isArray(selector)) {
  if (typeof selector[0] === "string") {
   const y = document.querySelectorAll(selector[0]);
   if (y) {
    if (y.length == 1) obj.elem = y[0];
    else obj.elems = y;
   } else {
    throw new Error("(DoodleUI) Elements not found!");
   }
  }
  if (config && typeof config === "object") {
   obj.options = Object.assign(obj.options, config);
  }
 } else if (selector && typeof selector === "object") {
  if (config && typeof config === "object") {
   obj.options = Object.assign(obj.options, config);
  }
  if (selector instanceof HTMLElement) {
   obj.elem = selector;
  } else if (selector instanceof NodeList) {
   obj.elems = selector;
  } else if (selector instanceof Document) {
   obj.elems = selector.querySelectorAll("*");
  } else {
   obj.options = Object.assign(obj.options, selector);
  }
 } else if (selector == null) {
  throw new Error("(DoodleUI) Selector is empty! Provide a selector.");
 }

 return obj;
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

export const defaultOptions = {};
