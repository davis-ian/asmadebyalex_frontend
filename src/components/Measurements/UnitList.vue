<template>
  <div></div>
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
          console.log(res.data, "measurement success");
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
    console.log("measurement mounted");
    this.getMeasurements();
  },
};
</script>
<style lang=""></style>
