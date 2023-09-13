<template>
  <div class="pa-3">
    <h2>Admin Page</h2>
    <div v-if="isAuthenticated">
      <!-- <h3>Account</h3> -->
      <!-- <pre style="width: 100%">{{ $auth0.user }}</pre> -->
      <div>
        <div class="mb-5 d-flex justify-space-between align-end">
          <h3 class="ma-0">Articles</h3>
          <v-btn
            variant="tonal"
            @click="$router.push('/articles/create')"
            size="small"
            icon
          >
            <font-awesome-icon icon="fa-solid fa-plus"></font-awesome-icon>
          </v-btn>
        </div>
        <div v-if="loading">
          <v-skeleton-loader
            style="background-color: transparent"
            v-for="num in 5"
            type="list-item-avatar"
          ></v-skeleton-loader>
        </div>
        <div v-else>
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
        <div class="mb-5 d-flex justify-space-between align-end">
          <h3 class="ma-0">Recipes</h3>
          <v-btn
            variant="tonal"
            @click="$router.push('/recipes/create')"
            size="small"
            icon
          >
            <font-awesome-icon icon="fa-solid fa-plus"></font-awesome-icon>
          </v-btn>
        </div>
        <div v-if="loading">
          <v-skeleton-loader
            style="background-color: transparent"
            v-for="num in 5"
            type="list-item-avatar"
          ></v-skeleton-loader>
        </div>
        <div v-else>
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
import { VSkeletonLoader } from "vuetify/labs/VSkeletonLoader";
export default {
  data() {
    return {
      placeholderImgSrc: PlaceholerImgSrc,
      user: this.$auth0.user,
      isAuthenticated: this.$auth0.isAuthenticated,
      articles: [],
      recipes: [],
      loading: true,
    };
  },
  components: { RecipeList, VSkeletonLoader },
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
      this.loading = true;
      this.$axios
        .get(import.meta.env.VITE_APP_API + "/articles")
        .then((res) => {
          console.log(res.data, "articles");
          this.articles = res.data;
        })
        .catch((err) => {
          console.log(err, "error");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getRecipes() {
      this.loading = true;
      this.$axios
        .get(import.meta.env.VITE_APP_API + "/recipes")
        .then((res) => {
          console.log(res.data, "recipes");
          this.recipes = res.data;
        })
        .catch((err) => {
          console.log(err, "error");
        })
        .finally(() => {
          this.loading = false;
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
