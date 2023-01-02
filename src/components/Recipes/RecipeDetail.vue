<template>
  <div style="min-height: 100%" class="pa-3">
    <v-btn size="x-small" variant="outlined" text @click="$router.back()">
      <font-awesome-icon :icon="['fas', 'arrow-left']" />
    </v-btn>
    <div v-if="recipe">
      <h1>{{ recipe.name }}</h1>
      <div style="display: flex; gap: 5px" v-if="recipe.categories">
        <p
          style="color: gray; font-size: 0.9rem"
          v-for="(cat, i) in recipe.categories"
        >
          {{ cat.categories_id.category }}
          {{ i == recipe.categories.length - 1 ? "" : "|" }}
        </p>
      </div>
      <div v-if="recipe.images">
        <v-img
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

      <v-row class="text-center pa-3" no-gutters>
        <v-col>
          <p><i>Active Time</i></p>
          <p><i>Total Time</i></p>
        </v-col>
        <v-col>
          <p>{{ recipe.active_time }} Minutes</p>
          <p>{{ recipe.total_time }} Minutes</p>
        </v-col>
      </v-row>

      <p v-if="recipe.description">
        {{ recipe.decription }}
      </p>
      <v-divider></v-divider>
      <div class="mt-3" v-if="recipe.ingredients">
        <h3>Ingredients</h3>
        <v-list density="compact">
          <v-list-item v-for="(item, index) in recipe.ingredients" :key="index">
            <v-list-item-title>
              {{ item.amount }} {{ item.Ingredients_id.ingredient }}
              {{ item.Units_id.unit }}</v-list-item-title
            >
          </v-list-item>
        </v-list>
        <!-- <ingredient-table
          style="border: 1px gray"
          :ingredients="recipe.ingredients"
        /> -->
      </div>

      <div class="mt-3" v-if="recipe.instructions">
        <h3>Instructions</h3>
        <div class="pa-3" v-html="recipe.instructions"></div>
      </div>
    </div>
    <div
      style="
        min-height: 500px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      "
      v-else
    >
      <div
        v-if="loading"
        style="
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        "
      >
        <v-progress-circular
          size="70"
          indeterminate
          color="#EFB0A1"
        ></v-progress-circular>
        <p class="mt-5">Finding Recipe..</p>
      </div>
      <div v-if="!loading">
        <p>Recipe not found..</p>
      </div>
    </div>
  </div>
</template>

<script>
import IngredientTable from "@/components/Recipes/IngredientTable.vue";
export default {
  data() {
    return {
      message: "recipe details",
      recipe: null,
      loading: true,
    };
  },
  components: { IngredientTable },
  methods: {
    getRecipe(id) {
      this.$axios
        .get(import.meta.env.VITE_APP_API + `/Recipes/${id}?fields=*.*.*.*`)
        .then((res) => {
          console.log(res, "success");
          this.recipe = res.data.data;
        })
        .catch((err) => {
          console.log(err, "error");
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  mounted() {
    this.getRecipe(this.$route.params.id);
  },
};
</script>
<style lang=""></style>
