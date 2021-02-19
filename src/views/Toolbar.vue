<template>
  <div id="toolbar">
    <div id="logo-heading" class="text-center">Todo Online</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Toolbar"
});
</script>

<style lang="scss" scoped>
@import "~bootstrap/scss/_functions.scss";
@import "~bootstrap/scss/_variables.scss";
@import "~bootstrap/scss/mixins/_breakpoints.scss";
@import "~@/scss/_fonts.scss";
#toolbar {
  left: 0;
}
@include media-breakpoint-down(xl) {
  #toolbar {
    width: 100%;
  }
}
@media (min-width: 1400px) {
  #toolbar {
    max-width: 25%;
    width: 15%;
    position: fixed;
  }
}
#logo-heading {
  font-family: Pacifico;
  // font-family: FredokaOne;
  font-size: 30px;
  color: #798794;
  margin-top: 50px;
  cursor: pointer;
}
</style>
