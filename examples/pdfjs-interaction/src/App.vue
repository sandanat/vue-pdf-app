<template>
  <div id="app">
    <div id="pdf-wrapper">
      <pdf-app pdf="/sample.pdf" @open="openHandler"></pdf-app>
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
import PdfApp from "vue-pdf-app";

export default {
  name: "App",
  components: {
    PdfApp,
  },
  data() {
    return {
      info: [],
    };
  },
  methods: {
    async openHandler(PDFViewerApplication) {
      this.info = [];
      const info = await PDFViewerApplication.pdfDocument
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
  },
};
</script>

<style>
#app {
  height: 100%;
  display: flex;
}

#pdf-wrapper {
  flex: 8 0 10px;
}

#info {
  text-align: center;
  flex: 4 0 10px;
  align-self: center;
}
</style>
