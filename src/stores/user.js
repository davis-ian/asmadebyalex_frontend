import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  // Store name
  id: "user",

  // State definition
  state: () => ({
    isAuthenticated: false,
    user: null,
  }),

  actions: {
    updateAuthStatus(isAuthenticated, user) {
      this.isAuthenticated = isAuthenticated;
      this.user = user;
    },
  },
});
