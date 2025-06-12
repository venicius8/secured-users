const express = require("express");
require("dotenv").config();
const authRoutes = require("./routes/auth.js");
const connectDB = require("./config/db.js");

const app = express();
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("Servidor rodando na porta " + PORT));
