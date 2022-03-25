module.exports = {
  parser: 'babel-eslint',
  rules: {
    'react-native/no-inline-styles': 0,
    'graphql/template-strings': [
      'error',
      {
        env: 'literal',
      },
    ],
  },
  root: true,
  extends: '@react-native-community',
  plugins: ['graphql'],
};
