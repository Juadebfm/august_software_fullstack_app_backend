const express = require("express");
const router = express.Router();

const { signup, signin } = require("../controllers/authController");

router.post("/signup", signup); // http://www.mybackend.com/users/api/signup
router.post("/signin", signin); // http://www.mybackend.com/users/api/signin

module.exports = router;
