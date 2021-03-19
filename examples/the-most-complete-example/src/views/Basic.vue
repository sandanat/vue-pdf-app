<template>
  <div class="home">
    <vue-pdf-app></vue-pdf-app>
  </div>
</template>

<script>
import VuePdfApp from "vue-pdf-app";

export default {
  name: "basic",
  components: {
    VuePdfApp,
  },
};
</script>

<style lang="scss" scoped>
.home {
  height: 90vh;
}
</style>
