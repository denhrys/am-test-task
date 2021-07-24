import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from "../appStore"
import { Row } from 'helpers/articlesAPIClient';

interface ArticlesState {
  data: Row[];
  loading: boolean;
  error: boolean;
}

const initialState: ArticlesState = {
  data: [],
  loading: false,
  error: false
}

export const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    articlesRequested: (state) => {
      state.loading = true;
      state.error = false;
    },
    articlesRequestError: (state) => {
      state.loading = false;
      state.error = true;
    },
    articlesReceived: (state, action: PayloadAction<Row[]>) => {
      state.loading = false;
      state.error = false;
      state.data = action.payload
    }
  },
})

export const { articlesReceived, articlesRequestError, articlesRequested } = articlesSlice.actions

export default articlesSlice.reducer

export const selectArticles = (state: RootState) => state.articles.data