<template>
  <div>
    <v-dialog v-model="display" max-width="650px">
      <v-card :loading="loading">
        <v-card-title>
          <div class="d-flex justify-space-between">
            <span> Ingredients </span>
            <v-btn variant="outlined" @click="newIngredientModal = true"
              >New +</v-btn
            >
          </div>
        </v-card-title>
        <v-card-text>
          <div class="text-center" v-if="ingredients.length == 0">
            <p v-if="loading">Loading results..</p>
            <p v-else>No results found</p>
          </div>
          <v-list>
            <v-list-item v-for="(item, index) in ingredients">
              <v-list-item-title>{{ item.name }}</v-list-item-title>
              <template v-slot:append>
                <div style="gap: 10px" class="d-flex">
                  <v-btn
                    :disabled="loading"
                    @click="initEdit(item)"
                    variant="outlined"
                    class="xs-btn"
                    icon
                  >
                    <font-awesome-icon
                      icon="fa-solid fa-pencil"
                    ></font-awesome-icon>
                  </v-btn>
                  <v-btn
                    :disabled="loading"
                    @click="deleteIngredient1(item)"
                    variant="outlined"
                    color="error"
                    class="xs-btn"
                    icon
                  >
                    <font-awesome-icon
                      icon="fa-solid fa-trash"
                    ></font-awesome-icon>
                  </v-btn>
                </div>
              </template>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="newIngredientModal" max-width="400px">
      <v-card :loading="loading">
        <v-card-title>New Ingredient</v-card-title>
        <v-card-text>
          <v-text-field label="name" v-model="newIngredientName"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn :disabled="loading" @click="cancelNewIngredient">Cancel</v-btn>
          <v-btn :disabled="loading" @click="submitNewIngredient">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="editing" max-width="400px">
      <v-card :loading="loading">
        <v-card-text>
          <v-text-field
            @keydown.enter="submitEditIngredient"
            v-if="tempIngredient"
            v-model="tempIngredient.name"
            label="Name"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn :disabled="loading" @click="cancelEditIngredient"
            >Cancel</v-btn
          >
          <v-btn :disabled="loading" @click="submitEditIngredient"
            >Submit</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteModal" max-width="400px">
      <v-card :loading="loading">
        <v-card-title>Delete Ingredient?</v-card-title>
        <v-card-text>
          Are you sure you want to delete this ingredient? This cannot be
          undone.
          <v-divider></v-divider>
          <div>
            <strong>{{ tempIngredient.name }}</strong>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn :disabled="loading" @click="cancelDeleteIngredient"
            >Cancel</v-btn
          >
          <v-btn :disabled="loading" @click="submitDeleteIngredient"
            >Submit</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { useSnackbarStore } from "@/stores/snackbar";
import { mapStores } from "pinia";
export default {
  data() {
    return {
      ingredients: [],
      display: false,
      newIngredientModal: false,
      newIngredientName: "",
      tempIngredient: null,
      editing: false,
      loading: true,
      deleteModal: false,
    };
  },
  watch: {
    display() {
      if (this.display) {
        this.getIngredients();
      }
    },
  },
  computed: {
    ...mapStores(useSnackbarStore),
  },
  methods: {
    submitDeleteIngredient() {
      if (!this.tempIngredient.id) {
        this.snackbarStore.showSnackbar({
          message: "Ingredient id cannot be empty",
        });
        return;
      }

      this.loading = true;

      this.axiosInstance
        .delete(`/ingredients/${this.tempIngredient.id}`)
        .then((res) => {
          console.log(res.data, "ingredient response");

          let found = this.ingredients.find(
            (x) => x.id == this.tempIngredient.id
          );
          if (found) {
            let index = this.ingredients.indexOf(found);
            this.ingredients.splice(index, 1);
          }

          this.snackbarStore.showSnackbar({ message: "Ingredient deleted" });
        })
        .catch((err) => {
          console.log(err, "error");
          this.snackbarStore.showSnackbar({
            message: "Error deleting ingredient",
            color: "error",
          });
        })
        .finally(() => {
          this.loading = false;
          this.cancelDeleteIngredient();
        });
    },
    cancelDeleteIngredient() {
      this.deleteModal = false;
      setTimeout(() => {
        this.tempIngredient = null;
      }, 500);
    },
    deleteIngredient1(item) {
      this.tempIngredient = item;
      this.deleteModal = true;
    },
    submitEditIngredient() {
      console.log(this.tempIngredient, "submit edit");

      if (!this.tempIngredient.name) {
        this.snackbarStore.showSnackbar({
          message: "Ingredient name cannot be empty",
        });
        return;
      }
      if (!this.tempIngredient.id) {
        this.snackbarStore.showSnackbar({
          message: "Ingredient id cannot be empty",
        });
        return;
      }

      let data = {
        name: this.tempIngredient.name,
      };

      this.loading = true;

      this.axiosInstance
        .put(`/ingredients/${this.tempIngredient.id}`, data)
        .then((res) => {
          console.log(res.data, "ingredient response");

          let found = this.ingredients.find(
            (x) => x.id == this.tempIngredient.id
          );
          if (found) {
            found.name = this.tempIngredient.name;
          }

          this.snackbarStore.showSnackbar({ message: "Ingredient updated" });
        })
        .catch((err) => {
          console.log(err, "error");
        })
        .finally(() => {
          this.loading = false;
          this.cancelEditIngredient();
        });
    },
    cancelEditIngredient() {
      this.editing = false;
      setTimeout(() => {
        this.tempIngredient = null;
      }, 500);
    },
    initEdit(item) {
      this.tempIngredient = item;
      this.editing = true;
    },
    submitNewIngredient() {
      console.log(this.newIngredientName, "new name");

      if (!this.newIngredientName) {
        this.snackbarStore.showSnackbar({
          message: "Ingredient name cannot be empty",
        });
        return;
      }

      let data = {
        name: this.newIngredientName,
      };

      this.loading = true;

      this.axiosInstance
        .post(`/ingredients`, data)
        .then((res) => {
          console.log(res.data, "ingredient response");
          this.ingredients.push(res.data);
          this.snackbarStore.showSnackbar({ message: "Ingredient added" });
        })
        .catch((err) => {
          console.log(err, "error");
        })
        .finally(() => {
          this.loading = false;
          this.cancelNewIngredient();
        });
    },
    cancelNewIngredient() {
      this.newIngredientModal = false;
      this.newIngredientName = "";
    },
    close() {
      this.display = false;
      this.cancelNewIngredient();
    },
    open() {
      this.display = true;
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
    async setAuthToken() {
      this.token = await this.$auth0.getAccessTokenSilently();
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
  },
};
</script>
<style lang="scss" scoped>
.xs-btn {
  height: 2rem;
  width: 2rem;
}
</style>
