<template>
  <div class="todo-ele-container">
    <div class="row todo-ele">
      <div class="drag-handle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-grip-vertical"
          viewBox="0 0 16 16"
        >
          <path
            d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 
            1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 
            0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 
            0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 
            0 1 1 0 0 1 2 0z"
          />
        </svg>
      </div>
      <b-form-checkbox
        v-bind:class="classCheckboxPriority"
        class="box-fix"
        v-model="todo.checked"
        :disabled="todo.text == '' ? (todo.checked = false) || true : false"
      />
      <!-- value="1" -->
      <input
        hidden
        type="checkbox"
        class="box-fix"
        v-model="todo.checked"
        :disabled="todo.text == '' ? (todo.checked = false) || true : false"
      />
      <!-- <b-card-text
      contenteditable="true"
      class="strikethrough box-text flex-fill"
      placeholder="Enter todolist text"
    > {{todoText}}</b-card-text> -->
      <!-- v-model="todo.text" -->
      <div
        contenteditable="true"
        ref="todoInput"
        spellcheck="true"
        v-bind:class="classTextPriority"
        v-on:keydown.enter.prevent
        v-on:keyup.enter="$emit('addCard')"
        v-on:keyup.46="$emit('removeCard')"
        @paste="onPaste"
        class="strikethrough box-text flex-fill"
        placeholder="Enter todo list text"
        :data-value="linkifiedText"
        v-text="todo.text"
        @blur="updateTodoText"
      ></div>
      <!-- </b-form-input> -->
      <b-dropdown variant="link" toggle-class="text-decoration-none" no-caret>
        <template #button-content>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-three-dots"
            viewBox="0 0 16 16"
          >
            <path
              d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
            />
          </svg>
        </template>
        <b-dropdown-item-button @click="$emit('removeCard')">
          <div>
            Delete

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-trash-fill float-right"
              style="margin-top:2px;"
              viewBox="0 0 16 16"
            >
              <path
                d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"
              />
            </svg>
          </div>
        </b-dropdown-item-button>
        <b-dropdown-item-button @click="$emit('copyCard')">
          <div>
            Copy
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-clipboard float-right"
              style="margin-top:2px;"
              viewBox="0 0 16 16"
            >
              <path
                d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"
              />
              <path
                d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"
              />
            </svg>
          </div>
        </b-dropdown-item-button>
        <b-dropdown-divider></b-dropdown-divider>
        <div class="text-center">Priority</div>
        <b-dropdown-item-button @click="changeCardPriority(1)">
          <div class="row">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="24"
                fill="#e4606d"
                style="margin-right:-8px;"
                class="bi bi-exclamation"
                viewBox="0 0 16 16"
                preserveAspectRatio="none"
              >
                <path
                  d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0L7.1 4.995z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="24"
                fill="#e4606d"
                style="margin-right:-8px;"
                class="bi bi-exclamation"
                viewBox="0 0 16 16"
                preserveAspectRatio="none"
              >
                <path
                  d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0L7.1 4.995z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="24"
                fill="#e4606d"
                style="margin-right:-8px;"
                class="bi bi-exclamation"
                viewBox="0 0 16 16"
                preserveAspectRatio="none"
              >
                <path
                  d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0L7.1 4.995z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="24"
                fill="#e4606d"
                class="bi bi-exclamation"
                viewBox="0 0 16 16"
                preserveAspectRatio="none"
              >
                <path
                  d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0L7.1 4.995z"
                />
              </svg>
            </div>
            <div class="todo-checkbox-error" style="padding-top:2px;">High</div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#e4606d"
              class="bi bi-exclamation-octagon ml-auto"
              style="margin-top:2px;"
              viewBox="0 0 16 16"
            >
              <path
                d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353L4.54.146zM5.1 1L1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1H5.1z"
              />
              <path
                d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"
              />
            </svg>
          </div>
        </b-dropdown-item-button>
        <b-dropdown-item-button @click="changeCardPriority(2)">
          <div class="row">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="24"
                fill="#faad14"
                style="margin-right:-8px;"
                class="bi bi-exclamation"
                viewBox="0 0 16 16"
                preserveAspectRatio="none"
              >
                <path
                  d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0L7.1 4.995z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="24"
                fill="#faad14"
                style="margin-right:-8px;"
                class="bi bi-exclamation"
                viewBox="0 0 16 16"
                preserveAspectRatio="none"
              >
                <path
                  d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0L7.1 4.995z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="24"
                fill="#faad14"
                class="bi bi-exclamation"
                viewBox="0 0 16 16"
                preserveAspectRatio="none"
              >
                <path
                  d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0L7.1 4.995z"
                />
              </svg>
            </div>
            <div class="todo-checkbox-warning" style="padding-top:2px;">
              Medium
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#faad14"
              class="bi bi-exclamation-diamond ml-auto"
              viewBox="0 0 16 16"
            >
              <path
                d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 0 1 0-2.098L6.95.435zm1.4.7a.495.495 0 0 0-.7 0L1.134 7.65a.495.495 0 0 0 0 .7l6.516 6.516a.495.495 0 0 0 .7 0l6.516-6.516a.495.495 0 0 0 0-.7L8.35 1.134z"
              />
              <path
                d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"
              />
            </svg>
          </div>
        </b-dropdown-item-button>
        <b-dropdown-item-button @click="changeCardPriority(3)">
          <div class="row">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="24"
                fill="#34ce57"
                style="margin-right:-8px;"
                class="bi bi-exclamation"
                viewBox="0 0 16 16"
                preserveAspectRatio="none"
              >
                <path
                  d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0L7.1 4.995z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="24"
                fill="#34ce57"
                class="bi bi-exclamation"
                viewBox="0 0 16 16"
                preserveAspectRatio="none"
              >
                <path
                  d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0L7.1 4.995z"
                />
              </svg>
            </div>
            <div class="todo-checkbox-success" style="padding-top:2px;">
              Normal
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#34ce57"
              class="bi bi-exclamation-triangle ml-auto"
              viewBox="0 0 16 16"
            >
              <path
                d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"
              />
              <path
                d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z"
              />
            </svg>
          </div>
        </b-dropdown-item-button>
        <b-dropdown-item-button @click="changeCardPriority(4)">
          <div class="row">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="24"
                fill="#1890ff"
                class="bi bi-exclamation"
                viewBox="0 0 16 16"
                preserveAspectRatio="none"
              >
                <path
                  d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0L7.1 4.995z"
                />
              </svg>
            </div>
            <div class="todo-checkbox-info" style="padding-top:2px;">
              Low
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#1890ff"
              class="bi bi-exclamation-circle ml-auto"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
              />
              <path
                d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"
              />
            </svg>
          </div>
        </b-dropdown-item-button>
        <b-dropdown-item-button @click="changeCardPriority(0)">
          <div>
            None
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-slash-circle float-right"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
              />
              <path
                d="M11.354 4.646a.5.5 0 0 0-.708 0l-6 6a.5.5 0 0 0 .708.708l6-6a.5.5 0 0 0 0-.708z"
              />
            </svg>
          </div>
        </b-dropdown-item-button>
      </b-dropdown>
    </div>
    <div class="card-embeds">
      <embed
        v-for="(embed, index) in embedList"
        :key="index"
        :src="embed.url"
        width="100%"
        height="600"
        frameborder="0"
        allowfullscreen
      />
    </div>
    <div class="card-images">
      <img v-for="(image, index) in imgList" :key="index" :src="image.url" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref } from "vue-property-decorator";
