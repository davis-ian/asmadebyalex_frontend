<template>
  <div class="d-flex flex-column align-center">
    <div class="pa-3 view-content">
      <hero></hero>
      <home-featured-recipies></home-featured-recipies>
      <!-- <about-section></about-section> -->
      <!-- <contact-section class="pt-5"></contact-section> -->

      <!-- <div style="border: 2px solid red">
      <p>upload test</p>
      <v-file-input
        multiple
        show-size
        counter
        solo
        label="File Input"
        v-model="files"
      ></v-file-input>

      <div>Progress: {{ uploadProgress }}%</div>
    </div> -->
      <!-- <div id="home-container">
      <div class="featured-recipies">
    
        <h2 class="text-center">Featured Recipies</h2>
        <featured-recipies />
      </div>
     
      <div class="recipe-list">
        <v-row no-gutters class="pa-3">
          <v-col cols="3">
            <div
              style="
                height: 100%;
                display: flex;
                flex-direction: center;
                align-items: center;
              "
            >
              <v-divider color="black"></v-divider>
            </div>
          </v-col>
          <v-col class="pa-2">
            <h2 class="text-center">More Recipies</h2>
          </v-col>
          <v-col cols="3">
            <div
              style="
                height: 100%;
                display: flex;
                flex-direction: center;
                align-items: center;
              "
            >
              <v-divider color="black"></v-divider>
            </div>
          </v-col>
        </v-row>
        <recipe-list />
      </div>
    </div> -->
    </div>
  </div>
</template>

<script>
// import ArticleList from "@/components/Articles/ArticleList.vue";
import RecipeList from "@/components/Recipies/RecipeList.vue";

import Hero from "@/components/UI/Hero.vue";
import HomeFeaturedRecipies from "@/components/UI/FeaturedRecipies.vue";
import AboutSection from "@/components/UI/AboutSection.vue";
import ContactSection from "@/components/UI/ContactSection.vue";
export default {
  name: "Home",
  metaInfo: {
    title: "As Made By Alex",
  },

  data() {
    return {
      message: "hi",
      user: this.$auth0.user,
      files: [],
      uploadProgress: 0,
      categories: [
        { label: "Breads", icon: "fa-bread-slice" },
        { label: "Breakfast", icon: "fa-bacon" },
        { label: "Desserts", icon: "fa-ice-cream" },
        { label: "Savory", icon: "fa-drumstick-bite" },
      ],
    };
  },
  components: {
    // // ArticleList,
    // RecipeList,

    Hero,
    HomeFeaturedRecipies,
    AboutSection,
    ContactSection,
  },
  methods: {
    async handleAuthStatus() {
      const token = await this.$auth0.getAccessTokenSilently();

      this.$axios
        // .get("http://localhost:3000/todos")
        .get("http://localhost:3000/private", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((resp) => {})
        .catch((err) => {
          console.log(err, "test err");
        });
    },
    handleLogin() {
      try {
        this.$auth0.loginWithRedirect({
          redirect_uri: window.location.origin + "/callback",
        });
      } catch (error) {
        console.log("Login error: ", error);
      }
    },
    handleLogout() {
      this.$auth0.logout({
        logoutParams: { returnTo: window.location.origin },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
// #home-container {
//   min-height: 100%;
// }
.featured-recipies {
  margin: 20px 10px;
}
.quick-search {
  background-color: #1d201f;
  padding: 10px;
}

.view-content {
  min-height: 100%;
  width: 100%;
  max-width: 900px;
}
</style>
