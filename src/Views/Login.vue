<template lang="">
  <div>
    <div class="text-center">
      <v-btn variant="outlined" @click="handleLogin">Login</v-btn>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: this.$auth0.user,
      isAuthenticated: this.$auth0.isAuthenticated,
    };
  },
  methods: {
    handleLogin() {
      this.$auth0.loginWithRedirect({
        redirect_uri: window.location.origin + "/callback",
      });
    },
    handleLogout() {
      this.$auth0.logout({
        logoutParams: { returnTo: window.location.origin },
      });
    },
  },
};
</script>
<style lang=""></style>
