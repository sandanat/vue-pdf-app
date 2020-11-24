import Vue from "vue";
import Router from "vue-router";
import PdfViewer from "@/views/pdf-app.vue";
import About from "@/components/about.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: PdfViewer
    },
    {
      path: "/about",
      name: "about",
      component: About
    }
  ]
});
