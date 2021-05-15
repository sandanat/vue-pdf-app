<template>
  <div style="height: 100%">
    <button :id="idConfig.zoomIn" type="button">Zoom in</button>

    <pdf-viewer
      :pdf="pdf"
      :config="config"
      :id-config="idConfig"
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
          <button :id="idConfig.zoomOut" type="button">Zoom out</button>
        </div>
      </template>
      <template #viewer-append>
        <div class="viewer-append"></div>
      </template>
      <template #viewer-footer>
        <div class="viewer-footer"></div>
      </template>
      <template #footer>
        <button @click="togglePdf" type="button">Toggle pdf</button>
      </template>
    </pdf-viewer>
  </div>
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
        //   toolbarViewerMiddle: {
        //     zoomIn: true,
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
        zoomOut: "vuePdfAppZoomOut",
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
      pdf: "sample.pdf",
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
      this.pdf = !this.pdf ? "sample.pdf" : null;
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

.viewer-prepend {
  position: absolute;
  z-index: 99999;
  right: 0;
  bottom: 0;
  top: 0;
}
</style>