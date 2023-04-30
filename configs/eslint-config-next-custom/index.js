module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  extends: [
    "next",
    "prettier",
    "turbo",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "plugin:@next/next/recommended",
    "next/core-web-vitals",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "react", "testing-library"],
  overrides: [
    {
      files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
      extends: ["plugin:testing-library/react"],
    },
  ],
  rules: {
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/no-explicit-any": "warn",
    "no-unused-vars": "off",
    "no-redeclare": "off",
    "@next/next/no-html-link-for-pages": "off",
    "react/jsx-key": "off",
    "react/display-name": "off",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "@next/next/no-img-element": "off",
    "turbo/no-undeclared-env-vars": "off",
  },
}
