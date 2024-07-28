var b = Object.defineProperty;
var x = (o, e, t) => e in o ? b(o, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : o[e] = t;
var w = (o, e, t) => (x(o, typeof e != "symbol" ? e + "" : e, t), t);
const d = (o) => {
  let e = {};
  if (typeof o == "string") {
    const t = document.querySelectorAll(o);
    if (t)
      t.length == 1 ? e.elem = t[0] : e.elems = t;
    else
      throw new Error("(DodleUI) Element not found!");
  } else if (o && Array.isArray(o))
    if (o.length == 1)
      e.elem = y[0];
    else {
      let t = [];
      o.map((i) => {
        g(d(i), (n) => {
          t.push(n);
        });
      }), e.elems = t;
    }
  else if (o && typeof o == "object")
    o instanceof HTMLElement ? e.elem = o : o instanceof NodeList ? e.elems = o : o instanceof Document && (e.elems = o.querySelectorAll("*"));
  else if (o == null)
    throw new Error("(DodleUI) Selector is empty! Provide a selector.");
  return e;
}, v = (o, e) => {
  let t = e;
  return t && typeof t == "object" ? t = { ...u[o], ...e } : t = u[o], console.log(t), t;
}, g = (o, e) => {
  o.elem ? e(o.elem) : o.elems && o.elems.forEach((t) => {
    e(t);
  });
}, u = {
  dragging: {
    transfer: !0,
    highlight: !1
  }
}, E = (o, e) => {
  let t = {};
  return t = d(o), (i, n) => {
    g(t, (l) => {
      if (l["data-dui-observe"] = !0, !("IntersectionObserver" in window))
        throw new Error(
          "(DodleUI) Observer: intersectionObserver is not supported by your browser!"
        );
      new IntersectionObserver((s) => {
        s.forEach((r) => {
          r.isIntersecting ? typeof i == "function" && i(r) : r.isIntersecting || typeof n == "function" && n(r);
        });
      }).observe(l);
    });
  };
}, k = (o) => {
  let e, t = {
    Control: "Ctrl",
    Escape: "Esc",
    ArrowDown: "down",
    ArrowLeft: "left",
    ArrowUp: "up",
    ArrowRight: "right",
    CapsLock: "Capslock",
    NumLock: "Numlock",
    PageUp: "Pageup",
    PageDown: "Pagedown",
    " ": "Space"
  };
  document.onkeyup = function(i) {
    let n = i.key, l = i.ctrlKey, a = i.altKey, s = i.shiftKey;
    if (e = t[n] || n, e.length == 1 && (e = e.toUpperCase()), l && (e = "Ctrl+" + e), a && (e = "Alt+" + e), s && (e = "Shift+" + e), typeof o == "function")
      o(e, i);
    else
      throw new Error("(DodleUI) Keypress: onKeypress (arg1) is not a function!");
  };
}, L = (o, e) => {
  let t = {};
  return t = d(o), () => {
    g(t, (i) => {
      i.tagName === "IMG" && i["data-dui-zoom"] !== !0 && (i["data-dui-zoom"] = !0, i.style.cursor = "zoom-in", document.onkeyup = function(n) {
        n.key == "i" && n.focus(!0);
      }, i.addEventListener("click", () => {
        const n = document.createElement("img"), l = document.body.style.overflow;
        n.src = i.src, n.style.position = "fixed", n.style.top = "0", n.style.left = "0", n.style.width = "100%", n.style.height = "100%", n.style.objectFit = "contain", n.style.zIndex = "9999999999999999999999999", n.style.cursor = "zoom-out", n.style.backgroundColor = "rgba(0,0,0,0.5)", n.addEventListener("click", function() {
          this.remove(), document.body.style.overflow = l;
        }), document.body.appendChild(n), document.body.style.overflow = "hidden";
      }));
    });
  };
}, C = (o) => {
  const e = (t) => {
    switch (t) {
      case 1:
        return "Permission denied!";
      case 2:
        return "Position unavailable!";
      case 3:
        return "Timeout reached!";
      default:
        return "An unknown error!";
    }
  };
  if (typeof o == "function")
    if ("geolocation" in navigator)
      navigator.geolocation.getCurrentPosition(
        function(t) {
          o({ lat: t.coords.latitude, long: t.coords.longitude }, t);
        },
        function(t) {
          o({ error: e(t.code) }, t);
        }
      );
    else
      throw new Error(
        "(DodleUI) Location: geolocation is not supported by your browser!"
      );
  else
    throw new Error("(DodleUI) Location: onLocation (arg1) is not a function!");
}, p = (o, e) => {
  for (const t in e)
    o.style[t] = e[t];
}, A = (o) => {
  const { buttonStyle: e } = o;
  let t = document.body;
  t["data-dui-accessible"] = !0;
  const i = document.createElement("div"), n = document.createElement("div"), l = document.createElement("button");
  p(l, {
    width: "40px",
    height: "40px",
    background: "white",
    borderRadius: "100rem",
    boxShadow: "0 0 10px rgba(0,0,0,0.4)",
    border: "1px solid rgba(0,0,0,0.4)",
    position: "fixed",
    right: "20px",
    bottom: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: "99999999999999999",
    ...e || {}
  }), l.onclick = () => {
    l.style.transform = "scale(0.9)", i.style.display = "block", n.style.display = "block", setTimeout(() => {
      l.style.transform = "scale(1)";
    }, 100);
  }, l.innerHTML = '<svg width="23px" height="23px" id="b6b9284d-bf64-4736-9ee4-87ec5db2ecfa" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 21.43"><circle cx="7.96" cy="2.5" r="2.5" style="fill:#191919"/><rect y="5.43" width="16" height="3" rx="0.48" style="fill:#191919"/><rect x="4" y="8.43" width="8" height="8" style="fill:#191919"/><path d="M4,16.43H6a0,0,0,0,1,0,0v5a0,0,0,0,1,0,0H4.43A.43.43,0,0,1,4,21V16.43A0,0,0,0,1,4,16.43Z" style="fill:#191919"/><path d="M10,16.43h2a0,0,0,0,1,0,0V21a.41.41,0,0,1-.41.41H10a0,0,0,0,1,0,0v-5A0,0,0,0,1,10,16.43Z" style="fill:#191919"/></svg>', p(i, {
    display: "none",
    width: "100%",
    height: "100vh",
    background: "rgba(0,0,0,0.2)",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: "99999999999999999"
  }), p(n, {
    display: "none",
    width: "100%",
    maxWidth: "700px",
    height: "75vh",
    background: "white",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "20px"
  });
  const a = document.createElement("button");
  p(a, {
    padding: "5px 10px",
    border: "1px solid rgba(0,0,0,0.4)",
    position: "fixed",
    right: "20px",
    top: "20px"
  }), a.innerHTML = "Close", a.onclick = () => {
    i.style.display = "none", n.styledisplay = "none";
  };
  const s = document.createElement("h2");
  s.innerHTML = "Accessibility", s.style.fontWeight = "bold", t.appendChild(l), i.appendChild(n), n.appendChild(a), n.appendChild(s), t.appendChild(i);
}, I = (o, e) => {
  let t = {};
  return t = d(o), (i) => {
    const { elems: n } = d(i), l = v("dragging", e);
    g(t, (a) => {
      a.draggable = "true", a.ondragstart = function(s) {
        s.dataTransfer.setData("text", s.target.id);
      }, l.highlight && (["dragenter", "dragover"].forEach((s) => {
        for (let r = 0; r < n.length; r++)
          n[r].addEventListener(
            s,
            (f) => {
              f.target.classList.add("highlight");
            },
            !1
          );
      }), ["dragleave", "drop"].forEach((s) => {
        for (let r = 0; r < n.length; r++)
          n[r].addEventListener(
            s,
            (f) => {
              f.target.classList.remove("highlight");
            },
            !1
          );
      }));
      for (let s = 0; s < n.length; s++)
        n[s].ondrop = function(r) {
          if (r.preventDefault(), l.transfer) {
            const f = r.dataTransfer.getData("text"), m = document.getElementById(f);
            m.contains(r.target) || r.target.appendChild(m);
          }
        }, n[s].ondragover = function(r) {
          r.preventDefault();
        };
    });
  };
}, h = class h {
  /*** Configuration  */
  constructor(e, t) {
    this.selector = e, this.options = t;
    const { elem: i, elems: n } = d(e);
    return this.elem = i, this.elems = n, this.init(), this instanceof h ? this : new h(e);
  }
  init() {
    this.options && this.options.class && (this.elem ? this.elem.classList.add(...this.options.class.split(" ")) : this.elems && this.elems.forEach((e) => {
      e.classList.add(...this.options.class.split(" "));
    }));
  }
  /*** UI  */
  zoom() {
    L(this.selector, this.options)();
  }
  observer(e, t) {
    E(this.selector, this.options)(e, t);
  }
  dragging(e) {
    I(this.selector, this.options)(e);
  }
};
w(h, "defaults", u);
let c = h;
c.keypress = k;
c.location = C;
c.accessible = A;
const z = (o, e) => new c(o, e);
export {
  c as DodleUI,
  z as default
};
