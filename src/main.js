import { createApp } from "vue";
import App from "./App.vue";
import "sweetalert2/dist/sweetalert2.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "tippy.js/dist/tippy.css"; // Importa la hoja de estilos de Tippy
import tippy from "tippy.js";

const app = createApp(App);
app.config.globalProperties.$tippy = tippy;

app.mount("#app");
