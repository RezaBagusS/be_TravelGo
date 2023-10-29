const { OAuth2Client } = require("google-auth-library");

const clientId = process.env.CLIENT_ID_DEV;
const client = new OAuth2Client(clientId);
const supabase = require("../database/initDB");

const googleAuth = async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: clientId,
    });

    const payload = ticket.getPayload();
    const userId = payload["sub"];

    const user = await supabase
      .from("allUser")
      .select("email")
      .eq("name", payload.name);

    if (user.data.length == 0) {
      const hashedPassword = await bcrypt.hash("viagoogle", 10);

      const { insertError } = await supabase
        .from("allUser")
        .insert([
          {
            name: payload.name,
            email: payload.email,
            password: hashedPassword,
          },
        ]);

      if (insertError) {
        return res.status(500).json({
          status: "error",
          message: "Gagal mendaftarkan pengguna baru",
        });
      }
    } else {
      const { data: existingUsers, error } = await supabase
        .from("allUser")
        .select("email")
        .eq("email", payload.email);

      if (error) {
        return res.status(500).json({
          status: "error",
          message: "Error saat mengecek daftar pengguna",
        });
      }
    }

    res.status(200).json({
      message: "Otentikasi berhasil",
      userId,
      email: payload.email,
      img: payload.picture,
      name: payload.name,
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({
      status: "error",
      message: "Otentikasi gagal, harap coba kembali!!",
    });
  }
};

module.exports = googleAuth;
