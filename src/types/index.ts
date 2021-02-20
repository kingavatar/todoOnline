export class Todo {
  text: string;
  checked: boolean;
  priority: 0 | 1 | 2 | 3 | 4;
  imgList: Array<string | ArrayBuffer>;
  constructor() {
    this.text = "";
    this.checked = false;
    this.priority = 0;
    this.imgList = [];
  }
}

export type Todos = Todo[];

export class TodoCard {
  id: number;
  title: string;
  todoList: Todos;
  constructor() {
    this.id = 0;
    this.title = "New Title";
    this.todoList = [];
  }
}
export type TodoCards = TodoCard[];
export interface RootState {
  todos: TodoCards;
}
