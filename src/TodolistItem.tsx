import { type ChangeEvent } from "react";
import type { FilterValues, Task } from "./App";
import { EditableSpan } from "./EditableSpan";
import { CreateItemForm } from "./CreateItemForm";
import Button from "@mui/material/Button";
import {
  Box,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import { containerSx, getListItemSx } from "./TodolistItem.styles";

type Props = {
  todoListId: string;
  title: string;
  tasks: Task[];
  filter: FilterValues;
  deleteTask: (taskId: string, todoListId: string) => void;
  deleteTodoList: (todoListId: string) => void;
  changeTodoListFilter: (filter: FilterValues, todoListId: string) => void;
  createTask: (title: string, todoListId: string) => void;
  changeTaskStatus: (
    taskId: string,
    isDone: boolean,
    todoListId: string
  ) => void;
  changeTaskTitle: (todolistId: string, taskId: string, title: string) => void;
  changeTodoListTitle: (todolistId: string, title: string) => void;
};

export const TodolistItem = (props: Props) => {
  const {
    todoListId,
    title,
    tasks,
    filter,
    deleteTask,
    deleteTodoList,
    changeTodoListFilter,
    createTask,
    changeTaskStatus,
    changeTaskTitle,
    changeTodoListTitle,
  } = props;

  const createTaskHandler = (title: string) => {
    createTask(title, todoListId);
  };

  const deleteTodoListHandler = () => deleteTodoList(todoListId);

  const changeTodoListTitleHandler = (title: string) => {
    changeTodoListTitle(todoListId, title);
  };

  return (
    <div>
      <Typography variant="h5" align="center" sx={{ fontWeight: 700 }}>
        <EditableSpan title={title} changeTitle={changeTodoListTitleHandler} />
        <IconButton onClick={deleteTodoListHandler}>
          <DeleteOutline />
        </IconButton>
      </Typography>
      <div>
        <CreateItemForm createItem={createTaskHandler} />
      </div>
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {tasks.map((task) => {
            const deleteTaskHandler = () => {
              deleteTask(task.id, todoListId);
            };

            const changeTaskStatusHandler = (
              e: ChangeEvent<HTMLInputElement>
            ) => {
              const newStatusValue = e.currentTarget.checked;
              changeTaskStatus(task.id, newStatusValue, todoListId);
            };

            const changeTaskTitleHandler = (title: string) => {
              changeTaskTitle(todoListId, task.id, title);
            };

            return (
              <ListItem divider key={task.id} sx={getListItemSx(task.isDone)}>
                <ListItemText>
                  <div>
                    <Checkbox
                      size="medium"
                      checked={task.isDone}
                      onChange={changeTaskStatusHandler}
                    />
                    <EditableSpan
                      title={task.title}
                      changeTitle={changeTaskTitleHandler}
                    />
                  </div>
                  <IconButton onClick={deleteTaskHandler}>
                    <DeleteOutline />
                  </IconButton>
                </ListItemText>
              </ListItem>
            );
          })}
        </List>
      )}
      <Box sx={containerSx}>
        <Button
          variant="contained"
          color={filter === "all" ? "secondary" : "primary"}
          onClick={() => changeTodoListFilter("all", todoListId)}
        >
          All
        </Button>
        <Button
          variant="contained"
          color={filter === "active" ? "secondary" : "primary"}
          onClick={() => changeTodoListFilter("active", todoListId)}
        >
          Active
        </Button>
        <Button
          variant="contained"
          color={filter === "completed" ? "secondary" : "primary"}
          onClick={() => changeTodoListFilter("completed", todoListId)}
        >
          Completed
        </Button>
      </Box>
    </div>
  );
};
