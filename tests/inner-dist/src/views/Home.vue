<template>
  <pdf-app pdf="/sample.pdf"></pdf-app>
</template>

<script>
import PdfApp from "../../../../dist/vue-pdf-app.umd";
import "../../../../dist/icons/main.css";

export default {
  name: "Home",
  components: {
    PdfApp,
  },
};
</script>
