module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    "prettier",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "turbo",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  rules: {
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/ban-ts-comment": "off",
    "turbo/no-undeclared-env-vars": "off",
  },
}
