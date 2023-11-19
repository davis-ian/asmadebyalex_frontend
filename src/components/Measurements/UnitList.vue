<template>
  <div>
    <div
      v-for="(item, index) in measurements"
      :key="item.id"
      class="my-5"
      :style="{
        '--item-index': index,
      }"
    >
      <div class="list-item pa-3" style="border: 1px solid">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      measurements: [],
    };
  },
  methods: {
    getMeasurements() {
      this.loading = true;

      this.$axios
        .get(import.meta.env.VITE_APP_API + "/measurements")
        .then((res) => {
          this.measurements = res.data;
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
    this.getMeasurements();
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
