<template>
  <div id="app" class="container-fluid row">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <Toolbar />
    <b-col>
      <router-view id="app-home" class="container-lg"> </router-view>
    </b-col>
    <About />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import About from "./views/About.vue";
import Toolbar from "./views/Toolbar.vue";
export default Vue.extend({
  components: { About, Toolbar },
  data() {
    return {};
  }
});
</script>
<style lang="scss">
@import "~bootstrap/scss/_functions.scss";
@import "~bootstrap/scss/_variables.scss";
@import "~bootstrap/scss/mixins/_breakpoints.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#app-home {
  height: 100vh;
  // margin-right: 5%;
  // margin-right: 5%;
}
.row {
  margin-left: auto;
  margin-right: auto;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
#app-view {
  padding: 30px;
}

@media (max-width: 1400px) {
  #app-home {
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
