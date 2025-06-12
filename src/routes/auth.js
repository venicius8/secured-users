const express = require("express");
const { createUser } = require("../services/user.service.js");
const router = express.Router();

router.post("/signup", createUser);

module.exports = router;
