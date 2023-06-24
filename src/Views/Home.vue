<template>
  <div>
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
import FeaturedRecipes from "@/components/Recipes/FeaturedRecipes.vue";

export default {
  name: "Home",
  metaInfo: {
    title: "As Made By Alex",
  },

  data() {
    return {
      message: "hi",
      user: this.$auth0.user,
      categories: [
        { label: "Breads", icon: "fa-bread-slice" },
        { label: "Breakfast", icon: "fa-bacon" },
        { label: "Desserts", icon: "fa-ice-cream" },
        { label: "Savory", icon: "fa-drumstick-bite" },
      ],
    };
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
  },
  components: {
    // // ArticleList,
    // RecipeList,
    // RecipeCardScroll,
    // FeaturedRecipes,
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
