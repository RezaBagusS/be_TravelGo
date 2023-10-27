const supabase = require("../database/initDB");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const { data } = await supabase
      .from("allUser")
      .select("name, email, password");

    let isNotAvailable = data.some((item) => {
      return item.username === username || item.email === email;
    });

    if (isNotAvailable) {
      return res.status(400).json({
        status: "error",
        message: "Username/Email sudah terdaftar",
      });
    }

    const hashPassword = async () => {
      const result = await bcrypt.hash(password, 10);
      const insertData = await supabase
        .from("dataUser")
        .insert([{ name: name, email: email, password: result }]);
    };

    hashPassword();

    return res.status(200).json({
      status: "success",
      message: "Register Success",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Register Failed",
    });
  }
};

module.exports = register;
