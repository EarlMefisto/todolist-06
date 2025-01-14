import { TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";

type Props = {
  title: string;
  changeTitle: (newTitle: string) => void;
};

export const EditableSpan = ({ title, changeTitle }: Props) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [itemTitle, setItemTitle] = useState("");

  const turnOnEditMode = () => {
    setIsEditMode(true);
  };

  const turnOffEditMode = () => {
    setIsEditMode(false);
    changeTitle(itemTitle);
  };

  const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setItemTitle(event.currentTarget.value);
  };

  return isEditMode ? (
    <TextField
      variant="standard"
      value={itemTitle}
      onChange={changeItemTitleHandler}
      onBlur={turnOffEditMode}
      autoFocus
    />
  ) : (
    <span onDoubleClick={turnOnEditMode}>{title}</span>
  );
};
