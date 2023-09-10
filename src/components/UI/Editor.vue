<template>
  <div>
    <v-text-field label="Title" v-model="title"></v-text-field>
    <QuillEditor
      ref="quillEditor"
      v-model:content="editorContent"
      :toolbar="'full'"
      :options="editorOptions"
      style="min-height: 300px"
      @ready="setReady"
    />

    <div class="pt-3">
      <v-btn color="primary" @click="submitPost">Save</v-btn>
    </div>
  </div>
</template>
<script>
import { QuillEditor } from "@vueup/vue-quill";
import Quill from "quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

import { ref } from "vue";

export default {
  data() {
    return {
      title: "",
      editorContent: "", // Store the editor content
      htmlContent: "",
      editorOptions: {
        // Quill options (customize as needed)
        placeholder: "Type something...",
      },
    };
  },
  components: {
    QuillEditor,
  },
  methods: {
    setReady(evt) {
      // console.log(evt, "ready");
    },
    getHtml() {
      const htmlContent = this.$refs.quillEditor.getHTML();
      console.log(htmlContent, "html content");
      this.htmlContent = htmlContent;
    },
    submitPost() {
      this.getHtml();

      let data = {
        title: this.title,
        content: this.htmlContent,
      };

      console.log(data, "data");

      this.$axios
        .post(import.meta.env.VITE_APP_API + `/articles`, data)
        .then((res) => {
          // this.snackbarStore.showSnackbar({
          //   message: "Article created",
          // });
          // this.$router.push("/admin");
        })
        .catch((err) => {
          console.log(err, "error");
          // this.snackbarStore.showSnackbar({
          //   message: "Error creating recipe",
          //   color: "error",
          // });
        });
      // .finally(() => {
      //   this.loading = false;
      // });
    },
  },
};
</script>
<style lang=""></style>
