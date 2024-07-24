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
import Observer from "./lib/ui/observer.js";
import Storage from "./lib/api/storage.js";
import Keypress from "./lib/utility/keypress.js";
import Zoom from "./lib/ui/zoom.js";
import Location from "./lib/api/location.js";
import Firebase from "./lib/api/firebase.js";

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
}

/*** Utility */

DoodleUI.storage = Storage;
DoodleUI.keypress = Keypress;

/*** API */

DoodleUI.location = Location;
DoodleUI.firebase = Firebase;

export default (selector, config) => new DoodleUI(selector, config);
