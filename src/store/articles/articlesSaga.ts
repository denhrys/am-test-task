import { call, put, takeEvery, all, fork } from '@redux-saga/core/effects';
import { articlesAPIClient, Row } from 'helpers/articlesAPIClient';
import { allArticlesReceived, getAllArticlesError, getAllArticles } from "store/articles/articlesSlice"

function* fetchArticlesSaga() {
	try {
		const articles: Row[] = yield call(articlesAPIClient.getAllArticles)
		yield put(allArticlesReceived(articles))
	} catch (error) {
		yield put(getAllArticlesError())
	}
}

function* watchGetAllArticlesSaga() {
	yield takeEvery(getAllArticles.type, fetchArticlesSaga)
}

export function* articlesSaga() {
	yield all([
		watchGetAllArticlesSaga()
	])
}