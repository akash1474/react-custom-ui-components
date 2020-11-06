var path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve("build"),
    filename: "main.jsx",
    libraryTarget: "commonjs2",
  },
  module: {
    rules: [
      {
        test: /\.ts|\.tsx$/,
        use: "ts-loader",
        exclude: path.resolve(__dirname, 'node_modules'),
        include: __dirname,
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader",
      },
    ],
  },
  externals: {
    react: "react",
  },
};
