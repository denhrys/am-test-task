import React, { ReactElement } from 'react'
import cn from "classnames"
import { Link, NavLink } from "react-router-dom"
import { routes } from "routes/routes"
import s from "./style.module.css"


interface Props {
	className?: string
	title: string
}

export default function Header({ className, title }: Props): ReactElement {
	return (
		<header className={cn(s.header, className)}>
			<div className={s.container}>
				<h1 className={s.title}>{title}</h1>
				<nav className={s["main-nav"]}>
					<ul>
						{
							routes.map(route => {
								return (
									<li>
										<NavLink
											activeClassName={s["active-nav-item"]}
											className={s.link} to={route.path} >
											{route.name}
										</NavLink>
									</li>
								)
							})
						}
					</ul>
				</nav>
			</div>
		</header>
	)
}
