import React, { ReactElement } from 'react'

interface Props {
	title: string
}

export default function EditableTitle({ title }: Props): ReactElement {
	return (
		<div>
			<h2>{title}</h2>
		</div>
	)
}
