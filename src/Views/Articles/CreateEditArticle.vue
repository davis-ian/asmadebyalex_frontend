<template>
  <div class="pa-3">
    
    
    <v-text-field v-model="title" label="Title" variant="outlined"></v-text-field>
    <editor ref="editor"></editor>

    <div class="text-right mt-3">

      <v-btn variant="flat" color="primary" :disabled="loading" :loading="loading" @click="submitArticle">Save</v-btn>
    </div>
  </div>
</template>
<script>
import Editor from "@/components/UI/Editor.vue";
import { useAuthStore } from "@/stores/user";
import { useSnackbarStore } from "@/stores/snackbar";
export default {
  data() {
    return {
      token: "",
      loading: false,
      title: "",
      authStore: useAuthStore(),
      useSnackbarStore: useSnackbarStore()
    };
  },
  components: {
    Editor,
  },
  methods: {
    submitArticle() {

      let content = this.$refs.editor.getHtml();

      let data = {
        title: this.title,
        content: content
      }


      console.log('submitting article', data)

      this.loading = true;
      this.axiosInstance
      .post('/articles', data)
      .then(resp => {
        console.log(resp, 'article response')
        this.$router.push(`/articles/${resp.data.id}`)
      })
      .catch(error => {
        console.log(error, 'error')
      })
      .finally(() => {
        this.loading = false;
      })
    },
    async setAuthToken() {
    if (this.authStore.isAuthenticated) {
      this.token = await this.$auth0.getAccessTokenSilently();
    }
    },
    createAxiosInstance() {
      this.axiosInstance = this.$axios.create({
        headers: { Authorization: `Bearer ${this.token}` },
        baseURL: import.meta.env.VITE_APP_API,
      });
    },
  },
  async mounted() {
    await this.setAuthToken();
    this.createAxiosInstance();
  }
};
</script>
<style lang=""></style>
