<template>
  <div>
    <div v-if="loading" class="py-3">
      <v-progress-linear indeterminate></v-progress-linear>
    </div>
    <v-row v-if="loading">
      <v-col v-for="num in 8" cols="12" md="6">
        <v-skeleton-loader
          class="mx-auto border"
          type="image, article"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12" sm="6" v-for="(article, index) in articles">
        <v-card
          style="cursor: pointer"
          :style="{ '--item-index': index }"
          class="my-2 elevation-4 list-item"
          @click="$router.push(`/articles/${article.id}`)"
        >
          <div class="text-center">
            <img
              style="width: 100%; height: auto; object-fit: cover"
              :src="placeholderImgSrc"
              :lazy-src="placeholderImgSrc"
            />
          </div>
          <div class="pa-2">
            <h4 class="my-2">{{ article.title }}</h4>
            <i>{{ formatDate(article.createdAt) }}</i>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import PlaceholerImgSrc from "@/assets/images/pastry-board.jpg";
import { VSkeletonLoader } from "vuetify/labs/VSkeletonLoader";

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
<style lang="scss" scoped>
.list-item {
  opacity: 0;
  border-radius: 5px;
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
</style>
