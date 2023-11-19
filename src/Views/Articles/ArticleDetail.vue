<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" divider="/"></v-breadcrumbs>
    <div class="d-flex justify-space-between mb-3">
      <v-btn size="small" variant="tonal" text @click="$router.back()">
        <font-awesome-icon :icon="['fas', 'arrow-left']" />
      </v-btn>
      <v-btn
        v-if="userStore.roles.includes('SuperAdmin')"
        @click="toggleEditing"
        size="small"
        variant="tonal"
        >Edit</v-btn
      >
    </div>
    <div>
      <div style="width: 100%; max-width: 600px" v-if="article">
        <editor ref="editor" v-show="editing" />

        <div v-if="!editing">
          <h1 class="mb-2">{{ article.title }}</h1>
          <div>
            <i style="color: #aaa">{{ formatDate(article.createdAt) }}</i>
          </div>

          <div class="mt-8 content" v-html="article.content"></div>
        </div>
      </div>
      <div v-else>
        <div
          class="my-8"
          v-if="loading"
          style="
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          "
        >
          <v-progress-circular size="70" indeterminate></v-progress-circular>
          <p class="mt-5">Finding Article..</p>
        </div>
        <div v-else>Article not found..</div>
      </div>
    </div>
  </div>
</template>
<script>
import Editor from "@/components/UI/Editor.vue";
import PlaceholerImgSrc from "@/assets/images/pastry-board.jpg";
import { mapStores } from "pinia";
import { useAuthStore } from "@/stores/user";

export default {
  data() {
    return {
      placeholderImgSrc: PlaceholerImgSrc,
      message: "article details",
      article: null,
      loading: false,
      editing: false,
      breadcrumbs: [
        {
          title: "Home",
          disabled: false,
          href: "/",
        },
        {
          title: "Articles",
          disabled: false,
          href: "/recipies",
        },
        {
          title: "",
          disabled: true,
          href: "",
        },
      ],
    };
  },
  components: {
    Editor,
  },
  computed: {
    ...mapStores(useAuthStore),
  },
  methods: {
    toggleEditing() {
      this.editing = !this.editing;
      if (this.editing) {
        this.$refs.editor.title = this.article.title;
        this.$refs.editor.setHTML(this.article.content);
      }
    },
    formatDate(val) {
      return new Date(val).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
    getArticle(id) {
      this.loading = true;

      this.$axios
        .get(import.meta.env.VITE_APP_API + `/articles/${id}`)
        .then((res) => {
          this.article = res.data;
          this.breadcrumbs[2].title = this.article.title;
        })
        .catch((err) => {
          console.log(err, "error");
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  mounted() {
    this.getArticle(this.$route.params.id);
  },
};
</script>
<style lang="scss">
.content {
  width: 100%;
  max-width: 100%;

  iframe {
    width: 100%;
    max-width: 100%;
    aspect-ratio: 16/9;
    border-radius: 5px;
  }

  img {
    width: 100%;
    max-width: 100%;
    border-radius: 5px;
  }

  pre {
    background-color: #3b3b3b;
    overflow: auto;
    color: white;
    max-width: 100%;
    padding: 12px;

    border-radius: 5px;
    box-shadow: 0px 3px 3px -2px rgba(0, 0, 0, 0.2),
      0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12);

    white-space: pre-wrap; /* Since CSS 2.1 */
    white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
    white-space: -pre-wrap; /* Opera 4-6 */
    white-space: -o-pre-wrap; /* Opera 7 */
    word-wrap: break-word;
  }
}
</style>
