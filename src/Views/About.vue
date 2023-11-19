<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" divider="/"></v-breadcrumbs>
    <h2>About Me</h2>
    <p>This page is not ready but stay tuned for an update!</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      breadcrumbs: [
        {
          title: "Home",
          disabled: false,
          href: "/",
        },
        {
          title: "About",
          disabled: true,
          href: "/about",
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.view-content {
  min-height: 100%;
  width: 100%;
  max-width: 900px;
}
</style>
