<template>
  <vue-pdf-app pdf="sample.pdf" style="position: relative"
  >
    <template #footer="{ toggleTheme }">
      <div class="footer">
        <span>This is a footer</span>
        <button
          @click="toggleTheme"
          class="vue-pdf-app-icon theme-toggle"
          type="button"
          title="Toggle theme"
        ></button>
      </div>
    </template>
  </vue-pdf-app>
</template>

<script>
import VuePdfApp from "@/components/pdf-viewer.vue";

export default {
  name: "ThemeToggling",
  components: {
    VuePdfApp,
  },
  data() {
    return {
      theme: "dark",
    };
  },
};
</script>

<style lang="scss" scoped>
$footer-height: 20px;

.pdf-app.light {
  --pdf-app-background-color: red;
  --pdf-toolbar-font-color: green;
  --pdf-button-hover-font-color: yellow;
}

.footer {
  background: var(--pdf-button-toggled-color);
  color: var(--pdf-toolbar-font-color);
  height: $footer-height;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: initial;
}

.footer button {
  float: right;
  margin-right: 5px;
}

.theme-toggle::before {
  content: "\e832";
}

::v-deep #outerContainer {
  height: calc(100% - #{$footer-height}) !important;
}
</style>