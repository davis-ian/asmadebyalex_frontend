<template>
  <div>
    <h3>Uploader</h3>
    <v-btn @click="openModal">Upload</v-btn>

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

export default {
  data() {
    return {
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
      default: 0,
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
    async uploadToEndpoint(file, sig, onUploadProgress) {
      let formData = {
        file: file,
        api_key: import.meta.env.VITE_APP_CLOUDINARY_API_KEY,
        signature: sig.hash,
        timestamp: sig.timestamp,
      };

      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
        onUploadProgress,
      };

      const baseUrl = `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME
      }/auto/upload`;

      return this.$axios
        .post(baseUrl, formData, config)
        .then((res) => {
          console.log(res, "upload success");
          return res;
        })
        .catch((err) => {
          console.log(err, "error");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    uploadProgressHandler(progressEvent) {
      const { loaded, total } = progressEvent;
      const progressPercentage = Math.round((loaded / total) * 100);
      console.log(`Upload progress: ${progressPercentage}%`);
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
      console.log(this.tempFiles, "sim upload files");

      for (let i = 0; i < this.tempFiles.length; i++) {
        let SELECTED_FILE = this.tempFiles[i];

        console.log(SELECTED_FILE, "selected");
        try {
          const sig = await this.getUploadSignature();
          console.log(sig, "upload signature");

          const uploadResp = await this.uploadToEndpoint(
            SELECTED_FILE,
            sig,
            this.uploadProgressHandler
          );

          const uploadData = {
            ...uploadResp,
            articleId: this.articleId > 0 ? this.articleId : null,
          };

          const dbResult = await this.addToDb(uploadData);

          console.log(dbResult, "dbResult");
        } catch (error) {
          console.log(error, "Error occurred during upload");
        }
      }
    },
    openModal() {
      console.log(this.uppy, "uppy");
      this.isOpen = !this.isOpen;
    },
  },
  mounted() {
    this.initUppy();
  },
};
</script>
<style lang="scs"></style>
