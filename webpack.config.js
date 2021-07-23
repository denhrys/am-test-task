const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
	entry: "./src/index.tsx",
	output: {
		path: path.resolve(__dirname, "build"),
		filename: "bundle.js"
	},
	devServer: {
		contentBase: "./build"
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".jsx"],
		alias: {
			components: path.resolve(__dirname, "src/components/"),
			reducers: path.resolve(__dirname, "src/reducers/"),
			store: path.resolve(__dirname, "src/store/"),
			actions: path.resolve(__dirname, "src/actions/"),
		}
	},
	module: {
		rules: [
			{
				test: /\.(ts|js)x?$/,
				use: "babel-loader"
			}
		]

	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "src/assets/index.html")
		})
	]

}