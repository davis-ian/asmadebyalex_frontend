<template>
  <div>
    <hero></hero>
    <!-- <home-featured-recipes></home-featured-recipes> -->
    <!-- <about-section></about-section> -->
    <contact-section class="pt-5"></contact-section>

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
      <v-btn @click="handleFileUpload">Submit</v-btn>
      <div>Progress: {{ uploadProgress }}%</div>
    </div> -->
    <!-- <div id="home-container">
      <div class="featured-recipes">
    
        <h2 class="text-center">Featured Recipes</h2>
        <featured-recipes />
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
            <h2 class="text-center">More Recipes</h2>
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
</template>

<script>
// import ArticleList from "@/components/Articles/ArticleList.vue";
import RecipeList from "@/components/Recipes/RecipeList.vue";
import RecipeCardScroll from "@/components/Recipes/RecipeCardScroll.vue";

import Hero from "@/components/UI/Hero.vue";
import HomeFeaturedRecipes from "@/components/UI/FeaturedRecipes.vue";
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
    // RecipeCardScroll,
    Hero,
    HomeFeaturedRecipes,
    AboutSection,
    ContactSection,
  },
  methods: {
    async handleAuthStatus() {
      const token = await this.$auth0.getAccessTokenSilently();

      console.log("TESTING");
      this.$axios
        // .get("http://localhost:3000/todos")
        .get("http://localhost:3000/private", {
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
    handleProfile() {
      console.log(this.user, "USER");
    },
    async handleFileUpload() {
      console.log(this.files[0], "files upload");

      if (this.files.length == 0) {
        this.showSnackbar({ message: "No file selected" });
        return;
      }

      const formData = new FormData();
      formData.append("image", this.files[0]);
      formData.append("key", "f1ea07e92d707b432e6c016a09728e7b");

      // const targetUrl = "https://api.imgbb.com/1/upload";
      const targetUrl = "http://localhost:3000/upload";

      try {
        const response = await this.$axios.post(
          import.meta.env.VITE_APP_API + "/recipes/test"
          // formData,
          // {
          //   onUploadProgress: (progressEvent) => {
          //     this.uploadProgress = Math.round(
          //       (progressEvent.loaded * 100) / progressEvent.total
          //     );
          //   },
          // }
        );

        console.log(response, "response");
      } catch (error) {
        console.error("There was a problem uploading the image:", error);
      }
    },
  },
};
</script>
<style lang="scss">
// #home-container {
//   min-height: 100%;
// }
.featured-recipes {
  margin: 20px 10px;
}
.quick-search {
  background-color: #1d201f;
  padding: 10px;
}
</style>
