<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" divider="/"></v-breadcrumbs>
    <div class="d-flex justify-space-between mb-3">
      <v-btn size="small" variant="text" text @click="$router.back()">
        <font-awesome-icon :icon="['fas', 'arrow-left']" />
      </v-btn>
      <v-btn
        v-if="authStore.roles.includes('SuperAdmin')"
        size="small"
        variant="text"
        @click="toggleEditing"
        >{{ editing ? "Cancel" : "Edit" }}</v-btn
      >
    </div>
    <div v-if="recipe">
      <div v-if="editing">
        <div style="gap: 30px" class="d-flex">
          <div
            style="
              display: flex;
              flex-direction: column;
              align-items: center;
              max-width: 100px;
              margin-bottom: 24px;
            "
          >
            <!-- <v-btn variant="flat" icon> -->
            <font-awesome-icon
              @click="toggleFeatured(recipe)"
              class="pointer"
              style="font-size: 1.5rem"
              :icon="
                recipe.featured ? 'fa-solid fa-star' : 'fa-regular fa-star'
              "
            ></font-awesome-icon>
            <!-- </v-btn> -->
            <p class="mt-3 mb-0">Featured</p>
          </div>
          <!-- <div
            style="
              display: flex;
              flex-direction: column;
              align-items: center;
              max-width: 100px;
              margin-bottom: 24px;
            "
          >

            <font-awesome-icon
              @click="toggleFeatured(recipe)"
              class="pointer"
              style="font-size: 1.5rem"
              :icon="
                recipe.featured ? 'fa-solid fa-star' : 'fa-regular fa-star'
              "
            ></font-awesome-icon>
     
            <p class="mt-3 mb-0">Published</p>
          </div> -->
        </div>
        <v-form ref="form" v-model="isValid">
          <v-text-field
            variant="outlined"
            v-model="tempRecipe.name"
          ></v-text-field>

          <v-textarea
            variant="outlined"
            label="Description"
            v-model="tempRecipe.description"
          ></v-textarea>

          <span>Instructions</span>
          <editor :content="recipe.instructions" class="mb-6" ref="editor" />

          <v-divider></v-divider>
          <div class="mb-6">
            <span>Ingredients</span>
          </div>
          <div v-for="(item, index) in tempRecipe.ingredients" :key="index">
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
                    variant="flat"
                    :color="item.deleted ? 'primary' : '#ef5267'"
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
          <v-btn variant="tonal" @click="addRecipeIngredient"
            >Ingredient +</v-btn
          >
          <v-divider class="mt-3"></v-divider>
          <!-- <div
            style="gap: 20px"
            class="d-flex flex-column justify-space-between flex-sm-row"
          >
            <v-btn
              size="large"
              variant="flat"
              @click="updateRecipe"
              color="primary"
              >Save</v-btn
            >
          </div> -->
        </v-form>
      </div>

      <div
        class="pa-3 mb-6"
        style="border-radius: 5px; background-color: rgba(0, 0, 0, 0.066)"
        v-else
      >
        <div class="d-flex flex-column flex-md-row">
          <div
            v-if="recipe.mainPhoto"
            class="d-flex flex-grow-1 justify-center pa-6"
          >
            <v-img
              max-width="200px"
              :src="recipe.mainPhoto.secureUrl"
              :lazy-src="recipe.mainPhoto.secureUrl"
            ></v-img>
          </div>

          <div class="d-flex flex-grow-1 flex-column justify-center">
            <h1 class="text-center">{{ recipe.name }}</h1>

            <p class="text-center">
              {{ recipe.description }}
            </p>
          </div>
        </div>
        <v-divider></v-divider>

        <h4>Ingredients</h4>
        <v-list bg-color="transparent" density="compact">
          <v-list-item
            two-line
            v-for="(item, index) in recipe.ingredients"
            :key="index"
          >
            <v-list-item-title>
              {{ item.quantity }}
              {{
                item.quantity > 0
                  ? `${item.measurementUnit.name}s`
                  : item.measurementUnit.name
              }}
              {{ item.ingredient.name }}</v-list-item-title
            >
            <!-- <v-list-item-subtitle
              >{{ item.quantity }}
              {{ item.measurementUnit.name }}</v-list-item-subtitle
            > -->
          </v-list-item>
        </v-list>

        <!-- <v-card :loading="loading" class="mt-4" v-if="recipe.ingredients">
          <v-card-title>Ingredients</v-card-title>
          <div class="px-3">
            <v-divider></v-divider>
          </div>
          
        </v-card> -->

        <div>
          <h4>Instructions</h4>
          <div
            v-if="recipe.instructions"
            class="pl-10"
            v-html="recipe.instructions"
          ></div>
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
        <div>
          <span>Photos</span>
        </div>
        <v-btn
          v-if="authStore.roles.includes('SuperAdmin')"
          variant="tonal"
          @click="initUploader"
          >Photo +</v-btn
        >
      </v-col>
      <v-col
        v-for="img in recipePhotos"
        :key="img.id"
        class="d-flex child-flex"
        cols="4"
      >
        <div :class="editing ? 'pointer' : ''" class="gallery-img-wrap">
          <v-img
            v-if="authStore.roles.includes('SuperAdmin')"
            max-width="400px"
            @click="handleImgClick(img)"
            :class="checkMainImg(img) == true && editing ? 'gallery-main' : ''"
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
            v-if="checkMainImg(img) == true && editing"
            icon="fa-solid fa-circle-check"
          ></font-awesome-icon>

          <v-btn
            v-if="editing && authStore.roles.includes('SuperAdmin')"
            icon
            dark
            color="#ef5267"
            small
            @click.stop="deleteImage1(img)"
            class="img-delete-btn"
            :class="editing ? 'pointer' : ''"
          >
            <font-awesome-icon icon="fa-solid fa-trash"></font-awesome-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row v-if="editing">
      <v-col>
        <div class="text-right">
          <v-btn
            v-if="authStore.roles.includes('SuperAdmin')"
            size="large"
            variant="flat"
            @click="updateRecipe"
            color="primary"
            >Save</v-btn
          >
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
          <v-btn @click="confirmDelete" color="#ef5267" variant="flat"
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
          <v-btn @click="confirmImageDelete" color="#ef5267" variant="flat"
            >Confirm</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <uploader
      v-if="$route.params.id && authStore.roles.includes('SuperAdmin')"
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
import Editor from "@/components/UI/Editor.vue";

