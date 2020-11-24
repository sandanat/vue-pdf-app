<template>
  <pdf-viewer :config="config" :pdf="pdf"></pdf-viewer>
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
};
</script>