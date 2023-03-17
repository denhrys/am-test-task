const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env, { mode }) => {
  return {
    entry: "./src/index.tsx",
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "bundle.js",
    },
    devtool: mode === "development" ? "eval-source-map" : false,
    devServer: {
      contentBase: "./build",
      historyApiFallback: true,
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
      alias: {
        components: path.resolve(__dirname, "src/components/"),
        layouts: path.resolve(__dirname, "src/layouts/"),
        routes: path.resolve(__dirname, "src/routes/"),
        helpers: path.resolve(__dirname, "src/helpers/"),
        store: path.resolve(__dirname, "src/store/"),
        models: path.resolve(__dirname, "src/models/"),
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          use: "babel-loader",
        },
        {
          test: /\.css/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: {
                  auto: true,
                  localIdentName: "[name]__[local]--[hash:base64:5]",
                },
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src/assets/html/index.html"),
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "src/assets/img"),
            to: path.resolve(__dirname, "build"),
          },
        ],
      }),
    ],
  };
};
