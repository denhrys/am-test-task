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

const SAVE = "Save"
const EDIT = "Edit title"
const CANCEL = "Cancel"

export default function EditableTitle({ title, id, className }: Props): ReactElement {
	const dispatch = useDispatch()
	const [editMode, setEditMode] = useState(false)
	const [newTitle, setNewTitle] = useState(title)

	const buttonMode = editMode ? SAVE : EDIT


	const handleClick = (e: React.SyntheticEvent<HTMLButtonElement>) => {
		if (e.currentTarget.name === SAVE) {
			dispatch(saveTitle({ title: newTitle, id }))
			setEditMode(false)
		} else if (e.currentTarget.name === EDIT) {
			setEditMode((editMode) => !editMode)
		} else if (e.currentTarget.name === CANCEL) {
			setNewTitle(title)
			setEditMode(false)
		}
	}

	const handleChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
		setNewTitle(e.currentTarget.value)
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.code === "Enter") {
			dispatch(saveTitle({ title: newTitle, id }))
			setEditMode(false)
		}
	}

	return (
		<div className={cn(s["editable-title-container"], className)}>
			{editMode ?
				<input
					className={s.input}
					onKeyDown={handleKeyDown}
					onChange={handleChange}
					type="text" value={newTitle}
				/> :
				<h3 className={s.title}>{title}</h3>}
			<Button
				name={buttonMode}
				onClick={handleClick}
				className={cn(s["edit-button"], editMode && s["edit-mode"])}
				text={buttonMode}
			/>
			{
				editMode && (
					<Button
						name={CANCEL}
						onClick={handleClick}
						className={cn(s["edit-button"], s["cancel-button"], editMode && s["edit-mode"])}
						text={CANCEL}
					/>
				)
			}
		</div>
	)
}
