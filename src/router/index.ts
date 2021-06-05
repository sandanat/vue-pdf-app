import Vue from "vue";
import Router from "vue-router";
import PdfViewer from "@/views/pdf-app.vue";
import ThemeToggling from "@/views/theme-toggling.vue";
import About from "@/components/about.vue";
import Sandbox from "@/views/sandbox.vue";

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
      path: "/theme-toggling",
      name: "theme-togglingh",
      component: ThemeToggling
    },
    {
      path: "/sandbox",
      name: "sandbox",
      component: Sandbox
    },
    {
      path: "/about",
      name: "about",
      component: About
    }
  ]
});
