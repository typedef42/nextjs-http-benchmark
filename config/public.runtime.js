const env = require("./env");

const publicConfig = {
  development: {},
  testing: {},
  production: {}
};

const currentEnv = process.env.NODE_ENV;
module.exports = publicConfig[currentEnv];
