<template>
  <vue-pdf-app pdf="sample.pdf" style="position: relative">
    <template #footer>
      <div class="footer">
        <span>This is a footer</span>
        <button
          class="vue-pdf-app-icon theme-toggle"
          type="button"
          title="Toggle theme"
        ></button>
      </div>
    </template>
  </vue-pdf-app>
</template>

<script>
// VuePdfApp component is registered in src/main.js

export default {
  name: "ThemeToggling",
};
</script>

<style lang="scss" scoped>
$footer-height: 20px;

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
  outline: none;
  background: transparent;
  border: none;
  float: right;
  margin-right: 5px;
  cursor: pointer;
  color: var(--pdf-toolbar-font-color);
}

.footer button:hover {
  color: var(--pdf-button-hover-font-color);
}

.theme-toggle::before {
  content: "\e832";
}

::v-deep #outerContainer {
  height: calc(100% - #{$footer-height}) !important;
}
</style>