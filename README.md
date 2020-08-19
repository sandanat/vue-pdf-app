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

Typescript support


# 100% PDFJS functionality

![pdf sample](./readme/sample.png "Pdf expample")


# Configurable panel

Toolbar is available by default. Specify `false` for buttons or whole group of buttons to disable them.

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

# Localize panel
English is the default language for panel.
Use `<link rel="resource" type="application/l10n" href="path-to-localization-file">` in your html for localization.
See [localization file examples](https://github.com/mozilla/pdf.js/tree/master/l10n "file examples").

# API
### :pdf
- Type: `string | null | ArrayBuffer`. 
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
<vue-pdf-viewer :config="{  }" />
```
### @open(PDFViewerApplication)
