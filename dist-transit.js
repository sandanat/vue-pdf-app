const fs = require("fs-extra");
const path = require("path");

fs.removeSync(
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
fs.copySync(from, to);

from = path.resolve(__dirname, "dist");
to = path.resolve(
  __dirname,
  "examples/the-most-complete-example/node_modules/vue-pdf-app/dist"
);
fs.mkdirSync(
  path.resolve(
    __dirname,
    "examples/the-most-complete-example/node_modules/vue-pdf-app/dist"
  )
);
fs.copySync(from, to);
