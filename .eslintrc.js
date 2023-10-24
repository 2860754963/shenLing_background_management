module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint",
    sourceType: "module",
    requireConfigFile: false,
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ["plugin:vue/recommended", "eslint:recommended"],

  // add your custom rules here
  //it is base on https://github.com/vuejs/eslint-config-vue
  rules: {
    "vue/multi-word-component-names": 0,
  },
};
