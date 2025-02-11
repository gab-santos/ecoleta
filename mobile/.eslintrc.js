module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: [
    // "react-app",
    "airbnb",
    "plugin:jsx-a11y/recommended",
    "prettier/@typescript-eslint",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: [
    "react",
    "react-hooks",
    "react-native",
    "import",
    "jsx-a11y",
    "eslint-plugin-import-helpers",
  ],
  rules: {
    "react/jsx-filename-extension": [
      0,
      {
        extensions: [".tsx"],
      },
    ],
    "import/prefer-default-export": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "import/extensions": [0, "never"],
    //
    "import-helpers/order-imports": [
      "warn",
      {
        newlinesBetween: "always",
        groups: ["/^react/", "module", ["parent", "sibling", "index"]],
        alphabetize: { order: "asc", ignoreCase: true },
      },
    ],
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {},
    },
  },
};
