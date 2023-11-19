<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" divider="/"></v-breadcrumbs>
    <h2>Recipies</h2>
    <recipe-list />
  </div>
</template>
<script>
import RecipeList from "@/components/Recipies/RecipeList.vue";
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
