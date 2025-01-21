import { TextField } from "@mui/material"
import { ChangeEvent, useState } from "react"

type Props = {
    title: string
    changeTitle: (newTitle: string) => void
}

export const EditableSpan = ({ title, changeTitle }: Props) => {

    const [isEditMode, setIsEditMode] = useState(false)
    const [itemTitle, setItemTitle] = useState(title)

    const onEditMode = () => {
        setIsEditMode(true)
    }

    const offEditMode = () => {
        setIsEditMode(false)
        changeTitle(itemTitle)
    }
    const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(event.currentTarget.value)
    }

    return (
        isEditMode
            ? <TextField
                variant="standard"
                value={itemTitle}
                autoFocus
                onChange={changeItemTitleHandler}
                onBlur={offEditMode}
            />
            : <span onDoubleClick={onEditMode}>{title}</span>
    )
}