<template>
  <div id="app">
    <pdf-app pdf="/sample.pdf"></pdf-app>
  </div>
</template>

<script lang="ts">
import PdfApp from "vue-pdf-app";
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
    PdfApp
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  height: 100%;
}

html, body {
  height: 100%;
  margin: 0;
}
</style>
