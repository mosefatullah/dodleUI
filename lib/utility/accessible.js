const applyStyles = (e, obj) => {
 for (const i in obj) {
  e.style[i] = obj[i];
 }
};

export default (options) => {
 const { buttonStyle } = options;
 let e = document.body;
 e["data-dui-accessible"] = true;
 const wrapper = document.createElement("div");
 const container = document.createElement("div");
 const button = document.createElement("button");
 applyStyles(button, {
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
  ...(buttonStyle || {}),
 });
 button.onclick = () => {
  button.style.transform = "scale(0.9)";
  wrapper.style.display = "block";
  container.style.display = "block";
  setTimeout(() => {
   button.style.transform = "scale(1)";
  }, 100);
 };

 button.innerHTML =
  '<svg width="23px" height="23px" id="b6b9284d-bf64-4736-9ee4-87ec5db2ecfa" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 21.43"><circle cx="7.96" cy="2.5" r="2.5" style="fill:#191919"/><rect y="5.43" width="16" height="3" rx="0.48" style="fill:#191919"/><rect x="4" y="8.43" width="8" height="8" style="fill:#191919"/><path d="M4,16.43H6a0,0,0,0,1,0,0v5a0,0,0,0,1,0,0H4.43A.43.43,0,0,1,4,21V16.43A0,0,0,0,1,4,16.43Z" style="fill:#191919"/><path d="M10,16.43h2a0,0,0,0,1,0,0V21a.41.41,0,0,1-.41.41H10a0,0,0,0,1,0,0v-5A0,0,0,0,1,10,16.43Z" style="fill:#191919"/></svg>';

 applyStyles(wrapper, {
  display: "none",
  width: "100%",
  height: "100vh",
  background: "rgba(0,0,0,0.2)",
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: "99999999999999999",
 });

 applyStyles(container, {
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
  padding: "20px",
 });

 const closeBtn = document.createElement("button");
 applyStyles(closeBtn, {
  padding: "5px 10px",
  border: "1px solid rgba(0,0,0,0.4)",
  position: "fixed",
  right: "20px",
  top: "20px",
 });
 closeBtn.innerHTML = "Close";
 closeBtn.onclick = () => {
  wrapper.style.display = "none";
  container.styledisplay = "none";
 };

 const heading = document.createElement("h2");
 heading.innerHTML = "Accessibility";
 heading.style.fontWeight = "bold";

 e.appendChild(button);
 wrapper.appendChild(container);
 container.appendChild(closeBtn);
 container.appendChild(heading);
 e.appendChild(wrapper);
};
