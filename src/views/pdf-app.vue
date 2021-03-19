<template>
  <pdf-viewer
    :config="config"
    :pdf="pdf"
    @open="open"
    style="position: relative"
  >
    <template #footer>
      <div class="footer">
        <span>Footer</span>
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
        toolbar: {
          toolbarViewerLeft: {
            pageNumber: false,
          },
        },
      },
      pdf: "/sample.pdf",
    };
  },
  methods: {
    open(pdfApp) {
      window._pdfApp = pdfApp;
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