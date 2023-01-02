<template>
  <div>
    <v-app-bar app elevation="0">
      <v-toolbar-title style="font-size: 1rem">
        <strong>AS MADE BY ALEX</strong>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-for="item in menu" :key="item.icon" :to="item.link" flat>{{
          item.title
        }}</v-btn>
      </v-toolbar-items>

      <v-app-bar-nav-icon
        class="hidden-md-and-up"
        @click="toggleMobileMenu"
      ></v-app-bar-nav-icon>

      <!-- <v-dialog
        transition="dialog-bottom-transition"
        class="hidden-md-and-up"
        v-model="mobileMenu"
        style="height: 100vh"
      >
        <v-card style="border: 2px solid green">
          <v-list>
            <v-list-item v-for="item in menu">{{ item.title }}</v-list-item>
          </v-list>
        </v-card>
      </v-dialog> -->
      <v-navigation-drawer v-model="mobileMenu" absolute bottom temporary>
        <v-list nav dense>
          <v-list-item-group active-class="deep-purple--text text--accent-4">
            <v-list-item>
              <v-list-item-title>Foo</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>Bar</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>Fizz</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>Buzz</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>

      <!-- <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn> -->
    </v-app-bar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      mobileMenu: false,
      menu: [
        { icon: "home", title: "Recipes" },
        { icon: "info", title: "About Me" },
        { icon: "warning", title: "Contact" },
      ],
    };
  },
  methods: {
    toggleMobileMenu() {
      this.mobileMenu = !this.mobileMenu;
    },
  },
};
</script>
<style lang=""></style>
