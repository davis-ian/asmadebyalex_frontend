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
  faEllipsis,
  faPlus,
  faTrash,
  faArrowLeft,
  faBreadSlice,
  faBacon,
  faIceCream,
  faDrumstickBite,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

import { faInstagram } from "@fortawesome/free-brands-svg-icons";

// import { fa } from "@fortawesome/free-regular-svg-icons";

library.add(
  faEllipsis,
  faPlus,
  faInstagram,
  faTrash,
  faArrowLeft,
  faBreadSlice,
  faBacon,
  faIceCream,
  faDrumstickBite,
  faStar
);

// =============================================================================
// FONT AWESOME CONFIG
// =============================================================================
app.component("font-awesome-icon", FontAwesomeIcon);

// =============================================================================
// Component Registrations
// =============================================================================

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

app.use(pinia);
app.use(auth0);
registerPlugins(app);
app.mount("#app");
