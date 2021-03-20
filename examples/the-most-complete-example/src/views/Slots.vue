<template>
  <div style="height: 95%">
    <span class="legend prepend"> Prepend slot |</span>
    <span class="legend append"> Append slot</span>
    <vue-pdf-app pdf="sample.pdf" style="position: relative">
      <template #toolbar-left-prepend>
        <button type="button" class="prepend"></button>
      </template>
      <template #toolbar-left-append>
        <button type="button" class="append"></button>
      </template>
      <template #toolbar-middle-prepend>
        <button type="button" class="prepend"></button>
      </template>
      <template #toolbar-middle-append>
        <button type="button" class="append"></button>
      </template>
      <template #toolbar-right-prepend>
        <button type="button" class="prepend"></button>
      </template>
      <template #toolbar-right-append>
        <button type="button" class="append"></button>
      </template>
      <template #toolbar-sidebar-prepend>
        <button type="button" class="prepend"></button>
      </template>
      <template #toolbar-sidebar-append>
        <button type="button" sergeev class="append"></button>
      </template>
      <template #secondary-toolbar-prepend>
        <button type="button" class="secondary-toolbar-slot prepend">
          <span>Sun is shining</span>
        </button>
      </template>
      <template #secondary-toolbar-append>
        <button type="button" class="secondary-toolbar-slot append">
          <span>Moon is shining</span>
        </button>
      </template>
      <template #footer>
        <div class="footer"><span>This is a footer</span></div>
      </template>
    </vue-pdf-app>
  </div>
</template>

<script>
import VuePdfApp from "vue-pdf-app";
import "vue-pdf-app/dist/icons/main.css";

export default {
  name: "slots",
  components: {
    VuePdfApp,
  },
};
</script>

<style lang="scss" scoped>
$footer-height: 40px;

span.legend {
  color: black;
}

button.secondary-toolbar-slot {
  margin-left: 12px;

  & span {
    font-family: Arial, Helvetica, sans-serif;
    padding-left: 5px;
    font-size: 12px;
  }
}

.append,
.prepend {
  font-family: pdf;
  background: transparent;
  outline: none;
  border: none;
  font-size: 1.1rem;
  color: var(--pdf-toolbar-font-color);
  margin: 5px;

  &:hover {
    color: var(--pdf-button-hover-font-color);
  }
}

.append::before {
  content: "\f186";
}

.prepend::before {
  content: "\f185";
}

#toolbarSidebar {
  & .prepend, & .append {
    position: relative;
    top: -10px;
  }
}

.footer {
  background: var(--pdf-button-toggled-color);
  color: var(--pdf-toolbar-font-color);
  height: $footer-height;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

::v-deep .secondaryToolbar.doorHangerRight {
  right: 27px !important;
}

::v-deep #outerContainer {
  height: calc(100% - #{$footer-height}) !important;
}
</style>
