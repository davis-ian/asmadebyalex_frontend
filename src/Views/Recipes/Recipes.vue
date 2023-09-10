<template>
  <div class="recipes">
    <h2 class="ml-3">Recipes</h2>
    <recipe-list />
  </div>
</template>
<script>
import RecipeList from "@/components/Recipes/RecipeList.vue";
export default {
  name: "Articles",
  components: { RecipeList },
};
</script>
<style lang="scss">
.recipes {
  background-color: #f3d6d8;
}
</style>
