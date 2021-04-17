import { v4 as uuidv4 } from "uuid";
export class Todo {
  id: string;
  text: string;
  checked: boolean;
  priority: 0 | 1 | 2 | 3 | 4;
  imgList: Array<string | ArrayBuffer>;
  constructor() {
    this.id = uuidv4();
    this.text = "";
    this.checked = false;
    this.priority = 0;
    this.imgList = [];
  }
}

export type Todos = Todo[];

export class TodoCard {
  id: string;
  title: string;
  todoList: Todos;
  constructor() {
    this.id = uuidv4();
    this.title = "New Title";
    this.todoList = [];
  }
}
export type TodoCards = TodoCard[];
export interface RootState {
  note: NoteState;
}

export interface NoteState {
  todos: TodoCards;
}

export interface AuthState {
  status: string;
  token: string;
  user: Record<string, any>;
}
