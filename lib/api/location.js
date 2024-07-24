export default (onLocation) => {
 const getPositionErrorMessage = (code) => {
  switch (code) {
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
 if (typeof onLocation === "function") {
  if ("geolocation" in navigator === false)
   throw new Error(
    "(DoodleUI) Location: geolocation is not supported by your browser!"
   );
  else
   navigator.geolocation.getCurrentPosition(
    function (p) {
     onLocation({ lat: p.coords.latitude, long: p.coords.longitude }, p);
    },
    function (e) {
     onLocation({ error: getPositionErrorMessage(e.code) }, e);
    }
   );
 } else {
  throw new Error("(DoodleUI) Location: onLocation (arg1) is not a function!");
 }
};
