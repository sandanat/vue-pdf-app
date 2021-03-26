<template>
  <div class="toolbar-demo-wrapper">
    <vue-pdf-app pdf="sample.pdf" :config="config"></vue-pdf-app>
    <div>
      <h1>Toolbar configuration</h1>
      <check-box v-model="config.errorWrapper">Error wrapper</check-box>
      <check-box :value="!!config.toolbar" @input="toggleToolbar"
        >Toolbar</check-box
      >
      <template v-if="!!config.toolbar">
        <fieldset>
          <legend>Main toolbar</legend>
          <check-box
            :value="!!config.toolbar.toolbarViewerLeft"
            @input="toggleLeftToolbar"
            >Left toolbar</check-box
          >
          <template v-if="!!config.toolbar.toolbarViewerLeft">
            <check-box v-model="config.toolbar.toolbarViewerLeft.findbar"
              >Findbar</check-box
            >
            <check-box v-model="config.toolbar.toolbarViewerLeft.previous"
              >Previous page</check-box
            >
            <check-box v-model="config.toolbar.toolbarViewerLeft.next"
              >Next page</check-box
            >
            <check-box v-model="config.toolbar.toolbarViewerLeft.pageNumber"
              >Page number</check-box
            >
          </template>
          <hr />
          <check-box
            :value="!!config.toolbar.toolbarViewerMiddle"
            @input="toggleMiddleToolbar"
            >Middle toolbar</check-box
          >
          <template v-if="!!config.toolbar.toolbarViewerMiddle">
            <check-box v-model="config.toolbar.toolbarViewerMiddle.zoomOut"
              >Zoom out</check-box
            >
            <check-box v-model="config.toolbar.toolbarViewerMiddle.zoomIn"
              >ZoomIn</check-box
            >
            <check-box
              v-model="config.toolbar.toolbarViewerMiddle.scaleSelectContainer"
              >Scale selection</check-box
            >
          </template>
          <hr />
          <check-box
            :value="!!config.toolbar.toolbarViewerRight"
            @input="toggleRightToolbar"
            >Right toolbar</check-box
          >
          <template v-if="!!config.toolbar.toolbarViewerRight">
            <check-box
              v-model="config.toolbar.toolbarViewerRight.presentationMode"
              >Presentation mode</check-box
            >
            <check-box v-model="config.toolbar.toolbarViewerRight.openFile"
              >Open file</check-box
            >
            <check-box v-model="config.toolbar.toolbarViewerRight.print"
              >Print</check-box
            >
            <check-box v-model="config.toolbar.toolbarViewerRight.download"
              >Download</check-box
            >
            <check-box v-model="config.toolbar.toolbarViewerRight.viewBookmark"
              >View bookmark</check-box
            >
          </template>
        </fieldset>
        <fieldset>
          <legend>Sidebar toolbar</legend>
          <check-box :value="!!config.sidebar" @input="toggleSidebar"
            >Sidebar</check-box
          >
          <template v-if="!!config.sidebar">
            <check-box v-model="config.sidebar.viewThumbnail"
              >Thumbnails</check-box
            >
            <check-box v-model="config.sidebar.viewOutline">Outline</check-box>
            <check-box v-model="config.sidebar.viewAttachments"
              >Attachments</check-box
            >
          </template>
        </fieldset>
        <fieldset>
          <legend>Secondary toolbar</legend>
          <check-box
            :value="!!config.secondaryToolbar"
            @input="toggleSecondaryToolbar"
            >Secondary toolbar</check-box
          >
          <template v-if="!!config.secondaryToolbar">
            <check-box
              v-model="config.secondaryToolbar.secondaryPresentationMode"
              >Presentation mode</check-box
            >
            <check-box v-model="config.secondaryToolbar.secondaryOpenFile"
              >Open file</check-box
            >
            <check-box v-model="config.secondaryToolbar.secondaryPrint"
              >Print</check-box
            >
            <check-box v-model="config.secondaryToolbar.secondaryDownload"
              >Download</check-box
            >
            <check-box v-model="config.secondaryToolbar.secondaryViewBookmark"
              >View bookmark</check-box
            >
            <check-box v-model="config.secondaryToolbar.firstPage"
              >First page</check-box
            >
            <check-box v-model="config.secondaryToolbar.lastPage"
              >Last page</check-box
            >
            <check-box v-model="config.secondaryToolbar.pageRotateCw"
              >Page rotate clockwise</check-box
            >
            <check-box v-model="config.secondaryToolbar.pageRotateCcw"
              >Page rotate counterclockwise</check-box
            >
            <check-box v-model="config.secondaryToolbar.cursorSelectTool"
              >Cursor select tool</check-box
            >
            <check-box v-model="config.secondaryToolbar.cursorHandTool"
              >Cursor handTool</check-box
            >
            <check-box v-model="config.secondaryToolbar.scrollVertical"
              >Scroll vertical</check-box
            >
            <check-box v-model="config.secondaryToolbar.scrollHorizontal"
              >Scroll horizontal</check-box
            >
            <check-box v-model="config.secondaryToolbar.scrollWrapped"
              >Scroll wrapped</check-box
            >
            <check-box v-model="config.secondaryToolbar.spreadNone"
              >Spread none</check-box
            >
            <check-box v-model="config.secondaryToolbar.spreadOdd"
              >Spread odd</check-box
            >
            <check-box v-model="config.secondaryToolbar.spreadEven"
              >Spread even</check-box
            >
            <check-box v-model="config.secondaryToolbar.documentProperties"
              >Document properties</check-box
            >
          </template>
        </fieldset>
      </template>
    </div>
  </div>
