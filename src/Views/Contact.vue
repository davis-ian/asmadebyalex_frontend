<template>
  <div>
    <div class="pa-3">
      <div
        v-if="messageSent"
        style="border: 1px solid #efb0a1; border-radius: 5px"
        class="pa-3 elevation-4"
      >
        <h2>Message Sent!</h2>
        <p>Thanks for reaching out! I'll get back to as soon as I can!</p>
      </div>
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
      messageSent: false,
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
      if (this.valid) {
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
              this.snackbarStore.showSnackbar({ message: "Message sent!" });
            });
        } catch (error) {
          console.log({ error });
        }
        this.$refs.form.reset();
        this.messageSent = true;
      } else {
        this.snackbarStore.showSnackbar({
          message: "Please fill out required fields",
        });
      }

      // if (this.valid) {
      //   this.snackbarStore.showSnackbar({ message: "Valid" });
      // } else {
      //   this.snackbarStore.showSnackbar({ message: "Not valid" });
      // }
    },
  },
};
</script>
<style lang="scss"></style>
