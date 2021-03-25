const User = require("../models/user");
const jwtoken = require("jsonwebtoken");
const { jwt } = require("../config/keys");

exports.UserSignup = (req, res) => {
  User.findOne({ email: req.body.email }).then(
    (user) => {
      if (user)
        return res
          .status(403)
          .json({ error: "Email already exists!!", success: false });

      // generating new user
      new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      })
        .save() // saving user into db and promise handling
        .then((user) => {
          return res.status(201).json({ msg: "Success!!", success: true });
        })
        .catch((err) => {
          return res
            .status(502)
            .json({ msg: "DB Error!! Cannot Save User", success: false });
        });
    },
    (err) => {
      return res.status(500).json({ error: err, success: false });
    }
  );
};

exports.UserLogin = (req, res) => {
  User.findOne({ email: req.body.email }).then(
    (user) => {
      if (!user)
        return res
          .status(404)
          .json({ error: "Email is not registered!!", success: false });

      if (!user.authenticate(req.body.password))
        // method from user model
        return res
          .status(401)
          .json({ error: "Email & password don't match!!", success: false });

      const userToken = jwtoken.sign({ _id: user._id }, jwt.clientSecret, {
        expiresIn: 604800,
      }); // 7 days in microseconds
      return res
        .status(200)
        .json({ msg: "Login Successful!", success: true, token: userToken });
    },
    (err) => {
      return res.status(500).json({ error: err, success: false });
    }
  );
};
