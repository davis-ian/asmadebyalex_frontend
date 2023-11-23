<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" divider="/"></v-breadcrumbs>
    <div class="text-right">
      <v-btn variant="outlined" @click="handleLogout">Logout</v-btn>
    </div>
    <h2>Admin</h2>

    <div v-if="isAuthenticated">
      <!-- <h3>Account</h3> -->
      <!-- <pre style="width: 100%">{{ $auth0.user }}</pre> -->
      <div>
        <div class="mb-5 d-flex justify-space-between align-end">
          <h3 class="ma-0">Articles</h3>
          <v-btn
            variant="outlined"
            @click="$router.push('/articles/create')"
            size="small"
            icon
          >
            <font-awesome-icon icon="fa-solid fa-plus"></font-awesome-icon>
          </v-btn>
        </div>

        <article-list></article-list>
      </div>
      <div>
        <div class="mb-5 d-flex justify-space-between align-end">
          <h3 class="ma-0">Recipies</h3>
          <v-btn
            variant="outlined"
            @click="$router.push('/recipies/create')"
            size="small"
            icon
          >
            <font-awesome-icon icon="fa-solid fa-plus"></font-awesome-icon>
          </v-btn>
        </div>

        <recipe-list></recipe-list>
      </div>

      <div>
        <div class="mb-5 d-flex justify-space-between align-end">
          <h3 class="ma-0">Measurement Units</h3>
          <v-btn
            variant="outlined"
            @click="$router.push('/measurements/create')"
            size="small"
            icon
          >
            <font-awesome-icon icon="fa-solid fa-plus"></font-awesome-icon>
          </v-btn>
        </div>
        <unit-list></unit-list>
      </div>
    </div>
    <div v-else>
      <p>Admin account required</p>
      <v-btn variant="outlined" @click="handleLogin">Login</v-btn>
    </div>
  </div>
</template>
<script>
import PlaceholerImgSrc from "@/assets/images/pastry-board.jpg";
import RecipeList from "@/components/Recipies/RecipeList.vue";
import ArticleList from "@/components/Articles/ArticleList.vue";
import { VSkeletonLoader } from "vuetify/labs/VSkeletonLoader";
import UnitList from "@/components/Measurements/UnitList.vue";
import RecipeArticleListItem from "@/components/UI/RecipeArticleListItem.vue";
import { useAuthStore } from "@/stores/user";

export default {
  data() {
    return {
      authStore: this.useAuthStore(),
      placeholderImgSrc: PlaceholerImgSrc,
      user: this.$auth0.user,
      isAuthenticated: this.$auth0.isAuthenticated,
      articles: [],
      recipies: [],
      loading: true,
      breadcrumbs: [
        {
          title: "Home",
          disabled: false,
          href: "/",
        },
        {
          title: "Admin",
          disabled: true,
          href: "/admin",
        },
      ],
    };
  },
  components: {
    RecipeList,
    ArticleList,
    VSkeletonLoader,
    UnitList,
    RecipeArticleListItem,
  },
  methods: {
    async handleAuthStatus() {
      const token = await this.$auth0.getAccessTokenSilently();

      this.$axios
        // .get("http://localhost:3000/todos")
        .get(import.meta.env.VITE_APP_API + "/private", {
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
          this.articles = res.data;
        })
        .catch((err) => {
          console.log(err, "error");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getRecipies() {
      this.loading = true;
      this.$axios
        .get(import.meta.env.VITE_APP_API + "/recipies")
        .then((res) => {
          this.recipies = res.data;
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
    async setAuthToken() {
      if (this.authStore.isAuthenticated) {
        this.token = await this.$auth0.getAccessTokenSilently();
      }
    },
    createAxiosInstance() {
      this.axiosInstance = this.$axios.create({
        headers: { Authorization: `Bearer ${this.token}` },
        baseURL: import.meta.env.VITE_APP_API,
      });
    },
  },
  async mounted() {
    await this.setAuthToken();
    this.createAxiosInstance();
    this.getArtilcles();
    this.getRecipies();
  },
};
</script>
<style lang=""></style>
