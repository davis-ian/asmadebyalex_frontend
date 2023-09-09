<template>
  <div class="about">
    <v-row no-gutters>
      <v-col>
        <div style="height: 100%; display: flex" class="pa-5">
          <v-img :src="placeholderImgSrc" :lazy-src="placeholderImgSrc"></v-img>
        </div>
      </v-col>
      <v-col>
        <div class="pa-5">
          <h1 class="all-caps">Welcome To As Made By Alex</h1>
          <p>
            Discover a world of flavors, insights, and advice. Unleash your
            culinary creativity and let your taste buds be your guide. At As
            Made by Alex, we believe that food is more than just sustenance -
            it's a gateway to a world of joy and satisfaction. Join us on this
            delicious journey and explore a wide array of recipes, opinions,
            tips, and suggestions. Let us inspire you to create mouthwatering
            meals that will leave you wanting more. Let your passion for food
            ignite and fuel your imagination. Get ready to embark on a culinary
            adventure like no other.
          </p>
        </div>
      </v-col>
    </v-row>
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
.about {
  background-color: #f3d6d8;
}
</style>
