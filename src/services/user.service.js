const User = require("../models/user.js");

const createUser = async (req, res, next) => {
    const { email, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ message: "Usuário existente" });

    try {
        const user = await new User({
            email,
            password,
        });

        await user.save();

        res.json({ message: "Usuário criado com sucesso" });
    } catch (err) {
        res.status(500).json({ message: "Houve um erro no servidor" });
    }
};

const logUser = async (req, res, next) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) return res.status(401).json({ message: "Credenciais inválidas" });
    if (!(password === existingUser.password)) return res.status(401).json({ message: "Credenciais inválidas" });

    try {
        res.json({ message: "Login realizado com sucesso" });
    } catch (err) {
        res.status(500).json({ message: "Houve um erro no servidor" });
    }
};

module.exports = {
    createUser,
    logUser,
};
