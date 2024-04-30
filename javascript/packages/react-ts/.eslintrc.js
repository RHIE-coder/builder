module.exports = {
  // node: true || browser: true, es6: true
  env: {
    browser: true,
    es2021: true,
  },

  /* 코드 분석
    js-based : @babel/eslint-parser
    ts-based : @typescript-eslint/parser
        plugin:@typescript-eslint/recommended
        extends 시 자동 포함
  */
  "parser": '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'airbnb', 
    // [airbnb] https://www.npmjs.com/package/eslint-config-airbnb
    // eslint dependencies
    // eslint-plugin-import
    // eslint-plugin-react
    // eslint-plugin-react-hooks
    // eslint-plugin-jsx-a11y
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
}