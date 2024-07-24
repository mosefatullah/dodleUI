const _formatFromString = function (val) {
 if (
  typeof val === "object" ||
  typeof val === "number" ||
  typeof val === "boolean" ||
  typeof val === "array"
 ) {
  return val;
 } else if (typeof val === "string") {
  if (val === "undefined") return undefined;
  if (val === "null") return null;
  if (val === "true") return true;
  else if (val === "false") return false;
  try {
   val = JSON.parse(val);
  } catch (e) {
   try {
    let k = parseFloat(val);
    if (isNaN(k) === false) val = k;
   } catch (e) {}
  }
  return val;
 } else if (typeof val === "undefined") return undefined;
 else if (typeof val === "function") return val;
 else return "";
};

const _formatToString = function (val) {
 if (typeof val === "object") {
  if (val === null) val = "null";
  else val = JSON.stringify(val);
 } else if (typeof val === "string" || typeof val === "number") {
  val = val.toString();
  if (val === "undefined") val = undefined;
  if (val === "null") val = null;
 } else if (typeof val === "boolean") val = val.toString();
 else if (typeof val === "function") {
  let line = "",
   lines = val.toString().split("\n");
  for (let i = 0; i < lines.length; i++) {
   if (lines[i].startsWith(" ")) {
    line += " " + lines[i].trim();
   } else {
    line += "," + lines[i].trim();
   }
  }
  val = line.substring(1).trim();
 } else if (typeof val === "array") val = val.toString();
 else if (typeof val === "undefined") val = "undefined";
 else return "";
 return val;
};

const _getType = (type) => {
 /* useCase: temporary data, like a shopping cart */
 /* expire: when the browser is closed */
 if (type === "session" || type === "s") {
  return "session";
 } else if (type === "cookie" || type === "c") {
  /* useCase: user preferences, like a language */
  /* expire: until the user clears the cache */
  return "cookie";
 }

 /* useCase: user data, like a profile */
 //expire: until the user clears the cache */
 else if (
  type === "indexedDB" ||
  type === "idb" ||
  type === "db" ||
  type === "database"
 )
  return "indexedDB";
 /* useCase: user settings, like a theme */
 /* expire: never */ else return "local";
};

export default {
 setStorage(type, key, val, expire = 365) {
  let msg;
  if (_getType(type) === "cookie") {
   let expires = "session";
   if (expire !== "session") {
    if (expire === "") expire = 365;
    expire = _formatFromString(expire) * 24 * 60 * 60 * 1000;
    let date = new Date();
    date.setTime(date.getTime() + expire);
    expires = "; expires=" + date.toUTCString();
   }
   val = _formatToString(val);
   document.cookie = key + "=" + (val || "") + expires + "; path=/";
   return;
  } else if (_getType(type) === "indexedDB") {
   if (!("indexedDB" in window)) {
    msg = {
     error:
      "(Error: DoodleUI) Storage: this browser doesn't support IndexedDB!",
    };
   }
   let request = indexedDB.open(key, 1);
   request.onupgradeneeded = function (event) {
    const db = event.target.result;
    db.onerror = (event) => {
     console.log("Error: ", event.target.error);
    };
    if (val.table && typeof val.table === "string") {
     let objectStore = db.createObjectStore(
      val.table,
      typeof val.primary === "string"
       ? { keyPath: val.primary, autoIncrement: true }
       : { autoIncrement: true }
     );
     if (val.index && typeof val.index === "array") {
      for (let i = 0; i < val.index.length; i++) {
       if (
        typeof val.index[i][0] === "string" &&
        typeof val.index[i][1] === "boolean"
       ) {
        objectStore.createIndex(val.index[i][0], val.index[i][0], {
         unique: val.index[i][1],
        });
       }
      }
     } else if (val.index && typeof val.index === "object") {
      if (
       typeof val.index[0] === "string" &&
       typeof val.index[1] === "boolean"
      ) {
       objectStore.createIndex(val.index[0], val.index[0], {
        unique: val.index[1],
       });
      }
     } else if (val.index && typeof val.index === "string") {
      objectStore.createIndex(val.index, val.index, { unique: true });
     }
    }
   }.bind(this);
   request.onsuccess = function (event) {
    let db = event.target.result;
    if (val.table && typeof val.table === "string" && val.value) {
     let transaction = db.transaction(val.table, "readwrite");
     let objectStore = transaction.objectStore(val.table);
     objectStore.add(val.value).addEventListener("success", () => {
      msg = {
       error:
        "(Error: DoodleUI) Storage: data added to the database successfully!",
      };
     });
     transaction.addEventListener("error", () => {
      msg = {
       error:
        "(Error: DoodleUI) Storage: transaction of indexedDB not opened due to error!",
      };
     });
     db.close();
    }
   }.bind(this);
   request.onerror = function (event) {
    console.log("Error: ", event.target.error);
   };
  } else if (_getType(type) === "session") {
   val = _formatToString(val);
   sessionStorage.setItem(key, val);
  } else {
   val = _formatToString(val);
   localStorage.setItem(key, val);
  }
  return msg;
 },

 getStorage(type, key) {
  let out;
  if (_getType(type) === "cookie") {
   let name = key + "=";
   let decodedCookie = decodeURIComponent(document.cookie);
   let ca = decodedCookie.split(";");
   for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
     c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
     let val = c.substring(name.length, c.length);
     val = _formatFromString(val);
     out = val;
    }
   }
  } else if (_getType(type) === "indexedDB") {
   if (!("indexedDB" in window)) {
    out = {
     error:
      "(Error: DoodleUI) Storage: this browser doesn't support IndexedDB!",
    };
   }
   let request = indexedDB.open(key, 1);
   request.onsuccess = function (event) {
    let db = event.target.result;
    let transaction = db.transaction(key, "readwrite");
    let objectStore = transaction.objectStore(key);
    let request = objectStore.get(1);
    request.onsuccess = function (event) {
     let val = event.target.result;
     val = _formatFromString(val);
     out = val;
    };
   };
   request.onerror = function (event) {
    out = { error: "(Error: DoodleUI) Stoarge: " + event.target.error };
   };
  } else if (_getType(type) === "session") {
   let val = sessionStorage.getItem(key);
   if (val === null) return "";
   val = _formatFromString(val);
   out = val;
  } else {
   let val = localStorage.getItem(key);
   if (val === null) return "";
   val = _formatFromString(val);
   out = val;
  }
  return out;
 },

 removeStorage(type, key) {
  let out;
  if (_getType(type) === "cookie") document.cookie = "";
  else if (_getType(type) === "indexedDB") {
   if (!("indexedDB" in window)) {
    out = {
     error:
      "(Error: DoodleUI) Storage: this browser doesn't support IndexedDB!",
    };
   }
   indexedDB.deleteDatabase(key);
  } else if (_getType(type) === "session") sessionStorage.removeItem(key);
  else localStorage.removeItem(key);
  return out;
 },

 clearStorage(type) {
  let out;
  if (_getType(type) === "cookie") document.cookie = "";
  else if (_getType(type) === "indexedDB") {
   if (!("indexedDB" in window)) {
    out = {
     error:
      "(Error: DoodleUI) Storage: this browser doesn't support IndexedDB!",
    };
   }
   indexedDB.databases().then((db) => {
    if (Array.isArray(db)) {
     db.map((d) => {
      this.removeStorage(type, d.name);
     });
    }
   });
  } else if (_getType(type) === "session") sessionStorage.clear();
  else localStorage.clear();
  return out;
 },
};
