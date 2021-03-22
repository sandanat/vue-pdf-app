const fs = require("fs-extra");
const path = require("path");

fs.remove(
  path.resolve(
    __dirname,
    "examples/the-most-complete-example/node_modules/vue-pdf-app/dist"
  )
);

let from = path.resolve(__dirname, "package.json");
let to = path.resolve(
  __dirname,
  "examples/the-most-complete-example/node_modules/vue-pdf-app/package.json"
);
fs.copy(from, to);

from = path.resolve(__dirname, "dist");
to = path.resolve(
  __dirname,
  "examples/the-most-complete-example/node_modules/vue-pdf-app/dist"
);
fs.copy(from, to);
