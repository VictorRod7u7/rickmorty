import { createApp } from "vue";
import App from "./App.vue";
import store from "./store/index.js"; // Importa tu store
import "sweetalert2/dist/sweetalert2.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "tippy.js/dist/tippy.css"; // Importa la hoja de estilos de Tippy
import tippy from "tippy.js";

const app = createApp(App);

// Configura el uso de Tippy como una propiedad global
app.config.globalProperties.$tippy = tippy;

// Instala Vuex en la aplicación
app.use(store);

// Monta la aplicación
app.mount("#app");
