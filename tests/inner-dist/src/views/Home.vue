<template>
  <pdf-app pdf="/sample.pdf"></pdf-app>
</template>

<script>
import PdfApp from "../../../../dist/pdf-viewer.umd";

export default {
  name: "Home",
  components: {
    PdfApp,
  },
};
</script>
