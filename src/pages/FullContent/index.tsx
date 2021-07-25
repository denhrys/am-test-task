import React, { ReactElement } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import cn from "classnames"
import ArticlesRow from 'components/Column'
import Portal from 'components/Portal'
import { RootState } from 'store/appStore'
import { selectArticlesById, selectIdsByOrder, deleteArticle, selectDeletedIds, restoreArticle } from 'store/articles/articlesSlice'

import s from "./style.module.css"
import Column from 'components/Column'

export default function index(): ReactElement | null {
	const articleIDs = useSelector(selectIdsByOrder)
	return (
		<div>
			<h1>Full content</h1>
			{articleIDs.map(rowIDs => (
				<div key={rowIDs.join(":")} className="row">
					{rowIDs.map(id => (
						<Column key={id} id={id} />
					))}
				</div>
			))}
		</div>
	)
}
