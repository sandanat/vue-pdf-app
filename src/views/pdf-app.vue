<template>
  <pdf-viewer :config="config" :pdf="pdf" @open="open"></pdf-viewer>
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
        toolbar: { toolbarViewerLeft: false },
      },
      pdf: "/sample.pdf",
    };
  },
  methods: {
    open(pdfApp) {
      window._pdfApp = pdfApp;
    }
  }
};
</script>