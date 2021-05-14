<template>
  <pdf-viewer
    :pdf="pdf"
    :config="config"
    @after-created="afterCreated"
    @open="open"
    @pages-rendered="pagesRendered"
    style="position: relative"
  >
    <template #viewer-header>
      <div class="sergeev-header"></div>
    </template>
    <template #viewer-prepend>
      <div class="sergeev-prepend"></div>
    </template>
    <template #viewer-append>
      <div class="sergeev-append"></div>
      <div class="sergeev-append"></div>
    </template>
    <template #viewer-footer>
      <div class="sergeev-footer"></div>
    </template>
    <template #footer>
      <button @click="togglePdf" type="button">Toggle pdf</button>
    </template>
    <!-- <template #footer>
      <div class="footer">
        <span>Footer</span>
        <input v-model="scale" type="text" />
        <input :id="configIds.pageNumber" type="number" />
        <span :id="configIds.numPages" type="button">numPages</span>
        <button :id="configIds.firstPage" type="button">firstPage</button>
        <button :id="configIds.lastPage" type="button">lastPage</button>
        <button :id="configIds.pageRotateCw" type="button">pageRotateCw</button>
        <button :id="configIds.pageRotateCcw" type="button">
          pageRotateCcw
        </button>
        <button :id="configIds.cursorSelectTool" type="button">
          cursorSelectTool
        </button>
        <button :id="configIds.cursorHandTool" type="button">
          cursorHandTool
        </button>
        <button :id="configIds.scrollVertical" type="button">
          scrollVertical
        </button>
        <button :id="configIds.scrollHorizontal" type="button">
          scrollHorizontal
        </button>
        <button :id="configIds.scrollWrapped" type="button">
          scrollWrapped
        </button>
        <button :id="configIds.spreadNone" type="button">spreadNone</button>
        <button :id="configIds.spreadOdd" type="button">spreadOdd</button>
        <button :id="configIds.spreadEven" type="button">spreadEven</button>
        <button :id="configIds.documentProperties" type="button">
          documentProperties
        </button>
        <button :id="configIds.previousPage" type="button">previousPage</button>
        <button :id="configIds.nextPage" type="button">nextPage</button>
        <button :id="configIds.zoomOut" type="button">zoomOut</button>
        <button :id="configIds.zoomIn" type="button">zoomIn</button>
        <button :id="configIds.scaleSelect" type="button">scaleSelect</button>
        <button :id="configIds.presentationMode" type="button">
          presentationMode
        </button>
        <button :id="configIds.openFile" type="button">openFile</button>
        <button :id="configIds.print" type="button">print</button>
        <button :id="configIds.download" type="button">download</button>
        <button :id="configIds.sidebarToggleButton" type="button">
          sidebarToggleButton
        </button>
        <a :id="configIds.viewBookmark" href="#">viewBookmark</a>
        <button :id="configIds.findbar" type="button">findbar</button>
<button :id="configIds.findbarToggleButton" type="button">findbarToggleButton</button>
<button :id="configIds.findbarFindField" type="button">findbarFindField</button>
<button :id="configIds.findbarHighlightAllCheckbox" type="button">findbarHighlightAllCheckbox</button>
<button :id="configIds.findbarCaseSensitiveCheckbox" type="button">findbarCaseSensitiveCheckbox</button>
<button :id="configIds.findbarEntireWordCheckbox" type="button">findbarEntireWordCheckbox</button>
<button :id="configIds.findbarFindMessage" type="button">findbarFindMessage</button>
<button :id="configIds.findbarFindResultsCount" type="button">findbarFindResultsCount</button>
<button :id="configIds.findbarFindPreviousButton" type="button">findbarFindPreviousButton</button>
<button :id="configIds.findbarFindNextButton" type="button">findbarFindNextButton</button>
      </div>
    </template> -->
  </pdf-viewer>
</template>

<script>
import PdfViewer from "@/components/pdf-viewer.vue";

export default {
  components: {
    PdfViewer,
  },
  data() {
    return {
      config: {
        // toolbar: {
        //   toolbarViewerLeft: {
        //     pageNumber: false,
        //   },
        // },
      },
      configIds: {
        // firstPage: "vuePdfAppFirstPage",
        // lastPage: "vuePdfAppLastPage",
        // pageRotateCw: "vuePdfAppPageRotateCw",
        // pageRotateCcw: "vuePdfAppPageRotateCcw",
        // cursorSelectTool: "vuePdfAppCursorSelectTool",
        // cursorHandTool: "vuePdfAppCursorHandTool",
        // scrollVertical: "vuePdfAppScrollVertical",
        // scrollHorizontal: "vuePdfAppScrollHorizontal",
        // scrollWrapped: "vuePdfAppScrollWrapped",
        spreadNone: "vuePdfAppSpreadNone",
        spreadOdd: "vuePdfAppSpreadOdd",
        spreadEven: "vuePdfAppSpreadEven",
        // documentProperties: "vuePdfAppDocumentProperties",
        // previousPage: "vuePdfAppPreviousPage",
        // nextPage: "vuePdfAppNextPage",
        // pageNumber: "vuePdfAppPageNumber",
        // numPages: "vuePdfAppNumPages",
        // zoomOut: "vuePdfAppZoomOut",
        // zoomIn: "vuePdfAppZoomIn",
        // scaleSelect: "vuePdfAppScaleSelect",
        // presentationMode: "vuePdfAppPresentationMode",
        // openFile: "vuePdfAppOpenFile",
        // print: "vuePdfAppPrint",
        // download: "vuePdfAppDownload",
        // viewBookmark: "vuePdfAppViewBookmark",
        // sidebarToggleButton: "vuePdfAppSidebarToggleButton",
        // findbar: "vuePdfAppFindbar",
        // findbarToggleButton: "vuePdfAppFindbarToggleButton",
        // findbarFindField: "vuePdfAppFindbarFindField",
        // findbarHighlightAllCheckbox: "vuePdfAppFindbarHighlightAllCheckbox",
        // findbarCaseSensitiveCheckbox: "vuePdfAppFindbarCaseSensitiveCheckbox",
        // findbarEntireWordCheckbox: "vuePdfAppFindbarEntireWordCheckbox",
        // findbarFindMessage: "vuePdfAppFindbarFindMessage",
        // findbarFindResultsCount: "vuePdfAppFindbarFindResultsCount",
        // findbarFindPreviousButton: "vuePdfAppFindbarFindPreviousButton",
        // findbarFindNextButton: "vuePdfAppFindbarFindNextButton",
      },
      scale: "1",
      pdf: null,
    };
  },
  methods: {
    afterCreated(pdfApp) {
      window._pdfApp = pdfApp;
      console.log("===***=== After created");
    },
    open() {
      console.log("===***=== Opened");
    },
    pagesRendered() {
      console.log("===***=== Pages rendered");
    },
    togglePdf() {
      this.pdf = !this.pdf ? "/sample.pdf" : null;
    },
  },
};
</script>

<style lang="scss" scoped>
$footer-height: 50px;

.footer {
  background: red;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: $footer-height;
}

::v-deep #outerContainer {
  height: calc(100% - #{$footer-height}) !important;
}
</style>