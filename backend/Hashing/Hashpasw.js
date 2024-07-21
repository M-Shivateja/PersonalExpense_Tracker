const bcrypt = require("bcrypt");

async function hashPassword(pass) {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(pass, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
}

module.exports = hashPassword;
