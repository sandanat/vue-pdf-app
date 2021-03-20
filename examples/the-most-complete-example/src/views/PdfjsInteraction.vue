<template>
  <div class="wrapper">
    <div id="pdf-wrapper">
      <vue-pdf-app pdf="/sample.pdf" @open="openHandler"></vue-pdf-app>
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
import VuePdfApp from "vue-pdf-app";

export default {
  components: {
    VuePdfApp,
  },
  data() {
    return {
      info: [],
    };
  },
  created() {
    // not reactive
    this.pageTitle = document.title;
  },
  methods: {
    async openHandler(PDFViewerApplication) {
      PDFViewerApplication.setTitle(this.pageTitle);

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
.wrapper {
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

html,
body {
  height: 100%;
  margin: 0;
}
</style>