export default {
  data() {
    return {
      authStore: useAuthStore(),
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
      token: "",
      ingredientSearchText: "",
      measurementSearchText: "",
      refreshKey: 0,
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
  components: { Uploader, Editor },
  computed: {
    ...mapStores(useSnackbarStore),
  },
  methods: {
    updateIngredientInputSearch(evt) {
      // console.log(evt, "search updated");
      this.ingredientSearchText = evt;
    },
    updateMeasurementInputSearch(evt) {
      // console.log(evt, "search updated");
      this.measurementSearchText = evt;
    },
    addMeasurementToDb(index) {
      let data = {
        name: this.measurementSearchText,
      };
      // console.log(data, "data");
      this.axiosInstance
        .post("/measurements", data)
        .then((resp) => {
          console.log(this.tempRecipe, "temp recipe");
          this.measurements.push(resp.data);
          this.refreshKey++;
          this.tempRecipe.ingredients[index].measurementUnitId = resp.data.id;
          // console.log(this.tempRecipe.ingredients);
        })
        .catch((error) => {
          console.log(error, "ingredient error");
        });
    },
    addIngredientToDb(index) {
      let data = {
        name: this.ingredientSearchText,
      };
      // console.log(data, "data");
      this.axiosInstance
        .post("/ingredients", data)
        .then((resp) => {
          this.ingredients.push(resp.data);
          this.refreshKey++;
          this.tempRecipe.ingredients[index].ingredientId = resp.data.id;
        })
        .catch((error) => {
          console.log(error, "ingredient error");
        });
    },
    toggleIngredientDeleted(item) {
      item.deleted = !item.deleted;
    },
    toggleEditing() {
      this.editing = !this.editing;

      if (this.editing) {
        this.tempRecipe = { ...this.recipe };
        this.tempRecipe.ingredients = this.recipe.ingredients.map(
          (ingredient) => ({
            ...ingredient,
            deleted: false,
          })
        );
        this.editing = true;

        // console.log(this.tempRecipe, "temp");
      } else {
        this.tempRecipe = null;
      }
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
    confirmImageDelete() {
      if (!this.imageToDelete) {
        this.snackbarStore.showSnackbar({
          message: "Image to delete not found",
          color: "#ef5267",
        });
        return;
      }

      this.loading = true;
      this.axiosInstance
        .delete(`/media/recipe-photo/${this.imageToDelete.id}`)
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

      this.axiosInstance
        .put(`/recipies/main-photo/${this.recipe.id}/${img.id}`)
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
      this.axiosInstance
        .delete(`/recipies/${this.recipe.id}`)
        .then((res) => {
          this.snackbarStore.showSnackbar({ message: "Recipe deleted" });
          this.$router.push("/admin");
        })
        .catch((err) => {
          console.log(err, "error");
          this.snackbarStore.showSnackbar({
            message: "Error deleting recipe",
            color: "#ef5267",
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
        deleted: false,
      });
    },
    getRecipe(id) {
      if (typeof parseInt(id) == "number") {
        this.loading = true;

        return this.axiosInstance
          .get(`/recipies/${id}`)
          .then((res) => {
            this.recipe = res.data;
            this.recipePhotos = Array.from(this.recipe.photos);

            this.breadcrumbs[2].title = this.recipe.name;
          })
          .catch((err) => {
            console.log(err, "error");
          })
          .finally(() => {
            this.loading = false;
            this.mounted = true;
          });
      }
    },
    getIngredients() {
      this.loading = true;

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
      this.loading = true;
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
    updateRecipe() {
      this.$refs.form.validate().then(() => {
        if (!this.isValid) {
          this.$refs.form.validate();
          this.snackbarStore.showSnackbar({
            message: "Fill in required fields",
            color: "#ef5267",
          });
          return;
        }

        if (this.tempRecipe.ingredients.length == 0) {
          this.snackbarStore.showSnackbar({
            message: "Recipe cannot have 0 ingredients",
            color: "#ef5267",
          });
          return;
        }

        let instructions = this.$refs.editor.getHtml();

        let data = {
          name: this.tempRecipe.name,
          description: this.tempRecipe.description,
          instructions: instructions,
          ingredients: this.tempRecipe.ingredients.filter(
            (x) => x.deleted == false
          ),
        };

        // console.log(data, "data");

        this.loading = true;
        this.axiosInstance
          .put(`/recipies/` + this.recipe.id, data)
          .then(async (res) => {
            this.snackbarStore.showSnackbar({
              message: "Recipe updated",
            });
            this.editing = false;
            await this.getRecipe(this.recipe.id);
          })
          .catch((err) => {
            console.log(err, "error");
            this.snackbarStore.showSnackbar({
              message: "Error creating recipe",
              color: "#ef5267",
            });
          })
          .finally(() => {
            this.loading = false;
          });
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
    await this.getRecipe(this.$route.params.id);
    this.getIngredients();
    this.getMeasurements();
  },
};
</script>
<style lang="scss" scoped>
.xs-btn {
  height: 2rem;
  width: 2rem;
}
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
