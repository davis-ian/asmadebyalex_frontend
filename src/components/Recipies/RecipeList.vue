<template>
  <div class="recipe-list">
    <div class="py-3" v-if="loading">
      <v-progress-linear indeterminate></v-progress-linear>
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
        @click="$router.push(`/recipies/${item.id}`)"
        v-for="(item, index) in recipies"
        :key="item.id"
        class="my-5"
        :style="{
          '--item-index': index,
        }"
      >
        <recipe-article-list-item
          @delete="recipeDeleteHandler(item)"
          :item="item"
          class="list-item pointer"
        />
      </div>
    </div>
  </div>

  <v-dialog v-if="selectedRecipe" v-model="deleteModal" max-width="600px">
    <v-card :loading="loading">
      <v-card-title>Delete Recipe?</v-card-title>
      <v-card-text
        >Are you sure you want to delete
        <strong>{{ selectedRecipe.name }}?</strong>
      </v-card-text>
      <v-card-text>This cannot be undone.</v-card-text>
      <v-card-actions>
        <div class="d-flex justify-space-between flex-grow-1">
          <v-btn
            :disabled="loading"
            color="#f5eee6"
            variant="flat"
            @click="cancelDelete"
            >Cancel</v-btn
          >
          <v-btn
            :disabled="loading"
            variant="flat"
            color="#ef5267"
            @click="submitRecipeDelete"
            >Delete</v-btn
          >
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import PlaceholerImgSrc from "@/assets/images/pastry-board.jpg";
// import { VSkeletonLoader } from "vuetify/labs/VSkeletonLoader";
import RecipeArticleListItem from "@/components/UI/RecipeArticleListItem.vue";
import { useSnackbarStore } from "@/stores/snackbar";
import { useAuthStore } from "@/stores/user";
import { debounce } from "@/utilities/general";

export default {
  name: "Recipies",

  data() {
    return {
      message: "hi",
      recipies: [],
      loading: true,
      placeholderImgSrc: PlaceholerImgSrc,
      selectedRecipe: null,
      deleteModal: false,
      snackbarStore: useSnackbarStore(),
      authStore: useAuthStore(),
      token: "",
    };
  },
  components: {
    // VSkeletonLoader,
    RecipeArticleListItem,
  },
  props: {
    search: {
      type: String,
      default: "",
    },
    featured: {
      type: Boolean,
      deafault: false,
    },
  },
  watch: {
    search() {
      this.debouncedSearch();
    },
  },
  methods: {
    debouncedSearch: debounce(function () {
      this.getRecipies();
    }, 500),
    submitRecipeDelete() {
      this.loading = true;
      this.axiosInstance
        .delete(`/recipies/` + this.selectedRecipe.id)
        .then((res) => {
          this.snackbarStore.showSnackbar({
            message: "Recipe deleted",
          });
          this.getRecipies();
        })
        .catch((err) => {
          console.log(err, "error");
          this.snackbarStore.showSnackbar({
            message: "Error creating recipe",
            color: "error",
          });
        })
        .finally(() => {
          this.loading = false;
          this.cancelDelete();
        });
    },
    cancelDelete() {
      (this.deleteModal = false), (this.selectedRecipe = null);
    },
    recipeDeleteHandler(recipe) {
      this.selectedRecipe = recipe;
      this.deleteModal = true;
    },
    getRecipies() {
      let data = {
        search: this.search,
        featured: this.featured,
      };
      this.loading = true;

      this.$axios
        .get(import.meta.env.VITE_APP_API + "/recipies", { params: data })
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
    this.getRecipies();
  },
};
</script>
<style lang="scss">
.recipe-list {
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
