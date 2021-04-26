<template>
  <div id="about" style="right: 0;">
    <div id="about-heading" class="text-center" @click="show = !show">
      about
    </div>
    <b-row
      v-if="
        this.$route.name === 'PageNotFound' ||
          this.$route.name === 'InternalServerError' ||
          this.$route.name === 'RedirectPage' ||
          this.$route.name=== 'Page'
      "
      align-h="end"
      style="margin-right:40px;"
      class="mt-4"
    >
      <b-button variant="outline-info" to="/"
        ><b-icon icon="door-closed" /> Go Home</b-button
      >
    </b-row>
    <b-row
      v-else-if="isLoggedIn"
      align-h="end"
      style="margin-right:40px;"
      class="mt-4"
    >
      <b-button variant="outline-info" @click="logout"
        ><b-icon icon="door-closed" /> Logout</b-button
      >
    </b-row>
    <b-row
      v-else-if="!isLoggedIn"
      align-h="end"
      style="margin-right:40px;"
      class="mt-4"
    >
      <b-button variant="outline-info" @click="SignUp"
        ><b-icon icon="door-closed" />
        {{ this.$route.name === "SignUp" ? "Sign In" : "Sign Up" }}</b-button
      >
    </b-row>
    <transition name="fade" v-on:after-enter="afterEnter">
      <div v-if="mobileShow" class="vertical-center">
        <div class="about-info">
          Todo Online is an Advanced Online Todo List built with Vuejs. It is
          designed and developed by
          <a href="https://kingavatar.github.io/" target="_blank">Saikiran</a>.
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters } from "vuex";
export default Vue.extend({
  name: "About",
  data: function() {
    return {
      show: false,
      screenWidth: window.innerWidth,
      prevRoute: ""
    };
  },
  methods: {
    afterEnter() {
      setTimeout(() => (this.show = !this.show), 2000);
    },
    resize() {
      this.screenWidth = window.innerWidth;
    },
    logout() {
      this.$store
        .dispatch("auth/logout")
        .then(() => this.$router.push("/login"))
        .catch(err => console.log(err));
    },
    SignUp() {
      if (this.$route.name === "SignUp") {
        if (this.prevRoute === "") {
          this.prevRoute = this.$route.name;
          this.$router.push("/login");
        } else if (this.prevRoute === "Login") {
          this.prevRoute = this.$route.name;
          this.$router.go(-1);
        } else {
          this.prevRoute = this.$route.name;
          this.$router.push("/login");
        }
      } else {
        this.prevRoute = this.$route.name;
        this.$router.push("/signup");
      }
    }
  },
  mounted() {
    window.addEventListener("resize", this.resize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resize);
  },
  computed: {
    mobileShow: function() {
      return this.screenWidth < 1400 || this.show;
    },
    ...mapGetters("auth", ["isLoggedIn"])
  }
});
</script>

<style lang="scss" scoped>
@import "~bootstrap/scss/_functions.scss";
@import "~bootstrap/scss/_variables.scss";
@import "~bootstrap/scss/mixins/_breakpoints.scss";
@import "~@/scss/_fonts.scss";
@include media-breakpoint-down(xl) {
  #about {
    width: 100%;
    // position: relative;
    // bottom: 0;
  }
}
#about {
  height: 100%;
}
@media (min-width: 1400px) {
  #about {
    max-width: 25%;
    width: 200px;
    // margin-right: auto;
    position: fixed;
    overflow: hidden;
  }
}
@media (min-width: 1500px) {
  #about {
    max-width: 25%;
    width: 15%;
    // margin-right: auto;
    position: fixed;
    overflow: hidden;
  }
}
@media (min-width: 1650px) {
  #about {
    max-width: 25%;
    width: 20%;
    // margin-right: auto;
    position: fixed;
    overflow: hidden;
  }
}
::v-deep #about-heading {
  font-family: Pacifico, cursive;
  // font-family: FredokaOne;
  font-size: 30px;
  color: #798794;
  margin-top: 50px;
  cursor: pointer;
}
.vertical-center {
  min-height: 50%; /* Fallback for browsers do NOT support vh unit */
  min-height: 50vh; /* These two lines are counted as one :-)       */
  padding-left: 30px;
  padding-right: 30px;
  justify-content: center;
  display: flex;
  align-items: center;
}
.about-info {
  // margin-top: auto;
  margin-left: 10px;
  margin-right: 10px;
  font-family: "Roboto", sans-serif;
}
::v-deep a {
  color: #f58849;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
  transition-duration: 3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
// .fade-enter-to,
// .fade-leave {
//   opacity: 0;
// }
</style>
