import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import createPersistedState from "vuex-persistedstate";
import note from "./modules/note";
import auth from "./modules/auth";
import { RootState } from "@/types";

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ],
  modules: {
    note,
    auth
  }
};

export default new Vuex.Store<RootState>(store);
