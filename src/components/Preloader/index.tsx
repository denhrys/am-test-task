import React, { ReactElement } from 'react'
import { selectArticlesById } from 'store/articles/articlesSlice'
import s from "./style.module.css"

interface Props {

}

export default function Preloader({ }: Props): ReactElement {
	return (
		<div className={s.container}>
			Loading...
		</div>
	)
}
