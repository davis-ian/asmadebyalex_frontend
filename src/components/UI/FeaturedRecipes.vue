<template>
  <div class="home-featured pa-5">
    <div>
      <h1 class="all-caps text-center pa-3">
        Discover My Carefully Curated Selection of Mouth watering Creations!
      </h1>

      <!-- <div class="d-flex justify-center" style="gap: 40px">
        <div v-for="i in 3" style="width: 100%"> -->

      <div class="d-flex justify-center">
        <v-row style="max-width: 1200px">
          <v-col v-for="i in 3" cols="12" md="4" sm="6">
            <div class="pa-3">
              <v-img
                cover
                aspect-ratio="1"
                class="rounded-circle"
                :src="placeholderImgSrc"
                :lazy-src="placeholderImgSrc"
              ></v-img>
              <div class="text-center all-caps">
                <h5 class="mb-0">Recipe</h5>
                <p>$20</p>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
      <!-- </div>
      </div> -->
      <div class="text-center pa-5">
        <v-btn size="large">Shop</v-btn>
      </div>
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
<style lang="scss">
.home-featured {
  background-color: #fff3f3;
}
</style>
