const { OAuth2Client } = require("google-auth-library");

const clientId = process.env.CLIENT_ID_DEV;
const client = new OAuth2Client(clientId);

const googleAuth = async (req, res) => {
  try {
    const { token } = req.body; // Ambil token akses dari respons Google di frontend

    // Verifikasi token akses dengan Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: clientId, // Pastikan client ID direspons dari Google sesuai dengan yang Anda daftarkan
    });

    const payload = ticket.getPayload();
    const userId = payload["sub"]; // ID unik pengguna
    // Di sini, Anda bisa melakukan autentikasi pengguna atau tindakan lainnya sesuai kebutuhan Anda

    res.status(200).json({
        message: "Otentikasi berhasil",
        userId,
        email: payload.email,
    }); // Respon positif jika otentikasi berhasil
  } catch (error) {
    console.error(error);
    res.status(401).send("Otentikasi gagal"); // Respon negatif jika otentikasi gagal
  }
};

module.exports = googleAuth;