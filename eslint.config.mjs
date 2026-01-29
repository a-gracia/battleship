import js from "@eslint/js";
import globals from "globals";
import css from "@eslint/css";
import prettier from "eslint-config-prettier";

export default [
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.jest },
    },
    ...js.configs.recommended,
  },

  {
    files: ["**/*.css"],
    language: "css/css",
    ...css.configs.recommended,
  },

  prettier,
];
