<template>
  <div>
    <!-- Embed iframe -->
    <embed
      :src="url"
      width="100%"
      height="600"
      frameborder="0"
      allowfullscreen
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: { url: String }
});
</script>
<style scoped></style>
