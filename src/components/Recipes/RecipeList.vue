<template>
  <div class="pa-3 pt-0">
    <v-card
      style="cursor: pointer"
      class="my-3 elevation-4"
      @click="$router.push(`/recipes/${recipe.id}`)"
      v-for="recipe in recipes"
    >
      <div class="pa-2">
        <h4>{{ recipe.name }}</h4>
      </div>
    </v-card>
  </div>
</template>
<script>
export default {
  name: "Recipes",

  data() {
    return {
      message: "hi",
      recipes: [],
    };
  },
  methods: {
    getRecipes() {
      this.$axios
        .get(import.meta.env.VITE_APP_API + "/recipes")
        .then((res) => {
          console.log(res.data, "recipes");
          this.recipes = res.data;
        })
        .catch((err) => {
          console.log(err, "error");
        });
    },
  },
  mounted() {
    this.getRecipes();
  },
};
</script>
<style lang=""></style>
