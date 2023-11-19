<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" divider="/"></v-breadcrumbs>
    <h2>Articles</h2>
    <article-list />
  </div>
</template>
<script>
import ArticleList from "@/components/Articles/ArticleList.vue";
export default {
  name: "Articles",
  data() {
    return {
      breadcrumbs: [
        {
          title: "Home",
          disabled: false,
          href: "/",
        },
        {
          title: "Articles",
          disabled: true,
          href: "/articles",
        },
      ],
    };
  },
  components: { ArticleList },
};
</script>
<style lang="scss" scoped>
.view-content {
  min-height: 100%;
  width: 100%;
  max-width: 900px;
}
</style>
