<template>
  <div class="article-list">
    <div class="py-3" v-if="loading">
      <v-progress-linear indeterminate></v-progress-linear>
    </div>
    <div class="text-center" v-if="!loading && articles.length == 0">
    <p>No  articles found..</p>
    </div>

    <!-- <div v-if="loading">
      <v-skeleton-loader
        v-for="i in 4"
        class="mx-auto border my-5"
        type="list-item-avatar-three-line"
      ></v-skeleton-loader>
    </div> -->
    <div>
      <div
        @click="$router.push(`/articles/${item.id}`)"
        v-for="(item, index) in articles"
        :key="item.id"
        class="my-5"
        :style="{
          '--item-index': index,
        }"
      >
        <recipe-article-list-item @delete="initDeleteModal(item)" :item="item" class="pointer list-item" />
      </div>
    </div>

    <v-dialog @click:outside="cancelDeleteModal" v-if="selectedArticle" v-model="deleteModal" max-width="500px">
      <v-card :loading="loading">
        <v-card-title>Delete Article?</v-card-title>
        <v-card-text>Are you sure you want to delete <strong>{{ selectedArticle.title }}</strong>? This cannot be undone, confirm to continue.</v-card-text>
      
        <v-card-actions class="d-flex justify-space-between">
          <v-btn :disabled="loading" @click="cancelDeleteModal" variant="flat">Cancel</v-btn>
          <v-btn :disabled="loading" :loading="loading" @click="deleteArticle(selectedArticle.id)" variant="flat" color="#ef5267">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import PlaceholerImgSrc from "@/assets/images/pastry-board.jpg";
// import { VSkeletonLoader } from "vuetify/labs/VSkeletonLoader";
import RecipeArticleListItem from "@/components/UI/RecipeArticleListItem.vue";
import { useAuthStore } from "@/stores/user";
import { useSnackbarStore } from "@/stores/snackbar";

export default {
  name: "Articles",
  data() {
    return {
      authStore: useAuthStore(),
      snackbarStore: useSnackbarStore(),
      placeholderImgSrc: PlaceholerImgSrc,
      message: "hi",
      articles: [],
      loading: true,
      deleteModal: false,
      selectedArticle: null,
      token: ""
    };
  },
  components: {
    // VSkeletonLoader,
    RecipeArticleListItem,
  },
  methods: {
    deleteArticle(id) {
      this.loading = true;

      this.axiosInstance.delete('/articles/' + id)
      .then(resp => {
        this.snackbarStore.showSnackbar({message: 'Article deleted'})
        this.cancelDeleteModal();
        this.getArtilcles();
      })
      .catch(error => {
        console.log(error, 'error')
        this.snackbarStore.showSnackbar({message: 'Error deleting article', color: '#ef5267'})

      })
      .finally(() => {
        this.loading = false
      })
    },
    initDeleteModal(item) {
      this.selectedArticle = item;
      this.deleteModal = true
    },
    cancelDeleteModal() {
   
      this.deleteModal = false;
      setTimeout(() => {
        this.selectedArticle = null
      }, 200)
    },
    formatDate(val) {
      return new Date(val).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
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
  },
};
</script>
<style lang="scss">
.article-list {
  .list-item:hover .text-container {
    color: rgba(0, 0, 0, 0.324) !important;
  }

  .list-item .text-container {
    transition: 0.3s;
  }
  .list-item {
    opacity: 0;
    transform: translateY(20px);
    animation: fadeIn 0.5s ease forwards;
    animation-delay: calc(
      0.1s * var(--item-index)
    ); /* Delay based on item index */
  }

  @keyframes fadeIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
</style>
