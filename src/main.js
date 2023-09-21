import { createApp } from "vue";
import App from "./App.vue";
import "sweetalert2/dist/sweetalert2.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "tippy.js/dist/tippy.css"; // Importa los estilos de Tippy.js
import tippy from "tippy.js"; // Importa Tippy.js

const app = createApp(App);

// Agrega Tippy.js al prototipo Vue para que esté disponible en todos los componentes
app.config.globalProperties.$tippy = tippy;

app.mount("#app");
