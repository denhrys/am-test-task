import React, { ReactElement, useEffect, useState } from 'react'
import { Provider } from "react-redux"

import Routes from "routes/index"

import articlesAPIClient, { Row } from 'helpers/articlesAPIClient'
import { store } from "store/appStore"




export default function App(): ReactElement {
	const [articles, setArticles] = useState<Row[]>([])

	useEffect(() => {
		(async () => {
			const response = await articlesAPIClient.getAllArticles()
			setArticles(response)
		})()
	}, [])

	return (
		<Provider store={store}>
			<Routes />
		</Provider>
	)
}
