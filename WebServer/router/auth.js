var express = require("express");
const { body } = require("express-validator");
const { UserSignup, UserLogin } = require("../controller/auth");
const { errHandler } = require("../controller/errValidator");

var router = express.Router();

router.post(
  "/signup",
  // various checks on body fields
  [
    body("name", "password", "email")
      .notEmpty()
      .withMessage("Invalid Request! Input field is undefined!!"),
    body("name").isLength({ min: 3 }).withMessage("Name is too short!!"),
    body("email").isEmail().withMessage("Invalid Email!!"),
    body("password")
      .isLength({ min: 8, max: 30 })
      .withMessage("Password should be 8-30 characters!!")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$.!%*#?&]{8,20}$/
      )
      .withMessage("Password must contain alphabets, numbers & symbols!!"),
  ],
  errHandler,
  UserSignup
);

router.post(
  "/login",
  [
    body("email", "password")
      .notEmpty()
      .withMessage("Invalid Request! Input field is undefined!!"),
  ],
  errHandler,
  UserLogin
);

module.exports = router;
