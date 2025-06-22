const User = require("../models/User.js");
const argon2 = require("argon2");

const logUser = async (req, res) => {
    const { nickname, password } = req.body;

    try {
        const existingUser = await User.findOne({ nickname });
        if (!existingUser) return res.status(401).json({ message: "Credenciais inválidas" });
    
        const result = await argon2.verify(existingUser.password, password);
        if (!result) return res.status(401).json({ message: "Credenciais inválidas" });

        res.json({ message: "Login realizado com sucesso" });
    } catch (err) {
        res.status(500).json({ message: "Houve um erro no servidor" });
        console.error("Ocorreu um erro no logUser: " + err.stack);
    }
};

module.exports = logUser;
