/**
 * DoodleUI v0.0.3
 * by Mohammad Sefatullah
 *
 * Github Link:-
 * https://github.com/mosefatullah/doodleui
 *
 * Copyright (c)
 * Released under the MIT license
 * https://github.com/mosefatullah/doodleui/blob/main/LICENSE
 *
 */

const _getElement = (t, _e) => {
 if (t.elem) {
  _e(t.elem);
 } else if (t.elems) {
  t.elems.forEach((e) => {
   _e(e);
  });
 }
};

export default class DoodleUI {
 constructor(arg, arg1) {
  this.elem = null;
  this.elems = null;
  this.options = DoodleUI.defaults;

  if (typeof arg === "string") {
   if (document.querySelector(arg)) {
    this.elem = document.querySelector(arg);
   } else {
    throw new Error("(DoodleUI) Element not found!");
   }
   if (arg1 && typeof arg1 === "object") {
    this.options = Object.assign(this.options, arg1);
   }
  } else if (arg && Array.isArray(arg)) {
   if (typeof arg[0] === "string") {
    if (document.querySelectorAll(arg[0])) {
     this.elems = document.querySelectorAll(arg[0]);
    } else {
     throw new Error("(DoodleUI) Elements not found!");
    }
   }
   if (arg1 && typeof arg1 === "object") {
    this.options = Object.assign(this.options, arg1);
   }
  } else if (arg && typeof arg === "object") {
   if (arg1 && typeof arg1 === "object") {
    this.options = Object.assign(this.options, arg1);
   }
   if (arg instanceof HTMLElement) {
    this.elem = arg;
   } else if (arg instanceof NodeList) {
    this.elems = arg;
   } else if (arg instanceof Document) {
    this.elems = arg.querySelectorAll("*");
   } else {
    this.options = Object.assign(this.options, arg);
   }
  } else if (arg === null) {
   throw new Error("(DoodleUI) Element not found!");
  }

  this.init();
  return this instanceof DoodleUI ? this : new DoodleUI(arg);
 }

 static defaults = {};

 init() {
  if (this.options && this.options.class) {
   if (this.elem) {
    this.elem.classList.add(...this.options.class.split(" "));
   } else if (this.elems) {
    this.elems.forEach((e) => {
     e.classList.add(...this.options.class.split(" "));
    });
   }
  }
 }

 zoom() {
  const _e = (e) => {
   if (e.tagName === "IMG" && e["data-dui-zoom"] !== true) {
    e["data-dui-zoom"] = true;
    e.style.cursor = "zoom-in";
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
     zoomedImg.style.zIndex = "9999";
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
  };
  _getElement(this, _e);
 }

 observe(is, isnot) {
  const _e = (e) => {
   e["data-dui-observe"] = true;
   if (!("IntersectionObserver" in window)) {
    throw new Error("(DoodleUI) IntersectionObserver not supported!");
   }
   const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
     if (entry.isIntersecting) {
      if (typeof is === "function") is(entry.target);
     } else if (!entry.isIntersecting) {
      if (typeof isnot === "function") isnot(entry.target);
     }
    });
   });
   observer.observe(e);
  };
  _getElement(this, _e);
 }

 scroll(h) {
  const _e = (e) => {
   e["data-dui-scroll"] = true;
   window.addEventListener("scroll", () => {
    const pxOfE = e.getBoundingClientRect().top;
    const pxOfW = window.scrollY;
    if (typeof h === "function") h(pxOfE, pxOfW, e);
   });
  };
  _getElement(this, _e);
 }
}
