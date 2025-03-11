module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "ts-jest",
  },
  moduleNameMapper: {
    "^axios$": "axios/dist/node/axios.cjs",
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
