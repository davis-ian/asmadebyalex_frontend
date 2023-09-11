<template>
  <div class="pa-3">
    <h2>Admin Page</h2>
    <div v-if="isAuthenticated">
      <!-- <h3>Account</h3> -->
      <!-- <pre style="width: 100%">{{ $auth0.user }}</pre> -->
      <div>
        <h3>Articles</h3>
        <div>
          <div
            @click="$router.push(`/articles/${item.id}`)"
            v-for="(item, index) in articles"
            :key="item.id"
          >
            <div class="d-flex">
              <div class="pa-2">
                <img
                  style="
                    width: 60px;
                    height: 60px;

                    object-fit: cover;
                  "
                  :src="placeholderImgSrc"
                  :lazy-src="placeholderImgSrc"
                />
              </div>
              <div class="pa-2" style="width: 100%">
                <div>
                  {{ item.title }}
                </div>
                <div>{{ formatDate(item.createdAt) }}</div>
              </div>
            </div>
            <v-divider v-if="index != articles.length - 1"></v-divider>
          </div>
        </div>
      </div>
      <div>
        <h3>Recipes</h3>
        <div>
          <div
            @click="$router.push(`/recipes/${item.id}`)"
            v-for="(item, index) in recipes"
            :key="item.id"
          >
            <div class="d-flex">
              <div class="pa-2">
                <img
                  style="
                    width: 60px;
                    height: 60px;

                    object-fit: cover;
                  "
                  :src="placeholderImgSrc"
                  :lazy-src="placeholderImgSrc"
                />
              </div>
              <div class="pa-2" style="width: 100%">
                <div>
                  {{ item.name }}
                </div>
                <div>{{ formatDate(item.createdAt) }}</div>
              </div>
            </div>
            <v-divider v-if="index != recipes.length - 1"></v-divider>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Admin account required</p>
      <v-btn @click="handleLogin">Login</v-btn>
    </div>
  </div>
</template>
<script>
import PlaceholerImgSrc from "@/assets/images/pastry-board.jpg";
import RecipeList from "@/components/Recipes/RecipeList.vue";
export default {
  data() {
    return {
      placeholderImgSrc: PlaceholerImgSrc,
      user: this.$auth0.user,
      isAuthenticated: this.$auth0.isAuthenticated,
      articles: [],
      recipes: [],
    };
  },
  components: { RecipeList },
  methods: {
    async handleAuthStatus() {
      const token = await this.$auth0.getAccessTokenSilently();

      console.log("TESTING");
      this.$axios
        // .get("http://localhost:3000/todos")
        .get(import.meta.env.VITE_APP_API + "/private", {
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
      this.$auth0.loginWithRedirect({
        redirect_uri: window.location.origin + "/callback",
      });
    },
    handleLogout() {
      this.$auth0.logout({
        logoutParams: { returnTo: window.location.origin },
      });
    },
    handleProfile() {
      console.log(this.user, "USER");
    },
    getArtilcles() {
      this.$axios
        .get(import.meta.env.VITE_APP_API + "/articles")
        .then((res) => {
          console.log(res.data, "articles");
          this.articles = res.data;
        })
        .catch((err) => {
          console.log(err, "error");
        });
    },
    getRecipes() {
      this.$axios
        .get(import.meta.env.VITE_APP_API + "/recipes")
        .then((res) => {
          console.log(res.data, "recipes");
          this.recipes = res.data;
        })
        .catch((err) => {
          console.log(err, "error");
        });
    },
    formatDate(val) {
      return new Date(val).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
  mounted() {
    this.getArtilcles();
    this.getRecipes();
  },
};
</script>
<style lang=""></style>
