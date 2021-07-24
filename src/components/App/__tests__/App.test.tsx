import React from "react"
import { render, screen } from "@testing-library/react"
import App from "../index"

test("should render the app", () => {
	render(<App />)
	const text = screen.getByText("Test task react app")
	expect(text).toBeInTheDocument()
})