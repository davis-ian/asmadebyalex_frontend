<template>
  <div class="pa-3 pt-0">
    <v-card
      style="cursor: pointer"
      class="my-3 elevation-4"
      @click="$router.push(`/recipes/${recipe.id}`)"
      v-for="recipe in recipes"
    >
      <div v-if="recipe.images">
        <v-img
          aspect-ratio="1"
          cover
          :src="`https://gncc41fw.directus.app/assets/${recipe.images[0].directus_files_id.id}`"
          :lazy-src="`https://gncc41fw.directus.app/assets/${recipe.images[0].directus_files_id.id}`"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </div>
      <div class="pa-2">
        <h4>{{ recipe.name }}</h4>
        <div style="display: flex; gap: 5px" v-if="recipe.categories">
          <p
            style="color: gray; font-size: 0.9rem"
            v-for="(cat, i) in recipe.categories"
          >
            {{ cat.categories_id.category }}
            {{ i == recipe.categories.length - 1 ? "" : "|" }}
          </p>
        </div>
        <!-- <div>{{ new Date(recipe.date_created).toLocaleDateString() }}</div> -->
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
        .get(import.meta.env.VITE_APP_API + "/Recipes?fields=*.*.*.*.*images.*")
        .then((res) => {
          console.log(res.data.data, "articles");
          this.recipes = res.data.data;
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
