<template>
  <div id="app">
    <pdf-viewer pdf="/sample.pdf"></pdf-viewer>
  </div>
</template>

<script>
import Loader from "./components/Loader.vue";

export default {
  name: "App",
  components: {
    "pdf-viewer": () => ({
      component: new Promise((res) => {
        return setTimeout(
          () => res(import(/* webpackChunkName: "pdf-viewer" */ "vue-pdf-app")),
          4000
        );
      }),
      loading: Loader,
    }),
  },
};
</script>

<style>
#app {
  height: 100%;
  text-align: center;
}

#app h3 {
  margin-top: 30px;
}
</style>
