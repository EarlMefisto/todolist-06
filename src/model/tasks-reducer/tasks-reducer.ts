import { v1 } from "uuid";
import { TasksState } from "../../App";
import {
  CreateTodolistActionType,
  DeleteTododlistActionType,
} from "../todolists-reducer/todolists-reducer";

const initialState: TasksState = {};

type Actions =
  | DeleteTododlistActionType
  | CreateTodolistActionType
  | DeleteTaskActionType;

export const tasksReducer = (
  tasks: TasksState = initialState,
  action: Actions
): TasksState => {
  switch (action.type) {
    case "create_todolist": {
      const { id } = action.payload;
      return { ...tasks, [id]: [] };
    }
    case "delete_todolist": {
      const { id } = action.payload;
      delete tasks[id];
      return tasks;
    }
    case "delete_task": {
      const { id } = action.payload;
      delete tasks[id];
      return tasks;
    }
    case "create_task": {
      const { id } = action.payload;
      return [...tasks, {id,title,}];
    }
    default:
      return tasks;
  }
};

export const DeleteTaskAC = (payload: { id: string }) =>
  ({ type: "delete_task", payload } as const);
export type DeleteTaskActionType = ReturnType<typeof DeleteTaskAC>;

export const CreateTaskAC = (payload: { title: string; id: string }) =>
  ({
    type: "create_task",
    payload,
  } as const);
export type CreateTaskActionType = ReturnType<typeof CreateTaskAC>;
