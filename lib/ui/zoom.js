import { getElement, initElement } from "../_static.js";

export default (selector, options) => {
 let obj = {};
 obj = initElement(selector);
 return () => {
  getElement(obj, (e) => {
   if (e.tagName === "IMG" && e["data-dui-zoom"] !== true) {
    e["data-dui-zoom"] = true;
    e.style.cursor = "zoom-in";
    document.onkeyup = function (e) {
     if (e.key == "i") {
      e.focus(true);
     }
    };
    e.addEventListener("click", () => {
     const zoomedImg = document.createElement("img");
     const overflowOfBody = document.body.style.overflow;
     zoomedImg.src = e.src;
     zoomedImg.style.position = "fixed";
     zoomedImg.style.top = "0";
     zoomedImg.style.left = "0";
     zoomedImg.style.width = "100%";
     zoomedImg.style.height = "100%";
     zoomedImg.style.objectFit = "contain";
     zoomedImg.style.zIndex = "9999999999999999999999999";
     zoomedImg.style.cursor = "zoom-out";
     zoomedImg.style.backgroundColor = "rgba(0,0,0,0.5)";
     zoomedImg.addEventListener("click", function () {
      this.remove();
      document.body.style.overflow = overflowOfBody;
     });
     document.body.appendChild(zoomedImg);
     document.body.style.overflow = "hidden";
    });
   }
  });
 };
};
