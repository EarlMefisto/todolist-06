import "./App.css";
import { useState } from "react";
import { v1 } from "uuid";
import { TodolistItem } from "./TodolistItem";
import { CreateItemForm } from "./CreateItemForm";
import {
  AppBar,
  Container,
  Grid2,
  IconButton,
  Paper,
  Switch,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { containerSx } from "./TodolistItem.styles";
import { NavButton } from "./NavButton";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { teal, cyan } from "@mui/material/colors";

export type Todolist = {
  id: string;
  title: string;
  filter: FilterValues;
};

export type Task = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TasksStateType = {
  [todoListId: string]: Task[];
};

export type FilterValues = "all" | "active" | "completed";

export const App = () => {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const [todoLists, setTodoLists] = useState<Todolist[]>([
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to read", filter: "all" },
  ]);

  const [tasks, setTasks] = useState<TasksStateType>({
    [todolistId1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: "Mushishi", isDone: true },
      { id: v1(), title: "Hellsing", isDone: true },
      { id: v1(), title: "Jujutsu Kaisen 0", isDone: true },
      { id: v1(), title: "Spice and wolf", isDone: false },
      { id: v1(), title: "Tongari Boushi no Atelier", isDone: false },
      { id: v1(), title: "Vinland Saga", isDone: false },
      { id: v1(), title: "Mahoutsukai no Yome", isDone: false },
      { id: v1(), title: "Spy x Family", isDone: false },
    ],
  });

  //task
  const deleteTask = (taskId: string, todoListId: string) => {
    setTasks({
      ...tasks,
      [todoListId]: tasks[todoListId].filter((t) => t.id !== taskId),
    });
  };

  const createTask = (title: string, todoListId: string) => {
    const newTask = { id: v1(), title, isDone: false };
    setTasks({ ...tasks, [todoListId]: [newTask, ...tasks[todoListId]] });
  };

  const changeTaskStatus = (
    taskId: string,
    isDone: boolean,
    todoListId: string
  ) => {
    setTasks({
      ...tasks,
      [todoListId]: tasks[todoListId].map((t) =>
        t.id == taskId ? { ...t, isDone } : t
      ),
    });
  };

  const changeTaskTitle = (
    todolistId: string,
    taskId: string,
    title: string
  ) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map((task) =>
        task.id === taskId ? { ...task, title } : task
      ),
    });
  };

  //todoList
  const changeTodoListFilter = (filter: FilterValues, todoListId: string) => {
    setTodoLists(
      todoLists.map((tl) => (tl.id === todoListId ? { ...tl, filter } : tl))
    );
  };

  const deleteTodoList = (todoListId: string) => {
    setTodoLists(todoLists.filter((tl) => tl.id !== todoListId));
    delete tasks[todoListId];
  };

  const createTodolist = (title: string) => {
    const todolistId = v1();
    const newTodolist: Todolist = { id: todolistId, title, filter: "all" };
    setTodoLists([newTodolist, ...todoLists]);
    setTasks({ ...tasks, [todolistId]: [] });
  };

  const changeTodoListTitle = (todolistId: string, title: string) => {
    setTodoLists(
      todoLists.map((todolist) =>
        todolist.id === todolistId ? { ...todolist, title } : todolist
      )
    );
  };

  const todoListComponents = todoLists.map((tl) => {
    let filteredTasks = tasks[tl.id];
    if (tl.filter === "active") {
      filteredTasks = filteredTasks.filter((task) => !task.isDone);
    }
    if (tl.filter === "completed") {
      filteredTasks = filteredTasks.filter((task) => task.isDone);
    }

    return (
      <Paper elevation={3} sx={{ padding: "10px" }}>
        <TodolistItem
          key={tl.id}
          todoListId={tl.id}
          title={tl.title}
          filter={tl.filter}
          tasks={filteredTasks}
          createTask={createTask}
          deleteTask={deleteTask}
          deleteTodoList={deleteTodoList}
          changeTaskStatus={changeTaskStatus}
          changeTodoListFilter={changeTodoListFilter}
          changeTaskTitle={changeTaskTitle}
          changeTodoListTitle={changeTodoListTitle}
        />
      </Paper>
    );
  });

  const [isLightMode, setIsLightMode] = useState(true);
  const changeThemeHandler = () => setIsLightMode(!isLightMode);
  const theme = createTheme({
    palette: {
      primary: teal,
      secondary: cyan,
      mode: isLightMode ? "dark" : "light",
    },
  });

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <AppBar position="static">
          <Toolbar>
            <Container maxWidth={"lg"} sx={containerSx}>
              <IconButton color="inherit">
                <MenuIcon />
              </IconButton>
              <div>
                <Switch onChange={changeThemeHandler} />
                <NavButton>Sign In</NavButton>
                <NavButton>Sign up</NavButton>
                <NavButton background={theme.palette.secondary.main}>
                  Faq
                </NavButton>
              </div>
            </Container>
          </Toolbar>
        </AppBar>
        <Container maxWidth={"lg"}>
          <Grid2 container sx={{ padding: "20px" }}>
            <CreateItemForm createItem={createTodolist} />
          </Grid2>
          <Grid2 container spacing={4}>
            {todoListComponents}
          </Grid2>
        </Container>
      </ThemeProvider>
    </div>
  );
};
