import { createRouter, createWebHistory } from "vue-router";
import HomeMain from "../views/HomeMain.vue";

const routes = [
  { path: "/", name: "home", component: HomeMain },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});