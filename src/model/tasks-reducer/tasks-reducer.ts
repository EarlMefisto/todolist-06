import { v1 } from "uuid";
import { TasksState } from "../../App";
import {
  CreateTodolistActionType,
  DeleteTodolistActionType,
} from "../todolists-reducer/todolists-reducer";

const initialState: TasksState = {};

type Actions =
  | DeleteTodolistActionType
  | CreateTodolistActionType
  | DeleteTaskActionType
  | CreateTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType;

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
      const { [id]: _, ...rest } = tasks;
      return rest;
    }
    case "delete_task": {
      const { todolistId, taskId } = action.payload;
      return {
        ...tasks,
        [todolistId]: tasks[todolistId].filter((task) => task.id !== taskId),
      };
    }
    case "create_task": {
      const { todolistId, title } = action.payload;
      const newTask = { id: v1(), title, isDone: false };
      return { ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] };
    }
    case "change_task_status": {
      const { todolistId, taskId, isDone } = action.payload;
      return {
        ...tasks,
        [todolistId]: tasks[todolistId].map((task) =>
          task.id == taskId ? { ...task, isDone } : task
        ),
      };
    }
    case "change_task_title": {
      const { todolistId, taskId, title } = action.payload;
      return {
        ...tasks,
        [todolistId]: tasks[todolistId].map((task) =>
          task.id == taskId ? { ...task, title } : task
        ),
      };
    }
    default:
      return tasks;
  }
};

export const DeleteTaskAC = (payload: { todolistId: string; taskId: string }) =>
  ({ type: "delete_task", payload } as const);
export type DeleteTaskActionType = ReturnType<typeof DeleteTaskAC>;

export const CreateTaskAC = (payload: { title: string; todolistId: string }) =>
  ({
    type: "create_task",
    payload,
  } as const);
export type CreateTaskActionType = ReturnType<typeof CreateTaskAC>;

export const ChangeTaskStatusAC = (payload: {
  todolistId: string;
  taskId: string;
  isDone: boolean;
}) => ({ type: "change_task_status", payload } as const);
export type ChangeTaskStatusActionType = ReturnType<typeof ChangeTaskStatusAC>;

export const ChangeTaskTitleAC = (payload: {
  todolistId: string;
  taskId: string;
  title: string;
}) => ({ type: "change_task_title", payload } as const);
export type ChangeTaskTitleActionType = ReturnType<typeof ChangeTaskTitleAC>;
