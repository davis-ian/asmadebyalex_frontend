<template>
  <div class="pa-3 pt-0">
    <div v-if="loading">
      <v-progress-linear indeterminate></v-progress-linear>
    </div>
    <v-row>
      <v-col v-for="(recipe, index) in recipes" cols="12" md="6">
        <v-card
          style="cursor: pointer"
          :style="{ '--item-index': index }"
          class="my-3 elevation-4 list-item"
          @click="$router.push(`/recipes/${recipe.id}`)"
        >
          <div>
            <v-img cover style="height: 250px" :src="placeholderImgSrc" />
            <div class="pa-2">
              <h4>{{ recipe.name }}</h4>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import PlaceholerImgSrc from "@/assets/images/pastry-board.jpg";
export default {
  name: "Recipes",

  data() {
    return {
      message: "hi",
      recipes: [],
      loading: true,
      placeholderImgSrc: PlaceholerImgSrc,
      testRecipes: [
        { id: 1, name: "Recipe1", image: this.placeholderImgSrc },
        { id: 2, name: "Recipe2", image: this.placeholderImgSrc },
        { id: 3, name: "Recipe3", image: this.placeholderImgSrc },
        { id: 4, name: "Recipe4", image: this.placeholderImgSrc },
        { id: 5, name: "Recipe5", image: this.placeholderImgSrc },
        { id: 6, name: "Recipe6", image: this.placeholderImgSrc },
        { id: 7, name: "Recipe7", image: this.placeholderImgSrc },
        { id: 8, name: "Recipe8", image: this.placeholderImgSrc },
      ],
    };
  },
  methods: {
    getRecipes() {
      this.loading = true;

      this.$axios
        .get(import.meta.env.VITE_APP_API + "/recipes")
        .then((res) => {
          console.log(res.data, "recipes success");
          this.recipes = res.data;
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
    this.getRecipes();
  },
};
</script>
<style lang="scss" scoped>
.list-item {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeIn 0.5s ease forwards;
  animation-delay: calc(
    0.1s * var(--item-index)
  ); /* Delay based on item index */
}

@keyframes fadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
