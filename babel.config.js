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
            app: "./app",
            lib: "./src/lib",
            assets: "./assets",
            utils: "./src/utils",
            hooks: "./src/hooks",
            typings: "./src/types",
            layouts: "./src/layouts",
            contexts: "./src/contexts",
            helpers: "./src/helpers",
            constants: "./src/constants",
            components: "./src/components",
          },
          extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
        },
      ],
    ],
  };
};
