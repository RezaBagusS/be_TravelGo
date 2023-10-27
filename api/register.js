const supabase = require("../database/initDB");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const { data: existingUsers, error } = await supabase
      .from("allUser")
      .select("email")
      .eq("email", email);

    if (error) {
      return res.status(500).json({
        status: "error",
        message: "Error saat mengecek daftar pengguna",
      });
    }

    if (existingUsers.length > 0) {
      return res.status(400).json({
        status: "error",
        message: "Email sudah terdaftar",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { insertError } = await supabase
      .from("allUser")
      .insert([{ name: name, email: email, password: hashedPassword }]);

    if (insertError) {
      return res.status(500).json({
        status: "error",
        message: "Gagal mendaftarkan pengguna baru",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Registrasi berhasil",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Gagal mendaftarkan pengguna baru",
    });
  }
};

module.exports = register;
