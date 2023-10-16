const jwt = require("jsonwebtoken");

const SecretKEY = "S%4X&SDsd1o#jsadnid^jsdbj*dsajdb#";

const generateToken = (payload) => {
  const token = jwt.sign(payload, SecretKEY, {
    expiresIn: "2h",
  });

  return token;
};

const verifyToken = (token) => {
  const decoded = jwt.verify(token, SecretKEY);
  return decoded;
};

module.exports = {
  generateToken,
  verifyToken,
};
