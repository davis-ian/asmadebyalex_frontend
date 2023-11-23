import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  // Store name
  id: "authStore",

  // State definition
  state: () => ({
    isAuthenticated: false,
    user: null,
    roles: [],
  }),

  actions: {
    updateAuthStatus(user) {
      this.isAuthenticated = user.isAuthenticated;
      this.user = user;
      this.roles = user["https://asmadebyalex.com/roles"];
    },
  },
});
