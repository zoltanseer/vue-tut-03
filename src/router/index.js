import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";

import ViewProfile from "../views/ViewProfile";

import firebase from "firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "GMap",
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/profile/:id",
    name: "ViewProfile",
    component: ViewProfile,
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

router.beforeEach((to, from, next) => {
  // check to see if route requires auth
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    // check auth state of user
    let user = firebase.auth().currentUser;
    if (user) {
      // user signed in, proceed to route
      next();
    } else {
      next({ name: "Login" });
    }
  } else {
    next();
  }
});

export default router;
