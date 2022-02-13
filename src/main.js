import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Toaster from '@meforma/vue-toaster';
import './index.css';

createApp(App).use(store).use(router).use(Toaster).mount("#app");

// Toaster info: https://meforma.github.io/vue-toaster