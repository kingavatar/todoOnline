import { MutationTree, GetterTree, ActionTree } from "vuex";
import { AuthState, RootState } from "@/types";
import axios from "axios";
import router from "../../router";
import store from "..";

const authState: AuthState = {
  status: "",
  token: localStorage.getItem("token") || "",
  // isLoggedIn:false,
  user: {}
};

const authGetters: GetterTree<AuthState, RootState> = {
  isLoggedIn: state => !!state.token,
  // return new Promise((resolve, reject) => {
  // delete axios.defaults.headers.common['authorization']
  // axios({ url: "http://localhost:3000/auth/authStatus", method: "GET" })
  //   .then(resp => {
  //     return resp.data;
  //     // resolve(resp);
  //   })
  //   .catch(err => {
  //     return false;
  //     // reject(err);
  //   });
  // });

  authStatus: state => state.status
};

export type Mutations<S = AuthState> = {
  authRequest(state: S): void;
  authSuccess(
    state: S,
    { token, user }: { token: string; user: Record<string, any> }
  ): void;
  setToken(state: S, token: string): void;
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
    // state.isLoggedIn=true;
    state.user = user;
  },
  setToken(state, token) {
    state.token = token;
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
      // axios.defaults.headers.post["Access-Control-Allow-Origin"] = "http://localhost:8080/*";
      axios({
        url: "http://localhost:3000/api/auth/signin",
        data: user,
        method: "POST"
        // withCredentials: true
      })
        .then(resp => {
          // const token = resp.data.token
          const token = resp.data.token;
          const user = resp.data.user;
          localStorage.setItem("token", token);
          axios.defaults.headers.common["authorization"] = token;
          commit("authSuccess", { token, user });
          commit("setToken", token);
          resolve(resp);
        })
        .catch(err => {
          commit("authError");
          localStorage.removeItem("token");
          if (err.response != undefined) {
            if (err.response.status === 500) {
              router.push("/500");
            } else if (err.response.status === 404) {
              router.push("/404");
            } else {
              console.log(err);
            }
          }
          reject(err);
        });
    });
    // const token = "demo";
    // return commit("authSuccess", { token, user });
  },
  async oauthLogin({ commit }, token) {
    return new Promise((resolve, reject) => {
      commit("authRequest");
      axios.defaults.headers.common["authorization"] = token;
      axios({
        url: "http://localhost:3000/api/auth/social",
        data: token,
        method: "GET"
        // withCredentials: true
      })
        .then(resp => {
          // const token = resp.data.token
          const user = resp.data;
          localStorage.setItem("token", token);
          axios.defaults.headers.common["authorization"] = token;
          commit("authSuccess", { token, user });
          commit("setToken", token);
          resolve(resp);
        })
        .catch(err => {
          commit("authError");
          localStorage.removeItem("token");
          if (err.response != undefined) {
            if (err.response.status === 500) {
              router.push("/500");
            } else if (err.response.status === 404) {
              router.push("/404");
            } else {
              console.log(err);
            }
          }
          reject(err);
        });
    });
    // const token = "demo";
    // return commit("authSuccess", { token, user });
  },
  signup({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit("authRequest");
      // axios.defaults.headers.post["Access-Control-Allow-Origin"] = "http://localhost:8080/";
      axios({
        url: "http://localhost:3000/api/auth/signup",
        data: user,
        method: "POST"
      })
        .then(resp => {
          const user = resp.data.user;
          const token = resp.data.token;
          localStorage.setItem("token", token);
          axios.defaults.headers.common["authorization"] = token;
          commit("authSuccess", { token, user });
          commit("setToken", token);
          resolve(resp);
        })
        .catch(err => {
          commit("authError");
          localStorage.removeItem("token");
          if (err.response != undefined) {
            if (err.response.status === 500) {
              router.push("/500");
            } else if (err.response.status === 404) {
              router.push("/404");
            } else {
              console.log(err);
            }
          }
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
  //         axios.defaults.headers.common['authorization'] = token
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
      delete axios.defaults.headers.common["authorization"];
      axios({ url: "http://localhost:3000/api/auth/logout", method: "GET" })
        .then(resp => {
          commit("note/resetPages",null, { root: true });
          commit("logout");
          localStorage.removeItem("token");
          resolve(resp);
        })
        .catch(err => {
          commit("authError", err);
          if (err.response != undefined) {
            if (err.response.status === 500) {
              router.push("/500");
            } else if (err.response.status === 404) {
              router.push("/404");
            } else {
              console.log(err);
            }
          }
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
