<template>
  <div style="height: 90%">
    <div class="action-bar">
      <a :id="idConfig.viewBookmark">Current view</a>
      <span class="divider"></span>
      <button
        :id="idConfig.zoomIn"
        type="button"
        class="action-btn"
        title="Zoom in"
      >
        <span class="mdi mdi-plus-circle-outline"></span>
      </button>
      <span class="divider"></span>
      <button
        :id="idConfig.zoomOut"
        type="button"
        class="action-btn"
        title="Zoom out"
      >
        <span class="mdi mdi-minus-circle-outline"></span>
      </button>
      <span class="divider"></span>
      <button
        :id="idConfig.download"
        class="action-btn"
        type="button"
        title="Download"
      >
        <span class="mdi mdi-download-circle-outline"></span>
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
    </div>
    <pdf-viewer
      :pdf="pdf"
      :config="{ toolbar: false }"
      :id-config="idConfig"
      @after-created="afterCreated"
      @open="open"
      @pages-rendered="pagesRendered"
      style="position: relative"
    >
      <template #viewer-header>
        <div class="viewer-header">
          <button
            :id="idConfig.openFile"
            class="action-btn"
            type="button"
            title="Open file"
          >
            <span class="mdi mdi-file-upload-outline"></span>
          </button>
          <span class="divider"></span>
          <button
            :id="idConfig.print"
            class="action-btn"
            type="button"
            title="Print"
          >
            <span class="mdi mdi-printer"></span>
          </button>
          <span class="divider"></span>
          <button
            :id="idConfig.presentationMode"
            class="action-btn"
            type="button"
            title="Presentation mode"
          >
            <span class="mdi mdi-presentation"></span>
          </button>
          <span class="divider"></span>
          <button
            :id="idConfig.toggleFindbar"
            class="action-btn"
            type="button"
            title="Toggle findbar"
          >
            <span class="mdi mdi-magnify"></span>
          </button>
        </div>
      </template>
      <template #viewer-prepend="{ isSidebarHidden }">
        <div class="viewer-prepend">
          <button
            :id="idConfig.firstPage"
            class="action-btn"
            type="button"
            title="First page"
          >
            <span class="mdi mdi-skip-backward"></span>
          </button>
          <span class="v-divider"></span>
          <button
            :id="idConfig.previousPage"
            class="action-btn"
            type="button"
            title="Previous page"
          >
            <span class="mdi mdi-skip-previous"></span>
          </button>
          <span class="v-divider"></span>
          <button
            :id="idConfig.nextPage"
            class="action-btn"
            type="button"
            title="Next page"
          >
            <span class="mdi mdi-skip-next"></span>
          </button>
          <span class="v-divider"></span>
          <button
            :id="idConfig.lastPage"
            class="action-btn"
            type="button"
            title="Last page"
          >
            <span class="mdi mdi-skip-forward"></span>
          </button>
          <!-- don't use v-if here -->
          <!-- otherwise got an error -->
          <span class="v-divider"></span>
          <button
            :id="idConfig.sidebarToggle"
            class="action-btn"
            type="button"
            title="Toggle sidebar"
          >
            <span class="mdi mdi-page-layout-sidebar-left"></span>
          </button>
          <span class="v-divider"></span>
          <div v-show="!isSidebarHidden">
            <button
              :id="idConfig.viewThumbnail"
              class="action-btn"
              type="button"
              title="Thumbnail view"
            >
              <span class="mdi mdi-file-image"></span>
            </button>
            <span class="v-divider"></span>
            <button
              :id="idConfig.viewOutline"
              class="action-btn"
              type="button"
              title="Outline view"
            >
              <span class="mdi mdi-table-of-contents"></span>
            </button>
            <span class="v-divider"></span>
            <button
              :id="idConfig.viewAttachments"
              class="action-btn"
              type="button"
              title="Attachments view"
            >
              <span class="mdi mdi-paperclip"></span>
            </button>
          </div>
        </div>
      </template>
      <template #viewer-footer="{ isFindbarHidden }">
        <div class="viewer-footer">
          <div>
            <button
              :id="idConfig.cursorHandTool"
              class="action-btn"
              type="button"
              title="Hand tool"
            >
              <span class="mdi mdi-hand-right"></span>
            </button>
            <span class="divider"></span>
            <button
              :id="idConfig.cursorSelectTool"
              class="action-btn"
              type="button"
              title="Select tool"
            >
              <span class="mdi mdi-cursor-text"></span>
            </button>
            <span class="divider"></span>
            <button
              :id="idConfig.documentProperties"
              class="action-btn"
              type="button"
              title="Document properties"
            >
              <span class="mdi mdi-alert-circle-outline"></span>
            </button>
            <span class="divider"></span>
            <button
              :id="idConfig.scrollVertical"
              class="action-btn"
              type="button"
              title="Scroll vertical"
            >
              <span class="mdi mdi-arrow-expand-vertical"></span>
            </button>
            <span class="divider"></span>
            <button
              :id="idConfig.scrollWrapped"
              class="action-btn"
              type="button"
              title="Scroll wrapped"
            >
              <span class="mdi mdi-view-dashboard"></span>
            </button>
            <span class="divider"></span>
            <button
              :id="idConfig.scrollHorizontal"
              class="action-btn"
              type="button"
              title="Scroll horizontal"
            >
              <span class="mdi mdi-arrow-expand-horizontal"></span>
            </button>
          </div>
          <div>
            <button
              :id="idConfig.pageRotateCcw"
              class="action-btn"
              type="button"
              title="Rotate counterclockwise"
            >
              <span class="mdi mdi-rotate-left"></span>
            </button>
            <span class="divider"></span>
            <button
              :id="idConfig.pageRotateCw"
              class="action-btn"
              type="button"
              title="Rotate clockwise"
            >
              <span class="mdi mdi-rotate-right"></span>
            </button>
            <span class="divider"></span>
            <button
              :id="idConfig.spreadEven"
              class="action-btn"
              type="button"
              title="Spread even"
            >
              <span class="mdi mdi-numeric-2-circle-outline"></span>
            </button>
            <span class="divider"></span>
            <button
              :id="idConfig.spreadNone"
              class="action-btn"
              type="button"
              title="Spread none"
            >
              <span class="mdi mdi-view-agenda-outline"></span>
            </button>
            <span class="divider"></span>
            <button
              :id="idConfig.spreadOdd"
              class="action-btn"
              type="button"
              title="Spread odd"
            >
              <span class="mdi mdi-numeric-1-circle-outline"></span>
            </button>
          </div>
          <div
            v-show="!isFindbarHidden"
            :id="idConfig.findbar"
            class="vue-pdf-app-findbar"
          >
            <input :id="idConfig.findInput" type="text" />
            <span class="divider"></span>
            <button
              :id="idConfig.findPrevious"
              class="action-btn"
              title="Find previous"
            >
              <span class="mdi mdi-arrow-left-thick"></span>
            </button>
            <span class="divider"></span>
            <button
              :id="idConfig.findNext"
              class="action-btn"
              title="Find next"
            >
              <span class="mdi mdi-arrow-right-thick"></span>
            </button>
            <span class="divider"></span>
            <input :id="idConfig.findHighlightAll" type="checkbox" />
            <label :for="idConfig.findHighlightAll">Highlight all</label>
            <span class="divider"></span>
            <input :id="idConfig.findMatchCase" type="checkbox" />
            <label :for="idConfig.findMatchCase">Match case</label>
            <span class="divider"></span>
            <input :id="idConfig.findEntireWord" type="checkbox" />
            <label :for="idConfig.findEntireWord">Entire word</label>
            <span class="divider"></span>
            <span :id="idConfig.findMessage"></span>
            <span class="divider"></span>
            <span :id="idConfig.findResultsCount"></span>
          </div>
        </div>
      </template>
    </pdf-viewer>
  </div>
