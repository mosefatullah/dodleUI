import { initElement, getElement, getOptions } from "../_static";

export default (selector, options) => {
 let obj = {};
 obj = initElement(selector);

 return (scopedElements) => {
  const { elems: sElements } = initElement(scopedElements);
  const o = getOptions("dragging", options);

  getElement(obj, (c) => {
   c.draggable = "true";
   c.ondragstart = function (e) {
    e.dataTransfer.setData("text", e.target.id);
   };

   if (o.highlight) {
    ["dragenter", "dragover"].forEach((e) => {
     for (let i = 0; i < sElements.length; i++) {
      sElements[i].addEventListener(
       e,
       (l) => {
        l.target.classList.add("highlight");
       },
       false
      );
     }
    });
    ["dragleave", "drop"].forEach((e) => {
     for (let i = 0; i < sElements.length; i++) {
      sElements[i].addEventListener(
       e,
       (l) => {
        l.target.classList.remove("highlight");
       },
       false
      );
     }
    });
   }
   for (let i = 0; i < sElements.length; i++) {
    sElements[i].ondrop = function (e) {
     e.preventDefault();
     if (o.transfer) {
      const draggedElementId = e.dataTransfer.getData("text");
      const draggedElement = document.getElementById(draggedElementId);
      if (!draggedElement.contains(e.target)) {
       e.target.appendChild(draggedElement);
      }
     }
    };
    sElements[i].ondragover = function (e) {
     e.preventDefault();
    };
   }
  });
 };
};
