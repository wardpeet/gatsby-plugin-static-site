module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
  },
  overrides: [{
    files: ["./src/gatsby-browser.js", "./src/router/*"],
    env: {
      browser: true,
    }
  }]
};