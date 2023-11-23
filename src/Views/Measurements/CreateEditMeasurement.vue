<template lang="">
  <div>
    <h1>Add Measurement</h1>
    <v-text-field label="Name" v-model="name"></v-text-field>
    <v-btn variant="outlined" @click="submitMeasurement">Submit</v-btn>
  </div>
</template>
<script>
import { useSnackbarStore } from "@/stores/snackbar";
import { useAuthStore } from "@/stores/user";
import { mapStores } from "pinia";
export default {
  data() {
    return {
      loading: false,
      name: "",
      token: "",
      authStore: this.useAuthStore(),
    };
  },
  computed: {
    ...mapStores(useSnackbarStore),
  },
  methods: {
    submitMeasurement() {
      if (!this.name) {
        this.snackbarStore.showSnackbar({
          message: "Name cannot be blank",
          color: "error",
        });
        return;
      }

      let data = {
        name: this.name,
      };
      this.loading = true;
      this.axiosInstance
        .post("/measurements", data)
        .then((res) => {
          this.$router.push("/admin");
        })
        .catch((err) => {
          console.log(err, "error");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    async setAuthToken() {
      if (this.authStore.isAuthenticated) {
        this.token = await this.$auth0.getAccessTokenSilently();
      }
    },
    createAxiosInstance() {
      this.axiosInstance = this.$axios.create({
        headers: { Authorization: `Bearer ${this.token}` },
        baseURL: import.meta.env.VITE_APP_API,
      });
    },
  },
  async mounted() {
    await this.setAuthToken();
    this.createAxiosInstance();
  },
};
</script>
<style lang=""></style>
