// import { auth0 } from "../auth/auth0-plugin";
import { authGuard, useAuth0 } from "@auth0/auth0-vue";
import { getCurrentInstance } from "vue";

// const authGuard = (to, from, next) => {
//   //   const authService = app.config.globalProperties.$auth;
//   //   const isAuthenticated = authService.isAuthenticated();
//   const auth0Client = auth0;
//   console.log(auth0Client, "auth client");
//   const isAuthenticated = auth0Client.isAuthenticated();

//   if (isAuthenticated) {
//     // User is authenticated, allow access to the route
//     next();
//   } else {
//     // User is not authenticated
//     // Check if the route requires authentication
//     if (to.meta.requiresAuth) {
//       // Route requires authentication, redirect to the login page
//       next({ name: "login" });
//     } else {
//       // Route does not require authentication, allow access
//       next();
//     }
//   }
// };

const adminGuard = async (to, from, next) => {
  const app = getCurrentInstance();
  if (app && app.appContext) {
    const { auth0 } = app.appContext.config.globalProperties;

    // Now you can access the auth0 instance
    console.log(auth0, "auth");
  }

  next();
  //   //   const authService = app.config.globalProperties.$auth;
  //   //   const isAuthenticated = authService.isAuthenticated();
  //   const auth0Client = auth0.us;

  //   //   const isAuthenticated = auth0Client.isAuthenticated();

  //   if (isAuthenticated) {
  //     // Check if the user has the 'superAdmin' role
  //     const user = authService.user;
  //     const roles = user[`${process.env.VUE_APP_AUTH0_NAMESPACE}/roles`];
  //     if (roles && roles.includes("superAdmin")) {
  //       // User has the 'superAdmin' role, allow access to the admin route
  //       next();
  //     } else {
  //       // User does not have the 'superAdmin' role, redirect to a different page or show an error message
  //       next({ name: "unauthorized" });
  //     }
  //   } else {
  //     // User is not authenticated, redirect to the login page
  //     next({ name: "login" });
};

export { authGuard, adminGuard };
