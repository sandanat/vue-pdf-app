import "vue-pdf-app/dist/icons/main.css";
import VuePdfApp from "vue-pdf-app";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;
Vue.component("vue-pdf-app", VuePdfApp);

new Vue({
  router,
  render: (h) => h(App)
}).$mount("#app");
