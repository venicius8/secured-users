const User = require("../models/user.js");
const argon2 = require("argon2");
const { validationResult } = require("express-validator");

const createUser = async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) return res.status(400).json({ message: "Email e senha são obrigatórios"});

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ message: "Usuário existente" });

    try {
        const hashedPassword = await argon2.hash(password);

        const user = await new User({
            email,
            password: hashedPassword,
        });

        await user.save();

        res.json({ message: "Usuário criado com sucesso" });
    } catch (err) {
        res.status(500).json({ message: "Houve um erro no servidor" });
        console.error("Ocorreu um erro no createUser: " + err.stack);
    }
};

const logUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: "Email e senha são obrigatórios"});

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(401).json({ message: "Credenciais inválidas" });
    
        const result = await argon2.verify(existingUser.password, password);
        if (!result) return res.status(401).json({ message: "Credenciais inválidas" });

        res.json({ message: "Login realizado com sucesso" });
    } catch (err) {
        res.status(500).json({ message: "Houve um erro no servidor" });
        console.error("Ocorreu um erro no logUser: " + err.stack);
    }
};

module.exports = {
    createUser,
    logUser,
};
