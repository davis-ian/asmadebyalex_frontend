<template>
  <div class="d-flex list-item-wrapper">
    <v-img
      class="list-item-img"
      aspect-ratio="1"
      cover
      :src="item.mainPhoto ? item.mainPhoto.secureUrl : placeholderImgSrc"
      :lazy-src="item.mainPhoto ? item.mainPhoto.secureUrl : placeholderImgSrc"
    />

    <div class="text-container">
      <div v-if="item.name">
        <strong>
          {{ item.name }}
        </strong>
      </div>
      <div v-if="item.createdAt">{{ formatDate(item.createdAt) }}</div>
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
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
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
</style>
