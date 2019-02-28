module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    'semi': ['error', 'always'],
    'comma-dangle': 'off',
    'quotes': ["error", "single"]
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
