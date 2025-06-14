const express = require("express");
const router = express.Router();
const { createUser, logUser } = require("../services/user.service.js");
const bodyValidator = require("../validators/body.validator.js");

router.post("/signup", bodyValidator, createUser);
router.post("/login", bodyValidator, logUser);

module.exports = router;
