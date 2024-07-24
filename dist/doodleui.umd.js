(function (u, f) {
 typeof exports == "object" && typeof module < "u"
  ? f(exports)
  : typeof define == "function" && define.amd
  ? define(["exports"], f)
  : ((u = typeof globalThis < "u" ? globalThis : u || self),
    f((u.DoodleUI = {})));
})(this, function (u) {
 "use strict";
 var k = Object.defineProperty;
 var C = (u, f, g) =>
  f in u
   ? k(u, f, { enumerable: !0, configurable: !0, writable: !0, value: g })
   : (u[f] = g);
 var x = (u, f, g) => (C(u, typeof f != "symbol" ? f + "" : f, g), g);
 const f = (t, o) => {
   let e = {};
   if (((e.options = S), typeof t == "string")) {
    const r = document.querySelectorAll(t);
    if (r) r.length == 1 ? (e.elem = r[0]) : (e.elems = r);
    else throw new Error("(DoodleUI) Element not found!");
    o && typeof o == "object" && (e.options = Object.assign(e.options, o));
   } else if (t && Array.isArray(t)) {
    if (typeof t[0] == "string") {
     const r = document.querySelectorAll(t[0]);
     if (r) r.length == 1 ? (e.elem = r[0]) : (e.elems = r);
     else throw new Error("(DoodleUI) Elements not found!");
    }
    o && typeof o == "object" && (e.options = Object.assign(e.options, o));
   } else if (t && typeof t == "object")
    o && typeof o == "object" && (e.options = Object.assign(e.options, o)),
     t instanceof HTMLElement
      ? (e.elem = t)
      : t instanceof NodeList
      ? (e.elems = t)
      : t instanceof Document
      ? (e.elems = t.querySelectorAll("*"))
      : (e.options = Object.assign(e.options, t));
   else if (t == null)
    throw new Error("(DoodleUI) Selector is empty! Provide a selector.");
   return e;
  },
  g = (t, o) => {
   t.elem
    ? o(t.elem)
    : t.elems &&
      t.elems.forEach((e) => {
       o(e);
      });
  },
  S = {},
  E = (t, o, e) => {
   let r = {};
   return (
    (typeof e == "object" && e.elem) || e.elems ? (r = e) : (r = f(t, o)),
    (i, n) => {
     g(r, (s) => {
      if (((s["data-dui-observe"] = !0), !("IntersectionObserver" in window)))
       throw new Error(
        "(DoodleUI) Observer: intersectionObserver is not supported by your browser!"
       );
      new IntersectionObserver((d) => {
       d.forEach((c) => {
        c.isIntersecting
         ? typeof i == "function" && i(c)
         : c.isIntersecting || (typeof n == "function" && n(c));
       });
      }).observe(s);
     });
    }
   );
  },
  D = (t, o, e) => {
   let r = {};
   return (
    (typeof e == "object" && e.elem) || e.elems ? (r = e) : (r = f(t, o)),
    (i) => {
     g(r, (n) => {
      (n["data-dui-getScroll"] = !0),
       window.addEventListener("scroll", () => {
        const s = n.getBoundingClientRect().top,
         l = n.getBoundingClientRect().bottom,
         d = window.scrollY;
        if (typeof i == "function") i(d, s, l, n);
        else
         throw new Error(
          "(DoodleUI) Scroller: onScroll (arg1) is not a function!"
         );
       });
     });
    }
   );
  },
  p = function (t) {
   if (
    typeof t == "object" ||
    typeof t == "number" ||
    typeof t == "boolean" ||
    typeof t == "array"
   )
    return t;
   if (typeof t == "string") {
    if (t === "undefined") return;
    if (t === "null") return null;
    if (t === "true") return !0;
    if (t === "false") return !1;
    try {
     t = JSON.parse(t);
    } catch {
     try {
      let e = parseFloat(t);
      isNaN(e) === !1 && (t = e);
     } catch {}
    }
    return t;
   } else return typeof t > "u" ? void 0 : typeof t == "function" ? t : "";
  },
  w = function (t) {
   if (typeof t == "object")
    t === null ? (t = "null") : (t = JSON.stringify(t));
   else if (typeof t == "string" || typeof t == "number")
    (t = t.toString()),
     t === "undefined" && (t = void 0),
     t === "null" && (t = null);
   else if (typeof t == "boolean") t = t.toString();
   else if (typeof t == "function") {
    let o = "",
     e = t.toString().split(`
`);
    for (let r = 0; r < e.length; r++)
     e[r].startsWith(" ") ? (o += " " + e[r].trim()) : (o += "," + e[r].trim());
    t = o.substring(1).trim();
   } else if (typeof t == "array") t = t.toString();
   else if (typeof t > "u") t = "undefined";
   else return "";
   return t;
  },
  a = (t) =>
   t === "session" || t === "s"
    ? "session"
    : t === "cookie" || t === "c"
    ? "cookie"
    : t === "indexedDB" || t === "idb" || t === "db" || t === "database"
    ? "indexedDB"
    : "local",
  b = {
   setStorage(t, o, e, r = 365) {
    let i;
    if (a(t) === "cookie") {
     let n = "session";
     if (r !== "session") {
      r === "" && (r = 365), (r = p(r) * 24 * 60 * 60 * 1e3);
      let s = new Date();
      s.setTime(s.getTime() + r), (n = "; expires=" + s.toUTCString());
     }
     (e = w(e)), (document.cookie = o + "=" + (e || "") + n + "; path=/");
     return;
    } else if (a(t) === "indexedDB") {
     "indexedDB" in window ||
      (i = {
       error: "(DoodleUI) Storage: this browser doesn't support IndexedDB!",
      });
     let n = indexedDB.open(o, 1);
     (n.onupgradeneeded = function (s) {
      const l = s.target.result;
      if (
       ((l.onerror = (d) => {
        console.log("Error: ", d.target.error);
       }),
       e.table && typeof e.table == "string")
      ) {
       let d = l.createObjectStore(
        e.table,
        typeof e.primary == "string"
         ? { keyPath: e.primary, autoIncrement: !0 }
         : { autoIncrement: !0 }
       );
       if (e.index && typeof e.index == "array")
        for (let c = 0; c < e.index.length; c++)
         typeof e.index[c][0] == "string" &&
          typeof e.index[c][1] == "boolean" &&
          d.createIndex(e.index[c][0], e.index[c][0], {
           unique: e.index[c][1],
          });
       else
        e.index && typeof e.index == "object"
         ? typeof e.index[0] == "string" &&
           typeof e.index[1] == "boolean" &&
           d.createIndex(e.index[0], e.index[0], { unique: e.index[1] })
         : e.index &&
           typeof e.index == "string" &&
           d.createIndex(e.index, e.index, { unique: !0 });
      }
     }.bind(this)),
      (n.onsuccess = function (s) {
       let l = s.target.result;
       if (e.table && typeof e.table == "string" && e.value) {
        let d = l.transaction(e.table, "readwrite");
        d
         .objectStore(e.table)
         .add(e.value)
         .addEventListener("success", () => {
          i = {
           error:
            "(DoodleUI) Storage: data added to the database successfully!",
          };
         }),
         d.addEventListener("error", () => {
          i = {
           error:
            "(DoodleUI) Storage: transaction of indexedDB not opened due to error!",
          };
         }),
         l.close();
       }
      }.bind(this)),
      (n.onerror = function (s) {
       console.log("Error: ", s.target.error);
      });
    } else
     a(t) === "session"
      ? ((e = w(e)), sessionStorage.setItem(o, e))
      : ((e = w(e)), localStorage.setItem(o, e));
    return i;
   },
   getStorage(t, o) {
    let e;
    if (a(t) === "cookie") {
     let r = o + "=",
      n = decodeURIComponent(document.cookie).split(";");
     for (let s = 0; s < n.length; s++) {
      let l = n[s];
      for (; l.charAt(0) === " "; ) l = l.substring(1);
      if (l.indexOf(r) === 0) {
       let d = l.substring(r.length, l.length);
       (d = p(d)), (e = d);
      }
     }
    } else if (a(t) === "indexedDB") {
     "indexedDB" in window ||
      (e = {
       error: "(DoodleUI) Storage: this browser doesn't support IndexedDB!",
      });
     let r = indexedDB.open(o, 1);
     (r.onsuccess = function (i) {
      let d = i.target.result.transaction(o, "readwrite").objectStore(o).get(1);
      d.onsuccess = function (c) {
       let y = c.target.result;
       (y = p(y)), (e = y);
      };
     }),
      (r.onerror = function (i) {
       e = { error: "(DoodleUI) Stoarge: " + i.target.error };
      });
    } else if (a(t) === "session") {
     let r = sessionStorage.getItem(o);
     if (r === null) return "";
     (r = p(r)), (e = r);
    } else {
     let r = localStorage.getItem(o);
     if (r === null) return "";
     (r = p(r)), (e = r);
    }
    return e;
   },
   removeStorage(t, o) {
    let e;
    return (
     a(t) === "cookie"
      ? (document.cookie = "")
      : a(t) === "indexedDB"
      ? ("indexedDB" in window ||
         (e = {
          error: "(DoodleUI) Storage: this browser doesn't support IndexedDB!",
         }),
        indexedDB.deleteDatabase(o))
      : a(t) === "session"
      ? sessionStorage.removeItem(o)
      : localStorage.removeItem(o),
     e
    );
   },
   clearStorage(t) {
    let o;
    return (
     a(t) === "cookie"
      ? (document.cookie = "")
      : a(t) === "indexedDB"
      ? ("indexedDB" in window ||
         (o = {
          error: "(DoodleUI) Storage: this browser doesn't support IndexedDB!",
         }),
        indexedDB.databases().then((e) => {
         Array.isArray(e) &&
          e.map((r) => {
           this.removeStorage(t, r.name);
          });
        }))
      : a(t) === "session"
      ? sessionStorage.clear()
      : localStorage.clear(),
     o
    );
   },
  },
  I = (t) => {
   let o,
    e = {
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
     " ": "Space",
    };
   document.onkeyup = function (r) {
    let i = r.key,
     n = r.ctrlKey,
     s = r.altKey,
     l = r.shiftKey;
    if (
     ((o = e[i] || i),
     o.length == 1 && (o = o.toUpperCase()),
     n && (o = "Ctrl+" + o),
     s && (o = "Alt+" + o),
     l && (o = "Shift+" + o),
     typeof t == "function")
    )
     t(o, r);
    else
     throw new Error(
      "(DoodleUI) Keypress: onKeypress (arg1) is not a function!"
     );
   };
  },
  B = (t, o, e) => {
   let r = {};
   return (
    (typeof e == "object" && e.elem) || e.elems ? (r = e) : (r = f(t, o)),
    () => {
     g(r, (i) => {
      i.tagName === "IMG" &&
       i["data-dui-zoom"] !== !0 &&
       ((i["data-dui-zoom"] = !0),
       (i.style.cursor = "zoom-in"),
       i.addEventListener("click", () => {
        const n = document.createElement("img"),
         s = document.body.style.overflow;
        (n.src = i.src),
         (n.style.position = "fixed"),
         (n.style.top = "0"),
         (n.style.left = "0"),
         (n.style.width = "100%"),
         (n.style.height = "100%"),
         (n.style.objectFit = "contain"),
         (n.style.zIndex = "9999"),
         (n.style.cursor = "zoom-out"),
         (n.style.backgroundColor = "rgba(0,0,0,0.5)"),
         n.addEventListener("click", function () {
          this.remove(), (document.body.style.overflow = s);
         }),
         document.body.appendChild(n),
         (document.body.style.overflow = "hidden");
       }));
     });
    }
   );
  },
  U = (t) => {
   const o = (e) => {
    switch (e) {
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
   if (typeof t == "function")
    if ("geolocation" in navigator)
     navigator.geolocation.getCurrentPosition(
      function (e) {
       t({ lat: e.coords.latitude, long: e.coords.longitude }, e);
      },
      function (e) {
       t({ error: o(e.code) }, e);
      }
     );
    else
     throw new Error(
      "(DoodleUI) Location: geolocation is not supported by your browser!"
     );
   else
    throw new Error(
     "(DoodleUI) Location: onLocation (arg1) is not a function!"
    );
  },
  h = class h {
   constructor(o, e) {
    (this.elem = null), (this.elems = null), (this.options = null);
    const { elem: r, elems: i, options: n } = f(o, e);
    return (
     (this.elem = r),
     (this.elems = i),
     (this.options = n),
     this.init(),
     this instanceof h ? this : new h(o)
    );
   }
   init() {
    this.options &&
     this.options.class &&
     (this.elem
      ? this.elem.classList.add(...this.options.class.split(" "))
      : this.elems &&
        this.elems.forEach((o) => {
         o.classList.add(...this.options.class.split(" "));
        }));
   }
   zoom() {
    B(null, null, this)();
   }
   observer(o, e) {
    E(null, null, this)(o, e);
   }
   scroller(o) {
    D(null, null, this)(o);
   }
  };
 x(h, "defaults", S);
 let m = h;
 (m.storage = (t) => ({
  set: (o, e, r) => {
   b.setStorage(t, o, e, r);
  },
  get: (o) => b.getStorage(t, o),
  remove: (o) => {
   b.removeStorage(t, o);
  },
  clear: () => {
   b.clearStorage(t);
  },
 })),
  (m.keypress = I),
  (m.location = U);
 const j = (t, o) => new m(t, o);
 (u.DoodleUI = m),
  (u.default = j),
  Object.defineProperties(u, {
   __esModule: { value: !0 },
   [Symbol.toStringTag]: { value: "Module" },
  });
});
