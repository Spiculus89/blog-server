const { check } = require("express-validator");

exports.registerValidation = [
  check("name", "Name is required").notEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 }),
];

exports.loginValidation = [
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password is required").exists(),
];

exports.createPostValidation = [
  check("title", "Title is required").notEmpty(),
  check("description", "Description is required").notEmpty(),
];

exports.updatePostValidation = [
  check("title", "Title is required").notEmpty(),
  check("description", "Description is required").notEmpty(),
];

exports.addCommentValidation = [check("text", "Text is required").notEmpty()];

exports.updateCommentValidation = [
  check("text", "Text is required").notEmpty(),
];
