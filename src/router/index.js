// =============================================================================
// CORE
// =============================================================================
import { createRouter, createWebHistory } from "vue-router";

// =============================================================================
// Main
// =============================================================================
import Home from "@/Views/Home.vue";
import About from "@/Views/About.vue";
import Contact from "@/Views/Contact.vue";
import Admin from "@/Views/Admin.vue";
import Callback from "@/Views/Callback.vue";

// =============================================================================
// Articles
// =============================================================================
import Articles from "@/Views/Articles/Articles.vue";
import ArticleDetail from "@/Views/Articles/ArticleDetail.vue";

// =============================================================================
// Recipes
// =============================================================================
import Recipes from "@/Views/Recipes/Recipes.vue";
import RecipeDetail from "@/Views/Recipes/RecipeDetail.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/about", name: "About", component: About },
  { path: "/admin", name: "Admin", component: Admin },
  { path: "/callback", name: "Callback", component: Callback },
  { path: "/contact", name: "Contact", component: Contact },
  { path: "/articles", name: "Articles", component: Articles },
  { path: "/articles/:id", name: "ArticleDetail", component: ArticleDetail },
  { path: "/recipes", name: "Recipes", component: Recipes },
  { path: "/recipes/:id", name: "RecipeDetail", component: RecipeDetail },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