</template>

<script>
import "@mdi/font/css/materialdesignicons.css";
import PdfViewer from "@/components/pdf-viewer.vue";

export default {
  components: {
    PdfViewer,
  },
  data() {
    return {
      idConfig: {
        cursorHandTool: "vuePdfAppCursorHandTool",
        cursorSelectTool: "vuePdfAppCursorSelectTool",
        documentProperties: "vuePdfAppDocumentProperties",
        download: "vuePdfAppDownload",
        findbar: "vuePdfAppFindbar",
        findEntireWord: "vuePdfAppFindEntireWord",
        findHighlightAll: "vuePdfAppFindHighlightAll",
        findInput: "vuePdfAppFindInput",
        findMessage: "vuePdfAppFindMessage",
        findMatchCase: "vuePdfAppFindMatchCase",
        findNext: "vuePdfAppFindNext",
        findPrevious: "vuePdfAppFindPrevious",
        findResultsCount: "vuePdfAppFindResultsCount",
        firstPage: "vuePdfAppFirstPage",
        lastPage: "vuePdfAppLastPage",
        nextPage: "vuePdfAppNextPage",
        numPages: "vuePdfAppNumPages",
        openFile: "vuePdfAppOpenFile",
        pageNumber: "vuePdfAppPageNumber",
        pageRotateCcw: "vuePdfAppPageRotateCcw",
        pageRotateCw: "vuePdfAppPageRotateCw",
        presentationMode: "vuePdfAppPresentationMode",
        previousPage: "vuePdfAppPreviousPage",
        print: "vuePdfAppPrint",
        scrollHorizontal: "vuePdfAppScrollHorizontal",
        scrollVertical: "vuePdfAppScrollVertical",
        scrollWrapped: "vuePdfAppScrollWrapped",
        sidebarToggle: "vuePdfAppSidebarToggle",
        spreadEven: "vuePdfAppSpreadEven",
        spreadNone: "vuePdfAppSpreadNone",
        spreadOdd: "vuePdfAppSpreadOdd",
        toggleFindbar: "vuePdfAppToggleFindbar",
        viewAttachments: "vuePdfAppViewAttachments",
        viewBookmark: "vuePdfAppViewBookmark",
        viewOutline: "vuePdfAppViewOutline",
        viewThumbnail: "vuePdfAppViewThumbnail",
        zoomIn: "vuePdfAppZoomIn",
        zoomOut: "vuePdfAppZoomOut",
      },
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
.viewer-header {
  margin-top: 10px;
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

.viewer-header .action-btn,
.viewer-prepend .action-btn,
.viewer-footer .action-btn {
  background: white;
  opacity: 0.8;
}

.viewer-footer {
  position: absolute;
  bottom: 3px;
  right: 0;
  left: 0;
}

.action-btn {
  background: transparent;
  padding: 0px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  color: black;
  border: none;
  outline: none;

  &[disabled] {
    cursor: default;
    background: gray;
  }
  & > span {
    font-size: 28px;
  }
}

.action-bar {
  margin-bottom: 5px;
}

.divider,
.v-divider {
  padding: 3px;
}

.v-divider {
  display: block;
}

.vue-pdf-app-findbar {
  display: inline-block;
  background: white;
  opacity: 0.8;
  padding: 0 3px;
  border-radius: 3px;
}
</style>