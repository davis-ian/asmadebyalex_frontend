<template>
  <div>
    <dashboard-modal
      v-if="uppy"
      :uppy="uppy"
      :props="dashboardProps"
      :open="isOpen"
    />
  </div>
</template>
<script>
import Uppy from "@uppy/core";
import { DashboardModal } from "@uppy/vue";
import UppyAddUploaderPlugin from "@/utilities/uppy-add-uploader-plugin.js";
import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";

import { useSnackbarStore } from "@/stores/snackbar";

export default {
  data() {
    return {
      snackbarStore: useSnackbarStore(),
      isOpen: false,
      maxFileSize: 15000000,
      dashboardProps: {
        theme: "light",
        onRequestCloseModal: this.handleClose,
        hideUploadButton: false,
        height: "100px",
        showProgressDetails: true,
        browserBackButtonClose: true,
        closeModalOnClickOutside: true,
        proudlyDisplayPoweredByUppy: false,
        note: "5MB file size limit",
      },
      uppy: null,
      tempFiles: [],
      cloud: null,
    };
  },
  props: {
    articleId: {
      type: Number,
      required: false,
    },
    recipeId: {
      type: Number,
      required: false,
    },
  },
  components: { DashboardModal },
  methods: {
    initUppy() {
      this.uppy = new Uppy({
        id: "logo-upload",
        debug: true,
        autoProceed: false,
        // logger: Uppy.debugLogger,
        allowMultipleUploadBatches: false,
        restrictions: {
          //   maxFileSize: this,maxFileSize,
          minNumberOfFiles: 1,
          //   maxNumberOfFiles: 1,
          allowedFileTypes: ["image/*"],
        },
      })
        .use(UppyAddUploaderPlugin, {
          uploader: async () => {
            await this.initUpload();
          },
        })
        .on("upload-progress", (file, progress) => {})
        .on("file-added", (file) => {
          this.tempFiles = [...this.tempFiles, file];
        })
        .on("file-removed", (file) => {
          let found = this.tempFiles.find((x) => x.id == file.id);

          if (found) {
            let index = this.tempFiles.indexOf(found);
            this.tempFiles.splice(index, 1);
          }
        });
    },
    handleClose() {
      this.isOpen = false;
    },
    async uploadToEndpoint(file, onUploadProgress) {
      if (!file) {
        return;
      }
      const formData = new FormData();
      formData.append("file", file.data);
      formData.append(
        "upload_preset",
        import.meta.env.VITE_APP_CLOUDINARY_UNSIGNED_PRESET
      );

      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
        withCredentials: false,
        onUploadProgress,
      };

      const baseUrl = `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME
      }/auto/upload`;

      return this.$axios
        .post(baseUrl, formData, config)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          console.log(err, "error");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    async getUploadSignature() {
      return this.$axios
        .get(import.meta.env.VITE_APP_API + "/media/upload-signature")
        .then((resp) => {
          return resp.data;
        })
        .catch((error) => {
          console.log(error, "Error getting upload signature");
        });
    },
    async addToDb(data) {
      return this.$axios
        .post(import.meta.env.VITE_APP_API + "/media/", data)
        .then((resp) => {
          return resp.data;
        })
        .catch((error) => {
          console.log(error, "Error getting upload signature");
        });
    },
    async initUpload() {
      if (!this.recipeId && !this.articleId) {
        this.snackbarStore.showSnackbar({
          message: "Must include articleId or recipeId",
          color: "error",
        });
        return;
      }

      this.uppy.emit("upload-start", this.tempFiles);

      for (let i = 0; i < this.tempFiles.length; i++) {
        let SELECTED_FILE = this.tempFiles[i];

        try {
          const uploadResp = await this.uploadToEndpoint(
            SELECTED_FILE,
            (ev) => {
              // Emit progress update so Uppy Dashboard shows progress bar
              this.uppy.emit("upload-progress", SELECTED_FILE, {
                uploader: this,
                bytesUploaded: ev.loaded,
                bytesTotal: ev.total,
                percentage: (ev.loaded / ev.total) * 100,
                uploadComplete: ev.total < ev.loaded ? false : true,
                uploadStarted: ev.total > 0 ? true : false,
              });
            }
          );

          if (uploadResp) {
            this.uppy.emit("upload-success", SELECTED_FILE, uploadResp);
          } else {
            console.log("Upload error");
            return;
          }

          const uploadData = {
            ...uploadResp.data,
            articleId: this.articleId > 0 ? this.articleId : null,
            recipeId: this.recipeId > 0 ? this.recipeId : null,
          };

          const dbResult = await this.addToDb(uploadData);
        } catch (error) {
          console.log(error, "Error occurred during upload");

          var status = -1;

          if (error.response) {
            status = error.response.status;
          }

          const response = {
            status: status,
          };

          this.uppy.emit("upload-error", SELECTED_FILE, error, response);
        }
      }
      this.$emit("upload-complete");
      this.isOpen = false;
      this.uppy.cancelAll();
    },
    open() {
      this.isOpen = !this.isOpen;
    },
  },
  mounted() {
    this.initUppy();
  },
};
</script>
<style lang="scs"></style>
