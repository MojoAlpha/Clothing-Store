const { jwt } = require("../config/keys");
const expressJwt = require("express-jwt");
var User = require("../models/user");

// unsigning the jwt token
exports.isSignedIn = expressJwt({
  secret: jwt.clientSecret,
  algorithms: ["HS256"],
  userProperty: "auth",
});

// checking if user is authenticated user
exports.isAuthenticated = (err, req, res, next) => {
  if (!req.auth || err)
    return res
      .status(403)
      .json({ error: "No authorization token was found!!", success: false });

  User.findById(req.auth._id).then((user) => {
    if (!user)
      return res.status(403).json({
        error: "Access Denied!!",
        success: false,
      });

    // saving important details into request object
    req.root = new Object({
      role: user.role,
      name: user.name,
      email: user.email,
    });

    next();
  });
};

// checking if user has admin authority
exports.isAdmin = (req, res, next) => {
  if (req.root.role !== 0)
    return res
      .status(401)
      .json({ error: "You Are Not Admin! ACCESS DENIED!!", success: false });

  next();
};
