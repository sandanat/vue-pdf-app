<template>
  <pdf-viewer
    :pdf="pdf"
    :config="config"
    @after-created="afterCreated"
    @open="open"
    @pages-rendered="pagesRendered"
    style="position: relative"
  >
    <template #footer="{ nextPage: handler, isNextPageDisabled }">
      <div class="footer">
        <span>Footer</span>
        <input v-model="scale" type="text" />
        <button @click="handler" :disabled="isNextPageDisabled()" type="button">
          Click
        </button>
      </div>
    </template>
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
      scale: "1",
      pdf: "/sample.pdf",
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