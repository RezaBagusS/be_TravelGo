const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");

const googleAuth = require("./api/googleAuth");
const register = require("./api/register");
const login = require("./api/login");
const verify = require("./api/verify");
const getAllDataWisata = require("./api/getAllDataWisata");
const addDataWisata = require("./api/addDataWisata");
const updateDataWisata = require("./api/updateDataWisata");
const deleteDataWisata = require("./api/deleteDataWisata");
const uploadImageEksplorasi = require("./api/uploadImageEksplorasi");
const getAllDataEksplorasi = require("./api/getAllDataEksplorasi");
const upload = multer();

app.use(cors());
app.use(express.json());

app.post("/api/auth/google", googleAuth);
app.post("/api/auth/register", register);
app.post("/api/auth/decode", verify);
app.post("/api/auth/login", login);
app.post("/api/add/wisata", addDataWisata);
app.get("/api/data/wisata", getAllDataWisata);
app.put("/api/update/wisata", updateDataWisata);
app.delete("/api/delete/wisata", deleteDataWisata);
app.post("/api/upload/image", upload.single("file"), uploadImageEksplorasi);
app.post("/api/data/eksplorasi", getAllDataEksplorasi);

app.get("/api/data", (req, res) => {
  res.json({ data: [1, 2, 3, 4, 5] });
});

app.get("/api/pariwisata", (req, res) => {
  res.json("INI PARIWISATA LOH!");
});

app.get("/", (req, res) => {
  res.json("HAYO MAU NGAPAIN BANG? IZIN DULU GIH KALAU MAU MASUK KE SINI!");
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