</template>

<script>
// VuePdfApp component is registered in src/main.js

const getSidebar = () => ({
  viewThumbnail: true,
  viewOutline: true,
  viewAttachments: true,
});
const getSecondaryToolbar = () => ({
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
});
const getToolbarViewerLeft = () => ({
  findbar: true,
  previous: true,
  next: true,
  pageNumber: true,
});
const getToolbarViewerRight = () => ({
  presentationMode: true,
  openFile: true,
  print: true,
  download: true,
  viewBookmark: true,
});
const getToolbarViewerMiddle = () => ({
  zoomOut: true,
  zoomIn: true,
  scaleSelectContainer: true,
});
const getToolbar = () => ({
  toolbarViewerLeft: getToolbarViewerLeft(),
  toolbarViewerRight: getToolbarViewerRight(),
  toolbarViewerMiddle: getToolbarViewerMiddle(),
});

export default {
  name: "ToolbarConfiguration",
  data() {
    return {
      config: {
        sidebar: getSidebar(),
        secondaryToolbar: getSecondaryToolbar(),
        toolbar: getToolbar(),
        errorWrapper: true,
      },
    };
  },
  methods: {
    toggleToolbar(bool) {
      this.config.toolbar = bool ? getToolbar() : false;
    },
    toggleLeftToolbar(bool) {
      this.config.toolbar.toolbarViewerLeft = bool
        ? getToolbarViewerLeft()
        : false;
    },
    toggleMiddleToolbar(bool) {
      this.config.toolbar.toolbarViewerMiddle = bool
        ? getToolbarViewerMiddle()
        : false;
    },
    toggleRightToolbar(bool) {
      this.config.toolbar.toolbarViewerRight = bool
        ? getToolbarViewerRight()
        : false;
    },
    toggleSidebar(bool) {
      this.config.sidebar = bool ? getSidebar() : false;
    },
    toggleSecondaryToolbar(bool) {
      this.config.secondaryToolbar = bool ? getSecondaryToolbar() : false;
    },
  },
};
</script>

<style lang="scss" scoped>
.toolbar-demo-wrapper {
  display: flex;
  height: 100%;
}

.toolbar-demo-wrapper > :first-child {
  flex: 8 0 10px;
}

.toolbar-demo-wrapper > :last-child {
  flex: 4 0 10px;
}
</style>