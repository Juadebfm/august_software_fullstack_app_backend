const { body, validationResult } = require("express-validator");

// signup validation
const signupValidationRules = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isAlphanumeric()
    .withMessage("Username must be alphanumeric")
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be between 3 and 30 characters"),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 9 })
    .withMessage("Password must be at least 9 characters"),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone Number is required")
    .isMobilePhone()
    .withMessage("Invalid phone number"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),
];

// sign in validation
const signinValidationRules = [
  body("username").trim().notEmpty().withMessage("Username Required"),

  body("password").trim().notEmpty().withMessage("Password Required"),
];

//middleware to handle validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ success: false, errors: errors.array().map((err) => err.msg) });
  }
  next();
};

module.exports = {
  signupValidationRules,
  signinValidationRules,
  validate,
};
