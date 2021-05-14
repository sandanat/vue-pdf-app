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
      <div class="viewer-header"></div>
    </template>
    <template #viewer-prepend>
      <div class="viewer-prepend">
        <button :id="idConfig.zoomIn" type="button">Zoom in</button>
      </div>
    </template>
    <template #viewer-append>
      <div class="viewer-append"></div>
      <div class="viewer-append"></div>
    </template>
    <template #viewer-footer>
      <div class="viewer-footer"></div>
    </template>
    <template #footer>
      <button @click="togglePdf" type="button">Toggle pdf</button>
    </template>
    <!-- <template #footer>
      <div class="footer">
        <span>Footer</span>
        <input v-model="scale" type="text" />
        <input :id="idConfig.pageNumber" type="number" />
        <span :id="idConfig.numPages" type="button">numPages</span>
        <button :id="idConfig.firstPage" type="button">firstPage</button>
        <button :id="idConfig.lastPage" type="button">lastPage</button>
        <button :id="idConfig.pageRotateCw" type="button">pageRotateCw</button>
        <button :id="idConfig.pageRotateCcw" type="button">
          pageRotateCcw
        </button>
        <button :id="idConfig.cursorSelectTool" type="button">
          cursorSelectTool
        </button>
        <button :id="idConfig.cursorHandTool" type="button">
          cursorHandTool
        </button>
        <button :id="idConfig.scrollVertical" type="button">
          scrollVertical
        </button>
        <button :id="idConfig.scrollHorizontal" type="button">
          scrollHorizontal
        </button>
        <button :id="idConfig.scrollWrapped" type="button">
          scrollWrapped
        </button>
        <button :id="idConfig.spreadNone" type="button">spreadNone</button>
        <button :id="idConfig.spreadOdd" type="button">spreadOdd</button>
        <button :id="idConfig.spreadEven" type="button">spreadEven</button>
        <button :id="idConfig.documentProperties" type="button">
          documentProperties
        </button>
        <button :id="idConfig.previousPage" type="button">previousPage</button>
        <button :id="idConfig.nextPage" type="button">nextPage</button>
        <button :id="idConfig.zoomOut" type="button">zoomOut</button>
        <button :id="idConfig.zoomIn" type="button">zoomIn</button>
        <button :id="idConfig.scaleSelect" type="button">scaleSelect</button>
        <button :id="idConfig.presentationMode" type="button">
          presentationMode
        </button>
        <button :id="idConfig.openFile" type="button">openFile</button>
        <button :id="idConfig.print" type="button">print</button>
        <button :id="idConfig.download" type="button">download</button>
        <button :id="idConfig.sidebarToggleButton" type="button">
          sidebarToggleButton
        </button>
        <a :id="idConfig.viewBookmark" href="#">viewBookmark</a>
        <button :id="idConfig.findbar" type="button">findbar</button>
<button :id="idConfig.findbarToggleButton" type="button">findbarToggleButton</button>
<button :id="idConfig.findbarFindField" type="button">findbarFindField</button>
<button :id="idConfig.findbarHighlightAllCheckbox" type="button">findbarHighlightAllCheckbox</button>
<button :id="idConfig.findbarCaseSensitiveCheckbox" type="button">findbarCaseSensitiveCheckbox</button>
<button :id="idConfig.findbarEntireWordCheckbox" type="button">findbarEntireWordCheckbox</button>
<button :id="idConfig.findbarFindMessage" type="button">findbarFindMessage</button>
<button :id="idConfig.findbarFindResultsCount" type="button">findbarFindResultsCount</button>
<button :id="idConfig.findbarFindPreviousButton" type="button">findbarFindPreviousButton</button>
<button :id="idConfig.findbarFindNextButton" type="button">findbarFindNextButton</button>
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
      idConfig: {
        // firstPage: "vuePdfAppFirstPage",
        // lastPage: "vuePdfAppLastPage",
        // pageRotateCw: "vuePdfAppPageRotateCw",
        // pageRotateCcw: "vuePdfAppPageRotateCcw",
        // cursorSelectTool: "vuePdfAppCursorSelectTool",
        // cursorHandTool: "vuePdfAppCursorHandTool",
        // scrollVertical: "vuePdfAppScrollVertical",
        // scrollHorizontal: "vuePdfAppScrollHorizontal",
        // scrollWrapped: "vuePdfAppScrollWrapped",
        // spreadNone: "vuePdfAppSpreadNone",
        // spreadOdd: "vuePdfAppSpreadOdd",
        // spreadEven: "vuePdfAppSpreadEven",
        // documentProperties: "vuePdfAppDocumentProperties",
        // previousPage: "vuePdfAppPreviousPage",
        // nextPage: "vuePdfAppNextPage",
        // pageNumber: "vuePdfAppPageNumber",
        // numPages: "vuePdfAppNumPages",
        // zoomOut: "vuePdfAppZoomOut",
        zoomIn: "vuePdfAppZoomIn",
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