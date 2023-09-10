<template>
  <div class="pa-3">
    <div v-if="article">
      <h1 class="mb-2">{{ article.title }}</h1>
      <div>
        <i style="color: #aaa">{{ formatDate(article.createdAt) }}</i>
      </div>

      <div class="mt-8" v-html="article.content"></div>
    </div>
    <div v-else>Article not found..</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
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
<style lang=""></style>
