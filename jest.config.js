transform:{}
export default {
    preset: "@vue/cli-plugin-unit-jest",
    transformIgnorePatterns: ["node_modules/(?!axios)"],
    ...other ,options,
  };