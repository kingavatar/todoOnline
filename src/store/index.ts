import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { RootState, Todo, Todos, TodoCard, TodoCards } from "@/types";

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    todos: [
      {
        id: "fb658d57-4653-4876-89b3-80ff9f60e3d6",
        title: "Hey there 👋",
        todoList: [
          {
            id: "76805351-0a16-48db-b2fb-cfd93aafb6f9",
            text:
              "Todo Online is an awesome free online to-do list app that helps you to create a to-do list with some extra features.",
            checked: false,
            priority: 0,
            imgList: []
          },
          {
            id: "0cc0bc65-7bf1-43ef-a374-8fb59f5ad70a",
            text: "Some Cool Features 💫 listed below",
            checked: false,
            priority: 0,
            imgList: []
          },
          {
            id: "93be6ff8-516e-48f6-a37e-e1dfece3ebf9",
            text:
              "<b>Text</b> can be <i> Styled </i> using <u>inline</u> Toolbar <strike> which </strike> pops <b><i><u><strike>up when text </strike> </u></i></b> is highlighted.",
            checked: false,
            priority: 0,
            imgList: [
              "data:image/png;base64,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"
            ]
          },
          {
            id: "a76a6bed-e1f3-400c-85c1-0483d37c7b18",
            text:
              "You can sort the todo list by dragging the Card using the handle at left of card.",
            checked: false,
            priority: 0,
            imgList: [
              "data:image/png;base64,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"
            ]
          },

          {
            id: "927796a1-6f41-41e1-8902-9a4baaaac24c",
            text:
              "You can set card Priorities by selecting it from the menu on the right side of the card",
            checked: true,
            priority: 0,
            imgList: []
          },
          {
            id: "2e11b173-f1ed-4c46-a1ec-f9d7dba713e5",
            text: "High Priority Card",
            checked: true,
            priority: 1,
            imgList: []
          },
          {
            id: "4f187b22-3dce-4500-ae16-b187e5749003",
            text: "Medium Priority Card",
            checked: false,
            priority: 2,
            imgList: []
          },
          {
            id: "9edea000-57a7-42f0-a4e7-812223ff28f1",
            text: "Normal Priority Card",
            checked: true,
            priority: 3,
            imgList: []
          },
          {
            id: "c3da25f1-0985-4bd3-9744-83124f4eb2eb",
            text: "Low Priority Card",
            checked: false,
            priority: 4,
            imgList: []
          },
          {
            id: "14d91ce4-afa1-4a24-ae91-55f9f8ffbdd9",
            text:
              "You can embed images by simply pasting the image using Ctrl+v or Cmd+v",
            checked: false,
            priority: 0,
            imgList: []
          },
          {
            id: "81d016a2-be01-457a-bed5-54959bec8fd9",
            text:
              "Can embed youtube videos in text https://www.youtube.com/watch?v=ScMzIvxBSi4 Place a video link in text with spaces",
            checked: true,
            priority: 0,
            imgList: []
          },
          {
            id: "08b6c69e-ed4d-41a5-979b-903d6723d3b9",
            text:
              'You can add a new card by using ➕ button or Pressing "Enter" Key',
            checked: true,
            priority: 0,
            imgList: []
          },
          {
            id: "e4edca36-9814-49dc-a791-f772aa1dda58",
            text:
              'You can delete a card by using delete option in menu or Pressing "Delete" Key',
            checked: false,
            priority: 0,
            imgList: [
              "data:image/png;base64,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"
            ]
          },
          {
            id: "fe298e13-8cae-4290-b639-2dac9dbd389f",
            text: "You can copy a card by using Copy option in menu",
            checked: true,
            priority: 0,
            imgList: [
              "data:image/png;base64,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"
            ]
          }
        ]
      }
    ]
  },
  mutations: {
    addTodoCard(state, todoCard: TodoCard) {
      state.todos.push(todoCard);
    },
    deleteTodoCard(state, id: string) {
      const search = state.todos.filter(i => i.id !== id);
      state.todos = search;
    }
  },
  actions: {
    updateTodos(contex, todoCard: TodoCard) {
      contex.commit("addTodoCard", todoCard);
    },
    deleteTodos(contex, id: string) {
      contex.commit("deleteTodoCard", id);
    }
  },
  getters: {
    getTodoCards(state): TodoCards {
      return state.todos;
    },
    getDemoTodoCard(state): TodoCard | undefined {
      return state.todos.find(
        i => i.id === "fb658d57-4653-4876-89b3-80ff9f60e3d6"
      );
    },
    totalTasks(state, id: string): number {
      const todoCard = state.todos.find(i => i.id === id);
      if (todoCard !== undefined) {
        return todoCard.todoList.length;
      }
      return -1;
    },
    getTodos(state, id): Todos | undefined {
      const todoCard = state.todos.find(i => i.id === id);
      if (todoCard !== undefined) {
        return todoCard.todoList;
      }
      return undefined;
    },
    totalDoneTasks: (state, getters) => {
      return getters.getTodos.filter((i: Todo) => i.checked === true).length;
    },
    latestTodoCard(state): TodoCard {
      return state.todos.slice(-1)[0];
    }
  }
};

export default new Vuex.Store<RootState>(store);
