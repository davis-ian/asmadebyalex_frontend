<template>
  <div>
    <div id="home-container">
      <div class="featured-recipes">
        <!-- <recipe-card-scroll /> -->
        <h2 class="text-center">Featured Recipes</h2>
        <featured-recipes />
      </div>
      <!-- <div class="quick-search">
        <h3 style="color: white" class="text-center">
          Find the Perfect Recipe
        </h3>
        <v-row>
          <v-col cols="3" v-for="category in categories">
            <div class="pa-2 text-center">
              <font-awesome-icon
                style="color: white; font-size: 2.3rem"
                :icon="category.icon"
              />
              <p style="color: white">{{ category.label }}</p>
            </div>
          </v-col>
        </v-row>
      </div> -->
      <div class="recipe-list">
        <v-row no-gutters class="pa-3">
          <v-col cols="3">
            <div
              style="
                height: 100%;
                display: flex;
                flex-direction: center;
                align-items: center;
              "
            >
              <v-divider color="black"></v-divider>
            </div>
          </v-col>
          <v-col class="pa-2">
            <h2 class="text-center">More Recipes</h2>
          </v-col>
          <v-col cols="3">
            <div
              style="
                height: 100%;
                display: flex;
                flex-direction: center;
                align-items: center;
              "
            >
              <v-divider color="black"></v-divider>
            </div>
          </v-col>
        </v-row>
        <recipe-list />
      </div>
    </div>
  </div>
</template>

<script>
// import ArticleList from "@/components/Articles/ArticleList.vue";
import RecipeList from "@/components/Recipes/RecipeList.vue";
import RecipeCardScroll from "@/components/Recipes/RecipeCardScroll.vue";
import FeaturedRecipes from "@/components/Recipes/FeaturedRecipes.vue";

export default {
  name: "Home",
  metaInfo: {
    title: "As Made By Alex",
  },

  data() {
    return {
      message: "hi",
      categories: [
        { label: "Breads", icon: "fa-bread-slice" },
        { label: "Breakfast", icon: "fa-bacon" },
        { label: "Desserts", icon: "fa-ice-cream" },
        { label: "Savory", icon: "fa-drumstick-bite" },
      ],
    };
  },
  components: {
    // ArticleList,
    RecipeList,
    RecipeCardScroll,
    FeaturedRecipes,
  },
};
</script>
<style lang="scss">
// #home-container {
//   min-height: 100%;
// }
.featured-recipes {
  margin: 20px 10px;
}
.quick-search {
  background-color: #1d201f;
  padding: 10px;
}
</style>
