/* vite.config.js */
export default {
 build: {
  target: "modules",
  outDir: "dist",
  lib: {
   entry: "index.js",
   formats: ["umd", "cjs", "iife", "es"],
   fileName: (format) => {
    if (format == "umd") return `doodleui.js`;
    else return `doodleui.${format}.js`;
   },
   name: "DoodleUI",
  },
 },
};
