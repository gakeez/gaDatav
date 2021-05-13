import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import datav from "ga-datav-libs"; // 调用自己的组件库

createApp(App)
  .use(store)
  .use(router)
  .use(datav)
  .mount("#app");
