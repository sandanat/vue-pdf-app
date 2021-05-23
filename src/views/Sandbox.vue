<template>
  <div style="height: 100%">
    <div class="action-bar">
      <a :id="idConfig.viewBookmark">Current view</a>
      <span class="divider"></span>
      <button :id="idConfig.zoomIn" type="button" class="action-btn">
        Zoom in
      </button>
      <span class="divider"></span>
      <button :id="idConfig.zoomOut" type="button" class="action-btn">
        Zoom out
      </button>
      <span class="divider"></span>
      <input
        :id="idConfig.pageNumber"
        type="number"
        name="pageNumber"
        style="width: 40px"
      />
      <span class="divider"></span>
      <span :id="idConfig.numPages"></span>
      <span> pages</span>
      <span class="divider"></span>
    </div>

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
        <div class="viewer-header">
          <button :id="idConfig.openFile" class="action-btn" type="button">
            Open file
          </button>
          <span class="divider"></span>
          <button :id="idConfig.print" class="action-btn" type="button">
            Print
          </button>
          <span class="divider"></span>
          <button
            :id="idConfig.presentationMode"
            class="action-btn"
            type="button"
          >
            Presentation mode
          </button>
        </div>
      </template>
      <template #viewer-prepend>
        <div class="viewer-prepend">
          <button :id="idConfig.previousPage" class="action-btn" type="button">
            Previous page
          </button>
          <button :id="idConfig.nextPage" class="action-btn" type="button">
            Next page
          </button>
          <button :id="idConfig.download" class="action-btn" type="button">
            Download
          </button>
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
        // cursorHandTool: "vuePdfAppCursorHandTool",
        // cursorSelectTool: "vuePdfAppCursorSelectTool",
        // documentProperties: "vuePdfAppDocumentProperties",
        download: "vuePdfAppDownload",
        // findbar: "vuePdfAppFindbar",
        // findbarCaseSensitiveCheckbox: "vuePdfAppFindbarCaseSensitiveCheckbox",
        // findbarEntireWordCheckbox: "vuePdfAppFindbarEntireWordCheckbox",
        // findbarFindField: "vuePdfAppFindbarFindField",
        // findbarFindMessage: "vuePdfAppFindbarFindMessage",
        // findbarFindNextButton: "vuePdfAppFindbarFindNextButton",
        // findbarFindPreviousButton: "vuePdfAppFindbarFindPreviousButton",
        // findbarFindResultsCount: "vuePdfAppFindbarFindResultsCount",
        // findbarHighlightAllCheckbox: "vuePdfAppFindbarHighlightAllCheckbox",
        // findbarToggleButton: "vuePdfAppFindbarToggleButton",
        // firstPage: "vuePdfAppFirstPage",
        // lastPage: "vuePdfAppLastPage",
        nextPage: "vuePdfAppNextPage",
        numPages: "vuePdfAppNumPages",
        openFile: "vuePdfAppOpenFile",
        pageNumber: "vuePdfAppPageNumber",
        // pageRotateCcw: "vuePdfAppPageRotateCcw",
        // pageRotateCw: "vuePdfAppPageRotateCw",
        presentationMode: "vuePdfAppPresentationMode",
        previousPage: "vuePdfAppPreviousPage",
        print: "vuePdfAppPrint",
        // scaleSelect: "vuePdfAppScaleSelect",
        // scrollHorizontal: "vuePdfAppScrollHorizontal",
        // scrollVertical: "vuePdfAppScrollVertical",
        // scrollWrapped: "vuePdfAppScrollWrapped",
        // sidebarToggleButton: "vuePdfAppSidebarToggleButton",
        // spreadEven: "vuePdfAppSpreadEven",
        // spreadNone: "vuePdfAppSpreadNone",
        // spreadOdd: "vuePdfAppSpreadOdd",
        viewBookmark: "vuePdfAppViewBookmark",
        zoomIn: "vuePdfAppZoomIn",
        zoomOut: "vuePdfAppZoomOut",
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

.viewer-header {
  position: relative;
  z-index: 9999;
}

.viewer-prepend {
  position: absolute;
  z-index: 99999;
  right: 20px;
  bottom: 0;
  top: 40px;
  width: 80px;
}

.action-btn {
  background: #1867c0;
  padding: 5px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  color: white;
  border: none;
  outline: none;

  &[disabled] {
    cursor: default;
    background: gray;
  }
}

.action-bar {
  margin-bottom: 5px;
}

.divider {
  padding: 3px;
}
</style>