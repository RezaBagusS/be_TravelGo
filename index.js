const express = require("express");
const app = express();
const cors = require("cors");
const googleAuth = require("./api/googleAuth");


app.use(cors());
app.use(express.json());

app.post("/api/auth/google", googleAuth);
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Express API!" });
});

app.get("/api/data", (req, res) => {
  res.json({ data: [1, 2, 3, 4, 5] });
});

app.get("/api/pariwisata", (req, res) => {
  res.json("INI PARIWISATA LOH!");
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
