<template>
  <article class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-half is-offset-one-quarter">
          <!-- login -->
          <template v-if="isLogin">
            <h1 class="title has-text-centered">Login</h1>
            <form @submit.prevent="doLogin">
              <div class="field">
                <label class="label">Email</label>
                <div class="control">
                  <input
                    class="input"
                    type="email"
                    placeholder="bryan@gmail.com"
                    required
                    v-model="user.email"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label">Password</label>
                <div class="control">
                  <input
                    class="input"
                    type="password"
                    placeholder="Password"
                    required
                    v-model="user.password"
                  />
                </div>
              </div>
              <div class="field has-text-centered">
                <div class="control">
                  <button
                    class="button is-link"
                    type="submit"
                    :class="{ 'is-loading': isLoading }"
                  >
                    Login
                  </button>
                </div>
              </div>
              <a @click="isLogin = false">Don't have an account?</a>
            </form>
          </template>
          <!-- end login -->
          <!-- register -->
          <template v-else>
            <h1 class="title has-text-centered">Register</h1>
            <form @submit.prevent="doRegister">
              <div class="field">
                <label class="label">Name</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    placeholder="name"
                    required
                    v-model="user.name"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label">Email</label>
                <div class="control">
                  <input
                    class="input"
                    type="email"
                    placeholder="bryan@gmail.com"
                    required
                    v-model="user.email"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label">Password</label>
                <div class="control">
                  <input
                    class="input"
                    type="password"
                    placeholder="Password"
                    required
                    v-model="user.password"
                  />
                </div>
              </div>
              <div class="field has-text-centered">
                <div class="control">
                  <button
                    class="button is-link"
                    type="submit"
                    :class="{ 'is-loading': isLoading }"
                  >
                    Register
                  </button>
                </div>
              </div>
              <a @click="isLogin = true">Want to login?</a>
            </form>
          </template>
          <!-- end register -->
        </div>
      </div>
    </div>
  </article>
</template>
<script>
export default {
  name: "Auth",

  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
      },
      isLoading: false,
      isLogin: true,
    };
  },

  methods: {
    resetUser() {
      const me = this;
      me.user.name = me.user.email = me.user.password = "";
    },
    redirect(){
      this.$router.push("/home");
    },
    async doLogin() {
      const me = this;
      me.isLoading = true;
      try {
        await me.$store.dispatch("user/doLogin", me.user);
        me.$toast.success("Logged in");
        me.resetUser();
        me.redirect();
      } catch (error) {
        console.log(error);
      } finally {
        me.isLoading = false;
      }
    },
    async doRegister() {
      const me = this;
      console.log(me.user);
      me.isLoading = true;
      try {
        await me.$store.dispatch("user/doRegister", me.user);
        me.$toast.success("Account create user");
        me.resetUser();
        me.redirect();
      } catch (error) {
        console.log(error);
      } finally {
        me.isLoading = false;
      }
    },
  },
};
</script>
