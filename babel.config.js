module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "expo-router/babel",
      "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          alias: {
            app: "./app",
            lib: "./src/lib",
            assets: "./assets",
            utils: "./src/utils",
            hooks: "./src/hooks",
            config: "./src/config",
            typings: "./src/types",
            layouts: "./src/layouts",
            helpers: "./src/helpers",
            providers: "./src/providers",
            constants: "./src/constants",
            components: "./src/components",
          },
          extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
        },
      ],
    ],
  };
};
