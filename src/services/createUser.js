const User = require("../models/user.js");
const argon2 = require("argon2");

const createUser = async (req, res) => {
    const { nickname, password } = req.body;

    const existingUser = await User.findOne({ nickname });
    if (existingUser) return res.status(400).json({ message: "Tente um outro nickname" });

    try {
        const hashedPassword = await argon2.hash(password);

        const user = await new User({
            nickname,
            password: hashedPassword,
        });

        await user.save();

        res.json({ message: "Usuário criado com sucesso" });
    } catch (err) {
        res.status(500).json({ message: "Houve um erro no servidor" });
        console.error("Ocorreu um erro no createUser: " + err.stack);
    }
};

module.exports = createUser;
