<template>
  <vue-pdf-app pdf="sample.pdf"></vue-pdf-app>
</template>

<script>
// VuePdfApp component is registered in src/main.js

export default {
  name: "ColorCustomization",
};
</script>

<style scoped>
.pdf-app.light {
  --pdf-app-background-color: white;
  --pdf-button-hover-font-color: black;
  --pdf-button-toggled-color: gray;
  --pdf-dialog-button-color: gray;
  --pdf-dialog-button-font-color: yellow;
  --pdf-error-more-info-color: black;
  --pdf-error-more-info-font-color: cyan;
  --pdf-error-wrapper-color: blue;
  --pdf-find-input-placeholder-font-color: black;
  --pdf-find-message-font-color: brown;
  --pdf-find-results-count-color: orange;
  --pdf-find-results-count-font-color: green;
  --pdf-horizontal-toolbar-separator-color: black;
  --pdf-input-color: black;
  --pdf-input-font-color: pink;
  --pdf-loading-bar-color: green;
  --pdf-loading-bar-secondary-color: blue;
  --pdf-not-found-color: blue;
  --pdf-overlay-container-color: gray;
  --pdf-overlay-container-dialog-color: gray;
  --pdf-overlay-container-dialog-font-color: black;
  --pdf-overlay-container-dialog-separator-color: darkblue;
  --pdf-sidebar-content-color: pink;
  --pdf-split-toolbar-button-separator-color: black;
  --pdf-thumbnail-selection-ring-color: darkorange;
  --pdf-thumbnail-selection-ring-selected-color: darkgreen;
  --pdf-toolbar-color: gray;
  --pdf-toolbar-font-color: violet;
  --pdf-toolbar-sidebar-color: gray;
}

.pdf-app.dark {
  --pdf-app-background-color: black;
  --pdf-button-hover-font-color: white;
  --pdf-button-toggled-color: gainsboro;
  --pdf-dialog-button-color: ivory;
  --pdf-dialog-button-font-color: lightslategrey;
  --pdf-error-more-info-color: black;
  --pdf-error-more-info-font-color: cornflowerblue;
  --pdf-error-wrapper-color: aquamarine;
  --pdf-find-input-placeholder-font-color: red;
  --pdf-find-message-font-color: darkblue;
  --pdf-find-results-count-color: antiquewhite;
  --pdf-find-results-count-font-color: coral;
  --pdf-horizontal-toolbar-separator-color: burlywood;
  --pdf-input-color: chartreuse;
  --pdf-input-font-color: blueviolet;
  --pdf-loading-bar-color: black;
  --pdf-loading-bar-secondary-color: pink;
  --pdf-not-found-color: azure;
  --pdf-overlay-container-color: rgba(1, 1, 1, 0.8);
  --pdf-overlay-container-dialog-color: gray;
  --pdf-overlay-container-dialog-font-color: yellow;
  --pdf-overlay-container-dialog-separator-color: white;
  --pdf-sidebar-content-color: lightblue;
  --pdf-split-toolbar-button-separator-color: orange;
  --pdf-thumbnail-selection-ring-color: cyan;
  --pdf-thumbnail-selection-ring-selected-color: green;
  --pdf-toolbar-color: brown;
  --pdf-toolbar-font-color: black;
  --pdf-toolbar-sidebar-color: blue;
}
</style>
