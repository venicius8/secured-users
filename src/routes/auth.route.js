const express = require("express");
const router = express.Router();
const createUser = require("../services/createUser.js");
const logUser = require("../services/logUser.js");
const userBodyValidator = require("../middlewares/userBodyValidator.js");
const loginLimiter = require("../middlewares/loginLimiter.js");
const validateResult = require("../middlewares/validateResult.js");

router.post(
    "/signup",
    userBodyValidator,
    validateResult,
    createUser
);

router.post(
    "/login",
    userBodyValidator,
    validateResult,
    loginLimiter,
    logUser
);

module.exports = router;
