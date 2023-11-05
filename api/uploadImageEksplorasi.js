const { verifyToken } = require("../handlers/jwt");
const supabase = require("../database/initDB");

const uploadImageEksplorasi = async (req, res) => {
  try {
    const { namaWisata, token } = req.body;
    const file = req.file;

    const decoded = verifyToken(token);

    if (!decoded) {
      return {
        status: "error",
        message: "Token tidak valid",
      };
    }

    const filePath = `images/${decoded.id}/${file.originalname}`;

    // console.log(filePath);

    const { data, error } = await supabase.storage
      .from("ImageEksplorasi")
      .upload(filePath, file.buffer, {
        contentType: "image/jpeg",
        upsert: true,
      });

    if (error) {
      return res.status(500).json({
        status: "error",
        message: "Error saat mengupload gambar",
      });
    }

    const baseURL =
      "https://eivzgrpwojuwrlmeaeah.supabase.co/storage/v1/object/public/ImageEksplorasi/";

    const { data: dataCheck } = await supabase
      .from("ImageEksplorasi")
      .select("*")
      .eq("id_user", decoded.id)
      .eq("filePath", baseURL + filePath);

    // console.log("DATA CHECKING : ", dataCheck);

    if (dataCheck.length == 0) {
      const { DBerror } = await supabase.from("ImageEksplorasi").insert([
        {
          id_user: decoded.id,
          filePath: baseURL + filePath,
          namaWisata: namaWisata,
        },
      ]);

      if (DBerror) {
        const { error } = await supabase.storage
          .from("storage_eksplorasi")
          .remove([filePath]);

        return res.status(500).json({
          status: "error",
          message: "Error saat memasukkan gambar ke database",
        });
      }
    }

    return res.status(200).json({
      status: "success",
      message: "Berhasil mengupload gambar",
    });

  } catch (error) {

    return res.status(500).json({
      status: "error",
      message: "Server Error",
    });

  }
};

module.exports = uploadImageEksplorasi;
