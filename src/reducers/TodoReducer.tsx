import { Todo } from "../models/Todo";

export type TodoActions =
  | { type: "set", payload: Todo[] }
  | { type: "add", payload: string }
  | { type: "remove", payload: number }
  | { type: "done", payload: number }
  | { type: "edit", payload: { id: number, editNote: string } }

export const TodoReducer = (state: Todo[], action: TodoActions) => {
  switch (action.type) {
    case "set":
      return [...action.payload];
    case "add":
      return [...state, { id: Date.now(), note: action.payload, isDone: false }]
    case "remove":
      return state.filter((todo) => todo.id !== action.payload)
    case "done":
      return state.map((todo) => todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo)
    case "edit":
      return state.map((todo) => todo.id === action.payload.id ? { ...todo, note: action.payload.editNote } : todo)
    default:
      return state;
  }
}