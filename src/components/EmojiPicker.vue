<template>
  <div
    class="emoji-picker shadow"
    :style="{ top: offsetTop, left: offsetLeft }"
    ref="emojiPicker"
  >
    <picker
      v-show="showEmojiPicker"
      :data="emojiIndex"
      title="Pick your emoji..."
      emoji="point_up"
      @select="addEmoji"
      v-on-clickaway="hide"
    />
  </div>
</template>

<script>
import Vue from "vue";

import data from "emoji-mart-vue-fast/data/all.json";

import "emoji-mart-vue-fast/css/emoji-mart.css";

import { Picker, EmojiIndex } from "emoji-mart-vue-fast";

import { directive as onClickaway } from "vue-clickaway";

const emojiIndex = new EmojiIndex(data);

export default Vue.extend({
  name: "EmojiPicker",
  components: {
    Picker
  },
  directives: {
    onClickaway: onClickaway
  },
  data: function() {
    return {
      showEmojiPicker: false,
      currentIdx: 0,
      emojiIndex: emojiIndex,
      popupInitialTopOffset: 0,
      popupInitialLeftOffset: 0,
      offsetTop: 0,
      offsetLeft: "-999em",
      range: undefined,
      cardRef: undefined,
      absolute: "absolute"
    };
  },
  mounted() {
    this.popupInitialTopOffset = this.$refs.emojiPicker.offsetHeight;
    this.popupInitialLeftOffset = this.$refs.emojiPicker.offsetWidth;
  },

  methods: {
    toggleEmojiPicker(range, index) {
      if (index.$props.todo.id !== this.currentIdx) {
        this.showEmojiPicker = true;
      } else {
        this.showEmojiPicker = !this.showEmojiPicker;
      }
      this.range = range;
      this.cardRef = index;
      this.currentIdx = this.cardRef.$props.todo.id;
      this.offsetTop =
        window.pageYOffset +
        this.cardRef.$refs.emojiTrigger.getBoundingClientRect().top -
        this.popupInitialTopOffset +
        +30 +
        "px";
      this.offsetLeft =
        this.cardRef.$refs.emojiTrigger.getBoundingClientRect().left -
        this.popupInitialLeftOffset / 2 +
        "px";
    },
    hide(e) {
      if (
        e.target.parentNode.classList.value !== "emoji-trigger" &&
        e.target.classList.value !== "emoji-trigger"
      )
        this.showEmojiPicker = false;
    },
    addEmoji(emoji) {
      if (this.range) {
        const emojinode = document.createTextNode(emoji.native);
        // console.log(
        //   this.$parent.$refs.popup.originalRange.commonAncestorContainer
        //     .innerHTML,
        //   "  --  ",
        //   this.$parent.$refs.popup.originalRange.startContainer.innerHTML,
        //   "  --  ",
        //   this.$parent.$refs.popup.originalRange.endContainer.innerHTML
        // );
        if (this.$parent.$refs.popup.originalRange === undefined) {
          this.range.deleteContents();
          this.range.insertNode(emojinode);
          this.range.setStartAfter(emojinode);
          this.range.setEndAfter(emojinode);
          const selection = window.getSelection();
          selection.removeAllRanges();
          selection.addRange(this.range);
        } else {
          console.log("haha");
          this.$parent.$refs.popup.originalRange.deleteContents();
          this.$parent.$refs.popup.originalRange.insertNode(emojinode);
          this.$parent.$refs.popup.originalRange.setStartAfter(emojinode);
          this.$parent.$refs.popup.originalRange.setEndAfter(emojinode);
          const selection = window.getSelection();
          selection.removeAllRanges();
          selection.addRange(this.$parent.$refs.popup.originalRange);
          // this.cardRef.todoInput.focus();
        }
      } else {
        this.cardRef.todoInput.innerHTML += emoji.native;
        this.$parent.moveCursorToEnd(this.cardRef.todoInput);
      }
    }
  },
  computed: {
    top() {
      return this.offsetTop;
    },
    left() {
      return this.offsetLeft;
    }
  }
});
</script>

<style lang="scss">
.emoji-picker {
  position: absolute;
  z-index: 100;
  transform-origin: center, center;
  -webkit-user-select: none;
  -moz-user-select: -moz-none;
  -ms-user-select: none;
  user-select: none;
}
</style>
