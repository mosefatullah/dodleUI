const _formatFromString = function (value) {
 if (
  typeof value === "object" ||
  typeof value === "number" ||
  typeof value === "boolean" ||
  typeof value === "array"
 ) {
  return value;
 } else if (typeof value === "string") {
  if (value === "undefined") return undefined;
  if (value === "null") return null;
  if (value === "true") return true;
  else if (value === "false") return false;
  try {
   value = JSON.parse(value);
  } catch (e) {
   try {
    let k = parseFloat(value);
    if (isNaN(k) === false) value = k;
   } catch (e) {}
  }
  return value;
 } else if (typeof value === "undefined") return undefined;
 else if (typeof value === "function") return value;
 else return "";
};

const _formatToString = function (value) {
 if (typeof value === "object") {
  if (value === null) value = "null";
  else value = JSON.stringify(value);
 } else if (typeof value === "string" || typeof value === "number") {
  value = value.toString();
  if (value === "undefined") value = undefined;
  if (value === "null") value = null;
 } else if (typeof value === "boolean") value = value.toString();
 else if (typeof value === "function") {
  let line = "",
   lines = value.toString().split("\n");
  for (let i = 0; i < lines.length; i++) {
   if (lines[i].startsWith(" ")) {
    line += " " + lines[i].trim();
   } else {
    line += "," + lines[i].trim();
   }
  }
  value = line.substring(1).trim();
 } else if (typeof value === "array") value = value.toString();
 else if (typeof value === "undefined") value = "undefined";
 else return "";
 return value;
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

export default (type) => {
 return {
  set(key, value, expire = 365) {
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
    value = _formatToString(value);
    document.cookie = key + "=" + (value || "") + expires + "; path=/";
    return;
   } else if (_getType(type) === "indexedDB") {
    if (!("indexedDB" in window)) {
     msg = {
      error: "(DoodleUI) Storage: this browser doesn't support IndexedDB!",
     };
    }
    let request = indexedDB.open(key, 1);
    request.onupgradeneeded = function (event) {
     const db = event.target.result;
     db.onerror = (event) => {
      console.log("Error: ", event.target.error);
     };
     if (value.table && typeof value.table === "string") {
      let objectStore = db.createObjectStore(
       value.table,
       typeof value.primary === "string"
        ? { keyPath: value.primary, autoIncrement: true }
        : { autoIncrement: true }
      );
      if (value.index && Array.isArray(value.index)) {
       for (let i = 0; i < value.index.length; i++) {
        if (
         Array.isArray(value.index[i]) &&
         typeof value.index[i][0] === "string" &&
         typeof value.index[i][1] === "boolean"
        ) {
         objectStore.createIndex(value.index[i][0], value.index[i][0], {
          unique: value.index[i][1],
         });
        } else if (
         typeof value.index[0] === "string" &&
         typeof value.index[1] === "boolean"
        ) {
         objectStore.createIndex(value.index[0], value.index[0], {
          unique: value.index[1],
         });
         break;
        }
       }
      } else if (value.index && typeof value.index === "string") {
       objectStore.createIndex(value.index, value.index, { unique: true });
      }
     }
    }.bind(this);
    request.onsuccess = function (event) {
     let db = event.target.result;
     if (value.table && typeof value.table === "string" && value.value) {
      let transaction = db.transaction(value.table, "readwrite");
      let objectStore = transaction.objectStore(value.table);
      objectStore.add(value.value).addEventListener("success", () => {
       msg = {
        error: "(DoodleUI) Storage: data added to the database successfully!",
       };
      });
      transaction.addEventListener("error", () => {
       msg = {
        error:
         "(DoodleUI) Storage: transaction of indexedDB not opened due to error!",
       };
      });
      db.close();
     }
    }.bind(this);
    request.onerror = function (event) {
     console.log("Error: ", event.target.error);
    };
   } else if (_getType(type) === "session") {
    value = _formatToString(value);
    sessionStorage.setItem(key, value);
   } else {
    value = _formatToString(value);
    localStorage.setItem(key, value);
   }
   return msg;
  },

  get(key) {
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
      let value = c.substring(name.length, c.length);
      value = _formatFromString(value);
      out = value;
     }
    }
   } else if (_getType(type) === "indexedDB") {
    if (!("indexedDB" in window)) {
     out = {
      error: "(DoodleUI) Storage: this browser doesn't support IndexedDB!",
     };
    }
    const { database, table, key: _key } = key;
    let request = indexedDB.open(database, 1);
    request.onsuccess = function (event) {
     let db = event.target.result;
     let transaction = db.transaction(table, "readwrite");
     let objectStore = transaction.objectStore(table);
     let request = objectStore.get(_key);

     request.onsuccess = function (event) {
      let value = event.target.result;
      value = _formatFromString(value);
      out = value;
     };
    };
    request.onerror = function (event) {
     out = { error: "(DoodleUI) Stoarge: " + event.target.error };
    };
   } else if (_getType(type) === "session") {
    let value = sessionStorage.getItem(key);
    if (value === null) return "";
    value = _formatFromString(value);
    out = value;
   } else {
    let value = localStorage.getItem(key);
    if (value === null) return "";
    value = _formatFromString(value);
    out = value;
   }
   return out;
  },

  remove(key) {
   let out;
   if (_getType(type) === "cookie") document.cookie = "";
   else if (_getType(type) === "indexedDB") {
    if (!("indexedDB" in window)) {
     out = {
      error: "(DoodleUI) Storage: this browser doesn't support IndexedDB!",
     };
    }
    indexedDB.deleteDatabase(key);
   } else if (_getType(type) === "session") sessionStorage.removeItem(key);
   else localStorage.removeItem(key);
   return out;
  },

  clear(type) {
   let out;
   if (_getType(type) === "cookie") document.cookie = "";
   else if (_getType(type) === "indexedDB") {
    if (!("indexedDB" in window)) {
     out = {
      error: "(DoodleUI) Storage: this browser doesn't support IndexedDB!",
     };
    }
    indexedDB.databases().then((db) => {
     if (Array.isArray(db)) {
      db.map((d) => {
       this.removeStorage(d.name);
      });
     }
    });
   } else if (_getType(type) === "session") sessionStorage.clear();
   else localStorage.clear();
   return out;
  },
 };
};
