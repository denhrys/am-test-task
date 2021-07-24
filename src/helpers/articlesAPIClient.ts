import axios from "axios"

export interface Article {
	type: "Article";
	width: number;
	url: string;
	title: string;
	imageUrl: string;
}

export interface Row {
	row: "Row";
	columns: Article[]
}

axios.interceptors.response.use(function (response) {
	return response.data ? response.data : response;
}, function (error) {
	return Promise.reject(error);
});

export const articlesAPIClient = {
	getAllArticles() {
		return axios.get<Row[], Row[]>("https://storage.googleapis.com/aller-structure-task/test_data.json")
	}
}
