<template>
  <div style="height: 90%">
    <!-- todo delete this -->
    <button @click="togglePdf" type="button">Toggle pdf</button>

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
      :id-config="idConfig"
      @after-created="afterCreated"
      @open="open"
      @pages-rendered="pagesRendered"
      style="position: relative"
    >
      <template #viewer-header="{ isFindbarHidden }">
        <div class="viewer-header">
          <div v-show="!isFindbarHidden" :id="idConfig.findbar">
            <input :id="idConfig.findInput" type="text" />
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
            <span class="divider"></span>
            <button :id="idConfig.findPrevious" class="action-btn">
              Find previous
            </button>
            <span class="divider"></span>
            <button :id="idConfig.findNext" class="action-btn">
              Find next
            </button>
          </div>
          <span class="divider"></span>
          <button :id="idConfig.toggleFindbar" class="action-btn" type="button">
            Toggle findbar
          </button>
          <span class="divider"></span>
          <button :id="idConfig.sidebarToggle" class="action-btn" type="button">
            Toggle sidebar
          </button>
          <span class="divider"></span>
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
      <template #viewer-prepend="{ isSidebarHidden }">
        <div class="viewer-prepend">
          <button :id="idConfig.firstPage" class="action-btn" type="button">
            First page
          </button>
          <button :id="idConfig.previousPage" class="action-btn" type="button">
            Previous page
          </button>
          <button :id="idConfig.nextPage" class="action-btn" type="button">
            Next page
          </button>
          <button :id="idConfig.lastPage" class="action-btn" type="button">
            Last page
          </button>
          <!-- don't use v-if here -->
          <!-- otherwise got an error -->
          <div v-show="!isSidebarHidden">
            <button
              :id="idConfig.viewThumbnail"
              class="action-btn"
              type="button"
            >
              Thumbnail view
            </button>
            <button :id="idConfig.viewOutline" class="action-btn" type="button">
              Outline view
            </button>
            <button
              :id="idConfig.viewAttachments"
              class="action-btn"
              type="button"
            >
              Attachments view
            </button>
          </div>
        </div>
      </template>
      <template #viewer-footer>
        <div class="viewer-footer">
          <button :id="idConfig.download" class="action-btn" type="button">
            Download
          </button>
          <span class="divider"></span>
          <button
            :id="idConfig.cursorHandTool"
            class="action-btn"
            type="button"
          >
            Hand tool
          </button>
          <span class="divider"></span>
          <button
            :id="idConfig.cursorSelectTool"
            class="action-btn"
            type="button"
          >
            Select tool
          </button>
          <span class="divider"></span>
          <button
            :id="idConfig.documentProperties"
            class="action-btn"
            type="button"
          >
            Document properties
          </button>
          <span class="divider"></span>
          <button :id="idConfig.pageRotateCcw" class="action-btn" type="button">
            Rotate counterclockwise
          </button>
          <span class="divider"></span>
          <button :id="idConfig.pageRotateCw" class="action-btn" type="button">
            Rotate clockwise
          </button>
          <span class="divider"></span>
          <button
            :id="idConfig.scrollHorizontal"
            class="action-btn"
            type="button"
          >
            Scroll horizontal
          </button>
          <span class="divider"></span>
          <button
            :id="idConfig.scrollVertical"
            class="action-btn"
            type="button"
          >
            Scroll vertical
          </button>
          <span class="divider"></span>
          <button :id="idConfig.scrollWrapped" class="action-btn" type="button">
            Scroll wrapped
          </button>
          <span class="divider"></span>
          <button :id="idConfig.spreadEven" class="action-btn" type="button">
            Spread even
          </button>
          <span class="divider"></span>
          <button :id="idConfig.spreadNone" class="action-btn" type="button">
            Spread none
          </button>
          <span class="divider"></span>
          <button :id="idConfig.spreadOdd" class="action-btn" type="button">
            Spread odd
          </button>
        </div>
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

.viewer-footer {
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
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