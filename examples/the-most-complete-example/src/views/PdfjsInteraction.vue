<template>
  <div style="height: 100%; display: flex">
    <div id="pdf-wrapper">
      <vue-pdf-app
        pdf="/sample.pdf"
        @after-created="afterCreatedHandler"
        @open="openHandler"
        @pages-rendered="pagesRenderedHandler"
      ></vue-pdf-app>
    </div>
    <div id="info">
      <h1>PDF info:</h1>
      <div v-for="item in info" :key="item.name">
        <span>{{ item.name }}: {{ item.value }}</span>
        <br />
      </div>
    </div>
  </div>
</template>

<script>
// VuePdfApp component is registered in src/main.js

export default {
  name: "PdfjsInteraction",
  data() {
    return {
      info: [],
    };
  },
  methods: {
    afterCreatedHandler(pdfApp) {
      // to prevent browser tab title changing to pdf document name
      pdfApp.isViewerEmbedded = true;
    },
    async openHandler(pdfApp) {
      this.info = [];
      const info = await pdfApp.pdfDocument
        .getMetadata()
        .catch(console.error.bind(console));

      if (!info) return;
      const props = Object.keys(info.info);
      props.forEach((prop) => {
        const obj = {
          name: prop,
          value: info.info[prop],
        };
        this.info.push(obj);
      });
    },
    pagesRenderedHandler(pdfApp) {
      setTimeout(() => (pdfApp.pdfViewer.currentScaleValue = "page-height"));
    },
  },
};
</script>

<style>
#pdf-wrapper {
  flex: 8 0 10px;
}

#info {
  text-align: center;
  flex: 4 0 10px;
  align-self: center;
}
</style>
