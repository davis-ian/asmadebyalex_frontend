<template>
  <div class="pa-3 pt-0">
    <v-row>
      <v-col cols="4" v-for="i in 3">
        <v-card
          v-if="recipes[i - 1]"
          style="cursor: pointer; height: 90%"
          class="my-3 elevation-4"
          @click="$router.push(`/recipes/${recipes[i - 1].id}`)"
        >
          <div v-if="recipes[i - 1].images">
            <v-img
              aspect-ratio="1"
              cover
              :src="`https://gncc41fw.directus.app/assets/${
                recipes[i - 1].images[0].directus_files_id.id
              }`"
              :lazy-src="`https://gncc41fw.directus.app/assets/${
                recipes[i - 1].images[0].directus_files_id.id
              }`"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </div>
          <div class="pa-2">
            <h4 class="text-center">{{ recipes[i - 1].name }}</h4>

            <div
              style="display: flex; gap: 5px"
              v-if="recipes[i - 1].categories"
            >
              <!-- <p
                style="color: gray; font-size: 0.9rem"
                v-for="(cat, index) in recipes[i - 1].categories"
              >
                {{ cat.categories_id.category }}
                {{ index == recipes[index].categories.length - 1 ? "" : "|" }}
              </p> -->
            </div>
            <!-- <div>{{ new Date(recipe.date_created).toLocaleDateString() }}</div> -->
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  name: "Recipes",

  data() {
    return {
      message: "hi",
      recipes: [],
    };
  },
  methods: {
    getRecipes() {
      this.$axios
        .get(import.meta.env.VITE_APP_API + "/Recipes?fields=*.*.*.*.*images.*")
        .then((res) => {
          console.log(res.data.data, "articles");
          this.recipes = res.data.data;
        })
        .catch((err) => {
          console.log(err, "error");
        });
    },
  },
  mounted() {
    this.getRecipes();
  },
};
</script>
<style lang=""></style>
