<template>
  <div id="about" style="right: 0;">
    <div id="about-heading" class="text-center" @click="show = !show">
      about
    </div>
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

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "About",
  data: function() {
    return {
      show: false,
      screenWidth: window.innerWidth
    };
  },
  methods: {
    afterEnter() {
      setTimeout(() => (this.show = !this.show), 2000);
    },
    resize() {
      this.screenWidth = window.innerWidth;
    }
  },
  mounted() {
    window.addEventListener("resize", this.resize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resize);
  },
  computed: {
    mobileShow: function(): boolean {
      return this.screenWidth < 1400 || this.show;
    }
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
