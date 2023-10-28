const { verifyToken } = require("../handlers/jwt");

const verify = async (req, res) => {
  try {
    const { token } = req.body; // Ambil token dari body request

    const decoded = verifyToken(token); // Verifikasi token menggunakan fungsi verifyToken dari handlers/jwt
    const currentTime = Math.floor(Date.now() / 1000);

    if (decoded.exp < currentTime) {
      return res.json({ message: "Sesi telah kadaluarsa", status: "error" });
    } else {
      console.log("Sesi masih berlaku");
      return res.json({ message: "Sesi masih berlaku", status: "success" });
    }
  } catch (error) {
    return res.json({ message: "Sesi telah kadaluarsa", status: "error" });
  }
};

module.exports = verify;
