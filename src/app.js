const express = require("express");
require("dotenv").config();
const authRoutes = require("./routes/auth.js");
const connectDB = require("./config/db.js");

const app = express();
app.use(express.json());

connectDB();

app.use("/api/auth", (err, req, res, next) => {
    if (err.status == 400) return res.status(400).json({ message: "JSON inválido" });
    next();
}, authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("Servidor rodando na porta " + PORT));
