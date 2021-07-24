import React, { Suspense, ReactElement } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"

import MainLayout from "layouts/MainLayout"

import { routes } from "./routes"



export default function Routes(): ReactElement {
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
