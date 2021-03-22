import Vue from "vue";
import VueRouter from "vue-router";
import Basic from "@/views/Basic.vue";
import Slots from "@/views/Slots.vue";
import PdfjsInteraction from "@/views/PdfjsInteraction.vue";
import ToolbarConfiguration from "@/views/ToolbarConfiguration.vue";
import ColorCustomization from "@/views/ColorCustomization.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "basic",
    component: Basic
  },
  {
    path: "/toolbar-configuration",
    name: "toolbar-configuration",
    component: ToolbarConfiguration
  },
  {
    path: "/pdfjs-interaction",
    name: "pdfjs-interaction",
    component: PdfjsInteraction
  },
  {
    path: "/slots",
    name: "slots",
    component: Slots
  },
  {
    path: "/color-customization",
    name: "color-customization",
    component: ColorCustomization
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
