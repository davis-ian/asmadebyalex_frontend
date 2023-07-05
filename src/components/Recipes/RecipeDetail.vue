<template>
  <div style="min-height: 100%" class="pa-3">
    <div class="d-flex justify-space-between mb-3">
      <v-btn size="small" variant="tonal" text @click="$router.back()">
        <font-awesome-icon :icon="['fas', 'arrow-left']" />
      </v-btn>
      <v-btn size="small" variant="tonal" @click="editing = !editing"
        >Edit</v-btn
      >
    </div>
    <div v-if="recipe">
      <div v-if="editing">
        <v-form ref="form" v-model="isValid">
          <v-text-field
            variant="outlined"
            v-model="tempRecipe.name"
          ></v-text-field>

          <v-textarea
            variant="outlined"
            v-if="editing"
            label="Description"
            v-model="tempRecipe.description"
          ></v-textarea>

          <div v-for="(item, index) in tempRecipe.ingredients" :key="index">
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
                <div>
                  <v-btn
                    variant="tonal"
                    size="small"
                    icon
                    color="error"
                    @click="tempRecipe.ingredients.shift()"
                    v-if="index == tempRecipe.ingredients.length - 1"
                  >
                    <font-awesome-icon
                      icon="fa-solid fa-trash"
                    ></font-awesome-icon>
                  </v-btn>
                </div>
              </v-col>
            </v-row>
            <div class="d-flex justify-space-between">
              <v-btn size="small" variant="tonal" @click="addRecipeIngredient"
                >Add +</v-btn
              >
              <v-btn
                size="large"
                variant="tonal"
                @click="updateRecipe"
                color="primary"
                >Update</v-btn
              >
            </div>
          </div>
        </v-form>
      </div>

      <div v-else>
        <h1>{{ recipe.name }}</h1>

        <p>
          {{ recipe.description }}
        </p>

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
              <v-list-item-title> {{ item.ingredient.name }}</v-list-item-title>
              <v-list-item-subtitle
                >{{ item.quantity }}
                {{ item.measurementUnit.name }}</v-list-item-subtitle
              >
            </v-list-item>
          </v-list>
        </v-card>

        <div class="mt-3" v-if="recipe.instructions">
          <h3>Instructions</h3>
          <div class="pa-3" v-html="recipe.instructions"></div>
        </div>
        <v-btn class="mt-6" @click="deleteRecipePrompt" color="error"
          >Delete</v-btn
        >
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

    <v-dialog max-width="400px" v-model="deleteModal">
      <v-card mclass="mx-auto">
        <v-card-item>
          <v-card-title>Delete Recipe?</v-card-title>
        </v-card-item>
        <v-card-text>This cannot be undone, confirm to continue.</v-card-text>
        <v-card-actions class="d-flex justify-space-between mx-2">
          <v-btn @click="deleteModal = false">Cancel</v-btn>
          <v-btn @click="confirmDelete" color="error" variant="outlined"
            >Confirm</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import IngredientTable from "@/components/Recipes/IngredientTable.vue";
import { useSnackbarStore } from "@/stores/snackbar";
export default {
  data() {
    return {
      snackbarStore: useSnackbarStore(),
      message: "recipe details",
      recipe: null,
      tempRecipe: null,
      loading: true,
      deleteModal: false,
      editing: false,
      isValid: false,
      rules: {
        required: (value) => !!value || "Field is required",
      },
    };
  },
  components: { IngredientTable },
  methods: {
    confirmDelete() {
      this.loading = true;
      this.$axios
        .delete(import.meta.env.VITE_APP_API + `/recipes/${this.recipe.id}`)
        .then((res) => {
          console.log(res, "success");
          this.snackbarStore.showSnackbar({ message: "Recipe deleted" });
          this.$router.push("/admin");
        })
        .catch((err) => {
          console.log(err, "error");
          this.snackbarStore.showSnackbar({
            message: "Error deleting recipe",
            color: "error",
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    deleteRecipePrompt() {
      this.deleteModal = true;
    },
    addRecipeIngredient() {
      this.tempRecipe.ingredients.push({
        ingredientId: "",
        quantity: 0,
        measurementUnitId: "",
      });
    },
    getRecipe(id) {
      this.$axios
        .get(import.meta.env.VITE_APP_API + `/recipes/${id}`)
        .then((res) => {
          console.log(res, "success");
          this.recipe = res.data;
          this.tempRecipe = res.data;
        })
        .catch((err) => {
          console.log(err, "error");
        })
        .finally(() => {
          this.loading = false;
        });
    },
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
    updateRecipe() {
      this.$refs.form.validate().then(() => {
        if (!this.isValid) {
          console.log("fill out required fields");
          this.$refs.form.validate();
          this.snackbarStore.showSnackbar({
            message: "Fill in required fields",
            color: "error",
          });
          return;
        }

        if (this.tempRecipe.ingredients.length == 0) {
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
          .put(
            import.meta.env.VITE_APP_API + `/recipes/` + this.recipe.id,
            data
          )
          .then((res) => {
            this.snackbarStore.showSnackbar({
              message: "Recipe updated",
            });
            console.log(res, "update success");
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
      });
    },
  },
  mounted() {
    this.getRecipe(this.$route.params.id);
    this.getIngredients();
    this.getMeasurements();
  },
};
</script>
<style lang=""></style>
