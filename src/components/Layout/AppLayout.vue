<template>
  <div class="app-layout">
    <nav-bar />
    <div class="d-flex flex-column align-center flex-grow-1">
      <div class="pa-3 view-content">
        <slot />
      </div>
    </div>
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
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

.view-content {
  min-height: 100%;
  width: 100%;
  max-width: 900px;
}
</style>
