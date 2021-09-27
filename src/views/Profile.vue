<template>
  <article class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-half is-offset-one-quarter">
          <!-- User profile -->
          <h1 class="title has-text-centered">Profile</h1>
          <form v-if="user" @submit.prevent="updateProfile">
            <div class="field">
              <label class="label">Name</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  :placeholder="user.displayName"
                  v-model="userData.name"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input
                  class="input"
                  type="email"
                  :placeholder="user.email"
                  v-model="userData.email"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input
                  class="input"
                  type="password"
                  v-model="userData.password"
                />
              </div>
            </div>
            <div class="field has-text-centered">
              <div class="control">
                <button
                  class="button is-link"
                  type="submit"
                  :disable="!hasDataChanged"
                  :class="{ 'is-loading': isLoading }"
                >
                  Update
                </button>
              </div>
            </div>
          </form>
          <!-- end user profime -->
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Profile",

  data() {
    return {
      userData: {
        name: "",
        email: "",
        password: "",
      },
      isLoading: false,
    };
  },

  computed: {
    ...mapState("user", ["user"]),
    hasDataChanged(){
      const me = this;
      return (
        //Name exists and is different
        (me.userData.name && me.userData.name !== me.user.displayName) ||
        //Email exists and is different
        (me.userData.email && me.userData.email !== me.user.email) ||
        //Password exists
        me.userData.password.length
      );
    }
  },

  methods: {
    resetUser() {
      const me = this;
      me.userData.name = me.userData.email = me.userData.password = "";
    },
    async updateProfile(){
      const me = this;
      me.isLoading = true;
      try {
        await me.$store.dispatch("user/updateProfile", me.userData);
        me.$toast.success("Account data updated");
        me.resetUser();
      } catch (error) {
        console.log(error);
      } finally {
        me.isLoading = false;
      }
    }
  }
};
</script>

<style>
</style>