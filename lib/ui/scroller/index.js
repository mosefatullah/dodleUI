import { getElement, initObject } from "../../_static.js";

export default (selector, config, _obj) => {
 let obj = {};
 if ((typeof _obj == "object" && _obj.elem) || _obj.elems) {
  obj = _obj;
 } else {
  obj = initObject(selector, config);
 }
 return (onScroll) => {
  getElement(obj, (e) => {
   e["data-dui-getScroll"] = true;
   window.addEventListener("scroll", () => {
    const clientTop = e.getBoundingClientRect().top;
    const clientBottom = e.getBoundingClientRect().bottom;
    const scrolled = window.scrollY;
    if (typeof onScroll == "function") {
     onScroll(scrolled, clientTop, clientBottom, e);
    } else {
     throw new Error(
      "(Error: DoodleUI) Scroller: onScroll (arg1) is not a function!"
     );
    }
   });
  });
 };
};
