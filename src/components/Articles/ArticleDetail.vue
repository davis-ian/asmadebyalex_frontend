<template>
  <div class="pa-3">
    <v-btn
      class="mb-3"
      size="small"
      variant="tonal"
      text
      @click="$router.back()"
    >
      <font-awesome-icon :icon="['fas', 'arrow-left']" />
    </v-btn>
    <div v-if="article">
      <h1 class="mb-2">{{ article.title }}</h1>
      <div>
        <i style="color: #aaa">{{ formatDate(article.createdAt) }}</i>
      </div>

      <div class="mt-8 content" v-html="article.content"></div>
    </div>
    <div v-else>Article not found..</div>
  </div>
</template>
<script>
import PlaceholerImgSrc from "@/assets/images/pastry-board.jpg";
export default {
  data() {
    return {
      placeholderImgSrc: PlaceholerImgSrc,
      message: "article details",
      article: null,
    };
  },
  methods: {
    formatDate(val) {
      return new Date(val).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
    getArticle(id) {
      console.log(id, "route id");
      this.$axios
        .get(import.meta.env.VITE_APP_API + `/articles/${id}`)
        .then((res) => {
          console.log(res, "success");
          this.article = res.data;
        })
        .catch((err) => {
          console.log(err, "error");
        });
    },
  },
  mounted() {
    this.getArticle(this.$route.params.id);
  },
};
</script>
<style lang="scss">
.content {
  width: 100%;

  iframe {
    width: 100%;
    aspect-ratio: 16/9;
    border-radius: 5px;
  }

  img {
    width: 100%;
    border-radius: 5px;
  }

  pre {
    background-color: #3b3b3b;
    overflow: auto;
    color: white;
    max-width: 100%;
    padding: 12px;

    border-radius: 5px;
    box-shadow: 0px 3px 3px -2px rgba(0, 0, 0, 0.2),
      0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12);

    white-space: pre-wrap; /* Since CSS 2.1 */
    white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
    white-space: -pre-wrap; /* Opera 4-6 */
    white-space: -o-pre-wrap; /* Opera 7 */
    word-wrap: break-word;
  }
}
</style>
