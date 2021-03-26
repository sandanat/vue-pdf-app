<template>
  <div id="app">
    <vue-pdf-app pdf="/sample.pdf"></vue-pdf-app>
  </div>
</template>

<script>
import "vue-pdf-app/dist/icons/main.css";
import Loader from "./components/Loader.vue";

export default {
  name: "App",
  components: {
    "vue-pdf-app": () => ({
      component: new Promise((res) => {
        return setTimeout(
          () => res(import(/* webpackChunkName: "vue-pdf-app" */ "vue-pdf-app")),
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

html,
body {
  height: 100%;
  margin: 0;
}
</style>
