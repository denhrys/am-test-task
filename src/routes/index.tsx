import React, { Suspense, ReactElement, useEffect } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"

import MainLayout from "layouts/MainLayout"

import { routes } from "./routes"
import { getAllArticles } from 'store/articles/articlesSlice'
import { useDispatch } from 'react-redux'

export default function Routes(): ReactElement {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getAllArticles())
	}, [])

	return (
		<BrowserRouter>
			<Suspense fallback={<div>Loading...</div>}>
				<Switch>
					{
						routes.map(({ path, component: Component }) => (
							<Route key={path} path={path}>
								<MainLayout>
									<Component />
								</MainLayout>
							</Route>
						))
					}
					<Redirect to={routes[0].path} />
				</Switch>
			</Suspense>
		</BrowserRouter>
	)
}
