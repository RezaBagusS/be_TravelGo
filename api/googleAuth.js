const { OAuth2Client } = require("google-auth-library");

const clientId = process.env.CLIENT_ID_DEV;
const client = new OAuth2Client(clientId);

const googleAuth = async (req, res) => {
  try {
    const { token } = req.body; 

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: clientId, 
    });

    const payload = ticket.getPayload();
    const userId = payload["sub"]; 

    res.status(200).json({
        message: "Otentikasi berhasil",
        userId,
        email: payload.email,
        img: payload.picture
    }); 
  } catch (error) {
    console.error(error);
    res.status(401).send("Otentikasi gagal"); 
  }
};

module.exports = googleAuth;