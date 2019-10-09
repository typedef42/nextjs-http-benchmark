module.exports = {
  env: {
    node: false,
    commonjs: true,
    es6: true,
    jquery: false,
    jest: true,
    jasmine: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:security/recommended',
    'plugin:prettier/recommended',
  ],
  settings: {
    react: {
      version: 'detect', // React version. "detect" automatically picks the version you have installed.
      // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
      // default to latest and warns if missing
      // It will default to "detect" in the future
    },
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2018,
  },
  plugins: ['promise', 'security', 'react'],
  rules: {
    quotes: ['warn', 'double'],
    semi: ['error', 'always'],
    'no-var': ['error'],
    'no-console': ['error'],
    'no-unused-vars': ['warn'],
    'no-trailing-spaces': ['error'],
    'no-alert': 0,
    'no-shadow': 0,
    'security/detect-object-injection': ['off'],
    'security/detect-non-literal-require': ['off'],
    'security/detect-non-literal-fs-filename': ['off'],
    'no-process-exit': ['off'],
    'node/no-unpublished-require': 0,
    'space-before-function-paren': [
      'warn',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'object-curly-spacing': ['warn', 'always'],
  },
};
