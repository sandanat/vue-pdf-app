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
  <vue-pdf-app pdf="http://example.com/sample.pdf"></vue-pdf-app>
</template>

<script>
import VuePdfApp from "vue-pdf-app";
// import this to use default icons for buttons
import "vue-pdf-app/dist/icons/main.css";

export default {
  components: {
    VuePdfApp
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

- Description: emitted when pdf is opened (pages may not be rendered at this time)
- Arguments:
  - PDFViewerApplication - [pdf application](https://github.com/mozilla/pdf.js/blob/master/web/app.js#L198)
- Usage:

```vue
<vue-pdf-viewer @open="openHandler" />
```

## Slots

- toolbar-left-prepend
- toolbar-left-append
- toolbar-middle-prepend
- toolbar-middle-append
- toolbar-right-prepend
- toolbar-right-append
- toolbar-sidebar-prepend
- toolbar-sidebar-append
- secondary-toolbar-prepend
- secondary-toolbar-append
- footer

```vue
<vue-pdf-app>
  <template #toolbar-left-prepend>
    <button type="button">Click me</button>
  </template>
</vue-pdf-app>
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
      <td>Background color for root pdf container</td>
    </tr>
    <tr>
      <td>--pdf-button-hover-font-color</td>
      <td>
        .pdf-app .toolbarButton:hover
        <hr>
        .pdf-app .toolbarButton:focus
        <hr>
        .pdf-app .dropdownToolbarButton:hover
        <hr>
        .pdf-app .secondaryToolbarButton:hover
        <hr>
        .pdf-app .secondaryToolbarButton:focus
        <hr>
      </td>
      <td>Hover color for buttons of toolbar and secondary toolbar</td>
    </tr>
    <tr>
      <td>--pdf-button-toggled-color</td>
      <td>
        .pdf-app .toolbarButton.toggled
        <hr>
        .pdf-app .splitToolbarButton.toggled > .toolbarButton.toggled
        <hr>
        .pdf-app .secondaryToolbarButton.toggled
        <hr>
        .pdf-app .outlineItemToggler:hover
        <hr>
        .pdf-app .outlineItemToggler:hover + a
        <hr>
        .pdf-app .outlineItemToggler:hover ~ .outlineItems
        <hr>
        .pdf-app .outlineItem > a:hover
        <hr>
        .pdf-app .attachmentsItem > button:hover
      </td>
      <td>
        Background color for toggleable buttons when selected, outline items on hover, attachment items on hover
        <img src="./readme/toggleable-items.jpg" alt="toggleable items">
       </td>
    </tr>
    <tr>
      <td>--pdf-dialog-button-color</td>
      <td>.pdf-app .dialog .overlayButton</td>
      <td>
        <img src="./readme/dialog-buttons.jpg" alt="dialog buttons">
      </td>
    </tr>
    <tr>
      <td>--pdf-dialog-button-font-color</td>
      <td>.pdf-app .dialog .overlayButton</td>
      <td>
        <img src="./readme/dialog-buttons.jpg" alt="dialog buttons">
      </td>
    </tr>
    <tr>
      <td>--pdf-error-more-info-color</td>
      <td>.pdf-app #errorMoreInfo</td>
      <td>
        <img src="./readme/error-more-info.jpg" alt="error more info">      
      </td>
    </tr>
    <tr>
      <td>--pdf-error-more-info-font-color</td>
      <td>.pdf-app #errorMoreInfo</td>
      <td>
        <img src="./readme/error-more-info.jpg" alt="error more info">      
      </td>
    </tr>
    <tr>
      <td>--pdf-error-wrapper-color</td>
      <td>.pdf-app #errorWrapper</td>
      <td>
        <img src="./readme/error-wrapper.jpg" alt="error wrapper">      
      </td>
    </tr>
    <tr>
      <td>--pdf-find-input-placeholder-font-color</td>
      <td>.pdf-app #findInput::placeholder</td>
      <td>
        <img src="./readme/find-input-placeholder.jpg" alt="find input placeholder">      
      </td>
    </tr>
    <tr>
      <td>--pdf-find-message-font-color</td>
      <td>.pdf-app #findMsg</td>
      <td>
        <img src="./readme/find-message.jpg" alt="find message">      
      </td>
    </tr>
    <tr>
      <td>--pdf-find-results-count-color</td>
      <td>.pdf-app #findResultsCount</td>
      <td>
        <img src="./readme/find-results-count.jpg" alt="find results count">      
      </td>
    </tr>
    <tr>
      <td>--pdf-find-results-count-font-color</td>
      <td>.pdf-app #findResultsCount</td>
      <td>
        <img src="./readme/find-results-count.jpg" alt="find results count">      
      </td>
    </tr>
    <tr>
      <td>--pdf-horizontal-toolbar-separator-color</td>
      <td>.pdf-app .horizontalToolbarSeparator</td>
      <td>
        <img src="./readme/horizontal-separator.jpg" alt="horizontal separator">      
      </td>
    </tr>
    <tr>
      <td>--pdf-input-color</td>
      <td>.pdf-app .toolbarField</td>
      <td>
        <img src="./readme/toolbar-field.jpg" alt="toolbar field">      
      </td>
    </tr>
    <tr>
      <td>--pdf-input-font-color</td>
      <td>.pdf-app .toolbarField</td>
      <td>
        <img src="./readme/toolbar-field.jpg" alt="toolbar field">      
      </td>
    </tr>
    <tr>
      <td>--pdf-loading-bar-color</td>
      <td>.pdf-app #loadingBar .progress</td>
      <td>
        <img src="./readme/loading-bar-color.jpg" alt="loading bar color">      
      </td>
    </tr>
    <tr>
      <td>--pdf-loading-bar-secondary-color</td>
      <td>.pdf-app #loadingBar .progress.indeterminate .glimmer</td>
      <td>
        <img src="./readme/loading-bar-secondary-color.jpg" alt="loading bar secondary color">      
      </td>
    </tr>
    <tr>
      <td>--pdf-not-found-color</td>
      <td>.pdf-app #findInput.notFound</td>
      <td>
        <img src="./readme/not-found.jpg" alt="not found">      
      </td>
    </tr>
    <tr>
      <td>--pdf-overlay-container-color</td>
      <td>.pdf-app #overlayContainer</td>
      <td>Background color for overlay container of dialogs</td>
    </tr>
    <tr>
      <td>--pdf-overlay-container-dialog-color</td>
      <td>.pdf-app #overlayContainer > .container > .dialog</td>
      <td>
        Background color for document properties, password, print dialogs
      </td>
    </tr>
    <tr>
      <td>--pdf-overlay-container-dialog-font-color</td>
      <td>.pdf-app #overlayContainer > .container > .dialog</td>
      <td>
        Font color for document properties, password, print dialogs
      </td>
    </tr>
    <tr>
      <td>--pdf-overlay-container-dialog-separator-color</td>
      <td>.pdf-app .dialog .separator</td>
      <td>
        <img src="./readme/dialog-separator.jpg" alt="dialog separator">      
      </td>
    </tr>
    <tr>
      <td>--pdf-sidebar-content-color</td>
      <td>.pdf-app #sidebarContent</td>
      <td>
        Background color for sidebar
      </td>
    </tr>
    <tr>
      <td>--pdf-split-toolbar-button-separator-color</td>
      <td>
        .pdf-app .splitToolbarButtonSeparator
        <hr>
        .pdf-app .verticalToolbarSeparator
      </td>
      <td>
        <img src="./readme/vertical-separator.jpg" alt="vertical separator">      
      </td>
    </tr>
    <tr>
      <td>--pdf-thumbnail-selection-ring-selected-color</td>
      <td>.pdf-app .thumbnail.selected > .thumbnailSelectionRing</td>
      <td>
        Border color for selected thumbnail
        <img src="./readme/thumbnail-border.jpg" alt="thumbnail border">
      </td>
    </tr>
    <tr>
      <td>--pdf-thumbnail-selection-ring-color</td>
      <td>
        .pdf-app a:focus > .thumbnail > .thumbnailSelectionRing
        <hr>
        .pdf-app .thumbnail:hover > .thumbnailSelectionRing
      </td>
      <td>
        Border color for thumbnail on hover and focus
        <img src="./readme/thumbnail-border.jpg" alt="thumbnail border">
      </td>
    </tr>
    <tr>
      <td>--pdf-toolbar-color</td>
      <td>
        .pdf-app #toolbarContainer
        <hr>
        .pdf-app .findbar
        <hr>
        .pdf-app .secondaryToolbar
        <hr>
        .pdf-app .doorHanger:after
        <hr>
        .pdf-app .doorHangerRight:after
        <hr>
        .pdf-app .dropdownToolbarButton > select
        <hr>
        .pdf-app .dropdownToolbarButton > select > option
      </td>
      <td>
        Background color for toolbar, findbar, secondary toolbar, page scale dropdown
      </td>
    </tr>
    <tr>
      <td>--pdf-toolbar-font-color</td>
      <td>
        .pdf-app .toolbarButton
        <hr>
        .pdf-app .dropdownToolbarButton
        <hr>
        .pdf-app .secondaryToolbarButton
        <hr>
        .pdf-app .dropdownToolbarButton > select
        <hr>
        .pdf-app .toolbarLabel
        <hr>
        .pdf-app .outlineItem > a
        <hr>
        .pdf-app .attachmentsItem > button
      </td>
      <td>
        Font color for toolbar, findbar, secondary toolbar, page scale dropdown, attachments name</td>
    </tr>
    <tr>
      <td>--pdf-toolbar-sidebar-color</td>
      <td>.pdf-app #toolbarSidebar</td>
      <td>
        <img src="./readme/sidebar.jpg" alt="sidebar">
      </td>
    </tr>
  </table>
</details>

# Icons customization

To use default icons `import "vue-pdf-app/icons/main.css";`.

To use custom icons you have to implement [icons.css](https://github.com/sandanat/vue-pdf-app/blob/master/src/sass/icons.scss):

```css
.vue-pdf-app-icon::before,
.vue-pdf-app-icon::after {
  font-family: "your font family";
}

.vue-pdf-app-icon.zoom-out::before {
  content: "icon code";
}
```

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
