import { createApp } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAngleDown,
  faAngleUp,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

import App from "./App.vue";

// import "@/assets/styles/main.css";
import "./assets/tailwind.css";

import router from "@/router";
import store from "./store";

library.add(faSearch);
library.add(faAngleDown);
library.add(faAngleUp);

const app = createApp(App).use(store);
app.use(router);
app.component("FontAwesomeIcon", FontAwesomeIcon);
app.mount("#app");
