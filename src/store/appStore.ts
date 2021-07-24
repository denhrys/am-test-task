import { configureStore } from '@reduxjs/toolkit'
import articles from "./articles/articlesSlice"

export const store = configureStore({
	reducer: {
		articles
	},
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch