// vite.config.js
export default {
 build: {
  target: "modules",
  outDir: "dist",
  lib: {
   entry: "index.js",
   fileName: (format) => `doodleui.${format}.js`,
   name: "DoodleUI",
  },
 },
};
