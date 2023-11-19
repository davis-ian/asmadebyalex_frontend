<template>
  <div>
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
