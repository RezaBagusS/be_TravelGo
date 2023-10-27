const transporter = require("../config/emailConfig");

const sendEmail = async (req, res) => {
  const { nama, email, pesan } = req.body;

  const mailOptions = {
    from: email,
    to: "rezabagussaputrait@gmail.com",
    subject: `Pesan dari ${nama} - ${email}`,
    text: pesan,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).json({
        status: "error",
        message: "Email gagal dikirim",
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "Email berhasil dikirim",
      });
    }
  });
  
};

module.exports = sendEmail;
