<template>
  <div style="height: 80vh;">
    <button @click="pdf = 'sample.pdf'" type="button">First pdf</button>
    <button @click="pdf = 'second-sample.pdf'" type="button">Second pdf</button>
    <vue-pdf-app :pdf="pdf"></vue-pdf-app>
  </div>
</template>

<script>
// VuePdfApp component is registered in src/main.js

export default {
  name: "Basic",
  data() {
    return { pdf: null };
  },
};
</script>
