import Button from 'components/Button'
import React, { ReactElement, useState } from 'react'
import cn from "classnames"
import s from "./style.module.css"
import { useDispatch } from 'react-redux'
import { saveTitle } from 'store/articles/articlesSlice'

interface Props {
	title: string;
	id: string;
	className?: string;
}

export default function EditableTitle({ title, id, className }: Props): ReactElement {
	const dispatch = useDispatch()
	const [editMode, setEditMode] = useState(false)
	const [newTitle, setNewTitle] = useState(title)

	const buttonMode = editMode ? "Save" : "Edit"

	const handleClick = (e: React.SyntheticEvent<HTMLButtonElement>) => {
		if (e.currentTarget.name === "Save") {
			dispatch(saveTitle({ title: newTitle, id }))
			setEditMode(false)
		} else if (e.currentTarget.name === "Edit") {
			setEditMode((editMode) => !editMode)
		}
	}

	const handleChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
		setNewTitle(e.currentTarget.value)
	}

	return (
		<div className={cn(s["editable-title-container"], className)}>
			{editMode ? <input onChange={handleChange} type="text" value={newTitle} /> : <h2>{title}</h2>}
			<Button name={buttonMode} onClick={handleClick} className={s["edit-button"]} text={buttonMode} />
		</div>
	)
}
