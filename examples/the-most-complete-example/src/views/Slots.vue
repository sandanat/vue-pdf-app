<template>
  <vue-pdf-app pdf="sample.pdf">
    <template #toolbar-middle-prepend>
      <button type="button">click</button>
    </template>
  </vue-pdf-app>
</template>

<script>
import VuePdfApp from "vue-pdf-app";
import "vue-pdf-app/dist/icons/main.css"

export default {
  name: "basic",
  components: {
    VuePdfApp,
  },
};
</script>
