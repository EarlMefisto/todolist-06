import { type ChangeEvent } from "react";
import type { FilterValues, Task, Todolist } from "./App";
import { CreateItemForm } from "./CreateItemForm";
import { EditableSpan } from "./EditableSpan";
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  Typography,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { containerSx, getListItemSx } from "./TodolistItem.styles";

type Props = {
  todolist: Todolist;
  tasks: Task[];
  deleteTask: (todolistId: string, taskId: string) => void;
  changeFilter: (todolistId: string, filter: FilterValues) => void;
  createTask: (todolistId: string, title: string) => void;
  changeTaskStatus: (
    todolistId: string,
    taskId: string,
    isDone: boolean
  ) => void;
  deleteTodolist: (todolistId: string) => void;
  changeTaskTitle: (todolistId: string, taskId: string, title: string) => void;
  changeTodolistTitle: (todolistId: string, title: string) => void;
};

export const TodolistItem = (props: Props) => {
  const {
    todolist: { id, title, filter },
    tasks,
    deleteTask,
    changeFilter,
    createTask,
    changeTaskStatus,
    deleteTodolist,
    changeTaskTitle,
    changeTodolistTitle,
  } = props;

  const createTaskHandler = (title: string) => {
    createTask(id, title);
  };

  const changeFilterHandler = (filter: FilterValues) => {
    changeFilter(id, filter);
  };

  const deleteTodolistHandler = () => {
    deleteTodolist(id);
  };

  const changeTodolistTitleHandler = (newTitle: string) => {
    changeTodolistTitle(id, newTitle);
  };

  return (
    <div>
      <div className={"container"}>
        <Typography variant="h5" align={"center"} sx={{ fontWeight: 700 }}>
          <EditableSpan
            title={title}
            changeTitle={changeTodolistTitleHandler}
          />
        </Typography>
        <IconButton color="secondary" onClick={deleteTodolistHandler}>
          <DeleteForeverIcon />
        </IconButton>
      </div>
      <CreateItemForm createItem={createTaskHandler} />
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {tasks.map((task) => {
            const deleteTaskHandler = () => {
              deleteTask(id, task.id);
            };

            const changeTaskStatusHandler = (
              e: ChangeEvent<HTMLInputElement>
            ) => {
              const newStatusValue = e.currentTarget.checked;
              changeTaskStatus(id, task.id, newStatusValue);
            };
            const changeTaskTitleHandler = (newTitle: string) => {
              changeTaskTitle(id, task.id, newTitle);
            };

            return (
              <ListItem
                divider
                key={task.id}
                secondaryAction={
                  <IconButton color="secondary" onClick={deleteTaskHandler}>
                    <DeleteForeverIcon />
                  </IconButton>
                }
              >
                <ListItemIcon>
                  <Checkbox
                    size="small"
                    checked={task.isDone}
                    onChange={changeTaskStatusHandler}
                  />
                </ListItemIcon>

                <Box sx={getListItemSx(task.isDone)}>
                  <EditableSpan
                    title={task.title}
                    changeTitle={changeTaskTitleHandler}
                  />
                </Box>
              </ListItem>
            );
          })}
        </List>
      )}
      <Box sx={containerSx}>
        <Button
          variant="contained"
          color={filter === "all" ? "secondary" : "primary"}
          onClick={() => changeFilterHandler("all")}
        >
          All
        </Button>
        <Button
          variant="contained"
          color={filter === "active" ? "secondary" : "primary"}
          onClick={() => changeFilterHandler("active")}
        >
          Active
        </Button>
        <Button
          variant="contained"
          color={filter === "completed" ? "secondary" : "primary"}
          onClick={() => changeFilterHandler("completed")}
        >
          Completed
        </Button>
      </Box>
    </div>
  );
};
