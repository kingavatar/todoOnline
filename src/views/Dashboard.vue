<template>
  <div id="dashboard">
    <b-breadcrumb id="dashBreadCrumb" :items="items"></b-breadcrumb>
    <div class="dashboard">
      <b-row class="my-4">
        <div style="font-size:20px;">Notes</div>
      </b-row>
      <div>
        <b-card class="note-card" img-top @click="toDemoPage">
          <b-card-img src="../assets/file-earmark.svg" height="64" width="64" />
          <template #footer class="card-footer"
            ><b-icon icon="file-earmark" /> Getting Started</template
          >
        </b-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import router from "@/router";
import Vue from "vue";
export default Vue.extend({
  name: "Dashboard",
  data: function() {
    return {
      items: [
        {
          text: "Dashboard",
          // href: '/dashboard'
          active: true
        }
      ]
    };
  },
  methods: {
    toDemoPage() {
      router.push("getting-started");
    }
  },
  computed: {}
});
</script>

<style lang="scss" scoped>
@import "~bootstrap/scss/_functions.scss";
@import "~bootstrap/scss/_variables.scss";
@import "~bootstrap/scss/mixins/_breakpoints.scss";
@import "~@/scss/_fonts.scss";

#dashBreadCrumb {
  margin-top: 120px;
  width: 75%;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  right: 100px;
  // background-color: white;
}
.dashboard {
  margin-top: 10px;
  text-align: initial;
}

.note-card {
  max-width: 240px;
  max-height: 240px;
}

.card-footer {
  border: none;
}
</style>
