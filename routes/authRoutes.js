const express = require("express");
const { body } = require("express-validator");
const { register, login, logout } = require("../controllers/authController");
const auth = require("../middleware/auth");
const {
  registerValidation,
  loginValidation,
} = require("../middleware/validations");

const router = express.Router();

router.post("/register", registerValidation, register);

router.post("/login", loginValidation, login);

router.post("/logout", auth, logout);

module.exports = router;
