<template>
  <v-app>
    <!-- START: Header -->
    <v-app-bar app elevation="0">
      <v-toolbar-title @click="$router.push('/')" style="font-size: 1rem">
        <strong>AS MADE BY ALEX</strong>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down nav-btns">
        <v-btn
          v-for="item in menuItems"
          :key="item.icon"
          :to="item.path"
          tile
          rounded
          >{{ item.title }}</v-btn
        >
      </v-toolbar-items>

      <v-app-bar-nav-icon
        class="hidden-md-and-up"
        @click="toggleMenu"
      ></v-app-bar-nav-icon>
    </v-app-bar>
    <!-- END: Header -->

    <!-- START: Main nav -->
    <v-navigation-drawer v-model="menuShowing" absolute bottom temporary>
      <v-list nav dense>
        <v-list-item v-for="item in menuItems">
          <h4 @click="$router.push(item.path)">{{ item.title }}</h4>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- END: Main nav -->

    <!-- START: Main Content -->
    <v-main id="main">
      <!-- START: Admin Nav -->
      <v-navigation-drawer
        v-if="isSuperAdmin"
        class="bg-deep-purple"
        theme="dark"
        permanent
      >
        <v-list color="transparent">
          <v-list-item
            prepend-icon="mdi-view-dashboard"
            title="Dashboard"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-account-box"
            title="Account"
          ></v-list-item>
          <v-list-item
            @click="$router.push('/admin')"
            prepend-icon="mdi-gavel"
            title="Admin"
          ></v-list-item>
        </v-list>

        <template v-slot:append>
          <div class="pa-2">
            <v-btn block @click="handleLogout">Logout</v-btn>
            <!-- <v-btn block> {{ isSuperAdmin }} </v-btn> -->
          </div>
        </template>
      </v-navigation-drawer>
      <!-- END: Admin Nav -->
      <router-view id="rv" />
      <snackbar />
    </v-main>
    <!-- END: Main Content -->
  </v-app>
</template>

<script>
import NavBar from "@/components/Layout/NavBar.vue";
import Snackbar from "@/components/UI/Snackbar.vue";
import { useSnackbarStore } from "@/stores/snackbar";

export default {
  setup() {
    const snackbarStore = useSnackbarStore();
    return { snackbarStore };
  },
  data() {
    return {
      menuShowing: false,
      user: this.$auth0.user,
      isAuthenticated: this.$auth0.isAuthenticated,
      menuItems: [
        { icon: "home", title: "Home", path: "/" },
        { icon: "home", title: "Recipes", path: "/recipes" },
        { icon: "info", title: "About Me", path: "/about" },
        { icon: "warning", title: "Contact", path: "/contact" },
      ],
    };
  },
  computed: {
    isSuperAdmin() {
      if (this.user && this.isAuthenticated) {
        if (this.user["https://asmadebyalex.com/roles"]) {
          return this.user["https://asmadebyalex.com/roles"].includes(
            "SuperAdmin"
          );
        }
      }
      return false;
    },
  },
  methods: {
    toggleMenu() {
      this.menuShowing = !this.menuShowing;
    },
    handleLogout() {
      this.$auth0.logout({
        logoutParams: { returnTo: window.location.origin },
      });
    },
  },
  components: { NavBar, Snackbar },
};
</script>

<style lang="scss">
#rv {
  height: 100%;
  overflow: auto;
}

.nav-btns .v-btn--active {
  color: red;
}
</style>
