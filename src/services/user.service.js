const createUser = async (req, res, next) => {
    try {
        res.json({ message: "Sucesso!" });
    } catch (err) {
        res.status(500).json({ message: "Houve um erro no servidor" });
    }
}

module.exports = { createUser };