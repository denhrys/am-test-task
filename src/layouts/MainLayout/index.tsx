import React, { ReactElement, ReactNode } from 'react'
import s from "./style.module.css"

interface Props {
	children: ReactNode;
}

export default function MainLayout({ children }: Props): ReactElement {
	return (
		<div className={s["main-container"]}>
			{children}
		</div>
	)
}
