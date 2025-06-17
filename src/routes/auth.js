const express = require("express");
const router = express.Router();
const { createUser, logUser } = require("../services/user.service.js");
const bodyValidator = require("../validators/body.validator.js");
const loginLimiter = require("../middlewares/loginLimiter.js");

router.post("/signup", bodyValidator, createUser);
router.post("/login", bodyValidator, loginLimiter, logUser);

module.exports = router;
