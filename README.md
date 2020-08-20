VUEjs PDF viewer base on Mozilla's PDFJS.

100% PDFJS functionality:

- zoom
- open
- print
- download
- rotate
- text selection
- search panel
- thumbnail, outline, attachments layers

Easily localized configurable panel

Cross-browser support

# Example
```
<template>
  <pdf-viewer pdf="http://example.com/sample.pdf"></pdf-viewer>
</template>

<script>
import PdfViewer from "vue-pdf-viewer";

export default {
  components: {
    PdfViewer
  }
}
</script>
```
![pdf sample](./readme/sample.png "Pdf expample")


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