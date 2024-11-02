export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("app:beforeMount", () => {
    window.addEventListener("click", (event:any) => {
        if (!event.target.matches(".glorious-input-field")) {
            const options = document.querySelectorAll(".glorious-input-options");
            options.forEach((el) => {
              el.classList.add("hidden");
            });
          }
    });
  });
});
