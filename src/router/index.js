import { createRouter, createWebHistory } from "vue-router";
import HomeMain from "../views/HomeMain.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeMain,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
    return;
  }

  if ((to.path === "/login" || to.path === "/register") && isAuthenticated) {
    next("/");
    return;
  }

  next();
});

export default router;