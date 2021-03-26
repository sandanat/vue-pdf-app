<template>
  <div style="height: 90%">
    <input v-model.number="pageNumber" type="text" />
    <button @click="jumpToPage" type="button">Jump to page</button>
    <vue-pdf-app @open="openHandler" pdf="sample.pdf"></vue-pdf-app>
  </div>
</template>

<script>
import VuePdfApp from "@/components/pdf-viewer.vue";

export default {
  components: {
    VuePdfApp,
  },
  data() {
    return {
      pageNumber: 1,
    };
  },
  methods: {
    openHandler(pdfApp) {
      // non-reactive
      this.pdfApp = pdfApp;
    },

    jumpToPage() {
      this.pdfApp.page = this.pageNumber;
    },
  },
};
</script>