<template>
  <div>
    <div class="pa-3">
      <div class="py-3">
        <h2>Say Hello</h2>
        <p>Want to know more or place an order? Shoot me a message!</p>
      </div>

      <v-form class="contact-form" v-model="valid" ref="form">
        <v-text-field
          v-model="firstName"
          label="First Name"
          color="#EFB0A1"
          variant="outlined"
          @keydown.enter="handleSubmit"
          :rules="nameRules"
        ></v-text-field>
        <v-text-field
          v-model="lastName"
          label="Last Name"
          color="#EFB0A1"
          variant="outlined"
          @keydown.enter="handleSubmit"
          :rules="nameRules"
        ></v-text-field>
        <v-text-field
          v-model="email"
          label="Email"
          color="#EFB0A1"
          variant="outlined"
          @keydown.enter="handleSubmit"
          :rules="emailRules"
          type="email"
        ></v-text-field>
        <v-textarea
          v-model="message"
          label="message"
          color="#EFB0A1"
          variant="outlined"
          @keydown.enter="handleSubmit"
          :rules="nameRules"
        ></v-textarea>
        <v-btn color="#EFB0A1" style="color: white" @click="handleSubmit" block
          >Submit</v-btn
        >
      </v-form>
    </div>
  </div>
</template>
<script>
import { useSnackbarStore } from "@/stores/snackbar";
import emailsjs from "emailjs-com";

export default {
  setup() {
    const snackbarStore = useSnackbarStore();
    return { snackbarStore };
  },
  data() {
    return {
      valid: true,
      firstName: "",
      lastName: "",
      email: "",
      message: "",
      nameRules: [(v) => !!v || "Field is required"],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
    };
  },
  methods: {
    handleSubmit(e) {
      console.log(this.$refs.form);
      console.log(e.target, "target");

      const templateParams = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        message: this.message,
      };

      try {
        emailsjs
          .send(
            import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
            templateParams,
            import.meta.env.VITE_APP_EMAILJS_PUB_KEY
          )
          .then((response) => {
            console.log(response, "success");
          });
      } catch (error) {
        console.log({ error });
      }
      // //Reset Form
      // this.firstName = "";
      // this.lastName = "";
      // this.email = "";
      // this.message = "";
      // if (this.valid) {
      //   this.snackbarStore.showSnackbar({ message: "Valid" });
      // } else {
      //   this.snackbarStore.showSnackbar({ message: "Not valid" });
      // }
    },
  },
};
</script>
<style lang="scss">
// .contact-form .v-text-field--active {
//   color: green;
// }
</style>
