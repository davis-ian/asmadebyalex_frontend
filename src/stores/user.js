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
    updateAuthStatus(user, isAuth = false) {
      if (user) {
        // console.log(user, "user");
        this.user = user;
        this.roles = user["https://asmadebyalex.com/roles"];
      } else {
        this.user = null;
        this.roles = [];
      }

      if (isAuth) {
        this.isAuthenticated = isAuth;
      }
    },
  },
});
