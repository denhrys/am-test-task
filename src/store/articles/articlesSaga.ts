import { PayloadAction } from "@reduxjs/toolkit";
import {
  call,
  put,
  takeEvery,
  all,
  fork,
  take,
  ForkEffect,
  delay,
  cancel,
} from "@redux-saga/core/effects";
import { articlesAPIClient, Row } from "helpers/articlesAPIClient";
import {
  allArticlesReceived,
  getAllArticlesError,
  getAllArticles,
  deleteArticle,
  scheduleDeleteArticle,
  saveTimerId,
  restoreArticle,
} from "store/articles/articlesSlice";
import { Task } from "redux-saga";

interface ScheduledTask {
  articleId: string;
  taskEffect: Task;
}

let scheduledTasks: ScheduledTask[] = [];

// Fetch articles
function* fetchArticlesSaga() {
  try {
    const articles: Row[] = yield call(articlesAPIClient.getAllArticles);
    yield put(allArticlesReceived(articles));
  } catch (error) {
    yield put(getAllArticlesError());
  }
}

function* watchGetAllArticlesSaga() {
  yield takeEvery(getAllArticles.type, fetchArticlesSaga);
}

// Schedule article delition
function* scheduleDeleteArticleSaga(action: PayloadAction<string>) {
  yield delay(5000);
  yield put(deleteArticle(action.payload));
}

function* watchScheduleDelleteArticleSaga() {
  while (true) {
    const action: PayloadAction<string> = yield take(
      scheduleDeleteArticle.type
    );
    const taskEffect: Task = yield fork(scheduleDeleteArticleSaga, action);
    scheduledTasks.push({ articleId: action.payload, taskEffect });
  }
}

function* watchRestoreArticleSaga() {
  while (true) {
    const action: PayloadAction<string> = yield take(restoreArticle.type);
    const task = scheduledTasks.find(
      (task) => task.articleId === action.payload
    );
    if (task?.taskEffect) {
      yield cancel(task.taskEffect);
    }
    scheduledTasks = scheduledTasks.filter(
      (task) => task.articleId !== action.payload
    );
  }
}

// Start all sagas
export function* articlesSaga() {
  yield all([
    watchGetAllArticlesSaga(),
    watchScheduleDelleteArticleSaga(),
    watchRestoreArticleSaga(),
  ]);
}
