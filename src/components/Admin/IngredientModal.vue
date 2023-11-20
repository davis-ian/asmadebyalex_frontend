<template>
  <div>
    <v-dialog v-model="display">
      <v-card>
        <v-card-title>Ingredients</v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item v-for="(item, index) in ingredients">
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="newIngredientModal = true">New +</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="newIngredientModal" max-width="400px">
      <v-card>
        <v-card-title>New Ingredient</v-card-title>
        <v-card-text>
          <v-text-field label="name" v-model="newIngredientName"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="cancelNewIngredient">Cancel</v-btn>
          <v-btn @click="submitNewIngredient">Submit</v-btn>
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

      this.$axios
        .post(import.meta.env.VITE_APP_API + `/ingredients`, data)
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
  },
};
</script>
<style lang=""></style>
