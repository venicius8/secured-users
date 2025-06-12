const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB conectado com êxito");
    } catch (err) {
        console.error("Erro ao conectar ao MongoDB: " + err);
    }
}

module.exports = connectDB;
