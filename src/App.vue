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
        { icon: "warning", title: "Admin", path: "/admin" },
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

// Typescale setup
@import url("https://fonts.googleapis.com/css?family=Poppins:400");

html {
  font-size: 100%;
} /*16px*/

body {
  background: white;
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  line-height: 1.75;
  color: #000000;
}

p {
  margin-bottom: 1rem;
}

h1,
h2,
h3,
h4,
h5 {
  margin: 3rem 0 1.38rem;
  // font-family: "Poppins", sans-serif;
  font-weight: 400;
  line-height: 1.3;
  font-family: "DM Serif Display", serif;
}

h1 {
  margin-top: 0;
  font-size: 3.052rem;
  line-height: 0.9;
}

h2 {
  font-size: 2.441rem;
  line-height: 1;
}

h3 {
  font-size: 1.953rem;
  line-height: 1.1;
}

h4 {
  font-size: 1.563rem;
  line-height: 1.2;
}

h5 {
  font-size: 1.25rem;
  line-height: 1.3;
}

small,
.text_small {
  font-size: 0.8rem;
}

p {
  font-family: "DM Sans", sans-serif;
}

.all-caps {
  text-transform: uppercase;
}
.display {
  font-size: 3.815rem;
}
</style>
