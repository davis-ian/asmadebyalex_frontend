<template>
  <v-app>
    <v-main>
      <!-- <HelloWorld /> -->
      <TestComp id="main" />
    </v-main>
  </v-app>
</template>

<script setup>
import HelloWorld from "@/components/HelloWorld.vue";
import TestComp from "@/components/TestComponent.vue";
</script>

<style scoped>
#main {
  min-width: 100%;
}
</style>
