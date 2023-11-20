// =============================================================================
// CORE
// =============================================================================
import { createRouter, createWebHistory } from "vue-router";
import { adminGuard } from "@/auth/authGuard";

// =============================================================================
// Main
// =============================================================================

// =============================================================================
// Articles
// =============================================================================

// =============================================================================
// Recipies
// =============================================================================

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/Views/Home.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/Views/Login.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("@/Views/About.vue"),
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("@/Views/Admin.vue"),
    meta: {
      requiresAuth: true,
      roles: ["SuperAdmin"],
    },
    // beforeEnter: adminGuard,
  },
  {
    path: "/callback",
    name: "Callback",
    component: () => import("@/Views/Callback.vue"),
  },
  {
    path: "/contact",
    name: "Contact",
    component: () => import("@/Views/Contact.vue"),
  },
  {
    path: "/articles",
    name: "Articles",
    component: () => import("@/Views/Articles/Articles.vue"),
  },
  {
    path: "/articles/create",
    name: "CreateArticle",
    component: () => import("@/Views/Articles/CreateEditArticle.vue"),
  },

  {
    path: "/articles/:id",
    name: "ArticleDetail",
    component: () => import("@/Views/Articles/ArticleDetail.vue"),
  },
  {
    path: "/recipies/create",
    name: "CreateRecipe",
    component: () => import("@/Views/Recipies/CreateRecipe.vue"),
    meta: { requiresAuth: true, roles: ["SuperAdmin"] },
    beforeEnter: adminGuard,
  },
  {
    path: "/recipies",
    name: "Recipies",
    component: () => import("@/Views/Recipies/Recipies.vue"),
  },
  {
    path: "/recipies/:id",
    name: "RecipeDetail",
    component: () => import("@/Views/Recipies/RecipeDetail.vue"),
  },
  {
    path: "/measurements/create",
    name: "CreateMeasurement",
    component: () => import("@/Views/Measurements/CreateEditMeasurement.vue"),
    meta: { requiresAuth: true, roles: ["SuperAdmin"] },
    beforeEnter: adminGuard,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
