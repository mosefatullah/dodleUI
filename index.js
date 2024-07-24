/**
 * DoodleUI v1.0.0
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

import { initObject, defaultOptions } from "./lib/_static.js";
import Observer from "./lib/ui/observer/index.js";
import Scroller from "./lib/ui/scroller/index.js";
import Storage from "./lib/api/storage/index.js";
import Keypress from "./lib/utility/keypress/index.js";
import Zoom from "./lib/ui/zoom/index.js";
import Location from "./lib/api/location/index.js";

export class DoodleUI {
 /*** Configuration  */

 constructor(selector, config) {
  this.elem = null;
  this.elems = null;
  this.options = null;

  const { elem: s, elems: ss, options: op } = initObject(selector, config);
  this.elem = s;
  this.elems = ss;
  this.options = op;

  this.init();
  return this instanceof DoodleUI ? this : new DoodleUI(selector);
 }

 static defaults = defaultOptions;

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

 /*** UI  */

 zoom() {
  Zoom(null, null, this)();
 }

 observer(isObserving, notObserving) {
  Observer(null, null, this)(isObserving, notObserving);
 }

 scroller(onScroll) {
  Scroller(null, null, this)(onScroll);
 }
}

/*** Utility */

DoodleUI.storage = (type) => {
 return {
  set: (name, value, expire) => {
   Storage.setStorage(type, name, value, expire);
  },
  get: (name) => Storage.getStorage(type, name),
  remove: (name) => {
   Storage.removeStorage(type, name);
  },
  clear: () => {
   Storage.clearStorage(type);
  },
 };
};

DoodleUI.keypress = Keypress;

/*** API */

DoodleUI.location = Location;

export default (selector, config) => new DoodleUI(selector, config);
