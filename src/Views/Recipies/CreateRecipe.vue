<template>
  <div class="pa-3">
    <h1>Create Recipe</h1>
    <!-- <v-btn @click="testToken">test token</v-btn> -->
    <div>
      <v-form ref="form" v-model="isValid">
        <v-text-field
          variant="outlined"
          label="Name"
          v-model="name"
        ></v-text-field>

        <v-textarea
          variant="outlined"
          label="Description"
          v-model="description"
        ></v-textarea>

        <span>Instructions</span>
        <editor :content="instructions" class="mb-6" ref="editor" />

        <v-divider></v-divider>
        <div class="mb-6">
          <span>Ingredients</span>
        </div>
        <div v-for="(item, index) in recipeIngredients" :key="index">
          <v-row no-gutters>
            <v-col cols="12" md="4">
              <v-autocomplete
                :disabled="item.deleted"
                :items="ingredients"
                label="Ingredient"
                item-value="id"
                item-title="name"
                v-model="item.ingredientId"
                clearable
                variant="outlined"
                :rules="[!item.deleted ? rules.required : () => true]"
                @update:search="updateIngredientInputSearch"
                :key="`ingredient-input-${refreshKey}`"
              >
                <template v-slot:no-data>
                  <div class="text-center">
                    <v-btn
                      block=""
                      variant="text"
                      @click="addIngredientToDb(index)"
                      >Add ingredient</v-btn
                    >
                  </div>
                </template>
              </v-autocomplete>
            </v-col>

            <v-col cols="6" md="3">
              <v-text-field
                :disabled="item.deleted"
                type="number"
                label="Quantity"
                variant="outlined"
                min="0"
                v-model.number="item.quantity"
                :rules="[!item.deleted ? rules.required : () => true]"
              ></v-text-field>
            </v-col>

            <v-col cols="6" md="4">
              <v-autocomplete
                :disabled="item.deleted"
                :items="measurements"
                variant="outlined"
                label="Measurement"
                item-value="id"
                item-title="name"
                v-model="item.measurementUnitId"
                clearable
                :rules="[!item.deleted ? rules.required : () => true]"
                @update:search="updateMeasurementInputSearch"
                :key="`measurement-input-${refreshKey}`"
              >
                <template v-slot:no-data>
                  <div class="text-center">
                    <v-btn
                      block=""
                      variant="text"
                      @click="addMeasurementToDb(index)"
                      >Add measurement</v-btn
                    >
                  </div>
                </template>
              </v-autocomplete>
            </v-col>
            <!-- <v-col>
                <v-btn
                  @click="removeFromList(item, tempRecipe.ingredients)"
                  variant="outlined"
                  block
                  >Remove Ingredient</v-btn
                >
                <v-divider class="my-5"></v-divider>
              </v-col> -->
            <v-col cols="12" md="1">
              <!-- <v-btn
                  @click="removeFromList(item, tempRecipe.ingredients)"
                  variant="outlined"
                  
                  >Remove Ingredient</v-btn
                > -->
              <div
                style="height: 56px"
                class="d-flex flex-grow-1 justify-center align-center"
              >
                <v-btn
                  :disabled="loading"
                  @click="toggleIngredientDeleted(item)"
                  variant="outlined"
                  :color="item.deleted ? 'primary' : 'error'"
                  class="xs-btn"
                  icon
                >
                  <font-awesome-icon
                    :icon="
                      item.deleted
                        ? 'fa-solid fa-rotate-left'
                        : 'fa-solid fa-trash'
                    "
                  ></font-awesome-icon>
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </div>
        <!-- <div
          style="gap: 20px"
          class="d-flex flex-column justify-space-between flex-sm-row"
        >
          <v-btn size="large" variant="outlined" @click="addRecipeIngredient"
            >Ingredient +</v-btn
          >
          <v-btn
            size="large"
            variant="outlined"
            @click="submitRecipe"
            color="primary"
            >Save</v-btn
          >
        </div> -->
      </v-form>
      <div class="d-flex justify-space-between">
        <v-btn variant="tonal" @click="addRecipeIngredient">Add +</v-btn>
        <v-btn variant="tonal" @click="submitRecipe" color="primary"
          >Submit</v-btn
        >
      </div>
    </div>

    <ingredient-modal ref="ingredientModal"></ingredient-modal>
  </div>
