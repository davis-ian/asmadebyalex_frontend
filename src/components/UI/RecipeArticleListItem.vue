<template>
  <div class="d-flex list-item-wrapper">
    <v-img
      class="list-item-img"
      aspect-ratio="1"
      cover
      :src="
        item.mainPhoto
          ? imgWithLimit(item.mainPhoto.secureUrl, 200)
          : placeholderImgSrc
      "
      :lazy-src="
        item.mainPhoto
          ? imgWithLimit(item.mainPhoto.secureUrl, 200)
          : placeholderImgSrc
      "
    />

    <div class="text-container">
      <div v-if="item.title">
        <strong>
          {{ item.title }}
        </strong>
      </div>
      <div v-else-if="item.name">
        <strong>
          {{ item.name }}
        </strong>
      </div>
      

      <div v-if="item.createdAt">{{ formatDate(item.createdAt) }}</div>
    </div>
    <div
      v-if="$route.name == 'Admin' && authStore.roles.includes('SuperAdmin')"
      class="d-flex justify-center align-center ma-3"
    >
      <v-btn
        class="delete-btn"
        @click.stop="$emit('delete')"
        color="#ef5267"
        icon
        variant="flat"
      >
        <font-awesome-icon icon="fa-solid fa-trash-can"></font-awesome-icon>
      </v-btn>
    </div>
  </div>
</template>
<script>
import PlaceholerImgSrc from "@/assets/images/pastry-board.jpg";
import { useAuthStore } from "@/stores/user";
export default {
  data() {
    return {
      placeholderImgSrc: PlaceholerImgSrc,
      authStore: useAuthStore(),
    };
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
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
    formatDate(val) {
      return new Date(val).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.list-item-wrapper {
  gap: 12px;
  border: 1px solid;
}

.text-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.list-item-img {
  width: 100px;
  height: 100px;
  border-right: 1px solid;
}

.delete-btn {
  opacity: 0;
  transition: 0.3s;
}

.delete-btn:hover {
  opacity: 1 !important;
}

.list-item-wrapper:hover .delete-btn {
  opacity: 0.3;
}
</style>
