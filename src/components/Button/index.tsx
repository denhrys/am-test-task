import React, { ReactElement } from 'react'
import cn from "classnames"
import s from "./style.module.css"

interface Props {
	text: string;
	className?: string;
	type?: string;
	onClick: (e: React.SyntheticEvent<HTMLButtonElement>) => any
}

export default function Button({ className, text, type = "button", onClick }: Props): ReactElement {
	return (
		<button onClick={onClick} className={cn(s.button, className)}>{text}</button>
	)
}
