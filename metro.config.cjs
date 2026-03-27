const expoMetroConfig = require("expo/metro-config");
const nativewindMetro = require("nativewind/metro");

const defaultConfig = expoMetroConfig.getDefaultConfig();

module.exports = nativewindMetro.withNativewind({
  ...defaultConfig,
  resolver: {
    ...defaultConfig.resolver,
    sourceExts: [...defaultConfig.resolver.sourceExts, "sql"],
  },
});
