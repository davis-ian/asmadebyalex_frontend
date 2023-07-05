<template>
  <div>
    <h1>Create Recipe</h1>
    <div class="pa-3">
      <v-form ref="form" v-model="isValid">
        <v-text-field
          :rules="[rules.required]"
          label="Name"
          variant="outlined"
          v-model="name"
        ></v-text-field>
        <v-textarea
          label="Description"
          variant="outlined"
          v-model="description"
        ></v-textarea>
        <div class="d-flex justify-space-between mb-3">
          <h3>Ingredients</h3>
        </div>

        <div
          v-for="(item, index) in recipeIngredients"
          :key="index"
          style="2px solid blue; gap: 10px"
          class="d-flex"
        >
          <v-row>
            <v-col>
              <v-autocomplete
                :items="ingredients"
                label="Ingredient"
                item-value="id"
                item-title="name"
                v-model="item.ingredientId"
                clearable
                variant="outlined"
                :rules="[rules.required]"
              ></v-autocomplete>
            </v-col>
            <v-col>
              <v-text-field
                type="number"
                label="Quantity"
                variant="outlined"
                min="0"
                v-model.number="item.quantity"
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>

            <v-col>
              <v-autocomplete
                :items="measurements"
                variant="outlined"
                label="Measurement"
                item-value="id"
                item-title="name"
                v-model="item.measurementUnitId"
                clearable
                :rules="[rules.required]"
              ></v-autocomplete>
            </v-col>

            <v-col cols="1">
              <div class="d-flex flex-column">
                <v-btn
                  variant="tonal"
                  size="small"
                  icon
                  color="error"
                  @click="this.recipeIngredients.shift()"
                  v-if="index == recipeIngredients.length - 1"
                >
                  <font-awesome-icon
                    icon="fa-solid fa-trash"
                  ></font-awesome-icon>
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-form>
      <div class="d-flex justify-space-between">
        <v-btn variant="tonal" @click="addRecipeIngredient">Add +</v-btn>
        <v-btn variant="tonal" @click="submitRecipe" color="primary"
          >Submit</v-btn
        >
      </div>
    </div>
  </div>
</template>
<script>
import { useSnackbarStore } from "@/stores/snackbar";
export default {
  data() {
    return {
      snackbarStore: useSnackbarStore(),
      isValid: false,
      name: "",
      description: "",
      ingredients: [],
      measurements: [],
      recipeIngredients: [],
      loading: true,
      testing: null,
      mtesting: null,
      qtest: 0,
      rules: {
        required: (value) => !!value || "Field is required",
      },
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
        ingredientId: "",
        quantity: 0,
        measurementUnitId: "",
      });
    },
    submitRecipe() {
      if (!this.isValid) {
        console.log("fill out required fields");
        this.$refs.form.validate();
        this.snackbarStore.showSnackbar({
          message: "Fill in required fields",
          color: "error",
        });
        return;
      }

      if (this.recipeIngredients.length == 0) {
        this.snackbarStore.showSnackbar({
          message: "Recipe cannot have 0 ingredients",
          color: "error",
        });
        return;
      }

      let data = {
        name: this.name,
        description: this.description,
        ingredients: this.recipeIngredients,
      };

      this.$axios
        .post(import.meta.env.VITE_APP_API + `/recipes`, data)
        .then((res) => {
          this.snackbarStore.showSnackbar({
            message: "Recipe created",
          });
          this.$router.push("/admin");
        })
        .catch((err) => {
          console.log(err, "error");
          this.snackbarStore.showSnackbar({
            message: "Error creating recipe",
            color: "error",
          });
        })
        .finally(() => {
          this.loading = false;
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
