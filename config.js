const convict = require("convict");
const dotenv = require("dotenv");

dotenv.config();

const config = convict({
  email: {
    doc: "The abookapart login email address.",
    format: "email",
    default: undefined,
    env: "ABA_EMAIL",
    arg: "email"
  },
  password: {
    doc: "The abookapart login password.",
    format: String,
    default: undefined,
    env: "ABA_PASSWORD",
    arg: "password",
    sensitive: true
  }
});

config.validate({ allowed: "strict" });

module.exports = config;
