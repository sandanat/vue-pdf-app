<template>
  <div id="app">
    <div id="pdf-wrapper">
      <pdf-app :pdf="pdf" :config="config"></pdf-app>
    </div>
    <div id="button">
      <button @click="pdf = '/sample.pdf'">Fetch document</button>
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
      pdf: null,
      config: {
        toolbar: {
          toolbarViewerLeft: {
            next: true,
          },
        },
      },
    };
  },
};
</script>

<style>
#app {
  height: 100%;
  display: flex;
}

#pdf-wrapper {
  flex: 10 0 auto;
}

#button {
  text-align: center;
  flex: 2 0 auto;
  align-self: center;
}
</style>
