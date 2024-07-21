const bcrypt = require("bcrypt");

async function comparePassword(password, hashedPassword) {
  const checkPassword = await bcrypt.compare(password, hashedPassword);
  return checkPassword;
}

module.exports = comparePassword;
