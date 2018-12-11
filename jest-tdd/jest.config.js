module.exports = {
    transform: {
    ".*": "<rootDir>/node_modules/babel-jest",
    "^.+\\.js$": "babel-jest"
  },
  unmockedModulePathPatterns: [
    "<rootDir>/node_modules/react",
    "<rootDir>/node_modules/react-dom",
    "<rootDir>/node_modules/react-addons-test-utils",
    "<rootDir>/node_modules/fbjs"
  ],
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "<rootDir>/src/tests/mocks/styleMock.js",
    "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/src/tests/mocks/fileMock.js"
  },
  setupTestFrameworkScriptFile: "<rootDir>/src/tests/setupTests.js"
}