<template>
  <div class="home-featured pa-5">
    <div>
      <h1 class="all-caps display text-center">
        Discover My Carefully Curated Selection of Mouthwatering Creations!
      </h1>
      <div class="d-flex justify-center" style="gap: 40px">
        <div v-for="i in 3" style="width: 100%">
          <div class="pa-3">
            <v-img
              cover
              aspect-ratio="1"
              class="rounded-circle"
              :src="placeholderImgSrc"
              :lazy-src="placeholderImgSrc"
            ></v-img>
            <div class="text-center all-caps">
              <h5>Recipe</h5>
              <p>$20</p>
            </div>
          </div>
        </div>
      </div>
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
