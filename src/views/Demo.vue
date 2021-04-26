<template>
  <div id="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <b-breadcrumb id="demoBreadCrumb" :items="items"></b-breadcrumb>
    <b-card class="w-100 todo-card shadow" style="margin-top: 70px;">
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
          v-for="(note, index) in notesIn"
          :key="note._id"
          :todo="note"
          @removeCard="removeCard(index)"
          @copyCard="copyCard(index)"
          @addCard="addCardIndex(index)"
          @toggleEmojiPicker="toggleEmojiPicker(note._id)"
          @toggleFocus="toggleinputFocus"
          ref="cards"
        />
        <!-- <Card todoText="Something 2"/>
        <Card todoText="Something 3"/>
        <Card todoText=""/> -->
      </draggable>
    </b-card>
    <Popup ref="popup" />
    <EmojiPicker ref="emoji" />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import Card from "@/components/Card.vue";
import draggable from "vuedraggable";
import { mapGetters } from "vuex";
import Popup from "@/components/Popup.vue";
import EmojiPicker from "@/components/EmojiPicker.vue";

// import { v4 as uuidv4 } from "uuid";
import { Note } from "@/types";

export default {
  name: "Demo",
  components: {
    // HelloWorld
    Card,
    draggable,
    Popup,
    EmojiPicker
  },
  data: function() {
    return {
      title: "Hey there 👋",
      notesIn: [],
      istodoInputfocused: false,
      items: [
        {
          text: "Dashboard",
          href: "/dashboard"
        },
        {
          text: "Getting-Started",
          active: true
        }
      ]
    };
  },
  mounted() {
    this.title = (" " + this.getDemoPage.title).slice(1);
    this.notesIn = [...this.getDemoPage.notesIn];
  },
  methods: {
    addCard() {
      this.notesIn.push(new Note(this.$route.params.id));
      this.$nextTick(() => {
        this.$refs.cards[this.notesIn.length - 1].todoInput.focus();
      });
    },
    removeCard(index) {
      this.$delete(this.notesIn, index);
      if (index > 0) {
        this.$nextTick(() => {
          this.moveCursorToEnd(
            this.$refs.cards.find(
              i => i.$props.todo.id === this.notesIn[index - 1].id
            ).todoInput
          );
        });
      }
    },
    copyCard(index) {
      const newCard = new Note(this.$route.params.id);
      const copyCard = JSON.parse(JSON.stringify(this.notesIn[index]));
      newCard.text = copyCard.text;
      newCard.checked = copyCard.checked;
      newCard.priority = copyCard.priority;
      newCard.imgList = copyCard.imgList;
      this.notesIn.splice(index + 1, 0, newCard);
    },
    addCardIndex(index) {
      this.notesIn.splice(index + 1, 0, new Note(this.$route.params.id));
      this.$nextTick(() => {
        this.$refs.cards[this.notesIn.length - 1].todoInput.focus();
      });
    },
    checkAll() {
      this.notesIn.forEach(ele => {
        ele.checked = true;
      });
    },
    unCheckAll() {
      this.notesIn.forEach(ele => {
        ele.checked = false;
      });
      // console.log(
      //   this.$refs.cards.find(i => i.$props.todo.id === this.currentIdx)
      //     .todoInput.innerHTML
      // );
    },
    toggleinputFocus(value) {
      this.istodoInputfocused = value;
    },
    toggleEmojiPicker(id) {
      let sel, range;
      if (!this.$refs.emoji.showEmojiPicker) {
        if (!this.istodoInputfocused) {
          this.moveCursorToEnd(
            this.$refs.cards.find(i => i.$props.todo.id === id).todoInput
          );
        }
      }
      if (window.getSelection) {
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
          range = sel.getRangeAt(0);
          this.$refs.emoji.toggleEmojiPicker(
            range,
            this.$refs.cards.find(i => i.$props.todo.id === id)
          );
        } else {
          this.$refs.emoji.toggleEmojiPicker(
            undefined,
            this.$refs.cards.find(i => i.$props.todo.id === id)
          );
        }
      }
    },
    moveCursorToEnd(el) {
      // if (el.innerText.length > 0) {
      //   const setpos = document.createRange();
      //   // Creates object for selection
      //   const set = window.getSelection();
      //   // Set start position of range
      //   setpos.setStart(el.childNodes[0], el.innerText.length);
      //   // Collapse range within its boundary points
      //   // Returns boolean
      //   setpos.collapse(true);
      //   // Remove all ranges set
      //   set.removeAllRanges();
      //   // Add range with respect to range object.
      //   set.addRange(setpos);
      //   // Set cursor on focus
      //   el.focus();
      // } else {
      //   el.focus();
      // }
      let range, selection;
      if (document.createRange) {
        //Firefox, Chrome, Opera, Safari, IE 9+
        range = document.createRange(); //Create a range (a range is a like the selection but invisible)
        range.selectNodeContents(el); //Select the entire contents of the element with the range
        range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
        selection = window.getSelection(); //get the selection object (allows you to change selection)
        selection.removeAllRanges(); //remove any selections already made
        selection.addRange(range); //make the range you have just created the visible selection
        el.focus();
      } else if (document.selection) {
        //IE 8 and lower
        range = document.body.createTextRange(); //Create a range (a range is a like the selection but invisible)
        range.moveToElementText(el); //Select the entire contents of the element with the range
        range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
        range.select(); //Select the range (make it the visible selection
        el.focus();
      }
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
    ...mapGetters("note", ["getDemoPage"]),
    cardRefs() {
      return this.$refs.cards;
    }
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
#demoBreadCrumb {
  margin-top: 120px;
  margin-bottom: -30px;
  width: 75%;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  right: 100px;
}
@include media-breakpoint-down(xl) {
  .todo-card {
    margin-right: auto;
  }
}
</style>
