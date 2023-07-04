<template>
  <div>
    <h1>Create Recipe</h1>
    <div class="pa-3">
      <v-text-field label="Name" variant="outlined"></v-text-field>
      <v-textarea label="Description" variant="outlined"></v-textarea>

      <div class="d-flex justify-space-between mb-3">
        <h3>Ingredients</h3>
        <v-btn @click="addRecipeIngredient">Add +</v-btn>
      </div>
      <div
        v-for="(item, index) in recipeIngredients"
        style="2px solid blue; gap: 10px"
        class="d-flex"
      >
        <v-autocomplete
          :items="ingredients"
          label="Ingredient"
          item-value="id"
          item-title="name"
          v-model="item.ingredient"
          clearable
        ></v-autocomplete>

        <v-text-field
          type="number"
          label="Quantity"
          min="0"
          v-model.number="item.quantity"
        ></v-text-field>

        <v-autocomplete
          :items="measurements"
          label="Measurement"
          item-value="id"
          item-title="name"
          v-model="item.measurement"
          clearable
        ></v-autocomplete>
      </div>
      <v-btn @click="submitRecipe" color="primary">Submit</v-btn>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      description: "",
      ingredients: [],
      measurements: [],
      recipeIngredients: [],
      loading: true,
      testing: null,
      mtesting: null,
      qtest: 0,
    };
  },
  methods: {
    getIngredients() {
      this.$axios
        .get(import.meta.env.VITE_APP_API + `/ingredients`)
        .then((res) => {
          console.log(res, "success");
          this.ingredients = res.data;
        })
        .catch((err) => {
          console.log(err, "error");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getMeasurements() {
      this.$axios
        .get(import.meta.env.VITE_APP_API + `/measurements`)
        .then((res) => {
          console.log(res, "m -success");
          this.measurements = res.data;
        })
        .catch((err) => {
          console.log(err, "error");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    addRecipeIngredient() {
      this.recipeIngredients.push({
        ingredient: "",
        quantity: 0,
        measurement: "",
      });
    },
  },
  mounted() {
    this.getIngredients();
    this.getMeasurements();
  },
};
</script>
<style lang=""></style>
