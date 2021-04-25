<template>
  <div id="dashboard">
    <b-breadcrumb id="dashBreadCrumb" :items="items"></b-breadcrumb>
    <div class="dashboard">
      <b-row class="my-4" align-h="between">
        <div style="font-size:20px;">Notes</div>
        <b-button
          id="addCard"
          pill
          variant="outline"
          class="shadow"
          style="padding-left:6px;"
          @click="addPage"
        >
          <b-row align-v="center">
            <b-icon icon="plus" variant="danger" font-scale="2" /> New
          </b-row>
        </b-button>
      </b-row>
      <div>
        <b-row>
          <!-- <b-card class="note-card" img-top @click="toDemoPage">
          <b-card-img src="../assets/file-earmark.svg" height="64" width="64" />
          <template #footer class="card-footer"
            ><b-icon icon="file-earmark" /> Getting Started</template
          >
        </b-card> -->
          <b-card
            v-for="card in cards"
            v-bind:key="card._id"
            class="note-card"
            img-top
          >
            <b-card-img
              src="../assets/file-earmark.svg"
              height="64"
              width="64"
              @click="toPage(card._id)"
            />
            <template #footer class="card-footer">
              <b-row align-h="between">
                <b-row align-h="start" align-v="center">
                  <b-icon icon="file-earmark" class="mr-2" />
                  {{ card._id==='fb658d57-4653-4876-89b3-80ff9f60e3d6'? 'Getting Started' :card.title }}
                </b-row>
                <b-col>
                  <b-dropdown
                    variant="link"
                    toggle-class="text-decoration-none"
                    no-caret
                    v-if="card._id!=='fb658d57-4653-4876-89b3-80ff9f60e3d6'"
                  >
                    <template #button-content>
                      <b-icon icon="three-dots-vertical" />
                    </template>
                    <b-dropdown-item-button @click="deletePage(card._id)">
                      <div>
                        Delete
                        <b-icon icon="trash-fill" class="float-right" />
                      </div>
                    </b-dropdown-item-button>
                    <b-dropdown-item-button @click="copyPage(card._id)">
                      <div>
                        Copy
                        <b-icon icon="clipboard" class="float-right" />
                      </div>
                    </b-dropdown-item-button>
                  </b-dropdown>
                </b-col>
              </b-row>
            </template>
          </b-card>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
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
      // cards: [{title:"Getting Started",id:"demo"}]
    };
  },
  methods: {
    toDemoPage() {
      router.push("getting-started");
    },
    toPage(id) {
      if (id === "fb658d57-4653-4876-89b3-80ff9f60e3d6") {
        router.push("getting-started");
      } else {
        router.push("page/" + id);
      }
    },
    ...mapActions({
      addPage: "note/addPage",
      getPagesSrv: "note/getPages",
      deletePage: "note/deletePage",
      copyPage: "note/copyPage"
    })
  },
  mounted() {
    this.getPagesSrv();
  },
  computed: {
    ...mapGetters({ cards: "note/getPages" })
  }
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
  max-width: 260px;
  max-height: 240px;
  margin: 7px;
}
#addCard:hover {
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
}
#addCard:active {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}
.card-footer {
  border: none;
}
::v-deep .btn-link {
  color: #212529;
}
::v-deep .btn.focus,
::v-deep .btn:focus {
  outline: 0;
  box-shadow: none;
}
::v-deep .dropdown-menu {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  border: 0;
  border-radius: 12px;
}

::v-deep .dropdown-item.active,
::v-deep .dropdown-item:active {
  color: #fff;
  text-decoration: none;
  background-color: #dee2e6;
}
</style>
