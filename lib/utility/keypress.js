export default (onKeypress) => {
 let name;
 let replace = {
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

 document.onkeyup = function (e) {
  let key = e.key;

  let withCtrl = e.ctrlKey;
  let withAlt = e.altKey;
  let withShift = e.shiftKey;

  name = replace[key] || key;

  if (name.length == 1) name = name.toUpperCase();

  if (withCtrl) name = "Ctrl+" + name;
  if (withAlt) name = "Alt+" + name;
  if (withShift) name = "Shift+" + name;

  if (typeof onKeypress == "function") {
   onKeypress(name, e);
  } else
   throw new Error("(DodleUI) Keypress: onKeypress (arg1) is not a function!");
 };
};
