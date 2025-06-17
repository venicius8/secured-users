const rateLimite = require("express-rate-limit");

const loginLimiter = rateLimite({
    windowMs: 1000 * 60 * 15,
    max: 5,
    message: "Muitas tentativas de login. Tente novamente mais tarde.",
});

module.exports = loginLimiter;
