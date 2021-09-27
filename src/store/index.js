import Vue from 'vue';
import Vuex from 'vuex';
import messages from "./messages";
import rooms from "./rooms";
import user from "./user";
import utils from "./utils";
import { getAuth, onAuthStateChanged } from "firebase/auth";

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    checkAuth({commit}){
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          commit("user/setUser", user);
        } else {
          commit("user/setUser", null);
        }
      });
    }
  },
  modules: {
    messages,
    rooms,
    user,
    utils
  }
});


export default store;

/* Initial load */
store.dispatch("checkAuth");
