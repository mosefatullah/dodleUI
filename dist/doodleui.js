/**
 * DoodleUI v0.0.1
 * by Mohammad Sefatullah
 *
 * Github Link:-
 * https://github.com/mosefatullah/ui/tree/main/doodleui
 *
 * Copyright (c)
 * Released under the MIT license
 * https://github.com/mosefatullah/ui/blob/main/doodleui/LICENSE
 *
 */

//** Uses Node, AMD or browser globals to create a module.
(function (root, factory) {
 if (typeof define === "function" && define.amd) {
  //** AMD. Register as an anonymous module.
  define(["doodleui"], factory);
 } else if (typeof exports === "object") {
  //** Node. Does not work with strict CommonJS, but only CommonJS-like environments that support module.exports, like Node.
  module.exports = factory(require("doodleui"));
 } else {
  //** Browser globals (root is window)
  root.dUI = factory();
 }
})(this, function () {
 let DoodleUIPrivate = {};

 function DoodleUI(arg, arg1) {
  this.elem = null;
  this.elems = null;
  this.options = DoodleUI.defaults;
  if (typeof arg === "string") {
   if (document.querySelector(arg)) this.elem = document.querySelector(arg);
   else throw new Error("(DoodleUI) Element not found!");
   if (arg1 && typeof arg1 === "object")
    this.options = Object.assign(this.options, arg1);
  } else if (arg && Array.isArray(arg)) {
   if (typeof arg[0] === "string") {
    if (document.querySelectorAll(arg[0]))
     this.elems = document.querySelectorAll(arg[0]);
    else throw new Error("(DoodleUI) Elements not found!");
   }
   if (arg1 && typeof arg1 === "object")
    this.options = Object.assign(this.options, arg1);
  } else if (arg && typeof arg === "object") {
   if (arg1 && typeof arg1 === "object")
    this.options = Object.assign(_options, arg1);
   if (arg instanceof HTMLElement) this.elem = arg;
   else if (arg instanceof NodeList) this.elems = arg;
   else if (arg instanceof Document) this.elems = arg.querySelectorAll("*");
   else this.options = Object.assign(this.options, arg);
  } else if (arg === null) {
   throw new Error("(DoodleUI) Element not found!");
  }
  DoodleUI.prototype.init.call(this);
  return this instanceof DoodleUI ? this : new DoodleUI(arg);
 }

 //** Default options
 DoodleUI.defaults = {};

 //** Public methods
 const _ = [
  // Functionality to enable image zooming in and out
  [
   "zoom",
   function () {
    let self = this;
    function _e(e) {
     if (e.tagName == "IMG" && e["data-dui-zoom"] != true) {
      e["data-dui-zoom"] = true;
      e.style.cursor = "zoom-in";
      e.addEventListener("click", function () {
       let zoomedImg = document.createElement("img");
       let overflowOfBody = document.body.style.overflow;
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
    }
    DoodleUIPrivate._getElement.call(self, _e);
   },
  ],
  // Functionality to observe an element constantly on screen
  [
   "observe",
   function (is, isnot) {
    let self = this;
    function _e(e) {
     e["data-dui-observe"] = true;
     if (!("IntersectionObserver" in window)) {
      throw new Error("(DoodleUI) IntersectionObserver not supported!");
     }
     let observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
       if (entry.isIntersecting) {
        if (typeof is === "function") is(entry.target);
       } else if (!entry.isIntersecting) {
        if (typeof isnot === "function") isnot(entry.target);
       }
      });
     });
     observer.observe(e);
    }
    DoodleUIPrivate._getElement.call(self, _e);
   },
  ],
  // Functionality to observe an element based on scrolling
  [
   "scroll",
   function (h) {
    let self = this;
    function _e(e) {
     e["data-dui-scroll"] = true;
     window.addEventListener("scroll", function () {
      let pxOfE = e.getBoundingClientRect().top;
      let pxOfW = window.scrollY;
      if (typeof h === "function") h(pxOfE, pxOfW, e);
     });
    }
    DoodleUIPrivate._getElement.call(self, _e);
   },
  ],
 ];
 _.forEach(function (e) {
  if (e[0] && e[1]) {
   DoodleUI.prototype[e[0]] = (..._e) => {
    e[1].apply(this, _e);
    return DoodleUI.prototype;
   };
  }
 });

 //** Private methods
 DoodleUIPrivate._getElement = function (_e) {
  let self = this;
  if (self.elem) {
   _e(self.elem);
  } else if (self.elems) {
   self.elems.forEach(function (e) {
    _e(e);
   });
  }
 };

 //** Init
 DoodleUI.prototype.init = function () {
  let self = this;
  if (this.options) {
   if (this.options.class) {
    if (this.elem) {
     this.elem.classList.add(...this.options.class.split(" "));
    } else if (this.elems) {
     this.elems.forEach(function (e) {
      e.classList.add(...self.options.class.split(" "));
     });
    }
   }
  }
 };
 DoodleUI.prototype.init.prototype = DoodleUI.prototype;

 return DoodleUI;
});
