<template>
  <v-app style="background-color: #fff2f3">
    <!-- START: Header -->
    <v-app-bar style="background-color: #fff2f3" elevation="0">
      <v-app-bar-nav-icon
        style="background-color: transparent"
        class="hidden-md-and-up"
        @click="toggleMenu"
      ></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title @click="$router.push('/')" style="cursor: pointer">
        <h6 style>AS MADE BY ALEX</h6>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- <v-toolbar-items class="hidden-sm-and-down nav-btns">
        <v-btn
          v-for="(item, index) in menuItems"
          :key="item.icon"
          :to="item.path"
          :style="{ '--item-index': index }"
          style="border: 2px solid red"
          tile
          rounded
          >{{ item.title }}</v-btn
        >
      </v-toolbar-items> -->
      <div style="margin-right: 10px">
        <v-btn
          @click="openTab('https://www.instagram.com/asmadebyalex/')"
          color="transparent"
          icon
        >
          <font-awesome-icon
            style="font-size: 1.4rem"
            icon="fa-brands fa-instagram"
          ></font-awesome-icon>
        </v-btn>
      </div>
    </v-app-bar>
    <!-- END: Header -->

    <!-- START: Main nav -->
    <v-navigation-drawer
      color="#fff2f3"
      style="width: 100%; height: calc(100vh - 64px); overflow: auto"
      v-model="menuShowing"
      bottom
    >
      <v-list nav dense>
        <v-list-item
          :style="{ '--item-index': index }"
          class="drawer-item"
          v-for="(item, index) in filteredMenuItems"
        >
          <h4 @click="handleNavItemClick(item)">{{ item.title }}</h4>
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
import Footer from "@/components/Layout/Footer.vue";
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
        { icon: "home", title: "Articles", path: "/articles" },
        { icon: "info", title: "About Me", path: "/about" },
        { icon: "warning", title: "Contact", path: "/contact" },
        // { icon: "warning", title: "Admin", path: "/admin" },
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
        this.$router.push(item.path);
      }
    },
    handleLogout() {
      this.$auth0.logout({
        logoutParams: { returnTo: window.location.origin },
      });
    },
    handleLogin() {
      console.log("logging in ");
      this.$auth0.loginWithRedirect({
        redirect_uri: window.location.origin + "/callback",
      });
    },
  },
  components: { NavBar, Snackbar, Footer },
};
</script>

<style lang="scss">
@font-face {
  font-family: "FinoRegular";
  src: local("FinoRegular"),
    url(./assets/fonts/FinoRegular.ttf) format("truetype");
}
#rv {
  height: 100%;
  overflow: auto;
  background-color: #fff2f3;
}

.nav-btns .v-btn--active {
  color: red;
}

// Typescale setup
@import url("https://fonts.googleapis.com/css?family=Poppins:400");

html {
  font-size: 100%;
  background-color: #fff2f3;
} /*16px*/

body {
  font-family: "DM Sans", sans-serif;
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
