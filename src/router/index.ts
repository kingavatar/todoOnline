import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Demo from "../views/Demo.vue";
import store from "../store";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "/dashboard"
  },
  {
    path: "/getting-started",
    name: "Demo",
    component: Demo,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue")
  },
  {
    path: "/signup",
    name: "SignUp",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/SignUp.vue")
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Dashboard.vue"),
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters["auth/isLoggedIn"]) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});
