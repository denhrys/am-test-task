import React, { lazy } from "react"

const FullContent = lazy(() => import("../pages/FullContent"))
const OnlyTitles = lazy(() => import("../pages/OnlyTitles"))

export const routes = [
	{
		path: "/full-content",
		component: FullContent
	},
	{
		path: "/only-titles",
		component: OnlyTitles
	}
]