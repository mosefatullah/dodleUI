/* vite.config.js */
export default {
 build: {
  target: "modules",
  outDir: "dist",
  lib: {
   entry: "index.js",
   formats: ["umd", "es"],
   fileName: (format) => {
    if (format == "es") return `dodleui.js`;
    else return `dodleui.${format}.js`;
   },
   name: "DodleUI",
  },
 },
};
