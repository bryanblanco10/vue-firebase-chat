<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item">
        <img
          src="@/assets/img/VueTalk-logo.png"
          class="navbar__logo"
        />
      </router-link>

      <a
        @click.prevent = "toggleNavBar"
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbar"
        ref="burger"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navBar" class="navbar-menu" ref="navBar">
      <div class="navbar-start">
        <router-link class="navbar-item" to="/"> Home </router-link>

        <router-link class="navbar-item" to="/"> Create room </router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <template v-if="user">
              <router-link to="/profile" class="button is-primary">
                <strong>Profile</strong>
              </router-link>
              <a class="button is-light" @click="doLogout"> Log out</a>
            </template>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Header",

  data(){
    return {
      burger: null,
      navBar: null
    }
  },

  computed: {
    ...mapState("user",["user"])
  },

  methods:{
    toggleNavBar() {
      const me = this;
      me.burger.classList.toggle("is-active");
      me.navBar.classList.toggle("is-active");
    },
    async doLogout() {
      const me = this;
      try {
        await me.$store.dispatch("user/doLogout");
        me.$router.push("/auth");
        me.$toast.success("Logget out");
      } catch (error) {
        console.log(error);
      }
    }
  },

  mounted() {
    const me = this;
    me.burger = me.$refs.burger;
    me.navBar = me.$refs.navBar;
  }
};
</script>

<style lang="scss" scoped>
  .navbar-item img {
    max-height: none;
  }

  .navbar__logo {
    width: 200px;
    height: auto;
  }
</style>