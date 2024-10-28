import { useSeoMeta } from "@unhead/vue";
import { useRuntimeConfig } from "nuxt/app";
interface headInterface {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
}
const head: headInterface = {
  title: ``,
  description: "",
  image: "",
  type: "website",
};
export default function (object = head) {
  const title = typeof object.title === "undefined" ? head.title : object.title;
  const description =
    typeof object.description === "undefined"
      ? head.description
      : object.description;
  const image = typeof object.image === "undefined" ? head.image : object.image;
  const type = typeof object.type === "undefined" ? head.type : object.type;
  const moduleConfig:any = useRuntimeConfig();
  const seoObject: any = {
    title: () => `${title + moduleConfig.public.glorious.seo.suffix}`,
    ogTitle: () => `${title + moduleConfig.public.glorious.seo.suffix}`,
    description: () => `${description}`,
    ogDescription: () => `${description}`,
    ogType: () => type,
  };
  if (image !== "") seoObject["image"] = image;
  if (title === "") {
    seoObject["title"] = moduleConfig.public.glorious.seo.title;
    seoObject["ogTitle"] = moduleConfig.public.glorious.seo.title;
  }
  if (description === "") {
    seoObject["description"] = moduleConfig.public.glorious.seo.description;
    seoObject["ogDescription"] = moduleConfig.public.glorious.seo.description;
  }
  useSeoMeta(seoObject);
}
