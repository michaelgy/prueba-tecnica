import { boot } from "quasar/wrappers";

import { VueFire } from "vuefire";

import { firebaseApp } from "./firebase";

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$vuefire = VueFire;
  app.use(VueFire, {
    // imported above but could also just be created here
    firebaseApp,
  });
});

export { VueFire };
