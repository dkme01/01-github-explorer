const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefresbWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  mode: isDevelopment ? "development" : "production", // define o modo da aplicação, desenvolvimento ou produção
  devtool: isDevelopment ? "eval-source-map" : "source-map", // define como o código será exibido no source panel do devtools dos navegadores
  entry: path.resolve(__dirname, "src", "index.tsx"), // define qual arquivo será observado para geração do bundle
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  }, // define aonde será gerado o bundle compilado da aplicação
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  }, // define extenções de arquivo ainda não comuns para os navegadores
  devServer: {
    contentBase: path.resolve(__dirname, "public"),
    hot: true,
  }, // define o caminho dos arquivos que serão servidos ao executar o script de development
  plugins: [
    isDevelopment && new ReactRefresbWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
    }),
  ].filter(Boolean), // define o arquivo aonde será injetado o bundle com os códigos convertidos em JS
  module: {
    rules: [
      {
        test: /\.(j|t)sx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: [isDevelopment && require.resolve("react-refresh/babel")].filter(Boolean),
          },
        },
      }, // define que o compilador compreenda arquivos com extenções .jsx
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "sass-loader"],
      }, // define que o compilador compreenda arquivos de estilização com, e sem pré-processamento
    ],
  },
};
