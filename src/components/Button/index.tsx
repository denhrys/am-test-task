import React, { ReactElement } from 'react'
import cn from "classnames"
import s from "./style.module.css"

interface Props {
	text: string;
	name?: string;
	className?: string;
	type?: string;
	onClick?: (e: React.SyntheticEvent<HTMLButtonElement>) => any
}


export default function Button({ className, text, name, type = "button", onClick, ...rest }: Props): ReactElement {
	return (
		<button name={name} onClick={onClick} className={cn(s.button, className)} {...rest}>{text}</button>
	)
}
