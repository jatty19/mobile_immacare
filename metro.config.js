const { getDefaultConfig } = require('expo/metro-config');

module.exports = (async () => {
  const config = getDefaultConfig(__dirname);
  config.transformer.getTransformOptions = async () => ({
    transform: {
      experimentalImportSupport: false,
      inlineRequires: true,
    },
  });
  return config;
})();
