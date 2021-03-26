<template>
  <div id="app">
    <vue-pdf-app pdf="/sample.pdf"></vue-pdf-app>
  </div>
</template>

<script lang="ts">
import "vue-pdf-app/dist/icons/main.css";
import VuePdfApp from "vue-pdf-app";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    VuePdfApp,
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  height: 100%;
}

html,
body {
  height: 100%;
  margin: 0;
}
</style>
