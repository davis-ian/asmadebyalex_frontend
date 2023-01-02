<template>
  <div>
    <div v-if="article">
      <h3>{{ article.title }}</h3>
      <div>
        <i>{{ article.date_created }}</i>
      </div>
      {{ article }}
      <div style="border: 2px solid" v-if="article.recipe">
        <h3>Recipe:</h3>
        <h4>{{ article.recipe.name }}</h4>
        <i>{{ article.recipe.description }}</i>
        <p
          style="border: 2px solid red"
          v-for="item in article.recipe.ingredients"
        >
          {{ item }}
        </p>
        {{ article.recipe }}
      </div>
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
    getArticle(id) {
      console.log(id, "route id");
      this.$axios
        .get(import.meta.env.VITE_APP_API + `/Articles/${id}?fields=*.*.*.*`)
        .then((res) => {
          console.log(res, "success");
          this.article = res.data.data;
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
