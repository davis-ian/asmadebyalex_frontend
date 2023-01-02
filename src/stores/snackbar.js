import { defineStore } from "pinia";

export const useSnackbarStore = defineStore({
  id: "snackbar",
  state: () => ({
    snackbar: {
      message: "",
      color: "",
      timeout: "2000",
    },
  }),
  getters: {
    // doubleCount: state => state.counter * 2,
  },
  actions: {
    showSnackbar({
      message = "",
      color = "",
      timeout = "2000",
      button = null,
    }) {
      this.snackbar.message = message;
      this.snackbar.color = color;
      this.snackbar.timeout = timeout;
    },
  },
});
