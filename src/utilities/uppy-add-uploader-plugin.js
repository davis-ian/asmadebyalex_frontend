import { BasePlugin } from "@uppy/core";

/* This Uppy plugin lets you add an action (or actions) to perform before upload.
 * The plugin options object takes an action method which will be called
 * once for each file getting uploaded. The action method should return a Promise.
 */
export default class UppyAddUploaderPlugin extends BasePlugin {
  constructor(uppy, opts) {
    super(uppy, opts);
    this.id = opts.id || "UppyAddUPloaderPlugin";
    this.type = "uploader";
  }

  install() {
    this.uppy.addUploader(this.opts.uploader);
  }

  uninstall() {
    this.uppy.addUploader(this.opts.uploader);
  }
}
