<template>
  <nav class="navbar">
    <div class="text-center">
      <!-- v-bind="props" -->
      <v-app-bar-nav-icon
        class="hamburger"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <h1 class="mb-0 pa-3 nav-title">As Made By Alex</h1>
    </div>
    <div style="gap: 20px" class="justify-center horizontal-nav-container">
      <h4
        @click="handleNavClick(item.path)"
        v-for="item in menuItems"
        class="nav-item pointer pa-2 ma-1"
      >
        {{ item.title }}
      </h4>
      <!-- Add more navigation links as needed -->
    </div>

    <div class="drop-down-nav-container">
      <v-expand-transition>
        <div v-show="drawer" class="drop-down-nav-content">
          <h3
            @click="handleNavClick(item.path)"
            v-for="item in menuItems"
            class="pointer pa-2 pl-6 nav-item ma-0"
          >
            {{ item.title }}
          </h3>
        </div>
      </v-expand-transition>
    </div>
    <!-- <v-navigation-drawer
      style="width: 100vw"
      color="#fff2f3"
      :scrim="false"
      class="drawer"
      app
      v-model="drawer"
      temporary
    >
      <div class="pa-3">
        <v-btn variant="depressed" icon @click="drawer = false">x</v-btn>
      </div>
      <v-list>
        <v-list-item-group>
          <v-list-item
            v-for="item in menuItems"
            :key="item.title"
            link
            @click="$router.push(item.path)"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer> -->
  </nav>
</template>
<script>
import { mapStores } from "pinia";
import { useAuthStore } from "@/stores/user";
import { useSnackbarStore } from "@/stores/snackbar";
export default {
  data() {
    return {
      drawer: false,
      user: this.$auth0.user,
      menuItems: [
        { icon: "home", title: "Home", path: "/" },
        { icon: "home", title: "Recipies", path: "/recipies" },
        // { icon: "home", title: "Articles", path: "/articles" },
        { icon: "info", title: "About Me", path: "/about" },
        // { icon: "warning", title: "Contact", path: "/contact" },
        { icon: "warning", title: "Login", path: "/login" },
      ],
    };
  },
  computed: {
    ...mapStores(useAuthStore, useSnackbarStore),
  },
  watch: {
    user() {
      if (
        this.user &&
        this.user["https://asmadebyalex.com/roles"].includes("SuperAdmin")
      ) {
        this.menuItems = [
          { icon: "home", title: "Home", path: "/" },
          { icon: "home", title: "Recipies", path: "/recipies" },
          { icon: "home", title: "Articles", path: "/articles" },
          { icon: "info", title: "About Me", path: "/about" },
          // { icon: "warning", title: "Contact", path: "/contact" },
          { icon: "warning", title: "Admin", path: "/admin" },
        ];
      } else {
        this.menuItems = [
          { icon: "home", title: "Home", path: "/" },
          { icon: "home", title: "Recipies", path: "/recipies" },
          { icon: "home", title: "Articles", path: "/articles" },
          { icon: "info", title: "About Me", path: "/about" },
          // { icon: "warning", title: "Contact", path: "/contact" },
          { icon: "warning", title: "Login", path: "/login" },
        ];
      }
    },
  },
  methods: {
    handleNavClick(path) {
      this.drawer = false;
      this.$router.push(path);
    },
  },
};
</script>
<style lang="scss" scoped>
.navbar {
  position: sticky;
  top: 0;
  border-bottom: 1px solid;
  background-color: #fff2f3;
  z-index: 10;
  padding: 10px;
}
.nav-item:hover {
  background-color: rgba(0, 0, 0, 0.078);
  border-radius: 5px;
  transition: 0.3s;
}

.horizontal-nav-container {
  display: none !important;
}

.hamburger {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  margin: 12px;
}

.nav-title {
  font-size: 2rem;
}

.drop-down-nav-container {
  position: relative;
}
.drop-down-nav-content {
  width: 100%;
  background-color: #fff2f3;
}
@media (min-width: 768px) {
  .horizontal-nav-container {
    display: flex !important;
  }

  .hamburger {
    display: none;
  }
  .drawer {
    display: none;
  }
  .drop-down-nav-container {
    display: none;
  }
}
</style>
