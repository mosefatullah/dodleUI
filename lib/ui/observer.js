import { getElement, initElement } from "../_static.js";

export default (selector, options) => {
 let obj = {};
 obj = initElement(selector);
 return (isObserving, notObserving) => {
  getElement(obj, (e) => {
   e["data-dui-observe"] = true;
   if (!("IntersectionObserver" in window)) {
    throw new Error(
     "(DodleUI) Observer: intersectionObserver is not supported by your browser!"
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
