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
    // slove Component name "xxx-xxx" should be multi-word
    "vue/max-attributes-per-line": 0,
    // slove Attributes on multiple lines (2:1)
    "vue/html-self-closing": 0,
    // slove Disallow self-closing on HTML void elements
    "vue/singleline-html-element-content-newline": "off",
    "vue/multiline-html-element-content-newline": "off",
    // slove Expected newline after '<' in multiline html
  },
};
