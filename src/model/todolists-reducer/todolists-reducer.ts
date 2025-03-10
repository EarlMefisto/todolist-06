import { v1 } from "uuid";
import { FilterValues, Todolist } from "../../App";

const initialState: Todolist[] = [];

type ActionType =
  | DeleteTodolistActionType
  | CreateTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType;

export const todolistsReducer = (
  todolists: Todolist[] = initialState,
  action: ActionType
): Todolist[] => {
  switch (action.type) {
    case "delete_todolist": {
      const { id } = action.payload;
      return todolists.filter((todolist) => todolist.id !== id);
    }
    case "create_todolist": {
      const { id, title } = action.payload;
      return [...todolists, { id, title, filter: "all" }];
    }
    case "change_todolist_title": {
      const { id, title } = action.payload;
      return todolists.map((todolist) =>
        todolist.id === id ? { ...todolist, title } : todolist
      );
    }
    case "change_todolist_filter": {
      const { id, filter } = action.payload;
      return todolists.map((todolist) =>
        todolist.id === id ? { ...todolist, filter } : todolist
      );
    }
    default:
      return todolists;
  }
};

export const DeleteTododlistAC = (id: string) =>
  ({ type: "delete_todolist", payload: { id: id } } as const);
export type DeleteTodolistActionType = ReturnType<typeof DeleteTododlistAC>;

export const CreateTodolistAC = (title: string) =>
  ({ type: "create_todolist", payload: { title, id: v1() } } as const);
export type CreateTodolistActionType = ReturnType<typeof CreateTodolistAC>;

export const ChangeTodolistTitleAC = (payload: { id: string; title: string }) =>
  ({ type: "change_todolist_title", payload } as const);
export type ChangeTodolistTitleActionType = ReturnType<
  typeof ChangeTodolistTitleAC
>;

export const ChangeTodolistFilterAC = (payload: {
  id: string;
  filter: FilterValues;
}) => ({ type: "change_todolist_filter", payload } as const);
export type ChangeTodolistFilterActionType = ReturnType<
  typeof ChangeTodolistFilterAC
>;
