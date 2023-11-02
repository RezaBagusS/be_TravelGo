const { verifyToken } = require("../handlers/jwt");
const supabase = require("../database/initDB");

const addDataWisata = async (req, res) => {
  try {
    const { token, data } = req.body;
    console.log(token);
    console.log(data);
    const decoded = verifyToken(token);

    console.log(decoded);
    if (!decoded) {
      return res.status(401).json({
        status: "error",
        message: "Token tidak valid",
      });
    }

    const { error } = await supabase.from("DataWisata").insert([
      {
        nama: data.nama,
        deskripsi: data.deskripsi,
        lokasi: data.lokasi,
        gambar: data.gambar,
        virtualTour: data.virtualTour,
      },
    ]);

    if (error) {
      return res.status(500).json({
        status: "error",
        message: "Error saat menambahkan data wisata",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Berhasil menambahkan data wisata",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Server Error",
    });
  }
};

module.exports = addDataWisata;
