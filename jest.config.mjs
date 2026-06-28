import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Path to Next.js app to load config
  dir: "./",
});

const config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
};

export default createJestConfig(config);
