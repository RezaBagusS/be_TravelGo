const supabase = require("../database/initDB");
const { generateToken } = require("../handlers/jwt");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const { name, password } = req.body;

  try {
    const pass = await supabase
      .from("allUser")
      .select("password")
      .eq("name", name);

    if (pass.data.length == 0) {
      return res.status(401).json({
        status: "error",
        message: "Akun tidak ditemukan!!",
      });
    }

    const compareHash = async () => {
      const result = await bcrypt.compare(password, pass.data[0].password);
      // console.log(result);
      return result;
    };

    if (await compareHash()) {
      const { data } = await supabase
        .from("allUser")
        .select("id, name, email, isAdmin, img")
        .eq("name", name);

      //   console.log(data);

      return res.json({
        status: "success",
        message: "Berhasil Login",
        token: generateToken({
          id: data[0].id,
          name: data[0].name,
          isAdmin: data[0].isAdmin,
          email: data[0].email,
          img: data[0].img,
        }),
        data: {
          id: data[0].id,
          name: data[0].name,
          isAdmin: data[0].isAdmin,
          email: data[0].email,
          img: data[0].img,
        },
      });
    } else {
      return res.status(401).json({
        status: "error",
        message: "Password yang anda masukkan salah!!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Outentikasi bermasalah, silahkan coba lagi!!",
    });
  }
};

module.exports = login;
