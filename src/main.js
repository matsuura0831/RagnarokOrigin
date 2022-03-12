import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueGtag from "vue-gtag";
import Toaster from '@meforma/vue-toaster';
import './index.css';

const app = createApp(App);
app.use(store).use(router).use(Toaster);

if(process.env.NODE_ENV === "production") {
    app.use(VueGtag, {
        config: {
            id: "G-224YJ56XVV",
        },
    }, router);
}

app.mount("#app");

// Toaster info: https://meforma.github.io/vue-toaster