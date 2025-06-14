const { body } = require("express-validator");

const bodyValidator = [
    body("email")
        .trim()
        .toLowerCase()
        .isEmail()
        .withMessage("Email inválido"),
    
    body("password")
        .isLength({ min: 8, max: 20 })
        .withMessage("Senha deve ter entre 8 a 20 caracteres"),
]

module.exports = bodyValidator;
