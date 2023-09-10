<template>
  <div>
    <QuillEditor
      ref="quillEditor"
      v-model:content="editorContent"
      :toolbar="'full'"
      :options="editorOptions"
      style="min-height: 300px"
    />

    <div class="pt-3">
      <v-btn color="primary" @click="getHtml">Save</v-btn>
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
    getHtml() {
      const htmlContent = this.$refs.quillEditor.getHTML();
      console.log(htmlContent, "html content");
      this.htmlContent = htmlContent;
    },
  },
};
</script>
<style lang=""></style>
