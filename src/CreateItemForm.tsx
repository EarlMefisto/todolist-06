import { useState, KeyboardEvent, ChangeEvent } from "react";
import { Button, TextField, Tooltip } from "@mui/material";
import { Add } from "@mui/icons-material";

export type Props = {
  createItem: (itemTitle: string) => void;
};

export const CreateItemForm = ({ createItem }: Props) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.currentTarget.value);
    setError(null);
  };

  const createItemOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      createItemHandler();
    }
  };

  const createItemHandler = () => {
    const trimmedTitle = taskTitle.trim();
    if (trimmedTitle !== "") {
      createItem(trimmedTitle);
      setTaskTitle("");
    } else {
      setError("Title is required");
    }
  };

  return (
    <div>
      <TextField
        size="small"
        variant="outlined"
        value={createItem}
        onChange={changeItemTitleHandler}
        onKeyDown={createItemOnEnterHandler}
        error={!!error}
        helperText={error}
      />
      <Tooltip title="Add item">
        <Button
          disableElevation
          variant="contained"
          onClick={createItemHandler}
          endIcon={<Add />}
        >
          add
        </Button>
      </Tooltip>
    </div>
  );
};
