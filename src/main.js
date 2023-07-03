/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// =============================================================================
// COMPONENTS
// =============================================================================
import App from "./App.vue";
import router from "@/router";

// =============================================================================
// COMPOSABLES
// =============================================================================
import { createApp } from "vue";
import { createPinia } from "pinia";
// import { createAuth0 } from "@auth0/auth0-vue";
import { auth0 } from "./auth/auth0-plugin";

const app = createApp(App);
const pinia = createPinia();
// =============================================================================
// PLUGINS
// =============================================================================
import { registerPlugins } from "@/plugins";

// =============================================================================
// FONT AWESOME CORE
// =============================================================================
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// =============================================================================
// FONT AWESOME ICONS
// =============================================================================
import {
  faArrowLeft,
  faBreadSlice,
  faBacon,
  faIceCream,
  faDrumstickBite,
} from "@fortawesome/free-solid-svg-icons";

// import { fa } from "@fortawesome/free-regular-svg-icons";

library.add(faArrowLeft, faBreadSlice, faBacon, faIceCream, faDrumstickBite);

// =============================================================================
// FONT AWESOME CONFIG
// =============================================================================
app.component("font-awesome-icon", FontAwesomeIcon);

// =============================================================================
// GLOBALS
// =============================================================================
import axios from "axios";
const axiosInstance = axios.create({
  withCredentials: true,
});
app.config.globalProperties.$axios = { ...axiosInstance };

// =============================================================================
// INIT
// =============================================================================
app.use(router);
// app.use(
//   createAuth0({
//     domain: import.meta.env.VITE_AUTH0_DOMAIN,
//     clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
//     useRefreshTokens: true,
//     cacheLocation: "localstorage",
//     authorizationParams: {
//       redirect_uri: window.location.origin,
//       audience: import.meta.env.VITE_AUTH0_AUD,
//     },
//   })
// );

app.use(pinia);
app.use(auth0);
registerPlugins(app);
app.mount("#app");
