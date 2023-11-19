<template>
  <div class="d-flex flex-column align-center">
    <div class="pa-3 view-content">
      <v-breadcrumbs :items="breadcrumbs" divider="/"></v-breadcrumbs>
      <h2 class="ml-3">Recipes</h2>
      <recipe-list />
    </div>
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
<style lang="scss" scoped>
.view-content {
  min-height: 100%;
  width: 100%;
  max-width: 900px;
}
</style>
