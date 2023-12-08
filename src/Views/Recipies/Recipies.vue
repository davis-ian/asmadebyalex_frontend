<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" divider="/"></v-breadcrumbs>

    <h2>Recipies</h2>
    <v-text-field v-model="search" label="Search" variant="solo"></v-text-field>

    <recipe-list :search="search" />
  </div>
</template>
<script>
import RecipeList from "@/components/Recipies/RecipeList.vue";
export default {
  name: "Articles",
  data() {
    return {
      search: "",
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
