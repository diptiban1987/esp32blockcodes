const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// Base config that applies to either development or production mode.
const config = {
  entry: "./src/index.js",
  output: {
    // Compile the source files into a bundle.
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  // Enable webpack-dev-server to get hot refresh of the app.
  devServer: {
    allowedHosts: "all",
    static: {
      directory: path.resolve(__dirname, "public"),
      publicPath: "/",
    },
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) throw new Error("webpack-dev-server is not defined");

      // Mount the Arduino compile/upload + OTA + WebREPL API
      const compileRouter = require("./server/compileServer");
      devServer.app.all("/api/*", (req, res) => compileRouter(req, res));

      return middlewares;
    },
  },
  module: {
    rules: [
      {
        // Load CSS files. They can be imported into JS files.
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        // Load image assets (logo, board images, etc.)
        test: /\.(webp|png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/[name][hash:8][ext]",
        },
      },
    ],
  },
  plugins: [
    // Make the backend API URL configurable at build time.
    // In development it stays "" (relative, proxied by webpack-dev-server).
    // Set BACKEND_API_URL=https://your-api.com before building for production.
    new webpack.DefinePlugin({
      __API_BASE_URL__: JSON.stringify(process.env.BACKEND_API_URL || ""),
    }),
    // Landing page — served at root "/" (default index).
    new HtmlWebpackPlugin({
      template: "src/landing.html",
      filename: "index.html",
      chunks: [],
      inject: false,
      minify: false,
    }),
    // Main app (Blockly simulator) — accessible at "/app.html".
    new HtmlWebpackPlugin({
      template: "src/index.html",
      filename: "app.html",
      chunks: ["main"],
    }),
  ],
};

module.exports = (env, argv) => {
  if (argv.mode === "development") {
    // Set the output path to the `build` directory
    // so we don't clobber production builds.
    config.output.path = path.resolve(__dirname, "build");

    // Generate source maps for our code for easier debugging.
    // Not suitable for production builds. If you want source maps in
    // production, choose a different one from https://webpack.js.org/configuration/devtool
    config.devtool = "eval-cheap-module-source-map";

    // Include the source maps for Blockly for easier debugging Blockly code.
    config.module.rules.push({
      test: /(blockly[/\\].*\.js)$/,
      use: [require.resolve("source-map-loader")],
      enforce: "pre",
    });

    // Ignore spurious warnings from source-map-loader
    // It can't find source maps for some Closure modules and that is expected
    config.ignoreWarnings = [/Failed to parse source map.*blockly/];
  }
  return config;
};
