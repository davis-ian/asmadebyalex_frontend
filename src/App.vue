<template>
  <v-app style="background-color: #fff2f3">
    <!-- START: Main Content -->
    <!-- <v-main>
      <router-view />
      <snackbar />
    </v-main> -->

    <app-layout>
      <router-view />
      <snackbar />
    </app-layout>

    <!-- END: Main Content -->
  </v-app>
</template>

<script>
import AppLayout from "@/components/Layout/AppLayout.vue";
import NavBar from "@/components/Layout/NavBar.vue";
import Snackbar from "@/components/UI/Snackbar.vue";
import Footer from "@/components/Layout/Footer.vue";
import { mapStores } from "pinia";
import { useAuthStore } from "@/stores/user";
import { useSnackbarStore } from "@/stores/snackbar";

export default {
  data() {
    return {
      menuShowing: false,
      user: this.$auth0.user,
      isAuthenticated: this.$auth0.isAuthenticated,
    };
  },
  watch: {
    user() {
      this.userStore.updateAuthStatus(this.user);
    },
  },
  computed: {
    ...mapStores(useAuthStore, useSnackbarStore),
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
    filteredMenuItems() {
      if (this.isAuthenticated) {
        return [
          ...this.menuItems,
          { icon: "warning", title: "Admin", path: "/admin" },
          { icon: "warning", title: "Logout", path: "" },
        ];
      }
      return [...this.menuItems, { icon: "warning", title: "Login", path: "" }];
    },
  },
  methods: {
    openTab(url) {
      window.open(url, "_blank");
    },
    toggleMenu() {
      this.menuShowing = !this.menuShowing;
    },
    handleNavItemClick(item) {
      if (item.title == "Login") {
        this.handleLogin();
      } else if (item.title == "Logout") {
        this.handleLogout();
      } else {
        if (this.$route.path == item.path) {
          this.toggleMenu();
          // this.menuShowing = false;
        } else {
          this.$router.push(item.path);
        }
      }
    },
    handleLogout() {
      this.$auth0.logout({
        logoutParams: { returnTo: window.location.origin },
      });
    },
    handleLogin() {
      this.$auth0.loginWithRedirect({
        redirect_uri: window.location.origin + "/callback",
      });
    },
  },
  components: { NavBar, Snackbar, Footer, AppLayout },
};
</script>

<style lang="scss">
@font-face {
  font-family: "FinoRegular";
  src: local("FinoRegular"),
    url(./assets/fonts/FinoRegular.ttf) format("truetype");
}
@font-face {
  font-family: "CourierPrime-Regular";
  src: local("CourierPrime-Regular"),
    url(./assets/fonts/CourierPrime-Regular.ttf) format("truetype");
}
@font-face {
  font-family: "GlassAntiqua-Regular";
  src: local("GalssAntiqua-Regular"),
    url(./assets/fonts/GlassAntiqua-Regular-Regular.ttf) format("truetype");
}

// Typescale setup
@import url("https://fonts.googleapis.com/css?family=Poppins:400");

html {
  font-size: 100%;
  background-color: #fff2f3;
} /*16px*/

body {
  // font-family: "DM Sans", sans-serif;
  font-family: "CourierPrime-Regular", serif;
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
h5,
h6 {
  // margin: 3rem 0 1.38rem;
  margin: 1rem 0 1.38rem;
  // font-family: "Poppins", sans-serif;
  font-weight: 400;
  line-height: 1.3;
  // font-family: "DM Serif Display", serif;
  font-family: "FinoRegular", serif;
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

pre {
  background-color: #3b3b3b;
  overflow: auto;
  color: white;
  max-width: 100%;
  padding: 12px;

  border-radius: 5px;
  box-shadow: 0px 3px 3px -2px rgba(0, 0, 0, 0.2),
    0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12);

  white-space: pre-wrap; /* Since CSS 2.1 */
  white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
  white-space: -pre-wrap; /* Opera 4-6 */
  white-space: -o-pre-wrap; /* Opera 7 */
  word-wrap: break-word;
}

.v-input__control {
  background-color: white !important;
}
.all-caps {
  text-transform: uppercase;
}
.display {
  font-size: 3.815rem;
  line-height: 0.8;
}

.underlined {
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 5px;
}
.pointer {
  cursor: pointer;
}
.drawer-item {
  // opacity: 0;
  max-width: 100%;
  // transform: translateY(20px);
  // animation: fadeIn 0.5s ease forwards;
  // animation-delay: calc(
  //   0.1s * var(--item-index)
  // ); /* Delay based on item index */
  transition: 0.3s;
}

.drawer-item:hover {
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.1);
}

@keyframes fadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
