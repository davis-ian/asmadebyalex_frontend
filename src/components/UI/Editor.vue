<template>
  <div>
    <!-- <v-text-field variant="solo" label="Title" v-model="title"></v-text-field> -->

    <div style="background-color: white">
      <QuillEditor
        class="quill-editor"
        ref="quillEditor"
        v-model:content="editorContent"
        :options="editorOptions"
        @ready="setReady"
      />
    </div>
    <!-- <v-btn block class="mt-3">Preview</v-btn> -->
    <!-- <v-btn @click="submitPost" block class="mt-3" color="black">Save</v-btn> -->
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
      showRaw: false,

      editorOptions: {
        // Quill options (customize as needed)
        placeholder: "Type something...",
        modules: {
          toolbar: this.toolbarOptions,
        },
      },
    };
  },
  props: {
    toolbarOptions: {
      type: Object,
      default: [
        [{ header: "1" }, { header: "2" }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        ["clean"],
      ],
    },
    content: {
      type: String,
      required: false,
    },
  },
  components: {
    QuillEditor,
  },
  methods: {
    setReady(evt) {
      if (this.content) {
        this.setHtml(this.content);
      }
    },
    getHtml() {
      const htmlContent = this.$refs.quillEditor.getHTML();
      // this.htmlContent = htmlContent;
      return htmlContent;
    },
    setHtml(val) {
      this.$refs.quillEditor.setHTML(val);
    },
    testRef() {
      console.log("REF HANDLER");
    },
    toggleRawHtml() {
      if (!this.showRaw) {
        this.getHtml();
      } else {
        this.setHtml(this.htmlContent);
      }
      this.showRaw = !this.showRaw;
    },
    submitPost() {
      this.getHtml();

      let data = {
        title: this.title,
        content: this.htmlContent,
      };

      this.$axios
        .post(import.meta.env.VITE_APP_API + `/articles`, data)
        .then((res) => {
          this.snackbarStore.showSnackbar({
            message: "Article created",
          });
          this.$router.push("/admin");
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
<style lang="scss">
.ql-toolbar.ql-snow {
  // border: 2px solid red !important;
  border-radius: 5px 5px 0 0 !important;
}
.quill-editor {
  min-height: 300px;
  border-radius: 0 0 5px 5px !important;
  .ql-editor {
    border-radius: 0 0 5px 5px !important;
    // border: 2px solid red !important;
    border: none;
    min-height: 300px;
  }
}
</style>
