import { auth0 } from "../auth/auth0-plugin";
import { useAuthStore } from "@/stores/user";

export const authGuard = async (to, from, next) => {
  try {
    await auth0.checkSession();
    const authStore = useAuthStore();

    console.log(to, "to");
    // Check if the route requires authentication
    if (to?.meta?.requiresAuth) {
      console.log(to?.meta?.requiresAuth, "requires auth");
      // Check if the user is authenticated
      if (auth0.isAuthenticated.value) {
        const roles = auth0.user.value["https://asmadebyalex.com/roles"];
        const requiredRoles = to.meta.roles;
        console.log(requiredRoles, "required roles");
        // Check if requiredRoles is defined in the route's meta

        console.log(roles, "current roles");
        if (requiredRoles) {
          if (requiredRoles.some((role) => roles.includes(role))) {
            // User has the required role, allow access
            authStore.updateAuthStatus(
              auth0.user.value,
              auth0.isAuthenticated.value
            );
            next();
            return;
          } else {
            next("/forbidden");
            return;
          }
        } else {
          // No required roles specified, allow access
          authStore.updateAuthStatus(
            auth0.user.value,
            auth0.isAuthenticated.value
          );
          next();
          return;
        }
      } else {
        // User is not authenticated, redirect to login
        next("/login");
        return;
      }
    }

    // If the route does not require authentication, allow access
    authStore.updateAuthStatus(auth0.user.value, auth0.isAuthenticated.value);
    next();
  } catch (error) {
    console.log("Error in authGuard: ", error);
    next("/login");
  }
};
