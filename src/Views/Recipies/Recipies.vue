<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" divider="/"></v-breadcrumbs>
    <h2>Recipes</h2>
    <recipe-list />
  </div>
</template>
<script>
import RecipeList from "@/components/Recipes/RecipeList.vue";
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
          title: "Recipies",
          disabled: true,
          href: "/recipies",
        },
      ],
    };
  },
  components: { RecipeList },
};
</script>
<style lang="scss" scoped></style>
