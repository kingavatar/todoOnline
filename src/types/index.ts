import { v4 as uuidv4 } from "uuid";
import store from "../store";
export class Note {
  _id: string;
  content: string;
  checked: boolean;
  ownerId: string;
  pageId?: string;
  priority: 0 | 1 | 2 | 3 | 4;
  imgList: Array<string | ArrayBuffer>;
  constructor(pageId: string) {
    this._id = uuidv4();
    this.content = "";
    this.checked = false;
    this.priority = 0;
    this.imgList = [];
    this.ownerId = store.state.auth.user._id;
    this.pageId = pageId;
  }
}

export type Notes = Note[];

export class Page {
  _id: string;
  title: string;
  notesIn: Notes;
  pageLink?: string;
  ownerId: string;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
  constructor() {
    this._id = uuidv4();
    this.title = "New Title";
    this.pageLink = "";
    this.ownerId = store.state.auth.user._id;
    this.notesIn = [];
  }
}
export type Pages = Page[];
export interface RootState {
  note: PageState;
  auth: AuthState;
}

export interface PageState {
  pages: Pages;
}

export interface AuthState {
  status: string;
  token: string;
  // isLoggedIn:boolean;
  user: Record<string, any>;
}
