<template>
  <v-app-bar app color="indigo" dark>
    <v-toolbar-title> My Webpage </v-toolbar-title>

    <v-spacer />

    <v-btn text to="/home"> Home </v-btn>

    <v-btn text to="/blog"> Blog </v-btn>

    <v-btn text to="/about"> About </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      message: "hi",
    };
  },
};
</script>

<style scoped></style>
