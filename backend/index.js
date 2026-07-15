const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectionDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

connectionDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));

const PORT = 3500;

app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port ${PORT}`);
});