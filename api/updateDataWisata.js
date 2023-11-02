const { verifyToken } = require("../handlers/jwt");
const supabase = require("../database/initDB");

const updateDataWisata = async (req, res) => {
  try {
    const { token, data } = req.body;

    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({
        status: "error",
        message: "Token tidak valid",
      });
    }

    console.log(data);

    const { error } = await supabase
      .from("DataWisata")
      .update([
        {
          nama: data.nama,
          deskripsi: data.deskripsi,
          lokasi: data.lokasi,
          gambar: data.gambar,
          virtualTour: data.virtualTour,
        },
      ])
      .eq("id", data.id);

    if (error) {
      return res.status(500).json({
        status: "error",
        message: "Error saat mengupdate data wisata",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Berhasil mengupdate data wisata",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Server Error",
    });
  }
};

module.exports = updateDataWisata;

