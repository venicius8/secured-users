const { validationResult } = require("express-validator");

const validateResult = (req, res, next) => {
    const { nickname, password } = req.body;
    if (!nickname || !password) {
        return res.status(400).json({ message: "Nickname e senha são obrigatórios"});
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({
        errors: errors.array().map(err => ({
            field: err.param,
            message: err.msg,
        }))
    });
    
    next();
};

module.exports = validateResult;
