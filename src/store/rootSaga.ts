import { all } from "redux-saga/effects"
import { articlesSaga } from "store/articles/articlesSaga"

export default function* rootSaga() {
	yield all([
		articlesSaga()
	])
}