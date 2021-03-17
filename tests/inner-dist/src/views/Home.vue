<template>
  <pdf-app pdf="/sample.pdf"></pdf-app>
</template>

<script>
import PdfApp from "../../../../dist/vue-pdf-app.umd";

export default {
  name: "Home",
  components: {
    PdfApp,
  },
};
</script>
