<template>
  <div>
    <h1>
      {{ message }}
    </h1>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Test",
  data() {
    return {
      message: "hi",
      todos: [],
    };
  },
  async mounted() {
    const response = await axios.get(
      import.meta.env.VITE_APP_API + "/todoList"
    );
    this.todos = response.data;
    console.log(this.todos, "todo response");
    // console.log(import.meta.env.VITE_APP_API, "api");
  },
};
</script>

<style></style>
