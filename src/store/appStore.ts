import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import articles from "./articles/articlesSlice";
import rootSaga from "store/rootSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    articles,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([sagaMiddleware]),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
