<template>
  <div class="pa-3 pt-0 recipe-list">
    <div class="py-3" v-if="loading">
      <v-progress-linear indeterminate></v-progress-linear>
    </div>

    <div v-if="loading">
      <v-skeleton-loader
        v-for="i in 4"
        class="mx-auto border my-5"
        type="list-item-avatar-three-line"
      ></v-skeleton-loader>
    </div>
    <div v-else>
      <div
        @click="$router.push(`/recipies/${item.id}`)"
        v-for="(item, index) in recipes"
        :key="item.id"
        class="my-5"
        :style="{
          '--item-index': index,
        }"
      >
        <recipe-article-list-item :item="item" class="list-item pointer" />
      </div>
    </div>
  </div>
</template>
<script>
import PlaceholerImgSrc from "@/assets/images/pastry-board.jpg";
import { VSkeletonLoader } from "vuetify/labs/VSkeletonLoader";
import RecipeArticleListItem from "@/components/UI/RecipeArticleListItem.vue";

export default {
  name: "Recipies",

  data() {
    return {
      message: "hi",
      recipes: [],
      loading: true,
      placeholderImgSrc: PlaceholerImgSrc,
    };
  },
  components: {
    VSkeletonLoader,
    RecipeArticleListItem,
  },
  methods: {
    getRecipes() {
      this.loading = true;

      this.$axios
        .get(import.meta.env.VITE_APP_API + "/recipes")
        .then((res) => {
          console.log(res.data, "recipes success");
          this.recipes = res.data;
        })
        .catch((err) => {
          console.log(err, "error");
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  mounted() {
    this.getRecipes();
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
