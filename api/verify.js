const { verifyToken } = require("../handlers/jwt");

const verify = async (req, res) => {
  try {
    const { token } = req.body; // Ambil token dari body request

    const decoded = verifyToken(token); // Verifikasi token menggunakan fungsi verifyToken dari handlers/jwt
    const currentTime = Math.floor(Date.now() / 1000);

    if (decoded.exp < currentTime) {
      return res
        .status(301)
        .json({ message: "Sesi telah kadaluarsa", status: "failed" });
    } else {
      console.log("Sesi masih berlaku");
      return res
        .status(200)
        .json({ 
          message: "Sesi masih berlaku", 
          status: "success", 
          decoded: decoded,
        });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server Error", status: "error" });
  }
};

module.exports = verify;
