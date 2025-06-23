const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  preset: "ts-jest",
  transform: {
    ...tsJestTransformCfg,
  },
  transformIgnorePatterns: ["/node_modules/"],
  globalSetup: "./jest/global-setup.ts",
  globalTeardown: "./jest/global-teardown.ts",
};