import * as linkify from "linkifyjs";
// import linkifyElement from "linkifyjs/element";

@Component({
  components: {}
})
export default class Card extends Vue {
  @Prop() private todo!: {
    id: string;
    text: string;
    checked: boolean;
    priority: number;
    imgList: Array<string | ArrayBuffer>;
  };
  @Ref() todoInput!: HTMLInputElement;
  private embedList: Array<{ url: string }> = [];
  private imgList: Array<{ url: string | ArrayBuffer }> = [];
  data() {
    return {};
  }
  changeCardPriority(priority: number) {
    this.todo.priority = priority;
    switch (priority) {
      case 1: {
        break;
      }
      default:
        break;
    }
  }
  updateTodoText(event: Event) {
    this.todo.text = (event.target as HTMLDivElement).innerText.replace(
      /\n/g,
      ""
    );
    (event.target as HTMLDivElement).innerText = this.todo.text;
  }
  mounted() {
    this.todo.imgList.forEach(ele => {
      const urlCreator = window.URL || window.webkitURL;
      // console.log(ele);
      const eleBlob: Blob = this.dataURItoBlob(ele);
      const imageUrl = urlCreator.createObjectURL(eleBlob);
      this.imgList.push({ url: imageUrl });
    });
  }
  onPaste(event: { clipboardData: DataTransfer }) {
    const items = event.clipboardData.items;
    if (items == undefined) {
      return;
    }
    for (let i = 0; i < items.length; i++) {
      // Skip content if not image
      if (items[i].type.indexOf("image") == -1) continue;
      // Retrieve image on clipboard as blob
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const blob: any = items[i].getAsFile();
      const urlCreator = window.URL || window.webkitURL;
      const imageUrl = urlCreator.createObjectURL(blob);
      // console.log(imageUrl);
      const reader = new FileReader();
      let imgBase64: string | ArrayBuffer = "";
      const base64ImageLoad = () => {
        if (reader.result != null) {
          imgBase64 = reader.result;
          // console.log(imgBase64);
          // this.imgList.push({ url: imgBase64 });
          this.todo.imgList.push(imgBase64);
        }
      };
      reader.onloadend = base64ImageLoad;
      // function() {
      //   imgBase64 = reader.result;
      //   console.log(imgBase64);
      // };
      reader.readAsDataURL(blob);

      this.imgList.push({ url: imageUrl });
      // (this.$refs.myimg as HTMLImageElement).src = imageUrl;
      // this.embedList.push({ url: imageUrl });
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataURItoBlob(dataURI: any) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    const byteString = atob(dataURI.split(",")[1]);

    // separate out the mime component
    const mimeString = dataURI
      .split(",")[0]
      .split(":")[1]
      .split(";")[0];

    // write the bytes of the string to an ArrayBuffer
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    const bb = new Blob([ab], { type: mimeString });
    return bb;
  }
  get linkifiedText() {
    this.embedList.splice(0);
    linkify.find(this.todo.text).forEach(ele => {
      if (this.youtubeRegex().test(ele.value)) {
        this.embedList.push({
          url: ele.value.replace(/watch\?v=/gi, "embed/")
        });
      }
    });
    // const options = {
    //   /* … */
    // };
    // linkifyElement(document.getElementById("id"), options, document);
    return this.todo.text;
  }

  youtubeRegex() {
    const regex = /(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\/?\?(?:\S*?&?v=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/g;

    return regex;
  }

  get classTextPriority() {
    return {
      "todo-success": this.todo.priority == 3,
      "todo-warning": this.todo.priority == 2,
      "todo-error": this.todo.priority == 1,
      "todo-info": this.todo.priority == 4
    };
  }

  get classCheckboxPriority() {
    return {
      "todo-checkbox-success": this.todo.priority == 3,
      "todo-checkbox-warning": this.todo.priority == 2,
      "todo-checkbox-error": this.todo.priority == 1,
      "todo-checkbox-info": this.todo.priority == 4
    };
  }
}
</script>
<style lang="scss" scoped>
@import "~bootstrap/scss/_functions.scss";
@import "~bootstrap/scss/_variables.scss";
.todo-ele {
  padding: 10px;
}
.drag-handle {
  /* line-height: 20px; */
  cursor: grab;
  margin-top: 2.7px;
}
.box-fix {
  margin-bottom: 4px;
  margin-left: 6px;
  margin-top: 2.5px;
}

::v-deep .dropdown-toggle {
  padding-top: 3px;
  max-height: 24px;
}

.box-text {
  margin-left: 6px;
  width: 80%;
  vertical-align: middle;
  border: 0;
  border-radius: 2.5px;
  white-space: pre-wrap;
  word-break: break-word;
  padding: 3px 2px;
  text-align: left;
  -webkit-user-modify: read-write;
  overflow-wrap: break-word;
  -webkit-line-break: after-white-space;
}
.box-text[contenteditable]:focus {
  outline: 0px solid transparent;
}
.box-text[contenteditable]:empty:before {
  content: attr(placeholder);
  // pointer-events: none;
  display: block;
  color: grey;
  // color: rgba(255, 255, 255, 0.9);
  // -webkit-text-fill-color: rgba(255, 255, 255, 0.4);
}
::v-deep .box-text:focus {
  border: 0;
  transition: none;
  border-color: #cccccc;
  -webkit-box-shadow: none;
  box-shadow: none;
}

input[type="checkbox"]:checked + .strikethrough:not([data-value=""]) {
  text-decoration: line-through;
  opacity: 0.375;
}
.card-embeds,
.card-images {
  text-align: center;
}
img {
  max-width: 100%;
  max-height: 100%;
}
.todo-success {
  // border: 1px solid #eef8e6;
  // background-color: #f6ffed;
  background-color: #94e794;
}

.todo-checkbox-success {
  color: #34ce57;
}

::v-deep
  .todo-checkbox-success
  .custom-control-input:checked
  ~ .custom-control-label::before,
.custom-control-input:checked ~ .custom-control-label::before {
  border-color: #34ce57 !important;
  background-color: #34ce57 !important;
}
// ::v-deep
//   .todo-checkbox-success
//   .custom-control-input.is-valid
//   ~ .custom-control-label,
// .was-validated .custom-control-input:valid ~ .custom-control-label {
//   color: #28a745;
// }
// ::v-deep .custom-control-input:focus ~ .custom-control-indicator {
//   -webkit-box-shadow: 0 0 0 1px #fff, 0 0 0 3px #34ce57;
//   box-shadow: 0 0 0 1px #fff, 0 0 0 3px #34ce57;
// }
// ::v-deep .custom-control-input.is-valid:focus ~ .custom-control-label::before,
// .was-validated
//   .custom-control-input:valid:focus
//   ~ .custom-control-label::before {
//   box-shadow: 0 0 0 0.2rem rgb(40 167 69 / 25%);
// }
::v-deep
  .todo-checkbox-success
  .custom-control-input:focus
  ~ .custom-control-label::before {
  border-color: #34ce57 !important;
  box-shadow: 0 0 0 0.2rem rgb(40 167 69 / 25%);
}

.todo-error {
  // border: 1px solid #f5222d;
  // background-color: #fff1f0;
  background-color: #f78080;
}
.todo-checkbox-error {
  color: #f5222d;
}

::v-deep
  .todo-checkbox-error
  .custom-control-input:checked
  ~ .custom-control-label::before,
.custom-control-input:checked ~ .custom-control-label::before {
  border-color: #e4606d !important;
  background-color: #e4606d !important;
}

::v-deep
  .todo-checkbox-error
  .custom-control-input:focus
  ~ .custom-control-label::before {
  border-color: #e4606d !important;
  box-shadow: 0 0 0 0.2rem rgb(220 53 69 / 25%);
}

::v-deep .todo-ele .btn-link {
  color: #212529;
}
::v-deep .todo-ele .btn.focus,
::v-deep .btn:focus {
  outline: 0;
  box-shadow: none;
}
::v-deep .todo-ele .dropdown-menu {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  border: 0;
  border-radius: 12px;
}

::v-deep .todo-ele .dropdown-item.active,
::v-deep .todo-ele .dropdown-item:active {
  color: #fff;
  text-decoration: none;
  background-color: #dee2e6;
}
.todo-info {
  // border: 1px solid #91d5ff;
  // background-color: #e6f7ff;
  background-color: #96c7f7;
}
.todo-checkbox-info {
  color: #1890ff;
}

::v-deep
  .todo-checkbox-info
  .custom-control-input:checked
  ~ .custom-control-label::before,
.custom-control-input:checked ~ .custom-control-label::before {
  border-color: #1890ff !important;
  background-color: #1890ff !important;
}

::v-deep
  .todo-checkbox-info
  .custom-control-input:focus
  ~ .custom-control-label::before {
  border-color: #1890ff !important;
  box-shadow: 0 0 0 0.2rem rgb(24 144 255 / 25%);
}

.todo-warning {
  // border: 1px solid #ffe58f;
  // background-color: #fffbe6;
  background-color: #f6ec89;
  // background-color: #faad14;
}
.todo-checkbox-warning {
  color: #faad14;
}

::v-deep
  .todo-checkbox-warning
  .custom-control-input:checked
  ~ .custom-control-label::before,
.custom-control-input:checked ~ .custom-control-label::before {
  border-color: #faad14 !important;
  background-color: #faad14 !important;
}

::v-deep
  .todo-checkbox-warning
  .custom-control-input:focus
  ~ .custom-control-label::before {
  border-color: #faad14 !important;
  box-shadow: 0 0 0 0.2rem rgb(250 173 20 / 25%);
}
</style>
