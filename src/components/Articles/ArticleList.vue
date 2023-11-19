<template>
  <div class="pa-3 pt-0 article-list">
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
        @click="$router.push(`/articles/${item.id}`)"
        v-for="(item, index) in articles"
        :key="item.id"
        class="my-5"
        :style="{
          '--item-index': index,
        }"
      >
        <recipe-article-list-item :item="item" class="pointer list-item" />
      </div>
    </div>
  </div>
</template>
<script>
import PlaceholerImgSrc from "@/assets/images/pastry-board.jpg";
import { VSkeletonLoader } from "vuetify/labs/VSkeletonLoader";
import RecipeArticleListItem from "@/components/UI/RecipeArticleListItem.vue";

export default {
  name: "Articles",
  data() {
    return {
      placeholderImgSrc: PlaceholerImgSrc,
      message: "hi",
      articles: [],
      loading: true,
    };
  },
  components: {
    VSkeletonLoader,
    RecipeArticleListItem,
  },
  methods: {
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
  },
  mounted() {
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
