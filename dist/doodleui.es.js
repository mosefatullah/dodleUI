var h = Object.defineProperty;
var m = (s, e, t) => e in s ? h(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var r = (s, e, t) => (m(s, typeof e != "symbol" ? e + "" : e, t), t);
const c = (s, e) => {
  s.elem ? e(s.elem) : s.elems && s.elems.forEach((t) => {
    e(t);
  });
}, n = class n {
  constructor(e, t) {
    if (this.elem = null, this.elems = null, this.options = n.defaults, typeof e == "string") {
      if (document.querySelector(e))
        this.elem = document.querySelector(e);
      else
        throw new Error("(DoodleUI) Element not found!");
      t && typeof t == "object" && (this.options = Object.assign(this.options, t));
    } else if (e && Array.isArray(e)) {
      if (typeof e[0] == "string")
        if (document.querySelectorAll(e[0]))
          this.elems = document.querySelectorAll(e[0]);
        else
          throw new Error("(DoodleUI) Elements not found!");
      t && typeof t == "object" && (this.options = Object.assign(this.options, t));
    } else if (e && typeof e == "object")
      t && typeof t == "object" && (this.options = Object.assign(this.options, t)), e instanceof HTMLElement ? this.elem = e : e instanceof NodeList ? this.elems = e : e instanceof Document ? this.elems = e.querySelectorAll("*") : this.options = Object.assign(this.options, e);
    else if (e === null)
      throw new Error("(DoodleUI) Element not found!");
    return this.init(), this instanceof n ? this : new n(e);
  }
  init() {
    this.options && this.options.class && (this.elem ? this.elem.classList.add(...this.options.class.split(" ")) : this.elems && this.elems.forEach((e) => {
      e.classList.add(...this.options.class.split(" "));
    }));
  }
  zoom() {
    c(this, (t) => {
      t.tagName === "IMG" && t["data-dui-zoom"] !== !0 && (t["data-dui-zoom"] = !0, t.style.cursor = "zoom-in", t.addEventListener("click", () => {
        const o = document.createElement("img"), i = document.body.style.overflow;
        o.src = t.src, o.style.position = "fixed", o.style.top = "0", o.style.left = "0", o.style.width = "100%", o.style.height = "100%", o.style.objectFit = "contain", o.style.zIndex = "9999", o.style.cursor = "zoom-out", o.style.backgroundColor = "rgba(0,0,0,0.5)", o.addEventListener("click", function() {
          this.remove(), document.body.style.overflow = i;
        }), document.body.appendChild(o), document.body.style.overflow = "hidden";
      }));
    });
  }
  observe(e, t) {
    c(this, (i) => {
      if (i["data-dui-observe"] = !0, !("IntersectionObserver" in window))
        throw new Error("(DoodleUI) IntersectionObserver not supported!");
      new IntersectionObserver((u) => {
        u.forEach((l) => {
          l.isIntersecting ? typeof e == "function" && e(l.target) : l.isIntersecting || typeof t == "function" && t(l.target);
        });
      }).observe(i);
    });
  }
  scroll(e) {
    c(this, (o) => {
      o["data-dui-scroll"] = !0, window.addEventListener("scroll", () => {
        const i = o.getBoundingClientRect().top, f = window.scrollY;
        typeof e == "function" && e(i, f, o);
      });
    });
  }
};
r(n, "defaults", {});
let d = n;
export {
  d as default
};
