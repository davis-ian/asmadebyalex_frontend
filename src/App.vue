<template>
  <v-app>
    <!-- <nav-bar /> -->
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
    <v-navigation-drawer v-model="menuShowing" absolute bottom temporary>
      <v-list nav dense>
        <v-list-item v-for="item in menuItems">
          <h4 @click="$router.push(item.path)">{{ item.title }}</h4>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main id="main">
      <router-view id="rv" />
      <snackbar />
    </v-main>
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
      menuItems: [
        { icon: "home", title: "Home", path: "/" },
        { icon: "home", title: "Recipes", path: "/recipes" },
        { icon: "info", title: "About Me", path: "/about" },
        { icon: "warning", title: "Contact", path: "/contact" },
      ],
    };
  },
  methods: {
    toggleMenu() {
      this.menuShowing = !this.menuShowing;
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
