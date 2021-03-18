# v2.0.0
## Features
1. Added pdf viewer color customization via custom css properties. Refer [README.md](./README.md "README.md").
1. <span style="background: #bd011b; color:black; border-radius: 2px; padding: 0 5px">breaking</span> Added pdf-viewer icons customization.

## Other
1. <span style="background: #bd011b; color:black; border-radius: 2px; padding: 0 5px">breaking</span> Changed lib name from *pdf-viewer* to *vue-pdf-app*. Use `window["vue-pdf-app"]` instead of `window["pdf-viewer"]` for script tag.

# v1.0.1
## Bugs
1. Pdf styles mutate global styles - [dc3c6ba](https://github.com/sandanat/vue-pdf-app/pull/13/commits/dc3c6ba7d9fde22753a9073c117628179e07e63e), closes [#11](https://github.com/sandanat/vue-pdf-app/issues/11)