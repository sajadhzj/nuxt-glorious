import { QuillEditor } from "@vueup/vue-quill";
import ImageUploader from "quill-image-uploader";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { defineNuxtPlugin } from "#app";
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("QuillEditor", QuillEditor);
  return {
    provide: {
      quillModule: {
        image: ImageUploader,
      },
    },
  };
});
