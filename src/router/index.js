import Vue from 'vue'
import VueRouter from 'vue-router'
import Room from '../views/Room.vue';
import Auth from "../views/Auth";
import Profile from "../views/Profile";
import store from "../store";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Room,
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/home',
    component: Room,
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/auth',
    component: Auth
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history', 
  routes
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  
  /* Requires auth and no user */
  if(requiresAuth && !(await store.dispatch("user/getCurrentUser"))) {
    next("/auth");

   /*  No require auth and user */
  } else if(!requiresAuth && (await store.dispatch("user/getCurrentUser"))){
    next("/");
  } else {
    next();
  }

});

export default router
