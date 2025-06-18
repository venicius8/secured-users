const { body } = require("express-validator");

const bodyValidator = [
    body("nickname")
        .trim()
        .toLowerCase()
        .isLength({ min: 5, max: 20})
        .withMessage("Nickname deve ter entre 5 a 20 caracteres")
        .isAlphanumeric()
        .withMessage("Nickname deve ser alfanumérico"),
        
    body("password")
        .isLength({ min: 8, max: 20 })
        .withMessage("Senha deve ter entre 8 a 20 caracteres"),
];

module.exports = bodyValidator;
