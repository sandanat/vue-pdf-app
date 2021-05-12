<template>
  <div style="height: 80vh">
    <button @click="changePdf('sample.pdf')" type="button">First pdf</button>
    <button @click="changePdf('second-sample.pdf')" type="button">
      Second pdf
    </button>
    <vue-pdf-app
      v-if="!loading"
      :pdf="pdf"
      @pages-rendered="pdfPagesRendered"
    ></vue-pdf-app>
    <p v-else>Loading PDF...</p>
  </div>
</template>

<script>
// VuePdfApp component is registered in src/main.js

export default {
  name: "Basic",
  data() {
    return { pdf: "sample.pdf", loading: false };
  },
  methods: {
    changePdf(pdf) {
      this.loading = true;
      setTimeout(() => {
        this.pdf = pdf;
        this.loading = false;
      }, 3000);
    },
    pdfPagesRendered(pdfApp) {
      pdfApp.pdfViewer.currentScaleValue = "page-width";
    },
  },
};
</script>
