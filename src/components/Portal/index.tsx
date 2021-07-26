import { ReactElement, useEffect } from "react";
import { createPortal } from "react-dom";

interface Props {
	children: ReactElement
}

export default function Portal({ children }: Props): ReactElement {
	const mount = document.getElementById("portal-root");
	const el = document.createElement("div");

	useEffect((): () => any => {
		mount?.appendChild(el);
		return () => mount?.removeChild(el);
	}, [el, mount]);

	return createPortal(children, el)
};

