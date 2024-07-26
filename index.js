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

import { initElement, defaultOptions } from "./lib/_static.js";
import Observer from "./lib/ui/observer.js";
import Keypress from "./lib/utility/keypress.js";
import Zoom from "./lib/ui/zoom.js";
import Location from "./lib/utility/location.js";
import Accessible from "./lib/utility/accessible.js";
import Dragging from "./lib/ui/dragging.js";

export class DoodleUI {
 /*** Configuration  */

 constructor(selector, options) {
  this.selector = selector;
  this.options = options;

  const { elem, elems } = initElement(selector);

  this.elem = elem;
  this.elems = elems;

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
  Zoom(this.selector, this.options)();
 }
 observer(isObserving, notObserving) {
  Observer(this.selector, this.options)(isObserving, notObserving);
 }
 dragging(scopedElements) {
  Dragging(this.selector, this.options)(scopedElements);
 }
}

/*** Utility */

DoodleUI.keypress = Keypress;
DoodleUI.location = Location;
DoodleUI.accessible = Accessible;

export default (selector, config) => new DoodleUI(selector, config);
