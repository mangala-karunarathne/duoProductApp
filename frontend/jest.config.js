module.exports = {
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
    transformIgnorePatterns: [
      '<rootDir>/node_modules/(?!axios)',
    ],
  };