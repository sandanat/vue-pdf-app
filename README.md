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

Cross-browser support (including IE11)

Color customization (IE11 not supported)

Buttons icons customization

Built-in typescript support

UMD/Unpkg support:

| File                   | Size        | Gzipped    |
| ---------------------- | ----------- | ---------- |
| vue-pdf-app.umd.min.js | 1777.56 KiB | 508.94 KiB |
| vue-pdf-app.umd.js     | 3160.04 KiB | 709.14 KiB |
| vue-pdf-app.common.js  | 3159.57 KiB | 708.95 KiB |

# Example

```vue
<template>
  <pdf-viewer pdf="http://example.com/sample.pdf"></pdf-viewer>
</template>

<script>
import PdfViewer from "vue-pdf-app";
// import this to use default icons for buttons
import "vue-pdf-app/icons/main.css";

export default {
  components: {
    PdfViewer
  }
};
</script>
```

![pdf sample](./readme/sample.png "Pdf expample")

[See examples](https://github.com/sandanat/vue-pdf-app/tree/master/examples "Examples source code")

[Live demo](https://codesandbox.io/s/vue-2-vue-pdf-app-wz5kv)

[Live demo 2](https://codepen.io/sandanat/pen/xxVdgYM)

# API

## :pdf

- Type: `string | null | ArrayBuffer | TypedArray`.
- Required: `false`
- Usage:

```vue
<vue-pdf-viewer pdf="https://example.com/sample.pdf" />
<vue-pdf-viewer :pdf="ArrayBuffer" />
```

## :config

- Type: toolbar config (see below)
- Required: `false`
- Usage:

```vue
<vue-pdf-viewer :config="{ toolbar: false }" />
```

## @open(PDFViewerApplication)

- Description: emitted when pdf is opened
- Arguments:
  - PDFViewerApplication - [pdf application](https://github.com/mozilla/pdf.js/blob/master/web/app.js#L198)
- Usage:

```vue
<vue-pdf-viewer @open="openHandler" />
```

# Color customization (IE11 not supported)

Colors of the pdf viewer are customized via custom css properties:

```html
<style>
  :root {
    --pdf-toolbar-color: red;
  }
</style>
```

<details>
  <summary>Custom css properties specification</summary>
  <table>
    <tr>
      <th>Property</th>
      <th>Applied to selectors</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>--pdf-app-background-color</td>
      <td>.pdf-app</td>
      <td>Root pdf container</td>
    </tr>
    <tr>
      <td>--pdf-button-hover-font-color</td>
      <td>
        .pdf-app .toolbarButton:hover
        <br>
        .pdf-app .toolbarButton:focus
        <br>
        .pdf-app .dropdownToolbarButton:hover
        <br>
        .pdf-app .secondaryToolbarButton:hover
        <br>
        .pdf-app .secondaryToolbarButton:focus
        <br>
      </td>
      <td>Hover buttons for toolbar and secondary toolbar</td>
    </tr>
    <tr>
      <td>--pdf-button-toggled-color</td>
      <td>
        .pdf-app .toolbarButton.toggled
        <br>
        .pdf-app .splitToolbarButton.toggled > .toolbarButton.toggled
        <br>
        .pdf-app .secondaryToolbarButton.toggled
        <br>
        .pdf-app .outlineItemToggler:hover
        <br>
        .pdf-app .outlineItemToggler:hover + a
        <br>
        .pdf-app .outlineItemToggler:hover ~ .outlineItems
        <br>
        .pdf-app .outlineItem > a:hover
        <br>
        .pdf-app .attachmentsItem > button:hover
      </td>
      <td>Toggleable buttons when selected, outline items on hover, attachment items on hover
      <img src="./readme/toggleable-items.jpg" alt="toggleable items"/>
       </td>
    </tr>
    <tr>
      <td>--pdf-dialog-button-color</td>
      <td>.pdf-app .dialog .overlayButton</td>
      <td></td>
    </tr>
    <tr>
      <td>--pdf-dialog-button-font-color</td>
      <td>.pdf-app .dialog .overlayButton</td>
      <td></td>
    </tr>
    <tr>
      <td>--pdf-error-more-info-color</td>
      <td>.pdf-app #errorMoreInfo</td>
      <td></td>
    </tr>
    <tr>
      <td>--pdf-error-more-info-font-color</td>
      <td>.pdf-app #errorMoreInfo</td>
      <td></td>
    </tr>
    <tr>
      <td>--pdf-error-wrapper-color</td>
      <td>.pdf-app #errorWrapper</td>
      <td></td>
    </tr>
    <tr>
      <td>--pdf-find-input-placeholder-font-color</td>
      <td>.pdf-app #findInput::placeholder</td>
      <td></td>
    </tr>
    <tr>
      <td>--pdf-find-message-font-color</td>
      <td>.pdf-app #findMsg</td>
      <td></td>
    </tr>
    <tr>
      <td>--pdf-find-results-count-color</td>
      <td>.pdf-app #findResultsCount</td>
      <td></td>
    </tr>
    <tr>
      <td>--pdf-find-results-count-font-color</td>
      <td>.pdf-app #findResultsCount</td>
      <td></td>
    </tr>
    <tr>
      <td>--pdf-horizontal-toolbar-separator-color</td>
      <td>.pdf-app .horizontalToolbarSeparator</td>
      <td></td>
    </tr>
    <tr>
      <td>--pdf-input-color</td>
      <td>.pdf-app .toolbarField</td>
      <td></td>
    </tr>
    <tr>
      <td>--pdf-input-font-color</td>
      <td>.pdf-app .toolbarField</td>
      <td></td>
    </tr>
    <tr>
      <td>--pdf-loading-bar-color</td>
      <td>.pdf-app #loadingBar .progress</td>
      <td></td>
    </tr>
    <tr>
      <td>--pdf-loading-bar-secondary-color</td>
      <td>.pdf-app #loadingBar .progress.indeterminate .glimmer</td>
      <td></td>
    </tr>
    <tr>
      <td>--pdf-not-found-color</td>
      <td>.pdf-app #findInput.notFound</td>
      <td></td>
    </tr>
    <tr>
      <td>--pdf-overlay-container-color</td>
      <td>.pdf-app #overlayContainer</td>
      <td></td>
    </tr>
    <tr>
      <td>--pdf-overlay-container-dialog-color</td>
      <td>.pdf-app #overlayContainer > .container > .dialog</td>
      <td></td>
    </tr>
    <tr>
      <td>--pdf-overlay-container-dialog-font-color</td>
      <td>.pdf-app #overlayContainer > .container > .dialog</td>
      <td></td>
    </tr>
    <tr>
      <td>--pdf-overlay-container-dialog-separator-color</td>
      <td>.pdf-app .dialog .separator</td>
      <td></td>
    </tr>
    <tr>
      <td>--pdf-sidebar-content-color</td>
      <td>.pdf-app #sidebarContent</td>
      <td></td>
    </tr>
    <tr>
      <td>--pdf-split-toolbar-button-separator-color</td>
      <td>
        .pdf-app .splitToolbarButtonSeparator
        <br>
        .pdf-app .verticalToolbarSeparator
      </td>
      <td></td>
    </tr>
    <tr>
      <td>--pdf-thumbnail-selection-ring-selected</td>
      <td>.pdf-app .thumbnail.selected > .thumbnailSelectionRing</td>
      <td></td>
    </tr>
    <tr>
      <td>--pdf-thumbnail-selection-ring</td>
      <td>
        .pdf-app a:focus > .thumbnail > .thumbnailSelectionRing
        <br>
        .pdf-app .thumbnail:hover > .thumbnailSelectionRing
      </td>
      <td></td>
    </tr>
    <tr>
      <td>--pdf-toolbar-color</td>
      <td>
        .pdf-app #toolbarContainer
        <br>
        .pdf-app .findbar
        <br>
        .pdf-app .secondaryToolbar
        <br>
        .pdf-app .doorHanger:after
        <br>
        .pdf-app .doorHangerRight:after
        <br>
        .pdf-app .dropdownToolbarButton > select
        <br>
        .pdf-app .dropdownToolbarButton > select > option
      </td>
      <td></td>
    </tr>
    <tr>
      <td>--pdf-toolbar-font-color</td>
      <td>
        .pdf-app .toolbarButton
        <br>
        .pdf-app .dropdownToolbarButton
        <br>
        .pdf-app .secondaryToolbarButton
        <br>
        .pdf-app .overlayButton
        <br>
        .pdf-app .dropdownToolbarButton > select
        <br>
        .pdf-app .toolbarLabel
        <br>
        .pdf-app .outlineItem > a
        <br>
        .pdf-app .attachmentsItem > button
      </td>
      <td></td>
    </tr>
    <tr>
      <td>--pdf-toolbar-sidebar-color</td>
      <td>.pdf-app #toolbarSidebar</td>
      <td></td>
    </tr>
  </table>
</details>

# Configurable panel

Toolbar is available by default and is customized via `config` prop.
Specify `false` for buttons or whole group of buttons to disable them.

```javascript
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
<summary>Config specification</summary>

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

# Examples

[See examples](https://github.com/sandanat/vue-pdf-app/tree/master/examples "Examples source code") source code.

[Live demo](https://codesandbox.io/s/vue-2-vue-pdf-app-wz5kv)

[Live demo 2](https://codepen.io/sandanat/pen/xxVdgYM)

## script tag (unpkg)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta charset="utf-8" />
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
          PdfApp: window["vue-pdf-app"]
        }
      }).$mount("#app");
    </script>
  </body>
</html>
```

## typescript

```vue
<template>
  <div id="app">
    <pdf-app pdf="/sample.pdf"></pdf-app>
  </div>
</template>

<script lang="ts">
import PdfApp from "vue-pdf-app";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    PdfApp
  }
})
export default class App extends Vue {}
</script>
```

## Lazy loading

PDFJS is a huge package (see the library size table above).
So use lazy loading to split your bundle into small pieces.

```vue
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
      loading: Loader
    })
  }
};
</script>
```

## PDFJS interaction

You can interact with pdfjs library when pdf is opened via `open` event.

```vue
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
    PdfApp
  },
  data() {
    return {
      info: []
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
          value: info.info[prop]
        };
        this.info.push(obj);
      });
    }
  }
};
</script>
```
