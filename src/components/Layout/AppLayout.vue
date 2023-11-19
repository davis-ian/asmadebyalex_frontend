<template>
  <div class="app-layout">
    <nav-bar />
    <slot />
  </div>
</template>

<script>
import NavBar from "@/components/Layout/NavBar.vue";
export default {
  name: "AppLayout",
  components: { NavBar },
};
</script>

<style>
.app-layout {
  background-color: #fff2f3;
}
</style>
