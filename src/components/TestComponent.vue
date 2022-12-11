<template>
  <v-container class="home gradient fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <!-- <v-img contain height="300" src="src/assets/logo.svg" /> -->
      <!-- 
      <iframe
        src="https://giphy.com/embed/fVeAI9dyD5ssIFyOyM"
        width="480"
        height="360"
        frameBorder="0"
        class="giphy-embed elevation-8"
        allowFullScreen
        style="border-radius: 15px"
      ></iframe> -->

      <div class="lds-grid">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <!-- <div class="text-body-2 font-weight-light mb-n1">Welcome to</div> -->

      <!-- <h1 class="text-h2 font-weight-bold">Under Construction</h1> -->

      <div class="py-14" />

      <v-row class="d-flex align-center justify-center">
        <!-- <v-col cols="auto">
          <v-btn
            href="https://next.vuetifyjs.com/components/all/"
            min-width="164"
            rel="noopener noreferrer"
            target="_blank"
            variant="text"
          >
            <v-icon icon="mdi-view-dashboard" size="large" start />

            Components
          </v-btn>
        </v-col> -->

        <v-col cols="auto">
          <v-btn
            href="https://giphy.com/embed/fVeAI9dyD5ssIFyOyM"
            min-width="228"
            rel="noopener noreferrer"
            size="x-large"
            target="_blank"
            variant="flat"
          >
            <!-- <v-icon icon="mdi-speedometer" size="large" start /> -->
            <v-icon icon="mdi-tools" size="large" start />

            Under Construction
          </v-btn>
        </v-col>

        <!-- <v-col cols="auto">
          <v-btn
            href="https://community.vuetifyjs.com/"
            min-width="164"
            rel="noopener noreferrer"
            target="_blank"
            variant="text"
          >
            <v-icon icon="mdi-account-group" size="large" start />

            Community
          </v-btn>
        </v-col> -->
      </v-row>
    </v-responsive>
  </v-container>
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

<style>
.home {
  background: white;
}
.gradient {
  color: white;
  background: #4f247a;
  background: radial-gradient(
    ellipse farthest-corner at top right,
    #4f247a 19%,
    #171717 100%
  );
}

.lds-grid {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-grid div {
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #fff;
  animation: lds-grid 1.2s linear infinite;
}
.lds-grid div:nth-child(1) {
  top: 8px;
  left: 8px;
  animation-delay: 0s;
}
.lds-grid div:nth-child(2) {
  top: 8px;
  left: 32px;
  animation-delay: -0.4s;
}
.lds-grid div:nth-child(3) {
  top: 8px;
  left: 56px;
  animation-delay: -0.8s;
}
.lds-grid div:nth-child(4) {
  top: 32px;
  left: 8px;
  animation-delay: -0.4s;
}
.lds-grid div:nth-child(5) {
  top: 32px;
  left: 32px;
  animation-delay: -0.8s;
}
.lds-grid div:nth-child(6) {
  top: 32px;
  left: 56px;
  animation-delay: -1.2s;
}
.lds-grid div:nth-child(7) {
  top: 56px;
  left: 8px;
  animation-delay: -0.8s;
}
.lds-grid div:nth-child(8) {
  top: 56px;
  left: 32px;
  animation-delay: -1.2s;
}
.lds-grid div:nth-child(9) {
  top: 56px;
  left: 56px;
  animation-delay: -1.6s;
}
@keyframes lds-grid {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
