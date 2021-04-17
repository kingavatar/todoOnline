import { MutationTree, GetterTree, ActionTree } from "vuex";
import { AuthState, RootState } from "@/types";
import axios from "axios";
import router from "../../router";

const authState: AuthState = {
  status: "",
  token: localStorage.getItem("token") || "",
  user: {}
};

const authGetters: GetterTree<AuthState, RootState> = {
  isLoggedIn: state => !!state.token,
  authStatus: state => state.status
};

export type Mutations<S = AuthState> = {
  authRequest(state: S): void;
  authSuccess(
    state: S,
    { token, user }: { token: string; user: Record<string, any> }
  ): void;
  setToken(state:S):void;
  authError(state: S): void;
  logout(state: S): void;
};

const mutations: MutationTree<AuthState> & Mutations = {
  authRequest(state) {
    state.status = "loading";
  },
  authSuccess(state, { token, user }) {
    state.status = "success";
    state.token = token;
    state.user = user;
  },
  setToken(state){
    state.token="demo";
  },
  authError(state) {
    state.status = "error";
  },
  logout(state) {
    state.status = "";
    state.token = "";
    state.user = {};
  }
};

const actions: ActionTree<AuthState, RootState> = {
  async login({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit("authRequest");
      axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
      axios({
        url: "http://localhost:3000/auth/signin",
        data: user,
        method: "POST"
      })
        .then(resp => {
          // const token = resp.data.token
          const token = "demo";
          const user = resp.data.user;
          localStorage.setItem("token", token);
          // axios.defaults.headers.common['Authorization'] = token
          commit("authSuccess", token, user);
          commit("setToken");
          resolve(resp);
        })
        .catch(err => {
          commit("authError");
          localStorage.removeItem("token");
          reject(err);
        });
    });
    // const token = "demo";
    // return commit("authSuccess", { token, user });
  },
  signup({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit("authRequest");
      axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
      axios({
        url: "http://localhost:3000/auth/signup",
        data: user,
        method: "POST"
      })
        .then(resp => {
          const user = resp.data.user;
          const token = "demo";
          localStorage.setItem("token", token);
          // axios.defaults.headers.common['Authorization'] = token
          commit("authSuccess", token, user);
          resolve(resp);
        })
        .catch(err => {
          commit("authError");
          localStorage.removeItem("token");
          reject(err);
        });
    });

    // const token = "demo";
    // return commit("authSuccess", { token, user });
  },
  // register({ commit }, user) {
  //   return new Promise((resolve, reject) => {
  //     commit('auth_request')
  //     axios({ url: 'http://localhost:3000/register', data: user, method: 'POST' })
  //       .then(resp => {
  //         const token = resp.data.token
  //         const user = resp.data.user
  //         localStorage.setItem('token', token)
  //         axios.defaults.headers.common['Authorization'] = token
  //         commit('auth_success', token, user)
  //         resolve(resp)
  //       })
  //       .catch(err => {
  //         commit('auth_error', err)
  //         localStorage.removeItem('token')
  //         reject(err)
  //       })
  //   })
  // },
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      // delete axios.defaults.headers.common['Authorization']
      axios({ url: "http://localhost:3000/auth/logout", method: "GET" })
        .then(resp => {
          commit("logout");
          localStorage.removeItem("token");
          resolve(resp);
        })
        .catch(err => {
          commit("authError", err);
          reject(err);
        });
    });
    // return commit("logout");
  }
};

const auth = {
  namespaced: true,
  state: authState,
  getters: authGetters,
  mutations,
  actions
};

export default auth;
