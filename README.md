VUEjs v2 PDF viewer based on Mozilla's PDFJS.

100% PDFJS functionality:

- zoom
- open
- print
- download
- rotate
- text selection
- search panel
- thumbnail, outline, attachments, annotation layers

Easily localized configurable panel

Cross-browser support

Built-in typescript support

UMD/Unpkg support:
File | Size | Gzipped
 - | - | -
pdf-viewer.umd.min.js | 1777.56 KiB | 508.94 KiB
pdf-viewer.umd.js     | 3160.04 KiB | 709.14 KiB
pdf-viewer.common.js  | 3159.57 KiB | 708.95 KiB


# Example
```
<template>
  <pdf-viewer pdf="http://example.com/sample.pdf"></pdf-viewer>
</template>

<script>
import PdfViewer from "vue-pdf-app";

export default {
  components: {
    PdfViewer
  }
}
</script>
```
![pdf sample](./readme/sample.png "Pdf expample")

[See examples](https://github.com/sandanat/vue-pdf-app/tree/master/examples "Examples source code")

[Live demo](https://codesandbox.io/s/vue-2-vue-pdf-app-wz5kv)

[Live demo 2](https://codepen.io/sandanat/pen/xxVdgYM)

# Configurable panel
Toolbar is available by default and is customized via `config` prop.
Specify `false` for buttons or whole group of buttons to disable them.

```
// disable "Previous page" button
{
  toolbar: {
    toolbarViewerLeft: {
      previous: false
    }
  }
}

// disable whole page navigation panel
{
  toolbar: {
    toolbarViewerLeft: false
}

// disable whole panel
{
  toolbar: false
}
```

<details>
<summary>Available config:</summary>

![Config legend](./readme/config-legend.jpg "Config legend")

<code>
<pre>
{
  sidebar: {
    viewThumbnail: true,
    viewOutline: true,
    viewAttachments: true,
  },
  findbar: true,
  secondaryToolbar: {
    secondaryPresentationMode: true,
    secondaryOpenFile: true,
    secondaryPrint: true,
    secondaryDownload: true,
    secondaryViewBookmark: true,
    firstPage: true,
    lastPage: true,
    pageRotateCw: true,
    pageRotateCcw: true,
    cursorSelectTool: true,
    cursorHandTool: true,
    scrollVertical: true,
    scrollHorizontal: true,
    scrollWrapped: true,
    spreadNone: true,
    spreadOdd: true,
    spreadEven: true,
    documentProperties: true,
  },
  toolbar: {
    toolbarViewerLeft: {
      previous: true,
      next: true,
      pageNumber: true,
    },
    toolbarViewerRight: {
      presentationMode: true,
      openFile: true,
      print: true,
      download: true,
      viewBookmark: true,
      secondaryToolbarToggle: true,
    },
    toolbarViewerMiddle: {
      zoomOut: true,
      zoomIn: true,
      scaleSelectContatiner: true,
    },
  },
  viewerContextMenu: true,
  errorWrapper: true,
};
</pre>
</code>
</details>

# Localized panel
English is the default language for panel.
Use `<link rel="resource" type="application/l10n" href="path-to-localization-file">` in your html for localization.
See [localization file examples](https://github.com/mozilla/pdf.js/tree/master/l10n "file examples").

# API
### :pdf
- Type: `string | null | ArrayBuffer | TypedArray`. 
- Required: `false`
- Usage:
```
<vue-pdf-viewer pdf="https://example.com/sample.pdf" />
<vue-pdf-viewer :pdf="ArrayBuffer" />
```
### :config
- Type: toolbar config (see above)
- Required: `false`
- Usage:
```
<vue-pdf-viewer :config="{ toolbar: false }" />
```
### @open(PDFViewerApplication)
- Description: emitted when pdf is opened
- Arguments:
  - PDFViewerApplication - pdf application
- Usage:
```
<vue-pdf-viewer @open="openHandler" />
```

# Examples
[See examples](https://github.com/sandanat/vue-pdf-app/tree/master/examples "Examples source code") source code.

[Live demo](https://codesandbox.io/s/vue-2-vue-pdf-app-wz5kv)

[Live demo 2](https://codepen.io/sandanat/pen/xxVdgYM)


## script tag (unpkg)
```
<!DOCTYPE html>
<html lang="en">

<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta charset="utf-8">
  <title>pdf-viewer demo</title>
  <script src="https://unpkg.com/vue"></script>
  <script src="https://unpkg.com/vue-pdf-app"></script>
</head>

<body>
  <div id="app" style="height: 100%;">
    <pdf-app pdf="/sample.pdf"></pdf-app>
  </div>
  <script>
    new Vue({
      components: {
        PdfApp: window["pdf-viewer"]
      }
    }).$mount('#app')
  </script>
</body>

</html>
```
## typescript
```
<template>
  <div id="app">
    <pdf-app pdf="/sample.pdf"></pdf-app>
  </div>
</template>

<script lang="ts">
import PdfApp from "vue-pdf-app";
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
    PdfApp
  },
})
export default class App extends Vue {}
</script>
```
## Lazy loading
PDFJS is a huge package (see the library size table above).
So use lazy loading to split your bundle into small pieces.
```
<template>
  <div id="app">
    <pdf-viewer></pdf-viewer>
  </div>
</template>

<script>
import Loader from "./components/Loader.vue";

export default {
  name: "App",
  components: {
    "pdf-viewer": () => ({
      component: new Promise((res) => {
        return setTimeout(
          () => res(import(/* webpackChunkName: "pdf-viewer" */ "vue-pdf-app")),
          4000
        );
      }),
      loading: Loader,
    }),
  },
};
</script>
```
## PDFJS interaction
You can interact with pdfjs library when pdf is opened via `open` event.
```
<template>
  <div id="app">
    <div id="pdf-wrapper">
      <pdf-app pdf="/sample.pdf" @open="openHandler"></pdf-app>
    </div>
    <div id="info">
      <h1>PDF info:</h1>
      <div v-for="item in info" :key="item.name">
        <span>{{ item.name }}: {{ item.value }}</span>
        <br />
      </div>
    </div>
  </div>
</template>

<script>
import PdfApp from "vue-pdf-app";

export default {
  name: "App",
  components: {
    PdfApp,
  },
  data() {
    return {
      info: [],
    };
  },
  methods: {
    async openHandler(PDFViewerApplication) {
      this.info = [];
      const info = await PDFViewerApplication.pdfDocument
        .getMetadata()
        .catch(console.error.bind(console));

      if (!info) return;
      const props = Object.keys(info.info);
      props.forEach((prop) => {
        const obj = {
          name: prop,
          value: info.info[prop],
        };
        this.info.push(obj);
      });
    },
  },
};
</script>
```