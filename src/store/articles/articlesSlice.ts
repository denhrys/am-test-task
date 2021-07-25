import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid';

import type { RootState } from "../appStore"
import { Article, Row } from 'helpers/articlesAPIClient';

export type ArticleState = "active" | "sceduled-delete" | "deleted"

export interface ArticleById extends Article {
  id: string;
  state: ArticleState;
}

export interface ById<T> {
  [key: string]: T
}

interface ArticlesState {
  byId: ById<ArticleById>;
  idsByOrder: string[][];
  deletedIds: string[];
  loading: boolean;
  error: boolean;
}

const initialState: ArticlesState = {
  byId: {},
  idsByOrder: [],
  deletedIds: [],
  loading: false,
  error: false
}

export const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    getAllArticles: (state) => {
      state.loading = true;
      state.error = false;
    },
    getAllArticlesError: (state) => {
      state.loading = false;
      state.error = true;
    },
    allArticlesReceived: {
      reducer: (state, action: PayloadAction<{ byId: ById<ArticleById>; idsByOrder: string[][] }>) => {
        state.loading = false;
        state.error = false;
        state.byId = action.payload.byId
        state.idsByOrder = action.payload.idsByOrder

      },
      prepare: (payload: Row[]) => {
        const byId: ById<ArticleById> = {}
        const idsByOrder: string[][] = []

        payload.forEach(row => {
          const idsRow: string[] = []
          row.columns.forEach(article => {
            const id = nanoid()
            byId[id] = { ...article, id, state: "active" }
            idsRow.push(id)
          })
          idsByOrder.push(idsRow)
        })

        return { payload: { byId, idsByOrder } }
      }
    },
    scheduleDeleteArticle: (state, action: PayloadAction<string>) => {
      state.byId[action.payload].state = "sceduled-delete"
      state.deletedIds.push(action.payload)
    },
    deleteArticle: (state, action: PayloadAction<string>) => {
      state.byId[action.payload].state = "deleted"
      state.deletedIds.splice(state.deletedIds.indexOf(action.payload), 1)
    },
    restoreArticle: (state, action: PayloadAction<string>) => {
      if (state.byId) {
        state.byId[action.payload].state = "active"
        state.deletedIds.splice(state.deletedIds.indexOf(action.payload), 1)
      }
    },
    saveTimerId: (state, action: PayloadAction<string>) => {
      state.deletedIds.push(action.payload)
    }
  },
})

export const {
  getAllArticles,
  getAllArticlesError,
  allArticlesReceived,
  deleteArticle,
  restoreArticle,
  scheduleDeleteArticle,
  saveTimerId
} = articlesSlice.actions

export default articlesSlice.reducer

export const selectArticlesById = (state: RootState) => state.articles.byId
export const selectIdsByOrder = (state: RootState) => state.articles.idsByOrder
export const selectDeletedIds = (state: RootState) => state.articles.deletedIds