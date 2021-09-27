import 
{ getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  updateEmail,
  updatePassword 
} from "firebase/auth";

const state = {
  user: null
};

const getters = {};

const mutations = {
  setUser(state, user){
    state.user = user;
  }
};

const actions = {
  async doLogin({commit}, {email, password}){
    try {
      const auth = getAuth();
      const result =  await signInWithEmailAndPassword(auth, email, password)
      const { user } = result;
      localStorage.setItem("access_token", user.accessToken);
      commit("setUser", user);
    } catch (error) {
      console.log(error.message);
    }
  },

  async doRegister({commit}, {email, password}){
    try {
      console.log(email, password);
      const auth = getAuth();
      const result =  await createUserWithEmailAndPassword(auth, email, password);
      const { user } = result;
      localStorage.setItem("access_token", user.accessToken);
      commit("setUser", user);
    } catch (error) {
      console.log(error);
    }
  },

  async doLogout({commit}){
    try {
      const auth = getAuth();
      await signOut(auth);
      commit("setUser", null);
    } catch (error) {
      console.error(error);
    }
  },

  getCurrentUser() {
    return new Promise((resolve, reject) => {
      const auth = getAuth();
      const unsubscribe =  onAuthStateChanged(auth, (user) => {
        unsubscribe();
        resolve(user);
      },
      () => {
        reject();
      }
      );
    });
  },

  async updateProfile({commit}, {name, email, password}){
    const auth = getAuth();
    const user = auth.currentUser;

    if(name) {
      await updateProfile(user, {
        displayName: name
      });
    }

    if(email) {
      await updateEmail(user, email);
    }

    if(password) {
      await updatePassword(user, password);
    }

    commit("setUser", user);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}