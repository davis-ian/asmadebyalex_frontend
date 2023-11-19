<template>
  <div class="home-featured pa-5">
    <div>
      <h1 class="all-caps text-center pa-3">
        <!-- Discover My Carefully Curated Selection of Mouth watering Creations! -->
        Featured
      </h1>

      <!-- <div class="d-flex justify-center" style="gap: 40px">
        <div v-for="i in 3" style="width: 100%"> -->

      <div class="d-flex justify-center">
        <v-row style="max-width: 1200px">
          <v-col v-for="(item, index) in featuredRecipies" :key="index">
            <transition name="fade" mode="out-in">
              <div
                style="
                  border: 2px solid;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                "
                @click="$router.push(`/recipies/${item.id}`)"
                class="pa-3"
              >
                <v-img
                  v-if="item.mainPhoto"
                  cover
                  width="100%"
                  max-width="400px"
                  aspect-ratio="1"
                  :src="imgWithLimit(item.mainPhoto.secureUrl, 600)"
                  :lazy-src="imgWithLimit(item.mainPhoto.secureUrl, 600)"
                ></v-img>
                <!-- class="rounded-circle" -->
                <div class="text-center all-caps">
                  <h3 class="mb-0">{{ item.name }}</h3>
                </div>
              </div>
            </transition>
          </v-col>
        </v-row>
      </div>
      <!-- </div>
      </div> -->
      <div class="text-center pa-5">
        <v-btn
          variant="text"
          class="underlined"
          @click="$router.push('/recipies')"
          size="large"
          >Explore Recipies</v-btn
        >
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
      featuredRecipies: [],
    };
  },
  methods: {
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
    getFeaturedRecipies() {
      this.loading = true;

      this.$axios
        .get(import.meta.env.VITE_APP_API + "/recipies?featured=true")
        .then((res) => {
          this.featuredRecipies = Array.from(res.data);
          console.log(this.featuredRecipies);
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
    this.getFeaturedRecipies();
  },
};
</script>
<style lang="scss" scoped>
.home-featured {
  background-color: #fff3f3;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
