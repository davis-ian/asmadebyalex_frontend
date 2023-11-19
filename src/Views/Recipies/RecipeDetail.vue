<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" divider="/"></v-breadcrumbs>
    <div class="d-flex justify-space-between mb-3">
      <v-btn size="small" variant="tonal" text @click="$router.back()">
        <font-awesome-icon :icon="['fas', 'arrow-left']" />
      </v-btn>
      <v-btn
        v-if="userStore.roles.includes('SuperAdmin')"
        size="small"
        variant="outlined"
        @click="editing = !editing"
        >Edit</v-btn
      >
    </div>
    <div v-if="recipe">
      <div class="d-flex justify-center pa-6">
        <v-img
          max-width="500px"
          v-if="recipe.mainPhoto"
          :src="recipe.mainPhoto.secureUrl"
          :lazy-src="recipe.mainPhoto.secureUrl"
        ></v-img>
      </div>
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
            <v-row no-gutters>
              <v-col cols="12" md="4">
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

              <v-col cols="6" md="4">
                <v-text-field
                  type="number"
                  label="Quantity"
                  variant="outlined"
                  min="0"
                  v-model.number="item.quantity"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>

              <v-col cols="6" md="4">
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
              <v-col>
                <v-btn
                  @click="removeFromList(item, tempRecipe.ingredients)"
                  variant="outlined"
                  block
                  >Remove Ingredient</v-btn
                >
                <v-divider class="my-5"></v-divider>
              </v-col>
            </v-row>
          </div>
          <div
            style="gap: 20px"
            class="d-flex flex-column justify-space-between flex-sm-row"
          >
            <v-btn size="large" variant="outlined" @click="addRecipeIngredient"
              >Add +</v-btn
            >
            <v-btn
              size="large"
              variant="outlined"
              @click="updateRecipe"
              color="primary"
              >Save</v-btn
            >
          </div>
        </v-form>
      </div>

      <div v-else>
        <div class="d-flex justify-space-between">
          <h1>{{ recipe.name }}</h1>

          <!-- <v-btn icon> -->
          <font-awesome-icon
            @click="toggleFeatured(recipe)"
            class="pointer"
            style="font-size: 1.5rem"
            :icon="recipe.featured ? 'fa-solid fa-star' : 'fa-regular fa-star'"
          ></font-awesome-icon>
          <!-- </v-btn> -->
        </div>

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

        <div class="mt-3">
          <h3>Instructions</h3>
          <div v-if="recipe.instructions" v-html="recipe.instructions"></div>
          <div v-else>
            <p>No instructions available.</p>
          </div>
        </div>
        <!-- <v-btn class="mt-6" @click="deleteRecipePrompt" color="error"
          >Delete</v-btn
        > -->
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
        <v-progress-circular size="70" indeterminate></v-progress-circular>
        <p class="mt-5">Finding Recipe..</p>
      </div>
      <div v-if="!loading">
        <p>Recipe not found..</p>
      </div>
    </div>

    <v-row v-if="recipe">
      <v-col class="mt-3" cols="12" v-if="editing">
        <v-btn variant="outlined" @click="initUploader">Photo +</v-btn>
      </v-col>
      <v-col
        v-for="img in recipePhotos"
        :key="img.id"
        class="d-flex child-flex"
        cols="4"
      >
        <div class="pointer gallery-img-wrap">
          <v-img
            max-width="400px"
            @click="handleImgClick(img)"
            :class="checkMainImg(img) == true ? 'gallery-main' : ''"
            :src="imgWithLimit(img.secureUrl, 400)"
            :lazy-src="imgWithLimit(img.secureUrl, 400)"
            aspect-ratio="1"
            cover
            class="bg-grey-lighten-2"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey-lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>

          <font-awesome-icon
            style="
              position: absolute;
              top: 12px;
              right: 12px;
              color: black;
              font-size: 1.8rem;
            "
            v-if="checkMainImg(img) == true"
            icon="fa-solid fa-circle-check"
          ></font-awesome-icon>

          <v-btn
            icon
            dark
            color="error"
            small
            @click.stop="deleteImage1(img)"
            class="img-delete-btn"
          >
            <font-awesome-icon icon="fa-solid fa-trash"></font-awesome-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <v-dialog max-width="400px" v-model="deleteModal">
      <v-card class="mx-auto">
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

    <v-dialog max-width="400px" v-model="deleteImageModal">
      <v-card class="mx-auto">
        <v-card-item>
          <v-card-title>Delete Image?</v-card-title>
        </v-card-item>
        <v-card-text>This cannot be undone, confirm to continue.</v-card-text>
        <div class="pa-5" v-if="imageToDelete">
          <v-img
            :src="imgWithLimit(imageToDelete.secureUrl, 400)"
            :lazy-src="imgWithLimit(imageToDelete.secureUrl, 400)"
          ></v-img>
        </div>
        <v-card-actions class="d-flex justify-space-between mx-2">
          <v-btn @click="cancelImageDelete">Cancel</v-btn>
          <v-btn @click="confirmImageDelete" color="error" variant="outlined"
            >Confirm</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <uploader
      v-if="$route.params.id"
      :recipeId="parseInt($route.params.id)"
      ref="uploader"
      @upload-complete="getRecipe(parseInt($route.params.id))"
    />
  </div>
</template>

<script>
import IngredientTable from "@/components/Recipies/IngredientTable.vue";
import { useSnackbarStore } from "@/stores/snackbar";
import { mapStores } from "pinia";
import { useAuthStore } from "@/stores/user";
import Uploader from "@/components/UI/Uploader.vue";
import { removeFromListById } from "@/utilities/general.js";

