<template>
  <div id="app">
    <pdf-viewer pdf="/sample.pdf"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PDF from './components/pdf-viewer.vue';

@Component({
  components: {
    "pdf-viewer": PDF,
  },
})
export default class App extends Vue {}
</script>