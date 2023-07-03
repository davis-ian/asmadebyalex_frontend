<template>
  <div style="border: 2px solid red">
    <v-navigation-drawer class="bg-deep-purple" theme="dark" permanent>
      <v-list color="transparent">
        <v-list-item
          prepend-icon="mdi-view-dashboard"
          title="Dashboard"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-account-box"
          title="Account"
        ></v-list-item>
        <v-list-item prepend-icon="mdi-gavel" title="Admin"></v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block> Logout </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <h2>Admin Page</h2>
    <div v-if="isAuthenticated">
      <v-btn @click="handleLogin">Login</v-btn>
      <v-btn @click="handleLogout">Logout</v-btn>
      <v-btn @click="handleProfile">Profile</v-btn>
      <v-btn @click="handleAuthStatus">Auth Status</v-btn>

      <div>is auth - {{ $auth0.isAuthenticated }}</div>

      <pre>{{ $auth0.user }}</pre>
    </div>
    <div v-else>
      <p>Admin account required</p>
      <v-btn @click="handleLogin">Login</v-btn>
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
    getTodos() {
      this.$axios
        .get(import.meta.env.VITE_APP_API + "/todos")
        .then((resp) => {
          console.log(resp, "todos");
        })
        .catch((err) => {
          console.log(err, "error");
        });
    },
    async handleAuthStatus() {
      const token = await this.$auth0.getAccessTokenSilently();

      console.log("TESTING");
      this.$axios
        // .get("http://localhost:3000/todos")
        .get(import.meta.env.VITE_APP_API + "/private", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((resp) => {
          console.log(resp, "test success");
        })
        .catch((err) => {
          console.log(err, "test err");
        });
    },
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
    handleProfile() {
      console.log(this.user, "USER");
    },
  },
  mounted() {
    this.getTodos();
  },
};
</script>
<style lang=""></style>
