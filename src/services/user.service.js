const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const createUser = async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) return res.status(400).json({ message: "Email e senha são obrigatórios"});

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ message: "Usuário existente" });

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await new User({
            email,
            password: hashedPassword,
        });

        await user.save();

        res.json({ message: "Usuário criado com sucesso" });
    } catch (err) {
        res.status(500).json({ message: "Houve um erro no servidor" });
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
    
        const result = await bcrypt.compare(password, existingUser.password);
        if (!result) return res.status(401).json({ message: "Credenciais inválidas" });

        res.json({ message: "Login realizado com sucesso" });
    } catch (err) {
        res.status(500).json({ message: "Houve um erro no servidor" });
    }
};

module.exports = {
    createUser,
    logUser,
};
