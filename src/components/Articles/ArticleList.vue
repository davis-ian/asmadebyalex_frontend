<template>
  <div>
    <div
      style="border: 2px solid orange; cursor: pointer"
      @click="$router.push(`/articles/${article.id}`)"
      v-for="article in articles"
    >
      <h4>{{ article.title }}</h4>
      <div>{{ article.date_created }}</div>
      <!-- <div v-html="article.body"></div> -->
      <div v-if="article.recipe" style="border: 2px solid green">
        <strong>Recipe: </strong>{{ article.recipe.name }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Articles",

  data() {
    return {
      message: "hi",
      articles: [],
    };
  },
  methods: {
    getArtilcles() {
      this.$axios
        .get(import.meta.env.VITE_APP_API + "/Articles?fields=*.*.*.*")
        .then((res) => {
          console.log(res.data.data, "articles");
          this.articles = res.data.data;
        })
        .catch((err) => {
          console.log(err, "error");
        });
    },
  },
  mounted() {
    this.getArtilcles();
  },
};
</script>
<style lang=""></style>
