const jwt = require("jsonwebtoken");

async function requireSignIn(req, res, next) {
  try {
    const decode = jwt.verify(req.headers.authorization, "Scrt");
    req.user = decode.user;
    next();
  } catch (error) {
    console.log(error);
  }
}

module.exports = requireSignIn;