</template>
<script>
import { useSnackbarStore } from "@/stores/snackbar";
import { useAuthStore } from "@/stores/user";
import ingredientModal from "@/components/Admin/IngredientModal.vue";
import Editor from "@/components/UI/Editor.vue";
import Uploader from "@/components/UI/Uploader.vue";

export default {
  data() {
    return {
      snackbarStore: useSnackbarStore(),
      authStore: useAuthStore(),
      isValid: false,
      name: "",
      description: "",
      instructions: "",
      ingredients: [],
      measurements: [],
      recipeIngredients: [],
      loading: true,
      testing: null,
      mtesting: null,
      isValid: false,
      deleteImageModal: false,
      imageToDelete: null,
      recipePhotos: [],
      token: "",
      ingredientSearchText: "",
      measurementSearchText: "",
      refreshKey: 0,
      rules: {
        required: (value) => !!value || "Field is required",
      },
    };
  },
  components: { ingredientModal, Uploader, Editor },
  methods: {
    updateIngredientInputSearch(evt) {
      console.log(evt, "search updated");
      this.ingredientSearchText = evt;
    },
    updateMeasurementInputSearch(evt) {
      console.log(evt, "search updated");
      this.measurementSearchText = evt;
    },
    addMeasurementToDb(index) {
      let data = {
        name: this.measurementSearchText,
      };
      console.log(data, "data");
      this.axiosInstance
        .post("/measurements", data)
        .then((resp) => {
          this.measurements.push(resp.data);
          this.refreshKey++;
          this.recipeIngredients[index].measurementUnitId = resp.data.id;
          console.log(this.tempRecipe.ingredients);
        })
        .catch((error) => {
          console.log(error, "ingredient error");
        });
    },
    addIngredientToDb(index) {
      let data = {
        name: this.ingredientSearchText,
      };
      console.log(data, "data");
      this.axiosInstance
        .post("/ingredients", data)
        .then((resp) => {
          this.ingredients.push(resp.data);
          this.refreshKey++;
          this.recipeIngredients[index].ingredientId = resp.data.id;
        })
        .catch((error) => {
          console.log(error, "ingredient error");
        });
    },
    toggleIngredientDeleted(item) {
      item.deleted = !item.deleted;
    },
    toggleFeatured(recipe) {
      let data = {
        featured: !this.recipe.featured,
      };

      this.recipe.featured = data.featured;

      this.loading = true;
      this.axiosInstance
        .put(`/recipies/featured/${recipe.id}`, data)
        .then((resp) => {
          this.snackbarStore.showSnackbar({ message: "Photo updated" });
        })
        .catch((error) => {})
        .finally(() => {
          this.loading = false;
        });
    },
    async testToken() {
      const token = await this.$auth0.getAccessTokenSilently();

      console.log(token, "token");

      if (token) {
        await navigator.clipboard.writeText(`Bearer ${token}`);
        console.log("token copied");
      } else {
        console.log("no token available");
      }
    },
    openIngredientModal() {
      if (this.$refs.ingredientModal) {
        this.$refs.ingredientModal.open();
      }
    },
    removeFromList(item, arr) {
      const found = arr.find((x) => x.id == item.id);
      if (found) {
        const index = arr.indexOf(found);
        arr.splice(index, 1);
      }
    },
    getIngredients() {
      this.axiosInstance
        .get(`/ingredients`)
        .then((res) => {
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
      this.axiosInstance
        .get(`/measurements`)
        .then((res) => {
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

      let instructions = this.$refs.editor.getHtml();

      let data = {
        name: this.name,
        description: this.description,
        ingredients: this.recipeIngredients,
        instructions: instructions,
      };

      console.log(data, "recipe data");
      this.axiosInstance
        .post(`/recipies`, data)
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
    async setAuthToken() {
      if (this.authStore.isAuthenticated) {
        this.token = await this.$auth0.getAccessTokenSilently();
      }
    },
    createAxiosInstance() {
      this.axiosInstance = this.$axios.create({
        headers: { Authorization: `Bearer ${this.token}` },
        baseURL: import.meta.env.VITE_APP_API,
      });
    },
  },
  async mounted() {
    await this.setAuthToken();
    this.createAxiosInstance();
    this.getIngredients();
    this.getMeasurements();
  },
};
</script>
<style lang=""></style>
