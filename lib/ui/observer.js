import { getElement, initObject } from "../_static.js";

export default (selector, config, _obj) => {
 let obj = {};
 if ((typeof _obj == "object" && _obj.elem) || _obj.elems) {
  obj = _obj;
 } else {
  obj = initObject(selector, config);
 }
 return (isObserving, notObserving) => {
  getElement(obj, (e) => {
   e["data-dui-observe"] = true;
   if (!("IntersectionObserver" in window)) {
    throw new Error(
     "(DoodleUI) Observer: intersectionObserver is not supported by your browser!"
    );
   }
   const o = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
     if (entry.isIntersecting) {
      if (typeof isObserving === "function") isObserving(entry);
     } else if (!entry.isIntersecting) {
      if (typeof notObserving === "function") notObserving(entry);
     }
    });
   });
   o.observe(e);
  });
 };
};
