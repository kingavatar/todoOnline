<template>
  <div id="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <b-card class="w-100 todo-card shadow" style="margin-top: 100px;">
      <b-card-title class="row">
        <div class="flex-fill todo-card-title" contenteditable="true">
          {{ title }}
        </div>
        <b-button
          variant="link"
          v-b-tooltip.hover.bottom="{ variant: 'light' }"
          title="uncheck All"
          style="margin-top: -2px;padding-top: 0px;"
          @click="unCheckAll"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-ui-checks-grid"
            viewBox="0 0 16 16"
          >
            <path
              d="M2 10h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1zm9-9h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm0 9a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-3zm0-10a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2h-3zM2 9a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H2zm7 2a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2v-3zM0 2a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm5.354.854a.5.5 0 1 0-.708-.708L3 3.793l-.646-.647a.5.5 0 1 0-.708.708l1 1a.5.5 0 0 0 .708 0l2-2z"
            />
          </svg>
        </b-button>
        <b-button
          variant="link"
          style="margin-top: -2px;padding-top: 0px;"
          v-b-tooltip.hover.bottom="{ variant: 'light', boundaryPadding: 20 }"
          title="check All"
          @click="checkAll"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            class="bi bi-check2-all"
            viewBox="0 0 16 16"
          >
            <path
              d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7l-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z"
            />
            <path
              d="M5.354 7.146l.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z"
            />
          </svg>
        </b-button>
        <b-button
          variant="link"
          style="margin-top: -2px;padding-top: 0px;"
          v-b-tooltip.hover.right="{ variant: 'light' }"
          title="Add new card"
          @click="addCard"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            class="bi bi-plus float-right"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
            />
          </svg>
        </b-button>
      </b-card-title>

      <draggable handle=".drag-handle" v-bind="dragOptions">
        <!-- <b-card-text>Header and footers using props.</b-card-text> -->
        <Card
          v-for="(todo, index) in todoList"
          :key="todo.id"
          :todo="todo"
          @removeCard="removeCard(index)"
          @copyCard="copyCard(index)"
          @addCard="addCardIndex(index)"
          ref="cards"
        />
        <!-- <Card todoText="Something 2"/>
        <Card todoText="Something 3"/>
        <Card todoText=""/> -->
      </draggable>
    </b-card>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import Card from "@/components/Card.vue";
import draggable from "vuedraggable";
import { mapGetters } from "vuex";
// import { v4 as uuidv4 } from "uuid";
import { Todo } from "@/types";

export default {
  name: "Home",
  components: {
    // HelloWorld
    Card,
    draggable
  },
  data: function() {
    return {
      title: "Hey there 👋",
      todoList: []
    };
  },
  mounted() {
    this.title = (" " + this.getDemoTodoCard.title).slice(1);
    this.todoList = [...this.getDemoTodoCard.todoList];
  },
  methods: {
    addCard() {
      this.todoList.push(new Todo());
      this.$nextTick(() => {
        this.$refs.cards[this.todoList.length - 1].todoInput.focus();
      });
    },
    removeCard(index) {
      this.$delete(this.todoList, index);
    },
    copyCard(index) {
      const newCard = new Todo();
      const copyCard = JSON.parse(JSON.stringify(this.todoList[index]));
      newCard.text = copyCard.text;
      newCard.checked = copyCard.checked;
      newCard.priority = copyCard.priority;
      newCard.imgList = copyCard.imgList;
      this.todoList.splice(index + 1, 0, newCard);
    },
    addCardIndex(index) {
      this.todoList.splice(index + 1, 0, new Todo());
      this.$nextTick(() => {
        this.$refs.cards[this.todoList.length - 1].todoInput.focus();
      });
    },
    checkAll() {
      this.todoList.forEach(ele => {
        ele.checked = true;
      });
    },
    unCheckAll() {
      this.todoList.forEach(ele => {
        ele.checked = false;
      });
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "blue-background-class"
      };
    },
    ...mapGetters(["getDemoTodoCard"])
  }
};
</script>

<style lang="scss">
@import "~bootstrap/scss/_functions.scss";
@import "~bootstrap/scss/_variables.scss";
@import "~bootstrap/scss/mixins/_breakpoints.scss";
.todo-card {
  margin-bottom: 20px;
  // margin-right: calc(10%);
  margin-right: auto;
  margin-left: auto;
  border: 0;
  max-width: 1100px;
  min-width: 404px;
  border-radius: 15px;
  text-align: start;
}
.todo-card-title {
  font-size: 150%;
  display: inline-block;
  vertical-align: middle;
}
.todo-card-title:focus {
  outline: 0px solid transparent;
}
.card-body {
  margin: 20px;
}

.todo-card .btn-link {
  color: initial;
  box-shadow: none;
}
.tooltip-inner {
  /* height: 50px !important; */
  /* width: 100px !important; */
  padding: 10px;
}
@include media-breakpoint-down(xl) {
  .todo-card {
    margin-right: auto;
  }
}
</style>
