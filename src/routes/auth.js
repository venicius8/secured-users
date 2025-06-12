const express = require("express");
const { createUser, logUser } = require("../services/user.service.js");
const router = express.Router();

router.post("/signup", createUser);
router.post("/login", logUser);

module.exports = router;
