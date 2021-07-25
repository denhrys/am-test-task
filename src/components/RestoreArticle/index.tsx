import React, { ReactElement } from 'react'
import Button from 'components/Button'
import cn from "classnames"
import s from "./style.module.css"
import { useDispatch } from 'react-redux'
import { restoreArticle } from 'store/articles/articlesSlice'

interface Props {
	id: string;
	className?: string;
}

export default function RestoreArticle({ id, className }: Props): ReactElement {
	const dispatch = useDispatch()
	const handleClick = () => dispatch(restoreArticle(id))
	return (
		<div className={cn(s["restore-article-container"], className)}>
			<div className={s["restore-message"]}>
				<p>Article will be deleted in 3 seconds</p>
				<Button onClick={handleClick} className={s["restore-button"]} text="Restore" />
			</div>
		</div>
	)
}
