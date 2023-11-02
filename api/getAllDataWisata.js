const { verifyToken } = require("../handlers/jwt");
const supabase = require("../database/initDB");

const getAllDataWisata = async (req, res) => {
  try {

    const { data: wisata, error } = await supabase
      .from("DataWisata")
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
      data: wisata,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Outentikasi gagal, harap coba kembali!!",
    });
  }
};

module.exports = getAllDataWisata;
