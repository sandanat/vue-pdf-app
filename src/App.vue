<template>
  <pdf-viewer :pdf="pdf" :config="config" @open="open"></pdf-viewer>
</template>

<script lang="ts">
import Vue from "vue";
import pdfViewer from "@/components/pdf-viewer.vue";

export default Vue.extend({
  components: {
    pdfViewer,
  },
  data() {
    return {
      pdf: "/sample.pdf",
      config: { toolbar: { toolbarViewerLeft: false } }
    }
  },
  methods: {
    open() {
    }
  }
});
</script>