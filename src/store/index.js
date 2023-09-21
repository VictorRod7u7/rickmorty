import { createStore } from "vuex";
import locationModule from "./modules/location";

export default createStore({
  modules: {
    location: locationModule,
  },
});
