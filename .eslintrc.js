module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    }
  },
  rules: {
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    'linebreak-style': ['error', 'unix'],
  },
  overrides: [
    {
      files: ["./src/gatsby-browser.js", "./src/loader/*"],
      env: {
        browser: true,
      }
    },
    {
      files: ["**/cypress/**/*"],
      "env": {
        "cypress/globals": true
      },
      plugins: ["cypress"]
    },
    {
      files: ["e2e-tests/*/src/**/*"],
      extends: ["plugin:react/recommended"],
      rules: {
        "react/prop-types": 0
      },
      "settings": {
        "react": {
          "version": "16.9.0"
        },
      },
    },
  ],
};