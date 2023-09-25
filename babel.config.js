module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "expo-router/babel",
      [
        "module-resolver",
        {
          alias: {
            lib: "./lib",
            utils: "./utils",
            hooks: "./hooks",
            assets: "./assets",
            typings: "./types",
            screens: "./screens",
            contexts: "./contexts",
            helpers: "./helpers",
            constants: "./constants",
            components: "./components",
          },
          extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
        },
      ],
    ],
  };
};