export default {
  data() {
    return {
      message: "recipe details",
      testModal: false,
      recipe: null,
      tempRecipe: null,
      loading: true,
      deleteModal: false,
      editing: false,
      isValid: false,
      deleteImageModal: false,
      imageToDelete: null,
      recipePhotos: [],
      rules: {
        required: (value) => !!value || "Field is required",
      },
      breadcrumbs: [
        {
          title: "Home",
          disabled: false,
          href: "/",
        },
        {
          title: "Recipies",
          disabled: false,
          href: "/recipies",
        },
        {
          title: "",
          disabled: true,
          href: "",
        },
      ],
    };
  },
  components: { Uploader },
  computed: {
    ...mapStores(useAuthStore, useSnackbarStore),
  },
  methods: {
    toggleFeatured(recipe) {
      let data = {
        featured: !this.recipe.featured,
      };

      this.recipe.featured = data.featured;

      this.loading = true;
      this.$axios
        .put(
          import.meta.env.VITE_APP_API + `/recipies/featured/${recipe.id}`,
          data
        )
        .then((resp) => {
          this.snackbarStore.showSnackbar({ message: "Photo updated" });
        })
        .catch((error) => {})
        .finally(() => {
          this.loading = false;
        });
    },
    confirmImageDelete() {
      if (!this.imageToDelete) {
        this.snackbarStore.showSnackbar({
          message: "Image to delete not found",
          color: "error",
        });
        return;
      }

      this.loading = true;
      this.$axios
        .delete(
          import.meta.env.VITE_APP_API +
            `/media/recipe-photo/${this.imageToDelete.id}`
        )
        .then((resp) => {
          removeFromListById(this.recipePhotos, this.imageToDelete.id);
          this.snackbarStore.showSnackbar({ message: "Photo deleted" });
          this.cancelImageDelete();
        })
        .catch((error) => {
          console.log(error, "DELETE ERROR");
          // this.snackbarStore.showSnackbar({
          //   message: "Error deleting photo",
          //   color: "error",
          // });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    cancelImageDelete() {
      this.deleteImageModal = false;
      this.imageToDelete = null;
    },
    deleteImage1(img) {
      this.deleteImageModal = true;
      this.imageToDelete = img;
    },
    checkMainImg(img) {
      if (this.recipe?.mainPhotoId == img.id) {
        return true;
      }
      return false;
    },
    imgWithLimit(url, limit) {
      return this.addCustomTextToCloudinaryUrl(
        url,
        `c_limit,h_${limit},w_${limit}`
      );
    },
    addCustomTextToCloudinaryUrl(url, customText) {
      // Check if the URL contains "/upload/" and if customText is not empty
      if (url.includes("/upload/") && customText.trim() !== "") {
        // Split the URL into two parts, before and after "/upload/"
        const parts = url.split("/upload/");

        // Check if there are two parts (URL contains "/upload/"), and insert customText
        if (parts.length === 2) {
          const modifiedUrl = `${parts[0]}/upload/${customText}/${parts[1]}`;
          return modifiedUrl;
        }
      }

      // If no modification was made, return the original URL
      return url;
    },
    handleImgClick(img) {
      this.loading = true;

      const oldMain = this.recipe.mainPhoto;
      this.recipe.mainPhoto = img;
      this.recipe.mainPhotoId = img.id;

      this.$axios
        .put(
          import.meta.env.VITE_APP_API +
            `/recipies/main-photo/${this.recipe.id}/${img.id}`
        )
        .then((resp) => {
          this.snackbarStore.showSnackbar({ message: "Main photo updated" });
        })
        .catch((error) => {
          console.log(error, "Error updateing main photo");
          this.recipe.mainPhoto = oldMain;
          this.recipe.mainPhotoId.oldMain.id;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    initUploader() {
      if (this.$refs.uploader) {
        this.$refs.uploader.open();
      }
    },
    removeFromList(item, arr) {
      const found = arr.find((x) => x.id == item.id);
      if (found) {
        const index = arr.indexOf(found);
        arr.splice(index, 1);
      }
    },
    confirmDelete() {
      this.loading = true;
      this.$axios
        .delete(import.meta.env.VITE_APP_API + `/recipies/${this.recipe.id}`)
        .then((res) => {
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
        .get(import.meta.env.VITE_APP_API + `/recipies/${id}`)
        .then((res) => {
          this.recipe = res.data;
          this.tempRecipe = res.data;
          this.recipePhotos = Array.from(this.recipe.photos);

          this.breadcrumbs[2].title = this.recipe.name;
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
            import.meta.env.VITE_APP_API + `/recipies/` + this.recipe.id,
            data
          )
          .then((res) => {
            this.snackbarStore.showSnackbar({
              message: "Recipe updated",
            });
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
<style lang="scss" scoped>
.gallery-main {
  border: 5px solid black;
}

.gallery-img-wrap {
  position: relative;
  width: 100%;
  height: 100%;
}

.img-delete-btn {
  position: absolute;
  top: 12px;
  left: 12px;
  height: 1.8rem;
  width: 1.8rem;
  font-size: 0.9rem;
  opacity: 0;
  transition: 0.3s;
}

.gallery-img-wrap:hover .img-delete-btn {
  opacity: 0.4;
}

.img-delete-btn:hover {
  opacity: 1 !important;
}
</style>
