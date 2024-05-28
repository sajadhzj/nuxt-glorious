import { defineNuxtPlugin } from "nuxt/app";
import colors from "tailwindcss/colors";

export default defineNuxtPlugin(() => {
  const tailwindColor: any = colors;

  return {
    provide: {
      tailwindColor: (color: string, value: string): string =>
        tailwindColor[color][value],
    },
  };
});
