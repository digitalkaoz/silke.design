const path = require("path");

module.exports = api => {
  api.cache(true);

  return {
    presets: [
      `${path.dirname(require.resolve("react-static"))}/../babel-preset.js`
    ]
  };
};
