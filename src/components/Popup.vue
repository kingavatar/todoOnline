<template>
  <div class="popup" :style="{ top: offsetTop, left: offsetLeft }" ref="popup">
    <span @click="BoldSelectedText"><strong>B</strong></span>
    <span @click="ItalicSelectedText"><i>I</i></span>
    <span @click="UnderlineSelectedText"><u>U</u></span>
    <span @click="strikeThroughSelectedText"><strike>S</strike></span>
    <!-- <span @click="AlertSelectedText">Alert</span> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      popupInitialTopOffset: 0,
      popupInitialLeftOffset: 0,
      offsetTop: 0,
      offsetLeft: "-999em",
      selectedText: undefined,
      range: undefined
    };
  },
  methods: {
    ListenToDocumentSelection() {
      const sel = window.getSelection();
      setTimeout(_ => {
        if (sel && !sel.isCollapsed) {
          this.selectedText = sel.toString();
          if (sel.rangeCount) {
            const range = sel.getRangeAt(0).cloneRange();
            if (range.getBoundingClientRect) {
              const rect = range.getBoundingClientRect();
              const left = rect.left + (rect.right - rect.left) / 2;
              const top = rect.top;

              this.offsetTop = top - this.popupInitialTopOffset - 30 + "px";

              this.offsetLeft = left - this.popupInitialLeftOffset / 2 + "px";
            }
            this.range = range;
          }
        } else {
          this.offsetLeft = "-999em";
        }
      }, 0);
    },
    // AlertSelectedText() {
    //   alert(`"${this.selectedText}" posted as comment`);
    // },
    BoldSelectedText() {
      if (window.getSelection) {
        const sel = window.getSelection();
        if (sel.rangeCount) {
          //   const newNode = document.createElement("span");
          //   newNode.className = "bold-text";
          //   newNode.append(this.range.extractContents());

          //   this.range.insertNode(newNode);
          sel.removeAllRanges();
          sel.addRange(this.range);
          document.execCommand("bold");
        }
      }
      //   }
    },
    ItalicSelectedText() {
      if (window.getSelection) {
        const sel = window.getSelection();
        if (sel.rangeCount) {
          //   const newNode = document.createElement("span");
          //   newNode.className = "italic-text";
          //   //   const docFragment = this.range.cloneContents();
          //   newNode.append(this.range.extractContents());

          //   //   if (docFragment.querySelector("span")) {
          //   //     console.log(docFragment);
          //   //   } else {
          //   //   this.range.surroundContents(newNode);
          //   this.range.insertNode(newNode);
          sel.removeAllRanges();
          sel.addRange(this.range);
          document.execCommand("italic");
        }
      }
    },
    UnderlineSelectedText() {
      if (window.getSelection) {
        const sel = window.getSelection();
        if (sel.rangeCount) {
          //   const newNode = document.createElement("span");
          //   //   const docFragment = this.range.cloneContents();
          //   const extract = this.range.extractContents();
          //   newNode.className = "underline-text";
          //   newNode.append(extract);
          //   this.range.insertNode(newNode);
          sel.removeAllRanges();
          sel.addRange(this.range);
          document.execCommand("underline");
        }
      }
    },
    strikeThroughSelectedText() {
      if (window.getSelection) {
        const sel = window.getSelection();
        if (sel.rangeCount) {
          sel.removeAllRanges();
          sel.addRange(this.range);
          document.execCommand("strikeThrough");
        }
      }
    }
  },
  mounted() {
    this.popupInitialTopOffset = this.$refs.popup.offsetHeight;
    this.popupInitialLeftOffset = this.$refs.popup.offsetWidth;
    window.addEventListener("mouseup", this.ListenToDocumentSelection);
  },
  destroyed() {
    window.removeEventListener("mouseup", this.ListenToDocumentSelection);
  }
};
</script>
<style>
.popup {
  position: absolute;
  color: #fff;
  background-color: #000;
  padding: 10px;
  border-radius: 5px;
  transform-origin: center, center;
  cursor: pointer;
}
.popup:after {
  content: "";
  border-bottom: 5px solid #000;
  border-right: 5px solid #000;
  border-top: 5px solid transparent;
  border-left: 5px solid transparent;
  position: absolute;
  top: calc(100% - 5px);
  transform: rotate(45deg);
  left: calc(50% - 3px);
}
.bold-text {
  font-weight: bold;
}
.italic-text {
  font-style: italic;
}
.underline-text {
  border-bottom: 0.05em solid;
}
.popup span {
  padding: 10px 10px;
  word-wrap: break-word;
}
</style>
