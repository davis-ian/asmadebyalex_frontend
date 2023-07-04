<template>
  <div style="min-height: 100%" class="pa-3">
    <v-btn size="x-small" variant="outlined" text @click="$router.back()">
      <font-awesome-icon :icon="['fas', 'arrow-left']" />
    </v-btn>
    <div v-if="recipe">
      <h1>{{ recipe.name }}</h1>

      <div v-if="recipe.description">
        <p>
          {{ recipe.decription }}
        </p>
      </div>

      <v-card class="mt-4" v-if="recipe.ingredients">
        <div class="pa-3">
          <h3>Ingredients</h3>
        </div>
        <v-divider></v-divider>
        <v-list density="compact">
          <v-list-item
            two-line
            v-for="(item, index) in recipe.ingredients"
            :key="index"
          >
            <v-list-item-content>
              <v-list-item-title> {{ item.ingredient.name }}</v-list-item-title>
              <v-list-item-subtitle
                >{{ item.quantity }}
                {{ item.measurementUnit.name }}</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>

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
        .get(import.meta.env.VITE_APP_API + `/recipes/${id}`)
        .then((res) => {
          console.log(res, "success");
          this.recipe = res.data;
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
