<template>
  <div class="home">
    <section class="section">
      <div class="container">
        <button v-if="!loggedIn" @click="doLogin" class="button has-text-centered">
          Login with Google
        </button>
        <template>
          <h1 class="has-text-centered">Hi {{ user.names }}</h1>
          <button @click="doLogout" class="button has-text-centered">
            Logout
          </button>
        </template>
      </div>
    </section>
  </div>
</template>

<script>
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
export default {
  name: 'Room',
  data(){
    return {
      user: {
        names: "",
        email: ""
      },
      loggedIn: false
    }
  },
  methods: {
    async doLogin(){
      const me = this;
      try {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();

        const res = await signInWithPopup(auth, provider);

        const { displayName, email, accessToken } = res.user;

        me.user.names = displayName;
        me.user.email = email;
        me.loggedIn = true;
        localStorage.setItem("accessToken", accessToken);

        console.log(displayName, email, accessToken);
      } catch (error) { 
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential)
      }
    },
    async doLogout(){
      const me = this;
      try {
        const auth = getAuth();
        await signOut(auth);
        me.user.names = "";
        me.user.email = "";
        me.loggedIn = false;
        localStorage.removeItem("accessToken");
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>
