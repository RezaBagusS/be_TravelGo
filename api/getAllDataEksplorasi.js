const { verifyToken } = require("../handlers/jwt");
const supabase = require("../database/initDB");

const getAllDataEksplorasi = async (req, res) => {
  try {

    const { token } = req.body;

    const decoded = verifyToken(token);

    if (!decoded) {
      return {
        status: "error",
        message: "Token tidak valid",
      };
    }

    const { data: dataImage, error } = await supabase
      .from("ImageEksplorasi")
      .select("*");

    if (error) {
      return res.status(500).json({
        status: "error",
        message: "Error saat mengecek daftar wisata",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Berhasil mendapatkan daftar wisata",
      data: dataImage,
    });

  } catch (error) {
    return res.status(500).json({
        status: "error",
        message: "Internal Server Error"
    })
  }
};

module.exports = getAllDataEksplorasi;