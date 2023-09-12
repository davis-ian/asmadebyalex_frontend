<template>
  <div>
    <div class="hero">
      <v-row no-gutters>
        <v-col cols="12" md="6">
          <div
            style="display: flex; flex-direction: column"
            class="welcome pa-5"
          >
            <h1 class="all-caps display">Welcome to</h1>
            <h1 class="all-caps display">As Made By Alex</h1>

            <p>
              A site that will provoke culinary inspiration; where I
              passionately curate a collection of delicious recipes, genuine
              opinions, helpful tips, and valuable suggestions.
            </p>

            <div>
              <v-btn
                class="underlined"
                variant="text"
                @click="$router.push('/about')"
                >Learn More</v-btn
              >
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <div style="height: 100%" class="image pa-5">
            <v-img
              height="100%"
              cover
              :src="placeholderImgSrc"
              :lazy-src="placeholderImgSrc"
            ></v-img>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
import PlaceholerImgSrc from "@/assets/images/pastry-board.jpg";
export default {
  data() {
    return {
      placeholderImgSrc: PlaceholerImgSrc,
    };
  },
};
</script>
<style lang="scss" scoped>
.hero {
  // background-color: #f3d6d8;
  background-color: #fff2f3;
}
</style>
